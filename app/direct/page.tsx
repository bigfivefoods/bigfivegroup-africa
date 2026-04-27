"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DirectPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#1e40af]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#93c5fd] text-xs tracking-[4px] mb-6">PILLAR 03 • DIRECT MARKET ACCESS</div>
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Big Five Direct
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            Cutting out middlemen. Connecting African producers directly to markets, buyers, and capital.
          </p>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
            ACCESS DIRECT MARKETS
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Direct. Transparent. Powerful.</h2>
          <p className="text-xl text-[#525252]">We eliminate inefficiencies and put more money in the hands of African producers.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">How It Works</h3>
            <ul className="space-y-4 text-[#404040]">
              <li>• Direct buyer-producer matching platform</li>
              <li>• Real-time pricing and demand visibility</li>
              <li>• On-chain contract and payment systems</li>
              <li>• Logistics and cold-chain coordination</li>
              <li>• Quality certification & traceability</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">Impact</h3>
            <div className="text-6xl font-semibold tracking-tighter text-[#1e40af] mb-2">34%</div>
            <div className="text-xl text-[#171717] mb-8">Higher prices for producers</div>
            
            <div className="text-6xl font-semibold tracking-tighter text-[#1e40af] mb-2">R1.2B</div>
            <div className="text-xl text-[#171717]">Direct trade volume facilitated</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Go direct with Big Five Direct</h2>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-[#93c5fd] text-black px-10 py-4 rounded-full text-lg font-semibold">
            JOIN THE DIRECT NETWORK
          </Link>
        </div>
      </section>
    </div>
  );
}
