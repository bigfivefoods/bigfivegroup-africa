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
} as const;
