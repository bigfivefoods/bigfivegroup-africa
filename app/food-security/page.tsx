import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ExternalLink,
  Globe2,
  Package,
  School,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";
import { pageBrand } from "../lib/pageBrand";
import { SOFI, SOFI_DECK_STATS } from "../lib/sofi";
import { getPillarAlignment, GROUP_VMV } from "../lib/pillarAlignment";
import { companies } from "../lib/companies";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";
import { NSNP } from "../lib/nsnp";

const brand = pageBrand.foodSecurity;

const SDGS = [
  {
    number: "2",
    title: "Zero Hunger",
    icon: "/sdg/sdg-2.png",
    color: "#DDA63A",
    challenge:
      "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture — SOFI shows the world remains far off track.",
    ourWork:
      "Fortified Big Five Foods staples, NSNP institutional packs, regenerative Agri supply, and last-mile Direct containers so nutrition reaches plates.",
  },
  {
    number: "1",
    title: "No Poverty",
    icon: "/sdg/sdg-1.png",
    color: "#E5243B",
    challenge:
      "Poverty and hunger reinforce each other. When healthy diets are unaffordable, households trade nutrition for calories.",
    ourWork:
      "Cost-efficient fortified formats (~50% cheaper vs wholesale/retail pathways, internal) and Access pathways that open institutional and development finance.",
  },
  {
    number: "4",
    title: "Quality Education",
    icon: "/sdg/sdg-4.png",
    color: "#C5192D",
    challenge:
      "Hungry children cannot learn. School feeding is both a nutrition and education instrument — a core WFP and national-programme priority.",
    ourWork:
      "NSNP pathway with DBE, Kenya school-feeding ambition, Super-Cube® leadership formation, and Wi‑Fi + education in solar containers.",
  },
  {
    number: "8",
    title: "Decent Work",
    icon: "/sdg/sdg-8.png",
    color: "#A21942",
    challenge:
      "Fragile food systems fail producers and informal workers. Dignified jobs in production, packing, logistics and trade are part of the solution.",
    ourWork:
      "Farmer partnership (Agri), container micro-enterprise (Direct), manufacturing and corridor roles, ethical trade on SupplierAdvisor®.",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    icon: "/sdg/sdg-10.png",
    color: "#DD1367",
    challenge:
      "SOFI shows Africa carries a disproportionate hunger burden. Rural and peri-urban communities are often last to receive affordable nutrition.",
    ourWork:
      "Last-mile nodes where people already move (SANTACO ranks, rural hubs), Africa-first product design, verified suppliers who can sell into programmes.",
  },
  {
    number: "17",
    title: "Partnerships",
    icon: "/sdg/sdg-17.png",
    color: "#19486A",
    challenge:
      "No single actor ends hunger. Governments, agencies, distributors and communities need shared rails and honest proof.",
    ourWork:
      "Multi-pillar Group + institutional pathways (DBE, health aspirations), global distributors, philanthropy with Impact PMO, trade on SupplierAdvisor®.",
  },
] as const;

/** Core SOFI challenges we frame for partners */
const SOFI_CHALLENGES = [
  {
    icon: Globe2,
    title: "Global hunger still far from Zero Hunger",
    stat: SOFI_DECK_STATS.globalHunger.value,
    detail: SOFI_DECK_STATS.globalHunger.label,
    body: `${SOFI.global.vsPriorYearNote}. ${SOFI.global.stillAbove2015Note}. Progress is real but insufficient for SDG 2.`,
  },
  {
    icon: AlertTriangle,
    title: "Africa remains the epicentre",
    stat: SOFI_DECK_STATS.africaHunger.value,
    detail: SOFI_DECK_STATS.africaHunger.label,
    body: `${SOFI.africa.epicentreNote}. Prevalence eased slightly in the latest reading, yet absolute numbers remain extremely high — and ${SOFI.outlook2030.shareInAfricaApprox} of people projected undernourished by 2030 could be in Africa.`,
  },
  {
    icon: UtensilsCrossed,
    title: "Healthy diets remain unaffordable",
    stat: SOFI_DECK_STATS.healthyDiets.value,
    detail: SOFI_DECK_STATS.healthyDiets.label,
    body: "Cost per plate is a strategic variable. Fortification and institutional formats only scale if programmes and households can afford them every day.",
  },
  {
    icon: Users,
    title: "Child stunting remains off-track",
    stat: SOFI_DECK_STATS.childStunting.value,
    detail: SOFI_DECK_STATS.childStunting.label,
    body: `${SOFI.childNutrition.stuntingNote}. ${SOFI.childNutrition.ssaHighStuntingNote}. School-channel and complementary feeding matter.`,
  },
] as const;

const WFP_THEMES = [
  {
    icon: School,
    t: "School feeding & national programmes",
    d: "WFP and partner governments treat school meals as a nutrition, education and social-protection tool. Big Five Foods lands institutional formats on the South African NSNP pathway with DBE — plan scale language for ~2.5 million children/day as delivery ramps — and designs for similar school-channel logic in Kenya and other corridors.",
  },
  {
    icon: Package,
    t: "Nutritious, shelf-stable supply",
    d: "Emergency and institutional supply chains need products that travel without cold chain, fortify micronutrients, and fit local taste. Our porridges, soya, one-pots and soups are built for African plates and programme logistics.",
  },
  {
    icon: Truck,
    t: "Last-mile delivery & resilient corridors",
    d: "Food security fails when stock never reaches the plate. Direct’s solar mobile containers and SANTACO-linked ranks put fortified retail and education where footfall already is; Global opens ethical route-to-market abroad.",
  },
  {
    icon: ShieldCheck,
    t: "Transparent, ethical procurement",
    d: "Agencies and ministries need audit trails. Connect runs SupplierAdvisor® so approved products, menus, quotes and orders leave a trail governments, funders and operators can inspect.",
  },
] as const;

const OPPORTUNITIES = [
  {
    t: "Affordable fortification at scale",
    d: `Design cost-competitive fortified staples so public menus and households stretch budgets — our internal analysis shows ~${FOODS_ECONOMICS.cheaperThanMarket.value} vs typical wholesale/retail pathways.`,
  },
  {
    t: "School nutrition as a delivery system",
    d: "Treat NSNP and peer programmes as repeatable institutional offtake — product, logistics and OS together — not one-off donations.",
  },
  {
    t: "Last-mile nodes that compound",
    d: "Containers that Feed (food), Educate (Wi‑Fi + Super-Cube®) and Empower (jobs) turn taxi ranks and rural hubs into multi-use food-security infrastructure.",
  },
  {
    t: "One operating system for proof",
    d: "Run procurement and offtake on SupplierAdvisor® so capital, ministries and partners share the same verification fabric.",
  },
  {
    t: "Leadership & programme discipline",
    d: "Super-Cube® and Impact PMO so tools and capital are governed ethically under pressure — SDG 2 needs people who can hold multi-stakeholder delivery.",
  },
  {
    t: "African production for African and global demand",
    d: "Regenerative Agri supply plus Global corridors — production, fortification and trade that keep value and dignity on the continent.",
  },
] as const;

const PILLAR_SLUGS = [
  "agri",
  "foods",
  "direct",
  "access",
  "connect",
  "leadership",
  "foundation",
  "impact",
  "global",
] as const;

export default function FoodSecurityPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image={brand.hero}
        eyebrow={brand.eyebrow}
        title={
          <>
            Food security challenges
            <br />
            and opportunities
          </>
        }
        subtitle={`How we read UN ${SOFI.edition} (${SOFI.agencies}) and the Sustainable Development Goals — and how Big Five Group answers with Feed · Educate · Empower: product, last mile, school channels, leadership and transparent trade.`}
        ctas={[
          { href: "#sofi", label: "SOFI challenges", primary: true },
          { href: "#sdgs", label: "UN SDGs" },
          { href: "#response", label: "How we respond" },
          { href: "/contact", label: "Partner with us" },
        ]}
        overlayClassName={brand.overlay}
      />

      {/* Honesty banner */}
      <section className="border-b border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-4xl">
            <strong className="text-black">External context only.</strong> SOFI and SDG figures are
            multi-agency UN statistics — not Big Five audited metrics. Group programme numbers use
            plan / programme-reported / internal labels as on{" "}
            <Link href="/methodology" className="underline underline-offset-2 font-medium text-black">
              Methodology
            </Link>
            . Primary sources:{" "}
            <a
              href={SOFI.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-medium text-black inline-flex items-center gap-1"
            >
              {SOFI.edition} report
              <ExternalLink className="w-3 h-3" />
            </a>
            {" · "}
            <a
              href={SOFI.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-medium text-black inline-flex items-center gap-1"
            >
              Newsroom
              <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>
        </div>
      </section>

      {/* North star */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-2xl sm:rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 p-6 sm:p-8 md:p-10">
          <div className="text-[10px] sm:text-xs tracking-[2px] font-semibold text-emerald-800 mb-2">
            GROUP NORTH STAR
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3 text-balance">
            {GROUP_VMV.mission.title}
          </h2>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-4">
            {GROUP_VMV.mission.body} Our vision — {GROUP_VMV.vision.title.toLowerCase()} — frames
            every food-security programme we design with partners.
          </p>
          <div className="flex flex-wrap gap-2">
            {GROUP_VMV.values.map((v) => (
              <span
                key={v.title}
                className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 bg-white text-emerald-950"
              >
                {v.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SOFI challenges */}
      <section id="sofi" className="scroll-mt-28 bg-white border-y border-black/10 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${SOFI.edition} · ${SOFI.agencies}`}
            title="The food-security challenge we design against"
            subtitle="The State of Food Security and Nutrition in the World is the multi-agency baseline for hunger, diet affordability and child nutrition. We use it as external context — then build African systems that respond."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SOFI_CHALLENGES.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black">
                      {c.stat}
                    </div>
                    <p className="text-[11px] text-[#737373] leading-snug mt-0.5">{c.detail}</p>
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-black mb-1.5">{c.title}</h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] sm:text-xs text-[#737373] leading-relaxed max-w-3xl">
            Also cited: ~{SOFI.foodInsecurity2024.peopleLabel} people with moderate or severe food
            insecurity in 2024 ({SOFI.priorEdition}). {SOFI.shortCite}.
          </p>
        </div>
      </section>

      {/* WFP / programme themes */}
      <section id="wfp" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeading
          eyebrow="WFP · SCHOOL FEEDING · SUPPLY CHAINS"
          title="Programme challenges that match how we operate"
          subtitle="The World Food Programme and national partners emphasise school feeding, nutritious supply, resilient logistics and accountable procurement. Those are the same rails Big Five Group is built on."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {WFP_THEMES.map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 to-white p-5 sm:p-6 min-w-0"
            >
              <x.icon className="w-5 h-5 text-amber-800 mb-2" />
              <h3 className="text-base font-semibold text-black mb-2">{x.t}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-[#737373] leading-relaxed max-w-3xl">
          WFP is a co-publisher of SOFI with FAO, IFAD, UNICEF and WHO. We align to the public
          challenge set those agencies describe — we do not claim a formal WFP partnership unless
          stated in a dated brief.
        </p>
      </section>

      {/* SDGs */}
      <section id="sdgs" className="scroll-mt-28 bg-white border-y border-black/10 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="UNITED NATIONS · SUSTAINABLE DEVELOPMENT GOALS"
            title="SDGs that frame our food-security work"
            subtitle="Zero Hunger sits at the centre. Poverty, education, decent work, inequality and partnerships are inseparable from plates that arrive every day."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SDGS.map((g) => (
              <div
                key={g.number}
                className="rounded-2xl border border-black/10 bg-[#fafafa] overflow-hidden min-w-0 flex flex-col"
              >
                <div className="flex items-center gap-3 p-4 border-b border-black/5 bg-white">
                  <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={g.icon}
                      alt={`SDG ${g.number}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold tracking-wide" style={{ color: g.color }}>
                      SDG {g.number}
                    </div>
                    <div className="text-sm font-semibold text-black leading-tight">{g.title}</div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <div>
                    <div className="text-[10px] font-semibold tracking-wide text-[#737373] mb-1">
                      THE CHALLENGE
                    </div>
                    <p className="text-xs text-[#525252] leading-relaxed">{g.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-wide text-emerald-800 mb-1">
                      HOW WE RESPOND
                    </div>
                    <p className="text-xs text-[#404040] leading-relaxed">{g.ourWork}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-[#737373]">
            Official SDG colour tiles ·{" "}
            <a
              href="https://sdgs.un.org/goals"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              sdgs.un.org/goals
            </a>
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeading
          eyebrow="OPPORTUNITIES"
          title="Where challenge becomes design space"
          subtitle="SOFI does not only diagnose — it points to what must be built: affordable nutrition, school channels, last-mile rails, transparent trade and capable leaders."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {OPPORTUNITIES.map((o, i) => (
            <div
              key={o.t}
              className="rounded-2xl border border-black/10 bg-white p-5 min-w-0"
            >
              <div className="text-[10px] font-bold text-emerald-700 mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-black mb-1.5">{o.t}</h3>
              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Group response by pillar */}
      <section id="response" className="scroll-mt-28 bg-[#0a0a0a] text-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-emerald-400/90 mb-3">
              BIG FIVE GROUP RESPONSE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance mb-3">
              How each pillar addresses the challenge
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              One holding system — production to PMO — so fortification, last mile, capital,
              commerce, leadership and delivery compound as {GROUP_VMV.mission.title}
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {PILLAR_SLUGS.map((slug) => {
              const a = getPillarAlignment(slug);
              const company = companies.find((c) => c.slug === slug);
              if (!company) return null;
              return (
                <div
                  key={slug}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 min-w-0"
                >
                  <div className="lg:col-span-3 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: company.color }}
                      />
                      <Link
                        href={`/${slug}`}
                        className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                      >
                        {company.fullName}
                        <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      </Link>
                    </div>
                    <div className="text-[10px] font-semibold tracking-wide text-emerald-400/90 uppercase">
                      Mission · {a.mission}
                    </div>
                    <p className="text-[11px] text-white/50 leading-snug mt-1.5">{a.missionFit}</p>
                  </div>
                  <div className="lg:col-span-4 min-w-0">
                    <div className="text-[10px] font-semibold tracking-wide text-white/40 mb-1">
                      SOFI / SYSTEM CHALLENGE
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{a.sofiChallenge}</p>
                  </div>
                  <div className="lg:col-span-5 min-w-0">
                    <div className="text-[10px] font-semibold tracking-wide text-emerald-400/80 mb-1">
                      OUR RESPONSE
                    </div>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">{a.sofiResponse}</p>
                    {a.stats && a.stats.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {a.stats.map((s) => (
                          <span
                            key={s.label}
                            className="text-[10px] px-2 py-1 rounded-full border border-white/15 bg-white/5 text-white/70"
                          >
                            <strong className="text-white">{s.value}</strong> · {s.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeading
          eyebrow="IN PRACTICE"
          title="Signature pathways already under way"
          subtitle="Examples of how challenge language becomes programme design — always with honest scale labels."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              icon: UtensilsCrossed,
              t: "Foods · NSNP pathway",
              d: `Institutional 5kg packs on the ${NSNP.shortName} pathway with ${NSNP.departmentShort}. Plan scale ~2.5 million children/day as delivery ramps — not current daily headcount.`,
              href: "/foods#case-study",
            },
            {
              icon: Truck,
              t: "Direct · solar containers",
              d: "4 solar mobile containers in operation; larger SANTACO-linked rollout planned. Feed · Educate · Empower at taxi ranks and rural communities.",
              href: "/direct",
            },
            {
              icon: ShieldCheck,
              t: "Connect · SupplierAdvisor®",
              d: "Verified trade OS for menus, products and offtake — plus SchoolAdvisor for kitchen food-safety compliance under NSNP.",
              href: "/connect#case-study-schooladvisor",
            },
          ].map((x) => (
            <Link
              key={x.t}
              href={x.href}
              className="group rounded-2xl border border-black/10 bg-white p-5 sm:p-6 hover:border-emerald-300 hover:shadow-md transition-all min-w-0"
            >
              <x.icon className="w-5 h-5 text-emerald-800 mb-2" />
              <h3 className="text-base font-semibold text-black mb-1.5 group-hover:text-emerald-900">
                {x.t}
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-3">{x.d}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                Explore
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing principles */}
      <section className="bg-white border-y border-black/10 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black mb-4">
            How we speak about this work
          </h2>
          <ul className="space-y-3">
            {[
              "SOFI and SDG numbers are external multi-agency context — never presented as Big Five KPIs.",
              "Programme scale (e.g. NSNP 2.5M children/day) is plan language unless a dated brief restates operational headcount.",
              "Cost and nutrition-design figures are management / internal analyses — NDA for SKU-level detail.",
              "We prefer product + rails + OS over charity one-offs — dignity with commercial discipline.",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-sm text-[#404040] leading-relaxed">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#525252]">
            Full transparency notes:{" "}
            <Link href="/methodology" className="font-semibold text-black underline underline-offset-2">
              Methodology & sources
            </Link>
            . Group overview:{" "}
            <Link href="/group" className="font-semibold text-black underline underline-offset-2">
              The Group
            </Link>
            .
          </p>
        </div>
      </section>

      <FinalCta
        title="Build food security with us"
        subtitle="Whether you fund containers, school nutrition, institutional offtake or corridor distribution — we design programmes that answer SOFI-scale challenges with African product and transparent rails."
        primary={{ href: "/contact", label: "Book a briefing" }}
        secondary={{ href: "/group", label: "Explore the Group" }}
      />
    </div>
  );
}
