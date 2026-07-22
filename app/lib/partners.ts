/**
 * Partner portal registry — one profile per partner organisation (server-side).
 *
 * To add a partner:
 * 1. Copy an entry below (unique `slug`)
 * 2. List login emails on that partner (lowercase)
 * 3. Drop logo at public/partners/{slug}-logo.png (or set logoSrc)
 * 4. Customise headline, summary, focus, notes, resources
 *
 * Optional: PARTNER_EMAILS env still works for ad-hoc emails; they land on
 * the generic "partners" briefing if not mapped here.
 *
 * Client components must import from partner-public.ts only — never this file —
 * so login emails are not shipped to the browser.
 */

import {
  BIG_FIVE_LOGO,
  type ClientPartnerProfile,
  type PartnerDirectoryEntry,
  type PartnerProgrammeId,
  type PartnerResource,
} from "./partner-public";

export {
  BIG_FIVE_LOGO,
  DEFAULT_PARTNER_RESOURCES,
  mergePartnerResources,
  type ClientPartnerProfile,
  type PartnerDirectoryEntry,
  type PartnerProgrammeId,
  type PartnerResource,
} from "./partner-public";

export type PartnerProfile = ClientPartnerProfile & {
  /** Emails that may open this partner page (lowercase) — server only */
  emails: string[];
  /** If true, can open any /partner/[slug] after login */
  admin?: boolean;
};

/**
 * All partners. Add new organisations here as you grow.
 */
export const PARTNERS: PartnerProfile[] = [
  {
    slug: "big-five-group",
    name: "Big Five Group",
    organisation: "Big Five Group (Pty) Ltd",
    emails: ["craig@bigfivegroup.africa"],
    admin: true,
    role: "Group · internal",
    headline: "Internal partner briefing hub",
    summary:
      "Group overview for authorised internal use — same briefing structure partners see, with access to every partner workspace.",
    focus: ["All pillars", "NSNP", "SANTACO", "Connect", "Impact"],
    programmes: ["nsnp", "santaco", "connect", "leadership", "impact"],
    logoSrc: BIG_FIVE_LOGO,
    brandColor: "#052e1c",
    notes: [
      "Full portal admin: open any partner workspace from All partners below (or go to /partner/[slug] directly).",
      "Add new partners in app/lib/partners.ts — each gets /partner/[slug] with co-branded logo.",
      "Portal super-admin list: PARTNER_PORTAL_ADMINS in partners.ts (currently craig@bigfivegroup.africa).",
    ],
    contactNote: "Internal — coordinate partner onboarding via Group leadership.",
  },
  {
    slug: "department-of-basic-education",
    name: "Department of Basic Education",
    organisation: "Department of Basic Education · Republic of South Africa",
    emails: [],
    role: "National education department · NSNP pathway",
    headline: "DBE × Big Five Foods",
    summary:
      "Partnership workspace aligned with South Africa’s Department of Basic Education (education.gov.za) — institutional nutrition pathways under the National School Nutrition Programme (NSNP), with Big Five Foods as a programme supply partner for fortified institutional formats.",
    focus: ["Foods", "NSNP", "Direct", "Impact", "Access"],
    programmes: ["nsnp", "impact", "connect"],
    brandColor: "#003366",
    website: "https://www.education.gov.za/",
    websiteLabel: "education.gov.za",
    notes: [
      "Official Department of Basic Education website: https://www.education.gov.za/",
      "NSNP programme page (DBE): https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx",
      "Big Five Foods has landed the NSNP pathway for fortified institutional SKUs (5kg packs) — planned programme scale language; not a claim of current daily operational headcount.",
      "This portal is a briefing workspace for authorised partners — not a government site and not an endorsement mark beyond the public programme relationship described on Group surfaces.",
      "Add authorised DBE / provincial education emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "https://www.education.gov.za/",
        label: "Department of Basic Education",
        desc: "Official DBE website — education.gov.za",
      },
      {
        href: "https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx",
        label: "NSNP programme (DBE)",
        desc: "National School Nutrition Programme — official DBE programme page.",
      },
      {
        href: "/foods#case-study",
        label: "Foods · NSNP case study",
        desc: "Big Five Foods school nutrition pathway and institutional product context.",
      },
      {
        href: "/foods#foods-deck",
        label: "Foods product deck",
        desc: "Fortified nutrition, NSNP-approved formats, institutional economics.",
      },
      {
        href: "/methodology",
        label: "Methodology",
        desc: "How we label plan scale vs programme-reported delivery.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · DBE / NSNP coordination via Big Five Foods partnership lead",
  },
  {
    slug: "department-of-health",
    name: "Department of Health",
    organisation: "Department of Health · Republic of South Africa",
    emails: [],
    role: "National health department · institutional pathways",
    headline: "DoH × Big Five Group",
    summary:
      "Partnership workspace aligned with South Africa’s Department of Health (health.gov.za) — institutional pathways for Group products into the health system as relationships and programmes mature. Big Five works with the Director General of Health as a strategic institutional relationship (not Impact staff); Impact PMO coordinates delivery.",
    focus: ["Impact", "Foods", "Access", "Connect", "Leadership"],
    programmes: ["impact", "nsnp", "connect", "leadership"],
    brandColor: "#006633",
    website: "https://www.health.gov.za/",
    websiteLabel: "health.gov.za",
    notes: [
      "Official Department of Health website: https://www.health.gov.za/",
      "Strategic institutional relationship with the Director General of Health — a working channel into SA DoH and, over time, counterpart health pathways in Africa; not claimed as closed multi-country awards.",
      "Impact PMO designs gates, KPIs and field delivery; the DG of Health relationship is not a staff appointment within Big Five Impact.",
      "This portal is a briefing workspace for authorised partners — not a government site and not an endorsement mark beyond the institutional relationship described on Group surfaces.",
      "Add authorised DoH / provincial health emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "https://www.health.gov.za/",
        label: "Department of Health",
        desc: "Official DoH website — health.gov.za",
      },
      {
        href: "/impact",
        label: "Big Five Impact",
        desc: "Cross-pillar PMO — gates, KPIs and health-system pathway framing.",
      },
      {
        href: "/impact#strategy-deck",
        label: "Impact strategy deck",
        desc: "Group overview and African problem/response framing.",
      },
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Fortified nutrition formats for institutional and community pathways.",
      },
      {
        href: "/methodology",
        label: "Methodology",
        desc: "How we label pathway ambition vs programme-reported delivery.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · DoH pathway coordination via Big Five Impact partnership lead",
  },
  {
    slug: "sa-harvest",
    name: "SA Harvest",
    organisation: "SA Harvest",
    emails: [],
    role: "Rescuing food · fighting hunger",
    headline: "SA Harvest × Big Five Group",
    summary:
      "Partnership workspace aligned with SA Harvest’s mission to end hunger in South Africa — rescuing nutritious food, feeding people in need, and tackling systemic causes of hunger with technology and scale (saharvest.org).",
    focus: ["Foods", "Direct", "Foundation", "Impact", "Feed"],
    programmes: ["nsnp", "santaco", "impact"],
    logoSrc: "/partners/sa-harvest-logo.png",
    brandColor: "#1B4332",
    website: "https://saharvest.org/",
    websiteLabel: "saharvest.org",
    notes: [
      "SA Harvest branding and mark sourced from saharvest.org for co-branded partner briefing.",
      "Shared ambition: food security with reliable product, logistics and transparent impact reporting.",
      "Big Five Foods + Direct support community and institutional feeding pathways; Impact PMO for multi-pillar programmes.",
      "Add authorised SA Harvest emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "/foundation",
        label: "Foundation",
        desc: "NPO pathways and catalytic programmes alongside Group delivery.",
      },
      {
        href: "/impact",
        label: "Impact PMO",
        desc: "Gates, KPIs and field assurance for joint programmes.",
      },
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa · SA Harvest coordination via partnership lead",
  },
  {
    slug: "a-heart-to-help",
    name: "A Heart To Help",
    organisation: "A Heart To Help",
    emails: [],
    role: "NPO · GBV safety · rehabilitation",
    headline: "A Heart To Help × Big Five Group",
    summary:
      "Partnership workspace for A Heart To Help and Big Five Group — an NPO supporting women experiencing abuse with safety, counselling, skills development and pathways to independence, building toward the first Freedom Farm centre on the KZN North Coast (ahearttohelp.co.za).",
    focus: ["Foundation", "Foods", "Impact", "Leadership", "Empower"],
    programmes: ["nsnp", "leadership", "impact"],
    logoSrc: "/partners/a-heart-to-help-logo.png",
    brandColor: "#0E4A4D",
    website: "https://ahearttohelp.co.za/",
    websiteLabel: "ahearttohelp.co.za",
    notes: [
      "A Heart To Help branding and mark sourced from ahearttohelp.co.za for co-branded partner briefing.",
      "Mission: empower frequently abused women — and their children — through safety, counselling, skills development and pathways to financial independence.",
      "Immediate goal: first centre (Freedom Farm) on the Dolphin Coast / KZN North Coast as proof of concept for a national network of rehabilitation centres.",
      "Big Five Foundation, Foods, Impact and Leadership can support residential nutrition, skills pathways, programme design and field assurance where the partnership requires them.",
      "SPAR × Big Five Foods partnership: product donations and contribution rand (with Restore Africa Foundation) under the 10% turnover model.",
      "Add authorised A Heart To Help emails to this profile when portal logins are ready (public contact: info@ahearttohelp.co.za).",
    ],
    resources: [
      {
        href: "/foundation",
        label: "Foundation",
        desc: "NPO pathways, catalytic programmes and transparent social design.",
      },
      {
        href: "/impact",
        label: "Impact PMO",
        desc: "Gates, KPIs and field assurance for multi-stakeholder programmes.",
      },
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Institutional and community nutrition packs where feeding is part of care.",
      },
      {
        href: "/leadership",
        label: "Leadership · Super-Cube®",
        desc: "Whole-person capacity for teams delivering trauma-informed programmes.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · A Heart To Help: info@ahearttohelp.co.za",
  },
  {
    slug: "spar",
    name: "SPAR",
    organisation: "SPAR South Africa",
    emails: [],
    role: "Retail · fortified nutrition · feeding partnership",
    headline: "SPAR does good × Big Five Foods",
    summary:
      "Partnership workspace for SPAR South Africa — put fortified Big Five Foods on shelf (Nelson Mandela pack: R45 trade ex. VAT · R67 RRP incl. VAT · healthy SPAR front margin), sell with purpose and/or donate to Restore Africa Foundation and A Heart To Help, with 10% of partnership turnover (SPAR 5% + Big Five Foods 5%) supporting those foundations. SPAR leads the community story.",
    focus: ["Foods", "Foundation", "Impact", "Feed", "Retail", "CSI"],
    programmes: ["nsnp", "connect", "impact"],
    logoSrc: "/partners/spar-logo.png",
    brandColor: "#006633",
    website: "https://www.spar.co.za/Home",
    websiteLabel: "spar.co.za",
    notes: [
      "Open the SPAR partnership deck below — SPAR-led narrative: store margin, Mandela pack, foundations, and “SPAR does good”.",
      "Trade R45 (ex. VAT) · RRP R67 (incl. VAT) · indicative SPAR front margin ~R15.25 / ~23% of RRP (VAT-aligned) — not manufacturer GP.",
      "10% model: SPAR 5% of retail sell-through + Big Five Foods 5% of trade → Restore Africa Foundation and A Heart To Help.",
      "Dual pathways: shelf sales and/or donation POs into the two foundations — SPAR is the face of the good.",
      "Add authorised SPAR emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "#spar-partnership-deck",
        label: "SPAR does good — pitch deck",
        desc: "20-slide pitch: SPAR margin, Mandela pack, impact report, RAF · AHTH · SA Harvest delivery.",
      },
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Full product ranges, fortification story and institutional packs.",
      },
      {
        href: "/foods#foods-deck",
        label: "Foods product & impact deck",
        desc: "Ranges, fortification, certifications and how to order.",
      },
      {
        href: "/foundation",
        label: "Foundation",
        desc: "Group philanthropic pathways alongside NPO partners.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · SPAR commercial / CSI discussions under NDA as required",
  },
  {
    slug: "restore-africa-foundation",
    name: "Restore Africa Foundation",
    organisation: "Restore Africa Foundation",
    emails: [],
    role: "NPC · children · community rebuild · KZN",
    headline: "Restore Africa Foundation × Big Five Group",
    summary:
      "Partnership workspace for Restore Africa Foundation (NPC) and Big Five Group — investing in South Africa’s children through community rebuild, school-linked programmes and nutritious support. KZN North Coast roots; beneficiary of the SPAR × Big Five Foods 10% feeding partnership alongside A Heart To Help.",
    focus: ["Foundation", "Foods", "Impact", "Feed", "Children"],
    programmes: ["nsnp", "impact"],
    logoSrc: "/partners/restore-africa-foundation-logo.png",
    brandColor: "#0F5A37",
    website: "https://www.facebook.com/p/Restore-Africa-Foundation-61573115377603/",
    websiteLabel: "Facebook · Restore Africa Foundation",
    notes: [
      "Official Restore Africa Foundation seal/logo (restore africa foundation logo.jpeg) used for co-branded partner briefing.",
      "Scripture: “Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.” — James 1:27",
      "Restore Africa Foundation is a registered Non-Profit Company (Ballito / KZN) — children first, community rebuild, school programmes such as Veggies4Kids. Est. 2024.",
      "SPAR × Big Five Foods partnership routes product donations and contribution rand toward feeding and foundation programmes (with A Heart To Help).",
      "Big Five Foods fortified staples support ECD, school and community kitchens where the foundation works.",
      "Add authorised Restore Africa Foundation emails when portal logins are ready.",
    ],
    resources: [
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Fortified ranges suitable for community and school-linked feeding.",
      },
      {
        href: "/foundation",
        label: "Big Five Foundation",
        desc: "Group philanthropic pathways and programme design.",
      },
      {
        href: "/impact",
        label: "Impact PMO",
        desc: "Gates, KPIs and field assurance for multi-partner programmes.",
      },
      {
        href: "/foods#foods-deck",
        label: "Foods product deck",
        desc: "Product narrative for donation and programme feeding contexts.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · Restore Africa Foundation coordination via Group partnership lead",
  },
  {
    slug: "the-sharks",
    name: "The Sharks",
    organisation: "The Sharks · Durban",
    emails: [],
    role: "Hollywoodbets Sharks · rugby · community",
    headline: "The Sharks × Big Five Group",
    summary:
      "Partnership workspace for The Sharks (Durban) and Big Five Group — KwaZulu-Natal rooted community nutrition, high-performance culture and fan engagement pathways (sharksrugby.co.za).",
    focus: ["Foods", "Foundation", "Leadership", "Royal"],
    programmes: ["nsnp", "leadership", "impact"],
    logoSrc: "/partners/sharks-logo.png",
    brandColor: "#0A0A0A",
    website: "https://sharksrugby.co.za/",
    websiteLabel: "sharksrugby.co.za",
    notes: [
      "The Sharks branding and mark sourced from sharksrugby.co.za for co-branded partner briefing.",
      "KZN partnership potential: community feeding, youth pathways, academy and match-day nutrition.",
      "Leadership / Super-Cube® and Foundation can sit alongside Foods for community and high-performance contexts.",
      "Add authorised Sharks organisation emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "/leadership",
        label: "Leadership · Super-Cube®",
        desc: "Whole-person leadership for high-performance and community contexts.",
      },
      {
        href: "/foundation",
        label: "Foundation",
        desc: "Community programmes with transparent design and proof.",
      },
      {
        href: "/royal",
        label: "Royal",
        desc: "Community legitimacy and dignity-first partnership framing.",
      },
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa · Sharks partnership coordination via Group leadership",
  },
  {
    slug: "santaco",
    name: "SANTACO",
    organisation: "South African National Taxi Council",
    emails: [],
    role: "National taxi industry body · last-mile nodes",
    headline: "SANTACO × Big Five Direct",
    summary:
      "Partnership workspace for SANTACO (South African National Taxi Council) and Big Five Group — national voice of the minibus-taxi industry since 2001, and Direct’s partner for multi-use containers at major taxi ranks and rural communities: Foods supply, Wi‑Fi surveys, marketing revenue and Super-Cube® education (santaco.org).",
    focus: ["Direct", "Foods", "Leadership", "Impact", "Last mile"],
    programmes: ["santaco", "nsnp", "connect", "leadership", "impact"],
    logoSrc: "/partners/santaco-logo.png",
    brandColor: "#0B3D2E",
    website: "https://santaco.org/about-us/",
    websiteLabel: "santaco.org · About us",
    notes: [
      "Official SANTACO logo used for co-branded partner briefing (public/partners/santaco-logo.png).",
      "Official SANTACO site: https://santaco.org/ — About us: https://santaco.org/about-us/",
      "SANTACO is the national representative body of South Africa’s minibus-taxi industry — formed in 2001 as the unified voice of the sector.",
      "Big Five Direct partnership: plan to roll out 15,000 containers at major taxi ranks and rural communities — Foods, Wi‑Fi surveys, marketing and Super-Cube® / Leadership education where people already move.",
      "Industry context (mode share, ridership order of magnitude) is external (e.g. Stats SA NHTS) — not Big Five audited passenger counts.",
      "Add authorised SANTACO emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "https://santaco.org/about-us/",
        label: "SANTACO · About us",
        desc: "Official about page — national taxi council mission and industry voice (santaco.org).",
      },
      {
        href: "https://santaco.org/",
        label: "SANTACO website",
        desc: "Home of the South African National Taxi Council.",
      },
      {
        href: "/direct#santaco",
        label: "Direct × SANTACO programme",
        desc: "15,000-container rollout plan at taxi ranks and rural communities.",
      },
      {
        href: "/direct",
        label: "Big Five Direct",
        desc: "Last-mile distribution, hubs and route-to-market.",
      },
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Fortified product for high-footfall rank and community nodes.",
      },
      {
        href: "/leadership",
        label: "Leadership · Super-Cube®",
        desc: "Education touchpoints delivered where people already move.",
      },
    ],
    contactNote:
      "Primary Group contact: craig@bigfivegroup.africa · SANTACO coordination via Big Five Direct partnership lead",
  },
  {
    slug: "kencrete",
    name: "Kencrete",
    organisation: "Kencrete",
    emails: ["clint@kencrete.co.za"],
    role: "Strategic partner",
    headline: "Kencrete × Big Five Group",
    summary:
      "Private briefing for Kencrete — how we partner across Group rails, programme pathways, and next-step resources tailored to this relationship.",
    focus: ["Foods", "Direct", "Access", "Impact"],
    programmes: ["nsnp", "santaco", "connect"],
    brandColor: "#0f172a",
    notes: [
      "Use this page as the living brief for joint opportunities and delivery pathways.",
      "Commercial terms and SOWs remain offline / NDA as agreed — this portal is orientation and shared materials.",
    ],
    resources: [
      {
        href: "/access",
        label: "Access · capital pathways",
        desc: "Tenders, CSI and development capital with Group delivery attached.",
      },
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa",
  },
  {
    slug: "dmafrica",
    name: "dmAFRICA",
    organisation: "dmAFRICA",
    emails: ["daniel@dmafrica.com"],
    role: "African safaris · extraordinary journeys",
    headline: "dmAFRICA × Big Five Group",
    summary:
      "Partnership workspace for dmAFRICA and Big Five Group — for over 28 years dmAFRICA has presented African excellence to discerning travellers, crafting seamless journeys in style from bush to beach and beyond (dmafrica.com).",
    focus: ["Foods", "Impact", "Leadership", "Connect", "Global"],
    programmes: ["nsnp", "connect", "leadership", "impact"],
    logoSrc: "/partners/dmafrica-logo.png",
    /** Near-black hero from dmafrica.com brand surfaces */
    brandColor: "#0C0C0C",
    website: "https://dmafrica.com/",
    websiteLabel: "dmafrica.com",
    notes: [
      "Official dmAFRICA wordmark and 28-year gold mark sourced from dmafrica.com for co-branded partner briefing (dark wordmark for light tiles).",
      "Brand language: “Everything extraordinary” — experience the unseen, embrace the unforgettable; 28+ years of African excellence.",
      "Shared focus: African excellence — hospitality, access, and experiences that match Group standards of integrity and delivery.",
      "Foods, Connect and Impact can support guest, community and supply pathways where the partnership requires them.",
      "Primary portal contact: daniel@dmafrica.com · enquiries: sales@dmafrica.com · Group: craig@bigfivegroup.africa",
    ],
    resources: [
      {
        href: "/global",
        label: "Global corridors",
        desc: "International route-to-market and African excellence abroad.",
      },
      {
        href: "/leadership",
        label: "Leadership · Super-Cube®",
        desc: "Whole-person leadership for high-performance teams and partners.",
      },
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa · dmAFRICA: sales@dmafrica.com",
  },
  /**
   * Fallback workspace for emails on PARTNER_EMAILS env not mapped above.
   */
  {
    slug: "general",
    name: "Partner",
    organisation: "Authorised partner",
    emails: [],
    role: "Registered partner",
    headline: "Partner briefing room",
    summary:
      "Authorised partner access to programme context, how we work together, and shareable decks. Your organisation-specific workspace can be created on request.",
    focus: ["Foods", "Direct", "Connect", "Impact"],
    programmes: ["nsnp", "santaco", "connect"],
    notes: [
      "If you expected a named organisation page, email craig@bigfivegroup.africa to have your workspace configured.",
    ],
  },
];

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Full portal access — can open every /partner/[slug] and see the admin directory.
 * Independent of individual partner email lists.
 */
export const PARTNER_PORTAL_ADMINS: string[] = [
  "craig@bigfivegroup.africa",
];

/** Slugs never shown in the admin partner directory. */
export const PARTNER_DIRECTORY_HIDDEN_SLUGS = new Set([
  "general",
  "big-five-group",
  "kencrete",
]);

/** Strip sensitive fields before sending a partner profile to the client. */
export function toClientPartner(partner: PartnerProfile): ClientPartnerProfile {
  const { emails: _emails, admin: _admin, ...safe } = partner;
  return safe;
}

/** All emails that may log into the partner portal (from partner profiles + admins). */
export function getPartnerEmailsFromRegistry(): string[] {
  const emails: string[] = [...PARTNER_PORTAL_ADMINS.map(normalizeEmail)];
  for (const p of PARTNERS) {
    for (const e of p.emails) {
      const n = normalizeEmail(e);
      if (n) emails.push(n);
    }
  }
  return emails;
}

export function getPartnerBySlug(slug: string): PartnerProfile | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}

/**
 * Resolve partner profile for a signed-in email.
 * - Mapped org email → that organisation only
 * - Portal admin → Big Five Group hub
 * - Ad-hoc PARTNER_EMAILS env (not in registry) → general workspace
 */
export function getPartnerByEmail(email: string): PartnerProfile | undefined {
  const n = normalizeEmail(email);
  const match = PARTNERS.find((p) => p.emails.map(normalizeEmail).includes(n));
  if (match) return match;
  if (PARTNER_PORTAL_ADMINS.map(normalizeEmail).includes(n)) {
    return getPartnerBySlug("big-five-group");
  }
  return getPartnerBySlug("general");
}

export function isPartnerAdmin(email: string): boolean {
  const n = normalizeEmail(email);
  if (PARTNER_PORTAL_ADMINS.map(normalizeEmail).includes(n)) return true;
  const p = PARTNERS.find((x) => x.emails.map(normalizeEmail).includes(n));
  return Boolean(p?.admin);
}

/**
 * Can this email view this partner slug?
 *
 * Hard isolation:
 * - Non-admins may ONLY open the single /partner/[slug] tied to their email
 *   (e.g. SPAR emails → /partner/spar only; dmAFRICA → /partner/dmafrica only).
 * - They cannot open another organisation’s page even with a direct URL.
 * - Ad-hoc PARTNER_EMAILS (env, not in registry) may only open /partner/general.
 * - PARTNER_PORTAL_ADMINS (Craig) may open any slug for internal briefing.
 */
export function canAccessPartnerPage(email: string, slug: string): boolean {
  if (isPartnerAdmin(email)) return true;
  const n = normalizeEmail(email);
  const partner = PARTNERS.find((p) => p.emails.map(normalizeEmail).includes(n));
  if (partner) return partner.slug === slug;
  // Env / ad-hoc allowlist: isolated general workspace only
  return slug === "general";
}

/** Canonical home path for a signed-in partner (always their own space). */
export function partnerHomePath(email: string): string {
  if (isPartnerAdmin(email)) return "/partner/big-five-group";
  const n = normalizeEmail(email);
  const p = PARTNERS.find((x) => x.emails.map(normalizeEmail).includes(n));
  return p ? `/partner/${p.slug}` : "/partner/general";
}

/**
 * After login: non-admins always go to their home.
 * Admins may deep-link to any /partner/[slug] (except login).
 */
export function resolvePostLoginPath(email: string, requestedFrom?: string | null): string {
  const home = partnerHomePath(email);
  if (!isPartnerAdmin(email)) return home;
  const from = (requestedFrom ?? "").trim();
  if (!from.startsWith("/partner")) return home;
  if (from === "/partner" || from === "/partner/" || from.startsWith("/partner/login")) {
    return home;
  }
  // /partner/[slug] or nested under it
  const m = from.match(/^\/partner\/([a-z0-9-]+)/i);
  if (!m?.[1]) return home;
  if (!getPartnerBySlug(m[1])) return home;
  return `/partner/${m[1]}`;
}

/** Admin-only directory cards (no emails). */
export function getPartnerDirectoryEntries(): PartnerDirectoryEntry[] {
  return PARTNERS.filter((p) => !PARTNER_DIRECTORY_HIDDEN_SLUGS.has(p.slug)).map((p) => ({
    slug: p.slug,
    name: p.name,
    organisation: p.organisation,
    role: p.role,
    summary: p.summary,
    logoSrc: p.logoSrc,
  }));
}


