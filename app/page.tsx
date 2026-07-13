"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { companies } from "./lib/companies";
import { CompanyIcon } from "./lib/icons";
import { sa, SA_ONBOARDING, SA_URL } from "./lib/saCopy";

const statsData = [
  { number: 25, label: "Modules on the OS", suffix: "+" },
  { number: 30, label: "Day free trial", suffix: "" },
  { number: 50, label: "Founding free slots", suffix: "" },
  { number: 499, label: "From R / month", suffix: "" },
];

function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = end * eased;
      if (progress < 1) {
        setCount(Math.floor(start * 10) / 10);
        frame = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, inView]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      {/* HERO — SupplierAdvisor® voice */}
      <section className="relative min-h-[min(100dvh,900px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
          role="img"
          aria-label="Big Five Group powered by SupplierAdvisor"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/30 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-5 sm:mb-6 text-white/95"
          >
            <span className="truncate">{sa.eyebrow}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-sans text-white text-[clamp(1.85rem,5.5vw+0.5rem,4.5rem)] font-semibold tracking-tighter leading-[1.02] sm:leading-[0.98] mb-5 sm:mb-6 text-balance"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            ERP that ships.
            <br />
            Trust that blocks risk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="w-full max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-white/95 font-light tracking-tight mb-8 sm:mb-10"
          >
            {sa.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
          >
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              {sa.ctaTrial}
              <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5 shrink-0" />
            </a>
            <Link
              href="/connect"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-white"
            >
              See how trust works
            </Link>
          </motion.div>
          <p className="mt-5 text-xs sm:text-sm text-white/50">{sa.pricingNote}</p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center text-white/60 text-[10px] tracking-[2px]"
          aria-hidden
        >
          SCROLL
          <div className="w-px h-8 sm:h-10 bg-white/25 mt-2" />
        </motion.div>
      </section>

      {/* TRUST BAR — SA capabilities */}
      <div className="border-b border-black/10 py-4 sm:py-5 bg-white">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] text-[#525252]">
          <div>Company verification</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>OTIFEF ratings</div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden md:block">SHEQ · ISO 45001</div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden lg:block">Lot traceability</div>
          <div className="hidden xl:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden xl:block">On-chain ready</div>
        </div>
      </div>

      {/* MULTI-ENTITY — SA core */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-12 text-center">
        <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-3">
          Multi-entity pattern
        </div>
        <h2 className="section-heading text-black mb-5">{sa.multiEntityTitle}</h2>
        <p className="text-base sm:text-lg text-[#525252] max-w-3xl mx-auto leading-relaxed">
          {sa.multiEntityBody}
        </p>
      </section>

      {/* THE 9 PILLARS */}
      <section
        id="pillars"
        className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 sm:pb-16 md:pb-20"
      >
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-3">
            {sa.missionTitle}
          </div>
          <h2 className="section-heading text-black">
            Nine pillars.
            <br />
            One operating system.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#525252] max-w-2xl">
            {sa.missionBody} Foods, Direct, Access, Agri and the rest of Big Five run as separate
            workspaces on {sa.brand} — verified companies trading together on one chain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {companies.map((company, index) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.4 }}
              className="min-w-0"
            >
              <Link
                href={`/${company.slug}`}
                className="group flex flex-col h-full rounded-2xl sm:rounded-3xl border border-black/10 p-6 sm:p-7 md:p-8 hover:border-black/20 transition-all card-hover bg-white min-w-0"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-5 sm:mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${company.color}15`, color: company.color }}
                >
                  <CompanyIcon name={company.icon} size={28} />
                </div>
                <div
                  className="font-semibold text-2xl sm:text-3xl tracking-tighter mb-2"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-[#404040] mb-3 sm:mb-4 leading-snug">
                  {company.tagline}
                </div>
                <div className="text-sm text-[#525252] line-clamp-3 mb-5 sm:mb-6 flex-1">
                  {company.description}
                </div>
                <div className="mt-auto flex items-center text-xs uppercase tracking-[1.5px] text-[#737373] group-hover:text-black transition-colors">
                  Enter the pillar
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY OPERATORS JOIN */}
      <section className="bg-white py-16 sm:py-20 md:py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="uppercase tracking-[3px] text-xs text-emerald-600 mb-3">Trust layer</div>
            <h2 className="section-heading text-black mb-4">{sa.trustTitle}</h2>
            <p className="text-base sm:text-lg text-[#525252]">{sa.trustBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {sa.trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0"
              >
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-2">
                  {point.title}
                </h3>
                <p className="text-sm sm:text-base text-[#525252] leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS FROM SA */}
      <section className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-xs tracking-[3px] text-[#525252]">{sa.oneLiner}</div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mt-3 sm:mt-4 text-black">
            {sa.foundingPartners}
          </h3>
          <p className="mt-4 text-[#525252] max-w-xl mx-auto">{sa.foundingBody}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-center hover:border-black/20 transition-all min-w-0"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-black mb-2 sm:mb-3">
                <AnimatedNumber end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[#171717] text-sm sm:text-base md:text-lg font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STAKEHOLDERS + SUPER-CUBE */}
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs tracking-[3px] text-white/40 mb-3">Who it&apos;s for</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
              One platform. Every stakeholder.
            </h2>
            <p className="text-white/65">{sa.betterWorld}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {sa.stakeholders.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 min-w-0"
              >
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
            <div className="min-w-0">
              <div className="text-xs tracking-[3px] text-amber-400 mb-4">Super-Cube®</div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-4 text-balance">
                Leadership for the humans who run the system
              </h3>
              <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {sa.intelligenceSuperCube}
              </p>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
              >
                Explore Leadership
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="min-w-0">
              <div className="text-xs tracking-[3px] text-teal-400 mb-4">Ethical sourcing & SDGs</div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-4 text-balance">
                Transparent chains. Real impact.
              </h3>
              <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {sa.ethicalSdgs} Foundation programmes and Impact delivery share the same verified
                network as trade.
              </p>
              <Link
                href="/foundation"
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
              >
                Explore Foundation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — SA */}
      <section className="bg-black py-16 sm:py-20 md:py-24 text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-emerald-500 mb-4">The network is open</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-5 sm:mb-6 text-white text-balance">
            {sa.finalTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10">{sa.finalBody}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black text-sm sm:text-lg px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold shadow-xl"
            >
              Get started in under 5 minutes
              <ArrowRight className="w-5 h-5 shrink-0" />
            </a>
            <a
              href={SA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/10"
            >
              {sa.ctaOpen}
            </a>
          </div>
          <div className="mt-5 sm:mt-6 text-xs text-white/40">{sa.pricingNote}</div>
        </div>
      </section>
    </div>
  );
}
