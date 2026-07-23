import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Connect · SupplierAdvisor® · SAM",
  description:
    "ERP that ships. Trust that blocks risk. SAM that teaches the chain. Big Five Connect is powered by SupplierAdvisor® — AI trust, SAM messenger, OTIFEF, SHEQ, and on-chain pedigree.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor® · SAM · AI Trust",
    description:
      "One chain. Zero blind spots. SAM (Grok-powered messenger), Live pulse, inventory, SHEQ, and ratings in one supply-chain OS.",
    images: [SITE_OG_IMAGE],
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
