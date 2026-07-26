import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("impact");

export const metadata: Metadata = {
  title: "Impact · Proudly African Strategic Overview",
  description:
    "Big Five Impact — proudly African for Africa. Continental PMO delivery; working with the Director General of Health on institutional pathways into SA Department of Health and African health systems, plus strategic briefing deck.",
  openGraph: {
    title: "Big Five Impact | Proudly African Strategic Overview",
    description:
      "Proudly African for Africa: cross-pillar PMO working with the Director General of Health to help drive Group products into SA DoH and African health systems. Shareable strategic overview.",
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
