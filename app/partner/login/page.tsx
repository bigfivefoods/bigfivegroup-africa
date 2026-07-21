import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../lib/partner-auth";
import { partnerHomePath } from "../../lib/partners";
import PartnerLoginForm from "./PartnerLoginForm";

export const dynamic = "force-dynamic";

/**
 * Login gate — already-signed-in users go straight to their organisation workspace.
 */
export default async function PartnerLoginPage() {
  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (session) {
    redirect(partnerHomePath(session.email));
  }

  return (
    <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#052e1c] text-white flex items-center">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <PartnerLoginForm />
      </div>
    </div>
  );
}
