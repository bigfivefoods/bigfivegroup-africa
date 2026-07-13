import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global",
  description:
    "Big Five Global — international partnerships exporting African excellence, regenerative commerce, and Super-Cube® leadership.",
  openGraph: {
    title: "Global | Big Five Group",
    description:
      "Africa rising on the world stage through strategic partnerships and ethical African business standards.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
