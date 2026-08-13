"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import {
  ArrowRight,
  UtensilsCrossed,
  ChefHat,
  Beef,
  Soup,
  School,
  ShieldCheck,
  Package,
} from "lucide-react";
import { NSNP_PRODUCTS } from "../lib/foodsProducts";
import { saFoodsOnboardUrl, saFoodsOrderUrl } from "../lib/saStorefront";
import LocalNewsVideo from "../components/LocalNewsVideo";
import FoodsStrategyDeck from "../components/FoodsStrategyDeck";
import CaseStudyNsnp from "../components/CaseStudyNsnp";
import CaseStudyPdfLayer from "../components/case-study/CaseStudyPdfLayer";
import FoodsSalesPortal from "../components/FoodsSalesPortal";
import PillarAlignmentBand from "../components/PillarAlignmentBand";
import { pageBrand } from "../lib/pageBrand";

const ACCENT = "#d97706";
const ACCENT_DARK = "#b45309";
const ACCENT_SOFT = "#fffbeb";

const productCategories = [
  {
    id: "porridges",
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
    highlight: "Breakfast that builds — not empty cereal calories",
  },
  {
    id: "soya",
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
    highlight: "Protein that stretches every pot",
  },
  {
    id: "onepots",
    title: "One-Pot Meals",
    icon: ChefHat,
    description: "Ready-to-cook complete meals with balanced nutrition",
    images: [
      { src: "/foods/onepot-chakalaka.jpg", alt: "Chakalaka one-pot" },
      { src: "/foods/onepot-beef.jpg", alt: "Beef one-pot" },
      { src: "/foods/onepot-chicken.jpg", alt: "Chicken one-pot" },
      { src: "/foods/onepot-chilli-beef.jpg", alt: "Chilli Beef one-pot" },
    ],
    stats: "1kg → 4kg prepared · 20 × 200g servings · from ±R2.50 / meal",
    benefits:
      "Protein, vitamins A & D, iron and calcium. Authentic African flavours. Cooked in ~20 minutes. A 1kg pack makes 4kg of food when prepared — 20 × 200g plates. Locally sourced.",
    highlight: "A complete plate in one pack",
  },
  {
    id: "soups",
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
    highlight: "Warmth and micronutrients at the lowest cost point",
  },
  {
    id: "nsnp-range",
    title: "NSNP Institutional",
    icon: School,
    description:
      "NSNP-approved 5kg institutional packs for school kitchens and the Department of Basic Education pathway — planned to feed 2.5 million children per day.",
    images: NSNP_PRODUCTS.map((p) => ({ src: p.src, alt: p.name })),
    stats: "NSNP approved · 5kg packs · school feeding ready",
    benefits:
      "Beef Soya Mince 5kg, Enriched Porridge 5kg, and One-Pot Chicken Biryani Mix 5kg — fortified, shelf-stable formats designed for high-volume school menus under the National School Nutrition Programme.",
    highlight: "Institutional packs for the NSNP pathway",
    nsnp: true,
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
      <CaseStudyPdfLayer />
      <PageHero
        image="/foods-hero.jpg"
        logo={{
          src: "/bigfivefoods-logo.png",
          alt: "Big Five Foods logo",
          width: 192,
          height: 192,
          className: "brightness-0 invert",
        }}
        eyebrow="PILLAR 02 · FORTIFIED NUTRITION · FEED"
        title="Nourish the Continent"
        subtitle="Fortified porridges, soya, one-pots and soups — certified manufacturing, transparent commercial terms, ordered on SupplierAdvisor® as system of record."
        ctas={[
          { href: "#shop", label: "Shop & order", primary: true },
          { href: "#how-to-buy", label: "How to buy" },
          {
            href: saFoodsOrderUrl(),
            label: "Order on SupplierAdvisor®",
            external: true,
          },
        ]}
        overlayClassName={pageBrand.foods.overlay}
      />

      {/* ─── 1. PRODUCT RANGES (first after hero) ─── */}
      <section
        id="products"
        className="relative bg-white border-b border-black/10 py-14 sm:py-18 md:py-24"
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, #f59e0b, #fbbf24)`,
          }}
          aria-hidden
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl min-w-0">
              <div
                className="text-[10px] sm:text-xs tracking-[2.5px] font-semibold uppercase mb-3"
                style={{ color: ACCENT_DARK }}
              >
                Product ranges
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black text-balance leading-[1.05]">
                Nutrition that actually tastes great
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed">
                Five ranges: porridges, soya, one-pots, soups and NSNP institutional 5kg packs —
                for households, schools and catering.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <a
                href="#shop"
                className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-semibold"
              >
                Sales portal
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#foods-deck"
                className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 py-3 rounded-full text-sm font-semibold hover:bg-black/[0.03]"
              >
                Product deck
              </a>
            </div>
          </div>

          {/* Range jump chips */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 pb-1">
            {productCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#range-${cat.id}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition-colors hover:bg-white ${
                  cat.nsnp
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-black/10 bg-[#fafafa] text-[#404040] hover:border-amber-300/60"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" style={{ color: cat.nsnp ? "#047857" : ACCENT }} />
                {cat.title}
              </a>
            ))}
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {productCategories.map((cat, index) => {
              const reverse = index % 2 === 1;
              return (
                <article
                  key={cat.id}
                  id={`range-${cat.id}`}
                  className={`group scroll-mt-28 rounded-2xl sm:rounded-[1.75rem] border overflow-hidden min-w-0 shadow-sm transition-shadow hover:shadow-md ${
                    cat.nsnp
                      ? "border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-white to-white"
                      : "border-black/8 bg-[#fafafa]"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: cat.nsnp ? "#d1fae5" : ACCENT_SOFT,
                            color: cat.nsnp ? "#047857" : ACCENT_DARK,
                          }}
                        >
                          <cat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-[10px] tracking-[1.5px] font-semibold uppercase"
                            style={{ color: cat.nsnp ? "#047857" : ACCENT_DARK }}
                          >
                            Range 0{index + 1}
                            {cat.nsnp ? " · NSNP" : ""}
                          </div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black leading-tight">
                            {cat.title}
                          </h3>
                        </div>
                      </div>
                      <p
                        className="text-sm sm:text-base font-medium mb-2 leading-snug"
                        style={{ color: cat.nsnp ? "#065f46" : ACCENT_DARK }}
                      >
                        {cat.highlight}
                      </p>
                      <p className="text-[#525252] text-sm sm:text-base mb-3 leading-relaxed">
                        {cat.description}
                      </p>
                      <div
                        className="inline-flex self-start text-xs sm:text-sm font-semibold rounded-full px-3 py-1.5 mb-4 border"
                        style={{
                          color: cat.nsnp ? "#065f46" : "#92400e",
                          backgroundColor: cat.nsnp ? "#ecfdf5" : ACCENT_SOFT,
                          borderColor: cat.nsnp ? "#a7f3d0" : "#fde68a",
                        }}
                      >
                        {cat.stats}
                      </div>
                      <p className="text-[#404040] text-sm sm:text-base leading-relaxed">
                        {cat.benefits}
                      </p>
                      {cat.nsnp && (
                        <Link
                          href="#nsnp-products"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline"
                        >
                          View 5kg institutional SKUs
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                    <div
                      className={`grid gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-white min-w-0 ${
                        cat.images.length === 3 ? "grid-cols-3" : "grid-cols-2"
                      }`}
                    >
                      {cat.images.map((img) => (
                        <div
                          key={img.src}
                          className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 bg-gradient-to-b from-[#faf9f7] to-[#f3f1ed] transition-transform duration-300 group-hover:scale-[1.01]"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain p-1.5 sm:p-2 md:p-3"
                            sizes="(max-width:768px) 40vw, 20vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-white p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-black tracking-tight">
                  Ready to stock or pilot?
                </p>
                <p className="text-sm text-[#525252] mt-0.5 leading-relaxed">
                  Tell us volumes, region and pack format — schools, institutions, retail or CSI.
                </p>
              </div>
            </div>
            <a
              href="/contact?interest=foods&intent=sample"
              className="premium-button shrink-0 inline-flex items-center justify-center gap-2 bg-amber-800 text-white px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
            >
              Sample / quote enquiry
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sales portal — order via SupplierAdvisor® (system of record) */}
      <FoodsSalesPortal />

      <SupplierTrust entityName="Big Five Foods" compact />

      <PillarAlignmentBand slug="foods" accent={ACCENT} accentSoft={ACCENT_SOFT} />

      {/* Proof */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div
            className="text-[10px] sm:text-xs tracking-[2.5px] font-semibold uppercase mb-2"
            style={{ color: ACCENT_DARK }}
          >
            Proof partners put in briefs
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance">
            Scale, cost and nutrition — in one glance
          </h2>
        </div>
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
          <a
            href="/contact?interest=foods"
            className="underline underline-offset-2 text-black font-medium"
          >
            Partner with Foods
          </a>
        </p>
      </section>

      <div className="bg-white border-y border-black/10">
        <CaseStudyNsnp />
      </div>

      {/* NSNP 5kg SKU deep-dive */}
      <section
        id="nsnp-products"
        className="bg-gradient-to-b from-emerald-50/60 via-amber-50/40 to-[#fafafa] border-b border-black/10 py-14 sm:py-20"
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
                className="rounded-2xl sm:rounded-3xl border border-emerald-200/70 bg-white overflow-hidden shadow-sm flex flex-col min-w-0 hover:shadow-md transition-shadow"
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <SectionHeading
            eyebrow="CERTIFICATIONS"
            title="Quality the market can audit"
            subtitle="Standards partners and procurement teams recognise — not claims without evidence."
          />
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#737373] shrink-0 pb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Verified pathways
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {capabilities.map((c) => {
            const cardClass =
              "bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:border-amber-300/50 hover:shadow-md transition-all min-w-0 h-full flex flex-col";
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
                  className={`${cardClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
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

      <section className="bg-white border-y border-black/10 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FROM FARM TO FORK"
            title="How Foods works"
            subtitle="Source, fortify, certify and deliver — with provenance partners can trust."
          />
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

      <section
        id="foods-deck"
        className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24 scroll-mt-24"
      >
        <FoodsStrategyDeck />
      </section>

      <FinalCta
        eyebrow="FEED WITH PURPOSE"
        title="Stock nutrition that scales"
        subtitle="Browse the sales portal, then complete trade on SupplierAdvisor® — where Big Five Foods is the verified seller of record."
        primary={{
          href: saFoodsOrderUrl(),
          label: "Order on SupplierAdvisor®",
          external: true,
        }}
        secondary={{
          href: saFoodsOnboardUrl(),
          label: "Register on SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
