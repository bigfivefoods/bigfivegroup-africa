import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("agri");

export const metadata: Metadata = {
  title: "Agri",
  description:
    "Big Five Agri — regenerative farming with rural farmers across Africa: soil restoration, training, fair markets and verified provenance.",
  openGraph: {
    title: "Big Five Agri | Rural Farmers · Regenerative Farming",
    description:
      "Working with rural farmers to restore African farmland, raise livelihoods and feed the continent with verified regenerative produce.",
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
