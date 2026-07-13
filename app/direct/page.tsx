"use client";

import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import FoodsNetworkPanel from "../components/FoodsNetworkPanel";
import LocalNewsVideo from "../components/LocalNewsVideo";
import {
  SectionHeading,
  FeatureGrid,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import { Sun, Network, Package, Coins, MapPin, Users, BarChart3, Zap } from "lucide-react";
import { SA_LOGIN, SA_ONBOARDING } from "../lib/saCopy";

const ACCENT = "#f97316";

export default function DirectPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/container-action-1.jpg"
        eyebrow="PILLAR 03 · DIRECT MARKET ACCESS"
        title={
          <>
            Big Five Direct
            <br />
            Farm gate to market gate
          </>
        }
        subtitle="Eliminate middlemen. Solar micro-hubs, last-mile logistics, and transparent trade that keep value with African producers — powered by Big Five Foods on SupplierAdvisor®."
        ctas={[
          { href: "#network", label: "Containers & food impact", primary: true },
          {
            href: "https://www.supplieradvisor.com/dashboard/containers",
            label: "SA containers",
            external: true,
          },
          {
            href: SA_LOGIN,
            label: "Existing user? Log in",
            external: true,
          },
        ]}
        overlayClassName="bg-[#431407]/55"
      />

      <SupplierTrust entityName="Big Five Foods (linked via Direct)" compact />

      {/* Foods × SA network */}
      <section id="network" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="SUPPLIERADVISOR® · BIG FIVE FOODS"
          title="Containers, locations & food impact"
          subtitle="Direct connects to Big Five Foods on SupplierAdvisor® so partners can see the distribution network and the nutrition impact behind every last-mile route."
        />
        <FoodsNetworkPanel />
      </section>

      <LocalNewsVideo accent={ACCENT} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="DIRECT. TRANSPARENT. POWERFUL."
          title="Cut the middle. Keep the margin."
          subtitle="Big Five Direct connects producers to markets through infrastructure and digital matching — with professional commerce rails buyers trust."
        />
        <StatRow
          accent={ACCENT}
          stats={[
            { value: "34%", label: "Higher prices for producers" },
            { value: "R1.2B", label: "Direct trade volume facilitated" },
            { value: "47.8k", label: "Direct jobs created" },
            { value: "92%", label: "Value retained by producers" },
          ]}
        />
      </section>

      <section id="model" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="INFRASTRUCTURE" title="Micro-hubs that move markets" />
          <FeatureGrid
            accent={ACCENT}
            items={[
              {
                icon: Sun,
                title: "Solar micro-hubs",
                desc: "IoT-enabled, solar-powered hubs — storage, cold chain, and digital commerce under one roof.",
              },
              {
                icon: Network,
                title: "Direct matching",
                desc: "AI-powered matching of producers to verified buyers with transparent fees (max 8%).",
              },
              {
                icon: Package,
                title: "Last-mile logistics",
                desc: "Containerised points and coordinated logistics that cut spoilage and leakage.",
              },
              {
                icon: Coins,
                title: "Value retention",
                desc: "Producers keep up to 92% of value, with working capital and training alongside market access.",
              },
              {
                icon: MapPin,
                title: "Urban reliability",
                desc: "Traceable supply, volume guarantees, and quality CoAs for cities and institutions.",
              },
              {
                icon: BarChart3,
                title: "Investable unit economics",
                desc: "Asset-backed hubs with measurable job creation and proven payback pathways.",
              },
            ]}
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="PROCESS" title="Three steps to last-mile sovereignty" />
        <ProcessSteps
          accent={ACCENT}
          steps={[
            {
              step: "01",
              title: "Hub activation",
              desc: "Deploy solar micro-hubs that create local jobs and become community economic nodes.",
            },
            {
              step: "02",
              title: "Direct matching",
              desc: "Live inventory, quality proofs, and demand meet on platform. Where applicable, POs settle via SupplierAdvisor® with real-time status.",
            },
            {
              step: "03",
              title: "Scale & replicate",
              desc: "Proven unit economics with expansion from active hubs toward continental coverage.",
            },
          ]}
        />
      </section>

      <section className="bg-[#c2410c] py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: Users,
              t: "For producers",
              d: "Keep more value. Access markets without predatory intermediaries.",
            },
            {
              icon: MapPin,
              t: "For buyers",
              d: "Reliable, traceable supply with professional documentation.",
            },
            {
              icon: Zap,
              t: "For investors",
              d: "Infrastructure-backed models with job and trade metrics.",
            },
          ].map((x) => (
            <div key={x.t} className="bg-white/10 rounded-3xl p-8">
              <x.icon className="w-9 h-9 text-orange-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{x.t}</h3>
              <p className="text-white/80 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SupplierTrust entityName="Big Five Direct and verified trading partners" />

      <FinalCta
        eyebrow="GO DIRECT"
        title="Join the Direct network"
        subtitle="Hubs, producers, and buyers building last-mile sovereignty — with professional verification. Existing company users can log in to SupplierAdvisor®."
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
