import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Impact · Proudly African Strategic Overview",
  description:
    "Big Five Impact — proudly African for Africa. Continental PMO delivery; working with the Director General of Health on institutional pathways into SA Department of Health and African health systems, plus strategic briefing deck.",
  openGraph: {
    title: "Big Five Impact | Proudly African Strategic Overview",
    description:
      "Proudly African for Africa: cross-pillar PMO working with the Director General of Health to help drive Group products into SA DoH and African health systems. Shareable strategic overview.",
    url: "https://bigfivegroup.africa/impact#strategy-deck",
    images: [SITE_OG_IMAGE],
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
