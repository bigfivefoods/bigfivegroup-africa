import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../../lib/site";

export const metadata: Metadata = {
  title: "SAM · SupplierAdvisor Messenger",
  description:
    "SAM (SupplierAdvisor Messenger) — Grok-powered in-app intelligence for ethical commerce. How-to, trade guidance and ops answers inside Big Five Connect / SupplierAdvisor®.",
  openGraph: {
    title: "SAM | SupplierAdvisor Messenger · Big Five Connect",
    description:
      "Always-on ops co-pilot for verified trade. Open SupplierAdvisor® to meet SAM.",
    images: [SITE_OG_IMAGE],
  },
};

export default function SamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
