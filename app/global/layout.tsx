import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Footprint",
  description:
    "Big Five Group is building distribution and route-to-market strategy across South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe, Lesotho, Germany, Hungary and Georgia (Europe) — with expansion ambition across Africa and the world.",
  openGraph: {
    title: "Global | Distribution & Route to Market",
    description:
      "Twelve priority nations across Africa and Europe — including Germany, Hungary, and Georgia — where we are building distribution and route-to-market strategy.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
