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

  /**
   * Ring-fenced giving model for this CMH Ford × Big Five Foods partnership:
   * 10% of partnership product turnover — CMH Ford 5% + Big Five Foods 5% —
   * ring-fenced to Restore Africa Foundation and A Heart To Help (GBV).
   * Base = trade purchase price R45 (feeding-scheme / donation packs).
   */
  giving: {
    totalPct: 10,
    cmhFordPct: 5,
    foodsPct: 5,
    label: "10% of partnership product turnover",
    detail:
      "Together, CMH Ford Group and Big Five Foods ring-fence 10% of partnership product turnover on feeding-scheme packs (CMH Ford 5% + Big Five Foods 5%) so every donation purchase also supports Restore Africa Foundation and A Heart To Help — the GBV safety and rehabilitation NPO.",
    bases: {
      cmhFord:
        "CMH Ford: 5% of donation / feeding-scheme purchase value (at R45 per pack) — CSI spend CMH already commits.",
      foods:
        "Big Five Foods: 5% of trade turnover on packs sold to CMH Ford (at R45) — matching CMH Ford’s commitment.",
    },
    perPack: {
      basis: "Per 1kg pack purchased at R45",
      cmhFord: TRADE_EX_VAT * 0.05, // R2.25
      foods: TRADE_EX_VAT * 0.05, // R2.25
      total: TRADE_EX_VAT * 0.1, // R4.50
      cmhFordLabel: `R${(TRADE_EX_VAT * 0.05).toFixed(2)}`,
      foodsLabel: `R${(TRADE_EX_VAT * 0.05).toFixed(2)}`,
      totalLabel: `R${(TRADE_EX_VAT * 0.1).toFixed(2)}`,
    },
    beneficiaries: "Restore Africa Foundation · A Heart To Help (GBV)",
    example: {
      units: 10_000,
      label: "Illustrative · 10,000 packs purchased for the feeding scheme",
      tradeTurnover: 10_000 * TRADE_EX_VAT,
      cmhFordContribution: 10_000 * TRADE_EX_VAT * 0.05,
      foodsContribution: 10_000 * TRADE_EX_VAT * 0.05,
      get combined() {
        return this.cmhFordContribution + this.foodsContribution;
      },
    },
  },

  npos: [
    {
      slug: "restore-africa-foundation",
      name: "Restore Africa Foundation",
      short: "RAF",
      role: "NPC · children · community rebuild · KZN",
      summary:
        "Registered Non-Profit Company investing in South Africa’s children — nutritious support, school-linked programmes (e.g. Veggies4Kids), and community rebuild after crisis. KZN North Coast roots (Ballito / Ballitoville) — natural adjacency to CMH Ford Ballito.",
      focus: ["Children first", "School nutrition skills", "Community rebuild", "KZN"],
      logoSrc: "/partners/restore-africa-foundation-logo.png",
      brandColor: "#0F5A37",
      website: "https://www.facebook.com/p/Restore-Africa-Foundation-61573115377603/",
    },
    {
      slug: "a-heart-to-help",
      name: "A Heart To Help",
      short: "AHTH",
      role: "NPO · GBV safety · rehabilitation",
      summary:
        "Supports women experiencing gender-based violence — and their children — with safety, counselling, skills development and pathways to independence. Building the Freedom Farm centre on the KZN North Coast as proof of concept for a national network.",
      focus: ["GBV safety", "Skills", "Independence", "KZN North Coast"],
      logoSrc: "/partners/a-heart-to-help-logo.png",
      brandColor: "#0E4A4D",
      website: "https://ahearttohelp.co.za/",
    },
  ],

  /**
   * UN SDG alignment for the CMH Ford × Big Five Foods feeding partnership.
   * Official UN colour tiles: public/sdg/sdg-{n}.png · https://sdgs.un.org/goals
   */
  sdgAlignment: [
    {
      number: "1",
      title: "No Poverty",
      icon: "/sdg/sdg-1.png",
      color: "#E5243B",
      how: "Affordable fortified meals (R2.25 each) stretch CSI budgets so more households in need are reached — dignity on the plate, not only a rand transferred.",
    },
    {
      number: "2",
      title: "Zero Hunger",
      icon: "/sdg/sdg-2.png",
      color: "#DDA63A",
      how: "Core of this partnership: 1kg one-pot → 4kg food · 20 meals · 24-month shelf life — dealer food drives and feeding schemes that actually fill plates.",
    },
    {
      number: "4",
      title: "Quality Education",
      icon: "/sdg/sdg-4.png",
      color: "#C5192D",
      how: "Fortified porridge and meals for children and ECD / school-linked kitchens — hungry children cannot learn; fed children can.",
    },
    {
      number: "8",
      title: "Decent Work & Growth",
      icon: "/sdg/sdg-8.png",
      color: "#A21942",
      how: "Local South African fortified food production and ethical supply — CSI spend that also supports domestic manufacturing and jobs.",
    },
    {
      number: "10",
      title: "Reduced Inequalities",
      icon: "/sdg/sdg-10.png",
      color: "#DD1367",
      how: "5%+5% to Restore Africa Foundation and A Heart To Help (GBV) — children and women historically left behind get nutrition and safety pathways.",
    },
    {
      number: "17",
      title: "Partnerships for the Goals",
      icon: "/sdg/sdg-17.png",
      color: "#19486A",
      how: "CMH Ford × Big Five Foods × RAF × AHTH — private-sector CSI aligned to Ford Building Together and the UN 2030 Agenda with reportable meal KPIs.",
    },
  ],

  africaImpact: {
    title: "Why this matters for South Africa — and Africa",
    points: [
      {
        t: "Africa still carries the largest hunger burden",
        d: "SOFI 2026: about one in five people in Africa faced hunger in 2025 — the region with the largest number of people facing hunger. Efficient, fortified, shelf-stable CSI is not optional; it is strategic.",
      },
      {
        t: "South Africa needs practical CSI that scales",
        d: "Dealer networks already sit in communities. Turning Ford Building Together food drives into fortified meal equivalents (R2.25/meal · 24-month stock) multiplies impact from the same rand.",
      },
      {
        t: "A model for the continent",
        d: "What CMH Ford proves in KZN / SA — buy direct, store safely, feed more, report SDGs — can travel with Ford’s dealer footprint and African partners who share Zero Hunger ambitions.",
      },
      {
        t: "ESG you can count",
        d: "Packs × 20 = meals; 10% to RAF & AHTH; official SDG icons for board and sustainability packs — contribution language governments and DFIs recognise.",
      },
    ],
    sofiNote:
      "Hunger figures: UN SOFI 2026 (FAO / IFAD / UNICEF / WFP / WHO) — external multi-agency estimates, not Big Five or Ford audited counts.",
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
      id: "foundations",
      title: "5% + 5% to RAF & A Heart To Help",
      desc: "CMH Ford 5% + Big Five Foods 5% of pack turnover ring-fenced to Restore Africa Foundation and A Heart To Help (GBV) — on top of the meals delivered.",
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
      d: "Purchase direct from Big Five Foods at R45 / 1kg pack — fortified porridge and one-pot SKUs; lock CMH 5% + Foods 5% to RAF & A Heart To Help.",
    },
    {
      n: "03",
      t: "Activate",
      d: "Stock dealerships for Ford Building Together food drives and ongoing scheme deliveries — Ballito and wider CMH Ford network.",
    },
    {
      n: "04",
      t: "Prove",
      d: "Quarterly pack: packs bought, meal equivalents, rand to RAF / AHTH, photos and partner stories for ESG packs.",
    },
  ],

  honesty: [
    "Trade price of R45 per 1kg pack (fortified porridge or one-pot) is the feeding-scheme / CSI purchase price from Big Five Foods — confirm VAT treatment and SKU list on the order form / term sheet.",
    "Yield claim: 1kg dry pack prepares to approximately 4kg of food = 20 × 200g servings; R45 ÷ 20 = R2.25 per meal. Preparation water, fuel and kitchen labour are outside this pack cost.",
    "24-month shelf life is product design / stated shelf life under correct storage — follow pack instructions and FIFO at the dealership.",
    "Giving model: CMH Ford 5% + Big Five Foods 5% (10% total) of partnership pack turnover at R45, ring-fenced to Restore Africa Foundation and A Heart To Help (GBV organisation). Legal wording and NPO split (e.g. 50/50) sit in the commercial / CSI agreement.",
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
