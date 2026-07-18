"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Cpu,
  MessageSquare,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  Zap,
} from "lucide-react";
import { sa, SA_ONBOARDING, SA_LOGIN } from "../lib/saCopy";

const missionIcons = {
  Feed: UtensilsCrossed,
  Educate: GraduationCap,
  Empower: Zap,
} as const;

type Props = {
  /** compact = home/group strip; full = dedicated section */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * Shared “future systems” narrative: AI, robotics, SAM, on-chain —
 * maps to Feed · Educate · Empower.
 */
export default function IntelligenceNarrative({
  variant = "full",
  className = "",
}: Props) {
  const intel = sa.intelligence;
  const sam = sa.sam;

  if (variant === "compact") {
    return (
      <section
        id="intelligence"
        className={`border-y border-black/10 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#134e4a] text-white ${className}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
          <div className="text-xs tracking-[2px] text-cyan-300/90 font-semibold mb-3">
            {intel.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance mb-4 max-w-3xl">
            {intel.title}
          </h2>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {intel.body}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {intel.pillars.map((p) => {
              const Icon = missionIcons[p.t as keyof typeof missionIcons] ?? Sparkles;
              return (
                <div
                  key={p.t}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 min-w-0"
                >
                  <Icon className="w-5 h-5 text-cyan-300 mb-2" />
                  <div className="font-semibold text-white mb-1">{p.t}</div>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{p.d}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold"
            >
              Explore Connect & SAM
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/connect/sam"
              className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10"
            >
              Meet {sam.name}
            </Link>
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10"
            >
              Start free on SupplierAdvisor®
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="intelligence"
      className={`bg-white border-y border-black/10 py-16 sm:py-20 md:py-24 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs tracking-[3px] text-cyan-700 font-semibold mb-3">
          {intel.eyebrow}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4 text-balance max-w-3xl">
          {intel.title}
        </h2>
        <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl mb-10">
          {intel.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {intel.pillars.map((p) => {
            const Icon = missionIcons[p.t as keyof typeof missionIcons] ?? Sparkles;
            return (
              <div
                key={p.t}
                className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 min-w-0"
              >
                <Icon className="w-8 h-8 text-cyan-700 mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">{p.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            {
              icon: MessageSquare,
              t: sam.name,
              d: `${sam.fullName} — ${sam.tagline}`,
            },
            {
              icon: Brain,
              t: "AI-powered trust",
              d: "Verification, ratings, matching and risk intelligence on one chain.",
            },
            {
              icon: Cpu,
              t: "Robotics & automation",
              d: "Where automation multiplies packing, hubs and last-mile dignity.",
            },
            {
              icon: Bot,
              t: "Live pulse",
              d: "Enterprise telemetry so operators see the chain before it fails.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-black/10 bg-white p-5 min-w-0"
            >
              <x.icon className="w-5 h-5 text-black mb-2" />
              <div className="font-semibold text-black text-sm mb-1">{x.t}</div>
              <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link
            href="/connect/sam"
            className="premium-button inline-flex items-center justify-center gap-2 bg-cyan-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-cyan-800"
          >
            Explore {sam.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/connect"
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5"
          >
            Big Five Connect
          </Link>
          <a
            href={SA_LOGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5"
          >
            Log in to SupplierAdvisor®
          </a>
        </div>
      </div>
    </section>
  );
}
