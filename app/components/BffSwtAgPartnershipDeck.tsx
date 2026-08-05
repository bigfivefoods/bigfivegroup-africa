"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  Globe2,
  Package,
  ShieldCheck,
  Store,
  Truck,
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
import { SA_FOODS_STORE_URL } from "../lib/saStorefront";

const theme = DECK_THEMES.amber;
const TOTAL = 18;

const SDGS = [
  {
    number: "2",
    title: "Zero Hunger",
    icon: "/sdg/sdg-2.png",
    color: "#DDA63A",
    how: "Fortified, affordable staples for households, schools and institutions — nutrition at a price that can scale.",
  },
  {
    number: "1",
    title: "No Poverty",
    icon: "/sdg/sdg-1.png",
    color: "#E5243B",
    how: "Cost-efficient meals stretch public and household budgets; distribution creates corridor jobs and trade livelihoods.",
  },
  {
    number: "4",
    title: "Quality Education",
    icon: "/sdg/sdg-4.png",
    color: "#C5192D",
    how: "School-channel nutrition (NSNP pathway) so children can learn while fed — concentration and attendance follow the plate.",
  },
  {
    number: "8",
    title: "Decent Work",
    icon: "/sdg/sdg-8.png",
    color: "#A21942",
    how: "Production, packing, logistics and international distribution roles — ethical trade rails via SupplierAdvisor®.",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    icon: "/sdg/sdg-10.png",
    color: "#DD1367",
    how: "Access to affordable fortified food where markets under-serve — Africa-first design, global distribution partner.",
  },
  {
    number: "17",
    title: "Partnerships",
    icon: "/sdg/sdg-17.png",
    color: "#19486A",
    how: "BFF manufactures; SWT-AG distributes globally — shared proof, shared corridors, one mission: Feed.",
  },
] as const;

const RANGES = [
  {
    title: "Fortified porridges",
    src: "/foods/porridge-chocolate.jpg",
    stats: "74% more nutrition design · everyday staple",
    how: "Micronutrient-dense breakfast/staple — addresses empty calories and vitamin gaps in household diets.",
  },
  {
    title: "Soya mince",
    src: "/foods/soya-beef.jpg",
    stats: "High protein · low cost per plate",
    how: "Affordable plant protein that stretches pots — protein security without premium meat budgets.",
  },
  {
    title: "One-pot meals",
    src: "/foods/onepot-chicken.jpg",
    stats: "1kg → ~4kg prepared · complete plate",
    how: "Balanced meal formats for caterers and homes — fortification plus convenience at scale.",
  },
  {
    title: "Fortified soups",
    src: "/foods/soup-chicken.jpg",
    stats: "Lowest cost entry · micronutrients",
    how: "Warmth and vitamins A & C, iron and calcium — accessible entry product for constrained budgets.",
  },
] as const;

function CoBrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
      <div
        className={`relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden ${
          light ? "drop-shadow-md" : ""
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={foodsSrc} alt="Big Five Foods" fit="contain" />
        ) : (
          <Image src={foodsSrc} alt="Big Five Foods" fill className="object-contain" sizes="56px" priority />
        )}
      </div>
      <span
        className={`text-xl sm:text-2xl font-light ${light ? "text-white/40" : "text-black/25"}`}
        aria-hidden
      >
        ×
      </span>
      <div
        className={`rounded-xl px-3.5 py-2 border shadow-sm ${
          light ? "bg-white/95 border-white/40" : "bg-slate-900 border-slate-800"
        }`}
      >
        <div
          className={`text-sm sm:text-base font-bold tracking-tight ${
            light ? "text-slate-900" : "text-white"
          }`}
        >
          SWT-AG
        </div>
        <div className={`text-[10px] font-medium ${light ? "text-slate-600" : "text-slate-400"}`}>
          Strategic global distributor
        </div>
      </div>
    </div>
  );
}

function RefLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:opacity-80"
    >
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
              <DeckPrintImage src="/foods-hero.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/foods-hero.jpg"
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
                    STRATEGIC PARTNERSHIP · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    Big Five Foods × SWT-AG
                    <br />
                    <span className="text-amber-300">
                      Fortified African nutrition. Global distribution.
                    </span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    A partnership presentation: how Big Five Foods products answer UN SOFI hunger and
                    malnutrition challenges, align with the SDGs — and how SWT-AG, as strategic global
                    distributor, takes that nutrition into markets worldwide.
                  </p>
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>BFF manufactures · SWT-AG distributes · SupplierAdvisor® verifies trade</p>
                  <p>bigfivegroup.africa/partner/swt-ag#bff-swt-deck</p>
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
          <DeckTitle>What this partnership briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "The partnership: BFF product · SWT-AG global distribution",
              "UN SOFI challenges — global hunger, Africa epicentre, healthy diets, child stunting",
              "Big Five Foods ranges — how each product class answers SOFI",
              "NSNP institutional pathway & programme economics",
              "UN SDG alignment driven by Foods",
              "How we go to market together · SupplierAdvisor® · next steps",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 text-white text-xs font-semibold flex items-center justify-center">
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
          <DeckEyebrow theme={theme}>THE PARTNERSHIP</DeckEyebrow>
          <DeckTitle>One product engine. One global distributor.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5 min-w-0">
              <UtensilsCrossed className="w-6 h-6 text-amber-800 mb-2" />
              <h3 className="text-lg font-semibold text-black mb-1">Big Five Foods</h3>
              <p className="text-sm text-[#404040] leading-relaxed mb-3">
                Manufactures fortified African staples — porridges, soya, one-pots, soups and NSNP
                institutional packs — designed for affordability, shelf life and micronutrient impact.
              </p>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {[
                  "Certified manufacturing (ISO · FSSC · ethical · dietary)",
                  "~50% cheaper vs wholesale/retail pathways (internal)",
                  "SupplierAdvisor® verified seller of record",
                ].map((t) => (
                  <li key={t} className="flex gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 min-w-0">
              <Globe2 className="w-6 h-6 text-slate-800 mb-2" />
              <h3 className="text-lg font-semibold text-black mb-1">SWT-AG</h3>
              <p className="text-sm text-[#404040] leading-relaxed mb-3">
                Strategic global distributor of Big Five Foods products — taking fortified nutrition
                into international markets with commercial discipline and corridor reach.
              </p>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {[
                  "Global route-to-market for BFF ranges",
                  "Distributor of record in agreed territories",
                  "Shared mission: Feed — at scale, with proof",
                ].map((t) => (
                  <li key={t} className="flex gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl">
            Together: African product designed for SOFI-scale problems, distributed globally with a
            partner built for international trade — not a one-off export trial.
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE CHALLENGE · {SOFI.edition}
          </DeckEyebrow>
          <DeckTitle>
            Global hunger eased slightly — the crisis is far from over
          </DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.globalHunger.value}
              label={SOFI_DECK_STATS.globalHunger.label}
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
              value={SOFI_DECK_STATS.foodInsecurity.value}
              label={SOFI_DECK_STATS.foodInsecurity.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI.global.prevalencePct + "%"}
              label={`Global prevalence of undernourishment ${SOFI.dataYearHunger} · still far above SDG Zero Hunger trajectory`}
            />
          </div>
          <p className="text-[11px] sm:text-xs text-white/45 leading-relaxed max-w-3xl">
            Source: {SOFI.shortCite}. External context only — not Big Five audited metrics.{" "}
            <RefLink href={SOFI.newsUrl}>SOFI 2026 newsroom</RefLink>
            {" · "}
            <RefLink href={SOFI.reportUrl}>Full report</RefLink>.
          </p>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE CHALLENGE · AFRICA · {SOFI.edition}
          </DeckEyebrow>
          <DeckTitle>Africa remains the epicentre of hunger</DeckTitle>
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
              value={SOFI_DECK_STATS.africaShare2030.value}
              label={SOFI_DECK_STATS.africaShare2030.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value={SOFI_DECK_STATS.childStunting.value}
              label={SOFI_DECK_STATS.childStunting.label}
            />
            <DeckStatTile
              dark
              theme={theme}
              value="~1/3"
              label="Children in hard-hit African subregions still face very high stunting prevalence"
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl mb-2">
            {SOFI.africa.epicentreNote}. Big Five Foods is designed{" "}
            <strong className="text-white">in Africa, for African plates</strong> — and SWT-AG takes
            that product into global markets without losing the mission.
          </p>
          <p className="text-[11px] text-white/40 leading-relaxed max-w-3xl">
            {SOFI.shortCite} · child stunting JME framing.
          </p>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY PRODUCT MATTERS</DeckEyebrow>
          <DeckTitle>SOFI is not only calories — it is affordability and nutrition quality</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {[
              {
                t: "Hunger & undernourishment",
                d: `${SOFI.africa.hungryLabel} people in Africa faced hunger in ${SOFI.dataYearHunger}. Staples must be reliable, shelf-stable and scaleable.`,
              },
              {
                t: "Healthy diets unaffordable",
                d: `${SOFI.healthyDiets.cannotAffordLabel} people worldwide cannot afford a healthy diet. Cost per plate is a strategic variable — not a footnote.`,
              },
              {
                t: "Child stunting",
                d: `~${SOFI.childNutrition.stuntedLabel} children under 5 stunted globally. Fortification and school-channel feeding are structural responses.`,
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 min-w-0"
              >
                <h3 className="text-sm font-semibold text-amber-950 mb-2">{x.t}</h3>
                <p className="text-xs text-[#404040] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#404040] leading-relaxed max-w-3xl">
            <strong className="text-black">Big Five Foods</strong> answers with fortified formats at
            ~{FOODS_ECONOMICS.cheaperThanMarket.value} below typical wholesale/retail pathways
            (internal) while holding healthy unit economics — so distributors like{" "}
            <strong className="text-black">SWT-AG</strong> can sell a product that is both mission
            and margin.
          </p>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>BIG FIVE FOODS · RANGES</DeckEyebrow>
          <DeckTitle>Four retail & catering ranges that put nutrition on plates</DeckTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-1">
            {RANGES.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden min-w-0 flex flex-col"
              >
                <div className="relative h-28 sm:h-32 bg-[#f8f7f5]">
                  {pdf ? (
                    <DeckPrintImage src={r.src} alt={r.title} fit="contain" paddingClass="p-2" />
                  ) : (
                    <Image
                      src={r.src}
                      alt={r.title}
                      fill
                      className="object-contain p-2"
                      sizes="200px"
                    />
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-black mb-0.5">{r.title}</h3>
                  <p className="text-[10px] font-medium text-amber-800 mb-1.5">{r.stats}</p>
                  <p className="text-[11px] text-[#525252] leading-snug flex-1">{r.how}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>BFF × SOFI</DeckEyebrow>
          <DeckTitle>How Big Five Foods products address SOFI challenges</DeckTitle>
          <div className="space-y-2 sm:space-y-2.5 mt-1">
            {[
              {
                challenge: "Hunger / undernourishment",
                product: "Shelf-stable porridges, soya, one-pots, soups",
                how: "Reliable calories + fortification without cold chain — logistics-friendly for African and export corridors.",
              },
              {
                challenge: "Healthy diets unaffordable (2.7B)",
                product: `~${FOODS_ECONOMICS.cheaperThanMarket.value} cost advantage`,
                how: "Internal comparison vs wholesale/retail — institutions and households stretch budgets; SWT-AG sells a competitive SKU stack.",
              },
              {
                challenge: "Child stunting & micronutrients",
                product: "Fortified porridges + NSNP 5kg institutional packs",
                how: "Designed micronutrient density; school-channel formats on the NSNP pathway with DBE.",
              },
              {
                challenge: "Food system fragility",
                product: "Long shelf life · pack economics · SA trade rails",
                how: "Recurring reorder category; SupplierAdvisor® for verified B2B distribution with SWT-AG.",
              },
            ].map((row) => (
              <div
                key={row.challenge}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 rounded-xl border border-black/10 bg-white p-3 sm:p-3.5 min-w-0"
              >
                <div className="sm:col-span-3 text-xs font-semibold text-amber-950">{row.challenge}</div>
                <div className="sm:col-span-4 text-xs font-medium text-black">{row.product}</div>
                <div className="sm:col-span-5 text-[11px] sm:text-xs text-[#525252] leading-snug">
                  {row.how}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#737373]">
            {FOODS_ECONOMICS.honesty}
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NSNP · INSTITUTIONAL</DeckEyebrow>
          <DeckTitle>School-channel product — where SOFI meets the classroom</DeckTitle>
          <p className="text-sm text-[#525252] mb-3 max-w-3xl leading-relaxed">
            Three NSNP-approved 5kg institutional packs for school kitchens — pathway with South
            Africa’s {NSNP.departmentShort} · planned scale{" "}
            <strong className="text-black">2.5 million children/day</strong> (plan, not current
            headcount).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {NSNP_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/40 overflow-hidden min-w-0"
              >
                <div className="relative h-28 bg-white">
                  {pdf ? (
                    <DeckPrintImage src={p.src} alt={p.name} fit="contain" paddingClass="p-2" />
                  ) : (
                    <Image src={p.src} alt={p.name} fill className="object-contain p-2" sizes="240px" />
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800 mb-1">
                    {p.badge}
                  </div>
                  <h3 className="text-sm font-semibold text-black leading-snug">{p.shortName}</h3>
                  <p className="text-[11px] text-[#525252] mt-1 leading-snug line-clamp-3">{p.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#737373]">
            SWT-AG can open international institutional conversations with the same product story —
            programme formats that travel with proof.
          </p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UNIT ECONOMICS · BFF</DeckEyebrow>
          <DeckTitle>Competitive cost. Healthy margin. Recurring volume.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.cheaperThanMarket.value}
              label={FOODS_ECONOMICS.cheaperThanMarket.label}
            />
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.grossProfit.value}
              label={FOODS_ECONOMICS.grossProfit.label}
            />
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.nutritionDesign.value}
              label={FOODS_ECONOMICS.nutritionDesign.label}
            />
          </div>
          <p className="text-sm text-[#404040] leading-relaxed max-w-3xl mb-2">
            {FOODS_ECONOMICS.positioning}
          </p>
          <p className="text-sm text-[#404040] leading-relaxed max-w-3xl">
            For <strong className="text-black">SWT-AG</strong> as global distributor: a portfolio that
            is easier to sell into public and institutional buyers because cost-per-plate and
            fortification are the pitch — not charity pricing that collapses the chain.
          </p>
          <p className="mt-3 text-[11px] text-[#737373]">{FOODS_ECONOMICS.honesty}</p>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UN SDGs · FOODS-LED</DeckEyebrow>
          <DeckTitle>How BFF products align with the Sustainable Development Goals</DeckTitle>
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
          <p className="mt-3 text-[11px] text-[#737373]">
            Icons: official UN SDG colour tiles ·{" "}
            <RefLink href="https://sdgs.un.org/goals">sdgs.un.org/goals</RefLink>
          </p>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            GO-TO-MARKET · THREE STAGES
          </DeckEyebrow>
          <DeckTitle>Feed · Educate · Empower — in every end market</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
            {[
              {
                n: "01 · Feed",
                t: "Supply finished product now",
                d: "Ship fortified BFF SKUs into the end market immediately — food security and malnutrition addressed while capacity builds. SWT-AG places product with buyers.",
                h: "Immediate",
              },
              {
                n: "02 · Educate",
                t: "Pack in-market · skills",
                d: "18–36 months: packing facilities in priority markets; blends shipped in; local employment and capability. Distributor + manufacturer co-design.",
                h: "Medium term",
              },
              {
                n: "03 · Empower",
                t: "Full local self-sufficiency",
                d: "36–60 months: farmers, blending and packing — self-sufficient plant with export potential. African production for African and global demand.",
                h: "Longer term",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 min-w-0"
              >
                <div className="text-[10px] font-bold tracking-wide text-amber-300 mb-1">{s.n}</div>
                <div className="text-[10px] text-white/45 mb-1">{s.h}</div>
                <h3 className="text-base font-semibold text-white mb-2">{s.t}</h3>
                <p className="text-xs text-white/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW WE WORK TOGETHER</DeckEyebrow>
          <DeckTitle>Clear roles. Shared proof.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
            {[
              {
                icon: Package,
                t: "BFF supplies",
                d: "Manufactures, fortifies, certifies and packs — product quality and programme formats.",
              },
              {
                icon: Truck,
                t: "SWT-AG distributes",
                d: "Strategic global distribution — territories, buyers, logistics and commercial relationships.",
              },
              {
                icon: Store,
                t: "Trade on SA®",
                d: "SupplierAdvisor®: verified company trade, quotes, orders and audit trails.",
              },
              {
                icon: ShieldCheck,
                t: "Shared standards",
                d: "Honest scale language, MOQs, lead times, and SOFI/SDG framing partners can cite.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-white p-4 min-w-0"
              >
                <x.icon className="w-5 h-5 text-amber-800 mb-2" />
                <h3 className="text-sm font-semibold text-black mb-1">{x.t}</h3>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#404040] max-w-3xl leading-relaxed">
            Live storefront:{" "}
            <RefLink href={SA_FOODS_STORE_URL}>{SA_FOODS_STORE_URL.replace("https://", "")}</RefLink>
            {" · "}
            Group portal: bigfivegroup.africa/foods#shop
          </p>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY THIS PARTNERSHIP</DeckEyebrow>
          <DeckTitle>Why BFF × SWT-AG is commercially and mission-aligned</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-1">
            {[
              {
                t: "Product answers SOFI",
                d: "Not generic commodities — fortified, cost-competitive staples built for hunger and diet affordability gaps.",
              },
              {
                t: "Distributor with global reach",
                d: "SWT-AG as strategic global distributor places BFF where corridors and buyers already move.",
              },
              {
                t: "Recurring category",
                d: "Foods is reorder-native — once menus and shelves adopt, volume can sustain and grow with traction.",
              },
              {
                t: "Verified trade rails",
                d: "SupplierAdvisor® keeps quotes, orders and performance in one OS — transparent for both parties.",
              },
              {
                t: "Institutional story travels",
                d: "NSNP pathway and school-channel SKUs give public-sector language for international buyers.",
              },
              {
                t: "One mission: Feed",
                d: "Group Feed pillar + distributor execution — African excellence, global placement.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5 flex gap-2 min-w-0"
              >
                <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-black mb-0.5">{x.t}</div>
                  <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PROOF LANGUAGE</DeckEyebrow>
          <DeckTitle>How we speak about scale — honestly</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {[
              {
                t: "Plan scale",
                d: "2.5m children/day NSNP pathway — high-level delivery ambition as programmes ramp, not current daily headcount.",
              },
              {
                t: "Programme-reported",
                d: "250k+ meals delivered (programme-reported · Foods) — cite as such in partner materials.",
              },
              {
                t: "Internal analysis",
                d: "~50% cheaper · ~45% GP · 74% nutrition design — management/internal; NDA for SKU detail.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-black/10 bg-white p-4 min-w-0">
                <h3 className="text-sm font-semibold text-amber-950 mb-1.5">{x.t}</h3>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#737373] max-w-3xl leading-relaxed">
            SOFI and SDG figures are external UN multi-agency context. Big Five does not claim
            authorship of global hunger statistics — we design product and distribution to respond
            to them.
          </p>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
          <DeckTitle>Practical path for SWT-AG × BFF</DeckTitle>
          <ol className="space-y-3 max-w-2xl mt-1">
            {[
              {
                t: "Align territory & range priority",
                d: "Which markets, which SKUs first (retail vs institutional).",
              },
              {
                t: "Trade on SupplierAdvisor®",
                d: "Verified company relationship · quotes/orders on the Big Five Foods store.",
              },
              {
                t: "Sample → approve → scale",
                d: "Sample packs for key buyers, then recurring volume on SA rails.",
              },
              {
                t: "Joint narrative pack",
                d: "SOFI + SDG + product economics for SWT-AG sales teams (this deck).",
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

    case 16:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SUMMARY
          </DeckEyebrow>
          <DeckTitle>African product. Global distributor. Shared mission.</DeckTitle>
          <div className="space-y-3 max-w-2xl mt-2">
            {[
              "SOFI 2026: hundreds of millions hungry; Africa the epicentre; healthy diets unaffordable for billions.",
              "Big Five Foods: fortified, affordable, shelf-stable ranges + NSNP institutional pathway — product that answers the data.",
              "SDGs 1, 2, 4, 8, 10, 17 — Foods-led alignment, not poster claims.",
              "SWT-AG: strategic global distributor of BFF products — placement, corridors, commercial relationships.",
              "Trade with proof on SupplierAdvisor®.",
            ].map((t) => (
              <p key={t} className="flex gap-2 text-sm text-white/80 leading-relaxed">
                <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                {t}
              </p>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div>
              <DeckEyebrow light theme={theme}>
                CALL TO ACTION
              </DeckEyebrow>
              <CoBrandRow light />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                Let&apos;s put fortified African nutrition
                <br />
                <span className="text-amber-300">on the world&apos;s plates.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Align territories, open trade on SupplierAdvisor®, and equip SWT-AG teams with a
                product story grounded in SOFI and the SDGs.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <a
                  href={SA_FOODS_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deck-primary-cta premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ color: "#000", backgroundColor: "#fff" }}
                >
                  Open Big Five Foods store
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:craig@bigfivegroup.africa?subject=SWT-AG%20%C3%97%20Big%20Five%20Foods%20partnership"
                  className="deck-email-cta premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold"
                >
                  Email craig@bigfivegroup.africa
                </a>
              </div>
            </div>
            <div className="text-white/40 text-[10px] sm:text-xs space-y-0.5">
              <p>Big Five Foods × SWT-AG · Strategic partnership presentation</p>
              <p>bigfivegroup.africa/partner/swt-ag · Not a binding commercial offer</p>
              <p>
                SOFI sources: {SOFI.shortCite} · Product economics: management/internal as labelled
              </p>
            </div>
          </DeckTitleLayout>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function BffSwtAgPartnershipDeck() {
  return (
    <div id="bff-swt-deck" className="scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold text-amber-900">
          BIG FIVE FOODS × SWT-AG · {TOTAL} SLIDES · STRATEGIC PARTNERSHIP
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Fortified African nutrition for global distribution
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          SOFI challenges, Big Five Foods product response, UN SDG alignment, and how SWT-AG takes
          BFF to market worldwide — shareable and printable.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="bff-swt-deck-shell"
          printRootId="bff-swt-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="BFF × SWT-AG PARTNERSHIP DECK"
          title="Big Five Foods × SWT-AG — Strategic partnership"
          description="SOFI challenges, BFF products, SDGs, global distribution."
          sharePath="/partner/swt-ag#bff-swt-deck"
          shareTitle="Big Five Foods × SWT-AG — Strategic partnership"
          shareText="Fortified African nutrition for global distribution — SOFI, SDGs and BFF product story."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → ·{" "}
        <span className="font-medium text-black">/partner/swt-ag#bff-swt-deck</span>
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> — choose{" "}
        <strong className="text-black">Save as PDF</strong>.
      </p>
    </div>
  );
}
