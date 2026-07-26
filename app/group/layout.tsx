import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("group");

export const metadata: Metadata = {
  title: "The Group · Ten Pillars",
  description:
    "Overview of Big Five Group’s ten pillars — how Agri, Foods, Direct, Access, Connect, Leadership, Foundation, Impact, Global and Royal work as one system to feed, educate and empower Africa.",
  openGraph: {
    title: "The Group | Ten Pillars of Big Five",
    description:
      "One group. Ten pillars. How every business supports our vision, mission and values — regenerative, ethical, and built for African prosperity.",
    url: "/group",
    images: social.openGraph.images,
  },
  twitter: { card: "summary_large_image", images: social.twitter.images },
  alternates: { canonical: "/group" },
};

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
