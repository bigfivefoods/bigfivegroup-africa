import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership · Super-Cube®",
  description:
    "Big Five Leadership and the Super-Cube® Doctoral Leadership Model by Dr. Craig R. Muller — programmes, assessment, and research. Full hub at www.super-cube.com.",
  openGraph: {
    title: "Leadership | Super-Cube® Doctoral Model",
    description:
      "Africa-centric, empirically validated leadership development. Visit www.super-cube.com for programmes and cohorts.",
  },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
