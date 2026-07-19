"use client";

import Image from "next/image";
import {
  Download,
  ExternalLink,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building2,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";
import LeadershipStrategyDeck from "../components/LeadershipStrategyDeck";

const SUPER_CUBE_URL = "https://www.super-cube.com";

const pillars = [
  {
    name: "Choices",
    color: "#ef4444",
    icon: "/choices-icon.png",
    blurb:
      "Decision-making intelligence, moral values, judgement and risk-taking — so leaders choose well under ambiguity.",
  },
  {
    name: "Principles",
    color: "#a855f7",
    icon: "/principles-icon.png",
    blurb:
      "Ethical foundations, contextual awareness, situational judgement and governance — the bedrock of trust.",
  },
  {
    name: "Mental",
    color: "#f97316",
    icon: "/mental-icon.png",
    blurb:
      "Cognitive intelligence, strategic thinking, problem-solving, vision and knowledge application.",
  },
  {
    name: "Emotional",
    color: "#22c55e",
    icon: "/emotional-icon.png",
    blurb:
      "Emotional intelligence, empathy, social relationships, motivation and inspiration.",
  },
  {
    name: "Physical",
    color: "#3b82f6",
    icon: "/physical-icon.png",
    blurb:
      "Physical health, energy management, fitness, nutrition and bodily resilience for sustained performance.",
  },
  {
    name: "Spiritual",
    color: "#1e40af",
    icon: "/spiritual-icon.png",
    blurb:
      "Purpose, meaning, faith, transcendence and spiritual intelligence — authentic integrity over time.",
  },
];

export default function LeadershipPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/leadership-hero.jpg"
        eyebrow="BIG FIVE LEADERSHIP · EDUCATION ARM"
        title={
          <>
            Leadership development
            <br />
            for Africa&apos;s future
          </>
        }
        subtitle="Big Five Leadership is the education arm of the group — Super-Cube® ethical leadership for nations and enterprises."
        ctas={[
          { href: "#leadership-deck", label: "Leadership deck", primary: true },
          {
            href: SUPER_CUBE_URL,
            label: "Explore Super-Cube®",
            external: true,
          },
          { href: "#book", label: "Free leadership book" },
        ]}
        overlayClassName="bg-black/55"
      />

      <section className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
        <LeadershipStrategyDeck />
      </section>

      {/* Positioning strip */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: GraduationCap,
              t: "Education arm",
              d: "Formal leadership development for executives, teams, and public servants.",
            },
            {
              icon: Award,
              t: "Doctoral model",
              d: "Super-Cube® — empirically validated research from the University of KwaZulu-Natal.",
            },
            {
              icon: Globe,
              t: "Africa-centric",
              d: "Built for African realities — Ubuntu, ethics, and systems that scale.",
            },
          ].map((item) => (
            <div key={item.t} className="flex gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#fefce8] flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#ca8a04]" />
              </div>
              <div>
                <div className="font-semibold text-black mb-1">{item.t}</div>
                <p className="text-sm text-[#525252] leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Super-Cube intro */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center mb-12">
          <Image
            src="/super-cube-logo.png"
            alt="Super-Cube®"
            width={280}
            height={64}
            className="mx-auto mb-8 h-auto"
          />
          <SectionHeading
            eyebrow="THE SUPER-CUBE® MODEL"
            title="You at the centre. Six faces of the cube."
            subtitle="Developed by Dr. Craig Ross Muller (DBA, University of KwaZulu-Natal, 2020), Super-Cube® is a multidimensional, human-centric framework — empirically validated in an African FMCG business-network. Leadership is substantially developable (≈70–76%) through deliberate practice."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            { v: "You", l: "At the centre of the cube" },
            { v: "6 faces", l: "Human-centric constructs" },
            { v: "70–76%", l: "Developable through practice" },
            { v: "5 levels", l: "Person → industry scale" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 text-center min-w-0"
            >
              <div className="text-xl sm:text-2xl font-semibold tracking-tighter text-[#ca8a04]">
                {s.v}
              </div>
              <div className="text-xs sm:text-sm text-[#525252] mt-1 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-12">
          {pillars.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-[#facc15]/50 transition-colors min-w-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image src={p.icon} alt={p.name} width={40} height={40} className="shrink-0" />
                <h3 className="font-semibold text-lg text-black" style={{ color: p.color }}>
                  {p.name}
                </h3>
              </div>
              <p className="text-sm text-[#525252] leading-relaxed">{p.blurb}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-8 mb-10 sm:mb-12">
          <div className="text-xs tracking-[2px] text-[#854d0e] font-semibold mb-3">
            ORIGINS · THEORY · VALIDATION
          </div>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed mb-4">
            Core output of Dr. Muller&apos;s DBA thesis at UKZN —{" "}
            <em>
              A Leadership Skills Development Model for the Kwaden Group: A Case Study of an African
              FMCG Business-Network
            </em>
            . Integrates trait, relational, charismatic, evolutionary and entrepreneurial leadership
            theory; Martin Buber&apos;s I–Thou philosophy; and Illeris&apos;s three-dimensional learning
            (content · incentive · interaction). Validated via confirmatory factor analysis (n=132)
            and interviews with 10 senior decision-makers; peer-reviewed in SAJEMS and JCM (2022).
          </p>
          <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
            Scope note: single-case study focus — results are context-specific; wider industry testing
            is recommended and welcomed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-12">
          {[
            { icon: Users, t: "Individuals & teams", d: "Personal development plans" },
            { icon: Building2, t: "Enterprises & governments", d: "Pipelines and public service" },
            { icon: Globe, t: "Networks & industry", d: "Alliance to African FMCG scale" },
          ].map((x) => (
            <div
              key={x.t}
              className="flex gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 min-w-0"
            >
              <x.icon className="w-5 h-5 text-[#ca8a04] shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-black block">{x.t}</span>
                <span className="text-xs text-[#525252]">{x.d}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={SUPER_CUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-9 py-4 rounded-full font-semibold"
          >
            Full programmes at super-cube.com
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="mt-4 text-sm text-[#737373]">
            Cohorts, coaching, and the Super-Cube® learning platform — launching and growing at{" "}
            <a
              href={SUPER_CUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-black font-medium"
            >
              www.super-cube.com
            </a>
          </p>
        </div>
      </section>

      {/* BOOK */}
      <section
        id="book"
        className="py-20 sm:py-24 bg-gradient-to-br from-[#fefce8] via-[#fffbeb] to-[#fefce8] border-y border-[#fde68a]/50"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#eab308] text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-[2px] mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            FREE DOWNLOAD
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4">
            The Super-Cube® Leadership Model book
          </h2>
          <p className="text-lg text-[#525252] mb-8 leading-relaxed">
            Igniting Africa&apos;s potential — a proven, human-centric blueprint from the doctoral
            research of Dr. Craig Ross Muller. Free PDF. No signup required.
          </p>
          <a
            href="/the-super-cube-leadership-model.pdf"
            download="The-Super-Cube-Leadership-Model.pdf"
            className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            <Download className="w-5 h-5" />
            Download the book
          </a>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="PEER-REVIEWED"
          title="The research behind the model"
          subtitle="Super-Cube® is backed by academic publication — the foundation of a serious leadership education arm."
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="/research/sajems-2022.pdf"
            download
            className="premium-button inline-flex items-center justify-center gap-3 bg-white border border-black/10 text-black px-8 py-4 rounded-full font-semibold hover:border-black/20"
          >
            <Download className="w-4 h-4" />
            SAJEMS Journal (2022)
          </a>
          <a
            href="/research/jcm-2022.pdf"
            download
            className="premium-button inline-flex items-center justify-center gap-3 bg-white border border-black/10 text-black px-8 py-4 rounded-full font-semibold hover:border-black/20"
          >
            <Download className="w-4 h-4" />
            JCM Journal (2022)
          </a>
        </div>
        <div className="text-center">
          <a
            href="https://www.researchgate.net/profile/Craig-Muller"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#854d0e] hover:text-[#713f12]"
          >
            View publications on ResearchGate
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Hub CTA */}
      <section className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
            Continue at www.super-cube.com
          </h2>
          <p className="text-white/65 text-lg mb-8 leading-relaxed">
            Big Five Leadership is the group education pillar. Super-Cube® is the dedicated home for
            programmes, cohorts, and the global Super-Cube community — next to be built out in full.
          </p>
          <a
            href={SUPER_CUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-3 bg-[#eab308] text-black px-10 py-4 rounded-full text-lg font-semibold"
          >
            Visit super-cube.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      <FinalCta
        eyebrow="DEVELOP WITH US"
        title="Build leaders who build nations"
        subtitle="Partner with Big Five Leadership for organisational and public-sector development — or enter Super-Cube® for the full learning journey."
        primary={{
          href: SUPER_CUBE_URL,
          label: "Go to super-cube.com",
          external: true,
        }}
        secondary={{ href: "/connect", label: "Partner with Big Five" }}
      />
    </div>
  );
}
