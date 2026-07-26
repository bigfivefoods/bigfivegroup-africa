import type { Metadata } from "next";
import { siteSocialImages } from "../../lib/site";

const social = siteSocialImages("connect");

export const metadata: Metadata = {
  title: "SAM · SupplierAdvisor Messenger",
  description:
    "SAM (SupplierAdvisor Messenger) — Grok-powered in-app intelligence for ethical commerce. How-to, trade guidance and ops answers inside Big Five Connect / SupplierAdvisor®.",
  openGraph: {
    title: "SAM | SupplierAdvisor Messenger · Big Five Connect",
    description:
      "Always-on ops co-pilot for verified trade. Open SupplierAdvisor® to meet SAM.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function SamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
