import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("agri");

export const metadata: Metadata = {
  title: "Agri",
  description:
    "Big Five Agri — regenerative farming, on-chain traceability, and partnerships with the Zulu Kingdom across Africa.",
  openGraph: {
    title: "Big Five Agri | Regenerative Farming",
    description:
      "Restoring African farmland, empowering farmers, and feeding the continent with verified regenerative produce.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function AgriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
