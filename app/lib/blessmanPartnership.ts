/**
 * Blessman International × Big Five Group — kingdom partnership briefing data.
 * Product / nutrition figures reuse Foods public framing (management / internal
 * design comparisons where noted — not clinical claims).
 */

import { FOODS_ECONOMICS } from "./foodsEconomics";
import { CMH_FORD_PARTNERSHIP } from "./cmhFordPartnership";

const Y = CMH_FORD_PARTNERSHIP.product.yield;

/**
 * Indicative ZAR→USD for partner briefing (not a live FX quote).
 * Locked for deck consistency at ~R18.50 / $1.
 */
export const BLESSMAN_FX = {
  zarPerUsd: 18.5,
  note: "USD figures are indicative at ~R18.50 / $1 for partner briefing — not a live FX quote; confirm on order.",
} as const;

/** Format a ZAR amount with an indicative USD pair. */
export function zarUsd(zar: number, opts?: { approx?: boolean; zarDigits?: number }) {
  const approx = opts?.approx ?? false;
  const zarDigits = opts?.zarDigits ?? (Number.isInteger(zar) ? 0 : 2);
  const zarStr = `${approx ? "~" : ""}R${zar.toFixed(zarDigits)}`;
  const usd = zar / BLESSMAN_FX.zarPerUsd;
  const usdStr = `~$${usd.toFixed(2)}`;
  return {
    zar: zarStr,
    usd: usdStr,
    /** e.g. R2.25 (~$0.12) */
    inline: `${zarStr} (${usdStr})`,
    /** e.g. ~R2.25 / meal (~$0.12) */
    perMeal: `${zarStr} / meal (${usdStr})`,
  };
}

const MEAL = zarUsd(Y.costPerMeal, { zarDigits: 2 });
const PACK = zarUsd(CMH_FORD_PARTNERSHIP.product.tradeExVat, { zarDigits: 0 });
const SOYA_MEAL = zarUsd(1.3, { approx: true, zarDigits: 2 });
const SOUP_MEAL = zarUsd(1.1, { approx: true, zarDigits: 2 });

/** Pack / meal maths for Blessman partnership briefing (ex. VAT framing). */
const SERVINGS_PER_KG = Y.servingsPerPack; // 20 × 200g from 1kg dry → 4kg prepared
const PACK_1KG_ZAR = CMH_FORD_PARTNERSHIP.product.tradeExVat; // 45
const PACK_5KG_ZAR = 170;
const FBO_DISCOUNT = 0.1; // 10% for faith-based organisations on 5kg
const PACK_5KG_FBO_ZAR = Math.round(PACK_5KG_ZAR * (1 - FBO_DISCOUNT) * 100) / 100; // 153
const MEALS_1KG = SERVINGS_PER_KG; // 20
const MEALS_5KG = SERVINGS_PER_KG * 5; // 100
const MEAL_1KG_ZAR = PACK_1KG_ZAR / MEALS_1KG; // 2.25
const MEAL_5KG_ZAR = PACK_5KG_ZAR / MEALS_5KG; // 1.70
const MEAL_5KG_FBO_ZAR = PACK_5KG_FBO_ZAR / MEALS_5KG; // 1.53

const PACK_1KG = zarUsd(PACK_1KG_ZAR, { zarDigits: 0 });
const PACK_5KG = zarUsd(PACK_5KG_ZAR, { zarDigits: 0 });
const PACK_5KG_FBO = zarUsd(PACK_5KG_FBO_ZAR, { zarDigits: 0 });
const MEAL_1KG = zarUsd(MEAL_1KG_ZAR, { zarDigits: 2 });
const MEAL_5KG = zarUsd(MEAL_5KG_ZAR, { zarDigits: 2 });
const MEAL_5KG_FBO = zarUsd(MEAL_5KG_FBO_ZAR, { zarDigits: 2 });

/** 3 meals/day for a child — FBO 5kg rate for porridge + one-pot; soya for dinner. */
const DAY_BREAKFAST_ZAR = MEAL_5KG_FBO_ZAR; // porridge
const DAY_LUNCH_ZAR = MEAL_5KG_FBO_ZAR; // one-pot
const DAY_DINNER_ZAR = 1.3; // soya mince (soup from ~R1.10)
const DAY_TOTAL_ZAR =
  Math.round((DAY_BREAKFAST_ZAR + DAY_LUNCH_ZAR + DAY_DINNER_ZAR) * 100) / 100;
const MONTH_DAYS = 30;
const MONTH_TOTAL_ZAR = Math.round(DAY_TOTAL_ZAR * MONTH_DAYS * 100) / 100;

const DAY_BREAKFAST = zarUsd(DAY_BREAKFAST_ZAR, { zarDigits: 2 });
const DAY_LUNCH = zarUsd(DAY_LUNCH_ZAR, { zarDigits: 2 });
const DAY_DINNER = zarUsd(DAY_DINNER_ZAR, { approx: true, zarDigits: 2 });
const DAY_TOTAL = zarUsd(DAY_TOTAL_ZAR, { zarDigits: 2 });
const MONTH_TOTAL = zarUsd(MONTH_TOTAL_ZAR, { zarDigits: 2 });

export const BLESSMAN_PARTNERSHIP = {
  title: "Blessman International × Big Five Group",
  subtitle: "Kingdom partnership — delicious, nutritious, affordable food for children.",
  tagline: `Fortified porridges children want to eat · ~74% more nutrition by design · ${MEAL.inline} per meal · African food for African children.`,
  fx: BLESSMAN_FX,
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
      {
        line: "Feed hungry children with food they will actually eat",
        verse:
          "“For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink…”",
        ref: "Matthew 25:35",
      },
      {
        line: "Close micronutrient gaps that drive stunting and hidden hunger",
        verse:
          "“Is it not to share your food with the hungry and to provide the poor wanderer with shelter…”",
        ref: "Isaiah 58:7",
      },
      {
        line: "Keep meals affordable so hubs and care points can stretch every rand",
        verse:
          "“Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.”",
        ref: "Proverbs 19:17",
      },
      {
        line: "Serve with dignity — African food for African children, not dependency theatre",
        verse:
          "“Dear children, let us not love with words or speech but with actions and in truth.”",
        ref: "1 John 3:18",
      },
    ],
  },

  /** Scripture used across deck slides */
  scripture: {
    title: {
      verse: "“I am the bread of life. Whoever comes to me will never go hungry…”",
      ref: "John 6:35",
    },
    challenge: {
      verse:
        "“The generous will themselves be blessed, for they share their food with the poor.”",
      ref: "Proverbs 22:9",
    },
    product: {
      verse:
        "“So whether you eat or drink or whatever you do, do it all for the glory of God.”",
      ref: "1 Corinthians 10:31",
    },
    malnutrition: {
      verse:
        "“Start children off on the way they should go, and even when they are old they will not turn from it.”",
      ref: "Proverbs 22:6",
    },
    kingdomPlate: {
      verse:
        "“Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress…”",
      ref: "James 1:27",
    },
    pathways: {
      verse:
        "“And let us consider how we may spur one another on toward love and good deeds.”",
      ref: "Hebrews 10:24",
    },
    cta: {
      verse:
        "“And the King will reply, ‘Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.’”",
      ref: "Matthew 25:40",
    },
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
    affordable: `Roughly 50% cheaper than comparable wholesale/retail pathways (internal), with clear meal maths at about ${MEAL.inline} per 200g serving from a ${PACK.inline} 1kg pack.`,
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
        value: MEAL.zar,
        usd: MEAL.usd,
        label: "Per 200g meal",
        detail: `${PACK.zar} ÷ 20 meals = ${MEAL.inline} per meal`,
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
    /**
     * Typical fortified porridge nutrition information panel (as provided for partner briefing).
     * Serving size: 80 g dry product (typical serving).
     */
    label: {
      servingNote: "Typical serving = 80 g dry fortified porridge",
      macros: [
        { nutrient: "Energy", per100g: "1590 kJ", perServing: "1272 kJ" },
        { nutrient: "Protein", per100g: "12.8 g", perServing: "10.2 g" },
        { nutrient: "Glycaemic carbohydrate", per100g: "69.6 g", perServing: "55.8 g" },
        { nutrient: "— of which total sugar", per100g: "18.9 g", perServing: "15.1 g", indent: true },
        { nutrient: "Total fat", per100g: "7 g", perServing: "5.6 g" },
        { nutrient: "— saturated fat", per100g: "2.7 g", perServing: "2.2 g", indent: true },
        { nutrient: "— monounsaturated fatty acids", per100g: "2.6 g", perServing: "2.1 g", indent: true },
        { nutrient: "— polyunsaturated fatty acids", per100g: "1.7 g", perServing: "1.4 g", indent: true },
        { nutrient: "Dietary fibre", per100g: "7 g", perServing: "5.6 g" },
        { nutrient: "Total sodium", per100g: "451.8 mg", perServing: "361.4 mg" },
      ],
      vitamins: [
        { nutrient: "Vitamin A", per100g: "1235 µg", perServing: "988 µg", nrv: "110%" },
        { nutrient: "Biotin", per100g: "41 µg", perServing: "32.8 µg", nrv: "110%" },
        { nutrient: "Vitamin B1 (Thiamine)", per100g: "11 mg", perServing: "8.8 mg", nrv: "722%" },
        { nutrient: "Vitamin B2 (Riboflavin)", per100g: "12 mg", perServing: "9.6 mg", nrv: "725%" },
        { nutrient: "Vitamin B6 (Pyridoxine)", per100g: "14 mg", perServing: "11.2 mg", nrv: "669%" },
        { nutrient: "Vitamin B9 (Folic acid / folate)", per100g: "550 µg", perServing: "440 µg", nrv: "110%" },
        { nutrient: "Vitamin B12 (Cyanocobalamin)", per100g: "17 µg", perServing: "13.6 µg", nrv: "570%" },
        { nutrient: "Vitamin C (Ascorbic acid)", per100g: "435 mg", perServing: "348 mg", nrv: "348%" },
        { nutrient: "Vitamin D", per100g: "21 µg", perServing: "16.8 µg", nrv: "110%" },
        { nutrient: "Vitamin E", per100g: "36 mg", perServing: "28.8 mg", nrv: "193%" },
        { nutrient: "Nicotinamide (Niacin)", per100g: "22 mg", perServing: "17.6 mg", nrv: "110%" },
        { nutrient: "Pantothenic acid", per100g: "27 mg", perServing: "21.6 mg", nrv: "432%" },
      ],
      minerals: [
        { nutrient: "Chromium", per100g: "6.7 µg", perServing: "5.4 µg", nrv: "15%" },
        { nutrient: "Copper", per100g: "0.2 µg", perServing: "0.2 µg", nrv: "15%" },
        { nutrient: "Calcium", per100g: "244.5 mg", perServing: "195.6 mg", nrv: "15%" },
        { nutrient: "Iodine", per100g: "28.7 mg", perServing: "23 mg", nrv: "15%" },
        { nutrient: "Iron", per100g: "3.5 mg", perServing: "2.8 mg", nrv: "15%" },
        { nutrient: "Magnesium", per100g: "97 mg", perServing: "77.6 mg", nrv: "18%" },
        { nutrient: "Manganese", per100g: "0.2 mg", perServing: "0.2 mg", nrv: "9%" },
        { nutrient: "Molybdenum", per100g: "8.6 µg", perServing: "6.9 µg", nrv: "15%" },
        { nutrient: "Phosphate", per100g: "192.5 mg", perServing: "154 mg", nrv: "12%" },
        { nutrient: "Selenium", per100g: "10.5 µg", perServing: "8.4 µg", nrv: "15%" },
        { nutrient: "Zinc", per100g: "2.1 mg", perServing: "1.7 mg", nrv: "15%" },
        { nutrient: "Choline", per100g: "105.4 mg", perServing: "84.3 mg", nrv: "15%" },
      ],
      childBenefits: [
        {
          t: "Energy to learn and play",
          d: "1 272 kJ per typical 80 g serving — sustained energy from glycaemic carbohydrate plus protein, so children are not running on empty calories alone.",
        },
        {
          t: "Protein for growth",
          d: "10.2 g protein per serving supports tissue growth and recovery — critical where diets are starch-heavy and animal protein is scarce or costly.",
        },
        {
          t: "Iron, folate & B-vitamins",
          d: "Iron plus very high B1, B2, B6, B12 and folate %NRV help close gaps linked to anaemia, tiredness and impaired concentration in school-age children.",
        },
        {
          t: "Vitamins A, C, D & E",
          d: "Vitamin A (110% NRV), C (348%), D (110%) and E (193%) support immunity, vision and healthy development — targets of hidden hunger programmes worldwide.",
        },
        {
          t: "Calcium, zinc & minerals",
          d: "Calcium, zinc, magnesium, selenium and related minerals at meaningful %NRV levels support bones, immunity and metabolic health in growing bodies.",
        },
        {
          t: "Fibre without sacrifice",
          d: "5.6 g dietary fibre per serving — better than empty refined staples — while flavours stay delicious enough for children to finish the bowl.",
        },
      ],
    },
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
    yield: {
      ...Y,
      costPerMealLabel: MEAL.zar,
      costPerMealUsd: MEAL.usd,
      costPerMealInline: MEAL.inline,
      costLine: `${PACK.zar} ÷ 20 meals = ${MEAL.inline} per meal`,
      detail: `Each 1kg Big Five Foods fortified porridge pack makes 4kg of food when prepared — that is 20 × 200g servings. At ${PACK.inline} per pack, every meal costs ${MEAL.inline}. Clear maths for programme budgets and stewardship reporting.`,
    },
    tradeExVatLabel: PACK.zar,
    tradeExVatUsd: PACK.usd,
    tradeExVatInline: PACK.inline,
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
      stats: `From ${SOYA_MEAL.perMeal} · high protein`,
      src: "/foods/soya-beef.jpg",
    },
    {
      title: "One-Pot Meals",
      emphasis: false,
      blurb: "Complete fortified plates — authentic African flavours, ~20 minutes cook.",
      stats: `${Y.headline} · ${MEAL.inline}/meal`,
      src: "/foods/onepot-chicken.jpg",
    },
    {
      title: "Soups",
      emphasis: false,
      blurb: "Lowest-cost micronutrient pathway — vitamins A & C, iron, calcium.",
      stats: `From ${SOUP_MEAL.perMeal}`,
      src: "/foods/soup-chicken.jpg",
    },
  ],

  /**
   * Pack pricing comparison — 1kg vs 5kg vs faith-based 10% on 5kg.
   * Yield: 1kg dry → 4kg prepared = 20 × 200g meals (same per-kg for 5kg).
   */
  packCompare: {
    eyebrow: "PACK PRICING · FAITH-BASED OFFER",
    title: "1kg, 5kg — and 10% off for faith-based organisations",
    intro:
      "Same fortified yield maths: every kilogram prepares to about 4kg of food (20 × 200g meals). Bigger packs lower the cost per meal — and Blessman qualifies for a faith-based 10% on the 5kg institutional pack.",
    options: [
      {
        id: "1kg",
        badge: "1KG PACK",
        packZar: PACK_1KG_ZAR,
        packLabel: PACK_1KG.zar,
        packUsd: PACK_1KG.usd,
        packInline: PACK_1KG.inline,
        perKgLabel: `${PACK_1KG.zar}/kg`,
        meals: MEALS_1KG,
        mealZar: MEAL_1KG_ZAR,
        mealLabel: MEAL_1KG.zar,
        mealUsd: MEAL_1KG.usd,
        mealInline: MEAL_1KG.inline,
        highlight: false,
        note: "Retail / catering entry pack",
      },
      {
        id: "5kg",
        badge: "5KG INSTITUTIONAL",
        packZar: PACK_5KG_ZAR,
        packLabel: PACK_5KG.zar,
        packUsd: PACK_5KG.usd,
        packInline: PACK_5KG.inline,
        perKgLabel: `R${(PACK_5KG_ZAR / 5).toFixed(0)}/kg`,
        meals: MEALS_5KG,
        mealZar: MEAL_5KG_ZAR,
        mealLabel: MEAL_5KG.zar,
        mealUsd: MEAL_5KG.usd,
        mealInline: MEAL_5KG.inline,
        highlight: false,
        note: "Hub / campus volume pack",
      },
      {
        id: "5kg-fbo",
        badge: "FAITH-BASED · 10% OFF",
        packZar: PACK_5KG_FBO_ZAR,
        packLabel: PACK_5KG_FBO.zar,
        packUsd: PACK_5KG_FBO.usd,
        packInline: PACK_5KG_FBO.inline,
        perKgLabel: `R${(PACK_5KG_FBO_ZAR / 5).toFixed(2)}/kg`,
        meals: MEALS_5KG,
        mealZar: MEAL_5KG_FBO_ZAR,
        mealLabel: MEAL_5KG_FBO.zar,
        mealUsd: MEAL_5KG_FBO.usd,
        mealInline: MEAL_5KG_FBO.inline,
        highlight: true,
        note: `10% off ${PACK_5KG.zar} 5kg for faith-based organisations (e.g. Blessman)`,
        wasPackLabel: PACK_5KG.zar,
        saveLabel: zarUsd(PACK_5KG_ZAR - PACK_5KG_FBO_ZAR, { zarDigits: 0 }).inline,
      },
    ],
    yieldNote: `Yield: 1kg dry → ~4kg prepared = ${MEALS_1KG} × 200g meals · 5kg = ${MEALS_5KG} meals. ${BLESSMAN_FX.note}`,
  },

  /**
   * Full-day plate for a child — porridge breakfast, one-pot lunch, soya/soup dinner.
   * Porridge + one-pot priced on faith-based 5kg meal rate; dinner on soya band.
   */
  threeMealsDay: {
    eyebrow: "THREE MEALS · ONE CHILD",
    title: "Breakfast, lunch and dinner — what it costs to feed a child",
    intro:
      "A simple kingdom day: fortified porridge in the morning, a one-pot plate at midday, and soya mince or soup in the evening — priced on the faith-based 5kg offer for porridge and one-pots.",
    meals: [
      {
        slot: "Breakfast",
        product: "Fortified porridge",
        blurb: "Warm, familiar flavours children finish — micronutrients to start the day.",
        src: "/foods/porridge-banana.jpg",
        cost: DAY_BREAKFAST,
        basis: `Faith-based 5kg meal rate (${MEAL_5KG_FBO.inline})`,
      },
      {
        slot: "Lunch",
        product: "One-pot meal",
        blurb: "A complete fortified plate — authentic African flavours, ~20 minutes cook.",
        src: "/foods/onepot-chicken.jpg",
        cost: DAY_LUNCH,
        basis: `Faith-based 5kg meal rate (${MEAL_5KG_FBO.inline})`,
      },
      {
        slot: "Dinner",
        product: "Soya mince / soup",
        blurb: "Plant protein or a light fortified soup — stretch the evening pot.",
        src: "/foods/soya-beef.jpg",
        cost: DAY_DINNER,
        basis: `From ${SOYA_MEAL.inline} soya · soup from ${SOUP_MEAL.inline}`,
      },
    ],
    day: {
      label: "Per child / day",
      total: DAY_TOTAL,
      detail: `Breakfast ${DAY_BREAKFAST.zar} + lunch ${DAY_LUNCH.zar} + dinner ${DAY_DINNER.zar}`,
    },
    month: {
      label: `Per child / month (${MONTH_DAYS} days)`,
      total: MONTH_TOTAL,
      detail: `${DAY_TOTAL.inline} × ${MONTH_DAYS} days`,
      days: MONTH_DAYS,
    },
    footnote: `Porridge and one-pot use the faith-based 5kg rate (${PACK_5KG_FBO.inline} → ${MEAL_5KG_FBO.inline}/meal). Dinner uses soya mince at ~R1.30 (soup from ~R1.10). Preparation water, fuel and kitchen labour sit outside pack cost. ${BLESSMAN_FX.note}`,
  },

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
    "Detailed nutrition panels (per 100 g / per 80 g serving / % NRV) are typical fortified porridge label values for partner briefing — confirm the governing pack label / CoA for the SKU and batch you order.",
    "Nutrition superiority figures (e.g. ~74% more nutrition by design, ~185% more fortification) are internal Foods design comparisons vs alternative formulations — not clinical trial outcomes or medical claims.",
    `Cost advantage (~50% vs wholesale/retail) and meal maths (1kg → 4kg prepared ≈ 20 × 200g; ${PACK.zar} ÷ 20 ≈ ${MEAL.zar} / ${MEAL.usd}) are management / partner-briefing figures — confirm SKU list, VAT and preparation assumptions on order.`,
    `5kg institutional pack at ${PACK_5KG.inline} (${MEALS_5KG} meals → ${MEAL_5KG.inline}/meal) and faith-based 10% offer at ${PACK_5KG_FBO.inline} (→ ${MEAL_5KG_FBO.inline}/meal) are partner-briefing trade figures — confirm eligibility, VAT and SKU list on order.`,
    `Three-meals-a-day child cost (${DAY_TOTAL.inline}/day · ${MONTH_TOTAL.inline}/${MONTH_DAYS} days) uses faith-based 5kg meal rate for porridge and one-pot, and ~R1.30 for soya dinner — confirm menu mix and pack sizes for your hubs.`,
    BLESSMAN_FX.note,
    "Blessman feeding-scale language is drawn from Blessman’s public communications; this deck does not restate audited Blessman financials.",
    "Kingdom framing describes shared purpose; it is not a claim of formal ecclesiastical affiliation beyond the partnership relationship.",
  ],
} as const;
