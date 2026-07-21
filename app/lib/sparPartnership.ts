/**
 * SPAR × Big Five Foods partnership model — SPAR-facing narrative.
 * Emphasise SPAR margin + SPAR doing good. Never expose Big Five Foods GP.
 * Figures for commercial discussion; formal terms under NDA / signed term sheet.
 */

/** SA standard VAT rate used only to align trade (ex. VAT) with RRP (incl. VAT). */
const VAT_RATE = 0.15;

const TRADE_EX_VAT = 45;
const RRP_INCL_VAT = 67;
/** Cost to SPAR on an incl.-VAT basis for margin comparison with RRP */
const TRADE_INCL_VAT = TRADE_EX_VAT * (1 + VAT_RATE);
/** Indicative front margin rands per pack at RRP (incl. VAT shelf vs cost incl. VAT) */
const SPAR_MARGIN_RAND = RRP_INCL_VAT - TRADE_INCL_VAT;
/** Indicative front margin % of RRP (incl. VAT) */
const SPAR_MARGIN_PCT = (SPAR_MARGIN_RAND / RRP_INCL_VAT) * 100;

export const SPAR_PARTNERSHIP = {
  title: "SPAR × Big Five Foods",
  subtitle: "SPAR leads. Communities eat better. Foundations go further.",
  tagline: "Every SPAR pack can nourish a family and strengthen a foundation.",
  groupUrl: "https://www.bigfivegroup.africa",
  foodsUrl: "https://www.bigfivegroup.africa/foods",
  sparUrl: "https://www.spar.co.za/Home",
  contactEmail: "craig@bigfivegroup.africa",

  /** Flagship partnership SKU / campaign pricing (Nelson Mandela pack). */
  product: {
    name: "Big Five Foods · fortified staple (Nelson Mandela campaign pack)",
    tradePriceExVat: TRADE_EX_VAT,
    tradePriceExVatLabel: "R45",
    tradePriceNote: "SPAR cost price · exclusive of VAT",
    rrpInclVat: RRP_INCL_VAT,
    rrpInclVatLabel: "R67",
    rrpNote: "Recommended retail price · inclusive of VAT · Nelson Mandela pack",
    currency: "ZAR",
    vatRate: VAT_RATE,
    vatNote:
      "Trade is quoted ex. VAT (R45). RRP R67 is inclusive of VAT for the Nelson Mandela campaign pack. SPAR margin below aligns cost to an incl.-VAT basis at 15% VAT for a fair shelf comparison.",
    campaignLine:
      "Nelson Mandela pack — purpose-led shelf range: four fortified African categories, one clear RRP, SPAR margin, and 10% ring-fenced for foundations.",
  },

  /**
   * Mandela pack range — all four Big Five Foods categories for SPAR shelf / donation.
   * Pricing model (R45 / R67) applies to agreed campaign SKUs; pack sizes locked on term sheet.
   */
  mandelaPackRanges: [
    {
      id: "porridge",
      title: "Fortified Porridges",
      tagline: "Breakfast that builds — not empty cereal calories",
      heroImage: "/foods/porridge-chocolate.jpg",
      flavours: [
        { name: "Chocolate", image: "/foods/porridge-chocolate.jpg" },
        { name: "Banana", image: "/foods/porridge-banana.jpg" },
        { name: "Original", image: "/foods/porridge-original.jpg" },
        { name: "Strawberry", image: "/foods/porridge-strawberry.jpg" },
      ],
      stats: "74% more nutrition design · 185% more fortification · school & household ready",
      blurb:
        "Instant, vitamin-enriched porridges on local maize where formulation allows — familiar flavours families and ECD centres already accept. Designed for growing children, care settings and busy households that need reliable fortification without a cold chain.",
      nutrition:
        "Essential minerals, B-vitamins, fibre, calcium, magnesium, phosphorus and iron — micronutrient density aimed at hidden hunger, not only fill.",
      sparAngle:
        "High-velocity breakfast aisle story: Mandela purpose + kids nutrition. Easy prep demo for store tasting. Strong donation SKU for ECD and school-linked programmes.",
      serve: "Hot breakfast · after-school · care centres · household staple",
    },
    {
      id: "soya",
      title: "Soya Mince",
      tagline: "Affordable protein that stretches every pot",
      heroImage: "/foods/soya-beef.jpg",
      flavours: [
        { name: "Chilli Beef", image: "/foods/soya-chilli-beef.jpg" },
        { name: "Beef & Onion", image: "/foods/soya-beef-onion.jpg" },
        { name: "Rich Beef", image: "/foods/soya-beef.jpg" },
        { name: "Mutton", image: "/foods/soya-mutton.jpg" },
      ],
      stats: "From ±R1.30 / meal · 24.4% more protein · long shelf life",
      blurb:
        "Plant-based protein mince in culturally familiar formats for stews, pap and institutional menus. Gives SPAR shoppers a protein upgrade when meat prices spike — and gives foundations a stable protein line without cold-chain meat logistics.",
      nutrition:
        "High plant protein at low cost — lifts protein quality in starch-heavy diets and supports protein-energy security for families under pressure.",
      sparAngle:
        "Value protein for the main meal occasion. Clear Mandela-pack shelf talker: “protein with purpose.” Ideal CSI bulk for community kitchens and feeding days.",
      serve: "Stews · mince meals · catering · NGO & household protein stretch",
    },
    {
      id: "onepot",
      title: "One-Pot Meals",
      tagline: "A complete plate in one pack",
      heroImage: "/foods/onepot-chakalaka.jpg",
      flavours: [
        { name: "Chakalaka", image: "/foods/onepot-chakalaka.jpg" },
        { name: "Beef", image: "/foods/onepot-beef.jpg" },
        { name: "Chicken", image: "/foods/onepot-chicken.jpg" },
        { name: "Chilli Beef", image: "/foods/onepot-chilli-beef.jpg" },
      ],
      stats: "From ±R2.50 / meal · ~20 min cook · ~24-month shelf life",
      blurb:
        "Ready-to-cook complete meals with balanced fortification and authentic African flavours. One SKU becomes a plate — less dependency on multi-ingredient shopping when prices rise or cupboards are thin.",
      nutrition:
        "Protein plus vitamins A & D, iron and calcium in a whole-meal format — fights calorie gaps and micronutrient deficiency together.",
      sparAngle:
        "Premium-feel convenience with purpose: busy families, students, workers. Hero pack for Mandela Day endcaps and donation hampers that feel dignified, not bare.",
      serve: "Weeknight dinners · workplaces · CSI hampers · institutional menus",
    },
    {
      id: "soup",
      title: "Fortified Soups",
      tagline: "Warmth, flavour and micronutrients at the lowest cost point",
      heroImage: "/foods/soup-chicken.jpg",
      flavours: [
        { name: "Brown Onion", image: "/foods/soup-brown-onion.jpg" },
        { name: "Oxtail", image: "/foods/soup-oxtail.jpg" },
        { name: "Minestrone", image: "/foods/soup-minestrone.jpg" },
        { name: "Chicken", image: "/foods/soup-chicken.jpg" },
      ],
      stats: "From ±R1.10 / meal · vitamins A & C · iron · calcium",
      blurb:
        "Fortified instant soup thickeners in classic South African flavours — elders, children and clinics already trust the format. Extends food budgets and fills the plate between main meals when fuel and time are scarce.",
      nutrition:
        "Vitamins A & C, iron and calcium in an everyday format — micronutrient top-up without medical claims beyond fortification design.",
      sparAngle:
        "Entry price point for first trial purchase. High acceptance gift/donation line. Easy multipack for SPAR loyalty and Mandela campaign baskets.",
      serve: "Households · clinics · ECD · emergency & community kitchens",
    },
  ] as const,

  /**
   * SPAR store / retailer economics — what SPAR makes (not Big Five GP).
   */
  sparMargin: {
    tradeExVat: TRADE_EX_VAT,
    tradeInclVatAligned: TRADE_INCL_VAT,
    rrpInclVat: RRP_INCL_VAT,
    marginRand: SPAR_MARGIN_RAND,
    marginPctOfRrp: SPAR_MARGIN_PCT,
    marginRandLabel: `R${SPAR_MARGIN_RAND.toFixed(2)}`,
    marginPctLabel: `~${Math.round(SPAR_MARGIN_PCT)}%`,
    headline: "Healthy front margin for SPAR on every pack sold at RRP",
    detail:
      "At R45 ex. VAT cost and R67 incl. VAT RRP, SPAR’s indicative front margin is about R15.25 per pack (~23% of RRP) after aligning cost to 15% VAT — before any promotional activity. Exact store economics depend on franchisee costs and local pricing discipline.",
    honesty:
      "Margin figures are illustrative front margin (RRP less VAT-aligned cost). They exclude store overheads, promotions, shrink and the 5% SPAR contribution to foundations. Confirm on the term sheet.",
  },

  /**
   * 10% of partnership product turnover to NPO / feeding support:
   * SPAR 5% + Big Five Foods 5%.
   */
  giving: {
    totalPct: 10,
    sparPct: 5,
    foodsPct: 5,
    label: "10% of partnership product turnover",
    detail:
      "Together, SPAR and Big Five Foods ring-fence 10% of partnership product turnover (SPAR 5% + Big Five Foods 5%) so every sale also supports Restore Africa Foundation and A Heart To Help — SPAR as the face of good in the community.",
    bases: {
      spar:
        "SPAR: 5% of retail sell-through value of partnership SKUs (at RRP, incl. VAT) — customer-facing volume SPAR already owns.",
      foods:
        "Big Five Foods: 5% of trade turnover on partnership SKUs sold to SPAR (at R45 ex. VAT) — matching SPAR’s commitment.",
    },
    perUnitIllustrative: {
      atRrp: {
        basis: "Per unit sold at RRP R67 (incl. VAT)",
        spar: RRP_INCL_VAT * 0.05,
        foods: RRP_INCL_VAT * 0.05,
        total: RRP_INCL_VAT * 0.1,
      },
      atTrade: {
        basis: "Per unit on trade price R45 (ex. VAT) — Foods contribution base",
        foods: TRADE_EX_VAT * 0.05,
      },
    },
    example: {
      units: 100_000,
      label: "Illustrative · 100,000 packs sold through SPAR",
      sparRetailTurnover: 100_000 * RRP_INCL_VAT,
      foodsTradeTurnover: 100_000 * TRADE_EX_VAT,
      sparContribution: 100_000 * RRP_INCL_VAT * 0.05,
      foodsContribution: 100_000 * TRADE_EX_VAT * 0.05,
      sparMarginPool: 100_000 * SPAR_MARGIN_RAND,
      get combined() {
        return this.sparContribution + this.foodsContribution;
      },
    },
  },

  pathways: [
    {
      id: "retail",
      title: "SPAR sells with purpose",
      desc: "Stock the Mandela pack at RRP R67. Shoppers leave with fortified food; SPAR earns margin and funds community good from sell-through.",
    },
    {
      id: "donate",
      title: "SPAR donates with dignity",
      desc: "SPAR CSI or franchisees purchase product for Restore Africa Foundation and A Heart To Help — real meals into real programmes, with SPAR’s name on the act of care.",
    },
    {
      id: "hybrid",
      title: "SPAR campaigns that stick",
      desc: "Shelf sales + Mandela Day / hunger-season drives + store collections. One pack, two impact routes, one story: SPAR does good.",
    },
  ],

  npos: [
    {
      slug: "restore-africa-foundation",
      name: "Restore Africa Foundation",
      short: "RAF",
      role: "NPC · children · community rebuild · KZN",
      summary:
        "Registered Non-Profit Company investing in South Africa’s children — nutritious support, school-linked programmes (e.g. Veggies4Kids), and community rebuild after crisis. KZN North Coast roots; access to grow school partnerships with Department of Education pathways.",
      focus: ["Children first", "School nutrition skills", "Community rebuild", "KZN"],
      contact: "Ballitoville · KZN",
      website: "https://www.facebook.com/p/Restore-Africa-Foundation-61573115377603/",
      websiteLabel: "Restore Africa Foundation (Facebook)",
      logoSrc: "/partners/restore-africa-foundation-logo.png",
      brandColor: "#0F5A37",
    },
    {
      slug: "a-heart-to-help",
      name: "A Heart To Help",
      short: "AHTH",
      role: "NPO · GBV safety · rehabilitation",
      summary:
        "Supports women experiencing abuse — and their children — with safety, counselling, skills development and pathways to independence. Building the Freedom Farm centre on the KZN North Coast as proof of concept for a national network.",
      focus: ["Safety", "Skills", "Independence", "KZN North Coast"],
      contact: "info@ahearttohelp.co.za",
      website: "https://ahearttohelp.co.za/",
      websiteLabel: "ahearttohelp.co.za",
      logoSrc: "/partners/a-heart-to-help-logo.png",
      brandColor: "#0E4A4D",
    },
  ],

  /** SPAR-centred narrative outcomes */
  outcomes: [
    {
      t: "SPAR as a force for good",
      d: "Every Mandela pack sold or donated carries SPAR’s community leadership — not abstract CSI, but food people can eat.",
    },
    {
      t: "Shoppers feel the difference",
      d: "Affordable fortified staples on SPAR shelves; a clear Mandela-aligned story customers are proud to support.",
    },
    {
      t: "Foundations go further",
      d: "Restore Africa Foundation and A Heart To Help receive product and contribution rand — programmes that restore children, women and communities.",
    },
    {
      t: "Stores win commercially",
      d: "Healthy front margin at R67 RRP, plus a purpose line that strengthens SPAR’s local reputation and loyalty.",
    },
  ],

  sparStory: [
    {
      t: "SPAR feeds",
      d: "Put fortified African staples where families already shop — dignity on the shelf, not only in a warehouse.",
    },
    {
      t: "SPAR funds",
      d: "Ring-fence 5% of sell-through; Big Five Foods matches with 5% of trade — 10% total into verified NPO pathways.",
    },
    {
      t: "SPAR stands with foundations",
      d: "Restore Africa Foundation (children · rebuild) and A Heart To Help (safety · rehabilitation) — partners SPAR can name and visit.",
    },
    {
      t: "SPAR leads the narrative",
      d: "Mandela pack, store campaigns, franchisee CSI — SPAR is the hero of the story; Big Five Foods is the product partner behind the shelf.",
    },
  ],

  roadmap: [
    {
      n: "01",
      t: "Align",
      d: "Term sheet: SKUs, pricing (R45 / R67), SPAR margin discipline, 5%+5% giving, NPO beneficiaries, SPAR brand story.",
    },
    {
      n: "02",
      t: "List",
      d: "Range listing, pilot SPAR clusters, planograms, staff brief and Mandela / “SPAR does good” creative.",
    },
    {
      n: "03",
      t: "Launch",
      d: "Shelf live + optional donation PO pathway. Celebrate first packs sold and first packs donated with store teams.",
    },
    {
      n: "04",
      t: "Prove",
      d: "Quarterly SPAR impact pack: units, rand to NPOs, foundation stories and photos — content SPAR can share.",
    },
    {
      n: "05",
      t: "Scale",
      d: "More stores, more SKUs, Mandela Day / hunger season / back-to-school — SPAR’s good becomes a national rhythm.",
    },
  ],

  /** Product credibility for SPAR buyers — no supplier GP or internal cost advantage. */
  productCredibility: [
    {
      t: "Fortified for real need",
      d: "Designed for households and community kitchens — micronutrients and protein formats families accept.",
    },
    {
      t: "Shelf-stable & practical",
      d: "Long shelf life, simple prep — works for SPAR inventory and for foundation donations.",
    },
    {
      t: "Certified manufacture",
      d: "ISO, FSSC, Halaal, Kosher, Sedex and SupplierAdvisor® verification pathways for retail confidence.",
    },
    {
      t: "Institutional delivery experience",
      d: "Group experience on national school-nutrition pathways — discipline SPAR can trust in a partner.",
    },
    {
      t: "Proud African brand story",
      d: "Mandela campaign pack gives SPAR a purpose line customers understand in one glance.",
    },
  ],

  honesty: [
    "R45 ex. VAT trade and R67 incl. VAT RRP are proposed partnership prices for the Nelson Mandela campaign pack — confirm pack size, SKU list and VAT treatment on the term sheet.",
    "SPAR margin figures are illustrative front margin (RRP less cost aligned at 15% VAT). They are not net store profit and exclude overheads, promotions, shrink and the 5% SPAR contribution.",
    "5% + 5% giving bases (SPAR retail sell-through vs Foods trade turnover) are the recommended model; legal wording sits in the commercial agreement.",
    "NPO allocations between Restore Africa Foundation and A Heart To Help can be fixed (e.g. 50/50) or programme-driven each period.",
    "Impact meal counts and programme stories are illustrative until pack yields and menus are locked with each foundation.",
    "National SPAR store counts, packs/store/month and people-fed estimates in the impact report are modelling assumptions for discussion — not audited SPAR network data or forecasts.",
  ],

  /**
   * Illustrative national impact model across SPAR South Africa formats.
   * Store counts and velocity are assumptions for partnership planning — replace with SPAR
   * network data on term sheet. Not a sales forecast.
   */
  impactReport: {
    title: "National SPAR impact model (illustrative)",
    period: "Per full year at steady-state listing",
    disclaimer:
      "Assumptions for partnership discussion only. Store counts and sales rates are not official SPAR figures and must be replaced with SPAR network data. Front margin is not net store profit. Meal and people-fed estimates use conservative servings-per-pack assumptions.",
    unitAssumptions: {
      tradeExVat: TRADE_EX_VAT,
      rrpInclVat: RRP_INCL_VAT,
      sparFrontMarginPerPack: SPAR_MARGIN_RAND,
      servingsPerPack: 5,
      servingsNote:
        "Conservative blended average across porridge, soya, one-pot and soup SKUs (~4–8 servings depending on format).",
      peopleFedMethod:
        "Meal equivalents ÷ 365 ≈ people fed one meal a day for a year (illustrative, not unique individuals).",
      donationShareOfSales: 0.02,
      donationNote: "2% of sell-through volume assumed as CSI / franchisee donation POs (illustrative).",
    },
    /** Format tiers — illustrative order-of-magnitude network shape for SA SPAR estate */
    storeTiers: [
      {
        format: "KWIKSPAR / convenience",
        stores: 750,
        packsPerStorePerMonth: 35,
        note: "High footfall, smaller basket — trial multipacks",
      },
      {
        format: "SPAR",
        stores: 950,
        packsPerStorePerMonth: 70,
        note: "Core neighbourhood store — main Mandela pack velocity",
      },
      {
        format: "SUPERSPAR / large format",
        stores: 450,
        packsPerStorePerMonth: 140,
        note: "Destination shops — range depth + promo endcaps",
      },
      {
        format: "SPAR Tops / specialty (modelled share)",
        stores: 150,
        packsPerStorePerMonth: 20,
        note: "Select listings where grocery adjacency allows",
      },
    ],
  },
} as const;

/** Build computed national impact rows from store tiers + unit economics. */
export function buildSparImpactReport() {
  const ir = SPAR_PARTNERSHIP.impactReport;
  const u = ir.unitAssumptions;
  const months = 12;

  const tiers = ir.storeTiers.map((t) => {
    const packsYear = t.stores * t.packsPerStorePerMonth * months;
    const retailTurnover = packsYear * u.rrpInclVat;
    const tradeTurnover = packsYear * u.tradeExVat;
    const sparFrontMargin = packsYear * u.sparFrontMarginPerPack;
    const sparGive5 = retailTurnover * 0.05;
    const foodsGive5 = tradeTurnover * 0.05;
    const combined10 = sparGive5 + foodsGive5;
    const mealEquivalents = packsYear * u.servingsPerPack;
    const peopleFedOneMealDay = mealEquivalents / 365;
    const donatedPacks = packsYear * u.donationShareOfSales;
    const donatedMeals = donatedPacks * u.servingsPerPack;

    return {
      ...t,
      packsYear,
      retailTurnover,
      tradeTurnover,
      sparFrontMargin,
      sparGive5,
      foodsGive5,
      combined10,
      mealEquivalents,
      peopleFedOneMealDay,
      donatedPacks,
      donatedMeals,
    };
  });

  const sum = <K extends keyof (typeof tiers)[number]>(key: K) =>
    tiers.reduce((a, r) => a + (r[key] as number), 0);

  const national = {
    stores: sum("stores"),
    packsYear: sum("packsYear"),
    retailTurnover: sum("retailTurnover"),
    tradeTurnover: sum("tradeTurnover"),
    sparFrontMargin: sum("sparFrontMargin"),
    sparGive5: sum("sparGive5"),
    foodsGive5: sum("foodsGive5"),
    combined10: sum("combined10"),
    mealEquivalents: sum("mealEquivalents"),
    peopleFedOneMealDay: sum("peopleFedOneMealDay"),
    donatedPacks: sum("donatedPacks"),
    donatedMeals: sum("donatedMeals"),
    packsPerStorePerMonthBlended: sum("packsYear") / sum("stores") / months,
  };

  /** Pilot slice — 5% of national stores at same velocity (for roadmap realism) */
  const pilotFactor = 0.05;
  const pilot = {
    stores: Math.round(national.stores * pilotFactor),
    packsYear: Math.round(national.packsYear * pilotFactor),
    retailTurnover: national.retailTurnover * pilotFactor,
    sparFrontMargin: national.sparFrontMargin * pilotFactor,
    combined10: national.combined10 * pilotFactor,
    mealEquivalents: Math.round(national.mealEquivalents * pilotFactor),
    peopleFedOneMealDay: national.peopleFedOneMealDay * pilotFactor,
  };

  return { ...ir, tiers, national, pilot, months };
}

export type SparImpactReport = ReturnType<typeof buildSparImpactReport>;

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
