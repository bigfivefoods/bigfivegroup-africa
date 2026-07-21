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
    slug: "spar",
    name: "SPAR",
    organisation: "SPAR South Africa",
    emails: [],
    role: "Retail · fresh · community stores",
    headline: "SPAR × Big Five Group",
    summary:
      "Partnership workspace for SPAR South Africa and Big Five Group — retail and distribution pathways for fortified African staples, with verified supply and route-to-market discipline (spar.co.za).",
    focus: ["Foods", "Direct", "Connect", "Global"],
    programmes: ["nsnp", "santaco", "connect"],
    logoSrc: "/partners/spar-logo.png",
    brandColor: "#006633",
    website: "https://www.spar.co.za/Home",
    websiteLabel: "spar.co.za",
    notes: [
      "SPAR branding and mark sourced from spar.co.za for co-branded partner briefing.",
      "Retail pathways for Big Five Foods ranges — shelf-stable formats, fortification story and clear brand.",
      "Connect / SupplierAdvisor® for verified trade where applicable.",
      "Add authorised SPAR emails to this profile when portal logins are ready.",
    ],
    resources: [
      {
        href: "/foods",
        label: "Big Five Foods",
        desc: "Product ranges, fortification story and institutional/retail packs.",
      },
      {
        href: "/global",
        label: "Global corridors",
        desc: "Route-to-market and distribution partnership framing.",
      },
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa · SPAR commercial discussions under NDA as required",
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
 * Non-admins may only open their own organisation workspace.
 * Ad-hoc allowlist emails (env) may only open /partner/general.
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


