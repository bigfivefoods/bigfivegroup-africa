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
import { Heart, TrendingUp, Leaf, Users, ShieldCheck } from "lucide-react";

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
    <div className="overflow-hidden bg-[#fafafa]">
      <PageHero
        image="/foundation-hero.jpg"
        eyebrow="REGISTERED NPO · SOUTH AFRICA"
        title={
          <>
            Big Five Foundation
            <br />
            Impact you can verify
          </>
        }
        subtitle="The philanthropic engine of the group — designing, funding, and measuring high-impact initiatives with radical transparency across Africa."
        ctas={[
          { href: "#impact", label: "Our impact model", primary: true },
          { href: "#donate", label: "Donate or partner" },
        ]}
        overlayClassName="bg-black/40"
      />

      <SupplierTrust entityName="Foundation programme suppliers (where applicable)" compact />

      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-24 text-center">
        <SectionHeading
          eyebrow="OUR PURPOSE"
          title="Why Big Five Foundation?"
          subtitle="Philanthropy without proof is marketing. We build programmes with theory of change, transparent capital, and delivery through Big Five Impact — so donors and communities see the same truth."
        />
      </section>

      <section id="impact" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="RESULTS" title="Measurable. Reportable. Replicable." />
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "R187M", label: "Deployed to programmes" },
              { value: "1.2M", label: "Direct beneficiaries" },
              { value: "94%", label: "Projects met or exceeded targets" },
              { value: "SDG", label: "Aligned design framework" },
            ]}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="UN SDGs" title="Aligned to global goals" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sdgGoals.map((g) => (
            <div
              key={g.number}
              className="bg-white border border-black/10 rounded-3xl p-7 flex gap-4"
            >
              <Image src={g.icon} alt={g.title} width={56} height={56} className="shrink-0" />
              <div>
                <div className="text-xs tracking-[2px] text-[#737373] mb-1">SDG {g.number}</div>
                <h3 className="font-semibold text-lg text-black mb-1">{g.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
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

      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
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
              title: "Ethical procurement",
              desc: "Suppliers verified on SupplierAdvisor® where commercial supply is required.",
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
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tighter mb-4">Donate or partner</h2>
          <p className="text-white/75 text-lg mb-8">
            Whether you are a foundation, corporate CSI lead, or family office — we structure
            partnerships with the same professionalism as our commercial pillars.
          </p>
          <a
            href="mailto:craig@bigfivegroup.africa"
            className="premium-button inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-full font-semibold"
          >
            Contact the Foundation
          </a>
        </div>
      </section>

      <SupplierTrust entityName="Foundation delivery partners" />

      <FinalCta
        eyebrow="CHANGE LIVES"
        title="Fund impact that can be proven"
        subtitle="Every programme designed for transparency, delivery, and continental replication."
        primary={{ href: "/impact", label: "See Big Five Impact" }}
        secondary={{ href: "/connect", label: "Partner with us" }}
      />
    </div>
  );
}
