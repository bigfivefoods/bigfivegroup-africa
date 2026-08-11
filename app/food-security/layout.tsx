import type { Metadata } from "next";
import { siteSocialImages } from "../lib/site";
import { SOFI } from "../lib/sofi";

const social = siteSocialImages("africa");

export const metadata: Metadata = {
  title: "Food security · Challenges & opportunities · SOFI & SDGs",
  description: `How Big Five Group reads UN ${SOFI.edition} (FAO · IFAD · UNICEF · WFP · WHO) and the SDGs — challenges and opportunities in hunger, healthy diets and child nutrition — and how our pillars answer them with Feed · Educate · Empower.`,
  openGraph: {
    title: "Food security · Challenges & opportunities | Big Five Group",
    description:
      "UN SOFI 2026 and SDG framing for African food security — and how Big Five Group addresses hunger, diet affordability and school nutrition with proof.",
    url: "https://bigfivegroup.africa/food-security",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },
  alternates: { canonical: "/food-security" },
};

export default function FoodSecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
