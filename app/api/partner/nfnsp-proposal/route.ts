import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../../lib/partner-auth";
import { canAccessPartnerPageAsync } from "../../../lib/partners";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = "BigFive_NFNSP_Implementation_Partnership_Proposal.pdf";

export async function GET(request: Request) {
  const jar = await cookies();
  const session = await verifyPartnerToken(jar.get(PARTNER_COOKIE)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/partner/login?from=/partner/department-of-agriculture", request.url));
  }
  if (!(await canAccessPartnerPageAsync(session.email, "department-of-agriculture"))) {
    return new NextResponse("Not available for this workspace.", { status: 403 });
  }

  try {
    const buf = await readFile(join(process.cwd(), "public", "partners", FILE));
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${FILE}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new NextResponse("Proposal PDF is not available yet.", { status: 404 });
  }
}
