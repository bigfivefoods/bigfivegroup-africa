import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Footprint",
  description:
    "Big Five Group active operations in South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe, Lesotho, Germany and Hungary — with expansion ambition across Africa and the world.",
  openGraph: {
    title: "Global | Where We Work & Where We're Going",
    description:
      "Eleven active nations today across Africa and Europe. A clear roadmap to reach further — with African standards.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
