"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Download,
  Heart,
  Share2,
  Maximize2,
  Minimize2,
  Shield,
  Sparkles,
  Target,
  UtensilsCrossed,
  GraduationCap,
  Activity,
  Lightbulb,
  Users,
  Layers,
} from "lucide-react";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

const TOTAL = 15;

/** Short pillar briefs for the “integrated enterprise” slide */
const PILLAR_BRIEFS: Record<string, string> = {
  agri: "Regenerative production and smallholder supply with verified provenance.",
  foods: "Fortified, affordable nutrition for households, schools and institutions.",
  direct: "Last-mile distribution and container hubs that keep value local.",
  access: "Pathways to tenders, CSI and development capital for African enterprise.",
  connect: "SupplierAdvisor® ethical commerce, verification and transparent trade.",
  leadership: "Super-Cube® ethical leadership for business and public life.",
  foundation: "Registered philanthropy funding community programmes with proof.",
  impact: "Cross-pillar PMO — design, gates, KPIs and field delivery.",
  global: "International corridors linking African capacity to world markets.",
  royal: "Royal partnership for community service — feed, educate, empower.",
};

const GROUP_OVERVIEW =
  "Big Five Group is one integrated African enterprise headquartered in KwaZulu-Natal. Ten pillars share governance, mission and values so regenerative production, fortified nutrition, distribution, capital access, ethical commerce, leadership, philanthropy, programme delivery, global corridors and royal partnership compound as a system — not ten separate vendors.";

/** When true, slides render with print-friendly sizing (same design as web). */
const PrintModeContext = createContext(false);
function usePrintMode() {
  return useContext(PrintModeContext);
}

type SlideProps = { index: number };

function SlideShell({
  children,
  dark = false,
  className = "",
  accent = "violet",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  accent?: "violet" | "emerald" | "rose" | "amber";
}) {
  const forPrint = usePrintMode();
  const zeroPad = /\b!?p-0\b/.test(className);
  const accentBar =
    accent === "emerald"
      ? "from-emerald-500 to-teal-600"
      : accent === "rose"
        ? "from-rose-500 to-pink-600"
        : accent === "amber"
          ? "from-amber-500 to-orange-600"
          : "from-violet-600 to-indigo-700";

  return (
    <div
      className={`relative h-full w-full overflow-x-hidden border ${
        forPrint
          ? "overflow-hidden rounded-2xl"
          : "overflow-y-auto rounded-2xl sm:rounded-3xl"
      } ${
        dark
          ? forPrint
            ? "bg-[#0a0a0a] border-[#262626] text-white"
            : "bg-[#0a0a0a] border-white/10 text-white"
          : forPrint
            ? "bg-white border-[#e5e5e5] text-black"
            : "bg-white border-black/10 text-black"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${accentBar}`}
      />
      {/* Soft blur orbs look great on screen but print as muddy shadow blobs — skip in PDF */}
      {!forPrint && !dark && (
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-violet-100/40 blur-3xl" />
      )}
      {!forPrint && dark && (
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />
      )}
      <div
        className={`relative min-h-full flex flex-col h-full ${
          zeroPad
            ? "p-0"
            : forPrint
              ? "p-8 md:p-10"
              : "p-5 sm:p-8 md:p-10 lg:p-12"
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
        light ? "text-violet-300" : "text-violet-700"
      }`}
    >
      {children}
    </div>
  );
}

function Ref({ href, children }: { href: string; children: React.ReactNode }) {
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
            ? "border-[#2a2a2a] bg-[#141414]"
            : "border-white/10 bg-white/[0.06]"
          : forPrint
            ? "border-[#e5e5e5] bg-[#fafafa]"
            : "border-black/10 bg-[#fafafa]"
      }`}
    >
      <div
        className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter tabular-nums ${
          dark ? "text-violet-200" : "text-violet-800"
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

function Slide({ index }: SlideProps) {
  switch (index) {
    case 0:
      return (
        <SlideShell dark className="!p-0">
          <TitleSlideLayout>
            <div>
              <Eyebrow light>BIG FIVE GROUP · STRATEGIC OVERVIEW</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] max-w-3xl text-balance">
                One Group.
                <br />
                Ten Pillars.
                <br />
                Infinite African Impact.
              </h2>
            </div>
            <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 gap-6 max-w-3xl">
              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                A shareable strategic briefing for governments, DFIs, corporates and partners —
                African challenges with credible sources, and how Big Five delivers.
              </p>
              <div className="text-xs sm:text-sm text-white/45 space-y-1">
                <p>KwaZulu-Natal · South Africa</p>
                <p>bigfivegroup.africa/impact#strategy-deck</p>
                <p>15 slides · Downloadable · Shareable</p>
              </div>
            </div>
          </TitleSlideLayout>
        </SlideShell>
      );

    case 1:
      return (
        <SlideShell>
          <Eyebrow>AGENDA</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            What this briefing covers
          </h2>
          <ol className="space-y-3 sm:space-y-3.5 max-w-2xl">
            {[
              "Who Big Five Group is — ten pillars as one system",
              "Vision, mission and values",
              "Hunger & food insecurity in Africa (SOFI / GRFC)",
              "Child malnutrition — stunting, wasting, micronutrients (UNICEF/WHO/WB)",
              "HIV & AIDS — regional burden and treatment gaps (UNAIDS/WHO)",
              "Markets, last-mile and institutional trust gaps",
              "How Big Five responds: Feed · Educate · Empower",
              "How we resolve malnutrition and health-linked vulnerability",
              "Why partners work with us — and how to engage",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 sm:gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-xs font-semibold flex items-center justify-center">
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
        <SlideShell>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 sm:mb-4 text-balance">
            An integrated African enterprise
          </h2>

          {/* Group overview */}
          <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 to-indigo-50/60 p-4 sm:p-5 mb-4 sm:mb-5 flex gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-violet-700 text-white flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] tracking-[2px] text-violet-800 font-semibold mb-1">
                BIG FIVE GROUP
              </div>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">{GROUP_OVERVIEW}</p>
            </div>
          </div>

          {/* Ten pillars with short briefs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {companies.map((c) => (
              <div
                key={c.slug}
                className="rounded-xl border border-black/10 bg-gradient-to-b from-white to-[#fafafa] p-3 flex gap-2.5 min-w-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${c.color}18`, color: c.color }}
                >
                  <CompanyIcon name={c.icon} size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-black truncate">{c.name}</div>
                  <p className="text-[11px] sm:text-xs text-[#525252] leading-snug mt-0.5">
                    {PILLAR_BRIEFS[c.slug] ?? c.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 3:
      return (
        <SlideShell>
          <Eyebrow>NORTH STAR</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-5">
            Vision · Mission · Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
            {[
              {
                t: "Vision",
                icon: Compass,
                color: "text-emerald-700",
                bar: "from-emerald-500 to-teal-600",
                title: "A prosperous Africa — for everyone on it",
                d: "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, and communities build economies they own.",
              },
              {
                t: "Mission",
                icon: Target,
                color: "text-sky-700",
                bar: "from-sky-500 to-blue-600",
                title: "Feed. Educate. Empower.",
                d: "Deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises — at scale and with proof.",
              },
              {
                t: "Values",
                icon: Shield,
                color: "text-amber-700",
                bar: "from-amber-500 to-orange-600",
                title: "What we refuse to compromise",
                d: "Humanity, innovation, integrity, excellence, and purposeful impact shape how we hire, partner, trade and deliver — across every pillar.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5 min-w-0 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
                <div className={`inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] font-semibold mb-2 mt-0.5 ${x.color}`}>
                  <x.icon className="w-4 h-4" />
                  {x.t.toUpperCase()}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-black tracking-tight mb-1.5 leading-snug">
                  {x.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="text-[10px] tracking-[2px] text-[#737373] font-semibold mb-2.5">
            OUR VALUES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
            {[
              {
                icon: Users,
                title: "Humanity",
                desc: "People first — Ubuntu in practice.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Better systems for African progress.",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "Honesty, transparency, ethical commerce.",
              },
              {
                icon: Sparkles,
                title: "Excellence",
                desc: "Professional standards, always.",
              },
              {
                icon: Heart,
                title: "Impact",
                desc: "Outcomes communities can feel.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="flex sm:flex-col items-start gap-2.5 rounded-2xl border border-black/10 bg-white p-3.5 sm:p-4 min-w-0"
              >
                <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-800 flex items-center justify-center shrink-0">
                  <v.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-black text-sm mb-0.5">{v.title}</div>
                  <div className="text-xs text-[#525252] leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 4:
      return (
        <SlideShell dark accent="rose">
          <Eyebrow light>THE CHALLENGE · HUNGER</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Hunger is rising in Africa — even as the global picture improves
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <StatTile dark value="307M" label="People in Africa faced hunger in 2024 (>20% of the population)" />
            <StatTile dark value="~60%" label="Of people projected undernourished by 2030 could be in Africa" />
            <StatTile dark value="673M" label="People globally experienced hunger in 2024 (down slightly overall)" />
            <StatTile dark value="2.3B" label="People with moderate or severe food insecurity in 2024" />
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://www.who.int/news/item/28-07-2025-global-hunger-declines-but-rises-in-africa-and-western-asia-un-report">
              WHO / FAO / IFAD / UNICEF / WFP — SOFI 2025
            </Ref>
            ;{" "}
            <Ref href="https://data.unicef.org/resources/sofi-2025/">UNICEF SOFI 2025 brief</Ref>
            ;{" "}
            <Ref href="https://www.wfp.org/publications/global-report-food-crises-grfc">
              Global Report on Food Crises 2026
            </Ref>
            .
          </p>
        </SlideShell>
      );

    case 5:
      return (
        <SlideShell accent="emerald">
          <Eyebrow>THE CHALLENGE · CHILD MALNUTRITION</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Stunting, wasting and micronutrient gaps still define childhood for millions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5">
            <StatTile value="62M" label="Stunted children under 5 in sub-Saharan Africa (largest regional total with South Asia)" />
            <StatTile value="~1/3" label="Children affected by very high stunting prevalence in West/Central & East/Southern Africa (2024)" />
            <StatTile value="13M" label="Children with acute malnutrition in Eastern & Southern Africa (UNICEF 2025 call)" />
            <StatTile value="~4M" label="Estimated severe acute malnutrition (SAM) cases in ESA (most lethal form)" />
            <StatTile value="45%" label="Of under-five deaths linked to undernutrition as underlying cause (global UNICEF framing)" />
            <StatTile value="150M" label="Children under 5 stunted globally in 2024 (UNICEF/WHO/WB JME)" />
          </div>
          <p className="text-sm text-[#404040] leading-relaxed mb-4 max-w-3xl">
            Sub-Saharan Africa remains the only region where the{" "}
            <strong className="text-black">number of stunted children continues to rise</strong>, even
            as prevalence falls slowly in places. Over half of children in Eastern and Southern Africa
            are deficient in essential vitamins and minerals — undermining immunity, learning and
            lifelong earnings.
          </p>
          <p className="text-xs text-[#737373] leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://data.unicef.org/topic/nutrition/malnutrition/">
              UNICEF malnutrition data
            </Ref>
            ;{" "}
            <Ref href="https://www.who.int/data/gho/data/themes/topics/joint-child-malnutrition-estimates-unicef-who-wb">
              UNICEF/WHO/World Bank Joint Child Malnutrition Estimates
            </Ref>
            ;{" "}
            <Ref href="https://www.unicef.org/esa/press-releases/13-million-children-malnourished-eastern-and-southern-africa-2025">
              UNICEF ESA press release (Apr 2025)
            </Ref>
            ;{" "}
            <Ref href="https://www.unicef.org/esa/nutrition">UNICEF ESA nutrition overview</Ref>.
          </p>
        </SlideShell>
      );

    case 6:
      return (
        <SlideShell dark accent="rose">
          <Eyebrow light>THE CHALLENGE · HIV & AIDS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            HIV remains a structural health and household vulnerability crisis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            <StatTile dark value="40.8M" label="People living with HIV globally (end 2024)" />
            <StatTile dark value=">½" label="Of all people living with HIV live in eastern & southern Africa (~21.1M)" />
            <StatTile dark value="~65%" label="Of people living with HIV worldwide are in sub-Saharan Africa" />
            <StatTile dark value="3,300" label="New HIV infections per week among adolescent girls & young women 15–24 in sub-Saharan Africa (2024)" />
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-3xl">
            Progress is real — AIDS-related deaths and new infections have fallen substantially since
            2010 — but gaps remain: millions still need treatment; only about{" "}
            <strong className="text-white">55% of children living with HIV</strong> were on ART in
            2024; and food insecurity interacts with HIV outcomes (adherence, immunity, household
            resilience).
          </p>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://www.hiv.gov/hiv-basics/overview/data-and-trends/global-statistics">
              HIV.gov global statistics (UNAIDS-based)
            </Ref>
            ;{" "}
            <Ref href="https://www.unaids.org/sites/default/files/media_asset/UNAIDS_FactSheet_en.pdf">
              UNAIDS Fact Sheet
            </Ref>
            ;{" "}
            <Ref href="https://www.who.int/teams/global-hiv-hepatitis-and-stis-programmes/hiv/strategic-information/hiv-data-and-statistics">
              WHO HIV data
            </Ref>
            .
          </p>
        </SlideShell>
      );

    case 7:
      return (
        <SlideShell>
          <Eyebrow>THE CHALLENGE · MARKETS & INSTITUTIONS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-5 sm:mb-6 text-balance">
            Value and trust leak before help reaches households
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                t: "Fragmented last mile",
                d: "Producers and factories struggle to reach institutions and households without costly intermediaries — spoilage and opacity rise.",
              },
              {
                t: "Trust deficit",
                d: "Buyers, ministries and DFIs need verification, quality evidence and audit trails — not claims on a slide.",
              },
              {
                t: "Delivery capacity",
                d: "Programmes fail when design, field execution and ethical leadership sit in separate vendor silos.",
              },
              {
                t: "Capital without pathways",
                d: "CSI, tenders and development finance exist — SMEs and implementers need professional routes to qualify and deliver.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 min-w-0"
              >
                <h3 className="font-semibold text-black mb-2">{x.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 8:
      return (
        <SlideShell dark>
          <Eyebrow light>OUR RESPONSE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            Feed. Educate. Empower.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: UtensilsCrossed,
                t: "Feed",
                color: "#6ee7b7",
                d: "Agri + Foods: regenerative production and fortified nutrition — affordable, shelf-stable, designed for households, schools and institutions.",
                proof: "150k meals · 100k children · 83% cheaper · 74% more nutrition",
              },
              {
                icon: GraduationCap,
                t: "Educate",
                color: "#fcd34d",
                d: "Leadership: Super-Cube® so decisions in business and public life are ethical, whole-person and Africa-centred.",
                proof: "Capability for nations & enterprises",
              },
              {
                icon: Shield,
                t: "Empower",
                color: "#7dd3fc",
                d: "Direct, Access, Connect, Global: distribution, capital pathways, SupplierAdvisor® commerce and international corridors.",
                proof: "Verified trade · containers · institutional access",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 min-w-0"
              >
                <x.icon className="w-7 h-7 mb-3" style={{ color: x.color }} />
                <div className="text-2xl font-semibold tracking-tight mb-3" style={{ color: x.color }}>
                  {x.t}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{x.d}</p>
                <p className="text-xs font-medium text-white/45">{x.proof}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-3xl">
            Foundation, Impact and Royal cut across all three — funding, programme delivery and
            community partnership with the royal family.
          </p>
        </SlideShell>
      );

    case 9:
      return (
        <SlideShell accent="emerald">
          <Eyebrow>HOW WE RESOLVE MALNUTRITION</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            From stunting risk to plates, hubs and proof
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {[
              {
                t: "Fortified, affordable food",
                d: "Big Five Foods porridges, soya, one-pot meals and soups — 74% more nutrition design, 83% cheaper pathways, long shelf life for schools and institutions.",
              },
              {
                t: "Regenerative supply",
                d: "Agri strengthens local production so fortification is not import-only theatre — soil, smallholders and provenance matter.",
              },
              {
                t: "Containers & last mile",
                d: "Direct + live SupplierAdvisor® container network so fortified food reaches communities — transparent locations, not black-box logistics.",
              },
              {
                t: "Programmes with a PMO",
                d: "Impact + Foundation design and deliver feeding and community programmes with gates, KPIs and auditability — not one-off drop-offs.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-semibold text-black">{x.t}</h3>
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#737373] leading-relaxed">
            We do not claim to replace clinical SAM treatment (e.g. RUTF protocols) — we strengthen the
            food-security and affordability layer that reduces vulnerability and supports healthier
            households at scale.
          </p>
        </SlideShell>
      );

    case 10:
      return (
        <SlideShell accent="rose">
          <Eyebrow>HOW WE SUPPORT HIV-AFFECTED HOUSEHOLDS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Nutrition, livelihoods and systems — complementary to clinical care
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-5">
            Big Five is not an ART provider. We address the{" "}
            <strong className="text-black">socio-economic determinants</strong> that interact with HIV
            outcomes: food insecurity, household resilience, skills, and trusted supply systems —
            especially critical in eastern and southern Africa where the epidemic remains concentrated.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {[
              {
                icon: UtensilsCrossed,
                t: "Nutrition security",
                d: "Affordable fortified foods for vulnerable households and institutions — reducing hunger stress that undermines health and adherence capacity.",
              },
              {
                icon: Activity,
                t: "Livelihoods & dignity",
                d: "Agri, Direct and Access create income and market pathways so families are less forced into high-risk coping strategies.",
              },
              {
                icon: GraduationCap,
                t: "Leadership & institutions",
                d: "Super-Cube® leadership builds ethical public and enterprise decision-makers who can sustain health and social programmes.",
              },
              {
                icon: Shield,
                t: "Trusted delivery rails",
                d: "SupplierAdvisor® transparency and Impact PMO discipline help partners run multi-year programmes with audit trails.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-rose-100 bg-rose-50/30 p-5 flex gap-3">
                <x.icon className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">{x.t}</h3>
                  <p className="text-sm text-[#404040] leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#737373] leading-relaxed">
            Clinical HIV prevention and treatment remain the mandate of health systems and specialised
            partners; we partner as the food, livelihood and delivery layer.
          </p>
        </SlideShell>
      );

    case 11:
      return (
        <SlideShell>
          <Eyebrow>CHALLENGE → RESPONSE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-5 sm:mb-6">
            How the system maps
          </h2>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[10px] sm:text-xs tracking-[1px] text-[#737373]">
                  <th className="py-3 pr-3 font-semibold">Challenge</th>
                  <th className="py-3 pr-3 font-semibold">Big Five response</th>
                  <th className="py-3 font-semibold">Pillars</th>
                </tr>
              </thead>
              <tbody className="text-[#404040]">
                {[
                  {
                    c: "Hunger & undernutrition",
                    r: "Fortified staples + regenerative supply + containers",
                    p: "Foods · Agri · Direct",
                  },
                  {
                    c: "Child stunting / wasting risk",
                    r: "Affordable fortified diets + school/institutional channels",
                    p: "Foods · Foundation · Impact",
                  },
                  {
                    c: "HIV household vulnerability",
                    r: "Nutrition security + livelihoods + ethical delivery systems",
                    p: "Foods · Direct · Access · Leadership",
                  },
                  {
                    c: "Opaque supply chains",
                    r: "SupplierAdvisor® verification & live container transparency",
                    p: "Connect · Foods",
                  },
                  {
                    c: "Weak programme delivery",
                    r: "Cross-pillar PMO with gates, KPIs, field assurance",
                    p: "Impact · Foundation",
                  },
                  {
                    c: "Leadership & capital gaps",
                    r: "Super-Cube® + institutional access + global corridors",
                    p: "Leadership · Access · Global",
                  },
                ].map((row) => (
                  <tr key={row.c} className="border-b border-black/5">
                    <td className="py-3 pr-3 font-medium text-black align-top">{row.c}</td>
                    <td className="py-3 pr-3 align-top">{row.r}</td>
                    <td className="py-3 text-xs text-violet-800 font-medium align-top">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SlideShell>
      );

    case 12:
      return (
        <SlideShell dark>
          <Eyebrow light>PROOF POINTS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            What we can put on the table today
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { v: "150k", l: "Meals delivered" },
              { v: "100k", l: "Children reached" },
              { v: "83%", l: "Cheaper pathways" },
              { v: "74%", l: "More nutrition" },
            ].map((s) => (
              <StatTile key={s.l} dark value={s.v} label={s.l} />
            ))}
          </div>
          <ul className="space-y-2 text-sm text-white/70 max-w-2xl">
            <li>· Ten pillars under one group governance</li>
            <li>· Big Five Foods verified on SupplierAdvisor® with live container embed</li>
            <li>· Foundation registered on SupplierAdvisor®</li>
            <li>· Priority distribution markets across Africa + DE · HU corridors</li>
            <li>· SABC News coverage of KZN food insecurity response</li>
          </ul>
        </SlideShell>
      );

    case 13:
      return (
        <SlideShell>
          <Eyebrow>WHY WORK WITH US</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            Reasons partners choose Big Five
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                t: "One system, not seven vendors",
                d: "Food, logistics, capital, leadership and PMO in one accountable relationship.",
              },
              {
                t: "Addresses root constraints",
                d: "Hunger, malnutrition vulnerability, market trust and delivery capacity — not single-point projects.",
              },
              {
                t: "Evidence over theatre",
                d: "Published impact metrics, live container transparency, certifications markets can audit.",
              },
              {
                t: "African HQ, global standards",
                d: "KwaZulu-Natal base with ISO/FSSC-grade manufacturing and verified trade rails.",
              },
              {
                t: "Institutional fluency",
                d: "Ministries, DFIs, CSI, traditional leadership and operators — without losing field reality.",
              },
              {
                t: "Royal partnership & service",
                d: "Mandate to feed, educate and empower — with respect for heritage and local authority.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 flex gap-3 min-w-0"
              >
                <Check className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-black mb-1">{x.t}</div>
                  <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 14:
      return (
        <SlideShell dark className="!p-0">
          <TitleSlideLayout>
            <div>
              <Eyebrow light>NEXT STEP</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] mb-4 sm:mb-6 text-balance">
                Put a professional delivery system on your African ambition
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
                Fortified nutrition at scale, last-mile distribution, multi-pillar programmes, or
                verified ethical commerce — start with Big Five Impact.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/connect"
                  className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold"
                >
                  Start a conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/group"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  Explore the Group
                </Link>
                <a
                  href="mailto:craig@bigfivegroup.africa"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  craig@bigfivegroup.africa
                </a>
              </div>
            </div>
            <div className="mt-10 text-xs text-white/40 space-y-1">
              <p>Big Five Group (Pty) Ltd · KwaZulu-Natal · bigfivegroup.africa</p>
              <p>
                Sources: SOFI 2025; GRFC 2026; UNICEF/WHO/WB JME; UNICEF ESA; UNAIDS/WHO HIV
                estimates.
              </p>
            </div>
          </TitleSlideLayout>
        </SlideShell>
      );

    default:
      return null;
  }
}

/** Full-bleed layout for title / CTA slides — matches web; sized for print when needed. */
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

type PrintOrientation = "landscape" | "portrait";

/**
 * Exact A4 page geometry (ISO 216).
 * Margin is applied as @page margin so the slide fills the printable area
 * end-to-end (no double padding, no clipped edges).
 */
const A4 = {
  landscape: { w: "297mm", h: "210mm" },
  portrait: { w: "210mm", h: "297mm" },
  margin: "8mm",
} as const;

const PRINT_STYLES = `
  /* Park print tree off-screen (prep layout at A4 aspect without ghosting) */
  #strategy-deck-print-root {
    position: fixed;
    left: 0;
    top: 0;
    transform: translate3d(-200vw, 0, 0);
    z-index: -1;
    pointer-events: none;
  }
  #strategy-deck-print-root[data-orientation="landscape"] {
    width: 297mm;
  }
  #strategy-deck-print-root[data-orientation="portrait"] {
    width: 210mm;
  }
  #strategy-deck-print-root .deck-print-page {
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 0 12px;
    background: #fff;
  }
  #strategy-deck-print-root[data-orientation="landscape"] .deck-print-page {
    width: 297mm;
    height: 210mm;
    padding: 8mm;
  }
  #strategy-deck-print-root[data-orientation="portrait"] .deck-print-page {
    width: 210mm;
    height: 297mm;
    padding: 8mm;
  }
  #strategy-deck-print-root .deck-print-page > * {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    border-radius: 10px !important;
  }

  /* Strip effects that print engines turn into muddy halos */
  #strategy-deck-print-root,
  #strategy-deck-print-root * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  #strategy-deck-print-root .premium-button::before {
    content: none !important;
    display: none !important;
  }
  #strategy-deck-print-root [class*="blur-"] {
    display: none !important;
  }

  /* Named pages — Chrome/Edge honour these for exact A4 geometry */
  @page deck-landscape {
    size: A4 landscape;
    margin: 0;
  }
  @page deck-portrait {
    size: A4 portrait;
    margin: 0;
  }

  @media print {
    @page {
      size: A4 landscape;
      margin: 0;
    }

    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
      width: auto !important;
      height: auto !important;
      overflow: visible !important;
    }

    body > *:not(#strategy-deck-print-root) {
      display: none !important;
    }

    #strategy-deck-print-root {
      display: block !important;
      position: static !important;
      left: auto !important;
      top: auto !important;
      width: auto !important;
      transform: none !important;
      z-index: auto !important;
      pointer-events: auto !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #strategy-deck-print-root,
    #strategy-deck-print-root * {
      box-shadow: none !important;
      text-shadow: none !important;
      filter: none !important;
      -webkit-filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    #strategy-deck-print-root .premium-button,
    #strategy-deck-print-root .premium-button:hover {
      transform: none !important;
      box-shadow: none !important;
    }
    #strategy-deck-print-root .premium-button::before {
      content: none !important;
      display: none !important;
    }

    /* One slide = one full A4 page; 8mm inset = consistent end-to-end margins */
    #strategy-deck-print-root .deck-print-page {
      box-sizing: border-box !important;
      margin: 0 !important;
      overflow: hidden !important;
      background: #fff !important;
      border: none !important;
      box-shadow: none !important;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
      break-inside: avoid;
      page-break-before: auto;
    }

    #strategy-deck-print-root[data-orientation="landscape"] .deck-print-page {
      page: deck-landscape;
      width: ${A4.landscape.w} !important;
      height: ${A4.landscape.h} !important;
      min-width: ${A4.landscape.w} !important;
      min-height: ${A4.landscape.h} !important;
      max-width: ${A4.landscape.w} !important;
      max-height: ${A4.landscape.h} !important;
      padding: ${A4.margin} !important;
    }

    #strategy-deck-print-root[data-orientation="portrait"] .deck-print-page {
      page: deck-portrait;
      width: ${A4.portrait.w} !important;
      height: ${A4.portrait.h} !important;
      min-width: ${A4.portrait.w} !important;
      min-height: ${A4.portrait.h} !important;
      max-width: ${A4.portrait.w} !important;
      max-height: ${A4.portrait.h} !important;
      padding: ${A4.margin} !important;
    }

    /* Fallback when browser ignores named pages: still force A4 via @page + data attr */
    #strategy-deck-print-root[data-orientation="portrait"] {
      /* hint for engines that read first page only */
    }

    #strategy-deck-print-root .deck-print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }

    #strategy-deck-print-root .deck-print-page > * {
      width: 100% !important;
      height: 100% !important;
      border-radius: 8px !important;
    }

    #strategy-deck-print-root a {
      text-decoration: none !important;
      color: inherit !important;
    }

    #strategy-deck-print-root .shadow-sm,
    #strategy-deck-print-root [class*="shadow"] {
      box-shadow: none !important;
    }
  }

  /* When portrait is selected, set default @page to portrait (broader engine support) */
  @media print {
    body:has(#strategy-deck-print-root[data-orientation="portrait"]) {
      /* empty marker for :has support */
    }
  }
`;

/**
 * Orientation-specific @page rules.
 * Also keyed off html[data-deck-print] so engines that only honour the first
 * @page still get the correct A4 size for this print session.
 */
function printPageCss(orientation: PrintOrientation) {
  const size = orientation === "portrait" ? "A4 portrait" : "A4 landscape";
  const dims =
    orientation === "portrait"
      ? { w: A4.portrait.w, h: A4.portrait.h }
      : { w: A4.landscape.w, h: A4.landscape.h };

  return `
    @media print {
      @page {
        size: ${size};
        margin: 0;
      }
      html[data-deck-print="${orientation}"] {
        width: ${dims.w} !important;
      }
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
  // Client-only portal — avoid SSR / document access
  if (!active || typeof document === "undefined") return null;

  return createPortal(
    <PrintModeContext.Provider value={true}>
      <div
        id="strategy-deck-print-root"
        aria-hidden="true"
        data-orientation={orientation}
      >
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

export default function StrategyDeck() {
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

  // Print the real React slides (identical design to the web deck)
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
    }, 500);

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
      ? `${window.location.origin}/impact#strategy-deck`
      : "https://bigfivegroup.africa/impact#strategy-deck";

  const onShare = async () => {
    const payload = {
      title: "Big Five Group — Strategic Overview",
      text: "Strategic briefing: African challenges (hunger, malnutrition, HIV), how Big Five responds, and why partners work with us.",
      url: shareUrl,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(payload);
        setShareState("shared");
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
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
          ? "fixed inset-0 z-[100] bg-[#0c0a12] p-3 sm:p-5"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-gradient-to-b from-[#f5f3ff] to-[#f3f4f6] p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgb(91_33_182_/0.2)]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 mb-2">
        <div className="text-xs sm:text-sm font-medium text-[#404040]">
          Strategic overview{" "}
          <span className="text-[#737373] font-normal">
            · {index + 1} / {TOTAL}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 shadow-sm"
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
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => onDownload("landscape")}
              disabled={preparingPdf}
              title="A4 landscape PDF — full page, 8mm margins"
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-violet-900 hover:bg-white disabled:opacity-60"
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
              title="A4 portrait PDF — full page, 8mm margins"
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-violet-900 hover:bg-white disabled:opacity-60"
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
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 shadow-sm"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mx-2 sm:mx-3 mb-2 h-1 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
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
          className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black disabled:opacity-30 hover:bg-black/5 shadow-sm"
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
                i === index ? "w-5 bg-violet-700" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === TOTAL - 1}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-700 to-indigo-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30 shadow-sm"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id="strategy-deck" className="scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <div className="text-xs tracking-[3px] text-violet-700 mb-3 font-medium">
          STRATEGIC BRIEFING · ONLINE DECK · 15 SLIDES
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4 text-balance">
          Big Five Group — strategic overview
        </h2>
        <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-6">
          Hunger, child malnutrition and HIV burden — with credible UN sources — and how Big Five
          feeds, educates and empowers. Share the link or download a print-ready PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            type="button"
            onClick={onShare}
            className="premium-button inline-flex items-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-violet-800"
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
            className="premium-button inline-flex items-center gap-2 border border-violet-200 bg-white text-violet-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-violet-50 disabled:opacity-60"
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
        <span className="font-medium text-black">/impact#strategy-deck</span>
        <br className="sm:hidden" />
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> (297×210 landscape or
        210×297 portrait), one slide per page, <strong className="text-black">8mm</strong>{" "}
        margins end-to-end. In the dialog choose{" "}
        <strong className="text-black">Save as PDF</strong>
        {preparingPdf
          ? ` · matching paper: ${printOrientation === "landscape" ? "Landscape" : "Portrait"}`
          : ""}
        .
      </p>
      <PrintDeckPortal active={printMode} orientation={printOrientation} />
    </div>
  );
}
