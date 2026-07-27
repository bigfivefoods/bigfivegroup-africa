/**
 * Resolve story tag → business unit / pillar visual identity.
 */

import { pageBrand, type PageBrand, type PageBrandKey } from "../pageBrand";

export type MissionPillar = "Feed" | "Educate" | "Empower" | "Group";

export type StoryTheme = {
  key: PageBrandKey | "group";
  brand: PageBrand;
  mission: MissionPillar;
  unitLabel: string;
  unitHref: string;
};

const GROUP_BRAND: PageBrand = {
  slug: "group",
  hero: "/home-hero.jpg",
  accent: "#059669",
  accentDark: "#065f46",
  accentSoft: "#ecfdf5",
  accentLight: "#6ee7b7",
  overlay: "bg-black/55",
  eyebrow: "BIG FIVE GROUP · FEED · EDUCATE · EMPOWER",
};

const UNIT: Record<
  string,
  { key: PageBrandKey | "group"; mission: MissionPillar; unitLabel: string; unitHref: string }
> = {
  foods: { key: "foods", mission: "Feed", unitLabel: "Big Five Foods", unitHref: "/foods" },
  nsnp: { key: "foods", mission: "Feed", unitLabel: "Foods · NSNP", unitHref: "/foods" },
  agri: { key: "agri", mission: "Feed", unitLabel: "Big Five Agri", unitHref: "/agri" },
  spar: { key: "foods", mission: "Feed", unitLabel: "Foods · SPAR", unitHref: "/foods" },
  direct: { key: "direct", mission: "Empower", unitLabel: "Big Five Direct", unitHref: "/direct" },
  santaco: { key: "direct", mission: "Empower", unitLabel: "Direct · SANTACO", unitHref: "/direct" },
  access: { key: "access", mission: "Empower", unitLabel: "Big Five Access", unitHref: "/access" },
  connect: { key: "connect", mission: "Empower", unitLabel: "Big Five Connect", unitHref: "/connect" },
  supplier: { key: "connect", mission: "Empower", unitLabel: "Connect · SupplierAdvisor®", unitHref: "/connect" },
  sam: { key: "connect", mission: "Empower", unitLabel: "Connect · SAM", unitHref: "/connect/sam" },
  leadership: {
    key: "leadership",
    mission: "Educate",
    unitLabel: "Big Five Leadership",
    unitHref: "/leadership",
  },
  "super-cube": {
    key: "leadership",
    mission: "Educate",
    unitLabel: "Leadership · Super-Cube®",
    unitHref: "/leadership",
  },
  supercube: {
    key: "leadership",
    mission: "Educate",
    unitLabel: "Leadership · Super-Cube®",
    unitHref: "/leadership",
  },
  educate: {
    key: "leadership",
    mission: "Educate",
    unitLabel: "Leadership",
    unitHref: "/leadership",
  },
  foundation: {
    key: "foundation",
    mission: "Empower",
    unitLabel: "Restore Africa Foundation",
    unitHref: "/foundation",
  },
  impact: { key: "impact", mission: "Empower", unitLabel: "Big Five Impact", unitHref: "/impact" },
  partnership: {
    key: "impact",
    mission: "Empower",
    unitLabel: "Partnerships",
    unitHref: "/impact",
  },
  global: { key: "global", mission: "Group", unitLabel: "Big Five Global", unitHref: "/global" },
  africa: { key: "africa", mission: "Group", unitLabel: "Africa", unitHref: "/africa" },
  royal: { key: "royal", mission: "Empower", unitLabel: "Royal", unitHref: "/royal" },
  group: { key: "group", mission: "Group", unitLabel: "Big Five Group", unitHref: "/group" },
};

function brandFor(key: PageBrandKey | "group"): PageBrand {
  if (key === "group") return GROUP_BRAND;
  return pageBrand[key];
}

/** Infer theme from story tag (and optional title/slug for hints). */
export function resolveStoryTheme(tag: string, hint = ""): StoryTheme {
  const hay = `${tag} ${hint}`.toLowerCase();

  const order = [
    "nsnp",
    "spar",
    "santaco",
    "supplier",
    "supercube",
    "super-cube",
    "sam",
    "foods",
    "agri",
    "direct",
    "access",
    "connect",
    "leadership",
    "educate",
    "foundation",
    "impact",
    "partnership",
    "global",
    "africa",
    "royal",
    "group",
  ] as const;

  for (const key of order) {
    if (hay.includes(key) || hay.includes(key.replace("-", " "))) {
      const u = UNIT[key] ?? UNIT.group;
      return {
        key: u.key,
        brand: brandFor(u.key),
        mission: u.mission,
        unitLabel: u.unitLabel,
        unitHref: u.unitHref,
      };
    }
  }

  // Fallback: Foods-ish tags often say "porridge" etc.
  if (/porridge|soya|nutrition|school meal/i.test(hay)) {
    const u = UNIT.foods;
    return { key: u.key, brand: brandFor(u.key), mission: u.mission, unitLabel: u.unitLabel, unitHref: u.unitHref };
  }

  const u = UNIT.group;
  return {
    key: "group",
    brand: GROUP_BRAND,
    mission: "Group",
    unitLabel: u.unitLabel,
    unitHref: u.unitHref,
  };
}

/** Cover image: story override → pillar hero fallback. */
export function storyCoverImage(coverImage: string | undefined, theme: StoryTheme): string {
  if (coverImage?.trim()) return coverImage.trim();
  return theme.brand.hero;
}

export function missionAccent(mission: MissionPillar): string {
  switch (mission) {
    case "Feed":
      return "#d97706";
    case "Educate":
      return "#eab308";
    case "Empower":
      return "#059669";
    default:
      return "#059669";
  }
}

/**
 * Small brand mark for story covers / heroes by mission pillar:
 * Feed → Big Five Foods · Educate → Super-Cube® · Empower / Group → Big Five Group
 */
export function missionLogo(mission: MissionPillar): {
  src: string;
  alt: string;
  /** Plate behind logo so the mark reads on any photo */
  plate: "light" | "dark";
} {
  switch (mission) {
    case "Feed":
      return {
        src: "/bigfivefoods-logo.png",
        alt: "Big Five Foods",
        plate: "light",
      };
    case "Educate":
      return {
        src: "/super-cube-logo-transparent.png",
        alt: "Super-Cube®",
        plate: "light",
      };
    case "Empower":
    case "Group":
    default:
      return {
        src: "/bigfivegroup-logo.png",
        alt: "Big Five Group",
        plate: "dark",
      };
  }
}
