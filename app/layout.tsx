import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const siteUrl = "https://bigfivegroup.africa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Big Five Group Africa | ERP that ships. Trust that blocks risk.",
    template: "%s | Big Five Group Africa",
  },
  description:
    "One group. Many companies. Shared discipline. Big Five runs Foods, Direct, Access and more on SupplierAdvisor® — the supply-chain OS for verified trade, OTIFEF ratings, SHEQ, lot traceability, and on-chain pedigree.",
  keywords: [
    "Big Five Group",
    "SupplierAdvisor",
    "supply chain OS",
    "OTIFEF",
    "SHEQ",
    "verified trade",
    "on-chain pedigree",
    "Super-Cube leadership",
    "South Africa",
    "KwaZulu-Natal",
  ],
  authors: [{ name: "Big Five Group (Pty) Ltd" }],
  creator: "Big Five Group Africa",
  publisher: "Big Five Group Africa",
  applicationName: "Big Five Group Africa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "Big Five Group Africa",
    title: "Big Five Group Africa | One group. Many companies. Shared discipline.",
    description:
      "ERP that ships. Trust that blocks risk. Powered by SupplierAdvisor® — verified trade, inventory, manufacturing, distribution, SHEQ & food safety, finance, and on-chain pedigree.",
    images: [
      {
        url: "/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Big Five Group Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Five Group Africa",
    description:
      "One chain. Zero blind spots. Nine pillars on SupplierAdvisor® — the supply-chain operating system.",
    images: ["/home-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth overflow-x-clip">
      <body className="min-h-dvh min-w-0 antialiased text-[#171717] [--navbar-height:4.5rem] sm:[--navbar-height:5rem] overflow-x-clip">
        <Navbar />
        <main className="pt-[var(--navbar-height)] min-h-screen min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
