import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("global");

export const metadata: Metadata = {
  title: "Global Footprint",
  description:
    "Big Five Group is building distribution and route-to-market strategy across South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe, Lesotho, Germany, Hungary and Georgia (Europe) — with expansion ambition across Africa and the world.",
  openGraph: {
    title: "Global | Distribution & Route to Market",
    description:
      "Twelve priority nations across Africa and Europe — including Germany, Hungary, and Georgia — where we are building distribution and route-to-market strategy.",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
