import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("access");

export const metadata: Metadata = {
  title: "Access",
  description:
    "Big Five Access unlocks government funding, institutional partnerships, and policy support for verified African enterprises.",
  openGraph: {
    title: "Big Five Access | Government & Institutional Capital",
    description:
      "Unlock tenders, DFI capital, and public-private partnerships with verified, on-chain delivery.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function AccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
