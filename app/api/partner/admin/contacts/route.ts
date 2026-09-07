import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../../../lib/partner-auth";
import {
  getPartnerDirectoryEntries,
  isPartnerAdmin,
} from "../../../../lib/partners";
import {
  addPartnerContact,
  inviteExistingContact,
  listContactsForAdmin,
  revokeContact,
} from "../../../../lib/partner-contacts";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (!session || !isPartnerAdmin(session.email)) {
    return null;
  }
  return session;
}

/** GET — list active contacts (optional ?slug=) */
export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }
  const slug = new URL(request.url).searchParams.get("slug")?.trim() || undefined;
  const contacts = await listContactsForAdmin(slug);
  return NextResponse.json({
    ok: true,
    contacts,
    organisations: getPartnerDirectoryEntries().map((p) => ({
      slug: p.slug,
      name: p.name,
      organisation: p.organisation,
    })),
  });
}

/** POST — add contact (+ optional invite email) */
export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }

  let body: {
    slug?: string;
    name?: string;
    email?: string;
    sendInvite?: boolean;
    /** Resend invite to existing contact only */
    resendOnly?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.resendOnly && body.email) {
    const result = await inviteExistingContact({
      email: body.email,
      invitedBy: session.email,
      invitedByName: "Big Five Group",
    });
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  }

  const result = await addPartnerContact({
    slug: body.slug ?? "",
    name: body.name ?? "",
    email: body.email ?? "",
    createdBy: session.email,
    sendInvite: Boolean(body.sendInvite),
    invitedByName: "Big Five Group",
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}

/** DELETE — revoke contact by email (?email=) */
export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }
  const email = new URL(request.url).searchParams.get("email")?.trim() ?? "";
  if (!email) {
    return NextResponse.json({ ok: false, error: "Email required." }, { status: 400 });
  }
  const result = await revokeContact(email);
  if (!result.ok) {
    return NextResponse.json(result, { status: 404 });
  }
  return NextResponse.json(result);
}
