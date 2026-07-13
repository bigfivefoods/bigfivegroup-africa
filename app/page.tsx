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
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[min(100dvh,900px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
          role="img"
          aria-label="African landscape representing Big Five Group"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 max-w-5xl px-6 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 text-xs tracking-[3px] mb-6 text-white/95"
          >
            EST. 2018 · KWAZULU-NATAL · AFRICA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-white text-[clamp(2.75rem,8vw,5.75rem)] font-black tracking-[-0.06em] leading-[0.95] mb-6"
          >
            ONE GROUP.
            <br />
            EIGHT PILLARS.
            <br />
            INFINITE IMPACT.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="max-w-[620px] mx-auto text-lg sm:text-2xl md:text-3xl text-white/95 font-light tracking-tight mb-10"
          >
            Regenerative. Sovereign. Ethical.
            <br className="hidden sm:block" />
            The future of Africa is being built right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#pillars"
              className="premium-button group inline-flex items-center justify-center gap-3 bg-white text-black px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-semibold"
            >
              EXPLORE THE 8 PILLARS
              <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5" />
            </Link>
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-semibold text-white"
            >
              LAUNCH CONNECT
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-[10px] tracking-[2px]"
        >
          SCROLL
          <div className="w-px h-10 bg-white/25 mt-2" />
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <div className="border-b border-black/10 py-5 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[2px] text-[#525252]">
          <div>International Presence</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>SupplierAdvisor® Powered</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>Super-Cube® Leadership</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>On-Chain Verified</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-black/15" />
          <div>UN SDG Aligned</div>
        </div>
      </div>

      {/* THE 8 PILLARS */}
      <section id="pillars" className="max-w-7xl mx-auto px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="mb-12 max-w-3xl">
          <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-3">
            The Ecosystem
          </div>
          <h2 className="section-heading text-black">
            The Eight Pillars of
            <br />
            African Sovereignty
          </h2>
          <p className="mt-5 text-lg text-[#525252] max-w-2xl">
            From regenerative farms and fortified nutrition to ethical capital access and doctoral-level leadership — every pillar compounds the others.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {companies.map((company, index) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.4 }}
            >
              <Link
                href={`/${company.slug}`}
                className="group block h-full rounded-3xl border border-black/10 p-7 sm:p-8 hover:border-black/20 transition-all card-hover bg-white"
              >
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${company.color}15`, color: company.color }}
                >
                  <CompanyIcon name={company.icon} size={30} />
                </div>
                <div
                  className="font-semibold text-3xl tracking-tighter mb-2"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
                <div className="text-base sm:text-lg text-[#404040] mb-4 pr-2 leading-snug">
                  {company.tagline}
                </div>
                <div className="text-sm text-[#525252] line-clamp-3 mb-6">
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
      <section className="bg-white py-20 sm:py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="uppercase tracking-[3px] text-xs mb-4 text-emerald-600">
            Continent-Wide
          </div>
          <h2 className="section-heading mb-6 text-black">
            Africa is not a country.
            <br />
            It is our canvas.
          </h2>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#525252] mb-10">
            From the savannas of KwaZulu-Natal to the markets of Lagos and the highlands of Ethiopia —
            Big Five operates with deep local roots and continental ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/africa"
              className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[2px] border-b border-black/30 pb-1 hover:border-black group text-black"
            >
              Discover our African footprint
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/global"
              className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[2px] border-b border-black/20 pb-1 hover:border-black group text-[#525252] hover:text-black"
            >
              Explore global presence
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#525252]">
            Measurable. Verifiable. On-Chain.
          </div>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter mt-4 text-black">
            Real Impact.
            <br />
            Real Numbers.
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 text-center hover:border-black/20 transition-all"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter text-black mb-3">
                <AnimatedNumber end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[#171717] text-base sm:text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP + FOUNDATION STRIP */}
      <section className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="text-xs tracking-[3px] text-amber-400 mb-4">Leadership</div>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
              Super-Cube® doctoral leadership for nations and enterprises.
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Ethical decision-making, AI-augmented development, and sovereign capability — rooted in African excellence.
            </p>
            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
            >
              Explore Leadership
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <div className="text-xs tracking-[3px] text-teal-400 mb-4">Foundation</div>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
              On-chain philanthropy with measurable African impact.
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Transparent funding, community co-ownership, and SDG-aligned programmes that turn intention into verified outcomes.
            </p>
            <Link
              href="/foundation"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
            >
              Explore Foundation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-20 sm:py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-emerald-500 mb-4">The Time Is Now</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter mb-6 text-white">
            Ready to build the future of Africa with us?
          </h2>
          <p className="text-lg sm:text-xl text-white/70 mb-10">
            Whether you are a government, investor, farmer, or conscious consumer — there is a place for you in the Big Five ecosystem.
          </p>
          <Link
            href="/connect"
            className="premium-button mx-auto inline-flex items-center justify-center gap-3 bg-white text-black text-lg sm:text-xl px-10 sm:px-14 py-4 sm:py-5 rounded-full font-semibold shadow-xl"
          >
            LAUNCH CONNECT — SUPPLIERADVISOR®
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <div className="mt-6 text-xs text-white/40">
            Instant access for verified partners
          </div>
        </div>
      </section>
    </div>
  );
}
