"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  FeatureGrid,
  StatRow,
  ProcessSteps,
  FinalCta,
} from "../components/PageSections";
import {
  CheckCircle,
  Play,
  ShieldCheck,
  Activity,
  BadgeCheck,
  ExternalLink,
  Package,
  Factory,
  Truck,
  ClipboardCheck,
  Landmark,
  Brain,
  Users,
  Building2,
  School,
  ShoppingBag,
} from "lucide-react";
import { sa, SA_URL, SA_ONBOARDING, SA_PRICING, SA_EMAIL } from "../lib/saCopy";

const ACCENT = "#06b6d4";

const moduleIcons = [
  Activity,
  Users,
  ShoppingBag,
  Package,
  Factory,
  Truck,
  ClipboardCheck,
  BadgeCheck,
  Landmark,
  Brain,
];

export default function ConnectPage() {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startDemo = () => {
    setDemoStep(0);
    setIsPlaying(true);
    const interval = setInterval(() => {
      setDemoStep((prev) => {
        if (prev < sa.storySteps.length - 1) return prev + 1;
        clearInterval(interval);
        setIsPlaying(false);
        return sa.storySteps.length - 1;
      });
    }, 1200);
  };

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/connect-hero.jpg"
        eyebrow={`CONNECT · ${sa.brand} · ${sa.productLine}`}
        title={
          <>
            ERP that ships.
            <br />
            Trust that blocks risk.
          </>
        }
        subtitle={sa.heroSubtitle}
        ctas={[
          {
            href: SA_ONBOARDING,
            label: sa.ctaTrial,
            primary: true,
            external: true,
          },
          { href: "#how", label: "See how trust works" },
        ]}
        overlayClassName="bg-black/50"
      />

      <SupplierTrust entityName="Big Five Group companies" compact />

      {/* Pricing strip */}
      <section className="bg-white border-b border-black/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "25+", label: "Modules" },
              { value: "30d", label: "Free trial" },
              { value: "Yes", label: "On-chain ready" },
              { value: "R499", label: "From / month" },
            ]}
          />
          <p className="text-center text-sm text-[#525252] mt-6">{sa.foundingBody}</p>
        </div>
      </section>

      {/* 60-second story */}
      <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="60-second story"
          title="How trust blocks risk — without a demo call"
          subtitle="Connect · Trade · Inspect · SHEQ — live control on one chain."
        />
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={startDemo}
            disabled={isPlaying}
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full font-semibold disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isPlaying ? "Playing…" : "Play story"}
          </button>
          <a
            href={SA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-2 border border-black/15 px-7 py-3 rounded-full font-semibold text-black"
          >
            Open live platform
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="space-y-3">
          {sa.storySteps.map((step, i) => {
            const active = i <= demoStep;
            return (
              <motion.div
                key={step.title}
                animate={{
                  opacity: active ? 1 : 0.4,
                  scale: i === demoStep ? 1.01 : 1,
                }}
                className={`flex gap-4 rounded-3xl border p-6 sm:p-7 transition-colors ${
                  active ? "bg-white border-cyan-300 shadow-md" : "bg-white/50 border-black/10"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-semibold ${
                    active ? "bg-cyan-100 text-cyan-700" : "bg-black/5 text-[#737373]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-black">{step.title}</h3>
                    {active && <CheckCircle className="w-4 h-4 text-cyan-600" />}
                  </div>
                  <p className="text-[#525252] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Multi-entity */}
      <section className="bg-white border-y border-black/10 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs tracking-[3px] text-[#525252] mb-3">Multi-entity pattern</div>
          <h2 className="section-heading text-black mb-5">{sa.multiEntityTitle}</h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto leading-relaxed mb-8">
            {sa.multiEntityBody}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
            {["Entity A · Foods", "Entity B · Direct", "Entity C · Access", "Entity D · Region"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-black/10 bg-[#fafafa] px-4 py-2 text-[#404040]"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Product"
          title={sa.missionTitle}
          subtitle={sa.missionBody}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sa.modules.map((mod, i) => {
            const Icon = moduleIcons[i] ?? Activity;
            return (
              <div
                key={mod.title}
                className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-w-0"
              >
                <div className="text-xs tracking-[2px] text-[#737373] mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Icon className="w-8 h-8 mb-3" style={{ color: ACCENT }} />
                <h3 className="text-xl font-semibold tracking-tight text-black mb-1">{mod.title}</h3>
                <div className="text-sm font-medium text-[#404040] mb-2">{mod.subtitle}</div>
                <p className="text-sm text-[#525252] leading-relaxed">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust layer */}
      <section className="bg-white border-y border-black/10 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Trust layer" title={sa.trustTitle} subtitle={sa.trustBody} />
          <FeatureGrid
            accent={ACCENT}
            items={sa.trustPoints.map((p, i) => ({
              icon: [ShieldCheck, Activity, Package, ClipboardCheck, BadgeCheck, Landmark][i] ?? ShieldCheck,
              title: p.title,
              desc: p.desc,
            }))}
          />
        </div>
      </section>

      {/* Four steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading eyebrow="How it works" title={sa.howTitle} />
        <ProcessSteps
          accent={ACCENT}
          steps={sa.steps.map((s) => ({
            step: s.step,
            title: s.title,
            desc: s.desc,
          }))}
        />
      </section>

      {/* Stakeholders */}
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[3px] text-white/40 mb-3">Who it&apos;s for</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
              One platform. Every stakeholder.
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto">{sa.networkBlurb}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sa.stakeholders.map((s, i) => {
              const Icon = [Building2, ShoppingBag, Landmark, School][i] ?? Building2;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <Icon className="w-7 h-7 text-cyan-400 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold"
            >
              {sa.ctaWorkspace}
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={SA_EMAIL}
              className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10"
            >
              {sa.ctaDemo}
            </a>
          </div>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Connect and group entities" />

      <FinalCta
        eyebrow="The network is open"
        title={sa.finalTitle}
        subtitle={sa.finalBody}
        primary={{
          href: SA_ONBOARDING,
          label: "Get started in under 5 minutes",
          external: true,
        }}
        secondary={{
          href: SA_PRICING,
          label: "View pricing",
          external: true,
        }}
      />
    </div>
  );
}
