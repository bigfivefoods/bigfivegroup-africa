import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agri",
  description:
    "Big Five Agri — regenerative farming, on-chain traceability, and partnerships with the Zulu Kingdom across Africa.",
  openGraph: {
    title: "Big Five Agri | Regenerative Farming",
    description:
      "Restoring African farmland, empowering farmers, and feeding the continent with verified regenerative produce.",
  },
};

export default function AgriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
