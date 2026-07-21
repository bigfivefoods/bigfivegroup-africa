import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor portal",
  description: "Private investor materials for authorised Big Five Group partners.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
