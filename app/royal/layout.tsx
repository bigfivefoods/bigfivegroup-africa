import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("royal");

export const metadata: Metadata = {
  title: "Royal · Close Ties & Planned Partnership with the Royal Family",
  description:
    "Big Five Group has close ties to the royal family, is planning to partner with the royal family and tribal authorities, and supports them and the work they do — serving communities with dignity, Ubuntu, and lasting impact.",
  openGraph: {
    title: "Royal | Big Five Group — Close Ties & Planned Partnership",
    description:
      "Close ties to the royal family. Planning to partner. Supporting them and the work they do — for our communities.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function RoyalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
