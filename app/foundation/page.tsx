"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Heart, Leaf, Users } from "lucide-react";
import Image from "next/image";

export default function FoundationPage() {
  const sdgGoals = [
    { 
      number: "1", 
      title: "No Poverty", 
      desc: "Through container micro-franchises and job creation, we lift families out of poverty.",
      icon: "/sdg/sdg-1.png"
    },
    { 
      number: "2", 
      title: "Zero Hunger", 
      desc: "73.9% more nutritious meals reach 69.8 million children across Africa.",
      icon: "/sdg/sdg-2.png"
    },
    { 
      number: "4", 
      title: "Quality Education", 
      desc: "Super-Cube leadership development empowers the next generation of African leaders.",
      icon: "/sdg/sdg-4.png"
    },
    { 
      number: "8", 
      title: "Decent Work & Economic Growth", 
      desc: "20 jobs per container and ethical supply chains create sustainable livelihoods.",
      icon: "/sdg/sdg-8.png"
    },
    { 
      number: "10", 
      title: "Reduced Inequalities", 
      desc: "On-chain transparency and inclusive models reduce economic gaps.",
      icon: "/sdg/sdg-10.png"
    },
    { 
      number: "17", 
      title: "Partnerships for the Goals", 
      desc: "Collaboration with SANTACO, KWS and others accelerates real change.",
      icon: "/sdg/sdg-17.png"
    }
  ];

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-180px]">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-px h-8 bg-[#fbbf24]" />
            <div className="uppercase tracking-[3px] text-xs text-[#fbbf24]">REGISTERED NPO • SOUTH AFRICA</div>
            <div className="w-px h-8 bg-[#fbbf24]" />
          </div>

          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
            Big Five Foundation
          </h1>
          
          <p className="max-w-2xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            Driving on-chain social, economic and environmental impact across Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#impact" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              LEARN OUR IMPACT
            </Link>
            <Link 
              href="#donate" 
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              DONATE OR PARTNER
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 text-white/50 text-xs tracking-[2px] flex flex-col items-center">
          SCROLL TO DISCOVER OUR IMPACT
          <div className="w-px h-10 bg-white/20 mt-2" />
        </div>
      </section>

      {/* WHY BIG FIVE FOUNDATION? */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">OUR PURPOSE</div>
        <h2 className="text-5xl font-semibold tracking-tighter text-black mb-8">Why Big Five Foundation?</h2>
        
        <div className="max-w-3xl mx-auto text-xl text-[#525252] leading-relaxed">
          The Big Five Foundation is a registered NPO in South Africa (awaiting final approval of application APPL26-68748). 
          Guided by South Africa’s social development objectives and the philosophy of Ubuntu, we deliver measurable 
          Economic, Social and Environmental impact with 100% on-chain transparency through Big Five Connect and SupplierAdvisor®.
        </div>
        
        <div className="mt-10 inline-flex items-center justify-center gap-3 bg-white border border-black/10 px-8 py-4 rounded-2xl text-lg shadow-sm">
          <span className="text-[#fbbf24] text-2xl">★</span> 
          <span className="text-[#171717]">
            The entire Big Five Group proudly contributes <span className="font-bold">10% of all profits</span> to fuel this work.
          </span>
        </div>
      </section>

      {/* THREE IMPACT PILLARS */}
      <section id="impact" className="bg-white py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">THREE PILLARS OF IMPACT</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black">Real Change. Real Numbers.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Economic Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/10 rounded-3xl p-10 hover:border-black/20 transition-all"
            >
              <div className="mb-6">
                <TrendingUp className="w-12 h-12 text-[#fbbf24]" />
              </div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6">Economic Development</h4>
              <p className="text-[#404040] leading-relaxed mb-6">
                South Africa’s social development objectives emphasise job creation, SMME support, poverty alleviation and inclusive economic growth. 
                The Big Five Foundation achieves this through our container micro-franchise model — each container creates <span className="font-semibold text-black">20 sustainable local jobs</span>, reduces distribution costs by 70%, and empowers township and rural entrepreneurs.
              </p>
              <div className="text-sm text-[#fbbf24] font-medium">Aligned with B-BBEE • Real Economic Inclusion</div>
            </motion.div>

            {/* Social Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-black/10 rounded-3xl p-10 hover:border-black/20 transition-all"
            >
              <div className="mb-6">
                <Heart className="w-12 h-12 text-[#fbbf24]" />
              </div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6">Social Development</h4>
              <p className="text-[#404040] leading-relaxed mb-6">
                Aligned with South Africa’s focus on education, health, and community upliftment, we feed children with 
                <span className="font-semibold text-black"> 73.9% more nutritious meals</span>, implement Super-Cube leadership development, 
                and support families through transparent, on-chain programmes. Every donation is traceable.
              </p>
              <div className="text-sm text-[#fbbf24] font-medium">100% On-Chain Transparency • Measurable Impact</div>
            </motion.div>

            {/* Environmental Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-black/10 rounded-3xl p-10 hover:border-black/20 transition-all"
            >
              <div className="mb-6">
                <Leaf className="w-12 h-12 text-[#fbbf24]" />
              </div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6">Environmental Development</h4>
              <p className="text-[#404040] leading-relaxed mb-6">
                Supporting South Africa’s commitment to conservation and sustainable development, we fund regenerative agriculture 
                and the biggest rhino relocation in Kenya (in partnership with Kenya Wildlife Service). By feeding communities involved in conservation, we convert poaching hotspots into thriving eco-economies.
              </p>
              <div className="text-sm text-[#fbbf24] font-medium">Regenerative Agriculture • Biodiversity Protection</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DONOR BENEFITS */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">FOR OUR SUPPORTERS</div>
          <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">Donor Benefits</h3>
          
          <div className="max-w-2xl mx-auto text-xl text-[#525252] mb-12">
            All donations qualify for <span className="font-semibold text-black">Section 18A tax certificates</span> — a full tax deduction for individuals and companies. 
            Contributors also earn valuable <span className="font-semibold text-black">B-BBEE points</span> under the South African government’s Broad-Based Black Economic Empowerment framework.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="premium-button inline-flex items-center justify-center gap-3 border border-black/20 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/5">
              SARS Section 18A Explained
            </a>
            <a href="#" className="premium-button inline-flex items-center justify-center gap-3 border border-black/20 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/5">
              DTIC B-BBEE Framework
            </a>
          </div>
        </div>
      </section>

      {/* UBUNTU & GROUP COMMITMENT */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Users className="w-16 h-16 mx-auto text-[#fbbf24]" />
          </div>
          <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">Ubuntu & Our Group Commitment</h3>
          
          <div className="max-w-3xl mx-auto text-xl text-[#525252] leading-relaxed mb-8">
            Ubuntu — “I am because we are” — is the beating heart of the Big Five Foundation. It means no one thrives alone; true progress is shared. 
            This philosophy perfectly aligns with everything we do: feeding children, creating jobs, protecting wildlife, and building transparent economies.
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-black/10 px-8 py-6 rounded-2xl shadow-sm text-lg text-[#171717]">
            To live Ubuntu in action, the entire Big Five Group donates <span className="font-bold">10% of all profits</span> directly to the Foundation.
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">OUR FOUNDER</div>
              <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">Dr. Craig R. Muller</h3>
              
              <div className="text-xl text-[#525252] leading-relaxed mb-8">
                Dr. Craig R. Muller is a South African visionary whose doctoral thesis focused on accelerating leadership development to progress humanity. 
                Through Super-Cube — his innovative, Africa-designed leadership model — and every company in the Big Five Group, he turns research into real-world impact.
              </div>

              <Link 
                href="https://www.researchgate.net/profile/Craig-Muller" 
                target="_blank"
                className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-medium"
              >
                View Dr. Craig R. Muller’s ResearchGate Bio <ArrowRight />
              </Link>
            </div>

            <div className="bg-black text-white p-14 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-8 -left-4 text-[160px] text-[#fbbf24] opacity-10 leading-none select-none">“</div>
              
              <div className="relative z-10">
                <div className="text-[28px] md:text-[32px] font-light tracking-tight leading-tight text-white mb-10">
                  It always seems impossible until it’s done.”
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#fbbf24] to-transparent"></div>
                  <div className="text-sm text-white/70 whitespace-nowrap">— Nelson Mandela</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN SDGs SECTION - WITH LOGO + NO "LEARN MORE" */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            {/* UN SDG LOGO */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/sdg/sdg-logo.png" 
                alt="UN Sustainable Development Goals" 
                width={280} 
                height={80}
                className="h-auto"
              />
            </div>
            
            <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">GLOBAL ALIGNMENT</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black">Our Alignment with UN Sustainable Development Goals</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgGoals.map((goal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-all group"
              >
                <div className="mb-6 flex justify-center">
                  <Image 
                    src={goal.icon} 
                    alt={goal.title} 
                    width={90} 
                    height={90}
                    className="h-auto"
                  />
                </div>
                <div className="font-mono text-sm text-[#fbbf24] mb-2">SDG {goal.number}</div>
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-4">{goal.title}</h4>
                <p className="text-[#525252] mb-6 leading-relaxed">{goal.desc}</p>
                {/* REMOVED "Learn more →" */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="donate" className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-6">THE TIME IS NOW</div>
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">
            Help us feed the nation’s future
          </h2>
          
          <p className="text-white/80 text-xl mb-12">
            Every rand donated creates jobs, feeds children, and protects our natural heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/connect" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              DONATE OR PARTNER TODAY
            </Link>
            <Link 
              href="/" 
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              RETURN TO THE EIGHT PILLARS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
