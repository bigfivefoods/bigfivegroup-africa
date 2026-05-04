"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Globe, UtensilsCrossed, ChefHat, Beef, Soup, Factory } from "lucide-react";

export default function FoodsPage() {
  const productCategories = [
    {
      title: "Fortified Porridges",
      icon: UtensilsCrossed,
      description: "High-protein, vitamin-enriched instant porridges for children and families",
      images: [
        "/foods/porridge-chocolate.jpg",
        "/foods/porridge-banana.jpg",
        "/foods/porridge-original.jpg",
        "/foods/porridge-strawberry.jpg"
      ],
      stats: "74% more nutrition • 185% more fortification",
      benefits: "Fortified with essential minerals, B-vitamins, dietary fibre, calcium, magnesium, phosphorus and iron. Made from locally grown South African maize. 4 delicious flavours: Banana, Strawberry, Chocolate, Original (No Added Sugar also available).",
      value: "Offers up to 25% of daily nutritional needs per serving at exceptional value."
    },
    {
      title: "Soya Mince",
      icon: Beef,
      description: "Plant-based protein mince in 4 delicious flavours — affordable and versatile",
      images: [
        "/foods/soya-chilli-beef.jpg",
        "/foods/soya-beef-onion.jpg",
        "/foods/soya-beef.jpg",
        "/foods/soya-mutton.jpg"
      ],
      stats: "R1.30 per meal • 24.4% more protein than leading brands",
      benefits: "High protein, low cost sustainable plant-based protein. Perfect for households, catering and businesses. Packed with essential nutrients to combat malnutrition. Easy to prepare with just water.",
      value: "4 flavours: Chilli Beef, Rich Beef, Beef & Onion, Mutton."
    },
    {
      title: "One-Pot Meals",
      icon: ChefHat,
      description: "Ready-to-cook complete meals with balanced nutrition in 4 hearty flavours",
      images: [
        "/foods/onepot-chakalaka.jpg",
        "/foods/onepot-beef.jpg",
        "/foods/onepot-chicken.jpg",
        "/foods/onepot-chilli-beef.jpg"
      ],
      stats: "R2.50 per meal • 20 meals per kg",
      benefits: "Nutritious & energy-boosting with protein, vitamins (A, D) and minerals (iron, calcium). Features authentic African tastes: Chicken, Beef, Chilli Beef and Chakalaka. 24-month shelf life. Locally sourced in South Africa.",
      value: "Cooked in just 20 minutes. Reduces dependency on imported goods and supports local farmers."
    },
    {
      title: "Soups",
      icon: Soup,
      description: "Fortified instant soup thickeners in 4 classic South African flavours",
      images: [
        "/foods/soup-brown-onion.jpg",
        "/foods/soup-oxtail.jpg",
        "/foods/soup-minestrone.jpg",
        "/foods/soup-chicken.jpg"
      ],
      stats: "R1.10 per meal • 3.6% more protein",
      benefits: "Nutrient-packed with vitamins (A, C) and minerals (iron, calcium). Quick to prepare, available in rich African-inspired flavours: Brown Onion, Minestrone, Oxtail, Chicken, and Rich Beef. 24-month shelf life.",
      value: "Locally made from South African maize, supporting local farmers and creating jobs."
    }
  ];

  const capabilities = [
    {
      name: "ISO 9001",
      logo: "/foods/iso9001.png",
      desc: "International standard for quality management systems ensuring consistent excellence."
    },
    {
      name: "FSSC 22000",
      logo: "/foods/fssc22000.png",
      desc: "Global food safety certification guaranteeing safe, high-quality production."
    },
    {
      name: "Sedex",
      logo: "/foods/sedex.png",
      desc: "Ethical supply chain platform promoting responsible and transparent business practices."
    },
    {
      name: "SANHA Halaal",
      logo: "/foods/halaal-sanha.png",
      desc: "Official South African Halaal certification ensuring full Islamic compliance."
    },
    {
      name: "Kosher Certified",
      logo: "/foods/kosher.png",
      desc: "Strict adherence to Jewish dietary laws with the highest standards of purity."
    },
    {
      name: "SAAFosT",
      logo: "/foods/saafost.png",
      desc: "Member of the South African Association for Food Science & Technology."
    },
    {
      name: "BUOSD SA",
      logo: "/foods/buosd-sa.png",
      desc: "South African Kosher certification authority maintaining the highest kosher standards."
    }
  ];

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO WITH YOUR IMAGE + LOGO + WHITE TEXT */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/foods-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-20" />
        <div className="absolute inset-0 bg-black/45" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="flex justify-center mb-8">
            <Image 
              src="/bigfivefoods-logo.png" 
              alt="Big Five Foods" 
              width={200} 
              height={70}
              className="h-auto"
            />
          </div>

          <div className="text-[#fde047] text-xs tracking-[4px] mb-6">PILLAR 02 • FORTIFIED NUTRITION</div>
          
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8 uppercase">
            BIG FIVE FOODS
          </h1>
          
          <p className="max-w-3xl mx-auto text-2xl text-white font-light tracking-tight mb-12">
            DELIVERING 73.9% MORE NUTRITIOUS MEALS TO CHILDREN ACROSS AFRICA THROUGH OUR FORTIFIED FOOD ECOSYSTEM.
          </p>
          
          <Link 
            href="/connect" 
            className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
          >
            PARTNER WITH FOODS
          </Link>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Nutrition That Transforms Lives</h2>
          <p className="text-xl text-[#525252]">Every meal we deliver is engineered for maximum impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="mb-6 flex justify-center">
              <UtensilsCrossed className="w-14 h-14 text-[#ca8a04]" />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">10 Thousand+</h3>
            <p className="text-[#525252]">Nutritious meals delivered in 2025</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="mb-6 flex justify-center">
              <Award className="w-14 h-14 text-[#ca8a04]" />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">73.9%</h3>
            <p className="text-[#525252]">Higher nutritional value vs standard meals</p>
          </div>
          <div className="bg-white border border-black/10 rounded-3xl p-10 text-center">
            <div className="mb-6 flex justify-center">
              <Globe className="w-14 h-14 text-[#ca8a04]" />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-black mb-4">54 Countries</h3>
            <p className="text-[#525252]">Planned school feeding programs</p>
          </div>
        </div>
      </section>

      {/* OUR PRODUCT RANGE */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#ca8a04] mb-4">OUR RANGE</div>
            <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Premium Fortified Foods</h2>
            <p className="max-w-2xl mx-auto text-xl text-[#525252]">
              Every product is scientifically formulated for maximum nutrition, taste, and impact.
            </p>
          </div>

          <div className="space-y-20">
            {productCategories.map((category, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#ca8a04]/10 flex items-center justify-center">
                      <category.icon className="w-10 h-10 text-[#ca8a04]" />
                    </div>
                    <h3 className="text-4xl font-semibold tracking-tighter text-black">{category.title}</h3>
                  </div>
                  
                  <p className="text-xl text-[#525252] leading-relaxed mb-6">
                    {category.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-[#ca8a04] mb-2">KEY STATS</div>
                    <div className="text-lg text-black font-medium">{category.stats}</div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-[#ca8a04] mb-2">KEY BENEFITS</div>
                    <p className="text-[#525252] leading-relaxed">{category.benefits}</p>
                  </div>

                  <div className="text-sm text-[#ca8a04] font-medium">{category.value}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {category.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="bg-[#fafafa] border border-black/10 rounded-2xl overflow-hidden flex items-center justify-center p-3">
                      <Image 
                        src={img} 
                        alt={category.title} 
                        width={260} 
                        height={260}
                        className="object-contain w-full h-auto max-h-[240px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR CAPABILITIES - NEW SECTION */}
      <section className="bg-[#fafafa] py-24 border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#ca8a04] mb-4">WORLD-CLASS STANDARDS</div>
            <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">Our Capabilities</h2>
            <p className="max-w-2xl mx-auto text-xl text-[#525252]">
              Certified to the highest global standards with the capacity to feed nations.
            </p>
          </div>

          {/* Production Capacity */}
          <div className="bg-black text-white rounded-3xl p-12 text-center mb-16">
            <div className="flex justify-center mb-6">
              <Factory className="w-16 h-16 text-[#fde047]" />
            </div>
            <div className="text-6xl font-semibold tracking-tighter mb-4">600 Tonnes</div>
            <div className="text-2xl text-white/90">Daily Production Capacity</div>
            <div className="mt-4 text-sm text-white/60">Across our state-of-the-art facilities in South Africa</div>
          </div>

          {/* Certification Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-8">
                  <Image 
                    src={cert.logo} 
                    alt={cert.name} 
                    width={140} 
                    height={70}
                    className="h-auto max-h-[60px] object-contain"
                  />
                </div>
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-4 text-center">{cert.name}</h4>
                <p className="text-[#525252] text-center leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
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
