import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct",
  description:
    "Big Five Direct connects African producers to markets through solar micro-hubs, last-mile logistics, and transparent trade.",
  openGraph: {
    title: "Big Five Direct | Farm Gate to Market Gate",
    description:
      "Eliminate middlemen. Micro-franchise hubs and direct matching that keep more value with producers.",
  },
};

export default function DirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
