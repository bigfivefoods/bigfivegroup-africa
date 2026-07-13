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

const ACCENT = "#10b981";

export default function AgriPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
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
        subtitle="Partnering with Tribal Authorities, the Zulu Kingdom, and governments across Africa to regenerate farmland, empower farmers, and feed the continent with verified provenance."
        ctas={[
          { href: "#zulukingdom", label: "Zulu Kingdom partnership", primary: true },
          {
            href: "https://www.supplieradvisor.com/",
            label: "Verified on SupplierAdvisor®",
            external: true,
          },
        ]}
        overlayClassName="bg-black/45"
      />

      <SupplierTrust entityName="Big Five Agri and group suppliers" compact />

      <section id="zulukingdom" className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="DEEP PARTNERSHIP"
          title="Working hand-in-hand with the Zulu Kingdom"
          subtitle="We stand alongside traditional leadership and government structures to restore African agriculture from the ground up — with dignity, ownership, and modern capability."
        />
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-black/10 rounded-3xl p-9">
            <Handshake className="w-11 h-11 text-[#047857] mb-5" />
            <h3 className="text-2xl font-semibold tracking-tight text-black mb-4">
              Our commitment
            </h3>
            <ul className="space-y-3 text-[#404040]">
              <li>• Restore degraded farmland with regenerative practices</li>
              <li>• Train farmers in climate-smart techniques at scale</li>
              <li>• Build value chains that benefit local communities first</li>
              <li>• Protect indigenous knowledge while introducing innovation</li>
              <li>• Honour heritage while advancing food sovereignty</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-9">
            <Leaf className="w-11 h-11 text-[#047857] mb-5" />
            <h3 className="text-2xl font-semibold tracking-tight text-black mb-4">
              Regenerative with purpose
            </h3>
            <ul className="space-y-3 text-[#404040]">
              <li>• Convert degraded soil into carbon-rich farmland</li>
              <li>• Blend indigenous crops with climate-resilient varieties</li>
              <li>• Establish cooperatives with community ownership</li>
              <li>• Open direct market access for fairer prices</li>
              <li>• Develop the next generation of agricultural leaders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="CONTINENTAL REACH" title="Impact opportunity across Africa" />
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "2.8M", label: "Hectares of regenerative opportunity" },
              { value: "50k+", label: "Farmers to be trained" },
              { value: "47%", label: "Income increase potential" },
              { value: "54", label: "Nations in our African vision" },
            ]}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
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
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="CAPABILITY" title="Built for serious agricultural partners" />
          <FeatureGrid
            accent={ACCENT}
            items={[
              {
                icon: Tractor,
                title: "Farmer-first models",
                desc: "Training, cooperative structures, and market access that leave value with producers.",
              },
              {
                icon: Droplets,
                title: "Climate-smart practices",
                desc: "Drought resilience, soil restoration, and carbon-aware farming systems.",
              },
              {
                icon: LineChart,
                title: "Buyer-ready supply",
                desc: "Traceable produce with documentation standards institutional buyers expect.",
              },
              {
                icon: Users,
                title: "Government alignment",
                desc: "Programmes structured for food security policy, B-BBEE, and national targets.",
              },
              {
                icon: Coins,
                title: "Fair economics",
                desc: "Direct matching and transparent fees so farmers keep more of what they grow.",
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
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Users className="w-14 h-14 mx-auto text-[#6ee7b7] mb-6" />
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter mb-6">
            Our promise to African farmers
          </h2>
          <p className="text-xl text-white/85 leading-relaxed mb-10">
            Every farmer we work with becomes part of a movement that restores dignity, creates
            wealth, and builds food sovereignty. We don&apos;t just teach farming — we build futures.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { t: "Land restoration", d: "Fertile soil for the next generation, not desert." },
              { t: "Fair income", d: "Direct markets so producers keep more value." },
              { t: "Ownership", d: "Cooperatives and structures communities control." },
            ].map((x) => (
              <div key={x.t} className="bg-white/10 rounded-3xl p-6">
                <div className="font-semibold text-lg mb-2">{x.t}</div>
                <div className="text-white/75 text-sm leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Agri" />

      <FinalCta
        eyebrow="REGENERATE WITH US"
        title="Let's restore Africa's farmland together"
        subtitle="Governments, institutions, investors, and farmers — there is a place for you in this movement."
        primary={{ href: "/connect", label: "Become an Agri partner" }}
        secondary={{
          href: "https://www.supplieradvisor.com/",
          label: "View on SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
