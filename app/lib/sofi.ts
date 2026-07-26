/**
 * UN SOFI — State of Food Security and Nutrition in the World
 *
 * Latest edition: SOFI 2026 (released July 2026) — FAO / IFAD / UNICEF / WFP / WHO.
 * Headline undernourishment / hunger figures refer to calendar year 2025 unless noted.
 *
 * Use only for external context on decks and investor materials. Do not present as
 * Big Five audited metrics. Prefer point estimates with cautious wording.
 *
 * Primary references:
 * - https://www.fao.org/publications/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en
 * - https://www.fao.org/newsroom/detail/sofi-2026--hunger-not-inevitable--fao-says-as-global-hunger-report-shows-progress/en
 * - SOFI 2025 (prior year) for indicators not yet restated: healthy-diet affordability trend,
 *   moderate/severe food insecurity 2024, child stunting 2024 JME.
 */

export const SOFI = {
  edition: "SOFI 2026",
  agencies: "FAO · IFAD · UNICEF · WFP · WHO",
  dataYearHunger: 2025,
  reportUrl:
    "https://www.fao.org/publications/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en",
  newsUrl:
    "https://www.fao.org/newsroom/detail/sofi-2026--hunger-not-inevitable--fao-says-as-global-hunger-report-shows-progress/en",
  /** Prior edition (data year 2024) — still useful for food insecurity & child nutrition JME */
  priorEdition: "SOFI 2025",
  priorNewsUrl:
    "https://www.who.int/news/item/28-07-2025-global-hunger-declines-but-rises-in-africa-and-western-asia-un-report",
  unicefBriefUrl: "https://data.unicef.org/resources/sofi-2025/",

  /** Global prevalence of undernourishment (PoU) / hunger — SOFI 2026 */
  global: {
    hungryMillion: 645,
    hungryLabel: "645M",
    prevalencePct: 7.8,
    /** Range when agencies publish uncertainty band */
    rangeMillion: { low: 608, high: 696 },
    vsPriorYearNote: "~14 million fewer people than in 2024; ~43 million fewer than the 2022 peak",
    stillAbove2015Note: "Levels remain far above the SDG Zero Hunger trajectory",
  },

  /** Africa — SOFI 2026 (data year 2025) */
  africa: {
    hungryMillion: 309,
    hungryLabel: "309M",
    prevalencePct: 20.0,
    prevalenceNote:
      "About one in five people in Africa faced hunger in 2025; prevalence eased slightly from 20.3% in 2024 (first interruption of the upward trend since 2017) while absolute numbers remain extremely high",
    epicentreNote:
      "Africa is the region with the largest number of people facing hunger (overtaking Asia in the latest SOFI reading)",
  },

  /** 2030 outlook (still widely cited from SOFI 2025; confirm in full SOFI 2026 tables if restated) */
  outlook2030: {
    chronicallyUndernourishedMillion: 512,
    shareInAfricaApprox: "~60%",
    note: "If current trends continue, hundreds of millions could still face chronic undernourishment by 2030 — with Africa carrying the majority share",
  },

  /**
   * Economic access to healthy diets — SOFI 2026 headline
   * (distinct from moderate/severe food insecurity FIES).
   */
  healthyDiets: {
    cannotAffordBillion: 2.7,
    cannotAffordLabel: "2.7B",
    note: "About 2.7 billion people worldwide cannot afford a healthy diet (SOFI 2026)",
  },

  /**
   * Moderate or severe food insecurity (FIES) — last clear multi-agency restatement in SOFI 2025
   * for calendar year 2024. Keep labelled as 2024 until SOFI 2026 full tables are applied.
   */
  foodInsecurity2024: {
    peopleBillion: 2.3,
    peopleLabel: "2.3B",
    prevalencePct: 28.0,
    note: "About 2.3 billion people experienced moderate or severe food insecurity in 2024 (SOFI 2025)",
  },

  /** Child nutrition — JME / SOFI framing (2024 estimates widely cited with SOFI 2025) */
  childNutrition: {
    stuntingPrevalence2024Pct: 23.2,
    stuntedChildrenMillion2024: 150,
    stuntedLabel: "150M",
    stuntingNote:
      "Global stunting among children under five fell to about 23.2% in 2024 (~150 million children) — progress, but off-track for 2030",
    ssaHighStuntingNote:
      "West/Central and East/Southern Africa still show very high stunting prevalence for roughly one in three children in hard-hit areas",
  },

  shortCite: "SOFI 2026 · FAO / IFAD / UNICEF / WFP / WHO",
} as const;

/** Compact stats for deck tiles */
export const SOFI_DECK_STATS = {
  africaHunger: {
    value: SOFI.africa.hungryLabel,
    label: `People in Africa faced hunger in ${SOFI.dataYearHunger} (~${SOFI.africa.prevalencePct}% of the population · SOFI 2026)`,
  },
  globalHunger: {
    value: SOFI.global.hungryLabel,
    label: `People globally faced hunger in ${SOFI.dataYearHunger} (~${SOFI.global.prevalencePct}% · SOFI 2026)`,
  },
  africaShare2030: {
    value: SOFI.outlook2030.shareInAfricaApprox,
    label: "Of people projected undernourished by 2030 could be in Africa (SOFI pathway)",
  },
  healthyDiets: {
    value: SOFI.healthyDiets.cannotAffordLabel,
    label: "People worldwide who cannot afford a healthy diet (SOFI 2026)",
  },
  foodInsecurity: {
    value: SOFI.foodInsecurity2024.peopleLabel,
    label: "People with moderate or severe food insecurity in 2024 (SOFI 2025)",
  },
  childStunting: {
    value: SOFI.childNutrition.stuntedLabel,
    label: "Children under 5 stunted globally in 2024 (UNICEF/WHO/WB JME · SOFI)",
  },
} as const;
