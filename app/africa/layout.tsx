import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("africa");

export const metadata: Metadata = {
  title: "Africa",
  description:
    "Big Five Group's footprint across all 54 African nations — deep local roots and continental ambition.",
  openGraph: {
    title: "Africa | Big Five Group Footprint",
    description:
      "From KwaZulu-Natal to the continent — explore Big Five Group's African presence and partnerships.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function AfricaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
