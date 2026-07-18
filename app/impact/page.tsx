"use client";

import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import StrategyDeck from "../components/StrategyDeck";
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
} from "lucide-react";

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
        subtitle="Big Five Impact is the programme office of the group — orchestrating multi-pillar delivery across the continent so strategy becomes jobs, meals, markets, and measurable results."
        ctas={[
          { href: "#strategy-deck", label: "Strategic overview deck", primary: true },
          { href: "#how", label: "How we deliver" },
        ]}
        overlayClassName="bg-[#2e1065]/55"
      />

      <SupplierTrust entityName="Big Five Group entities (where applicable)" compact />

      {/* Online pitch / strategic briefing */}
      <section className="bg-[#fafafa] py-14 sm:py-20 md:py-24 border-b border-black/10">
        <StrategyDeck />
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
              desc: "We translate between traditional authorities, ministries, investors, and operators so programmes actually land.",
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
              { value: "11", label: "Active operating nations" },
              { value: "100%", label: "Outcome-linked workstreams" },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                title: "Governments & DFIs",
                desc: "Multi-year programmes with clear milestones, procurement integrity, and continental reach.",
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

      <SupplierTrust entityName="programme suppliers and Big Five operating companies" />

      <FinalCta
        eyebrow="LET'S DELIVER"
        title="Put a professional PMO on your African impact"
        subtitle="From single-district pilots to multi-country programmes — Big Five Impact turns ambition into verified delivery."
        primary={{ href: "/connect", label: "Start a programme conversation" }}
        secondary={{
          href: "https://www.supplieradvisor.com/onboarding?type=business",
          label: "Start free trial",
          external: true,
        }}
      />
    </div>
  );
}
