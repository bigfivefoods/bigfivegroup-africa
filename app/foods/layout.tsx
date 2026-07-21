import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foods · Fortified nutrition & NSNP programme",
  description:
    "Big Five Foods — fortified porridges, soya mince, one-pot meals and soups. NSNP programme landed with South Africa’s Department of Basic Education — planned to feed 2.5 million children per day. Shareable product deck.",
  openGraph: {
    title: "Big Five Foods | Fortified African Nutrition · NSNP",
    description:
      "High-nutrition African staples for schools and institutions. NSNP programme landed with DBE — 2.5m children/day plan scale.",
    url: "/foods",
    images: [
      {
        url: "/foods-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Big Five Foods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/foods-hero.jpg"],
  },
  alternates: { canonical: "/foods" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Big Five Foods supply for school nutrition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fortified porridges and soya minces designed for institutional and school-day feeding at scale, alongside one-pot and soup ranges for households and catering.",
      },
    },
    {
      "@type": "Question",
      name: "Is Big Five Foods linked to South Africa’s National School Nutrition Programme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Big Five Foods has landed the National School Nutrition Programme (NSNP) pathway with the Department of Basic Education — planned to feed 2.5 million children per day with fortified porridges and soya minces (plan scale as delivery ramps). Official programme information: https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx",
      },
    },
    {
      "@type": "Question",
      name: "How can institutions order Big Five Foods products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partners can enquire via bigfivegroup.africa/contact or order through SupplierAdvisor® where programme procurement allows.",
      },
    },
  ],
};

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
