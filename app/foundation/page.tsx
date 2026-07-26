"use client";

import Image from "next/image";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  FeatureGrid,
  ProcessSteps,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import { Heart, TrendingUp, Leaf, Users, ShieldCheck, ExternalLink } from "lucide-react";
import { SA_URL } from "../lib/saCopy";
import FoundationStrategyDeck from "../components/FoundationStrategyDeck";
import PillarAlignmentBand from "../components/PillarAlignmentBand";
import { pageBrand } from "../lib/pageBrand";

const ACCENT = "#0d9488";

const sdgGoals = [
  {
    number: "1",
    title: "No Poverty",
    desc: "Container micro-franchises and jobs lift families out of poverty.",
    icon: "/sdg/sdg-1.png",
  },
  {
    number: "2",
    title: "Zero Hunger",
    desc: "Fortified nutrition programmes reach children and communities at scale.",
    icon: "/sdg/sdg-2.png",
  },
  {
    number: "4",
    title: "Quality Education",
    desc: "Super-Cube® leadership development for the next generation.",
    icon: "/sdg/sdg-4.png",
  },
  {
    number: "8",
    title: "Decent Work",
    desc: "Ethical supply chains and local jobs with dignified livelihoods.",
    icon: "/sdg/sdg-8.png",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    desc: "Inclusive models and transparent capital for communities historically excluded.",
    icon: "/sdg/sdg-10.png",
  },
  {
    number: "17",
    title: "Partnerships",
    desc: "Collaboration with institutions, kingdoms, and corporates that accelerate real change.",
    icon: "/sdg/sdg-17.png",
  },
];

export default function FoundationPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/foundation-hero.jpg"
        eyebrow="REGISTERED NPO · LISTED ON SUPPLIERADVISOR®"
        title={
          <>
            Big Five Foundation
            <br />
            Impact you can verify
          </>
        }
        subtitle="Social, economic and environmental development with proof — the philanthropic engine of the Group, registered on SupplierAdvisor®."
        ctas={[
          { href: "#foundation-deck", label: "Foundation deck", primary: true },
          { href: "#impact", label: "Impact model" },
          {
            href: SA_URL,
            label: "View on SupplierAdvisor®",
            external: true,
          },
        ]}
        overlayClassName={pageBrand.foundation.overlay}
      />

      <SupplierTrust entityName="Big Five Foundation" compact />

      <PillarAlignmentBand slug="foundation" accent={ACCENT} accentSoft="#f0fdfa" />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
        <SectionHeading
          eyebrow="OUR PURPOSE"
          title="Why Big Five Foundation?"
          subtitle="Philanthropy without proof is marketing. We build programmes with theory of change, transparent capital, and delivery through Big Five Impact — so donors and communities see the same truth."
        />
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-xs tracking-[2px] text-[#737373] mb-2">
                SUPPLIERADVISOR® REGISTRATION
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
                Registered on SupplierAdvisor®
              </h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-4">
                Big Five Foundation has been registered on{" "}
                <a
                  href={SA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  www.supplieradvisor.com
                </a>
                — so partners, donors, and counterparties can verify the organisation on the same
                trusted network used for ethical trade and transparent commerce.
              </p>
              <a
                href={SA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:opacity-70"
              >
                Open SupplierAdvisor®
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="Measurable. Reportable. Replicable."
            subtitle="We design for transparency and SDG-aligned outcomes. Specific deployment totals and beneficiary counts are shared in dated partner briefs — not as open website vanity figures."
          />
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "NPO", label: "Philanthropic engine of the Group" },
              { value: "SA®", label: "Listed on SupplierAdvisor®" },
              { value: "PMO", label: "Delivery via Big Five Impact" },
              { value: "SDG", label: "Aligned design framework" },
            ]}
          />
        </div>
      </section>

      <section id="programmes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="PROGRAMME TYPES"
          title="Where Foundation capital goes to work"
          subtitle="Two flagship programme families — social development and economic agency — delivered with Impact PMO discipline."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
            <div className="text-xs tracking-[2px] text-teal-700 font-semibold mb-2">SOCIAL</div>
            <h3 className="text-xl font-semibold text-black mb-2">School & community nutrition</h3>
            <p className="text-sm text-[#525252] leading-relaxed mb-4">
              Grants and co-funding that activate Big Five Foods fortified supply, Direct last-mile,
              and school-day feeding pathways — including NSNP-aligned institutional programmes.
            </p>
            <ul className="text-sm text-[#404040] space-y-1.5">
              <li>· Fortified porridge & soya for learners</li>
              <li>· Partner schools and community kitchens</li>
              <li>· Verified delivery with Impact reporting</li>
            </ul>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
            <div className="text-xs tracking-[2px] text-teal-700 font-semibold mb-2">ECONOMIC</div>
            <h3 className="text-xl font-semibold text-black mb-2">Livelihoods & youth capability</h3>
            <p className="text-sm text-[#525252] leading-relaxed mb-4">
              Micro-enterprise, agri livelihoods and Super-Cube® leadership pathways for youth and
              community leaders — so capital builds agency, not dependency.
            </p>
            <ul className="text-sm text-[#404040] space-y-1.5">
              <li>· Skills and Super-Cube® formation</li>
              <li>· Regenerative agri and local enterprise</li>
              <li>· Transparent funding on SupplierAdvisor®</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading eyebrow="UN SDGs" title="Aligned to global goals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sdgGoals.map((g) => (
            <div
              key={g.number}
              className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex items-start gap-4 min-w-0"
            >
              {/* Fixed square frame so icons never stretch (global img height:auto) */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-md bg-[#fafafa] ring-1 ring-black/5">
                <Image
                  src={g.icon}
                  alt={`UN SDG ${g.number}: ${g.title}`}
                  fill
                  sizes="64px"
                  className="object-contain object-center p-0.5"
                />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-xs tracking-[2px] text-[#737373] mb-1">SDG {g.number}</div>
                <h3 className="font-semibold text-base sm:text-lg text-black mb-1">{g.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="METHOD" title="How Foundation works" />
          <ProcessSteps
            accent={ACCENT}
            steps={[
              {
                step: "01",
                title: "Design & fund",
                desc: "Co-create with communities. Clear theory of change, budgets, and accountable escrow structures.",
              },
              {
                step: "02",
                title: "Deliver & verify",
                desc: "Field delivery with Big Five Impact PMO. Data, partners, and where commerce applies — SupplierAdvisor® rails.",
              },
              {
                step: "03",
                title: "Report & learn",
                desc: "Public-ready reporting. Lessons shared. Successful models replicated across the continent.",
              },
            ]}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="WHO WE SERVE" title="Built for every stakeholder" />
        <FeatureGrid
          accent={ACCENT}
          items={[
            {
              icon: Heart,
              title: "Donors & impact investors",
              desc: "See where capital goes and what lives it changes — not just annual PDF summaries.",
            },
            {
              icon: Users,
              title: "Communities",
              desc: "Co-ownership, skills transfer, and sustainable exit strategies.",
            },
            {
              icon: Leaf,
              title: "Implementing partners",
              desc: "Shared infrastructure, verified data, and collective impact reporting.",
            },
            {
              icon: TrendingUp,
              title: "Governments & DFIs",
              desc: "Programmes that meet policy goals with professional delivery discipline.",
            },
            {
              icon: ShieldCheck,
              title: "Registered on SupplierAdvisor®",
              desc: "Big Five Foundation is registered on SupplierAdvisor® — verified presence for partners and transparent programme commerce.",
            },
            {
              icon: Heart,
              title: "Group synergy",
              desc: "Foundation programmes plug into Agri, Foods, Direct, Leadership, and Impact.",
            },
          ]}
        />
      </section>

      <section id="donate" className="bg-[#0f766e] text-white py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
            How to fund or partner
          </h2>
          <p className="text-white/75 text-base sm:text-lg mb-6 leading-relaxed">
            Foundations, corporate CSI, family offices and DFIs — we structure capital with the same
            discipline as commercial pillars: theory of change, Impact PMO delivery, and verification
            on SupplierAdvisor®.
          </p>
          <ol className="text-left max-w-lg mx-auto space-y-3 text-sm text-white/80 mb-8">
            <li>
              <strong className="text-white">1. Tell us the outcome</strong> — nutrition, livelihoods,
              youth leadership, or multi-pillar.
            </li>
            <li>
              <strong className="text-white">2. We design the vehicle</strong> — grant, co-fund, or
              programme partnership with reporting cadence.
            </li>
            <li>
              <strong className="text-white">3. Deliver & verify</strong> — Impact PMO + Foods / Agri /
              Leadership where needed.
            </li>
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <a
              href="/contact?interest=foundation&intent=foundation"
              className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold"
            >
              Partner with the Foundation
            </a>
            <a
              href={SA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/10"
            >
              SupplierAdvisor®
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="foundation-deck"
        className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24 scroll-mt-24"
      >
        <FoundationStrategyDeck />
      </section>

      <FinalCta
        eyebrow="CHANGE LIVES"
        title="Fund impact that can be proven"
        subtitle="Programmes designed for transparency, delivery and replication — with Impact as the PMO."
        primary={{ href: "/contact?interest=foundation", label: "Start a funding conversation" }}
        secondary={{ href: "/impact", label: "See Big Five Impact" }}
      />
    </div>
  );
}
