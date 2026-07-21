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
  },

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
