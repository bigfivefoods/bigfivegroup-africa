"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AfricaPage() {
  const regions = [
    {
      name: "Southern Africa",
      color: "#10b981",
      challenge: "Southern Africa faces severe drought, high youth unemployment, and inequality. Climate change is reducing agricultural output while youth unemployment exceeds 40% in several countries (World Bank, 2024; UNDP Africa Report, 2025).",
      countries: [
        { name: "South Africa", flag: "🇿🇦", focus: "Headquarters • Agri • Leadership Academy", challenge: "High inequality and youth unemployment (Stats SA, 2025)" },
        { name: "Botswana", flag: "🇧🇼", focus: "Leadership Development • Conservation", challenge: "Heavy reliance on diamond mining with limited diversification (African Development Bank, 2024)" },
        { name: "Namibia", flag: "🇳🇦", focus: "Foundation • Arid Agriculture", challenge: "Severe water scarcity and desertification (UNDP Namibia, 2025)" },
        { name: "Zambia", flag: "🇿🇲", focus: "Direct Micro-Hubs • Mining Communities", challenge: "High debt levels and copper price volatility (World Bank, 2024)" },
        { name: "Mozambique", flag: "🇲🇿", focus: "Foods • Coastal Trade Corridors", challenge: "Climate vulnerability and insurgency in the north (UNDP, 2025)" },
      ]
    },
    {
      name: "East Africa",
      color: "#06b6d4",
      challenge: "East Africa is experiencing rapid population growth, climate-induced droughts, and food insecurity. Over 20 million people faced acute food insecurity in 2024 (FAO, 2025; IGAD Climate Prediction Centre).",
      countries: [
        { name: "Kenya", flag: "🇰🇪", focus: "Connect Platform • Youth Leadership", challenge: "High youth unemployment and rising cost of living (Kenya National Bureau of Statistics, 2025)" },
        { name: "Ethiopia", flag: "🇪🇹", focus: "Foundation Impact • Regenerative Agri", challenge: "Conflict recovery and recurring droughts (World Bank, 2024)" },
        { name: "Tanzania", flag: "🇹🇿", focus: "Agri Expansion • Coastal Hubs", challenge: "Limited access to finance for smallholder farmers (African Development Bank, 2025)" },
        { name: "Uganda", flag: "🇺🇬", focus: "Connect • Youth Entrepreneurship", challenge: "High population growth outpacing job creation (UNDP Uganda, 2025)" },
        { name: "Rwanda", flag: "🇷🇼", focus: "Tribal Tech • Cultural Innovation", challenge: "Limited domestic market size and export dependency (World Bank, 2024)" },
      ]
    },
    {
      name: "West Africa",
      color: "#f59e0b",
      challenge: "West Africa faces high population growth, coastal erosion, and insecurity. Nigeria alone accounts for over 40% of Africa’s food-insecure population (FAO, 2025; ECOWAS, 2024).",
      countries: [
        { name: "Nigeria", flag: "🇳🇬", focus: "Foods • Direct Distribution • Markets", challenge: "Insecurity, inflation, and naira devaluation (Central Bank of Nigeria, 2025)" },
        { name: "Ghana", flag: "🇬🇭", focus: "Access • Government Partnerships", challenge: "Debt crisis and energy sector challenges (IMF, 2024)" },
      ]
    },
    {
      name: "Central Africa",
      color: "#3b82f6",
      challenge: "Central Africa struggles with political instability, poor infrastructure, and underutilised mineral wealth. The Democratic Republic of Congo holds 70% of the world’s coltan but remains one of the poorest nations (World Bank, 2024; UNEP, 2025).",
      countries: [
        { name: "DR Congo", flag: "🇨🇩", focus: "Access • Mineral Value Chains", challenge: "Conflict, poor governance, and resource mismanagement (UN Security Council, 2025)" },
      ]
    }
  ];

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO - Full Height + Text moved up 100px */}
      <section className="relative min-h-[100dvh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[length:3px_3px]" />
        
        <div className="relative z-10 max-w-5xl px-6 text-center mt-[-100px]">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/20 text-xs tracking-[3px] mb-6 text-white/70">
            ONE CONTINENT • ONE VISION
          </div>

          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Africa.<br />Our Home.<br />Our Future.
          </h1>

          <p className="max-w-2xl mx-auto text-2xl text-white/80 font-light tracking-tight mb-12">
            From the savannas of KwaZulu-Natal to the markets of Lagos and the highlands of Ethiopia — 
            Big Five Group is building the infrastructure of African sovereignty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#footprint" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              OUR CONTINENTAL FOOTPRINT
            </Link>
            <Link 
              href="#vision" 
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              THE AFRICA WE ARE BUILDING
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 text-white/50 text-xs tracking-[2px] flex flex-col items-center">
          SCROLL TO EXPLORE AFRICA
          <div className="w-px h-10 bg-white/20 mt-2" />
        </div>
      </section>

      {/* OUR CONTINENTAL FOOTPRINT - GROUPED BY REGION */}
      <section id="footprint" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-emerald-600 mb-4">13 NATIONS • ONE ECOSYSTEM</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black">Our Continental Footprint</h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-[#525252]">
            Big Five Group operates with deep roots and full presence across the African continent.
          </p>
        </div>

        {regions.map((region, regionIndex) => (
          <div key={regionIndex} className="mb-20 last:mb-0">
            {/* Region Header + Challenge */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: region.color }}
                />
                <h3 className="text-3xl font-semibold tracking-tight text-black">{region.name}</h3>
              </div>
              <p className="max-w-4xl text-lg text-[#404040] leading-relaxed">
                {region.challenge}
              </p>
            </div>

            {/* Country Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {region.countries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (regionIndex * 5 + index) * 0.03 }}
                  className="group bg-white border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-all flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl mt-1">{country.flag}</span>
                    <div>
                      <div className="text-2xl font-semibold tracking-tight text-black group-hover:text-black transition">
                        {country.name}
                      </div>
                      <div className="text-sm text-[#525252] mt-1">
                        {country.focus}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-black/10">
                    <div className="text-xs text-[#737373] mb-1">KEY CHALLENGE</div>
                    <div className="text-sm text-[#404040] leading-snug">
                      {country.challenge}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* THE CHALLENGES WE ARE SOLVING */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-xs tracking-[3px] text-rose-600 mb-4">THE REALITY</div>
              <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">The Challenges Africa Faces</h3>
              
              <ul className="space-y-6 text-lg text-[#404040]">
                <li className="flex gap-4"><span className="text-rose-600 mt-1">•</span> Over 60% of smallholder farmers lack reliable market access</li>
                <li className="flex gap-4"><span className="text-rose-600 mt-1">•</span> Youth unemployment rates exceeding 40% in many countries</li>
                <li className="flex gap-4"><span className="text-rose-600 mt-1">•</span> Billions lost annually to corruption in public procurement</li>
                <li className="flex gap-4"><span className="text-rose-600 mt-1">•</span> Climate change threatening food security across the continent</li>
                <li className="flex gap-4"><span className="text-rose-600 mt-1">•</span> Fragmented supply chains keeping value outside African hands</li>
              </ul>
            </div>

            <div>
              <div className="text-xs tracking-[3px] text-emerald-600 mb-4">OUR RESPONSE</div>
              <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">How Big Five is Responding</h3>
              
              <ul className="space-y-6 text-lg text-[#404040]">
                <li className="flex gap-4"><span className="text-emerald-600 mt-1">•</span> Direct market access eliminating middlemen across 8 pillars</li>
                <li className="flex gap-4"><span className="text-emerald-600 mt-1">•</span> 20+ jobs created per micro-hub in underserved communities</li>
                <li className="flex gap-4"><span className="text-emerald-600 mt-1">•</span> Transparent, on-chain public procurement reducing corruption</li>
                <li className="flex gap-4"><span className="text-emerald-600 mt-1">•</span> Regenerative agriculture building climate resilience</li>
                <li className="flex gap-4"><span className="text-emerald-600 mt-1">•</span> Super-Cube® leadership developing the next generation of African leaders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE AFRICA WE ARE BUILDING */}
      <section id="vision" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[3px] text-emerald-600 mb-4">AFRICA 2035</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-8">The Africa We Are Building</h2>
          
          <div className="max-w-3xl mx-auto text-xl text-[#404040] space-y-6">
            <p>An Africa where every farmer has direct access to premium markets.<br />Where every young person has the tools to lead.<br />Where governments procure with full transparency.<br />Where the wealth of the continent stays in African hands.</p>
            <p className="font-semibold text-black">This is not a dream. It is the inevitable outcome of the Eight Pillars working together.</p>
          </div>

          <div className="mt-12">
            <Link href="/" className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-4 rounded-full text-lg font-semibold">EXPLORE THE EIGHT PILLARS <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-20 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">THE TIME IS NOW</div>
          <h3 className="text-white text-4xl font-semibold tracking-tighter mb-8">Ready to build the future of Africa with us?</h3>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">LAUNCH CONNECT — SUPPLIERADVISOR®</Link>
        </div>
      </section>
    </div>
  );
}
