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
            Big Five Group operates with deep roots and full presence across the African continent.
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
                  <div className="text-sm text-[#525252] mb-4">Active operations • Regional hub</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    South Africa faces acute food insecurity affecting 13.5 million people due to 32% unemployment, extreme inequality, and climate change reducing maize yields by up to 20%. Load-shedding disrupts supply chains while rising food prices hit the poor hardest. Rural smallholders lack access to finance and markets. (Source: Stats SA 2024; World Bank South Africa Economic Update 2024; FAO State of Food Security 2024)
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
                  <div className="text-sm text-[#525252] mb-4">Active operations • Growing presence</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    Kenya battles recurrent droughts in ASAL regions, locust invasions, and 30-40% post-harvest losses, leaving 4.4 million people food insecure in 2024. Youth unemployment and limited smallholder finance worsen the crisis. (Source: FAO 2024; Kenya National Drought Management Authority 2024; WFP Hunger Map 2024)
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
                  <div className="text-sm text-[#525252] mb-4">Active operations • Strategic markets</div>
                  
                  <p className="text-xs text-[#525252] leading-snug">
                    Nigeria faces severe food insecurity affecting 26 million people due to Boko Haram insurgency, farmer-herder conflicts, flooding, and 40%+ food inflation from naira devaluation. Poor infrastructure causes massive post-harvest losses. (Source: WFP Nigeria 2024; FAO 2024; World Bank 2024)
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
