import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Big Five Leadership — Super-Cube® doctoral model for ethical, sovereign decision-making across Africa.",
  openGraph: {
    title: "Big Five Leadership | Super-Cube®",
    description:
      "World-class leadership development rooted in Dr. Craig R. Muller's Super-Cube® doctoral model.",
  },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
