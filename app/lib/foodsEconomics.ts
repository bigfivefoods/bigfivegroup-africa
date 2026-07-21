/**
 * Big Five Foods commercial / unit-economics framing.
 * Figures are management / internal analyses unless restated under NDA with dates.
 */

export const FOODS_ECONOMICS = {
  grossProfit: {
    value: "~45%",
    label: "Gross profit (GP)",
    detail:
      "Foods gross profits of approximately 45% (management-reported) on fortified SKU economics — attractive unit economics while remaining highly price-competitive.",
  },
  cheaperThanMarket: {
    value: "~85%",
    label: "Cheaper vs wholesale & retail",
    detail:
      "Still approximately 85% cheaper than comparable wholesale and retail pathways (internal cost comparison) — positioning Big Five Foods as super-competitive for government, institutional menus and feeding schemes.",
  },
  nutritionDesign: {
    value: "74%",
    label: "More nutrition by design",
    detail: "Internal nutrition-design comparison vs alternative formulations (not a clinical claim).",
  },
  positioning:
    "High GP (~45%) with ~85% cost advantage vs wholesale/retail makes Foods a default institutional choice: governments and feeding schemes can stretch budgets while the Group retains healthy margin on recurring volume.",
  honesty:
    "GP and cost-advantage figures are management-reported / internal analyses — request a dated NDA brief for SKU-level margins, pack formats and comparison scopes. Not audited financial statements.",
  /**
   * Relative cost index for investor visual (illustrative).
   * Wholesale / retail set at 100; Foods institutional pathway ~15 (= ~85% cheaper).
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
      index: 15,
      note: "~85% cheaper · still ~45% GP · feeding-scheme ready",
      tone: "foods" as const,
    },
  ],
  whyGovernment:
    "Public menus and feeding schemes buy on cost, nutrition and reliability. Foods offers a structural cost advantage vs wholesale/retail while holding ~45% GP — so institutions stretch budgets and the Group compounds recurring volume.",
} as const;
