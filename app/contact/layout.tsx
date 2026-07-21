import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact · Book a briefing",
  description:
    "Partner with Big Five Group Africa — enquire about Foods programmes, Super-Cube® leadership, Foundation, Connect, or a strategic briefing. KwaZulu-Natal · continent-wide.",
  openGraph: {
    title: "Contact Big Five Group Africa",
    description:
      "Book a strategic briefing or enquire about nutrition, leadership, philanthropy, and ethical commerce.",
    url: "/contact",
    images: [SITE_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [SITE_OG_IMAGE.url] },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
