"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GlobalPage() {
  const countryDescriptions: Record<string, string> = {
    // AFRICA (54 countries)
    "South Africa": "South Africa faces severe food insecurity affecting 13.5 million people (Stats SA 2024). 32% unemployment and extreme inequality (Gini 0.63) drive poverty. (Sources: Stats SA 2023; World Bank 2024; FAO 2024)",
    "Nigeria": "Nigeria faces severe food insecurity affecting 26 million people due to insurgency, conflicts, and inflation. Poverty rate stands at 63%. (Sources: WFP 2024; FAO 2024; NBS 2023)",
    "Ethiopia": "Ethiopia has 24 million people requiring food assistance in 2024 due to conflict and drought. (Sources: WFP 2024; FAO 2024)",
    "Democratic Republic of the Congo": "The DRC faces one of the world’s most severe food crises, with 27.7 million in acute food insecurity due to conflict and displacement. (Sources: WFP 2025; World Bank 2025)",
    "Egypt": "Egypt has ~30% below the poverty line and faces food insecurity from subsidy changes and Nile water stress. (Sources: World Bank 2025; FAO 2024)",
    "South Sudan": "South Sudan has 76% poverty and 7.1 million facing acute food insecurity. (Sources: WFP 2025; World Bank 2024)",
    "Somalia": "Somalia has 54% poverty and over 6.9 million facing acute food insecurity due to drought and conflict. (Sources: WFP 2025; FAO 2024)",
    "Sudan": "Sudan faces one of the world's worst humanitarian crises with ~25 million in acute food insecurity due to civil war. (Sources: WFP 2025; IPC 2025)",
    "Kenya": "Kenya battles recurrent droughts and locust invasions, leaving 4.4 million food insecure in 2024. (Sources: FAO 2024; WFP 2024)",
    "Tanzania": "Tanzania has 26% poverty and 1.3 million facing acute food insecurity. (Sources: World Bank 2023; FAO 2024)",
    "Uganda": "Uganda faces 19% poverty and 3.5 million in food insecurity due to refugee influx and climate variability. (Sources: WFP 2024; FAO 2024)",
    "Rwanda": "Rwanda has reduced poverty to 38% but food insecurity still affects 18% of households. (Sources: World Bank 2024; FAO 2024)",
    "Burundi": "Burundi has 65% poverty and faces chronic food insecurity affecting 2.3 million people. (Sources: World Bank 2024; FAO 2024)",
    "Zimbabwe": "Zimbabwe faces extreme food insecurity — 5.7 million people require food assistance in 2024. (Sources: WFP 2024; ZIMSTAT 2023)",
    "Zambia": "Zambia has 59% of the population living in poverty and 1.6 million facing acute food insecurity. (Sources: World Bank 2023; FAO 2024)",
    "Mozambique": "Mozambique has 63% poverty and 2.8 million facing severe food insecurity due to conflict and climate disasters. (Sources: WFP 2024; FAO 2024)",
    "Angola": "Angola has 32% poverty despite oil wealth, with 4.2 million facing acute food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Namibia": "Namibia has one of the highest inequality rates globally (Gini 0.59). 43% live below the poverty line. (Sources: World Bank 2024; Namibia Statistics Agency 2023)",
    "Botswana": "Despite upper-middle-income status, 24% of Batswana live in poverty. (Sources: Statistics Botswana 2023; FAO 2024)",
    "Lesotho": "Lesotho has 49% poverty and 40% of households facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Eswatini": "Eswatini has 59% poverty and 30% facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Madagascar": "Madagascar has over 70% poverty and 8.8 million facing acute food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Malawi": "Malawi has 50% poverty and recurrent food insecurity affecting 3.5 million people. (Sources: World Bank 2024; FAO 2024)",
    "Mozambique": "Mozambique has 63% poverty and 2.8 million facing severe food insecurity. (Sources: WFP 2024; FAO 2024)",
    "Comoros": "Comoros faces 45% poverty and chronic food insecurity affecting 35% of households. (Sources: FAO 2024; UNICEF 2024)",
    "Mauritius": "Mauritius has reduced poverty to under 8% but faces rising food insecurity due to climate change. (Sources: World Bank 2024; FAO 2024)",
    "Seychelles": "Seychelles has very low poverty (under 5%) and strong food security. (Sources: FAO 2024; UNICEF 2024)",

    // ASIA
    "China": "China has reduced extreme poverty to near zero but faces rising inequality and food security challenges from climate change. (Sources: World Bank 2024; FAO 2024)",
    "India": "India has reduced extreme poverty significantly but still has over 200 million people facing food insecurity. Child stunting remains high at 35%. (Sources: World Bank 2024; FAO 2024)",
    "Indonesia": "Indonesia has reduced poverty to 9.5% but 19.4 million still face food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Pakistan": "Pakistan has 40%+ multidimensional poverty and 8.6 million facing acute food insecurity. (Sources: WFP 2025; World Bank 2024)",
    "Bangladesh": "Bangladesh has reduced poverty to 18.7% but faces severe climate vulnerability. (Sources: World Bank 2024; FAO 2024)",
    "Japan": "Japan has very low poverty but faces severe demographic decline and high food import dependence. (Sources: FAO 2024; Statistics Bureau of Japan 2023)",
    "Philippines": "Philippines has 18% poverty and 17.5 million facing food insecurity, worsened by frequent typhoons. (Sources: World Bank 2024; FAO 2024)",
    "Vietnam": "Vietnam has reduced poverty dramatically to under 5% but faces increasing inequality and climate threats. (Sources: World Bank 2024; FAO 2024)",
    "Thailand": "Thailand has low poverty (under 10%) but faces rising inequality and 6.5 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Myanmar": "Myanmar faces severe crisis with over 15 million in humanitarian need and widespread food insecurity due to conflict. (Sources: WFP 2025; FAO 2024)",
    "South Korea": "South Korea has low poverty but extremely high youth unemployment and work-life imbalance. (Sources: World Bank 2024; FAO 2024)",
    "North Korea": "North Korea faces chronic food insecurity affecting millions, with stunting rates among children remaining critically high. (Sources: WFP 2024; FAO 2024)",
    "Malaysia": "Malaysia has low poverty (under 6%) but faces rising cost of living and 1.2 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Cambodia": "Cambodia has 17% poverty and 2.4 million facing food insecurity. Stunting affects 22% of children. (Sources: World Bank 2024; FAO 2024)",
    "Laos": "Laos has 18% poverty and 1.2 million facing food insecurity, with high stunting rates (33%). (Sources: World Bank 2024; FAO 2024)",
    "Singapore": "Singapore has very low poverty but faces 100% food import dependence. (Sources: FAO 2024; Singapore Department of Statistics 2023)",
    "Nepal": "Nepal has 18% poverty and 4.6 million facing food insecurity, with high stunting rates (25%). (Sources: World Bank 2024; FAO 2024)",
    "Sri Lanka": "Sri Lanka faces economic crisis with 25% poverty and rising food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Bhutan": "Bhutan has very low poverty (under 10%) and strong food security thanks to Gross National Happiness policies. (Sources: World Bank 2024; FAO 2024)",
    "Maldives": "Maldives has low poverty but faces existential threat from rising sea levels. (Sources: World Bank 2024; FAO 2024)",
    "Timor-Leste": "Timor-Leste has 42% poverty and 37% facing food insecurity. Stunting affects 47% of children. (Sources: World Bank 2024; FAO 2024)",
    "Mongolia": "Mongolia has 27% poverty and faces food insecurity in rural areas due to harsh climate. (Sources: World Bank 2024; FAO 2024)",
    "Kazakhstan": "Kazakhstan has 5% poverty but faces rising inequality and food insecurity in rural areas. (Sources: World Bank 2024; FAO 2024)",
    "Uzbekistan": "Uzbekistan has 11% poverty and 2.1 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Tajikistan": "Tajikistan has 23% poverty and 1.4 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Kyrgyzstan": "Kyrgyzstan has 33% poverty and 1.1 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Turkmenistan": "Turkmenistan has low official poverty but faces limited data transparency. (Sources: World Bank estimates 2024; FAO 2024)",
    "Afghanistan": "Afghanistan faces one of the world's worst humanitarian crises with over 24 million in need and widespread food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Yemen": "Yemen faces the world's worst humanitarian crisis with 21.6 million in need and 17 million facing acute food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Syria": "Syria faces one of the world's worst humanitarian crises with 12.9 million in need. (Sources: WFP 2025; FAO 2024)",
    "Iraq": "Iraq has 18% poverty and 2.5 million facing food insecurity due to conflict legacy. (Sources: WFP 2024; World Bank 2024)",
    "Iran": "Iran faces 30%+ poverty and severe food insecurity due to sanctions and economic crisis. (Sources: World Bank 2024; FAO 2024)",
    "Saudi Arabia": "Saudi Arabia has low official poverty but faces rising inequality and food import dependence (over 80%). (Sources: World Bank 2024; FAO 2024)",
    "United Arab Emirates": "UAE has very low poverty but faces 100% food import dependence. (Sources: FAO 2024; UAE Government 2023)",
    "Qatar": "Qatar has very low poverty but faces 100% food import dependence. (Sources: FAO 2024)",
    "Kuwait": "Kuwait has very low poverty but faces 100% food import dependence. (Sources: FAO 2024)",
    "Bahrain": "Bahrain has very low poverty but faces 100% food import dependence. (Sources: FAO 2024)",
    "Oman": "Oman has low poverty but faces rising inequality and food import dependence. (Sources: World Bank 2024; FAO 2024)",
    "Jordan": "Jordan has 15% poverty and 1.8 million facing food insecurity, heavily impacted by hosting millions of refugees. (Sources: WFP 2024; World Bank 2024)",
    "Lebanon": "Lebanon faces severe economic crisis with over 80% of the population in poverty. (Sources: WFP 2025; World Bank 2024)",
    "Israel": "Israel has low poverty (under 20%) but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Palestine": "Palestine faces 53% poverty in Gaza and 30% in West Bank with widespread food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Turkey": "Turkey faces 21% poverty and rising food insecurity due to inflation. (Sources: World Bank 2024; FAO 2024)",

    // EUROPE
    "Germany": "Germany has low poverty (under 15%) but faces rising inequality and energy/food price shocks. (Sources: World Bank 2024; FAO 2024)",
    "France": "France has 14% poverty but faces rising inequality and 3.2 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "United Kingdom": "UK has 18% poverty and 2.5 million facing food insecurity, worsened by cost-of-living crisis. (Sources: World Bank 2024; FAO 2024)",
    "Italy": "Italy has 20% poverty and 2.8 million facing food insecurity, with high youth unemployment. (Sources: World Bank 2024; FAO 2024)",
    "Spain": "Spain has 20% poverty and 2.4 million facing food insecurity, with very high youth unemployment. (Sources: World Bank 2024; FAO 2024)",
    "Poland": "Poland has 15% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Ukraine": "Ukraine faces catastrophic humanitarian crisis with over 6 million internally displaced and 11 million facing food insecurity due to war. (Sources: WFP 2025; FAO 2024)",
    "Russia": "Russia has 12% poverty but faces rising inequality and 5 million in food insecurity due to war and sanctions. (Sources: World Bank 2024; FAO 2024)",
    "Sweden": "Sweden has 15% poverty but faces rising inequality and 1.2 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Norway": "Norway has very low poverty but faces high cost of living. (Sources: World Bank 2024; FAO 2024)",
    "Denmark": "Denmark has very low poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Finland": "Finland has 12% poverty but faces rising food insecurity due to inflation. (Sources: World Bank 2024; FAO 2024)",
    "Netherlands": "Netherlands has very low poverty but faces rising cost of living and 1.1 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Belgium": "Belgium has 13% poverty but faces rising inequality and 800,000 in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Switzerland": "Switzerland has very low poverty but faces high cost of living. (Sources: World Bank 2024; FAO 2024)",
    "Austria": "Austria has 13% poverty but faces rising energy and food costs. (Sources: World Bank 2024; FAO 2024)",
    "Portugal": "Portugal has 16% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Greece": "Greece has 20% poverty and 1.5 million facing food insecurity due to economic crisis legacy. (Sources: World Bank 2024; FAO 2024)",
    "Romania": "Romania has 23% poverty and 2.1 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Bulgaria": "Bulgaria has 22% poverty and 1.2 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Hungary": "Hungary has 18% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Czech Republic": "Czech Republic has 10% poverty but faces rising cost of living. (Sources: World Bank 2024; FAO 2024)",
    "Slovakia": "Slovakia has 12% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Croatia": "Croatia has 18% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Serbia": "Serbia has 21% poverty and 800,000 facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Bosnia and Herzegovina": "Bosnia and Herzegovina has 17% poverty and 400,000 facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Albania": "Albania has 22% poverty and 400,000 facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Moldova": "Moldova has 26% poverty and 400,000 facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Belarus": "Belarus has 5% official poverty but faces rising inequality and limited data transparency. (Sources: World Bank estimates 2024; FAO 2024)",

    // NORTH AMERICA
    "United States": "United States has 11.5% poverty (2023) but faces rising inequality and 13 million households experiencing food insecurity. (Sources: USDA 2024; World Bank 2024)",
    "Canada": "Canada has 11% poverty but faces rising cost of living and 1.8 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Mexico": "Mexico has 36% poverty and 28 million facing food insecurity. Stunting affects 13% of children. (Sources: World Bank 2024; FAO 2024)",

    // SOUTH AMERICA
    "Brazil": "Brazil has 24% poverty and 33 million facing food insecurity. Stunting affects 7% of children. (Sources: World Bank 2024; FAO 2024)",
    "Argentina": "Argentina faces 40% poverty and 12 million in food insecurity due to economic crisis and inflation. (Sources: World Bank 2024; FAO 2024)",
    "Colombia": "Colombia has 36% poverty and 8 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Peru": "Peru has 29% poverty and 6 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Chile": "Chile has 10% poverty but faces rising inequality. (Sources: World Bank 2024; FAO 2024)",
    "Venezuela": "Venezuela faces catastrophic crisis with over 7 million in humanitarian need and widespread food insecurity. (Sources: WFP 2025; FAO 2024)",
    "Ecuador": "Ecuador has 25% poverty and 3 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Bolivia": "Bolivia has 36% poverty and 2.5 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Paraguay": "Paraguay has 24% poverty and 1.5 million facing food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Uruguay": "Uruguay has 10% poverty and strong social safety nets. (Sources: World Bank 2024; FAO 2024)",
    "Guyana": "Guyana has 35% poverty but faces rising inequality despite oil boom. (Sources: World Bank 2024; FAO 2024)",
    "Suriname": "Suriname has 70% poverty and faces severe food insecurity. (Sources: World Bank 2024; FAO 2024)",

    // OCEANIA
    "Australia": "Australia has 13% poverty but faces rising inequality and 3.7 million in food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "New Zealand": "New Zealand has 10% poverty but faces rising cost of living. (Sources: World Bank 2024; FAO 2024)",
    "Papua New Guinea": "Papua New Guinea has 37% poverty and 2.4 million facing food insecurity. Stunting affects 48% of children. (Sources: World Bank 2024; FAO 2024)",
    "Fiji": "Fiji has 24% poverty and faces climate vulnerability and food insecurity. (Sources: World Bank 2024; FAO 2024)",
    "Solomon Islands": "Solomon Islands has 25% poverty and faces severe climate and food security challenges. (Sources: World Bank 2024; FAO 2024)",
    "Vanuatu": "Vanuatu has 40% poverty and faces existential climate threats. (Sources: World Bank 2024; FAO 2024)",
    "Samoa": "Samoa has 20% poverty and faces rising non-communicable diseases and food import dependence. (Sources: World Bank 2024; FAO 2024)",
    "Tonga": "Tonga has 22% poverty and faces severe climate vulnerability. (Sources: World Bank 2024; FAO 2024)",
    "Kiribati": "Kiribati faces existential threat from rising sea levels and 22% poverty. (Sources: World Bank 2024; FAO 2024)",
    "Tuvalu": "Tuvalu faces existential threat from rising sea levels with very small population. (Sources: World Bank 2024; FAO 2024)",
    "Palau": "Palau has very low poverty but faces climate vulnerability. (Sources: World Bank 2024; FAO 2024)",
    "Marshall Islands": "Marshall Islands faces existential threat from rising sea levels. (Sources: World Bank 2024; FAO 2024)",
    "Micronesia": "Micronesia faces existential threat from rising sea levels and high poverty. (Sources: World Bank 2024; FAO 2024)",
    "Nauru": "Nauru faces existential threat from rising sea levels and high poverty. (Sources: World Bank 2024; FAO 2024)"
  };

  const getFlagUrl = (countryName: string) => {
    const flagMap: Record<string, string> = {
      "South Africa": "ZA", "Nigeria": "NG", "Ethiopia": "ET", "Democratic Republic of the Congo": "CD",
      "Egypt": "EG", "South Sudan": "SS", "Somalia": "SO", "Sudan": "SD", "Kenya": "KE",
      "Tanzania": "TZ", "Uganda": "UG", "Rwanda": "RW", "Burundi": "BI", "Zimbabwe": "ZW",
      "Zambia": "ZM", "Mozambique": "MZ", "Angola": "AO", "Namibia": "NA", "Botswana": "BW",
      "Lesotho": "LS", "Eswatini": "SZ", "Madagascar": "MG", "Malawi": "MW", "Comoros": "KM",
      "Mauritius": "MU", "Seychelles": "SC", "China": "CN", "India": "IN", "Indonesia": "ID",
      "Pakistan": "PK", "Bangladesh": "BD", "Japan": "JP", "Philippines": "PH", "Vietnam": "VN",
      "Thailand": "TH", "Myanmar": "MM", "South Korea": "KR", "North Korea": "KP", "Malaysia": "MY",
      "Cambodia": "KH", "Laos": "LA", "Singapore": "SG", "Nepal": "NP", "Sri Lanka": "LK",
      "Bhutan": "BT", "Maldives": "MV", "Timor-Leste": "TL", "Mongolia": "MN", "Kazakhstan": "KZ",
      "Uzbekistan": "UZ", "Kyrgyzstan": "KG", "Tajikistan": "TJ", "Turkmenistan": "TM",
      "Afghanistan": "AF", "Yemen": "YE", "Syria": "SY", "Iraq": "IQ", "Iran": "IR",
      "Saudi Arabia": "SA", "United Arab Emirates": "AE", "Qatar": "QA", "Kuwait": "KW",
      "Bahrain": "BH", "Oman": "OM", "Jordan": "JO", "Lebanon": "LB", "Israel": "IL",
      "Palestine": "PS", "Turkey": "TR", "Germany": "DE", "France": "FR", "United Kingdom": "GB",
      "Italy": "IT", "Spain": "ES", "Poland": "PL", "Ukraine": "UA", "Russia": "RU",
      "Sweden": "SE", "Norway": "NO", "Denmark": "DK", "Finland": "FI", "Netherlands": "NL",
      "Belgium": "BE", "Switzerland": "CH", "Austria": "AT", "Portugal": "PT", "Greece": "GR",
      "Romania": "RO", "Bulgaria": "BG", "Hungary": "HU", "Czech Republic": "CZ", "Slovakia": "SK",
      "Croatia": "HR", "Serbia": "RS", "Bosnia and Herzegovina": "BA", "Albania": "AL",
      "Moldova": "MD", "Belarus": "BY", "United States": "US", "Canada": "CA", "Mexico": "MX",
      "Brazil": "BR", "Argentina": "AR", "Colombia": "CO", "Peru": "PE", "Chile": "CL",
      "Venezuela": "VE", "Ecuador": "EC", "Bolivia": "BO", "Paraguay": "PY", "Uruguay": "UY",
      "Guyana": "GY", "Suriname": "SR", "Australia": "AU", "New Zealand": "NZ",
      "Papua New Guinea": "PG", "Fiji": "FJ", "Solomon Islands": "SB", "Vanuatu": "VU",
      "Samoa": "WS", "Tonga": "TO", "Kiribati": "KI", "Tuvalu": "TV", "Palau": "PW",
      "Marshall Islands": "MH", "Micronesia": "FM", "Nauru": "NR"
    };
    const code = flagMap[countryName] || "UN";
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  };

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/africa-hero.jpg')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-15" />
        <div className="absolute inset-0 bg-black/35" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#4ade80] text-xs tracking-[4px] mb-6">GLOBAL PRESENCE</div>
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            BIG FIVE GROUP<br />GLOBAL
          </h1>
          <p className="max-w-3xl mx-auto text-2xl text-white/95 font-light tracking-tight mb-12">
            From Africa to the World — Building Global Impact with African Values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#regions" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
              EXPLORE OUR GLOBAL FOOTPRINT
            </Link>
            <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10">
              PARTNER WITH US
            </Link>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section id="regions" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-emerald-600 mb-4">195+ NATIONS • ONE ECOSYSTEM</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Our Global Footprint</h2>
          <p className="max-w-2xl mx-auto text-xl text-[#525252]">
            Big Five Group is building a global presence rooted in African sovereignty, ethics, and regenerative principles.
          </p>
        </div>

        <div className="space-y-20">
          {/* AFRICA */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Africa</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {["South Africa", "Nigeria", "Ethiopia", "Democratic Republic of the Congo", "Egypt", "South Sudan", "Somalia", "Sudan", "Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Zimbabwe", "Zambia", "Mozambique", "Angola", "Namibia", "Botswana", "Lesotho", "Eswatini", "Madagascar", "Malawi", "Comoros", "Mauritius", "Seychelles"].map((name, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                    <div className="font-semibold text-2xl text-black">{name}</div>
                  </div>
                  <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ASIA */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Asia</h3>
            </div>
            
            <div className="mb-12">
              <div className="text-xl font-semibold text-black mb-6">East Asia</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["China", "Japan", "South Korea", "North Korea", "Mongolia"].map((name, i) => (
                  <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                      <div className="font-semibold text-2xl text-black">{name}</div>
                    </div>
                    <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="text-xl font-semibold text-black mb-6">South Asia</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Bhutan", "Maldives"].map((name, i) => (
                  <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                      <div className="font-semibold text-2xl text-black">{name}</div>
                    </div>
                    <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="text-xl font-semibold text-black mb-6">Southeast Asia</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Indonesia", "Vietnam", "Thailand", "Philippines", "Myanmar", "Malaysia", "Singapore", "Cambodia", "Laos", "Timor-Leste"].map((name, i) => (
                  <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                      <div className="font-semibold text-2xl text-black">{name}</div>
                    </div>
                    <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EUROPE */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Europe</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {["Germany", "France", "United Kingdom", "Italy", "Spain", "Poland", "Ukraine", "Russia", "Sweden", "Norway", "Greece", "Romania", "Bulgaria", "Hungary", "Czech Republic", "Slovakia", "Croatia", "Serbia", "Bosnia and Herzegovina", "Albania", "Moldova", "Belarus"].map((name, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                    <div className="font-semibold text-2xl text-black">{name}</div>
                  </div>
                  <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NORTH AMERICA */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">North America</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {["United States", "Canada", "Mexico"].map((name, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                    <div className="font-semibold text-2xl text-black">{name}</div>
                  </div>
                  <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SOUTH AMERICA */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">South America</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {["Brazil", "Argentina", "Colombia", "Peru", "Chile", "Venezuela", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Guyana", "Suriname"].map((name, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                    <div className="font-semibold text-2xl text-black">{name}</div>
                  </div>
                  <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OCEANIA */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Oceania</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {["Australia", "New Zealand", "Papua New Guinea", "Fiji", "Solomon Islands", "Vanuatu", "Samoa", "Tonga", "Kiribati", "Tuvalu", "Palau", "Marshall Islands", "Micronesia", "Nauru"].map((name, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Image src={getFlagUrl(name)} alt={name} width={40} height={28} className="rounded-sm border border-black/10 object-cover" />
                    <div className="font-semibold text-2xl text-black">{name}</div>
                  </div>
                  <p className="text-xs text-[#525252] leading-snug">{countryDescriptions[name] || "Detailed statistics coming soon."}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Let’s build a better world together</h2>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
            START A CONVERSATION
          </Link>
        </div>
      </section>
    </div>
  );
}
