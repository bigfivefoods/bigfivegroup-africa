"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
} from "lucide-react";
import { BUSINESS_PLANS, type BusinessPlanRegistryEntry } from "../../lib/businessPlans";
import type {
  BusinessPlan,
  BusinessPlanBlock,
  BusinessPlanChapter,
} from "../../lib/businessPlans/types";
import { companies } from "../../lib/companies";
import { CompanyIcon } from "../../lib/icons";
import { CONTACT_EMAIL } from "../../lib/contact";
import BusinessPlanDeck from "./BusinessPlanDeck";

function BlockView({ block }: { block: BusinessPlanBlock }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="text-base sm:text-lg text-black font-medium leading-relaxed text-pretty mb-4">
          {block.text}
        </p>
      );
    case "paragraph":
      return (
        <p className="text-sm sm:text-[15px] text-[#404040] leading-relaxed text-pretty mb-4">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul className="space-y-2 mb-4 list-disc pl-5 text-sm sm:text-[15px] text-[#404040] leading-relaxed">
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      );
    case "callout": {
      const tone =
        block.tone === "emerald"
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : block.tone === "slate"
            ? "border-black/10 bg-[#f5f5f5] text-[#262626]"
            : "border-amber-200 bg-amber-50 text-amber-950";
      return (
        <aside className={`rounded-2xl border p-4 sm:p-5 mb-4 ${tone}`}>
          <div className="text-[10px] tracking-[2px] font-semibold mb-1.5 opacity-70">
            {block.title.toUpperCase()}
          </div>
          <p className="text-sm leading-relaxed">{block.body}</p>
        </aside>
      );
    }
    case "stats":
      return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {block.items.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-black/10 bg-[#fafafa] p-3 sm:p-4 min-w-0"
            >
              <div className="text-lg sm:text-xl font-semibold tracking-tight text-black tabular-nums break-words">
                {s.value}
              </div>
              <div className="text-[11px] sm:text-xs text-[#525252] mt-1 leading-snug">
                {s.label}
              </div>
              {s.note ? (
                <div className="text-[10px] text-[#737373] mt-1 leading-snug">{s.note}</div>
              ) : null}
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="mb-4 overflow-x-auto rounded-xl border border-black/10">
          {block.table.caption ? (
            <div className="px-3 sm:px-4 py-2.5 text-xs font-semibold text-black bg-[#fafafa] border-b border-black/10">
              {block.table.caption}
            </div>
          ) : null}
          <table className="w-full min-w-[28rem] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-black/10 text-[10px] tracking-[1px] text-[#737373]">
                {block.table.headers.map((h) => (
                  <th key={h} className="py-2.5 px-3 sm:px-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i} className="border-t border-black/5 align-top">
                  {row.cells.map((c, j) => (
                    <td
                      key={j}
                      className={`py-2.5 px-3 sm:px-4 text-[#404040] leading-relaxed ${
                        j === 0 ? "font-semibold text-black" : ""
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.table.footnote ? (
            <p className="px-3 sm:px-4 py-2.5 text-[11px] text-[#737373] leading-relaxed border-t border-black/5 bg-[#fafafa]">
              {block.table.footnote}
            </p>
          ) : null}
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-amber-500 pl-4 mb-4">
          <p className="text-sm sm:text-base text-black font-medium leading-relaxed italic text-pretty">
            “{block.text}”
          </p>
          {block.attribution ? (
            <cite className="not-italic text-xs text-[#737373] mt-1.5 block">
              — {block.attribution}
            </cite>
          ) : null}
        </blockquote>
      );
    default:
      return null;
  }
}

function ChapterView({
  chapter,
  planSlug,
}: {
  chapter: BusinessPlanChapter;
  planSlug: string;
}) {
  const anchor = `bp-${planSlug}-${chapter.id}`;
  return (
    <article
      id={anchor}
      className="business-plan-chapter scroll-mt-32 border-b border-black/10 py-8 sm:py-10 print:break-before-page print:border-0 print:py-6"
    >
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-xs font-semibold tracking-wide text-amber-800 tabular-nums">
          {chapter.n}
        </span>
        {chapter.eyebrow ? (
          <span className="text-[10px] tracking-[2px] text-[#737373] font-semibold">
            {chapter.eyebrow}
          </span>
        ) : null}
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black mb-4 text-balance">
        {chapter.title}
      </h3>
      {chapter.blocks.map((b, i) => (
        <BlockView key={`${anchor}-${i}`} block={b} />
      ))}
    </article>
  );
}

function PlanDocument({ plan }: { plan: BusinessPlan }) {
  const planSlug = plan.meta.slug;
  const isFoods = planSlug === "foods";
  const isConnect = planSlug === "connect";
  /** Connect uses the official www.supplieradvisor.com wordmark (/sa-logo.png). */
  const coverLogo = isFoods
    ? { src: "/bigfivefoods-logo-white.png", alt: "Big Five Foods", wide: false }
    : isConnect
      ? { src: "/sa-logo.png", alt: "SupplierAdvisor®", wide: true }
      : null;

  return (
    <div className="business-plan-document" data-business-plan={planSlug}>
      {/* Cover — Group black + amber gold chrome */}
      <header className="rounded-2xl border border-black/10 bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 mb-6 print:break-after-page">
        <div
          className={`text-[10px] tracking-[2px] mb-3 ${
            isConnect ? "text-cyan-300/90" : "text-amber-400/90"
          }`}
        >
          {isFoods
            ? "BIG FIVE GROUP · BIG FIVE FOODS · BUSINESS PLAN · CONFIDENTIAL"
            : isConnect
              ? "BIG FIVE CONNECT · SUPPLIERADVISOR® · WWW.SUPPLIERADVISOR.COM · CONFIDENTIAL"
              : plan.meta.classification}
        </div>
        {coverLogo ? (
          <div className="flex items-center gap-4 sm:gap-5 mb-5">
            {coverLogo.wide ? (
              <div className="rounded-xl bg-white px-3 py-2 border border-white/25 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- print-safe SA wordmark */}
                <img
                  src={coverLogo.src}
                  alt={coverLogo.alt}
                  className="h-10 sm:h-12 w-auto max-w-[14rem] sm:max-w-[16rem] object-contain object-left"
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- print-safe brand mark
              <img
                src={coverLogo.src}
                alt={coverLogo.alt}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain object-left"
              />
            )}
            {isFoods ? (
              // eslint-disable-next-line @next/next/no-img-element -- print-safe group mark
              <img
                src="/bigfivegroup-logo.png"
                alt="Big Five Group"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain border-l border-white/20 pl-4 sm:pl-5"
              />
            ) : null}
          </div>
        ) : null}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-2 text-balance">
          {plan.meta.fullTitle}
        </h2>
        <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-3xl mb-4 text-pretty">
          {plan.meta.subtitle}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-white/45 mb-6">
          <span>Version {plan.meta.version}</span>
          <span>·</span>
          <span>As of {plan.meta.asOf}</span>
          <span>·</span>
          <span>{plan.meta.pageTarget}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {plan.coverStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-4 min-w-0"
            >
              <div className="text-lg sm:text-xl font-semibold tracking-tight text-amber-300 break-words">
                {s.value}
              </div>
              <div className="text-[11px] text-white/55 mt-1 leading-snug">{s.label}</div>
              {s.note ? (
                <div className="text-[10px] text-white/35 mt-1 leading-snug">{s.note}</div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
          <div className="text-[10px] tracking-[2px] text-amber-200/80 font-semibold mb-2">
            EXECUTIVE HIGHLIGHTS
          </div>
          <ul className="space-y-2">
            {plan.executiveHighlights.map((h) => (
              <li key={h.slice(0, 40)} className="flex gap-2 text-sm text-white/80 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed mb-6 border border-amber-200/80 bg-amber-50 rounded-xl px-4 py-3">
        {plan.meta.disclaimer}
      </p>

      {/* TOC */}
      <nav
        aria-label="Business plan contents"
        className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 mb-2 print:break-after-page"
      >
        <div className="text-[10px] tracking-[2px] text-[#737373] font-semibold mb-3">
          CONTENTS
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {plan.chapters.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#bp-${planSlug}-${ch.id}`}
                className="flex gap-2 text-sm text-[#404040] hover:text-black hover:bg-[#fafafa] rounded-lg px-2 py-1.5 transition-colors"
              >
                <span className="text-amber-800 font-semibold tabular-nums shrink-0">{ch.n}</span>
                <span className="font-medium">{ch.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Chapters */}
      <div className="bg-white rounded-2xl border border-black/10 px-4 sm:px-6 md:px-8">
        {plan.chapters.map((ch) => (
          <ChapterView key={ch.id} chapter={ch} planSlug={planSlug} />
        ))}
      </div>

      {/* Closing */}
      <footer className="mt-6 rounded-2xl border border-black/10 bg-[#fafafa] p-6 sm:p-8 text-center print:break-before-page">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black mb-2 text-balance">
          {plan.closing.title}
        </h3>
        <p className="text-sm text-[#525252] leading-relaxed max-w-2xl mx-auto mb-5">
          {plan.closing.body}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            `${plan.meta.companyName} business plan — NDA diligence`
          )}`}
          className="premium-button inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold print:hidden"
        >
          {plan.closing.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
        <div className="mt-4">
          <Link
            href={`/${plan.meta.opcoSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline print:hidden"
          >
            Open public {plan.meta.companyName} page
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function PlanCard({
  entry,
  active,
  onSelect,
}: {
  entry: BusinessPlanRegistryEntry;
  active: boolean;
  onSelect: () => void;
}) {
  const company = companies.find((c) => c.slug === entry.opcoSlug);
  const color = company?.color ?? "#f59e0b";
  const published = entry.status === "published";

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!published}
      className={`text-left rounded-2xl border p-4 sm:p-5 transition-all min-w-0 w-full ${
        active
          ? "border-amber-400 bg-amber-50/60 shadow-sm"
          : published
            ? "border-black/10 bg-white hover:border-amber-300/80"
            : "border-black/5 bg-[#fafafa] opacity-70 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}18`, color }}
        >
          <CompanyIcon name={company?.icon ?? "Wheat"} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-semibold text-black text-sm sm:text-base">{entry.fullName}</span>
            {published ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide text-emerald-800 bg-emerald-100 rounded-full px-2 py-0.5">
                <FileText className="w-3 h-3" />
                LIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#737373] bg-black/5 rounded-full px-2 py-0.5">
                <Clock className="w-3 h-3" />
                SOON
              </span>
            )}
          </div>
          <p className="text-xs text-[#525252] leading-relaxed">{entry.blurb}</p>
        </div>
      </div>
    </button>
  );
}

export default function BusinessPlanSection() {
  const published = useMemo(
    () => BUSINESS_PLANS.filter((p) => p.status === "published" && p.plan),
    []
  );
  const [activeSlug, setActiveSlug] = useState(published[0]?.slug ?? "foods");
  const activePlan = published.find((p) => p.slug === activeSlug)?.plan;

  return (
    <section
      id="business-plans"
      className="scroll-mt-28 bg-[#fafafa] border-b border-black/10 py-12 sm:py-16 md:py-20"
      aria-labelledby="business-plans-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div className="min-w-0 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373]">
                OPERATING COMPANIES · PDF PRESENTATIONS · WRITTEN PLANS
              </div>
            </div>
            <h2
              id="business-plans-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance"
            >
              Business plans by operating company
            </h2>
            <p className="text-sm sm:text-base text-[#404040] leading-relaxed text-pretty">
              Each published opco plan is a downloadable PDF presentation (A4 landscape or portrait —
              choose <strong className="text-black">Save as PDF</strong> in the print dialog). Live
              now: <strong className="text-black">Big Five Foods</strong> and{" "}
              <strong className="text-black">Big Five Connect</strong>. Full written narrative sits
              under each deck for on-page reading. Additional opcos publish here as authored.
            </p>
          </div>
          {activePlan ? (
            <a
              href={`#business-plan-deck-${activePlan.meta.slug}`}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#262626] transition-colors print:hidden"
            >
              <Download className="w-4 h-4" />
              Jump to PDF deck
            </a>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 print:hidden">
          {BUSINESS_PLANS.map((entry) => (
            <PlanCard
              key={entry.slug}
              entry={entry}
              active={entry.slug === activeSlug}
              onSelect={() => {
                if (entry.status === "published") setActiveSlug(entry.slug);
              }}
            />
          ))}
        </div>

        {/* Mount only the active opco deck so keyboard + PDF export stay unambiguous.
            Each DeckShell provides A4 Landscape / Portrait → Save as PDF. */}
        {activePlan ? (
          <div data-business-plan-panel={activePlan.meta.slug}>
            <BusinessPlanDeck key={activePlan.meta.slug} plan={activePlan} />
            <div className="mb-4 flex items-center gap-2 print:hidden">
              <FileText className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-semibold tracking-tight text-black">
                Full written plan · {activePlan.meta.companyName}
              </h3>
            </div>
            <PlanDocument plan={activePlan} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
