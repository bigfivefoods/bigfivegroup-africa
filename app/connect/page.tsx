"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import {
  SectionHeading,
  FeatureGrid,
  StatRow,
  FinalCta,
} from "../components/PageSections";
import {
  CheckCircle,
  Users,
  Building2,
  Award,
  QrCode,
  Play,
  Leaf,
  Factory,
  Truck,
  ShoppingCart,
  ShieldCheck,
  Activity,
  ExternalLink,
} from "lucide-react";

const ACCENT = "#0ea5e9";
const SA_URL = "https://www.supplieradvisor.com/";

export default function ConnectPage() {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      icon: Leaf,
      title: "Farm sourcing",
      location: "KwaZulu-Natal, South Africa",
      desc: "Regenerative maize farm — verified leadership, soil health score 94%, carbon-negative practices.",
      tx: "0x7f3a…9b2e",
      time: "Live batch origin",
    },
    {
      icon: Factory,
      title: "Big Five Foods factory",
      location: "Pinetown, KwaZulu-Natal",
      desc: "Fortified production — FSSC 22000, ISO 9001, on-chain batch integrity.",
      tx: "0x4c2b…1f9a",
      time: "Manufacturing verified",
    },
    {
      icon: Truck,
      title: "Logistics network",
      location: "National distribution",
      desc: "Live GPS + integrity tracking — OTIF performance with carbon offset verification.",
      tx: "0x9d1e…7c4b",
      time: "In transit",
    },
    {
      icon: ShoppingCart,
      title: "Community delivery",
      location: "Nongoma, Zululand, KZN",
      desc: "Last-mile container — jobs created, fortified meals delivered, impact verified.",
      tx: "0x2e8f…4a1d",
      time: "Delivered · impact logged",
    },
  ];

  const startDemo = () => {
    setDemoStep(0);
    setIsPlaying(true);
    const interval = setInterval(() => {
      setDemoStep((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        setIsPlaying(false);
        return 3;
      });
    }, 1200);
  };

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <PageHero
        image="/connect-hero.jpg"
        eyebrow="PILLAR · CONNECT · SUPPLIERADVISOR®"
        title={
          <>
            Verified.
            <br />
            Transparent.
            <br />
            Professional.
          </>
        }
        subtitle="Big Five Connect is powered by SupplierAdvisor® — the platform where verified ethical companies trade with real-time order feedback, institutional trust, and end-to-end visibility."
        ctas={[
          {
            href: SA_URL,
            label: "Launch SupplierAdvisor®",
            primary: true,
            external: true,
          },
          { href: "#demo", label: "See how it works" },
        ]}
        overlayClassName="bg-black/50"
      />

      <SupplierTrust entityName="Big Five Group companies" compact />

      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="THE TRUST LAYER"
          title="Why serious buyers choose SupplierAdvisor®"
          subtitle="This is not a brochure site for suppliers. It is a live commerce network where legitimacy is earned, published, and continuously proven."
        />
        <FeatureGrid
          accent={ACCENT}
          items={[
            {
              icon: ShieldCheck,
              title: "Verified ethical companies",
              desc: "Big Five entities and counterparties are listed as verified ethical companies — credentials counterparties can review.",
            },
            {
              icon: Activity,
              title: "Orders with real-time feedback",
              desc: "Purchase orders, status, and fulfilment signals in real time — reducing risk for buyers and suppliers.",
            },
            {
              icon: Award,
              title: "Institutional-grade process",
              desc: "Built for B2B, B2G, and complex supply chains that need auditability, not just marketing claims.",
            },
            {
              icon: QrCode,
              title: "Farm-to-fork visibility",
              desc: "Trace journeys from regenerative origin through manufacturing to last-mile impact.",
            },
            {
              icon: Building2,
              title: "Enterprise & government ready",
              desc: "Procurement teams and ministries get cleaner supplier bases and transparent delivery paths.",
            },
            {
              icon: Users,
              title: "Network effects for Africa",
              desc: "The same rails power Big Five Agri, Foods, Direct, Access, and Impact programmes.",
            },
          ]}
        />
      </section>

      <section className="bg-white border-y border-black/10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <StatRow
            accent={ACCENT}
            stats={[
              { value: "B2B", label: "Business commerce" },
              { value: "B2G", label: "Government procurement" },
              { value: "B2C", label: "Conscious consumer paths" },
              { value: "Live", label: "Real-time order feedback" },
            ]}
          />
        </div>
      </section>

      <section id="demo" className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="LIVE JOURNEY DEMO"
          title="Watch value move with verification"
          subtitle="A simplified view of how a verified supply chain progresses — the full experience lives on SupplierAdvisor®."
        />
        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={startDemo}
            disabled={isPlaying}
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full font-semibold disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isPlaying ? "Playing…" : "Play demo"}
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
          {demoSteps.map((step, i) => {
            const active = i <= demoStep;
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                animate={{
                  opacity: active ? 1 : 0.4,
                  scale: i === demoStep ? 1.01 : 1,
                }}
                className={`flex gap-4 rounded-3xl border p-6 sm:p-7 transition-colors ${
                  active ? "bg-white border-sky-300 shadow-md" : "bg-white/50 border-black/10"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    active ? "bg-sky-100 text-sky-700" : "bg-black/5 text-[#737373]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-black">{step.title}</h3>
                    {active && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-xs text-[#737373] mb-2">
                    {step.location} · {step.time}
                  </div>
                  <p className="text-[#525252] leading-relaxed">{step.desc}</p>
                  <div className="mt-2 font-mono text-xs text-sky-700">{step.tx}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <SupplierTrust entityName="Big Five Connect / SupplierAdvisor® network companies" />

      <FinalCta
        eyebrow="LAUNCH CONNECT"
        title="Trade with verified ethical companies"
        subtitle="Open SupplierAdvisor® for live profiles, orders, and real-time feedback — the professional backbone of Big Five commerce."
        primary={{
          href: SA_URL,
          label: "Go to www.supplieradvisor.com",
          external: true,
        }}
        secondary={{ href: "/impact", label: "See Big Five Impact PMO" }}
      />
    </div>
  );
}
