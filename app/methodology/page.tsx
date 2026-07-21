import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { SUPER_CUBE_FMCG_CASE } from "../lib/superCubeCase";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata = {
  title: "Methodology & sources",
  description:
    "How Big Five Group states impact: ambition vs programme-reported delivery vs internal analysis vs research — NSNP, Agri, Global, Super-Cube® and Foods figures.",
  openGraph: {
    title: "Methodology & sources | Big Five Group",
    url: "/methodology",
    images: [SITE_OG_IMAGE],
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
            2.5 million children / day (NSNP programme landed)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">
            {NSNP_CASE.approval} The programme is <strong>landed</strong> with DBE; the 2.5m figure is
            a <strong>high-level delivery plan</strong> as scale ramps — not a claim of current daily
            headcount unless restated in a dated partner brief. Landing NSNP is also framed as
            institutional credibility for other government departments and continental public pathways.
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
            SANTACO · 15,000 containers (Direct)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">
            Big Five Direct states a <strong>partnership with SANTACO</strong> (South African National
            Taxi Council) to <strong>roll out 15,000 containers</strong> at major taxi ranks and rural
            communities. That figure is a <strong>partnership programme plan / rollout target</strong> —
            not a claim that all units are already live. In-container uses include Foods supply, Wi‑Fi
            for surveys, marketing (sales revenue), and Big Five Leadership / Super-Cube® education.
          </p>
          <p className="text-sm text-[#525252] leading-relaxed mb-3">
            Industry context for investors: minibus taxis are South Africa’s dominant public-transport
            mode. Stats SA’s National Household Travel Survey (2020) reports taxis account for about{" "}
            <strong>80% of public-transport trips</strong>. Industry sources often cite on the order of
            millions of daily taxi trips (sometimes ~15 million); independent fact-checks note the exact
            national headcount is hard to pin from surveys — we use “millions of daily movements” as
            order-of-magnitude context, not a Big Five audited passenger count.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-sm">
            <a
              href="https://santaco.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-black underline underline-offset-2"
            >
              SANTACO
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.statssa.gov.za/publications/P0320/P03202020.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-black underline underline-offset-2"
            >
              Stats SA NHTS 2020
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link href="/direct#santaco" className="inline-flex items-center gap-1 font-semibold text-black">
              Direct · SANTACO section
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
            (e.g. ~45% Foods GP; ~50% cheaper vs wholesale and retail) and nutrition design
            comparisons are{" "}
            <strong>internal analyses</strong> versus alternative formulations or procurement
            pathways — request the latest worksheet when you partner.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            How we state numbers on this site
          </h2>
          <ul className="text-sm text-[#404040] leading-relaxed space-y-2 list-disc pl-5">
            <li>
              <strong>Ambition / plan</strong> — what we are building toward (e.g. 2.5m children/day
              NSNP plan scale after programme landed; 2.8M ha regenerative opportunity; 54-nation African vision; 12 priority
              distribution markets).
            </li>
            <li>
              <strong>Programme-reported</strong> — delivery totals from operating programmes
              (e.g. meals / children reached) shared for partner context; not statutory audits.
            </li>
            <li>
              <strong>Internal analysis</strong> — cost and nutrition design comparisons versus
              alternatives; worksheets available in a formal brief.
            </li>
            <li>
              <strong>Research</strong> — Super-Cube® developability and construct lifts from DBA /
              published work, with sources on Leadership.
            </li>
          </ul>
          <p className="text-sm text-[#525252] leading-relaxed mt-3">
            We do not publish inflated contract, hub-count or capital figures as fact. Request a
            dated partner brief for audit-grade packs.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Agri continental reach (2.8M ha · 50k+ farmers · 47% · 54 nations)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed">
            These are <strong>plan and ambition</strong> indicators for regenerative agriculture
            across Africa — land opportunity we aim to unlock, farmers we plan to train, income
            increase potential we target, and nations in our long-term vision. They are{" "}
            <strong>not</strong> claims of completed programmes at that scale today.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Global distribution (12 priority markets)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed">
            Priority markets are countries where we are <strong>building distribution and
            route-to-market</strong> (nine African nations plus Germany, Hungary and Georgia in
            Europe), including a company setup in Kenya. Wider lists are expansion horizons, not
            live full operations.
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-black mb-3">
            Group-scale indicators (home)
          </h2>
          <p className="text-sm text-[#404040] leading-relaxed">
            Home page counters reflect <strong>ambition and priority footprint</strong> (nations
            vision, distribution markets, regenerative opportunity, NSNP plan) — not audited
            financial statements or jobs ledgers. Use a briefing for partner-grade numbers with
            dates and scopes.
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
