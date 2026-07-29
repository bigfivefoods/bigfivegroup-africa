import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("impact");

export const metadata: Metadata = {
  title: "Impact · Proudly African Strategic Overview",
  description:
    "Big Five Impact — proudly African for Africa. Continental PMO delivery; we aspire to work with the Director General of Health in South Africa on institutional pathways into the Department of Health, plus strategic briefing deck.",
  openGraph: {
    title: "Big Five Impact | Proudly African Strategic Overview",
    description:
      "Proudly African for Africa: cross-pillar PMO that aspires to work with the Director General of Health in South Africa to help drive Group products into the Department of Health. Shareable strategic overview.",
    url: "https://bigfivegroup.africa/impact#strategy-deck",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
