"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Sparkles,
  Users,
  UtensilsCrossed,
  GraduationCap,
  Zap,
  Network,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";
import IntelligenceNarrative from "../components/IntelligenceNarrative";
import StrategyDeck from "../components/StrategyDeck";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

/** How each pillar serves vision · mission · values */
const pillarSupport: Record<
  string,
  { mission: "Feed" | "Educate" | "Empower" | "Cross-cutting"; serves: string; system: string }
> = {
  agri: {
    mission: "Feed",
    serves:
      "Restores soil and smallholder livelihoods so Africa can produce food with dignity and regenerative integrity.",
    system:
      "Supplies verified regenerative produce into Foods, Direct markets, and institutional programmes.",
  },
  foods: {
    mission: "Feed",
    serves:
      "Delivers fortified, affordable nutrition at scale — households, schools, catering and institutions.",
    system:
      "Turns Agri outputs into shelf-stable products with audited quality and SupplierAdvisor® commerce.",
  },
  direct: {
    mission: "Empower",
    serves:
      "Builds distribution and last-mile routes so producers keep value and communities access goods fairly.",
    system:
      "Moves Foods and Agri products to market while creating local jobs and micro-hub infrastructure.",
  },
  access: {
    mission: "Empower",
    serves:
      "Opens institutional, government and CSI capital pathways for verified African enterprises.",
    system:
      "Connects programmes and SMEs to funding and tenders that finance real delivery on the ground.",
  },
  connect: {
    mission: "Empower",
    serves:
      "Powers ethical trade on SupplierAdvisor® — verification, transparency and professional B2B rails.",
    system:
      "The trust layer for group companies and partners: orders, ratings, and auditable commerce.",
  },
  leadership: {
    mission: "Educate",
    serves:
      "Develops Super-Cube® leaders who decide ethically for enterprises, public service and community.",
    system:
      "Builds the human capability that runs every other pillar — governance, culture and integrity.",
  },
  foundation: {
    mission: "Cross-cutting",
    serves:
      "Channels philanthropy with proof — SDG-aligned programmes registered on SupplierAdvisor®.",
    system:
      "Funds and frames impact projects that Agri, Foods, Leadership and Impact help deliver.",
  },
  impact: {
    mission: "Cross-cutting",
    serves:
      "Orchestrates multi-pillar programmes so strategy becomes delivery — on time and on impact.",
    system:
      "The PMO glue: plans, executes and reports work that spans the full ecosystem.",
  },
  global: {
    mission: "Empower",
    serves:
      "Builds international distribution and route-to-market corridors that carry African excellence outward.",
    system:
      "Extends partnerships from priority nations so local pillars can scale without losing standards.",
  },
  royal: {
    mission: "Cross-cutting",
    serves:
      "Plans partnership with the royal family and tribal authorities to feed, educate and empower communities with respect and service.",
    system:
      "Anchors the group in heritage and community mandate — service that legitimises every pillar.",
  },
};

const missionColors: Record<string, string> = {
  Feed: "#059669",
  Educate: "#d97706",
  Empower: "#0284c7",
  "Cross-cutting": "#7c3aed",
};

export default function GroupPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/home-hero.jpg"
        logo={{
          src: "/bigfivegroup-logo.png",
          alt: "Big Five Group logo",
          width: 192,
          height: 192,
        }}
        eyebrow="THE GROUP · TEN PILLARS · ONE SYSTEM"
        title={
          <>
            One group.
            <br />
            Ten pillars.
            <br />
            One mission.
          </>
        }
        subtitle="An integrated African enterprise headquartered in KwaZulu-Natal. Ten pillars. One mission: Feed · Educate · Empower."
        ctas={[
          { href: "#strategy-deck", label: "Strategic deck", primary: true },
          { href: "#pillars", label: "Ten pillars" },
          { href: "#vision", label: "Vision · mission · values" },
        ]}
        overlayClassName="bg-black/55"
      />

      {/* Ecosystem intro — short; deck carries full narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <SectionHeading
          eyebrow="THE ECOSYSTEM"
          title="How the group works as one"
          subtitle="Regenerative production, fortified nutrition, last-mile, capital access, ethical commerce, leadership, philanthropy, delivery, global corridors and royal partnership — impact compounds instead of competing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2 text-left">
          {[
            {
              icon: Network,
              t: "Integrated, not siloed",
              d: "Each pillar strengthens the others — produce to plate to proof.",
            },
            {
              icon: Target,
              t: "Mission-led businesses",
              d: "Commercial excellence funds scale; people define success.",
            },
            {
              icon: Sparkles,
              t: "Standards that travel",
              d: "Verification, Super-Cube® and SDG design across the group.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 min-w-0"
            >
              <x.icon className="w-6 h-6 text-black mb-3" />
              <h3 className="text-base font-semibold text-black mb-1.5">{x.t}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fafafa] border-y border-black/10 py-14 sm:py-20 md:py-24">
        <StrategyDeck />
      </section>

      <IntelligenceNarrative variant="compact" />

      {/* Vision · Mission · Values — full web detail; deck has the brief version */}
      <section id="vision" className="bg-white border-y border-black/10 py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="NORTH STAR"
            title="Vision, mission & values drive every pillar"
            subtitle="The ten businesses are instruments of one purpose. Here is what they answer to — and why none of them stands alone."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs tracking-[2px] text-emerald-700 mb-4">
                <Compass className="w-4 h-4" />
                VISION
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-3">
                A prosperous Africa — for everyone on it
              </h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                Well-being is not a privilege. Families eat with dignity, leaders decide with
                integrity, and communities build economies they own. Every pillar must move the
                continent closer to that future.
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs tracking-[2px] text-sky-700 mb-4">
                <Target className="w-4 h-4" />
                MISSION
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-3">
                Feed. Educate. Empower.
              </h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                We deploy skills, capital, platforms and relationships so Africa can feed its
                people, educate its leaders, and empower its enterprises — at scale and with proof.
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs tracking-[2px] text-amber-700 mb-4">
                <Shield className="w-4 h-4" />
                VALUES
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-3">
                What we refuse to compromise
              </h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                Humanity, innovation, integrity, excellence, and purposeful impact. Values shape
                how we hire, partner, trade and deliver — across every pillar.
              </p>
            </div>
          </div>

          {/* Values chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                icon: Users,
                title: "Humanity",
                desc: "People first — Ubuntu in practice.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Better systems for African progress.",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "Honesty, transparency, ethical commerce.",
              },
              {
                icon: Sparkles,
                title: "Excellence",
                desc: "Professional standards, always.",
              },
              {
                icon: Heart,
                title: "Impact",
                desc: "Outcomes communities can feel.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="flex sm:flex-col items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-w-0"
              >
                <v.icon className="w-5 h-5 text-black shrink-0" />
                <div>
                  <div className="font-semibold text-black text-sm mb-0.5">{v.title}</div>
                  <div className="text-xs text-[#525252] leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission map */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="MISSION MAP"
          title="How pillars serve Feed · Educate · Empower"
          subtitle="Some pillars lead on food security. Others build leaders. Others unlock markets and capital. Cross-cutting pillars hold the system together."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: UtensilsCrossed,
              label: "Feed",
              color: "#059669",
              pillars: ["Agri", "Foods"],
              blurb:
                "Regenerative production and fortified nutrition — food security with quality, shelf life and dignity.",
            },
            {
              icon: GraduationCap,
              label: "Educate",
              color: "#d97706",
              pillars: ["Leadership"],
              blurb:
                "Super-Cube® doctoral leadership for nations and enterprises — ethical decision-making at scale.",
            },
            {
              icon: Zap,
              label: "Empower",
              color: "#0284c7",
              pillars: ["Direct", "Access", "Connect", "Global"],
              blurb:
                "Distribution, capital access, SupplierAdvisor® commerce and international route-to-market.",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 min-w-0"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${m.color}18`, color: m.color }}
              >
                <m.icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-black mb-2">{m.label}</h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-4">{m.blurb}</p>
              <div className="flex flex-wrap gap-2">
                {m.pillars.map((p) => (
                  <span
                    key={p}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full border border-black/10 bg-[#fafafa]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-[#525252] max-w-2xl mx-auto">
          <strong className="text-black">Foundation, Impact and Royal</strong> cut across all three —
          funding, delivering and legitimising service to communities in partnership with heritage
          and transparent impact.
        </p>
      </section>

      {/* All 10 pillars */}
      <section id="pillars" className="bg-white border-y border-black/10 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="THE TEN PILLARS"
            title="Every business. One vision."
            subtitle="Click any pillar for full detail. Below: how each one supports the group’s vision, mission and values in the living ecosystem."
          />

          <div className="space-y-4 sm:space-y-5">
            {companies.map((company, index) => {
              const support = pillarSupport[company.slug];
              const missionLabel = support?.mission ?? "Cross-cutting";
              const missionColor = missionColors[missionLabel] ?? "#7c3aed";

              return (
                <motion.article
                  key={company.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: Math.min(index * 0.03, 0.24) }}
                  className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] overflow-hidden min-w-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-4 p-5 sm:p-7 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/10 bg-white min-w-0">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 flex items-center justify-center"
                          style={{
                            backgroundColor: `${company.color}15`,
                            color: company.color,
                          }}
                        >
                          <CompanyIcon name={company.icon} size={28} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[1.5px] text-[#737373] mb-1">
                            Pillar {String(index + 1).padStart(2, "0")}
                          </div>
                          <h3
                            className="text-2xl sm:text-3xl font-semibold tracking-tighter"
                            style={{ color: company.color }}
                          >
                            {company.name}
                          </h3>
                          <p className="text-sm text-[#525252] mt-1 leading-snug">
                            {company.tagline}
                          </p>
                        </div>
                      </div>
                      <span
                        className="inline-flex self-start text-[10px] uppercase tracking-[1.5px] font-semibold px-2.5 py-1 rounded-full mb-4"
                        style={{
                          backgroundColor: `${missionColor}18`,
                          color: missionColor,
                        }}
                      >
                        Mission · {missionLabel}
                      </span>
                      <p className="text-sm text-[#404040] leading-relaxed mb-5 flex-1">
                        {company.description}
                      </p>
                      <Link
                        href={`/${company.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-black group"
                      >
                        Enter {company.name}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                      </Link>
                    </div>

                    <div className="lg:col-span-8 p-5 sm:p-7 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 min-w-0">
                      <div className="rounded-2xl border border-black/10 bg-white p-5 min-w-0">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#737373] mb-2">
                          Serves the vision & mission
                        </div>
                        <p className="text-sm sm:text-base text-[#404040] leading-relaxed">
                          {support?.serves}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-black/10 bg-white p-5 min-w-0">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#737373] mb-2">
                          In the ecosystem
                        </div>
                        <p className="text-sm sm:text-base text-[#404040] leading-relaxed">
                          {support?.system}
                        </p>
                      </div>
                      <div className="sm:col-span-2 rounded-2xl border border-black/10 bg-white p-5 min-w-0">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#737373] mb-2">
                          Impact signature
                        </div>
                        <p className="text-sm sm:text-base text-black font-medium leading-relaxed">
                          {company.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* System flow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="ONE VALUE CHAIN OF IMPACT"
          title="From soil and service to scale"
          subtitle="A simplified view of how pillars hand work to each other — so vision becomes meals, skills, jobs and verified outcomes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Produce & nourish",
              d: "Agri regenerates land; Foods fortifies nutrition people actually eat.",
            },
            {
              step: "02",
              title: "Move & access",
              d: "Direct builds route-to-market; Access unlocks capital and institutional pathways.",
            },
            {
              step: "03",
              title: "Trade & lead",
              d: "Connect verifies commerce on SupplierAdvisor®; Leadership develops Super-Cube® decision-makers.",
            },
            {
              step: "04",
              title: "Serve & scale",
              d: "Foundation funds; Impact delivers; Royal partners communities; Global opens corridors.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 min-w-0"
            >
              <div className="text-3xl font-light tracking-tighter text-black/20 mb-3">{s.step}</div>
              <h3 className="text-lg font-semibold text-black mb-2">{s.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs tracking-[3px] text-white/40 mb-4">ONE GROUP · TEN PILLARS</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-5 text-balance">
            Built so Africa can prosper
          </h2>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8">
            Whether you engage one pillar or the full ecosystem, you are working with a group that
            measures success by food security, ethical leadership, and empowered communities — not
            by slide decks alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/about"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold"
            >
              About Big Five
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10"
            >
              Book a briefing
            </Link>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="ENTER THE ECOSYSTEM"
        title="Find the pillar that fits your partnership"
        subtitle="Explore any of the ten businesses — or start a conversation about multi-pillar programmes."
        primary={{ href: "/contact", label: "Book a briefing" }}
        secondary={{ href: "/#pillars", label: "View all pillars" }}
      />
    </div>
  );
}
