"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  Leaf,
  Recycle,
  Shield,
  Target,
  Users,
  Wheat,
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
  AFRICA_PROBLEMS,
  GROUP_IMPACT_PILLARS,
  GROUP_THESIS_PILLARS,
  INVESTMENT_ASK,
  INVESTOR_RISKS,
  MARKET_TRACTION,
  MILESTONES_12_18,
  MODEL_DISCLAIMER,
  OPCO_MODELS,
  SCENARIO_META,
  TRACTION_VS_AMBITION,
  UNIT_ECONOMICS,
  formatUSDm,
  sumScenario,
  type ScenarioKey,
} from "../lib/investor-model";
import { CONTACT_EMAIL } from "../lib/contact";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

const theme = DECK_THEMES.amber;
const TOTAL = 20;

function opcoMeta(slug: string) {
  const company = companies.find((c) => c.slug === slug);
  const model = OPCO_MODELS.find((o) => o.slug === slug);
  return {
    icon: company?.icon ?? "Leaf",
    color: company?.color ?? model?.color ?? "#111",
    name: model?.name ?? company?.name ?? slug,
    fullName: model?.fullName ?? company?.fullName ?? slug,
  };
}

function Slide({ index }: { index: number }) {
  const forPrint = useDeckPrintMode();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div>
              <DeckEyebrow light theme={theme}>
                BIG FIVE GROUP · INVESTOR PRESENTATION · CONFIDENTIAL
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
                Continental growth platform.
                <br />
                <span style={{ color: theme.gradientFrom }}>
                  USD 10m · 10% equity · board seat.
                </span>
              </h2>
              <p
                className={`text-white/75 max-w-2xl mt-4 ${
                  forPrint ? "text-xs" : "text-sm sm:text-base"
                } leading-relaxed`}
              >
                Market traction (~$45k · ~$3.0m pipeline · NSNP landed) · USD scenarios · unit economics ·
                milestones · risks · Seychelles holdco + end-market opcos.
              </p>
            </div>
            <div
              className={`text-white/45 space-y-1 ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"}`}
            >
              <p>Holding company · Feed · Educate · Empower</p>
              <p>bigfivegroup.africa/investor#investor-deck</p>
              <p>{TOTAL} slides · Shareable · Printable · Not a prospectus</p>
            </div>
          </DeckTitleLayout>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AGENDA</DeckEyebrow>
          <DeckTitle>What this investor briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1 max-w-2xl" : "space-y-2 max-w-2xl"}>
            {[
              "Ask · use of funds · Seychelles holdco + end-market opcos",
              "Market traction (~$45k · ~$3.0m pipeline · NSNP) · true today vs not yet",
              "Group thesis · Africa problems · how we respond",
              "Unit economics (Foods + Connect)",
              "USD revenue scenarios · opco rollup",
              "12–18 month milestones · risks & mitigants",
              "Social · economic · environmental impact · NDA next steps",
            ].map((item, i) => (
              <li key={item} className="flex gap-2.5 items-start">
                <span
                  className="shrink-0 w-6 h-6 rounded-full text-white text-[10px] font-semibold flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[#404040] leading-relaxed pt-0.5 ${
                    forPrint ? "text-[11px]" : "text-sm"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ol>
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
              {INVESTMENT_ASK.capitalRaiseLabel} for {INVESTMENT_ASK.equityOffered} · board seat
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl mb-5 leading-relaxed ${
              forPrint ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            {INVESTMENT_ASK.equityNote} {INVESTMENT_ASK.boardNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <DeckStatTile
              dark
              theme={theme}
              value={INVESTMENT_ASK.capitalRaiseShort}
              label="Capital raise (United States dollars)"
            />
            <DeckStatTile
              dark
              theme={theme}
              value={INVESTMENT_ASK.equityOffered}
              label={`Equity in ${INVESTMENT_ASK.entity}`}
            />
            <DeckStatTile
              dark
              theme={theme}
              value="Board"
              label="Seat at holding-company level for strategic oversight"
            />
          </div>
          <p className={`text-white/55 ${forPrint ? "text-[10px]" : "text-xs"} leading-relaxed`}>
            {INVESTMENT_ASK.purpose} Subject to definitive legal agreements / term sheet.
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>USE OF FUNDS</DeckEyebrow>
          <DeckTitle>10% operations · 90% assets & product development</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {INVESTMENT_ASK.useOfFunds.map((u) => (
              <div
                key={u.label}
                className={`rounded-2xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-3" : "p-5 sm:p-6"
                }`}
              >
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <span
                    className={`font-semibold tracking-tighter tabular-nums ${
                      forPrint ? "text-2xl" : "text-3xl sm:text-4xl"
                    }`}
                    style={{ color: theme.accentDark }}
                  >
                    {u.pct}%
                  </span>
                  <span className="text-sm font-semibold text-black">{u.label}</span>
                  <span className="text-xs font-semibold text-[#737373] tabular-nums">
                    · {u.amountLabel}
                  </span>
                </div>
                <p className={`text-[#525252] leading-relaxed ${forPrint ? "text-[11px]" : "text-sm"}`}>
                  {u.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="h-3 rounded-full overflow-hidden flex border border-black/10">
            <div className="bg-slate-500 h-full" style={{ width: "10%" }} />
            <div className="h-full" style={{ width: "90%", backgroundColor: theme.gradientFrom }} />
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>STRUCTURE DIAGRAM</DeckEyebrow>
          <DeckTitle>Capital → Seychelles holdco (IP) → end-market opcos</DeckTitle>
          <div className="flex flex-col items-stretch gap-2 max-w-xl mx-auto">
            {[
              {
                t: "Investor capital",
                d: "USD 10m · 10% equity + board · 10% ops / 90% assets & product",
                dark: true,
              },
              {
                t: "Seychelles holding company",
                d: "Group control · IP · tax/structure (counsel-led)",
                dark: false,
              },
              {
                t: "IP & licences",
                d: "Brand, models, platforms licensed into markets",
                dark: false,
              },
              {
                t: "End-market operating companies",
                d: "Kenya template → local sales, jobs, buy-in, delivery",
                dark: true,
              },
              {
                t: "Pillar execution",
                d: "Foods · Agri · Direct · Connect · Impact · …",
                dark: false,
              },
            ].map((row, i, arr) => (
              <div key={row.t} className="flex flex-col items-center">
                <div
                  className={`w-full rounded-xl border px-4 py-3 text-center ${
                    row.dark
                      ? "bg-[#0a0a0a] text-white border-white/10"
                      : "bg-[#fafafa] text-black border-black/10"
                  }`}
                >
                  <div className={`font-semibold ${forPrint ? "text-xs" : "text-sm"}`}>{row.t}</div>
                  <div
                    className={`mt-0.5 ${forPrint ? "text-[9px]" : "text-[11px]"} ${
                      row.dark ? "text-white/60" : "text-[#525252]"
                    }`}
                  >
                    {row.d}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowDown
                    className="w-4 h-4 my-0.5"
                    style={{ color: theme.accentDark }}
                  />
                )}
              </div>
            ))}
          </div>
          <p className={`text-center text-[#737373] mt-3 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            Data & revenue flow back to holdco for reporting and reinvestment. Not tax/legal advice.
          </p>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>MARKET TRACTION · VS AMBITION</DeckEyebrow>
          <DeckTitle>Early revenue · pipeline · NSNP landed</DeckTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 ${forPrint ? "mb-2" : "mb-3"}`}>
            {[
              {
                v: MARKET_TRACTION.initialTurnover.value,
                l: MARKET_TRACTION.initialTurnover.label,
                d: `${MARKET_TRACTION.initialTurnover.valueZar} · management-reported · initial stages`,
              },
              {
                v: MARKET_TRACTION.pipeline6m.value,
                l: MARKET_TRACTION.pipeline6m.label,
                d: `${MARKET_TRACTION.pipeline6m.valueZar} · opportunity-stage · not booked`,
              },
              {
                v: MARKET_TRACTION.nsnp.value,
                l: MARKET_TRACTION.nsnp.label,
                d: "Programme landed · plan scale",
              },
            ].map((s) => (
              <div
                key={s.l}
                className={`rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50 ${
                  forPrint ? "p-2.5" : "p-3.5"
                }`}
              >
                <div
                  className={`font-semibold tracking-tighter text-amber-950 tabular-nums ${
                    forPrint ? "text-xl" : "text-2xl sm:text-3xl"
                  }`}
                >
                  {s.v}
                </div>
                <div className={`font-semibold text-black mt-0.5 ${forPrint ? "text-[10px]" : "text-xs"}`}>
                  {s.l}
                </div>
                <div className={`text-[#737373] mt-0.5 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
                  {s.d}
                </div>
              </div>
            ))}
          </div>
          <p
            className={`text-[#404040] leading-snug border border-black/10 rounded-xl bg-[#fafafa] ${
              forPrint ? "text-[9px] p-2 mb-2" : "text-[11px] sm:text-xs p-3 mb-3"
            }`}
          >
            <strong className="text-black">{MARKET_TRACTION.credibility.title}.</strong>{" "}
            {MARKET_TRACTION.credibility.detail}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div
              className={`rounded-2xl border border-emerald-200 bg-emerald-50/40 ${
                forPrint ? "p-2.5" : "p-3.5"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-semibold tracking-wide text-emerald-900">
                  TRUE TODAY
                </span>
              </div>
              <ul
                className={`space-y-1 text-[#404040] ${
                  forPrint ? "text-[9px]" : "text-[10px] sm:text-[11px]"
                }`}
              >
                {TRACTION_VS_AMBITION.trueToday.map((t) => (
                  <li key={t} className="leading-snug flex gap-1.5">
                    <span className="text-emerald-600 shrink-0">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`rounded-2xl border border-rose-200 bg-rose-50/40 ${
                forPrint ? "p-2.5" : "p-3.5"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <X className="w-4 h-4 text-rose-700" />
                <span className="text-xs font-semibold tracking-wide text-rose-900">
                  NOT YET TRUE
                </span>
              </div>
              <ul
                className={`space-y-1 text-[#404040] ${
                  forPrint ? "text-[9px]" : "text-[10px] sm:text-[11px]"
                }`}
              >
                {TRACTION_VS_AMBITION.notYetTrue.map((t) => (
                  <li key={t} className="leading-snug flex gap-1.5">
                    <span className="text-rose-500 shrink-0">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`text-[#a3a3a3] mt-2 ${forPrint ? "text-[8px]" : "text-[9px]"}`}>
            {MARKET_TRACTION.asOfNote}
          </p>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GROUP THESIS</DeckEyebrow>
          <DeckTitle>One holding company. Ten pillars. One mission.</DeckTitle>
          <p
            className={`text-[#404040] max-w-3xl leading-relaxed ${
              forPrint ? "text-[10px] mb-2" : "text-xs sm:text-sm mb-3"
            }`}
          >
            Integrated rails so nutrition, trade, capital and delivery compound — under Seychelles
            holdco IP and local end-market opcos. Each pillar answers a concrete African problem and
            opens a measurable commercial or delivery opportunity.
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 overflow-y-auto ${
              forPrint ? "max-h-none" : "max-h-[min(52vh,28rem)] sm:max-h-none"
            }`}
          >
            {GROUP_THESIS_PILLARS.map((p) => {
              const meta = opcoMeta(p.slug);
              return (
                <div
                  key={p.slug}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                    forPrint ? "p-1.5" : "p-2.5 sm:p-3"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 min-w-0">
                    <div
                      className={`rounded-lg flex items-center justify-center shrink-0 ${
                        forPrint ? "w-6 h-6" : "w-7 h-7"
                      }`}
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                    >
                      <CompanyIcon name={meta.icon} size={forPrint ? 12 : 14} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-black truncate ${
                          forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                        }`}
                      >
                        {meta.fullName}
                      </div>
                      <div className={`text-[#a3a3a3] truncate ${forPrint ? "text-[8px]" : "text-[9px]"}`}>
                        {OPCO_MODELS.find((o) => o.slug === p.slug)?.avenue}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`text-[#404040] leading-snug ${
                      forPrint ? "text-[8px] mb-0.5" : "text-[10px] sm:text-[11px] mb-1"
                    }`}
                  >
                    <strong className="text-rose-800/90">Problem:</strong> {p.problem}
                  </p>
                  <p
                    className={`text-[#404040] leading-snug ${
                      forPrint ? "text-[8px] mb-0.5" : "text-[10px] sm:text-[11px] mb-1"
                    }`}
                  >
                    <strong className="text-emerald-800">Opportunity:</strong> {p.opportunity}
                  </p>
                  <p className={`text-[#a3a3a3] leading-snug ${forPrint ? "text-[7px]" : "text-[9px]"}`}>
                    Source: {p.source.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className={`text-[#a3a3a3] mt-1.5 ${forPrint ? "text-[7px]" : "text-[9px]"}`}>
            External sources cited per pillar · Group claims remain management-reported where noted ·
            Full Africa problem slides follow.
          </p>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            AFRICA · THE NEED
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">Problems that define the opportunity</span>
          </DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {AFRICA_PROBLEMS.map((p) => (
              <div
                key={p.id}
                className={`rounded-xl border border-white/10 bg-white/[0.06] ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div className={`font-semibold text-white mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {p.title}
                </div>
                <div className={`text-white/55 leading-snug ${forPrint ? "text-[10px]" : "text-xs"}`}>
                  {p.stats[0]?.value} — {p.stats[0]?.label}
                </div>
              </div>
            ))}
          </div>
          <p className={`text-white/40 mt-3 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            Sources: SOFI 2025, UNICEF/WHO/WB JME, WHO GHO — full links on investor portal.
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HUNGER & MALNUTRITION</DeckEyebrow>
          <DeckTitle>Scale of the food-security challenge</DeckTitle>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3">
            {(AFRICA_PROBLEMS.find((p) => p.id === "hunger")?.stats ?? []).map((s) => (
              <DeckStatTile key={s.label} theme={theme} value={s.value} label={s.label} />
            ))}
            {(AFRICA_PROBLEMS.find((p) => p.id === "malnutrition")?.stats ?? [])
              .slice(0, 3)
              .map((s) => (
                <DeckStatTile key={s.label} theme={theme} value={s.value} label={s.label} />
              ))}
          </div>
          <p className={`text-[#525252] leading-relaxed ${forPrint ? "text-[11px]" : "text-sm"}`}>
            Answered by Agri · Foods · Direct · Access · Impact — fortify, grow, move, fund and
            deliver with proof.
          </p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW WE RESPOND</DeckEyebrow>
          <DeckTitle>Integrated opcos address the same map</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              {
                icon: Wheat,
                t: "Foods · Agri · Direct",
                d: "Fortify, grow and move affordable nutrition with provenance.",
              },
              {
                icon: Building2,
                t: "Access · Connect",
                d: "Open capital pathways and run verified trade on SupplierAdvisor®.",
              },
              {
                icon: Target,
                t: "Impact · Foundation",
                d: "PMO delivery and catalytic programmes with transparent design.",
              },
              {
                icon: Shield,
                t: "Leadership · Global · Royal",
                d: "Super-Cube® capacity, corridors, and community legitimacy.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className={`rounded-2xl border border-black/10 bg-[#fafafa] flex gap-3 ${
                  forPrint ? "p-3" : "p-4"
                }`}
              >
                <c.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.accentDark }} />
                <div>
                  <div className={`font-semibold text-black ${forPrint ? "text-xs" : "text-sm"}`}>
                    {c.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-relaxed ${
                      forPrint ? "text-[10px]" : "text-xs"
                    }`}
                  >
                    {c.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UNIT ECONOMICS · FOODS + CONNECT</DeckEyebrow>
          <DeckTitle>Recurring food volume — and seats × ARPU</DeckTitle>
          <p
            className={`text-[#525252] max-w-3xl leading-relaxed ${
              forPrint ? "text-[10px] mb-2" : "text-xs sm:text-sm mb-3"
            }`}
          >
            <strong className="text-black">Foods is repetitive business.</strong> Schools,
            institutions and households reorder as menus and shelves turn — so as traction lands,
            volume should sustain and grow with penetration (thesis, not a guarantee). Connect
            compounds via seats and network density.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {UNIT_ECONOMICS.map((u) => {
              const meta = opcoMeta(u.slug);
              return (
                <div
                  key={u.slug}
                  className={`rounded-2xl border border-black/10 bg-[#fafafa] ${
                    forPrint ? "p-3" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                    >
                      <CompanyIcon name={meta.icon} size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-black text-sm">{u.name}</div>
                      <div className="text-[10px] text-[#737373]">{u.engine}</div>
                    </div>
                  </div>
                  <ul className={`space-y-1 mb-2 ${forPrint ? "text-[9px]" : "text-[11px]"} text-[#404040]`}>
                    {u.levers.map((l) => (
                      <li key={l.k}>
                        <strong>{l.k}:</strong> {l.v}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-[#525252] ${forPrint ? "text-[9px]" : "text-[11px]"}`}>
                    <strong className="text-black">Path:</strong> {u.path}
                  </p>
                  <p
                    className={`mt-1.5 text-rose-800/90 leading-snug ${
                      forPrint ? "text-[9px]" : "text-[10px]"
                    }`}
                  >
                    <strong>Kill:</strong> {u.kill}
                  </p>
                </div>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            REVENUE · USD
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">Illustrative group run-rates (United States dollars)</span>
          </DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {(["conservative", "moderate", "aggressive"] as ScenarioKey[]).map((key) => (
              <div
                key={key}
                className={`rounded-2xl border border-white/10 bg-white/[0.06] ${
                  forPrint ? "p-3" : "p-4"
                }`}
              >
                <div className="text-[10px] tracking-[2px] text-white/45 mb-1">
                  {SCENARIO_META[key].label.toUpperCase()}
                </div>
                <div
                  className={`text-amber-300 font-semibold tracking-tighter tabular-nums ${
                    forPrint ? "text-xl" : "text-2xl sm:text-3xl"
                  }`}
                >
                  Y5 {formatUSDm(sumScenario(key, "y5"))}
                </div>
                <div
                  className={`text-white/70 tabular-nums ${
                    forPrint ? "text-sm" : "text-base"
                  }`}
                >
                  Y10 {formatUSDm(sumScenario(key, "y10"))}
                </div>
              </div>
            ))}
          </div>
          <p className={`text-white/40 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            Sum of opco scenarios. Not audited. Not a guarantee. Currency: USD.
          </p>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GROUP ROLLUP · USD</DeckEyebrow>
          <DeckTitle>Opco contribution at year 5 (three scenarios)</DeckTitle>
          <div className="overflow-x-auto -mx-1 px-1">
            <table
              className={`w-full min-w-[32rem] text-left ${
                forPrint ? "text-[10px]" : "text-xs sm:text-sm"
              }`}
            >
              <thead>
                <tr className="border-b border-black/10 text-[10px] text-[#737373]">
                  <th className="py-2 pr-2 font-semibold">Opco</th>
                  <th className="py-2 pr-2 font-semibold text-right">Cons.</th>
                  <th className="py-2 pr-2 font-semibold text-right">Mod.</th>
                  <th className="py-2 font-semibold text-right">Agg.</th>
                </tr>
              </thead>
              <tbody className="text-[#404040]">
                {OPCO_MODELS.map((o) => {
                  const meta = opcoMeta(o.slug);
                  return (
                    <tr key={o.slug} className="border-t border-black/5">
                      <td className="py-1.5 pr-2 font-medium text-black">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-flex w-5 h-5 rounded items-center justify-center shrink-0"
                            style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                          >
                            <CompanyIcon name={meta.icon} size={12} />
                          </span>
                          {o.name}
                        </span>
                      </td>
                      <td className="py-1.5 pr-2 text-right tabular-nums">
                        {formatUSDm(o.scenarios.conservative.y5RevenueUSDm)}
                      </td>
                      <td className="py-1.5 pr-2 text-right tabular-nums font-medium text-black">
                        {formatUSDm(o.scenarios.moderate.y5RevenueUSDm)}
                      </td>
                      <td className="py-1.5 text-right tabular-nums">
                        {formatUSDm(o.scenarios.aggressive.y5RevenueUSDm)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-black/15 font-semibold text-black">
                  <td className="py-2 pr-2">Group total</td>
                  <td className="py-2 pr-2 text-right tabular-nums">
                    {formatUSDm(sumScenario("conservative", "y5"))}
                  </td>
                  <td className="py-2 pr-2 text-right tabular-nums">
                    {formatUSDm(sumScenario("moderate", "y5"))}
                  </td>
                  <td className="py-2 text-right tabular-nums">
                    {formatUSDm(sumScenario("aggressive", "y5"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>OPCOS · CURRENT VS FUTURE</DeckEyebrow>
          <DeckTitle>Traction today · continental ambition tomorrow</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-full overflow-y-auto">
            {OPCO_MODELS.slice(0, 6).map((o) => {
              const meta = opcoMeta(o.slug);
              return (
                <div
                  key={o.slug}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                    forPrint ? "p-2" : "p-3"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 min-w-0">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                    >
                      <CompanyIcon name={meta.icon} size={14} />
                    </div>
                    <span
                      className={`font-semibold text-black truncate ${
                        forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                      }`}
                    >
                      {o.name}
                    </span>
                  </div>
                  <p className={`text-[#525252] leading-snug ${forPrint ? "text-[9px]" : "text-[11px]"}`}>
                    <strong className="text-[#404040]">Now:</strong> {o.currentState.markets}
                  </p>
                  <p
                    className={`text-[#525252] leading-snug mt-1 ${
                      forPrint ? "text-[9px]" : "text-[11px]"
                    }`}
                  >
                    <strong className="text-[#404040]">Future:</strong> {o.futureState.slice(0, 100)}
                    …
                  </p>
                </div>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>OPCOS · CONTINUED</DeckEyebrow>
          <DeckTitle>Remaining companies in the model</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OPCO_MODELS.slice(6).map((o) => {
              const meta = opcoMeta(o.slug);
              return (
                <div
                  key={o.slug}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] ${
                    forPrint ? "p-2" : "p-3"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                    >
                      <CompanyIcon name={meta.icon} size={16} />
                    </div>
                    <span
                      className={`font-semibold text-black truncate ${
                        forPrint ? "text-[10px]" : "text-sm"
                      }`}
                    >
                      {o.fullName}
                    </span>
                  </div>
                  <p className={`text-[#525252] ${forPrint ? "text-[9px]" : "text-xs"}`}>{o.avenue}</p>
                  <p
                    className={`text-[#404040] mt-1 tabular-nums ${
                      forPrint ? "text-[9px]" : "text-xs"
                    }`}
                  >
                    Mod Y5 {formatUSDm(o.scenarios.moderate.y5RevenueUSDm)} · Y10{" "}
                    {formatUSDm(o.scenarios.moderate.y10RevenueUSDm)}
                  </p>
                </div>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>12–18 MONTH ROADMAP</DeckEyebrow>
          <DeckTitle>What this capital is meant to unlock</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {MILESTONES_12_18.map((m) => (
              <div
                key={m.q}
                className={`rounded-2xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div
                  className="text-[10px] font-semibold tracking-[2px] mb-1"
                  style={{ color: theme.accentDark }}
                >
                  {m.q}
                </div>
                <div className={`font-semibold text-black mb-2 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {m.title}
                </div>
                <ul
                  className={`space-y-1.5 text-[#404040] ${
                    forPrint ? "text-[9px]" : "text-[11px]"
                  }`}
                >
                  {m.items.map((item) => (
                    <li key={item} className="leading-snug flex gap-1.5">
                      <span className="text-amber-700 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>RISKS & MITIGANTS</DeckEyebrow>
          <DeckTitle>What can kill the plan — and how we respond</DeckTitle>
          <div className="space-y-2">
            {INVESTOR_RISKS.map((r) => (
              <div
                key={r.risk}
                className={`rounded-xl border border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-2 ${
                  forPrint ? "p-2" : "p-3"
                }`}
              >
                <div className="flex gap-2 min-w-0">
                  <AlertTriangle
                    className="w-4 h-4 shrink-0 mt-0.5 text-rose-600"
                  />
                  <div>
                    <div className="text-[10px] tracking-[1px] text-rose-800 font-semibold">
                      RISK
                    </div>
                    <p className={`text-black font-medium leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"}`}>
                      {r.risk}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[1px] text-emerald-800 font-semibold">
                    MITIGANT
                  </div>
                  <p className={`text-[#404040] leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"}`}>
                    {r.mitigate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            IMPACT · S · E · E
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">Social · Economic · Environmental</span>
          </DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              [
                { key: "social" as const, icon: Users },
                { key: "economic" as const, icon: Globe2 },
                { key: "environmental" as const, icon: Recycle },
              ] as const
            ).map(({ key, icon: Icon }) => {
              const block = GROUP_IMPACT_PILLARS[key];
              return (
                <div
                  key={key}
                  className={`rounded-2xl border border-white/10 bg-white/[0.06] ${
                    forPrint ? "p-3" : "p-4"
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-300 mb-2" />
                  <div className={`font-semibold text-white mb-2 ${forPrint ? "text-xs" : "text-sm"}`}>
                    {block.title}
                  </div>
                  <ul
                    className={`space-y-1.5 text-white/65 ${
                      forPrint ? "text-[9px]" : "text-[11px]"
                    }`}
                  >
                    {block.items.map((item) => (
                      <li key={item} className="leading-snug flex gap-1.5">
                        <Leaf className="w-3 h-3 shrink-0 mt-0.5 text-emerald-400/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </DeckSlideShell>
      );

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY THIS CAPITAL · NOW</DeckEyebrow>
          <DeckTitle>Convert pipeline · deliver NSNP · unlock corridors</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                t: "With the raise",
                d: "Working capital to convert the ~$3.0m (R50m) pipeline into recurring Foods offtake; pilot and densify SANTACO taxi-rank containers (toward 15k plan); stand up NSNP; advance SA DoH pathway via Impact; Seychelles holdco + IP; 90/10 deploy.",
              },
              {
                t: "Without it",
                d: "Slower pipeline conversion, thinner inventory for institutional and rank reorders, delayed SANTACO density, delayed DoH introductions, weaker multi-department pathways.",
              },
              {
                t: "Prove in 18 months",
                d: "Pipeline → recurring offtake; SANTACO pilot ranks live (Foods + Wi‑Fi + media + Super-Cube®); NSNP rhythm; DoH progress; unit-economics dashboard; second market opco.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className={`rounded-2xl border border-black/10 bg-[#fafafa] ${
                  forPrint ? "p-3" : "p-4"
                }`}
              >
                <div className={`font-semibold text-black mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {c.t}
                </div>
                <p className={`text-[#525252] leading-relaxed ${forPrint ? "text-[10px]" : "text-xs"}`}>
                  {c.d}
                </p>
              </div>
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
                NEXT STEPS · NDA
              </DeckEyebrow>
              <h2
                className={`font-semibold tracking-tighter text-white text-balance max-w-2xl ${
                  forPrint ? "text-2xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-4"
                }`}
              >
                Partner on continental scale.
                <br />
                <span style={{ color: theme.gradientFrom }}>With governance. With clarity.</span>
              </h2>
              <p
                className={`text-white/75 max-w-xl leading-relaxed mb-6 ${
                  forPrint ? "text-xs" : "text-sm sm:text-base"
                }`}
              >
                {INVESTMENT_ASK.capitalRaiseLabel} for {INVESTMENT_ASK.equityOffered} equity · board
                seat · Seychelles holdco (IP) · end-market opcos · 10% ops / 90% assets & product.
                Request the data room.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Investor presentation — Big Five Group"
                  )}`}
                  className="deck-email-cta inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold"
                >
                  Email: {CONTACT_EMAIL}
                  <ArrowRight className="w-4 h-4 text-black" />
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
              className={`text-white/40 max-w-2xl ${
                forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
              } leading-relaxed`}
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
          INVESTOR PRESENTATION · {TOTAL} SLIDES · CONFIDENTIAL
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Big Five Group — investor deck
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Shareable, printable presentation: market traction (~$45k · ~$3.0m pipeline · NSNP), ask,
          structure, unit economics, USD scenarios, milestones, risks, and impact.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="investor-deck-shell"
          printRootId="investor-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="INVESTOR DECK"
          title="Big Five Group — Investor Presentation"
          description="USD 10m for 10% holding equity, board seat, traction, NSNP, USD scenarios, unit economics, milestones, risks."
          sharePath="/investor#investor-deck"
          shareTitle="Big Five Group — Investor Presentation"
          shareText="Confidential investor briefing: USD 10m for 10% equity, market traction, USD scenarios, NSNP and continental model."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
    </div>
  );
}
