/**
 * Zulu Kingdom × Big Five Group — strategic 50:50 partnership briefing data.
 * Public heritage language from zulukingdom.co.za; commercial terms are partner-briefing framing.
 */

import { FOODS_ECONOMICS } from "./foodsEconomics";
import { zarUsd, BLESSMAN_FX } from "./blessmanPartnership";

const MEAL = zarUsd(2.25, { zarDigits: 2 });
const PACK = zarUsd(45, { zarDigits: 0 });

export const ZULU_KINGDOM_PARTNERSHIP = {
  title: "The Zulu Kingdom × Big Five Group",
  subtitle: "50:50 strategic partnership — Feed · Educate · Empower the Nation",
  tagline:
    "A proposed equal partnership with the Private Office of His Majesty King Misuzulu kaZwelithini — to feed, educate and empower the people of the Zulu Nation with dignity, heritage and measurable delivery.",
  groupUrl: "https://www.bigfivegroup.africa",
  kingdomUrl: "https://www.zulukingdom.co.za/",
  aboutKingUrl: "https://www.zulukingdom.co.za/about-his-majesty/",
  contactEmail: "craig@bigfivegroup.africa",
  fx: BLESSMAN_FX,
  leopardHero: "/partners/zulu-kingdom-leopard-hero.jpg",
  logoSrc: "/partners/zulu-kingdom-logo.png",
  shieldSrc: "/partners/zulu-kingdom-shield.png",

  equity: {
    split: "50 : 50",
    headline: "Equal partners in service of the Nation",
    detail:
      "Big Five Group proposes a 50:50 strategic partnership with the Zulu Nation / Private Office structures — shared ownership of vision, shared responsibility for delivery, and shared benefit for the people His Majesty serves.",
    bigFive:
      "Big Five Agri (farmer training & offtake), Big Five Foods manufacturing, Big Five Royal departmental placement, Super-Cube® leadership formation, SupplierAdvisor® trade rails, Foundation design and Impact PMO assurance.",
    nation:
      "Royal legitimacy, cultural authority, community reach across KwaZulu-Natal, farmer networks, ceremonial and household pathways, and stewardship of heritage that must never be diluted.",
  },

  majesty: {
    name: "His Majesty King Misuzulu kaZwelithini",
    role: "King of the Zulu Nation · Monarch of KwaZulu-Natal",
    blurb:
      "Misuzulu Sinqobile kaZwelithini carries forward the legacy of King Goodwill Zwelithini kaBhekuzulu and Queen Mantfombi Dlamini Zulu — leading with vision for the royal family, cultural heritage, community unity and progress.",
  },

  pillars: [
    {
      id: "feed",
      t: "Feed",
      vehicle: "Big Five Agri → Foods → Royal",
      d: "From Zulu Nation farmers trained with Big Five Agri, through Big Five Foods manufacturing, to Big Five Royal placing meals in national departments for the people.",
    },
    {
      id: "educate",
      t: "Educate",
      vehicle: "Super-Cube®",
      d: "Whole-person leadership formation so those who serve the House and the Nation can hold complexity with Ubuntu, ethics and deliberate practice.",
    },
    {
      id: "empower",
      t: "Empower",
      vehicle: "SupplierAdvisor® · Foundation · Impact",
      d: "Verified trade, NPO pathways and transparent delivery gates — so communities rise under their own power with proof, not theatre.",
    },
  ],

  /**
   * Closed-loop value chain for the Zulu Nation partnership.
   * Agri trains local farmers → crops feed Foods manufacturing → Big Five Royal
   * places finished foods into national departments for the people.
   */
  valueChain: {
    eyebrow: "VALUE CHAIN · SOIL TO PLATE",
    title: "Agri · Foods · Big Five Royal",
    intro:
      "A closed loop in service of the Nation: train and develop Zulu farmers, manufacture fortified African food from their crops, then place delicious, nutritious, affordable meals through national departments — so His Majesty’s people eat with dignity.",
    stages: [
      {
        id: "agri",
        n: "01",
        brand: "Big Five Agri",
        t: "Train & develop local farmers",
        d: "Partner with the Zulu Nation to train, mentor and organise local farmers — regenerative practice, quality crops and fair offtake — so rural producers supply the raw materials our factories need.",
        outcomes: [
          "Farmer training & extension",
          "Regenerative production",
          "Verified crop offtake for Foods",
        ],
        href: "/agri",
      },
      {
        id: "foods",
        n: "02",
        brand: "Big Five Foods™",
        t: "Manufacture fortified staples",
        d: "Convert Nation-sourced crops into fortified porridges, soya, one-pots and soups — certified manufacturing, shelf-stable formats, familiar African flavours people will finish.",
        outcomes: [
          "Local crop → fortified products",
          "Institutional & household packs",
          "Delicious · nutritious · affordable",
        ],
        href: "/foods",
      },
      {
        id: "royal",
        n: "03",
        brand: "Big Five Royal",
        t: "Reach national departments & the people",
        d: "Big Five Royal channels finished Foods into relevant national and provincial departments and programme pathways — so delicious, nutritious, affordable food reaches the Zulu Nation’s people at scale.",
        outcomes: [
          "Departmental & programme placement",
          "Ceremonial & community tables",
          "Meals with dignity for the Nation",
        ],
        href: "/access",
      },
    ],
    loopNote:
      "Farmers of the Nation → crops into Big Five Foods → Big Five Royal into departments → plates for the people — with 50:50 stewardship at every gate.",
  },

  agri: {
    eyebrow: "BIG FIVE AGRI × ZULU NATION",
    title: "Farmers first — supply the Nation’s own factories",
    intro:
      "Big Five Agri works hand-in-hand with rural producers. In partnership with the Zulu Nation we propose to train and develop local farmers so their crops become the feedstock for Big Five Foods manufacturing — livelihoods upstream, fortified meals downstream.",
    points: [
      {
        t: "Train & extend",
        d: "Practical training for smallholders and cooperatives — soil, regenerative practice, quality and reliable harvest windows.",
      },
      {
        t: "Organise offtake",
        d: "Clear offtake pathways into Big Five Foods so farmers know who buys, at what standard, and how provenance is verified.",
      },
      {
        t: "Raise livelihoods",
        d: "Income with dignity — not dependency theatre — so rural families of the Nation share in the value they create.",
      },
      {
        t: "Feed the factory",
        d: "Crops that meet Foods specifications become fortified staples — shortening the chain from KZN soil to the Nation’s plate.",
      },
    ],
  },

  products: [
    {
      title: "Fortified porridges",
      blurb: "Breakfast that builds — local maize where formulation allows; familiar flavours.",
      stats: "74% more nutrition by design · 185% more fortification",
      src: "/foods/porridge-banana.jpg",
      serve: "Household · ECD · community kitchens · ceremonial hospitality",
    },
    {
      title: "Soya mince",
      blurb: "Affordable plant protein that stretches every pot — pairs with pap and stews.",
      stats: `From ~R1.30 / meal · high protein · long shelf life`,
      src: "/foods/soya-beef.jpg",
      serve: "Family meals · feeding schemes · royal household kitchens",
    },
    {
      title: "One-pot meals",
      blurb: "Complete fortified plates — authentic African flavours, ~20 minutes cook.",
      stats: `${MEAL.inline}/meal framing · institutional ready`,
      src: "/foods/onepot-chicken.jpg",
      serve: "Lunch · dinner · events · community programmes",
    },
    {
      title: "Soups",
      blurb: "Lowest-cost micronutrient pathway — vitamins A & C, iron, calcium.",
      stats: "From ~R1.10 / meal",
      src: "/foods/soup-chicken.jpg",
      serve: "Light evening meals · clinics · care points",
    },
  ],

  nutrition: {
    moreNutrition: FOODS_ECONOMICS.nutritionDesign.value,
    moreFortification: "185%",
    cheaper: FOODS_ECONOMICS.cheaperThanMarket.value,
    mealInline: MEAL.inline,
    packInline: PACK.inline,
  },

  leadership: {
    headline: "Advance the leadership of the Nation",
    points: [
      {
        t: "Super-Cube® for royal and community stewards",
        d: "Six-construct whole-person formation — including Spiritual intelligence — for executives, public servants, youth and those who serve the House.",
      },
      {
        t: "Ubuntu in practice",
        d: "Humanity, integrity and compassionate empowerment — leadership that honours Zulu identity while navigating modern multi-stakeholder complexity.",
      },
      {
        t: "Deliberate practice for delivery teams",
        d: "Programme managers, kitchen leads and field teams formed so Feed · Educate · Empower holds under pressure — not only on paper.",
      },
    ],
  },

  empower: {
    points: [
      {
        t: "SupplierAdvisor®",
        d: "Verified suppliers, provenance and ethical trade rails for B2B, B2G and community commerce linked to the Nation’s economic dignity.",
      },
      {
        t: "Foundation pathways",
        d: "Registered NPO design alongside royal and community programmes — donors and communities see the same truth.",
      },
      {
        t: "Impact PMO",
        d: "Gates, KPIs and field assurance across Feed · Educate · Empower — measurable service worthy of the Royal House.",
      },
    ],
  },

  pathways: [
    {
      t: "Joint steering",
      d: "50:50 governance — Private Office and Big Five Group co-chair vision, priorities and public language.",
    },
    {
      t: "Agri farmer cohorts",
      d: "Launch Big Five Agri training and offtake with selected Zulu Nation farmers — crops destined for Foods manufacturing.",
    },
    {
      t: "Foods + Big Five Royal pilots",
      d: "Manufacture fortified staples from Nation-sourced crops; place meals via Big Five Royal into agreed national/provincial departments and community kitchens.",
    },
    {
      t: "Leadership + transparent scale",
      d: "Super-Cube® cohorts for stewards; Impact PMO and Foundation rails so every expansion step is gated and worthy of the Nation’s trust.",
    },
  ],

  honesty: [
    "This deck is a private partner briefing — not an official Palace publication and not a claim to speak for His Majesty beyond a proposed partnership relationship.",
    "Heritage language is drawn from the public Private Office site (zulukingdom.co.za). Succession and constitutional matters remain exclusively with the Royal House and competent authorities.",
    "50:50 equity / joint-venture framing is a strategic intent for discussion — legal structure, entities, VAT, licences and community benefit rules must be confirmed on a term sheet with authorised representatives.",
    "Big Five Royal is the proposed channel brand for placing Foods into national and provincial departments / programme pathways for the Zulu Nation — scope, mandates and procurement rules require formal confirmation with competent authorities.",
    "Big Five Agri farmer training and crop offtake into Foods manufacturing are partnership ambitions — volumes, crop specs, pricing and land/tenure arrangements must be agreed with authorised Nation representatives and farmer organisations.",
    `Foods meal maths (${PACK.inline} 1kg → ~20 × 200g meals → ${MEAL.inline}/meal) are management / partner-briefing figures — confirm SKU list, preparation and VAT on order. ${BLESSMAN_FX.note}`,
  ],
} as const;
