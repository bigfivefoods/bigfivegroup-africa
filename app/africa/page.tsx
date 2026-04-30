"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

export default function AfricaPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO - New African Hero Image */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/africa-hero.jpg')" }}
        />
        
        {/* Dotted Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-15" />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#4ade80] text-xs tracking-[4px] mb-6">CONTINENT-WIDE PRESENCE</div>
          
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            BIG FIVE GROUP<br />AFRICA
          </h1>
          
          <p className="max-w-3xl mx-auto text-2xl text-white/95 font-light tracking-tight mb-12">
            From the Cape to Cairo — building Africa’s future across 13 nations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#regions" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
              EXPLORE OUR FOOTPRINT
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
          <div className="text-xs tracking-[3px] text-emerald-600 mb-4">13 NATIONS • ONE ECOSYSTEM</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Our Continental Footprint</h2>
          <p className="max-w-2xl mx-auto text-xl text-[#525252]">
            Big Five Group is planning operations with a full presence across the African continent.
          </p>
        </div>

        <div className="space-y-20">
          {/* Southern Africa */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Southern Africa</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { name: "South Africa", flag: "ZA" },
                { name: "Namibia", flag: "NA" },
                { name: "Botswana", flag: "BW" },
                { name: "Zimbabwe", flag: "ZW" },
                { name: "Zambia", flag: "ZM" },
                { name: "Mozambique", flag: "MZ" }
              ].map((country, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <Image 
                      src={`https://flagcdn.com/w80/${country.flag.toLowerCase()}.png`} 
                      alt={country.name} 
                      width={40} 
                      height={28} 
                      className="rounded-sm border border-black/10 object-cover"
                    />
                    <div className="font-semibold text-2xl text-black">{country.name}</div>
                  </div>
                  <div className="text-sm text-[#525252] mb-4">Country Statistics</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    {country.name === "South Africa" && "South Africa faces severe food insecurity affecting 13.5 million people (Stats SA 2024). 32% unemployment and extreme inequality (Gini 0.63) drive poverty, while climate change cuts maize yields by 20%. Load-shedding disrupts supply chains and rural education access remains low — 18% of learners drop out before Grade 12 (DBE 2024). (Sources: Stats SA General Household Survey 2023; World Bank South Africa Economic Update 2024; FAO 2024)"}
                    {country.name === "Namibia" && "Namibia has one of the highest inequality rates globally (Gini 0.59). 43% of the population lives below the poverty line and 1 in 3 children under 5 are stunted due to chronic malnutrition (Namibia Demographic Health Survey 2023). Food insecurity affects 34% of households, worsened by recurring droughts. Education completion rates are low at 64% for secondary school (UNESCO 2024). (Sources: World Bank 2024; Namibia Statistics Agency 2023; UNICEF Namibia 2024)"}
                    {country.name === "Botswana" && "Despite upper-middle-income status, 24% of Batswana live in poverty and food insecurity affects 27% of households (Botswana Core Welfare Indicators 2023). Youth unemployment stands at 34% and 1 in 5 children experience stunting. Access to quality education in rural areas is limited, with only 48% completing secondary school (UNESCO Institute for Statistics 2024). (Sources: Statistics Botswana 2023; FAO 2024; World Bank 2024)"}
                    {country.name === "Zimbabwe" && "Zimbabwe faces extreme food insecurity — 5.7 million people (37% of population) require food assistance in 2024 due to drought and economic collapse. Poverty rate exceeds 70% and secondary school completion is only 38% (ZIMSTAT 2023). Hyperinflation and currency shortages have devastated household food access. (Sources: WFP Zimbabwe 2024; Zimbabwe National Statistics Agency 2023; UNICEF 2024)"}
                    {country.name === "Zambia" && "Zambia has 59% of the population living in poverty and 1.6 million people facing acute food insecurity (Zambia Vulnerability Assessment 2024). Child stunting rates are 29% and secondary school net enrolment is just 36% (UNESCO 2024). Copper price volatility and climate shocks continue to deepen rural poverty. (Sources: World Bank Zambia Poverty Assessment 2023; FAO 2024; Ministry of Education Zambia 2024)"}
                    {country.name === "Mozambique" && "Mozambique has 63% of its population in poverty and 2.8 million people facing severe food insecurity due to conflict in Cabo Delgado and climate disasters (WFP 2024). Primary school completion is only 47% and 1 in 3 children are stunted (UNICEF 2023). Post-cyclone recovery remains slow. (Sources: World Bank 2024; Mozambique National Institute of Statistics 2023; FAO 2024)"}
                  </p>
                </div>
              ))}
            </div>

            {/* Challenges & Big Five Response */}
            <div className="bg-white border border-black/10 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">THE CHALLENGE</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">Southern Africa faces acute water scarcity, climate-induced droughts, and high inequality.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    The region is experiencing its worst drought in 40 years, threatening food security for over 45 million people (World Bank, 2024; IPCC AR6, 2023). Rural communities and smallholder farmers are disproportionately affected, with limited access to markets and finance.
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">HOW BIG FIVE HELPS</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">We are built for this moment.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Big Five Agri delivers regenerative farming solutions and climate-resilient seeds. Big Five Foods provides fortified nutrition at scale. Big Five Connect unlocks government funding and on-chain finance for farmers. Big Five Direct gives smallholders direct market access, bypassing exploitative middlemen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* East Africa */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">East Africa</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { name: "Kenya", flag: "KE" },
                { name: "Tanzania", flag: "TZ" },
                { name: "Uganda", flag: "UG" },
                { name: "Ethiopia", flag: "ET" },
                { name: "Rwanda", flag: "RW" }
              ].map((country, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <Image 
                      src={`https://flagcdn.com/w80/${country.flag.toLowerCase()}.png`} 
                      alt={country.name} 
                      width={40} 
                      height={28} 
                      className="rounded-sm border border-black/10 object-cover"
                    />
                    <div className="font-semibold text-2xl text-black">{country.name}</div>
                  </div>
                  <div className="text-sm text-[#525252] mb-4">Country Statistics</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    {country.name === "Kenya" && "Kenya battles recurrent droughts in ASAL regions, locust invasions, and 30-40% post-harvest losses, leaving 4.4 million people food insecure in 2024. Youth unemployment stands at 35% and secondary school completion is only 52% (Kenya National Bureau of Statistics 2023). (Sources: FAO 2024; Kenya National Drought Management Authority 2024; UNESCO 2024)"}
                    {country.name === "Tanzania" && "Tanzania has 26% of its population living in poverty and 1.3 million people facing acute food insecurity (Tanzania National Panel Survey 2023). Child stunting affects 30% of under-5s and secondary school enrolment is 37% (UNESCO 2024). Climate shocks and limited rural infrastructure exacerbate poverty in the southern highlands. (Sources: World Bank Tanzania Poverty Assessment 2023; FAO 2024; UNICEF 2024)"}
                    {country.name === "Uganda" && "Uganda faces 19% poverty rate and 3.5 million people in food insecurity due to refugee influx and climate variability (Uganda Bureau of Statistics 2023). 1 in 4 children are stunted and only 28% complete secondary school (UNESCO 2024). Youth unemployment exceeds 38% in urban areas. (Sources: WFP Uganda 2024; Ministry of Education Uganda 2023; FAO 2024)"}
                    {country.name === "Ethiopia" && "Ethiopia has 24 million people requiring food assistance in 2024 due to conflict and drought (WFP 2024). Poverty rate is 27% and secondary school completion is only 22% (UNESCO 2024). Over 1.5 million children are out of school in conflict-affected regions. (Sources: FAO 2024; Ethiopia Central Statistical Agency 2023; UNICEF 2024)"}
                    {country.name === "Rwanda" && "Rwanda has reduced poverty to 38% but food insecurity still affects 18% of households (Rwanda Integrated Household Living Conditions Survey 2023). Stunting rates remain at 33% and secondary school completion is 44% (UNESCO 2024). Rapid urbanisation is widening rural-urban education gaps. (Sources: World Bank 2024; National Institute of Statistics Rwanda 2023; FAO 2024)"}
                  </p>
                </div>
              ))}
            </div>

            {/* Challenges & Big Five Response */}
            <div className="bg-white border border-black/10 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">THE CHALLENGE</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">East Africa battles recurring climate shocks, food insecurity, and youth unemployment.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Over 50 million people face acute food insecurity due to droughts, floods, and locust invasions (FAO, 2024; UNDP Human Development Report, 2023). Rapid population growth has created a youth bulge with limited formal employment opportunities.
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">HOW BIG FIVE HELPS</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">We turn crisis into opportunity.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Big Five Agri scales climate-smart regenerative farming across the Rift Valley. Big Five Foods delivers 73.9% more nutritious meals to school feeding programmes. Big Five Leadership trains the next generation of African entrepreneurs through our Super-Cube® model. Big Five Connect provides instant access to funding for youth-led agribusinesses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Africa - NEW: DRC */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">Central Africa</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { name: "Democratic Republic of the Congo", flag: "CD" }
              ].map((country, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <Image 
                      src={`https://flagcdn.com/w80/${country.flag.toLowerCase()}.png`} 
                      alt={country.name} 
                      width={40} 
                      height={28} 
                      className="rounded-sm border border-black/10 object-cover"
                    />
                    <div className="font-semibold text-2xl text-black">{country.name}</div>
                  </div>
                  <div className="text-sm text-[#525252] mb-4">Country Statistics</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    The Democratic Republic of the Congo faces one of the world’s most severe food crises, with 27.7 million people (over 25% of the population) in acute food insecurity due to conflict, displacement, and economic collapse (WFP & IPC 2025). Poverty affects 73% of the population and secondary school completion rates are extremely low at under 30% in many regions, with 97% learning poverty among 10-year-olds (World Bank 2025; UNESCO 2024). Over 7 million children are out of school and child stunting remains critically high. (Sources: WFP DRC 2025; World Bank Poverty and Equity Brief 2025; UNESCO Institute for Statistics 2024; UNICEF 2024)
                  </p>
                </div>
              ))}
            </div>

            {/* Challenges & Big Five Response */}
            <div className="bg-white border border-black/10 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">THE CHALLENGE</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">Central Africa, led by the DRC, is devastated by protracted armed conflict, massive displacement, and extreme poverty.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Over 27 million people face acute food insecurity — the highest number in the world — while 73% live in poverty and education systems have collapsed in conflict zones (WFP & IPC 2025; World Bank 2025). Decades of violence have displaced millions and destroyed schools and markets.
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">HOW BIG FIVE HELPS</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">We bring hope and resilience where it is needed most.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Big Five Agri supports climate-resilient farming in conflict-affected provinces. Big Five Foods delivers emergency fortified nutrition to displaced families. Big Five Connect provides on-chain funding and government access for local cooperatives. Big Five Leadership empowers youth with Super-Cube® skills for peacebuilding and economic recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* West Africa */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-semibold tracking-tighter text-black">West Africa</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { name: "Nigeria", flag: "NG" },
                { name: "Ghana", flag: "GH" },
                { name: "Senegal", flag: "SN" },
                { name: "Côte d'Ivoire", flag: "CI" }
              ].map((country, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <Image 
                      src={`https://flagcdn.com/w80/${country.flag.toLowerCase()}.png`} 
                      alt={country.name} 
                      width={40} 
                      height={28} 
                      className="rounded-sm border border-black/10 object-cover"
                    />
                    <div className="font-semibold text-2xl text-black">{country.name}</div>
                  </div>
                  <div className="text-sm text-[#525252] mb-4">Country Statistics</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    {country.name === "Nigeria" && "Nigeria faces severe food insecurity affecting 26 million people due to Boko Haram insurgency, farmer-herder conflicts, flooding, and 40%+ food inflation from naira devaluation. 1 in 5 children are out of school and poverty rate stands at 63% (NBS 2023). (Sources: WFP Nigeria 2024; FAO 2024; World Bank 2024; UNESCO 2024)"}
                    {country.name === "Ghana" && "Ghana has 24% of the population in poverty and 1.2 million people facing moderate to severe food insecurity (Ghana Living Standards Survey 2023). Child stunting is 18% and secondary school completion is 59% (UNESCO 2024). Climate change and rising input costs are pressuring smallholder farmers. (Sources: World Bank 2024; Ghana Statistical Service 2023; FAO 2024)"}
                    {country.name === "Senegal" && "Senegal has 37% poverty rate and 1.8 million people in food insecurity due to drought and rising fertiliser prices (ANSD 2023). 1 in 4 children are stunted and only 41% complete secondary school (UNESCO 2024). Rural youth migration is accelerating due to limited opportunities. (Sources: World Bank 2024; FAO 2024; UNICEF 2024)"}
                    {country.name === "Côte d'Ivoire" && "Côte d'Ivoire has 39% poverty rate and 2.1 million people facing food insecurity (INS 2023). Cocoa farmers earn less than $2/day and secondary school completion is 48% (UNESCO 2024). Child labour in agriculture remains a major issue. (Sources: World Bank 2024; FAO 2024; ILO 2023)"}
                  </p>
                </div>
              ))}
            </div>

            {/* Challenges & Big Five Response */}
            <div className="bg-white border border-black/10 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">THE CHALLENGE</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">West Africa faces food inflation, infrastructure gaps, and a massive youth population.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Food prices have risen over 40% since 2020, pushing millions into poverty (World Bank, 2024; ECOWAS Regional Report, 2024). Poor logistics and limited cold-chain infrastructure cause massive post-harvest losses, while 60% of the population is under 25.
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-emerald-600 mb-3">HOW BIG FIVE HELPS</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">We build resilient supply chains.</h4>
                  <p className="text-[#525252] leading-relaxed">
                    Big Five Direct creates transparent, efficient routes from farm to market. Big Five Foods produces affordable fortified staples at scale. Big Five Agri introduces climate-resilient crops and regenerative practices. Big Five Connect gives small businesses and cooperatives instant access to working capital and government support programmes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Let’s build Africa together</h2>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
            START A CONVERSATION
          </Link>
        </div>
      </section>
    </div>
  );
}
