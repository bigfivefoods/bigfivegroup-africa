import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("contact");

export const metadata: Metadata = {
  title: "Contact · Book a briefing",
  description:
    "Partner with Big Five Group Africa — enquire about Foods programmes, Super-Cube® leadership, Foundation, Connect, or a strategic briefing. KwaZulu-Natal · continent-wide.",
  openGraph: {
    title: "Contact Big Five Group Africa",
    description:
      "Book a strategic briefing or enquire about nutrition, leadership, philanthropy, and ethical commerce.",
    url: "/contact",
    images: social.openGraph.images,
  },
  twitter: { card: "summary_large_image", images: social.twitter.images },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
