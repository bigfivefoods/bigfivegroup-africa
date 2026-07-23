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
import { UtensilsCrossed, ChefHat, Beef, Soup, School } from "lucide-react";
import { SA_ONBOARDING } from "../lib/saCopy";
import { NSNP_PRODUCTS } from "../lib/foodsProducts";
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
      { src: "/foods/porridge-chocolate.jpg", alt: "Chocolate porridge" },
      { src: "/foods/porridge-banana.jpg", alt: "Banana porridge" },
      { src: "/foods/porridge-original.jpg", alt: "Original porridge" },
      { src: "/foods/porridge-strawberry.jpg", alt: "Strawberry porridge" },
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
      { src: "/foods/soya-chilli-beef.jpg", alt: "Chilli Beef soya" },
      { src: "/foods/soya-beef-onion.jpg", alt: "Beef & Onion soya" },
      { src: "/foods/soya-beef.jpg", alt: "Rich Beef soya" },
      { src: "/foods/soya-mutton.jpg", alt: "Mutton soya" },
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
      { src: "/foods/onepot-chakalaka.jpg", alt: "Chakalaka one-pot" },
      { src: "/foods/onepot-beef.jpg", alt: "Beef one-pot" },
      { src: "/foods/onepot-chicken.jpg", alt: "Chicken one-pot" },
      { src: "/foods/onepot-chilli-beef.jpg", alt: "Chilli Beef one-pot" },
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
      { src: "/foods/soup-brown-onion.jpg", alt: "Brown Onion soup" },
      { src: "/foods/soup-oxtail.jpg", alt: "Oxtail soup" },
      { src: "/foods/soup-minestrone.jpg", alt: "Minestrone soup" },
      { src: "/foods/soup-chicken.jpg", alt: "Chicken soup" },
    ],
    stats: "From R1.10 per meal · nutrient dense",
    benefits:
      "Vitamins A & C, iron and calcium. Brown Onion, Minestrone, Oxtail, Chicken and more. Supports local maize farmers.",
  },
  {
    title: "NSNP Institutional",
    icon: School,
    description:
      "NSNP-approved 5kg institutional packs for school kitchens and the Department of Basic Education pathway — planned to feed 2.5 million children per day.",
    images: NSNP_PRODUCTS.map((p) => ({ src: p.src, alt: p.name })),
    stats: "NSNP approved · 5kg packs · school feeding ready",
    benefits:
      "Beef Soya Mince 5kg, Enriched Porridge 5kg, and One-Pot Chicken Biryani Mix 5kg — fortified, shelf-stable formats designed for high-volume school menus under the National School Nutrition Programme.",
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
            { value: "~50%", label: "Cheaper vs wholesale & retail" },
            { value: "2.5m", label: "Children / day NSNP plan (DBE)" },
            { value: "150k", label: "Meals delivered (programme-reported)" },
            { value: "74%", label: "More nutrition by design" },
          ]}
        />
        <p className="mt-5 text-center text-[11px] sm:text-xs text-[#737373] max-w-2xl mx-auto leading-relaxed">
          Foods remains ~50% cheaper than wholesale and retail pathways (internal analyses) —
          super-competitive for government and feeding schemes. Pathway to feed{" "}
          <strong className="text-[#404040]">2.5 million children per day</strong> through the
          National School Nutrition Programme (NSNP / DBE). Historic meals are programme-reported.
          Request the latest dated brief when you enquire.{" "}
          <a href="/contact?interest=foods" className="underline underline-offset-2 text-black font-medium">
            Partner with Foods
          </a>
        </p>
      </section>

      <div className="bg-white border-y border-black/10">
        <CaseStudyNsnp />
      </div>

      {/* NSNP-approved institutional SKUs */}
      <section
        id="nsnp-products"
        className="bg-gradient-to-b from-amber-50/80 to-[#fafafa] border-b border-black/10 py-14 sm:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="NSNP · DBE INSTITUTIONAL RANGE"
            title="Three NSNP-approved products for school feeding"
            subtitle="Beef soya mince, enriched porridge and chicken biryani mix — 5kg institutional packs designed for the National School Nutrition Programme pathway (2.5 million children per day plan scale)."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {NSNP_PRODUCTS.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl sm:rounded-3xl border border-amber-200/80 bg-white overflow-hidden shadow-sm flex flex-col min-w-0"
              >
                <div className="relative aspect-square bg-[#f8f7f5] border-b border-black/5">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width:640px) 90vw, 30vw"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-700 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 shadow-sm">
                    <School className="w-3 h-3" />
                    {p.badge}
                  </span>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
                  <div className="text-[10px] tracking-[1.5px] text-amber-900 font-semibold mb-1">
                    {p.pack.toUpperCase()}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black mb-2 text-balance">
                    {p.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">
                    {p.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocalNewsVideo accent={ACCENT} />

      <section className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
        <FoodsStrategyDeck />
      </section>

      <section id="products" className="bg-[#fafafa] border-b border-black/10 py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PRODUCT RANGES"
            title="Nutrition people actually eat"
            subtitle="Five ranges: porridges, soya, one-pots, soups and NSNP institutional 5kg packs — for households, schools and catering."
          />
          <div className="space-y-6 sm:space-y-10">
            {productCategories.map((cat) => (
              <article
                key={cat.title}
                id={cat.title.startsWith("NSNP") ? "nsnp-range" : undefined}
                className={`rounded-2xl sm:rounded-[1.75rem] border overflow-hidden min-w-0 ${
                  cat.title.startsWith("NSNP")
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-black/10 bg-[#fafafa]"
                }`}
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
                  <div
                    className={`grid gap-2 sm:gap-3 p-3 sm:p-4 md:p-6 bg-white min-w-0 ${
                      cat.images.length === 3
                        ? "grid-cols-3"
                        : cat.images.length >= 5
                          ? "grid-cols-3"
                          : "grid-cols-2"
                    }`}
                  >
                    {cat.images.map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 bg-[#f8f7f5]"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-contain p-1.5 sm:p-2 md:p-3"
                          sizes="(max-width:768px) 30vw, 18vw"
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
