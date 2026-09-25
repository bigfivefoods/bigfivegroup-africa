import { servePartnerPdf } from "../../../lib/partner-files";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return servePartnerPdf({
    request,
    slug: "zulu-kingdom",
    filename: "zulu-kingdom-hoa-isidlo-sesilo.pdf",
  });
}