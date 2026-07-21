import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../lib/partner-auth";
import {
  canAccessPartnerPage,
  getPartnerBySlug,
  getPartnerDirectoryEntries,
  isPartnerAdmin,
  partnerHomePath,
  toClientPartner,
} from "../../lib/partners";
import PartnerPortalClient from "../PartnerPortalClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function PartnerSlugPage({ params }: Props) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  const jar = await cookies();
  const token = jar.get(PARTNER_COOKIE)?.value;
  const session = await verifyPartnerToken(token);
  if (!session) {
    redirect(`/partner/login?from=/partner/${encodeURIComponent(slug)}`);
  }

  // Hard isolation: each partner email only sees its own /partner/[slug]
  if (!canAccessPartnerPage(session.email, slug)) {
    redirect(partnerHomePath(session.email));
  }

  const admin = isPartnerAdmin(session.email);

  return (
    <PartnerPortalClient
      email={session.email}
      partner={toClientPartner(partner)}
      isAdmin={admin}
      directory={admin ? getPartnerDirectoryEntries() : undefined}
    />
  );
}
