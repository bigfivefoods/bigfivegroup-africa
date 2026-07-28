/**
 * Feed · Educate · Empower — pillar grouping for home + Group nav dropdown.
 */

export type PillarMissionId = "feed" | "educate" | "empower";

export type PillarMission = {
  id: PillarMissionId;
  label: string;
  mission: string;
  blurb: string;
  accent: string;
  accentSoft: string;
  accentDark: string;
  /** Company slugs in display order */
  slugs: string[];
};

export const PILLAR_MISSIONS: PillarMission[] = [
  {
    id: "feed",
    label: "01 · Feed",
    mission: "Feed",
    blurb: "Regenerate land and put fortified nutrition on plates — farm gate to school kitchen.",
    accent: "#d97706",
    accentSoft: "#fffbeb",
    accentDark: "#b45309",
    slugs: ["agri", "foods"],
  },
  {
    id: "educate",
    label: "02 · Educate",
    mission: "Educate",
    blurb: "Whole-person leadership for executives, public servants and the next generation.",
    accent: "#eab308",
    accentSoft: "#fefce8",
    accentDark: "#a16207",
    slugs: ["leadership"],
  },
  {
    id: "empower",
    label: "03 · Empower",
    mission: "Empower",
    blurb:
      "Last-mile rails, capital access, verified trade, impact delivery and global corridors.",
    accent: "#059669",
    accentSoft: "#ecfdf5",
    accentDark: "#065f46",
    slugs: ["connect", "direct", "access", "impact", "global", "foundation"],
  },
];
