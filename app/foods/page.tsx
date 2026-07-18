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
import { SA_LOGIN, SA_ONBOARDING } from "../lib/saCopy";
import LocalNewsVideo from "../components/LocalNewsVideo";
import FoodsStrategyDeck from "../components/FoodsStrategyDeck";

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
        logo={{ src: "/bigfivefoods-logo.png", alt: "Big Five Foods logo", width: 192, height: 192 }}
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
          { href: "#foods-deck", label: "View product deck", primary: true },
          { href: "#products", label: "Explore products" },
          {
            href: SA_ONBOARDING,
            label: "Start free trial",
            external: true,
          },
          {
            href: SA_LOGIN,
            label: "Existing user? Log in",
            external: true,
          },
        ]}
        overlayClassName="bg-black/50"
      />

      <SupplierTrust entityName="Big Five Foods" compact />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StatRow
          accent={ACCENT}
          stats={[
            { value: "150k", label: "Meals delivered" },
            { value: "100k", label: "Children reached" },
            { value: "83%", label: "Cheaper than alternatives" },
            { value: "74%", label: "More nutrition" },
          ]}
        />
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

      <section className="bg-[#78350f] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-12 h-12 text-[#fcd34d] mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Professional manufacturing. Ethical commerce.
          </h3>
          <p className="text-white/75 text-lg">
            Big Five Foods is built for institutions that need reliable nutrition partners — with
            certifications on the factory floor and verification on{" "}
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              SupplierAdvisor®
            </a>
            .{" "}
            <a
              href={SA_LOGIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              Existing users log in here
            </a>
            .
          </p>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Foods" />

      <FinalCta
        eyebrow="FEED WITH PURPOSE"
        title="Partner with Big Five Foods"
        subtitle="Schools, governments, retailers, and distributors — let's nourish Africa with integrity. Existing company users can log in to SupplierAdvisor®."
        primary={{ href: SA_ONBOARDING, label: "Start free trial", external: true }}
        secondary={{
          href: SA_LOGIN,
          label: "Log in to SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
