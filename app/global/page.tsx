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
      "Strategic West African operations focused on institutional partnerships, fortified nutrition pathways, and ethical commerce corridors into ECOWAS markets.",
    highlight: "Active operations",
  },
  {
    name: "Zambia",
    code: "ZM",
    role: "Southern / Central Africa",
    focus: "Agriculture · Trade · Community impact",
    summary:
      "Active engagement on regenerative agriculture, market access, and community-linked nutrition programmes that retain value for local producers.",
    highlight: "Active operations",
  },
  {
    name: "Democratic Republic of the Congo",
    code: "CD",
    role: "Central Africa",
    focus: "Food systems · Last-mile access",
    summary:
      "Working where the need is greatest — supporting ethical supply chains, nutrition delivery, and transparent partnership models in complex markets.",
    highlight: "Active operations",
  },
  {
    name: "Tanzania",
    code: "TZ",
    role: "East Africa",
    focus: "Farming systems · Distribution",
    summary:
      "Building regenerative and trade linkages that connect smallholders to verified markets while strengthening regional food sovereignty.",
    highlight: "Active operations",
  },
  {
    name: "Namibia",
    code: "NA",
    role: "Southern Africa",
    focus: "Climate-smart agri · Partnerships",
    summary:
      "Advancing climate-resilient agriculture and ethical commercial partnerships across one of the region’s most strategically important corridors.",
    highlight: "Active operations",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    role: "Southern Africa",
    focus: "Food security · Producer empowerment",
    summary:
      "Supporting producers and institutions with nutrition solutions, market access, and leadership capability where food systems demand urgency and integrity.",
    highlight: "Active operations",
  },
  {
    name: "Lesotho",
    code: "LS",
    role: "Southern Africa",
    focus: "Community · Nutrition · Sovereignty",
    summary:
      "Working alongside communities and partners to strengthen local food security, skills, and dignified economic participation.",
    highlight: "Active operations",
  },
  {
    name: "Germany",
    code: "DE",
    role: "Europe · Partnerships",
    focus: "Trade · Investment · Institutional alliances",
    summary:
      "Active European engagement spanning strategic partnerships, investment dialogue, and corridors that connect African regenerative excellence with German and EU markets.",
    highlight: "Active operations",
  },
  {
    name: "Hungary",
    code: "HU",
    role: "Europe · Central Europe",
    focus: "Partnerships · Market access · Collaboration",
    summary:
      "Active work in Hungary building partnerships and market pathways that link Central European institutions and networks with Big Five’s African ecosystem.",
    highlight: "Active operations",
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

function CountryFlag({ name, size = 40 }: { name: string; size?: number }) {
  const src = flagUrl(name);
  if (!src) {
    return (
      <div
        className="rounded-md bg-black/5 border border-black/10 flex items-center justify-center text-[10px] font-semibold text-[#525252]"
        style={{ width: size, height: Math.round(size * 0.7) }}
      >
        ···
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={`${name} flag`}
      width={size}
      height={Math.round(size * 0.7)}
      className="rounded-sm border border-black/10 object-cover shadow-sm"
    />
  );
}

export default function GlobalPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[min(88dvh,720px)] sm:min-h-[min(100dvh,880px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/global-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.18),transparent_55%)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/25 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] text-[#7dd3fc] mb-5 sm:mb-6"
          >
            <Globe2 className="w-3.5 h-3.5 shrink-0" />
            BIG FIVE GLOBAL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-white text-[clamp(1.85rem,5.5vw+0.5rem,4.75rem)] font-semibold tracking-tighter leading-[1.02] sm:leading-[0.95] mb-5 sm:mb-6 text-balance"
          >
            Active where it matters.
            <br />
            Expanding with purpose.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-white/90 font-light tracking-tight mb-8 sm:mb-10"
          >
            Eleven nations operational today — nine across Africa plus Germany and Hungary —
            including a company setup in Kenya, with a clear ambition to reach every market where African excellence can lead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
          >
            <Link
              href="#active"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
            >
              Where we work now
              <MapPin className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              href="#ambition"
              className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/35 text-white px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10"
            >
              Where we will reach
              <Compass className="w-5 h-5 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { n: "11", l: "Active nations today" },
            { n: "9", l: "Active across Africa" },
            { n: "2", l: "Active in Europe (DE · HU)" },
            { n: "1", l: "Company established in Kenya" },
          ].map((s) => (
            <div key={s.l} className="text-center lg:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
                {s.n}
              </div>
              <div className="text-sm text-[#525252] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        <div className="text-xs tracking-[3px] text-[#0284c7] mb-4">THE GLOBAL STRATEGY</div>
        <h2 className="section-heading text-black mb-6">
          We do not claim the world.
          <br className="hidden sm:block" />
          We earn every market.
        </h2>
        <p className="text-lg sm:text-xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
          Big Five Group builds from African soil outward — regenerative farming, fortified nutrition,
          ethical capital access, and Super-Cube® leadership. First we deepen where we already operate.
          Then we expand with the same integrity into the rest of Africa and the world.
        </p>
      </section>

      {/* ACTIVE OPERATIONS */}
      <section id="active" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-[#0369a1] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                LIVE OPERATIONS
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
                Where we are working now
              </h2>
              <p className="mt-4 text-lg text-[#525252] max-w-2xl">
                Eleven nations with active Big Five presence — nine across Africa plus Germany and Hungary.
                Partnerships, programmes, and on-the-ground work are already underway. Kenya hosts a full
                company setup for East Africa.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {ACTIVE_COUNTRIES.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-xs font-medium text-[#0c4a6e]"
                >
                  <CountryFlag name={c.name} size={18} />
                  {c.name === "Democratic Republic of the Congo" ? "DRC" : c.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {ACTIVE_COUNTRIES.map((country, i) => (
              <motion.article
                key={country.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.04, 0.28) }}
                className="group relative bg-[#fafafa] border border-black/10 rounded-[1.75rem] p-7 sm:p-8 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] transition-all"
              >
                <div className="absolute top-6 right-6">
                  <span className="text-[10px] uppercase tracking-[1.5px] font-semibold text-[#0369a1] bg-[#e0f2fe] px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-5 pr-16">
                  <CountryFlag name={country.name} size={48} />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black leading-tight">
                      {country.name}
                    </h3>
                    <div className="text-sm text-[#075985] font-medium mt-0.5">{country.role}</div>
                  </div>
                </div>

                <div className="text-xs uppercase tracking-[1.5px] text-[#737373] mb-3">
                  {country.focus}
                </div>
                <p className="text-[#404040] leading-relaxed text-[15px] mb-5">{country.summary}</p>

                <div className="flex items-center gap-2 text-sm font-medium text-[#075985]">
                  {country.name === "Kenya" ? (
                    <Building2 className="w-4 h-4 shrink-0" />
                  ) : country.name === "South Africa" ? (
                    <Sparkles className="w-4 h-4 shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 shrink-0" />
                  )}
                  {country.highlight}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* KENYA + SA CALL OUT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-[1.75rem] bg-black text-white p-9 sm:p-10 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#0ea5e9]/20 blur-2xl" />
            <div className="text-xs tracking-[3px] text-[#38bdf8] mb-4">HEADQUARTERS</div>
            <h3 className="text-3xl font-semibold tracking-tighter mb-3">South Africa</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              KwaZulu-Natal is the nerve centre — leadership, manufacturing partnerships, regenerative
              agri programmes, and the Super-Cube® model that powers the group worldwide.
            </p>
            <Link
              href="/africa"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[2px] text-white border-b border-white/30 pb-1 hover:border-white"
            >
              Explore Africa footprint
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0284c7] to-[#0c4a6e] text-white p-9 sm:p-10 relative overflow-hidden">
            <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="text-xs tracking-[3px] text-[#bae6fd] mb-4">COMPANY ESTABLISHED</div>
            <h3 className="text-3xl font-semibold tracking-tighter mb-3">Kenya</h3>
            <p className="text-white/85 leading-relaxed mb-6">
              Our East African company setup positions Big Five to scale regenerative commerce,
              institutional partnerships, and ethical supply chains from Nairobi into the region.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium bg-white/15 backdrop-blur px-4 py-2 rounded-full">
              <Building2 className="w-4 h-4" />
              Registered presence · East Africa hub
            </div>
          </div>
        </div>
      </section>

      {/* AFRICA EXPANSION */}
      <section id="ambition" className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-[#7dd3fc] mb-4">
              <Target className="w-3.5 h-3.5" />
              EXPANSION ROADMAP
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-5">
              Where we aim to reach next
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">
              Beyond our eleven active nations, we are building partnerships and capability to serve the
              rest of Africa — and, with African standards, the wider world. These markets are not yet
              full operations; they are our deliberate expansion horizon.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">Rest of Africa</h3>
            <span className="text-xs tracking-[1.5px] uppercase text-white/40 border border-white/15 rounded-full px-3 py-1">
              Ambition · Not yet fully operational
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-16">
            {AFRICA_EXPANSION.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 hover:bg-white/[0.06] transition-colors"
              >
                <CountryFlag name={name} size={28} />
                <span className="text-sm text-white/80 leading-tight">{name}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">Global horizons</h3>
            <span className="text-xs tracking-[1.5px] uppercase text-white/40 border border-white/15 rounded-full px-3 py-1">
              International ambition
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {GLOBAL_AMBITION.map((block) => (
              <div
                key={block.region}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
              >
                <div className="text-xs tracking-[2px] text-[#38bdf8] mb-2">{block.region.toUpperCase()}</div>
                <h4 className="text-xl font-semibold mb-4">{block.region}</h4>
                <div className="flex flex-wrap gap-2">
                  {block.countries.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-2 text-sm text-white/75 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                    >
                      {flagUrl(c) && <CountryFlag name={c} size={18} />}
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Group companies across active markets" />

      {/* HOW WE EXPAND */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[3px] text-[#0284c7] mb-4">HOW WE GROW</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
            Expansion with integrity
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: MapPin,
              title: "Deepen active markets",
              desc: "Double down in our eleven active nations — including South Africa, Kenya, Germany, and Hungary — proof before scale.",
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
              className="bg-white border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-colors"
            >
              <item.icon className="w-10 h-10 text-[#0284c7] mb-5" />
              <h3 className="text-xl font-semibold tracking-tight text-black mb-3">{item.title}</h3>
              <p className="text-[#525252] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 sm:py-20 md:py-24 text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[3px] text-[#38bdf8] mb-4">PARTNER GLOBALLY</div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
            Bring Big Five to your market
          </h2>
          <p className="text-white/65 text-lg mb-10">
            Whether you sit in an active nation or on our expansion map — governments, investors,
            producers, and institutions are welcome at the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              Start a conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/africa"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              View Africa in depth
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
