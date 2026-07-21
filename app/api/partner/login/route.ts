import { NextResponse } from "next/server";
import {
  createPartnerToken,
  hasPartnerAuthConfigured,
  PARTNER_COOKIE,
  PARTNER_SESSION_MAX_AGE_SEC,
  isPartnerEmailAllowed,
} from "../../../lib/partner-auth";
import {
  isPartnerAdmin,
  resolvePostLoginPath,
} from "../../../lib/partners";

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

  if (!isPartnerEmailAllowed(email)) {
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

  const home = resolvePostLoginPath(email, body.from);
  const admin = isPartnerAdmin(email);

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
