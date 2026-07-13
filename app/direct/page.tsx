"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Sun,
  MapPin,
  Coins,
  Network,
  Package,
  Users,
  BarChart3,
  Zap,
} from "lucide-react";

const model = [
  {
    icon: Sun,
    title: "Solar Micro-Hubs",
    desc: "IoT-enabled, solar-powered hubs in underserved areas — cold chain, storage, and digital commerce under one roof.",
  },
  {
    icon: Network,
    title: "Direct Matching",
    desc: "AI-powered platform connects producers to verified buyers in real time with transparent fees — max 8%.",
  },
  {
    icon: Package,
    title: "Last-Mile Logistics",
    desc: "Containerised distribution points and coordinated logistics that cut spoilage and middleman leakage.",
  },
  {
    icon: Coins,
    title: "Value Retention",
    desc: "Producers keep up to 92% of value. Working capital and training travel with market access.",
  },
];

const steps = [
  {
    step: "01",
    title: "Hub Activation",
    desc: "Deploy solar-powered micro-hubs that create 20+ local jobs each and become community economic nodes.",
  },
  {
    step: "02",
    title: "Direct Matching",
    desc: "Live inventory, quality proofs, and buyer demand meet on one platform — contracts settle with on-chain visibility.",
  },
  {
    step: "03",
    title: "Scale & Replicate",
    desc: "Proven unit economics with ~14-month payback. Expanding from 340+ hubs toward 2,000 by 2028.",
  },
];

export default function DirectPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[min(100dvh,820px)] flex items-center justify-center overflow-hidden bg-[#1e3a8a]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        <div className="relative z-10 max-w-4xl px-6 text-center py-24">
          <div className="text-[#93c5fd] text-xs tracking-[4px] mb-6">
            PILLAR 03 · DIRECT MARKET ACCESS
          </div>
          <h1 className="text-white text-[clamp(2.5rem,7vw,4.5rem)] font-semibold tracking-tighter leading-[0.95] mb-6">
            Big Five Direct
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-white/90 font-light tracking-tight mb-10">
            From farm gate to market gate. No middlemen. Pure value for African producers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              ACCESS DIRECT MARKETS
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#model"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/35 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              THE DIRECT MODEL
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-24 text-center">
        <div className="text-xs tracking-[3px] text-[#1e40af] mb-4">Direct. Transparent. Powerful.</div>
        <h2 className="section-heading text-black mb-6">
          Cut the middle. Keep the margin.
        </h2>
        <p className="text-lg sm:text-xl text-[#525252] max-w-3xl mx-auto">
          Big Five Direct eliminates inefficiencies between African producers and markets —
          through micro-franchise hubs, digital matching, and logistics that put more money in farmers&apos; hands.
        </p>
      </section>

      {/* MODEL */}
      <section id="model" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[3px] text-[#1e40af] mb-4">The Infrastructure</div>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
              Micro-hubs that move markets
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {model.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#fafafa] border border-black/10 rounded-3xl p-8 sm:p-10"
              >
                <item.icon className="w-10 h-10 text-[#1e40af] mb-5" />
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-3">{item.title}</h4>
                <p className="text-[#404040] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#1e40af] mb-4">How It Works</div>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
            Three steps to sovereignty
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
              <div className="text-4xl font-light text-[#1e40af] tracking-tighter">{s.step}</div>
              <div>
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-2">{s.title}</h4>
                <p className="text-[#525252] text-lg">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[#1e3a8a] py-20 sm:py-24 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[3px] text-[#93c5fd] mb-4">Impact</div>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter">
              Numbers that travel last mile
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl font-semibold tracking-tighter mb-2">34%</div>
              <div className="text-white/85 text-sm">Higher prices for producers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl font-semibold tracking-tighter mb-2">R1.2B</div>
              <div className="text-white/85 text-sm">Direct trade volume</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl font-semibold tracking-tighter mb-2">47.8k</div>
              <div className="text-white/85 text-sm">Direct jobs created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-5xl font-semibold tracking-tighter mb-2">13</div>
              <div className="text-white/85 text-sm">Countries active</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#1e40af] mb-4">Who We Serve</div>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black">
            Built for producers, markets & investors
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <Users className="w-10 h-10 text-[#1e40af] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For Small Producers</h4>
            <p className="text-[#525252]">
              Keep 92% of value. Access working capital, training, and markets without predatory intermediaries.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <MapPin className="w-10 h-10 text-[#1e40af] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For Urban Markets</h4>
            <p className="text-[#525252]">
              Reliable, traceable supply at competitive prices with volume guarantees and quality CoAs.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-8">
            <BarChart3 className="w-10 h-10 text-[#1e40af] mb-5" />
            <h4 className="text-xl font-semibold mb-3">For Investors</h4>
            <p className="text-[#525252]">
              Asset-backed infrastructure with measurable job creation and proven unit economics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 sm:py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <Zap className="w-12 h-12 text-[#93c5fd] mx-auto mb-6" />
          <h2 className="text-white text-4xl sm:text-5xl font-semibold tracking-tighter mb-6">
            Go direct with Big Five Direct
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Join the network of hubs, producers, and buyers building last-mile sovereignty across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 bg-[#93c5fd] text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              JOIN THE DIRECT NETWORK
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/agri"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              <Truck className="w-5 h-5" />
              Partner with Agri
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
