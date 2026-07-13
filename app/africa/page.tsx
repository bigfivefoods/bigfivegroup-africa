"use client";

import Link from "next/link";
import Image from "next/image";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import { FinalCta } from "../components/PageSections";
import { MapPin, Building2 } from "lucide-react";

const countryDescriptions: Record<string, string> = {
    // === SOUTHERN AFRICA (14 countries) ===
    "South Africa": "South Africa faces severe food insecurity affecting 13.5 million people (Stats SA 2024). 32% unemployment and extreme inequality (Gini 0.63) drive poverty, while climate change cuts maize yields by 20%. Load-shedding disrupts supply chains and rural education access remains low — 18% of learners drop out before Grade 12 (DBE 2024). (Sources: Stats SA General Household Survey 2023; World Bank South Africa Economic Update 2024; FAO 2024)",
    "Namibia": "Namibia has one of the highest inequality rates globally (Gini 0.59). 43% of the population lives below the poverty line and 1 in 3 children under 5 are stunted due to chronic malnutrition (Namibia Demographic Health Survey 2023). Food insecurity affects 34% of households, worsened by recurring droughts. Education completion rates are low at 64% for secondary school (UNESCO 2024). (Sources: World Bank 2024; Namibia Statistics Agency 2023; UNICEF Namibia 2024)",
    "Botswana": "Despite upper-middle-income status, 24% of Batswana live in poverty and food insecurity affects 27% of households (Botswana Core Welfare Indicators 2023). Youth unemployment stands at 34% and 1 in 5 children experience stunting. Access to quality education in rural areas is limited, with only 48% completing secondary school (UNESCO Institute for Statistics 2024). (Sources: Statistics Botswana 2023; FAO 2024; World Bank 2024)",
    "Zimbabwe": "Zimbabwe faces extreme food insecurity — 5.7 million people (37% of population) require food assistance in 2024 due to drought and economic collapse. Poverty rate exceeds 70% and secondary school completion is only 38% (ZIMSTAT 2023). Hyperinflation and currency shortages have devastated household food access. (Sources: WFP Zimbabwe 2024; Zimbabwe National Statistics Agency 2023; UNICEF 2024)",
    "Zambia": "Zambia has 59% of the population living in poverty and 1.6 million people facing acute food insecurity (Zambia Vulnerability Assessment 2024). Child stunting rates are 29% and secondary school net enrolment is just 36% (UNESCO 2024). Copper price volatility and climate shocks continue to deepen rural poverty. (Sources: World Bank Zambia Poverty Assessment 2023; FAO 2024; Ministry of Education Zambia 2024)",
    "Mozambique": "Mozambique has 63% of its population in poverty and 2.8 million people facing severe food insecurity due to conflict in Cabo Delgado and climate disasters (WFP 2024). Primary school completion is only 47% and 1 in 3 children are stunted (UNICEF 2023). Post-cyclone recovery remains slow. (Sources: World Bank 2024; Mozambique National Institute of Statistics 2023; FAO 2024)",
    "Angola": "Angola has 32% of its population living in poverty despite oil wealth, with 4.2 million people facing acute food insecurity due to inequality, climate shocks in the south, and post-conflict recovery challenges (WFP 2025). Child stunting affects 30% of under-5s and secondary school completion stands at 41% (UNESCO 2024). Rural infrastructure remains limited. (Sources: World Bank Angola Poverty Assessment 2024; FAO 2024; UNICEF 2024)",
    "Comoros": "Comoros faces 45% poverty rate and chronic food insecurity affecting 35% of households due to its small-island geography, frequent cyclones, and import dependence (World Bank 2024). Child stunting is 31% and only 38% complete secondary school (UNESCO 2024). Limited arable land and youth unemployment exacerbate vulnerability. (Sources: FAO 2024; UNICEF Comoros 2024; National Institute of Statistics Comoros 2023)",
    "Eswatini": "Eswatini has 59% of its population below the poverty line and 30% facing food insecurity, worsened by HIV/AIDS prevalence (one of the world's highest) and recurring droughts (Eswatini Vulnerability Assessment 2024). Stunting affects 25% of children and secondary school completion is 47% (UNESCO 2024). (Sources: World Bank 2024; FAO 2024; UNICEF 2024)",
    "Lesotho": "Lesotho has 49% of its population living below the national poverty line and 40% of households face food insecurity exacerbated by persistent droughts and soil erosion (Lesotho Vulnerability Assessment Committee 2024). Child stunting affects 34% of under-5s and only 32% complete secondary school (UNESCO 2024). High HIV/AIDS prevalence and limited economic diversification keep rural communities trapped in poverty. (Sources: World Bank Lesotho Poverty Assessment 2024; FAO 2024; UNICEF Lesotho 2024; Lesotho Bureau of Statistics 2023)",
    "Madagascar": "Madagascar has over 70% of its population in poverty and 8.8 million people facing acute food insecurity due to cyclones, locusts, and chronic poverty (WFP 2025). Child stunting reaches 40% — among the highest globally — and secondary school completion is only 26% (UNESCO 2024). (Sources: World Bank 2024; FAO 2024; UNICEF 2024; INSTAT Madagascar 2023)",
    "Malawi": "Malawi has 50% of its population in poverty and recurrent food insecurity affecting 3.5 million people annually due to climate shocks and low agricultural productivity (Malawi Vulnerability Assessment 2024). Child stunting is 37% and secondary school completion stands at 35% (UNESCO 2024). (Sources: World Bank 2024; FAO 2024; UNICEF 2024; National Statistical Office Malawi 2023)",
    "Mauritius": "Mauritius, an upper-middle-income country, has reduced poverty to under 8% but faces rising food insecurity (12% of households) due to climate change, import dependence, and inequality (Statistics Mauritius 2023). Youth unemployment is 22% and education quality in disadvantaged areas lags. (Sources: World Bank 2024; FAO 2024; UNESCO 2024)",
    "Seychelles": "Seychelles has very low poverty (under 5%) and strong food security overall, but climate change, rising sea levels, and tourism dependence create vulnerabilities for outer islands (World Bank 2024). Secondary school completion exceeds 85% and stunting is minimal (<10%). (Sources: FAO 2024; UNICEF 2024; National Bureau of Statistics Seychelles 2023)",

    // === EAST AFRICA (10 countries) ===
    "Kenya": "Kenya battles recurrent droughts in ASAL regions, locust invasions, and 30-40% post-harvest losses, leaving 4.4 million people food insecure in 2024. Youth unemployment stands at 35% and secondary school completion is only 52% (Kenya National Bureau of Statistics 2023). (Sources: FAO 2024; Kenya National Drought Management Authority 2024; UNESCO 2024)",
    "Tanzania": "Tanzania has 26% of its population living in poverty and 1.3 million people facing acute food insecurity (Tanzania National Panel Survey 2023). Child stunting affects 30% of under-5s and secondary school enrolment is 37% (UNESCO 2024). Climate shocks and limited rural infrastructure exacerbate poverty in the southern highlands. (Sources: World Bank Tanzania Poverty Assessment 2023; FAO 2024; UNICEF 2024)",
    "Uganda": "Uganda faces 19% poverty rate and 3.5 million people in food insecurity due to refugee influx and climate variability (Uganda Bureau of Statistics 2023). 1 in 4 children are stunted and only 28% complete secondary school (UNESCO 2024). Youth unemployment exceeds 38% in urban areas. (Sources: WFP Uganda 2024; Ministry of Education Uganda 2023; FAO 2024)",
    "Ethiopia": "Ethiopia has 24 million people requiring food assistance in 2024 due to conflict and drought (WFP 2024). Poverty rate is 27% and secondary school completion is only 22% (UNESCO 2024). Over 1.5 million children are out of school in conflict-affected regions. (Sources: FAO 2024; Ethiopia Central Statistical Agency 2023; UNICEF 2024)",
    "Rwanda": "Rwanda has reduced poverty to 38% but food insecurity still affects 18% of households (Rwanda Integrated Household Living Conditions Survey 2023). Stunting rates remain at 33% and secondary school completion is 44% (UNESCO 2024). Rapid urbanisation is widening rural-urban education gaps. (Sources: World Bank 2024; National Institute of Statistics Rwanda 2023; FAO 2024)",
    "Burundi": "Burundi has one of the highest poverty rates in the world at 65% and faces chronic food insecurity affecting 2.3 million people (WFP 2025). Child stunting is critically high at 56% and secondary school completion is only 18% (UNESCO 2024). Political instability and land pressure continue to drive vulnerability. (Sources: World Bank 2024; FAO 2024; UNICEF 2024; Burundi Institute of Statistics 2023)",
    "Djibouti": "Djibouti has 35% poverty and 25% of its population facing food insecurity due to arid climate, refugee hosting, and limited agriculture (World Bank 2024). Stunting affects 28% of children and secondary completion is 42% (UNESCO 2024). (Sources: FAO 2024; WFP Djibouti 2024; UNICEF 2024)",
    "Eritrea": "Eritrea faces an estimated 50% poverty rate and widespread food insecurity due to arid conditions, limited agricultural output, and international isolation. Malnutrition affects large numbers of children and secondary school completion is among the lowest in Africa at ~20% (UNESCO 2024). Compulsory national service contributes to youth emigration. (Sources: FAO 2024; World Bank estimates 2024; UNICEF 2024)",
    "Somalia": "Somalia has 54% of its population in poverty and over 6.9 million people facing acute food insecurity due to drought, conflict, and al-Shabaab activity (WFP & IPC 2025). Child stunting exceeds 40% in many areas and secondary school completion is under 25% (UNESCO 2024). (Sources: WFP Somalia 2025; FAO 2024; UNICEF 2024)",
    "South Sudan": "South Sudan has 76% of its population in poverty and 7.1 million people (over half the population) facing acute food insecurity, with famine risk in several counties (WFP & IPC 2025). Child stunting is 33% and education systems remain collapsed in many areas, with secondary completion under 15% (UNESCO 2024). (Sources: WFP South Sudan 2025; World Bank 2024; UNICEF 2024)",

    // === CENTRAL AFRICA (8 countries) ===
    "Democratic Republic of the Congo": "The Democratic Republic of the Congo faces one of the world’s most severe food crises, with 27.7 million people (over 25% of the population) in acute food insecurity due to conflict, displacement, and economic collapse (WFP & IPC 2025). Poverty affects 73% of the population and secondary school completion rates are extremely low at under 30% in many regions, with 97% learning poverty among 10-year-olds (World Bank 2025; UNESCO 2024). Over 7 million children are out of school and child stunting remains critically high. (Sources: WFP DRC 2025; World Bank Poverty and Equity Brief 2025; UNESCO Institute for Statistics 2024; UNICEF 2024)",
    "Cameroon": "Cameroon has 37% poverty and 2.1 million people facing food insecurity, particularly in the Far North (Boko Haram) and anglophone regions (WFP 2025). Child stunting is 29% and secondary school completion is 48% (UNESCO 2024). Conflict and climate shocks in the north continue to drive displacement. (Sources: World Bank 2024; FAO 2024; UNICEF 2024)",
    "Central African Republic": "Central African Republic has 70%+ poverty and 2.5 million people (nearly half the population) facing acute food insecurity due to protracted armed conflict and displacement (WFP & IPC 2025). Stunting affects 38% of children and secondary school completion is under 20% in many areas (UNESCO 2024). (Sources: WFP CAR 2025; World Bank 2024; UNICEF 2024)",
    "Chad": "Chad has 42% poverty and 2.3 million people facing acute food insecurity in the Sahel belt due to drought, conflict, and refugee influx (WFP 2025). Child stunting is 35% and secondary school completion is only 24% (UNESCO 2024). (Sources: FAO 2024; World Bank 2024; UNICEF 2024)",
    "Republic of the Congo": "Republic of the Congo has 40% poverty despite oil revenues, with 1.1 million people facing food insecurity due to inequality and limited rural development (World Bank 2024). Stunting affects 23% of children and secondary completion is 51% (UNESCO 2024). (Sources: FAO 2024; UNICEF 2024; National Institute of Statistics Congo 2023)",
    "Equatorial Guinea": "Equatorial Guinea has extreme inequality despite high GDP per capita from oil; ~40% live in poverty with poor social indicators (World Bank 2024). Food insecurity affects 25% and stunting remains elevated at 27%. Education access is limited outside urban centres. (Sources: FAO 2024; UNICEF 2024; World Bank 2024)",
    "Gabon": "Gabon has 33% poverty and relatively low food insecurity (12%) thanks to oil wealth, but inequality is high and rural areas lag (World Bank 2024). Stunting is 17% and secondary school completion reaches 62% (UNESCO 2024). (Sources: FAO 2024; UNICEF 2024; Gabon National Statistics 2023)",
    "São Tomé and Príncipe": "São Tomé and Príncipe has 55% poverty and faces food insecurity due to import dependence and climate vulnerability as a small island state (World Bank 2024). Stunting is 19% and secondary completion is 58% (UNESCO 2024). (Sources: FAO 2024; UNICEF 2024; National Institute of Statistics STP 2023)",

    // === WEST AFRICA (16 countries) ===
    "Nigeria": "Nigeria faces severe food insecurity affecting 26 million people due to Boko Haram insurgency, farmer-herder conflicts, flooding, and 40%+ food inflation from naira devaluation. 1 in 5 children are out of school and poverty rate stands at 63% (NBS 2023). (Sources: WFP Nigeria 2024; FAO 2024; World Bank 2024; UNESCO 2024)",
    "Ghana": "Ghana has 24% of the population in poverty and 1.2 million people facing moderate to severe food insecurity (Ghana Living Standards Survey 2023). Child stunting is 18% and secondary school completion is 59% (UNESCO 2024). Climate change and rising input costs are pressuring smallholder farmers. (Sources: World Bank 2024; Ghana Statistical Service 2023; FAO 2024)",
    "Senegal": "Senegal has 37% poverty rate and 1.8 million people in food insecurity due to drought and rising fertiliser prices (ANSD 2023). 1 in 4 children are stunted and only 41% complete secondary school (UNESCO 2024). Rural youth migration is accelerating due to limited opportunities. (Sources: World Bank 2024; FAO 2024; UNICEF 2024)",
    "Côte d'Ivoire": "Côte d'Ivoire has 39% poverty rate and 2.1 million people facing food insecurity (INS 2023). Cocoa farmers earn less than $2/day and secondary school completion is 48% (UNESCO 2024). Child labour in agriculture remains a major issue. (Sources: World Bank 2024; FAO 2024; ILO 2023)",
    "Benin": "Benin has 38% poverty and 1.4 million people facing food insecurity, with stunting at 32% (World Bank 2024). Secondary school completion is 42% (UNESCO 2024). Climate shocks in the north and limited rural infrastructure persist. (Sources: FAO 2024; UNICEF 2024; INSAE Benin 2023)",
    "Burkina Faso": "Burkina Faso has 40%+ poverty and 3.4 million people facing acute food insecurity due to jihadist insurgency and displacement (WFP & IPC 2025). Stunting is 35% and secondary completion is 28% (UNESCO 2024). (Sources: WFP Burkina Faso 2025; FAO 2024; UNICEF 2024)",
    "Cabo Verde": "Cabo Verde has reduced poverty to ~18% but faces food insecurity (15% of households) due to drought and import dependence (World Bank 2024). Secondary school completion exceeds 75% and stunting is low at 12%. Tourism and remittances are key but vulnerable to climate shocks. (Sources: FAO 2024; UNICEF 2024; INE Cabo Verde 2023)",
    "Gambia": "Gambia has 48% poverty and 25% facing food insecurity, with stunting at 25% (World Bank 2024). Secondary school completion is 38% (UNESCO 2024). Youth unemployment and climate variability in the Sahel drive vulnerability. (Sources: FAO 2024; UNICEF 2024; Gambia Bureau of Statistics 2023)",
    "Guinea": "Guinea has 55% poverty and 1.9 million people facing food insecurity (World Bank 2024). Stunting is 30% and secondary completion is 35% (UNESCO 2024). Ebola legacy and mining dependence continue to affect rural communities. (Sources: FAO 2024; UNICEF 2024; INS Guinea 2023)",
    "Guinea-Bissau": "Guinea-Bissau has 65%+ poverty and high food insecurity (35% of households) due to cashew monoculture and political instability (World Bank 2024). Stunting is 28% and secondary completion is only 22% (UNESCO 2024). (Sources: FAO 2024; UNICEF 2024; INE Guinea-Bissau 2023)",
    "Liberia": "Liberia has 50% poverty and 1.2 million facing food insecurity, with stunting at 30% (World Bank 2024). Secondary school completion is 32% (UNESCO 2024). Post-Ebola and post-conflict recovery remains slow in rural areas. (Sources: FAO 2024; UNICEF 2024; LISGIS Liberia 2023)",
    "Mali": "Mali has 42% poverty and 1.8 million people facing acute food insecurity due to conflict in the north and centre (WFP 2025). Stunting is 27% and secondary completion is 31% (UNESCO 2024). (Sources: WFP Mali 2025; FAO 2024; UNICEF 2024)",
    "Mauritania": "Mauritania has 28% poverty and 28% facing food insecurity due to desertification and Sahel climate shocks (World Bank 2024). Stunting is 23% and secondary completion is 44% (UNESCO 2024). (Sources: FAO 2024; UNICEF 2024; ANSA Mauritania 2023)",
    "Niger": "Niger has 40% poverty, the world's highest fertility rate, and 2.9 million people facing acute food insecurity (WFP & IPC 2025). Stunting is critically high at 45% and secondary completion is only 19% (UNESCO 2024). Conflict in Tillabéri region worsens the crisis. (Sources: WFP Niger 2025; FAO 2024; UNICEF 2024)",
    "Sierra Leone": "Sierra Leone has 56% poverty and 1.5 million facing food insecurity, with stunting at 30% (World Bank 2024). Secondary school completion is 34% (UNESCO 2024). Post-Ebola recovery and limited rural infrastructure persist. (Sources: FAO 2024; UNICEF 2024; Stats SL 2023)",
    "Togo": "Togo has 45% poverty and 1.1 million facing food insecurity (World Bank 2024). Stunting is 24% and secondary completion is 41% (UNESCO 2024). Youth unemployment and coastal erosion are growing concerns. (Sources: FAO 2024; UNICEF 2024; INSEED Togo 2023)",

    // === NORTHERN AFRICA (6 countries) ===
    "Algeria": "Algeria has low official poverty (~5-8%) but youth unemployment exceeds 30% and food insecurity is rising due to heavy wheat import dependence and desertification (World Bank 2025). Secondary school completion is 72% but quality varies. Climate change threatens southern agriculture. (Sources: World Bank Algeria Economic Update 2025; FAO 2024; UNICEF 2024)",
    "Egypt": "Egypt has ~30% of its population below the poverty line (recent reforms) and faces food insecurity from subsidy changes, inflation, and Nile water stress (World Bank 2025). Youth unemployment is ~35% and stunting affects 13% of children. Education access has improved but quality gaps remain. (Sources: World Bank Egypt Poverty Assessment 2025; FAO 2024; UNICEF 2024; CAPMAS 2023)",
    "Libya": "Libya has ~25-30% poverty and significant food insecurity due to ongoing instability, displacement, and market disruptions (WFP 2025). Youth unemployment exceeds 40% and education systems are fragmented. (Sources: WFP Libya 2025; World Bank 2024; UNICEF 2024)",
    "Morocco": "Morocco has reduced poverty to ~15-18% but rural areas face food insecurity from recurrent droughts and water scarcity (World Bank 2024). Youth unemployment is 35%+ and secondary completion is 62% (UNESCO 2024). Agricultural modernisation and green energy are priorities. (Sources: FAO 2024; HCP Morocco 2023; UNICEF 2024)",
    "Sudan": "Sudan faces one of the world's worst humanitarian crises, with ~25 million people (over half the population) in acute food insecurity due to civil war since 2023 (WFP & IPC 2025). Poverty exceeds 55%, millions are displaced, and education has collapsed in conflict zones. Stunting is critically high. (Sources: WFP Sudan 2025; IPC 2025; UNICEF 2024; World Bank 2024)",
    "Tunisia": "Tunisia has ~15-20% poverty and rising food insecurity from inflation and post-revolution challenges (World Bank 2024). Youth unemployment exceeds 40% and secondary completion is 68% (UNESCO 2024). Climate change threatens coastal agriculture. (Sources: FAO 2024; INS Tunisia 2023; UNICEF 2024)"
  };

const ACTIVE = new Set<string>([
  "South Africa",
  "Kenya",
  "Ghana",
  "Zambia",
  "Democratic Republic of the Congo",
  "Tanzania",
  "Namibia",
  "Zimbabwe",
  "Lesotho"
]);

const REGIONS = [
  {
    name: "Southern Africa",
    countries: [
      { name: "South Africa", flag: "ZA" },
      { name: "Namibia", flag: "NA" },
      { name: "Botswana", flag: "BW" },
      { name: "Zimbabwe", flag: "ZW" },
      { name: "Zambia", flag: "ZM" },
      { name: "Mozambique", flag: "MZ" },
      { name: "Angola", flag: "AO" },
      { name: "Comoros", flag: "KM" },
      { name: "Eswatini", flag: "SZ" },
      { name: "Lesotho", flag: "LS" },
      { name: "Madagascar", flag: "MG" },
      { name: "Malawi", flag: "MW" },
      { name: "Mauritius", flag: "MU" },
      { name: "Seychelles", flag: "SC" },
    ],
  },
  {
    name: "East Africa",
    countries: [
      { name: "Kenya", flag: "KE" },
      { name: "Tanzania", flag: "TZ" },
      { name: "Uganda", flag: "UG" },
      { name: "Ethiopia", flag: "ET" },
      { name: "Rwanda", flag: "RW" },
      { name: "Burundi", flag: "BI" },
      { name: "Djibouti", flag: "DJ" },
      { name: "Eritrea", flag: "ER" },
      { name: "Somalia", flag: "SO" },
      { name: "South Sudan", flag: "SS" },
    ],
  },
  {
    name: "Central Africa",
    countries: [
      { name: "Democratic Republic of the Congo", flag: "CD" },
      { name: "Cameroon", flag: "CM" },
      { name: "Central African Republic", flag: "CF" },
      { name: "Chad", flag: "TD" },
      { name: "Republic of the Congo", flag: "CG" },
      { name: "Equatorial Guinea", flag: "GQ" },
      { name: "Gabon", flag: "GA" },
      { name: "São Tomé and Príncipe", flag: "ST" },
    ],
  },
  {
    name: "West Africa",
    countries: [
      { name: "Nigeria", flag: "NG" },
      { name: "Ghana", flag: "GH" },
      { name: "Senegal", flag: "SN" },
      { name: "Côte d'Ivoire", flag: "CI" },
      { name: "Benin", flag: "BJ" },
      { name: "Burkina Faso", flag: "BF" },
      { name: "Cabo Verde", flag: "CV" },
      { name: "Gambia", flag: "GM" },
      { name: "Guinea", flag: "GN" },
      { name: "Guinea-Bissau", flag: "GW" },
      { name: "Liberia", flag: "LR" },
      { name: "Mali", flag: "ML" },
      { name: "Mauritania", flag: "MR" },
      { name: "Niger", flag: "NE" },
      { name: "Sierra Leone", flag: "SL" },
      { name: "Togo", flag: "TG" },
    ],
  },
  {
    name: "Northern Africa",
    countries: [
      { name: "Algeria", flag: "DZ" },
      { name: "Egypt", flag: "EG" },
      { name: "Libya", flag: "LY" },
      { name: "Morocco", flag: "MA" },
      { name: "Sudan", flag: "SD" },
      { name: "Tunisia", flag: "TN" },
    ],
  },
];


const ACTIVE_CARDS = [
  { n: "South Africa", f: "ZA", r: "HQ · KwaZulu-Natal" },
  { n: "Kenya", f: "KE", r: "Company established" },
  { n: "Ghana", f: "GH", r: "West Africa operations" },
  { n: "Zambia", f: "ZM", r: "Active programmes" },
  { n: "Democratic Republic of the Congo", f: "CD", r: "Active programmes" },
  { n: "Tanzania", f: "TZ", r: "Active programmes" },
  { n: "Namibia", f: "NA", r: "Active programmes" },
  { n: "Zimbabwe", f: "ZW", r: "Active programmes" },
  { n: "Lesotho", f: "LS", r: "Active programmes" },
];

export default function AfricaPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/africa-hero.jpg"
        eyebrow="CONTINENT · 54 NATIONS"
        title={
          <>
            From the Cape to Cairo
            <br />
            Africa is our canvas
          </>
        }
        subtitle="Deep roots in active markets — and a continental vision. Big Five builds regenerative, ethical, and deliverable programmes across Africa with professional verification where commerce runs."
        ctas={[
          { href: "#active", label: "Active markets", primary: true },
          { href: "#regions", label: "Explore all 54" },
        ]}
        overlayClassName="bg-black/40"
      />

      <SupplierTrust entityName="Big Five companies operating across Africa" compact />

      <section id="active" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-[#047857] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            ACTIVE ON THE CONTINENT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4">
            Where we work in Africa today
          </h2>
          <p className="text-lg text-[#525252]">
            Nine African nations with live Big Five presence — including a company setup in Kenya —
            spanning Southern, East, West, and Central Africa.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVE_CARDS.map((c) => (
            <div
              key={c.n}
              className="flex items-center gap-4 bg-white border border-[#a7f3d0]/80 rounded-3xl p-5 shadow-sm"
            >
              <Image
                src={`https://flagcdn.com/w80/${c.f.toLowerCase()}.png`}
                alt={c.n}
                width={44}
                height={30}
                className="rounded-sm border border-black/10 object-cover"
              />
              <div>
                <div className="font-semibold text-black">
                  {c.n === "Democratic Republic of the Congo" ? "DRC" : c.n}
                </div>
                <div className="text-xs text-[#065f46] font-medium flex items-center gap-1 mt-0.5">
                  {c.n === "Kenya" ? (
                    <Building2 className="w-3 h-3" />
                  ) : (
                    <MapPin className="w-3 h-3" />
                  )}
                  {c.r}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/global"
            className="text-sm font-semibold text-black underline underline-offset-4 hover:opacity-70"
          >
            See full global footprint including Europe →
          </Link>
        </div>
      </section>

      <section id="regions" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="text-xs tracking-[3px] text-[#059669] mb-4">54 NATIONS · ONE ECOSYSTEM</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4">
              Continental context
            </h2>
            <p className="text-lg text-[#525252]">
              Understanding the challenges across Africa informs where we invest delivery capacity —
              and how Big Five Impact, Agri, Foods, and Access respond with professional programmes.
            </p>
          </div>

          <div className="space-y-16">
            {REGIONS.map((region) => (
              <div key={region.name}>
                <h3 className="text-3xl font-semibold tracking-tighter text-black mb-6">
                  {region.name}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {region.countries.map((country) => {
                    const isActive = ACTIVE.has(country.name);
                    return (
                      <div
                        key={country.name}
                        className={`rounded-3xl border p-6 flex flex-col ${
                          isActive
                            ? "bg-[#ecfdf5]/80 border-[#a7f3d0]"
                            : "bg-[#fafafa] border-black/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={`https://flagcdn.com/w80/${country.flag.toLowerCase()}.png`}
                            alt={country.name}
                            width={36}
                            height={24}
                            className="rounded-sm border border-black/10 object-cover"
                          />
                          <div className="font-semibold text-lg text-black leading-tight">
                            {country.name}
                          </div>
                          {isActive && (
                            <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-[#065f46] bg-[#d1fae5] px-2 py-0.5 rounded-full shrink-0">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#525252] leading-relaxed line-clamp-5">
                          {countryDescriptions[country.name] ||
                            "Context for this market informs our continental expansion roadmap."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Group African operating companies" />

      <FinalCta
        eyebrow="BUILD WITH US"
        title="Partner across Africa with a professional group"
        subtitle="From active markets to expansion horizons — verified ethical companies on SupplierAdvisor®, delivered through Big Five Impact."
        primary={{ href: "/connect", label: "Partner with Big Five" }}
        secondary={{
          href: "https://www.supplieradvisor.com/",
          label: "SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
