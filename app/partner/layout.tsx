import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner portal",
  description:
    "Private partner area for authorised Big Five Group partners — programme briefs, how we work together, and partnership resources.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/partner" },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
