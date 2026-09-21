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
import { NFNSP } from "../lib/nfnspPartnership";

const theme = DECK_THEMES.nfnsp;
const TOTAL = 18;
const P = NFNSP;
const FOREST = "#0F3D38";
const GOLD = "#C4923A";
const GOLD_LT = "#E8C07A";
const CREAM = "#F7F1E6";
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
          <DeckTitle>Instant fortified porridge is the malnutrition plate</DeckTitle>
          <p className="text-sm text-[#525252] max-w-3xl leading-relaxed mb-4">{P.foods.intro}</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 min-h-0">
            {P.foods.points.slice(0, 6).map((pt) => (
              <article
                key={pt.t}
                className="rounded-2xl border p-3.5 min-w-0"
                style={{ borderColor: "rgba(196,146,58,0.35)", borderLeft: `4px solid ${FOREST}` }}
              >
                <p className="text-sm font-semibold text-black leading-snug">{pt.t}</p>
                <p className="text-[11px] text-[#737373] mt-1 leading-snug">{pt.label}</p>
              </article>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FARM-TO-FORK OS</DeckEyebrow>
          <DeckTitle>{P.os.headline}</DeckTitle>
          <p
            className="rounded-2xl p-4 text-sm leading-relaxed mb-4"
            style={{ backgroundColor: FOREST, color: GOLD_LT }}
          >
            {P.os.nonClaim}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {P.os.modules.map((m) => (
              <div
                key={m}
                className="rounded-xl px-3 py-2 text-xs font-semibold"
                style={{ backgroundColor: CREAM, color: FOREST, border: "1px solid rgba(196,146,58,0.3)" }}
              >
                {m}
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>DEMONSTRATION · KWAZULU-NATAL FIRST</DeckEyebrow>
          <DeckTitle>Scale only after a closed circuit holds</DeckTitle>
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

    case 15:
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

    case 16:
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

    case 17:
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
          Official Goals, Game Changers and Enablers, with labelled Group figures.
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
