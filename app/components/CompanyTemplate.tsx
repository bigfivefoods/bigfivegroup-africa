"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Company } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

export default function CompanyTemplate({ company }: { company: Company }) {
  const accent = company.color;

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <section
        className="relative min-h-[min(85dvh,720px)] flex items-center justify-center"
        style={{ background: `linear-gradient(180deg, #0a0a0a 0%, #111 100%)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${accent}20 0%, transparent 70%)`,
          }}
        />
        <div className="relative z-10 max-w-4xl px-6 text-center py-20">
          <div
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl mb-8 mx-auto"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            <CompanyIcon name={company.icon} size={48} />
          </div>
          <div
            className="uppercase tracking-[4px] text-xs mb-4"
            style={{ color: accent }}
          >
            BIG FIVE {company.name.toUpperCase()}
          </div>
          <h1 className="text-white text-[clamp(2rem,5.5vw,3.75rem)] font-semibold tracking-tighter leading-[1.05] mb-6 text-balance">
            {company.heroText}
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-white/70 tracking-tight mb-10">
            {company.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#how"
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full font-semibold"
            >
              HOW IT WORKS
            </Link>
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 px-10 py-4 rounded-full font-semibold text-white hover:bg-white/5"
            >
              LAUNCH CONNECT
            </Link>
          </div>
        </div>
      </section>

      <section id="how" className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#525252]">THE PROCESS</div>
          <h2 className="section-heading mt-3 text-black">How {company.name} Works</h2>
        </div>
        <div className="space-y-6">
          {company.howItWorks.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 md:gap-10 items-start bg-white border border-black/10 rounded-3xl p-8 group"
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-light border"
                style={{ borderColor: accent, color: accent }}
              >
                {String(step.step).padStart(2, "0")}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 text-black">
                  {step.title}
                </h3>
                <p className="text-lg text-[#525252] leading-relaxed max-w-3xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[3px] text-[#525252]">WHO WE SERVE</div>
            <h2 className="section-heading mt-3 text-black">Built for Every Stakeholder</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {company.forStakeholders.map((stake) => (
              <div
                key={stake.title}
                className="rounded-3xl p-8 border border-black/10 bg-[#fafafa] flex flex-col"
              >
                <div
                  className="text-xl font-semibold tracking-tight mb-4"
                  style={{ color: accent }}
                >
                  {stake.title}
                </div>
                <p className="text-[#404040] flex-1 leading-relaxed">{stake.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="uppercase tracking-[3px] text-xs mb-4" style={{ color: accent }}>
          MEASURABLE RESULTS
        </div>
        <h2 className="section-heading mb-8 text-black">The {company.name} Impact</h2>
        <p className="text-xl sm:text-2xl text-[#404040] leading-relaxed max-w-3xl mx-auto mb-12">
          {company.impact}
        </p>
        <Link
          href="/connect"
          className="premium-button inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-semibold"
        >
          Partner on {company.name}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
