import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../../../lib/partner-auth";
import {
  canManagePartnerInvitesAsync,
  getPartnerBySlug,
  getPartnerDirectoryEntries,
  isPartnerAdmin,
  partnerInviteScopeSlugAsync,
} from "../../../../lib/partners";
import {
  addPartnerContact,
  findActiveContactByEmail,
  inviteExistingContact,
  listContactsForAdmin,
  revokeContact,
} from "../../../../lib/partner-contacts";

export const dynamic = "force-dynamic";

type Session = { email: string };

async function requireSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (!session?.email) return null;
  return { email: session.email };
}

function serverError(err: unknown) {
  console.error("[partner-admin/contacts]", err instanceof Error ? err.message : err);
  return NextResponse.json(
    {
      ok: false,
      error:
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong saving the invite. Try again.",
    },
    { status: 500 }
  );
}

function orgPayload(slug: string) {
  const p = getPartnerBySlug(slug);
  if (!p) return [];
  return [{ slug: p.slug, name: p.name, organisation: p.organisation }];
}

/** GET — list active contacts. Admins: optional ?slug=. Org users: locked to their workspace. */
export async function GET(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    const requested = new URL(request.url).searchParams.get("slug")?.trim().toLowerCase() || undefined;
    const admin = isPartnerAdmin(session.email);

    if (admin) {
      const contacts = await listContactsForAdmin(requested);
      return NextResponse.json({
        ok: true,
        role: "admin",
        contacts,
        organisations: getPartnerDirectoryEntries().map((p) => ({
          slug: p.slug,
          name: p.name,
          organisation: p.organisation,
        })),
      });
    }

    const scope = await partnerInviteScopeSlugAsync(session.email);
    if (!scope) {
      return NextResponse.json(
        { ok: false, error: "You do not have permission to manage invites." },
        { status: 403 }
      );
    }
    if (requested && requested !== scope) {
      return NextResponse.json(
        { ok: false, error: "You can only view invites for your organisation." },
        { status: 403 }
      );
    }

    const contacts = await listContactsForAdmin(scope);
    return NextResponse.json({
      ok: true,
      role: "org",
      scopeSlug: scope,
      contacts,
      organisations: orgPayload(scope),
    });
  } catch (err) {
    return serverError(err);
  }
}

/** POST — add contact (+ optional invite email) or resend. */
export async function POST(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    let body: {
      slug?: string;
      name?: string;
      email?: string;
      sendInvite?: boolean;
      resendOnly?: boolean;
    };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const admin = isPartnerAdmin(session.email);
    const scope = admin ? null : await partnerInviteScopeSlugAsync(session.email);
    if (!admin && !scope) {
      return NextResponse.json(
        { ok: false, error: "You do not have permission to invite people." },
        { status: 403 }
      );
    }

    const invitedByName = admin
      ? "Big Five Group"
      : getPartnerBySlug(scope!)?.name || "Your partner workspace";

    if (body.resendOnly && body.email) {
      const existing = await findActiveContactByEmail(body.email);
      if (!existing) {
        return NextResponse.json({ ok: false, error: "Contact not found or revoked." }, { status: 400 });
      }
      if (!admin && existing.slug !== scope) {
        return NextResponse.json(
          { ok: false, error: "You can only resend invites for your organisation." },
          { status: 403 }
        );
      }
      if (!(await canManagePartnerInvitesAsync(session.email, existing.slug))) {
        return NextResponse.json({ ok: false, error: "Permission denied." }, { status: 403 });
      }

      const result = await inviteExistingContact({
        email: body.email,
        invitedBy: session.email,
        invitedByName,
      });
      if (!result.ok) {
        return NextResponse.json(result, { status: 400 });
      }
      return NextResponse.json(result);
    }

    let slug = (body.slug ?? "").trim().toLowerCase();
    if (!admin) {
      // Org members may only invite to their own workspace — reject other slugs explicitly.
      if (slug && slug !== scope) {
        return NextResponse.json(
          { ok: false, error: "You can only invite people to your organisation workspace." },
          { status: 403 }
        );
      }
      slug = scope!;
    }
    if (!slug) {
      return NextResponse.json({ ok: false, error: "Choose a valid partner organisation." }, { status: 400 });
    }
    if (!(await canManagePartnerInvitesAsync(session.email, slug))) {
      return NextResponse.json(
        { ok: false, error: "You can only invite people to your organisation workspace." },
        { status: 403 }
      );
    }

    const result = await addPartnerContact({
      slug,
      name: body.name ?? "",
      email: body.email ?? "",
      createdBy: session.email,
      sendInvite: Boolean(body.sendInvite),
      invitedByName,
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    return serverError(err);
  }
}

/** DELETE — revoke contact by email (?email=). Org users: same org only, not self. */
export async function DELETE(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase() ?? "";
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email required." }, { status: 400 });
    }

    if (email === session.email.trim().toLowerCase()) {
      return NextResponse.json(
        { ok: false, error: "You cannot revoke your own access." },
        { status: 400 }
      );
    }

    const existing = await findActiveContactByEmail(email);
    if (!existing) {
      // Also allow revoking already-known emails that might be revoked find miss — try revoke anyway for admin
      if (!isPartnerAdmin(session.email)) {
        return NextResponse.json({ ok: false, error: "Contact not found." }, { status: 404 });
      }
    }

    const admin = isPartnerAdmin(session.email);
    if (!admin) {
      const scope = await partnerInviteScopeSlugAsync(session.email);
      if (!scope || !existing || existing.slug !== scope) {
        return NextResponse.json(
          { ok: false, error: "You can only revoke access for your organisation." },
          { status: 403 }
        );
      }
    } else if (existing && !(await canManagePartnerInvitesAsync(session.email, existing.slug))) {
      // Admin always can for real orgs; keep check for safety
    }

    const result = await revokeContact(email);
    if (!result.ok) {
      return NextResponse.json(result, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    return serverError(err);
  }
}
