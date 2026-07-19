"use client";

import Link from "next/link";
import PageHero from "../../components/PageHero";
import { SectionHeading } from "../../components/PageSections";
import {
  MessageSquare,
  ShieldCheck,
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="60-SECOND WALKTHROUGH"
          title="How to meet SAM"
          subtitle="A simple path from this site into the live SupplierAdvisor® messenger."
        />
        {process.env.NEXT_PUBLIC_SAM_VIDEO_URL ? (
          <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-black/10 bg-black aspect-video">
            <iframe
              src={process.env.NEXT_PUBLIC_SAM_VIDEO_URL}
              title="SAM walkthrough"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mb-8 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/40 px-5 py-6 text-center">
            <p className="text-sm text-[#404040] leading-relaxed">
              Screen recording coming soon — meanwhile follow the three steps below, or open a free
              trial and explore SAM inside SupplierAdvisor®.
            </p>
          </div>
        )}
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-4">
          {[
            { n: "01", t: "Open SupplierAdvisor®", d: "Start a free trial or log in to your workspace." },
            { n: "02", t: "Enter the messenger", d: "SAM sits inside the OS — ask about trade, compliance, or ops." },
            { n: "03", t: "Act on verified data", d: "Pair answers with Live pulse and on-chain pedigree where it matters." },
          ].map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-black/10 bg-white p-5 list-none min-w-0"
            >
              <div className="text-2xl font-semibold tracking-tighter text-cyan-700/40 mb-1">{s.n}</div>
              <div className="font-semibold text-black mb-1">{s.t}</div>
              <p className="text-sm text-[#525252] leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <SectionHeading
          eyebrow="WHAT SAM HELPS WITH"
          title="Four jobs inside the OS"
          subtitle={sam.promise}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {sam.useCases.map((u) => (
            <div
              key={u.title}
              className="rounded-2xl border border-black/10 bg-white p-6 min-w-0"
            >
              <MessageSquare className="w-6 h-6 mb-3" style={{ color: ACCENT }} />
              <h3 className="text-lg font-semibold text-black mb-2">{u.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 max-w-3xl mx-auto text-center">
          <ShieldCheck className="w-8 h-8 text-cyan-700 mx-auto mb-3" />
          <p className="text-sm text-[#525252] leading-relaxed mb-5">
            {sam.name} lives inside SupplierAdvisor® after you register or log in — the same OS Big
            Five Connect runs for the Group.{" "}
            <a
              href={SA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-800 underline underline-offset-2"
            >
              supplieradvisor.com
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 bg-cyan-700 text-white px-6 py-3 rounded-full text-sm font-semibold"
            >
              Start free trial
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold"
            >
              Full Connect platform
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
