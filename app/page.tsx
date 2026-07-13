"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { companies } from "./lib/companies";
import { CompanyIcon } from "./lib/icons";

const statsData = [
  { number: 54, label: "African Nations Reach", suffix: "" },
  { number: 124, label: "Hectares Regenerated", suffix: "k" },
  { number: 2.8, label: "Rands Facilitated", suffix: "B" },
  { number: 47, label: "Jobs Created", suffix: "k" },
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
      {/* HERO */}
      <section className="relative min-h-[min(100dvh,900px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:scale-105"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
          role="img"
          aria-label="African landscape representing Big Five Group"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/30 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-5 sm:mb-6 text-white/95"
          >
            <span className="truncate">EST. 2018 · KWAZULU-NATAL · AFRICA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-sans text-white text-[clamp(1.85rem,5.5vw+0.5rem,4.5rem)] font-semibold tracking-tighter leading-[1.02] sm:leading-[0.98] mb-5 sm:mb-6"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            ONE GROUP.
            <br />
            NINE PILLARS.
            <br />
            INFINITE IMPACT.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="w-full max-w-xl sm:max-w-2xl mx-auto text-base sm:text-2xl md:text-3xl text-white/95 font-light tracking-tight mb-8 sm:mb-10"
          >
            Regenerative. Sovereign. Ethical.
            <br className="hidden sm:block" />
            The future of Africa is being built right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
          >
            <Link
              href="#pillars"
              className="premium-button group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              EXPLORE THE 9 PILLARS
              <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="/connect"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-white"
            >
              LAUNCH CONNECT
            </Link>
          </motion.div>
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

      {/* TRUST BAR */}
      <div className="border-b border-black/10 py-4 sm:py-5 bg-white">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] text-[#525252]">
          <div>International Presence</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>SupplierAdvisor® Powered</div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden md:block">Super-Cube® Leadership</div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden lg:block">On-Chain Verified</div>
          <div className="hidden xl:block w-1 h-1 rounded-full bg-black/15" />
          <div className="hidden xl:block">UN SDG Aligned</div>
        </div>
      </div>

      {/* THE 9 PILLARS */}
      <section
        id="pillars"
        className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-16 md:pb-20"
      >
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-3">
            The Ecosystem
          </div>
          <h2 className="section-heading text-black">
            The Nine Pillars of
            <br />
            African Sovereignty
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#525252] max-w-2xl">
            From regenerative farms and fortified nutrition to project delivery, ethical capital access, and doctoral-level leadership — every pillar compounds the others. Where applicable, our companies are listed on SupplierAdvisor® as verified ethical businesses.
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

      {/* AFRICA SECTION */}
      <section className="bg-white py-16 sm:py-20 md:py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="uppercase tracking-[3px] text-xs mb-4 text-emerald-600">
            Continent-Wide
          </div>
          <h2 className="section-heading mb-5 sm:mb-6 text-black">
            Africa is not a country.
            <br />
            It is our canvas.
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#525252] mb-8 sm:mb-10">
            From the savannas of KwaZulu-Natal to the markets of Lagos and the highlands of Ethiopia —
            Big Five operates with deep local roots and continental ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/africa"
              className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[2px] border-b border-black/30 pb-1 hover:border-black group text-black"
            >
              Discover our African footprint
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition shrink-0" />
            </Link>
            <Link
              href="/global"
              className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[2px] border-b border-black/20 pb-1 hover:border-black group text-[#525252] hover:text-black"
            >
              Explore global presence
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-xs tracking-[3px] text-[#525252]">
            Measurable. Verifiable. On-Chain.
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mt-3 sm:mt-4 text-black">
            Real Impact.
            <br />
            Real Numbers.
          </h3>
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

      {/* LEADERSHIP + FOUNDATION STRIP */}
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <div className="text-xs tracking-[3px] text-amber-400 mb-4">Leadership</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-balance">
              Super-Cube® doctoral leadership for nations and enterprises.
            </h3>
            <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Ethical decision-making, AI-augmented development, and sovereign capability — rooted in African excellence.
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
            <div className="text-xs tracking-[3px] text-teal-400 mb-4">Foundation</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-balance">
              On-chain philanthropy with measurable African impact.
            </h3>
            <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Transparent funding, community co-ownership, and SDG-aligned programmes that turn intention into verified outcomes.
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
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-16 sm:py-20 md:py-24 text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-emerald-500 mb-4">The Time Is Now</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-5 sm:mb-6 text-white text-balance">
            Ready to build the future of Africa with us?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10">
            Whether you are a government, investor, farmer, or conscious consumer — there is a place for you in the Big Five ecosystem.
          </p>
          <Link
            href="/connect"
            className="premium-button w-full sm:w-auto mx-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black text-sm sm:text-lg md:text-xl px-6 sm:px-10 md:px-14 py-3.5 sm:py-4 md:py-5 rounded-full font-semibold shadow-xl max-w-md sm:max-w-none"
          >
            <span className="sm:hidden">LAUNCH CONNECT</span>
            <span className="hidden sm:inline">LAUNCH CONNECT — SUPPLIERADVISOR®</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          </Link>
          <div className="mt-5 sm:mt-6 text-xs text-white/40">
            Instant access for verified partners
          </div>
        </div>
      </section>
    </div>
  );
}
