"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Company } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

export default function CompanyTemplate({ company }: { company: Company }) {
  const accent = company.color;

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section
        className="relative min-h-[min(80dvh,640px)] sm:min-h-[min(85dvh,720px)] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, #0a0a0a 0%, #111 100%)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${accent}20 0%, transparent 70%)`,
          }}
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
          <div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 mx-auto"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            <CompanyIcon name={company.icon} size={40} />
          </div>
          <div
            className="uppercase tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs mb-3 sm:mb-4"
            style={{ color: accent }}
          >
            BIG FIVE {company.name.toUpperCase()}
          </div>
          <h1 className="text-white text-[clamp(1.75rem,5vw+0.5rem,3.75rem)] font-semibold tracking-tighter leading-[1.05] mb-5 sm:mb-6 text-balance">
            {company.heroText}
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-white/70 tracking-tight mb-8 sm:mb-10">
            {company.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="#how"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
            >
              HOW IT WORKS
            </Link>
            <a
              href="https://www.supplieradvisor.com/onboarding?type=business"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/30 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-white hover:bg-white/5 text-sm sm:text-base"
            >
              GET ACCESS
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-xs tracking-[3px] text-[#525252]">THE PROCESS</div>
          <h2 className="section-heading mt-3 text-black">How {company.name} Works</h2>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {company.howItWorks.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-start bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 group min-w-0"
            >
              <div
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-light border"
                style={{ borderColor: accent, color: accent }}
              >
                {String(step.step).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0 sm:pt-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-2 sm:mb-3 text-black">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="text-xs tracking-[3px] text-[#525252]">WHO WE SERVE</div>
            <h2 className="section-heading mt-3 text-black">Built for Every Stakeholder</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {company.forStakeholders.map((stake) => (
              <div
                key={stake.title}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-black/10 bg-[#fafafa] flex flex-col min-w-0"
              >
                <div
                  className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4"
                  style={{ color: accent }}
                >
                  {stake.title}
                </div>
                <p className="text-[#404040] flex-1 leading-relaxed text-sm sm:text-base">
                  {stake.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="uppercase tracking-[3px] text-xs mb-4" style={{ color: accent }}>
          MEASURABLE RESULTS
        </div>
        <h2 className="section-heading mb-6 sm:mb-8 text-black">The {company.name} Impact</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-[#404040] leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
          {company.impact}
        </p>
        <a
          href="https://www.supplieradvisor.com/onboarding?type=business"
          target="_blank"
          rel="noopener noreferrer"
          className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
        >
          Start free trial on SupplierAdvisor®
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </section>
    </div>
  );
}
