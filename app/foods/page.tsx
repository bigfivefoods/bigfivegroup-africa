"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Award, TrendingUp, Leaf, Handshake, Tractor, Coins, UserCheck } from "lucide-react";

export default function FoodsPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO WITH YOUR IMAGE */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/foods-hero.jpg')" }}
        />
        
        {/* Dotted Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-20" />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="flex justify-center mb-6">
            <Image 
              src="/bigfivefoods-logo.png" 
              alt="Big Five Foods" 
              width={180} 
              height={60}
              className="h-auto"
            />
          </div>
          
          <div className="text-[#fde047] text-xs tracking-[4px] mb-6">PILLAR 02 • FORTIFIED NUTRITION</div>
          
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8 uppercase">
            BIG FIVE FOODS
          </h1>
          
          <p className="max-w-3xl mx-auto text-2xl text-white/95 font-light tracking-tight mb-12">
            DELIVERING 73.9% MORE NUTRITIOUS MEALS TO CHILDREN ACROSS AFRICA THROUGH OUR FORTIFIED FOOD ECOSYSTEM.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold">
              PARTNER WITH FOODS
            </Link>
            <Link href="#impact" className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10">
              SEE OUR IMPACT
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[3px] text-[#ca8a04] mb-4">PROVEN RESULTS</div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Nutrition That Transforms Lives</h2>
          <p className="text-xl text-[#525252]">Every meal we deliver is engineered for maximum impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">🍽️</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">124 Million+</h3>
            <p className="text-[#525252]">Nutritious meals delivered in 2025</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">📈</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">73.9%</h3>
            <p className="text-[#525252]">Higher nutritional value vs standard meals</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">13 Countries</h3>
            <p className="text-[#525252]">National school feeding programs</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">Feed Africa with us</h2>
          <Link href="/connect" className="premium-button inline-flex items-center justify-center gap-3 bg-[#fde047] text-black px-10 py-4 rounded-full text-lg font-semibold">
            BECOME A FOODS PARTNER
          </Link>
        </div>
      </section>
    </div>
  );
}
