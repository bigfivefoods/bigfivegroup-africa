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

const SUPER_CUBE_URL = "https://www.super-cube.com";

const pillars = [
  {
    name: "Choices",
    color: "#ef4444",
    icon: "/choices-icon.png",
    blurb: "Ethical judgement and high-stakes decision intelligence.",
  },
  {
    name: "Principles",
    color: "#a855f7",
    icon: "/principles-icon.png",
    blurb: "Integrity, governance, and Ubuntu-rooted standards.",
  },
  {
    name: "Mental",
    color: "#f97316",
    icon: "/mental-icon.png",
    blurb: "Strategic thinking, problem-solving, and vision.",
  },
  {
    name: "Emotional",
    color: "#22c55e",
    icon: "/emotional-icon.png",
    blurb: "Empathy, trust, and relational leadership.",
  },
  {
    name: "Physical",
    color: "#3b82f6",
    icon: "/physical-icon.png",
    blurb: "Energy, resilience, and sustainable performance.",
  },
  {
    name: "Spiritual",
    color: "#1e40af",
    icon: "/spiritual-icon.png",
    blurb: "Purpose, meaning, and authentic integrity.",
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
        subtitle="Big Five Leadership is the education and development arm of the group — powered by the Super-Cube® doctoral model. World-class programmes, research, and resources live at super-cube.com."
        ctas={[
          {
            href: SUPER_CUBE_URL,
            label: "Explore Super-Cube®",
            primary: true,
            external: true,
          },
          { href: "#book", label: "Free leadership book" },
        ]}
        overlayClassName="bg-black/55"
      />

      {/* Positioning strip */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8">
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
            title="Six dimensions. One coherent system."
            subtitle="Developed by Dr. Craig Ross Muller (DBA), Super-Cube® develops the whole leader — so growth radiates from the individual to teams, organisations, and society."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {pillars.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-black/10 rounded-3xl p-6 hover:border-[#facc15]/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image src={p.icon} alt={p.name} width={40} height={40} />
                <h3 className="font-semibold text-lg text-black">{p.name}</h3>
              </div>
              <p className="text-sm text-[#525252] leading-relaxed">{p.blurb}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, t: "Individuals & teams" },
            { icon: Building2, t: "Enterprises & governments" },
            { icon: Globe, t: "Networks & society" },
          ].map((x) => (
            <div
              key={x.t}
              className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4"
            >
              <x.icon className="w-5 h-5 text-[#ca8a04] shrink-0" />
              <span className="text-sm font-medium text-black">{x.t}</span>
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
