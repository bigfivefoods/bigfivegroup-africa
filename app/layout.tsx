import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import SkipToContent from "./components/SkipToContent";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "./lib/site";

const siteUrl = SITE_URL;

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
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: SITE_NAME,
    title: "Big Five Group Africa | One Group. Ten Pillars. Infinite Impact.",
    description:
      "Regenerative. Sovereign. Ethical. Building Africa's future with integrity, transparency, and measurable impact.",
    images: [
      {
        url: SITE_OG_IMAGE.url,
        width: SITE_OG_IMAGE.width,
        height: SITE_OG_IMAGE.height,
        alt: SITE_OG_IMAGE.alt,
        type: SITE_OG_IMAGE.type,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Regenerative. Sovereign. Ethical. Ten pillars building Africa's future.",
    images: [SITE_OG_IMAGE.url],
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
    icon: [{ url: "/favicon.ico" }, { url: "/bigfivegroup-logo.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
  logo: `${siteUrl}/bigfivegroup-logo.png`,
  image: `${siteUrl}${SITE_OG_IMAGE.url}`,
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
  name: SITE_NAME,
  url: siteUrl,
  description:
    "One Group. Ten Pillars. Infinite African Impact — Feed · Educate · Empower.",
  image: `${siteUrl}${SITE_OG_IMAGE.url}`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: `${siteUrl}/bigfivegroup-logo.png`,
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
        <SkipToContent />
        <Analytics />
        <Navbar />
        <main
          id="main-content"
          className="pt-[var(--navbar-height)] min-h-[calc(100dvh-var(--navbar-height))] min-w-0 w-full max-w-[100vw] overflow-x-clip"
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
