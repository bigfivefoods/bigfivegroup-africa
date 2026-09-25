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
      "Big Five Agri (farmer training & offtake), Big Five Foods manufacturing, Big Five Royal departmental unlock (Sports/Arts & Culture, Health, Agriculture, COGTA), Big Five Direct community containers, Super-Cube® leadership, SupplierAdvisor®, Foundation and Impact PMO.",
    nation:
      "Royal legitimacy, cultural authority, community reach across KwaZulu-Natal, farmer networks, traditional governance interfaces, ceremonial and household pathways, and stewardship of heritage that must never be diluted.",
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
      vehicle: "Agri → Foods → Royal → Direct",
      d: "From Zulu Nation farmers trained with Big Five Agri, through Big Five Foods manufacturing, to Big Five Royal departments and Direct community containers for the people.",
    },
    {
      id: "educate",
      t: "Educate",
      vehicle: "Big Five Leadership · Super-Cube®",
      d: "Whole-person leadership formation that accelerates stewards across Agri, Foods, Royal channels and Direct operators — Ubuntu, ethics and deliberate practice.",
    },
    {
      id: "empower",
      t: "Empower",
      vehicle: "Big Five Connect · SupplierAdvisor®",
      d: "Verified trade on supplieradvisor.com — plus Foundation and Impact rails — so farmers, factories, departments and container operators rise with proof, not theatre.",
    },
  ],

  /**
   * Cross-cutting accelerators on every Royal / Direct channel.
   */
  acceleration: {
    eyebrow: "ACCELERATORS · EVERY CHANNEL",
    title: "Connect + Super-Cube® run through the whole offer",
    intro:
      "Big Five Royal is not only food placement. Every customer channel — Sports/Arts & Culture, Health, Agriculture, COGTA, and Direct community containers — is accelerated by Big Five Connect (SupplierAdvisor® at supplieradvisor.com) and Big Five Leadership (Super-Cube®), so programmes scale with verified partners and formed people.",
    connect: {
      brand: "Big Five Connect",
      product: "SupplierAdvisor®",
      url: "https://www.supplieradvisor.com/",
      urlLabel: "supplieradvisor.com",
      d: "Verified suppliers, provenance and ethical trade rails — so Nation farmers, Foods manufacturing, departmental programmes and container operators share one trustworthy commercial operating system.",
      uses: [
        "Verify farmer offtake and supplier integrity into Foods",
        "Give departmental programmes a clean supplier trail",
        "List and assure Direct container operators and stock provenance",
        "Open B2B / B2G pathways without opaque middle layers",
      ],
    },
    leadership: {
      brand: "Big Five Leadership",
      product: "Super-Cube®",
      url: "/leadership",
      urlLabel: "bigfivegroup.africa/leadership",
      d: "Whole-person leadership formation for royal stewards, departmental counterparts, Agri lead farmers and Direct container operators — so delivery holds under pressure with Ubuntu and integrity.",
      uses: [
        "Form departmental and programme leads who steward Nation nutrition",
        "Develop Agri farmer leaders and cooperative stewards",
        "Train Direct container operators as micro-enterprise leaders",
        "Build a shared leadership language across the 50:50 partnership",
      ],
    },
  },

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
        t: "Unlock national departments for the people",
        d: "Big Five Royal channels Foods into Sports/Arts & Culture, Health, Agriculture and COGTA — with Super-Cube® leadership and SupplierAdvisor® verification as part of every departmental offer.",
        outcomes: [
          "Sports, Arts & Culture · Health · Agriculture · COGTA",
          "Super-Cube® for programme stewards",
          "SupplierAdvisor®-verified supply trails",
        ],
        href: "/access",
      },
      {
        id: "direct",
        n: "04",
        brand: "Big Five Direct",
        t: "Community containers · local enterprise",
        d: "Local people run containers to sell and distribute Foods — formed as leaders through Super-Cube® and listed/assured on SupplierAdvisor® so empowerment is commercial and credible.",
        outcomes: [
          "Local operators run the containers",
          "Super-Cube® micro-enterprise leadership",
          "Connect-verified stock & offtake",
        ],
        href: "/direct",
      },
    ],
    loopNote:
      "Farmers → Foods → Big Five Royal (departments) → Direct containers — accelerated at every gate by Connect (supplieradvisor.com) and Leadership (Super-Cube®), with 50:50 stewardship.",
  },

  /**
   * Departments Big Five Royal aims to help unlock for Nation nutrition programmes.
   * Each channel includes Connect + Super-Cube as core enablers.
   */
  royalDepartments: {
    eyebrow: "BIG FIVE ROYAL · DEPARTMENTAL UNLOCK",
    title: "Departments that can put food on the Nation’s tables",
    intro:
      "Big Five Royal aligns fortified Foods with national and provincial mandates — and brings Big Five Connect (SupplierAdvisor®) plus Big Five Leadership (Super-Cube®) into each channel so programmes are verified and people are formed, not only fed.",
    stackNote:
      "Royal channel stack: Foods placement + Super-Cube® leadership for stewards + SupplierAdvisor® (supplieradvisor.com) for trusted supply.",
    departments: [
      {
        id: "dsac",
        name: "Department of Sports, Arts & Culture",
        short: "Sports, Arts & Culture",
        d: "Align nutrition with sport development, cultural events and arts programmes — fuel for athletes, festivals and heritage gatherings of the Nation.",
        enable:
          "Super-Cube® for sport/culture programme leads · SupplierAdvisor® for event and facility food supply trails.",
      },
      {
        id: "doh",
        name: "Department of Health",
        short: "Health",
        d: "Support community health and nutrition pathways — fortified staples that help close micronutrient gaps where clinics and care programmes already serve families.",
        enable:
          "Super-Cube® for health-programme stewards · SupplierAdvisor® for clinic/care nutrition suppliers.",
      },
      {
        id: "doa",
        name: "Department of Agriculture",
        short: "Agriculture",
        d: "Close the loop with Big Five Agri — farmer development, offtake and food security programmes that turn Nation crops into Nation meals.",
        enable:
          "Super-Cube® for Agri farmer leaders · SupplierAdvisor® to verify offtake from Nation producers into Foods.",
      },
      {
        id: "cogta",
        name: "COGTA",
        short: "COGTA",
        fullName: "Cooperative Governance and Traditional Affairs",
        d: "Work with traditional governance and municipal interfaces — so traditional councils and local government pathways can steward community feeding with dignity.",
        enable:
          "Super-Cube® for traditional/municipal stewards · SupplierAdvisor® for community feeding suppliers and Direct nodes.",
      },
    ],
    note: "Departmental engagement is a partnership ambition — mandates, tenders and programme rules remain with the competent authorities; Big Five Royal proposes delivery partnership (food + leadership + verified trade), not to replace government.",
  },

  /**
   * Big Five Direct containers as community economic empowerment for the Nation.
   */
  directContainers: {
    eyebrow: "BIG FIVE DIRECT · COMMUNITY ENTERPRISE",
    title: "Containers that local people run — selling Big Five Foods",
    intro:
      "Beyond departmental placement, Big Five Direct multi-use containers create economic empowerment: local operators sell and distribute Foods — accelerated by Super-Cube® leadership formation and SupplierAdvisor® verification on supplieradvisor.com.",
    points: [
      {
        t: "Local operators",
        d: "Community people run containers as micro-enterprises — with Super-Cube® formation so they lead stock, customers and cash with integrity.",
      },
      {
        t: "Sell & distribute Foods",
        d: "Shelf-stable fortified porridges, soya, one-pots and soups stocked for daily offtake where people already gather.",
      },
      {
        t: "Connect-verified commerce",
        d: "Operators and supply trails listed/assured via Big Five Connect (SupplierAdvisor®) — provenance and fair terms, not opaque middle layers.",
      },
      {
        t: "Ranks, hubs & rural nodes",
        d: "Taxi ranks, rural communities and local hubs — Direct mobility turned into recurring food commerce and livelihoods for the Nation.",
      },
    ],
    note: "Container rollout scale follows Big Five Direct programme plans (including SANTACO-linked pathways nationally) — phased deployment with the Nation, not overnight saturation.",
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
      blurb:
        "Instant, vitamin-enriched porridges on local maize where formulation allows — breakfast that builds, not empty cereal calories.",
      stats: "74% more nutrition by design · 185% more fortification",
      detail:
        "Essential minerals, B-vitamins, fibre, calcium, magnesium, phosphorus and iron — micronutrient density aimed at hidden hunger. Shelf-stable; no cold chain.",
      pack: "Retail / catering packs · NSNP 5kg institutional available",
      src: "/foods/porridge-banana.jpg",
      serve: "Household · ECD · community kitchens · ceremonial hospitality",
      flavours: ["Original", "Chocolate", "Banana", "Strawberry"],
    },
    {
      title: "Soya mince",
      blurb: "Plant-based protein mince that stretches every pot — pairs with pap, stews and school menus.",
      stats: "From ~R1.30 / meal · high protein · long shelf life",
      detail:
        "Affordable protein for royal household kitchens, feeding schemes and family pots — familiar SA flavour profiles people already cook with.",
      pack: "Retail / catering packs · NSNP 5kg institutional available",
      src: "/foods/soya-beef.jpg",
      serve: "Family meals · feeding schemes · royal household kitchens",
      flavours: ["Rich Beef", "Chilli Beef", "Beef & Onion", "Mutton"],
    },
    {
      title: "One-pot meals",
      blurb: "Complete fortified plates — authentic African flavours, about 20 minutes cook.",
      stats: `${MEAL.inline}/meal framing · 1kg → ~4kg prepared`,
      detail:
        "Balanced, fortified convenience for lunch, dinner, events and departmental programmes — one pack, one complete meal format.",
      pack: "1kg retail / catering · NSNP 5kg institutional available",
      src: "/foods/onepot-chicken.jpg",
      serve: "Lunch · dinner · events · community programmes",
      flavours: ["Chicken", "Beef", "Chilli Beef", "Chakalaka"],
    },
    {
      title: "Soups",
      blurb: "Lowest-cost micronutrient pathway — vitamins A & C, iron and calcium in familiar bowls.",
      stats: "From ~R1.10 / meal · instant soup thickeners",
      detail:
        "Warm, fortified soup thickeners for light evening meals, clinics and care points — nutrient density at the lowest cost rung.",
      pack: "Instant soup thickener packs",
      src: "/foods/soup-chicken.jpg",
      serve: "Light evening meals · clinics · care points",
      flavours: ["Chicken", "Brown Onion", "Oxtail", "Minestrone"],
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
        t: "Super-Cube® across every Royal channel",
        d: "Whole-person formation for departmental stewards (Sports/Arts & Culture, Health, Agriculture, COGTA), Agri farmer leaders and Direct operators — including Spiritual intelligence.",
      },
      {
        t: "Ubuntu in practice",
        d: "Humanity, integrity and compassionate empowerment — leadership that honours Zulu identity while navigating modern multi-stakeholder complexity.",
      },
      {
        t: "Connect + Leadership together",
        d: "Super-Cube® forms the people; SupplierAdvisor® (supplieradvisor.com) verifies the trade — so acceleration is both human and commercial throughout the process.",
      },
    ],
  },

  empower: {
    points: [
      {
        t: "Big Five Direct containers",
        d: "Local community people run multi-use containers to sell and distribute Foods — with Super-Cube® operator leadership and Connect-verified stock trails.",
      },
      {
        t: "Big Five Connect · SupplierAdvisor®",
        d: "Verified suppliers and provenance on supplieradvisor.com — for Agri offtake, Foods supply, Royal departmental programmes and Direct nodes.",
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
      t: "Agri + Connect offtake",
      d: "Train Nation farmers; list and assure offtake on SupplierAdvisor® so crops flow cleanly into Foods manufacturing.",
    },
    {
      t: "Royal channels + Super-Cube®",
      d: "Place Foods into Sports/Arts & Culture, Health, Agriculture and COGTA — with Super-Cube® cohorts for programme stewards on each channel.",
    },
    {
      t: "Direct containers + Connect",
      d: "Pilot community-run containers selling Foods; form operators with Super-Cube® and verify commerce on supplieradvisor.com.",
    },
  ],

  honesty: [
    "This deck is a private partner briefing — not an official Palace publication and not a claim to speak for His Majesty beyond a proposed partnership relationship.",
    "Heritage language is drawn from the public Private Office site (zulukingdom.co.za). Succession and constitutional matters remain exclusively with the Royal House and competent authorities.",
    "50:50 equity / joint-venture framing is a strategic intent for discussion — legal structure, entities, VAT, licences and community benefit rules must be confirmed on a term sheet with authorised representatives.",
    "Big Five Royal is the proposed channel brand for placing Foods into national and provincial departments (including Sports, Arts & Culture; Health; Agriculture; and COGTA) — scope, mandates and procurement rules require formal confirmation with competent authorities.",
    "Big Five Agri farmer training and crop offtake into Foods manufacturing are partnership ambitions — volumes, crop specs, pricing and land/tenure arrangements must be agreed with authorised Nation representatives and farmer organisations.",
    "Big Five Direct community containers (local operators selling and distributing Foods) follow Direct programme plans — phased rollout with the Nation, not a claim that every node is already live.",
    "Heads of Agreement BF/RH/HOA/FINAL-V5 sets principal terms only — not an executed SHA, MOI, supply contract, gazetted royal appointment, or funded government award. Until signature is confirmed, treat exclusivity, offtake ranges and sponsor names as HOA-proposed.",
    `Foods meal maths (${PACK.inline} 1kg → ~20 × 200g meals → ${MEAL.inline}/meal) are management / partner-briefing figures — confirm SKU list, preparation and VAT on order. ${BLESSMAN_FX.note}`,
  ],

  /**
   * Heads of Agreement BF/RH/HOA/FINAL-V5 — principal terms for Isidlo seSilo
   * and Big Five Royal Foods (Pty) Ltd. Status: proposed / subject to signature
   * (Amazulu Queens' High Tea, 23 Sep 2026). Not an executed statutory document.
   */
  hoa: {
    ref: "BF/RH/HOA/FINAL-V5",
    status: "hoa-proposed" as const,
    statusLabel: "Principal terms · subject to signature",
    title: "Isidlo seSilo · Heads of Agreement",
    eyebrow: "HEADS OF AGREEMENT · ROYAL HOUSEHOLD",
    programmeName: "Isidlo seSilo",
    programmeMeaning: "Official Nutrition Programme of the Kingdom",
    entityName: "Big Five Royal Foods (Pty) Ltd",
    entityRole: "Official Meal Partner of the Royal Household",
    entityStatus: "established" as const,
    entityStatusLabel: "Company established · awaiting Royal approval",
    entityStatusDetail:
      "Big Five Royal Foods (Pty) Ltd has been established and is awaiting Royal Household approval of the Heads of Agreement and Official Meal Partner designation. Incorporation is complete; royal endorsement and HOA signature remain outstanding.",
    exclusiveTerm:
      "Exclusive Official Fortified Meal Provider for listed royal activations (HOA-proposed commercial term)",
    signing: {
      date: "23 September 2026",
      venue: "Zimbali Lakes Resort",
      event: "2nd Annual Amazulu Queens' High Tea",
    },
    witnesses: ["HRH Ndlunkulu laMakhubo", "HRH Ndlunkulu kaMayisela"],
    parties: {
      bigFive: {
        name: "Big Five Group (Pty) Ltd",
        d: "KZN-based food manufacturing group specialising in fortified porridge and one-pot meals (Big Five Foods™), with Agri offtake, Direct distribution, Leadership (Super-Cube®), Connect (SupplierAdvisor®), Foundation and Impact.",
      },
      household: {
        name: "The Royal Household Partnership",
        representedBy: "Prince Ntokozo and the Queens",
        d: "Represented by Prince Ntokozo and the Queens, in the presence of HRH Ndlunkulu laMakhubo and HRH Ndlunkulu kaMayisela.",
      },
    },
    purpose:
      "Principal terms for a strategic partnership to establish Isidlo seSilo — the Official Nutrition Programme of the Kingdom — and for Big Five Royal Foods (Pty) Ltd (now established) to be designated Official Meal Partner of the Royal Household, subject to Royal approval and HOA signature.",
    vision: [
      "Creates sustainable jobs on Ingonyama Trust land",
      "Provides fortified nutrition for His Majesty’s people",
      "Operates under Ubuntu, Dignity, and Heritage",
      "Generates commercial returns for all stakeholders",
    ],
    board: [
      {
        person: "Dr. Craig Ross Muller",
        seat: "Executive Director / CEO",
        tbc: false,
      },
      {
        person: "Prince Ntokozo",
        seat: "Non-Executive Director / Royal Liaison",
        tbc: false,
      },
      {
        person: "Dr. Joy (Natalie)",
        seat: "Business Development Executive — Royal Household Wellness, Strategy & Stakeholder Relations",
        tbc: false,
      },
      {
        person: "Independent Chair",
        seat: "To be appointed by mutual agreement",
        tbc: true,
      },
    ],
    patrons: [
      {
        person: "HRH Ndlunkulu laMakhubo",
        role: "Senior Royal Patron",
        lead: "Lead Patron for Izintombi Zesilo & Umkhosi woMhlanga (Reed Dance); champion for young women’s empowerment; host of Queens' High Tea",
      },
      {
        person: "HRH Ndlunkulu kaMayisela",
        role: "Royal Patron",
        lead: "Lead Patron for Amabutho catering, household welfare & royal ceremonies; champion for maternal health, family nutrition, and community outreach",
      },
    ],
    queensMandate:
      "Approve meal standards worthy of His Majesty’s people, and lead all women-centric and community distribution programmes.",
    roles: [
      {
        person: "Dr. Craig Ross Muller",
        title: "Chief Executive Officer",
        bullets: [
          "Overall strategic leadership and execution",
          "Investor relations, finance, and capital raising",
          "Government and corporate partnerships: DTIC, DSD, KZN Provincial, Ingonyama Trust",
          "Commercial agreements, expansion, and profitability",
        ],
      },
      {
        person: "Dr. Joy (Natalie)",
        title: "Business Development Executive — Royal Household Wellness, Strategy & Stakeholder Relations",
        bullets: [
          "Develop and oversee the Royal Household wellness strategy",
          "Serve as strategic liaison between the Big Five CEO, the Royal Household and key stakeholders",
          "Build and maintain high-level relationships with government, corporate partners and community structures",
          "Provide strategic advice to the CEO on stakeholder dynamics, opportunities, risks and relationship management",
          "Represent Big Five at selected high-level engagements, forums and stakeholder meetings",
          "Ensure initiatives are culturally respectful, professionally governed and aligned with agreed strategic objectives",
        ],
      },
      {
        person: "Prince Ntokozo",
        title: "Board Member, Royal & Strategic Affairs",
        bullets: [
          "Official liaison between the Company and the Royal Household",
          "Custodian of the Royal Calendar and cultural protocol",
          "Facilitates engagement with Amakhosi, Izinduna, and Ingonyama Trust Board",
          "Governance oversight and protection of royal reputation",
        ],
      },
    ],
    activations: [
      {
        id: "izintombi",
        t: "Izintombi Zesilo (Maidens)",
        detail: "Umkhosi woMhlanga (Reed Dance), eNyokeni",
        headcount: "15,000–30,000 maidens · preparatory camps (2 weeks feeding) · quarterly cultural workshops",
      },
      {
        id: "amabutho",
        t: "Amabutho (King’s Regiments)",
        detail: "Umkhosi weLembe, Amabutho gatherings, royal guard duties, training camps",
        headcount: "500–3,000 men per activation",
      },
      {
        id: "calendar",
        t: "Core Royal Calendar",
        detail:
          "Umkhosi woMhlanga · Umkhosi woMama (First Fruits) · King Shaka Day · Royal Weddings · Coronations · Memorial Services · Amazulu Kings Golf Cup · Queens' High Tea",
        headcount: "Per event — 21-day advance headcount",
      },
      {
        id: "traditional",
        t: "Traditional leadership",
        detail:
          "Monthly Amakhosi & Izinduna Council Meetings · Ingonyama Trust Community Imbizos · Rural outreach & food-relief drives led by the Queens",
        headcount: "Per gathering — advance headcount",
      },
      {
        id: "yearround",
        t: "Year-round programmes",
        detail:
          "Royal Schools Nutrition Programme · Clinics & Orphan Care Centres · Official Disaster Relief Meal of the Kingdom",
        headcount: "Programme calendars — HOA planned volumes",
      },
    ],
    commercial: {
      headcountRule: "21-day advance headcount for each activation",
      price: "Invoicing at pre-agreed Royal Rate (schedule to SHA / rate card — rand figure not published here)",
      fundingMix: [
        "Ingonyama Trust CSI",
        "KZN Provincial Government",
        "Corporate CSI (MTN, Lesaka, Edison Power, etc.)",
        "Big Five CSI",
      ],
      fundingStatus: "hoa-proposed" as const,
      offtakeRange: "50,000–200,000 meals monthly",
      offtakeStatus: "hoa-proposed" as const,
      offtakeLabel: "HOA planned monthly offtake range",
      productsInScope: [
        "Fortified porridges",
        "One-pot meals",
        "Soya mince / institutional proteins",
        "Soups",
        "NSNP / institutional 5 kg formats where school- or clinic-linked",
      ],
    },
    downloadHref: "/api/partner/zulu-hoa",
    downloadLabel: "Download HOA briefing (A4 portrait PDF)",
    honestyFooter:
      "This page reflects Heads of Agreement principal terms (BF/RH/HOA/FINAL-V5) prepared for the Amazulu Queens' High Tea. It is a Big Five Group partner briefing — not an official Palace publication and not a record of executed statutory documents. Until the HOA is executed, treat exclusivity, offtake ranges and sponsor names as proposed.",
  },
} as const;
