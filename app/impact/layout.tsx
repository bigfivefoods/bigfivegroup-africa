import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact · Strategic Overview",
  description:
    "Big Five Impact — continental PMO delivery plus an online strategic briefing: African challenges with credible sources, how Big Five responds, and why partners work with us.",
  openGraph: {
    title: "Big Five Impact | Strategic Overview Deck",
    description:
      "Shareable online pitch: group overview, Africa challenges (SOFI/GRFC), Feed·Educate·Empower response, and partnership case.",
    url: "https://bigfivegroup.africa/impact#strategy-deck",
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
