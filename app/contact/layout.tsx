import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Book a briefing",
  description:
    "Partner with Big Five Group Africa — enquire about Foods programmes, Super-Cube® leadership, Foundation, Connect, or a strategic briefing. KwaZulu-Natal · continent-wide.",
  openGraph: {
    title: "Contact Big Five Group Africa",
    description:
      "Book a strategic briefing or enquire about nutrition, leadership, philanthropy, and ethical commerce.",
    url: "/contact",
    images: [
      { url: "/home-hero.jpg", width: 1200, height: 630, alt: "Big Five Group Africa" },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/home-hero.jpg"] },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
