"use client";

import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Download,
  GraduationCap,
  Heart,
  Landmark,
  Lightbulb,
  Network,
  Package,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { NFNSP, NFNSP_PROPOSAL_NAV } from "../lib/nfnspPartnership";
import NfnspAskForm from "./NfnspAskForm";

const GOLD = "#C4923A";
const FOREST = "#0F3D38";
const CREAM = "#F7F1E6";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] sm:text-xs tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
      {children}
    </div>
  );
}

function Source({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-[#737373] mt-1 leading-relaxed">{children}</p>;
}

function GoldRule({ className = "mb-4" }: { className?: string }) {
  return <div className={`h-px w-14 ${className}`} style={{ backgroundColor: GOLD }} />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] tracking-[1.2px] font-semibold uppercase"
      style={{ color: FOREST, backgroundColor: CREAM, border: "1px solid rgba(196,146,58,0.4)" }}
    >
      {children}
    </span>
  );
}

function DownloadBtn({ light }: { light?: boolean }) {
  return (
    <a
      href="/api/partner/nfnsp-proposal"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
        light
          ? "bg-white text-black hover:bg-[#E8C07A]"
          : "text-white"
      }`}
      style={light ? undefined : { backgroundColor: GOLD }}
    >
      <Download className="w-4 h-4" />
      {NFNSP.pdfLabel}
    </a>
  );
}

const OFFER_ICONS = {
  plate: Package,
  chain: Network,
  node: Landmark,
  mandate: ShieldCheck,
} as const;

export default function NfnspBriefing() {
  return (
    <div id="nfnsp-briefing" className="w-full">
      {/* Hub */}
      <section
        id="nfnsp-hub"
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden text-white py-14 sm:py-18 md:py-20"
      >
        <Image
          src="/og/home.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1C22]/82" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>{NFNSP.kicker}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance max-w-3xl mb-3">
            {NFNSP.title}
          </h2>
          <p className="text-white/75 text-base sm:text-lg max-w-3xl mb-8">{NFNSP.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {NFNSP.stats.map((s) => (
              <article
                key={s.value}
                className="rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm p-5"
              >
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter" style={{ color: "#E8C07A" }}>
                  {s.value}
                </div>
                <p className="text-sm text-white/85 mt-2 leading-relaxed">{s.label}</p>
                <Source>{s.source}</Source>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {NFNSP.offers.map((o) => {
              const Icon = OFFER_ICONS[o.id];
              return (
                <article key={o.id} className="rounded-2xl border border-white/12 bg-white/5 p-5">
                  <Icon className="w-5 h-5 mb-3" style={{ color: "#E8C07A" }} />
                  <div className="text-[10px] tracking-[2px] font-semibold mb-1" style={{ color: "#E8C07A" }}>
                    {o.kicker}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{o.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{o.desc}</p>
                </article>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="#proposal"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold px-5 py-3 text-sm hover:bg-[#E8C07A]"
            >
              Read the proposal
              <ArrowRight className="w-4 h-4" />
            </a>
            <DownloadBtn light />
            <a
              href="#ask"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-5 py-3 text-sm hover:bg-white/10"
            >
              90-day ask
            </a>
          </div>
          <p className="text-xs text-white/55 max-w-3xl leading-relaxed">{NFNSP.honestyLine}</p>
        </div>
      </section>

      {/* Proposal */}
      <section id="proposal" className="scroll-mt-28 border-b border-black/10 bg-white py-14 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>PROPOSAL · SECTIONED LONG-READ</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 max-w-3xl">
            Implementation Partnership Proposal — NFNSP-2 2027–2037
          </h2>
          <p className="text-sm text-[#525252] max-w-3xl mb-8 leading-relaxed">
            Confidential partner briefing. Official statistics carry a source. Group figures carry a
            plan / programme-reported / product specification / internal comparison label. Fifteen
            sections — executive summary through conclusion.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
            {NFNSP_PROPOSAL_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#F7F1E6]"
                  style={{ border: "1px solid rgba(196,146,58,0.28)" }}
                >
                  <span className="text-[10px] tracking-[2px] font-semibold" style={{ color: GOLD }}>
                    {item.n}
                  </span>
                  <span className="text-sm font-semibold text-black">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <DownloadBtn />
        </div>
      </section>

      <section id="exec-summary" className="scroll-mt-28 border-b border-black/10 py-14 sm:py-16" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>01 · EXECUTIVE SUMMARY</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-6 max-w-3xl">
            A Plan with targets — an implementation partner with a circuit
          </h2>
          <blockquote
            className="rounded-2xl p-5 sm:p-7 mb-8 max-w-4xl"
            style={{ backgroundColor: FOREST }}
          >
            <p className="text-base sm:text-lg leading-relaxed italic" style={{ color: "#E8C07A" }}>
              {NFNSP.execSummaryLead}
            </p>
          </blockquote>
          <ul className="space-y-5 max-w-3xl">
            {NFNSP.execSummary.map((p) => (
              <li key={p.slice(0, 40)} className="text-sm sm:text-base text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why-now" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>02 · WHY NOW</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8">
            The Plan’s own numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NFNSP.whyNow.map((w) => (
              <article key={w.t} className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
                <h3 className="text-base font-semibold text-black mb-2">{w.t}</h3>
                <p className="text-sm text-[#404040] leading-relaxed">{w.d}</p>
                <Source>{w.source}</Source>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-black/10 p-5">
            <div className="text-[10px] tracking-[2px] font-semibold mb-3" style={{ color: GOLD }}>
              GHS 2024 · WORST PROVINCES
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {NFNSP.ghsWorst.map((g) => (
                <li key={g.province} className="text-sm">
                  <span className="font-semibold text-black">{g.province}</span>
                  <span className="text-[#525252]"> · {g.value}</span>
                </li>
              ))}
            </ul>
            <Source>GHS 2024, as cited in NFNSP-2</Source>
          </div>
        </div>
      </section>

      <section id="reading-the-plan" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>03 · READING THE PLAN</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            Draft 2 (July 2026) and the 27 August Framework
          </h2>
          <ul className="space-y-3 max-w-3xl">
            {NFNSP.readingThePlan.map((p) => (
              <li key={p.slice(0, 32)} className="text-sm text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="group-purpose" className="scroll-mt-28 border-b border-black/10 bg-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>04 · VISION · MISSION · VALUES</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-4 max-w-3xl">
            The north star this partnership already answers to
          </h2>
          <blockquote
            className="rounded-2xl p-5 sm:p-7 mb-8 max-w-4xl"
            style={{ backgroundColor: FOREST }}
          >
            <p className="text-base sm:text-lg leading-relaxed italic" style={{ color: "#E8C07A" }}>
              {NFNSP.groupPurposeLead}
            </p>
          </blockquote>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {[
              { icon: Compass, block: NFNSP.vision },
              { icon: Target, block: NFNSP.mission },
              { icon: Shield, block: NFNSP.valuesIntro },
            ].map(({ icon: Icon, block }) => (
              <article
                key={block.kicker}
                className="rounded-2xl p-5 sm:p-7 bg-[#fafafa]"
                style={{ border: "1px solid rgba(196,146,58,0.35)", borderTop: `4px solid ${FOREST}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4" style={{ color: GOLD }} aria-hidden />
                  <span className="text-[10px] tracking-[2px] font-semibold" style={{ color: GOLD }}>
                    {block.kicker.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-black mb-3">{block.title}</h3>
                <p className="text-sm text-[#404040] leading-relaxed">{block.body}</p>
              </article>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-black mb-4">Five values — how each shows up on the Plan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {NFNSP.values.map((v, i) => {
              const Icon = [Users, Lightbulb, Shield, Sparkles, Heart][i] ?? Sparkles;
              return (
                <article
                  key={v.title}
                  className="rounded-2xl bg-white p-4 sm:p-5"
                  style={{ border: "1px solid rgba(196,146,58,0.3)", borderLeft: `4px solid ${FOREST}` }}
                >
                  <Icon className="w-5 h-5 mb-2" style={{ color: GOLD }} aria-hidden />
                  <h4 className="text-sm font-semibold text-black mb-1">{v.title}</h4>
                  <p className="text-xs text-[#525252] leading-relaxed mb-3">{v.desc}</p>
                  <p className="text-xs leading-relaxed" style={{ color: FOREST }}>
                    {v.nda}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="missions"
        className="scroll-mt-28 border-b border-black/10 py-14 sm:py-16"
        style={{ backgroundColor: CREAM }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>05 · FEED · EDUCATE · EMPOWER</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 max-w-3xl">
            How the Group mission serves the Department’s Goals
          </h2>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl mb-10 leading-relaxed">
            Feed · Educate · Empower is not a slogan beside the Plan. It is the way nine pillars
            become one delivery against Goals 1–3 and Enablers A–C.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
            {NFNSP.missions.map((m) => {
              const Icon =
                m.id === "feed" ? UtensilsCrossed : m.id === "educate" ? GraduationCap : Zap;
              return (
                <article
                  key={m.id}
                  className="rounded-2xl bg-white p-5 sm:p-7"
                  style={{ border: "1px solid rgba(196,146,58,0.35)" }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: FOREST, color: "#E8C07A" }}
                  >
                    <Icon className="w-5 h-5" aria-hidden />
                  </div>
                  <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                    {m.n} · {m.title.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-black mb-2">{m.title}</h3>
                  <p className="text-sm text-[#404040] leading-relaxed mb-4">{m.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {m.pillars.map((p) => (
                      <Pill key={p}>{p}</Pill>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed pl-3 border-l-2" style={{ borderColor: GOLD, color: FOREST }}>
                    {m.nda}
                  </p>
                </article>
              );
            })}
          </div>
          <article
            className="rounded-2xl p-5 sm:p-7"
            style={{ backgroundColor: FOREST }}
          >
            <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: "#E8C07A" }}>
              CROSS-CUTTING
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{NFNSP.missionsCross.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-3">{NFNSP.missionsCross.blurb}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {NFNSP.missionsCross.pillars.map((p) => (
                <Pill key={p}>{p}</Pill>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#E8C07A" }}>
              {NFNSP.missionsCross.nda}
            </p>
          </article>
        </div>
      </section>

      <section id="plan-goals" className="scroll-mt-28 border-b border-black/10 bg-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>06 · NDA GOALS AND OBJECTIVES</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 max-w-4xl">
            Official Goals and Game Changers — and how Big Five answers each
          </h2>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl mb-10 leading-relaxed">
            Titles below are the Plan’s own, from NFNSP-2 Draft 2 (July 2026) and the Results
            Framework of 27 August 2026. This is not a substitute for those documents. Each Game
            Changer is answered with named pillars, labelled Group figures, and an explicit limit
            where the lead sits with Treasury, DoH, DSD, SASSA, COGTA or SALGA.
          </p>
          <div className="space-y-12 mb-12">
            {NFNSP.planGoals.map((g) => (
              <article key={g.id} id={g.id} className="scroll-mt-28">
                <div
                  className="rounded-2xl p-5 sm:p-7 mb-5"
                  style={{ backgroundColor: FOREST }}
                >
                  <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: "#E8C07A" }}>
                    {g.n.toUpperCase()}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">
                    {g.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">{g.rationale}</p>
                  <p className="text-xs text-white/55 leading-relaxed">{g.lead}</p>
                  <p className="text-[11px] text-white/45 mt-1 leading-relaxed">{g.source}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {g.pillars.map((p) => (
                      <Pill key={p}>{p}</Pill>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  {g.gameChangers.map((gc) => (
                    <div
                      key={gc.id}
                      className="rounded-2xl bg-[#fafafa] p-5 sm:p-6"
                      style={{ border: "1px solid rgba(196,146,58,0.35)", borderLeft: `4px solid ${FOREST}` }}
                    >
                      <div className="flex flex-wrap items-baseline gap-3 mb-3">
                        <span className="text-[10px] tracking-[2px] font-semibold" style={{ color: GOLD }}>
                          GAME CHANGER {gc.n}
                        </span>
                        <h4 className="text-lg font-semibold tracking-tight text-black">{gc.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="rounded-xl bg-white border border-black/8 p-4 sm:p-5">
                          <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                            THE PLAN ASKS
                          </div>
                          <p className="text-sm text-black leading-relaxed mb-3">{gc.planAsks}</p>
                          <p className="text-xs text-[#525252] leading-relaxed">{gc.targets}</p>
                        </div>
                        <div className="rounded-xl bg-white border border-black/8 p-4 sm:p-5">
                          <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                            HOW BIG FIVE ACHIEVES IT
                          </div>
                          <ul className="space-y-2 mb-3">
                            {gc.weDeliver.map((line) => (
                              <li
                                key={line.slice(0, 48)}
                                className="text-sm text-[#404040] leading-relaxed pl-3 border-l-2"
                                style={{ borderColor: GOLD }}
                              >
                                {line}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs leading-relaxed" style={{ color: FOREST }}>
                            {gc.limit}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {gc.pillars.map((p) => (
                          <Pill key={p}>{p}</Pill>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">Enablers A–C — official titles</h3>
          <p className="text-sm text-[#525252] mb-5 max-w-3xl leading-relaxed">
            Enabler B is resourcing. Enabler C is capacity, innovation and data (MELIA). How we
            operationalise each Game Changer follows in the circuit chapter.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {NFNSP.planEnablers.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(196,146,58,0.3)", borderLeft: `4px solid ${FOREST}` }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                  {e.n.toUpperCase()}
                </div>
                <h3 className="text-base font-semibold text-black mb-2">{e.title}</h3>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">{e.rationale}</p>
                <p className="text-xs text-[#737373] leading-relaxed mb-4">{e.lead}</p>
                <div className="flex flex-wrap gap-2">
                  {e.pillars.map((p) => (
                    <Pill key={p}>{p}</Pill>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">Plan horizons from the Results Framework</caption>
              <thead>
                <tr className="bg-[#F7F1E6] border-b border-black/10">
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    HORIZON
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    SMALLHOLDER PROCUREMENT
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    FIRST 1 000 DAYS
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    HUBS AND MARKETS
                  </th>
                </tr>
              </thead>
              <tbody>
                {NFNSP.horizons.map((h) => (
                  <tr key={h.year} className="border-b border-black/10 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold">{h.year}</td>
                    <td className="px-4 py-3 text-sm">{h.smallholder}</td>
                    <td className="px-4 py-3 text-sm text-[#525252]">{h.feeding}</td>
                    <td className="px-4 py-3 text-sm text-[#525252]">{h.hubs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>
            Results Framework 27 August 2026 — Plan targets, not Group delivery claims. Several
            Framework cells remain XX and are not invented here.
          </Source>
        </div>
      </section>

      <section
        id="how-we-deliver"
        className="scroll-mt-28 border-b border-black/10 py-14 sm:py-16"
        style={{ backgroundColor: CREAM }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>07 · HOW THE GROUP WORKS AS ONE</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-4 max-w-3xl">
            {NFNSP.systemFlow.title}
          </h2>
          <blockquote
            className="rounded-2xl p-5 sm:p-7 mb-8 max-w-4xl"
            style={{ backgroundColor: FOREST }}
          >
            <p className="text-base sm:text-lg leading-relaxed italic" style={{ color: "#E8C07A" }}>
              {NFNSP.coherenceLead}
            </p>
          </blockquote>
          <ul className="space-y-4 max-w-3xl mb-10">
            {NFNSP.coherence.map((p) => (
              <li key={p.slice(0, 40)} className="text-sm sm:text-base text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
            {NFNSP.systemFlow.steps.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl bg-white p-4"
                style={{ border: "1px solid rgba(196,146,58,0.4)" }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                  {s.n}
                </div>
                <h3 className="text-base font-semibold text-black mb-1">{s.t}</h3>
                <p className="text-xs text-[#404040] leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold text-black mb-4">Enablers A–C — how we operationalise each Game Changer</h3>
          <div className="space-y-8">
            {NFNSP.planEnablers.map((e) => (
              <div key={e.id}>
                <h4 className="text-base font-semibold text-black mb-1">
                  {e.n} · {e.title}
                </h4>
                <p className="text-sm text-[#525252] mb-4 max-w-3xl leading-relaxed">{e.rationale}</p>
                <div className="space-y-4">
                  {e.gameChangers.map((gc) => (
                    <article
                      key={gc.id}
                      className="rounded-2xl bg-white p-5 sm:p-6"
                      style={{ border: "1px solid rgba(196,146,58,0.3)", borderLeft: `4px solid ${FOREST}` }}
                    >
                      <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                        {gc.n} · {gc.title.toUpperCase()}
                      </div>
                      <p className="text-sm text-[#404040] leading-relaxed mb-3">{gc.planAsks}</p>
                      <ul className="space-y-2 mb-3">
                        {gc.weDeliver.map((line) => (
                          <li
                            key={line.slice(0, 48)}
                            className="text-sm text-[#404040] leading-relaxed pl-3 border-l-2"
                            style={{ borderColor: GOLD }}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: FOREST }}>
                        {gc.limit}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gc.pillars.map((p) => (
                          <Pill key={p}>{p}</Pill>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pillars" className="scroll-mt-28 border-b border-black/10 bg-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>08 · NINE PILLARS · ONE CIRCUIT</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 max-w-3xl">
            Feed · Educate · Empower — mapped to the Plan
          </h2>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl mb-8 leading-relaxed">
            Nine companies, one delivery. Each pillar has a job on Goals 1–3 and Enablers A–C.
            Global is held until a closed KwaZulu-Natal circuit — not a current scale claim.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {NFNSP.pillars.map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl bg-[#fafafa] p-5"
                style={{ border: "1px solid rgba(196,146,58,0.28)" }}
              >
                <div className="text-[10px] tracking-[2px] font-semibold mb-1" style={{ color: GOLD }}>
                  {p.mission.toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{p.name}</h3>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">{p.serves}</p>
                <p className="text-xs font-medium leading-relaxed" style={{ color: FOREST }}>
                  {p.nda}
                </p>
              </article>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-black mb-4">Where each pillar sits on the Plan</h3>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(196,146,58,0.35)" }}>
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">Pillar contribution matrix against NFNSP-2 goals and enablers</caption>
              <thead>
                <tr className="border-b border-black/10" style={{ backgroundColor: CREAM }}>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    PILLAR
                  </th>
                  {NFNSP.pillarMatrix.cols.map((col) => (
                    <th key={col.id} className="px-3 py-3 text-[10px] tracking-[1.5px] text-center" style={{ color: GOLD }}>
                      {col.label.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NFNSP.pillarMatrix.rows.map((row) => (
                  <tr key={row.name} className="border-b border-black/10 last:border-0">
                    <td className="px-4 py-2.5 text-sm font-semibold text-black">{row.name}</td>
                    {row.marks.map((on, i) => (
                      <td key={NFNSP.pillarMatrix.cols[i].id} className="px-3 py-2.5 text-center">
                        {on ? (
                          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
                        ) : (
                          <span className="text-[#d4d4d4]">–</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>{NFNSP.pillarMatrix.note}</Source>
        </div>
      </section>

      <section id="who-we-are" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>09 · WHO WE ARE</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            Big Five Group — implementation partner
          </h2>
          <ul className="space-y-3 max-w-3xl">
            {NFNSP.whoWeAre.map((p) => (
              <li key={p.slice(0, 32)} className="text-sm text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="foods" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>10 · BIG FIVE FOODS</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-4">
            One SKU family for institutional plates
          </h2>
          <p className="text-sm text-[#525252] max-w-3xl mb-6 leading-relaxed">{NFNSP.foods.intro}</p>
          <article
            className="rounded-2xl p-5 sm:p-7 mb-6 max-w-4xl"
            style={{ backgroundColor: FOREST }}
          >
            <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: "#E8C07A" }}>
              MALNUTRITION PLATE
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2">
              {NFNSP.foods.instantPorridge.title}
            </h3>
            <p className="text-base font-semibold mb-3" style={{ color: "#E8C07A" }}>
              {NFNSP.foods.instantPorridge.prep}
            </p>
            <p className="text-sm text-white/80 leading-relaxed mb-2">
              {NFNSP.foods.instantPorridge.why}
            </p>
            <p className="text-[11px] text-white/45 leading-relaxed">{NFNSP.foods.instantPorridge.label}</p>
          </article>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NFNSP.foods.points.map((p) => (
              <li key={p.t} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold text-black mb-1">{p.t}</div>
                <Source>{p.label}</Source>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="os"
        className="scroll-mt-28 border-b border-black/10 text-white py-14 sm:py-16"
        style={{ backgroundColor: FOREST }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>11 · OPERATING SYSTEM</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-3 max-w-3xl">
            {NFNSP.os.headline}
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-3xl mb-4">{NFNSP.os.sub}</p>
          <p className="text-sm font-semibold mb-8 max-w-3xl" style={{ color: "#E8C07A" }}>
            {NFNSP.os.nonClaim}
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {NFNSP.os.modules.map((m) => (
              <span
                key={m}
                className="text-xs rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/85"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">Farm-to-fork actors</caption>
              <thead>
                <tr className="border-b border-white/15 bg-black/20">
                  <th className="px-4 py-3 text-[10px] tracking-[2px] text-[#E8C07A]">ACTOR</th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px] text-[#E8C07A]">ROLE</th>
                </tr>
              </thead>
              <tbody>
                {NFNSP.os.actors.map((a) => (
                  <tr key={a.actor} className="border-b border-white/10 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold align-top">{a.actor}</td>
                    <td className="px-4 py-3 text-sm text-white/75">{a.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="workstreams" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>12 · FIVE WORKSTREAMS</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8">A–E</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NFNSP.workstreams.map((w) => (
              <article
                key={w.id}
                className="rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(196,146,58,0.3)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mb-3"
                  style={{ backgroundColor: FOREST, color: "#E8C07A" }}
                >
                  {w.id}
                </div>
                <h3 className="text-base font-semibold text-black mb-2">{w.title}</h3>
                <p className="text-sm text-[#404040] leading-relaxed">{w.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demonstration" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>13 · DEMONSTRATION DESIGN</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            KZN first — then a second province
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
              <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                PHASE 1
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{NFNSP.demonstration.phase1}</p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
              <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                PHASE 2
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{NFNSP.demonstration.phase2}</p>
            </article>
          </div>
          <p className="text-sm font-semibold text-black mt-4">{NFNSP.demonstration.rule}</p>
        </div>
      </section>

      <section id="commercial" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>14 · COMMERCIAL MODEL</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
            Group figures — labelled
          </h2>
          <p className="text-sm text-[#525252] max-w-3xl mb-6">
            Not government contracts. Not current daily NSNP volumes.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NFNSP.commercial.map((c) => (
              <li key={c.t} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold text-black mb-1">{c.t}</div>
                <Source>{c.label}</Source>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="governance" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>15 · GOVERNANCE AND RISK</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            What this briefing is not
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">Risk register</caption>
              <thead>
                <tr className="bg-[#F7F1E6] border-b border-black/10">
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    RISK
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    MITIGATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {NFNSP.risks.map((r) => (
                  <tr key={r.risk} className="border-b border-black/10 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold align-top">{r.risk}</td>
                    <td className="px-4 py-3 text-sm text-[#404040]">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="ask" className="scroll-mt-28 border-b border-black/10 py-14 sm:py-16" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>16 · 90-DAY ASK</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8">
            Five asks — and what we return
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {NFNSP.asks.map((a) => (
              <li
                key={a.n}
                className="rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(196,146,58,0.3)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold mb-3"
                  style={{ backgroundColor: FOREST, color: "#E8C07A" }}
                >
                  {a.n}
                </div>
                <h3 className="text-base font-semibold text-black mb-2">{a.t}</h3>
                <p className="text-sm text-[#404040] leading-relaxed">{a.d}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border border-black/10 bg-white p-5 mb-10">
            <div className="text-[10px] tracking-[2px] font-semibold mb-3" style={{ color: GOLD }}>
              IN RETURN (90 DAYS)
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NFNSP.inReturn.map((x) => (
                <li key={x} className="text-sm text-[#404040]">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-4">Request a briefing</h3>
          <NfnspAskForm />
        </div>
      </section>

      <section id="conclusion" className="scroll-mt-28 border-b border-black/10 py-14 sm:py-16" style={{ backgroundColor: FOREST }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>17 · CONCLUSION</Eyebrow>
          <GoldRule />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-white mb-6">
            Targets, plates, a closed circuit
          </h2>
          <ul className="space-y-4 max-w-3xl mb-8">
            {NFNSP.conclusion.map((p) => (
              <li key={p.slice(0, 32)} className="text-sm sm:text-base text-white/80 leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
          <DownloadBtn light />
        </div>
      </section>
    </div>
  );
}
