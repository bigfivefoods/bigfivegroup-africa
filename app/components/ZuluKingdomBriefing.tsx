"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Crown,
  ExternalLink,
  GraduationCap,
  Handshake,
  HeartPulse,
  LandPlot,
  Leaf,
  Package,
  Scale,
  ShieldCheck,
  Sparkles,
  Store,
  Tractor,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { ZULU_KINGDOM_PARTNERSHIP as P } from "../lib/zuluKingdomPartnership";

function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] font-semibold mb-2 ${
        light ? "text-[#e0b000]" : "text-[#a67c00]"
      }`}
    >
      {children}
    </div>
  );
}

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm text-[#404040] leading-relaxed">
      <Check className="w-4 h-4 text-[#a67c00] shrink-0 mt-0.5" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

/**
 * Long-form readable briefing for the Zulu Kingdom partner portal —
 * mirrors investor-portal depth: every presentation point as navigable sections.
 */
export default function ZuluKingdomBriefing() {
  return (
    <div id="zulu-briefing" className="w-full">
      {/* Section map */}
      <section
        id="briefing-map"
        className="scroll-mt-28 border-b border-black/10 bg-[#faf6eb]"
        aria-labelledby="briefing-map-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2
            id="briefing-map-heading"
            className="text-[10px] sm:text-xs tracking-[2px] font-semibold text-[#a67c00] mb-2"
          >
            HOW TO READ THIS PARTNERSHIP BRIEFING
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed max-w-3xl mb-5">
            Jump links follow the strategic narrative: Royal House, equal partnership, Feed · Educate
            · Empower, the Agri → Foods → Big Five Royal value chain, products, leadership,
            empowerment, pathways, honesty — then the shareable slide deck.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { n: "01", href: "#royal-house", label: "Royal House", why: "His Majesty and shared service" },
              { n: "02", href: "#partnership-50-50", label: "50:50 model", why: "Equal gifts each side brings" },
              { n: "03", href: "#pillars", label: "Three pillars", why: "Feed · Educate · Empower" },
              { n: "04", href: "#value-chain", label: "Value chain", why: "Agri → Foods → Royal → Direct" },
              { n: "05", href: "#agri", label: "Big Five Agri", why: "Train Nation farmers & crop offtake" },
              { n: "06", href: "#foods-products", label: "Big Five Foods", why: "Products for the Nation’s tables" },
              { n: "07", href: "#royal-departments", label: "Royal · departments", why: "Sports/Arts & Culture, Health, Agriculture, COGTA" },
              { n: "08", href: "#direct-containers", label: "Direct containers", why: "Community enterprise selling Foods" },
              { n: "09", href: "#leadership", label: "Leadership", why: "Super-Cube® for stewards" },
              { n: "10", href: "#empower", label: "Empower", why: "Trade, Foundation, Impact" },
              { n: "11", href: "#pathways", label: "Pathways", why: "How we begin together" },
              { n: "12", href: "#honesty", label: "Honesty", why: "What this briefing is and is not" },
              { n: "13", href: "#zulu-partnership-deck", label: "Slide deck", why: "Slide presentation + PDF" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl border border-[#e0b000]/25 bg-white px-4 py-3 hover:border-[#e0b000]/60 transition-colors min-w-0"
              >
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-1">
                  {item.n}
                </div>
                <div className="text-sm font-semibold text-black mb-0.5">{item.label}</div>
                <p className="text-xs text-[#737373] leading-relaxed">{item.why}</p>
              </a>
            ))}
          </ol>
        </div>
      </section>

      {/* Royal house — leopard dark */}
      <section
        id="royal-house"
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden text-white py-12 sm:py-16"
      >
        <Image
          src={P.leopardHero}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(10,8,4,0.92) 0%, rgba(20,14,6,0.84) 50%, rgba(10,8,4,0.90) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow light>ROYAL HOUSE · SHARED SERVICE</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance mb-3 max-w-3xl">
            Where the Zulu Kingdom and Big Five Group meet
          </h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            Service to the Royal House and the Zulu Nation first — heritage, unity and community
            progress — then practical rails that help that calling scale with dignity.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8">
            <article className="rounded-2xl border border-[#e0b000]/25 bg-black/35 backdrop-blur-[2px] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl overflow-hidden border border-[#e0b000]/30 bg-black/40 p-1.5">
                  <Image
                    src={P.shieldSrc}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-1">
                    <Crown className="w-3.5 h-3.5" aria-hidden />
                    THE ZULU KINGDOM
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{P.majesty.name}</h3>
                  <p className="text-xs text-white/55 mt-0.5">{P.majesty.role}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">{P.majesty.blurb}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={P.aboutKingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-2 hover:text-[#e0b000]"
                >
                  About His Majesty
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={P.kingdomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-2 hover:text-[#e0b000]"
                >
                  zulukingdom.co.za
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-[2px] p-5 sm:p-6">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-3">
                BIG FIVE GROUP · FOUNDER
              </div>
              <div className="flex gap-4 mb-4">
                <div className="relative h-16 w-12 sm:h-20 sm:w-14 shrink-0 rounded-xl overflow-hidden border border-white/15 bg-white/5">
                  <Image
                    src="/craig-muller.png"
                    alt="Dr. Craig R. Muller, Founder & CEO of Big Five Group"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1">
                    Dr. Craig R. Muller
                  </h3>
                  <p className="text-xs sm:text-sm text-white/55 leading-snug">
                    Founder &amp; CEO · Feed · Educate · Empower
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Big Five Group exists so people can{" "}
                <strong className="text-white">eat with dignity</strong> (Foods),{" "}
                <strong className="text-white">lead with integrity</strong> (Super-Cube®) and{" "}
                <strong className="text-white">build economies they own</strong> (SupplierAdvisor®) —
                joined to Agri farmer development and Big Five Royal departmental placement for the
                Nation.
              </p>
              <Link
                href="/about#founder"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-2 hover:text-[#e0b000]"
              >
                Read the founder story
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          </div>
          <p className="text-[11px] text-white/45 leading-relaxed max-w-3xl">
            This portal is a Big Five Group briefing workspace — not an official Palace publication.
            Heritage language is drawn from the public Private Office site at zulukingdom.co.za.
          </p>
        </div>
      </section>

      {/* 50:50 */}
      <section
        id="partnership-50-50"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>50 : 50 PARTNERSHIP MODEL</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            {P.equity.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            {P.equity.detail}
          </p>
          <div className="rounded-3xl border-2 border-[#e0b000]/40 bg-[#faf6eb] px-6 py-8 sm:px-10 sm:py-10 mb-8 text-center">
            <div className="text-[10px] tracking-[3px] font-semibold text-[#a67c00] mb-2">
              PROPOSED EQUITY · SHARED STEWARDSHIP
            </div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-black tabular-nums">
              {P.equity.split}
            </div>
            <div className="text-sm text-[#737373] mt-3">
              Zulu Nation / Private Office structures · Big Five Group
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl border border-[#e0b000]/30 bg-[#faf6eb] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-[#a67c00]" aria-hidden />
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  THE NATION BRINGS · 50%
                </div>
              </div>
              <p className="text-sm text-[#404040] leading-relaxed mb-4">{P.equity.nation}</p>
              <ul className="space-y-2">
                {[
                  "Royal legitimacy and cultural authority",
                  "Community reach across KwaZulu-Natal",
                  "Farmer networks and household pathways",
                  "Stewardship of heritage that must never be diluted",
                ].map((l) => (
                  <CheckRow key={l}>{l}</CheckRow>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-[#a67c00]" aria-hidden />
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  BIG FIVE BRINGS · 50%
                </div>
              </div>
              <p className="text-sm text-[#404040] leading-relaxed mb-4">{P.equity.bigFive}</p>
              <ul className="space-y-2">
                {[
                  "Big Five Agri — train Nation farmers & crop offtake",
                  "Big Five Foods — manufacture fortified staples",
                  "Big Five Royal — place foods into national departments",
                  "Super-Cube® · SupplierAdvisor® · Foundation · Impact",
                ].map((l) => (
                  <CheckRow key={l}>{l}</CheckRow>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>FEED · EDUCATE · EMPOWER</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            Three pillars — one calling for the Nation
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            The same life goal that built Big Five Group — applied in 50:50 partnership so His
            Majesty&apos;s people are fed, formed and empowered with dignity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {P.pillars.map((p) => {
              const Icon =
                p.id === "feed" ? UtensilsCrossed : p.id === "educate" ? GraduationCap : Handshake;
              return (
                <article
                  key={p.id}
                  className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 shadow-sm"
                >
                  <Icon className="w-6 h-6 text-[#a67c00] mb-3" aria-hidden />
                  <h3 className="text-xl font-semibold tracking-tight text-black mb-1">{p.t}</h3>
                  <div className="text-[10px] tracking-[1.5px] font-semibold text-[#a67c00] mb-3">
                    {p.vehicle}
                  </div>
                  <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value chain */}
      <section
        id="value-chain"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>{P.valueChain.eyebrow}</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            {P.valueChain.title}
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            {P.valueChain.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
            {P.valueChain.stages.map((s) => {
              const Icon =
                s.id === "agri" ? Leaf : s.id === "foods" ? Package : s.id === "royal" ? Crown : Truck;
              return (
                <article
                  key={s.id}
                  id={s.id === "royal" ? "big-five-royal" : undefined}
                  className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 flex flex-col scroll-mt-28"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-semibold tracking-tighter text-[#e0b000] tabular-nums">
                      {s.n}
                    </div>
                    <Icon className="w-6 h-6 text-[#a67c00]" aria-hidden />
                  </div>
                  <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-1">
                    {s.brand.toUpperCase()}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{s.t}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed mb-4 flex-1">{s.d}</p>
                  <ul className="space-y-1.5 mb-4">
                    {s.outcomes.map((o) => (
                      <CheckRow key={o}>{o}</CheckRow>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a67c00] hover:text-black"
                  >
                    Explore {s.brand.replace("™", "")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="text-sm text-[#737373] leading-relaxed max-w-3xl border-l-2 border-[#e0b000]/50 pl-4">
            {P.valueChain.loopNote}
          </p>
        </div>
      </section>

      {/* Agri deep dive */}
      <section id="agri" className="scroll-mt-28 border-b border-black/10 bg-[#0a0804] text-white py-12 sm:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url(${P.leopardHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow light>{P.agri.eyebrow}</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-6 h-6 text-[#e0b000]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance max-w-3xl">
              {P.agri.title}
            </h2>
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {P.agri.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {P.agri.points.map((p) => (
              <article
                key={p.t}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
              >
                <h3 className="text-base font-semibold text-white mb-1.5">{p.t}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
            Next: Big Five Foods manufactures from those crops — then Big Five Royal places finished
            foods into national departments for the people of the Nation.
          </p>
        </div>
      </section>

      {/* Foods products */}
      <section
        id="foods-products"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>BIG FIVE FOODS™</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            Products for the Nation&apos;s tables
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Manufactured from crops grown by Nation farmers trained with Big Five Agri — delicious,
            nutritious, affordable fortified staples for departments, households and community
            programmes.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {P.products.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-black/10 bg-[#fafafa] overflow-hidden shadow-sm flex flex-col"
              >
                <div className="flex h-36 sm:h-44 items-center justify-center bg-white p-3">
                  <Image
                    src={f.src}
                    alt={f.title}
                    width={160}
                    height={220}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="p-3 sm:p-4 border-t border-black/5 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-black mb-1">{f.title}</h3>
                  <p className="text-xs text-[#737373] leading-relaxed mb-2 flex-1">{f.blurb}</p>
                  <p className="text-[10px] font-semibold text-[#a67c00]">{f.stats}</p>
                  <p className="text-[10px] text-[#a3a3a3] mt-1">{f.serve}</p>
                </div>
              </article>
            ))}
          </div>
          <div id="nutrition" className="scroll-mt-28 rounded-2xl border border-black/10 bg-[#faf6eb] p-5 sm:p-6">
            <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-3">
              NUTRITION &amp; MEAL MATHS
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { v: P.nutrition.moreNutrition, l: "More nutrition by design" },
                { v: P.nutrition.moreFortification, l: "More fortification" },
                { v: P.nutrition.cheaper, l: "Cheaper vs wholesale/retail" },
                { v: P.nutrition.mealInline, l: "Per 200g meal framing" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white border border-[#e0b000]/20 px-3 py-3">
                  <div className="text-lg sm:text-xl font-semibold tracking-tighter text-black tabular-nums">
                    {s.v}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#737373] mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Big Five Royal · departments */}
      <section
        id="royal-departments"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>{P.royalDepartments.eyebrow}</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              {P.royalDepartments.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            {P.royalDepartments.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            {P.royalDepartments.departments.map((d) => {
              const Icon =
                d.id === "dsac"
                  ? LandPlot
                  : d.id === "doh"
                    ? HeartPulse
                    : d.id === "doa"
                      ? Tractor
                      : Building2;
              return (
                <article
                  key={d.id}
                  className="rounded-2xl border border-[#e0b000]/25 bg-white p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="rounded-xl border border-[#e0b000]/30 bg-[#faf6eb] p-2.5 shrink-0">
                      <Icon className="w-5 h-5 text-[#a67c00]" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-1">
                        BIG FIVE ROYAL · UNLOCK
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-black leading-snug">
                        {d.name}
                      </h3>
                      {"fullName" in d && d.fullName ? (
                        <p className="text-xs text-[#737373] mt-0.5">{d.fullName}</p>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-sm text-[#525252] leading-relaxed">{d.d}</p>
                </article>
              );
            })}
          </div>
          <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-3xl border-l-2 border-[#e0b000]/40 pl-4">
            {P.royalDepartments.note}
          </p>
        </div>
      </section>

      {/* Direct containers */}
      <section
        id="direct-containers"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>{P.directContainers.eyebrow}</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              {P.directContainers.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            {P.directContainers.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            {P.directContainers.points.map((p) => (
              <article
                key={p.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-[#a67c00]" aria-hidden />
                  <h3 className="text-base font-semibold text-black">{p.t}</h3>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/direct"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a67c00] hover:text-black"
            >
              Explore Big Five Direct
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-xs text-[#737373] leading-relaxed max-w-2xl">
              {P.directContainers.note}
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        id="leadership"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>EDUCATE · SUPER-CUBE®</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              {P.leadership.headline}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Leadership is how a Nation multiplies dignity. Super-Cube® forms whole people — so those
            who serve the House and community programmes can hold complexity with Ubuntu and
            integrity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {P.leadership.points.map((p) => (
              <article key={p.t} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#a67c00] mb-3" aria-hidden />
                <h3 className="text-base font-semibold text-black mb-2">{p.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                t: "Royal & household stewards",
                d: "Whole-person capacity for ceremonial, hospitality and household service.",
              },
              {
                t: "Community & programme leads",
                d: "Field and kitchen leadership so Feed programmes run with discipline and dignity.",
              },
              {
                t: "Youth & next generation",
                d: "Formation pathways so young leaders carry heritage forward with modern competence.",
              },
              {
                t: "Public & partner interfaces",
                d: "Ethical presence where the Nation meets government, donors and commercial partners.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-[#e0b000]/20 bg-white px-4 py-3.5"
              >
                <div className="text-sm font-semibold text-black mb-1">{item.t}</div>
                <p className="text-xs text-[#737373] leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[#a67c00] hover:text-black"
          >
            Explore Leadership · Super-Cube®
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Empower */}
      <section id="empower" className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>EMPOWER</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              Economic dignity · transparent delivery
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Empowerment without proof is theatre. These rails let the Nation trade, give and scale
            with honesty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {P.empower.points.map((p) => (
              <article key={p.t} className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6">
                <ShieldCheck className="w-5 h-5 text-[#a67c00] mb-3" aria-hidden />
                <h3 className="text-base font-semibold text-black mb-2">{p.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways + next steps */}
      <section
        id="pathways"
        className="scroll-mt-28 border-b border-black/10 bg-[#faf6eb] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>PATHWAYS · HOW WE BEGIN</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            From briefing to shared work
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            A practical sequence — joint steering, Agri farmer cohorts, Foods + Big Five Royal
            placement, then leadership and transparent scale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {P.pathways.map((p, i) => (
              <article
                key={p.t}
                className="rounded-2xl border border-[#e0b000]/25 bg-white p-5 flex gap-4 shadow-sm"
              >
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-[#e0b000] tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-black mb-1">{p.t}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
                </div>
              </article>
            ))}
          </div>
          <div
            id="contact-cta"
            className="rounded-2xl border border-black/10 bg-[#0a0804] text-white p-6 sm:p-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${P.leopardHero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
            <div className="relative z-10">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-2">
                CALL TO ACTION
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 max-w-2xl">
                Let us feed, educate and empower His Majesty&apos;s people — together.
              </h3>
              <p className="text-sm text-white/65 leading-relaxed max-w-2xl mb-5">
                50:50 · Agri → Foods → Big Five Royal (Sports/Arts &amp; Culture, Health, Agriculture,
                COGTA) → Direct community containers · Super-Cube®
              </p>
              <a
                href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                  "Zulu Kingdom × Big Five Group — 50:50 strategic partnership"
                )}&body=${encodeURIComponent(
                  "Hello Dr. Craig / Big Five team,\n\nI would like to progress a 50:50 strategic partnership discussion between the Zulu Kingdom / Private Office and Big Five Group — Feed · Educate · Empower (Agri → Foods → Big Five Royal).\n\nName:\nRole / office:\nPriority interest:\n\nThank you."
                )}`}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold px-5 py-3 text-sm hover:bg-[#e0b000] transition-colors"
              >
                Email {P.contactEmail}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Honesty */}
      <section id="honesty" className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>HONEST LANGUAGE</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-6 max-w-3xl">
            What this briefing is — and is not
          </h2>
          <ul className="space-y-3 max-w-3xl">
            {P.honesty.map((line) => (
              <li
                key={line.slice(0, 48)}
                className="rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm text-[#404040] leading-relaxed"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
