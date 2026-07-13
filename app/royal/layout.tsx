import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal · Partnership with the Royal Family",
  description:
    "Big Five Group partners with the royal family to serve communities with dignity, Ubuntu, and lasting impact — rooted in KwaZulu-Natal and carried across Africa.",
  openGraph: {
    title: "Royal | Big Five Group & the Royal Family",
    description:
      "In partnership with the royal family, we are here to serve our communities — with respect, integrity, and shared purpose.",
  },
};

export default function RoyalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
