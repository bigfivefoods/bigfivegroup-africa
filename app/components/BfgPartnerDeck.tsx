"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  Compass,
  Heart,
  Lightbulb,
  Package,
  Shield,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import DeckShell, {
  DECK_THEMES,
  DeckEyebrow,
  DeckPrintImage,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  useDeckPdfExport,
  useDeckPrintMode,
} from "./deck/DeckShell";
import { SOFI, SOFI_DECK_STATS } from "../lib/sofi";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";
import { NSNP_PRODUCTS } from "../lib/foodsProducts";
import { NSNP } from "../lib/nsnp";
import { GROUP_VMV } from "../lib/pillarAlignment";
import { SA_FOODS_STORE_URL } from "../lib/saStorefront";
import { CONTACT_EMAIL } from "../lib/contact";

/** Foods / Group warm branding — amber (not SPAR green, not emerald) */
const theme = DECK_THEMES.amber;
const TOTAL = 20;

/** Retail partnership pack economics (same model as Mandela pack / retail listing) */
const VAT_RATE = 0.15;
const TRADE_EX_VAT = 45;
const RRP_INCL_VAT = 67;
const TRADE_INCL_VAT = TRADE_EX_VAT * (1 + VAT_RATE); // 51.75
const RETAILER_MARGIN_RAND = RRP_INCL_VAT - TRADE_INCL_VAT; // 15.25
const RETAILER_MARGIN_PCT = (RETAILER_MARGIN_RAND / RRP_INCL_VAT) * 100; // ~22.8%

function formatZar(n: number): string {
  return `R${Math.round(n).toLocaleString("en-ZA")}`;
}

/** Illustrative sell-through scenarios for a single retail site / partner channel */
const SCALE_SCENARIOS = [
  { packsPerDay: 20, label: "Steady", note: "Early listing · modest shelf velocity" },
  { packsPerDay: 50, label: "Growing", note: "Established SKU · promo support" },
  { packsPerDay: 100, label: "High velocity", note: "Hero endcap · strong demand" },
] as const;

const RANGES = [
  {
    title: "Fortified porridges",
    src: "/foods/porridge-chocolate.jpg",
    stats: "74% more nutrition design · everyday staple",
    flavours: [
      { name: "Original", src: "/foods/porridge-original.jpg" },
      { name: "Chocolate", src: "/foods/porridge-chocolate.jpg" },
      { name: "Banana", src: "/foods/porridge-banana.jpg" },
      { name: "Strawberry", src: "/foods/porridge-strawberry.jpg" },
    ],
    how: "Micronutrient-dense breakfast/staple — addresses empty calories and vitamin gaps.",
  },
  {
    title: "Soya mince",
    src: "/foods/soya-beef.jpg",
    stats: "High protein · low cost per plate",
    flavours: [
      { name: "Rich Beef", src: "/foods/soya-beef.jpg" },
      { name: "Chilli Beef", src: "/foods/soya-chilli-beef.jpg" },
      { name: "Beef & Onion", src: "/foods/soya-beef-onion.jpg" },
      { name: "Mutton", src: "/foods/soya-mutton.jpg" },
    ],
    how: "Affordable plant protein that stretches pots — protein security without premium meat budgets.",
  },
  {
    title: "One-pot meals",
    src: "/foods/onepot-chicken.jpg",
    stats: "1kg → ~4kg prepared · 20 × 200g servings",
    flavours: [
      { name: "Chicken", src: "/foods/onepot-chicken.jpg" },
      { name: "Beef", src: "/foods/onepot-beef.jpg" },
      { name: "Chilli Beef", src: "/foods/onepot-chilli-beef.jpg" },
      { name: "Chakalaka", src: "/foods/onepot-chakalaka.jpg" },
    ],
    how: "Complete fortified plate — at R67 RRP that is R3.35 per 200g serving (R67 ÷ 20).",
  },
  {
    title: "Fortified soups",
    src: "/foods/soup-chicken.jpg",
    stats: "Lowest cost entry · micronutrients",
    flavours: [
      { name: "Chicken", src: "/foods/soup-chicken.jpg" },
      { name: "Brown Onion", src: "/foods/soup-brown-onion.jpg" },
      { name: "Oxtail", src: "/foods/soup-oxtail.jpg" },
      { name: "Minestrone", src: "/foods/soup-minestrone.jpg" },
    ],
    how: "Warmth and vitamins A & C, iron and calcium — accessible entry product.",
  },
] as const;

const SDGS = [
  {
    number: "2",
    title: "Zero Hunger",
    icon: "/sdg/sdg-2.png",
    color: "#DDA63A",
    how: "Fortified, affordable staples for households, schools and institutions.",
  },
  {
    number: "1",
    title: "No Poverty",
    icon: "/sdg/sdg-1.png",
    color: "#E5243B",
    how: "Cost-efficient meals stretch public and household budgets.",
  },
  {
    number: "4",
    title: "Quality Education",
    icon: "/sdg/sdg-4.png",
    color: "#C5192D",
    how: "School-channel nutrition so children can learn while fed.",
  },
  {
    number: "8",
    title: "Decent Work",
    icon: "/sdg/sdg-8.png",
    color: "#A21942",
    how: "Production, packing, logistics and ethical trade livelihoods.",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    icon: "/sdg/sdg-10.png",
    color: "#DD1367",
    how: "Access to affordable fortified food where markets under-serve.",
  },
  {
    number: "17",
    title: "Partnerships",
    icon: "/sdg/sdg-17.png",
    color: "#19486A",
    how: "Retail, institutional and distribution partners on one mission: Feed.",
  },
] as const;

function BrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const groupSrc = "/bigfivegroup-logo.png";
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
      <div
        className={`relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden ${
          light ? "drop-shadow-md brightness-0 invert" : ""
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={groupSrc} alt="Big Five Group" fit="contain" />
        ) : (
          <Image src={groupSrc} alt="Big Five Group" fill className="object-contain" sizes="56px" priority />
        )}
      </div>
      <span
        className={`text-xl sm:text-2xl font-light ${light ? "text-white/40" : "text-black/25"}`}
        aria-hidden
      >
        ×
      </span>
      <div className={`relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden ${light ? "drop-shadow-md" : ""}`}>
        {pdf ? (
          <DeckPrintImage src={foodsSrc} alt="Big Five Foods" fit="contain" />
        ) : (
          <Image src={foodsSrc} alt="Big Five Foods" fill className="object-contain" sizes="56px" priority />
        )}
      </div>
      <div className={`text-left min-w-0 ${light ? "text-white/80" : "text-[#404040]"}`}>
        <div className={`text-sm sm:text-base font-semibold tracking-tight ${light ? "text-white" : "text-black"}`}>
          Partner briefing
        </div>
        <div className={`text-[10px] font-medium ${light ? "text-white/55" : "text-[#737373]"}`}>
          Generic · Foods-led · Retail economics
        </div>
      </div>
    </div>
  );
}

function RefLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
      {children}
    </a>
  );
}

function Slide({ index }: { index: number }) {
  const forPrint = useDeckPrintMode();
  const pdf = useDeckPdfExport();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {pdf ? (
              <DeckPrintImage src="/home-hero.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/home-hero.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width:1280px) 100vw, 1200px"
                priority
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, #1c1006f2 0%, #78350fe6 45%, #1c100699 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    BIG FIVE GROUP · PARTNER BRIEFING · CONFIDENTIAL
                  </DeckEyebrow>
                  <BrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    Fortified African products.
                    <br />
                    <span className="text-amber-300">Healthy retailer margin. Real scale.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    A partner presentation built around Big Five Foods: sixteen flavours across four
                    ranges, NSNP institutional packs, buy at R45 ex. VAT / sell at R67 incl. VAT —
                    and what that means for your daily, monthly and annual retail economics.
                  </p>
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Big Five Group · Big Five Foods · amber brand system</p>
                  <p>bigfivegroup.africa/partner/big-five-group#bfg-partner-deck</p>
                  <p>{TOTAL} slides · Shareable · Printable · Not a binding offer</p>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AGENDA</DeckEyebrow>
          <DeckTitle>What this partner briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "Big Five Group north star — then the SOFI challenge we design against",
              "Big Five Foods products — four ranges, sixteen flavours, NSNP packs",
              "Retailer economics — R45 buy (ex. VAT) · R67 sell (incl. VAT) · front margin",
              "Scale for your business — daily / monthly / annual sell-through scenarios",
              "How we partner — pathways, SupplierAdvisor®, proof language, next steps",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 items-start">
                <span
                  className="shrink-0 w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[#404040] leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ol>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>BIG FIVE GROUP · NORTH STAR</DeckEyebrow>
          <DeckTitle>Vision · Mission · Values</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-1">
            {[
              {
                t: "Vision",
                icon: Compass,
                bar: "from-amber-500 to-orange-600",
                color: "text-amber-800",
                title: GROUP_VMV.vision.title,
                d: GROUP_VMV.vision.body,
              },
              {
                t: "Mission",
                icon: Target,
                bar: "from-orange-500 to-amber-700",
                color: "text-orange-800",
                title: GROUP_VMV.mission.title,
                d: GROUP_VMV.mission.body,
              },
              {
                t: "Values",
                icon: Shield,
                bar: "from-yellow-500 to-amber-600",
                color: "text-amber-900",
                title: "What we refuse to compromise",
                d: "Humanity, innovation, integrity, excellence and impact — how we hire, partner and deliver.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-3.5 sm:p-4 min-w-0 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
                <div
                  className={`inline-flex items-center gap-1.5 text-[10px] tracking-[2px] font-semibold mb-1.5 mt-0.5 ${x.color}`}
                >
                  <x.icon className="w-3.5 h-3.5" />
                  {x.t.toUpperCase()}
                </div>
                <h3 className="text-sm font-semibold text-black mb-1 leading-snug">{x.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#404040] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3">
            {(
              [
                { icon: Users, ...GROUP_VMV.values[0] },
                { icon: Lightbulb, ...GROUP_VMV.values[1] },
                { icon: Shield, ...GROUP_VMV.values[2] },
                { icon: Sparkles, ...GROUP_VMV.values[3] },
                { icon: Heart, ...GROUP_VMV.values[4] },
              ] as const
            ).map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-2.5 min-w-0"
              >
                <v.icon className="w-3.5 h-3.5 text-amber-800 mb-1" />
                <div className="text-[11px] font-semibold text-black">{v.title}</div>
                <p className="text-[10px] text-[#525252] leading-snug mt-0.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE CHALLENGE · {SOFI.edition}
          </DeckEyebrow>
          <DeckTitle>Why fortified, affordable product matters</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.africaHunger.value}
              label={SOFI_DECK_STATS.africaHunger.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.healthyDiets.value}
              label={SOFI_DECK_STATS.healthyDiets.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.globalHunger.value}
              label={SOFI_DECK_STATS.globalHunger.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.childStunting.value}
              label={SOFI_DECK_STATS.childStunting.label}
            />
          </div>
          <p className="text-[11px] sm:text-xs text-white/45 leading-relaxed max-w-3xl">
            Source: {SOFI.shortCite}. External context only. Partners place product that answers this
            data — not charity pricing that collapses the chain.
          </p>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>BIG FIVE FOODS · THE OFFER</DeckEyebrow>
          <DeckTitle>Four ranges. Sixteen flavours. One nutrition system.</DeckTitle>
          <p className="text-sm text-[#525252] mb-3 max-w-3xl leading-relaxed">
            Shelf-stable, fortified African staples designed for taste, cost and micronutrients —
            retail, catering and institutional. Partners list products people reorder.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {RANGES.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden min-w-0 flex flex-col"
              >
                <div className="relative h-28 sm:h-32 bg-[#f8f7f5]">
                  {pdf ? (
                    <DeckPrintImage src={r.src} alt={r.title} fit="contain" paddingClass="p-2" />
                  ) : (
                    <Image src={r.src} alt={r.title} fill className="object-contain p-2" sizes="200px" />
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-black mb-0.5">{r.title}</h3>
                  <p className="text-[10px] font-medium text-amber-900 mb-1 leading-snug">
                    {r.flavours.map((f) => f.name).join(" · ")}
                  </p>
                  <p className="text-[10px] font-medium text-amber-800 mb-1.5">{r.stats}</p>
                  <p className="text-[11px] text-[#525252] leading-snug flex-1">{r.how}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRODUCTS · FLAVOUR RANGE</DeckEyebrow>
          <DeckTitle>Every flavour partners can put on shelf</DeckTitle>
          <div className="space-y-3 mt-1">
            {RANGES.map((r) => (
              <div key={r.title} className="min-w-0">
                <div className="text-xs font-semibold text-amber-950 mb-1.5">{r.title}</div>
                <div className="grid grid-cols-4 gap-2">
                  {r.flavours.map((f) => (
                    <div
                      key={f.name}
                      className="rounded-xl border border-black/10 bg-white overflow-hidden min-w-0"
                    >
                      <div className="relative h-16 sm:h-20 bg-[#f8f7f5]">
                        {pdf ? (
                          <DeckPrintImage src={f.src} alt={f.name} fit="contain" paddingClass="p-1" />
                        ) : (
                          <Image
                            src={f.src}
                            alt={f.name}
                            fill
                            className="object-contain p-1"
                            sizes="120px"
                          />
                        )}
                      </div>
                      <div className="px-1.5 py-1 text-center text-[10px] font-medium text-black truncate">
                        {f.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRODUCT · ONE-POT YIELD</DeckEyebrow>
          <DeckTitle>1kg one-pot → 4kg prepared = 20 meals</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <DeckStatTile theme={theme} value="1kg" label="Dry pack (flagship one-pot)" />
            <DeckStatTile theme={theme} value="4kg" label="Prepared food when cooked" />
            <DeckStatTile theme={theme} value="R3.35" label="Per 200g serving at RRP R67 (R67 ÷ 20)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 min-w-0">
              <UtensilsCrossed className="w-5 h-5 text-amber-800 mb-2" />
              <h3 className="text-sm font-semibold text-black mb-1.5">Shelf talk that sells</h3>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                A complete fortified plate — Chicken, Beef, Chilli Beef, Chakalaka. Clear for
                shoppers: not just dry weight, but <strong className="text-black">20 × 200g servings</strong>{" "}
                from one pack at <strong className="text-black">R3.35 per meal</strong> on RRP.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4 min-w-0">
              <Package className="w-5 h-5 text-amber-800 mb-2" />
              <h3 className="text-sm font-semibold text-black mb-1.5">Same pack economics</h3>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                Partnership listing price: buy <strong className="text-black">R45 ex. VAT</strong>,
                sell <strong className="text-black">R67 incl. VAT</strong> — margin slide next. Pack
                sizes and SKU list confirmed on the term sheet.
              </p>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NSNP · INSTITUTIONAL PRODUCTS</DeckEyebrow>
          <DeckTitle>School-channel 5kg packs — programme formats</DeckTitle>
          <p className="text-sm text-[#525252] mb-3 max-w-3xl leading-relaxed">
            Three NSNP-approved institutional packs for school kitchens — pathway with{" "}
            {NSNP.departmentShort} · planned scale{" "}
            <strong className="text-black">2.5 million children/day</strong> (plan, not current
            headcount).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {NSNP_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-amber-200 bg-amber-50/40 overflow-hidden min-w-0"
              >
                <div className="relative h-28 bg-white">
                  {pdf ? (
                    <DeckPrintImage src={p.src} alt={p.name} fit="contain" paddingClass="p-2" />
                  ) : (
                    <Image src={p.src} alt={p.name} fill className="object-contain p-2" sizes="240px" />
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1">
                    {p.badge}
                  </div>
                  <h3 className="text-sm font-semibold text-black leading-snug">{p.shortName}</h3>
                  <p className="text-[11px] text-[#525252] mt-1 leading-snug line-clamp-3">{p.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>RETAILER ECONOMICS</DeckEyebrow>
          <DeckTitle>R45 buy (ex. VAT) → R67 sell (incl. VAT)</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <DeckStatTile
              theme={theme}
              value="R45"
              label="Your buy price · exclusive of VAT (trade)"
            />
            <DeckStatTile
              theme={theme}
              value="R67"
              label="Recommended sell · inclusive of VAT (RRP)"
            />
            <DeckStatTile
              theme={theme}
              value={`R${RETAILER_MARGIN_RAND.toFixed(2)}`}
              label={`Indicative front margin · ~${Math.round(RETAILER_MARGIN_PCT)}% of RRP`}
            />
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 mb-3">
            <h3 className="text-sm font-semibold text-black mb-2">How the margin is calculated</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#404040]">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>
                  Trade cost R45 ex. VAT → aligned to incl. VAT at 15%:{" "}
                  <strong className="text-black">R{TRADE_INCL_VAT.toFixed(2)}</strong> (R45 × 1.15)
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>
                  Front margin = RRP R67 − R{TRADE_INCL_VAT.toFixed(2)} ={" "}
                  <strong className="text-black">R{RETAILER_MARGIN_RAND.toFixed(2)}</strong> per pack
                  (~{Math.round(RETAILER_MARGIN_PCT)}% of RRP)
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>
                  Fair shelf comparison: cost and RRP on the same incl.-VAT basis before promotions
                  or overheads
                </span>
              </li>
            </ul>
          </div>
          <p className="text-[11px] text-[#737373] leading-relaxed max-w-3xl">
            Illustrative front margin only — excludes store overheads, promotions, shrink and any
            ring-fenced giving. Exact SKUs, pack sizes and VAT treatment confirmed on the term sheet.
            Big Five Foods internal GP is not disclosed in this partner briefing.
          </p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>SCALE · YOUR BUSINESS</DeckEyebrow>
          <DeckTitle>What sell-through means day · month · year</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] mb-3 max-w-3xl leading-relaxed">
            Illustrative scenarios for <strong className="text-black">one retail site / channel</strong>{" "}
            at R67 RRP and ~R{RETAILER_MARGIN_RAND.toFixed(2)} front margin per pack. Replace with
            your network velocity on the term sheet.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full text-left text-[10px] sm:text-xs min-w-[36rem]">
              <thead>
                <tr className="border-b border-black/10 bg-amber-50/80">
                  <th className="p-2.5 font-semibold text-amber-950">Scenario</th>
                  <th className="p-2.5 font-semibold text-amber-950">Packs / day</th>
                  <th className="p-2.5 font-semibold text-amber-950">Front margin / day</th>
                  <th className="p-2.5 font-semibold text-amber-950">Front margin / month*</th>
                  <th className="p-2.5 font-semibold text-amber-950">Front margin / year</th>
                  <th className="p-2.5 font-semibold text-amber-950">Retail sales / year</th>
                </tr>
              </thead>
              <tbody>
                {SCALE_SCENARIOS.map((s) => {
                  const dayM = RETAILER_MARGIN_RAND * s.packsPerDay;
                  const moM = dayM * 30;
                  const yrM = dayM * 365;
                  const yrRetail = RRP_INCL_VAT * s.packsPerDay * 365;
                  return (
                    <tr key={s.packsPerDay} className="border-b border-black/5">
                      <td className="p-2.5">
                        <div className="font-semibold text-black">{s.label}</div>
                        <div className="text-[10px] text-[#737373]">{s.note}</div>
                      </td>
                      <td className="p-2.5 font-semibold text-black">{s.packsPerDay}</td>
                      <td className="p-2.5 text-[#404040]">{formatZar(dayM)}</td>
                      <td className="p-2.5 text-[#404040]">{formatZar(moM)}</td>
                      <td className="p-2.5 font-semibold text-amber-950">{formatZar(yrM)}</td>
                      <td className="p-2.5 text-[#404040]">{formatZar(yrRetail)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-[#737373]">
            *Month modelled as 30 days. Year = 365 days. Front margin ≠ net store profit. Trade cost
            at R45 ex. VAT × packs is the Big Five Foods invoice base (excl. VAT).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            {SCALE_SCENARIOS.map((s) => {
              const yrTrade = TRADE_EX_VAT * s.packsPerDay * 365;
              return (
                <div
                  key={s.packsPerDay}
                  className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 min-w-0"
                >
                  <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">
                    {s.packsPerDay} packs/day
                  </div>
                  <div className="text-sm font-semibold text-black mt-1">
                    Trade invoices ~{formatZar(yrTrade)}/yr
                  </div>
                  <p className="text-[10px] text-[#525252] mt-0.5">at R45 ex. VAT · before VAT on invoice</p>
                </div>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SCALE · MULTI-SITE SNAPSHOT
          </DeckEyebrow>
          <DeckTitle>Multiply by your store or outlet count</DeckTitle>
          <p className="text-xs sm:text-sm text-white/70 mb-4 max-w-3xl leading-relaxed">
            Same pack economics — illustrative network view at the{" "}
            <strong className="text-white">50 packs/day · Growing</strong> velocity per site.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { sites: 10, label: "Pilot cluster" },
              { sites: 50, label: "Regional roll-out" },
              { sites: 100, label: "National tranche" },
            ].map((row) => {
              const packsDay = 50 * row.sites;
              const yrMargin = RETAILER_MARGIN_RAND * packsDay * 365;
              const yrRetail = RRP_INCL_VAT * packsDay * 365;
              return (
                <div
                  key={row.sites}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 min-w-0"
                >
                  <div className="text-[10px] font-bold tracking-wide text-amber-300 mb-1">
                    {row.label}
                  </div>
                  <div className="text-2xl font-semibold text-white tracking-tight">
                    {row.sites} sites
                  </div>
                  <p className="text-xs text-white/55 mt-1 mb-3">
                    {packsDay.toLocaleString("en-ZA")} packs/day network · 50/site
                  </p>
                  <div className="text-sm text-white font-semibold">{formatZar(yrMargin)} / yr</div>
                  <div className="text-[11px] text-white/50">front margin (illustrative)</div>
                  <div className="text-xs text-white/70 mt-2">{formatZar(yrRetail)} retail / yr</div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-white/40 leading-relaxed max-w-3xl">
            Planning assumptions only — not a forecast. Confirm store count, velocity and promotions
            with your commercial team.
          </p>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>VALUE · PRODUCT</DeckEyebrow>
          <DeckTitle>Cost advantage that helps institutions and households</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.cheaperThanMarket.value}
              label={FOODS_ECONOMICS.cheaperThanMarket.label}
            />
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.nutritionDesign.value}
              label={FOODS_ECONOMICS.nutritionDesign.label}
            />
          </div>
          <p className="text-sm text-[#404040] leading-relaxed max-w-3xl mb-2">
            Beyond retailer front margin: Big Five Foods is positioned ~50% cheaper vs typical
            wholesale/retail pathways (internal) while remaining fortification-forward — so public
            menus stretch budgets and retail shoppers get nutrition they will reorder.
          </p>
          <p className="text-[11px] text-[#737373]">{FOODS_ECONOMICS.honesty}</p>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UN SDGs</DeckEyebrow>
          <DeckTitle>Product-led alignment with the SDGs</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 mt-1">
            {SDGS.map((g) => (
              <div
                key={g.number}
                className="rounded-xl border border-black/10 bg-white p-3 flex gap-2.5 min-w-0"
              >
                <div className="relative w-11 h-11 shrink-0 rounded-md overflow-hidden">
                  {pdf ? (
                    <DeckPrintImage src={g.icon} alt={`SDG ${g.number}`} fit="cover" />
                  ) : (
                    <Image src={g.icon} alt={`SDG ${g.number}`} fill className="object-cover" sizes="44px" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold" style={{ color: g.color }}>
                    SDG {g.number} · {g.title}
                  </div>
                  <p className="text-[11px] text-[#525252] leading-snug mt-0.5">{g.how}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            HOW WE PARTNER
          </DeckEyebrow>
          <DeckTitle>Clear roles. Product first. Shared proof.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
            {[
              {
                icon: Package,
                t: "We supply product",
                d: "Manufacture, fortify, certify and pack — sixteen flavours + NSNP 5kg formats.",
              },
              {
                icon: Store,
                t: "You list & sell",
                d: "Retail shelves at R67 RRP — or institutional offtake on agreed programme terms.",
              },
              {
                icon: Truck,
                t: "Optional last mile",
                d: "Direct containers and logistics where product must reach communities on footfall.",
              },
              {
                icon: ShieldCheck,
                t: "Prove on SA®",
                d: "SupplierAdvisor® — quotes, orders and audit trails partners can inspect.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 min-w-0"
              >
                <x.icon className="w-5 h-5 text-amber-300 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">{x.t}</h3>
                <p className="text-xs text-white/65 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/50 max-w-3xl leading-relaxed">
            Live storefront:{" "}
            <RefLink href={SA_FOODS_STORE_URL}>{SA_FOODS_STORE_URL.replace("https://", "")}</RefLink>
          </p>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PARTNERSHIP PATHWAYS</DeckEyebrow>
          <DeckTitle>Three ways to work with Big Five Foods</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
            {[
              {
                n: "01",
                t: "Retail & catering",
                d: "List the four ranges at R45 / R67 economics — flavours households reorder, margin that sustains.",
              },
              {
                n: "02",
                t: "Institutional & school",
                d: "NSNP-approved 5kg packs — programme supply with honest plan-scale language.",
              },
              {
                n: "03",
                t: "Distribution & corridors",
                d: "Place BFF into markets and feeding schemes with SupplierAdvisor® as the trade OS.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5 min-w-0"
              >
                <div className="text-[10px] font-bold tracking-wide text-amber-800 mb-1">{s.n}</div>
                <h3 className="text-base font-semibold text-black mb-2">{s.t}</h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PROOF LANGUAGE</DeckEyebrow>
          <DeckTitle>How we speak about scale — honestly</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {[
              {
                t: "Plan scale",
                d: "2.5M children/day NSNP pathway — ambition as programmes ramp, not current daily headcount.",
              },
              {
                t: "Retail scenarios",
                d: "Packs/day tables are discussion assumptions — replace with your sell-through data.",
              },
              {
                t: "Internal analysis",
                d: "~50% cheaper vs wholesale/retail · 74% more nutrition by design — NDA for SKU detail.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-black/10 bg-white p-4 min-w-0">
                <h3 className="text-sm font-semibold text-amber-950 mb-1.5">{x.t}</h3>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#737373] max-w-3xl leading-relaxed">
            Full notes: <RefLink href="https://bigfivegroup.africa/methodology">methodology</RefLink>.
          </p>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
          <DeckTitle>Practical path for partners</DeckTitle>
          <ol className="space-y-3 max-w-2xl mt-1">
            {[
              {
                t: "Pick ranges & flavours",
                d: "Which of the sixteen flavours and NSNP packs first — retail, catering or institutional.",
              },
              {
                t: "Lock R45 / R67 on the term sheet",
                d: "Trade ex. VAT, RRP incl. VAT, margin discipline and SKU list.",
              },
              {
                t: "Model your velocity",
                d: "Agree packs/day assumptions per site — then sample, list and promote.",
              },
              {
                t: "Trade on SupplierAdvisor®",
                d: "Verified company relationship · quotes/orders on the Big Five Foods store.",
              },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-black">{s.t}</div>
                  <p className="text-xs text-[#525252] leading-relaxed mt-0.5">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SUMMARY
          </DeckEyebrow>
          <DeckTitle>Product. Margin. Scale. Partnership.</DeckTitle>
          <div className="space-y-3 max-w-2xl mt-2">
            {[
              "Big Five Foods: four ranges · sixteen flavours · NSNP 5kg institutional packs.",
              "Retail listing: buy R45 ex. VAT · sell R67 incl. VAT · ~R15.25 front margin per pack (~23% of RRP).",
              "Scale: model packs/day → month → year — then multiply by your sites.",
              "One-pot shelf talk: 1kg → 4kg prepared = 20 meals at R3.35 each on RRP.",
              "Partners place product with SupplierAdvisor® rails and honest proof language.",
            ].map((t) => (
              <p key={t} className="flex gap-2 text-sm text-white/80 leading-relaxed">
                <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                {t}
              </p>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GO DEEPER</DeckEyebrow>
          <DeckTitle>Related briefings</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {[
              {
                t: "Foods product & impact deck",
                d: "Full public Foods strategy deck on the Group site.",
                href: "https://bigfivegroup.africa/foods#foods-deck",
              },
              {
                t: "Food security · SOFI & SDGs",
                d: "Challenge/opportunity page linking SOFI to every pillar.",
                href: "https://bigfivegroup.africa/food-security",
              },
              {
                t: "Connect · SchoolAdvisor",
                d: "Kitchen compliance case studies on SupplierAdvisor®.",
                href: "https://bigfivegroup.africa/connect#case-study-schooladvisor",
              },
              {
                t: "Methodology",
                d: "Plan scale vs programme-reported vs internal analysis.",
                href: "https://bigfivegroup.africa/methodology",
              },
            ].map((x) => (
              <a
                key={x.t}
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/10 bg-white p-4 hover:border-amber-300 transition-colors min-w-0 block"
              >
                <div className="text-sm font-semibold text-black mb-1">{x.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </a>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 19:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div>
              <DeckEyebrow light theme={theme}>
                CALL TO ACTION
              </DeckEyebrow>
              <BrandRow light />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                List the products. Own the margin.
                <br />
                <span className="text-amber-300">Scale what your customers reorder.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Partner with Big Five Foods — sixteen flavours, NSNP packs, R45 / R67 retailer
                economics, and trade on SupplierAdvisor®.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Big Five Foods · Partner listing · R45 / R67"
                  )}`}
                  className="deck-primary-cta premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ color: "#000", backgroundColor: "#fff", WebkitTextFillColor: "#000" }}
                >
                  Email {CONTACT_EMAIL}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={SA_FOODS_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deck-email-cta premium-button inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3 rounded-full text-sm font-semibold"
                >
                  Open Big Five Foods store
                </a>
              </div>
            </div>
            <div className="text-white/40 text-[10px] sm:text-xs space-y-0.5">
              <p>Big Five Group · Generic partner presentation · Foods-led</p>
              <p>bigfivegroup.africa/partner/big-five-group · Not a binding commercial offer</p>
              <p>R45 / R67 and margin scenarios are illustrative — confirm on the term sheet</p>
            </div>
          </DeckTitleLayout>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function BfgPartnerDeck() {
  return (
    <div id="bfg-partner-deck" className="scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold text-amber-900">
          BIG FIVE GROUP · {TOTAL} SLIDES · GENERIC PARTNER DECK · FOODS-LED
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Products · retailer margin · scale
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Sixteen flavours, NSNP packs, R45 buy / R67 sell economics, and sell-through scenarios for
          partners — shareable and printable.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="bfg-partner-deck-shell"
          printRootId="bfg-partner-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="BFG PARTNER DECK"
          title="Big Five Group — Partner briefing · Foods & retail economics"
          description="Products, R45/R67 retailer margin, scale scenarios, partnership pathways."
          sharePath="/partner/big-five-group#bfg-partner-deck"
          shareTitle="Big Five Foods — Partner briefing"
          shareText="Big Five Foods partner deck: products, R45 buy / R67 sell margin, and scale scenarios."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → ·{" "}
        <span className="font-medium text-black">/partner/big-five-group#bfg-partner-deck</span>
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> — choose{" "}
        <strong className="text-black">Save as PDF</strong>.
      </p>
    </div>
  );
}
