import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect · SupplierAdvisor®",
  description:
    "ERP that ships. Trust that blocks risk. Big Five Connect is powered by SupplierAdvisor® — the supply-chain OS for verified trade, OTIFEF, SHEQ, lot traceability, and on-chain pedigree.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor® Supply Chain OS",
    description:
      "One chain. Zero blind spots. Inventory, manufacturing, distribution, SHEQ & food safety, finance, and ratings in one light workspace.",
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
