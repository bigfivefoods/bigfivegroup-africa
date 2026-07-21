import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  INVESTOR_COOKIE,
  verifyInvestorToken,
} from "./app/lib/investor-auth";

/**
 * Next.js 16 Proxy — gate /investor/* behind signed investor session cookie.
 * Login + logout APIs stay public.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/investor")) {
    return NextResponse.next();
  }

  // Public: login UI + auth APIs
  if (
    pathname === "/investor/login" ||
    pathname.startsWith("/api/investor/")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(INVESTOR_COOKIE)?.value;
  const session = await verifyInvestorToken(token);

  if (!session) {
    const login = new URL("/investor/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  // Pass email to server components via request header (optional)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-investor-email", session.email);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/investor", "/investor/:path*"],
};
