import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  INVESTOR_COOKIE,
  verifyInvestorToken,
} from "./app/lib/investor-auth";
import {
  PARTNER_COOKIE,
  verifyPartnerToken,
} from "./app/lib/partner-auth";

/**
 * Next.js 16 Proxy — gate /investor/* and /partner/* behind signed session cookies.
 * Login + logout APIs stay public.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // —— Partner portal ——
  if (pathname.startsWith("/partner")) {
    if (pathname === "/partner/login" || pathname.startsWith("/api/partner/")) {
      return NextResponse.next();
    }
    const token = request.cookies.get(PARTNER_COOKIE)?.value;
    const session = await verifyPartnerToken(token);
    if (!session) {
      const login = new URL("/partner/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-partner-email", session.email);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // —— Investor portal ——
  if (pathname.startsWith("/investor")) {
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

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-investor-email", session.email);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/investor",
    "/investor/:path*",
    "/partner",
    "/partner/:path*",
  ],
};
