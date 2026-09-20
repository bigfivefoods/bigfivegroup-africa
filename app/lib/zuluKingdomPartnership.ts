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
      "Systems, fortified food manufacturing, Super-Cube® leadership formation, SupplierAdvisor® trade rails, Foundation design and Impact PMO assurance.",
    nation:
      "Royal legitimacy, cultural authority, community reach across KwaZulu-Natal, ceremonial and household pathways, and stewardship of heritage that must never be diluted.",
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
      vehicle: "Big Five Foods™",
      d: "Fortified African staples for royal, ceremonial, household and community kitchens — porridge, soya, one-pots and soups children and families will finish.",
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
      t: "Nutrition programmes",
      d: "Pilot fortified Foods for royal household, ceremonial hospitality and selected community / ECD kitchens in KZN.",
    },
    {
      t: "Leadership cohorts",
      d: "Super-Cube® formation for nominated stewards who advance His Majesty’s vision for unity and progress.",
    },
    {
      t: "Transparent scale",
      d: "Impact PMO and Foundation rails so every expansion step is gated, reported and worthy of the Nation’s trust.",
    },
  ],

  honesty: [
    "This deck is a private partner briefing — not an official Palace publication and not a claim to speak for His Majesty beyond a proposed partnership relationship.",
    "Heritage language is drawn from the public Private Office site (zulukingdom.co.za). Succession and constitutional matters remain exclusively with the Royal House and competent authorities.",
    "50:50 equity / joint-venture framing is a strategic intent for discussion — legal structure, entities, VAT, licences and community benefit rules must be confirmed on a term sheet with authorised representatives.",
    `Foods meal maths (${PACK.inline} 1kg → ~20 × 200g meals → ${MEAL.inline}/meal) are management / partner-briefing figures — confirm SKU list, preparation and VAT on order. ${BLESSMAN_FX.note}`,
  ],
} as const;
