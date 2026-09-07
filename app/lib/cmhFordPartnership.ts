/**
 * CMH Ford Group × Big Five Foods — feeding-scheme partnership model.
 * Dealers buy fortified porridges & one-pots direct from Big Five Foods for
 * Ford Building Together / dealer food-drive and CSI feeding initiatives.
 *
 * Aligns to Ford SA / Ford.com community impact (food security, dealer food
 * drives, Global Caring Month) — without claiming Ford trademarks beyond
 * public programme framing for partner briefing.
 */

const TRADE_EX_VAT = 45;
const SERVINGS_PER_PACK = 20; // 1kg dry → 4kg prepared → 20 × 200g
const PREPARED_KG = 4;
const SERVING_G = 200;
const SHELF_LIFE_MONTHS = 24;
const COST_PER_MEAL = TRADE_EX_VAT / SERVINGS_PER_PACK; // R2.25

export const CMH_FORD_PARTNERSHIP = {
  title: "CMH Ford Group × Big Five Foods",
  subtitle: "Fuel the Ford feeding scheme — more meals, less rand, longer shelf life.",
  tagline:
    "Buy fortified porridges and one-pot meals direct from Big Five Foods at R45 a pack — 24-month shelf life, 4kg prepared food, R2.25 per meal.",
  groupUrl: "https://www.bigfivegroup.africa",
  foodsUrl: "https://www.bigfivegroup.africa/foods",
  cmhUrl: "https://cmhford.co.za/",
  fordZaUrl: "https://www.ford.co.za/",
  fordComUrl: "https://www.ford.com/",
  contactEmail: "craig@bigfivegroup.africa",

  /**
   * Public Ford community / ESG framing (partner briefing — cite Ford sources).
   * @see https://www.ford.co.za/about-ford/ford-news/2025/ford-building-together/
   * @see Ford Media: Ford Building Together (SA) — food security & dealer food drives
   * @see Ford Media: Global Caring Month · Nelson Mandela Foundation food partnership history
   */
  fordAlignment: {
    foundingFrame: "Ford Building Together",
    brandPromise: "Go Further",
    pillars: [
      {
        t: "Food security",
        d: "Ford Building Together in South Africa centres community development, education, food security and disaster relief — dealer food drives invite the public to bring non-perishables to Ford dealers nationwide.",
      },
      {
        t: "Dealer food drives",
        d: "Global Ford dealers host food drives with trusted non-profits and food banks. In SA, customers find participating dealers via ford.co.za — CMH Ford can stock purpose-ready fortified staples, not only ad-hoc pantry goods.",
      },
      {
        t: "Global Caring Month",
        d: "Annual Ford volunteer and dealer network projects across plants and dealerships — feeding schemes and community uplift have long been part of Ford Fund and dealer CSI in South Africa.",
      },
      {
        t: "Proven hunger partnerships",
        d: "Ford SA has partnered with the Nelson Mandela Foundation on food relief, supported Meals on Wheels with vehicles, and funded NPO feeding schemes through Ford Fund grants — this offer extends that lineage with efficient, shelf-stable nutrition.",
      },
    ],
    howWeAlign: [
      "Direct purchase of fortified Big Five Foods packs for CMH Ford / Ford feeding-scheme and food-drive CSI — predictable cost, nutrition and logistics.",
      "24-month shelf life suits dealership storage and multi-month drive calendars without spoilage waste.",
      "1kg pack → 4kg prepared food = 20 meals at R2.25 each — stretch every CSI rand further than many perishable or single-serve alternatives.",
      "Reporting-ready: pack counts, meal equivalents and rand spent for ESG / CSI packs.",
    ],
    sources: [
      {
        label: "Ford Building Together (SA)",
        href: "https://www.ford.co.za/about-ford/ford-news/2025/ford-building-together/",
      },
      {
        label: "Ford.co.za",
        href: "https://www.ford.co.za/",
      },
      {
        label: "Ford.com",
        href: "https://www.ford.com/",
      },
    ],
  },

  product: {
    currency: "ZAR",
    tradeExVat: TRADE_EX_VAT,
    tradeExVatLabel: "R45",
    tradeNote:
      "CSI / feeding-scheme purchase price per 1kg pack — fortified porridge or one-pot meal, bought direct from Big Five Foods.",
    shelfLifeMonths: SHELF_LIFE_MONTHS,
    shelfLifeLabel: "24 months",
    shelfLifeDetail:
      "Long shelf life means CMH Ford can buy ahead of Global Caring Month, Mandela Day and dealer food drives — store safely at the dealership and deploy when communities need it, with far less waste than short-dated or fresh donations.",
    yield: {
      dryPackKg: 1,
      preparedKg: PREPARED_KG,
      servingGrams: SERVING_G,
      servingsPerPack: SERVINGS_PER_PACK,
      costPerMeal: COST_PER_MEAL,
      costPerMealLabel: `R${COST_PER_MEAL.toFixed(2)}`,
      headline: "1kg dry pack → 4kg prepared food = 20 × 200g meals",
      costLine: `R45 ÷ 20 meals = R${COST_PER_MEAL.toFixed(2)} per meal`,
      detail:
        "Each 1kg Big Five Foods fortified porridge or one-pot pack makes 4kg of food when prepared — that is 20 × 200g servings. At R45 per pack, every meal costs R2.25. Clear maths for CSI committees and ESG reporting.",
    },
    skus: [
      {
        id: "porridge",
        title: "Fortified Porridges",
        packSize: "1kg",
        tradeLabel: "R45",
        tagline: "Breakfast that builds — vitamin-enriched, familiar flavours",
        heroImage: "/foods/porridge-banana.jpg",
        blurb:
          "Instant fortified porridges for ECD centres, school-linked kitchens and household hampers — designed for growing children and care settings without a cold chain.",
        serve: "Hot breakfast · after-school · care centres · hampers",
      },
      {
        id: "onepot",
        title: "One-Pot Meals",
        packSize: "1kg",
        tradeLabel: "R45",
        tagline: "A complete fortified plate in one pack",
        heroImage: "/foods/onepot-chicken.jpg",
        /** Flagship feeding-scheme claim — always surface in decks */
        stats: "1kg one-pot → 4kg prepared food = 20 × 200g meals · R2.25 / meal",
        yieldLine: "1kg dry one-pot pack provides 4kg of food when prepared",
        blurb:
          "Ready-to-cook complete meals with authentic African flavours. A 1kg one-pot pack provides 4kg of food when prepared — that is 20 × 200g meals at R2.25 each (R45 ÷ 20).",
        serve: "Community kitchens · CSI hampers · institutional menus · 20 plates per pack",
      },
    ],
  },

  /** Illustrative purchasing scenarios for feeding-scheme planning. */
  scaleExamples: [
    {
      packs: 1_000,
      label: "Pilot · 1,000 packs",
      spend: 1_000 * TRADE_EX_VAT,
      meals: 1_000 * SERVINGS_PER_PACK,
      peopleFedOneMealDay: (1_000 * SERVINGS_PER_PACK) / 365,
    },
    {
      packs: 5_000,
      label: "Dealer cluster · 5,000 packs",
      spend: 5_000 * TRADE_EX_VAT,
      meals: 5_000 * SERVINGS_PER_PACK,
      peopleFedOneMealDay: (5_000 * SERVINGS_PER_PACK) / 365,
    },
    {
      packs: 10_000,
      label: "Group drive · 10,000 packs",
      spend: 10_000 * TRADE_EX_VAT,
      meals: 10_000 * SERVINGS_PER_PACK,
      peopleFedOneMealDay: (10_000 * SERVINGS_PER_PACK) / 365,
    },
  ],

  /** Why this stretches CSI further than many alternatives. */
  valueCase: {
    title: "Reach more people for way less money",
    points: [
      {
        t: "R2.25 per fortified meal",
        d: "At R45 per pack and 20 servings, meal cost is transparent and low — stretch every CSI rand further than many single-serve or short-dated options.",
      },
      {
        t: "4× prepared yield",
        d: "1kg dry becomes 4kg of food — volume that filling schemes can see and serve, not just a light pantry top-up.",
      },
      {
        t: "24-month shelf life",
        d: "Buy once, store at the dealership, deploy across the year — less spoilage, fewer emergency purchases, better planning for Global Caring Month and ongoing drives.",
      },
      {
        t: "Nutrition with dignity",
        d: "Fortified porridges and complete one-pots — meals people recognise and want to eat, aligned with food-security goals not empty calories.",
      },
    ],
    comparisonNote:
      "Illustrative: many hot-meal or parcel programmes budget several rand per serving once logistics and waste are included. At R2.25 per 200g fortified serving from a shelf-stable pack, CMH Ford can multiply meal equivalents from the same CSI budget — confirm against your current feeding-scheme unit cost.",
  },

  pathways: [
    {
      id: "buy-direct",
      title: "Buy direct from Big Five Foods",
      desc: "CMH Ford Group purchases fortified porridges and one-pots at R45 per 1kg pack for the Ford feeding scheme / dealer food-drive CSI — simple trade, clear SKUs, invoice trail for ESG.",
    },
    {
      id: "store-deploy",
      title: "Store at the dealership · deploy when needed",
      desc: "24-month shelf life lets dealers hold stock for drives, Mandela Day, disaster response and weekly scheme drop-offs without cold chain.",
    },
    {
      id: "report",
      title: "Report meals, not only kilograms",
      desc: "Pack counts × 20 = meal equivalents; rand spent and people reached for CSI / Ford Building Together reporting.",
    },
  ],

  roadmap: [
    {
      n: "01",
      t: "Align",
      d: "Confirm CMH Ford Group CSI lead, feeding-scheme partners, and pilot pack volumes (porridge + one-pot mix).",
    },
    {
      n: "02",
      t: "Order",
      d: "Purchase direct from Big Five Foods at R45 / 1kg pack — fortified porridge and one-pot SKUs.",
    },
    {
      n: "03",
      t: "Activate",
      d: "Stock dealerships for Ford Building Together food drives and ongoing scheme deliveries — Ballito and wider CMH Ford network.",
    },
    {
      n: "04",
      t: "Prove",
      d: "Quarterly pack: packs bought, meal equivalents, rand, photos and partner stories for ESG packs.",
    },
  ],

  honesty: [
    "Trade price of R45 per 1kg pack (fortified porridge or one-pot) is the feeding-scheme / CSI purchase price from Big Five Foods — confirm VAT treatment and SKU list on the order form / term sheet.",
    "Yield claim: 1kg dry pack prepares to approximately 4kg of food = 20 × 200g servings; R45 ÷ 20 = R2.25 per meal. Preparation water, fuel and kitchen labour are outside this pack cost.",
    "24-month shelf life is product design / stated shelf life under correct storage — follow pack instructions and FIFO at the dealership.",
    "Ford Building Together, Global Caring Month and dealer food drives are Ford public programmes; this briefing proposes how CMH Ford can supply fortified staples into those CSI pathways — it is not a Ford Motor Company endorsement.",
    "Scale examples (1k / 5k / 10k packs) are illustrative planning figures, not forecasts or commitments.",
  ],
} as const;

export function formatZar(n: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatZarPrecise(n: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(n);
}
