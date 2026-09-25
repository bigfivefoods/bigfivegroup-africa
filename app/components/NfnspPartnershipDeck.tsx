"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  GraduationCap,
  UtensilsCrossed,
  Zap,
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
} from "./deck/DeckShell";
import { CONTACT_EMAIL } from "../lib/contact";
import { NFNSP, NFNSP_OFFERING_HREF } from "../lib/nfnspPartnership";
import SuperCubeModel from "./SuperCubeModel";

const theme = DECK_THEMES.nfnsp;
const TOTAL = 25;
const P = NFNSP;
const G = NFNSP.gantt;
const FOREST = "#0F3D38";
const GOLD = "#C4923A";
const GOLD_LT = "#E8C07A";
const CREAM = "#F7F1E6";
const GANTT_COLS = G.columns.length;
const GANTT_TONE = {
  gold: GOLD,
  forest: FOREST,
  horizon: GOLD_LT,
} as const;
const NDA_LOGO = "/partners/department-of-agriculture-logo.png";
const BFG_LOGO = "/bigfivegroup-logo.jpg";
const HERO = "/home-hero.jpg";

function KenteDarkField({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pdf = useDeckPdfExport();
  return (
    <div className={`relative h-full w-full min-h-0 overflow-hidden ${className}`}>
      {pdf ? (
        <DeckPrintImage src={HERO} alt="" fit="cover" />
      ) : (
        <Image
          src={HERO}
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
            "linear-gradient(115deg, rgba(11,28,34,0.90) 0%, rgba(15,61,56,0.78) 48%, rgba(11,28,34,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function CoBrandRow({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-nowrap items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-5 max-w-full shrink-0">
      <div
        className={`relative h-11 sm:h-14 min-h-11 sm:min-h-14 w-[10.5rem] sm:w-56 shrink-0 bg-white rounded-xl border shadow-sm overflow-hidden ${
          light ? "border-white/50" : "border-[#C4923A]/40"
        }`}
      >
        <DeckPrintImage src={NDA_LOGO} alt="Department of Agriculture" fit="contain" paddingClass="p-1" />
      </div>
      <div
        className={`relative h-11 w-11 sm:h-14 sm:w-14 min-h-11 sm:min-h-14 shrink-0 overflow-hidden rounded-xl bg-white border shadow-sm ${
          light ? "border-white/50" : "border-black/10"
        }`}
      >
        <DeckPrintImage src={BFG_LOGO} alt="Big Five Group" fit="contain" paddingClass="p-0.5" />
      </div>
    </div>
  );
}

function Limit({ children }: { children: string }) {
  return (
    <p className="text-[10px] sm:text-xs leading-snug italic mt-1.5" style={{ color: FOREST }}>
      {children}
    </p>
  );
}

function DeckGanttChart({ band }: { band: "a" | "b" }) {
  const rows = G.rows.filter((row) => row.band === band);
  return (
    <div
      className="rounded-2xl overflow-hidden min-h-0 border"
      style={{ borderColor: "rgba(196,146,58,0.35)" }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: "minmax(7.2rem,0.8fr) minmax(0,1.7fr)" }}
      >
        <div className="px-2.5 py-2 text-[9px] tracking-[1.4px] font-semibold" style={{ color: GOLD, backgroundColor: CREAM }}>
          IMPACT STREAM
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${GANTT_COLS}, minmax(0,1fr))`, backgroundColor: CREAM }}
        >
          {G.columns.map((c) => (
            <div key={c.id} className="px-0.5 py-2 text-center">
              <div className="text-[9px] sm:text-[10px] font-semibold leading-tight" style={{ color: FOREST }}>
                {c.label}
              </div>
              <div className="text-[8px] text-[#737373] leading-tight hidden sm:block">{c.sub}</div>
            </div>
          ))}
        </div>
        {rows.map((row) => {
          const left = (row.start / GANTT_COLS) * 100;
          const width = ((row.end - row.start + 1) / GANTT_COLS) * 100;
          return (
            <div key={row.stream} className="contents">
              <div className="px-2.5 py-1.5 min-w-0 border-t" style={{ borderColor: "rgba(15,61,56,0.08)" }}>
                <a href={row.href} className="text-[11px] sm:text-xs font-semibold text-black leading-snug underline decoration-[#C4923A]/50 underline-offset-2">
                  {row.stream}
                </a>
                <div className="text-[9px] leading-snug" style={{ color: FOREST }}>
                  {row.offering.split(" · ").map((name, i) => (
                    <span key={`${row.stream}-${name}`}>
                      {i > 0 ? " · " : null}
                      <a href={NFNSP_OFFERING_HREF[name as keyof typeof NFNSP_OFFERING_HREF] ?? row.href} className="underline decoration-[#0F3D38]/30 underline-offset-2">
                        {name}
                      </a>
                    </span>
                  ))}
                </div>
                <div className="text-[9px] text-[#525252] leading-snug hidden sm:block">{row.product}</div>
              </div>
              <div className="relative mx-1.5 my-1 min-h-7 sm:min-h-8">
                <div className="absolute inset-y-1 inset-x-0 rounded-full" style={{ backgroundColor: CREAM }} />
                <div
                  className="absolute inset-y-0 grid h-full w-full pointer-events-none"
                  style={{ gridTemplateColumns: `repeat(${GANTT_COLS}, minmax(0,1fr))` }}
                >
                  {G.columns.map((c, i) => (
                    <div
                      key={c.id}
                      className="h-full"
                      style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(196,146,58,0.16)" }}
                    />
                  ))}
                </div>
                <a
                  href={row.href}
                  className="absolute top-1.5 bottom-1.5 rounded-full"
                  style={{
                    left: `calc(${left}% + 2px)`,
                    width: `calc(${width}% - 4px)`,
                    backgroundColor: GANTT_TONE[row.tone],
                  }}
                  aria-label={`${row.stream}. Open ${row.goal}.`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  compact,
}: {
  phase: (typeof G.phases)[number];
  compact?: boolean;
}) {
  return (
    <article
      className="rounded-2xl p-3 sm:p-3.5 min-w-0 min-h-0 flex flex-col"
      style={{ border: "1px solid rgba(196,146,58,0.35)", backgroundColor: "white" }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <div className="text-[9px] tracking-[1.6px] font-semibold" style={{ color: GOLD }}>
          PHASE {phase.n}
        </div>
        <div className="text-[9px] text-[#737373] text-right leading-tight">{phase.when}</div>
      </div>
      <a href={phase.href} className="text-sm font-semibold leading-snug mb-1 underline decoration-[#0F3D38]/30 underline-offset-2" style={{ color: FOREST }}>
        {phase.name}
      </a>
      <p className="text-[10px] sm:text-[11px] font-semibold text-black leading-snug mb-1">{phase.goal}</p>
      <p className="text-[10px] sm:text-[11px] text-[#525252] leading-snug mb-2">{phase.objective}</p>
      <div className="text-[9px] tracking-[1.3px] font-semibold mb-1" style={{ color: GOLD }}>
        DELIVERABLES
      </div>
      <ul className="space-y-0.5 mb-2">
        {(compact ? phase.deliverables.slice(0, 4) : phase.deliverables).map((d) => (
          <li key={d} className="text-[10px] text-[#404040] leading-snug pl-2.5 relative">
            <span className="absolute left-0 top-[0.4em] w-1 h-1 rounded-full" style={{ backgroundColor: FOREST }} />
            {d}
          </li>
        ))}
      </ul>
      <div className="text-[9px] tracking-[1.3px] font-semibold mb-1 mt-auto" style={{ color: GOLD }}>
        BIG FIVE PRODUCTS
      </div>
      <ul className="space-y-0.5">
        {phase.products.map((d) => (
          <li key={d} className="text-[10px] leading-snug" style={{ color: FOREST }}>
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Slide({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <KenteDarkField>
            <DeckTitleLayout>
              <div>
                <DeckEyebrow light theme={theme}>
                  PARTNER PORTAL · CONFIDENTIAL · NFNSP-2
                </DeckEyebrow>
                <CoBrandRow light />
                <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.55rem]">
                  Implementation partnership
                  <br />
                  <span style={{ color: GOLD_LT }}>National Food and Nutrition Security Plan · 2027–2037</span>
                </h2>
                <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                  A private briefing for the NFNSP Technical Working Group / Department of Agriculture.
                  Not a government publication. Not an awarded tender.
                </p>
              </div>
              <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                <p>Proposal deck · {TOTAL} slides · Feed · Educate · Empower</p>
                <p>bigfivegroup.africa/partner/department-of-agriculture#nfnsp-partnership-deck</p>
              </div>
            </DeckTitleLayout>
          </KenteDarkField>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW TO READ THIS DECK</DeckEyebrow>
          <DeckTitle>Official titles. Sourced numbers. Labelled Group figures.</DeckTitle>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl leading-relaxed mb-5">
            Goal, Enabler and Game-changer titles are from NFNSP-2 Draft 2 (July 2026) and the Results
            Framework of 27 August 2026. This deck does not replace those documents.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-0">
            {[
              {
                t: "Official statistics",
                d: "GHS 2024, NFNSS 2023 and Poverty Trends 2025 carry a source. Framework cells left as XX are not invented.",
              },
              {
                t: "Group figures",
                d: "Plan, programme-reported, product specification, or internal comparison. 355 000 meals is programme-reported. 2.5 million children/day is a DBE-pathway plan.",
              },
              {
                t: "Mandate honesty",
                d: "Treasury, DoH, DSD/SASSA and COGTA/SALGA lead VAT, labelling, grants and the local mandate. Big Five operationalises lots, plates, nodes and MELIA extracts.",
              },
              {
                t: "Operating system",
                d: "SupplierAdvisor® does not replace BAS or LOGIS. No learner names. POPIA purpose-limited.",
              },
            ].map((c) => (
              <article
                key={c.t}
                className="rounded-2xl border p-4 sm:p-5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)", borderLeft: `4px solid ${FOREST}` }}
              >
                <h3 className="text-sm sm:text-base font-semibold text-black mb-1.5">{c.t}</h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{c.d}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY NOW · THE PLAN’S OWN NUMBERS</DeckEyebrow>
          <DeckTitle>Household hunger, stunting and a procurement target that needs lots</DeckTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {P.stats.map((s) => (
              <DeckStatTile key={s.value} value={s.value} label={s.label} theme={theme} />
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed">
            GHS 2024 worst provinces: Northern Cape 34.3% · Eastern Cape 31.2% · North West 30%. Sources on each
            figure. Complementary feeding 50% / 100% of high-risk areas by 2029 / 2033 is a Plan target, not a
            current Group delivery claim.
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>OFFICIAL GOALS · DRAFT 2 / FRAMEWORK</DeckEyebrow>
          <DeckTitle>Three Goals. Three Enablers. Used in full.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0">
            {P.planGoals.map((g) => (
              <article
                key={g.id}
                className="rounded-2xl p-4 sm:p-5 min-w-0 flex flex-col"
                style={{ backgroundColor: FOREST }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD_LT }}>
                  {g.n.toUpperCase()}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white leading-snug mb-2">{g.title}</h3>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mt-auto">{g.lead}</p>
              </article>
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-[#525252] mt-4 leading-relaxed">
            Enabler A — multi-actor governance. Enabler B — resourcing (not MELIA). Enabler C — capacity,
            innovation and data, including MELIA.
          </p>
        </DeckSlideShell>
      );

    case 4: {
      const g = P.planGoals[0];
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GOAL 1 · GAME CHANGERS 1.1–1.4</DeckEyebrow>
          <h2 className="font-semibold tracking-tighter text-balance text-xl sm:text-2xl md:text-3xl mb-2" style={{ color: FOREST }}>
            {g.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] mb-4 leading-relaxed max-w-3xl">
            Framework: 10% / 20% / 30% smallholder share of government food procurement by 2029 / 2033 / 2037,
            and 1 / 3 / 5 new agri-hubs and produce markets per municipality.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-h-0">
            {g.gameChangers.map((gc) => (
              <article
                key={gc.id}
                className="rounded-2xl border p-3.5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)" }}
              >
                <div className="text-[10px] tracking-[1.5px] font-semibold mb-1" style={{ color: GOLD }}>
                  {gc.n}
                </div>
                <h3 className="text-sm font-semibold text-black leading-snug mb-1">{gc.title}</h3>
                <p className="text-[11px] text-[#404040] leading-snug line-clamp-3">{gc.weDeliver[0]}</p>
                <Limit>{gc.limit}</Limit>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );
    }

    case 5: {
      const g = P.planGoals[1];
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GOAL 2 · GAME CHANGERS 2.1–2.3</DeckEyebrow>
          <h2 className="font-semibold tracking-tighter text-balance text-xl sm:text-2xl md:text-3xl mb-4" style={{ color: FOREST }}>
            {g.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 min-h-0">
            {g.gameChangers.map((gc) => (
              <article
                key={gc.id}
                className="rounded-2xl border p-3.5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)", borderTop: `4px solid ${FOREST}` }}
              >
                <div className="text-[10px] tracking-[1.5px] font-semibold mb-1" style={{ color: GOLD }}>
                  {gc.n}
                </div>
                <h3 className="text-sm font-semibold text-black leading-snug mb-1.5">{gc.title}</h3>
                <p className="text-[11px] text-[#404040] leading-snug">{gc.weDeliver[0]}</p>
                <Limit>{gc.limit}</Limit>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );
    }

    case 6: {
      const g = P.planGoals[2];
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GOAL 3 · THE MALNUTRITION PLATE</DeckEyebrow>
          <h2 className="font-semibold tracking-tighter text-balance text-xl sm:text-2xl md:text-3xl mb-3" style={{ color: FOREST }}>
            {g.title}
          </h2>
          <div
            className="rounded-2xl p-4 sm:p-5 mb-3"
            style={{ backgroundColor: FOREST }}
          >
            <div className="text-[10px] tracking-[2px] font-semibold mb-1" style={{ color: GOLD_LT }}>
              INSTANT FORTIFIED PORRIDGE
            </div>
            <p className="text-sm sm:text-base text-white font-semibold leading-snug">
              {P.foods.instantPorridge.prep} One SKU family across NSNP, ECD, CNDC and holiday packs.
            </p>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">{P.foods.instantPorridge.why}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 min-h-0">
            {g.gameChangers.map((gc) => (
              <article
                key={gc.id}
                className="rounded-2xl border p-3.5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)" }}
              >
                <div className="text-[10px] tracking-[1.5px] font-semibold mb-1" style={{ color: GOLD }}>
                  {gc.n}
                </div>
                <h3 className="text-sm font-semibold text-black leading-snug mb-1">{gc.title}</h3>
                <Limit>{gc.limit}</Limit>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );
    }

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ENABLERS A–C · OFFICIAL TITLES</DeckEyebrow>
          <DeckTitle>Governance. Resourcing. Capacity and MELIA.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0">
            {P.planEnablers.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl border p-4 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)", backgroundColor: CREAM }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                  {e.n.toUpperCase()}
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-2" style={{ color: FOREST }}>
                  {e.title}
                </h3>
                <p className="text-[11px] text-[#525252] leading-relaxed">{e.lead}</p>
              </article>
            ))}
          </div>
          <p className="text-xs text-[#525252] mt-4 leading-relaxed">
            MELIA sits under Enabler C in the official Plan — not Enabler B. SupplierAdvisor® extracts sit
            inside MELIA, not beside it.
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>MANDATE HONESTY</DeckEyebrow>
          <DeckTitle>What Big Five does not gazette</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-0">
            {[
              { who: "Treasury", d: "VAT methodology, price-stabilisation, possible national food reserve." },
              { who: "DoH", d: "Front-of-pack labelling and advertising rules." },
              { who: "DSD / SASSA", d: "Grant levels, Child Support Grant, nutrition vouchers." },
              { who: "COGTA / SALGA", d: "Local-government food-systems mandate, IDPs and by-laws." },
            ].map((c) => (
              <article
                key={c.who}
                className="rounded-2xl border p-4 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)", borderLeft: `4px solid ${FOREST}` }}
              >
                <h3 className="text-sm font-semibold text-black mb-1">{c.who} leads</h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{c.d}</p>
              </article>
            ))}
          </div>
          <p className="text-xs sm:text-sm mt-4 leading-relaxed" style={{ color: FOREST }}>
            We put a verified lot, a lawful plate and a MELIA-ready extract on the table so those instruments
            have something real to buy, train and measure.
          </p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NORTH STAR · FEED · EDUCATE · EMPOWER</DeckEyebrow>
          <DeckTitle>{P.vision.title}</DeckTitle>
          <p className="text-sm text-[#525252] max-w-3xl leading-relaxed mb-4">{P.groupPurposeLead}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0">
            {P.missions.map((m) => {
              const Icon = m.id === "feed" ? UtensilsCrossed : m.id === "educate" ? GraduationCap : Zap;
              return (
                <article
                  key={m.id}
                  className="rounded-2xl p-4 min-w-0"
                  style={{ border: "1px solid rgba(196,146,58,0.35)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: FOREST, color: GOLD_LT }}
                  >
                    <Icon className="w-4 h-4" aria-hidden />
                  </div>
                  <div className="text-[10px] tracking-[2px] font-semibold mb-1" style={{ color: GOLD }}>
                    {m.n} · {m.title.toUpperCase()}
                  </div>
                  <p className="text-xs text-[#404040] leading-relaxed mb-2">{m.blurb}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: FOREST }}>
                    {m.nda}
                  </p>
                </article>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NINE PILLARS · ONE CIRCUIT</DeckEyebrow>
          <DeckTitle>The Department does not need nine vendors</DeckTitle>
          <p className="text-sm text-[#525252] max-w-3xl leading-relaxed mb-4">{P.coherenceLead}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 min-h-0">
            {P.systemFlow.steps.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl p-3 min-w-0"
                style={{ backgroundColor: CREAM, border: "1px solid rgba(196,146,58,0.35)" }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-1" style={{ color: GOLD }}>
                  {s.n}
                </div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: FOREST }}>
                  {s.t}
                </h3>
                <p className="text-[11px] text-[#525252] leading-snug">{s.d}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHAT EACH PILLAR DOES FOR NDA</DeckEyebrow>
          <DeckTitle>Mapped to Goals and Enablers — not slogans</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 min-h-0">
            {P.pillars.map((p) => (
              <article
                key={p.slug}
                className="rounded-xl border p-3 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.3)" }}
              >
                <div className="text-[10px] tracking-[1.5px] font-semibold" style={{ color: GOLD }}>
                  {p.mission.toUpperCase()}
                </div>
                <h3 className="text-sm font-semibold text-black">{p.name}</h3>
                <p className="text-[11px] leading-snug mt-1" style={{ color: FOREST }}>
                  {p.nda}
                </p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE PLATE · BIG FIVE FOODS™</DeckEyebrow>
          <DeckTitle>The plate the Department can buy</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] max-w-3xl leading-snug mb-3">
            Department of Education approval for NSNP: fortified instant porridge, soya mince and OnePot. Menu approval — not an awarded contract. www.bigfivegroup.africa/foods
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              ["/foods/porridge-original.jpg", "Porridge", "Water or milk · under a minute"],
              ["/foods/soya-beef.jpg", "Soya mince", "About R1.30 · internal"],
              ["/foods/onepot-chicken.jpg", "OnePot", "About 20 minutes"],
              ["/foods/soup-chicken.jpg", "Soups", "About R1.10 · internal"],
            ].map(([src, title, stat]) => (
              <article
                key={title}
                className="flex flex-col overflow-hidden rounded-xl border"
                style={{ borderColor: "rgba(196,146,58,0.35)" }}
              >
                <div className="relative aspect-[3/4] bg-[#F7F1E6]">
                  <DeckPrintImage src={src} alt={title} fit="contain" paddingClass="p-1" />
                </div>
                <div className="shrink-0 p-2">
                  <p className="text-xs font-semibold leading-snug text-black">{title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug" style={{ color: FOREST }}>{stat}</p>
                </div>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>EDUCATE · SUPER-CUBE®</DeckEyebrow>
          <DeckTitle>Six faces. The person at the centre.</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-3 min-h-0 items-center">
            <SuperCubeModel compact />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 min-h-0">
              {P.leadership.faces.map((face) => (
                <article
                  key={face.name}
                  className="rounded-xl p-2 min-w-0"
                  style={{ backgroundColor: CREAM, border: "1px solid rgba(196,146,58,0.35)" }}
                >
                  <h3 className="text-xs font-semibold" style={{ color: FOREST }}>
                    {face.name}
                  </h3>
                  <p className="text-[10px] text-[#404040] leading-snug mt-0.5">{face.nda}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] text-[#737373] max-w-2xl leading-snug">{P.leadership.caseNote}</p>
            <a
              href={P.leadership.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold underline decoration-[#0F3D38]/40 underline-offset-2 shrink-0"
              style={{ color: FOREST }}
            >
              {P.leadership.siteLabel}
            </a>
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>EMPOWER · ONE CIRCUIT</DeckEyebrow>
          <DeckTitle>{P.empower.headline}</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] max-w-3xl leading-snug mb-3">{P.empower.lead}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 min-h-0">
            {P.empower.parts.map((part) => (
              <article
                key={part.id}
                className="rounded-xl p-3 min-w-0"
                style={{ border: "1px solid rgba(196,146,58,0.35)", backgroundColor: part.id === "os" ? FOREST : CREAM }}
              >
                <div className="text-[10px] tracking-[1.4px] font-semibold mb-1" style={{ color: GOLD }}>
                  {part.name.toUpperCase()}
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-1" style={{ color: part.id === "os" ? "#E8C07A" : FOREST }}>
                  {part.role}
                </h3>
                <p className="text-[11px] leading-snug" style={{ color: part.id === "os" ? "rgba(255,255,255,0.82)" : "#404040" }}>
                  {part.nda}
                </p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>EMPOWER · CONNECT · SUPPLIERADVISOR®</DeckEyebrow>
          <DeckTitle>{P.os.headline}</DeckTitle>
          <p
            className="rounded-2xl px-4 py-3 text-xs sm:text-sm leading-snug mb-3"
            style={{ backgroundColor: FOREST, color: GOLD_LT }}
          >
            {P.os.nonClaim}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 min-h-0 mb-3">
            {P.os.groups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl p-3 min-w-0"
                style={{ border: "1px solid rgba(196,146,58,0.35)" }}
              >
                <h3 className="text-sm font-semibold mb-1" style={{ color: FOREST }}>
                  {group.title}
                </h3>
                <p className="text-[11px] text-[#404040] leading-snug">{group.d}</p>
              </article>
            ))}
          </div>
          <a
            href={P.os.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold underline decoration-[#0F3D38]/40 underline-offset-2"
            style={{ color: FOREST }}
          >
            {P.os.siteLabel}
          </a>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ZULU KINGDOM · IN SIGNATURE</DeckEyebrow>
          <DeckTitle>{P.kingdom.headline}</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] gap-4 items-center min-h-0">
            <div className="rounded-2xl bg-white p-3 flex items-center justify-center border" style={{ borderColor: "rgba(196,146,58,0.35)" }}>
              <Image src={P.kingdom.logo} alt="Zulu Kingdom" width={120} height={120} className="h-auto w-24 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[1.4px] font-semibold mb-2" style={{ color: GOLD }}>{P.kingdom.status.toUpperCase()}</p>
              <p className="text-xs sm:text-sm text-[#404040] leading-snug mb-2">{P.kingdom.lead}</p>
              <p className="text-xs sm:text-sm leading-snug" style={{ color: FOREST }}>{P.kingdom.why}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 min-h-0">
            {P.kingdom.points.map((point) => (
              <article key={point.t} className="rounded-xl p-3 min-w-0" style={{ backgroundColor: CREAM, border: "1px solid rgba(196,146,58,0.35)" }}>
                <h3 className="text-sm font-semibold text-black mb-1">{point.t}</h3>
                <p className="text-[11px] text-[#404040] leading-snug">{point.d}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>DEMONSTRATION · KWAZULU-NATAL FIRST</DeckEyebrow>
          <DeckTitle>Scale only after a closed circuit holds</DeckTitle>
          <p className="text-xs sm:text-sm leading-snug mb-3 max-w-3xl" style={{ color: FOREST }}>
            The same province is where a Heads of Agreement with the Zulu Kingdom is in signature — community and cultural buy-in, not yet executed, and not an NFNSP award.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <article className="rounded-2xl p-5" style={{ backgroundColor: FOREST }}>
              <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD_LT }}>
                PHASE 1
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{P.demonstration.phase1}</p>
            </article>
            <article
              className="rounded-2xl p-5"
              style={{ backgroundColor: CREAM, border: "1px solid rgba(196,146,58,0.35)" }}
            >
              <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                PHASE 2
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{P.demonstration.phase2}</p>
            </article>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: FOREST }}>
            {P.demonstration.rule}
          </p>
        </DeckSlideShell>
      );

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>90-DAY ASK</DeckEyebrow>
          <DeckTitle>Five asks. Scale only after a closed circuit holds.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 min-h-0">
            {P.asks.map((a) => (
              <article
                key={a.n}
                className="rounded-2xl border p-3.5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold mb-2"
                  style={{ backgroundColor: FOREST, color: GOLD_LT }}
                >
                  {a.n}
                </div>
                <h3 className="text-sm font-semibold text-black leading-snug mb-1">{a.t}</h3>
                <p className="text-[11px] text-[#525252] leading-snug">{a.d}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 19:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>IN RETURN · LABELLED GROUP FIGURES</DeckEyebrow>
          <DeckTitle>What 90 days returns — and what the numbers are not</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {P.inReturn.map((item) => (
              <div
                key={item}
                className="rounded-xl px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: CREAM, color: FOREST, border: "1px solid rgba(196,146,58,0.35)" }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {P.commercial.map((c) => (
              <article
                key={c.t}
                className="rounded-xl border p-3 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.3)" }}
              >
                <p className="text-sm font-semibold text-black leading-snug">{c.t}</p>
                <p className="text-[10px] text-[#737373] mt-1 leading-snug">{c.label}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 20:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GANTT · GOAL 1 AND ENABLER A</DeckEyebrow>
          <DeckTitle>Every Goal 1 game changer has a named offering</DeckTitle>
          <p className="text-xs sm:text-sm leading-relaxed mb-3 max-w-3xl" style={{ color: FOREST }}>
            {G.owner} Department of Education has approved fortified instant porridge, soya mince and OnePot for NSNP school feeding.
          </p>
          <DeckGanttChart band="a" />
        </DeckSlideShell>
      );

    case 21:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GANTT · GOALS 2–3 AND ENABLERS B–C</DeckEyebrow>
          <DeckTitle>NSNP-approved plates sit on Goals 2 and 3</DeckTitle>
          <p className="text-xs leading-relaxed mb-3 max-w-3xl text-[#525252]">
            Fortified instant porridge, soya mince and OnePot are approved by the Department of Education for NSNP school feeding. That approval is not an awarded NFNSP contract.
          </p>
          <DeckGanttChart band="b" />
        </DeckSlideShell>
      );

    case 22:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PHASES 0–1 · GOALS · DELIVERABLES · PRODUCTS</DeckEyebrow>
          <DeckTitle>Mobilise, then prove a closed KZN circuit</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0">
            {G.phases.slice(0, 2).map((phase) => (
              <PhaseCard key={phase.n} phase={phase} />
            ))}
          </div>
        </DeckSlideShell>
      );

    case 23:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PHASES 2–4 · AFTER THE SCALE GATE</DeckEyebrow>
          <DeckTitle>Named circuits only — Plan horizons are not Group headcount</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0">
            {G.phases.slice(2).map((phase) => (
              <PhaseCard key={phase.n} phase={phase} compact />
            ))}
          </div>
        </DeckSlideShell>
      );

    case 24:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <KenteDarkField>
            <DeckTitleLayout>
              <div>
                <DeckEyebrow light theme={theme}>
                  CONFIDENTIAL · NOT AN AWARDED TENDER
                </DeckEyebrow>
                <CoBrandRow light />
                <h2 className="font-semibold tracking-tighter leading-[1.12] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl">
                  {P.conclusion[0]}
                </h2>
                <p className="text-white/75 max-w-2xl mt-3 text-sm leading-relaxed">{P.conclusion[1]}</p>
                <p className="text-white/55 max-w-2xl mt-2 text-xs leading-relaxed">{P.conclusion[2]}</p>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "NFNSP-2 implementation partnership — 90-day briefing"
                  )}&body=${encodeURIComponent(
                    "Hello Dr. Craig / Big Five team,\n\nI would like to progress a closed technical briefing on the NFNSP-2 implementation partnership.\n\nName:\nOrganisation / sphere:\nPriority interest:\n\nThank you."
                  )}`}
                  className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                  style={{ color: "#000000" }}
                >
                  Email {CONTACT_EMAIL}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="text-white/45 text-xs">
                  nda.gov.za · bigfivegroup.africa · Confidential partner briefing
                </div>
              </div>
            </DeckTitleLayout>
          </KenteDarkField>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function NfnspPartnershipDeck() {
  return (
    <div id="nfnsp-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="relative h-12 sm:h-14 w-44 sm:w-56 bg-white rounded-xl border px-3 py-1 shadow-sm" style={{ borderColor: "rgba(196,146,58,0.4)" }}>
            <Image
              src={NDA_LOGO}
              alt="Department of Agriculture"
              fill
              className="object-contain p-1"
              sizes="224px"
            />
          </div>
          <div
            className="text-[10px] sm:text-xs tracking-[2px] font-semibold"
            style={{ color: GOLD }}
          >
            NFNSP-2 · {TOTAL} SLIDES · PRIVATE · NOT AN AWARDED TENDER
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Implementation partnership proposal
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl leading-relaxed">
          Downloadable presentation of the NFNSP-2 briefing — Landscape or Portrait, then Save as PDF.
          Official Goals, Game Changers and Enablers, Impact PMO timeline, and labelled Group figures.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="nfnsp-deck-shell"
          printRootId="nfnsp-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="NFNSP-2 PROPOSAL DECK"
          title="Department of Agriculture × Big Five Group — implementation partnership"
          description="Operationalising the National Food and Nutrition Security Plan 2027–2037. Confidential. Not an awarded tender."
          sharePath="/partner/department-of-agriculture#nfnsp-partnership-deck"
          shareTitle="NFNSP-2 implementation partnership"
          shareText="Private proposal deck — Department of Agriculture × Big Five Group."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-[10px] text-[#a3a3a3] leading-relaxed max-w-3xl">
          {P.honestyLine} SupplierAdvisor® does not replace BAS or LOGIS.
        </p>
      </div>
    </div>
  );
}
