"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Landmark,
  FileCheck,
  Building2,
  Handshake,
  ShieldCheck,
  TrendingUp,
  Users,
  Scale,
} from "lucide-react";

const offerings = [
  {
    icon: FileCheck,
    title: "Tender & Bid Support",
    desc: "AI-assisted bid writing, compliance packs, and live tender tracking that cut response time by up to 70%.",
  },
  {
    icon: Scale,
    title: "B-BBEE & Policy Alignment",
    desc: "Structure programmes that meet transformation targets while delivering verifiable community impact.",
  },
  {
    icon: Building2,
    title: "DFI & Institutional Capital",
    desc: "Match verified African enterprises with development finance, CSI budgets, and sovereign funds.",
  },
  {
    icon: Handshake,
    title: "Public-Private Partnerships",
    desc: "Design bankable PPP structures with on-chain reporting and clear accountability for every stakeholder.",
  },
];

const steps = [
  {
    step: "01",
    title: "Verify & Onboard",
    desc: "Rigorous KYC, financials, and impact scoring. Every participant becomes a trusted node on the network.",
  },
  {
    step: "02",
    title: "Match & Apply",
    desc: "AI matches opportunities to capability. Automated bid support and real-time tracking keep you ahead.",
  },
  {
    step: "03",
    title: "Win & Deliver",
    desc: "Win rates 3.2× industry average. Full project management and on-chain impact reporting for funders.",
  },
];

export default function AccessPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[min(100dvh,820px)] flex items-center justify-center overflow-hidden bg-[#4c1d95]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        <div className="relative z-10 max-w-4xl px-6 text-center py-24">
          <div className="text-[#c4b5fd] text-xs tracking-[4px] mb-6">
            PILLAR 04 · GOVERNMENT & INSTITUTIONAL ACCESS
          </div>
          <h1 className="text-white text-[clamp(2.5rem,7vw,4.5rem)] font-semibold tracking-tighter leading-[0.95] mb-6">
            Big Five Access
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-white/90 font-light tracking-tight mb-10">
            Unlocking government funding, institutional partnerships, and policy support across the African continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              ACCESS PROGRAMMES
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/35 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              HOW IT WORKS
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-24 text-center">
        <div className="text-xs tracking-[3px] text-[#7c3aed] mb-4">Breaking Down Barriers</div>
        <h2 className="section-heading text-black mb-6">
          Capital should flow to verified impact
        </h2>
        <p className="text-lg sm:text-xl text-[#525252] max-w-3xl mx-auto">
          We help governments, corporates, and African enterprises navigate complex funding systems —
          so policy becomes projects, and projects become measurable outcomes.
        </p>
      </section>

      {/* OFFERINGS */}
      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[3px] text-[#7c3aed] mb-4">What We Deliver</div>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
              Sovereign capital, cleanly unlocked
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#fafafa] border border-black/10 rounded-3xl p-8 sm:p-10"
              >
                <item.icon className="w-10 h-10 text-[#7c3aed] mb-5" />
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-3">{item.title}</h4>
                <p className="text-[#404040] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#7c3aed] mb-4">The Process</div>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
            How Access Works
          </h3>
        </div>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col md:flex-row gap-6 md:gap-10 items-start bg-white border border-black/10 rounded-3xl p-8"
            >
              <div className="text-4xl font-light text-[#7c3aed] tracking-tighter">{s.step}</div>
              <div>
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-2">{s.title}</h4>
                <p className="text-[#525252] text-lg">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-[#4c1d95] py-20 sm:py-24 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[3px] text-[#c4b5fd] mb-4">Proven Results</div>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter">
              Access that compounds
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl sm:text-6xl font-semibold tracking-tighter mb-2">R2.8B</div>
              <div className="text-white/85">Contracts facilitated</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl sm:text-6xl font-semibold tracking-tighter mb-2">14.7k</div>
              <div className="text-white/85">SMEs onboarded</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl sm:text-6xl font-semibold tracking-tighter mb-2">92%</div>
              <div className="text-white/85">Repeat funding rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#7c3aed] mb-4">Who We Serve</div>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
            Built for every stakeholder
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <Landmark className="w-10 h-10 text-[#7c3aed] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For Government</h4>
            <p className="text-[#525252]">
              Clean, auditable supplier bases. Reduced corruption risk. Verified delivery on national programmes.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <ShieldCheck className="w-10 h-10 text-[#7c3aed] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For Corporations (CSI/ESG)</h4>
            <p className="text-[#525252]">
              High-impact projects with full traceability — every rand linked to outcomes, not just spend.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <Users className="w-10 h-10 text-[#7c3aed] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For SMEs & Cooperatives</h4>
            <p className="text-[#525252]">
              A level playing field. Access to capital and contracts that were previously out of reach.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 sm:py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <TrendingUp className="w-12 h-12 text-[#c4b5fd] mx-auto mb-6" />
          <h2 className="text-white text-4xl sm:text-5xl font-semibold tracking-tighter mb-6">
            Unlock government access with us
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Start your journey to verified capital, clean procurement, and institutional partnerships.
          </p>
          <Link
            href="/connect"
            className="premium-button inline-flex items-center justify-center gap-3 bg-[#c4b5fd] text-black px-10 py-4 rounded-full text-lg font-semibold"
          >
            START YOUR ACCESS JOURNEY
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
