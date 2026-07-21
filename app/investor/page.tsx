import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { INVESTOR_COOKIE, verifyInvestorToken } from "../lib/investor-auth";
import InvestorPortalClient from "./InvestorPortalClient";

export const dynamic = "force-dynamic";

export default async function InvestorPortalPage() {
  const jar = await cookies();
  const token = jar.get(INVESTOR_COOKIE)?.value;
  const session = await verifyInvestorToken(token);
  if (!session) {
    redirect("/investor/login?from=/investor");
  }

  return <InvestorPortalClient email={session.email} />;
}
