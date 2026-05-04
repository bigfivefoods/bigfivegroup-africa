"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Award, TrendingUp, Leaf, Handshake, Tractor, Coins, UserCheck } from "lucide-react";

export default function AgriPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO WITH YOUR IMAGE */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/agri-hero.jpg')" }}
        />
        
        {/* Dotted Overlay (kept as requested) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-20" />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="text-[#4ade80] text-xs tracking-[4px] mb-6">PILLAR 01 • REGENERATIVE FARMING</div>
          
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8 uppercase">
            BIG FIVE AGRI
          </h1>
          
          <p className="max-w-3xl mx-auto text-2xl text-white/95 font-light tracking-tight mb-12">
            PARTNERING WITH THE TRIBAL AUTHORIY, ZULU KINGDOM AND GOVERNMENTS ACROSS AFRICA TO REGENERATE FARMLAND, EMPOWER FARMERS, AND FEED THE CONTINENT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
              PARTNER WITH AGRI
            </Link>
            <Link href="#zulukingdom" className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10">
              OUR ZULU KINGDOM PARTNERSHIP
            </Link>
          </div>
        </div>
      </section>

      {/* ZULU KINGDOM PARTNERSHIP */}
      <section id="zulukingdom" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-[#166534] mb-4">DEEP PARTNERSHIP</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Working Hand-in-Hand with the Zulu Kingdom</h2>
          <p className="max-w-3xl mx-auto text-xl text-[#525252]">
            Big Five Agri is proud to stand alongside His Majesty the Zulu King and the Zulu Kingdom government in a historic partnership to restore African agriculture from the ground up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <div className="mb-6">
              <Handshake className="w-12 h-12 text-[#166534]" />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">Our Commitment to the Zulu Kingdom</h3>
            <div className="space-y-4 text-[#404040]">
              <p>We work directly with the Zulu Kingdom government and traditional leadership structures to:</p>
              <ul className="space-y-3 pl-4">
                <li>• Restore degraded farmland across KwaZulu-Natal using regenerative practices</li>
                <li>• Train thousands of Zulu farmers in modern regenerative techniques</li>
                <li>• Create sustainable agricultural value chains that benefit local communities first</li>
                <li>• Protect indigenous knowledge while introducing climate-smart innovations</li>
                <li>• Build food security that honours Zulu heritage and sovereignty</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <div className="mb-6">
              <Leaf className="w-12 h-12 text-[#166534]" />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-6">Regenerative Farming with Purpose</h3>
            <div className="space-y-4 text-[#404040]">
              <p>Our partnership focuses on restoring the land while creating real economic opportunity:</p>
              <ul className="space-y-3 pl-4">
                <li>• Converting degraded soil into fertile, carbon-rich farmland</li>
                <li>• Introducing drought-resistant indigenous crops alongside high-yield varieties</li>
                <li>• Establishing farmer cooperatives that give Zulu communities ownership</li>
                <li>• Creating direct market access so farmers earn fair prices</li>
                <li>• Building the next generation of African agricultural leaders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT ACROSS AFRICA - UPDATED CARDS ONLY */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#166534] mb-4">CONTINENTAL REACH</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black">Impact Across Africa</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Updated */}
            <div className="bg-[#fafafa] border border-black/10 rounded-3xl p-9 text-center">
              <div className="text-6xl font-semibold tracking-tighter text-[#166534] mb-4">2.8M</div>
              <div className="text-xl text-[#171717] mb-2">Hectares</div>
              <div className="text-sm text-[#525252]">Opportunity for regenerative management</div>
            </div>

            {/* Card 2 - Updated */}
            <div className="bg-[#fafafa] border border-black/10 rounded-3xl p-9 text-center">
              <div className="text-6xl font-semibold tracking-tighter text-[#166534] mb-4">50,000+</div>
              <div className="text-xl text-[#171717] mb-2">Farmers to be Trained</div>
              <div className="text-sm text-[#525252]">Across 54 African nations</div>
            </div>

            {/* Card 3 - Unchanged */}
            <div className="bg-[#fafafa] border border-black/10 rounded-3xl p-9 text-center">
              <div className="text-6xl font-semibold tracking-tighter text-[#166534] mb-4">47%</div>
              <div className="text-xl text-[#171717] mb-2">Income Increase</div>
              <div className="text-sm text-[#525252]">For participating smallholder farmers</div>
            </div>

            {/* Card 4 - Updated */}
            <div className="bg-[#fafafa] border border-black/10 rounded-3xl p-9 text-center">
              <div className="text-6xl font-semibold tracking-tighter text-[#166534] mb-4">54</div>
              <div className="text-xl text-[#171717] mb-2">Countries</div>
              <div className="text-sm text-[#525252]">Opportunity for regenerative programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK WITH GOVERNMENTS & INSTITUTIONS */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-[#166534] mb-4">GOVERNMENT & INSTITUTIONAL PARTNERSHIPS</div>
          <h3 className="text-5xl font-semibold tracking-tighter text-black">How We Work with Governments & Institutions</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h4 className="text-2xl font-semibold tracking-tight text-black mb-6">Government Collaboration</h4>
            <div className="space-y-4 text-[#404040]">
              <p>We partner with national and provincial governments to:</p>
              <ul className="space-y-3 pl-4">
                <li>• Align regenerative programs with national food security strategies</li>
                <li>• Access development finance and agricultural subsidies</li>
                <li>• Integrate traditional leadership into modern agricultural policy</li>
                <li>• Create enabling environments for smallholder farmer growth</li>
                <li>• Deliver measurable outcomes for B-BBEE and transformation targets</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-3xl p-10">
            <h4 className="text-2xl font-semibold tracking-tight text-black mb-6">Institutional Partners</h4>
            <div className="space-y-4 text-[#404040]">
              <p>We work with leading institutions to scale impact:</p>
              <ul className="space-y-3 pl-4">
                <li>• Development finance institutions (DFIs)</li>
                <li>• Agricultural research councils and universities</li>
                <li>• International climate funds and green bonds</li>
                <li>• Cooperative banks and rural finance institutions</li>
                <li>• Traditional authorities and community trusts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROMISE TO FARMERS */}
      <section className="bg-[#166534] py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Users className="w-16 h-16 mx-auto text-[#4ade80]" />
          </div>
          <h3 className="text-5xl font-semibold tracking-tighter mb-8">Our Promise to African Farmers</h3>
          <div className="max-w-3xl mx-auto text-xl text-white/90 leading-relaxed mb-12">
            Every farmer we work with becomes part of a movement that restores dignity, creates wealth, and builds food sovereignty. We don’t just teach farming — we build futures.
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="mb-4">
                <Leaf className="w-10 h-10 text-[#4ade80]" />
              </div>
              <div className="font-semibold text-xl mb-3">Land Restoration</div>
              <div className="text-white/80">We restore degraded soil so future generations inherit fertile land, not desert.</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="mb-4">
                <Coins className="w-10 h-10 text-[#4ade80]" />
              </div>
              <div className="font-semibold text-xl mb-3">Fair Income</div>
              <div className="text-white/80">Direct market access means farmers keep more of what they grow.</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="mb-4">
                <UserCheck className="w-10 h-10 text-[#4ade80]" />
              </div>
              <div className="font-semibold text-xl mb-3">Dignity & Ownership</div>
              <div className="text-white/80">Farmers own their cooperatives and share in the success they create.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#4ade80] text-xs tracking-[3px] mb-6">THE TIME TO REGENERATE IS NOW</div>
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">
            Let’s restore Africa’s farmland together
          </h2>
          <p className="text-white/80 text-xl mb-12">
            Whether you’re a government, institution, investor, or farmer — there is a place for you in this movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-[#4ade80] text-black px-10 py-4 rounded-full text-lg font-semibold">
              BECOME AN AGRI PARTNER
            </Link>
            <Link href="/foundation" className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10">
              SUPPORT FARMER TRAINING
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}