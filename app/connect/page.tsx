"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Building2, Award, QrCode, Play, Leaf, Factory, Truck, ShoppingCart } from "lucide-react";
import { useState } from "react";

const CONNECT_COLOR = "#0ea5e9";

export default function ConnectPage() {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      icon: Leaf,
      title: "Farm Sourcing",
      location: "KwaZulu-Natal, South Africa",
      desc: "Regenerative maize farm — verified Super-Cube® leadership, soil health score 94%, carbon-negative practices.",
      tx: "0x7f3a...9b2e",
      time: "14 March 2026 • 09:41 SAST"
    },
    {
      icon: Factory,
      title: "Big Five Foods Factory",
      location: "Pinetown, KwaZulu-Natal",
      desc: "Fortified porridge production — FSSC 22000, ISO 9001, 600t daily capacity, on-chain batch #BF-2026-0314-0847.",
      tx: "0x4c2b...1f9a",
      time: "14 March 2026 • 11:22 SAST"
    },
    {
      icon: Truck,
      title: "DSV Logistics",
      location: "National Distribution Network",
      desc: "Live GPS + IoT tracking — 100% cold-chain integrity, OTIFEF 98.7%, carbon offset verified on-chain.",
      tx: "0x9d1e...7c4b",
      time: "15 March 2026 • 06:15 SAST"
    },
    {
      icon: ShoppingCart,
      title: "Container in Nongoma Zululand, KZN",
      location: "Big Five Foundation Container, Nongoma, Zululand, KZN",
      desc: "Community container serving fortified meals — 20 jobs created, 73.9% more nutritious meals delivered, on-chain impact verified.",
      tx: "0x2e8f...4a1d",
      time: "16 March 2026 • 14:33 SAST"
    }
  ];

  const startDemo = () => {
    setDemoStep(0);
    setIsPlaying(true);
    
    const interval = setInterval(() => {
      setDemoStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsPlaying(false);
          return 4;
        }
      });
    }, 1200);
  };

  const resetDemo = () => {
    setDemoStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO - New Connect Hero Image */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/connect-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        <div className="absolute inset-0 bg-black/45" />
        
        <div className="relative z-10 max-w-5xl px-6 text-center mt-[-80px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs tracking-[3px] mb-8" style={{ color: CONNECT_COLOR }}>
            ON-CHAIN • AI-POWERED • TRANSPARENT
          </div>
          
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Verified.<br />Transparent.<br />Accelerating humanity.
          </h1>
          
          <p className="max-w-3xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            Big Five Connect is the B2B, B2G & B2C supply-chain platform that combines blockchain verification, real-time AI insights, and ethical transparency to make every transaction trustworthy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#how-it-works" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all">
              SEE HOW IT WORKS
            </Link>
            <Link 
              href="https://www.supplieradvisor.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all" 
              style={{ borderColor: CONNECT_COLOR + '40' }}
            >
              LAUNCH CONNECT
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Enhanced Visual Steps */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] mb-4" style={{ color: CONNECT_COLOR }}>HOW BIG FIVE CONNECT WORKS</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">We don’t just connect buyers and sellers — we build the transparent, ethical, and efficient backbone Africa needs to progress humanity.</h2>
        </div>

        <div className="space-y-12">
          {[
            { num: "01", title: "Verify & Onboard", desc: "Every business completes world-class onboarding with certificates, bank details, and location metadata. AI + human verification ensures trust from day one. Your Super-Cube® leadership profile is automatically linked." },
            { num: "02", title: "Connect & Transact", desc: "Send connection requests, raise POs, ship with live GPS/IoT tracking, and mint everything on-chain. RIAD, ratings, and OTIFEF metrics are embedded in every step. Access government funding and support programmes instantly." },
            { num: "03", title: "Track & Improve", desc: "Consumers scan QR codes for full traceability. Businesses get AI-powered insights, risk alerts, and sustainability dashboards. Every transaction makes the world better — and directly funds the Big Five Foundation." }
          ].map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group grid md:grid-cols-12 gap-8 items-start bg-white border border-black/10 rounded-3xl p-12 hover:border-black/20 transition-all"
            >
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-semibold tracking-tighter text-white"
                  style={{ backgroundColor: CONNECT_COLOR }}
                >
                  {step.num}
                </div>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-4xl font-semibold tracking-tight text-black mb-4 group-hover:text-[#0ea5e9] transition-colors">{step.title}</h3>
                <p className="text-xl text-[#525252] leading-relaxed max-w-4xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIVE ON-CHAIN TRACEABILITY DEMO */}
      <section className="bg-black py-24 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs tracking-[3px] mb-6" style={{ color: CONNECT_COLOR }}>
              LIVE DEMO
            </div>
            <h2 className="text-white text-5xl font-semibold tracking-tighter mb-6">See It In Action</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Click the big QR code below to watch a real-time on-chain traceability journey of a Big Five Foods fortified porridge pack — from farm to consumer.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* QR Code Simulation */}
            <div className="flex justify-center mb-12">
              <div 
                onClick={startDemo}
                className="group relative w-64 h-64 bg-white rounded-3xl flex items-center justify-center cursor-pointer shadow-2xl hover:scale-[1.02] transition-all active:scale-[0.98]"
              >
                <div className="text-center">
                  <QrCode className="w-24 h-24 mx-auto mb-6 text-black" />
                  <div className="text-black font-semibold text-xl tracking-tight">SCAN TO TRACE</div>
                  <div className="text-black/60 text-sm mt-1">Batch #BF-2026-0314-0847</div>
                </div>
                
                <div className="absolute -bottom-3 -right-3 bg-[#0ea5e9] text-white text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-2">
                  <Play className="w-3 h-3" /> LIVE DEMO
                </div>
              </div>
            </div>

            {/* Animated Trace Journey */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="text-white text-sm tracking-[2px]">ON-CHAIN TRACEABILITY JOURNEY</div>
                  <div className="text-white text-2xl font-semibold tracking-tight">Fortified Porridge — Original Flavour 1kg</div>
                </div>
                
                {demoStep > 0 && (
                  <button 
                    onClick={resetDemo}
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    RESET DEMO
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {demoSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0.3, scale: 0.98 }}
                    animate={{ 
                      opacity: demoStep >= index + 1 ? 1 : 0.3, 
                      scale: demoStep >= index + 1 ? 1 : 0.98 
                    }}
                    className={`flex gap-6 p-8 rounded-2xl border transition-all ${demoStep >= index + 1 ? 'border-[#0ea5e9] bg-white/5' : 'border-white/10'}`}
                  >
                    <step.icon className="w-14 h-14 flex-shrink-0 mt-1 text-[#0ea5e9]" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-white text-2xl font-semibold tracking-tight">{step.title}</div>
                        {demoStep >= index + 1 && (
                          <div className="px-3 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: CONNECT_COLOR, color: 'white' }}>
                            VERIFIED ON-CHAIN
                          </div>
                        )}
                      </div>
                      <div className="text-white/80 text-sm mb-3">{step.location}</div>
                      <div className="text-white/90 leading-relaxed mb-4">{step.desc}</div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/60">
                        <div>Tx: <span className="font-mono text-[#0ea5e9]">{step.tx}</span></div>
                        <div>{step.time}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* MEAL IMPACT REPORT */}
              {demoStep >= 4 && (
                <div className="mt-10 bg-white rounded-3xl p-10 border border-[#0ea5e9]/20">
                  <div className="text-center mb-8">
                    <div className="text-[#0ea5e9] text-xs tracking-[3px] mb-2">MEAL IMPACT REPORT</div>
                    <h4 className="text-3xl font-semibold tracking-tight text-black">Fortified Porridge Delivered to Household in Nongoma</h4>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-semibold text-black">184</div>
                      <div className="text-sm text-[#525252]">Meals Delivered This Month</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-black">25%</div>
                      <div className="text-sm text-[#525252]">Daily Nutrition per Serving</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-black">20</div>
                      <div className="text-sm text-[#525252]">Local Jobs Created</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-black">100%</div>
                      <div className="text-sm text-[#525252]">On-Chain Verified</div>
                    </div>
                  </div>

                  <div className="mt-8 text-center text-sm text-[#525252]">
                    Every serving provides essential vitamins, minerals, and protein. 10% of every purchase funds the Big Five Foundation.
                  </div>
                </div>
              )}

              {demoStep === 4 && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                    ✅ TRACE COMPLETE — 100% TRANSPARENT & VERIFIED
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOR CONSUMERS - Enhanced */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs tracking-[2px] mb-6" style={{ backgroundColor: CONNECT_COLOR + '15', color: CONNECT_COLOR }}>
            FOR CONSUMERS
          </div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Shop with total confidence and real impact</h2>
          <p className="text-xl text-[#525252] max-w-2xl mx-auto mb-10">Every purchase you make is traceable, ethical, and contributes to a better Africa.</p>
          
          <Link href="#get-started" className="premium-button inline-flex items-center justify-center gap-3 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all" style={{ backgroundColor: CONNECT_COLOR }}>
            JOIN AS A CONSCIOUS CONSUMER
          </Link>
        </div>
      </section>

      {/* FOR BUSINESS - Premium Cards */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] mb-4" style={{ color: CONNECT_COLOR }}>FOR BUSINESS</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">The most powerful supply-chain operating system ever built</h2>
          <p className="text-xl text-[#525252] max-w-2xl mx-auto">From verified suppliers to on-chain POs and live logistics — Big Five Connect gives you total visibility, trust, and speed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: CheckCircle, title: "Verified Ecosystem", desc: "Every participant is fully vetted with certificates, financials, and location metadata." },
            { icon: Award, title: "AI + On-Chain Intelligence", desc: "Smart matching, predictive OTIFEF, RIAD embedded in every module." },
            { icon: Users, title: "Live End-to-End Traceability", desc: "GPS, IoT, CoA, Incoterms, and proof-of-delivery on the blockchain." },
            { icon: Building2, title: "Direct Government Access", desc: "Instant connection to funding, tenders, and support programmes across 13 African nations." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-black/10 rounded-3xl p-10 hover:border-[#0ea5e9]/30 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: CONNECT_COLOR + '15' }}>
                <item.icon className="w-8 h-8" style={{ color: CONNECT_COLOR }} />
              </div>
              <h4 className="text-2xl font-semibold tracking-tight text-black mb-4 group-hover:text-[#0ea5e9] transition-colors">{item.title}</h4>
              <p className="text-[#525252] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#get-started" className="premium-button inline-flex items-center justify-center gap-3 text-white px-10 py-4 rounded-full text-lg font-semibold" style={{ backgroundColor: CONNECT_COLOR }}>
            REGISTER YOUR BUSINESS
          </Link>
        </div>
      </section>

      {/* FOR SOCIETY - Enhanced */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] mb-4" style={{ color: CONNECT_COLOR }}>FOR SOCIETY</div>
            <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Governments • Schools • Associations</h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">Big Five Connect is not just for businesses — it is the platform that empowers every institution and group to operate with total transparency, intelligence, and impact.</p>
          </div>

          <div className="space-y-10">
            {[
              { title: "Government & Public Sector", desc: "Run transparent tenders, eliminate corruption, and deliver services with full traceability. Get real-time public feedback on service levels. Use our AI Leadership Lab and RIAD tools to drive intelligent policy decisions and dramatically improve service delivery." },
              { title: "Schools & Educational Institutions", desc: "Track every rand spent on school nutrition, uniforms, and supplies with full traceability down to each pupil. Monitor performance, spending efficiency, and food safety in real time. Receive AI-powered insights to improve outcomes and accountability." },
              { title: "Associations, Cooperatives & Groups", desc: "Consolidate your members (companies, farmers, individuals) on one platform. Unlock collective intelligence, shared metrics, benchmarking, and powerful insights. Drive industry-wide improvement, advocacy, and collective bargaining power." }
            ].map((item, index) => (
              <div key={index} className="bg-[#fafafa] border border-black/10 rounded-3xl p-12">
                <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">{item.title}</h3>
                <p className="text-lg text-[#525252] leading-relaxed mb-8">{item.desc}</p>
                <Link href="#get-started" className="inline-flex items-center gap-2 font-semibold transition-all hover:underline" style={{ color: CONNECT_COLOR }}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR HUMANITY - Beautiful Cards */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="text-xs tracking-[3px] mb-4" style={{ color: CONNECT_COLOR }}>FOR HUMANITY</div>
        <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">One Platform. One Purpose.</h2>
        <p className="text-xl text-[#525252] max-w-2xl mx-auto mb-16">Big Five Connect unites ethical sourcing, world-class leadership development, and AI intelligence to solve humanity’s most pressing challenges and advance a more just, sustainable Africa.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Ethical Sourcing & UN SDGs", desc: "Every transaction on the platform directly advances multiple United Nations Sustainable Development Goals — from Zero Hunger and Responsible Consumption to Climate Action and Strong Institutions." },
            { title: "Super-Cube® Leadership", desc: "Built on Dr. Craig R. Muller’s doctoral Super-Cube® leadership development model and integrated with AI-powered assessments to make wiser, faster, and more ethical decisions that drive real systemic change." },
            { title: "A Better World Together", desc: "When governments, businesses, schools, associations, and conscious consumers unite on one verified, on-chain platform, we create unprecedented collective intelligence and accelerate humanity’s progress." }
          ].map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-black/10 rounded-3xl p-10 text-left hover:border-[#0ea5e9]/30 hover:shadow-2xl transition-all"
            >
              <h4 className="font-semibold text-2xl tracking-tight text-black mb-6">{card.title}</h4>
              <p className="text-[#525252] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA - Bold with Connect Blue */}
      <section id="get-started" className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Ready to build the future of Africa with us?</h2>
          <p className="text-xl text-white/70 mb-10">Whether you are a government, investor, farmer, or conscious consumer — there is a place for you in the Big Five ecosystem.</p>
          
          <Link 
            href="https://www.supplieradvisor.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-3 text-white px-16 py-5 rounded-full text-xl font-semibold shadow-2xl transition-all hover:scale-[1.02]" 
            style={{ backgroundColor: CONNECT_COLOR }}
          >
            LAUNCH CONNECT — SUPPLIERADVISOR®
          </Link>
          
          <div className="mt-6 text-xs text-white/40">No credit card required • Instant access for verified partners</div>
        </div>
      </section>
    </div>
  );
}
