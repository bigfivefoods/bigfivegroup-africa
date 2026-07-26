import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("connect");

export const metadata: Metadata = {
  title: "Connect · SupplierAdvisor® · SAM",
  description:
    "Big Five Connect runs SupplierAdvisor® — including a case study aligning DBE with ~1,800 service providers and ~6,000 KZN schools for approved products, menus and compliance incentives. ERP, SAM, OTIFEF, SHEQ.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor® · DBE × KZN case",
    description:
      "How SupplierAdvisor® aligns the Department of Basic Education with ~1,800 service providers and ~6,000 KZN schools for school nutrition compliance.",
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
