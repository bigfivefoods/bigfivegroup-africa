import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal · Zulu Kingdom",
  description:
    "Big Five Group stands with the Zulu Kingdom — honouring the late King Goodwill Zwelithini, the Goodwill Foundation, 720 Tribal Authorities, and Nguni ethics of Ubuntu.",
  openGraph: {
    title: "Royal | Big Five Group & the Zulu Kingdom",
    description:
      "We do not build on the Kingdom. We build for the Kingdom — with deepest respect and service.",
  },
};

export default function RoyalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
