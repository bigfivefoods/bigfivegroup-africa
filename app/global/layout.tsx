import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Footprint",
  description:
    "Big Five Group active operations in South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe and Lesotho — with expansion ambition across Africa and the world.",
  openGraph: {
    title: "Global | Where We Work & Where We're Going",
    description:
      "Nine active African nations today. A clear roadmap to reach the rest of the continent and the world — with African standards.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
