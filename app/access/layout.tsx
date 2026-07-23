import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Access",
  description:
    "Big Five Access unlocks government funding, institutional partnerships, and policy support for verified African enterprises.",
  openGraph: {
    title: "Big Five Access | Government & Institutional Capital",
    description:
      "Unlock tenders, DFI capital, and public-private partnerships with verified, on-chain delivery.",
    images: [SITE_OG_IMAGE],
  },
};

export default function AccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
