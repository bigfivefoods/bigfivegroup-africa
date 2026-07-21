/**
 * Partner portal registry — one profile per partner organisation.
 *
 * To add a partner:
 * 1. Copy an entry below (unique `slug`)
 * 2. List login emails on that partner (lowercase)
 * 3. Customise headline, summary, focus, notes, resources
 *
 * Optional: PARTNER_EMAILS env still works for ad-hoc emails; they land on
 * the generic "partners" briefing if not mapped here.
 */

export type PartnerResource = {
  href: string;
  label: string;
  desc: string;
};

export type PartnerProgrammeId = "nsnp" | "santaco" | "connect" | "leadership" | "impact";

export type PartnerProfile = {
  /** URL segment: /partner/[slug] */
  slug: string;
  /** Short display name */
  name: string;
  organisation: string;
  /** Emails that may open this partner page (lowercase) */
  emails: string[];
  /** If true, can open any /partner/[slug] after login */
  admin?: boolean;
  /** Partner type label */
  role: string;
  headline: string;
  summary: string;
  /** Pillar or theme focus chips */
  focus: string[];
  /** Custom bullets for this partner only */
  notes?: string[];
  /** Which shared programme blocks to show */
  programmes?: PartnerProgrammeId[];
  /** Extra resource links (merged with defaults) */
  resources?: PartnerResource[];
  contactNote?: string;
};

/** Default resources shown to every partner (can be overridden/extended per partner). */
export const DEFAULT_PARTNER_RESOURCES: PartnerResource[] = [
  {
    href: "/partner-kit",
    label: "Partner kit",
    desc: "One-page pack: mission, NSNP case, Super-Cube®, how to engage.",
  },
  {
    href: "/methodology",
    label: "Methodology",
    desc: "How we label ambition vs programme-reported vs internal analysis.",
  },
  {
    href: "/foods#foods-deck",
    label: "Foods product deck",
    desc: "Fortified nutrition, NSNP pathway, institutional economics.",
  },
  {
    href: "/direct#santaco",
    label: "Direct × SANTACO",
    desc: "Container rollout plan at taxi ranks and rural communities.",
  },
  {
    href: "/connect",
    label: "Connect · SupplierAdvisor®",
    desc: "Verified trade OS, trial and commercial pathways.",
  },
  {
    href: "/impact#strategy-deck",
    label: "Impact strategy deck",
    desc: "Group overview and African problem/response framing.",
  },
];

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
    notes: [
      "You can open any partner workspace from the directory below after sign-in.",
      "Add new partners in app/lib/partners.ts — each gets /partner/[slug].",
    ],
    contactNote: "Internal — coordinate partner onboarding via Group leadership.",
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
    name: "DM Africa",
    organisation: "DM Africa",
    emails: ["daniel@dmafrica.com"],
    role: "Strategic partner",
    headline: "DM Africa × Big Five Group",
    summary:
      "Private briefing for DM Africa — Group mission, flagship programmes, and partnership resources for your organisation.",
    focus: ["Foods", "Impact", "Leadership", "Connect"],
    programmes: ["nsnp", "connect", "leadership", "impact"],
    notes: [
      "Customise focus areas and notes as the partnership deepens.",
      "Request programme-specific packs via the contact section when you need more than public decks.",
    ],
    contactNote: "Primary Group contact: craig@bigfivegroup.africa",
  },
  /**
   * Fallback workspace for emails on PARTNER_EMAILS env not mapped above.
   * Do not list real partner emails here unless intentional.
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

/** All emails that may log into the partner portal (from partner profiles). */
export function getPartnerEmailsFromRegistry(): string[] {
  const emails: string[] = [];
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

/** Resolve partner profile for a signed-in email. */
export function getPartnerByEmail(email: string): PartnerProfile | undefined {
  const n = normalizeEmail(email);
  const match = PARTNERS.find((p) => p.emails.map(normalizeEmail).includes(n));
  if (match) return match;
  // Env-only emails fall through to general briefing
  return getPartnerBySlug("general");
}

export function isPartnerAdmin(email: string): boolean {
  const p = getPartnerByEmail(email);
  return Boolean(p?.admin);
}

/** Can this email view this partner slug? */
export function canAccessPartnerPage(email: string, slug: string): boolean {
  if (isPartnerAdmin(email)) return true;
  const partner = getPartnerByEmail(email);
  if (!partner) return false;
  return partner.slug === slug;
}

export function partnerHomePath(email: string): string {
  const p = getPartnerByEmail(email);
  return p ? `/partner/${p.slug}` : "/partner/general";
}

export function mergePartnerResources(partner: PartnerProfile): PartnerResource[] {
  const custom = partner.resources ?? [];
  const seen = new Set(custom.map((r) => r.href));
  return [...custom, ...DEFAULT_PARTNER_RESOURCES.filter((r) => !seen.has(r.href))];
}
