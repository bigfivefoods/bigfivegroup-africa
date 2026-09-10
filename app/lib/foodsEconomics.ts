/**
 * Big Five Foods commercial / unit-economics framing.
 * Figures are management / internal analyses unless restated under NDA with dates.
 *
 * Gross profit (~45% GP) is investor-confidential — use `grossProfit` / `*WithGp`
 * only on investor surfaces. Public site and partner portal must not cite GP%.
 */

export const FOODS_ECONOMICS = {
  /**
   * Investor-only. Do not render on public pages or partner portals.
   */
  grossProfit: {
    value: "~45%",
    label: "Gross profit (GP)",
    detail:
      "Foods gross profits of approximately 45% (management-reported) on fortified SKU economics — attractive unit economics while remaining highly price-competitive.",
  },
  cheaperThanMarket: {
    value: "~50%",
    label: "Cheaper vs wholesale & retail",
    detail:
      "Approximately 50% cheaper than comparable wholesale and retail pathways (internal cost comparison) — positioning Big Five Foods as super-competitive for government, institutional menus and feeding schemes.",
  },
  nutritionDesign: {
    value: "74%",
    label: "More nutrition by design",
    detail: "Internal nutrition-design comparison vs alternative formulations (not a clinical claim).",
  },
  /** Public / partner-safe — no GP% */
  positioning:
    "A ~50% cost advantage vs wholesale/retail makes Foods a default institutional choice: governments and feeding schemes can stretch budgets while recurring volume compounds.",
  /** Public / partner-safe — no GP% */
  honesty:
    "Cost-advantage figures are management-reported / internal analyses — request a dated NDA brief for SKU-level comparisons, pack formats and scopes. Not audited financial statements.",
  /**
   * Relative cost index for competitive visuals (illustrative).
   * Wholesale / retail set at 100; Foods institutional pathway ~50 (= ~50% cheaper).
   * Note text is public-safe (no GP).
   */
  competitiveIndex: [
    {
      channel: "Typical retail path",
      index: 100,
      note: "Higher shelf / last-mile mark-up stack",
      tone: "retail" as const,
    },
    {
      channel: "Typical wholesale path",
      index: 100,
      note: "Indexed wholesale comparison baseline (internal)",
      tone: "wholesale" as const,
    },
    {
      channel: "Big Five Foods (institutional)",
      index: 50,
      note: "~50% cheaper · feeding-scheme ready",
      tone: "foods" as const,
    },
  ],
  /** Public / partner-safe — no GP% */
  whyGovernment:
    "Public menus and feeding schemes buy on cost, nutrition and reliability. Foods offers a structural ~50% cost advantage vs wholesale/retail — so institutions stretch budgets while the Group compounds recurring volume.",

  /** Investor-only copy that includes GP% */
  positioningWithGp:
    "High GP (~45%) with ~50% cost advantage vs wholesale/retail makes Foods a default institutional choice: governments and feeding schemes can stretch budgets while the Group retains healthy margin on recurring volume.",
  honestyWithGp:
    "GP and cost-advantage figures are management-reported / internal analyses — request a dated NDA brief for SKU-level margins, pack formats and comparison scopes. Not audited financial statements.",
  whyGovernmentWithGp:
    "Public menus and feeding schemes buy on cost, nutrition and reliability. Foods offers a structural ~50% cost advantage vs wholesale/retail while holding ~45% GP — so institutions stretch budgets and the Group compounds recurring volume.",
  competitiveIndexFoodsNoteWithGp: "~50% cheaper · still ~45% GP · feeding-scheme ready",
} as const;
