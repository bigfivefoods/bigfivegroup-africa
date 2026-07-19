import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership · Super-Cube® programmes",
  description:
    "Big Five Leadership — Super-Cube® doctoral leadership development for executives, public servants and emerging leaders. Cohorts, free book, and peer-reviewed research.",
  openGraph: {
    title: "Leadership | Big Five Group · Super-Cube®",
    description:
      "Whole-person, Africa-centric leadership formation. Super-Cube® six constructs · you at the centre · 70–76% developable.",
    url: "/leadership",
    images: [
      {
        url: "/leadership-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Big Five Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/leadership-hero.jpg"],
  },
  alternates: { canonical: "/leadership" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Super-Cube® Leadership Model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A multidimensional, human-centric leadership framework by Dr. Craig Ross Muller (DBA, UKZN, 2020) with six constructs — Choices, Principles, Mental, Emotional, Physical, Spiritual — and the individual at the centre.",
      },
    },
    {
      "@type": "Question",
      name: "Who are Super-Cube® programmes for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Executives and founders, governments and public servants, youth and emerging leaders, and institutions seeking Africa-centric, whole-person leadership capacity.",
      },
    },
    {
      "@type": "Question",
      name: "How do I start a Leadership programme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a briefing at bigfivegroup.africa/contact?interest=leadership or explore super-cube.com for the model, research and pathways.",
      },
    },
  ],
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
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
