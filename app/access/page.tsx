"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AccessPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#7c3aed]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#c4b5fd] text-xs tracking-[4px] mb-6">PILLAR 04 • GOVERNMENT & INSTITUTIONAL ACCESS</div>
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Big Five Access
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            Unlocking government funding, institutional partnerships, and policy support across the African continent.
          </p>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
            ACCESS GOVERNMENT PROGRAMS
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Breaking Down Barriers</h2>
          <p className="text-xl text-[#525252]">We help organizations navigate complex government systems and unlock funding across Africa.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">What We Deliver</h3>
            <ul className="space-y-4 text-[#404040]">
              <li>• B-BBEE compliance & certification support</li>
              <li>• Government tender navigation</li>
              <li>• Policy advocacy & stakeholder engagement</li>
              <li>• Access to development finance institutions</li>
              <li>• Public-private partnership structuring</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">Proven Results</h3>
            <div className="text-6xl font-semibold tracking-tighter text-[#7c3aed] mb-2">R2.8B</div>
            <div className="text-xl text-[#171717] mb-8">Government contracts facilitated</div>
            
            <div className="text-6xl font-semibold tracking-tighter text-[#7c3aed] mb-2">47</div>
            <div className="text-xl text-[#171717]">Successful public-private partnerships</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Unlock government access with us</h2>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-[#c4b5fd] text-black px-10 py-4 rounded-full text-lg font-semibold">
            START YOUR ACCESS JOURNEY
          </Link>
        </div>
      </section>
    </div>
  );
}
