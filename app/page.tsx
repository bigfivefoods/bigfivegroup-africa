"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, Wheat, Truck, Landmark, Link as LinkIcon, Award, Heart, Feather } from "lucide-react";
import { companies } from "./lib/companies";

const statsData = [
  { number: 13, label: "African Nations", suffix: "" },
  { number: 124, label: "Hectares Regenerated", suffix: "k" },
  { number: 2.8, label: "Rands Facilitated", suffix: "B" },
  { number: 47, label: "Jobs Created", suffix: "k" },
];

function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO - Bright African Artwork */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-5xl px-6 text-center mt-[10px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 text-xs tracking-[3px] mb-6 text-white">
            EST. 2018 • KWAZULU-NATAL • AFRICA
          </div>

          <h1 
            className="text-white text-[78px] md:text-[96px] font-black tracking-[-0.065em] leading-[0.92] mb-6"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            ONE GROUP.<br />EIGHT PILLARS.<br />INFINITE IMPACT.
          </h1>

          <p className="max-w-[620px] mx-auto text-2xl md:text-3xl text-white font-light tracking-tight mb-12">
            Regenerative. Sovereign. Ethical.<br />The future of Africa is being built right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pillars"
              className="premium-button group inline-flex items-center justify-center gap-4 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              EXPLORE THE 8 PILLARS
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
           
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-4 border border-white/40 hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold text-white"
            >
              LAUNCH CONNECT
            </Link>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-[62px] left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 text-xs tracking-[2px]"
        >
          SCROLL TO BEGIN
          <div className="w-px h-12 bg-white/30 mt-2" />
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <div className="border-b border-black/10 py-5 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs uppercase tracking-[2.5px] text-[#525252]">
          <div>ALIGNED WITH ZULU KINGDOM</div>
          <div>SUPPLIERADVISOR® POWERED</div>
          <div>SUPER-CUBE® LEADERSHIP</div>
          <div>ON-CHAIN VERIFIED</div>
          <div>UN SDG ALIGNED</div>
        </div>
      </div>

      {/* THE 8 PILLARS */}
      <section id="pillars" className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#525252] mb-3">THE ECOSYSTEM</div>
            <h2 className="section-heading text-black">The Eight Pillars of<br />African Sovereignty</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {companies.map((company, index) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/${company.slug}`}
                className="group block h-full rounded-3xl border border-black/10 p-8 hover:border-black/20 transition-all card-hover bg-white"
              >
                <div
                  className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center"
                  style={{ backgroundColor: `${company.color}15`, color: company.color }}
                >
                  {company.icon === "Leaf" && <Leaf size={36} />}
                  {company.icon === "Wheat" && <Wheat size={36} />}
                  {company.icon === "Truck" && <Truck size={36} />}
                  {company.icon === "Landmark" && <Landmark size={36} />}
                  {company.icon === "Link" && <LinkIcon size={36} />}
                  {company.icon === "Award" && <Award size={36} />}
                  {company.icon === "Heart" && <Heart size={36} />}
                  {company.icon === "Feather" && <Feather size={36} />}
                </div>
                <div
                  className="font-semibold text-4xl tracking-tighter mb-2 group-hover:text-black transition-colors"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
               
                <div className="text-xl text-[#404040] mb-6 pr-4 leading-tight">
                  {company.tagline}
                </div>
                <div className="text-sm text-[#525252] line-clamp-3 mb-auto">
                  {company.description}
                </div>
                <div className="mt-8 flex items-center text-xs uppercase tracking-[1.5px] text-[#737373] group-hover:text-black transition-colors">
                  ENTER THE PILLAR <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AFRICA SECTION */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="uppercase tracking-[3px] text-xs mb-4 text-emerald-600">CONTINENT-WIDE</div>
          <h2 className="section-heading mb-8 text-black">Africa is not a country.<br />It is our canvas.</h2>
         
          <p className="max-w-2xl mx-auto text-xl text-[#525252] mb-12">
            From the savannas of KwaZulu-Natal to the markets of Lagos and the highlands of Ethiopia —
            Big Five operates with deep local roots and continental ambition.
          </p>
          <Link
            href="/africa"
            className="mt-12 inline-flex items-center gap-3 text-sm uppercase tracking-[2px] border-b border-black/30 pb-1 hover:border-black group text-black"
          >
            DISCOVER OUR AFRICAN FOOTPRINT
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-[#525252]">MEASURABLE. VERIFIABLE. ON-CHAIN.</div>
          <h3 className="text-5xl font-semibold tracking-tighter mt-4 text-black">Real Impact.<br />Real Numbers.</h3>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-black/10 rounded-3xl p-10 text-center hover:border-black/20 transition-all"
            >
              <div className="text-7xl font-semibold tracking-tighter text-black mb-3">
                <AnimatedNumber end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[#171717] text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-emerald-600 mb-4">THE TIME IS NOW</div>
          <h2 className="section-heading mb-8 text-white">Ready to build the future of Africa with us?</h2>
         
          <p className="text-xl text-white/70 mb-10">
            Whether you are a government, investor, farmer, or conscious consumer — there is a place for you in the Big Five ecosystem.
          </p>
          <Link
            href="/connect"
            className="premium-button mx-auto inline-flex items-center justify-center gap-4 bg-white text-black text-xl px-16 py-5 rounded-full font-semibold shadow-xl"
          >
            LAUNCH CONNECT — SUPPLIERADVISOR®
            <ArrowRight className="w-6 h-6" />
          </Link>
         
          <div className="mt-6 text-xs text-white/40">No credit card required • Instant access for verified partners</div>
        </div>
      </section>
    </div>
  );
}
