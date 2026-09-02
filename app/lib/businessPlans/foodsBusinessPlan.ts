/**
 * Big Five Foods — Operating Company Business Plan
 * Investor-portal long-form document (~10–15 pages when printed).
 *
 * Figures are management-reported / illustrative unless restated under NDA.
 * Pipeline is opportunity-stage — not booked revenue.
 */

import { FOODS_ECONOMICS } from "../foodsEconomics";
import { NSNP, NSNP_CASE } from "../nsnp";
import { SOFI } from "../sofi";
import type { BusinessPlan } from "./types";
import {
  CORRECTIONAL_SCALE,
  DEFENCE_SCALE,
  DOH_PORRIDGE,
  INST_PACK_PRICE_ZAR,
  INSTITUTIONAL_VOLUME_DISCLAIMER,
  KZN_NSNP_ADDRESSABLE_100,
  KZN_NSNP_SCALE,
  KZN_SHARE_PCT_BASE,
  NON_KZN_SHARE_PCT_BASE,
  buildInstitutionalRevenueTable,
  formatPacks,
  formatTonnes,
  formatZarM,
  NSNP_VOLUME_BASE,
} from "./foodsInstitutionalVolumes";

const INST_REVENUE_TABLE = buildInstitutionalRevenueTable();

const FX = 16.5; // approx mid-market ZAR/USD for headline conversion

/** Foods near-term sales pipeline (management-reported) — plan-specific. */
export const FOODS_PIPELINE_4M = {
  valueZar: "R80m",
  valueUsd: `~$${(80_000_000 / FX / 1_000_000).toFixed(1)}m`,
  numericZar: 80_000_000,
  numericUsdApprox: Math.round(80_000_000 / FX),
  horizon: "next 4 months",
  detail:
    "Big Five Foods sales pipeline of R80 million (~USD 4.8m at ~16.5 ZAR/USD) over the next four months — opportunity-stage across retail listings, institutional programmes and trade partners. Not contracted or booked revenue until converted.",
} as const;

export const foodsBusinessPlan: BusinessPlan = {
  meta: {
    slug: "foods",
    opcoSlug: "foods",
    companyName: "Big Five Foods",
    fullTitle: "Big Five Foods Business Plan",
    subtitle:
      "Fortified African staples at institutional and retail scale — from brand establishment to Howick manufacturing, South Africa and continental corridors",
    version: "1.2",
    asOf: "September 2026",
    classification: "PRIVATE · INVESTOR DILIGENCE · CONFIDENTIAL",
    pageTarget: "12–18 pages",
    disclaimer:
      "This operating-company business plan is illustrative and management-reported where noted. It is not audited financials, not a prospectus, and not a guarantee of results. Pipeline figures are opportunity-stage. Commercial projections are directional for authorised investor discussion under NDA.",
  },

  coverStats: [
    {
      value: FOODS_PIPELINE_4M.valueZar,
      label: "Sales pipeline · next 4 months",
      note: `${FOODS_PIPELINE_4M.valueUsd} · opportunity-stage`,
    },
    {
      value: "~2.5m",
      label: "KZN NSNP learners (programme scale)",
      note: "Porridge daily · soya Mon · one-pot Fri",
    },
    {
      value: "Boxer · Spar · Bargains+",
      label: "Major retail listings underway",
      note: "Samples → trade → national listings",
    },
    {
      value: "Howick 1–2k m²",
      label: "Own packing → blending facility",
      note: "Next 18 months · SA + East & West Africa supply",
    },
  ],

  executiveHighlights: [
    "First 18 months: brand established, product ranges developed, samples placed into trade — response from retail and institutions has been phenomenal.",
    "Major retailer listings in progress with Boxer, Spar, Bargains and additional national accounts; institutional credibility unlocked via the KZN NSNP school-feeding pathway.",
    "Institutional menu design for KZN NSNP: 5kg enriched porridge daily, 5kg soya mince on Mondays, 5kg one-pot on Fridays — then multi-province and Department of Health fortified-porridge growth (0–5 year share ramps).",
    `Near-term commercial momentum: ${FOODS_PIPELINE_4M.valueZar} sales pipeline over the ${FOODS_PIPELINE_4M.horizon}, with a clear mandate to accelerate growth into East and West Africa.`,
    "Next 18 months: establish Big Five Foods’ own facility in Howick — packing and warehousing first (1,000–2,000 m²), then convert into a blending plant to supply South Africa and African export clients.",
    `Unit economics remain compelling: ~${FOODS_ECONOMICS.grossProfit.value} gross profit (management-reported) while remaining ~${FOODS_ECONOMICS.cheaperThanMarket.value} cheaper than typical wholesale/retail pathways (internal) — built for government menus and feeding schemes.`,
    `Mission alignment: address Africa’s hunger epicentre (~${SOFI.africa.hungryLabel} people · SOFI ${SOFI.edition.slice(-4)}) with affordable fortified staples that put Feed on the plate every day.`,
  ],

  chapters: [
    {
      n: "01",
      id: "executive-summary",
      title: "Executive summary",
      eyebrow: "THE THESIS IN ONE PAGE",
      blocks: [
        {
          type: "lead",
          text: "Big Five Foods exists to put affordable, fortified African staples on plates at scale — in homes, schools and institutions — while building a high-gross-margin manufacturing and brand platform that can supply South Africa and grow into East and West Africa.",
        },
        {
          type: "paragraph",
          text: "Africa remains the epicentre of undernourishment. According to SOFI 2026 (FAO/IFAD/UNICEF/WFP/WHO), about 309 million people in Africa faced hunger in 2025 — roughly one in five people on the continent — while roughly 2.7 billion people worldwide still cannot afford a healthy diet. Child stunting remains off-track for 2030. School feeding and institutional nutrition are among the few instruments that reach children daily with calories and micronutrients. That is the market Big Five Foods was built for.",
        },
        {
          type: "paragraph",
          text: "In our first eighteen months we focused on three jobs: establish the brand, develop the product ranges, and get samples into the trade. The update and response have been phenomenal. We are listing with major retailers — Boxer, Spar, Bargains and many more — and we have landed the KZN National School Nutrition Programme (NSNP) school-feeding pathway. We are now expanding that institutional footprint into other provinces and into other government departments.",
        },
        {
          type: "callout",
          tone: "amber",
          title: "Near-term commercial signal",
          body: `${FOODS_PIPELINE_4M.detail} We are simultaneously preparing the next capacity step: our own Howick facility so growth is not capped by third-party packing alone.`,
        },
        {
          type: "paragraph",
          text: "Over the next eighteen months we will set up our own factory in Howick, KwaZulu-Natal. Phase one is a packing and warehousing site of approximately 1,000–2,000 m²; phase two converts that footprint into a blending facility. The plant is designed to supply South African retail and institutional demand and to serve East and West African clients as corridors open. This plan sets out the problem we solve, the traction we have earned, the facility roadmap, illustrative commercial projections, risks and the impact case for investors who want both return and continental food-security outcomes.",
        },
        {
          type: "stats",
          items: [
            {
              value: `~${SOFI.africa.hungryLabel}`,
              label: "People facing hunger in Africa (2025 · SOFI)",
            },
            {
              value: FOODS_ECONOMICS.grossProfit.value,
              label: "Gross profit (management-reported)",
            },
            {
              value: FOODS_ECONOMICS.cheaperThanMarket.value,
              label: "Cheaper vs wholesale/retail (internal)",
            },
            {
              value: FOODS_PIPELINE_4M.valueZar,
              label: "Foods pipeline · 4 months",
            },
          ],
        },
      ],
    },

    {
      n: "02",
      id: "problem",
      title: "The problem — hunger, malnutrition & unaffordable diets",
      eyebrow: "WHY THIS MARKET EXISTS",
      blocks: [
        {
          type: "lead",
          text: "Food security in Africa is not a charity slogan — it is a structural commercial and public-policy failure of cost, nutrition density, logistics and trust. Big Five Foods is designed as a product answer to that failure.",
        },
        {
          type: "paragraph",
          text: `The State of Food Security and Nutrition in the World (${SOFI.edition}) reports that global hunger eased slightly in ${SOFI.dataYearHunger}, yet Africa still carries the largest absolute burden: ~${SOFI.africa.hungryLabel} people (~${SOFI.africa.prevalencePct}% of the continent’s population). ${SOFI.africa.epicentreNote}. If current trends persist, ${SOFI.outlook2030.shareInAfricaApprox} of people projected to be chronically undernourished by 2030 could live in Africa.`,
        },
        {
          type: "paragraph",
          text: `Affordability is the second crisis. About ${SOFI.healthyDiets.cannotAffordLabel} people worldwide cannot afford a healthy diet. When households and public programmes stretch budgets, they trade micronutrients for bulk calories — and children pay the price. Joint Child Malnutrition Estimates show ~${SOFI.childNutrition.stuntedLabel} children under five still stunted globally; Sub-Saharan Africa continues to carry a very high regional burden.`,
        },
        {
          type: "bullets",
          items: [
            "School-age hunger destroys learning capacity — NSNP and similar programmes are education instruments as much as nutrition instruments.",
            "Institutional buyers (education, health, correctional, humanitarian) need shelf-stable, fortified, culturally familiar formats that travel without cold chain.",
            "Retail mass-market shoppers need branded staples that feel African, taste familiar, and undercut the mark-up stack of imported or weakly fortified alternatives.",
            "Manufacturers who can combine ~45% GP with a structural cost advantage vs wholesale/retail can win both public tenders and private shelf space — rare in this category.",
          ],
        },
        {
          type: "quote",
          text: "Cost per plate is a strategic variable. Fortification only scales if programmes and households can afford it every day.",
          attribution: "Big Five Group · Food Security framing",
        },
        {
          type: "callout",
          tone: "emerald",
          title: "How we fix this",
          body: "We manufacture and brand fortified porridges, soya minces, one-pot meals and soups designed for African plates — priced for institutional menus (~50% cheaper vs typical wholesale/retail pathways on internal analysis) while retaining healthy gross margin. We win listings and programmes, then build owned capacity in Howick so supply can follow demand into South Africa, East Africa and West Africa.",
        },
      ],
    },

    {
      n: "03",
      id: "company",
      title: "Company overview — Big Five Foods",
      eyebrow: "OPERATING COMPANY INSIDE BIG FIVE GROUP",
      blocks: [
        {
          type: "paragraph",
          text: "Big Five Foods is the fortified-nutrition operating company of Big Five Group. It sits on the Group’s Feed mission alongside Agri (regenerative supply) and Direct (last-mile distribution), with Connect (SupplierAdvisor®) providing verified trade rails and Impact providing programme discipline for institutional pathways.",
        },
        {
          type: "paragraph",
          text: "Our product architecture is deliberately simple and African-first: vitamin-enriched porridges; protein-forward soya minces; complete one-pot meal mixes; and soups that stretch household and institutional menus. Institutional 5kg packs are designed for school kitchens and feeding schemes; retail packs build brand equity and reorder habits on shelf.",
        },
        {
          type: "table",
          table: {
            caption: "Where Foods sits in the Group system",
            headers: ["Rail", "Role for Foods", "Investor implication"],
            rows: [
              {
                cells: [
                  "Agri",
                  "Regenerative offtake & provenance into fortification",
                  "Supply story + eventual cost/quality edge",
                ],
              },
              {
                cells: [
                  "Foods",
                  "Brand, SKUs, packing/blending, institutional & retail sales",
                  "Recurring revenue · high GP · capacity build",
                ],
              },
              {
                cells: [
                  "Direct",
                  "Last-mile nodes (e.g. SANTACO ranks) & container retail",
                  "Additional offtake & brand visibility",
                ],
              },
              {
                cells: [
                  "Connect",
                  "SupplierAdvisor® ordering, quotes, verification",
                  "Audit-ready B2B/B2G rails",
                ],
              },
              {
                cells: [
                  "Impact / Access",
                  "Programme PMO & public-sector pathways",
                  "Credibility into departments beyond education",
                ],
              },
            ],
            footnote:
              "Foods can stand alone commercially; Group rails accelerate institutional proof and continental distribution.",
          },
        },
        {
          type: "paragraph",
          text: "Governance and capital for the continental platform sit at Big Five Group holding-company level (planned Seychelles holdco with IP at holdco; local opcos in end markets). This business plan focuses on Foods’ operating thesis, traction and facility roadmap so investors can diligence the manufacturing and brand engine that converts food-security demand into recurring revenue.",
        },
      ],
    },

    {
      n: "04",
      id: "first-18-months",
      title: "First 18 months — establish, develop, sample",
      eyebrow: "FOUNDATION PHASE · COMPLETE",
      blocks: [
        {
          type: "lead",
          text: "The deliberate plan for the first eighteen months was not to chase vanity volume. It was to get established as a brand, develop products buyers would reorder, and get samples into the trade so retail buyers and institutional kitchens could taste the difference.",
        },
        {
          type: "bullets",
          items: [
            "Brand establishment — Big Five Foods positioned as fortified African staples for households, schools and institutions, with certifications and packaging that travel in institutional logistics.",
            "Product development — porridge, soya, one-pot and soup ranges iterated for taste, fortification, shelf life and cost-in-use on African menus.",
            "Trade sampling — samples placed with distributors, retail buyers and programme stakeholders so listings and tenders are evidence-led, not brochure-led.",
            "Institutional readiness — NSNP-aligned 5kg formats prepared for school-day feeding logistics (porridge, beef soya mince, one-pot chicken biryani mix).",
            "Commercial systems — quote and order pathways via SupplierAdvisor® where programme procurement allows, so proof and pedigree travel with every carton.",
          ],
        },
        {
          type: "callout",
          tone: "emerald",
          title: "Result: phenomenal response",
          body: "The update and response from the market has been phenomenal. What began as brand and sample work has converted into major retail listing conversations and a landed provincial school-feeding pathway — the proof points required before committing capital to owned manufacturing capacity.",
        },
        {
          type: "paragraph",
          text: "Early-stage realised turnover remains modest relative to pipeline (management-reported group initial-stage figures are disclosed on the investor portal). That is expected in a foundation phase: the economic story now is conversion of listings and programmes, then capacity. The next chapters quantify traction and the Howick build that unlocks scale.",
        },
      ],
    },

    {
      n: "05",
      id: "traction",
      title: "Market traction — retail listings & KZN NSNP",
      eyebrow: "WHERE WE ARE NOW",
      blocks: [
        {
          type: "lead",
          text: "Traction is no longer theoretical. Big Five Foods is listing with major South African retailers and has landed the KZN NSNP school-feeding scheme — with a clear mandate to grow into other provinces and other government departments.",
        },
        {
          type: "paragraph",
          text: "Retail. We are listing with Boxer, Spar, Bargains and many more. These are not vanity logo slides: they are the mass-market and value channels where African staples move every week. Listing converts sample acceptance into shelf presence, barcode velocity and reorder discipline — the flywheel of a repetitive food business.",
        },
        {
          type: "paragraph",
          text: `Institutional. We have landed the KwaZulu-Natal pathway under South Africa’s ${NSNP.name} (${NSNP.shortName}), led by the ${NSNP.department}. ${NSNP_CASE.approval} Provincial proof is the bridge to other provinces and to adjacent departments (health and other public menus) as delivery rhythm and quality evidence compound.`,
        },
        {
          type: "stats",
          items: [
            { value: "Boxer", label: "Major retail listing pathway" },
            { value: "Spar", label: "Major retail listing pathway" },
            { value: "Bargains+", label: "Value & independent trade" },
            { value: "KZN NSNP", label: "School feeding landed" },
          ],
        },
        {
          type: "bullets",
          items: [
            "KZN NSNP menu: 5kg enriched porridge daily, 5kg soya mince Mondays, 5kg one-pot Fridays — then expand the same cadence beyond KZN.",
            "Expand NSNP / school-feeding supply into additional provinces as capacity and programme schedules allow.",
            "Open Department of Health fortified-porridge pathways alongside education — stretching public nutrition budgets with shelf-stable formats.",
            "Convert retail listings into national distribution depth (DC penetration, promotional calendars, ranging reviews).",
            "Prepare export-ready packs and documentation for East and West African clients as the Howick facility comes online.",
          ],
        },
        {
          type: "callout",
          tone: "amber",
          title: `${FOODS_PIPELINE_4M.valueZar} sales pipeline · next 4 months`,
          body: `${FOODS_PIPELINE_4M.detail} This pipeline underpins near-term working-capital and packing demand — and is a primary reason to accelerate the Howick site rather than remain fully dependent on outsourced capacity.`,
        },
      ],
    },

    {
      n: "06",
      id: "institutional-volumes",
      title: "Institutional volumes & revenue — DoE, DoH, Defence & Correctional (0–5 years)",
      eyebrow: "LIST PRICES · DEPARTMENT MIX · YEAR COLUMNS",
      blocks: [
        {
          type: "lead",
          text: "Big Five Foods’ institutional engine starts in KwaZulu-Natal NSNP (DoE): 5kg enriched porridge every school day @ R90, 5kg beef soya mince on Mondays @ R150, and 5kg one-pot on Fridays @ R200 — then expands into other provinces and adjacent departments (Health, Defence, Correctional Services) as contract share grows.",
        },
        {
          type: "paragraph",
          text:
            KZN_NSNP_SCALE.sourceNote +
            " National NSNP reaches ~9.8 million learners across provinces (DBE/PMG breakdown); KZN is the beachhead. List prices below are management institutional prices for revenue modelling.",
        },
        {
          type: "stats",
          items: [
            {
              value: `R${INST_PACK_PRICE_ZAR.porridge5kg}`,
              label: "Porridge 5kg list",
              note: "DoE NSNP · DoH · other depts",
            },
            {
              value: `R${INST_PACK_PRICE_ZAR.soya5kg}`,
              label: "Soya mince 5kg list",
              note: "NSNP Mondays · institutional",
            },
            {
              value: `R${INST_PACK_PRICE_ZAR.onepot5kg}`,
              label: "One-pot 5kg list",
              note: "NSNP Fridays · institutional",
            },
            {
              value: formatZarM(NSNP_VOLUME_BASE.y5.totalRevenue),
              label: "DoE NSNP revenue · Y5 base",
              note: "Illustrative at list prices",
            },
          ],
        },
        {
          type: "table",
          table: {
            caption: "KZN NSNP menu pattern & list prices (institutional 5kg SKUs)",
            headers: ["SKU", "Cadence", "List price", "Planning portion", "Role"],
            rows: [
              {
                cells: [
                  "Enriched Porridge 5kg",
                  "Daily",
                  `R${INST_PACK_PRICE_ZAR.porridge5kg}`,
                  "40g dry / learner / day",
                  "Staple fortification every school day",
                ],
              },
              {
                cells: [
                  "Beef Soya Mince 5kg",
                  "Mondays",
                  `R${INST_PACK_PRICE_ZAR.soya5kg}`,
                  "30g dry / learner / Monday",
                  "Protein-forward weekly menu",
                ],
              },
              {
                cells: [
                  "One-Pot mix 5kg",
                  "Fridays",
                  `R${INST_PACK_PRICE_ZAR.onepot5kg}`,
                  "50g dry / learner / Friday",
                  "Complete institutional meal format",
                ],
              },
            ],
            footnote:
              "Portion grams are planning assumptions for volume maths — confirm against provincial menus and tender specifications under NDA.",
          },
        },
        {
          type: "paragraph",
          text: `Base-case DoE (NSNP) share of KZN addressable (~${formatTonnes(KZN_NSNP_ADDRESSABLE_100.totalTonnes)}/yr at 100%): Y0 ${KZN_SHARE_PCT_BASE.y0}% → Y5 ${KZN_SHARE_PCT_BASE.y5}%. Other provinces from Y2 (${NON_KZN_SHARE_PCT_BASE.y2}% → Y5 ${NON_KZN_SHARE_PCT_BASE.y5}%). DoH, Defence (~${DEFENCE_SCALE.beneficiaries.toLocaleString("en-ZA")} beneficiaries planning base) and Correctional Services (~${CORRECTIONAL_SCALE.beneficiaries.toLocaleString("en-ZA")}) ramp from Y1 with increasing contract share.`,
        },
        {
          type: "table",
          table: {
            caption:
              "Institutional revenue plan (base case) — years as columns · grouped by department",
            headers: INST_REVENUE_TABLE.headers,
            rows: INST_REVENUE_TABLE.rows.map((r) => ({
              cells: [r.label, ...r.cells],
            })),
            footnote: INST_REVENUE_TABLE.footnote,
          },
        },
        {
          type: "callout",
          tone: "emerald",
          title: "Department mix beyond education",
          body: `${DOH_PORRIDGE.detail} ${DEFENCE_SCALE.note} ${CORRECTIONAL_SCALE.note} Same 5kg list prices apply across departments unless a tender specifies otherwise.`,
        },
        {
          type: "bullets",
          items: [
            "Y0–Y1: land and deepen KZN DoE/NSNP call-offs — porridge @ R90 daily, soya @ R150 Mondays, one-pot @ R200 Fridays; open DoH porridge and first Defence / Correctional pilots.",
            "Y2–Y3: multi-province NSNP share; Howick packing absorbs tonnes; DoH / Defence / Correctional revenue becomes material beside education.",
            "Y4–Y5: diversified institutional book — DoE remains the largest line; DoH, Defence and Correctional Services compound with rising contract share.",
            `Y5 DoE NSNP illustrative list-price revenue ≈ ${formatZarM(NSNP_VOLUME_BASE.y5.totalRevenue)} in the base case (before other departments).`,
          ],
        },
        {
          type: "callout",
          tone: "slate",
          title: "Honesty on institutional volumes & revenue",
          body: INSTITUTIONAL_VOLUME_DISCLAIMER,
        },
      ],
    },

    {
      n: "07",
      id: "products-economics",
      title: "Products & unit economics",
      eyebrow: "WHAT WE SELL · WHY MARGINS WORK",
      blocks: [
        {
          type: "paragraph",
          text: "The catalogue is built around four household and catering ranges plus NSNP institutional packs: fortified porridges (original and flavoured), soya minces (beef, chilli, mutton profiles), one-pot meal mixes, and soups. Institutional 5kg NSNP-approved SKUs (enriched porridge, beef soya mince, one-pot chicken biryani mix) are the school-kitchen workhorses.",
        },
        {
          type: "table",
          table: {
            caption: "Unit-economics positioning (management / internal)",
            headers: ["Metric", "Foods position", "Why it matters"],
            rows: [
              {
                cells: [
                  "Gross profit",
                  FOODS_ECONOMICS.grossProfit.value,
                  "Healthy margin on recurring fortified volume",
                ],
              },
              {
                cells: [
                  "Cost vs wholesale/retail",
                  `~${FOODS_ECONOMICS.cheaperThanMarket.value} cheaper`,
                  "Wins government & feeding-scheme tenders on cost-in-use",
                ],
              },
              {
                cells: [
                  "Nutrition design",
                  FOODS_ECONOMICS.nutritionDesign.value + " more nutrition by design",
                  "Internal comparison — not a clinical claim",
                ],
              },
              {
                cells: [
                  "Shelf life / logistics",
                  "Shelf-stable · no cold chain",
                  "Travels into schools, ranks and export corridors",
                ],
              },
            ],
            footnote: FOODS_ECONOMICS.honesty,
          },
        },
        {
          type: "paragraph",
          text: FOODS_ECONOMICS.positioning,
        },
        {
          type: "paragraph",
          text: "Food is a repetitive business. Once menus adopt a SKU and shelves turn, reorders should sustain and grow with penetration. That is why listings and NSNP rhythm matter more than one-off promotional spikes — and why owned packing/blending capacity in Howick is the logical next capital step.",
        },
      ],
    },

    {
      n: "08",
      id: "gtm",
      title: "Go-to-market — retail, institutions & Africa",
      eyebrow: "HOW WE CONVERT PIPELINE",
      blocks: [
        {
          type: "lead",
          text: "Go-to-market runs on three parallel rails: South African retail listings, South African institutional programmes, and continental wholesale/institutional clients in East and West Africa — sequenced so proof in SA funds and de-risks export.",
        },
        {
          type: "bullets",
          items: [
            "Retail rail — Convert Boxer, Spar, Bargains and additional banners from listing to ranged velocity; support with samples, trade promotions and SupplierAdvisor® reorder where applicable.",
            "Institutional rail — Deliver KZN NSNP with programme discipline; expand provincial coverage; open adjacent government departments on cost, fortification and audit trails.",
            "Trade & wholesale rail — Distributors and caterers who feed mines, hostels, NGOs and municipal programmes — often the bridge between retail brand and bulk offtake.",
            "Africa rail — East and West African clients supplied first from Howick packing/blending; local opcos and partners follow once corridor demand is proven.",
            "Digital rail — Quotes, orders and lot pedigree on SupplierAdvisor® so governments and retailers can inspect what they buy.",
          ],
        },
        {
          type: "paragraph",
          text: "We are looking to accelerate growth into Africa without skipping the hard SA proof. Listings and KZN NSNP are the reference cases buyers in Nairobi, Accra or Lagos can diligence. The Howick facility is the capacity promise behind those conversations.",
        },
        {
          type: "table",
          table: {
            caption: "Near-term GTM priorities",
            headers: ["Horizon", "Priority", "Success signal"],
            rows: [
              {
                cells: [
                  "0–4 months",
                  `Convert ${FOODS_PIPELINE_4M.valueZar} pipeline`,
                  "Contracted offtake · DC shipments · programme POs",
                ],
              },
              {
                cells: [
                  "4–12 months",
                  "Deepen retail + multi-province NSNP",
                  "Reorder rate · provincial expansion · new dept briefs",
                ],
              },
              {
                cells: [
                  "12–18 months",
                  "Howick live · first Africa export lots",
                  "Packing throughput · blending commissioning · EA/WA POs",
                ],
              },
            ],
          },
        },
      ],
    },

    {
      n: "09",
      id: "howick",
      title: "Howick facility — packing, warehouse, then blending",
      eyebrow: "NEXT 18 MONTHS · OWNED CAPACITY",
      blocks: [
        {
          type: "lead",
          text: "The next eighteen months centre on establishing Big Five Foods’ own factory in Howick, KwaZulu-Natal — starting as a packing and warehousing site, then converting into a blending facility — on a footprint of approximately 1,000–2,000 square metres.",
        },
        {
          type: "paragraph",
          text: "Why Howick. The Midlands corridor offers industrial access, logistics reach into Durban’s port and inland DCs, and proximity to KZN institutional demand we are already serving. Owned space lets us control quality, pack formats, inventory turns and export staging — instead of remaining fully dependent on third-party packing slots as pipeline converts.",
        },
        {
          type: "table",
          table: {
            caption: "Facility roadmap",
            headers: ["Phase", "Scope", "Purpose"],
            rows: [
              {
                cells: [
                  "Phase 1",
                  "Packing + warehousing · ~1,000–2,000 m²",
                  "Absorb retail & NSNP volume; stage inventory; QC & labelling control",
                ],
              },
              {
                cells: [
                  "Phase 2",
                  "Convert / expand into blending",
                  "In-house fortification & mix control; margin capture; SKU agility",
                ],
              },
              {
                cells: [
                  "Market reach",
                  "SA domestic + East & West Africa clients",
                  "One plant as regional supply node while local opcos mature",
                ],
              },
            ],
            footnote:
              "Exact lease vs buy, fit-out budget and commissioning dates subject to site diligence, municipal approvals and capital allocation under the Group raise / Foods working capital plan.",
          },
        },
        {
          type: "bullets",
          items: [
            "Packing lines sized for retail cartons and institutional 5kg formats.",
            "Warehousing for finished goods and incoming ingredients with lot traceability.",
            "Blending capability to capture more of the fortification value chain and reduce reliance on external mixers.",
            "Export-ready staging for East and West African orders (documentation, palletisation, port haul to Durban).",
            "SHEQ and food-safety systems aligned to certifications already used in the Foods narrative (e.g. quality and ethical-trade marks as applicable).",
          ],
        },
        {
          type: "callout",
          tone: "amber",
          title: "Capacity follows demand — demand is already signalling",
          body: `With major retail listings underway, KZN NSNP landed, and a ${FOODS_PIPELINE_4M.valueZar} four-month sales pipeline, owned Howick capacity is how we protect service levels and accelerate Africa supply without waiting on third-party calendars.`,
        },
      ],
    },

    {
      n: "10",
      id: "projections",
      title: "Commercial projections",
      eyebrow: "ILLUSTRATIVE · NOT AUDITED",
      blocks: [
        {
          type: "lead",
          text: "Projections below are directional for investor discussion. They combine near-term pipeline conversion assumptions with medium-term retail, institutional and Africa-corridor scale. They are not forecasts, budgets or guarantees.",
        },
        {
          type: "paragraph",
          text: `Institutional tonnes (NSNP + DoH) in the base case rise from hundreds of tonnes at landing toward multi-thousand tonnes by Y5 — see Institutional volumes chapter. Near term (0–4 months). Foods carries a ${FOODS_PIPELINE_4M.valueZar} (${FOODS_PIPELINE_4M.valueUsd}) sales pipeline. A disciplined conversion range of 25–45% over the horizon would imply roughly R20m–R36m of near-term contracted/shipped potential — subject to working capital, pack capacity and customer credit. Upside sits in faster listing go-lives and NSNP call-off rhythm; downside sits in listing delays and tender timing.`,
        },
        {
          type: "table",
          table: {
            caption: "Illustrative Foods revenue scenarios (ZAR millions, annualised run-rate orientation)",
            headers: ["Horizon", "Conservative", "Base", "Upside"],
            rows: [
              {
                cells: [
                  "Year 1 (establishment → listings)",
                  "R25–40m",
                  "R45–70m",
                  "R80–110m",
                ],
              },
              {
                cells: [
                  "Year 2 (Howick packing live)",
                  "R60–90m",
                  "R110–160m",
                  "R180–240m",
                ],
              },
              {
                cells: [
                  "Year 3 (blending + Africa lots)",
                  "R120–180m",
                  "R220–320m",
                  "R350–450m",
                ],
              },
              {
                cells: [
                  "Year 5 (multi-corridor)",
                  "R250–350m",
                  "R450–700m",
                  "R800m+",
                ],
              },
            ],
            footnote:
              "Illustrative only. Aligns directionally with Group Foods moderate scenario (~USD 85m Y5 run-rate potential at Group model FX) under successful institutional + retail + Africa penetration — Group model remains the consolidated USD view. Request NDA pack for SKU-level build-up.",
          },
        },
        {
          type: "paragraph",
          text: `Margin frame. At ~${FOODS_ECONOMICS.grossProfit.value} GP (management-reported), every rand of converted institutional and retail volume carries attractive contribution after fortification and packing — provided working capital funds inventory ahead of debtor cycles. Howick blending is intended to protect and potentially expand that margin by internalising mix steps currently outsourced.`,
        },
        {
          type: "table",
          table: {
            caption: "Pipeline & capacity bridge (next 18 months)",
            headers: ["Driver", "Assumption (illustrative)", "Sensitivity"],
            rows: [
              {
                cells: [
                  "4-month pipeline",
                  `${FOODS_PIPELINE_4M.valueZar} opportunity`,
                  "Conversion % and timing dominate cash",
                ],
              },
              {
                cells: [
                  "Retail listings",
                  "Boxer · Spar · Bargains+ nationalise",
                  "Ranging depth & promo support",
                ],
              },
              {
                cells: [
                  "NSNP / government",
                  "KZN → multi-province + other depts",
                  "Programme schedules & budgets",
                ],
              },
              {
                cells: [
                  "Howick Phase 1",
                  "1–2k m² packing/warehouse online",
                  "Fit-out delay caps upside",
                ],
              },
              {
                cells: [
                  "Africa",
                  "First EA/WA wholesale clients",
                  "FX, duties, partner quality",
                ],
              },
            ],
          },
        },
        {
          type: "callout",
          tone: "slate",
          title: "Honesty on numbers",
          body: "Pipeline is not revenue. Listings are not velocity until sell-through proves out. NSNP plan scale (including Group-level 2.5m children/day ambition language) is a delivery plan, not current daily headcount. Investors should diligence conversion cohorts under NDA.",
        },
      ],
    },

    {
      n: "11",
      id: "africa-expansion",
      title: "Accelerating growth into Africa",
      eyebrow: "EAST & WEST AFRICA FROM A HOWICK NODE",
      blocks: [
        {
          type: "paragraph",
          text: "South Africa is the proof market. Africa is the scale market. With SOFI showing Africa as the hunger epicentre and healthy diets remaining unaffordable for billions globally, fortified staples that win on cost-in-use have a continental TAM — but only if manufacturing, documentation and partners are real.",
        },
        {
          type: "bullets",
          items: [
            "Export-from-Howick first — use the packing/blending site as a regional supply node for East and West African clients while local opcos and toll partners mature.",
            "Institutional copycats — school feeding and public menus exist across the continent; KZN NSNP is a reference narrative for ministries and implementing partners.",
            "Retail & wholesale partners — mirror the SA listing playbook with regional chains and distributors who already move staples.",
            "Group rails — Access and Impact for programme pathways; Connect for verified trade; Direct-style last-mile where mobility hubs exist.",
            "Capital discipline — accelerate where POs and letters of intent exist; do not build country P&Ls ahead of offtake.",
          ],
        },
        {
          type: "paragraph",
          text: "We are explicitly looking to accelerate growth into Africa on the back of current SA traction and the R80m four-month pipeline. Acceleration means faster partner onboarding, export SKUs, and facility readiness — not abandoning the SA listing and NSNP delivery work that makes the Africa story credible.",
        },
      ],
    },

    {
      n: "12",
      id: "impact-sdg",
      title: "Impact thesis — food security & SDGs",
      eyebrow: "COMMERCIAL SUCCESS = MEALS ON PLATES",
      blocks: [
        {
          type: "lead",
          text: "Every carton that ships is a nutrition intervention with a margin. Big Five Foods is built so investor return and food-security outcomes are the same operating system — not a CSR appendix.",
        },
        {
          type: "table",
          table: {
            caption: "SDG alignment (primary)",
            headers: ["SDG", "Challenge", "Foods response"],
            rows: [
              {
                cells: [
                  "2 · Zero Hunger",
                  "309M hungry in Africa (SOFI)",
                  "Fortified staples for homes, schools, institutions",
                ],
              },
              {
                cells: [
                  "1 · No Poverty",
                  "Healthy diets unaffordable (2.7B)",
                  "~50% cost edge vs wholesale/retail pathways (internal)",
                ],
              },
              {
                cells: [
                  "4 · Quality Education",
                  "Hungry children cannot learn",
                  "KZN NSNP pathway · multi-province ambition",
                ],
              },
              {
                cells: [
                  "8 · Decent Work",
                  "Fragile food-system jobs",
                  "Howick packing/blending employment · farmer offtake via Agri",
                ],
              },
              {
                cells: [
                  "17 · Partnerships",
                  "No actor ends hunger alone",
                  "Retailers, DBE/NSNP, Group pillars, African distributors",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "Impact metrics we expect to report as delivery matures: meals/portions enabled through institutional programmes; retail households reached via sell-through estimates; provincial and departmental programme coverage; Howick jobs created; and export volumes into East and West Africa. Programme-reported delivery totals remain the honest language until daily headcount is operationally proven.",
        },
      ],
    },

    {
      n: "13",
      id: "risks",
      title: "Risks, mitigations & capital needs",
      eyebrow: "WHAT CAN GO WRONG · HOW WE RESPOND",
      blocks: [
        {
          type: "table",
          table: {
            caption: "Key risks",
            headers: ["Risk", "Impact", "Mitigation"],
            rows: [
              {
                cells: [
                  "Pipeline conversion lag",
                  "Cash & Howick timing stress",
                  "Phased fit-out; working-capital discipline; listing cohort tracking",
                ],
              },
              {
                cells: [
                  "Listing without velocity",
                  "Returns / slotting waste",
                  "Sell-through reviews; focused SKU ranging; trade support",
                ],
              },
              {
                cells: [
                  "Programme / tender timing",
                  "Lumpy institutional revenue",
                  "Multi-province + retail mix; other department pipeline",
                ],
              },
              {
                cells: [
                  "Facility delay (Howick)",
                  "Capacity bottleneck",
                  "Bridge with third-party packing; stage Phase 1 narrowly",
                ],
              },
              {
                cells: [
                  "Food safety / recall",
                  "Brand & programme risk",
                  "SHEQ systems; lot traceability; certified manufacturing partners",
                ],
              },
              {
                cells: [
                  "FX & Africa receivables",
                  "Margin & cash leakage",
                  "LC / advance structures; phased corridor entry",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "Capital priorities for Foods within the Group raise and operating cash: (1) working capital to convert the R80m four-month pipeline; (2) Howick Phase 1 packing and warehouse fit-out (1,000–2,000 m²); (3) blending conversion; (4) export working capital for East and West African clients. Group use-of-funds orientation remains 10% operations / 90% assets & product development at holdco level — Foods is a primary deployment vehicle for manufacturing assets and SKU development.",
        },
        {
          type: "callout",
          tone: "slate",
          title: "Kill criteria (orientation)",
          body: "If pipeline conversion, listing sell-through and NSNP delivery rhythm stall after working-capital deployment, pause aggressive multi-corridor volume expansion and Howick Phase 2 until SA proof re-accelerates.",
        },
      ],
    },

    {
      n: "14",
      id: "milestones",
      title: "18-month milestone roadmap",
      eyebrow: "OPERATING CADENCE",
      blocks: [
        {
          type: "table",
          table: {
            caption: "Milestones (orientation — not a commitment schedule)",
            headers: ["Window", "Theme", "Milestones"],
            rows: [
              {
                cells: [
                  "0–4 months",
                  "Convert",
                  `Advance ${FOODS_PIPELINE_4M.valueZar} pipeline; deepen Boxer/Spar/Bargains listings; stabilise KZN NSNP call-offs`,
                ],
              },
              {
                cells: [
                  "4–9 months",
                  "Secure site",
                  "Lock Howick lease/purchase; design packing/warehouse layout; begin fit-out; provincial NSNP expansion briefs",
                ],
              },
              {
                cells: [
                  "9–14 months",
                  "Packing live",
                  "Commission Phase 1; shift volume in-house; first export staging for EA/WA clients",
                ],
              },
              {
                cells: [
                  "14–18 months",
                  "Blend & accelerate",
                  "Blending conversion underway; multi-dept government pipeline; Africa partner POs repeating",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "Board and investor reporting should track: pipeline coverage and conversion %, listing count and sell-through, NSNP portions shipped, Howick capex vs schedule, GP%, and Africa export tonnes. That dashboard turns this business plan from narrative into operating discipline.",
        },
      ],
    },

    {
      n: "15",
      id: "team-governance",
      title: "Team, governance & Group support",
      eyebrow: "HOW DECISIONS GET MADE",
      blocks: [
        {
          type: "paragraph",
          text: "Big Five Foods operates as a commercial opco with accountability for brand, SKUs, sales, margin and facility delivery. It draws on Group leadership, Impact PMO for institutional programmes, Connect for trade systems, and Access for public-sector and development pathways. Equity investment is sought at Big Five Group holding-company level so investors participate in the consolidated platform while diligencing Foods as a core value-creation engine.",
        },
        {
          type: "bullets",
          items: [
            "Opco P&L discipline — listings, programmes and Howick treated as a single capacity plan.",
            "Holdco capital allocation — manufacturing assets and product development prioritised under the 90% assets & product orientation.",
            "Board visibility — Foods KPIs reported into Group governance; board seat accompanies the Group equity ask.",
            "Ethics & safety — food-safety and ethical-trade standards non-negotiable for school and public menus.",
          ],
        },
      ],
    },

    {
      n: "16",
      id: "closing",
      title: "The ask behind the Foods plan",
      eyebrow: "WHY INVEST · WHY NOW",
      blocks: [
        {
          type: "lead",
          text: "We have done the hard first eighteen months — brand, products, samples. The market has answered. Retail listings with Boxer, Spar, Bargains and others are underway; KZN NSNP is landed; a R80 million four-month sales pipeline is in front of us; and Africa is ready to be accelerated from a Howick supply node.",
        },
        {
          type: "paragraph",
          text: "The next eighteen months are about capacity and conversion: pack and warehouse in Howick (1,000–2,000 m²), then blend; turn pipeline into recurring revenue; expand provinces and departments; supply East and West African clients. That is how Big Five Foods helps fix hunger and malnutrition on African plates — commercially, repeatedly, and at margin.",
        },
        {
          type: "paragraph",
          text: "Investors evaluating the Group raise should read this plan as the operating proof that Feed is not aspirational. It is listing, shipping, feeding schoolchildren, and building a factory in Howick so the continent can be supplied from African ground.",
        },
        {
          type: "callout",
          tone: "amber",
          title: "Next step",
          body: "Request the NDA data room for SKU-level margins, pipeline cohort detail, Howick site pack and facility budget, and consolidated Group model sensitivities. This business plan orients — diligence decides.",
        },
      ],
    },
  ],

  closing: {
    title: "Big Five Foods — fortified staples, owned capacity, continental ambition",
    body: "From samples to listings to KZN NSNP to Howick — then East and West Africa. Built for food security. Run for recurring revenue.",
    cta: "Discuss Foods diligence under NDA",
  },
};
