"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Award, TrendingUp } from "lucide-react";

export default function ConnectPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0ea5e9]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#bae6fd] text-xs tracking-[4px] mb-6">PILLAR 05 • ON-CHAIN TRANSPARENCY</div>
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Big Five Connect
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            The transparent, on-chain platform connecting every pillar of the Big Five Group — from farm to fork, and from funding to impact.
          </p>
          <Link href="#launch" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
            LAUNCH CONNECT
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">One Platform. Complete Transparency.</h2>
          <p className="text-xl text-[#525252]">Every transaction, every impact, every meal — fully traceable on-chain.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">🔗</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">Full Traceability</h3>
            <p className="text-[#525252]">Track every rand, every meal, and every job created across the entire ecosystem.</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">📊</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">Real-Time Impact</h3>
            <p className="text-[#525252]">Live dashboards showing meals delivered, jobs created, and carbon saved.</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">🤝</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">Stakeholder Access</h3>
            <p className="text-[#525252]">Donors, governments, and partners get secure, verified access to impact data.</p>
          </div>
        </div>
      </section>

      {/* LAUNCH SECTION */}
      <section id="launch" className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#0ea5e9] text-xs tracking-[3px] mb-6">THE HEART OF THE ECOSYSTEM</div>
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">
            Ready to connect<br />with Africa’s future?
          </h2>
          <p className="text-white/80 text-xl mb-12">
            Join the transparent platform powering the entire Big Five Group.
          </p>
          <Link href="/" className="premium-button inline-flex items-center justify-center gap-3 bg-[#0ea5e9] text-white px-10 py-4 rounded-full text-lg font-semibold">
            LAUNCH CONNECT PLATFORM
          </Link>
        </div>
      </section>
    </div>
  );
}
