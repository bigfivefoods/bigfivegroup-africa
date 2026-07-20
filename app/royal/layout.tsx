import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal · Planned Partnership with the Royal Family & Tribal Authorities",
  description:
    "Big Five Group is planning to partner with the royal family and tribal authorities to serve communities with dignity, Ubuntu, and lasting impact — rooted in KwaZulu-Natal and carried across Africa.",
  openGraph: {
    title: "Royal | Big Five Group — Planned Partnership",
    description:
      "We are planning to partner with the royal family and tribal authorities to serve our communities — with respect, integrity, and shared purpose.",
  },
};

export default function RoyalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
