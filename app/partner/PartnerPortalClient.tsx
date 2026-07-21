"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  FileText,
  Handshake,
  Lock,
  Package,
  Truck,
  Users,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { CONTACT_EMAIL } from "../lib/contact";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { SANTACO, SANTACO_PARTNERSHIP } from "../lib/santaco";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";

const resources = [
  {
    href: "/partner-kit",
    label: "Partner kit",
    desc: "One-page pack: mission, NSNP case, Super-Cube®, how to engage.",
  },
  {
    href: "/methodology",
    label: "Methodology",
    desc: "How we label ambition vs programme-reported vs internal analysis.",
  },
  {
    href: "/foods#foods-deck",
    label: "Foods product deck",
    desc: "Fortified nutrition, NSNP pathway, institutional economics.",
  },
  {
    href: "/direct#santaco",
    label: "Direct × SANTACO",
    desc: "Container rollout plan at taxi ranks and rural communities.",
  },
  {
    href: "/connect",
    label: "Connect · SupplierAdvisor®",
    desc: "Verified trade OS, trial and commercial pathways.",
  },
  {
    href: "/impact#strategy-deck",
    label: "Impact strategy deck",
    desc: "Group overview and African problem/response framing.",
  },
] as const;

export default function PartnerPortalClient({ email }: { email: string }) {
  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-[#052e1c] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-emerald-300/90 mb-4">
                <Lock className="w-3.5 h-3.5" />
                PRIVATE · PARTNER PORTAL
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-3">
                Partner briefing room
              </h1>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-2">
                Signed in as{" "}
                <span className="text-white font-medium break-all">{email}</span>
              </p>
              <p className="text-white/55 text-sm leading-relaxed text-pretty">
                Authorised partners only. Programme context, how we work together, and links to
                shareable decks — not the confidential investor model.
              </p>
            </div>
            <LogoutButton />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: Package,
                t: "Foods · NSNP",
                d: "Programme landed · 2.5m children/day plan scale · ~45% GP · ~50% cheaper vs wholesale/retail",
              },
              {
                icon: Truck,
                t: "Direct · SANTACO",
                d: "15,000-container partnership plan at major taxi ranks and rural communities",
              },
              {
                icon: Handshake,
                t: "One Group",
                d: "Ten pillars under Feed · Educate · Empower — delivery with PMO discipline",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 min-w-0"
              >
                <c.icon className="w-5 h-5 text-emerald-300 mb-3" />
                <div className="text-sm font-semibold text-white mb-1">{c.t}</div>
                <p className="text-xs text-white/55 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor nav */}
      <nav className="sticky top-[var(--navbar-height)] z-30 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex gap-2 overflow-x-auto text-xs sm:text-sm font-medium">
          {[
            { href: "#how-we-partner", label: "How we partner" },
            { href: "#programmes", label: "Flagship programmes" },
            { href: "#pillars", label: "Pillars" },
            { href: "#resources", label: "Resources" },
            { href: "#contact", label: "Contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-[#404040] hover:bg-black/5 hover:text-black"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* How we partner */}
      <section
        id="how-we-partner"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            HOW WE WORK TOGETHER
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3 text-balance">
            Clear scope. Attached delivery. Honest labels.
          </h2>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl leading-relaxed mb-8">
            Partners engage Big Five as one system — not ten disconnected vendors. We co-design
            outcomes, attach the right pillars, and report with methodology you can put in a board
            pack.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                n: "01",
                t: "Define the outcome",
                d: "Nutrition, markets, leadership, capital access or multi-pillar programmes.",
              },
              {
                n: "02",
                t: "Attach the rails",
                d: "Foods, Direct, Connect, Impact and others as the work requires.",
              },
              {
                n: "03",
                t: "Deliver with gates",
                d: "Impact PMO, verification where commerce runs on SupplierAdvisor®.",
              },
              {
                n: "04",
                t: "Report honestly",
                d: "Ambition vs programme-reported vs internal analysis — see Methodology.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 min-w-0"
              >
                <div className="text-[10px] tracking-[2px] font-semibold text-emerald-800 mb-2">
                  {s.n}
                </div>
                <div className="text-sm font-semibold text-black mb-1">{s.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship programmes */}
      <section
        id="programmes"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            FLAGSHIP PROGRAMMES
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8 text-balance">
            What partners most often brief against
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
              <div className="text-[10px] tracking-[2px] font-semibold text-amber-800 mb-2">
                FOODS · {NSNP.shortName}
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
                {NSNP_CASE.headline}
              </h3>
              <p className="text-sm text-[#404040] leading-relaxed mb-4">
                {NSNP_CASE.approval}
              </p>
              <ul className="space-y-1.5 text-sm text-[#525252] mb-4">
                <li>
                  · {FOODS_ECONOMICS.grossProfit.value} GP (management-reported)
                </li>
                <li>
                  · {FOODS_ECONOMICS.cheaperThanMarket.value} cheaper vs wholesale & retail
                  (internal)
                </li>
                <li>· Recurring institutional demand as menus reorder</li>
              </ul>
              <a
                href={NSNP.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
              >
                DBE · {NSNP.shortName}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
              <div className="text-[10px] tracking-[2px] font-semibold text-orange-800 mb-2">
                DIRECT · {SANTACO.shortName}
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
                {SANTACO_PARTNERSHIP.title}
              </h3>
              <p className="text-sm text-[#404040] leading-relaxed mb-4">
                {SANTACO_PARTNERSHIP.containers.detail}
              </p>
              <ul className="space-y-1.5 text-sm text-[#525252] mb-4">
                {SANTACO_PARTNERSHIP.inContainer.map((x) => (
                  <li key={x.t}>
                    · <strong className="text-[#404040]">{x.t}:</strong> {x.d}
                  </li>
                ))}
              </ul>
              <a
                href={SANTACO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
              >
                {SANTACO.shortName}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section
        id="pillars"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            TEN PILLARS
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6 text-balance">
            Public pillar pages for partner briefing
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {companies.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3 sm:p-4 hover:border-black/25 transition-colors min-w-0 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${c.color}18`, color: c.color }}
                >
                  <CompanyIcon name={c.icon} size={16} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-black group-hover:underline underline-offset-2 truncate">
                  {c.name}
                </div>
                <div className="text-[10px] text-[#737373] line-clamp-2 mt-0.5 leading-snug">
                  {c.tagline}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section
        id="resources"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold">
              RESOURCES
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6 text-balance">
            Decks and pages you can share
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-2xl border border-black/10 bg-white p-5 hover:border-emerald-300/80 transition-colors min-w-0 group"
              >
                <div className="text-sm font-semibold text-black group-hover:underline underline-offset-2 mb-1">
                  {r.label}
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-3">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  Open
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-28 bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-8 h-8 text-emerald-800 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
            Need a deeper brief?
          </h2>
          <p className="text-sm sm:text-base text-[#525252] mb-6 leading-relaxed">
            Programme SOWs, commercial terms and multi-site plans are shared by the partnership
            team — not all materials live on this portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Partner portal follow-up"
              )}&body=${encodeURIComponent(
                `Hello Big Five team,\n\nI am signed into the partner portal as ${email}.\nPlease follow up regarding partnership scope.\n\nOrganisation:\nInterest area:\n\nThank you.`
              )}`}
              className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold"
            >
              Email {CONTACT_EMAIL}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-black/15 text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/5"
            >
              <Building2 className="w-4 h-4" />
              Public contact form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
