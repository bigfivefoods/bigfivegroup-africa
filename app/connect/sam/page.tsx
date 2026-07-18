"use client";

import Link from "next/link";
import PageHero from "../../components/PageHero";
import SamSection from "../../components/SamSection";
import { SectionHeading, FinalCta } from "../../components/PageSections";
import {
  MessageSquare,
  ShieldCheck,
  Users,
  Building2,
  School,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { sa, SA_ONBOARDING, SA_LOGIN, SA_URL } from "../../lib/saCopy";

const ACCENT = "#06b6d4";

export default function SamPage() {
  const sam = sa.sam;

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/connect-hero.jpg"
        eyebrow={`CONNECT · ${sam.fullName.toUpperCase()}`}
        title={
          <>
            {sam.name}.
            <br />
            The messenger for the mission.
          </>
        }
        subtitle={sam.heroBody}
        ctas={[
          {
            href: SA_ONBOARDING,
            label: sam.cta,
            primary: true,
            external: true,
          },
          {
            href: SA_LOGIN,
            label: "Log in to SupplierAdvisor®",
            external: true,
          },
          { href: "/connect", label: "Back to Connect" },
        ]}
        overlayClassName="bg-black/55"
      />

      <SamSection dark showDeepLink={false} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="WHY SAM EXISTS"
          title="Intelligence that serves Feed · Educate · Empower"
          subtitle={sam.promise}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {sam.useCases.map((u) => (
            <div
              key={u.title}
              className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 min-w-0"
            >
              <MessageSquare className="w-7 h-7 mb-4" style={{ color: ACCENT }} />
              <h3 className="text-xl font-semibold text-black mb-2">{u.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHO USES SAM"
            title="Operators, buyers and institutions"
            subtitle="Anyone trading or learning the OS on SupplierAdvisor® — including Big Five Foods buyers and programme partners."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Building2,
                t: "Enterprises & SMEs",
                d: "Onboard faster, trade verified, keep lots and SHEQ under control.",
              },
              {
                icon: School,
                t: "Schools & programmes",
                d: "Order fortified nutrition with guided steps and audit-friendly trails.",
              },
              {
                icon: Users,
                t: "Teams & leaders",
                d: "Pair with Super-Cube® culture — digital coaching meets ethical judgment.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-6 min-w-0"
              >
                <x.icon className="w-6 h-6 text-cyan-700 mb-3" />
                <h3 className="font-semibold text-black mb-2">{x.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <ShieldCheck className="w-10 h-10 text-cyan-700 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
          Honest product framing
        </h2>
        <p className="text-[#525252] leading-relaxed max-w-2xl mx-auto mb-6">
          {sam.name} is a feature of SupplierAdvisor® — the supply-chain OS Big Five Connect
          operationalises for the Group. We do not invent offline capabilities: register or log in
          on{" "}
          <a
            href={SA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-800 underline underline-offset-2"
          >
            supplieradvisor.com
          </a>{" "}
          to use the live messenger.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={SA_ONBOARDING}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-2 bg-cyan-700 text-white px-7 py-3.5 rounded-full text-sm font-semibold"
          >
            Start free trial
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/connect"
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-7 py-3.5 rounded-full text-sm font-semibold"
          >
            Full Connect platform
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FinalCta
        eyebrow={`${sam.name} · BIG FIVE CONNECT`}
        title="Open the OS. Ask SAM. Trade with proof."
        subtitle="Build the future of feeding, educating and empowering Africa — with intelligence that multiplies dignity."
        primary={{
          href: SA_ONBOARDING,
          label: sam.cta,
          external: true,
        }}
        secondary={{
          href: "/group#intelligence",
          label: "Group intelligence story",
        }}
      />
    </div>
  );
}
