"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
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
  Globe2,
  Truck,
  Package,
  Brain,
  Bot,
  MessageSquare,
  Cpu,
  ArrowDown,
} from "lucide-react";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";
import { sa, SA_ONBOARDING } from "../lib/saCopy";

const TOTAL = 20;

/**
 * Priority SDGs — official UN colour tiles (public/sdg/sdg-{n}.png).
 * Paths must match goal numbers exactly (1, 2, 4, 8, 10, 17).
 */
const SDG_ALIGNMENT = [
  {
    number: "1",
    title: "No Poverty",
    official: "End poverty in all its forms everywhere",
    icon: "/sdg/sdg-1.png",
    color: "#E5243B",
    how: "Livelihoods via Agri, Direct micro-hubs, Access capital pathways and Foundation programmes that raise household income with dignity.",
    pillars: "Agri · Direct · Access · Foundation",
  },
  {
    number: "2",
    title: "Zero Hunger",
    official: "End hunger, achieve food security and improved nutrition",
    icon: "/sdg/sdg-2.png",
    color: "#DDA63A",
    how: "Fortified nutrition, regenerative supply and last-mile containers so households, schools and institutions can eat affordably and well.",
    pillars: "Foods · Agri · Direct · Foundation",
  },
  {
    number: "4",
    title: "Quality Education",
    official: "Ensure inclusive and equitable quality education",
    icon: "/sdg/sdg-4.png",
    color: "#C5192D",
    how: "Super-Cube® ethical leadership for decision-makers — and school-channel nutrition so children can learn while fed.",
    pillars: "Leadership · Foods · Foundation",
  },
  {
    number: "8",
    title: "Decent Work and Economic Growth",
    official: "Promote sustained, inclusive economic growth and decent work",
    icon: "/sdg/sdg-8.png",
    color: "#A21942",
    how: "Ethical trade rails, local jobs in production and distribution, and verified commerce that keeps value in communities.",
    pillars: "Connect · Direct · Agri · Global",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    official: "Reduce inequality within and among countries",
    icon: "/sdg/sdg-10.png",
    color: "#DD1367",
    how: "Inclusive routes to markets, capital and programmes for producers and communities historically left out of formal systems.",
    pillars: "Access · Connect · Foundation",
  },
  {
    number: "17",
    title: "Partnerships for the Goals",
    official: "Strengthen the means of implementation and global partnership",
    icon: "/sdg/sdg-17.png",
    color: "#19486A",
    how: "Governments, DFIs, corporates, kingdoms and implementers — one group relationship with audit trails and shared KPIs.",
    pillars: "Impact · Global · Connect",
  },
] as const;

/** Short pillar briefs for the “integrated enterprise” slide */
const PILLAR_BRIEFS: Record<string, string> = {
  agri: "Regenerative production and smallholder supply with verified provenance.",
  foods:
    "Fortified, affordable nutrition for households, schools and institutions — repeat purchase that should sustain and grow with traction.",
  direct:
    "Last-mile distribution and SANTACO taxi-rank containers (15k plan) — Foods, Wi‑Fi surveys, marketing and Super-Cube® education where people already move.",
  access: "Pathways to tenders, CSI and development capital for African enterprise.",
  connect: "SupplierAdvisor® ethical commerce, verification and transparent trade.",
  leadership: "Super-Cube® ethical leadership for business and public life.",
  foundation: "Registered philanthropy funding community programmes with proof.",
  impact:
    "Cross-pillar PMO — design, gates, KPIs and field delivery. Working with the Director General of Health to help drive Group products into SA DoH and African health pathways.",
  global: "International corridors linking African capacity to world markets.",
};

const GROUP_OVERVIEW =
  "Big Five Group is a proudly African enterprise — African for Africa — headquartered in KwaZulu-Natal. We are not an import-only story: nine pillars share governance, mission and values so regenerative production, fortified nutrition, distribution, capital access, ethical commerce, leadership, philanthropy, programme delivery, global corridors compound as one system built on the continent, for the continent.";

/** Shorter copy for A4 landscape PDF so the pillar grid stays fully visible. */
const GROUP_OVERVIEW_PRINT =
  "Proudly African enterprise — African for Africa — HQ in KwaZulu-Natal. Nine pillars share governance, mission and values: production, fortified nutrition, last-mile, capital access, ethical commerce, leadership, philanthropy, programme delivery, global corridors — one system built on the continent, for the continent.";

const PILLAR_BRIEFS_PRINT: Record<string, string> = {
  agri: "Regenerative production & smallholder supply.",
  foods: "Fortified, affordable nutrition for homes, schools & institutions.",
  direct: "Last-mile & SANTACO containers — food, surveys, Super-Cube®.",
  access: "Tenders, CSI and development capital pathways.",
  connect: "SupplierAdvisor® ethical commerce & verification.",
  leadership: "Super-Cube® ethical leadership for public & private life.",
  foundation: "Registered philanthropy with programme proof.",
  impact: "Cross-pillar PMO — gates, KPIs; health channel via DG of Health relationship.",
  global: "Corridors linking African capacity to world markets.",
};

/**
 * Print/PDF context.
 * - `active`: true while preparing/exporting PDF.
 * - `compact`: dense typography so tall slides fit A4 landscape without clipping.
 */
const PrintModeContext = createContext<{ active: boolean; compact: boolean }>({
  active: false,
  compact: false,
});
/** Dense A4-fit typography (on during PDF export). */
function usePrintMode() {
  const ctx = useContext(PrintModeContext);
  return ctx.active && ctx.compact;
}
/** True while preparing/exporting PDF. */
function usePdfExport() {
  return useContext(PrintModeContext).active;
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
  const pdf = usePdfExport();
  const lockOverflow = forPrint || pdf;
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
      className={`relative h-full w-full overflow-x-hidden border box-border ${
        lockOverflow
          ? "overflow-hidden rounded-xl"
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
        className={`relative min-h-full flex flex-col h-full box-border ${
          zeroPad
            ? "p-0"
            : forPrint
              ? "p-4 sm:p-5 md:p-6"
              : pdf
                ? "p-4 sm:p-6 md:p-8"
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
      return <GroupTitleSlide />;

    case 1:
      return (
        <SlideShell>
          <Eyebrow>AGENDA</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            What this briefing covers
          </h2>
          <ol className="space-y-3 sm:space-y-3.5 max-w-2xl">
            {[
              "Proudly African for Africa — who Big Five Group is (nine pillars, one system); standing with Africa amid continental challenges",
              "Vision, mission and values — a prosperous Africa we help build",
              "Hunger & food insecurity in Africa (SOFI / GRFC / WFP)",
              "Child malnutrition — stunting, wasting, micronutrients (UNICEF/WHO/WB)",
              "Disease & health vulnerability — broader burden across Africa (WHO)",
              "Markets, last-mile and institutional trust gaps",
              "How Big Five responds: Feed · Educate · Empower",
              "Three-stage market model aligned to Feed · Educate · Empower",
              "How we resolve malnutrition and disease-linked household vulnerability",
              "UN SDGs & WFP Zero Hunger — how we align",
              "AI, robotics & SAM — intelligence for the mission",
              "Why partners choose a proudly African delivery partner — and how to engage",
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
      return <WhoWeAreSlide />;

    case 3:
      return <VisionMissionValuesSlide />;

    case 4:
      return (
        <SlideShell dark accent="rose">
          <Eyebrow light>THE CHALLENGE · HUNGER · SOFI 2026</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Global hunger eased slightly — Africa remains the epicentre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <StatTile dark value="309M" label="People in Africa faced hunger in 2025 (~20% of the population · SOFI 2026)" />
            <StatTile dark value="~60%" label="Of people projected undernourished by 2030 could be in Africa" />
            <StatTile dark value="645M" label="People globally faced hunger in 2025 (~7.8% · SOFI 2026)" />
            <StatTile dark value="2.7B" label="People worldwide who cannot afford a healthy diet (SOFI 2026)" />
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://www.fao.org/newsroom/detail/sofi-2026--hunger-not-inevitable--fao-says-as-global-hunger-report-shows-progress/en">
              FAO / IFAD / UNICEF / WFP / WHO — SOFI 2026
            </Ref>
            ;{" "}
            <Ref href="https://www.fao.org/publications/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en">
              SOFI flagship · FAO
            </Ref>
            ;{" "}
            <Ref href="https://www.wfp.org/publications/global-report-food-crises-grfc">
              Global Report on Food Crises
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
            <StatTile value="150M" label="Children under 5 stunted globally in 2024 (~23.2% · UNICEF/WHO/WB JME · SOFI)" />
            <StatTile value="~1/3" label="Children in high-stunting regions of West/Central & East/Southern Africa still face very high stunting prevalence" />
            <StatTile value="13M" label="Children with acute malnutrition in Eastern & Southern Africa (UNICEF call)" />
            <StatTile value="~4M" label="Estimated severe acute malnutrition (SAM) cases in ESA (most lethal form)" />
            <StatTile value="45%" label="Of under-five deaths linked to undernutrition as underlying cause (global UNICEF framing)" />
            <StatTile value="2.7B" label="People who cannot afford a healthy diet worldwide (SOFI 2026)" />
          </div>
          <p className="text-sm text-[#404040] leading-relaxed mb-4 max-w-3xl">
            Global stunting has improved modestly but remains{" "}
            <strong className="text-black">off-track for 2030</strong>. Sub-Saharan Africa still
            carries a heavy burden of stunting and micronutrient deficiency — undermining immunity,
            learning and lifelong earnings. Affordable fortified diets and school feeding are
            structural answers, not boutique nutrition.
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
          <Eyebrow light>THE CHALLENGE · DISEASE & HEALTH VULNERABILITY</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Broader disease burden multiplies hunger and household fragility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            <StatTile
              dark
              value="Dual"
              label="Infectious disease + rising non-communicable disease (NCD) burden across Africa"
            />
            <StatTile
              dark
              value="Cycle"
              label="Illness deepens poverty and hunger; undernutrition worsens disease outcomes"
            />
            <StatTile
              dark
              value="Care"
              label="Caregivers and workers lose income and food access when households face chronic or acute illness"
            />
            <StatTile
              dark
              value="Systems"
              label="Health systems and families need food security and livelihoods as part of resilience — not clinical care alone"
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-3xl">
            Across the continent, communities face a{" "}
            <strong className="text-white">broad disease burden</strong> — communicable illness,
            endemic infections, maternal and child health challenges, and growing NCDs. Progress in
            health systems is real, but food insecurity and weak livelihoods still undermine recovery,
            immunity, school attendance and household resilience. Disease is not only a clinic problem;
            it is a nutrition, market and delivery problem too.
          </p>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://www.afro.who.int/">WHO African Region</Ref>
            ;{" "}
            <Ref href="https://www.who.int/data/gho">WHO Global Health Observatory</Ref>
            ;{" "}
            <Ref href="https://www.worldbank.org/en/topic/health">World Bank Health</Ref>
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
      return <FeedEducateEmpowerSlide />;

    case 9:
      return <ThreeStageMarketSlide />;

    case 10:
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
                d: "Big Five Foods porridges, soya, one-pot meals and soups — ~50% cheaper than wholesale/retail, 74% more nutrition design; long shelf life for schools, government and feeding schemes — including the pathway to feed 2.5 million children per day through the National School Nutrition Programme (NSNP / DBE).",
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

    case 11:
      return (
        <SlideShell accent="rose">
          <Eyebrow>HOW WE SUPPORT DISEASE-AFFECTED HOUSEHOLDS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Nutrition, livelihoods and systems — complementary to clinical care
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-5">
            Big Five is not a clinical health provider. We address the{" "}
            <strong className="text-black">socio-economic determinants</strong> that interact with
            broader disease burden: food insecurity, household resilience, skills, and trusted supply
            systems — so families facing illness have a stronger foundation for recovery and dignity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {[
              {
                icon: UtensilsCrossed,
                t: "Nutrition security",
                d: "Affordable fortified foods for vulnerable households and institutions — reducing hunger stress that undermines health and recovery capacity.",
              },
              {
                icon: Activity,
                t: "Livelihoods & dignity",
                d: "Agri, Direct and Access create income and market pathways so families are less forced into high-risk coping strategies when illness hits.",
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
            Clinical prevention, diagnosis and treatment remain the mandate of health systems and
            specialised partners; we partner as the food, livelihood and delivery layer around broader
            disease vulnerability.
          </p>
        </SlideShell>
      );

    case 12:
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
                    c: "Disease-linked household vulnerability",
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

    case 13:
      return (
        <SlideShell accent="emerald">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 sm:mb-3">
            <Eyebrow>GLOBAL FRAMEWORK · UN SDGs</Eyebrow>
            <div className="relative w-24 h-12 sm:w-28 sm:h-14 shrink-0">
              <Image
                src="/sdg/un-sdg-logo.png"
                alt="United Nations Sustainable Development Goals"
                fill
                sizes="112px"
                className="object-contain object-right"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-2 text-balance">
            Aligned to the Sustainable Development Goals
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3 sm:mb-4">
            Feed · Educate · Empower maps onto the UN 2030 Agenda. Official goal icons below —
            programmes designed so governments, DFIs and corporates can report contribution clearly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 min-h-0">
            {SDG_ALIGNMENT.map((g) => (
              <div
                key={`sdg-${g.number}`}
                className="rounded-xl border border-black/10 bg-white p-2.5 sm:p-3 min-w-0 flex gap-2.5 sm:gap-3 items-start"
              >
                {/* Fixed small square — object-contain so the full official tile is visible (web + PDF) */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 overflow-hidden rounded-md ring-1 ring-black/10 bg-white">
                  <Image
                    src={g.icon}
                    alt={`United Nations SDG ${g.number} — ${g.title}`}
                    fill
                    sizes="44px"
                    className="object-contain object-center"
                    priority={g.number === "1" || g.number === "2"}
                  />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div
                    className="text-[10px] tracking-[1.5px] font-bold mb-0.5"
                    style={{ color: g.color }}
                  >
                    SDG {g.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-black leading-tight mb-1">
                    {g.title}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#525252] leading-snug mb-1 line-clamp-3">
                    {g.how}
                  </p>
                  <div className="text-[10px] font-medium text-emerald-800">{g.pillars}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs text-[#737373] leading-relaxed">
            Icons: official UN SDG colour tiles ·{" "}
            <Ref href="https://sdgs.un.org/goals">sdgs.un.org/goals</Ref>
            {" · "}
            Goals 1, 2, 4, 8, 10 & 17
          </p>
        </SlideShell>
      );

    case 14:
      return (
        <SlideShell dark accent="amber">
          <Eyebrow light>GLOBAL FRAMEWORK · WFP & ZERO HUNGER</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 sm:mb-4 text-balance">
            How we align with the WFP hunger agenda
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl mb-5">
            The{" "}
            <strong className="text-white">World Food Programme</strong> leads the global fight
            against hunger — emergency response, school feeding, nutrition and resilient food
            systems. Big Five is not WFP and does not replace UN humanitarian mandates. We are the{" "}
            <strong className="text-white">African enterprise layer</strong> that helps governments,
            corporates and implementers deliver complementary Zero Hunger outcomes with fortification,
            production, last-mile rails and proof.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {[
              {
                icon: UtensilsCrossed,
                t: "Nutrition quality at scale",
                d: "Fortified, shelf-stable foods designed for schools, institutions and households — aligned with the same Zero Hunger (SDG 2) priority WFP advances through school meals and nutrition support.",
              },
              {
                icon: Package,
                t: "Local supply & resilience",
                d: "Regenerative Agri + Foods manufacturing so programmes are not import-only theatre — supporting resilient food systems and shorter, more transparent chains.",
              },
              {
                icon: Truck,
                t: "Last-mile that can be seen",
                d: "Direct containers and SupplierAdvisor® live logistics so partners know where product sits — critical for institutional feeding and multi-site programmes.",
              },
              {
                icon: Globe2,
                t: "Partnerships that report",
                d: "Impact PMO + Foundation design programmes with KPIs, gates and audit trails — so CSI, DFIs and ministries can show contribution to WFP-aligned national hunger goals.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5 flex gap-3 min-w-0"
              >
                <x.icon className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">{x.t}</h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Context sources:{" "}
            <Ref href="https://www.wfp.org/overview">WFP mandate & overview</Ref>
            {" · "}
            <Ref href="https://www.wfp.org/publications/global-report-food-crises-grfc">
              Global Report on Food Crises (WFP co-published)
            </Ref>
            {" · "}
            <Ref href="https://www.fao.org/newsroom/detail/sofi-2026--hunger-not-inevitable--fao-says-as-global-hunger-report-shows-progress/en">
              SOFI 2026 (FAO/IFAD/UNICEF/WFP/WHO)
            </Ref>
            . We complement — we do not claim WFP sponsorship or agency status.
          </p>
        </SlideShell>
      );

    case 15:
      return (
        <SlideShell dark>
          <Eyebrow light>PROOF POINTS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            What we can put on the table today
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6">
            {[
              { v: "150k", l: "Meals delivered (programme-reported)" },
              { v: "100k", l: "Children reached (programme-reported)" },
              { v: "2.5M", l: "Kids per day — NSNP / DBE feeding ambition" },
              { v: "~50%", l: "Cheaper vs wholesale & retail" },
              { v: "74%", l: "More nutrition (internal)" },
            ].map((s) => (
              <StatTile key={s.l} dark value={s.v} label={s.l} />
            ))}
          </div>
          <ul className="space-y-2 text-sm text-white/70 max-w-2xl">
            <li>· Proudly African for Africa — HQ KwaZulu-Natal · continental mission</li>
            <li>· Nine pillars under one group governance</li>
            <li>
              · Pathway to feed <strong className="text-white/90">2.5 million children per day</strong>{" "}
              through the National School Nutrition Programme (NSNP / DBE)
            </li>
            <li>· SDG-aligned programme design (1 · 2 · 4 · 8 · 10 · 17)</li>
            <li>· Zero Hunger delivery layer complementary to WFP / national agendas</li>
            <li>· Big Five Foods verified on SupplierAdvisor® with live container embed</li>
            <li>· Foundation registered on SupplierAdvisor®</li>
            <li>· Priority distribution markets across Africa + DE · HU · GE corridors</li>
          </ul>
        </SlideShell>
      );

    case 16:
      return (
        <SlideShell>
          <Eyebrow>WHY WORK WITH US · PROUDLY AFRICAN</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 sm:mb-4">
            Why partners choose a proudly African Group
          </h2>
          <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-6">
            Big Five Group is <strong className="text-black">proudly African for Africa</strong> —
            not a foreign franchise of Africa. Partners get continental commitment with local HQ,
            local legitimacy and delivery they can audit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                t: "Proudly African initiative",
                d: "Conceived, headquartered and operated as an African enterprise for African outcomes — Feed · Educate · Empower.",
              },
              {
                t: "One system, not seven vendors",
                d: "Food, logistics, capital, leadership and PMO in one accountable relationship.",
              },
              {
                t: "Addresses root constraints",
                d: "Hunger, malnutrition vulnerability, market trust and delivery capacity — not single-point projects.",
              },
              {
                t: "SDG & Zero Hunger fluent",
                d: "Programmes map to SDGs 1, 2, 4, 8, 10, 17 and complement WFP-aligned national hunger priorities with private-sector rails.",
              },
              {
                t: "Evidence over theatre",
                d: "Published impact metrics, live container transparency, certifications markets can audit.",
              },
              {
                t: "African HQ · African for Africa · global standards",
                d: "KwaZulu-Natal base, African markets first, ISO/FSSC-grade manufacturing and verified trade rails.",
              },
              {
                t: "Institutional fluency",
                d: "Ministries, DFIs, CSI and community partners — feed, educate and empower with local legitimacy.",
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

    case 17:
      return (
        <SlideShell dark>
          <Eyebrow light>FUTURE SYSTEMS · AI & ROBOTICS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 text-balance">
            The intelligence layer for Feed · Educate · Empower
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl mb-5">
            {sa.intelligence.body}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
            {sa.intelligence.pillars.map((p) => (
              <div
                key={p.t}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 min-w-0"
              >
                <div className="text-sm font-semibold text-violet-200 mb-1">{p.t}</div>
                <p className="text-xs text-white/65 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: Brain, t: "AI trust" },
              { icon: Cpu, t: "Robotics" },
              { icon: Bot, t: "Live pulse" },
              { icon: MessageSquare, t: "SAM" },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3 flex items-center gap-2"
              >
                <x.icon className="w-4 h-4 text-violet-300" />
                <span className="text-xs font-semibold text-white">{x.t}</span>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 18:
      return (
        <SlideShell accent="emerald">
          <Eyebrow>SUPPLIERADVISOR® · SAM</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 text-balance">
            {sa.sam.heroTitle}
          </h2>
          <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-4">
            {sa.sam.oneLiner}{" "}
            <strong className="text-black">{sa.sam.promise}</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {sa.sam.useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3.5 flex gap-2.5 min-w-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-black mb-0.5">{u.title}</div>
                  <p className="text-xs text-[#525252] leading-snug">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 text-white px-4 py-2 text-xs font-semibold"
            >
              {sa.sam.cta}
            </a>
            <Link
              href="/connect/sam"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black"
            >
              bigfivegroup.africa/connect/sam
            </Link>
          </div>
        </SlideShell>
      );

    case 19:
      return (
        <SlideShell dark className="!p-0">
          <TitleSlideLayout>
            <div>
              <Eyebrow light>CALL TO ACTION · PROUDLY AFRICAN FOR AFRICA</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tighter leading-[1.05] mb-4 sm:mb-5 text-balance">
                Africa does not need another pitch deck from elsewhere.
                <br />
                <span className="text-violet-300">
                  It needs a proudly African delivery system that works.
                </span>
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-3 sm:mb-4">
                If you are a government, DFI, corporate CSI team, implementer or programme partner
                serious about{" "}
                <strong className="text-white">Zero Hunger, SDG outcomes and last-mile proof</strong>
                — partner with Big Five Group:{" "}
                <strong className="text-white">proudly African for Africa</strong>. One
                relationship. Nine pillars. Feed · Educate · Empower.
              </p>
              <p className="text-sm sm:text-base text-violet-200/90 font-medium max-w-2xl mb-6 sm:mb-8">
                Book a 30-minute strategy call this week. Leave with a clear next step — programme
                design, fortified supply, container distribution, or multi-pillar delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-3xl">
                {[
                  { n: "01", t: "Tell us the outcome", d: "Meals, schools, corridors, capital or PMO" },
                  { n: "02", t: "We map the pillars", d: "Right mix of Foods, Direct, Access, Impact…" },
                  { n: "03", t: "We deliver with proof", d: "Gates, KPIs, SupplierAdvisor® trails" },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 min-w-0"
                  >
                    <div className="text-[10px] tracking-[2px] text-violet-300 font-semibold mb-1">
                      {s.n}
                    </div>
                    <div className="text-sm font-semibold text-white mb-0.5">{s.t}</div>
                    <div className="text-xs text-white/55 leading-snug">{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/connect"
                  className="deck-primary-cta premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm sm:text-base font-semibold shadow-none"
                  style={{ color: "#000000", backgroundColor: "#ffffff" }}
                >
                  Partner with Big Five — start now
                  <ArrowRight className="w-4 h-4" style={{ color: "#000000" }} />
                </Link>
                <a
                  href="mailto:craig@bigfivegroup.africa?subject=Strategic%20partnership%20—%20Big%20Five%20Group&body=Hello%20Big%20Five%20team%2C%0A%0AI%20would%20like%20to%20discuss%20a%20partnership%20%2F%20programme%20aligned%20to%20Feed%20·%20Educate%20·%20Empower.%0A%0AOrganisation%3A%0AOutcome%20we%20need%3A%0ATimeline%3A%0A%0AThank%20you."
                  className="deck-primary-cta deck-email-cta premium-button inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold shadow-none"
                  style={{ color: "#000000", backgroundColor: "#ffffff" }}
                >
                  Email: craig@bigfivegroup.africa
                </a>
                <Link
                  href="/group"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
                >
                  Explore the nine pillars
                </Link>
              </div>
            </div>
            <div className="mt-8 sm:mt-10 text-xs text-white/40 space-y-1">
              <p className="text-white/55 font-medium">
                Proudly African for Africa. Don&apos;t brief another silo. Brief a system. —
                bigfivegroup.africa
              </p>
              <p>Big Five Group (Pty) Ltd · KwaZulu-Natal · South Africa · African HQ</p>
              <p>
                Sources: SOFI 2026 (FAO/IFAD/UNICEF/WFP/WHO); GRFC; UNICEF/WHO/WB JME; WHO African
                Region / GHO; UN SDGs; WFP Zero Hunger agenda.
              </p>
            </div>
          </TitleSlideLayout>
        </SlideShell>
      );

    default:
      return null;
  }
}

/** Full-bleed layout for title / CTA slides — fills viewport; PDF export uses h-full (no 70dvh min). */
function TitleSlideLayout({ children }: { children: React.ReactNode }) {
  const forPrint = usePrintMode();
  const pdf = usePdfExport();
  return (
    <div
      className={`relative flex flex-col justify-between box-border ${
        forPrint
          ? "h-full min-h-0 p-8 md:p-10"
          : pdf
            ? // Match digital padding but fill the clone frame (no min-h that overflows A4)
              "h-full min-h-0 p-5 sm:p-8 md:p-10 lg:p-12"
            : "min-h-[min(70dvh,36rem)] p-5 sm:p-8 md:p-10 lg:p-12"
      }`}
    >
      {children}
    </div>
  );
}

/** Slide 1 — Group strategic overview title with official white Group mark */
function GroupTitleSlide() {
  const forPrint = usePrintMode();

  return (
    <SlideShell dark className="!p-0">
      <TitleSlideLayout>
        <div>
          <Eyebrow light>BIG FIVE GROUP · PROUDLY AFRICAN FOR AFRICA</Eyebrow>
          <div
            className={`relative mb-4 sm:mb-6 ${
              forPrint ? "w-24 h-24" : "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
            }`}
          >
            <Image
              src="/bigfivegroup-logo.png"
              alt="Big Five Group"
              fill
              className="object-contain object-left drop-shadow-lg"
              sizes="160px"
              priority
            />
          </div>
          <h2
            className={`font-semibold tracking-tighter leading-[1.05] max-w-3xl text-balance text-white ${
              forPrint
                ? "text-2xl sm:text-3xl"
                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            }`}
          >
            Proudly African.
            <br />
            <span className="text-violet-300">African for Africa.</span>
            <br />
            Infinite African Impact.
          </h2>
          <p
            className={`text-violet-200/90 font-medium max-w-2xl ${
              forPrint ? "mt-3 text-xs" : "mt-4 text-sm sm:text-base"
            }`}
          >
            One Group · Nine Pillars · A proudly African initiative for the continent we serve.
          </p>
        </div>
        <div
          className={`grid sm:grid-cols-2 gap-6 max-w-3xl ${
            forPrint ? "mt-6" : "mt-10 sm:mt-14"
          }`}
        >
          <p
            className={`text-white/75 leading-relaxed ${
              forPrint ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            A shareable strategic briefing for governments, DFIs, corporates and partners —
            African challenges with credible sources, and how Big Five —{" "}
            <strong className="text-white">proudly African for Africa</strong> — delivers.
          </p>
          <div
            className={`text-white/45 space-y-1 ${
              forPrint ? "text-[10px]" : "text-xs sm:text-sm"
            }`}
          >
            <p>Proudly African HQ · KwaZulu-Natal · South Africa</p>
            <p>bigfivegroup.africa/impact#strategy-deck</p>
            <p>20 slides · Downloadable · Shareable</p>
          </div>
        </div>
      </TitleSlideLayout>
    </SlideShell>
  );
}

/** Who we are — densifies for A4 landscape so 9 pillars never clip. */
function WhoWeAreSlide() {
  const forPrint = usePrintMode();
  const pdf = usePdfExport();
  const dense = forPrint || pdf;
  const briefs = dense ? PILLAR_BRIEFS_PRINT : PILLAR_BRIEFS;
  const overview = dense ? GROUP_OVERVIEW_PRINT : GROUP_OVERVIEW;

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <Eyebrow>WHO WE ARE · PROUDLY AFRICAN</Eyebrow>
          <h2
            className={`font-semibold tracking-tighter text-balance ${
              dense
                ? "text-xl sm:text-2xl mb-1.5"
                : "text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4"
            }`}
          >
            Proudly African. Built for Africa.
          </h2>
          <p
            className={`text-[#525252] leading-snug max-w-3xl ${
              dense ? "text-[11px] sm:text-xs mb-2" : "text-sm sm:text-base leading-relaxed mb-3 sm:mb-4"
            }`}
          >
            This is a <strong className="text-black">proudly African initiative</strong>. Big Five
            Group is <strong className="text-black">proudly African for Africa</strong> — HQ on the
            continent, solutions designed for African households, schools, governments and markets,
            with African partners and delivery capacity attached.
          </p>
        </div>

        <div
          className={`rounded-xl sm:rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50 via-white to-amber-50/50 min-w-0 shrink-0 ${
            dense ? "p-2 mb-2" : "p-3.5 sm:p-4 mb-3 sm:mb-4"
          }`}
          role="note"
        >
          <div
            className={`tracking-[1.5px] sm:tracking-[2px] text-emerald-900 font-semibold ${
              dense ? "text-[8px] mb-0.5" : "text-[10px] mb-1.5"
            }`}
          >
            STANDING WITH AFRICA · FOR AFRICA
          </div>
          <p
            className={`text-[#404040] ${
              dense
                ? "text-[9px] sm:text-[10px] leading-snug"
                : "text-xs sm:text-sm leading-relaxed"
            }`}
          >
            {dense ? (
              <>
                We acknowledge recent challenges in South Africa that reverberate across the
                continent. They are{" "}
                <strong className="text-black">by no means a reflection of our business</strong>.
                We <strong className="text-black">stand with Africa, for Africa</strong> —
                committed to delivery, dignity and partnership on the continent we serve.
              </>
            ) : (
              <>
                We acknowledge the recent issues and challenges in South Africa that impact
                communities and confidence across Africa. Those realities deserve honest
                recognition — and they are{" "}
                <strong className="text-black">by no means a reflection of our business</strong>,
                our integrity, or the work of the partners we serve. Big Five Group remains{" "}
                <strong className="text-black">proudly African for Africa</strong>: we stand with
                Africa, for Africa — and we keep building regenerative supply, fortified nutrition,
                ethical commerce and programme delivery that the continent can trust.
              </>
            )}
          </p>
        </div>

        <div
          className={`rounded-xl sm:rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 to-indigo-50/60 flex gap-2.5 min-w-0 shrink-0 ${
            dense ? "p-2.5 mb-2" : "p-4 sm:p-5 mb-4 sm:mb-5 gap-3"
          }`}
        >
          <div
            className={`rounded-lg bg-violet-700 text-white flex items-center justify-center shrink-0 ${
              dense ? "w-8 h-8" : "w-10 h-10 rounded-xl"
            }`}
          >
            <Layers className={dense ? "w-4 h-4" : "w-5 h-5"} />
          </div>
          <div className="min-w-0">
            <div
              className={`tracking-[2px] text-violet-800 font-semibold mb-0.5 ${
                dense ? "text-[9px]" : "text-[10px] mb-1"
              }`}
            >
              BIG FIVE GROUP · AFRICAN FOR AFRICA
            </div>
            <p
              className={`text-[#404040] ${
                dense ? "text-[10px] sm:text-[11px] leading-snug" : "text-xs sm:text-sm leading-relaxed"
              }`}
            >
              {overview}
            </p>
          </div>
        </div>

        <div
          className={`grid min-h-0 flex-1 content-start ${
            dense
              ? "grid-cols-5 gap-1.5"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5"
          }`}
        >
          {companies.map((c) => (
            <div
              key={c.slug}
              className={`rounded-lg sm:rounded-xl border border-black/10 bg-gradient-to-b from-white to-[#fafafa] flex min-w-0 ${
                dense ? "flex-col gap-1 p-2" : "gap-2.5 p-3"
              }`}
            >
              <div
                className={`rounded-md flex items-center justify-center shrink-0 ${
                  dense ? "w-6 h-6" : "w-8 h-8 rounded-lg"
                }`}
                style={{ backgroundColor: `${c.color}18`, color: c.color }}
              >
                <CompanyIcon name={c.icon} size={dense ? 12 : 16} />
              </div>
              <div className="min-w-0">
                <div
                  className={`font-semibold text-black truncate ${
                    dense ? "text-[10px]" : "text-xs"
                  }`}
                >
                  {c.name}
                </div>
                <p
                  className={`text-[#525252] leading-snug mt-0.5 ${
                    dense ? "text-[9px] line-clamp-3" : "text-[11px] sm:text-xs"
                  }`}
                >
                  {briefs[c.slug] ?? c.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/**
 * Three-stage end-market model mapped to Group mission:
 * Stage 1 Feed · Stage 2 Educate · Stage 3 Empower
 */
function ThreeStageMarketSlide() {
  const forPrint = usePrintMode();
  const pdf = usePdfExport();
  const dense = forPrint || pdf;

  const stages = [
    {
      n: "01",
      mission: "Feed",
      horizon: "Immediate · short term",
      title: "Supply food now",
      icon: UtensilsCrossed,
      color: "#d97706",
      soft: "#fffbeb",
      border: "border-amber-200",
      d: dense
        ? "Feed first: ship finished fortified foods into the end market to address food security and malnutrition now."
        : "Feed first — supply finished fortified foods into the end market in the immediate short term. Porridges, soya, one-pots and programme SKUs put nutrition on plates while local capacity is still being built.",
      bullets: dense
        ? ["Finished goods to market", "Food security & malnutrition", "Demand & menus established"]
        : [
            "Finished goods into schools, institutions and last-mile nodes",
            "Addresses hunger and malnutrition without waiting for plant build",
            "Builds demand, menus and trust — the Feed foundation for later stages",
          ],
    },
    {
      n: "02",
      mission: "Educate",
      horizon: "Medium term · 18–36 months",
      title: "Pack in-market · build capability",
      icon: GraduationCap,
      color: "#eab308",
      soft: "#fefce8",
      border: "border-yellow-200",
      d: dense
        ? "Educate: set up end-market packing; ship blends in; train local teams and create skilled employment."
        : "Educate the end market industrially — set up a packing factory, ship blends in for local pack, and train people in QA, operations and factory discipline. Local employment with real skills, not only temporary jobs.",
      bullets: dense
        ? ["Local packing plant", "Blends in · skills transfer", "Train packing & QA teams"]
        : [
            "End-market packing facility commissioned",
            "Blends sent in; finished packs produced locally",
            "Skills transfer: packing, QA, warehouse and plant leadership",
          ],
    },
    {
      n: "03",
      mission: "Empower",
      horizon: "Longer term · 36–60 months",
      title: "Full local self-sufficiency",
      icon: Shield,
      color: "#059669",
      soft: "#ecfdf5",
      border: "border-emerald-200",
      d: dense
        ? "Empower: farmers, blending and packing in-market — self-sufficient factory with export potential."
        : "Empower the end market economically — establish farmers, blending facilities and full local value chains so the factory is self-sufficient, with export potential on African terms.",
      bullets: dense
        ? ["Local farmers & blend", "Self-sufficient plant", "Export potential"]
        : [
            "Local farmer supply and regenerative offtake",
            "In-market blending + packing — full self-sufficiency",
            "Export potential from a proudly African production base",
          ],
    },
  ] as const;

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <Eyebrow>HOW WE PLAN TO DO BUSINESS · FEED · EDUCATE · EMPOWER</Eyebrow>
          <h2
            className={`font-semibold tracking-tighter text-balance ${
              dense
                ? "text-xl sm:text-2xl mb-1"
                : "text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3"
            }`}
          >
            Three stages. One mission path.
          </h2>
          <p
            className={`text-[#525252] max-w-3xl ${
              dense
                ? "text-[11px] sm:text-xs leading-snug mb-2"
                : "text-sm sm:text-base leading-relaxed mb-4 sm:mb-5"
            }`}
          >
            Group strategy in every end market:{" "}
            <strong className="text-black">Feed</strong> with food now,{" "}
            <strong className="text-black">Educate</strong> with in-market packing and skills, then{" "}
            <strong className="text-black">Empower</strong> with full local farm-to-factory
            self-sufficiency and export potential.
          </p>
        </div>

        {/* Visual flow: Feed → Educate → Empower */}
        <div
          className={`shrink-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-5 ${
            dense ? "mb-2" : ""
          }`}
          aria-hidden
        >
          {stages.map((s, i) => (
            <div key={s.n} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div
                className="flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 border shadow-none"
                style={{ backgroundColor: s.soft, borderColor: `${s.color}44` }}
              >
                <span
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {i + 1}
                </span>
                <span
                  className={`font-semibold tracking-tight ${
                    dense ? "text-[10px]" : "text-xs sm:text-sm"
                  }`}
                  style={{ color: s.color }}
                >
                  {s.mission}
                </span>
                <span
                  className={`text-[#737373] hidden sm:inline ${
                    dense ? "text-[9px]" : "text-[11px]"
                  }`}
                >
                  · {s.title.split("·")[0].trim()}
                </span>
              </div>
              {i < stages.length - 1 && (
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#a3a3a3] shrink-0 hidden sm:block"
                  strokeWidth={2.5}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className={`grid min-h-0 flex-1 content-start ${
            dense
              ? "grid-cols-3 gap-2"
              : "grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
          }`}
        >
          {stages.map((s, i) => (
            <div
              key={s.n}
              className={`relative rounded-2xl border ${s.border} bg-white flex flex-col min-w-0 overflow-hidden shadow-none ${
                dense ? "p-2.5" : "p-4 sm:p-5"
              }`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <div className={`flex items-start gap-2.5 ${dense ? "mb-1.5" : "mb-3"}`}>
                <div
                  className={`rounded-xl flex items-center justify-center shrink-0 ${
                    dense ? "w-8 h-8" : "w-11 h-11"
                  }`}
                  style={{ backgroundColor: s.soft, color: s.color }}
                >
                  <s.icon className={dense ? "w-4 h-4" : "w-5 h-5"} />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-bold tracking-[1.5px] uppercase ${
                      dense ? "text-[8px]" : "text-[10px]"
                    }`}
                    style={{ color: s.color }}
                  >
                    Stage {s.n} · {s.mission}
                  </div>
                  <div
                    className={`font-semibold tracking-tight text-black ${
                      dense ? "text-sm leading-tight" : "text-base sm:text-lg leading-snug"
                    }`}
                  >
                    {s.title}
                  </div>
                  <div
                    className={`text-[#737373] font-medium ${
                      dense ? "text-[9px]" : "text-[11px] sm:text-xs"
                    }`}
                  >
                    {s.horizon}
                  </div>
                </div>
              </div>
              <p
                className={`text-[#404040] shrink-0 ${
                  dense
                    ? "text-[10px] leading-snug mb-1.5"
                    : "text-xs sm:text-sm leading-relaxed mb-3"
                }`}
              >
                {s.d}
              </p>
              <ul className={`space-y-1 shrink-0 ${dense ? "" : "space-y-1.5"}`}>
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex gap-1.5 text-[#525252] ${
                      dense ? "text-[9px] leading-snug" : "text-[11px] sm:text-xs leading-snug"
                    }`}
                  >
                    <Check
                      className="shrink-0 mt-0.5"
                      style={{ color: s.color, width: dense ? 10 : 14, height: dense ? 10 : 14 }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {i < stages.length - 1 && (
                <div className="md:hidden flex justify-center pt-2 text-[#a3a3a3]" aria-hidden>
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className={`text-[#737373] shrink-0 ${
            dense
              ? "mt-2 text-[9px] sm:text-[10px] leading-snug"
              : "mt-4 text-xs sm:text-sm leading-relaxed"
          }`}
        >
          <strong className="text-black">One Group mission, three stages of delivery.</strong>{" "}
          Feed · Educate · Empower is the premise; supply → pack → local self-sufficiency is how we
          execute it in each end market. Timelines (18–36 months packing; 36–60 months full
          localisation) are planning horizons — not a claim of plant already built everywhere.
        </p>
      </div>
    </SlideShell>
  );
}

/** Feed · Educate · Empower — densifies for A4 landscape. */
function FeedEducateEmpowerSlide() {
  const forPrint = usePrintMode();
  const pdf = usePdfExport();
  const dense = forPrint || pdf;

  const pillars = [
    {
      icon: UtensilsCrossed,
      t: "Feed",
      color: "#6ee7b7",
      d: dense
        ? "Agri + Foods: regenerative production and fortified nutrition — affordable, shelf-stable for African households, schools and institutions. Pathway to feed 2.5M kids/day via NSNP (DBE)."
        : "Agri + Foods: regenerative production and fortified nutrition — affordable, shelf-stable, designed for African households, schools and institutions. We will feed 2.5 million children per day through the National School Nutrition Programme (NSNP / DBE).",
      proof: dense
        ? "150k meals · 100k children · ~50% cheaper · 2.5M kids/day NSNP (DBE)"
        : "150k meals · 100k children · ~50% cheaper vs wholesale/retail · 2.5M kids/day through NSNP (DBE)",
    },
    {
      icon: GraduationCap,
      t: "Educate",
      color: "#fcd34d",
      d: dense
        ? "Leadership: Super-Cube® — ethical, whole-person, Africa-centred decisions in business and public life."
        : "Leadership: Super-Cube® so decisions in business and public life are ethical, whole-person and Africa-centred.",
      proof: "Capability for nations & enterprises",
    },
    {
      icon: Shield,
      t: "Empower",
      color: "#7dd3fc",
      d: dense
        ? "Direct, Access, Connect, Global: distribution, capital, SupplierAdvisor® and corridors — African value on African terms."
        : "Direct, Access, Connect, Global: distribution, capital pathways, SupplierAdvisor® commerce and corridors that keep African value on African terms.",
      proof: "Verified trade · containers · institutional access",
    },
  ];

  return (
    <SlideShell dark>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <Eyebrow light>OUR RESPONSE · AFRICAN FOR AFRICA</Eyebrow>
          <h2
            className={`font-semibold tracking-tighter ${
              dense ? "text-xl sm:text-2xl mb-1.5" : "text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4"
            }`}
          >
            Feed. Educate. Empower.
          </h2>
          <p
            className={`text-white/70 max-w-3xl ${
              dense
                ? "text-[11px] sm:text-xs leading-snug mb-2.5"
                : "text-sm leading-relaxed mb-6 sm:mb-8"
            }`}
          >
            A proudly African mission: African production, fortification, last-mile and programme
            delivery — so the continent is not only briefed about, but built by and for its people.
          </p>
        </div>

        <div
          className={`grid min-h-0 flex-1 content-start ${
            dense ? "grid-cols-3 gap-2" : "grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
          }`}
        >
          {pillars.map((x) => (
            <div
              key={x.t}
              className={`rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.05] min-w-0 flex flex-col ${
                dense ? "p-2.5 sm:p-3" : "p-5 sm:p-6"
              }`}
            >
              <x.icon
                className={dense ? "w-5 h-5 mb-1.5" : "w-7 h-7 mb-3"}
                style={{ color: x.color }}
              />
              <div
                className={`font-semibold tracking-tight ${dense ? "text-base mb-1" : "text-2xl mb-3"}`}
                style={{ color: x.color }}
              >
                {x.t}
              </div>
              <p
                className={`text-white/70 flex-1 ${
                  dense ? "text-[10px] sm:text-[11px] leading-snug mb-2" : "text-sm leading-relaxed mb-4"
                }`}
              >
                {x.d}
              </p>
              <p
                className={`font-medium text-white/45 ${
                  dense ? "text-[9px] sm:text-[10px] leading-snug" : "text-xs"
                }`}
              >
                {x.proof}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`text-white/50 shrink-0 ${
            dense
              ? "mt-2 text-[10px] sm:text-[11px] leading-snug max-w-4xl"
              : "mt-6 text-sm leading-relaxed max-w-3xl"
          }`}
        >
          Foundation and Impact cut across all three — funding and programme delivery with
          transparent proof — African capacity for African programmes.
        </p>
      </div>
    </SlideShell>
  );
}

/** Compact layout so Vision · Mission · Values + five values fit on A4 landscape PDF */
function VisionMissionValuesSlide() {
  const forPrint = usePrintMode();

  const pillars = [
    {
      t: "Vision",
      icon: Compass,
      color: "text-emerald-700",
      bar: "from-emerald-500 to-teal-600",
      title: "A prosperous Africa — for everyone on it",
      d: forPrint
        ? "Proudly African vision: well-being is not a privilege. Families eat with dignity, leaders decide with integrity, communities own their economies."
        : "Proudly African vision: well-being is not a privilege. Families eat with dignity, leaders decide with integrity, and communities build economies they own — Africa for Africa.",
    },
    {
      t: "Mission",
      icon: Target,
      color: "text-sky-700",
      bar: "from-sky-500 to-blue-600",
      title: "Feed. Educate. Empower.",
      d: forPrint
        ? "A proudly African mission: deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises."
        : "A proudly African mission: deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises — at scale, with proof, African for Africa.",
    },
    {
      t: "Values",
      icon: Shield,
      color: "text-amber-700",
      bar: "from-amber-500 to-orange-600",
      title: "What we refuse to compromise",
      d: forPrint
        ? "Humanity, innovation, integrity, excellence and impact — how we hire, partner, trade and deliver."
        : "Humanity, innovation, integrity, excellence, and purposeful impact shape how we hire, partner, trade and deliver — across every pillar.",
    },
  ];

  const values = [
    { icon: Users, title: "Humanity", desc: "People first — Ubuntu in practice." },
    { icon: Lightbulb, title: "Innovation", desc: "Better systems for African progress — built here." },
    { icon: Shield, title: "Integrity", desc: "Honesty, transparency, ethical commerce." },
    { icon: Sparkles, title: "Excellence", desc: "World-class standards from an African base." },
    { icon: Heart, title: "Impact", desc: "Outcomes African communities can feel." },
  ];

  return (
    <SlideShell>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <Eyebrow>NORTH STAR</Eyebrow>
          <h2
            className={`font-semibold tracking-tighter ${
              forPrint
                ? "text-2xl mb-3"
                : "text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5"
            }`}
          >
            Vision · Mission · Values
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 min-h-0 shrink-0 ${
            forPrint ? "gap-2 mb-3" : "gap-3 sm:gap-4 mb-4 sm:mb-5"
          }`}
        >
          {pillars.map((x) => (
            <div
              key={x.t}
              className={`rounded-2xl border border-black/10 bg-[#fafafa] min-w-0 relative overflow-hidden ${
                forPrint ? "p-3" : "p-4 sm:p-5"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
              <div
                className={`inline-flex items-center gap-1.5 tracking-[2px] font-semibold mb-1.5 mt-0.5 ${x.color} ${
                  forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                }`}
              >
                <x.icon className={forPrint ? "w-3.5 h-3.5" : "w-4 h-4"} />
                {x.t.toUpperCase()}
              </div>
              <h3
                className={`font-semibold text-black tracking-tight mb-1 leading-snug ${
                  forPrint ? "text-xs" : "text-sm sm:text-base"
                }`}
              >
                {x.title}
              </h3>
              <p
                className={`text-[#404040] leading-snug ${
                  forPrint ? "text-[11px]" : "text-xs sm:text-sm leading-relaxed"
                }`}
              >
                {x.d}
              </p>
            </div>
          ))}
        </div>

        {/* Always keep values visible — fixed 5-col on print/landscape so nothing clips */}
        <div className="shrink-0 flex flex-col min-h-0">
          <div
            className={`tracking-[2px] text-[#737373] font-semibold ${
              forPrint ? "text-[9px] mb-1.5" : "text-[10px] mb-2.5"
            }`}
          >
            OUR VALUES
          </div>
          <div
            className={`grid min-w-0 ${
              forPrint
                ? "grid-cols-5 gap-1.5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3"
            }`}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className={`flex items-start min-w-0 rounded-xl border border-black/10 bg-white ${
                  forPrint
                    ? "flex-col gap-1 p-2"
                    : "flex-row sm:flex-col gap-2.5 p-3.5 sm:p-4 rounded-2xl"
                }`}
              >
                <div
                  className={`rounded-lg bg-violet-50 text-violet-800 flex items-center justify-center shrink-0 ${
                    forPrint ? "w-7 h-7 rounded-md" : "w-9 h-9 rounded-xl"
                  }`}
                >
                  <v.icon className={forPrint ? "w-3.5 h-3.5" : "w-4 h-4"} />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[11px] mb-0.5" : "text-sm mb-0.5"
                    }`}
                  >
                    {v.title}
                  </div>
                  <div
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[10px]" : "text-xs leading-relaxed"
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

type PrintOrientation = "landscape" | "portrait";

/**
 * Exact A4 page geometry (ISO 216).
 * Page padding is inset so the scaled digital slide fits end-to-end without clipping.
 */
const A4 = {
  landscape: { w: "297mm", h: "210mm" },
  portrait: { w: "210mm", h: "297mm" },
  /** Inset around the scaled slide on each A4 page */
  padMm: 5,
} as const;

/** CSS px per mm at 96dpi — used when layout geometry is unavailable off-screen. */
const PX_PER_MM = 96 / 25.4;

/** Imperative-only print root (not React-managed — setIndex re-renders must not wipe clones). */
const PRINT_ROOT_ID = "strategy-deck-print-root";
const PRINT_PAGE_NAME = "strategy-deck";

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
    background: #f5f3ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #${PRINT_ROOT_ID}[data-orientation="landscape"] .deck-print-page {
    width: 297mm;
    height: 210mm;
    padding: ${A4.padMm}mm;
  }
  #${PRINT_ROOT_ID}[data-orientation="portrait"] .deck-print-page {
    width: 210mm;
    height: 297mm;
    padding: ${A4.padMm}mm;
  }
  #${PRINT_ROOT_ID} .deck-print-scale-wrap {
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
  }
  #${PRINT_ROOT_ID} .deck-print-slide-clone {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: top left;
    overflow: hidden;
  }
  #${PRINT_ROOT_ID} .deck-print-slide-clone > * {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    box-sizing: border-box !important;
  }
  /* Shadows/filters rasterise as grey blobs in PDF — strip them */
  #${PRINT_ROOT_ID},
  #${PRINT_ROOT_ID} * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
  }
  #${PRINT_ROOT_ID} img {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  /* White CTAs on dark slides — force bg + black type (PDF often drops bg-white) */
  #${PRINT_ROOT_ID} a.deck-primary-cta,
  #${PRINT_ROOT_ID} a.deck-primary-cta *,
  #${PRINT_ROOT_ID} a.deck-email-cta,
  #${PRINT_ROOT_ID} a.deck-email-cta * {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
  #${PRINT_ROOT_ID} a.deck-primary-cta,
  #${PRINT_ROOT_ID} a.deck-email-cta {
    background-color: #ffffff !important;
    background-image: none !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    border: 1px solid #e5e5e5 !important;
  }

  @page ${PRINT_PAGE_NAME}-landscape { size: A4 landscape; margin: 0; }
  @page ${PRINT_PAGE_NAME}-portrait { size: A4 portrait; margin: 0; }

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
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #${PRINT_ROOT_ID} img {
      opacity: 1 !important;
      visibility: visible !important;
    }
    #${PRINT_ROOT_ID} .deck-print-page {
      box-sizing: border-box !important;
      margin: 0 !important;
      overflow: hidden !important;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    #${PRINT_ROOT_ID}[data-orientation="landscape"] .deck-print-page {
      page: ${PRINT_PAGE_NAME}-landscape;
      width: ${A4.landscape.w} !important;
      height: ${A4.landscape.h} !important;
      padding: ${A4.padMm}mm !important;
    }
    #${PRINT_ROOT_ID}[data-orientation="portrait"] .deck-print-page {
      page: ${PRINT_PAGE_NAME}-portrait;
      width: ${A4.portrait.w} !important;
      height: ${A4.portrait.h} !important;
      padding: ${A4.padMm}mm !important;
    }
    #${PRINT_ROOT_ID} .deck-print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    #${PRINT_ROOT_ID} a { text-decoration: none !important; color: inherit !important; }
    /* Must beat the blanket a { color: inherit } above — white pill + black type */
    #${PRINT_ROOT_ID} a.deck-primary-cta,
    #${PRINT_ROOT_ID} a.deck-primary-cta *,
    #${PRINT_ROOT_ID} a.deck-email-cta,
    #${PRINT_ROOT_ID} a.deck-email-cta * {
      color: #000000 !important;
      -webkit-text-fill-color: #000000 !important;
    }
    #${PRINT_ROOT_ID} a.deck-primary-cta,
    #${PRINT_ROOT_ID} a.deck-email-cta {
      background-color: #ffffff !important;
      background-image: none !important;
      border: 1px solid #e5e5e5 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
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

/** Available content box on an A4 page (minus pad), in CSS pixels. */
function a4ContentBoxPx(orientation: PrintOrientation) {
  const pageWmm = orientation === "landscape" ? 297 : 210;
  const pageHmm = orientation === "landscape" ? 210 : 297;
  const pad = A4.padMm * PX_PER_MM;
  return {
    w: pageWmm * PX_PER_MM - pad * 2,
    h: pageHmm * PX_PER_MM - pad * 2,
  };
}

export default function StrategyDeck() {
  const [index, setIndex] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [fullscreen, setFullscreen] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [preparingPdf, setPreparingPdf] = useState(false);
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>("landscape");
  const slideViewportRef = useRef<HTMLDivElement>(null);
  const resumeIndexRef = useRef(0);

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(TOTAL - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (printMode || preparingPdf) return;
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
  }, [go, index, fullscreen, printMode, preparingPdf]);

  /**
   * WYSIWYG PDF — clone each live digital slide into an A4 page and scale to fit.
   * Print root is imperative-only so React re-renders (setIndex) never wipe pages.
   */
  useEffect(() => {
    if (!printMode) return;

    let cancelled = false;
    const root = document.documentElement;
    root.setAttribute("data-deck-print", printOrientation);
    root.setAttribute("data-deck-print-active", "true");

    const waitForImages = async (node: ParentNode) => {
      const imgs = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              const el = img as HTMLImageElement;
              const done = () => resolve();
              if (el.complete && el.naturalWidth > 0) {
                done();
                return;
              }
              el.addEventListener("load", done, { once: true });
              el.addEventListener("error", done, { once: true });
              try {
                el.loading = "eager";
                if (typeof el.decode === "function") {
                  el.decode().then(done).catch(done);
                }
              } catch {
                /* ignore */
              }
              window.setTimeout(done, 5000);
            })
        )
      );
    };

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      const portal = document.getElementById(PRINT_ROOT_ID);
      if (portal) portal.remove();
      flushSync(() => setIndex(resumeIndexRef.current));
      setPrintMode(false);
      setPreparingPdf(false);
    };

    const run = async () => {
      // Let pdf context apply (overflow lock + h-full title layouts) before measuring
      await new Promise((r) => window.setTimeout(r, 80));
      if (cancelled) return;

      // Imperative root only — never React-managed (setIndex would wipe clones)
      let portal = document.getElementById(PRINT_ROOT_ID);
      if (!portal) {
        portal = document.createElement("div");
        portal.id = PRINT_ROOT_ID;
        document.body.appendChild(portal);
      }
      portal.setAttribute("aria-hidden", "true");
      portal.setAttribute("data-orientation", printOrientation);
      portal.innerHTML = "";
      const style = document.createElement("style");
      style.textContent = PRINT_STYLES + printPageCss(printOrientation);
      portal.appendChild(style);

      const viewport = slideViewportRef.current;
      if (!viewport) {
        finish();
        return;
      }

      const fallbackBox = a4ContentBoxPx(printOrientation);

      for (let i = 0; i < TOTAL; i++) {
        if (cancelled) return;
        flushSync(() => setIndex(i));
        await new Promise<void>((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => r()))
        );
        await waitForImages(viewport);
        await new Promise((r) => window.setTimeout(r, 80));

        const source =
          (Array.from(viewport.children).find(
            (el) => el instanceof HTMLElement && !el.classList.contains("sr-only")
          ) as HTMLElement | undefined) ?? viewport;
        const w = Math.max(1, viewport.clientWidth);
        // Full content height (scrollHeight includes clipped overflow) so tall slides aren't cut off
        const inner = source.firstElementChild as HTMLElement | null;
        const h = Math.max(
          1,
          source.scrollHeight,
          source.offsetHeight,
          inner?.scrollHeight ?? 0,
          viewport.clientHeight
        );

        const page = document.createElement("div");
        page.className = "deck-print-page";

        const scaleWrap = document.createElement("div");
        scaleWrap.className = "deck-print-scale-wrap";

        const cloneHost = document.createElement("div");
        cloneHost.className = "deck-print-slide-clone";
        cloneHost.style.width = `${w}px`;
        cloneHost.style.height = `${h}px`;

        const clone = source.cloneNode(true) as HTMLElement;
        clone.style.width = "100%";
        clone.style.height = `${h}px`;
        clone.style.minHeight = `${h}px`;
        clone.style.maxWidth = "none";
        clone.style.maxHeight = "none";
        clone.style.overflow = "hidden";
        clone.querySelectorAll("img").forEach((node) => {
          const img = node as HTMLImageElement;
          if (img.currentSrc) img.src = img.currentSrc;
          else if (img.src) img.setAttribute("src", img.src);
          img.loading = "eager";
          img.style.opacity = "1";
          img.style.visibility = "visible";
        });
        clone.querySelectorAll("button, a").forEach((el) => {
          (el as HTMLElement).style.pointerEvents = "none";
        });

        cloneHost.appendChild(clone);
        scaleWrap.appendChild(cloneHost);
        page.appendChild(scaleWrap);
        portal.appendChild(page);

        // Measure page content box; fall back to ISO A4 math if off-screen layout is 0
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        const cs = window.getComputedStyle(page);
        const padX =
          (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        const padY =
          (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
        const pageW = page.clientWidth || page.getBoundingClientRect().width;
        const pageH = page.clientHeight || page.getBoundingClientRect().height;
        const availW = pageW > padX ? pageW - padX : fallbackBox.w;
        const availH = pageH > padY ? pageH - padY : fallbackBox.h;
        // Fit entire slide (including densified content) into one A4 page
        const scale = Math.min(availW / w, availH / h, 1);

        // Layout box = visual size after scale (top-left origin) so page flex-centers perfectly
        scaleWrap.style.width = `${w * scale}px`;
        scaleWrap.style.height = `${h * scale}px`;
        cloneHost.style.transform = `scale(${scale})`;
      }

      await waitForImages(portal);
      await new Promise((r) => window.setTimeout(r, 150));
      if (cancelled) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          window.print();
        });
      });
    };

    void run();
    window.addEventListener("afterprint", finish);
    const fallback = window.setTimeout(finish, 180_000);

    return () => {
      cancelled = true;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      window.clearTimeout(fallback);
      window.removeEventListener("afterprint", finish);
      const portal = document.getElementById(PRINT_ROOT_ID);
      if (portal) portal.remove();
    };
  }, [printMode, printOrientation]);

  const shareUrl = (() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/impact#strategy-deck`
        : "https://bigfivegroup.africa/impact#strategy-deck";
    try {
      const u = new URL(base);
      u.searchParams.set("utm_source", "deck_share");
      u.searchParams.set("utm_medium", "share");
      u.searchParams.set("utm_campaign", "group_strategy_deck");
      return u.toString();
    } catch {
      return base;
    }
  })();

  const onShare = async () => {
    const payload = {
      title: "Big Five Group — Proudly African for Africa",
      text: "Proudly African strategic briefing: African challenges (hunger, malnutrition, broader disease burden), and how Big Five Group — African for Africa — feeds, educates and empowers.",
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
    resumeIndexRef.current = index;
    setPrintOrientation(orientation);
    setPreparingPdf(true);
    setPrintMode(true);
  };

  const deck = (
    <PrintModeContext.Provider value={{ active: printMode, compact: printMode }}>
    <div
      className={`flex flex-col min-w-0 w-full max-w-full ${
        fullscreen
          ? "fixed inset-0 z-[100] bg-[#0c0a12] p-2 sm:p-4 md:p-5"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-gradient-to-b from-[#f5f3ff] to-[#f3f4f6] p-1.5 sm:p-3 shadow-[0_25px_60px_-15px_rgb(91_33_182_/0.2)]"
      }`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 px-1.5 sm:px-3 py-2 mb-1 sm:mb-2 min-w-0">
        <div className="text-xs sm:text-sm font-medium text-[#404040] truncate min-w-0">
          Strategic overview{" "}
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
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 p-0.5 min-w-0">
            <button
              type="button"
              onClick={() => onDownload("landscape")}
              disabled={preparingPdf}
              title="A4 landscape PDF — digital slides scaled to fit the page"
              className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-violet-900 hover:bg-white disabled:opacity-60 min-h-8"
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
              title="A4 portrait PDF — digital slides scaled to fit the page"
              className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-violet-900 hover:bg-white disabled:opacity-60 min-h-8"
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
            {fullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Full"}</span>
          </button>
        </div>
      </div>

      <div className="mx-1.5 sm:mx-3 mb-2 h-1 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
        />
      </div>

      <div
        ref={slideViewportRef}
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
                i === index ? "w-4 sm:w-5 bg-violet-700" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === TOTAL - 1}
          className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-gradient-to-r from-violet-700 to-indigo-700 text-white px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30 min-h-10 shrink-0"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
    </PrintModeContext.Provider>
  );

  return (
    <div id="strategy-deck" className="scroll-mt-24 sm:scroll-mt-28 w-full min-w-0 max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center min-w-0">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-violet-700 mb-3 font-medium px-1">
          PROUDLY AFRICAN FOR AFRICA · STRATEGIC BRIEFING · 19 SLIDES
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black mb-3 sm:mb-4 text-balance px-1">
          Big Five Group — proudly African strategic overview
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-6 px-1">
          A proudly African initiative: hunger, child malnutrition and broader disease-linked
          vulnerability — with credible UN / WHO sources — and how Big Five Group,{" "}
          <strong className="text-black">African for Africa</strong>, feeds, educates and empowers.
          Share the link or download a print-ready PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onShare}
            className="premium-button inline-flex items-center justify-center gap-2 bg-violet-700 text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-violet-800 w-full sm:w-auto"
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
            className="premium-button inline-flex items-center justify-center gap-2 border border-violet-200 bg-white text-violet-900 px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-violet-50 disabled:opacity-60 w-full sm:w-auto"
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
      <p className="mt-4 text-center text-[11px] sm:text-xs text-[#737373] px-4 max-w-2xl mx-auto leading-relaxed">
        <span className="hidden sm:inline">Keyboard: ← → · </span>
        Share:{" "}
        <span className="font-medium text-black break-all">/impact#strategy-deck</span>
        {" · "}
        PDF: choose <strong className="text-black">Save as PDF</strong>
        {preparingPdf
          ? ` · preparing ${printOrientation === "landscape" ? "Landscape" : "Portrait"} pages…`
          : ""}
        . Each slide is scaled to fit one A4 page.
      </p>
    </div>
  );
}
