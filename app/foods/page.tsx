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
import { UtensilsCrossed, ChefHat, Beef, Soup } from "lucide-react";
import { SA_ONBOARDING } from "../lib/saCopy";
import LocalNewsVideo from "../components/LocalNewsVideo";
import FoodsStrategyDeck from "../components/FoodsStrategyDeck";
import CaseStudyNsnp from "../components/CaseStudyNsnp";

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
  {
    name: "SupplierAdvisor®",
    logo: "/foods/supplieradvisor-logo.png",
    desc: "Registered verified ethical company — live trade & transparency",
    href: "https://www.supplieradvisor.com/",
  },
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
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/foods-hero.jpg"
        logo={{
          src: "/bigfivefoods-logo.png",
          alt: "Big Five Foods logo",
          width: 192,
          height: 192,
          className: "brightness-0 invert",
        }}
        eyebrow="PILLAR 02 · FORTIFIED NUTRITION"
        title={
          <>
            Big Five Foods
            <br />
            Nourish a continent
          </>
        }
        subtitle="Fortified porridges, soya, one-pots and soups — certified manufacturing, measurable impact, ordered on SupplierAdvisor®."
        ctas={[
          { href: "#foods-deck", label: "Product deck", primary: true },
          {
            href: "/contact?interest=foods&intent=sample",
            label: "Request sample / quote",
          },
          {
            href: SA_ONBOARDING,
            label: "Order on SupplierAdvisor®",
            external: true,
          },
        ]}
        overlayClassName="bg-black/50"
      />

      <SupplierTrust entityName="Big Five Foods" compact />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs tracking-[2px] text-amber-900 font-semibold mb-1">
              SCHOOLS · INSTITUTIONS · RETAIL
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Request a sample pack or volume quote
            </h2>
            <p className="text-sm text-[#525252] mt-1 leading-relaxed">
              Fortified porridges and soya minces for NSNP-aligned and institutional menus — tell us
              volumes, region and pack format.
            </p>
          </div>
          <a
            href="/contact?interest=foods&intent=sample"
            className="premium-button shrink-0 inline-flex items-center justify-center gap-2 bg-amber-800 text-white px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
          >
            Sample / quote enquiry
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <StatRow
          accent={ACCENT}
          stats={[
            { value: "2.5m", label: "Children / day NSNP plan (landed)" },
            { value: "150k", label: "Meals delivered to date" },
            { value: "83%", label: "Cheaper than alternatives" },
            { value: "74%", label: "More nutrition" },
          ]}
        />
        <p className="mt-5 text-center text-[11px] sm:text-xs text-[#737373] max-w-2xl mx-auto leading-relaxed">
          Big Five Foods has landed the NSNP programme with DBE — planned to feed 2.5 million children
          per day (plan scale as delivery ramps, not current daily headcount). Historic meals delivered
          are programme-reported. Cost and nutrition comparisons are internal analyses — request the
          latest brief when you enquire.{" "}
          <a href="/contact?interest=foods" className="underline underline-offset-2 text-black font-medium">
            Partner with Foods
          </a>
        </p>
      </section>

      <div className="bg-white border-y border-black/10">
        <CaseStudyNsnp />
      </div>

      <LocalNewsVideo accent={ACCENT} />

      <section className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
        <FoodsStrategyDeck />
      </section>

      <section id="products" className="bg-[#fafafa] border-b border-black/10 py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PRODUCT RANGES"
            title="Nutrition people actually eat"
            subtitle="Designed for households, schools, catering, and institutional feeding — affordable, fortified, proudly African."
          />
          <div className="space-y-6 sm:space-y-10">
            {productCategories.map((cat) => (
              <article
                key={cat.title}
                className="rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-[#fafafa] overflow-hidden min-w-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-center min-w-0">
                    <cat.icon className="w-9 h-9 sm:w-10 sm:h-10 text-[#d97706] mb-4" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-[#525252] text-sm sm:text-base mb-3">{cat.description}</p>
                    <div className="text-sm font-semibold text-[#92400e] mb-4">{cat.stats}</div>
                    <p className="text-[#404040] text-sm sm:text-base leading-relaxed">{cat.benefits}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4 md:p-6 bg-white min-w-0">
                    {cat.images.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 bg-[#f8f7f5]"
                      >
                        <Image
                          src={src}
                          alt={cat.title}
                          fill
                          className="object-contain p-1.5 sm:p-2 md:p-3"
                          sizes="(max-width:768px) 45vw, 22vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="CERTIFICATIONS" title="Quality the market can audit" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {capabilities.map((c) => {
            const cardClass =
              "bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:border-black/20 transition-colors min-w-0 h-full flex flex-col";
            const inner = (
              <>
                <div className="relative h-12 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={120}
                    height={64}
                    className="object-contain max-h-12 sm:max-h-16 w-auto max-w-full"
                  />
                </div>
                <div className="font-semibold text-black text-xs sm:text-sm mb-1">{c.name}</div>
                <div className="text-[11px] sm:text-xs text-[#525252] leading-snug flex-1">
                  {c.desc}
                </div>
              </>
            );
            if ("href" in c && c.href) {
              return (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                >
                  {inner}
                </a>
              );
            }
            return (
              <div key={c.name} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <FinalCta
        eyebrow="FEED WITH PURPOSE"
        title="Stock nutrition that scales"
        subtitle="Schools, governments, retailers and CSI partners — order fortified ranges on SupplierAdvisor®, or talk to us about institutional supply."
        primary={{
          href: SA_ONBOARDING,
          label: "Order on SupplierAdvisor®",
          external: true,
        }}
        secondary={{
          href: "/contact?interest=foods",
          label: "Book a Foods briefing",
        }}
      />
    </div>
  );
}
