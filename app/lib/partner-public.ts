/**
 * Client-safe partner portal types and helpers.
 * Do not put login emails or admin flags here — those stay in partners.ts (server).
 */

export type PartnerResource = {
  href: string;
  label: string;
  desc: string;
};

export type PartnerProgrammeId = "nsnp" | "santaco" | "connect" | "leadership" | "impact";

/** Fields safe to render in the browser. */
export type ClientPartnerProfile = {
  slug: string;
  name: string;
  organisation: string;
  role: string;
  headline: string;
  summary: string;
  focus: string[];
  notes?: string[];
  programmes?: PartnerProgrammeId[];
  resources?: PartnerResource[];
  contactNote?: string;
  logoSrc?: string;
  brandColor?: string;
  website?: string;
  websiteLabel?: string;
};

export type PartnerDirectoryEntry = {
  slug: string;
  name: string;
  organisation: string;
  role: string;
  summary: string;
  logoSrc?: string;
};

export const BIG_FIVE_LOGO = "/bigfivegroup-logo.png";

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

export function mergePartnerResources(
  partner: Pick<ClientPartnerProfile, "resources">
): PartnerResource[] {
  const custom = partner.resources ?? [];
  const seen = new Set(custom.map((r) => r.href));
  return [...custom, ...DEFAULT_PARTNER_RESOURCES.filter((r) => !seen.has(r.href))];
}
