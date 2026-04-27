"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Wheat, Truck, Landmark, Link as LinkIcon, Award, Heart, Feather } from "lucide-react";
import { Company } from "../lib/companies";

export default function CompanyTemplate({ company }: { company: Company }) {
  const accent = company.color;

  const IconComponent = () => {
    switch (company.icon) {
      case "Leaf": return <Leaf size={56} />;
      case "Wheat": return <Wheat size={56} />;
      case "Truck": return <Truck size={56} />;
      case "Landmark": return <Landmark size={56} />;
      case "Link": return <LinkIcon size={56} />;
      case "Award": return <Award size={56} />;
      case "Heart": return <Heart size={56} />;
      case "Feather": return <Feather size={56} />;
      default: return <Leaf size={56} />;
    }
  };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[85dvh] flex items-center justify-center pt-10" style={{ background: `linear-gradient(180deg, #0a0a0a 0%, #111 100%)` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}15 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 mx-auto" style={{ backgroundColor: `${accent}20`, color: accent }}>
            <IconComponent />
          </div>
          <div className="uppercase tracking-[4px] text-xs mb-4" style={{ color: accent }}>BIG FIVE {company.name.toUpperCase()}</div>
          <h1 className="section-heading mb-6 text-balance" style={{ color: accent }}>{company.heroText}</h1>
          <p className="max-w-2xl mx-auto text-2xl text-white/70 tracking-tight mb-10">{company.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#how" className="premium-button inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-semibold">HOW IT WORKS</Link>
            <Link href="/connect" className="premium-button inline-flex items-center gap-3 border border-white/30 px-10 py-4 rounded-full font-semibold hover:bg-white/5">LAUNCH CONNECT</Link>
          </div>
        </div>
      </section>

      <section id="how" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-white/50">THE PROCESS</div>
          <h2 className="section-heading mt-3">How {company.name} Works</h2>
        </div>
        <div className="space-y-8">
          {company.howItWorks.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl font-light border" style={{ borderColor: accent, color: accent }}>{String(step.step).padStart(2, '0')}</div>
              <div className="flex-1 pt-1">
                <h3 className="text-4xl font-semibold tracking-tight mb-4">{step.title}</h3>
                <p className="text-xl text-white/70 leading-relaxed max-w-3xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 border-y border-white/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-white/50">WHO WE SERVE</div>
            <h2 className="section-heading mt-3">Built for Every Stakeholder</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {company.forStakeholders.map((stake, i) => (
              <div key={i} className="glass rounded-3xl p-9 border border-white/10 flex flex-col">
                <div className="text-2xl font-semibold tracking-tight mb-6" style={{ color: accent }}>{stake.title}</div>
                <p className="text-lg text-white/80 flex-1">{stake.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="uppercase tracking-[3px] text-xs mb-4" style={{ color: accent }}>MEASURABLE RESULTS</div>
        <h2 className="section-heading mb-8">The {company.name} Impact</h2>
        <div className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12">{company.impact}</div>
        <Link href="/connect" className="premium-button inline-flex items-center gap-4 bg-white text-black text-lg px-14 py-4 rounded-full font-semibold">JOIN THE MOVEMENT <ArrowRight /></Link>
      </section>

      <div className="border-t border-white/10 py-8 text-center">
        <Link href="/" className="text-sm text-white/50 hover:text-white inline-flex items-center gap-2">← BACK TO THE FULL ECOSYSTEM</Link>
      </div>
    </div>
  );
}
