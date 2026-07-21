"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import DeckShell, {
  DECK_THEMES,
  DeckEyebrow,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  useDeckPrintMode,
} from "./deck/DeckShell";
import {
  INVESTMENT_ASK,
  INVESTOR_RISKS,
  MARKET_TRACTION,
  MODEL_DISCLAIMER,
  PROOF_DASHBOARD_18MO,
  SCENARIO_META,
  TEAM_GOVERNANCE,
  TRACTION_VS_AMBITION,
  formatUSDm,
  sumScenario,
  type ScenarioKey,
} from "../lib/investor-model";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";
import { PITCH_DATA_ROOM, PITCH_FIRST_PRINCIPLES, PITCH_MACHINE } from "../lib/pitch-deck";
import { SANTACO_PARTNERSHIP } from "../lib/santaco";
import { CONTACT_EMAIL } from "../lib/contact";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

const theme = DECK_THEMES.amber;
/** Lean pitch: first principles, numbers, kills, capital. Full portal has depth. */
const TOTAL = 13;

function opcoMeta(slug: string) {
  const company = companies.find((c) => c.slug === slug);
  return {
    icon: company?.icon ?? "Leaf",
    color: company?.color ?? "#111",
    name: company?.name ?? slug,
  };
}

function Slide({ index }: { index: number }) {
  const forPrint = useDeckPrintMode();
  const t = forPrint ? "text-[9px]" : "text-[11px] sm:text-xs";
  const tSm = forPrint ? "text-[8px]" : "text-[10px]";

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            <Image
              src="/home-hero.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width:1280px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    BIG FIVE GROUP · INVESTOR PITCH · CONFIDENTIAL
                  </DeckEyebrow>
                  <div
                    className={`relative mb-4 sm:mb-6 ${
                      forPrint ? "w-20 h-20" : "w-24 h-24 sm:w-28 sm:h-28"
                    }`}
                  >
                    <Image
                      src="/bigfivegroup-logo.png"
                      alt="Big Five Group"
                      fill
                      className="object-contain object-left drop-shadow-lg"
                      sizes="112px"
                      priority
                    />
                  </div>
                  <h2
                    className={`font-semibold tracking-tighter leading-[1.05] text-white text-balance max-w-3xl ${
                      forPrint ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"
                    }`}
                  >
                    Feed Africa.
                    <br />
                    <span style={{ color: theme.gradientFrom }}>
                      Own the rails that compound.
                    </span>
                  </h2>
                  <p
                    className={`text-white/75 max-w-xl mt-4 leading-relaxed ${
                      forPrint ? "text-xs" : "text-sm sm:text-base"
                    }`}
                  >
                    {INVESTMENT_ASK.capitalRaiseLabel} for {INVESTMENT_ASK.equityOffered} of the
                    holding company · board seat · ~USD 100m pre-money framing.
                  </p>
                </div>
                <div
                  className={`text-white/45 space-y-1 ${
                    forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                  }`}
                >
                  <p>First principles · unit economics · kill criteria · no fluff</p>
                  <p>bigfivegroup.africa/investor#investor-deck</p>
                  <p>
                    {TOTAL} slides · v1 · Not a prospectus · {CONTACT_EMAIL}
                  </p>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FIRST PRINCIPLES</DeckEyebrow>
          <DeckTitle>The problem is physics. The answer is a machine.</DeckTitle>
          <p className={`text-[#404040] leading-relaxed max-w-3xl mb-3 ${t}`}>
            {PITCH_FIRST_PRINCIPLES.problem}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {PITCH_FIRST_PRINCIPLES.physics.map((p) => (
              <div
                key={p.k}
                className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-2" : "p-3"
                }`}
              >
                <div
                  className="text-[10px] font-semibold tracking-[2px] mb-1"
                  style={{ color: theme.accentDark }}
                >
                  {p.k.toUpperCase()}
                </div>
                <p className={`text-[#404040] leading-snug ${t}`}>{p.v}</p>
              </div>
            ))}
          </div>
          <div
            className={`rounded-xl border border-amber-200 bg-amber-50/60 ${
              forPrint ? "p-2" : "p-3.5"
            }`}
          >
            <div className="text-[10px] tracking-[2px] font-semibold text-amber-900 mb-1">
              THE MACHINE
            </div>
            <p className={`text-black font-medium leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
              {PITCH_FIRST_PRINCIPLES.answer}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE ASK
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              {INVESTMENT_ASK.capitalRaiseShort} · {INVESTMENT_ASK.equityOffered} · board
            </span>
          </DeckTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <DeckStatTile
              dark
              theme={theme}
              value={INVESTMENT_ASK.capitalRaiseShort}
              label="Raise (USD)"
            />
            <DeckStatTile
              dark
              theme={theme}
              value={INVESTMENT_ASK.equityOffered}
              label="Holding equity"
            />
            <DeckStatTile dark theme={theme} value="Board" label="Seat at holdco" />
            <DeckStatTile dark theme={theme} value="~$100m" label="Implied pre-money" />
          </div>
          <p className={`text-white/70 leading-relaxed mb-2 ${t}`}>
            {INVESTMENT_ASK.equityNote} {INVESTMENT_ASK.boardNote}
          </p>
          <p className={`text-amber-200/90 leading-relaxed ${tSm}`}>
            {INVESTMENT_ASK.impliedPreMoney}
          </p>
          <p className={`text-white/40 mt-2 ${tSm}`}>
            Base-case illustrative group Y5 run-rate (moderate scenario):{" "}
            <strong className="text-white/70">
              {formatUSDm(sumScenario("moderate", "y5"))}
            </strong>{" "}
            — not a forecast. Full scenarios on portal.
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>USE OF FUNDS</DeckEyebrow>
          <DeckTitle>Every dollar has a job</DeckTitle>
          <div className="flex gap-2 mb-2 text-[10px] font-semibold text-[#737373]">
            <span>10% ops · {INVESTMENT_ASK.useOfFunds[0].amountLabel}</span>
            <span>·</span>
            <span>90% assets & product · {INVESTMENT_ASK.useOfFunds[1].amountLabel}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden flex border border-black/10 mb-3">
            <div className="bg-slate-500 h-full" style={{ width: "10%" }} />
            <div
              className="h-full"
              style={{ width: "90%", backgroundColor: theme.gradientFrom }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {INVESTMENT_ASK.useOfFundsLines.map((line) => (
              <div
                key={line.label}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 ${
                  forPrint ? "p-1.5" : "p-2.5"
                }`}
              >
                <div
                  className={`shrink-0 font-semibold tabular-nums ${t}`}
                  style={{ color: theme.accentDark }}
                >
                  {line.amountLabel}
                </div>
                <div className="min-w-0">
                  <div className={`font-semibold text-black leading-snug ${t}`}>{line.label}</div>
                  <p className={`text-[#525252] leading-snug ${tSm}`}>{line.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>TRACTION · BRUTAL HONESTY</DeckEyebrow>
          <DeckTitle>What is true. What is not yet.</DeckTitle>
          <div className={`grid grid-cols-3 gap-2 ${forPrint ? "mb-2" : "mb-3"}`}>
            <DeckStatTile
              theme={theme}
              value={MARKET_TRACTION.initialTurnover.value}
              label={`${MARKET_TRACTION.initialTurnover.label} · ${MARKET_TRACTION.initialTurnover.valueZar}`}
            />
            <DeckStatTile
              theme={theme}
              value={MARKET_TRACTION.pipeline6m.value}
              label={`${MARKET_TRACTION.pipeline6m.label} · ${MARKET_TRACTION.pipeline6m.valueZar}`}
            />
            <DeckStatTile
              theme={theme}
              value={MARKET_TRACTION.nsnp.value}
              label={MARKET_TRACTION.nsnp.label}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              className={`rounded-xl border border-emerald-200 bg-emerald-50/40 ${
                forPrint ? "p-2" : "p-3"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[10px] font-semibold tracking-wide text-emerald-900">
                  TRUE TODAY
                </span>
              </div>
              <ul className={`space-y-1 text-[#404040] ${tSm}`}>
                {TRACTION_VS_AMBITION.trueToday.slice(0, 6).map((item) => (
                  <li key={item} className="leading-snug flex gap-1">
                    <span className="text-emerald-600 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`rounded-xl border border-rose-200 bg-rose-50/40 ${
                forPrint ? "p-2" : "p-3"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <X className="w-3.5 h-3.5 text-rose-700" />
                <span className="text-[10px] font-semibold tracking-wide text-rose-900">
                  NOT YET TRUE
                </span>
              </div>
              <ul className={`space-y-1 text-[#404040] ${tSm}`}>
                {TRACTION_VS_AMBITION.notYetTrue.slice(0, 6).map((item) => (
                  <li key={item} className="leading-snug flex gap-1">
                    <span className="text-rose-500 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`text-[#a3a3a3] mt-2 ${tSm}`}>{MARKET_TRACTION.asOfNote}</p>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WEDGE · BIG FIVE FOODS</DeckEyebrow>
          <DeckTitle>Recurring food. High GP. Public-menu price.</DeckTitle>
          <p className={`text-[#404040] leading-relaxed mb-2 ${t}`}>
            {FOODS_ECONOMICS.whyGovernment}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.grossProfit.value}
              label="Gross profit"
            />
            <DeckStatTile
              theme={theme}
              value={FOODS_ECONOMICS.cheaperThanMarket.value}
              label="Cheaper vs wholesale & retail"
            />
            <DeckStatTile theme={theme} value="Repeat" label="Reorder business · schools & shelves" />
          </div>
          <div className="text-[10px] tracking-[2px] text-[#737373] font-semibold mb-1.5">
            COST INDEX · MARKET = 100
          </div>
          <div className="space-y-1.5 mb-2">
            {FOODS_ECONOMICS.competitiveIndex.map((row) => (
              <div key={row.channel}>
                <div className="flex justify-between gap-2 mb-0.5">
                  <span className={`font-semibold text-black ${tSm}`}>{row.channel}</span>
                  <span
                    className={`tabular-nums font-semibold ${
                      row.tone === "foods" ? "text-amber-800" : "text-[#737373]"
                    } ${tSm}`}
                  >
                    {row.index}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${row.index}%`,
                      backgroundColor:
                        row.tone === "foods" ? theme.gradientFrom : "#a3a3a3",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className={`text-[#a3a3a3] ${tSm}`}>{FOODS_ECONOMICS.honesty}</p>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE MACHINE</DeckEyebrow>
          <DeckTitle>One holdco. Critical rails. One mission.</DeckTitle>
          <p className={`text-[#525252] mb-2 ${t}`}>
            Investor owns the holding company — not a single opco. Ten pillars; six that matter
            first for this raise:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
            {PITCH_MACHINE.map((m) => {
              const meta =
                m.slug === "holdco"
                  ? { icon: "Building2" as const, color: "#d97706", name: "Holdco" }
                  : opcoMeta(m.slug);
              return (
                <div
                  key={m.slug}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 ${
                    forPrint ? "p-2" : "p-2.5"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                  >
                    <CompanyIcon name={meta.icon} size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-semibold text-black ${t}`}>{m.name}</div>
                    <p className={`text-[#525252] leading-snug ${tSm}`}>{m.line}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`rounded-xl border border-black/10 bg-white ${forPrint ? "p-2" : "p-3"}`}
          >
            <div className="text-[10px] tracking-[2px] font-semibold text-[#737373] mb-1">
              SANTACO · DISTRIBUTION PHYSICS
            </div>
            <p className={`text-[#404040] leading-snug ${t}`}>
              {SANTACO_PARTNERSHIP.containers.detail} {SANTACO_PARTNERSHIP.investorLeverage}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>STRUCTURE</DeckEyebrow>
          <DeckTitle>Capital → holdco (IP) → end-market opcos</DeckTitle>
          <div className="flex flex-col gap-2 max-w-lg mx-auto">
            {[
              {
                t: "Investor",
                d: `${INVESTMENT_ASK.capitalRaiseLabel} · ${INVESTMENT_ASK.equityOffered} equity · board · 10/90 deploy`,
              },
              {
                t: "Seychelles holding company",
                d: "Control · Group IP · tax/structure (counsel-led) · planned",
              },
              {
                t: "End-market operating companies",
                d: "Local P&L · Kenya template · further markets as corridors prove",
              },
              {
                t: "Rails",
                d: "Foods · Direct · Connect · Impact · Access (+ Agri, Leadership, Foundation, Global, Royal)",
              },
            ].map((row, i) => (
              <div key={row.t}>
                <div
                  className={`rounded-xl border border-black/10 ${
                    i === 0 ? "bg-[#0a0a0a] text-white" : "bg-[#fafafa] text-black"
                  } ${forPrint ? "p-2.5" : "p-3.5"}`}
                >
                  <div className={`font-semibold ${forPrint ? "text-xs" : "text-sm"}`}>{row.t}</div>
                  <p
                    className={`leading-snug ${i === 0 ? "text-white/65" : "text-[#525252]"} ${tSm}`}
                  >
                    {row.d}
                  </p>
                </div>
                {i < 3 && (
                  <div className="text-center text-[#a3a3a3] text-[10px] py-0.5">↓</div>
                )}
              </div>
            ))}
          </div>
          <p className={`text-[#a3a3a3] text-center mt-2 ${tSm}`}>
            Not tax or legal advice. Structure subject to counsel and definitive docs.
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>18-MONTH PROOF</DeckEyebrow>
          <DeckTitle>Gates. Or we stop.</DeckTitle>
          <p className={`text-[#525252] mb-2 ${t}`}>{PROOF_DASHBOARD_18MO.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {PROOF_DASHBOARD_18MO.gates.map((g) => (
              <div
                key={g.metric}
                className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-2" : "p-2.5"
                }`}
              >
                <div className="flex justify-between gap-2 mb-0.5">
                  <span className={`font-semibold text-black ${t}`}>{g.metric}</span>
                  <span
                    className={`shrink-0 font-semibold tabular-nums ${tSm}`}
                    style={{ color: theme.accentDark }}
                  >
                    {g.target}
                  </span>
                </div>
                <p className={`text-[#404040] leading-snug ${tSm}`}>
                  <strong>How:</strong> {g.how}
                </p>
                <p className={`text-rose-800/90 leading-snug ${tSm}`}>
                  <strong>Kill:</strong> {g.kill}
                </p>
              </div>
            ))}
          </div>
          <p className={`text-[#525252] mt-2 ${tSm}`}>{PROOF_DASHBOARD_18MO.successSummary}</p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>{TEAM_GOVERNANCE.eyebrow}</DeckEyebrow>
          <DeckTitle>Who runs it. How you oversee it.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
            {TEAM_GOVERNANCE.roles.map((r) => (
              <div
                key={r.role}
                className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-2" : "p-2.5"
                }`}
              >
                <div className={`font-semibold text-black ${t}`}>{r.role}</div>
                <div className={`font-medium ${tSm}`} style={{ color: theme.accentDark }}>
                  {r.who}
                </div>
                <p className={`text-[#525252] leading-snug ${tSm}`}>{r.focus}</p>
              </div>
            ))}
          </div>
          <div
            className={`rounded-xl border border-amber-200 bg-amber-50/50 ${
              forPrint ? "p-2" : "p-3"
            }`}
          >
            <div className="text-[10px] tracking-[2px] font-semibold text-amber-900 mb-1">
              CADENCE
            </div>
            {TEAM_GOVERNANCE.cadence.map((c) => (
              <div key={c} className={`flex gap-1.5 text-[#404040] ${tSm}`}>
                <Check className="w-3 h-3 shrink-0 mt-0.5 text-emerald-700" />
                <span>{c}</span>
              </div>
            ))}
            <p className={`text-[#737373] mt-1.5 ${tSm}`}>{TEAM_GOVERNANCE.note}</p>
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>RISKS</DeckEyebrow>
          <DeckTitle>What can kill it — and the counter</DeckTitle>
          <div className="space-y-1.5">
            {INVESTOR_RISKS.slice(0, 5).map((r) => (
              <div
                key={r.risk}
                className={`rounded-xl border border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-2 ${
                  forPrint ? "p-2" : "p-2.5"
                }`}
              >
                <div className="flex gap-1.5 min-w-0">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <div className="text-[9px] tracking-[1px] text-rose-800 font-semibold">
                      RISK
                    </div>
                    <p className={`font-medium text-black leading-snug ${t}`}>{r.risk}</p>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] tracking-[1px] text-emerald-800 font-semibold">
                    MITIGANT
                  </div>
                  <p className={`text-[#404040] leading-snug ${t}`}>{r.mitigate}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY THIS CAPITAL · NOW</DeckEyebrow>
          <DeckTitle>Convert. Deliver. Densify.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {[
              {
                t: "With USD 10m",
                d: "Pipeline → recurring offtake; NSNP rhythm; SANTACO pilots; DoH channel; holdco + IP; 90% assets / product.",
              },
              {
                t: "Without it",
                d: "Slow convert, thin inventory, delayed rank density, weaker multi-department proof.",
              },
              {
                t: "18-month test",
                d: "Gates on the previous slide. Miss them — stop aggressive expansion.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-2.5" : "p-3.5"
                }`}
              >
                <div className={`font-semibold text-black mb-1 ${t}`}>{c.t}</div>
                <p className={`text-[#525252] leading-snug ${tSm}`}>{c.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["conservative", "moderate", "aggressive"] as ScenarioKey[]).map((key) => (
              <div
                key={key}
                className={`rounded-xl border border-black/10 bg-white text-center ${
                  forPrint ? "p-2" : "p-3"
                }`}
              >
                <div className="text-[9px] tracking-[1px] text-[#a3a3a3] font-semibold">
                  {SCENARIO_META[key].label.toUpperCase()} Y5
                </div>
                <div
                  className={`font-semibold tabular-nums ${forPrint ? "text-sm" : "text-lg"}`}
                  style={{ color: theme.accentDark }}
                >
                  {formatUSDm(sumScenario(key, "y5"))}
                </div>
                <div className={`text-[#a3a3a3] ${tSm}`}>Illustrative USD</div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div>
              <DeckEyebrow light theme={theme}>
                NEXT · DATA ROOM
              </DeckEyebrow>
              <h2
                className={`font-semibold tracking-tighter text-white text-balance max-w-2xl ${
                  forPrint ? "text-2xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-3"
                }`}
              >
                Partner with clarity.
                <br />
                <span style={{ color: theme.gradientFrom }}>Or walk away clean.</span>
              </h2>
              <p
                className={`text-white/75 max-w-xl leading-relaxed mb-4 ${
                  forPrint ? "text-xs" : "text-sm"
                }`}
              >
                {INVESTMENT_ASK.capitalRaiseLabel} · {INVESTMENT_ASK.equityOffered} holdco · board ·
                10/90 · gates in 18 months. Request the NDA pack.
              </p>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-1 mb-5 max-w-xl ${tSm}`}>
                {PITCH_DATA_ROOM.map((item) => (
                  <div key={item} className="flex gap-1.5 text-white/65">
                    <Check className="w-3 h-3 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Investor pitch — Big Five Group data room"
                  )}`}
                  className="deck-email-cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ color: "#000000", backgroundColor: "#ffffff" }}
                >
                  Email: {CONTACT_EMAIL}
                  <ArrowRight className="w-4 h-4" style={{ color: "#000000" }} />
                </a>
                <Link
                  href="/investor"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Full investor model page
                </Link>
              </div>
            </div>
            <p
              className={`text-white/35 max-w-2xl leading-relaxed ${
                forPrint ? "text-[8px]" : "text-[9px] sm:text-[10px]"
              }`}
            >
              {MODEL_DISCLAIMER}
            </p>
          </DeckTitleLayout>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function InvestorStrategyDeck() {
  return (
    <div id="investor-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-amber-800 mb-3 font-medium">
          INVESTOR PITCH · {TOTAL} SLIDES · CONFIDENTIAL · FIRST PRINCIPLES
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Big Five Group — investor pitch
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Lean deck: ask, funds, traction honesty, Foods unit economics, structure, 18-month gates,
          team, risks. Full scenario tables and opco depth remain on the model page below.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="investor-deck-shell"
          printRootId="investor-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="INVESTOR PITCH"
          title="Big Five Group — Investor Pitch"
          description="USD 10m for 10% holdco equity. First principles, unit economics, kill criteria."
          sharePath="/investor#investor-deck"
          shareTitle="Big Five Group — Investor Pitch"
          shareText="Confidential pitch: USD 10m for 10% equity, Foods economics, 18-month proof gates."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
    </div>
  );
}
