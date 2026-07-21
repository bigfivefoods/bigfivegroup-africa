import { NextResponse } from "next/server";
import { INVESTOR_COOKIE } from "../../../lib/investor-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(INVESTOR_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
