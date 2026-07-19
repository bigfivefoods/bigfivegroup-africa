import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const siteUrl = "https://bigfivegroup.africa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Big Five Group Africa | Regenerative. Sovereign. Ethical.",
    template: "%s | Big Five Group Africa",
  },
  description:
    "Building Africa's future with integrity, transparency, and measurable impact. Ten pillars spanning regenerative agriculture, fortified nutrition, royal partnership, project delivery, ethical commerce on SupplierAdvisor®, and Super-Cube® leadership.",
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
    title: "Big Five Group Africa | One Group. Ten Pillars. Infinite Impact.",
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
      "Regenerative. Sovereign. Ethical. Ten pillars building Africa's future.",
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
    icon: [{ url: "/favicon.ico" }, { url: "/bigfivefoods-logo.png", type: "image/png" }],
    apple: [{ url: "/bigfivefoods-logo.png", sizes: "180x180", type: "image/png" }],
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fafafa",
  viewportFit: "cover",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Big Five Group Africa",
  legalName: "Big Five Group (Pty) Ltd",
  url: siteUrl,
  logo: `${siteUrl}/super-cube-logo.png`,
  description:
    "Integrated African enterprise: regenerative agriculture, fortified nutrition, Super-Cube® leadership, SupplierAdvisor® commerce, and verified impact.",
  email: "craig@bigfivegroup.africa",
  telephone: "+27-82-581-4215",
  address: {
    "@type": "PostalAddress",
    addressRegion: "KwaZulu-Natal",
    addressCountry: "ZA",
  },
  sameAs: [
    "https://www.supplieradvisor.com",
    "https://www.super-cube.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "partnerships",
    email: "craig@bigfivegroup.africa",
    telephone: "+27-82-581-4215",
    areaServed: "Africa",
    availableLanguage: ["en"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Big Five Group Africa",
  url: siteUrl,
  description:
    "One Group. Ten Pillars. Infinite African Impact — Feed · Educate · Empower.",
  publisher: {
    "@type": "Organization",
    name: "Big Five Group Africa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth overflow-x-clip">
      <body className="min-h-dvh min-w-0 antialiased text-[#171717] [--navbar-height:4.5rem] sm:[--navbar-height:5rem] overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <Navbar />
        <main className="pt-[var(--navbar-height)] min-h-screen min-w-0 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
