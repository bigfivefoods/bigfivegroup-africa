import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Big Five Leadership — the education arm of the group. Super-Cube® doctoral leadership development, free book, and peer-reviewed research. Programmes at www.super-cube.com.",
  openGraph: {
    title: "Leadership | Big Five Group · Super-Cube®",
    description:
      "World-class leadership development for Africa. Free Super-Cube® book and research — full programmes at super-cube.com.",
  },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
