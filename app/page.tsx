"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Landmark,
  Leaf,
  School,
  Sparkles,
} from "lucide-react";
import { companies, type Company } from "./lib/companies";
import { PILLAR_MISSIONS } from "./lib/pillarMissions";
import { CompanyIcon } from "./lib/icons";
import PartnerLogoMarquee from "./components/PartnerLogoMarquee";

const MISSION_ICONS = {
  feed: Leaf,
  educate: BookOpen,
  empower: Sparkles,
} as const;

function companyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

/** Primary audience doors — three clear paths, not six equal cards */
const doors = [
  {
    icon: Landmark,
    t: "Governments & institutions",
    d: "School nutrition, programme delivery and capacity that holds complexity.",
    href: "/foods",
  },
  {
    icon: Building2,
    t: "Enterprise & boards",
    d: "Verified trade, Super-Cube® leadership and multi-pillar programmes.",
    href: "/connect",
  },
  {
    icon: School,
    t: "Retail, schools & partners",
    d: "Fortified staples, last-mile hubs and foundations that prove impact.",
    href: "/contact",
  },
];

const proofMetrics = [
  {
    value: "2.5m",
    label: "Children / day NSNP plan",
    source: "Foods · DBE pathway · plan scale",
  },
  {
    value: "150k+",
    label: "Meals delivered",
    source: "Programme-reported · Foods",
  },
  {
    value: "~50%",
    label: "Cheaper vs wholesale & retail",
    source: "Foods internal cost comparison",
  },
  {
    value: "70–76%",
    label: "Leadership developable",
    source: "Super-Cube® DBA research",
  },
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
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      {/* HERO */}
      <section className="page-hero" aria-label="Home introduction">
        <div
          className="page-hero__media"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
          role="img"
          aria-label="African landscape representing Big Five Group"
        />
        <div className="absolute inset-0 z-[1] bg-emerald-950/35" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        <div className="page-hero__dots" aria-hidden />

        <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-14 md:py-16 lg:py-20 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <Image
              src="/bigfivegroup-logo.png"
              alt="Big Five Group logo"
              width={192}
              height={192}
              className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-lg"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/30 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-5 sm:mb-6 text-white/95"
          >
            <span className="truncate">FEED · EDUCATE · EMPOWER · EST. 2018</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-sans text-white text-[clamp(1.7rem,5vw+0.5rem,4.5rem)] font-semibold tracking-tighter leading-[1.05] sm:leading-[1.0] md:leading-[0.98] mb-4 sm:mb-6 text-balance normal-case px-1"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            One Group.
            <br />
            Nine Pillars.
            <br />
            One Mission.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="w-full max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-tight mb-7 sm:mb-10 text-pretty px-1"
          >
            Regenerative. Sovereign. Ethical. One mission: Feed · Educate · Empower — we map the pillars.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto w-full"
          >
            <Link
              href="#pillars"
              className="premium-button group w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              Explore the pillars
              <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="/contact"
              className="premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-white"
            >
              Book a briefing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-black/10 py-3.5 sm:py-4 bg-white">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] text-[#525252]">
          <span>KwaZulu-Natal · Continent</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-black/15" />
          <span>SupplierAdvisor® · SAM</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-black/15" />
          <span className="hidden md:inline">Super-Cube®</span>
          <span className="hidden lg:inline w-1 h-1 rounded-full bg-black/15" />
          <span className="hidden lg:inline">UN SDG aligned</span>
        </div>
      </div>

      {/* Direct paths + proof */}
      <section className="bg-white border-b border-black/10 py-12 sm:py-14 md:py-16">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <div className="uppercase tracking-[3px] text-xs text-emerald-700 mb-2 font-medium">
              Start here
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance">
              Outcomes first. Pillars second.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {doors.map((a) => (
              <Link
                key={a.t}
                href={a.href}
                className="group rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0 hover:border-emerald-300/50 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-3">
                  <a.icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-black text-sm sm:text-base mb-1 group-hover:underline">
                  {a.t}
                </div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{a.d}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#0a0a0a] text-white p-5 sm:p-7 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
              <div>
                <div className="text-[10px] tracking-[2px] text-emerald-400/90 mb-1.5 font-medium">
                  SIGNATURE PROOF
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tighter">
                  Numbers partners put in briefs
                </h3>
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-emerald-300 hover:text-white inline-flex items-center gap-1 shrink-0"
              >
                Book a briefing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {proofMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-3 sm:p-4 min-w-0"
                >
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-white">
                    {m.value}
                  </div>
                  <div className="text-xs font-medium text-white/90 mt-1">{m.label}</div>
                  <div className="text-[10px] text-white/45 mt-1 leading-snug">{m.source}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] sm:text-[11px] text-white/40 leading-relaxed max-w-3xl">
              Partner- and group-reported unless noted. Ask for the latest dated brief when you
              enquire.
            </p>
          </div>
        </div>
      </section>

      {/* Nine pillars · one mission (Feed · Educate · Empower) */}
      <section
        id="pillars"
        className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
      >
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-2">The ecosystem</div>
          <h2 className="section-heading text-black">
            Nine pillars.
            <br />
            One mission.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#525252] max-w-xl leading-relaxed">
            Feed · Educate · Empower — every pillar compounds the others under one Group and one mission.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PILLAR_MISSIONS.map((m) => {
              const ChipIcon = MISSION_ICONS[m.id];
              return (
                <a
                  key={m.id}
                  href={`#mission-${m.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[1.5px] uppercase transition-colors hover:bg-white"
                  style={{
                    borderColor: `${m.accent}55`,
                    color: m.accentDark,
                    backgroundColor: m.accentSoft,
                  }}
                >
                  <ChipIcon className="w-3 h-3" style={{ color: m.accent }} />
                  {m.mission}
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {PILLAR_MISSIONS.map((mission, mi) => {
            const pillars = mission.slugs
              .map((slug) => companyBySlug(slug))
              .filter((c): c is Company => Boolean(c));
            const MissionIcon = MISSION_ICONS[mission.id];

            return (
              <motion.div
                key={mission.id}
                id={`mission-${mission.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: mi * 0.05, duration: 0.4 }}
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-black/10 overflow-hidden bg-white shadow-sm"
                style={{ boxShadow: `0 0 0 1px ${mission.accent}12` }}
              >
                <div
                  className="relative px-5 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-black/5"
                  style={{
                    background: `linear-gradient(135deg, ${mission.accentSoft} 0%, #ffffff 70%)`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ background: mission.accent }}
                    aria-hidden
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pl-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 text-white"
                        style={{ backgroundColor: mission.accent }}
                      >
                        <MissionIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-[10px] font-semibold tracking-[2px] uppercase"
                          style={{ color: mission.accentDark }}
                        >
                          {mission.label}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black">
                          {mission.mission}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#525252] leading-snug mt-0.5 max-w-lg">
                          {mission.blurb}
                        </p>
                      </div>
                    </div>
                    <div
                      className="text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border shrink-0 self-start sm:self-center"
                      style={{
                        borderColor: `${mission.accent}40`,
                        color: mission.accentDark,
                        backgroundColor: "#fff",
                      }}
                    >
                      {pillars.length} pillar{pillars.length === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 sm:p-5 grid gap-3 ${
                    pillars.length === 1
                      ? "grid-cols-1 max-w-md"
                      : pillars.length === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }`}
                >
                  {pillars.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/${company.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-black/8 bg-[#fafafa] p-4 sm:p-5 hover:bg-white hover:border-black/15 hover:shadow-md transition-all min-w-0"
                      style={{ borderTopWidth: 3, borderTopColor: company.color }}
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${company.color}18`,
                            color: company.color,
                          }}
                        >
                          <CompanyIcon name={company.icon} size={18} />
                        </div>
                        <div
                          className="font-semibold text-base sm:text-lg tracking-tighter leading-tight"
                          style={{ color: company.color }}
                        >
                          {company.name}
                        </div>
                      </div>
                      <div className="text-xs text-[#404040] mb-1.5 leading-snug font-medium line-clamp-2">
                        {company.tagline}
                      </div>
                      <div className="text-xs text-[#525252] line-clamp-2 mb-3 flex-1 leading-relaxed">
                        {company.description}
                      </div>
                      <div
                        className="mt-auto inline-flex items-center text-[10px] uppercase tracking-[1.5px] font-semibold"
                        style={{ color: company.color }}
                      >
                        Enter
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Continent + scale — one tight band */}
      <section className="bg-white border-y border-black/10 py-12 sm:py-14">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="uppercase tracking-[3px] text-xs text-emerald-700 mb-2 font-medium">
                Continent · corridors
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
                Africa is not a country.
                <br />
                It is our canvas.
              </h2>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-5 max-w-md">
                Deep roots in KwaZulu-Natal. Continental ambition. Priority corridors across Africa
                and Europe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/africa"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-black border-b border-black/25 pb-0.5 hover:border-black"
                >
                  Africa footprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/global"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#525252] border-b border-black/15 pb-0.5 hover:text-black hover:border-black"
                >
                  Global corridors
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: 54, s: "", l: "Nations in our African vision", note: "Ambition, not full ops everywhere" },
                { n: 12, s: "", l: "Priority RTM markets", note: "Africa + Europe corridors" },
                { n: 2.8, s: "M", l: "Ha regenerative opportunity", note: "Agri plan scale" },
                { n: 2.5, s: "M", l: "Children / day NSNP plan", note: "Foods · DBE pathway" },
              ].map((stat, i) => (
                <div
                  key={stat.l}
                  className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5 min-w-0"
                >
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black">
                    <AnimatedNumber end={stat.n} suffix={stat.s} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-black mt-1 leading-snug">
                    {stat.l}
                  </div>
                  <div className="text-[10px] text-[#737373] mt-1">{stat.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnerLogoMarquee />

      {/* Final CTA */}
      <section className="bg-black py-14 sm:py-16 md:py-20 text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-emerald-500 mb-3">Next step</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4 text-white text-balance">
            Ready to brief the Group?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/65 mb-8 max-w-lg mx-auto">
            Governments, enterprises, schools and partners — one enquiry for the right mix of
            pillars.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-lg sm:max-w-none mx-auto">
            <Link
              href="/contact"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black text-sm sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold"
            >
              Book a briefing
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="/group"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/10"
            >
              The Group
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
