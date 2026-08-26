/**
 * Shared types for operating-company business plans on the investor portal.
 * Plans are long-form diligence documents (target ~10–15 printed pages).
 */

export type BusinessPlanStat = {
  value: string;
  label: string;
  note?: string;
};

export type BusinessPlanTableRow = {
  cells: string[];
};

export type BusinessPlanTable = {
  caption?: string;
  headers: string[];
  rows: BusinessPlanTableRow[];
  footnote?: string;
};

export type BusinessPlanBlock =
  | { type: "paragraph"; text: string }
  | { type: "lead"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "callout"; title: string; body: string; tone?: "amber" | "emerald" | "slate" }
  | { type: "stats"; items: BusinessPlanStat[] }
  | { type: "table"; table: BusinessPlanTable }
  | { type: "quote"; text: string; attribution?: string };

export type BusinessPlanChapter = {
  /** Print page / TOC number (01–15) */
  n: string;
  id: string;
  title: string;
  eyebrow?: string;
  blocks: BusinessPlanBlock[];
};

export type BusinessPlanMeta = {
  slug: string;
  opcoSlug: string;
  companyName: string;
  fullTitle: string;
  subtitle: string;
  version: string;
  asOf: string;
  classification: string;
  pageTarget: string;
  disclaimer: string;
};

export type BusinessPlan = {
  meta: BusinessPlanMeta;
  coverStats: BusinessPlanStat[];
  executiveHighlights: string[];
  chapters: BusinessPlanChapter[];
  closing: {
    title: string;
    body: string;
    cta: string;
  };
};
