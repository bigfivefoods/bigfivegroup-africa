/**
 * Big Five Connect — Operating Company Business Plan
 * Product: SupplierAdvisor® (www.supplieradvisor.com)
 * Investor-portal long-form document (~10–15 pages when printed).
 *
 * Figures are management-reported / illustrative unless restated under NDA.
 * Loaded entity counts are platform data; billing conversion is not booked revenue.
 */

import { NSNP } from "../nsnp";
import { SCHOOL_MEAL_SAFETY_SOURCE } from "../schoolAdvisorCase";
import { SOFI } from "../sofi";
import type { BusinessPlan } from "./types";

const FX = 16.5; // approx mid-market ZAR/USD for headline conversion

/** Published SaaS list pricing (SupplierAdvisor® · ZAR). */
export const SA_PRICING = {
  coreMonthlyZar: 299,
  schoolAdvisorMonthlyZar: 199,
  industryPackMonthlyZar: 199,
  trialDays: 30,
  prepaidSavingPct: 30,
  coreLabel: "R299/mo",
  schoolAdvisorLabel: "R199/mo",
  perEntityBothLabel: "R498/mo",
  siteUrl: "https://www.supplieradvisor.com/",
  detail:
    "Core OS from R299/mo after a 30-day free trial (up to ~30% prepaid). Industry / government packs such as SchoolAdvisor® add R199/mo. SA Member (B2C) is free for end users — the operating company pays the platform.",
} as const;

/** KZN NSNP B2G network already loaded on SupplierAdvisor® (management / platform). */
export const CONNECT_KZN_LOADED = {
  schools: 5_386,
  serviceProviders: 1_850,
  totalEntities: 5_386 + 1_850,
  programme: "KZN NSNP",
  landingHorizon: "up to ~6 months to land commercially",
  detail:
    "5,386 schools and 1,850 service providers are already loaded on SupplierAdvisor® for the KwaZulu-Natal National School Nutrition Programme network. Commercial landing (paid subscriptions) may take ~6 months; rollout continues across 12–18 months in KZN, then other provinces and departments.",
} as const;

/** Per-entity ARPU when Core + SchoolAdvisor are both subscribed. */
const PER_ENTITY_BOTH = SA_PRICING.coreMonthlyZar + SA_PRICING.schoolAdvisorMonthlyZar; // 498

function zarM(n: number): string {
  if (n >= 1_000_000) return `R${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `R${Math.round(n / 1_000)}k`;
  return `R${Math.round(n)}`;
}

function usdFromZar(zar: number): string {
  const usd = zar / FX;
  if (usd >= 1_000_000) return `~$${(usd / 1_000_000).toFixed(1)}m`;
  if (usd >= 1_000) return `~$${Math.round(usd / 1_000)}k`;
  return `~$${Math.round(usd)}`;
}

/** Full KZN conversion economics if every loaded entity pays Core + SchoolAdvisor. */
export const CONNECT_KZN_FULL_POTENTIAL = {
  mrrZar: CONNECT_KZN_LOADED.totalEntities * PER_ENTITY_BOTH,
  arrZar: CONNECT_KZN_LOADED.totalEntities * PER_ENTITY_BOTH * 12,
  perEntityMonthlyZar: PER_ENTITY_BOTH,
} as const;

/** GymAdvisor early traction (management-reported). */
export const CONNECT_GYM_TRACTION = {
  gymsSigned: 1,
  membersAccess: "250+",
  detail:
    "GymAdvisor® (B2C via SA Member) is live: one gym signed with 250+ members who receive access and views into the system. Members do not pay SupplierAdvisor® — the gym (operating company) pays the platform subscription.",
} as const;

export const connectBusinessPlan: BusinessPlan = {
  meta: {
    slug: "connect",
    opcoSlug: "connect",
    companyName: "Big Five Connect",
    fullTitle: "Big Five Connect Business Plan",
    subtitle:
      "SupplierAdvisor® — the supply-chain and institutional operating system for B2B, B2G and B2C — from product build to KZN NSNP subscriptions, industry Advisors and continental scale",
    version: "1.0",
    asOf: "August 2026",
    classification: "PRIVATE · INVESTOR DILIGENCE · CONFIDENTIAL",
    pageTarget: "10–15 pages",
    disclaimer:
      "This operating-company business plan is illustrative and management-reported where noted. It is not audited financials, not a prospectus, and not a guarantee of results. Loaded schools and service providers are platform data — not paid seats until subscriptions convert. Commercial projections are directional for authorised investor discussion under NDA. Product features summarised from www.supplieradvisor.com.",
  },

  coverStats: [
    {
      value: "5,386",
      label: "KZN schools loaded (NSNP)",
      note: "Platform-loaded · billing conversion ahead",
    },
    {
      value: "1,850",
      label: "Service providers loaded",
      note: "KZN NSNP network on SupplierAdvisor®",
    },
    {
      value: "R299 + R199",
      label: "Core / SchoolAdvisor monthly",
      note: "Per entity · 30-day trial · ZAR SaaS",
    },
    {
      value: zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar),
      label: "KZN full-conversion ARR potential",
      note: `${usdFromZar(CONNECT_KZN_FULL_POTENTIAL.arrZar)} · if all loaded entities pay Core+SchoolAdvisor`,
    },
  ],

  executiveHighlights: [
    "First ~6 months: build and harden SupplierAdvisor® at www.supplieradvisor.com — the full supply-chain OS spanning B2B, B2G and B2C on one verified fabric.",
    `B2G beachhead loaded: ${CONNECT_KZN_LOADED.schools.toLocaleString("en-ZA")} schools and ${CONNECT_KZN_LOADED.serviceProviders.toLocaleString("en-ZA")} service providers for the KZN ${NSNP.shortName} programme — commercial landing may take ~6 months; each entity is designed to pay ${SA_PRICING.coreLabel} (Core) + ${SA_PRICING.schoolAdvisorLabel} (SchoolAdvisor®).`,
    "Rollout plan: convert and deepen KZN over the next 12–18 months, then expand to other provinces and other government departments on the same OS.",
    `GymAdvisor® live (B2C): ${CONNECT_GYM_TRACTION.gymsSigned} gym signed with ${CONNECT_GYM_TRACTION.membersAccess} members accessing the system via free SA Member; industry Advisors (Crop, Quarry, Hire, clinical, Container, Retail, School, Health) extend the TAM.`,
    "Big Five Foods and Group pathways already run on SupplierAdvisor® — Connect is both a commercial SaaS business and the Group’s verification / trade nervous system.",
    `Unit economics are simple and ZAR-native: from ${SA_PRICING.coreLabel} after trial; high gross-margin SaaS with network effects; KZN full-conversion ARR potential ~${zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar)} before other provinces, B2B open market or Africa.`,
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
          text: "Big Five Connect commercialises SupplierAdvisor® — the supply-chain operating system that replaces spreadsheet silos, accounting-only tools and multi-year ERP programmes with one verified workspace for trade, quality, finance, people and industry-specific Advisors across B2B, B2G and B2C.",
        },
        {
          type: "paragraph",
          text: "Africa’s food-security and public-procurement challenges are not only about calories and budgets — they are about proof. When school kitchens, caterers and departments cannot share one source of truth for approved products, menus, kitchen safety and supplier performance, value and trust leak before the meal reaches the child. SupplierAdvisor® was built so private trade, public programmes and consumer trust share the same verification, traceability and operating discipline.",
        },
        {
          type: "paragraph",
          text: `The first approximately six months focused on developing the product at ${SA_PRICING.siteUrl}: Core OS (network, SRM/CRM, inventory, manufacturing, distribution, finance, SHEQ, people, intelligence/SAM), sector modules, and industry Advisors. That build is live. The commercial wedge is B2G school nutrition in KwaZulu-Natal: ${CONNECT_KZN_LOADED.schools.toLocaleString("en-ZA")} schools and ${CONNECT_KZN_LOADED.serviceProviders.toLocaleString("en-ZA")} service providers are already loaded. Landing paid subscriptions may take about six months; the plan is to roll conversion through KZN over 12–18 months, then replicate into other provinces and departments.`,
        },
        {
          type: "callout",
          tone: "amber",
          title: "Subscription design (per entity)",
          body: `Core modules ${SA_PRICING.coreLabel} + SchoolAdvisor® ${SA_PRICING.schoolAdvisorLabel} = ${SA_PRICING.perEntityBothLabel} per entity when both are active. If every loaded KZN school and service provider converted at that ARPU, illustrative ARR would be ~${zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar)} (${usdFromZar(CONNECT_KZN_FULL_POTENTIAL.arrZar)}) — a ceiling for diligence, not a forecast.`,
        },
        {
          type: "paragraph",
          text: `In parallel, GymAdvisor® opens the B2C lane: one gym is live with ${CONNECT_GYM_TRACTION.membersAccess} members on free SA Member access. Big Five Foods already uses the platform for verified trade. Other industry modules (CropAdvisor®, QuarryAdvisor®, HireAdvisor®, clinical Advisors, ContainerAdvisor®, RetailAdvisor®, HealthAdvisor®) expand the same OS into private-sector verticals. This plan sets out the product, the KZN economics, the 12–18 month rollout, illustrative SA / Africa / global projections, risks and the impact case.`,
        },
        {
          type: "stats",
          items: [
            {
              value: CONNECT_KZN_LOADED.schools.toLocaleString("en-ZA"),
              label: "Schools loaded · KZN NSNP",
            },
            {
              value: CONNECT_KZN_LOADED.serviceProviders.toLocaleString("en-ZA"),
              label: "Service providers loaded",
            },
            { value: SA_PRICING.coreLabel, label: "Core OS subscription" },
            { value: SA_PRICING.schoolAdvisorLabel, label: "SchoolAdvisor® add-on" },
          ],
        },
      ],
    },

    {
      n: "02",
      id: "problem",
      title: "The problem — opaque trade & ungovernable programmes",
      eyebrow: "WHY AN OS BEATS SPREADSHEETS",
      blocks: [
        {
          type: "lead",
          text: "African supply chains and public feeding programmes fail in the middle: email POs, WhatsApp ops, PDF SHEQ packs and disconnected ledgers. Nobody owns a single source of truth — and auditors, ministries and buyers cannot see what happened.",
        },
        {
          type: "paragraph",
          text: `On the nutrition side, ${SOFI.edition} still places Africa at the epicentre of hunger (~${SOFI.africa.hungryLabel} people in ${SOFI.dataYearHunger}). School feeding is one of the few daily instruments that reaches children — but News24 reporting (August 2026) highlighted that only about ${SCHOOL_MEAL_SAFETY_SOURCE.compliantShareSixProvinces} of schools in six provinces operating feeding schemes meet legal food-handling requirements, while roughly ${SCHOOL_MEAL_SAFETY_SOURCE.nsnpPupilsDaily} pupils are fed daily under NSNP. Policy without a live compliance OS is theatre.`,
        },
        {
          type: "bullets",
          items: [
            "B2B: manufacturers and distributors reconcile Excel, Xero-class books and standalone WMS — no shared OTIFEF, lot holds or verified counterparty graph.",
            "B2G: departments publish circulars; schools and service providers improvise; kitchen certificates expire off-system; approved menus never become operating rules.",
            "B2C: gyms and clinics still run clipboards and fragmented apps; members cannot carry one wallet across businesses with proof of payment and consent-based records.",
            "ERP gravity: major suites take 12–24 months and seven-figure licences — unreachable for most African SMEs and many public programme implementers.",
            "Group need: Big Five Foods, Direct and Impact require audit-ready rails so institutional offtake and last-mile claims are inspectable.",
          ],
        },
        {
          type: "quote",
          text: "Not Excel. Not accounting-only. Not a multi-year ERP project — the supply-chain OS.",
          attribution: "SupplierAdvisor® positioning · www.supplieradvisor.com",
        },
        {
          type: "callout",
          tone: "emerald",
          title: "How Connect fixes this",
          body: "Ship one membership-scoped workspace where network, buy/sell, inventory, quality holds, finance, SHEQ and industry Advisors share books — then sell Core + packs to every school, service provider, manufacturer and gym that needs proof. Public programmes and private trade grow the same graph.",
        },
      ],
    },

    {
      n: "03",
      id: "product",
      title: "Product — SupplierAdvisor® OS overview",
      eyebrow: "WWW.SUPPLIERADVISOR.COM",
      blocks: [
        {
          type: "paragraph",
          text: "SupplierAdvisor® is positioned as the world’s most trusted supplier advice — and OS. It unites three markets on one fabric: B2B (manufacturers, distributors, brands), B2G (public entities and programme suppliers) and B2C (free SA Member personal wallet linked to any business on the platform).",
        },
        {
          type: "table",
          table: {
            caption: "Product layers (as packaged on supplieradvisor.com)",
            headers: ["Layer", "What it includes", "Commercial cue"],
            rows: [
              {
                cells: [
                  "Core OS",
                  "Company profile, verified network, SRM, CRM, inventory/lots, manufacturing, distribution, finance (GL, bank feeds on selected banks, budgets, multi-entity), SHEQ, quality/HACCP, people, projects, ESG, intelligence + SAM (Grok)",
                  `${SA_PRICING.coreLabel} after ${SA_PRICING.trialDays}-day trial`,
                ],
              },
              {
                cells: [
                  "Sector modules",
                  "Make, ship, containers / last-mile — shape how goods move",
                  "Included / workspace shaping",
                ],
              },
              {
                cells: [
                  "Industry Advisors",
                  "CropAdvisor®, QuarryAdvisor®, GymAdvisor®, HireAdvisor®, Physio/Dental/Psychiatry/Medical/Vet Advisors, RetailAdvisor®, ContainerAdvisor®",
                  `Typically +${SA_PRICING.schoolAdvisorLabel} industry pack`,
                ],
              },
              {
                cells: [
                  "Government packs",
                  "SchoolAdvisor® (NSNP / DBE school kitchens) · HealthAdvisor® (DoH pathways)",
                  `SchoolAdvisor® ${SA_PRICING.schoolAdvisorLabel}`,
                ],
              },
              {
                cells: [
                  "SA Member (B2C)",
                  "Free PWA: shop, book, gym QR check-in, family, waitlist, .ics, pay & proof, consent-to-share care notes",
                  "R0 to members · company pays SA",
                ],
              },
            ],
            footnote:
              "Feature set summarised from the public SupplierAdvisor® marketing site. Confirm module packaging and list prices in live billing under NDA.",
          },
        },
        {
          type: "bullets",
          items: [
            "Trust controls: verification, peer ratings, OTIFEF, RIAD risk — counterparties scored where you buy and sell.",
            "Quality that stops the ship: QA holds and HACCP gates block inventory and outbound when lots fail.",
            "Referral economics: onboard partners and earn back up to ~10% of their subscription (L1 6% · L2 3% · L3 1%).",
            "Africa-ready: Paystack ZAR billing, local verification patterns, responsive phone/tablet/desktop command centre.",
            "Optional on-chain product passports and PO escrow when authenticity or settlement must prove harder.",
          ],
        },
        {
          type: "paragraph",
          text: "Compared with Excel (fragile), Xero-class accounting (books without the full supply-chain graph) and major ERP (power at multi-year cost), SupplierAdvisor® sells time-to-value in days and transparent ZAR SaaS — the right wedge for African operators and public programmes.",
        },
      ],
    },

    {
      n: "04",
      id: "first-6-months",
      title: "First 6 months — build the product",
      eyebrow: "FOUNDATION PHASE · PRODUCT",
      blocks: [
        {
          type: "lead",
          text: "The deliberate first approximately six months were spent developing SupplierAdvisor® into a production-grade OS — not a brochure MVP — so B2G entities and private companies could be loaded onto rails that already work.",
        },
        {
          type: "bullets",
          items: [
            "Ship Core OS modules end-to-end: network, commercial (SRM/CRM), ops (inventory → make → ship), finance, SHEQ/quality, people and intelligence.",
            "Stand up industry Advisors so vertical buyers (agri, quarry, gym, clinical, hire, retail, containers) see themselves in the product.",
            "Build SchoolAdvisor® and HealthAdvisor® pathways for government programme administration.",
            "Launch SA Member B2C so gyms and clinics can give members free access without fracturing identity.",
            "Onboard Group use-cases — notably Big Five Foods — so the OS proves itself on real fortified-food trade and institutional quotes.",
            "Load the KZN NSNP graph: schools and service providers ready for commercial activation.",
          ],
        },
        {
          type: "callout",
          tone: "emerald",
          title: "Outcome of the build window",
          body: "The product is live at www.supplieradvisor.com with public positioning, interactive demo, 30-day trial and ZAR billing from R299/mo. Connect now shifts from “can we build it?” to “can we convert loaded entities and replicate provinces?” — a commercial problem investors can diligence.",
        },
      ],
    },

    {
      n: "05",
      id: "b2g-kzn",
      title: "B2G beachhead — KZN NSNP network",
      eyebrow: "5,386 SCHOOLS · 1,850 SERVICE PROVIDERS",
      blocks: [
        {
          type: "lead",
          text: "The flagship institutional deployment is the KwaZulu-Natal National School Nutrition Programme network on SupplierAdvisor® — schools and service providers already loaded, with SchoolAdvisor® as the compliance and kitchen-operations pack beside Core.",
        },
        {
          type: "paragraph",
          text: `${NSNP.summary} Big Five Connect’s role is the digital fabric: the department, caterers/suppliers and schools share approved products, menus, kitchen readiness and trade trails instead of circulars and inboxes. Loaded counts for this plan are precise platform figures: ${CONNECT_KZN_LOADED.schools.toLocaleString("en-ZA")} schools and ${CONNECT_KZN_LOADED.serviceProviders.toLocaleString("en-ZA")} service providers.`,
        },
        {
          type: "stats",
          items: [
            {
              value: CONNECT_KZN_LOADED.schools.toLocaleString("en-ZA"),
              label: "Schools loaded",
            },
            {
              value: CONNECT_KZN_LOADED.serviceProviders.toLocaleString("en-ZA"),
              label: "Service providers loaded",
            },
            {
              value: CONNECT_KZN_LOADED.totalEntities.toLocaleString("en-ZA"),
              label: "Total loaded entities",
            },
            {
              value: "~6 mo",
              label: "Expected commercial landing window",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Commercial reality: loading is not billing. It may take about six months to land paid subscriptions across the cohort as procurement, onboarding, training and budget cycles close. That is expected for B2G. The economic design is clear once live: each entity pays Core plus SchoolAdvisor.",
        },
        {
          type: "table",
          table: {
            caption: "Illustrative KZN subscription math (management design)",
            headers: ["Item", "Assumption", "Result"],
            rows: [
              {
                cells: [
                  "Core OS",
                  SA_PRICING.coreLabel,
                  "Base workspace for every school & SP",
                ],
              },
              {
                cells: [
                  "SchoolAdvisor®",
                  SA_PRICING.schoolAdvisorLabel,
                  "Kitchen / NSNP programme pack",
                ],
              },
              {
                cells: [
                  "ARPU (both)",
                  SA_PRICING.perEntityBothLabel,
                  "Per paying entity per month",
                ],
              },
              {
                cells: [
                  "Loaded base",
                  CONNECT_KZN_LOADED.totalEntities.toLocaleString("en-ZA") + " entities",
                  "Schools + service providers",
                ],
              },
              {
                cells: [
                  "Full-conversion MRR",
                  zarM(CONNECT_KZN_FULL_POTENTIAL.mrrZar),
                  "Ceiling if 100% pay both packs",
                ],
              },
              {
                cells: [
                  "Full-conversion ARR",
                  zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar),
                  `${usdFromZar(CONNECT_KZN_FULL_POTENTIAL.arrZar)} illustrative`,
                ],
              },
            ],
            footnote:
              "Illustrative only. Actual attach rates (Core only vs Core+SchoolAdvisor), departmental bulk licensing, discounts and prepaid terms will change realised ARPU. Not booked revenue.",
          },
        },
        {
          type: "callout",
          tone: "amber",
          title: "12–18 month rollout intent",
          body: "Convert and operationalise KZN first; then extend the same playbook to other provinces and other government departments (education → health and adjacent public menus) so Connect compounds programme-by-programme rather than one-off pilots.",
        },
      ],
    },

    {
      n: "06",
      id: "gymadvisor-b2c",
      title: "GymAdvisor® & B2C — SA Member traction",
      eyebrow: "INDUSTRY PACK · CONSUMER WALLET",
      blocks: [
        {
          type: "paragraph",
          text: CONNECT_GYM_TRACTION.detail,
        },
        {
          type: "paragraph",
          text: "GymAdvisor® gives the gym coaches, rooms, packs, waitlist, phone check-in QR and a member PWA — while SA Member gives each person one free personal wallet they can link to any business on the platform (shop, book, check in, family, waitlist, pay & proof). SupplierAdvisor® bills the operating company; members never pay the platform. That keeps consumer adoption friction near zero and puts monetisation on the desk that captures value.",
        },
        {
          type: "bullets",
          items: [
            "Proof that B2C Advisors can recruit real members quickly (250+ on the first gym).",
            "Template for clinical Advisors (physio, dental, psychiatry, medical, vet) using the same member wallet.",
            "Cross-sell path: gyms that buy Core + GymAdvisor become nodes that discover Group Foods / retail offers later.",
            "Marketplace listing option so Advisors appear in the public directory by city.",
          ],
        },
        {
          type: "callout",
          tone: "slate",
          title: "Honesty",
          body: "One gym is early traction, not a category win. The investor story is product-market fit signal + repeatable Advisor packaging — scale comes from signing many operating companies, each bringing their own member base at R0 platform cost.",
        },
      ],
    },

    {
      n: "07",
      id: "industry-modules",
      title: "Industry modules & Group usage",
      eyebrow: "ONE OS · MANY VERTICALS",
      blocks: [
        {
          type: "paragraph",
          text: "Beyond SchoolAdvisor® and GymAdvisor®, SupplierAdvisor® ships industry-specific modules so the same Core books serve specialised operators without a second ERP:",
        },
        {
          type: "bullets",
          items: [
            "CropAdvisor® — fields, harvest, inputs, fleet, regenerative offtake (Agri adjacency).",
            "QuarryAdvisor® — sites, reserves, weighbridge, permits for extractives.",
            "HireAdvisor® — rental marketplace on SA Member (members free; listing business fee model on the site).",
            "Clinical Advisors — Physio, Dental, Psychiatry, Medical, Vet with diaries, treatment plans, POPIA-minded patient PWAs.",
            "RetailAdvisor® — B2C till / catalogue with QR·NFC pay on SA Member.",
            "ContainerAdvisor® — last-mile container outlets, contractors, GPS, jobs/meals impact (Direct adjacency).",
            "HealthAdvisor® — Department of Health facility pathways for B2G beyond education.",
          ],
        },
        {
          type: "paragraph",
          text: "Big Five Foods is already using SupplierAdvisor® for verified company presence, quotes/orders and institutional pathways — Connect therefore earns SaaS revenue while hardening the Group’s own trade graph. Foundation and other Group entities can follow the same verified-company pattern. That captive usage reduces cold-start risk and produces reference workflows for open-market sales.",
        },
      ],
    },

    {
      n: "08",
      id: "gtm",
      title: "Go-to-market — convert, expand, replicate",
      eyebrow: "KZN → PROVINCES → DEPARTMENTS → AFRICA",
      blocks: [
        {
          type: "lead",
          text: "GTM is sequenced: finish product-market proof on the loaded KZN cohort, expand geographically inside education, clone into other departments, then sell B2B/B2C Advisors and export the OS into African corridors.",
        },
        {
          type: "table",
          table: {
            caption: "GTM sequence (orientation)",
            headers: ["Horizon", "Focus", "Success signal"],
            rows: [
              {
                cells: [
                  "0–6 months",
                  "Land KZN paid subscriptions",
                  "% of 7,236 entities billing · SchoolAdvisor attach rate",
                ],
              },
              {
                cells: [
                  "6–12 months",
                  "Deepen KZN ops & training",
                  "Active weekly users · kitchen compliance packs filed · churn < target",
                ],
              },
              {
                cells: [
                  "12–18 months",
                  "Other provinces + departments",
                  "Second/third PED live · HealthAdvisor® pilot briefs",
                ],
              },
              {
                cells: [
                  "Parallel always",
                  "B2B open market + Advisors",
                  "Foods network density · GymAdvisor gym count · trial→paid",
                ],
              },
              {
                cells: [
                  "18+ months",
                  "Africa & beyond",
                  "Country partners · multi-currency · ministry LOIs",
                ],
              },
            ],
          },
        },
        {
          type: "bullets",
          items: [
            "Land-and-expand inside each entity: Core first, then SchoolAdvisor / industry packs, then deeper finance and SHEQ modules.",
            "Referral engine: incentivise service providers and companies to onboard their chain (up to ~10% subscription share-back).",
            "Sales contractors: personal product commission programmes alongside supply-chain referral.",
            "Proof assets: KZN case studies, SchoolAdvisor kitchen-safety narrative, Foods storefront — used in every provincial and African pitch.",
          ],
        },
      ],
    },

    {
      n: "09",
      id: "projections",
      title: "Commercial projections",
      eyebrow: "ILLUSTRATIVE · NOT AUDITED",
      blocks: [
        {
          type: "lead",
          text: "Projections combine (a) conversion of the loaded KZN base, (b) provincial and departmental replication, (c) B2B/Advisor open-market growth, and (d) Africa expansion. They are directional ceilings and scenarios — not budgets or guarantees.",
        },
        {
          type: "paragraph",
          text: `KZN math reminder: ${CONNECT_KZN_LOADED.totalEntities.toLocaleString("en-ZA")} entities × ${SA_PRICING.perEntityBothLabel} = ${zarM(CONNECT_KZN_FULL_POTENTIAL.mrrZar)} MRR ≈ ${zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar)} ARR at 100% Core+SchoolAdvisor attach. Realistic conversion will trail that ceiling.`,
        },
        {
          type: "table",
          table: {
            caption: "Illustrative KZN conversion scenarios (ARR from loaded cohort only)",
            headers: ["Scenario", "Paying entities", "Implied ARR", "Notes"],
            rows: [
              {
                cells: [
                  "Conservative · ~15%",
                  "~1,085",
                  zarM(Math.round(CONNECT_KZN_FULL_POTENTIAL.arrZar * 0.15)),
                  "Slow B2G landing · Core-heavy mix",
                ],
              },
              {
                cells: [
                  "Base · ~35%",
                  "~2,533",
                  zarM(Math.round(CONNECT_KZN_FULL_POTENTIAL.arrZar * 0.35)),
                  "12–18 month KZN rollout on track",
                ],
              },
              {
                cells: [
                  "Upside · ~60%",
                  "~4,342",
                  zarM(Math.round(CONNECT_KZN_FULL_POTENTIAL.arrZar * 0.6)),
                  "Strong attach of SchoolAdvisor®",
                ],
              },
              {
                cells: [
                  "Ceiling · 100%",
                  CONNECT_KZN_LOADED.totalEntities.toLocaleString("en-ZA"),
                  zarM(CONNECT_KZN_FULL_POTENTIAL.arrZar),
                  "Diligence upper bound — not a forecast",
                ],
              },
            ],
            footnote:
              "Assumes R498 blended ARPU. If many entities take Core only (R299), ARR scales down ~40%. Bulk provincial licences could change unit economics either way.",
          },
        },
        {
          type: "table",
          table: {
            caption: "Illustrative Connect consolidated ARR (ZAR) — all rails",
            headers: ["Horizon", "Conservative", "Base", "Upside"],
            rows: [
              {
                cells: [
                  "Year 1 (land KZN + Advisors)",
                  "R8–15m",
                  "R18–30m",
                  "R35–50m",
                ],
              },
              {
                cells: [
                  "Year 2 (multi-province + B2B)",
                  "R25–40m",
                  "R50–80m",
                  "R100–140m",
                ],
              },
              {
                cells: [
                  "Year 3 (national depth + Africa start)",
                  "R55–90m",
                  "R120–180m",
                  "R220–300m",
                ],
              },
              {
                cells: [
                  "Year 5 (Africa OS presence)",
                  "R150–250m",
                  "R300–500m",
                  "R600m+",
                ],
              },
            ],
            footnote:
              "Illustrative only. Aligns directionally with Group Connect moderate scenario (~USD 15–40m+ Y5 band depending on penetration) when SaaS seats and optional GMV take-rates compound — request NDA pack for cohort build-up. FX ~16.5 ZAR/USD for USD comparisons.",
          },
        },
        {
          type: "paragraph",
          text: "Margin frame. Pure SaaS Core + packs should support software-typical gross margins once hosting and support scale; incremental industry packs are high-contribution. HireAdvisor-style take-rates (where applicable on listing businesses) and optional verified-GMV economics are upside, not required for the KZN subscription thesis. Referral share-backs are a customer-acquisition cost that should fall as brand and programme mandates pull demand.",
        },
        {
          type: "callout",
          tone: "slate",
          title: "Honesty on numbers",
          body: "Loaded ≠ paying. Trial ≠ retained. Provincial expansion is political and budgetary. Treat full-conversion ARR as a sizing tool; diligence should demand month-by-month conversion cohorts, attach rates and net revenue retention under NDA.",
        },
      ],
    },

    {
      n: "10",
      id: "africa-global",
      title: "South Africa, Africa and beyond",
      eyebrow: "GEOGRAPHIC SCALE THESIS",
      blocks: [
        {
          type: "paragraph",
          text: "South Africa is the reference market: NSNP scale (~9.4M pupils daily as publicly reported), nine provinces, and dense formal trade. If KZN conversion works, the education playbook is copyable — and HealthAdvisor® opens a second departmental spine. National school and SP counts dwarf the KZN loaded base; even modest penetration outside KZN multiplies ARR.",
        },
        {
          type: "paragraph",
          text: "Africa. Ministries running school feeding, health procurement and agricultural offtake need the same proof rails. Connect exports a working OS (not a slide deck): multi-entity finance, SHEQ, verified suppliers and free citizen/member wallets. East and West African clients can start on SA-hosted workspaces, then localise billing and verification. Group Foods and Direct corridors create natural demand for the same login their counterparties already need.",
        },
        {
          type: "paragraph",
          text: "Beyond Africa. The product compares itself to global ERP and accounting classes with Africa-ready pricing. Diaspora buyers, ethical importers and multi-country groups are a longer-dated TAM — entered only after SA/Africa net revenue retention proves out. Optional on-chain passports support trade lanes where authenticity premiums exist.",
        },
        {
          type: "bullets",
          items: [
            "SA: finish KZN → PEDs → national education density → DoH pilots.",
            "SADC / East Africa: partner-led onboarding with Group institutional references.",
            "West Africa: wholesale and programme buyers attached to Foods export narrative.",
            "Global: selective enterprise and ethical-trade networks — capital-efficient, proof-led.",
          ],
        },
      ],
    },

    {
      n: "11",
      id: "impact",
      title: "Impact thesis — transparency that feeds children",
      eyebrow: "SAAS SUCCESS = SAFER PLATES & FAIRER TRADE",
      blocks: [
        {
          type: "lead",
          text: "Connect’s impact is operational: when schools, service providers and departments share one OS, approved nutrition and kitchen safety become enforceable — and private suppliers compete on verified performance instead of opacity.",
        },
        {
          type: "table",
          table: {
            caption: "Impact linkages",
            headers: ["Outcome", "Connect mechanism", "Why investors should care"],
            rows: [
              {
                cells: [
                  "Safer school meals",
                  "SchoolAdvisor® kitchen register, certificates, SHEQ/CAPA",
                  "Addresses public compliance gap; sticky B2G demand",
                ],
              },
              {
                cells: [
                  "Menu = plate",
                  "DBE-approved products/menus as live rules",
                  "Nutrition integrity for NSNP / Foods offtake",
                ],
              },
              {
                cells: [
                  "Fairer supplier markets",
                  "OTIFEF, ratings, verified graph",
                  "Network effects · harder to displace",
                ],
              },
              {
                cells: [
                  "Last-mile proof",
                  "ContainerAdvisor® + Foods live sites",
                  "Group impact claims become auditable",
                ],
              },
              {
                cells: [
                  "Inclusive B2C access",
                  "Free SA Member wallet",
                  "Consumer scale without platform tax on members",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "KPIs to report: paying entities; SchoolAdvisor attach; weekly active schools/SPs; kitchen compliance coverage; incident/CAPA closure times; B2B verified companies; GymAdvisor gyms and member MAU; provincial footprint; Africa workspaces. Impact and ARR should move together.",
        },
      ],
    },

    {
      n: "12",
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
                  "B2G conversion delay >6 months",
                  "ARR lag vs loaded-base story",
                  "Phased billing cohorts; training surge; departmental champions",
                ],
              },
              {
                cells: [
                  "Core-only attach (no SchoolAdvisor)",
                  "Lower ARPU",
                  "Mandate packs in programme design; show kitchen-safety ROI",
                ],
              },
              {
                cells: [
                  "Low weekly activation",
                  "Churn after landing",
                  "In-app Guide + SAM; field onboarding; compliance deadlines",
                ],
              },
              {
                cells: [
                  "Public-sector budget / tender shifts",
                  "Lumpy provincial expansion",
                  "Multi-province pipeline; B2B/Advisor revenue mix",
                ],
              },
              {
                cells: [
                  "Security / POPIA incident",
                  "Trust destruction",
                  "Hardened tenancy; consent flows on SA Member; audit packs",
                ],
              },
              {
                cells: [
                  "ERP competitor response",
                  "Longer enterprise cycles",
                  "Stay on ZAR mid-market + programme speed-to-value",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "Capital priorities for Connect within the Group raise: product hardening and uptime; onboarding/customer-success capacity for thousands of schools; provincial sales and training; Advisor vertical polish (Gym, clinical, Crop); and Africa go-live readiness (billing, verification, support). Software spend sits naturally inside the holdco 90% assets & product-development orientation.",
        },
        {
          type: "callout",
          tone: "slate",
          title: "Kill criteria (orientation)",
          body: "If activation and retention of paying KZN entities stay below threshold after the landing window and paid onboarding investment, pause aggressive multi-province burn and refocus on Group rails plus highest-ROI Advisor verticals until net revenue retention recovers.",
        },
      ],
    },

    {
      n: "13",
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
                  "0–6 months",
                  "Land",
                  "Convert first paid cohorts of the 5,386 schools / 1,850 SPs; SchoolAdvisor attach; GymAdvisor gym #2–5",
                ],
              },
              {
                cells: [
                  "6–12 months",
                  "Operate",
                  "KZN weekly active targets; kitchen compliance dashboards used by PED; Foods network density up",
                ],
              },
              {
                cells: [
                  "12–18 months",
                  "Replicate",
                  "Second province live; other-department brief (e.g. Health); Africa partner LOIs; Advisor ARR material",
                ],
              },
            ],
          },
        },
        {
          type: "paragraph",
          text: "Board dashboard: loaded→paying conversion %, ARPU mix, NRR, logo churn, WAU/MAU, provincial count, Advisor seats, support cost per entity, uptime. That turns this plan into an operating system for Connect itself.",
        },
      ],
    },

    {
      n: "14",
      id: "team-governance",
      title: "Team, governance & Group fit",
      eyebrow: "HOW CONNECT SITS IN THE HOLDING COMPANY",
      blocks: [
        {
          type: "paragraph",
          text: "Big Five Connect is the opco accountable for SupplierAdvisor® commercialisation, onboarding quality and network growth. Product IP and continental platform economics sit in the planned Group holdco architecture; Connect runs the P&L for SaaS and related module revenue. Equity investors participate at holding-company level while diligencing Connect as a high-gross-margin, network-effect engine alongside Foods’ manufacturing story.",
        },
        {
          type: "bullets",
          items: [
            "Group captive usage (Foods and others) provides reference accounts and workflow R&D.",
            "Impact / Access open ministerial doors; Connect supplies the software spine.",
            "Leadership / Super-Cube® and SAM (Grok) differentiate onboarding and in-app guidance.",
            "Board seat on the Group raise sees Connect KPIs beside Foods pipeline and Howick capacity.",
          ],
        },
      ],
    },

    {
      n: "15",
      id: "closing",
      title: "The ask behind the Connect plan",
      eyebrow: "WHY INVEST · WHY NOW",
      blocks: [
        {
          type: "lead",
          text: "We spent the first six months building a real OS. We loaded 5,386 schools and 1,850 service providers for KZN NSNP. We priced the land grab in clear ZAR terms — R299 Core and R199 SchoolAdvisor per entity. We opened GymAdvisor with 250+ members on the first gym. Big Five Foods is already on the rails.",
        },
        {
          type: "paragraph",
          text: "The next 12–18 months are about conversion and replication: land KZN subscriptions, expand provinces and departments, grow industry Advisors, and prepare Africa. Full-conversion KZN ARR potential of ~R43m frames the size of a single provincial programme — before national and continental upside.",
        },
        {
          type: "paragraph",
          text: "Investors evaluating the Group raise should read this plan as proof that Connect is not a side tool. It is the operating system that makes Feed · Educate · Empower inspectable — and a SaaS business that can compound from school kitchens in KwaZulu-Natal to trade networks across Africa and beyond.",
        },
        {
          type: "callout",
          tone: "amber",
          title: "Next step",
          body: "Request the NDA data room for live billing cohorts, SchoolAdvisor attach, churn, infrastructure cost, and provincial pipeline. Tour www.supplieradvisor.com and the interactive demo — then diligence conversion, not screenshots.",
        },
      ],
    },
  ],

  closing: {
    title: "Big Five Connect — SupplierAdvisor® as continental operating fabric",
    body: "From product build to loaded KZN network to paid subscriptions — then provinces, departments, Advisors and Africa. Built for proof. Sold as ZAR SaaS.",
    cta: "Discuss Connect diligence under NDA",
  },
};
