"use client";

import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  FeatureGrid,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import {
  FileCheck,
  Scale,
  Building2,
  Handshake,
  Landmark,
  ShieldCheck,
  Users,
  TrendingUp,
} from "lucide-react";

import AccessStrategyDeck from "../components/AccessStrategyDeck";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { pageBrand } from "../lib/pageBrand";

const ACCENT = "#3b82f6";

export default function AccessPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/access-hero.jpg"
        eyebrow="PILLAR 04 · GOVERNMENT & INSTITUTIONAL ACCESS"
        title={
          <>
            Big Five Access
            <br />
            Capital that reaches impact
          </>
        }
        subtitle="Tenders, CSI and development capital pathways for verified African enterprises — with Group delivery capacity attached."
        ctas={[
          { href: "#access-deck", label: "Access deck", primary: true },
          { href: "#how", label: "How Access works" },
          { href: "/connect", label: "Talk to us" },
        ]}
        overlayClassName={pageBrand.access.overlay}
      />

      <SupplierTrust entityName="Access programme suppliers and SMEs" compact />

      <section className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
        <AccessStrategyDeck />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="SCHOOL NUTRITION AMBITION"
          title="Policy becomes projects. Projects become outcomes."
          subtitle={`We are planning to feed ${NSNP_CASE.ambition} ${NSNP_CASE.ambitionUnit} through the ${NSNP.shortName} for the ${NSNP.departmentShort} — institutional access that turns public nutrition mandates into daily meals.`}
        />
        <StatRow
          accent={ACCENT}
          stats={[
            {
              value: "2.5m",
              label: "Children a day — planned NSNP feeding ambition (DBE)",
            },
            {
              value: "NSNP",
              label: "National School Nutrition Programme pathway",
            },
            {
              value: "DBE",
              label: "Department of Basic Education",
            },
            {
              value: "Plan",
              label: "Ambition — not a delivered claim yet",
            },
          ]}
        />
        <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-center text-sm sm:text-base text-[#525252] leading-relaxed">
          Big Five is planning to feed{" "}
          <strong className="text-black">2.5 million children a day</strong> with fortified
          nutrition on the{" "}
          <strong className="text-black">{NSNP.name} ({NSNP.shortName})</strong> for the{" "}
          <strong className="text-black">{NSNP.department} ({NSNP.departmentShort})</strong>.
          That is our institutional scale ambition for school-day feeding — Access helps open the
          government and programme pathways that make delivery possible.
        </p>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="WHAT WE DELIVER" title="Sovereign capital, cleanly unlocked" />
          <FeatureGrid
            accent={ACCENT}
            items={[
              {
                icon: FileCheck,
                title: "Tender & bid support",
                desc: "Compliance packs, bid writing acceleration, and live tender tracking that cut response time dramatically.",
              },
              {
                icon: Scale,
                title: "B-BBEE & policy alignment",
                desc: "Structure programmes that meet transformation targets with verifiable community outcomes.",
              },
              {
                icon: Building2,
                title: "DFI & institutional capital",
                desc: "Match verified enterprises with development finance, CSI budgets, and sovereign funds.",
              },
              {
                icon: Handshake,
                title: "Public-private partnerships",
                desc: "Bankable PPP structures with on-chain reporting and clear accountability.",
              },
              {
                icon: ShieldCheck,
                title: "Verified supplier base",
                desc: "Where applicable, suppliers listed on SupplierAdvisor® as ethical, verified companies.",
              },
              {
                icon: TrendingUp,
                title: "Delivery assurance",
                desc: "Linked to Big Five Impact PMO so winning a tender is only the start of delivery.",
              },
            ]}
          />
        </div>
      </section>

      <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="PROCESS" title="How Access works" />
        <ProcessSteps
          accent={ACCENT}
          steps={[
            {
              step: "01",
              title: "Verify & onboard",
              desc: "KYC, financials, and impact scoring. Trusted nodes only — counterparties you can put in front of auditors.",
            },
            {
              step: "02",
              title: "Match & apply",
              desc: "AI matches opportunities to capability. Bid support and tracking keep you ahead of deadlines.",
            },
            {
              step: "03",
              title: "Win & deliver",
              desc: "Secure awards with clean process, then deliver with Group capacity and transparent reporting for funders.",
            },
          ]}
        />
      </section>

      <section className="bg-[#1d4ed8] py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: Landmark,
              t: "For government",
              d: "Clean supplier bases, reduced corruption risk, verified delivery.",
            },
            {
              icon: ShieldCheck,
              t: "For CSI / ESG",
              d: "High-impact projects with full traceability from spend to outcome.",
            },
            {
              icon: Users,
              t: "For SMEs",
              d: "A level playing field for contracts and capital previously out of reach.",
            },
          ].map((x) => (
            <div key={x.t} className="bg-white/10 rounded-3xl p-8">
              <x.icon className="w-9 h-9 text-blue-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{x.t}</h3>
              <p className="text-white/80 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCta
        eyebrow="UNLOCK ACCESS"
        title="Access that ends in delivery"
        subtitle="Ministries, CSI teams and SMEs — pathways with implementers who can execute across the Group."
        primary={{ href: "/connect", label: "Start a conversation" }}
        secondary={{ href: "/group", label: "See the Group" }}
      />
    </div>
  );
}
