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
  Leaf,
  Handshake,
  Users,
  Coins,
  UserCheck,
  Tractor,
  Droplets,
  LineChart,
} from "lucide-react";
import AgriStrategyDeck from "../components/AgriStrategyDeck";
import PillarAlignmentBand from "../components/PillarAlignmentBand";
import { pageBrand } from "../lib/pageBrand";

const ACCENT = "#10b981";

export default function AgriPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/agri-hero.jpg"
        eyebrow="PILLAR 01 · REGENERATIVE FARMING"
        title={
          <>
            Big Five Agri
            <br />
            Soil. Sovereignty. Scale.
          </>
        }
        subtitle="Working with rural farmers across Africa to regenerate farmland, raise livelihoods, and feed the continent with verified, regenerative produce."
        ctas={[
          { href: "#agri-deck", label: "Agri deck", primary: true },
          { href: "#rural-farmers", label: "Rural farmers" },
          { href: "/connect", label: "Partner with us" },
        ]}
        overlayClassName={pageBrand.agri.overlay}
      />

      <SupplierTrust entityName="Big Five Agri" compact />

      <PillarAlignmentBand slug="agri" accent={ACCENT} accentSoft="#ecfdf5" />

      <section id="rural-farmers" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="RURAL FARMERS FIRST"
          title="Working hand-in-hand with rural farmers"
          subtitle="Big Five Agri stands with rural producers — smallholders, cooperatives and family farms — to restore land, raise income and open fair markets from the ground up."
        />
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-black/10 rounded-3xl p-9">
            <Handshake className="w-11 h-11 text-[#047857] mb-5" />
            <h3 className="text-2xl font-semibold tracking-tight text-black mb-4">
              How we work with rural farmers
            </h3>
            <ul className="space-y-3 text-[#404040]">
              <li>• Partner with rural smallholders and cooperatives as primary producers</li>
              <li>• Train farmers in climate-smart, regenerative techniques</li>
              <li>• Build value chains that leave more income on the farm</li>
              <li>• Combine practical know-how with tools rural producers can use</li>
              <li>• Design programmes with farmers — not imposed on them</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-9">
            <Leaf className="w-11 h-11 text-[#047857] mb-5" />
            <h3 className="text-2xl font-semibold tracking-tight text-black mb-4">
              Regenerative with purpose
            </h3>
            <ul className="space-y-3 text-[#404040]">
              <li>• Convert degraded soil into productive, carbon-rich farmland</li>
              <li>• Support climate-resilient crops suited to local conditions</li>
              <li>• Strengthen rural cooperatives and shared infrastructure</li>
              <li>• Open direct market access so farmers keep fairer prices</li>
              <li>• Grow the next generation of rural agricultural leaders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CONTINENTAL REACH · OUR PLAN & AMBITION"
            title="Impact opportunity across Africa"
            subtitle="These figures describe what we are planning to do — our continental ambition for regenerative agriculture, farmer development, and income opportunity. They are not claims of programmes already completed at this scale."
          />
          <StatRow
            accent={ACCENT}
            stats={[
              {
                value: "2.8M",
                label: "Hectares of regenerative opportunity we plan to unlock",
              },
              {
                value: "50k+",
                label: "Farmers we plan to train",
              },
              {
                value: "47%",
                label: "Income increase potential we aim for",
              },
              {
                value: "54",
                label: "Nations in our African vision & expansion plan",
              },
            ]}
          />
          <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-center text-sm sm:text-base text-[#525252] leading-relaxed">
            Big Five Agri is building toward a continental footprint:{" "}
            <strong className="text-black">2.8 million hectares</strong> of regenerative
            opportunity,{" "}
            <strong className="text-black">50,000+ farmers</strong> trained,{" "}
            <strong className="text-black">~47% income increase potential</strong> for participating
            producers, and a vision that reaches{" "}
            <strong className="text-black">54 African nations</strong>. That is our plan and
            ambition — delivered step by step with rural farmers, cooperatives, and verified
            markets.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="HOW AGRI WORKS"
          title="From soil health to verified markets"
        />
        <ProcessSteps
          accent={ACCENT}
          steps={[
            {
              step: "01",
              title: "Regenerate & verify",
              desc: "Farmers onboard with soil data, satellite monitoring, and regenerative protocols. Every hectare is measured, not assumed.",
            },
            {
              step: "02",
              title: "Connect & transact",
              desc: "Buyers access inventory, quality CoAs, and provenance. Where applicable, orders run through SupplierAdvisor® with real-time feedback.",
            },
            {
              step: "03",
              title: "Impact & scale",
              desc: "Dashboards show income uplift, biodiversity gains, and CO₂ outcomes — ready for governments, DFIs, and buyers.",
            },
          ]}
        />
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="CAPABILITY" title="Built for serious agricultural partners" />
          <FeatureGrid
            accent={ACCENT}
            items={[
              {
                icon: Tractor,
                title: "Rural farmer-first models",
                desc: "Training, cooperatives and market access designed so rural producers keep more of the value they grow.",
              },
              {
                icon: Droplets,
                title: "Climate-smart practices",
                desc: "Drought resilience, soil restoration and carbon-aware systems that work on rural land.",
              },
              {
                icon: LineChart,
                title: "Buyer-ready supply",
                desc: "Traceable produce with documentation standards institutional buyers expect.",
              },
              {
                icon: Users,
                title: "Rural livelihoods",
                desc: "Programmes that lift household income, skills and food security in farming communities.",
              },
              {
                icon: Coins,
                title: "Fair economics",
                desc: "Direct matching and transparent routes so rural farmers keep more of what they grow.",
              },
              {
                icon: UserCheck,
                title: "Ethical verification",
                desc: "Listed where applicable on SupplierAdvisor® as verified ethical companies.",
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-[#047857] py-20 sm:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-14 h-14 mx-auto text-[#6ee7b7] mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
            Our promise to rural African farmers
          </h2>
          <p className="text-xl text-white/85 leading-relaxed mb-10">
            Every rural farmer we work with becomes part of a movement that restores land, raises
            income and builds food sovereignty. We don&apos;t just teach farming — we build futures
            with producers at the centre.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { t: "Land restoration", d: "Fertile soil for the next generation, not desert." },
              { t: "Fair income", d: "Direct markets so rural producers keep more value." },
              { t: "Ownership", d: "Cooperatives and structures rural farmers control." },
            ].map((x) => (
              <div key={x.t} className="bg-white/10 rounded-3xl p-6">
                <div className="font-semibold text-lg mb-2">{x.t}</div>
                <div className="text-white/75 text-sm leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="agri-deck"
        className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24 scroll-mt-24"
      >
        <AgriStrategyDeck />
      </section>

      <FinalCta
        eyebrow="REGENERATE WITH US"
        title="Let's restore Africa's farmland together"
        subtitle="Rural farmers, cooperatives, buyers and funds — regenerative supply that feeds households and the Group."
        primary={{ href: "/connect", label: "Become an Agri partner" }}
        secondary={{ href: "/group", label: "See the Group" }}
      />
    </div>
  );
}
