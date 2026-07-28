"use client";

import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import StrategyDeck from "../components/StrategyDeck";
import PillarAlignmentBand from "../components/PillarAlignmentBand";
import {
  SectionHeading,
  FeatureGrid,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import {
  Target,
  ClipboardCheck,
  Users,
  BarChart3,
  Map,
  Shield,
  Workflow,
  HeartPulse,
} from "lucide-react";
import CaseStudyNsnp from "../components/CaseStudyNsnp";
import { MARKET_TRACTION } from "../lib/investor-model";
import { pageBrand } from "../lib/pageBrand";

const ACCENT = "#7c3aed";

export default function ImpactPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/impact-hero.jpg"
        eyebrow="PILLAR · BIG FIVE IMPACT"
        title={
          <>
            Project management
            <br />
            that delivers Africa
          </>
        }
        subtitle="Proudly African for Africa. Big Five Impact is the programme office of the group — orchestrating multi-pillar delivery across the continent so strategy becomes jobs, meals, markets, and measurable results. We work with the Director General of Health to help drive Group products into South Africa’s Department of Health and health pathways across Africa."
        ctas={[
          { href: "#strategy-deck", label: "Strategic overview deck", primary: true },
          { href: "#health-channel", label: "Health channel" },
          { href: "#case-study", label: "NSNP case study" },
          { href: "#how", label: "How we deliver" },
        ]}
        overlayClassName={pageBrand.impact.overlay}
      />

      <SupplierTrust entityName="Big Five Group entities (where applicable)" compact />

      <section
        id="health-channel"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50/40 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 text-white"
                style={{ backgroundColor: ACCENT }}
              >
                <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-violet-800 font-semibold mb-2">
                  INSTITUTIONAL HEALTH CHANNEL
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black mb-3 text-balance">
                  {MARKET_TRACTION.healthChannel.title}
                </h2>
                <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-4">
                  {MARKET_TRACTION.healthChannel.detail} Together with the NSNP pathway under Basic
                  Education, this strengthens multi-department credibility in South Africa and
                  supports Group product introduction into public health systems as programmes
                  mature — always with delivery capacity attached.
                </p>
                <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed max-w-3xl">
                  Framed as a working relationship with the Director General of Health and a Group
                  channel coordinated through Impact — not that the DG is part of Big Five Impact,
                  and not a claim that multi-country Department of Health supply awards are already
                  closed. Request a dated partner brief for diligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PillarAlignmentBand slug="impact" accent="#7c3aed" accentSoft="#f5f3ff" />

      <div className="bg-white border-b border-black/10">
        <CaseStudyNsnp />
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-2xl sm:rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 sm:p-8">
          <div className="text-xs tracking-[2px] text-violet-800 font-semibold mb-2">
            IMPACT DASHBOARD · PUBLIC SNAPSHOT
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black mb-4">
            High-level metrics partners can cite
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            {[
              { v: "2.5m", l: "Children/day NSNP plan (programme landed)" },
              { v: "150k+", l: "Meals delivered to date" },
              { v: "10", l: "Pillars under one PMO" },
              { v: "SDG", l: "1 · 2 · 4 · 8 · 10 · 17 design" },
            ].map((x) => (
              <div
                key={x.l}
                className="rounded-xl border border-black/10 bg-white p-3 sm:p-4 min-w-0"
              >
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-violet-900">
                  {x.v}
                </div>
                <div className="text-[11px] sm:text-xs text-[#525252] mt-1 leading-snug">{x.l}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed">
            Last updated: July 2026 · Group-reported and pathway ambitions — request a formal brief
            for partner-grade audit packs.{" "}
            <a href="/contact" className="underline text-black font-medium">
              Book a briefing
            </a>
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="THE DELIVERY ARM"
          title="One PMO. Every pillar. Continental outcomes."
          subtitle="Impact sits across Agri, Foods, Direct, Access, Connect, Leadership, and Foundation — aligning scope, timeline, budget, and verification so governments, DFIs, and corporates get one accountable partner."
        />
        <FeatureGrid
          accent={ACCENT}
          items={[
            {
              icon: Workflow,
              title: "Cross-pillar orchestration",
              desc: "We sequence farming, nutrition, logistics, capital access, and leadership under a single programme plan — not siloed initiatives.",
            },
            {
              icon: ClipboardCheck,
              title: "Institutional discipline",
              desc: "Gates, risk registers, RAID logs, stakeholder maps, and reporting cadence built for public-sector and DFI standards.",
            },
            {
              icon: HeartPulse,
              title: "Department of Health channel",
              desc: "Working with the Director General of Health, we help drive Group products into South Africa’s Department of Health and health pathways in other African countries — coordinated through Impact’s PMO.",
            },
            {
              icon: Map,
              title: "Continent-aware delivery",
              desc: "Field reality across active markets — South Africa, Kenya, Ghana, Zambia, DRC, Tanzania, Namibia, Zimbabwe, Lesotho, Germany, and Hungary.",
            },
            {
              icon: BarChart3,
              title: "Measurable KPIs",
              desc: "Jobs, meals, hectares, contracts, and community outcomes tracked with evidence — not vanity metrics.",
            },
            {
              icon: Shield,
              title: "Ethical commerce rails",
              desc: "Where commerce applies, transactions run via SupplierAdvisor® verified profiles with real-time order feedback.",
            },
            {
              icon: Users,
              title: "Stakeholder fluency",
              desc: "We translate between communities, ministries, investors, and operators so programmes actually land.",
            },
          ]}
        />
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PROOF OF DISCIPLINE"
            title="Delivery you can put in a board pack"
          />
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "PMO", label: "Cross-business programme office" },
              { value: "10", label: "Pillars integrated into delivery" },
              { value: "12", label: "Priority distribution markets (Group Global)" },
              { value: "PMO", label: "Outcome-linked workstreams & gates" },
            ]}
          />
        </div>
      </section>

      <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="METHOD" title="How Big Five Impact works" />
        <ProcessSteps
          accent={ACCENT}
          steps={[
            {
              step: "01",
              title: "Scope & design",
              desc: "Co-create theory of change, budget, risk, and governance with funders and implementing partners. Align to SDGs and commercial sustainability.",
            },
            {
              step: "02",
              title: "Orchestrate & execute",
              desc: "Run the multi-pillar PMO: agri inputs, food production, last-mile hubs, capital access, leadership training, and foundation programmes — one integrated Gantt.",
            },
            {
              step: "03",
              title: "Institutional health channel",
              desc: "Working with the Director General of Health, help drive Group products into South Africa’s Department of Health and health pathways in other African countries as programmes mature — Impact orchestrates delivery.",
            },
            {
              step: "04",
              title: "Measure & assure",
              desc: "Live reporting, field verification, and where applicable SupplierAdvisor® order rails so every commercial touchpoint is transparent.",
            },
          ]}
        />
      </section>

      <section className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="WHO ENGAGES US"
            title="Built for institutions that need results"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                title: "Governments & DFIs",
                desc: "Multi-year programmes with clear milestones, procurement integrity, and continental reach.",
              },
              {
                title: "Department of Health",
                desc: "Product pathways into SA DoH and African health systems, advanced through our work with the Director General of Health and Impact’s PMO discipline.",
              },
              {
                title: "Corporates & CSI",
                desc: "End-to-end management of high-visibility impact portfolios with ethical supply chains.",
              },
              {
                title: "Implementing partners",
                desc: "A professional spine that coordinates field teams without drowning local ownership.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
              >
                <Target className="w-8 h-8 text-[#c4b5fd] mb-4" />
                <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
                <p className="text-white/65 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="strategy-deck"
        className="bg-[#fafafa] border-y border-black/10 py-14 sm:py-20 md:py-24 scroll-mt-24"
      >
        <StrategyDeck />
      </section>

      <FinalCta
        eyebrow="LET'S DELIVER"
        title="Put a professional PMO on your African impact"
        subtitle="From single-district pilots to multi-country programmes — one accountable partner across the Group."
        primary={{ href: "/connect", label: "Start a conversation" }}
        secondary={{ href: "/group", label: "Explore the Group" }}
      />
    </div>
  );
}
