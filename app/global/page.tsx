"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe2,
  MapPin,
  Compass,
  Handshake,
  Sparkles,
  Target,
} from "lucide-react";
import SupplierTrust from "../components/SupplierTrust";
import { pageBrand } from "../lib/pageBrand";

/** Nations where Big Five is actively working today */
const ACTIVE_COUNTRIES = [
  {
    name: "South Africa",
    code: "ZA",
    role: "Group Headquarters",
    focus: "KwaZulu-Natal · Continental command",
    summary:
      "Home base of Big Five Group. Regenerative agri programmes, fortified nutrition manufacturing, Super-Cube® leadership, and on-chain commerce are scaled from KwaZulu-Natal across the continent.",
    highlight: "HQ & deepest operational footprint",
  },
  {
    name: "Kenya",
    code: "KE",
    role: "East Africa Hub",
    focus: "Company established · Regional platform",
    summary:
      "A registered company presence anchors our East African expansion — connecting regenerative supply chains, ethical trade, and leadership development across the region.",
    highlight: "Company setup complete",
  },
  {
    name: "Ghana",
    code: "GH",
    role: "West Africa",
    focus: "Markets · Partnerships · Access",
    summary:
      "Building West African distribution and route-to-market strategy — institutional partnerships, fortified nutrition pathways, and ethical commerce corridors into ECOWAS markets.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Zambia",
    code: "ZM",
    role: "Southern / Central Africa",
    focus: "Agriculture · Trade · Community impact",
    summary:
      "Building distribution and route-to-market pathways for regenerative agriculture, community-linked nutrition, and trade that retain value for local producers.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Democratic Republic of the Congo",
    code: "CD",
    role: "Central Africa",
    focus: "Food systems · Last-mile access",
    summary:
      "Building last-mile distribution and route-to-market strategy for ethical supply chains and nutrition delivery in complex markets.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Tanzania",
    code: "TZ",
    role: "East Africa",
    focus: "Farming systems · Distribution",
    summary:
      "Building regenerative trade and distribution linkages that connect smallholders to verified markets while strengthening regional food sovereignty.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Namibia",
    code: "NA",
    role: "Southern Africa",
    focus: "Climate-smart agri · Partnerships",
    summary:
      "Building distribution corridors and route-to-market partnerships for climate-resilient agriculture and ethical commerce.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    role: "Southern Africa",
    focus: "Food security · Producer empowerment",
    summary:
      "Building route-to-market strategy for producers and institutions — nutrition solutions, market access, and leadership capability.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Lesotho",
    code: "LS",
    role: "Southern Africa",
    focus: "Community · Nutrition · Sovereignty",
    summary:
      "Building community distribution and route-to-market models that strengthen local food security, skills, and dignified economic participation.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Germany",
    code: "DE",
    role: "Europe · Partnerships",
    focus: "Trade · Investment · Institutional alliances",
    summary:
      "Building European distribution and route-to-market strategy — partnerships and corridors that connect African regenerative excellence with German and EU markets.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Hungary",
    code: "HU",
    role: "Europe · Central Europe",
    focus: "Partnerships · Market access · Collaboration",
    summary:
      "Building distribution and route-to-market pathways in Hungary that link Central European institutions and networks with Big Five’s African ecosystem.",
    highlight: "Building distribution & route to market",
  },
  {
    name: "Georgia",
    code: "GE",
    role: "Europe · Caucasus / Black Sea",
    focus: "Distribution · Route to market · Partnerships",
    summary:
      "Building distribution and route-to-market pathways in Georgia (Europe) — linking Black Sea and Caucasus corridors with Big Five’s African regenerative supply, fortified nutrition, and ethical trade network.",
    highlight: "Building distribution & route to market",
  },
] as const;

const ACTIVE_NAMES = new Set<string>(ACTIVE_COUNTRIES.map((c) => c.name));

const AFRICA_EXPANSION = [
  "Nigeria",
  "Ethiopia",
  "Egypt",
  "South Sudan",
  "Somalia",
  "Sudan",
  "Uganda",
  "Rwanda",
  "Burundi",
  "Mozambique",
  "Angola",
  "Botswana",
  "Eswatini",
  "Madagascar",
  "Malawi",
  "Comoros",
  "Mauritius",
  "Seychelles",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Libya",
  "Senegal",
  "Ivory Coast",
  "Cameroon",
  "Mali",
  "Niger",
  "Chad",
  "Guinea",
  "Benin",
  "Togo",
  "Sierra Leone",
  "Liberia",
  "Gabon",
  "Congo",
  "Central African Republic",
  "Eritrea",
  "Djibouti",
  "Gambia",
  "Guinea-Bissau",
  "Cape Verde",
  "São Tomé and Príncipe",
  "Equatorial Guinea",
  "Mauritania",
  "Western Sahara",
].filter((n) => !ACTIVE_NAMES.has(n));

const GLOBAL_AMBITION: { region: string; countries: string[] }[] = [
  {
    region: "Asia",
    countries: [
      "China",
      "India",
      "Indonesia",
      "Japan",
      "South Korea",
      "Singapore",
      "United Arab Emirates",
      "Saudi Arabia",
      "Vietnam",
      "Thailand",
      "Malaysia",
      "Philippines",
    ],
  },
  {
    region: "Europe",
    countries: [
      "United Kingdom",
      "France",
      "Netherlands",
      "Switzerland",
      "Nordics",
      "European Union partners",
    ],
  },
  {
    region: "Americas",
    countries: [
      "United States",
      "Canada",
      "Brazil",
      "Mexico",
      "Caribbean partners",
    ],
  },
  {
    region: "Oceania",
    countries: ["Australia", "New Zealand", "Pacific partners"],
  },
];

const FLAG_CODES: Record<string, string> = {
  "South Africa": "ZA",
  Kenya: "KE",
  Ghana: "GH",
  Zambia: "ZM",
  "Democratic Republic of the Congo": "CD",
  Tanzania: "TZ",
  Namibia: "NA",
  Zimbabwe: "ZW",
  Lesotho: "LS",
  Nigeria: "NG",
  Ethiopia: "ET",
  Egypt: "EG",
  "South Sudan": "SS",
  Somalia: "SO",
  Sudan: "SD",
  Uganda: "UG",
  Rwanda: "RW",
  Burundi: "BI",
  Mozambique: "MZ",
  Angola: "AO",
  Botswana: "BW",
  Eswatini: "SZ",
  Madagascar: "MG",
  Malawi: "MW",
  Comoros: "KM",
  Mauritius: "MU",
  Seychelles: "SC",
  Morocco: "MA",
  Algeria: "DZ",
  Tunisia: "TN",
  Libya: "LY",
  Senegal: "SN",
  "Ivory Coast": "CI",
  Cameroon: "CM",
  Mali: "ML",
  Niger: "NE",
  Chad: "TD",
  Guinea: "GN",
  Benin: "BJ",
  Togo: "TG",
  "Sierra Leone": "SL",
  Liberia: "LR",
  Gabon: "GA",
  Congo: "CG",
  "Central African Republic": "CF",
  Eritrea: "ER",
  Djibouti: "DJ",
  Gambia: "GM",
  "Guinea-Bissau": "GW",
  "Cape Verde": "CV",
  "São Tomé and Príncipe": "ST",
  "Equatorial Guinea": "GQ",
  Mauritania: "MR",
  "Western Sahara": "EH",
  China: "CN",
  India: "IN",
  Indonesia: "ID",
  Japan: "JP",
  "South Korea": "KR",
  Singapore: "SG",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Vietnam: "VN",
  Thailand: "TH",
  Malaysia: "MY",
  Philippines: "PH",
  "United Kingdom": "GB",
  Germany: "DE",
  Hungary: "HU",
  Georgia: "GE",
  France: "FR",
  Netherlands: "NL",
  Switzerland: "CH",
  "United States": "US",
  Canada: "CA",
  Brazil: "BR",
  Mexico: "MX",
  Australia: "AU",
  "New Zealand": "NZ",
};

function flagUrl(name: string) {
  const code = FLAG_CODES[name];
  if (!code) return null;
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

function displayName(name: string) {
  return name === "Democratic Republic of the Congo" ? "DRC" : name;
}

function CountryFlag({ name, size = 40 }: { name: string; size?: number }) {
  const src = flagUrl(name);
  const h = Math.round(size * 0.7);
  if (!src) {
    return (
      <div
        className="rounded-md bg-black/5 border border-black/10 flex items-center justify-center text-[10px] font-semibold text-[#525252] shrink-0"
        style={{ width: size, height: h }}
        aria-hidden
      >
        ···
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={h}
      className="rounded-sm border border-black/10 object-cover shadow-sm shrink-0"
      style={{ width: size, height: h }}
    />
  );
}

export default function GlobalPage() {
  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa] w-full min-w-0">
      {/* HERO — full viewport under navbar, all screen sizes */}
      <section className="page-hero" aria-label="Global introduction">
        <div
          className="page-hero__media"
          style={{ backgroundImage: "url('/global-hero.jpg')" }}
          role="img"
          aria-label="Global distribution and route to market"
        />
        <div className={`absolute inset-0 z-[1] ${pageBrand.global.overlay}`} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.22),transparent_55%)]" />
        <div className="page-hero__dots" aria-hidden />

        <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-14 md:py-16 lg:py-20 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/25 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] text-[#7dd3fc] mb-4 sm:mb-6"
          >
            <Globe2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">BIG FIVE GLOBAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-white text-[clamp(1.75rem,5vw+0.55rem,4.75rem)] font-semibold tracking-tighter leading-[1.05] sm:leading-[0.98] mb-4 sm:mb-6 text-balance px-1"
          >
            Building distribution.
            <br />
            Route to market.
            <br />
            Expanding with purpose.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-light tracking-tight mb-7 sm:mb-10 text-pretty px-1"
          >
            Twelve priority nations — nine across Africa plus Germany, Hungary, and Georgia (Europe) —
            where we are building our distribution and route-to-market strategy, including a company
            setup in Kenya, with a clear ambition to reach every market where African excellence can
            lead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto w-full"
          >
            <Link
              href="#active"
              className="premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-8 md:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              <span className="text-center leading-snug">Distribution markets</span>
              <MapPin className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="#ambition"
              className="premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 border border-white/35 text-white px-5 sm:px-8 md:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10"
            >
              <span className="text-center leading-snug">Where we will reach</span>
              <Compass className="w-5 h-5 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { n: "12", l: "Priority distribution markets" },
            { n: "9", l: "Africa route-to-market focus" },
            { n: "3", l: "Europe corridors (DE · HU · GE)" },
            { n: "1", l: "Company established in Kenya" },
          ].map((s) => (
            <div key={s.l} className="text-center lg:text-left min-w-0 px-1">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black tabular-nums">
                {s.n}
              </div>
              <div className="text-[11px] sm:text-sm text-[#525252] mt-1 leading-snug break-words">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center min-w-0">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#0284c7] mb-3 sm:mb-4">
          THE GLOBAL STRATEGY
        </div>
        <h2 className="section-heading text-black mb-4 sm:mb-6 text-balance px-1">
          We do not claim the world.
          <br className="hidden sm:block" />
          We earn every market.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#525252] max-w-3xl mx-auto leading-relaxed text-pretty px-1">
          Big Five Group builds from African soil outward — regenerative farming, fortified
          nutrition, ethical capital access, and Super-Cube® leadership. First we build distribution
          and route-to-market strategy in priority nations. Then we expand with the same integrity
          into the rest of Africa and the world.
        </p>
      </section>

      {/* CORRIDOR VIGNETTE */}
      <section className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 min-w-0">
        <div className="rounded-2xl sm:rounded-3xl border border-[#bae6fd] bg-gradient-to-br from-[#f0f9ff] to-white p-5 sm:p-7 md:p-10 min-w-0">
          <div className="text-[10px] sm:text-xs tracking-[1.5px] sm:tracking-[2px] text-[#0369a1] font-semibold mb-2 sm:mb-3 break-words">
            CORRIDOR VIGNETTE · SOUTH AFRICA → CONTINENT
          </div>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black mb-2 sm:mb-3 text-balance">
            KwaZulu-Natal manufacturing, national school pathways, regional routes
          </h3>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-3 sm:mb-4 text-pretty">
            Fortified porridges and soya minces produced for South African institutional demand —
            including the{" "}
            <a
              href="https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0369a1] underline underline-offset-2 break-words"
            >
              National School Nutrition Programme (NSNP)
            </a>{" "}
            pathway — form the home base of a wider distribution story. From KZN we build
            route-to-market into priority African nations and European corridors (Germany · Hungary ·
            Georgia), with Kenya as East Africa company hub. Same product integrity; local logistics
            and partners.
          </p>
          <p className="text-xs text-[#737373] leading-relaxed">
            High-level overview — ask for a market-by-market brief when you partner with Global or
            Foods.
          </p>
        </div>
      </section>

      {/* DISTRIBUTION & ROUTE TO MARKET */}
      <section id="active" className="bg-white border-y border-black/10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14 min-w-0">
            <div className="min-w-0 max-w-3xl">
              <div className="inline-flex max-w-full items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#0369a1] mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse shrink-0" />
                <span className="truncate">DISTRIBUTION · ROUTE TO MARKET</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black text-balance">
                Building our distribution and route-to-market strategy
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#525252] max-w-2xl leading-relaxed text-pretty">
                Twelve priority nations — nine across Africa plus Germany, Hungary, and Georgia
                (Europe) — where we are building distribution networks, market access, and
                go-to-market pathways. Kenya hosts a full company setup for East Africa.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 content-start min-w-0 xl:max-w-md 2xl:max-w-lg">
              {ACTIVE_COUNTRIES.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[10px] sm:text-xs font-medium text-[#0c4a6e] max-w-full"
                >
                  <CountryFlag name={c.name} size={16} />
                  <span className="truncate">{displayName(c.name)}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {ACTIVE_COUNTRIES.map((country, i) => (
              <motion.article
                key={country.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.04, 0.28) }}
                className="group flex flex-col bg-[#fafafa] border border-black/10 rounded-2xl sm:rounded-[1.75rem] p-4 sm:p-6 md:p-7 lg:p-8 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] transition-all min-w-0 h-full"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-5 min-w-0">
                  <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <CountryFlag name={country.name} size={36} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-black leading-tight break-words">
                        {displayName(country.name)}
                      </h3>
                      <div className="text-[11px] sm:text-sm text-[#075985] font-medium mt-0.5 break-words">
                        {country.role}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 text-[9px] sm:text-[10px] uppercase tracking-[1px] font-semibold text-[#0369a1] bg-[#e0f2fe] px-2 py-1 rounded-full whitespace-nowrap">
                    RTM
                  </span>
                </div>

                <div className="text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[1.5px] text-[#737373] mb-2 sm:mb-3 break-words">
                  {country.focus}
                </div>
                <p className="text-[#404040] leading-relaxed text-sm sm:text-[15px] mb-3 sm:mb-5 flex-1 text-pretty">
                  {country.summary}
                </p>

                <div className="flex items-start gap-2 text-xs sm:text-sm font-medium text-[#075985] min-w-0">
                  {country.name === "Kenya" ? (
                    <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : country.name === "South Africa" ? (
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug break-words">{country.highlight}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* KENYA + SA CALL OUT */}
      <section className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="rounded-2xl sm:rounded-[1.75rem] bg-black text-white p-6 sm:p-8 md:p-9 lg:p-10 relative overflow-hidden min-w-0">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#0ea5e9]/20 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#38bdf8] mb-3 sm:mb-4">
                HEADQUARTERS
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-2 sm:mb-3">
                South Africa
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-5 sm:mb-6 text-pretty">
                KwaZulu-Natal is the nerve centre — leadership, manufacturing partnerships,
                regenerative agri programmes, and the Super-Cube® model that powers the group
                worldwide.
              </p>
              <Link
                href="/africa"
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[1.5px] sm:tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
              >
                Explore Africa footprint
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl sm:rounded-[1.75rem] bg-gradient-to-br from-[#0284c7] to-[#0c4a6e] text-white p-6 sm:p-8 md:p-9 lg:p-10 relative overflow-hidden min-w-0">
            <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#bae6fd] mb-3 sm:mb-4">
                COMPANY ESTABLISHED
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-2 sm:mb-3">
                Kenya
              </h3>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-5 sm:mb-6 text-pretty">
                Our East African company setup positions Big Five to scale regenerative commerce,
                institutional partnerships, and ethical supply chains from Nairobi into the region.
              </p>
              <div className="inline-flex max-w-full flex-wrap items-center gap-2 text-xs sm:text-sm font-medium bg-white/15 backdrop-blur px-3 sm:px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="min-w-0">Registered presence · East Africa hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFRICA EXPANSION */}
      <section id="ambition" className="bg-[#0a0a0a] text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-3xl min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#7dd3fc] mb-3 sm:mb-4">
              <Target className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">EXPANSION ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter mb-3 sm:mb-5 text-balance">
              Where we aim to reach next
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/65 leading-relaxed text-pretty">
              Beyond our twelve active nations, we are building partnerships and capability to serve
              the rest of Africa — and, with African standards, the wider world. These markets are
              not yet full operations; they are our deliberate expansion horizon.
            </p>
          </div>

          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight shrink-0">
              Rest of Africa
            </h3>
            <span className="self-start text-[10px] sm:text-xs tracking-[1.5px] uppercase text-white/40 border border-white/15 rounded-full px-2.5 sm:px-3 py-1 whitespace-nowrap">
              Ambition · Not yet fully operational
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-10 sm:mb-12 md:mb-16">
            {AFRICA_EXPANSION.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] px-2.5 sm:px-3 py-2.5 sm:py-3 hover:bg-white/[0.06] transition-colors min-w-0"
              >
                <CountryFlag name={name} size={26} />
                <span className="text-xs sm:text-sm text-white/80 leading-tight break-words min-w-0">
                  {name}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight shrink-0">
              Global horizons
            </h3>
            <span className="self-start text-[10px] sm:text-xs tracking-[1.5px] uppercase text-white/40 border border-white/15 rounded-full px-2.5 sm:px-3 py-1 whitespace-nowrap">
              International ambition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {GLOBAL_AMBITION.map((block) => (
              <div
                key={block.region}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 md:p-8 min-w-0"
              >
                <div className="text-[10px] sm:text-xs tracking-[2px] text-[#38bdf8] mb-1.5 sm:mb-2">
                  {block.region.toUpperCase()}
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{block.region}</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {block.countries.map((c) => (
                    <span
                      key={c}
                      className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/75 bg-white/5 border border-white/10 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 min-w-0"
                    >
                      {flagUrl(c) && <CountryFlag name={c} size={16} />}
                      <span className="truncate">{c}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Group companies across priority markets" />

      {/* HOW WE EXPAND */}
      <section className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 min-w-0">
        <div className="text-center mb-8 sm:mb-10 md:mb-14 px-1">
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#0284c7] mb-3 sm:mb-4">
            HOW WE GROW
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black text-balance">
            Expansion with integrity
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {[
            {
              icon: MapPin,
              title: "Build distribution first",
              desc: "In twelve priority nations — including South Africa, Kenya, Germany, Hungary, and Georgia (Europe) — we build distribution and route-to-market strategy before we scale.",
            },
            {
              icon: Handshake,
              title: "Partner before we plant a flag",
              desc: "Governments, DFIs, tribal authorities, and local enterprises co-design every new market entry.",
            },
            {
              icon: Globe2,
              title: "Export African standards",
              desc: "Super-Cube® leadership, regenerative agri, and on-chain ethics travel with us — never diluted for growth.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 hover:border-black/20 transition-colors min-w-0 h-full"
            >
              <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0284c7] mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed text-pretty">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-12 sm:py-16 md:py-20 lg:py-24 text-center px-4 sm:px-6">
        <div className="max-w-2xl md:max-w-3xl mx-auto min-w-0">
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#38bdf8] mb-3 sm:mb-4">
            PARTNER GLOBALLY
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance px-1">
            Bring Big Five to your market
          </h2>
          <p className="text-white/65 text-sm sm:text-base md:text-lg mb-7 sm:mb-10 leading-relaxed text-pretty px-1">
            Whether you sit in a priority distribution market or on our expansion map —
            governments, investors, producers, and institutions are welcome at the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto w-full">
            <Link
              href="/connect"
              className="premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              <span className="text-center leading-snug">Start a conversation</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="/africa"
              className="premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 border border-white/30 text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10"
            >
              <span className="text-center leading-snug">View Africa in depth</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
