/**
 * Per-page visual identity: unique hero + exclusive accent palette.
 * Neutral greys (#fafafa, #525252, black/white) are shared site chrome.
 * Accent colors should only appear on their own page.
 */
export type PageBrand = {
  slug: string;
  hero: string;
  /** Primary brand hex */
  accent: string;
  /** Darker for solid sections / CTAs */
  accentDark: string;
  /** Soft tint for backgrounds */
  accentSoft: string;
  /** Light text on dark brand panels */
  accentLight: string;
  /** Hero overlay class */
  overlay: string;
  eyebrow: string;
};

export const pageBrand = {
  agri: {
    slug: "agri",
    hero: "/agri-hero.jpg",
    accent: "#10b981",
    accentDark: "#047857",
    accentSoft: "#ecfdf5",
    accentLight: "#6ee7b7",
    overlay: "bg-black/45",
    eyebrow: "PILLAR 01 · REGENERATIVE FARMING",
  },
  foods: {
    slug: "foods",
    hero: "/foods-hero.jpg",
    accent: "#f59e0b",
    accentDark: "#b45309",
    accentSoft: "#fffbeb",
    accentLight: "#fcd34d",
    overlay: "bg-black/50",
    eyebrow: "PILLAR 02 · FORTIFIED NUTRITION",
  },
  direct: {
    slug: "direct",
    hero: "/direct-hero.jpg",
    accent: "#f97316",
    accentDark: "#c2410c",
    accentSoft: "#fff7ed",
    accentLight: "#fdba74",
    overlay: "bg-[#431407]/55",
    eyebrow: "PILLAR 03 · DIRECT MARKET ACCESS",
  },
  access: {
    slug: "access",
    hero: "/access-hero.jpg",
    accent: "#3b82f6",
    accentDark: "#1d4ed8",
    accentSoft: "#eff6ff",
    accentLight: "#93c5fd",
    overlay: "bg-[#1e3a8a]/55",
    eyebrow: "PILLAR 04 · GOVERNMENT & INSTITUTIONAL ACCESS",
  },
  connect: {
    slug: "connect",
    hero: "/connect-hero.jpg",
    accent: "#06b6d4",
    accentDark: "#0e7490",
    accentSoft: "#ecfeff",
    accentLight: "#67e8f9",
    overlay: "bg-black/50",
    eyebrow: "PILLAR · CONNECT · SUPPLIERADVISOR®",
  },
  impact: {
    slug: "impact",
    hero: "/impact-hero.jpg",
    accent: "#7c3aed",
    accentDark: "#5b21b6",
    accentSoft: "#f5f3ff",
    accentLight: "#c4b5fd",
    overlay: "bg-[#2e1065]/55",
    eyebrow: "PILLAR · BIG FIVE IMPACT",
  },
  leadership: {
    slug: "leadership",
    hero: "/leadership-hero.jpg",
    accent: "#eab308",
    accentDark: "#a16207",
    accentSoft: "#fefce8",
    accentLight: "#fde047",
    overlay: "bg-black/55",
    eyebrow: "BIG FIVE LEADERSHIP · EDUCATION ARM",
  },
  foundation: {
    slug: "foundation",
    hero: "/foundation-hero.jpg",
    accent: "#0d9488",
    accentDark: "#0f766e",
    accentSoft: "#f0fdfa",
    accentLight: "#5eead4",
    overlay: "bg-black/45",
    eyebrow: "REGISTERED NPO · SOUTH AFRICA",
  },
  global: {
    slug: "global",
    hero: "/global-hero.jpg",
    accent: "#0ea5e9",
    accentDark: "#0369a1",
    accentSoft: "#f0f9ff",
    accentLight: "#7dd3fc",
    overlay: "bg-black/50",
    eyebrow: "BIG FIVE GLOBAL",
  },
  africa: {
    slug: "africa",
    hero: "/africa-hero.jpg",
    accent: "#059669",
    accentDark: "#065f46",
    accentSoft: "#ecfdf5",
    accentLight: "#6ee7b7",
    overlay: "bg-black/40",
    eyebrow: "CONTINENT · 54 NATIONS",
  },
  royal: {
    slug: "royal",
    hero: "/tribal.jpg",
    accent: "#d97706",
    accentDark: "#92400e",
    accentSoft: "#fffbeb",
    accentLight: "#fbbf24",
    overlay: "bg-black/60",
    eyebrow: "ROYAL PARTNERSHIP · COMMUNITY FIRST",
  },
  about: {
    slug: "about",
    hero: "/about-hero.jpg",
    accent: "#111827",
    accentDark: "#030712",
    accentSoft: "#f3f4f6",
    accentLight: "#d1d5db",
    overlay: "bg-black/55",
    eyebrow: "ABOUT BIG FIVE GROUP",
  },
} as const satisfies Record<string, PageBrand>;

export type PageBrandKey = keyof typeof pageBrand;
