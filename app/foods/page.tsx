"use client";

import Image from "next/image";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import { UtensilsCrossed, ChefHat, Beef, Soup, ShieldCheck } from "lucide-react";

const ACCENT = "#d97706";

const productCategories = [
  {
    title: "Fortified Porridges",
    icon: UtensilsCrossed,
    description: "High-protein, vitamin-enriched instant porridges for children and families",
    images: [
      "/foods/porridge-chocolate.jpg",
      "/foods/porridge-banana.jpg",
      "/foods/porridge-original.jpg",
      "/foods/porridge-strawberry.jpg",
    ],
    stats: "74% more nutrition · 185% more fortification",
    benefits:
      "Essential minerals, B-vitamins, fibre, calcium, magnesium, phosphorus and iron. Locally grown South African maize. Banana, Strawberry, Chocolate, Original.",
  },
  {
    title: "Soya Mince",
    icon: Beef,
    description: "Plant-based protein mince — affordable and versatile",
    images: [
      "/foods/soya-chilli-beef.jpg",
      "/foods/soya-beef-onion.jpg",
      "/foods/soya-beef.jpg",
      "/foods/soya-mutton.jpg",
    ],
    stats: "From R1.30 per meal · 24.4% more protein",
    benefits:
      "High protein, low cost. Ideal for households, catering and business. Chilli Beef, Rich Beef, Beef & Onion, Mutton.",
  },
  {
    title: "One-Pot Meals",
    icon: ChefHat,
    description: "Ready-to-cook complete meals with balanced nutrition",
    images: [
      "/foods/onepot-chakalaka.jpg",
      "/foods/onepot-beef.jpg",
      "/foods/onepot-chicken.jpg",
      "/foods/onepot-chilli-beef.jpg",
    ],
    stats: "From R2.50 per meal · 24-month shelf life",
    benefits:
      "Protein, vitamins A & D, iron and calcium. Authentic African flavours. Cooked in ~20 minutes. Locally sourced.",
  },
  {
    title: "Soups",
    icon: Soup,
    description: "Fortified instant soup thickeners — classic SA flavours",
    images: [
      "/foods/soup-brown-onion.jpg",
      "/foods/soup-oxtail.jpg",
      "/foods/soup-minestrone.jpg",
      "/foods/soup-chicken.jpg",
    ],
    stats: "From R1.10 per meal · nutrient dense",
    benefits:
      "Vitamins A & C, iron and calcium. Brown Onion, Minestrone, Oxtail, Chicken and more. Supports local maize farmers.",
  },
];

const capabilities = [
  { name: "ISO 9001", logo: "/foods/iso9001.png", desc: "Quality management excellence" },
  { name: "FSSC 22000", logo: "/foods/fssc22000.png", desc: "Global food safety certification" },
  { name: "Sedex", logo: "/foods/sedex.png", desc: "Ethical supply chain standards" },
  { name: "SANHA Halaal", logo: "/foods/halaal-sanha.png", desc: "Halaal compliance" },
  { name: "Kosher", logo: "/foods/kosher.png", desc: "Kosher dietary standards" },
  { name: "SAAFosT", logo: "/foods/saafost.png", desc: "Food science association member" },
  { name: "BUOSD SA", logo: "/foods/buosd-sa.png", desc: "Kosher authority certification" },
];

export default function FoodsPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <PageHero
        image="/foods-hero.jpg"
        eyebrow="PILLAR 02 · FORTIFIED NUTRITION"
        title={
          <>
            Big Five Foods
            <br />
            Nourish a continent
          </>
        }
        subtitle="Fortified staples and ready meals combating malnutrition at scale — certified manufacturing, ethical supply chains, and SupplierAdvisor® verification where commerce runs."
        ctas={[
          { href: "#products", label: "Explore products", primary: true },
          {
            href: "https://www.supplieradvisor.com/",
            label: "Verified on SupplierAdvisor®",
            external: true,
          },
        ]}
        overlayClassName="bg-black/50"
      />

      <SupplierTrust entityName="Big Five Foods" compact />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-10">
          <Image
            src="/bigfivefoods-logo.png"
            alt="Big Five Foods"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>
        <StatRow
          accent={ACCENT}
          stats={[
            { value: "24 mo", label: "Shelf life on key ranges" },
            { value: "73.9%", label: "Superior nutrient retention" },
            { value: "7+", label: "Certifications & memberships" },
            { value: "SA", label: "Locally manufactured" },
          ]}
        />
      </section>

      <section id="products" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="PRODUCT RANGES"
            title="Nutrition people actually eat"
            subtitle="Designed for households, schools, catering, and institutional feeding — affordable, fortified, proudly African."
          />
          <div className="space-y-10">
            {productCategories.map((cat) => (
              <article
                key={cat.title}
                className="rounded-[1.75rem] border border-black/10 bg-[#fafafa] overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <cat.icon className="w-10 h-10 text-amber-600 mb-4" />
                    <h3 className="text-3xl font-semibold tracking-tight text-black mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-[#525252] mb-3">{cat.description}</p>
                    <div className="text-sm font-semibold text-amber-800 mb-4">{cat.stats}</div>
                    <p className="text-[#404040] leading-relaxed">{cat.benefits}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4 sm:p-6 bg-white">
                    {cat.images.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-black/5"
                      >
                        <Image src={src} alt={cat.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="CERTIFICATIONS" title="Quality the market can audit" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {capabilities.map((c) => (
            <div
              key={c.name}
              className="bg-white border border-black/10 rounded-3xl p-6 text-center hover:border-black/20 transition-colors"
            >
              <div className="relative h-16 mb-4 flex items-center justify-center">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={80}
                  height={64}
                  className="object-contain max-h-16"
                />
              </div>
              <div className="font-semibold text-black text-sm mb-1">{c.name}</div>
              <div className="text-xs text-[#525252] leading-snug">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading eyebrow="FROM FARM TO FORK" title="How Foods works" />
          <ProcessSteps
            accent={ACCENT}
            steps={[
              {
                step: "01",
                title: "Source & fortify",
                desc: "Locally grown grains milled and precision-fortified with essential micronutrients.",
              },
              {
                step: "02",
                title: "Certify & package",
                desc: "ISO / FSSC / ethical certifications. Smart packaging with full batch traceability.",
              },
              {
                step: "03",
                title: "Distribute & verify",
                desc: "Institutional and retail channels. Where applicable, trade via SupplierAdvisor® with live order feedback.",
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-amber-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-300 mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Professional manufacturing. Ethical commerce.
          </h3>
          <p className="text-white/75 text-lg">
            Big Five Foods is built for institutions that need reliable nutrition partners — with
            certifications on the factory floor and verification on{" "}
            <a
              href="https://www.supplieradvisor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              SupplierAdvisor®
            </a>
            .
          </p>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Foods" />

      <FinalCta
        eyebrow="FEED WITH PURPOSE"
        title="Partner with Big Five Foods"
        subtitle="Schools, governments, retailers, and distributors — let's nourish Africa with integrity."
        primary={{ href: "/connect", label: "Talk to Foods" }}
        secondary={{
          href: "https://www.supplieradvisor.com/",
          label: "SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
