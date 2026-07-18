"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Beef,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Heart,
  Maximize2,
  Minimize2,
  Share2,
  ShieldCheck,
  Soup,
  UtensilsCrossed,
  School,
  Building2,
  Store,
  Users,
} from "lucide-react";
import { SA_LOGIN, SA_ONBOARDING, SA_URL } from "../lib/saCopy";

const TOTAL = 14;
const PRINT_ROOT_ID = "foods-deck-print-root";

const PRODUCT_RANGES = [
  {
    title: "Fortified Porridges",
    icon: UtensilsCrossed,
    blurb: "Instant, vitamin-enriched porridges for children and families.",
    stats: "74% more nutrition · 185% more fortification",
    images: [
      { src: "/foods/porridge-chocolate.jpg", name: "Chocolate" },
      { src: "/foods/porridge-banana.jpg", name: "Banana" },
      { src: "/foods/porridge-original.jpg", name: "Original" },
      { src: "/foods/porridge-strawberry.jpg", name: "Strawberry" },
    ],
  },
  {
    title: "Soya Mince",
    icon: Beef,
    blurb: "Plant-based protein mince — affordable, versatile, high protein.",
    stats: "From R1.30 / meal · 24.4% more protein",
    images: [
      { src: "/foods/soya-chilli-beef.jpg", name: "Chilli Beef" },
      { src: "/foods/soya-beef-onion.jpg", name: "Beef & Onion" },
      { src: "/foods/soya-beef.jpg", name: "Rich Beef" },
      { src: "/foods/soya-mutton.jpg", name: "Mutton" },
    ],
  },
  {
    title: "One-Pot Meals",
    icon: ChefHat,
    blurb: "Complete ready-to-cook meals with balanced fortification.",
    stats: "From R2.50 / meal · ~20 min cook · 24-month shelf life",
    images: [
      { src: "/foods/onepot-chakalaka.jpg", name: "Chakalaka" },
      { src: "/foods/onepot-beef.jpg", name: "Beef" },
      { src: "/foods/onepot-chicken.jpg", name: "Chicken" },
      { src: "/foods/onepot-chilli-beef.jpg", name: "Chilli Beef" },
    ],
  },
  {
    title: "Soups",
    icon: Soup,
    blurb: "Fortified instant soup thickeners — classic SA flavours.",
    stats: "From R1.10 / meal · nutrient dense",
    images: [
      { src: "/foods/soup-brown-onion.jpg", name: "Brown Onion" },
      { src: "/foods/soup-oxtail.jpg", name: "Oxtail" },
      { src: "/foods/soup-minestrone.jpg", name: "Minestrone" },
      { src: "/foods/soup-chicken.jpg", name: "Chicken" },
    ],
  },
] as const;

const CERTS = [
  { name: "SupplierAdvisor®", logo: "/foods/supplieradvisor-logo.png", desc: "Verified ethical trade" },
  { name: "ISO 9001", logo: "/foods/iso9001.png", desc: "Quality management" },
  { name: "FSSC 22000", logo: "/foods/fssc22000.png", desc: "Food safety" },
  { name: "Sedex", logo: "/foods/sedex.png", desc: "Ethical supply" },
  { name: "SANHA Halaal", logo: "/foods/halaal-sanha.png", desc: "Halaal certified" },
  { name: "Kosher", logo: "/foods/kosher.png", desc: "Kosher standards" },
  { name: "SAAFosT", logo: "/foods/saafost.png", desc: "Food science" },
  { name: "BUOSD SA", logo: "/foods/buosd-sa.png", desc: "Kosher authority" },
] as const;

const PrintModeContext = createContext(false);
function usePrintMode() {
  return useContext(PrintModeContext);
}

type SlideProps = { index: number };

function SlideShell({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const forPrint = usePrintMode();
  const zeroPad = /\b!?p-0\b/.test(className);

  return (
    <div
      className={`relative h-full w-full overflow-x-hidden border ${
        forPrint
          ? "overflow-hidden rounded-2xl"
          : "overflow-y-auto rounded-2xl sm:rounded-3xl"
      } ${
        dark
          ? forPrint
            ? "bg-[#1c1006] border-[#3d2914] text-white"
            : "bg-[#1c1006] border-amber-900/40 text-white"
          : forPrint
            ? "bg-white border-[#e5e5e5] text-black"
            : "bg-white border-black/10 text-black"
      } ${className}`}
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700" />
      {!forPrint && !dark && (
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-100/50 blur-3xl" />
      )}
      {!forPrint && dark && (
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-600/20 blur-3xl" />
      )}
      <div
        className={`relative min-h-full flex flex-col h-full ${
          zeroPad ? "p-0" : forPrint ? "p-8 md:p-10" : "p-5 sm:p-8 md:p-10 lg:p-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] font-semibold mb-3 sm:mb-4 ${
        light ? "text-amber-300" : "text-amber-800"
      }`}
    >
      {children}
    </div>
  );
}

function StatTile({
  value,
  label,
  dark,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  const forPrint = usePrintMode();
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 min-w-0 ${
        dark
          ? forPrint
            ? "border-[#3d2914] bg-[#2a1a0c]"
            : "border-white/10 bg-white/[0.06]"
          : forPrint
            ? "border-[#e5e5e5] bg-[#fafafa]"
            : "border-black/10 bg-[#fafafa]"
      }`}
    >
      <div
        className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter tabular-nums ${
          dark ? "text-amber-200" : "text-amber-800"
        }`}
      >
        {value}
      </div>
      <div className={`text-xs sm:text-sm mt-1.5 leading-snug ${dark ? "text-white/60" : "text-[#525252]"}`}>
        {label}
      </div>
    </div>
  );
}

function ProductThumb({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/8 bg-[#f8f7f5] ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-contain p-1.5 sm:p-2" sizes="160px" />
    </div>
  );
}

function TitleSlideLayout({ children }: { children: React.ReactNode }) {
  const forPrint = usePrintMode();
  return (
    <div
      className={`relative flex flex-col justify-between ${
        forPrint
          ? "h-full min-h-0 p-8 md:p-10"
          : "min-h-[min(70dvh,36rem)] p-5 sm:p-8 md:p-10 lg:p-12"
      }`}
    >
      {children}
    </div>
  );
}

function Slide({ index }: SlideProps) {
  switch (index) {
    case 0:
      return (
        <SlideShell dark className="!p-0">
          <TitleSlideLayout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full items-center">
              <div>
                <Eyebrow light>BIG FIVE FOODS · PRODUCT & IMPACT DECK</Eyebrow>
                <div className="relative w-28 h-14 sm:w-36 sm:h-18 mb-4">
                  <Image
                    src="/bigfivefoods-logo.png"
                    alt="Big Five Foods"
                    fill
                    className="object-contain object-left"
                    sizes="144px"
                    priority
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-balance mb-4">
                  Nourish a continent.
                  <br />
                  <span className="text-amber-300">One fortified meal at a time.</span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
                  Fortified porridges, soya mince, one-pot meals and soups — certified manufacturing,
                  24-month shelf life, and pathways that are 83% cheaper with 74% more nutrition.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  "/foods/porridge-chocolate.jpg",
                  "/foods/soya-chilli-beef.jpg",
                  "/foods/onepot-chakalaka.jpg",
                  "/foods/soup-oxtail.jpg",
                  "/foods/porridge-banana.jpg",
                  "/foods/soya-beef.jpg",
                  "/foods/onepot-chicken.jpg",
                  "/foods/soup-chicken.jpg",
                ].map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-[#2a1a0c]"
                  >
                    <Image src={src} alt="" fill className="object-contain p-1" sizes="100px" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/45">
              <span>KwaZulu-Natal · South Africa</span>
              <span>bigfivegroup.africa/foods</span>
              <span>14 slides · Downloadable · Shareable</span>
            </div>
          </TitleSlideLayout>
        </SlideShell>
      );

    case 1:
      return (
        <SlideShell>
          <Eyebrow>AGENDA</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            What this Foods briefing covers
          </h2>
          <ol className="space-y-3 max-w-2xl">
            {[
              "Why fortified nutrition is non-negotiable in Africa",
              "Big Five Foods impact — meals, children, cost, nutrition",
              "Four product ranges with real packaging",
              "Porridges, soya, one-pots and soups — deep dive",
              "Certifications the market can audit",
              "Farm to fork — how we manufacture and deliver",
              "Who we serve and how to partner",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 sm:gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 text-white text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base text-[#404040] leading-relaxed pt-1.5">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </SlideShell>
      );

    case 2:
      return (
        <SlideShell dark>
          <Eyebrow light>THE CHALLENGE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-balance">
            Hunger and empty calories still define too many plates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            <StatTile dark value="307M" label="People in Africa faced hunger in 2024 (SOFI 2025)" />
            <StatTile dark value="13M" label="Children with acute malnutrition in Eastern & Southern Africa" />
            <StatTile dark value="~1/3" label="Children in high-stunting regions of sub-Saharan Africa" />
            <StatTile dark value="SDG 2" label="Zero Hunger remains the defining food-security goal" />
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
            Families need food that is <strong className="text-white">affordable, fortified, shelf-stable
            and culturally familiar</strong> — not boutique nutrition that never reaches the last mile.
            That is the gap Big Five Foods is built to close.
          </p>
        </SlideShell>
      );

    case 3:
      return (
        <SlideShell>
          <Eyebrow>THE SOLUTION</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-balance">
            Fortified African staples people actually eat
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-6">
            Big Five Foods manufactures porridges, soya mince, one-pot meals and soups designed for
            households, schools, catering and institutions — with professional certifications and
            SupplierAdvisor® verification for partners who need proof, not promises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRODUCT_RANGES.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-amber-100 bg-gradient-to-b from-white to-amber-50/40 p-4 min-w-0"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-black/5 bg-[#f8f7f5] mb-3">
                  <Image
                    src={r.images[0].src}
                    alt={r.title}
                    fill
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>
                <r.icon className="w-5 h-5 text-amber-700 mb-1.5" />
                <div className="font-semibold text-black text-sm mb-1">{r.title}</div>
                <p className="text-xs text-[#525252] leading-snug">{r.blurb}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 4:
      return (
        <SlideShell dark>
          <Eyebrow light>PROOF · IMPACT</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            Numbers partners can put in a brief
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatTile dark value="150k" label="Meals delivered" />
            <StatTile dark value="100k" label="Children reached" />
            <StatTile dark value="83%" label="Cheaper pathways vs alternatives" />
            <StatTile dark value="74%" label="More nutrition by design" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { t: "24-month shelf life", d: "Stock institutions and containers without waste panic." },
              { t: "From ±R1.10 / meal", d: "Soups and soya ranges built for scale budgets." },
              { t: "Locally grown maize", d: "South African grain where formulation allows — provenance matters." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <div className="font-semibold text-amber-200 text-sm mb-1">{x.t}</div>
                <p className="text-xs text-white/60 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 5:
      return (
        <SlideShell>
          <Eyebrow>PRODUCT RANGE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-5">
            Four ranges. One nutrition system.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {PRODUCT_RANGES.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 flex gap-3 min-w-0"
              >
                <div className="grid grid-cols-2 gap-1.5 w-[7.5rem] sm:w-36 shrink-0">
                  {r.images.map((img) => (
                    <ProductThumb
                      key={img.src}
                      src={img.src}
                      alt={img.name}
                      className="aspect-square"
                    />
                  ))}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <r.icon className="w-5 h-5 text-amber-700 mb-1.5" />
                  <h3 className="font-semibold text-black text-base sm:text-lg mb-1">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-2">{r.blurb}</p>
                  <p className="text-xs font-semibold text-amber-900">{r.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 6:
      return productDeepDive(0);
    case 7:
      return productDeepDive(1);
    case 8:
      return productDeepDive(2);
    case 9:
      return productDeepDive(3);

    case 10:
      return (
        <SlideShell>
          <Eyebrow>QUALITY & TRUST</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 text-balance">
            Certifications the market can audit
          </h2>
          <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-5">
            Institutions and retailers need factory-floor standards and ethical commerce rails —
            not claims on a brochure. Big Five Foods is built for both.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
            {CERTS.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-black/10 bg-white p-3 text-center min-w-0"
              >
                <div className="relative h-10 sm:h-12 mb-2 flex items-center justify-center">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={100}
                    height={48}
                    className="object-contain max-h-10 sm:max-h-12 w-auto max-w-full"
                  />
                </div>
                <div className="text-xs font-semibold text-black">{c.name}</div>
                <div className="text-[10px] text-[#737373] mt-0.5">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-black text-sm mb-1">
                Registered on SupplierAdvisor®
              </div>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                Verified ethical company status with live trade and transparency — partners can
                verify at{" "}
                <a
                  href={SA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-900 underline underline-offset-2"
                >
                  supplieradvisor.com
                </a>
                .
              </p>
            </div>
          </div>
        </SlideShell>
      );

    case 11:
      return (
        <SlideShell>
          <Eyebrow>FROM FARM TO FORK</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            How Foods works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                step: "01",
                t: "Source & fortify",
                d: "Locally grown grains milled and precision-fortified with essential micronutrients — protein, vitamins, minerals.",
              },
              {
                step: "02",
                t: "Certify & package",
                d: "ISO / FSSC / ethical certifications. Smart packaging with batch traceability and long shelf life.",
              },
              {
                step: "03",
                t: "Distribute & verify",
                d: "Schools, institutions, retail and Direct containers. Trade via SupplierAdvisor® where partners need live feedback.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
                <div className="text-3xl font-semibold tracking-tighter text-amber-200 mb-2">
                  {s.step}
                </div>
                <h3 className="font-semibold text-black text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#525252] leading-relaxed max-w-3xl">
            Within Big Five Group, Foods connects to <strong className="text-black">Agri</strong>{" "}
            (regenerative supply), <strong className="text-black">Direct</strong> (last-mile
            containers), <strong className="text-black">Foundation</strong> (programmes) and{" "}
            <strong className="text-black">Impact</strong> (PMO delivery).
          </p>
        </SlideShell>
      );

    case 12:
      return (
        <SlideShell>
          <Eyebrow>WHO WE SERVE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-5">
            Built for institutions and families
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                icon: School,
                t: "Schools & feeding schemes",
                d: "Shelf-stable fortified staples for consistent school nutrition with cost control.",
              },
              {
                icon: Building2,
                t: "Governments & NGOs",
                d: "Measurable Zero Hunger contribution — fortification, affordability, audit-ready partners.",
              },
              {
                icon: Store,
                t: "Retail & distributors",
                d: "Story-driven products, long shelf life, premium margins on ranges people recognise.",
              },
              {
                icon: Users,
                t: "Households & catering",
                d: "Delicious, familiar flavours — from R1.10–R2.50 pathways that stretch family budgets.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 flex gap-3 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <x.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">{x.t}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 13:
      return (
        <SlideShell dark className="!p-0">
          <TitleSlideLayout>
            <div>
              <Eyebrow light>CALL TO ACTION · PARTNER WITH FOODS</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] mb-4 text-balance">
                Stop buying empty calories.
                <br />
                <span className="text-amber-300">Start stocking nutrition that scales.</span>
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-3">
                If you run a school feeding programme, institutional tender, retail chain or CSI
                nutrition portfolio — Big Five Foods is ready: certified manufacturing, four fortified
                ranges, and proof on the plate.
              </p>
              <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-2xl mb-6">
                Request a product sample pack, pricing for your channel, or a 30-minute supply briefing
                this week.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 max-w-3xl">
                {[
                  { n: "01", t: "Pick your channel", d: "Schools · retail · institutions · CSI" },
                  { n: "02", t: "Match the range", d: "Porridge · soya · one-pot · soup" },
                  { n: "03", t: "Ship with proof", d: "Certs · SA verification · Direct rails" },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3"
                  >
                    <div className="text-[10px] tracking-[2px] text-amber-300 font-semibold mb-1">
                      {s.n}
                    </div>
                    <div className="text-sm font-semibold text-white mb-0.5">{s.t}</div>
                    <div className="text-xs text-white/55">{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/connect"
                  className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm sm:text-base font-semibold"
                >
                  Order & partner enquiry
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:craig@bigfivegroup.africa?subject=Big%20Five%20Foods%20—%20partnership%20enquiry&body=Hello%20Big%20Five%20Foods%2C%0A%0AI%20would%20like%20to%20discuss%20supply%20%2F%20partnership.%0A%0AOrganisation%3A%0AChannel%20(school%2Fretail%2Finstitution%2FCSI)%3A%0AVolume%20interest%3A%0A%0AThank%20you."
                  className="premium-button inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-full text-sm sm:text-base font-semibold border border-amber-400/40"
                >
                  Email Craig — Foods supply
                </a>
                <a
                  href={SA_ONBOARDING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  Start free trial on SupplierAdvisor®
                </a>
                <a
                  href={SA_LOGIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  Existing user? Log in
                </a>
              </div>
            </div>
            <div className="mt-8 text-xs text-white/40 space-y-1">
              <p className="text-white/55 font-medium flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                Feed with purpose. — bigfivegroup.africa/foods
              </p>
              <p>Big Five Foods · Big Five Group (Pty) Ltd · KwaZulu-Natal</p>
              <p>150k meals · 100k children · 83% cheaper · 74% more nutrition</p>
            </div>
          </TitleSlideLayout>
        </SlideShell>
      );

    default:
      return null;
  }
}

function productDeepDive(rangeIndex: number) {
  const r = PRODUCT_RANGES[rangeIndex];
  const Icon = r.icon;
  return (
    <SlideShell>
      <Eyebrow>PRODUCT DEEP DIVE · {rangeIndex + 1}/4</Eyebrow>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Icon className="w-7 h-7 text-amber-700" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter">
          {r.title}
        </h2>
      </div>
      <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-2xl mb-2">{r.blurb}</p>
      <p className="text-sm font-semibold text-amber-900 mb-5">{r.stats}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-1">
        {r.images.map((img) => (
          <div key={img.src} className="flex flex-col min-w-0">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-black/10 bg-[#f8f7f5] mb-2">
              <Image
                src={img.src}
                alt={`${r.title} — ${img.name}`}
                fill
                className="object-contain p-2 sm:p-3"
                sizes="(max-width:768px) 45vw, 22vw"
              />
            </div>
            <div className="text-center text-xs sm:text-sm font-semibold text-black">{img.name}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

type PrintOrientation = "landscape" | "portrait";

const A4 = {
  landscape: { w: "297mm", h: "210mm" },
  portrait: { w: "210mm", h: "297mm" },
  margin: "8mm",
} as const;

const PRINT_STYLES = `
  #${PRINT_ROOT_ID} {
    position: fixed;
    left: 0;
    top: 0;
    transform: translate3d(-200vw, 0, 0);
    z-index: -1;
    pointer-events: none;
  }
  #${PRINT_ROOT_ID}[data-orientation="landscape"] { width: 297mm; }
  #${PRINT_ROOT_ID}[data-orientation="portrait"] { width: 210mm; }
  #${PRINT_ROOT_ID} .deck-print-page {
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 0 12px;
    background: #fff;
  }
  #${PRINT_ROOT_ID}[data-orientation="landscape"] .deck-print-page {
    width: 297mm; height: 210mm; padding: 8mm;
  }
  #${PRINT_ROOT_ID}[data-orientation="portrait"] .deck-print-page {
    width: 210mm; height: 297mm; padding: 8mm;
  }
  #${PRINT_ROOT_ID} .deck-print-page > * {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
  }
  #${PRINT_ROOT_ID},
  #${PRINT_ROOT_ID} * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: none !important;
  }
  #${PRINT_ROOT_ID} .premium-button::before { content: none !important; display: none !important; }
  #${PRINT_ROOT_ID} [class*="blur-"] { display: none !important; }

  @page foods-deck-landscape { size: A4 landscape; margin: 0; }
  @page foods-deck-portrait { size: A4 portrait; margin: 0; }

  @media print {
    @page { size: A4 landscape; margin: 0; }
    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
    }
    body > *:not(#${PRINT_ROOT_ID}) { display: none !important; }
    #${PRINT_ROOT_ID} {
      display: block !important;
      position: static !important;
      transform: none !important;
      width: auto !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #${PRINT_ROOT_ID},
    #${PRINT_ROOT_ID} * {
      box-shadow: none !important;
      filter: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #${PRINT_ROOT_ID} .deck-print-page {
      box-sizing: border-box !important;
      margin: 0 !important;
      overflow: hidden !important;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
    }
    #${PRINT_ROOT_ID}[data-orientation="landscape"] .deck-print-page {
      page: foods-deck-landscape;
      width: ${A4.landscape.w} !important;
      height: ${A4.landscape.h} !important;
      padding: ${A4.margin} !important;
    }
    #${PRINT_ROOT_ID}[data-orientation="portrait"] .deck-print-page {
      page: foods-deck-portrait;
      width: ${A4.portrait.w} !important;
      height: ${A4.portrait.h} !important;
      padding: ${A4.margin} !important;
    }
    #${PRINT_ROOT_ID} .deck-print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    #${PRINT_ROOT_ID} a { text-decoration: none !important; color: inherit !important; }
  }
`;

function printPageCss(orientation: PrintOrientation) {
  const size = orientation === "portrait" ? "A4 portrait" : "A4 landscape";
  return `
    @media print {
      @page { size: ${size}; margin: 0; }
    }
  `;
}

function PrintDeckPortal({
  active,
  orientation,
}: {
  active: boolean;
  orientation: PrintOrientation;
}) {
  if (!active || typeof document === "undefined") return null;

  return createPortal(
    <PrintModeContext.Provider value={true}>
      <div id={PRINT_ROOT_ID} aria-hidden="true" data-orientation={orientation}>
        <style
          dangerouslySetInnerHTML={{
            __html: PRINT_STYLES + printPageCss(orientation),
          }}
        />
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} className="deck-print-page">
            <Slide index={i} />
          </div>
        ))}
      </div>
    </PrintModeContext.Provider>,
    document.body
  );
}

export default function FoodsStrategyDeck() {
  const [index, setIndex] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [fullscreen, setFullscreen] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [preparingPdf, setPreparingPdf] = useState(false);
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>("landscape");

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(TOTAL - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (printMode) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, fullscreen, printMode]);

  useEffect(() => {
    if (!printMode) return;

    let cancelled = false;
    const root = document.documentElement;
    root.setAttribute("data-deck-print", printOrientation);
    root.setAttribute("data-deck-print-active", "true");

    const finish = () => {
      if (cancelled) return;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      setPrintMode(false);
      setPreparingPdf(false);
    };

    const t = window.setTimeout(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          window.print();
        });
      });
    }, 600);

    window.addEventListener("afterprint", finish);
    const fallback = window.setTimeout(finish, 120_000);

    return () => {
      cancelled = true;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      window.clearTimeout(t);
      window.clearTimeout(fallback);
      window.removeEventListener("afterprint", finish);
    };
  }, [printMode, printOrientation]);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/foods#foods-deck`
      : "https://bigfivegroup.africa/foods#foods-deck";

  const onShare = async () => {
    const payload = {
      title: "Big Five Foods — Product & Impact Deck",
      text: "Fortified African nutrition: porridges, soya, one-pots and soups — 150k meals, 100k children, 83% cheaper, 74% more nutrition.",
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setShareState("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      } catch {
        /* ignore */
      }
    }
    window.setTimeout(() => setShareState("idle"), 2500);
  };

  const onDownload = (orientation: PrintOrientation = printOrientation) => {
    setPrintOrientation(orientation);
    setPreparingPdf(true);
    setPrintMode(true);
  };

  const deck = (
    <div
      className={`flex flex-col min-w-0 ${
        fullscreen
          ? "fixed inset-0 z-[100] bg-[#1a1008] p-3 sm:p-5"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-gradient-to-b from-amber-50 to-[#f3f4f6] p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgb(180_83_9_/0.25)]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 mb-2">
        <div className="text-xs sm:text-sm font-medium text-[#404040]">
          Big Five Foods deck{" "}
          <span className="text-[#737373] font-normal">
            · {index + 1} / {TOTAL}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5"
          >
            {shareState === "copied" ? (
              <>
                <Copy className="w-3.5 h-3.5" /> Link copied
              </>
            ) : shareState === "shared" ? (
              <>
                <Check className="w-3.5 h-3.5" /> Shared
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share
              </>
            )}
          </button>
          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 p-0.5">
            <button
              type="button"
              onClick={() => onDownload("landscape")}
              disabled={preparingPdf}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-white disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {preparingPdf && printOrientation === "landscape"
                  ? "Preparing…"
                  : "A4 Landscape"}
              </span>
              <span className="sm:hidden">A4 L</span>
            </button>
            <button
              type="button"
              onClick={() => onDownload("portrait")}
              disabled={preparingPdf}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-white disabled:opacity-60"
            >
              <span className="hidden sm:inline">
                {preparingPdf && printOrientation === "portrait"
                  ? "Preparing…"
                  : "A4 Portrait"}
              </span>
              <span className="sm:hidden">A4 P</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      <div className="mx-2 sm:mx-3 mb-2 h-1 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
        />
      </div>

      <div
        className={`relative flex-1 min-h-0 ${
          fullscreen ? "min-h-0" : "min-h-[min(74dvh,42rem)] sm:min-h-[min(76dvh,46rem)]"
        }`}
        style={fullscreen ? { height: "calc(100dvh - 8.5rem)" } : undefined}
      >
        <Slide index={index} />
      </div>

      <div className="flex items-center justify-between gap-3 px-1 sm:px-2 pt-3 pb-1">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black disabled:opacity-30 hover:bg-black/5"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="flex flex-wrap justify-center gap-1 max-w-[45%] sm:max-w-none">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-amber-700" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === TOTAL - 1}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id="foods-deck" className="scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <div className="text-xs tracking-[3px] text-amber-800 mb-3 font-medium">
          PRODUCT & IMPACT DECK · 14 SLIDES · SHAREABLE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4 text-balance">
          Big Five Foods — the deck
        </h2>
        <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-6">
          A compelling product briefing for schools, governments, retailers and partners —
          real packaging, real metrics, certifications and a clear call to partner.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            type="button"
            onClick={onShare}
            className="premium-button inline-flex items-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-amber-800"
          >
            <Share2 className="w-4 h-4" />
            {shareState === "copied"
              ? "Link copied"
              : shareState === "shared"
                ? "Shared"
                : "Share this deck"}
          </button>
          <button
            type="button"
            onClick={() => onDownload("landscape")}
            disabled={preparingPdf}
            className="premium-button inline-flex items-center gap-2 border border-amber-200 bg-white text-amber-950 px-6 py-3 rounded-full text-sm font-semibold hover:bg-amber-50 disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {preparingPdf && printOrientation === "landscape"
              ? "Preparing A4 landscape…"
              : "PDF · A4 Landscape"}
          </button>
          <button
            type="button"
            onClick={() => onDownload("portrait")}
            disabled={preparingPdf}
            className="premium-button inline-flex items-center gap-2 border border-black/10 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5 disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {preparingPdf && printOrientation === "portrait"
              ? "Preparing A4 portrait…"
              : "PDF · A4 Portrait"}
          </button>
        </div>
      </div>
      {deck}
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → · Share:{" "}
        <span className="font-medium text-black">/foods#foods-deck</span>
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> with{" "}
        <strong className="text-black">8mm</strong> margins — choose{" "}
        <strong className="text-black">Save as PDF</strong>
        {preparingPdf
          ? ` · paper: ${printOrientation === "landscape" ? "Landscape" : "Portrait"}`
          : ""}
        .
      </p>
      <PrintDeckPortal active={printMode} orientation={printOrientation} />
    </div>
  );
}
