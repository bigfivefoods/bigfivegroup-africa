"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Users, Heart } from "lucide-react";

export default function TribalPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO - Leopard Print with Respect */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/tribal.jpg')",
            backgroundPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-20" />

        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-40px]">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-px h-8 bg-[#fbbf24]" />
            <div className="uppercase tracking-[4px] text-xs text-[#fbbf24]">INKOSI • ISIZWE • ISIKHATHI</div>
            <div className="w-px h-8 bg-[#fbbf24]" />
          </div>

          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            THE KINGDOM RISES.<br />BIG FIVE STANDS WITH IT.
          </h1>

          <p className="max-w-2xl mx-auto text-2xl text-white font-light tracking-tight mb-12">
            With deepest honour to His Majesty the late King Goodwill Zwelithini kaBhekuzulu and in full support of the Goodwill Foundation, 
            Big Five Group stands with the Zulu Kingdom — honouring the Nguni tribe and their timeless ethics, respecting the 720 Tribal Authorities, 
            amplifying its voice, and advancing its future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#heritage" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-[#fbbf24] text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#f59e0b]"
            >
              OUR HERITAGE & ALIGNMENT
            </Link>
            <Link 
              href="#empower" 
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/40 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              HOW WE ADVANCE THE KINGDOM
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 text-white/60 text-xs tracking-[2px] flex flex-col items-center">
          SCROLL TO HONOUR THE KINGDOM
          <div className="w-px h-10 bg-white/30 mt-2" />
        </div>
      </section>

      {/* RESPECTFUL INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">WITH DEEPEST RESPECT</div>
        <h2 className="text-5xl font-semibold tracking-tighter text-black mb-8">
          We honour the Zulu Kingdom
        </h2>
        <p className="text-2xl text-[#404040] max-w-3xl mx-auto leading-relaxed">
          Big Five Group was born from the soil of KwaZulu-Natal. With profound honour to His Majesty the late King Goodwill Zwelithini kaBhekuzulu 
          and in support of the Goodwill Foundation, we pay the highest respect to the 720 Tribal Authorities and the rich ethical heritage of the Nguni tribe. 
          Our values, our vision, and our every action are rooted in the timeless wisdom, strength, and sovereignty of the Zulu people and their royal leadership.
        </p>
      </section>

      {/* HERITAGE & ALIGNMENT */}
      <section id="heritage" className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="uppercase tracking-[3px] text-xs text-[#fbbf24] mb-4">OUR ROOTS</div>
              <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">Heritage & Alignment</h3>
              
              <div className="space-y-8 text-lg text-[#404040]">
                <p>
                  We stand in full alignment with <a href="https://www.zulukingdom.co.za/" target="_blank" className="text-black underline hover:no-underline">www.zulukingdom.co.za</a> — the official voice of the Zulu Kingdom. 
                  Our work is not separate from the Kingdom; it is an extension of it.
                </p>
                <p>
                  Every decision we make passes through the lens of <span className="font-semibold text-black">"Does this honour the ancestors and build the Kingdom?"</span>
                </p>
                <p>
                  We recognise the authority of the Zulu Royal House and traditional leadership. Our role is to serve — not to lead — and to use modern tools to protect and advance what has been entrusted to us.
                </p>
                <p className="font-medium">
                  We honour the 720 Tribal Authorities who carry the sacred responsibility of traditional leadership across the Zulu Kingdom. 
                  We also pay deepest respect to the Nguni tribe and their profound ethics of Ubuntu, dignity, respect, and communal harmony that continue to guide our every action.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[16/10] bg-black rounded-3xl overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center opacity-90"
                  style={{ backgroundImage: "url('/tribal.jpg')" }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl border border-black/10 max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="text-[#fbbf24]" />
                  <div className="text-sm font-semibold text-black">OFFICIAL ALIGNMENT</div>
                </div>
                <p className="text-sm text-[#525252]">
                  Big Five Group operates with the blessing and guidance of traditional leadership and in full support of the Zulu Kingdom’s vision for its people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG FIVE GROUP AND UBUNTU */}
      <section className="py-24 bg-white border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">THE PHILOSOPHY THAT SHAPES EVERYTHING</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black mb-6">Big Five Group and Ubuntu</h3>
            <p className="max-w-3xl mx-auto text-xl text-[#525252]">
              At the heart of Big Five Group lies a profound truth: we exist because others exist. 
              This is not just philosophy — it is the operating system of our entire ecosystem.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12 text-lg text-[#404040] leading-relaxed">
            <div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6 flex items-center gap-3">
                <Heart className="text-[#fbbf24]" /> The Super-Cube® Leadership Model
              </h4>
              <p>
                Founded by Dr. Craig R. Muller at the <span className="font-semibold text-black">University of KwaZulu-Natal</span>, the Super-Cube® is a doctoral leadership model that redefines what it means to lead in the 21st century. 
                It was not developed in isolation — it was born from the soil of KwaZulu-Natal, deeply influenced by Zulu wisdom, language, and the lived experience of community.
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6 flex items-center gap-3">
                <Users className="text-[#fbbf24]" /> Ubuntu: “I Am Because We Are”
              </h4>
              <p>
                The Super-Cube® model is built on the ancient African philosophy of <span className="font-semibold text-black">Ubuntu</span> — the understanding that a person is a person through other persons. 
                In Zulu, this is expressed as <em>“Umuntu ngumuntu ngabantu”</em> — I am because we are.
              </p>
              <p className="mt-4">
                This is not abstract theory. It is the reason Big Five Group exists. Every one of our eight pillars — from regenerative agriculture to ethical blockchain — is designed to strengthen the web of relationships that make the Zulu nation strong.
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-semibold tracking-tight text-black mb-6 flex items-center gap-3">
                <Crown className="text-[#fbbf24]" /> I-Thou Theory: Dignity in Relationship
              </h4>
              <p>
                Super-Cube® integrates the powerful <span className="font-semibold text-black">I-Thou</span> philosophy of Martin Buber with Zulu relational ethics. 
                In an I-Thou relationship, the other is never treated as an object (I-It), but always as a sacred subject — worthy of respect, dignity, and presence.
              </p>
              <p className="mt-4">
                This is why Big Five Group rejects extractive models. We do not “serve customers” or “exploit resources.” We enter into relationship with farmers, communities, governments, and the land itself — as Thou.
              </p>
            </div>

            <div className="bg-[#fafafa] border-l-4 border-[#fbbf24] p-8 rounded-r-3xl">
              <p className="italic text-xl text-black">
                “Our work begins at home — with the Zulu Nation. We advance humanity not by leaving our heritage behind, but by carrying it forward with integrity, innovation, and love.”
              </p>
              <p className="mt-4 text-sm text-[#525252]">— Dr. Craig R. Muller, Founder of Big Five Group</p>
            </div>

            <div>
              <p>
                This is why our leadership model is not imported from elsewhere. It was pioneered at the University of KwaZulu-Natal because this land, this people, and this ancient wisdom have something profound to offer the world.
              </p>
              <p className="mt-4">
                Big Five Group is the living expression of Super-Cube® leadership — where technology, business, and governance are not ends in themselves, but tools to restore relationship, dignity, and collective flourishing, starting with the Zulu Kingdom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW BIG FIVE EMPOWERS THE KINGDOM - ALL 8 PILLARS */}
      <section id="empower" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">THE EIGHT PILLARS SERVE THE KINGDOM</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black">How Big Five Advances the Zulu Kingdom</h3>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-[#525252]">
              Our eight companies are not just businesses — they are instruments of empowerment, sovereignty, and legacy for the Zulu nation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { pillar: "Agri & Foods", impact: "Regenerative farming and fortified nutrition restore dignity and health to rural communities — the backbone of the Kingdom." },
              { pillar: "Direct & Access", impact: "Micro-hubs and government funding access create real economic power in the hands of Zulu families and cooperatives." },
              { pillar: "Connect", impact: "SupplierAdvisor® gives Zulu businesses and the Kingdom transparent, ethical access to national and global markets." },
              { pillar: "Leadership", impact: "Super-Cube® leadership development is building the next generation of Zulu executives, traditional leaders, and public servants." },
              { pillar: "Foundation", impact: "On-chain philanthropy ensures every rand donated to Zulu causes is tracked, verified, and maximised for impact." },
              { pillar: "Tribal", impact: "We honour the legacy of the late King Goodwill Zwelithini and the 720 Tribal Authorities. As cultural and spiritual partners to the Nguni people, we preserve heritage, activate royal protocols, and position the Zulu Kingdom as a global beacon of African excellence." },
              { pillar: "Agri Expansion", impact: "Scaling regenerative agriculture across KwaZulu-Natal to create food sovereignty and thousands of rural jobs for Zulu families." },
              { pillar: "Kingdom Legacy", impact: "Building long-term institutions, education programmes, and economic infrastructure that will serve the Zulu nation for generations." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-black/10 rounded-3xl p-9 hover:border-black/20 transition-all"
              >
                <div className="text-[#fbbf24] text-sm tracking-widest mb-3">PILLAR {String(index + 1).padStart(2, '0')}</div>
                <div className="text-3xl font-semibold tracking-tight text-black mb-6">{item.pillar}</div>
                <p className="text-lg text-[#171717] leading-relaxed">{item.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING — THE KINGDOM RISES */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[#fbbf24] text-xs tracking-[4px] mb-6">INKOSI • ISIZWE • ISIKHATHI</div>
          
          <h2 className="text-white text-6xl font-semibold tracking-tighter leading-none mb-10">
            The Kingdom Rises.<br />Big Five Stands With It.
          </h2>

          <p className="text-white/80 text-2xl max-w-2xl mx-auto mb-12">
            In eternal honour of His Majesty the late King Goodwill Zwelithini kaBhekuzulu, the Goodwill Foundation, the 720 Tribal Authorities, and the Nguni people —<br />
            We do not build on the Kingdom.<br />We build <span className="text-white">for</span> the Kingdom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://www.zulukingdom.co.za/" 
              target="_blank"
              className="premium-button inline-flex items-center justify-center gap-3 bg-[#fbbf24] text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              VISIT ZULUKINGDOM.CO.ZA
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
