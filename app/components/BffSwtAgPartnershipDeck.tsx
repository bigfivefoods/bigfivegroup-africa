"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Compass,
  Globe2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Lightbulb,
  Network,
  Package,
  School,
  Shield,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  UtensilsCrossed,
  Wifi,
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
import { SA_CASE } from "../lib/supplierAdvisorCase";
import { SA_FOODS_STORE_URL } from "../lib/saStorefront";
import { SANTACO, SANTACO_PARTNERSHIP } from "../lib/santaco";

const theme = DECK_THEMES.amber;
const TOTAL = 22;

/** NSNP plan scale (programme pathway) — cite as plan, not current headcount */
const NSNP_KIDS_PLAN = "2.5M";
const NSNP_KIDS_PLAN_DETAIL =
  "~2.5 million children per day (plan scale · NSNP pathway with DBE · fortified BFF products)";

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
    how: "BFF × SWT-AG joint programme — capital, product and distribution under one mission: Feed, with SupplierAdvisor® proof.",
  },
] as const;

const RANGES = [
  {
    title: "Fortified porridges",
    src: "/foods/porridge-chocolate.jpg",
    stats: "74% more nutrition design · everyday staple",
    flavours: ["Original", "Chocolate", "Banana", "Strawberry"],
    how: "Micronutrient-dense breakfast/staple — addresses empty calories and vitamin gaps in household diets.",
  },
  {
    title: "Soya mince",
    src: "/foods/soya-beef.jpg",
    stats: "High protein · low cost per plate",
    flavours: ["Rich Beef", "Chilli Beef", "Beef & Onion", "Mutton"],
    how: "Affordable plant protein that stretches pots — protein security without premium meat budgets.",
  },
  {
    title: "One-pot meals",
    src: "/foods/onepot-chicken.jpg",
    stats: "1kg → ~4kg prepared · complete plate",
    flavours: ["Chicken", "Beef", "Chilli Beef", "Chakalaka"],
    how: "Balanced meal formats for caterers and homes — fortification plus convenience at scale.",
  },
  {
    title: "Fortified soups",
    src: "/foods/soup-chicken.jpg",
    stats: "Lowest cost entry · micronutrients",
    flavours: ["Chicken", "Brown Onion", "Oxtail", "Minestrone"],
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
          Strategic partner · Joint funding
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
                      Fund containers in South Africa. School feeding in Kenya.
                    </span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    A joint funding briefing: Big Five Foods and SWT-AG raising capital to roll out
                    solar mobile containers across South Africa and deliver humanitarian school feeding
                    in Kenya — with every programme strand managed on SupplierAdvisor® for transparency
                    and efficiency.
                  </p>
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Joint capital · SA containers · Kenya school feeding · SupplierAdvisor® OS</p>
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
          <DeckTitle>What this funding briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "The joint ask: BFF × SWT-AG raise capital for two humanitarian pillars",
              "Big Five Group vision, mission and values — the north star behind the ask",
              "Why now — UN SOFI hunger, Africa epicentre, diet affordability, child stunting",
              "The product engine — fortified BFF ranges & NSNP institutional packs",
              "South Africa: fund solar mobile container rollout (4 live · scale next)",
              "Kenya: fund humanitarian school feeding with fortified BFF",
              "SupplierAdvisor® — one OS for transparency, efficiency and audit trails",
              "Roles, proof language, capital path and next steps",
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
          <DeckTitle>One product engine. One capital partner. One operating system.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5 min-w-0">
              <UtensilsCrossed className="w-6 h-6 text-amber-800 mb-2" />
              <h3 className="text-lg font-semibold text-black mb-1">Big Five Foods</h3>
              <p className="text-sm text-[#404040] leading-relaxed mb-3">
                Manufactures fortified African staples and operates last-mile containers and school-channel
                formats — product, programme design and on-the-ground Feed · Educate · Empower delivery.
              </p>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {[
                  "Certified manufacturing (ISO · FSSC · ethical · dietary)",
                  "4 solar containers live · Kenya registered · NSNP pathway product",
                  "SupplierAdvisor® seller of record · programme OS",
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
                Strategic partner and global distributor — co-raising capital with BFF, placing fortified
                product into corridors, and backing a dual-country humanitarian programme with commercial
                discipline.
              </p>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {[
                  "Joint funding partner for SA containers + Kenya school feeding",
                  "Global distribution of BFF ranges into agreed markets",
                  "Shared mission: Feed at scale — with transparent proof",
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
            Together we raise and deploy capital into two pillars —{" "}
            <strong className="text-black">South Africa container rollout</strong> and{" "}
            <strong className="text-black">Kenya humanitarian school feeding</strong> — managed end-to-end
            on <strong className="text-black">SupplierAdvisor®</strong> so funders, operators and buyers
            share one transparent trail.
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>BIG FIVE GROUP · NORTH STAR</DeckEyebrow>
          <DeckTitle>Vision · Mission · Values</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-1 min-h-0">
            {[
              {
                t: "Vision",
                icon: Compass,
                bar: "from-emerald-500 to-teal-600",
                color: "text-emerald-800",
                title: GROUP_VMV.vision.title,
                d: GROUP_VMV.vision.body,
              },
              {
                t: "Mission",
                icon: Target,
                bar: "from-sky-500 to-blue-600",
                color: "text-sky-800",
                title: GROUP_VMV.mission.title,
                d: GROUP_VMV.mission.body,
              },
              {
                t: "Values",
                icon: Shield,
                bar: "from-amber-500 to-orange-600",
                color: "text-amber-800",
                title: "What we refuse to compromise",
                d: "Humanity, innovation, integrity, excellence and impact — how we hire, partner, trade and deliver across every pillar.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-3.5 sm:p-4 min-w-0 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
                <div
                  className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[2px] font-semibold mb-1.5 mt-0.5 ${x.color}`}
                >
                  <x.icon className="w-3.5 h-3.5" />
                  {x.t.toUpperCase()}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-black tracking-tight mb-1 leading-snug">
                  {x.title}
                </h3>
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
          <p className="mt-3 text-[11px] text-[#737373] leading-relaxed max-w-3xl">
            This joint funding brief sits inside Big Five Group: BFF product, Direct containers and
            Connect / SupplierAdvisor® are how Feed · Educate · Empower becomes fundable work with
            SWT-AG — not a one-off export trial.
          </p>
        </DeckSlideShell>
      );

    case 4:
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

    case 5:
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
            {SOFI.africa.epicentreNote}. Capital for{" "}
            <strong className="text-white">South Africa last-mile containers</strong> and{" "}
            <strong className="text-white">Kenya school feeding</strong> puts fortified African product
            where SOFI says the need is densest — with SWT-AG and BFF jointly accountable for scale and
            proof.
          </p>
          <p className="text-[11px] text-white/40 leading-relaxed max-w-3xl">
            {SOFI.shortCite} · child stunting JME framing.
          </p>
        </DeckSlideShell>
      );

    case 6:
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
            (internal) — so every funded plate in a container or school kitchen stretches further.
            <strong className="text-black"> SWT-AG × BFF</strong> raise capital against that product
            engine, not against empty logistics.
          </p>
        </DeckSlideShell>
      );

    case 7:
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
                  <p className="text-[10px] font-medium text-amber-900 mb-1 leading-snug">
                    {r.flavours.join(" · ")}
                  </p>
                  <p className="text-[10px] font-medium text-amber-800 mb-1.5">{r.stats}</p>
                  <p className="text-[11px] text-[#525252] leading-snug flex-1">{r.how}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 8:
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
                how: "Internal comparison vs wholesale/retail — funded school and container programmes stretch every rand and shilling.",
              },
              {
                challenge: "Child stunting & micronutrients",
                product: "Fortified porridges + NSNP 5kg institutional packs",
                how: "School-channel formats for SA NSNP pathway and Kenya humanitarian feeding — same product discipline.",
              },
              {
                challenge: "Food system fragility",
                product: "Long shelf life · pack economics · SupplierAdvisor®",
                how: "Recurring reorder category; every quote, order and delivery trail sits on SA® for funders and operators.",
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

    case 9:
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
            Same institutional formats underpin the Kenya school-feeding pillar of this joint funding
            ask — programme product with a trail funders can audit on SupplierAdvisor®.
          </p>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>VALUE · BFF</DeckEyebrow>
          <DeckTitle>Competitive cost. Real nutrition. Recurring volume.</DeckTitle>
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
            Funders and public menus buy on cost, nutrition and reliability. Big Five Foods offers a
            structural cost advantage vs typical wholesale/retail pathways while remaining highly
            fortification-forward — so capital for containers and school feeding buys more meals per
            unit of spend.
          </p>
          <p className="text-sm text-[#404040] leading-relaxed max-w-3xl">
            For <strong className="text-black">BFF × SWT-AG</strong> as joint programme partners: a
            product stack that is easier to fund and operate because cost-per-plate and fortification
            are the pitch — dignity work with commercial discipline, not charity pricing that collapses
            the chain.
          </p>
          <p className="mt-3 text-[11px] text-[#737373]">
            Cost-advantage and nutrition-design figures are management-reported / internal analyses —
            request a dated NDA brief for SKU-level detail. Not audited financial statements.
          </p>
        </DeckSlideShell>
      );

    case 11:
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

    case 12:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE ASK · JOINT FUNDING
          </DeckEyebrow>
          <DeckTitle>Two countries. One capital raise. One operating system.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
            {[
              {
                n: "01 · South Africa",
                t: "Roll out solar mobile containers",
                d: "Fund expansion beyond 4 live units — last-mile Feed · Educate · Empower nodes at taxi ranks and rural communities (SANTACO pathway).",
                h: "Capital use",
              },
              {
                n: "02 · Kenya",
                t: "Humanitarian school feeding",
                d: "Fund fortified BFF product into Kenyan school feeding — registered business, institutional packs, drawing on the SA NSNP pathway.",
                h: "Capital use",
              },
              {
                n: "03 · SupplierAdvisor®",
                t: "Transparency & efficiency",
                d: "Manage procurement, offtake, menus, quotes and delivery trails on one OS — so funders and operators see the same proof.",
                h: "How it is run",
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
          <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-3xl">
            BFF and SWT-AG seek partners and capital to deploy together — not a product brochure
            alone, but a fundable dual-country programme with an audit-ready OS.
          </p>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW WE WORK TOGETHER</DeckEyebrow>
          <DeckTitle>Raise together. Deliver together. Prove on SA®.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
            {[
              {
                icon: CircleDollarSign,
                t: "Joint capital",
                d: "BFF × SWT-AG co-raise for container rollout and Kenya school feeding — shared ask, shared accountability.",
              },
              {
                icon: Package,
                t: "BFF supplies & operates",
                d: "Manufactures, fortifies and packs; runs containers and programme logistics on the ground.",
              },
              {
                icon: Truck,
                t: "SWT-AG distributes",
                d: "Global distribution, corridor relationships and commercial placement of BFF product.",
              },
              {
                icon: Store,
                t: "Manage on SA®",
                d: "SupplierAdvisor®: verified trade, quotes, orders, menus and audit trails for every funded strand.",
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
            Live trade rails:{" "}
            <RefLink href={SA_FOODS_STORE_URL}>{SA_FOODS_STORE_URL.replace("https://", "")}</RefLink>
            {" · "}
            Connect case study: bigfivegroup.africa/connect#case-study-sa
          </p>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PILLAR 1 · SOUTH AFRICA · FUND CONTAINERS</DeckEyebrow>
          <DeckTitle>Solar-powered mobile containers — 4 live · capital to scale</DeckTitle>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mt-1 min-h-0">
            <div className="lg:col-span-5 min-h-0">
              <div className="relative rounded-xl overflow-hidden border border-black/10 bg-[#f5f5f5] aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full min-h-[10rem] max-h-[18rem] lg:max-h-none">
                {pdf ? (
                  <DeckPrintImage
                    src="/container-action-1.jpg"
                    alt="Big Five solar-powered mobile container in community"
                    fit="cover"
                  />
                ) : (
                  <Image
                    src="/container-action-1.jpg"
                    alt="Big Five solar-powered mobile container in community"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:1024px) 90vw, 280px"
                  />
                )}
              </div>
            </div>
            <div className="lg:col-span-7 min-w-0 flex flex-col gap-2.5">
              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                <strong className="text-black">Funding use:</strong> roll out more solar mobile
                containers at high-traffic taxi ranks and rural communities ({SANTACO.shortName}{" "}
                partnership). Each unit is a last-mile node for{" "}
                <strong className="text-black">Feed · Educate · Empower</strong>.{" "}
                <strong className="text-black">4 containers in operation</strong> today prove the
                model — capital multiplies the network.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    icon: UtensilsCrossed,
                    t: "Feed",
                    d: "Retail fortified Big Five Foods where footfall is highest.",
                  },
                  {
                    icon: Wifi,
                    t: "Educate",
                    d: "Wi‑Fi plus Super-Cube® leadership training on site.",
                  },
                  {
                    icon: Users,
                    t: "Empower",
                    d: "Jobs and micro-enterprise for underserved communities.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-xl border border-amber-200 bg-amber-50/50 p-2.5 min-w-0"
                  >
                    <x.icon className="w-4 h-4 text-amber-800 mb-1" />
                    <div className="text-xs font-semibold text-black mb-0.5">{x.t}</div>
                    <p className="text-[10px] sm:text-[11px] text-[#525252] leading-snug">{x.d}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 flex gap-2 min-w-0">
                <HeartHandshake className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-[#404040] leading-relaxed">
                  <strong className="text-black">BFF × SWT-AG joint capital</strong> funds container
                  build-out as humanitarian work with commercial discipline: every unit feeds people,
                  connects communities to Wi‑Fi and Super-Cube® leadership education, and creates jobs.
                  Procurement and offtake of BFF product for each site run on{" "}
                  <strong className="text-black">SupplierAdvisor®</strong>.
                </p>
              </div>
              <p className="text-[10px] text-[#737373]">
                Larger rollout planned ({SANTACO_PARTNERSHIP.title}) — 4 live nodes are the proof base
                for the funding ask.
              </p>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PILLAR 2 · KENYA · FUND SCHOOL FEEDING</DeckEyebrow>
          <DeckTitle>Humanitarian school feeding — fortified BFF, registered in Kenya</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <DeckStatTile
              theme={theme}
              value="Kenya"
              label="Registered Big Five business · East Africa delivery vehicle"
            />
            <DeckStatTile
              theme={theme}
              value={NSNP_KIDS_PLAN}
              label="Children/day NSNP pathway scale in SA (plan) — programme design we adapt for Kenya"
            />
            <DeckStatTile
              theme={theme}
              value="Fund"
              label="Capital for product, logistics and school-channel delivery — not one-off donations"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-w-0">
              <School className="w-5 h-5 text-amber-800 mb-2" />
              <h3 className="text-sm font-semibold text-black mb-1.5">Drawing on the NSNP pathway</h3>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                In South Africa we land school nutrition with fortified institutional formats under the{" "}
                {NSNP.shortName} pathway ({NSNP.departmentShort}) — planned to feed{" "}
                <strong className="text-black">{NSNP_KIDS_PLAN} children per day</strong> with Big Five
                Foods porridges, soya and one-pot products (plan scale as delivery ramps — not a claim
                of current daily operational headcount across every kitchen). That playbook informs Kenya.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 min-w-0">
              <Globe2 className="w-5 h-5 text-emerald-800 mb-2" />
              <h3 className="text-sm font-semibold text-black mb-1.5">
                Joint funding · humanitarian delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                <strong className="text-black">BFF × SWT-AG capital</strong> funds shipping and
                programme delivery of fortified BFF into Kenyan school feeding schemes via a{" "}
                <strong className="text-black">registered Kenya business</strong>. SWT-AG brings
                corridor and distribution strength; BFF supplies product and programme design. Meals
                and offtake are managed on <strong className="text-black">SupplierAdvisor®</strong>{" "}
                for transparency — proof, not one-off donations.
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-[#737373] leading-relaxed max-w-3xl">
            {NSNP_KIDS_PLAN_DETAIL}. Kenya school offtake volumes are confirmed as programmes and
            funded awards close.
          </p>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>OPERATING SYSTEM · SUPPLIERADVISOR®</DeckEyebrow>
          <DeckTitle>How the whole programme is managed — transparency & efficiency</DeckTitle>
          <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
            Every strand of this joint ask — <strong className="text-black">container offtake in
            South Africa</strong>, <strong className="text-black">Kenya school feeding</strong>, and{" "}
            institutional trade — is designed to run on{" "}
            <strong className="text-black">SupplierAdvisor®</strong> (Big Five Connect). Funders,
            BFF and SWT-AG share one verified fabric: approved products, quotes, orders and delivery
            trails — not paperwork theatre.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3">
            <DeckStatTile theme={theme} value="~5,386" label="Schools on the DBE-aligned network (approx.)" />
            <DeckStatTile theme={theme} value="~1,800" label="Service providers (approx.)" />
            <DeckStatTile theme={theme} value="SA + KE" label="Containers & school feeding managed on one OS" />
            <DeckStatTile theme={theme} value="SA®" label="Live trade · verification · audit trails" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                icon: Network,
                t: "One system for both pillars",
                d: "SA container sites and Kenya school channels use the same trade rails — approved product lists, offtake and status where work happens.",
              },
              {
                icon: ShieldCheck,
                t: "Transparency for capital",
                d: "Quotes, orders and performance leave a trail funders and partners can inspect — efficiency and accountability by design.",
              },
              {
                icon: GraduationCap,
                t: "Nutrition that reaches the plate",
                d: "When menus, products and kitchens align on SA®, learners and communities are more likely to receive the fortified meals funded.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-3.5 min-w-0"
              >
                <x.icon className="w-4 h-4 text-cyan-800 mb-1.5" />
                <div className="text-xs font-semibold text-black mb-1">{x.t}</div>
                <p className="text-[11px] text-[#525252] leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#404040] leading-relaxed max-w-3xl">
            <strong className="text-black">DBE-aligned proof of concept:</strong> planning toward ~5,386
            schools and ±1,800 service providers on one system for menus, products and trade. Full case
            study: bigfivegroup.africa/connect#case-study-sa ·{" "}
            {SA_CASE.siteUrl.replace("https://", "")}
          </p>
          <p className="mt-2 text-[10px] text-[#737373]">
            School and provider counts are approximate programme-scope figures — not a real-time
            census. Confirm live scope with Big Five Connect.
          </p>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY THIS PARTNERSHIP</DeckEyebrow>
          <DeckTitle>Why fund BFF × SWT-AG together</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-1">
            {[
              {
                t: "Clear dual-country ask",
                d: "Capital has two named uses: SA container rollout and Kenya humanitarian school feeding — not a vague multi-country wishlist.",
              },
              {
                t: "Product answers SOFI",
                d: "Fortified, cost-competitive staples — every funded meal stretches further with real nutrition design.",
              },
              {
                t: "Proof already on the ground",
                d: "4 solar containers live · Kenya registered · NSNP institutional packs and pathway language funders can cite.",
              },
              {
                t: "Managed on SupplierAdvisor®",
                d: "Transparency and efficiency: quotes, offtake, menus and delivery trails in one OS for capital and operators.",
              },
              {
                t: "Manufacturer + global distributor",
                d: "BFF makes and operates; SWT-AG places product and co-raises — corridor strength with factory accountability.",
              },
              {
                t: "One mission: Feed",
                d: "Humanitarian dignity with commercial discipline — Feed · Educate · Empower at last mile and in the classroom.",
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

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PROOF LANGUAGE</DeckEyebrow>
          <DeckTitle>How we speak about scale — honestly</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {[
              {
                t: "Plan scale",
                d: `${NSNP_KIDS_PLAN} children/day NSNP pathway — high-level delivery ambition as programmes ramp, not current daily headcount.`,
              },
              {
                t: "Programme-reported",
                d: "350k+ meals delivered (programme-reported · Foods) · 4 solar containers in operation.",
              },
              {
                t: "Internal analysis",
                d: "~50% cheaper vs wholesale/retail · 74% more nutrition by design — management/internal; NDA for SKU detail.",
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

    case 19:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
          <DeckTitle>Path to capital and deployment</DeckTitle>
          <ol className="space-y-3 max-w-2xl mt-1">
            {[
              {
                t: "Lock the joint funding brief",
                d: "Confirm container rollout targets (beyond 4 live) and Kenya school-feeding scope — SKUs, volumes and sites on one BFF × SWT-AG paper.",
              },
              {
                t: "Structure capital with SA® rails",
                d: "Every funded offtake and delivery path maps to SupplierAdvisor® — quotes, orders and audit trails from day one.",
              },
              {
                t: "Engage funders and programme partners",
                d: "Present dual-country ask with SOFI/SDG context, live container proof, and Kenya registered vehicle.",
              },
              {
                t: "Deploy · report · scale",
                d: "Stand up next SA containers and Kenya school channels; report through SA®; recycle proof into the next capital tranche.",
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

    case 20:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SUMMARY
          </DeckEyebrow>
          <DeckTitle>Joint capital. Two countries. One transparent OS.</DeckTitle>
          <div className="space-y-3 max-w-2xl mt-2">
            {[
              "The ask: BFF × SWT-AG raise capital together for SA container rollout and Kenya humanitarian school feeding.",
              "North star: Big Five Group vision (prosperous Africa), mission Feed · Educate · Empower, values of humanity through impact.",
              "Why now: SOFI 2026 — hunger, Africa epicentre, healthy diets unaffordable; product must be fortified and cost-competitive.",
              "Product engine: BFF ranges + NSNP institutional packs (~2.5M children/day plan scale in SA pathway language).",
              "Pillar 1 · South Africa: 4 solar containers live — fund scale of Feed · Educate · Empower at last mile.",
              "Pillar 2 · Kenya: registered business — fund fortified BFF into school feeding with programme discipline.",
              "OS: SupplierAdvisor® manages offtake, menus and trade trails for transparency and efficiency across both pillars.",
            ].map((t) => (
              <p key={t} className="flex gap-2 text-sm text-white/80 leading-relaxed">
                <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                {t}
              </p>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 21:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div>
              <DeckEyebrow light theme={theme}>
                CALL TO ACTION
              </DeckEyebrow>
              <CoBrandRow light />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                Fund the containers. Feed the schools.
                <br />
                <span className="text-amber-300">Prove every rand on SupplierAdvisor®.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Join Big Five Foods and SWT-AG to raise and deploy capital for South Africa solar
                container rollout and Kenya humanitarian school feeding — managed for transparency and
                efficiency on one operating system.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <a
                  href="mailto:craig@bigfivegroup.africa?subject=BFF%20%C3%97%20SWT-AG%20joint%20funding%20%E2%80%94%20SA%20containers%20%26%20Kenya%20school%20feeding"
                  className="deck-primary-cta premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ color: "#000000", backgroundColor: "#ffffff", WebkitTextFillColor: "#000000" }}
                >
                  Start the funding conversation
                  <ArrowRight className="w-4 h-4" style={{ color: "#000000" }} />
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
              <p>Big Five Foods × SWT-AG · Joint funding presentation</p>
              <p>bigfivegroup.africa/partner/swt-ag · Not a binding commercial or funding offer</p>
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
          BIG FIVE FOODS × SWT-AG · {TOTAL} SLIDES · JOINT FUNDING BRIEF
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Fund SA containers &amp; Kenya school feeding
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Joint capital for solar mobile container rollout and humanitarian school feeding — managed
          on SupplierAdvisor® for transparency and efficiency. Shareable and printable.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="bff-swt-deck-shell"
          printRootId="bff-swt-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="BFF × SWT-AG JOINT FUNDING DECK"
          title="Big Five Foods × SWT-AG — Fund containers & school feeding"
          description="Group VMV, joint funding for SA containers and Kenya school feeding, managed on SupplierAdvisor®."
          sharePath="/partner/swt-ag#bff-swt-deck"
          shareTitle="Big Five Foods × SWT-AG — Joint funding brief"
          shareText="BFF × SWT-AG joint funding: SA solar containers + Kenya school feeding — managed on SupplierAdvisor®."
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
