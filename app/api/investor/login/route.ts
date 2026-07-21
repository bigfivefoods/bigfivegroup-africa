import { NextResponse } from "next/server";
import {
  createInvestorToken,
  hasInvestorAuthConfigured,
  INVESTOR_COOKIE,
  INVESTOR_SESSION_MAX_AGE_SEC,
  isInvestorEmailAllowed,
} from "../../../lib/investor-auth";

export async function POST(request: Request) {
  if (!hasInvestorAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Investor access is not configured yet. Add emails in app/lib/investor-allowlist.ts or set INVESTOR_EMAILS on the server.",
      },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  // Same generic message whether allowed or not (avoid email enumeration)
  if (!isInvestorEmailAllowed(email)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "This email is not authorised for the investor portal. Contact Big Five if you need access.",
      },
      { status: 403 }
    );
  }

  const token = await createInvestorToken(email);
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Could not start a session. Try again or contact Big Five." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(INVESTOR_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: INVESTOR_SESSION_MAX_AGE_SEC,
  });
  return res;
}
