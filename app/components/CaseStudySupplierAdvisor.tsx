import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Check, Network } from "lucide-react";
import { SA_CASE } from "../lib/supplierAdvisorCase";

export default function CaseStudySupplierAdvisor({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <section
      id="case-study-sa"
      className={`scroll-mt-24 ${
        compact ? "py-10 sm:py-12" : "py-14 sm:py-20 md:py-24"
      }`}
      aria-labelledby="sa-case-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c4a6e] via-[#0f172a] to-black text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between min-w-0">
              <div>
                <div className="mb-5 inline-flex rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                  <Image
                    src={SA_CASE.logoSrc}
                    alt={SA_CASE.logoAlt}
                    width={160}
                    height={120}
                    className="h-12 sm:h-14 w-auto object-contain"
                    unoptimized
                  />
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] text-cyan-300/90 font-semibold mb-4">
                  <Network className="w-3.5 h-3.5" />
                  {SA_CASE.eyebrow}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.1] mb-2 text-balance">
                  {SA_CASE.ambition}
                </div>
                <div className="text-base sm:text-lg text-cyan-100/90 font-medium mb-4">
                  {SA_CASE.ambitionUnit}
                </div>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  <span className="text-white font-medium">&ldquo;{SA_CASE.tagline}&rdquo;</span>
                  {" — "}
                  blockchain-ready ERP where verification, lots and SHEQ are live controls.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] tracking-[1.5px] text-white/40 uppercase mb-2">
                  Live platform
                </div>
                <a
                  href={SA_CASE.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100 underline-offset-2 hover:underline break-all"
                >
                  www.supplieradvisor.com
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 min-w-0">
              <h2
                id="sa-case-heading"
                className={`font-semibold tracking-tighter text-black text-balance ${
                  compact ? "text-xl sm:text-2xl mb-3" : "text-2xl sm:text-3xl mb-4"
                }`}
              >
                {SA_CASE.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed mb-3">
                {SA_CASE.body}
              </p>
              <p className="text-sm text-[#525252] leading-relaxed mb-5">{SA_CASE.context}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                {SA_CASE.pillars.map((p) => (
                  <div
                    key={p.t}
                    className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-3 sm:p-4 min-w-0"
                  >
                    <div className="text-xs font-bold tracking-[1.5px] text-cyan-900 mb-1.5">
                      {p.t}
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#404040] leading-snug">{p.d}</p>
                  </div>
                ))}
              </div>

              {!compact && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {SA_CASE.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-black/10 bg-[#fafafa] px-3 py-2.5 text-center min-w-0"
                      >
                        <div className="text-sm sm:text-base font-semibold tracking-tight text-cyan-900">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-[#737373] leading-snug mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {SA_CASE.capabilities.slice(0, 4).map((c) => (
                      <li key={c.t} className="flex gap-2.5 text-sm text-[#404040]">
                        <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-black">{c.t}.</strong> {c.d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-black/8 bg-[#fafafa] p-4 sm:p-5 mb-6">
                    <h3 className="text-sm sm:text-base font-semibold text-black mb-2">
                      {SA_CASE.revolutionTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-4">
                      {SA_CASE.revolutionBody}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SA_CASE.continentalImpacts.map((x) => (
                        <div
                          key={x.t}
                          className="rounded-lg border border-black/8 bg-white p-3 min-w-0"
                        >
                          <div className="text-xs font-semibold text-black mb-1">{x.t}</div>
                          <p className="text-[11px] text-[#525252] leading-snug">{x.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <p className="text-[11px] sm:text-xs text-[#737373] leading-relaxed mb-5">
                {SA_CASE.note}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 items-stretch sm:items-center">
                <a
                  href={SA_CASE.ctaPrimary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button inline-flex items-center justify-center gap-2 bg-cyan-800 text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {SA_CASE.ctaPrimary.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href={SA_CASE.ctaSecondary.href}
                  className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {SA_CASE.ctaSecondary.label}
                </Link>
                <Link
                  href={SA_CASE.ctaTertiary.href}
                  className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-cyan-900 hover:underline"
                >
                  {SA_CASE.ctaTertiary.label}
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
