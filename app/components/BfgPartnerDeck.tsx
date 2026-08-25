"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  Compass,
  Handshake,
  Heart,
  Lightbulb,
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

/** Group emerald branding — not SPAR green, not Foods amber alone */
const theme = DECK_THEMES.emerald;
const TOTAL = 18;

const RANGES = [
  {
    title: "Fortified porridges",
    src: "/foods/porridge-chocolate.jpg",
    stats: "74% more nutrition design · everyday staple",
    flavours: ["Original", "Chocolate", "Banana", "Strawberry"],
    how: "Micronutrient-dense breakfast/staple — addresses empty calories and vitamin gaps.",
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
    how: "Balanced meal formats for caterers and homes — fortification plus convenience.",
  },
  {
    title: "Fortified soups",
    src: "/foods/soup-chicken.jpg",
    stats: "Lowest cost entry · micronutrients",
    flavours: ["Chicken", "Brown Onion", "Oxtail", "Minestrone"],
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
  const groupSrc = light ? "/bigfivegroup-logo.png" : "/bigfivegroup-logo.png";
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
          <Image
            src={groupSrc}
            alt="Big Five Group"
            fill
            className="object-contain"
            sizes="56px"
            priority
          />
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
          <Image
            src={foodsSrc}
            alt="Big Five Foods"
            fill
            className="object-contain"
            sizes="56px"
            priority
          />
        )}
      </div>
      <div className={`text-left min-w-0 ${light ? "text-white/80" : "text-[#404040]"}`}>
        <div className={`text-sm sm:text-base font-semibold tracking-tight ${light ? "text-white" : "text-black"}`}>
          Partner briefing
        </div>
        <div className={`text-[10px] font-medium ${light ? "text-white/55" : "text-[#737373]"}`}>
          Generic · shareable · Foods-led
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
                  "linear-gradient(105deg, #052e1cf2 0%, #065f46e6 45%, #052e1c99 100%)",
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
                    Fortified African nutrition.
                    <br />
                    <span className="text-emerald-300">Partners who put it on plates.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    A generic partner presentation: who Big Five Group is, how Big Five Foods answers
                    hunger and diet affordability, and how we partner — retail, institutional,
                    distribution — with proof on SupplierAdvisor®.
                  </p>
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Feed · Educate · Empower · Group emerald branding</p>
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
              "Big Five Group — vision, mission and values",
              "UN SOFI challenge — hunger, Africa, healthy diets, child stunting",
              "Big Five Foods ranges — flavours, fortification, institutional packs",
              "NSNP school pathway · programme economics · SDG alignment",
              "How we partner — retail, institutions, last mile, SupplierAdvisor®",
              "Proof language, next steps and the ask",
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
                className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-2.5 min-w-0"
              >
                <v.icon className="w-3.5 h-3.5 text-emerald-800 mb-1" />
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
          <DeckTitle>Global hunger eased slightly — the crisis is far from over</DeckTitle>
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
              value={SOFI_DECK_STATS.childStunting.value}
              label={SOFI_DECK_STATS.childStunting.label}
            />
          </div>
          <p className="text-[11px] sm:text-xs text-white/45 leading-relaxed max-w-3xl">
            Source: {SOFI.shortCite}. External context only — not Big Five audited metrics.{" "}
            <RefLink href={SOFI.newsUrl}>SOFI 2026 newsroom</RefLink>.
          </p>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            AFRICA · {SOFI.edition}
          </DeckEyebrow>
          <DeckTitle>Africa remains the epicentre of hunger</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
            {SOFI.africa.epicentreNote}. Big Five Foods is designed{" "}
            <strong className="text-white">in Africa, for African plates</strong> — and partners
            place that product where people buy, cook and learn.
          </p>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE ANSWER</DeckEyebrow>
          <DeckTitle>Fortified African staples people actually eat</DeckTitle>
          <p className="text-sm text-[#525252] mb-4 max-w-3xl leading-relaxed">
            Big Five Foods answers SOFI-scale problems with shelf-stable, fortified ranges at ~
            {FOODS_ECONOMICS.cheaperThanMarket.value} below typical wholesale/retail pathways
            (internal) — so partners can sell or programme nutrition that stretches budgets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: UtensilsCrossed,
                t: "Feed",
                d: "Porridges, soya, one-pots, soups and NSNP institutional packs on plates.",
              },
              {
                icon: School,
                t: "Educate",
                d: "School nutrition pathways and Super-Cube® leadership where programmes need people.",
              },
              {
                icon: Handshake,
                t: "Empower",
                d: "Last-mile containers, SupplierAdvisor® trade and partner economics that sustain.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 min-w-0"
              >
                <x.icon className="w-5 h-5 text-emerald-800 mb-2" />
                <h3 className="text-sm font-semibold text-black mb-1">{x.t}</h3>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
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
                  <p className="text-[10px] font-medium text-emerald-900 mb-1 leading-snug">
                    {r.flavours.join(" · ")}
                  </p>
                  <p className="text-[10px] font-medium text-emerald-800 mb-1.5">{r.stats}</p>
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
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>VALUE · FOODS</DeckEyebrow>
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
            Public menus and retail partners buy on cost, nutrition and reliability. Big Five Foods
            offers a structural cost advantage vs typical wholesale/retail pathways while remaining
            fortification-forward — so partners stretch budgets and grow recurring volume.
          </p>
          <p className="mt-3 text-[11px] text-[#737373]">{FOODS_ECONOMICS.honesty}</p>
        </DeckSlideShell>
      );

    case 9:
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
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            HOW WE PARTNER
          </DeckEyebrow>
          <DeckTitle>Clear roles. Shared proof.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
            {[
              {
                icon: Package,
                t: "We supply",
                d: "Manufacture, fortify, certify and pack — retail and institutional formats.",
              },
              {
                icon: Store,
                t: "You place",
                d: "Retail shelves, school kitchens, programme offtake or corridor distribution.",
              },
              {
                icon: Truck,
                t: "Last mile",
                d: "Optional Direct containers and logistics so product reaches people where they move.",
              },
              {
                icon: ShieldCheck,
                t: "Prove on SA®",
                d: "SupplierAdvisor® — quotes, orders, menus and audit trails partners can inspect.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 min-w-0"
              >
                <x.icon className="w-5 h-5 text-emerald-300 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">{x.t}</h3>
                <p className="text-xs text-white/65 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/50 max-w-3xl leading-relaxed">
            Live storefront:{" "}
            <RefLink href={SA_FOODS_STORE_URL}>{SA_FOODS_STORE_URL.replace("https://", "")}</RefLink>
            {" · "}
            Group: bigfivegroup.africa/foods
          </p>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PARTNERSHIP PATHWAYS</DeckEyebrow>
          <DeckTitle>Three ways partners work with Big Five Foods</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
            {[
              {
                n: "01",
                t: "Retail & catering",
                d: "List fortified ranges on shelves and in catering — flavours households reorder, margins that sustain.",
              },
              {
                n: "02",
                t: "Institutional & school",
                d: "NSNP-approved 5kg packs and programme supply — plan language for scale, honest delivery reporting.",
              },
              {
                n: "03",
                t: "Distribution & corridors",
                d: "Place BFF into markets and feeding schemes with SupplierAdvisor® as the trade OS.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5 min-w-0"
              >
                <div className="text-[10px] font-bold tracking-wide text-emerald-800 mb-1">{s.n}</div>
                <h3 className="text-base font-semibold text-black mb-2">{s.t}</h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PROOF LANGUAGE</DeckEyebrow>
          <DeckTitle>How we speak about scale — honestly</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {[
              {
                t: "Plan scale",
                d: "2.5M children/day NSNP pathway — high-level delivery ambition as programmes ramp, not current daily headcount.",
              },
              {
                t: "Programme-reported",
                d: "250k+ meals delivered (programme-reported · Foods) · 4 solar containers in operation.",
              },
              {
                t: "Internal analysis",
                d: "~50% cheaper vs wholesale/retail · 74% more nutrition by design — management/internal; NDA for SKU detail.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-black/10 bg-white p-4 min-w-0">
                <h3 className="text-sm font-semibold text-emerald-950 mb-1.5">{x.t}</h3>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#737373] max-w-3xl leading-relaxed">
            SOFI and SDG figures are external UN multi-agency context. Full notes:{" "}
            <RefLink href="https://bigfivegroup.africa/methodology">methodology</RefLink>.
          </p>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY PARTNER WITH BFG</DeckEyebrow>
          <DeckTitle>Commercially sound. Mission-aligned. Auditable.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-1">
            {[
              {
                t: "Product answers SOFI",
                d: "Fortified, cost-competitive staples built for hunger and diet affordability gaps.",
              },
              {
                t: "Institutional credibility",
                d: "NSNP pathway and school-channel SKUs give public-sector language partners can cite.",
              },
              {
                t: "Recurring category",
                d: "Foods is reorder-native — once menus and shelves adopt, volume can sustain.",
              },
              {
                t: "Verified trade rails",
                d: "SupplierAdvisor® keeps quotes, orders and performance in one OS.",
              },
              {
                t: "One Group mission",
                d: "Feed · Educate · Empower across Foods, Direct, Connect, Impact and Leadership.",
              },
              {
                t: "Honest proof language",
                d: "Plan vs programme-reported vs internal — partners never inherit vanity claims.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 flex gap-2 min-w-0"
              >
                <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
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
          <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
          <DeckTitle>Practical path for partners</DeckTitle>
          <ol className="space-y-3 max-w-2xl mt-1">
            {[
              {
                t: "Align channel & range priority",
                d: "Retail vs institutional vs distribution — which SKUs and geographies first.",
              },
              {
                t: "Sample → approve → list",
                d: "Sample packs, then recurring volume on SupplierAdvisor® or agreed SOWs.",
              },
              {
                t: "Trade on SupplierAdvisor®",
                d: "Verified company relationship · quotes/orders on the Big Five Foods store.",
              },
              {
                t: "Report with shared language",
                d: "Use plan / programme-reported / internal labels — one truth for both parties.",
              },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
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

    case 15:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SUMMARY
          </DeckEyebrow>
          <DeckTitle>African product. Partner placement. Shared mission.</DeckTitle>
          <div className="space-y-3 max-w-2xl mt-2">
            {[
              "SOFI 2026: hundreds of millions hungry; Africa the epicentre; healthy diets unaffordable for billions.",
              "Big Five Group: Feed · Educate · Empower — vision of a prosperous Africa for everyone on it.",
              "Big Five Foods: four fortified ranges + NSNP 5kg institutional packs (~2.5M children/day plan).",
              "Partners place product — retail, schools, corridors — with SupplierAdvisor® for transparent trade.",
              "Honest metrics: plan scale, programme-reported delivery, internal economics under NDA.",
            ].map((t) => (
              <p key={t} className="flex gap-2 text-sm text-white/80 leading-relaxed">
                <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                {t}
              </p>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GO DEEPER</DeckEyebrow>
          <DeckTitle>Related briefings on the Group site</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {[
              {
                t: "Foods product & impact deck",
                d: "Full public Foods strategy deck — ranges, certifications, farm-to-fork.",
                href: "https://bigfivegroup.africa/foods#foods-deck",
              },
              {
                t: "Food security · SOFI & SDGs",
                d: "Challenge/opportunity page linking SOFI and SDGs to every pillar.",
                href: "https://bigfivegroup.africa/food-security",
              },
              {
                t: "Connect · SchoolAdvisor",
                d: "Kitchen compliance and DBE network case studies on SupplierAdvisor®.",
                href: "https://bigfivegroup.africa/connect#case-study-schooladvisor",
              },
              {
                t: "Methodology",
                d: "How we label plan scale vs programme-reported vs internal analysis.",
                href: "https://bigfivegroup.africa/methodology",
              },
            ].map((x) => (
              <a
                key={x.t}
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/10 bg-white p-4 hover:border-emerald-300 transition-colors min-w-0 block"
              >
                <div className="text-sm font-semibold text-black mb-1">{x.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </a>
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
              <BrandRow light />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                Let&apos;s put fortified African nutrition
                <br />
                <span className="text-emerald-300">on more plates — together.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Partner with Big Five Group and Big Five Foods — product, programmes and proof for
                retail, institutional and distribution partners.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Big Five Group · Partner briefing"
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
              <p>Big Five Group · Generic partner presentation</p>
              <p>bigfivegroup.africa/partner/big-five-group · Not a binding commercial offer</p>
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

export default function BfgPartnerDeck() {
  return (
    <div id="bfg-partner-deck" className="scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold text-emerald-900">
          BIG FIVE GROUP · {TOTAL} SLIDES · GENERIC PARTNER DECK
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Partner briefing — Foods & Group
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Shareable deck for partners: Group north star, SOFI context, Big Five Foods ranges and
          NSNP pathway, partnership models and honest proof language.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="bfg-partner-deck-shell"
          printRootId="bfg-partner-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="BFG PARTNER DECK"
          title="Big Five Group — Generic partner briefing"
          description="Group VMV, SOFI, Foods ranges, NSNP, partnership pathways — shareable and printable."
          sharePath="/partner/big-five-group#bfg-partner-deck"
          shareTitle="Big Five Group — Partner briefing"
          shareText="Fortified African nutrition for partners — Big Five Group & Foods briefing deck."
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
