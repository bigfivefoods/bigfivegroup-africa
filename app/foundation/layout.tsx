import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "Big Five Foundation — registered NPO driving on-chain social, economic and environmental impact across Africa.",
  openGraph: {
    title: "Big Five Foundation | On-Chain Impact",
    description:
      "Transparent philanthropy with measurable outcomes aligned to the UN Sustainable Development Goals.",
  },
};

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
