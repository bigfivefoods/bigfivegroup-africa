/**
 * Pick n Pay × Big Five Foods partnership model — Pick n Pay-facing narrative.
 * Emphasise Pick n Pay margin + Pick n Pay doing good. Never expose Big Five Foods GP.
 * Same Mandela pack commercial model as SPAR partnership (R45/R67 · R18/R33.50 · 10% giving).
 * Figures for commercial discussion; formal terms under NDA / signed term sheet.
 */

/** SA standard VAT rate used only to align trade (ex. VAT) with RRP (incl. VAT). */
const VAT_RATE = 0.15;

/** Mandela 1kg pack — One-Pot + Fortified Porridges */
const TRADE_EX_VAT_1KG = 45;
const RRP_INCL_VAT_1KG = 67;
const TRADE_INCL_VAT_1KG = TRADE_EX_VAT_1KG * (1 + VAT_RATE); // 51.75
const MARGIN_RAND_1KG = RRP_INCL_VAT_1KG - TRADE_INCL_VAT_1KG; // 15.25
const MARGIN_PCT_1KG = (MARGIN_RAND_1KG / RRP_INCL_VAT_1KG) * 100; // ~22.8%

/** 400g pack — Soya Mince + Fortified Soups */
const TRADE_EX_VAT_400G = 18;
const RRP_INCL_VAT_400G = 33.5;
const TRADE_INCL_VAT_400G = TRADE_EX_VAT_400G * (1 + VAT_RATE); // 20.70
const MARGIN_RAND_400G = RRP_INCL_VAT_400G - TRADE_INCL_VAT_400G; // 12.80
const MARGIN_PCT_400G = (MARGIN_RAND_400G / RRP_INCL_VAT_400G) * 100; // ~38.2%

/** @deprecated aliases — flagship 1kg Mandela pack (kept for impact model / legacy refs) */
const TRADE_EX_VAT = TRADE_EX_VAT_1KG;
const RRP_INCL_VAT = RRP_INCL_VAT_1KG;
const TRADE_INCL_VAT = TRADE_INCL_VAT_1KG;
const PNP_MARGIN_RAND = MARGIN_RAND_1KG;
const PNP_MARGIN_PCT = MARGIN_PCT_1KG;

/**
 * Flagship 1kg one-pot prepared yield (Mandela pack economics for shoppers).
 * 1kg dry → 4kg prepared food → 20 × 200g servings · R67 RRP ÷ 20 = R3.35 / meal.
 */
const ONE_POT_DRY_KG = 1;
const ONE_POT_PREPARED_KG = 4;
const ONE_POT_SERVING_G = 200;
const ONE_POT_SERVINGS = (ONE_POT_PREPARED_KG * 1000) / ONE_POT_SERVING_G; // 20
const ONE_POT_COST_PER_SERVING = RRP_INCL_VAT_1KG / ONE_POT_SERVINGS; // 3.35

function packPricing(
  packSize: string,
  tradeExVat: number,
  rrpInclVat: number,
  categories: string
) {
  const tradeIncl = tradeExVat * (1 + VAT_RATE);
  const marginRand = rrpInclVat - tradeIncl;
  const marginPct = (marginRand / rrpInclVat) * 100;
  const tradeLabel = `R${tradeExVat % 1 === 0 ? tradeExVat.toFixed(0) : tradeExVat.toFixed(2)}`;
  const rrpLabel = `R${rrpInclVat % 1 === 0 ? rrpInclVat.toFixed(0) : rrpInclVat.toFixed(2)}`;
  return {
    packSize,
    categories,
    tradeExVat,
    tradeExVatLabel: tradeLabel,
    tradeInclVatAligned: tradeIncl,
    tradeInclVatLabel: `R${tradeIncl.toFixed(2)}`,
    rrpInclVat,
    rrpInclVatLabel: rrpLabel,
    marginRand,
    marginRandLabel: `R${marginRand.toFixed(2)}`,
    marginPctOfRrp: marginPct,
    marginPctLabel: `~${Math.round(marginPct)}%`,
  };
}

export const PICK_N_PAY_PARTNERSHIP = {
  title: "Pick n Pay × Big Five Foods",
  subtitle: "Pick n Pay leads. Communities eat better. Foundations go further.",
  tagline: "Every Pick n Pay pack can nourish a family and strengthen a foundation.",
  groupUrl: "https://www.bigfivegroup.africa",
  foodsUrl: "https://www.bigfivegroup.africa/foods",
  picknPayUrl: "https://www.pnp.co.za/",
  contactEmail: "craig@bigfivegroup.africa",

  /** Flagship partnership SKU / campaign pricing (two pack tiers). */
  product: {
    name: "Big Five Foods · fortified staple (Nelson Mandela campaign range)",
    /** @deprecated prefer pricingTiers.kg1 — kept for impact model & legacy slide refs */
    tradePriceExVat: TRADE_EX_VAT_1KG,
    tradePriceExVatLabel: "R45",
    tradePriceNote: "1kg Mandela pack · Pick n Pay cost · exclusive of VAT",
    rrpInclVat: RRP_INCL_VAT_1KG,
    rrpInclVatLabel: "R67",
    rrpNote: "1kg Mandela pack · RRP inclusive of VAT",
    currency: "ZAR",
    vatRate: VAT_RATE,
    vatNote:
      "Two listing tiers: 1kg Mandela pack (porridges & one-pots) at R45 ex. VAT / R67 incl. VAT; 400g (soya & soups) at R18 ex. VAT / R33.50 incl. VAT. Pick n Pay front margin aligns each trade cost to 15% VAT for a fair shelf comparison.",
    campaignLine:
      "Nelson Mandela range — four fortified African categories, two clear pack prices, Pick n Pay margin on every SKU, and 10% ring-fenced for foundations.",
    pricingTiers: {
      kg1: packPricing("1kg", TRADE_EX_VAT_1KG, RRP_INCL_VAT_1KG, "One-Pot Meals · Fortified Porridges"),
      g400: packPricing("400g", TRADE_EX_VAT_400G, RRP_INCL_VAT_400G, "Soya Mince · Fortified Soups"),
    },
    /**
     * 1kg one-pot yield — specific claim for Pick n Pay shelf talk and impact maths.
     * Dry pack prepares to 4× weight; 200g plate servings → 20 meals at RRP R67.
     */
    onePotYield: {
      dryPackKg: ONE_POT_DRY_KG,
      preparedKg: ONE_POT_PREPARED_KG,
      servingGrams: ONE_POT_SERVING_G,
      servingsPerPack: ONE_POT_SERVINGS,
      rrpInclVat: RRP_INCL_VAT_1KG,
      rrpInclVatLabel: "R67",
      costPerServingInclVat: ONE_POT_COST_PER_SERVING,
      costPerServingLabel: `R${ONE_POT_COST_PER_SERVING.toFixed(2)}`,
      headline: "1kg one-pot → 4kg prepared food = 20 × 200g servings",
      costLine: `R67 ÷ 20 meals = R${ONE_POT_COST_PER_SERVING.toFixed(2)} per 200g serving`,
      detail:
        "The flagship 1kg Big Five Foods one-pot pack makes 4kg of food when prepared — that is 20 × 200g servings. At the Mandela pack RRP of R67 incl. VAT, each 200g meal costs R3.35 (R67 ÷ 20). Clear shelf talk for Pick n Pay: complete fortified plate, not just dry weight.",
    },
  },

  /**
   * Mandela pack range — all four Big Five Foods categories for Pick n Pay shelf / donation.
   * 1kg: porridges + one-pots (R45 / R67). 400g: soya + soups (R18 / R33.50).
   */
  /** Display order L→R: porridge · one-pot · soya · soup */
  mandelaPackRanges: [
    {
      id: "porridge",
      title: "Fortified Porridges",
      packSize: "1kg",
      pricingTier: "kg1" as const,
      tradeExVatLabel: "R45",
      rrpInclVatLabel: "R67",
      tagline: "Breakfast that builds — not empty cereal calories",
      heroImage: "/foods/porridge-banana.jpg",
      flavours: [
        { name: "Chocolate", image: "/foods/porridge-chocolate.jpg" },
        { name: "Banana", image: "/foods/porridge-banana.jpg" },
        { name: "Original", image: "/foods/porridge-original.jpg" },
        { name: "Strawberry", image: "/foods/porridge-strawberry.jpg" },
      ],
      stats: "1kg Mandela pack · R45 ex. VAT · R67 RRP · 74% more nutrition design",
      blurb:
        "Instant, vitamin-enriched porridges on local maize where formulation allows — familiar flavours families and ECD centres already accept. Designed for growing children, care settings and busy households that need reliable fortification without a cold chain.",
      nutrition:
        "Essential minerals, B-vitamins, fibre, calcium, magnesium, phosphorus and iron — micronutrient density aimed at hidden hunger, not only fill.",
      retailAngle:
        "High-velocity breakfast aisle story: Mandela purpose + kids nutrition. Easy prep demo for store tasting. Strong donation SKU for ECD and school-linked programmes.",
      serve: "Hot breakfast · after-school · care centres · household staple",
    },
    {
      id: "onepot",
      title: "One-Pot Meals",
      packSize: "1kg",
      pricingTier: "kg1" as const,
      tradeExVatLabel: "R45",
      rrpInclVatLabel: "R67",
      tagline: "A complete plate in one pack",
      heroImage: "/foods/onepot-chicken.jpg",
      flavours: [
        { name: "Chakalaka", image: "/foods/onepot-chakalaka.jpg" },
        { name: "Beef", image: "/foods/onepot-beef.jpg" },
        { name: "Chicken", image: "/foods/onepot-chicken.jpg" },
        { name: "Chilli Beef", image: "/foods/onepot-chilli-beef.jpg" },
      ],
      stats: "1kg Mandela pack · R45 / R67 · 1kg → 4kg prepared · 20 × 200g · R3.35 / meal",
      blurb:
        "Ready-to-cook complete meals with balanced fortification and authentic African flavours. A 1kg dry one-pot pack makes 4kg of food when prepared — 20 × 200g servings. At Mandela pack RRP R67 that is R3.35 per meal (R67 ÷ 20).",
      nutrition:
        "Protein plus vitamins A & D, iron and calcium in a whole-meal format — fights calorie gaps and micronutrient deficiency together.",
      retailAngle:
        "Premium-feel convenience with purpose: busy families, students, workers. Hero pack for Mandela Day endcaps and donation hampers — 20 meals from one pack at R3.35 each on RRP. Feels dignified, not bare.",
      serve: "Weeknight dinners · workplaces · CSI hampers · institutional menus · 20 plates per 1kg pack",
    },
    {
      id: "soya",
      title: "Soya Mince",
      packSize: "400g",
      pricingTier: "g400" as const,
      tradeExVatLabel: "R18",
      rrpInclVatLabel: "R33.50",
      tagline: "Affordable protein that stretches every pot",
      heroImage: "/foods/soya-chilli-beef.jpg",
      flavours: [
        { name: "Chilli Beef", image: "/foods/soya-chilli-beef.jpg" },
        { name: "Beef & Onion", image: "/foods/soya-beef-onion.jpg" },
        { name: "Rich Beef", image: "/foods/soya-beef.jpg" },
        { name: "Mutton", image: "/foods/soya-mutton.jpg" },
      ],
      stats: "400g pack · R18 ex. VAT · R33.50 RRP · high protein · long shelf life",
      blurb:
        "Plant-based protein mince in culturally familiar formats for stews, pap and institutional menus. Gives Pick n Pay shoppers a protein upgrade when meat prices spike — and gives foundations a stable protein line without cold-chain meat logistics.",
      nutrition:
        "High plant protein at low cost — lifts protein quality in starch-heavy diets and supports protein-energy security for families under pressure.",
      retailAngle:
        "Value protein for the main meal occasion. Clear Mandela-pack shelf talker: “protein with purpose.” Ideal CSI bulk for community kitchens and feeding days.",
      serve: "Stews · mince meals · catering · NGO & household protein stretch",
    },
    {
      id: "soup",
      title: "Fortified Soups",
      packSize: "400g",
      pricingTier: "g400" as const,
      tradeExVatLabel: "R18",
      rrpInclVatLabel: "R33.50",
      tagline: "Warmth, flavour and micronutrients at the lowest cost point",
      heroImage: "/foods/soup-oxtail.jpg",
      flavours: [
        { name: "Brown Onion", image: "/foods/soup-brown-onion.jpg" },
        { name: "Oxtail", image: "/foods/soup-oxtail.jpg" },
        { name: "Minestrone", image: "/foods/soup-minestrone.jpg" },
        { name: "Chicken", image: "/foods/soup-chicken.jpg" },
      ],
      stats: "400g pack · R18 ex. VAT · R33.50 RRP · vitamins A & C · iron · calcium",
      blurb:
        "Fortified instant soup thickeners in classic South African flavours — elders, children and clinics already trust the format. Extends food budgets and fills the plate between main meals when fuel and time are scarce.",
      nutrition:
        "Vitamins A & C, iron and calcium in an everyday format — micronutrient top-up without medical claims beyond fortification design.",
      retailAngle:
        "Entry price point for first trial purchase. High acceptance gift/donation line. Easy multipack for Smart Shopper loyalty and Mandela campaign baskets.",
      serve: "Households · clinics · ECD · emergency & community kitchens",
    },
  ] as const,

  /**
   * Pick n Pay store / retailer economics — what Pick n Pay makes (not Big Five GP).
   * Two listing tiers: 1kg Mandela pack + 400g soya/soups.
   */
  picknPayMargin: {
    /** Flagship 1kg (legacy single-tier fields for impact model) */
    tradeExVat: TRADE_EX_VAT_1KG,
    tradeInclVatAligned: TRADE_INCL_VAT_1KG,
    rrpInclVat: RRP_INCL_VAT_1KG,
    marginRand: MARGIN_RAND_1KG,
    marginPctOfRrp: MARGIN_PCT_1KG,
    marginRandLabel: `R${MARGIN_RAND_1KG.toFixed(2)}`,
    marginPctLabel: `~${Math.round(MARGIN_PCT_1KG)}%`,
    headline: "Healthy front margin for Pick n Pay on every pack sold at RRP",
    detail:
      "1kg Mandela pack (porridges & one-pots): R45 ex. VAT → R67 RRP → about R15.25 front margin (~23% of RRP). 400g soya & soups: R18 ex. VAT → R33.50 RRP → about R12.80 front margin (~38% of RRP). Both align cost at 15% VAT before promotions.",
    honesty:
      "Margin figures are illustrative front margin (RRP less VAT-aligned cost). They exclude store overheads, promotions, shrink and the 5% Pick n Pay contribution to foundations. Confirm pack sizes and SKUs on the term sheet.",
    kg1: packPricing("1kg", TRADE_EX_VAT_1KG, RRP_INCL_VAT_1KG, "One-Pot · Porridges"),
    g400: packPricing("400g", TRADE_EX_VAT_400G, RRP_INCL_VAT_400G, "Soya mince · Soups"),
  },

  /**
   * 10% of partnership product turnover to NPO / feeding support:
   * Pick n Pay 5% + Big Five Foods 5%.
   */
  giving: {
    totalPct: 10,
    picknPayPct: 5,
    foodsPct: 5,
    label: "10% of partnership product turnover",
    detail:
      "Together, Pick n Pay and Big Five Foods ring-fence 10% of partnership product turnover (Pick n Pay 5% + Big Five Foods 5%) so every sale also supports Restore Africa Foundation and A Heart To Help — Pick n Pay as the face of good in the community.",
    bases: {
      picknPay:
        "Pick n Pay: 5% of retail sell-through value of partnership SKUs (at RRP, incl. VAT) — customer-facing volume Pick n Pay already owns.",
      foods:
        "Big Five Foods: 5% of trade turnover on partnership SKUs sold to Pick n Pay (at R45 ex. VAT) — matching Pick n Pay’s commitment.",
    },
    perUnitIllustrative: {
      atRrp: {
        basis: "Per unit sold at RRP R67 (incl. VAT)",
        picknPay: RRP_INCL_VAT * 0.05,
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
      label: "Illustrative · 100,000 packs sold through Pick n Pay",
      picknPayRetailTurnover: 100_000 * RRP_INCL_VAT,
      foodsTradeTurnover: 100_000 * TRADE_EX_VAT,
      picknPayContribution: 100_000 * RRP_INCL_VAT * 0.05,
      foodsContribution: 100_000 * TRADE_EX_VAT * 0.05,
      picknPayMarginPool: 100_000 * PNP_MARGIN_RAND,
      get combined() {
        return this.picknPayContribution + this.foodsContribution;
      },
    },
  },

  pathways: [
    {
      id: "retail",
      title: "Pick n Pay sells with purpose",
      desc: "Stock the Mandela pack at RRP R67. Shoppers leave with fortified food; Pick n Pay earns margin and funds community good from sell-through.",
    },
    {
      id: "donate",
      title: "Pick n Pay donates with dignity",
      desc: "Pick n Pay CSI or franchisees purchase product for foundations and feeding schemes — real meals, with Pick n Pay’s name on the act of care. SA Harvest moves donations to soup kitchens, feeding schemes, Restore Africa Foundation and A Heart To Help.",
    },
    {
      id: "hybrid",
      title: "Pick n Pay campaigns that stick",
      desc: "Shelf sales + Mandela Day / hunger-season drives + store collections. One pack, sell + donate + SA Harvest last-mile: Pick n Pay does good.",
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
      verse: {
        text: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.",
        ref: "James 1:27",
      },
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
    {
      slug: "sa-harvest",
      name: "SA Harvest",
      short: "SAH",
      role: "NPO · food rescue · last-mile delivery to feeding schemes",
      summary:
        "SA Harvest rescues nutritious food and fights hunger at scale (saharvest.org). In this Pick n Pay × Big Five Foods partnership, SA Harvest’s role is delivery logistics: moving donated product to soup kitchens, community feeding schemes, Restore Africa Foundation programmes and A Heart To Help feeding pathways — so Pick n Pay donations reach plates with dignity and reliability.",
      focus: [
        "Last-mile delivery",
        "Soup kitchens",
        "Feeding schemes",
        "RAF & AHTH distribution",
      ],
      contact: "Coordination via Group partnership lead",
      website: "https://saharvest.org/",
      websiteLabel: "saharvest.org",
      logoSrc: "/partners/sa-harvest-logo.png",
      brandColor: "#1B4332",
    },
  ],

  /** Pick n Pay-centred narrative outcomes */
  outcomes: [
    {
      t: "Pick n Pay as a force for good",
      d: "Every Mandela pack sold or donated carries Pick n Pay’s community leadership — not abstract CSI, but food people can eat.",
    },
    {
      t: "Shoppers feel the difference",
      d: "Affordable fortified staples on Pick n Pay shelves; a clear Mandela-aligned story customers are proud to support.",
    },
    {
      t: "Foundations go further",
      d: "Restore Africa Foundation and A Heart To Help receive product and contribution rand — with SA Harvest delivering into soup kitchens and feeding schemes.",
    },
    {
      t: "Stores win commercially",
      d: "Healthy front margin at R67 RRP, plus a purpose line that strengthens Pick n Pay’s local reputation and loyalty.",
    },
  ],

  picknPayStory: [
    {
      t: "Pick n Pay feeds",
      d: "Put fortified African staples where families already shop — dignity on the shelf, not only in a warehouse.",
    },
    {
      t: "Pick n Pay funds",
      d: "Ring-fence 5% of sell-through; Big Five Foods matches with 5% of trade — 10% total into verified NPO pathways.",
    },
    {
      t: "Pick n Pay stands with foundations",
      d: "Restore Africa Foundation (children · rebuild) and A Heart To Help (safety · rehabilitation) — with SA Harvest as last-mile delivery to kitchens and schemes.",
    },
    {
      t: "Pick n Pay leads the narrative",
      d: "Mandela pack, store campaigns, franchisee CSI — Pick n Pay is the hero of the story; Big Five Foods is the product partner behind the shelf.",
    },
  ],

  roadmap: [
    {
      n: "01",
      t: "Align",
      d: "Term sheet: SKUs, pricing (R45 / R67), Pick n Pay margin discipline, 5%+5% giving, NPO beneficiaries, Pick n Pay brand story.",
    },
    {
      n: "02",
      t: "List",
      d: "Range listing, pilot Pick n Pay clusters, planograms, staff brief and Mandela / “Pick n Pay does good” creative.",
    },
    {
      n: "03",
      t: "Launch",
      d: "Shelf live + optional donation PO pathway. Celebrate first packs sold and first packs donated with store teams.",
    },
    {
      n: "04",
      t: "Prove",
      d: "Quarterly Pick n Pay impact pack: units, rand to NPOs, foundation stories and photos — content Pick n Pay can share.",
    },
    {
      n: "05",
      t: "Scale",
      d: "More stores, more SKUs, Mandela Day / hunger season / back-to-school — Pick n Pay’s good becomes a national rhythm.",
    },
  ],

  /** Product credibility for Pick n Pay buyers — no supplier GP or internal cost advantage. */
  productCredibility: [
    {
      t: "Fortified for real need",
      d: "Designed for households and community kitchens — micronutrients and protein formats families accept.",
    },
    {
      t: "Shelf-stable & practical",
      d: "Long shelf life, simple prep — works for Pick n Pay inventory and for foundation donations.",
    },
    {
      t: "Certified manufacture",
      d: "ISO, FSSC, Halaal, Kosher, Sedex and SupplierAdvisor® verification pathways for retail confidence.",
    },
    {
      t: "Institutional delivery experience",
      d: "Group experience on national school-nutrition pathways — discipline Pick n Pay can trust in a partner.",
    },
    {
      t: "Proud African brand story",
      d: "Mandela campaign pack gives Pick n Pay a purpose line customers understand in one glance.",
    },
  ],

  honesty: [
    "Two listing tiers: 1kg Mandela pack (porridges & one-pots) at R45 ex. VAT / R67 incl. VAT; 400g soya & soups at R18 ex. VAT / R33.50 incl. VAT — confirm pack sizes, SKU list and VAT treatment on the term sheet.",
    "Pick n Pay margin figures are illustrative front margin (RRP less cost aligned at 15% VAT): ~R15.25 (~23%) on 1kg and ~R12.80 (~38%) on 400g. They are not net store profit and exclude overheads, promotions, shrink and the 5% Pick n Pay contribution.",
    "5% + 5% giving bases (Pick n Pay retail sell-through vs Foods trade turnover) are the recommended model; legal wording sits in the commercial agreement.",
    "NPO allocations between Restore Africa Foundation and A Heart To Help can be fixed (e.g. 50/50) or programme-driven each period.",
    "One-pot yield for shelf talk and national meal modelling: 1kg dry pack prepares to 4kg food = 20 × 200g servings; at RRP R67 that is R3.35 per meal (R67 ÷ 20). Meal equivalents / year = packs × 20.",
    "Impact meal counts and programme stories remain illustrative planning figures until SKU mix, menus and foundation reporting are locked.",
    "National grocery store total is modelled from Pick n Pay Group FY26 public footprint for Pick n Pay Hypermarkets, company-owned and franchise Supermarkets and Express (excluding Boxer and clothing/liquor-only formats unless co-located). Format split is a planning allocation — not a Pick n Pay-published partnership forecast. Packs/store/month and people-fed estimates remain modelling assumptions — not forecasts.",
  ],

  /**
   * Illustrative national impact model across Pick n Pay grocery formats.
   * Store total anchored to Pick n Pay Group FY26 grocery footprint (Hyper · Supermarket · Express).
   * Format split and velocity are planning assumptions — confirm on term sheet.
   */
  impactReport: {
    title: "National Pick n Pay impact model (illustrative)",
    period: "Per full year at steady-state listing",
    /**
     * Public network claim (Pick n Pay Group FY26 integrated reporting / pnp.co.za).
     * Grocery-focused estate for Mandela pack ranging (excludes Boxer; clothing/liquor-only not primary).
     * @see https://www.pnp.co.za/
     * @see https://www.picknpayinvestor.co.za/ (FY26 store estate)
     */
    networkSource: {
      claim: "Pick n Pay grocery network · Hyper · Supermarket · Express (owned & franchise) · FY26",
      formatsNamed: "Hypermarket · Supermarket · Express",
      url: "https://www.pnp.co.za/",
      /** Working total for models — grocery-focused PnP formats (not whole Group incl. Boxer) */
      storeCountAnchor: 709,
      smartShopperMembersM: 20.6,
      groupStoresTotal: 2261,
      note: "FY26: 23 Hypermarkets · 285 company-owned Supermarkets · ~211 franchise Supermarkets · 190 Express (+7 Market) ≈ 709 grocery touchpoints. Smart Shopper ~20.6m members. Group total 2,261 stores across six countries includes Boxer and other formats.",
    },
    disclaimer:
      "Store total is modelled from Pick n Pay Group FY26 public footprint for grocery-relevant Pick n Pay formats (Hypermarkets, company-owned and franchise Supermarkets, Express). Boxer and clothing/liquor-only formats are excluded from this partnership model unless co-located ranging is agreed. Format counts are a planning allocation, not a Pick n Pay-published partnership split. Packs/store/month, sales rates and people-fed metrics are discussion assumptions only — replace with Pick n Pay network and sell-through data on the term sheet. Front margin is not net store profit. Smart Shopper membership (~20.6m) is Group-reported for loyalty storytelling, not a claim of unique buyers of partnership SKUs.",
    unitAssumptions: {
      tradeExVat: TRADE_EX_VAT,
      rrpInclVat: RRP_INCL_VAT,
      picknPayFrontMarginPerPack: PNP_MARGIN_RAND,
      /** Aligned to 1kg one-pot yield: 4kg prepared = 20 × 200g servings */
      servingsPerPack: ONE_POT_SERVINGS,
      servingsNote:
        "20 servings per pack — flagship 1kg one-pot yield (4kg prepared food = 20 × 200g servings). At Mandela RRP R67: R67 ÷ 20 = R3.35 / meal. National meal equivalents use this pack yield for modelling.",
      peopleFedMethod:
        "Meal equivalents (packs × 20 servings) ÷ 365 ≈ people fed one meal a day for a year (illustrative, not unique individuals).",
      donationShareOfSales: 0.02,
      donationNote: "2% of sell-through volume assumed as CSI / franchisee donation POs (illustrative).",
    },
    /**
     * Format tiers — allocate the FY26 Pick n Pay grocery estate across Hyper ·
     * Supermarket (owned + franchise) · Express. Sum ≈ 709. Illustrative for planning.
     */
    storeTiers: [
      {
        format: "Express",
        stores: 190,
        packsPerStorePerMonth: 55,
        note: "Convenience / forecourt Express — high footfall, smaller basket · pnp.co.za / FY26",
      },
      {
        format: "Supermarket",
        stores: 496,
        packsPerStorePerMonth: 130,
        note: "Company-owned (~285) + franchise (~211) neighbourhood supermarkets — core Mandela pack velocity · FY26",
      },
      {
        format: "Hypermarket",
        stores: 23,
        packsPerStorePerMonth: 320,
        note: "Large destination Hypers — range depth, promo endcaps and Smart Shopper campaigns · FY26",
      },
    ],
  },
} as const;

/** Build computed national impact rows from store tiers + unit economics. */
export function buildPicknPayImpactReport() {
  const ir = PICK_N_PAY_PARTNERSHIP.impactReport;
  const u = ir.unitAssumptions;
  const months = 12;

  const tiers = ir.storeTiers.map((t) => {
    const packsYear = t.stores * t.packsPerStorePerMonth * months;
    const retailTurnover = packsYear * u.rrpInclVat;
    const tradeTurnover = packsYear * u.tradeExVat;
    const picknPayFrontMargin = packsYear * u.picknPayFrontMarginPerPack;
    const picknPayGive5 = retailTurnover * 0.05;
    const foodsGive5 = tradeTurnover * 0.05;
    const combined10 = picknPayGive5 + foodsGive5;
    const mealEquivalents = packsYear * u.servingsPerPack;
    const peopleFedOneMealDay = mealEquivalents / 365;
    const donatedPacks = packsYear * u.donationShareOfSales;
    const donatedMeals = donatedPacks * u.servingsPerPack;

    return {
      ...t,
      packsYear,
      retailTurnover,
      tradeTurnover,
      picknPayFrontMargin,
      picknPayGive5,
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
    picknPayFrontMargin: sum("picknPayFrontMargin"),
    picknPayGive5: sum("picknPayGive5"),
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
    picknPayFrontMargin: national.picknPayFrontMargin * pilotFactor,
    combined10: national.combined10 * pilotFactor,
    mealEquivalents: Math.round(national.mealEquivalents * pilotFactor),
    peopleFedOneMealDay: national.peopleFedOneMealDay * pilotFactor,
  };

  return { ...ir, tiers, national, pilot, months };
}

export type PicknPayImpactReport = ReturnType<typeof buildPicknPayImpactReport>;

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

/**
 * Compact headline currency for tight tiles (e.g. R29m, R10.6m).
 * Keeps full rand values available via formatZar for detail rows.
 */
export function formatZarCompact(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) {
    const v = abs / 1_000_000_000;
    return `${sign}R${v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")}bn`;
  }
  if (abs >= 1_000_000) {
    const v = abs / 1_000_000;
    // One decimal when under R100m so R10.6m stays clear; whole millions when larger
    if (v >= 100) return `${sign}R${Math.round(v)}m`;
    return `${sign}R${v.toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (abs >= 1_000) {
    const v = abs / 1_000;
    return `${sign}R${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return formatZar(n);
}
