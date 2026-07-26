import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("connect");

export const metadata: Metadata = {
  title: "Connect · SupplierAdvisor® · SAM",
  description:
    "ERP that ships. Trust that blocks risk. SAM that teaches the chain. Big Five Connect is powered by SupplierAdvisor® — AI trust, SAM messenger, OTIFEF, SHEQ, and on-chain pedigree.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor® · SAM · AI Trust",
    description:
      "One chain. Zero blind spots. SAM (Grok-powered messenger), Live pulse, inventory, SHEQ, and ratings in one supply-chain OS.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
