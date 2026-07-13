"use client";

import Link from "next/link";
import {
  Crown,
  Users,
  Heart,
  HandHeart,
  Home,
  Leaf,
  GraduationCap,
  Handshake,
  Shield,
  Sparkles,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";

export default function RoyalPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/tribal.jpg"
        eyebrow="ROYAL PARTNERSHIP · COMMUNITY FIRST"
        title={
          <>
            In partnership with
            <br />
            the royal family.
          </>
        }
        subtitle="Big Five Group walks alongside the royal family — to serve our communities with dignity, respect, and lasting opportunity. We are here to serve, not to take."
        ctas={[
          { href: "#partnership", label: "Our partnership", primary: true },
          { href: "#serve", label: "How we serve communities" },
        ]}
        overlayClassName="bg-black/60"
      />

      {/* Opening statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fffbeb] border border-[#fde68a] mb-6">
          <Crown className="w-7 h-7 text-[#d97706]" />
        </div>
        <div className="text-xs tracking-[3px] text-[#d97706] mb-4">A SHARED MANDATE</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-6 text-balance">
          We partner with the royal family
          <br className="hidden sm:block" /> to serve our communities
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#525252] leading-relaxed max-w-3xl mx-auto">
          Big Five was born in KwaZulu-Natal. Our purpose is simple and steady: stand in partnership
          with the royal family, honour traditional leadership, and put practical tools, jobs,
          nutrition, and opportunity into the hands of the people we serve.
        </p>
      </section>

      {/* Partnership */}
      <section id="partnership" className="bg-white border-y border-black/10 py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="min-w-0">
              <div className="text-xs tracking-[3px] text-[#d97706] mb-4">THE PARTNERSHIP</div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-6 sm:mb-8 text-balance">
                Royal family. Shared purpose. Community at the centre.
              </h3>
              <div className="space-y-5 text-base sm:text-lg text-[#404040] leading-relaxed">
                <p>
                  We work{" "}
                  <strong className="text-black">in partnership with the royal family</strong> —
                  with humility, accountability, and a clear commitment to community wellbeing.
                </p>
                <p>
                  Our role is to{" "}
                  <strong className="text-black">serve our communities</strong>: families,
                  traditional authorities, youth, farmers, enterprises, and the places that raised
                  us. Partnership means we listen first, align with local leadership, and deliver
                  programmes that last.
                </p>
                <p>
                  We recognise the authority and guidance of the{" "}
                  <strong className="text-black">royal house</strong> and traditional leadership.
                  We bring enterprise capability, ethical platforms, and transparent delivery — so
                  heritage and modern opportunity strengthen each other.
                </p>
              </div>
            </div>

            <div className="relative min-w-0">
              <div
                className="aspect-[4/3] rounded-2xl sm:rounded-[1.75rem] bg-cover bg-center border border-black/10 shadow-xl"
                style={{
                  backgroundImage: "url('/tribal.jpg')",
                  backgroundPosition: "center 30%",
                }}
              />
              <div className="mt-5 sm:absolute sm:-bottom-5 sm:right-5 sm:mt-0 bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl border border-black/10 max-w-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Handshake className="w-5 h-5 text-[#d97706]" />
                  <div className="text-sm font-semibold text-black tracking-wide">
                    PARTNERSHIP PLEDGE
                  </div>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed">
                  We walk with the royal family to uplift communities — with respect, integrity,
                  and measurable service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values of service */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="HOW WE SHOW UP"
          title="Service that communities can feel"
          subtitle="Partnership is not a statement. It is how we plan, deliver, and stay accountable to the people we serve."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: Crown,
              t: "Respect for the royal family",
              d: "We honour royal leadership and traditional authority. Guidance from the royal family shapes how we engage communities.",
            },
            {
              icon: HandHeart,
              t: "Here to serve",
              d: "Our mandate is service — nutrition, livelihoods, skills, and fair access — designed with communities, not imposed on them.",
            },
            {
              icon: Users,
              t: "Ubuntu in action",
              d: "Umuntu ngumuntu ngabantu. We grow only when families, leaders, and local enterprises grow with us.",
            },
            {
              icon: Shield,
              t: "Dignity & transparency",
              d: "Ethical commerce, clear reporting, and programmes people can trust — from village level to institutional partners.",
            },
            {
              icon: Home,
              t: "Rooted at home",
              d: "Born of KwaZulu-Natal soil, we begin with our neighbours and extend service across Africa with the same values.",
            },
            {
              icon: Sparkles,
              t: "Legacy for the next generation",
              d: "We invest in youth, leadership, and sustainable enterprise so communities inherit opportunity — not dependency.",
            },
          ].map((card) => (
            <div
              key={card.t}
              className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-[#fbbf24]/50 transition-colors min-w-0"
            >
              <card.icon className="w-8 h-8 text-[#d97706] mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">{card.t}</h3>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we serve communities */}
      <section id="serve" className="bg-white border-y border-black/10 py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SERVICE TO OUR COMMUNITIES"
            title="Where partnership becomes impact"
            subtitle="Through Big Five pillars, we put royal partnership into daily service — farms, food, markets, skills, and care."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              {
                icon: Leaf,
                pillar: "Farms & food",
                impact:
                  "Regenerative agriculture and fortified nutrition strengthen rural households — food security with dignity.",
              },
              {
                icon: Handshake,
                pillar: "Markets & access",
                impact:
                  "Direct routes to market and fair institutional access help local producers and enterprises keep more value.",
              },
              {
                icon: GraduationCap,
                pillar: "Leadership & skills",
                impact:
                  "Leadership development and Super-Cube® programmes equip community leaders, youth, and professionals to serve well.",
              },
              {
                icon: Heart,
                pillar: "Foundation & delivery",
                impact:
                  "Transparent programmes and professional delivery ensure community projects land on the ground — and stay accountable.",
              },
            ].map((item) => (
              <div
                key={item.pillar}
                className="bg-[#fafafa] border border-black/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-[#fbbf24]/40 transition-colors min-w-0"
              >
                <item.icon className="w-7 h-7 text-[#d97706] mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2 sm:mb-3">
                  {item.pillar}
                </h3>
                <p className="text-sm sm:text-base text-[#525252] leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / pledge band */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <blockquote className="bg-white border-l-4 border-[#f59e0b] rounded-r-2xl sm:rounded-r-3xl p-6 sm:p-10 shadow-sm border border-black/5 border-l-[#f59e0b]">
          <p className="text-xl sm:text-2xl md:text-3xl text-black font-medium tracking-tight leading-snug">
            “We are in partnership with the royal family — and we are here to serve our
            communities. That is the heart of Big Five.”
          </p>
          <footer className="mt-5 text-sm text-[#737373]">
            — Big Five Group · Rooted in KwaZulu-Natal · Serving Africa
          </footer>
        </blockquote>
      </section>

      {/* Closing dark band */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 md:py-24 text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-[#fbbf24] text-xs tracking-[3px] sm:tracking-[4px] mb-5 sm:mb-6">
            ROYAL PARTNERSHIP · COMMUNITY SERVICE
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] mb-6 sm:mb-8 text-balance">
            Partnership with the royal family.
            <br />
            Service to our communities.
          </h2>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            We do not stand above our people. We walk with the royal family to{" "}
            <strong className="text-white font-semibold">feed</strong>,{" "}
            <strong className="text-white font-semibold">educate</strong>, and{" "}
            <strong className="text-white font-semibold">empower</strong> the communities we serve
            — starting at home.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12 text-left max-w-3xl mx-auto">
            {[
              {
                title: "Feed",
                desc: "Nutrition, regenerative food systems, and food security that restore dignity at household and community level.",
              },
              {
                title: "Educate",
                desc: "Leadership development, skills, and Super-Cube® pathways that grow capability for the next generation.",
              },
              {
                title: "Empower",
                desc: "Markets, access, and enterprise tools that put opportunity into local hands — with the royal family as partners in service.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 min-w-0"
              >
                <div className="text-[#fbbf24] text-xs tracking-[2px] font-semibold mb-2">
                  {item.title.toUpperCase()}
                </div>
                <h3 className="text-white text-xl font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/foods"
              className="premium-button inline-flex items-center justify-center gap-3 bg-[#f59e0b] text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold"
            >
              Feed · Foods
            </Link>
            <Link
              href="/leadership"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10"
            >
              Educate · Leadership
            </Link>
            <Link
              href="/access"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10"
            >
              Empower · Access
            </Link>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="SERVE WITH US"
        title="Join a partnership that puts communities first"
        subtitle="Whether you are a community leader, institution, or partner — walk with us as we serve alongside the royal family."
        primary={{ href: "/connect", label: "Partner with Big Five" }}
        secondary={{ href: "/foundation", label: "Foundation programmes" }}
      />
    </div>
  );
}
