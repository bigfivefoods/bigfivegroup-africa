import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Direct · SANTACO containers",
  description:
    "Big Five Direct partners with SANTACO to roll out 15,000 containers at taxi ranks and rural communities — Foods supply, Wi‑Fi surveys, marketing revenue and Super-Cube® education. Solar micro-hubs and transparent last-mile.",
  openGraph: {
    title: "Big Five Direct | SANTACO · Farm Gate to Market Gate",
    description:
      "SANTACO partnership: 15,000 containers at taxi ranks — Foods, Wi‑Fi surveys, marketing and Super-Cube® education. Transparent last-mile.",
    images: [SITE_OG_IMAGE],
  },
};

export default function DirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
