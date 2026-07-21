import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PARTNER_COOKIE, verifyPartnerToken } from "../lib/partner-auth";
import PartnerPortalClient from "./PartnerPortalClient";

export const dynamic = "force-dynamic";

export default async function PartnerPortalPage() {
  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (!session) {
    redirect("/partner/login?from=/partner");
  }

  return <PartnerPortalClient email={session.email} />;
}
