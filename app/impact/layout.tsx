import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Big Five Impact — the project management arm delivering cross-pillar programmes and measurable results across the African continent.",
  openGraph: {
    title: "Big Five Impact | Continental Project Delivery",
    description:
      "Professional PMO orchestration across Agri, Foods, Direct, Access, Connect, Leadership and Foundation.",
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
