import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Africa",
  description:
    "Big Five Group's footprint across all 54 African nations — deep local roots and continental ambition.",
  openGraph: {
    title: "Africa | Big Five Group Footprint",
    description:
      "From KwaZulu-Natal to the continent — explore Big Five Group's African presence and partnerships.",
  },
};

export default function AfricaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
