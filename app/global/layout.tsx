import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Footprint",
  description:
    "Big Five Group is building distribution and route-to-market strategy across South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe, Lesotho, Germany and Hungary — with expansion ambition across Africa and the world.",
  openGraph: {
    title: "Global | Distribution & Route to Market",
    description:
      "Eleven priority nations across Africa and Europe where we are building distribution and route-to-market strategy — with a clear roadmap to reach further.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
