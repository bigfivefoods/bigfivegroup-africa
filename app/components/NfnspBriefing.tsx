"use client";

import Image from "next/image";
import {
  ArrowRight,
  Download,
  Landmark,
  Network,
  Package,
  ShieldCheck,
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 max-w-3xl">
            Implementation Partnership Proposal — NFNSP-2 2027–2037
          </h2>
          <p className="text-sm text-[#525252] max-w-3xl mb-8 leading-relaxed">
            Confidential partner briefing. Do not invent figures. Official statistics carry a source
            label. Group figures carry a plan / programme-reported / internal label.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
            {NFNSP_PROPOSAL_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 hover:border-[#C4923A]/50"
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

      <section id="exec-summary" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>01 · EXECUTIVE SUMMARY</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6 max-w-3xl">
            Operationalise the Plan — plates, OS, demonstration
          </h2>
          <ul className="space-y-3 max-w-3xl">
            {NFNSP.execSummary.map((p) => (
              <li key={p.slice(0, 40)} className="text-sm text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why-now" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>02 · WHY NOW</Eyebrow>
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
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            Draft 2.2 and the 27 August Framework
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

      <section id="who-we-are" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>04 · WHO WE ARE</Eyebrow>
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

      <section id="foods" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>05 · BIG FIVE FOODS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-4">
            One SKU family for institutional plates
          </h2>
          <p className="text-sm text-[#525252] max-w-3xl mb-6 leading-relaxed">{NFNSP.foods.intro}</p>
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
          <Eyebrow>06 · OPERATING SYSTEM</Eyebrow>
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

      <section id="alignment" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>07 · ALIGNMENT</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            Goals 1–3 and Enablers A–C
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {NFNSP.alignment.map((a) => (
              <article key={a.goal} className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
                  {a.goal.toUpperCase()}
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">{a.d}</p>
              </article>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full min-w-[32rem] text-left">
              <caption className="sr-only">Plan horizons</caption>
              <thead>
                <tr className="bg-[#F7F1E6] border-b border-black/10">
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    HORIZON
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    SMALLHOLDER SHARE
                  </th>
                  <th className="px-4 py-3 text-[10px] tracking-[2px]" style={{ color: GOLD }}>
                    NOTE
                  </th>
                </tr>
              </thead>
              <tbody>
                {NFNSP.horizons.map((h) => (
                  <tr key={h.year} className="border-b border-black/10 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold">{h.year}</td>
                    <td className="px-4 py-3 text-sm">{h.smallholder}</td>
                    <td className="px-4 py-3 text-sm text-[#525252]">{h.feeding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>NFNSP-2 procurement horizons · complementary feeding 50% of high-risk areas by 2029</Source>
        </div>
      </section>

      <section id="workstreams" className="scroll-mt-28 border-b border-black/10 py-14" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>08 · FIVE WORKSTREAMS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8">A–E</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NFNSP.workstreams.map((w) => (
              <article key={w.id} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-2xl font-semibold tracking-tighter mb-2" style={{ color: GOLD }}>
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
          <Eyebrow>09 · DEMONSTRATION DESIGN</Eyebrow>
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
          <Eyebrow>10 · COMMERCIAL MODEL</Eyebrow>
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
          <Eyebrow>11 · GOVERNANCE AND RISK</Eyebrow>
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
          <Eyebrow>12 · 90-DAY ASK</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8">
            Five asks — and what we return
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {NFNSP.asks.map((a) => (
              <li key={a.n} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-[10px] tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
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

      <section id="conclusion" className="scroll-mt-28 border-b border-black/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>13 · CONCLUSION</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6">
            Targets, plates, a closed circuit
          </h2>
          <ul className="space-y-3 max-w-3xl mb-8">
            {NFNSP.conclusion.map((p) => (
              <li key={p.slice(0, 32)} className="text-sm text-[#404040] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
          <DownloadBtn />
        </div>
      </section>
    </div>
  );
}
