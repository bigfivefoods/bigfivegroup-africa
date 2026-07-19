import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { SUPER_CUBE_FMCG_CASE } from "../lib/superCubeCase";

export const metadata = {
  title: "Methodology & sources",
  description:
    "How Big Five Group defines key metrics: NSNP school-nutrition ambition, Super-Cube® construct lifts, meals delivered, and programme-reported figures.",
  openGraph: {
    title: "Methodology & sources | Big Five Group",
    url: "/methodology",
    images: [{ url: "/home-hero.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section className="bg-[#0a0a0a] text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-400 mb-4">
            TRANSPARENCY
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-4">
            Methodology & sources
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Partner-grade honesty: how we define signature metrics, what is ambition vs delivered, and
            where to read primary sources. Ask for a formal brief when you need audit packs.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            2.5 million children / day (NSNP pathway)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">
            {NSNP_CASE.approval} This is framed as a <strong>high-level delivery ambition</strong> on
            an approved school-nutrition pathway — not a claim of current daily headcount unless
            restated in a dated partner brief.
          </p>
          <p className="text-sm text-[#525252] leading-relaxed mb-3">{NSNP.summary}</p>
          <a
            href={NSNP.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            DBE — National School Nutrition Programme
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            SupplierAdvisor® product claims
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">
            Positioning such as “the world&apos;s most trusted supplier advice”, B2B/B2G/B2C network,
            blockchain-ready pedigree, OTIFEF and module scope are aligned with the live product site{" "}
            <a
              href="https://www.supplieradvisor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
            >
              supplieradvisor.com
            </a>
            . Pricing, trial terms and founding-partner offers change on that platform — confirm there.
          </p>
          <Link
            href="/connect#case-study-sa"
            className="inline-flex items-center gap-1 text-sm font-semibold text-black"
          >
            View case study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Super-Cube® construct lifts (FMCG case)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">
            {SUPER_CUBE_FMCG_CASE.body}
          </p>
          <ul className="text-sm text-[#404040] space-y-1 mb-3">
            {SUPER_CUBE_FMCG_CASE.lifts.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>: +{l.lift} ({l.label})
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#737373] leading-relaxed">{SUPER_CUBE_FMCG_CASE.note}</p>
          <Link
            href="/leadership#case-study"
            className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-black"
          >
            View case study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Meals delivered · cost · nutrition comparisons
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-2">
            Historic meals and children-reached figures on Foods pages are{" "}
            <strong>programme-reported delivery totals</strong> (cumulative, partner-facing). Cost
            (e.g. ~83% cheaper pathways) and nutrition design comparisons are{" "}
            <strong>internal analyses</strong> versus alternative formulations or procurement
            pathways — request the latest worksheet when you partner.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Group-scale indicators (home stats)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed">
            Continental reach, hectares, capital facilitated and jobs are{" "}
            <strong>group-reported indicators of scale and ambition</strong>. They are not
            independently audited public financial statements. Use a briefing for partner-grade
            numbers with dates and scopes.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Super-Cube® developability (70–76%)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed">
            Drawn from Dr. Craig Ross Muller&apos;s DBA research (University of KwaZulu-Natal, 2020)
            and related publications: leadership capacity is substantially developable through
            deliberate practice and structured intervention, rather than fixed by heredity alone.
            Free book and peer-reviewed papers are linked from Leadership.
          </p>
        </article>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold"
          >
            Request a formal brief
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/partner-kit"
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold"
          >
            Partner kit
          </Link>
        </div>
      </section>
    </div>
  );
}
