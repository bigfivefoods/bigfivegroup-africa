/**
 * Blessman International × Big Five Group — kingdom partnership briefing data.
 * Product / nutrition figures reuse Foods public framing (management / internal
 * design comparisons where noted — not clinical claims).
 */

import { FOODS_ECONOMICS } from "./foodsEconomics";
import { CMH_FORD_PARTNERSHIP } from "./cmhFordPartnership";

const Y = CMH_FORD_PARTNERSHIP.product.yield;

export const BLESSMAN_PARTNERSHIP = {
  title: "Blessman International × Big Five Group",
  subtitle: "Kingdom partnership — delicious, nutritious, affordable food for children.",
  tagline:
    "Fortified porridges children want to eat · ~74% more nutrition by design · ~R2.25 per meal · African food for African children.",
  groupUrl: "https://www.bigfivegroup.africa",
  foodsUrl: "https://www.bigfivegroup.africa/foods",
  aboutUrl: "https://www.bigfivegroup.africa/about",
  blessmanUrl: "https://www.blessmaninternational.org/",
  blessmanWhoWeAre: "https://www.blessmaninternational.org/who-we-are",
  contactEmail: "craig@bigfivegroup.africa",

  kingdom: {
    frame: "Kingdom-centred partnership",
    blessman:
      "Blessman International shares the hope of Jesus Christ with South African children and families through faith formation and locally sustainable programmes that feed the hungry, foster food-secure communities, and support water, sanitation and child development — with a vision that every child in Limpopo would know hope and receive nurturing support.",
    founder:
      "Dr. Craig R. Muller, Founder & CEO of Big Five Group, is a visionary architect of kingdom-centred leadership and sustainable impact in Africa. His life goal is to Feed (Big Five Foods™), Educate (Super-Cube®) and Empower (SupplierAdvisor®) — so children eat with dignity and communities rise under their own power.",
    shared: [
      "Feed hungry children with food they will actually eat",
      "Close micronutrient gaps that drive stunting and hidden hunger",
      "Keep meals affordable so hubs and care points can stretch every rand",
      "Serve with dignity — African food for African children, not dependency theatre",
    ],
  },

  challenge: {
    eyebrow: "FOOD SECURITY & MALNUTRITION",
    title: "Hunger is not only empty plates — it is empty micronutrients",
    points: [
      {
        t: "Calories without nutrients",
        d: "Starch-heavy diets can fill stomachs while children still face iron, B-vitamin, calcium and mineral gaps that undermine growth, immunity and learning.",
      },
      {
        t: "Taste decides compliance",
        d: "Feeding programmes fail when children refuse the food. Delicious, familiar flavours are a nutrition delivery system — not a nice-to-have.",
      },
      {
        t: "Cost and logistics",
        d: "Hubs and care points need shelf-stable, portionable packs that travel without cold chain and stretch limited budgets every school day.",
      },
    ],
  },

  productPromise: {
    delicious:
      "Banana, Strawberry, Chocolate and Original fortified porridges — taste-forward formats children and families recognise and ask for again.",
    nutritious:
      "Vitamin-enriched, mineral-dense formulations designed for growing children and care settings — not empty cereal calories.",
    affordable:
      "Roughly 50% cheaper than comparable wholesale/retail pathways (internal), with clear meal maths at about R2.25 per 200g serving from a R45 1kg pack.",
  },

  porridge: {
    title: "Fortified porridges — the flagship for child feeding",
    stats: [
      {
        value: "74%",
        label: "More nutrition by design",
        detail: FOODS_ECONOMICS.nutritionDesign.detail,
      },
      {
        value: "185%",
        label: "More fortification",
        detail:
          "Internal fortification-density framing vs alternative cereal formulations (Foods strategy language — not a clinical trial claim).",
      },
      {
        value: "~50%",
        label: "Cheaper vs wholesale/retail",
        detail: FOODS_ECONOMICS.cheaperThanMarket.detail,
      },
      {
        value: Y.costPerMealLabel,
        label: "Per 200g meal",
        detail: Y.costLine,
      },
    ],
    flavours: [
      {
        name: "Original",
        src: "/foods/porridge-original.jpg",
        blurb: "Vitamin-enriched instant porridge on locally grown maize — everyday staple.",
      },
      {
        name: "Chocolate",
        src: "/foods/porridge-chocolate.jpg",
        blurb: "Chocolate fortified porridge — high nutrition households and children actually want.",
      },
      {
        name: "Banana",
        src: "/foods/porridge-banana.jpg",
        blurb: "Banana fortified porridge designed for children and family breakfast tables.",
      },
      {
        name: "Strawberry",
        src: "/foods/porridge-strawberry.jpg",
        blurb: "Strawberry fortified porridge — taste-forward micronutrient delivery.",
      },
    ],
    nutritionBullets: [
      "Essential minerals including iron, calcium, magnesium and phosphorus",
      "B-vitamins supporting energy metabolism in growing children",
      "Fibre for everyday digestive wellness in staple breakfast formats",
      "Shelf-stable instant prep — hot breakfast without cold-chain risk",
      "Portionable for hubs, ECD, after-school campuses and household hampers",
    ],
    superiority: [
      {
        t: "Against empty calories",
        d: "Fortification density targets hidden hunger — micronutrient gaps that plain maize meal alone does not close.",
      },
      {
        t: "Against refusal",
        d: "Four familiar flavours raise the chance children finish the bowl — nutrition only works if it is eaten.",
      },
      {
        t: "Against budget waste",
        d: "Long shelf life and low cost per meal mean fewer spoilage losses and more plates from the same donation or programme rand.",
      },
      {
        t: "Against fragile logistics",
        d: "No cold chain; instant prep; packs that move to Limpopo hubs, care points and school-linked kitchens.",
      },
    ],
    yield: Y,
    tradeExVatLabel: CMH_FORD_PARTNERSHIP.product.tradeExVatLabel,
    shelfLifeLabel: CMH_FORD_PARTNERSHIP.product.shelfLifeLabel,
  },

  ranges: [
    {
      title: "Fortified Porridges",
      emphasis: true,
      blurb: "Flagship for child breakfast and staple feeding — delicious flavours, dense fortification.",
      stats: "74% more nutrition · 185% more fortification",
      src: "/foods/porridge-banana.jpg",
    },
    {
      title: "Soya Mince",
      emphasis: false,
      blurb: "Affordable plant protein that stretches every pot — pairs with pap and stews.",
      stats: "From ~R1.30 / meal · high protein",
      src: "/foods/soya-beef.jpg",
    },
    {
      title: "One-Pot Meals",
      emphasis: false,
      blurb: "Complete fortified plates — authentic African flavours, ~20 minutes cook.",
      stats: `${Y.headline} · ${Y.costPerMealLabel}/meal`,
      src: "/foods/onepot-chicken.jpg",
    },
    {
      title: "Soups",
      emphasis: false,
      blurb: "Lowest-cost micronutrient pathway — vitamins A & C, iron, calcium.",
      stats: "From ~R1.10 / meal",
      src: "/foods/soup-chicken.jpg",
    },
  ],

  pathways: [
    {
      t: "Programme supply",
      d: "Direct purchase of fortified porridges and related SKUs for Blessman hubs and care points — invoice trail, predictable nutrition.",
    },
    {
      t: "African food for African children",
      d: "Complement existing meal-packet partnerships with locally relevant fortified staples children recognise and enjoy.",
    },
    {
      t: "Campus & school-linked feeding",
      d: "Del Cramer Children’s Campus, ECD and school-day contexts — breakfast porridges and complete meal formats.",
    },
    {
      t: "Transparent stewardship",
      d: "Pack counts, meal equivalents and Impact / SupplierAdvisor® rails so kingdom generosity stays honest and reportable.",
    },
  ],

  ask: [
    {
      n: "01",
      t: "Taste & nutrition briefing",
      d: "Sample fortified porridge flavours with Blessman hub / campus leads — confirm child acceptance.",
    },
    {
      n: "02",
      t: "Pilot pack volume",
      d: "Agree a starter SKU list (porridge-first) and pack volume for one or more Limpopo hubs / care points.",
    },
    {
      n: "03",
      t: "Kingdom partnership cadence",
      d: "Quarterly stewardship: meals served, flavours preferred, stories from the field — plates and purpose together.",
    },
  ],

  honesty: [
    "Nutrition superiority figures (e.g. ~74% more nutrition by design, ~185% more fortification) are internal Foods design comparisons vs alternative formulations — not clinical trial outcomes or medical claims.",
    "Cost advantage (~50% vs wholesale/retail) and meal maths (1kg → 4kg prepared ≈ 20 × 200g; R45 ÷ 20 ≈ R2.25) are management / partner-briefing figures — confirm SKU list, VAT and preparation assumptions on order.",
    "Blessman feeding-scale language is drawn from Blessman’s public communications; this deck does not restate audited Blessman financials.",
    "Kingdom framing describes shared purpose; it is not a claim of formal ecclesiastical affiliation beyond the partnership relationship.",
  ],
} as const;
