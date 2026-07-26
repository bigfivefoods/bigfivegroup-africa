/**
 * How each pillar answers Group VMV and UN SOFI food-security challenges.
 * Used on pillar pages for coherent, compelling framing.
 */

import { SOFI } from "./sofi";
import type { PageBrandKey } from "./pageBrand";

/** Canonical Group north star (text-only — shared with decks/pages). */
export const GROUP_VMV = {
  vision: {
    title: "A prosperous Africa — for everyone on it",
    body: "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, and communities build economies they own.",
  },
  mission: {
    title: "Feed. Educate. Empower.",
    body: "Deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises — at scale and with proof.",
  },
  values: [
    { title: "Humanity", desc: "People first — Ubuntu in practice." },
    { title: "Innovation", desc: "Better systems for African progress." },
    { title: "Integrity", desc: "Honesty, transparency, ethical commerce." },
    { title: "Excellence", desc: "Professional standards, always." },
    { title: "Impact", desc: "Outcomes communities can feel." },
  ],
} as const;

export type PillarAlignment = {
  slug: PageBrandKey | string;
  mission: "Feed" | "Educate" | "Empower" | "Group";
  /** How this pillar serves Feed · Educate · Empower */
  missionFit: string;
  /** UN SOFI / food-system challenge this pillar helps address */
  sofiChallenge: string;
  /** What we do in response (concise) */
  sofiResponse: string;
  /** Optional stat callouts (external SOFI or Group pathway) */
  stats?: { value: string; label: string }[];
};

export const PILLAR_ALIGNMENT: Record<string, PillarAlignment> = {
  agri: {
    slug: "agri",
    mission: "Feed",
    missionFit:
      "Regenerative production is the first half of Feed — soil, smallholders and provenance so fortification and logistics have something real to move.",
    sofiChallenge: `SOFI ${SOFI.edition.slice(-4)}: ~${SOFI.africa.hungryLabel} people in Africa faced hunger in ${SOFI.dataYearHunger} (~${SOFI.africa.prevalencePct}%). Food security starts in the ground — degraded soils and weak offtake keep systems fragile.`,
    sofiResponse:
      "Restore land, train farmers, verify regenerative practice, and supply Foods and Direct with produce markets and institutions can trust.",
    stats: [
      { value: SOFI.africa.hungryLabel, label: `Africa hunger ${SOFI.dataYearHunger} (SOFI)` },
      { value: "2.8M ha", label: "Regenerative opportunity (plan scale)" },
    ],
  },
  foods: {
    slug: "foods",
    mission: "Feed",
    missionFit:
      "Fortified, affordable staples put Feed on the plate — households, schools and institutions, with proof partners can cite.",
    sofiChallenge: `~${SOFI.global.hungryLabel} people faced hunger globally in ${SOFI.dataYearHunger}; ~${SOFI.healthyDiets.cannotAffordLabel} cannot afford a healthy diet (SOFI 2026). Child stunting remains off-track (~${SOFI.childNutrition.stuntedLabel} under-5s globally).`,
    sofiResponse:
      "Shelf-stable fortified porridges, soya, one-pots and soups — including NSNP institutional packs — designed for cost, culture and daily menus.",
    stats: [
      { value: SOFI.global.hungryLabel, label: `Global hunger ${SOFI.dataYearHunger}` },
      { value: "2.5M", label: "Children/day NSNP plan (DBE pathway)" },
    ],
  },
  direct: {
    slug: "direct",
    mission: "Empower",
    missionFit:
      "Last-mile rails empower communities and producers — food and opportunity where people already move (taxi ranks, rural hubs).",
    sofiChallenge:
      "Nutrition fails in the last mile: spoilage, opaque mark-ups and invisible stock. SOFI shows Africa still carries the largest undernourishment burden — logistics decide whether fortified food becomes a meal.",
    sofiResponse:
      "SANTACO-linked multi-use containers, solar micro-hubs and transparent routes so Foods reaches plates and small enterprises keep value.",
    stats: [
      { value: "15k", label: "Container nodes (plan scale · SANTACO)" },
      { value: SOFI.africa.hungryLabel, label: "Africa hunger context (SOFI)" },
    ],
  },
  access: {
    slug: "access",
    mission: "Empower",
    missionFit:
      "Capital and institutional pathways empower programmes — policy and tenders become daily meals and verifiable projects.",
    sofiChallenge:
      "Public nutrition mandates and DFI capital need delivery partners who can hold complexity. Hunger and school feeding are policy problems until they become plated outcomes.",
    sofiResponse:
      "Open government, institutional and development-finance pathways with Group delivery capacity attached — e.g. NSNP ambition under DBE.",
    stats: [
      { value: "NSNP", label: "School nutrition pathway (DBE)" },
      { value: "2.5M", label: "Children/day plan scale" },
    ],
  },
  connect: {
    slug: "connect",
    mission: "Empower",
    missionFit:
      "Verified trade and SAM empower ethical commerce — transparency that blocks risk across Feed and Empower rails.",
    sofiChallenge:
      "Without trust rails, food systems stay opaque: capable suppliers locked out, programmes without audit trails. SOFI’s healthy-diet gap (~2.7B) is also a market-access problem.",
    sofiResponse:
      "SupplierAdvisor® + SAM: verified suppliers, live control, provenance and ethical trade for B2B, B2G and B2C.",
    stats: [
      { value: "2.7B", label: "Cannot afford healthy diets (SOFI)" },
      { value: "SAM", label: "Messenger AI for the chain" },
    ],
  },
  leadership: {
    slug: "leadership",
    mission: "Educate",
    missionFit:
      "Educate is Super-Cube® — whole-person leadership so programmes, ministries and enterprises can hold multi-stakeholder complexity.",
    sofiChallenge:
      "Food-system failures are also leadership failures: tools without ethical judgment multiply harm. SDG 2 needs people who can govern delivery under pressure.",
    sofiResponse:
      "Doctoral Super-Cube® formation for executives, public servants and youth — Ubuntu, ethics and deliberate practice.",
    stats: [
      { value: "70–76%", label: "Leadership developable (DBA framing)" },
      { value: "6", label: "Super-Cube® constructs" },
    ],
  },
  foundation: {
    slug: "foundation",
    mission: "Empower",
    missionFit:
      "Philanthropy with proof empowers communities — transparent capital and delivery through Impact.",
    sofiChallenge:
      "Giving without theory of change wastes scarce resources while ~309M people in Africa still face hunger (SOFI 2026).",
    sofiResponse:
      "Registered NPO pathways, SupplierAdvisor® listing, and programmes designed with Impact PMO so donors and communities see the same truth.",
    stats: [
      { value: "NPO", label: "Registered · SA" },
      { value: SOFI.africa.hungryLabel, label: "Africa hunger context" },
    ],
  },
  impact: {
    slug: "impact",
    mission: "Empower",
    missionFit:
      "Cross-pillar PMO empowers delivery — gates, KPIs and field assurance across Feed · Educate · Empower.",
    sofiChallenge:
      "SOFI shows progress is uneven and Africa remains the epicentre of undernourishment. Partners need programme discipline, not slide-deck claims.",
    sofiResponse:
      "Design multi-pillar programmes with measurable gates; institutional pathways (including health systems) with honest language on working relationships.",
    stats: [
      { value: "10", label: "Pillars under one PMO" },
      { value: "SDG 2", label: "Zero Hunger alignment" },
    ],
  },
  global: {
    slug: "global",
    mission: "Empower",
    missionFit:
      "Corridors empower African excellence abroad — distribution and RTM that multiply Feed and Empower.",
    sofiChallenge:
      "Global hunger remains ~645M (SOFI 2026). Trade corridors and ethical RTM shape whether African production and fortification reach markets with dignity.",
    sofiResponse:
      "Priority Africa + Europe distribution strategy with Group standards and SupplierAdvisor®-ready trade.",
    stats: [
      { value: "12", label: "Priority RTM markets" },
      { value: SOFI.global.hungryLabel, label: "Global hunger context" },
    ],
  },
  africa: {
    slug: "africa",
    mission: "Group",
    missionFit:
      "The continental canvas for Feed · Educate · Empower — 54-nation vision with local roots.",
    sofiChallenge: SOFI.africa.epicentreNote,
    sofiResponse:
      "Operate from KwaZulu-Natal with deep partnerships, and scale only where delivery capacity is real.",
    stats: [
      { value: "54", label: "Nations in African vision" },
      { value: SOFI.africa.hungryLabel, label: "Africa hunger (SOFI)" },
    ],
  },
  royal: {
    slug: "royal",
    mission: "Empower",
    missionFit:
      "Royal and traditional partnership empowers legitimacy — community-first programmes with dignity.",
    sofiChallenge:
      "Lasting food security needs community ownership and traditional authority partnership — not extractive projects.",
    sofiResponse:
      "Close ties and planned partnership with royal and tribal structures so Agri, Foods and Foundation programmes honour heritage and local leadership.",
    stats: [
      { value: "Ubuntu", label: "Dignity-first partnership" },
      { value: "Feed", label: "Community nutrition pathways" },
    ],
  },
  group: {
    slug: "group",
    mission: "Group",
    missionFit: GROUP_VMV.mission.body,
    sofiChallenge: `SOFI 2026: ~${SOFI.global.hungryLabel} hungry globally; ~${SOFI.africa.hungryLabel} in Africa (~${SOFI.africa.prevalencePct}%); ~${SOFI.healthyDiets.cannotAffordLabel} cannot afford a healthy diet. Africa remains the epicentre of undernourishment.`,
    sofiResponse:
      "One holding system — Agri to Foundation — so production, fortification, last-mile, capital, commerce, leadership and PMO compound as Feed · Educate · Empower with proof.",
    stats: [
      { value: SOFI.africa.hungryLabel, label: "Africa hunger 2025" },
      { value: SOFI.global.hungryLabel, label: "Global hunger 2025" },
      { value: "10", label: "Pillars · one Group" },
    ],
  },
};

export function getPillarAlignment(slug: string): PillarAlignment {
  return (
    PILLAR_ALIGNMENT[slug] ?? {
      slug,
      mission: "Group" as const,
      missionFit: GROUP_VMV.mission.body,
      sofiChallenge: SOFI.africa.prevalenceNote,
      sofiResponse: "Part of the Big Five Group system — Feed · Educate · Empower.",
    }
  );
}
