import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("connect");

export const metadata: Metadata = {
  title: "Connect · SupplierAdvisor® · SchoolAdvisor · SAM",
  description:
    "Big Five Connect runs SupplierAdvisor® — DBE × KZN approved products & menus network, plus SchoolAdvisor for NSNP kitchen food-safety compliance (addressing the public school meal safety gap). ERP, SAM, OTIFEF, SHEQ.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor® · SchoolAdvisor",
    description:
      "How SupplierAdvisor® and SchoolAdvisor help DBE govern school nutrition products, menus and kitchen food-safety compliance at scale.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
