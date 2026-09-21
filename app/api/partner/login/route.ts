import { after, NextResponse } from "next/server";
import {
  createPartnerToken,
  hasPartnerAuthConfigured,
  PARTNER_COOKIE,
  PARTNER_SESSION_MAX_AGE_SEC,
  isPartnerEmailAllowedAsync,
} from "../../../lib/partner-auth";
import {
  findActiveContactByEmail,
  recordPartnerLogin,
} from "../../../lib/partner-contacts";
import { notifyPartnerLogin } from "../../../lib/partner-contacts/login-notify";
import {
  isPartnerAdmin,
  resolvePostLoginPathAsync,
} from "../../../lib/partners";
import type { PartnerAccessRecord } from "../../../lib/partner-contacts/types";

export async function POST(request: Request) {
  if (!hasPartnerAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Partner access is not configured yet. Add emails in app/lib/partners.ts or set PARTNER_EMAILS on the server.",
      },
      { status: 503 }
    );
  }

  let body: { email?: string; from?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (!(await isPartnerEmailAllowedAsync(email))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "This email is not authorised for the partner portal. Contact Big Five if you need access.",
      },
      { status: 403 }
    );
  }

  const token = await createPartnerToken(email);
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Could not start a session. Try again or contact Big Five." },
      { status: 500 }
    );
  }

  const home = await resolvePostLoginPathAsync(email, body.from);
  const admin = isPartnerAdmin(email);
  const destSlug =
    home.match(/^\/partner\/([a-z0-9-]+)/i)?.[1]?.toLowerCase() || "general";

  // Best-effort access log + Craig notify (do not fail the login).
  let access: PartnerAccessRecord | null = null;
  let contactName: string | undefined;
  try {
    const contact = await findActiveContactByEmail(email);
    contactName = contact?.name;
    access = await recordPartnerLogin({
      email,
      slug: destSlug || contact?.slug || "general",
      name: contact?.name,
    });
  } catch (err) {
    console.warn(
      "[partner-login] could not record last login:",
      err instanceof Error ? err.message : err
    );
  }

  after(() =>
    notifyPartnerLogin({
      email,
      slug: destSlug,
      name: contactName,
      workspacePath: home,
      isAdmin: admin,
      access,
      requestedFrom: body.from,
      userAgent: request.headers.get("user-agent") || undefined,
    }).catch((err) => {
      console.warn(
        "[partner-login] sign-in notify failed:",
        err instanceof Error ? err.message : err
      );
    })
  );

  const res = NextResponse.json({
    ok: true,
    email,
    home,
    isAdmin: admin,
  });
  res.cookies.set(PARTNER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PARTNER_SESSION_MAX_AGE_SEC,
  });
  return res;
}
