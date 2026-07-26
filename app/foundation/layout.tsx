import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("foundation");

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "Big Five Foundation — registered NPO, registered on SupplierAdvisor®, driving transparent social, economic and environmental impact across Africa.",
  openGraph: {
    title: "Big Five Foundation | Registered on SupplierAdvisor®",
    description:
      "Transparent philanthropy with measurable outcomes — Big Five Foundation is registered on SupplierAdvisor® and aligned to the UN Sustainable Development Goals.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
