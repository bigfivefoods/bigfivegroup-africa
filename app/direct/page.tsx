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
import {
  Sun,
  Network,
  Package,
  Coins,
  MapPin,
  Users,
  BarChart3,
  Zap,
  Wifi,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { SA_ONBOARDING } from "../lib/saCopy";
import DirectStrategyDeck from "../components/DirectStrategyDeck";
import {
  SANTACO,
  SANTACO_PARTNERSHIP,
  TAXI_INDUSTRY_CONTEXT,
} from "../lib/santaco";

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
        subtitle="Solar micro-hubs, SANTACO taxi-rank containers and transparent last-mile so producers keep value and communities get product — with Wi‑Fi surveys, marketing revenue and Super-Cube® education in the node."
        ctas={[
          { href: "#direct-deck", label: "Direct deck", primary: true },
          { href: "#santaco", label: "SANTACO partnership" },
          { href: "#network", label: "Live container network" },
          {
            href: SA_ONBOARDING,
            label: "Start free trial",
            external: true,
          },
        ]}
        overlayClassName="bg-[#431407]/55"
      />

      <SupplierTrust entityName="Big Five Direct · Foods distribution" compact />

      <section
        id="santaco"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#c2410c] font-semibold mb-3">
            {SANTACO_PARTNERSHIP.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance max-w-3xl">
            {SANTACO_PARTNERSHIP.title}
          </h2>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-6">
            {SANTACO_PARTNERSHIP.containers.detail} {SANTACO_PARTNERSHIP.purpose}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-[#9a3412] tabular-nums">
                {SANTACO_PARTNERSHIP.containers.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-black mt-1">
                {SANTACO_PARTNERSHIP.containers.label}
              </div>
              <div className="text-[10px] sm:text-xs text-[#737373] mt-1">
                Major taxi ranks · rural communities
              </div>
            </div>
            {TAXI_INDUSTRY_CONTEXT.stats.slice(0, 3).map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5"
              >
                <div className="text-lg sm:text-xl font-semibold tracking-tight text-black">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-black mt-1 leading-snug">
                  {s.label}
                </div>
                <div className="text-[10px] sm:text-xs text-[#737373] mt-1.5 leading-snug line-clamp-3">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {SANTACO_PARTNERSHIP.inContainer.map((item) => {
              const Icon =
                item.t.startsWith("Food")
                  ? Package
                  : item.t.startsWith("Wi")
                    ? Wifi
                    : item.t.startsWith("Marketing")
                      ? Coins
                      : GraduationCap;
              return (
                <div
                  key={item.t}
                  className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5"
                >
                  <Icon className="w-6 h-6 text-[#c2410c] mb-3" />
                  <h3 className="text-sm sm:text-base font-semibold text-black mb-1.5">{item.t}</h3>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{item.d}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-br from-[#fff7ed] to-white p-5 sm:p-6 mb-6">
            <div className="text-[10px] tracking-[2px] text-[#c2410c] font-semibold mb-2">
              INVESTOR LEVERAGE · TAXI-RANK ECONOMY
            </div>
            <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-3">
              {SANTACO_PARTNERSHIP.investorLeverage}
            </p>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl">
              {TAXI_INDUSTRY_CONTEXT.investorNote}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center text-xs sm:text-sm text-[#525252]">
            <a
              href={SANTACO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-black underline underline-offset-2"
            >
              {SANTACO.shortName} · {SANTACO.name}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="hidden sm:inline text-[#d4d4d4]">·</span>
            <a
              href="https://www.statssa.gov.za/publications/P0320/P03202020.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline underline-offset-2"
            >
              Stats SA NHTS 2020 (public transport mode share)
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="hidden sm:inline text-[#d4d4d4]">·</span>
            <a href="/methodology" className="underline underline-offset-2">
              Methodology & honesty notes
            </a>
          </div>
          <ul className="mt-4 space-y-1.5 text-[11px] sm:text-xs text-[#737373] max-w-3xl">
            {SANTACO_PARTNERSHIP.honesty.map((h) => (
              <li key={h} className="leading-relaxed flex gap-1.5">
                <span className="text-[#c2410c] shrink-0">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
        <DirectStrategyDeck />
      </section>

      {/* Foods × SA network — impact + live map */}
      <section id="network" className="py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center">
          <div className="text-xs tracking-[3px] text-[#c2410c] mb-3 font-medium">
            DIRECT × FOODS × SUPPLIERADVISOR®
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4 text-balance">
            Logistics that feed people
          </h2>
          <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
            See the live container network and the nutrition impact behind every route — transparent
            last-mile infrastructure built so communities eat with dignity.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FoodsNetworkPanel />
        </div>
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
            { value: "150k", label: "Meals delivered (programme-reported, with Foods)" },
            { value: "100k", label: "Children reached (programme-reported)" },
            { value: "~45%", label: "Foods GP (management-reported)" },
            { value: "~85%", label: "Cheaper vs wholesale & retail" },
            { value: "74%", label: "More nutrition design (internal analysis)" },
          ]}
        />
        <p className="mt-5 text-center text-[11px] sm:text-xs text-[#737373] max-w-2xl mx-auto leading-relaxed">
          Direct shares Foods nutrition impact where logistics and last-mile delivery serve the same
          programmes. Figures are programme-reported or internal analyses — not audited financials.{" "}
          <a href="/methodology" className="underline underline-offset-2 text-black font-medium">
            Methodology
          </a>
        </p>
      </section>

      <section id="model" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="INFRASTRUCTURE" title="Micro-hubs that move markets" />
          <FeatureGrid
            accent={ACCENT}
            items={[
              {
                icon: Package,
                title: "SANTACO containers",
                desc: "Partnered with SANTACO to roll out 15,000 containers at major taxi ranks and rural communities — Foods supply at high-footfall nodes.",
              },
              {
                icon: Wifi,
                title: "Wi‑Fi · surveys · marketing",
                desc: "Connectivity for surveys and on-site marketing that generates sales revenue — multi-use nodes, not empty shells.",
              },
              {
                icon: GraduationCap,
                title: "Super-Cube® education",
                desc: "Big Five Leadership / Super-Cube® touchpoints in-container — educate where taxis move people every day.",
              },
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
                icon: BarChart3,
                title: "Investable rank economics",
                desc: "Taxi-rank footfall + recurring food demand + media/data/education layers — phased density toward the 15k plan.",
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
              d: "SANTACO rank nodes: leverage SA’s dominant public-transport mode for food offtake, data, marketing and Super-Cube® reach.",
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

      <FinalCta
        eyebrow="GO DIRECT"
        title="Put last-mile rails on your nutrition ambition"
        subtitle="Containers, hubs and transparent stock for schools, programmes and commercial partners."
        primary={{ href: "/connect", label: "Partner on Direct" }}
        secondary={{
          href: "https://www.supplieradvisor.com/dashboard/containers",
          label: "SA containers",
          external: true,
        }}
      />
    </div>
  );
}
