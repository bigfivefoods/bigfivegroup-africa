import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access",
  description:
    "Big Five Access unlocks government funding, institutional partnerships, and policy support for verified African enterprises.",
  openGraph: {
    title: "Big Five Access | Government & Institutional Capital",
    description:
      "Unlock tenders, DFI capital, and public-private partnerships with verified, on-chain delivery.",
  },
};

export default function AccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
