import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import CaseStudyPdfDownload from "./case-study/CaseStudyPdfDownload";

export default function CaseStudyNsnp({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <section
      id="case-study"
      className={`scroll-mt-24 ${
        compact ? "py-10 sm:py-12" : "py-14 sm:py-20 md:py-24"
      }`}
      aria-labelledby="nsnp-case-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-[#1c1006] to-black text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between min-w-0">
              <div>
                <div className="mb-5">
                  <Image
                    src="/bigfivefoods-logo.png"
                    alt="Big Five Foods"
                    width={160}
                    height={160}
                    className="h-14 w-14 sm:h-16 sm:w-16 object-contain brightness-0 invert"
                    priority
                  />
                </div>
                <div className="text-[10px] sm:text-xs tracking-[2px] text-amber-300/90 font-semibold mb-4">
                  {NSNP_CASE.eyebrow}
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-none mb-2">
                  {NSNP_CASE.ambition}
                </div>
                <div className="text-lg sm:text-xl text-amber-100/90 font-medium mb-4">
                  {NSNP_CASE.ambitionUnit}
                </div>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  High-level delivery ambition for daily school nutrition with Big Five Foods
                  fortified porridges and soya minces on the{" "}
                  <span className="text-white font-medium">{NSNP.shortName}</span> pathway.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] tracking-[1.5px] text-white/40 uppercase mb-2">
                  Programme reference
                </div>
                <a
                  href={NSNP.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm text-amber-200 hover:text-amber-100 underline-offset-2 hover:underline"
                >
                  <span>
                    {NSNP.name} · {NSNP.departmentShort}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 min-w-0">
              <h2
                id="nsnp-case-heading"
                className={`font-semibold tracking-tighter text-black text-balance ${
                  compact ? "text-xl sm:text-2xl mb-3" : "text-2xl sm:text-3xl mb-4"
                }`}
              >
                {NSNP_CASE.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed mb-4">
                {NSNP_CASE.approval}
              </p>
              <p className="text-sm text-[#525252] leading-relaxed mb-5">
                {NSNP_CASE.productFocus} {NSNP_CASE.whyItMatters}
              </p>

              {!compact && (
                <ul className="space-y-2.5 mb-6">
                  {NSNP_CASE.whatWeDeliver.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-[#404040]">
                      <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {NSNP_CASE.pillars.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-100"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="rounded-xl border border-black/8 bg-[#fafafa] p-4 mb-6">
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                  <strong className="text-black">About {NSNP.shortName}:</strong> {NSNP.summary}{" "}
                  <a
                    href={NSNP.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black underline underline-offset-2"
                  >
                    Official DBE programme page
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <CaseStudyPdfDownload
                  pdfId="nsnp-foods"
                  label="Download PDF"
                  className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto disabled:opacity-60 print:hidden"
                />
                <Link
                  href={NSNP_CASE.ctaPrimary.href}
                  className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {NSNP_CASE.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={NSNP_CASE.ctaSecondary.href}
                  className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
                >
                  {NSNP_CASE.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
