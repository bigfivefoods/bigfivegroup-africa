/**
 * SPAR × Big Five Foods partnership model — feeding initiatives + NPO support.
 * Figures for commercial discussion; formal terms under NDA / signed term sheet.
 */

export const SPAR_PARTNERSHIP = {
  title: "SPAR × Big Five Foods",
  subtitle: "Retail nutrition partnership for African food security",
  tagline: "Sell fortified food. Fund feeding. Support the foundations.",
  groupUrl: "https://www.bigfivegroup.africa",
  foodsUrl: "https://www.bigfivegroup.africa/foods",
  sparUrl: "https://www.spar.co.za/Home",
  contactEmail: "craig@bigfivegroup.africa",

  /** Flagship partnership SKU / campaign pricing (Nelson Mandela pack). */
  product: {
    name: "Big Five Foods · fortified staple (Nelson Mandela campaign pack)",
    tradePriceExVat: 45,
    tradePriceExVatLabel: "R45",
    tradePriceNote: "SPAR cost price · exclusive of VAT",
    rrpInclVat: 67,
    rrpInclVatLabel: "R67",
    rrpNote: "Recommended retail price · inclusive of VAT · Nelson Mandela pack",
    currency: "ZAR",
    vatNote:
      "Trade is quoted ex. VAT (R45). RRP R67 is inclusive of VAT for the Nelson Mandela campaign pack.",
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
      "SPAR contributes 5% and Big Five Foods contributes 5% of partnership product turnover — combined 10% — to support feeding initiatives via Restore Africa Foundation and A Heart To Help.",
    bases: {
      spar:
        "SPAR: 5% of retail sell-through value of partnership SKUs (at RRP, incl. VAT) — customer-facing volume.",
      foods:
        "Big Five Foods: 5% of trade turnover on partnership SKUs sold to SPAR (at R45 ex. VAT).",
    },
    /** Illustrative per-unit economics for pitch (not a guarantee). */
    perUnitIllustrative: {
      atRrp: {
        basis: "Per unit sold at RRP R67 (incl. VAT)",
        spar: 67 * 0.05,
        foods: 67 * 0.05,
        total: 67 * 0.1,
      },
      atTrade: {
        basis: "Per unit on trade price R45 (ex. VAT) — Foods contribution base",
        foods: 45 * 0.05,
      },
    },
    /** Worked example volume for the deck */
    example: {
      units: 100_000,
      label: "Illustrative · 100,000 packs sold through SPAR",
      sparRetailTurnover: 100_000 * 67,
      foodsTradeTurnover: 100_000 * 45,
      sparContribution: 100_000 * 67 * 0.05,
      foodsContribution: 100_000 * 45 * 0.05,
      /** Combined ring-fence using the stated bases */
      get combined() {
        return this.sparContribution + this.foodsContribution;
      },
    },
  },

  pathways: [
    {
      id: "retail",
      title: "Sell to SPAR customers",
      desc: "Stock Big Five Foods on SPAR shelves at RRP R67 (incl. VAT). Everyday shoppers access affordable fortified nutrition; sell-through funds the 5% SPAR contribution.",
    },
    {
      id: "donate",
      title: "Donate product to foundations",
      desc: "SPAR (or SPAR CSI / franchisees) purchases product for donation to Restore Africa Foundation and A Heart To Help — fortified meals into verified community programmes.",
    },
    {
      id: "hybrid",
      title: "Hybrid campaign",
      desc: "Shelf sales + Mandela Day / CSI drives + store-level collections. One SKU, two impact routes, one transparent giving model.",
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

  outcomes: [
    {
      t: "Food security",
      d: "Fortified, shelf-stable African staples through SPAR’s national footprint — nutrition where people already shop.",
    },
    {
      t: "Malnutrition response",
      d: "Micronutrient-dense porridges, protein and complete meals designed for families, ECD and community kitchens — not empty calories.",
    },
    {
      t: "NPO acceleration",
      d: "Predictable product and rand-flow to Restore Africa Foundation and A Heart To Help — commercial scale meets care.",
    },
    {
      t: "Brand with purpose",
      d: "SPAR and Big Five Foods share a Mandela-aligned story customers can buy into every week.",
    },
  ],

  roadmap: [
    {
      n: "01",
      t: "Align",
      d: "Term sheet: SKUs, pricing (R45 / R67), 5%+5% giving, NPO beneficiaries, reporting cadence.",
    },
    {
      n: "02",
      t: "List",
      d: "Range listing, store clusters (pilot regions), planograms, staff brief and Mandela campaign creative.",
    },
    {
      n: "03",
      t: "Launch",
      d: "Shelf live + optional donation PO pathway to foundations. Baseline sell-through and first contribution period.",
    },
    {
      n: "04",
      t: "Prove",
      d: "Quarterly impact pack: units, rand to NPOs, meals narrative, photos from foundation programmes.",
    },
    {
      n: "05",
      t: "Scale",
      d: "Expand stores, SKUs and CSI calendar (Mandela Day, hunger season, back-to-school).",
    },
  ],

  whyFoods: [
    {
      t: "~50% cheaper vs wholesale/retail",
      d: "Internal cost comparison — stretch feeding and household budgets (management-reported).",
    },
    {
      t: "~45% gross profit",
      d: "Healthy unit economics for a durable commercial partnership (management-reported).",
    },
    {
      t: "74% more nutrition by design",
      d: "Internal nutrition-design comparison vs alternative formulations — not a clinical claim.",
    },
    {
      t: "Certified manufacture",
      d: "ISO, FSSC, Halaal, Kosher, Sedex, SupplierAdvisor® verification pathways.",
    },
    {
      t: "Institutional proof",
      d: "NSNP pathway landed; institutional feeding economics proven in Group delivery.",
    },
  ],

  honesty: [
    "R45 ex. VAT trade and R67 incl. VAT RRP are proposed partnership prices for the Nelson Mandela campaign pack — confirm pack size, SKU list and VAT treatment on the term sheet.",
    "5% + 5% giving bases (SPAR retail sell-through vs Foods trade turnover) are the recommended model; legal wording sits in the commercial agreement.",
    "NPO allocations between Restore Africa Foundation and A Heart To Help can be fixed (e.g. 50/50) or programme-driven each period.",
    "Impact meal counts are illustrative until pack yields and programme menus are locked with each foundation.",
    "GP / cost-advantage / nutrition figures are management-reported or internal analyses unless restated under NDA.",
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
