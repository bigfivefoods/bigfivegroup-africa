import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://bigfivegroup.africa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Big Five Group Africa | Regenerative. Sovereign. Ethical.",
    template: "%s | Big Five Group Africa",
  },
  description:
    "Building Africa's future with integrity, transparency, and measurable impact. Nine pillars spanning regenerative agriculture, fortified nutrition, project delivery, ethical commerce on SupplierAdvisor®, and Super-Cube® leadership.",
  keywords: [
    "Big Five Group",
    "Africa",
    "regenerative agriculture",
    "SupplierAdvisor",
    "Super-Cube leadership",
    "Big Five Foods",
    "ethical supply chain",
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
    title: "Big Five Group Africa | One Group. Nine Pillars. Infinite Impact.",
    description:
      "Regenerative. Sovereign. Ethical. Building Africa's future with integrity, transparency, and measurable impact.",
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
      "Regenerative. Sovereign. Ethical. Eight pillars building Africa's future.",
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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased [--navbar-height:5rem]`}>
        <Navbar />
        <main className="pt-[var(--navbar-height)] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
