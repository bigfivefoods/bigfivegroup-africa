import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "Big Five Foundation — registered NPO, registered on SupplierAdvisor®, driving transparent social, economic and environmental impact across Africa.",
  openGraph: {
    title: "Big Five Foundation | Registered on SupplierAdvisor®",
    description:
      "Transparent philanthropy with measurable outcomes — Big Five Foundation is registered on SupplierAdvisor® and aligned to the UN Sustainable Development Goals.",
  },
};

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
