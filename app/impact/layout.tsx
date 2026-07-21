import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact · Strategic Overview",
  description:
    "Big Five Impact — continental PMO delivery, Director General of Health institutional channel into SA Department of Health and African health pathways, plus strategic briefing deck.",
  openGraph: {
    title: "Big Five Impact | Strategic Overview Deck",
    description:
      "Cross-pillar PMO with Director General of Health helping drive Group products into SA DoH and African health systems. Shareable strategic overview.",
    url: "https://bigfivegroup.africa/impact#strategy-deck",
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
