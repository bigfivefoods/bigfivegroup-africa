"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Globe2,
  Leaf,
  LineChart,
  Lock,
  PieChart,
  Recycle,
  Users,
} from "lucide-react";
import {
  AFRICA_PROBLEMS,
  GROUP_IMPACT_PILLARS,
  INVESTMENT_ASK,
  MODEL_DISCLAIMER,
  OPCO_MODELS,
  SCENARIO_META,
  formatUSDm,
  sumScenario,
  type ScenarioKey,
} from "../lib/investor-model";
import LogoutButton from "./LogoutButton";
import { CONTACT_EMAIL } from "../lib/contact";

const SCENARIOS: ScenarioKey[] = ["conservative", "moderate", "aggressive"];

export default function InvestorPortalClient({ email }: { email: string }) {
  const [scenario, setScenario] = useState<ScenarioKey>("moderate");
  const [openSlug, setOpenSlug] = useState<string | null>("foods");

  const y5 = useMemo(() => sumScenario(scenario, "y5"), [scenario]);
  const y10 = useMemo(() => sumScenario(scenario, "y10"), [scenario]);

  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-amber-400 mb-4">
                <Lock className="w-3.5 h-3.5" />
                PRIVATE · INVESTOR MODEL · CONFIDENTIAL
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-3">
                Group revenue potential (USD) & triple-bottom-line impact
              </h1>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-2">
                Signed in as{" "}
                <span className="text-white font-medium break-all">{email}</span>
              </p>
              <p className="text-white/55 text-sm leading-relaxed text-pretty mb-4">
                Consolidated view of all operating companies (opcos): current traction on the
                continent, future-state ambition, and conservative / moderate / aggressive market
                penetration scenarios. All projected revenues are in{" "}
                <strong className="text-white/85">United States dollars (USD)</strong>.{" "}
                <strong className="text-white/80">Illustrative model — not audited financials.</strong>
              </p>
              <p className="text-sm text-amber-200/90 leading-relaxed text-pretty border border-amber-400/25 bg-amber-400/10 rounded-xl px-4 py-3">
                <strong className="text-amber-100">Investment ask:</strong>{" "}
                {INVESTMENT_ASK.equityOffered} equity in {INVESTMENT_ASK.entity}
                {INVESTMENT_ASK.boardSeat ? " · board seat" : ""} · use of funds{" "}
                {INVESTMENT_ASK.useOfFunds.map((u) => `${u.pct}% ${u.label.toLowerCase()}`).join(" / ")}
              </p>
            </div>
            <LogoutButton />
          </div>

          {/* Scenario toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <span className="text-xs tracking-[2px] text-white/40 uppercase shrink-0">
              Scenario
            </span>
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.map((key) => {
                const meta = SCENARIO_META[key];
                const active = scenario === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenario(key)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors border ${
                      active
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                    }`}
                  >
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-white/45 mb-8 max-w-2xl leading-relaxed">
            {SCENARIO_META[scenario].blurb}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 min-w-0 sm:col-span-1">
              <div className="text-[10px] tracking-[2px] text-white/40 mb-1">
                GROUP Y5 RUN-RATE (USD)
              </div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-amber-300 tabular-nums">
                {formatUSDm(y5)}
              </div>
              <div className="text-xs text-white/50 mt-1">
                Illustrative annual revenue potential · year 5 · United States dollars
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 min-w-0">
              <div className="text-[10px] tracking-[2px] text-white/40 mb-1">
                GROUP Y10 RUN-RATE (USD)
              </div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-amber-300 tabular-nums">
                {formatUSDm(y10)}
              </div>
              <div className="text-xs text-white/50 mt-1">
                Illustrative annual revenue potential · year 10 · United States dollars
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 min-w-0">
              <div className="text-[10px] tracking-[2px] text-white/40 mb-1">EQUITY ASK</div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white tabular-nums">
                {INVESTMENT_ASK.equityOffered}
              </div>
              <div className="text-xs text-white/50 mt-1">
                Of Big Five Group holding company · board seat included
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 min-w-0">
              <div className="text-[10px] tracking-[2px] text-white/40 mb-1">USE OF FUNDS</div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">
                10 / 90
              </div>
              <div className="text-xs text-white/50 mt-1">
                10% operations · 90% assets & product development
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor nav */}
      <nav className="sticky top-[var(--navbar-height)] z-30 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex gap-2 overflow-x-auto text-xs sm:text-sm font-medium">
          {[
            { href: "#ask", label: "Investment ask" },
            { href: "#problems", label: "Africa problems" },
            { href: "#rollup", label: "Group rollup (USD)" },
            { href: "#opcos", label: "Opco detail" },
            { href: "#impact", label: "S · E · E impact" },
            { href: "#disclaimer", label: "Disclaimer" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-[#404040] hover:bg-black/5 hover:text-black"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Disclaimer strip */}
      <div id="disclaimer" className="bg-amber-50 border-b border-amber-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">{MODEL_DISCLAIMER}</p>
        </div>
      </div>

      {/* Investment ask */}
      <section
        id="ask"
        className="scroll-mt-28 bg-white border-b border-black/10 py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-amber-700" />
            <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373]">
              HOLDING COMPANY · EQUITY · GOVERNANCE · USE OF FUNDS
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance">
            The investment we are seeking
          </h2>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-8 text-pretty">
            {INVESTMENT_ASK.equityNote} {INVESTMENT_ASK.boardNote} {INVESTMENT_ASK.purpose}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
            <div className="rounded-2xl border border-black/10 bg-[#0a0a0a] text-white p-6 sm:p-8 min-w-0">
              <div className="text-[10px] tracking-[2px] text-amber-400/90 mb-2">EQUITY</div>
              <div className="text-4xl sm:text-5xl font-semibold tracking-tighter text-amber-300 mb-2">
                {INVESTMENT_ASK.equityOffered}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Equity in <strong className="text-white">{INVESTMENT_ASK.entity}</strong> — not a
                single opco — so the investor shares in the consolidated continental platform.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0">
              <div className="text-[10px] tracking-[2px] text-[#737373] mb-2">GOVERNANCE</div>
              <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-2">
                Board seat
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{INVESTMENT_ASK.boardNote}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black">
              Use of investment capital
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {INVESTMENT_ASK.useOfFunds.map((u) => (
              <div
                key={u.label}
                className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 min-w-0"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tighter text-black tabular-nums">
                    {u.pct}%
                  </span>
                  <span className="text-sm font-semibold text-[#404040]">{u.label}</span>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed">{u.detail}</p>
              </div>
            ))}
          </div>
          {/* Visual bar */}
          <div className="h-3 sm:h-4 rounded-full overflow-hidden flex border border-black/10">
            <div
              className="bg-slate-500 h-full"
              style={{ width: "10%" }}
              title="10% operational costs"
            />
            <div
              className="bg-amber-500 h-full"
              style={{ width: "90%" }}
              title="90% asset acquisition & product development"
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-[#737373]">
            <span>
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-500 mr-1.5 align-middle" />
              10% operational costs
            </span>
            <span>
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500 mr-1.5 align-middle" />
              90% asset acquisition & product development
            </span>
          </div>
        </div>
      </section>

      {/* Africa problems */}
      <section id="problems" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8 max-w-3xl">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] mb-2">
            CONTINENTAL CONTEXT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance">
            Problems in Africa — and how the Group answers
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
            Credible public sources frame the need. Each problem maps to opcos that address it in the
            model.
          </p>
        </div>

        <div className="space-y-5">
          {AFRICA_PROBLEMS.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-7 md:p-8 min-w-0"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">{p.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {p.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-[#fafafa] border border-black/5 px-3 py-3 min-w-0"
                  >
                    <div className="text-xl sm:text-2xl font-semibold tracking-tighter text-black tabular-nums">
                      {s.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#525252] mt-1 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#404040] leading-relaxed mb-3">{p.narrative}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.opcos.map((slug) => {
                  const op = OPCO_MODELS.find((o) => o.slug === slug);
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => {
                        setOpenSlug(slug);
                        document.getElementById("opcos")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-[11px] font-semibold rounded-full px-2.5 py-1 border border-black/10"
                      style={{ color: op?.color ?? "#111" }}
                    >
                      {op?.name ?? slug}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {p.sources.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#0369a1] underline underline-offset-2"
                  >
                    {s.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Group rollup table */}
      <section id="rollup" className="scroll-mt-28 bg-white border-y border-black/10 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <LineChart className="w-5 h-5 text-amber-700" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black">
              Consolidated group revenue (USD · illustrative)
            </h2>
          </div>
          <p className="text-sm text-[#525252] mb-6 max-w-2xl leading-relaxed">
            Sum of opco scenario run-rates in <strong className="text-black">United States dollars
            (USD)</strong>. Switch scenario above. Figures are model outputs for discussion under NDA
            — not commitments.
          </p>

          <div className="overflow-x-auto -mx-1 px-1 rounded-2xl border border-black/10">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="bg-[#0a0a0a] text-white/80 text-[10px] sm:text-xs tracking-[1px]">
                  <th className="py-3 px-3 sm:px-4 font-semibold">Opco</th>
                  <th className="py-3 px-3 font-semibold">Avenue</th>
                  <th className="py-3 px-3 font-semibold text-right">Y5 · Cons. (USD)</th>
                  <th className="py-3 px-3 font-semibold text-right">Y5 · Mod. (USD)</th>
                  <th className="py-3 px-3 font-semibold text-right">Y5 · Agg. (USD)</th>
                  <th className="py-3 px-3 font-semibold text-right">Y10 · Mod. (USD)</th>
                </tr>
              </thead>
              <tbody className="text-[#404040]">
                {OPCO_MODELS.map((o) => (
                  <tr key={o.slug} className="border-t border-black/5 hover:bg-[#fafafa]">
                    <td className="py-3 px-3 sm:px-4 font-semibold text-black whitespace-nowrap">
                      <button
                        type="button"
                        className="hover:underline"
                        onClick={() => {
                          setOpenSlug(o.slug);
                          document.getElementById("opcos")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {o.name}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-xs sm:text-sm max-w-[12rem] truncate">
                      {o.avenue}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                      {formatUSDm(o.scenarios.conservative.y5RevenueUSDm)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm font-medium text-black">
                      {formatUSDm(o.scenarios.moderate.y5RevenueUSDm)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                      {formatUSDm(o.scenarios.aggressive.y5RevenueUSDm)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                      {formatUSDm(o.scenarios.moderate.y10RevenueUSDm)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-black/15 bg-amber-50/50 font-semibold text-black">
                  <td className="py-3 px-3 sm:px-4" colSpan={2}>
                    Group total (sum of opcos)
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                    {formatUSDm(sumScenario("conservative", "y5"))}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                    {formatUSDm(sumScenario("moderate", "y5"))}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                    {formatUSDm(sumScenario("aggressive", "y5"))}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-xs sm:text-sm">
                    {formatUSDm(sumScenario("moderate", "y10"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[#737373] mt-3 leading-relaxed">
            Selected scenario totals: Y5 {formatUSDm(y5)} · Y10 {formatUSDm(y10)} (
            {SCENARIO_META[scenario].label.toLowerCase()}).
          </p>
        </div>
      </section>

      {/* Opco detail */}
      <section id="opcos" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Opco detail — current traction & future scenarios
        </h2>
        <p className="text-sm text-[#525252] mb-8 max-w-2xl leading-relaxed">
          Expand each company for current state, continental future state, and all three penetration
          scenarios. Active scenario for highlight:{" "}
          <strong className="text-black">{SCENARIO_META[scenario].label}</strong>.
        </p>

        <div className="space-y-3">
          {OPCO_MODELS.map((o) => {
            const open = openSlug === o.slug;
            const sc = o.scenarios[scenario];
            return (
              <div
                key={o.slug}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? null : o.slug)}
                  className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left p-4 sm:p-5 hover:bg-[#fafafa] transition-colors"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: o.color }}
                  />
                  <span className="font-semibold text-black text-base sm:text-lg min-w-0">
                    {o.fullName}
                  </span>
                  <span className="text-xs sm:text-sm text-[#737373] sm:ml-auto tabular-nums">
                    Y5 {formatUSDm(sc.y5RevenueUSDm)} · Y10 {formatUSDm(sc.y10RevenueUSDm)} ·{" "}
                    {SCENARIO_META[scenario].label}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-black/5 px-4 sm:px-5 pb-5 sm:pb-6 space-y-5">
                    <div>
                      <div className="text-[10px] tracking-[2px] text-[#737373] mb-1">AVENUE</div>
                      <p className="text-sm text-[#404040]">{o.avenue}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-[#fafafa] border border-black/5 p-4">
                        <div className="text-[10px] tracking-[2px] text-emerald-800 font-semibold mb-2">
                          CURRENT STATE · TRACTION
                        </div>
                        <p className="text-xs text-[#525252] mb-2">
                          <strong className="text-black">Markets:</strong> {o.currentState.markets}
                        </p>
                        <ul className="text-sm text-[#404040] space-y-1.5 list-disc pl-4">
                          {o.currentState.traction.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                        <p className="text-xs text-[#737373] mt-3">
                          <strong>Constraints:</strong> {o.currentState.constraints}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#0a0a0a] text-white p-4">
                        <div className="text-[10px] tracking-[2px] text-amber-400/90 font-semibold mb-2">
                          FUTURE STATE · CONTINENT
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed mb-3">{o.futureState}</p>
                        <p className="text-xs text-white/55 leading-relaxed">
                          <strong className="text-white/70">How we address problems:</strong>{" "}
                          {o.howWeAddress}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[36rem] text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="text-[10px] tracking-[1px] text-[#737373] border-b border-black/10">
                            <th className="py-2 pr-3 font-semibold">Scenario</th>
                            <th className="py-2 pr-3 font-semibold text-right">Y5</th>
                            <th className="py-2 pr-3 font-semibold text-right">Y10</th>
                            <th className="py-2 pr-3 font-semibold">Penetration</th>
                            <th className="py-2 font-semibold">S · E · E snapshot</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SCENARIOS.map((key) => {
                            const m = o.scenarios[key];
                            const active = key === scenario;
                            return (
                              <tr
                                key={key}
                                className={`border-t border-black/5 ${
                                  active ? "bg-amber-50/60" : ""
                                }`}
                              >
                                <td className="py-2.5 pr-3 font-semibold text-black whitespace-nowrap">
                                  {SCENARIO_META[key].label}
                                </td>
                                <td className="py-2.5 pr-3 text-right tabular-nums">
                                  {formatUSDm(m.y5RevenueUSDm)}
                                </td>
                                <td className="py-2.5 pr-3 text-right tabular-nums">
                                  {formatUSDm(m.y10RevenueUSDm)}
                                </td>
                                <td className="py-2.5 pr-3 text-[#404040] max-w-[10rem]">
                                  {m.penetration}
                                </td>
                                <td className="py-2.5 text-[#404040] max-w-[16rem]">
                                  <span className="text-[11px] block">
                                    <strong>S:</strong> {m.social}
                                  </span>
                                  <span className="text-[11px] block">
                                    <strong>E:</strong> {m.economic}
                                  </span>
                                  <span className="text-[11px] block">
                                    <strong>Env:</strong> {m.environmental}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <Link
                      href={`/${o.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
                    >
                      Open public {o.name} page
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Triple bottom line */}
      <section id="impact" className="scroll-mt-28 bg-[#0a0a0a] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 text-balance">
            Consolidated impact — social, economic, environmental
          </h2>
          <p className="text-sm text-white/55 mb-8 max-w-2xl leading-relaxed">
            How the Group creates value beyond revenue. Scenario intensity scales reach; the logic
            of impact remains consistent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "social" as const, icon: Users },
              { key: "economic" as const, icon: Globe2 },
              { key: "environmental" as const, icon: Recycle },
            ].map(({ key, icon: Icon }) => {
              const block = GROUP_IMPACT_PILLARS[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 min-w-0"
                >
                  <Icon className="w-6 h-6 text-amber-300 mb-3" />
                  <h3 className="text-lg font-semibold mb-3">{block.title}</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    {block.items.map((item) => (
                      <li key={item} className="leading-relaxed flex gap-2">
                        <Leaf className="w-3.5 h-3.5 shrink-0 mt-1 text-emerald-400/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12 sm:py-16 border-t border-black/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
            Diligence-grade data room
          </h2>
          <p className="text-sm sm:text-base text-[#525252] mb-8 leading-relaxed">
            Financial models with sensitivities, unit economics, pipeline and legal packs are shared
            under NDA — not on this portal alone.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "Investor data room — Big Five Group"
            )}&body=${encodeURIComponent(
              `Hello Big Five team,\n\nI am signed into the investor portal as ${email}.\nPlease share diligence materials under NDA.\n\nOrganisation:\nFocus areas:\nScenario interest (conservative / moderate / aggressive):\n\nThank you.`
            )}`}
            className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold"
          >
            Email {CONTACT_EMAIL}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
