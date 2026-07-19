import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foods · Fortified nutrition & NSNP pathway",
  description:
    "Big Five Foods — fortified porridges, soya mince, one-pot meals and soups. Approved on South Africa’s National School Nutrition Programme (NSNP) pathway with a 2.5 million children/day delivery ambition. Shareable product deck.",
  openGraph: {
    title: "Big Five Foods | Fortified African Nutrition · NSNP",
    description:
      "High-nutrition African staples for schools and institutions. 2.5m children/day ambition on the DBE National School Nutrition Programme pathway.",
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
        text: "Big Five Foods has been approved under the National School Nutrition Programme (NSNP), overseen by the Department of Basic Education, to supply fortified porridges and soya minces for daily school nutrition pathways. Official programme information: https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx",
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
