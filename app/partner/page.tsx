import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PARTNER_COOKIE, verifyPartnerToken } from "../lib/partner-auth";
import { partnerHomePath } from "../lib/partners";

export const dynamic = "force-dynamic";

/**
 * /partner → send each signed-in email to their organisation page.
 */
export default async function PartnerPortalIndexPage() {
  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (!session) {
    redirect("/partner/login?from=/partner");
  }

  redirect(partnerHomePath(session.email));
}
