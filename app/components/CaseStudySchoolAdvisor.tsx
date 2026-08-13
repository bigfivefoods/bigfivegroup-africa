import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ExternalLink,
  Landmark,
  School,
  ShieldAlert,
  UtensilsCrossed,
} from "lucide-react";
import { SCHOOL_ADVISOR_CASE, SCHOOL_MEAL_SAFETY_SOURCE } from "../lib/schoolAdvisorCase";
import { NSNP } from "../lib/nsnp";
import CaseStudyPdfDownload from "./case-study/CaseStudyPdfDownload";
import CaseStudyShare from "./case-study/CaseStudyShare";

const actorIcons = [Landmark, School, UtensilsCrossed] as const;

export default function CaseStudySchoolAdvisor({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";
  const c = SCHOOL_ADVISOR_CASE;

  return (
    <section
      id="case-study-schooladvisor"
      className={`scroll-mt-24 ${
        compact ? "py-10 sm:py-12" : "py-14 sm:py-20 md:py-24"
      }`}
      aria-labelledby="schooladvisor-case-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left — problem scale + platform */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#7c2d12] via-[#0f172a] to-black text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between min-w-0">
              <div>
                <div className="mb-5 inline-flex rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                  <Image
                    src={c.logoSrc}
                    alt={c.logoAlt}
                    width={160}
                    height={120}
                    className="h-12 sm:h-14 w-auto object-contain"
                    unoptimized
                  />
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] text-orange-300/90 font-semibold mb-4">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {c.eyebrow}
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-none mb-2">
                  {c.ambition}
                </div>
                <div className="text-base sm:text-lg text-orange-100/90 font-medium mb-3">
                  {c.ambitionUnit}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-1">
                  {c.secondaryStat.value}
                </div>
                <div className="text-sm text-white/70 mb-5">{c.secondaryStat.label}</div>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {SCHOOL_MEAL_SAFETY_SOURCE.nonCompliantKitchenFraming}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div>
                  <div className="text-[10px] tracking-[1.5px] text-white/40 uppercase mb-2">
                    Source · public reporting
                  </div>
                  <a
                    href={SCHOOL_MEAL_SAFETY_SOURCE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm text-orange-200 hover:text-orange-100 underline-offset-2 hover:underline"
                  >
                    <span>
                      {SCHOOL_MEAL_SAFETY_SOURCE.outlet} · {SCHOOL_MEAL_SAFETY_SOURCE.publishedLabel}{" "}
                      — kitchen food-handling compliance under NSNP
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  </a>
                </div>
                <div>
                  <div className="text-[10px] tracking-[1.5px] text-white/40 uppercase mb-1">
                    Platform · module
                  </div>
                  <a
                    href={c.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white break-all"
                  >
                    www.supplieradvisor.com · {c.moduleName}
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
                <div>
                  <div className="text-[10px] tracking-[1.5px] text-white/40 uppercase mb-1">
                    Programme
                  </div>
                  <a
                    href={NSNP.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-xs text-white/55 hover:text-white/75"
                  >
                    <span>
                      {NSNP.shortName} · {NSNP.departmentShort}
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — response story */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 min-w-0">
              <h2
                id="schooladvisor-case-heading"
                className={`font-semibold tracking-tighter text-black text-balance ${
                  compact ? "text-xl sm:text-2xl mb-3" : "text-2xl sm:text-3xl mb-4"
                }`}
              >
                {c.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed mb-3">
                {c.problemLead}
              </p>
              <p className="text-sm text-[#525252] leading-relaxed mb-3">{c.problemBody}</p>
              <p className="text-sm text-[#525252] leading-relaxed mb-5">{c.problemContext}</p>

              <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="w-4 h-4 text-cyan-800" />
                  <div className="text-xs font-bold tracking-wide text-cyan-900 uppercase">
                    How {c.moduleName} helps the Department of Basic Education
                  </div>
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">{c.solutionLead}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                {c.actors.map((a, i) => {
                  const Icon = actorIcons[i] ?? School;
                  return (
                    <div
                      key={a.t}
                      className="rounded-xl border border-orange-100 bg-orange-50/40 p-3 sm:p-4 min-w-0"
                    >
                      <Icon className="w-4 h-4 text-orange-900 mb-2" aria-hidden />
                      <div className="text-xs font-bold tracking-wide text-orange-950 mb-1.5">
                        {a.t}
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#404040] leading-snug">{a.d}</p>
                    </div>
                  );
                })}
              </div>

              {!compact && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-black/10 bg-[#fafafa] px-3 py-2.5 text-center min-w-0"
                      >
                        <div className="text-sm sm:text-base font-semibold tracking-tight text-orange-950">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-[#737373] leading-snug mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-sm font-semibold text-black mb-3">
                    How SchoolAdvisor works on SupplierAdvisor®
                  </h3>
                  <ul className="space-y-2.5 mb-6">
                    {c.howItWorks.map((step) => (
                      <li key={step.t} className="flex gap-2.5 text-sm text-[#404040]">
                        <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-black">{step.t}.</strong> {step.d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-black/8 bg-[#fafafa] p-4 sm:p-5 mb-6">
                    <h3 className="text-sm sm:text-base font-semibold text-black mb-2">
                      Why it matters for learners — and for DBE
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-4">
                      {c.whyItMatters}
                    </p>
                    <ul className="space-y-2">
                      {c.outcomes.map((item) => (
                        <li key={item} className="flex gap-2 text-xs sm:text-sm text-[#404040]">
                          <Check className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-4">
                    {c.programmeNote}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {c.pillars.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-orange-50 text-orange-950 border border-orange-100"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed mb-5">
                {c.note}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 items-stretch sm:items-center">
                <CaseStudyPdfDownload
                  pdfId="schooladvisor-kitchen"
                  label="Download PDF"
                  className="premium-button inline-flex items-center justify-center gap-2 bg-orange-800 text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto hover:bg-orange-900 disabled:opacity-60 print:hidden"
                />
                <CaseStudyShare shareId="schooladvisor-kitchen" />
                <a
                  href={c.ctaPrimary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {c.ctaPrimary.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href={c.ctaSecondary.href}
                  className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {c.ctaSecondary.label}
                </Link>
                <Link
                  href={c.ctaTertiary.href}
                  className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-cyan-900 hover:underline"
                >
                  {c.ctaTertiary.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
