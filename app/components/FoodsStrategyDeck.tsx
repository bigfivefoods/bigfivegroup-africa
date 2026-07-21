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
  Compass,
  Copy,
  Download,
  Heart,
  Maximize2,
  Minimize2,
  Share2,
  Shield,
  ShieldCheck,
  Soup,
  Target,
  UtensilsCrossed,
  School,
  Building2,
  Store,
  Users,
} from "lucide-react";
import { SA_LOGIN, SA_ONBOARDING, SA_URL, sa } from "../lib/saCopy";
import { GROUP_VMV } from "./deck/GroupVmvContent";

const TOTAL = 15;
const PRINT_ROOT_ID = "foods-deck-print-root";

const PRODUCT_RANGES = [
  {
    title: "Fortified Porridges",
    icon: UtensilsCrossed,
    blurb:
      "Instant, vitamin-enriched porridges for children and families — Banana, Strawberry, Chocolate and Original on local maize where formulation allows.",
    stats: "74% more nutrition · 185% more fortification · school & household ready",
    images: [
      { src: "/foods/porridge-chocolate.jpg", name: "Chocolate" },
      { src: "/foods/porridge-banana.jpg", name: "Banana" },
      { src: "/foods/porridge-original.jpg", name: "Original" },
      { src: "/foods/porridge-strawberry.jpg", name: "Strawberry" },
    ],
    nutrition:
      "Essential minerals, B-vitamins, fibre, calcium, magnesium, phosphorus and iron — designed for growing children and care settings.",
    foodSecurity:
      "Shelf-stable breakfast/staple that schools and households can store, portion and serve without cold chain — reliable calories when markets fail.",
    malnutrition:
      "Closes micronutrient gaps that drive stunting and hidden hunger. High fortification density vs empty cereal calories.",
    sdgs: [
      { n: "2", t: "Zero Hunger", d: "Nutrient-dense meals at affordability for feeding schemes." },
      { n: "3", t: "Good Health", d: "Micronutrients support immunity and development." },
      { n: "4", t: "Quality Education", d: "Fed learners concentrate; school-channel friendly." },
    ],
    wfp:
      "Complements WFP-aligned school meals and national feeding: fortified, familiar flavours, easy prep, institutional pack sizes.",
    channels: "Schools · ECD · households · clinics · CSI · institutional catering",
  },
  {
    title: "Soya Mince",
    icon: Beef,
    blurb:
      "Plant-based protein mince — Chilli Beef, Rich Beef, Beef & Onion, Mutton — affordable protein for stews, pap and institutional menus.",
    stats: "From R1.30 / meal · 24.4% more protein · long shelf life",
    images: [
      { src: "/foods/soya-chilli-beef.jpg", name: "Chilli Beef" },
      { src: "/foods/soya-beef-onion.jpg", name: "Beef & Onion" },
      { src: "/foods/soya-beef.jpg", name: "Rich Beef" },
      { src: "/foods/soya-mutton.jpg", name: "Mutton" },
    ],
    nutrition:
      "High plant protein at low cost — stretches meat budgets and lifts protein quality in starch-heavy diets.",
    foodSecurity:
      "Protein security without cold-chain meat logistics. Stable inventory for remote hubs, containers and emergency stocks.",
    malnutrition:
      "Addresses protein-energy malnutrition risk; pairs with staples so plates are not only starch and oil.",
    sdgs: [
      { n: "2", t: "Zero Hunger", d: "Affordable protein density at scale budgets." },
      { n: "1", t: "No Poverty", d: "Lower cost per protein gram protects household spend." },
      { n: "12", t: "Responsible Consumption", d: "Efficient plant protein vs high-impact livestock only." },
    ],
    wfp:
      "Supports protein-forward institutional menus and crisis response when animal protein is scarce or costly — still culturally familiar mince formats.",
    channels: "Households · catering · schools · NGOs · retail · Direct containers",
  },
  {
    title: "One-Pot Meals",
    icon: ChefHat,
    blurb:
      "Complete ready-to-cook meals — Chakalaka, Beef, Chicken, Chilli Beef — balanced fortification, authentic African flavours, ~20 minutes.",
    stats: "From R2.50 / meal · ~20 min cook · 24-month shelf life",
    images: [
      { src: "/foods/onepot-chakalaka.jpg", name: "Chakalaka" },
      { src: "/foods/onepot-beef.jpg", name: "Beef" },
      { src: "/foods/onepot-chicken.jpg", name: "Chicken" },
      { src: "/foods/onepot-chilli-beef.jpg", name: "Chilli Beef" },
    ],
    nutrition:
      "Protein plus vitamins A & D, iron and calcium in a complete meal format — not a single-nutrient top-up.",
    foodSecurity:
      "One SKU feeds a plate: reduces dependency on multi-ingredient shopping when prices spike or shops empty.",
    malnutrition:
      "Whole-meal fortification fights both calorie gaps and micronutrient deficiency in working families and programmes.",
    sdgs: [
      { n: "2", t: "Zero Hunger", d: "Complete meal pathways for institutions & homes." },
      { n: "8", t: "Decent Work", d: "Catering and micro-enterprise ready formats." },
      { n: "11", t: "Sustainable Cities", d: "Urban/rural shelf-stable meals for dense populations." },
    ],
    wfp:
      "Aligned with complementary feeding logistics: long shelf life, simple cook, dignified flavours — suitable where school or community kitchens run under pressure.",
    channels: "Institutions · CSI · retail · workplaces · Direct last-mile hubs",
  },
  {
    title: "Soups",
    icon: Soup,
    blurb:
      "Fortified instant soup thickeners — Brown Onion, Oxtail, Minestrone, Chicken — classic SA flavours, nutrient dense, lowest cost pathways.",
    stats: "From R1.10 / meal · vitamins A & C · iron · calcium",
    images: [
      { src: "/foods/soup-brown-onion.jpg", name: "Brown Onion" },
      { src: "/foods/soup-oxtail.jpg", name: "Oxtail" },
      { src: "/foods/soup-minestrone.jpg", name: "Minestrone" },
      { src: "/foods/soup-chicken.jpg", name: "Chicken" },
    ],
    nutrition:
      "Vitamins A & C, iron and calcium in a format elders, children and clinics already accept — warmth and micronutrients together.",
    foodSecurity:
      "Lowest price point in the range: extends food budgets, fills the plate between main meals, works when fuel and time are scarce.",
    malnutrition:
      "Micronutrient top-up for starch-heavy diets; supports recovery diets and care settings without medical claims beyond fortification design.",
    sdgs: [
      { n: "2", t: "Zero Hunger", d: "Ultra-affordable nutrient-dense entry point." },
      { n: "3", t: "Good Health", d: "Vitamins A & C and minerals in everyday format." },
      { n: "1", t: "No Poverty", d: "From ±R1.10 — protects the poorest households." },
    ],
    wfp:
      "Useful as a complementary item in broader food baskets and community kitchens — light logistics, high acceptance, fortification without stigma.",
    channels: "Households · clinics · ECD · retail · emergency / community kitchens",
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

type PrintOrientation = "landscape" | "portrait";

type PrintCtx = { active: boolean; orientation: PrintOrientation };
const PrintModeContext = createContext<PrintCtx>({
  active: false,
  orientation: "landscape",
});
function usePrintMode() {
  return useContext(PrintModeContext).active;
}
function usePrintOrientation() {
  return useContext(PrintModeContext).orientation;
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
      className={`relative h-full w-full overflow-x-hidden border box-border ${
        forPrint
          ? "overflow-hidden rounded-xl"
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
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700" />
      {!forPrint && !dark && (
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-100/50 blur-3xl" />
      )}
      {!forPrint && dark && (
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-600/20 blur-3xl" />
      )}
      <div
        className={`relative flex flex-col h-full min-h-0 box-border ${
          zeroPad ? "p-0" : forPrint ? "p-4 md:p-5" : "p-5 sm:p-8 md:p-10 lg:p-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  const forPrint = usePrintMode();
  return (
    <div
      className={`tracking-[2px] font-semibold ${
        forPrint ? "text-[9px] mb-1.5" : "text-[10px] sm:text-xs tracking-[3px] mb-3 sm:mb-4"
      } ${light ? "text-amber-300" : "text-amber-800"}`}
    >
      {children}
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  const forPrint = usePrintMode();
  return (
    <h2
      className={`font-semibold tracking-tighter text-balance ${
        forPrint ? "text-xl mb-2" : "text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5"
      }`}
    >
      {children}
    </h2>
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
      className={`rounded-xl border min-w-0 ${
        forPrint ? "p-2.5" : "rounded-2xl p-4 sm:p-5"
      } ${
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
        className={`font-semibold tracking-tighter tabular-nums ${
          forPrint ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl"
        } ${dark ? "text-amber-200" : "text-amber-800"}`}
      >
        {value}
      </div>
      <div
        className={`mt-1 leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"} ${
          dark ? "text-white/60" : "text-[#525252]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

/** Pack shot frame — fixed box so products never blow past the slide/page edge */
function ProductThumb({
  src,
  alt,
  className = "",
  sizes = "160px",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/8 bg-[#f8f7f5] min-h-0 min-w-0 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center p-1.5 sm:p-2"
        sizes={sizes}
      />
    </div>
  );
}

function TitleSlideLayout({ children }: { children: React.ReactNode }) {
  const forPrint = usePrintMode();
  return (
    <div
      className={`relative flex flex-col justify-between h-full min-h-0 box-border ${
        forPrint
          ? "p-4 md:p-5"
          : "min-h-[min(70dvh,36rem)] p-5 sm:p-8 md:p-10 lg:p-12"
      }`}
    >
      {children}
    </div>
  );
}

function TitleSlide() {
  const forPrint = usePrintMode();

  return (
    <SlideShell dark className="!p-0">
      <div className="relative h-full w-full min-h-0">
        <Image
          src="/foods-hero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width:1280px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
        <div className="relative z-10 h-full">
          <TitleSlideLayout>
            <div className="flex flex-col h-full min-h-0 justify-between">
              <div className="min-w-0 max-w-2xl">
                <Eyebrow light>BIG FIVE FOODS · PRODUCT & IMPACT DECK</Eyebrow>
                <div
                  className={`relative mb-4 sm:mb-6 ${
                    forPrint ? "w-28 h-14" : "w-36 h-16 sm:w-44 sm:h-20 md:w-52 md:h-24"
                  }`}
                >
                  <Image
                    src="/bigfivefoods-logo.png"
                    alt="Big Five Foods"
                    fill
                    className="object-contain object-left brightness-0 invert"
                    sizes="208px"
                    priority
                  />
                </div>
                <h2
                  className={`font-semibold tracking-tighter leading-[1.05] text-balance text-white ${
                    forPrint
                      ? "text-2xl mb-2"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
                  }`}
                >
                  Nourish a continent.
                  <br />
                  <span className="text-amber-300">One fortified meal at a time.</span>
                </h2>
                <p
                  className={`text-white/80 leading-snug max-w-xl ${
                    forPrint ? "text-[11px]" : "text-sm sm:text-base leading-relaxed"
                  }`}
                >
                  Fortified porridges, soya mince, one-pot meals and soups — certified manufacturing,
                  24-month shelf life · ~45% GP · ~85% cheaper vs wholesale/retail · 74% more nutrition.
                </p>
              </div>
              <div
                className={`flex flex-wrap gap-x-3 text-white/50 shrink-0 ${
                  forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                }`}
              >
                <span>KwaZulu-Natal · SA</span>
                <span>bigfivegroup.africa/foods</span>
                <span>Order: supplieradvisor.com</span>
                <span>15 slides</span>
              </div>
            </div>
          </TitleSlideLayout>
        </div>
      </div>
    </SlideShell>
  );
}

function AgendaSlide() {
  const forPrint = usePrintMode();
  const items = [
    "Group vision, mission and values",
    "Why fortified nutrition is non-negotiable in Africa",
    "Big Five Foods impact — meals, children, cost, nutrition",
    "Four product ranges with real packaging",
    "Each range: food security, malnutrition, SDGs & WFP",
    "Certifications & order on SupplierAdvisor®",
    "Farm to fork — manufacture and deliver",
    "Who we serve and how to partner",
  ];
  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>AGENDA</Eyebrow>
        <SlideTitle>What this Foods briefing covers</SlideTitle>
        <ol className={`max-w-2xl ${forPrint ? "space-y-1.5" : "space-y-3"}`}>
          {items.map((item, i) => (
            <li key={item} className="flex gap-2.5 items-start">
              <span
                className={`shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 text-white font-semibold flex items-center justify-center ${
                  forPrint ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-[#404040] pt-0.5 ${forPrint ? "text-xs leading-snug" : "text-sm sm:text-base leading-relaxed pt-1.5"}`}>
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </SlideShell>
  );
}

function FoodsGroupVmvSlide() {
  const forPrint = usePrintMode();
  const pillars = [
    {
      t: "Vision",
      icon: Compass,
      color: "text-emerald-700",
      bar: "from-emerald-500 to-teal-600",
      title: GROUP_VMV.vision.title,
      d: forPrint
        ? "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, communities own their economies."
        : GROUP_VMV.vision.body,
    },
    {
      t: "Mission",
      icon: Target,
      color: "text-sky-700",
      bar: "from-sky-500 to-blue-600",
      title: GROUP_VMV.mission.title,
      d: forPrint
        ? "Deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises."
        : GROUP_VMV.mission.body,
    },
    {
      t: "Values",
      icon: Shield,
      color: "text-amber-700",
      bar: "from-amber-500 to-orange-600",
      title: GROUP_VMV.valuesIntro.title,
      d: forPrint
        ? "Humanity, innovation, integrity, excellence and impact — how we hire, partner, trade and deliver."
        : GROUP_VMV.valuesIntro.body,
    },
  ];

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <Eyebrow>BIG FIVE GROUP · NORTH STAR</Eyebrow>
          <SlideTitle>Vision · Mission · Values</SlideTitle>
          <p
            className={`text-[#525252] max-w-3xl ${
              forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"
            }`}
          >
            Foods is a pillar of one Group. Every product range answers to the same north star.
          </p>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 min-h-0 shrink-0 ${
            forPrint ? "gap-1.5 mb-2" : "gap-3 mb-4"
          }`}
        >
          {pillars.map((x) => (
            <div
              key={x.t}
              className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 relative overflow-hidden ${
                forPrint ? "p-2.5" : "p-4 sm:p-5 rounded-2xl"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
              <div
                className={`inline-flex items-center gap-1.5 tracking-[2px] font-semibold mb-1 mt-0.5 ${x.color} ${
                  forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
                }`}
              >
                <x.icon className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                {x.t.toUpperCase()}
              </div>
              <h3
                className={`font-semibold text-black tracking-tight mb-1 leading-snug ${
                  forPrint ? "text-[11px]" : "text-sm sm:text-base"
                }`}
              >
                {x.title}
              </h3>
              <p
                className={`text-[#404040] leading-snug ${
                  forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                }`}
              >
                {x.d}
              </p>
            </div>
          ))}
        </div>
        <div className="shrink-0">
          <div
            className={`tracking-[2px] text-[#737373] font-semibold ${
              forPrint ? "text-[8px] mb-1" : "text-[10px] mb-2"
            }`}
          >
            OUR VALUES
          </div>
          <div
            className={`grid min-w-0 ${
              forPrint
                ? "grid-cols-5 gap-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3"
            }`}
          >
            {GROUP_VMV.values.map((v) => (
              <div
                key={v.title}
                className={`flex items-start min-w-0 rounded-lg border border-black/10 bg-white ${
                  forPrint
                    ? "flex-col gap-1 p-1.5"
                    : "flex-row sm:flex-col gap-2 p-3 sm:p-4 rounded-xl"
                }`}
              >
                <div
                  className={`rounded-md bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 ${
                    forPrint ? "w-6 h-6" : "w-9 h-9 rounded-xl"
                  }`}
                >
                  <v.icon className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[10px]" : "text-sm mb-0.5"
                    }`}
                  >
                    {v.title}
                  </div>
                  <div
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[9px]" : "text-xs"
                    }`}
                  >
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function ChallengeSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell dark>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow light>THE CHALLENGE</Eyebrow>
        <SlideTitle>Hunger and empty calories still define too many plates</SlideTitle>
        <div className={`grid grid-cols-2 min-h-0 ${forPrint ? "gap-2 mb-2" : "gap-3 sm:gap-4 mb-5"}`}>
          <StatTile dark value="307M" label="People in Africa faced hunger in 2024 (SOFI 2025)" />
          <StatTile dark value="13M" label="Children with acute malnutrition in ESA" />
          <StatTile dark value="~1/3" label="Children in high-stunting regions of SSA" />
          <StatTile dark value="SDG 2" label="Zero Hunger — defining food-security goal" />
        </div>
        <p className={`text-white/70 max-w-3xl ${forPrint ? "text-[11px] leading-snug" : "text-sm leading-relaxed"}`}>
          Families need food that is <strong className="text-white">affordable, fortified, shelf-stable
          and culturally familiar</strong> — not boutique nutrition that never reaches the last mile.
        </p>
      </div>
    </SlideShell>
  );
}

function SolutionSlide() {
  const forPrint = usePrintMode();
  const orientation = usePrintOrientation();
  const imgH = forPrint
    ? orientation === "portrait"
      ? "h-[28mm]"
      : "h-[32mm]"
    : "h-24 sm:h-28 md:h-32";

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>THE SOLUTION</Eyebrow>
        <SlideTitle>Fortified African staples people actually eat</SlideTitle>
        <p className={`text-[#525252] max-w-3xl ${forPrint ? "text-[11px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"}`}>
          Porridges, soya mince, one-pot meals and soups for households, schools and institutions —
          order on <strong className="text-black">SupplierAdvisor®</strong>, our ethical on-chain OS.
        </p>
        <div className={`grid grid-cols-2 lg:grid-cols-4 min-h-0 flex-1 content-start ${forPrint ? "gap-1.5" : "gap-2.5 sm:gap-3"}`}>
          {PRODUCT_RANGES.map((r) => (
            <div
              key={r.title}
              className={`rounded-xl border border-amber-100 bg-gradient-to-b from-white to-amber-50/40 min-w-0 flex flex-col ${
                forPrint ? "p-2" : "p-3 rounded-2xl"
              }`}
            >
              <div className={`relative w-full rounded-lg overflow-hidden border border-black/5 bg-[#f8f7f5] mb-1.5 shrink-0 ${imgH}`}>
                <Image src={r.images[0].src} alt={r.title} fill className="object-contain object-center p-1" sizes="160px" />
              </div>
              <r.icon className={`text-amber-700 mb-0.5 ${forPrint ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
              <div className={`font-semibold text-black ${forPrint ? "text-[11px]" : "text-xs sm:text-sm"}`}>{r.title}</div>
              <p className={`text-[#525252] leading-snug line-clamp-2 ${forPrint ? "text-[9px]" : "text-[11px] sm:text-xs"}`}>
                {r.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function ProofSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell dark>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow light>PROOF · IMPACT</Eyebrow>
        <SlideTitle>Numbers partners can put in a brief</SlideTitle>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 ${
            forPrint ? "gap-1.5 mb-2" : "gap-2 sm:gap-3 mb-6"
          }`}
        >
          <StatTile dark value="2.5m" label="Children/day plan · NSNP landed" />
          <StatTile dark value="~45%" label="Gross profit (mgmt)" />
          <StatTile dark value="~85%" label="Cheaper vs wholesale & retail" />
          <StatTile dark value="150k" label="Meals delivered to date" />
          <StatTile dark value="74%" label="More nutrition by design" />
        </div>
        <div
          className={`grid ${
            forPrint ? "grid-cols-3 gap-1.5" : "grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3"
          }`}
        >
          {[
            { t: "24-month shelf life", d: "Stock institutions without waste panic." },
            { t: "From ±R1.10 / meal", d: "Soups and soya for scale budgets." },
            { t: "Locally grown maize", d: "SA grain where formulation allows." },
          ].map((x) => (
            <div key={x.t} className={`rounded-xl border border-white/10 bg-white/[0.05] ${forPrint ? "p-2" : "p-4"}`}>
              <div className={`font-semibold text-amber-200 ${forPrint ? "text-[11px] mb-0.5" : "text-sm mb-1"}`}>{x.t}</div>
              <p className={`text-white/60 leading-snug ${forPrint ? "text-[10px]" : "text-xs leading-relaxed"}`}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function RangeSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>PRODUCT RANGE</Eyebrow>
        <SlideTitle>Four ranges. One nutrition system.</SlideTitle>
        <p
          className={`text-[#525252] max-w-3xl ${
            forPrint ? "text-[10px] mb-1.5 leading-snug" : "text-sm mb-3 leading-relaxed"
          }`}
        >
          Next slides map each range to <strong className="text-black">food security</strong>,{" "}
          <strong className="text-black">malnutrition</strong>,{" "}
          <strong className="text-black">UN SDGs</strong> and{" "}
          <strong className="text-black">WFP-aligned Zero Hunger</strong> practice — complementary
          to humanitarian and national programmes, not a claim of UN agency status.
        </p>
        <div
          className={`grid min-h-0 flex-1 content-start ${
            forPrint ? "grid-cols-2 gap-1.5" : "grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
          }`}
        >
          {PRODUCT_RANGES.map((r) => (
            <div
              key={r.title}
              className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 min-w-0 items-center ${
                forPrint ? "p-2" : "p-3 sm:p-3.5 rounded-2xl gap-3"
              }`}
            >
              <div className={`grid grid-cols-2 gap-0.5 shrink-0 ${forPrint ? "w-[4.5rem]" : "w-[5.5rem] sm:w-[6.5rem] gap-1"}`}>
                {r.images.map((img) => (
                  <ProductThumb
                    key={img.src}
                    src={img.src}
                    alt={img.name}
                    className={forPrint ? "h-9 w-full" : "h-11 sm:h-14 w-full"}
                    sizes="64px"
                  />
                ))}
              </div>
              <div className="min-w-0">
                <r.icon className={`text-amber-700 mb-0.5 ${forPrint ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
                <h3 className={`font-semibold text-black ${forPrint ? "text-[11px]" : "text-sm sm:text-base"}`}>{r.title}</h3>
                <p className={`text-[#525252] leading-snug line-clamp-2 ${forPrint ? "text-[9px]" : "text-[11px] sm:text-xs"}`}>{r.blurb}</p>
                <p className={`font-semibold text-amber-900 ${forPrint ? "text-[9px] mt-0.5" : "text-[11px]"}`}>{r.stats}</p>
                <p className={`text-[#737373] ${forPrint ? "text-[8px] mt-0.5" : "text-[10px] mt-1"}`}>
                  SDG {r.sdgs.map((s) => s.n).join(" · ")} · {r.channels.split("·")[0].trim()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function CertsSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>QUALITY & TRUST</Eyebrow>
        <SlideTitle>Certifications the market can audit</SlideTitle>
        <p className={`text-[#525252] max-w-3xl ${forPrint ? "text-[11px] mb-2 leading-snug" : "text-sm mb-5 leading-relaxed"}`}>
          Factory-floor standards and ethical commerce rails — not claims on a brochure.
        </p>
        <div
          className={`grid min-h-0 ${
            forPrint ? "grid-cols-4 gap-1.5 mb-2" : "grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5"
          }`}
        >
          {CERTS.map((c) => (
            <div key={c.name} className={`rounded-xl border border-black/10 bg-white text-center min-w-0 ${forPrint ? "p-1.5" : "p-3"}`}>
              <div className={`relative flex items-center justify-center mx-auto mb-1 ${forPrint ? "h-7" : "h-10 sm:h-12 mb-2"}`}>
                <Image src={c.logo} alt={c.name} width={90} height={40} className="object-contain max-h-full w-auto max-w-full" />
              </div>
              <div className={`font-semibold text-black ${forPrint ? "text-[9px]" : "text-xs"}`}>{c.name}</div>
              <div className={`text-[#737373] ${forPrint ? "text-[8px]" : "text-[10px] mt-0.5"}`}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div className={`rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 flex gap-2 items-start mt-auto ${forPrint ? "p-2.5" : "p-4 rounded-2xl gap-3"}`}>
          <ShieldCheck className={`text-amber-800 shrink-0 ${forPrint ? "w-4 h-4" : "w-5 h-5 mt-0.5"}`} />
          <div className="min-w-0">
            <div className={`font-semibold text-black ${forPrint ? "text-[11px] mb-0.5" : "text-sm mb-1"}`}>
              Order Big Five Foods on SupplierAdvisor®
            </div>
            <p className={`text-[#404040] leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm leading-relaxed mb-2"}`}>
              Ethical, verified, on-chain-ready commerce. Register, verify and order at{" "}
              <a href={SA_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-900 underline underline-offset-2">
                supplieradvisor.com
              </a>
              .
            </p>
            {!forPrint && (
              <div className="flex flex-wrap gap-2 mt-2">
                <a href={SA_ONBOARDING} target="_blank" rel="noopener noreferrer" className="inline-flex text-[11px] font-semibold px-3 py-1.5 rounded-full bg-amber-800 text-white">
                  Start free trial → order
                </a>
                <a href={SA_LOGIN} target="_blank" rel="noopener noreferrer" className="inline-flex text-[11px] font-semibold px-3 py-1.5 rounded-full border border-amber-800/30 text-amber-950">
                  Existing user? Log in
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function FarmToForkSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>FROM FARM TO FORK</Eyebrow>
        <SlideTitle>How Foods works</SlideTitle>
        <div
          className={`grid min-h-0 ${
            forPrint ? "grid-cols-3 gap-2 mb-2" : "grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6"
          }`}
        >
          {[
            { step: "01", t: "Source & fortify", d: "Local grains milled and precision-fortified with essential micronutrients." },
            { step: "02", t: "Certify & package", d: "ISO / FSSC / ethical certs. Batch traceability and long shelf life." },
            { step: "03", t: "Order & ask SAM", d: "Buyers order on SupplierAdvisor® — POs, lots, ratings — with SAM for in-app how-to." },
          ].map((s) => (
            <div key={s.step} className={`rounded-xl border border-black/10 bg-[#fafafa] relative overflow-hidden ${forPrint ? "p-2.5" : "p-5 rounded-2xl"}`}>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-600" />
              <div className={`font-semibold tracking-tighter text-amber-200 ${forPrint ? "text-lg mb-0.5" : "text-3xl mb-2"}`}>{s.step}</div>
              <h3 className={`font-semibold text-black ${forPrint ? "text-xs mb-0.5" : "text-lg mb-2"}`}>{s.t}</h3>
              <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm leading-relaxed"}`}>{s.d}</p>
            </div>
          ))}
        </div>
        <p className={`text-[#525252] max-w-3xl mt-auto ${forPrint ? "text-[10px] leading-snug" : "text-sm leading-relaxed"}`}>
          Foods connects to <strong className="text-black">Agri</strong>, <strong className="text-black">Direct</strong>,{" "}
          <strong className="text-black">Foundation</strong> and <strong className="text-black">Impact</strong> within Big Five Group.
        </p>
      </div>
    </SlideShell>
  );
}

function WhoWeServeSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <Eyebrow>WHO WE SERVE</Eyebrow>
        <SlideTitle>Built for institutions and families</SlideTitle>
        <div
          className={`grid min-h-0 flex-1 content-start ${
            forPrint ? "grid-cols-2 gap-1.5" : "grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          }`}
        >
          {[
            { icon: School, t: "Schools & feeding schemes", d: "Shelf-stable fortified staples for consistent school nutrition." },
            { icon: Building2, t: "Governments & NGOs", d: "Zero Hunger contribution — fortification, affordability, audit-ready." },
            { icon: Store, t: "Retail & distributors", d: "Story-driven products, long shelf life, strong margins." },
            { icon: Users, t: "Households & catering", d: "Familiar flavours — from R1.10–R2.50 pathways." },
          ].map((x) => (
            <div key={x.t} className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 min-w-0 ${forPrint ? "p-2.5" : "p-5 rounded-2xl gap-3"}`}>
              <div className={`rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 ${forPrint ? "w-8 h-8" : "w-10 h-10 rounded-xl"}`}>
                <x.icon className={forPrint ? "w-4 h-4" : "w-5 h-5"} />
              </div>
              <div className="min-w-0">
                <h3 className={`font-semibold text-black ${forPrint ? "text-[11px] mb-0.5" : "mb-1"}`}>{x.t}</h3>
                <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm leading-relaxed"}`}>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function CtaSlide() {
  const forPrint = usePrintMode();
  return (
    <SlideShell dark className="!p-0">
      <TitleSlideLayout>
        <div className="flex flex-col h-full min-h-0 justify-between">
          <div>
            <Eyebrow light>CALL TO ACTION · PARTNER WITH FOODS</Eyebrow>
            <h2 className={`font-semibold tracking-tighter leading-[1.05] text-balance ${forPrint ? "text-xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-4"}`}>
              Stop buying empty calories.
              <br />
              <span className="text-amber-300">Start stocking nutrition that scales.</span>
            </h2>
            <p className={`text-white/80 max-w-2xl ${forPrint ? "text-[11px] leading-snug mb-2" : "text-base sm:text-lg leading-relaxed mb-3"}`}>
              Order on <strong className="text-white">SupplierAdvisor®</strong> — ethical, on-chain
              OS with <strong className="text-white">{sa.sam.name}</strong> to guide every step.
              Verified companies, transparent trade, fortified products with proof.
            </p>
            <p className={`text-amber-200/90 font-medium max-w-2xl ${forPrint ? "text-[10px] mb-3" : "text-sm sm:text-base mb-6"}`}>
              Register free → ask {sa.sam.name} → order porridge, soya, one-pots and soups.
            </p>
            <div
              className={`grid max-w-3xl ${
                forPrint
                  ? "grid-cols-3 gap-1.5 mb-3"
                  : "grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7"
              }`}
            >
              {[
                { n: "01", t: "Join SupplierAdvisor®", d: "Free trial · meet SAM" },
                { n: "02", t: "Find Big Five Foods", d: "Verified · full range" },
                { n: "03", t: "Order with proof", d: "POs · lots · SAM help" },
              ].map((s) => (
                <div key={s.n} className={`rounded-xl border border-white/15 bg-white/[0.06] ${forPrint ? "px-2 py-1.5" : "px-4 py-3"}`}>
                  <div className={`tracking-[2px] text-amber-300 font-semibold ${forPrint ? "text-[8px] mb-0.5" : "text-[10px] mb-1"}`}>{s.n}</div>
                  <div className={`font-semibold text-white ${forPrint ? "text-[10px]" : "text-sm"}`}>{s.t}</div>
                  <div className={`text-white/55 ${forPrint ? "text-[9px]" : "text-xs"}`}>{s.d}</div>
                </div>
              ))}
            </div>
            <div className={`flex flex-wrap ${forPrint ? "gap-1.5" : "gap-3"}`}>
              <a
                href={SA_ONBOARDING}
                target="_blank"
                rel="noopener noreferrer"
                className={`premium-button inline-flex items-center justify-center gap-1.5 bg-white text-black rounded-full font-semibold ${
                  forPrint ? "px-3 py-1.5 text-[10px]" : "px-8 py-4 text-sm sm:text-base"
                }`}
              >
                Order on SupplierAdvisor®
                <ArrowRight className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
              </a>
              <a
                href={SA_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className={`premium-button inline-flex items-center justify-center bg-amber-600 text-white rounded-full font-semibold border border-amber-400/40 ${
                  forPrint ? "px-3 py-1.5 text-[10px]" : "px-8 py-4 text-sm sm:text-base"
                }`}
              >
                Log in & order
              </a>
              <a
                href="mailto:craig@bigfivegroup.africa?subject=Big%20Five%20Foods%20—%20order"
                className={`deck-email-cta premium-button inline-flex items-center justify-center rounded-full font-semibold ${
                  forPrint ? "px-3 py-1.5 text-[10px]" : "px-7 py-3.5 text-sm"
                }`}
                style={{ color: "#000000", backgroundColor: "#ffffff" }}
              >
                Email: craig@bigfivegroup.africa
              </a>
              {!forPrint && (
                <Link
                  href="/connect"
                  className="premium-button inline-flex items-center justify-center border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  Partner enquiry
                </Link>
              )}
            </div>
          </div>
          <div className={`text-white/40 space-y-0.5 shrink-0 ${forPrint ? "text-[9px] mt-2" : "text-xs mt-6"}`}>
            <p className="text-white/55 font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 text-amber-400" />
              Ethical · on-chain · supplieradvisor.com
            </p>
            <p>
              Big Five Foods · ~45% GP · ~85% cheaper vs wholesale/retail · 150k meals · 100k children
            </p>
          </div>
        </div>
      </TitleSlideLayout>
    </SlideShell>
  );
}

function Slide({ index }: SlideProps) {
  switch (index) {
    case 0:
      return <TitleSlide />;
    case 1:
      return <AgendaSlide />;
    case 2:
      return <FoodsGroupVmvSlide />;
    case 3:
      return <ChallengeSlide />;
    case 4:
      return <SolutionSlide />;
    case 5:
      return <ProofSlide />;
    case 6:
      return <RangeSlide />;
    case 7:
      return <ProductDeepDive rangeIndex={0} />;
    case 8:
      return <ProductDeepDive rangeIndex={1} />;
    case 9:
      return <ProductDeepDive rangeIndex={2} />;
    case 10:
      return <ProductDeepDive rangeIndex={3} />;
    case 11:
      return <CertsSlide />;
    case 12:
      return <FarmToForkSlide />;
    case 13:
      return <WhoWeServeSlide />;
    case 14:
      return <CtaSlide />;
    default:
      return null;
  }
}

function ProductDeepDive({ rangeIndex }: { rangeIndex: number }) {
  const r = PRODUCT_RANGES[rangeIndex];
  const Icon = r.icon;
  const forPrint = usePrintMode();
  const orientation = usePrintOrientation();
  const imgH = forPrint
    ? orientation === "portrait"
      ? "h-[22mm]"
      : "h-[26mm]"
    : "h-[5.5rem] sm:h-[6.5rem] md:h-[7.5rem]";

  const impactCards = [
    { label: "Food security", body: r.foodSecurity, tone: "bg-amber-50 border-amber-100 text-amber-950" },
    { label: "Malnutrition", body: r.malnutrition, tone: "bg-rose-50 border-rose-100 text-rose-950" },
    { label: "WFP / Zero Hunger", body: r.wfp, tone: "bg-sky-50 border-sky-100 text-sky-950" },
    { label: "Nutrition design", body: r.nutrition, tone: "bg-emerald-50 border-emerald-100 text-emerald-950" },
  ];

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <div className={`shrink-0 ${forPrint ? "mb-1.5" : "mb-2.5"}`}>
          <Eyebrow>
            PRODUCT · IMPACT · {rangeIndex + 1}/4 · SDG · WFP-ALIGNED
          </Eyebrow>
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <Icon className={`text-amber-700 shrink-0 ${forPrint ? "w-4 h-4" : "w-6 h-6"}`} />
            <h2
              className={`font-semibold tracking-tighter ${
                forPrint ? "text-base" : "text-xl sm:text-2xl md:text-3xl"
              }`}
            >
              {r.title}
            </h2>
          </div>
          <p
            className={`text-[#525252] leading-snug max-w-3xl ${
              forPrint ? "text-[10px] line-clamp-2" : "text-xs sm:text-sm"
            }`}
          >
            {r.blurb}
          </p>
          <p
            className={`font-semibold text-amber-900 ${
              forPrint ? "text-[9px] mt-0.5" : "text-xs sm:text-sm mt-1"
            }`}
          >
            {r.stats}
          </p>
        </div>

        {/* Products + impact side by side so content fits one A4 page */}
        <div
          className={`grid min-h-0 flex-1 gap-2 ${
            forPrint
              ? orientation === "portrait"
                ? "grid-cols-1 content-start"
                : "grid-cols-2"
              : "grid-cols-1 lg:grid-cols-2 gap-3"
          }`}
        >
          {/* Pack shots */}
          <div className="min-w-0 min-h-0 flex flex-col">
            <div
              className={`grid min-h-0 ${
                forPrint ? "grid-cols-4 gap-1" : "grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2"
              }`}
            >
              {r.images.map((img) => (
                <div key={img.src} className="flex flex-col min-w-0">
                  <div
                    className={`relative w-full rounded-lg overflow-hidden border border-black/10 bg-[#f8f7f5] mb-0.5 ${imgH}`}
                  >
                    <Image
                      src={img.src}
                      alt={`${r.title} — ${img.name}`}
                      fill
                      className="object-contain object-center p-1"
                      sizes="120px"
                    />
                  </div>
                  <div
                    className={`text-center font-semibold text-black ${
                      forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
                    }`}
                  >
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
            <p
              className={`text-[#737373] mt-1.5 ${
                forPrint ? "text-[9px] leading-snug" : "text-[11px] sm:text-xs mt-2"
              }`}
            >
              <span className="font-semibold text-black">Channels: </span>
              {r.channels}
            </p>
          </div>

          {/* Food security · malnutrition · WFP · nutrition */}
          <div
            className={`grid min-h-0 content-start ${
              forPrint ? "grid-cols-2 gap-1" : "grid-cols-1 sm:grid-cols-2 gap-2"
            }`}
          >
            {impactCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-lg border min-w-0 ${c.tone} ${
                  forPrint ? "p-1.5" : "p-2.5 sm:p-3 rounded-xl"
                }`}
              >
                <div
                  className={`font-semibold tracking-wide uppercase ${
                    forPrint ? "text-[8px] mb-0.5" : "text-[10px] mb-1"
                  }`}
                >
                  {c.label}
                </div>
                <p
                  className={`leading-snug ${
                    forPrint ? "text-[9px] line-clamp-4" : "text-[11px] sm:text-xs line-clamp-5"
                  }`}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SDG row */}
        <div className={`shrink-0 ${forPrint ? "mt-1.5" : "mt-2.5"}`}>
          <div
            className={`font-semibold text-[#737373] tracking-[1.5px] uppercase ${
              forPrint ? "text-[8px] mb-1" : "text-[10px] mb-1.5"
            }`}
          >
            UN SDG contribution
          </div>
          <div
            className={`grid ${
              forPrint ? "grid-cols-3 gap-1" : "grid-cols-1 sm:grid-cols-3 gap-2"
            }`}
          >
            {r.sdgs.map((s) => (
              <div
                key={s.n}
                className={`rounded-lg border border-black/10 bg-white min-w-0 flex gap-1.5 items-start ${
                  forPrint ? "p-1.5" : "p-2.5"
                }`}
              >
                <div
                  className={`shrink-0 rounded font-bold text-white flex items-center justify-center ${
                    forPrint ? "w-5 h-5 text-[9px]" : "w-7 h-7 text-xs"
                  }`}
                  style={{
                    backgroundColor:
                      s.n === "2"
                        ? "#DDA63A"
                        : s.n === "1"
                          ? "#E5243B"
                          : s.n === "3"
                            ? "#4C9F38"
                            : s.n === "4"
                              ? "#C5192D"
                              : s.n === "8"
                                ? "#A21942"
                                : s.n === "11"
                                  ? "#FD9D24"
                                  : s.n === "12"
                                    ? "#BF8B2E"
                                    : "#0d9488",
                  }}
                >
                  {s.n}
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-black leading-tight ${
                      forPrint ? "text-[9px]" : "text-[11px] sm:text-xs"
                    }`}
                  >
                    SDG {s.n} · {s.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[8px] line-clamp-2" : "text-[10px] sm:text-[11px]"
                    }`}
                  >
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className={`text-center text-[#737373] ${
              forPrint ? "text-[8px] mt-1" : "text-[10px] sm:text-xs mt-2"
            }`}
          >
            Order on{" "}
            <a
              href={SA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-900 underline underline-offset-2"
            >
              supplieradvisor.com
            </a>
            {" · "}
            guided by SAM · complementary to WFP / national Zero Hunger programmes
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

const A4 = {
  landscape: { w: "297mm", h: "210mm" },
  portrait: { w: "210mm", h: "297mm" },
  margin: "6mm",
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
    width: 297mm; height: 210mm; padding: 6mm;
  }
  #${PRINT_ROOT_ID}[data-orientation="portrait"] .deck-print-page {
    width: 210mm; height: 297mm; padding: 6mm;
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
  #${PRINT_ROOT_ID} a.deck-email-cta,
  #${PRINT_ROOT_ID} a.deck-email-cta * {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
  #${PRINT_ROOT_ID} a.deck-email-cta {
    background-color: #ffffff !important;
  }

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
    #${PRINT_ROOT_ID} a.deck-email-cta,
    #${PRINT_ROOT_ID} a.deck-email-cta * {
      color: #000000 !important;
      -webkit-text-fill-color: #000000 !important;
    }
    #${PRINT_ROOT_ID} a.deck-email-cta {
      background-color: #ffffff !important;
    }
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
    <PrintModeContext.Provider value={{ active: true, orientation }}>
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

  const shareUrl = (() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/foods#foods-deck`
        : "https://bigfivegroup.africa/foods#foods-deck";
    try {
      const u = new URL(base);
      u.searchParams.set("utm_source", "deck_share");
      u.searchParams.set("utm_medium", "share");
      u.searchParams.set("utm_campaign", "foods_deck");
      return u.toString();
    } catch {
      return base;
    }
  })();

  const onShare = async () => {
    const payload = {
      title: "Big Five Foods — Product & Impact Deck",
      text: "Fortified African nutrition: ~45% GP, ~85% cheaper vs wholesale/retail, 150k meals, 100k children, 74% more nutrition design.",
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
      className={`flex flex-col min-w-0 w-full max-w-full ${
        fullscreen
          ? "fixed inset-0 z-[100] bg-[#1a1008] p-2 sm:p-4 md:p-5"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-gradient-to-b from-amber-50 to-[#f3f4f6] p-1.5 sm:p-3 shadow-[0_25px_60px_-15px_rgb(180_83_9_/0.25)]"
      }`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 px-1.5 sm:px-3 py-2 mb-1 sm:mb-2 min-w-0">
        <div className="text-xs sm:text-sm font-medium text-[#404040] truncate min-w-0">
          Big Five Foods deck{" "}
          <span className="text-[#737373] font-normal">
            · {index + 1} / {TOTAL}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 min-h-9"
          >
            {shareState === "copied" ? (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Link copied</span>
              </>
            ) : shareState === "shared" ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Shared</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                Share
              </>
            )}
          </button>
          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 p-0.5 min-w-0">
            <button
              type="button"
              onClick={() => onDownload("landscape")}
              disabled={preparingPdf}
              className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-amber-950 hover:bg-white disabled:opacity-60 min-h-8"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">
                {preparingPdf && printOrientation === "landscape"
                  ? "Preparing…"
                  : "A4 Landscape"}
              </span>
              <span className="md:hidden">A4 L</span>
            </button>
            <button
              type="button"
              onClick={() => onDownload("portrait")}
              disabled={preparingPdf}
              className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-amber-950 hover:bg-white disabled:opacity-60 min-h-8"
            >
              <span className="hidden md:inline">
                {preparingPdf && printOrientation === "portrait"
                  ? "Preparing…"
                  : "A4 Portrait"}
              </span>
              <span className="md:hidden">A4 P</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 min-h-9"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Full"}</span>
          </button>
        </div>
      </div>

      <div className="mx-1.5 sm:mx-3 mb-2 h-1 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
        />
      </div>

      <div
        className={`relative flex-1 min-h-0 min-w-0 overflow-hidden ${
          fullscreen
            ? "min-h-0"
            : "min-h-[min(70dvh,36rem)] sm:min-h-[min(74dvh,42rem)] md:min-h-[min(76dvh,46rem)]"
        }`}
        style={
          fullscreen
            ? { height: "calc(100dvh - 7.5rem - env(safe-area-inset-bottom, 0px))" }
            : undefined
        }
      >
        <Slide index={index} />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 px-1 sm:px-2 pt-2 sm:pt-3 pb-1 min-w-0">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full border border-black/10 bg-white px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black disabled:opacity-30 hover:bg-black/5 min-h-10 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex flex-wrap justify-center gap-1 max-w-[50%] sm:max-w-none min-w-0">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 sm:w-5 bg-amber-700" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === TOTAL - 1}
          className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30 min-h-10 shrink-0"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id="foods-deck" className="scroll-mt-24 sm:scroll-mt-28 w-full min-w-0 max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center min-w-0">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-amber-800 mb-3 font-medium px-1">
          PRODUCT & IMPACT DECK · 15 SLIDES · SHAREABLE
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black mb-3 sm:mb-4 text-balance px-1">
          Big Five Foods — the deck
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-6 px-1">
          Product briefing for schools, governments, retailers and partners — packaging, metrics,
          certifications and a clear call to partner.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onShare}
            className="premium-button inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-amber-800 w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4 shrink-0" />
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
            className="premium-button inline-flex items-center justify-center gap-2 border border-amber-200 bg-white text-amber-950 px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-amber-50 disabled:opacity-60 w-full sm:w-auto"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {preparingPdf && printOrientation === "landscape"
                ? "Preparing…"
                : "PDF · A4 Landscape"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDownload("portrait")}
            disabled={preparingPdf}
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/10 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5 disabled:opacity-60 w-full sm:w-auto"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {preparingPdf && printOrientation === "portrait"
                ? "Preparing…"
                : "PDF · A4 Portrait"}
            </span>
          </button>
        </div>
      </div>
      <div className="w-full min-w-0 max-w-6xl mx-auto sm:px-6 lg:px-8">{deck}</div>
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
