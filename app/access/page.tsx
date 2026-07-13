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
import { SA_LOGIN, SA_ONBOARDING } from "../lib/saCopy";

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
        subtitle="Unlock government funding, institutional partnerships, and policy pathways — with verified suppliers and transparent delivery African institutions can trust."
        ctas={[
          { href: "#how", label: "How Access works", primary: true },
          {
            href: SA_ONBOARDING,
            label: "Start free trial",
            external: true,
          },
          {
            href: SA_LOGIN,
            label: "Existing user? Log in",
            external: true,
          },
        ]}
        overlayClassName="bg-[#1e3a8a]/55"
      />

      <SupplierTrust entityName="Access programme suppliers and SMEs" compact />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="BREAKING DOWN BARRIERS"
          title="Policy becomes projects. Projects become outcomes."
          subtitle="We help governments, corporates, and African enterprises navigate tenders, DFIs, and CSI with clean processes and verified counterparties."
        />
        <StatRow
          accent={ACCENT}
          stats={[
            { value: "R2.8B", label: "Contracts facilitated" },
            { value: "14.7k", label: "SMEs onboarded" },
            { value: "92%", label: "Repeat funding rate" },
            { value: "3.2×", label: "Industry win-rate multiple" },
          ]}
        />
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
              desc: "Win rates above industry average. Project management and transparent reporting for funders.",
            },
          ]}
        />
      </section>

      <section className="bg-[#1d4ed8] py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
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

      <SupplierTrust entityName="Access-network SMEs and institutional suppliers" />

      <FinalCta
        eyebrow="UNLOCK ACCESS"
        title="Start your Access journey"
        subtitle="Verified capital. Clean procurement. Institutional partnerships. Existing company users can log in to SupplierAdvisor®."
        primary={{ href: SA_ONBOARDING, label: "Start free trial", external: true }}
        secondary={{
          href: SA_LOGIN,
          label: "Log in to SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
