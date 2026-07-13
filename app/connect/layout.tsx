import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Big Five Connect — SupplierAdvisor® powered ethical blockchain ERP for verified African commerce.",
  openGraph: {
    title: "Big Five Connect | SupplierAdvisor®",
    description:
      "The operating system for ethical African commerce — blockchain verification and AI-powered trust.",
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
