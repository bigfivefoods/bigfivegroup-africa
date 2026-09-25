import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PARTNER_COOKIE, verifyPartnerToken } from "./partner-auth";
import { canAccessPartnerPageAsync } from "./partners";

/** Not under public/ — only served after an organisation access check. */
const PARTNER_FILES_DIR = join(process.cwd(), "private", "partner-files");

/**
 * Stream a confidential partner PDF.
 * Signed-out visitors go to login. A session for a different organisation gets 403.
 */
export async function servePartnerPdf(opts: {
  request: Request;
  slug: string;
  filename: string;
}): Promise<NextResponse> {
  const jar = await cookies();
  const session = await verifyPartnerToken(jar.get(PARTNER_COOKIE)?.value);
  if (!session) {
    const login = new URL("/partner/login", opts.request.url);
    login.searchParams.set("from", `/partner/${opts.slug}`);
    return NextResponse.redirect(login);
  }
  if (!(await canAccessPartnerPageAsync(session.email, opts.slug))) {
    return new NextResponse("Not available for this workspace.", { status: 403 });
  }

  try {
    const buf = await readFile(join(PARTNER_FILES_DIR, opts.filename));
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${opts.filename}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new NextResponse("This document is not available yet.", { status: 404 });
  }
}
