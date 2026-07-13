"use client";

import Link from "next/link";
import { Crown, Users, Heart, ExternalLink, Landmark, Leaf } from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";

const KINGDOM_URL = "https://www.zulukingdom.co.za/";

export default function TribalPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <PageHero
        image="/tribal.jpg"
        eyebrow="INKOSI · ISIZWE · ISIKHATHI"
        title={
          <>
            The Kingdom rises.
            <br />
            Big Five stands with it.
          </>
        }
        subtitle="With deepest honour to His Majesty the late King Goodwill Zwelithini kaBhekuzulu and the Goodwill Foundation — Big Five stands with the Zulu Kingdom, the Nguni people, and the 720 Tribal Authorities."
        ctas={[
          { href: "#heritage", label: "Heritage & alignment", primary: true },
          { href: "#empower", label: "How we advance the Kingdom" },
        ]}
        overlayClassName="bg-black/65"
      />

      {/* Honour intro */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24 text-center">
        <div className="text-xs tracking-[3px] text-amber-600 mb-4">WITH DEEPEST RESPECT</div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black mb-6">
          We honour the Zulu Kingdom
        </h2>
        <p className="text-lg sm:text-xl text-[#525252] leading-relaxed max-w-3xl mx-auto">
          Big Five Group was born from the soil of KwaZulu-Natal. Our values, vision, and every
          action are rooted in the wisdom, strength, and sovereignty of the Zulu people and their
          royal leadership — and in the ethical heritage of the Nguni nation.
        </p>
      </section>

      {/* Heritage */}
      <section id="heritage" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="text-xs tracking-[3px] text-amber-600 mb-4">OUR ROOTS</div>
              <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-black mb-8">
                Heritage & alignment
              </h3>
              <div className="space-y-5 text-lg text-[#404040] leading-relaxed">
                <p>
                  We stand in full alignment with{" "}
                  <a
                    href={KINGDOM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-semibold underline underline-offset-4 hover:no-underline"
                  >
                    www.zulukingdom.co.za
                  </a>{" "}
                  — the official voice of the Zulu Kingdom. Our work is not separate from the
                  Kingdom; it is an extension of service to it.
                </p>
                <p>
                  Every decision passes through the lens of{" "}
                  <span className="font-semibold text-black">
                    “Does this honour the ancestors and build the Kingdom?”
                  </span>
                </p>
                <p>
                  We recognise the authority of the Zulu Royal House and traditional leadership.
                  Our role is to <strong className="text-black">serve — not to lead</strong> — and
                  to use modern tools to protect and advance what has been entrusted to us.
                </p>
                <p>
                  We honour the <strong className="text-black">720 Tribal Authorities</strong> and
                  the Nguni ethics of Ubuntu, dignity, respect, and communal harmony that guide
                  our work.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-[1.75rem] bg-cover bg-center border border-black/10 shadow-xl"
                style={{
                  backgroundImage: "url('/tribal.jpg')",
                  backgroundPosition: "center 30%",
                }}
              />
              <div className="mt-6 sm:absolute sm:-bottom-6 sm:right-6 sm:mt-0 bg-white p-7 rounded-3xl shadow-xl border border-black/10 max-w-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <div className="text-sm font-semibold text-black tracking-wide">
                    OFFICIAL ALIGNMENT
                  </div>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed">
                  Big Five operates with respect for traditional leadership and in support of the
                  Zulu Kingdom’s vision for its people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ubuntu */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="THE PHILOSOPHY THAT SHAPES EVERYTHING"
          title="Ubuntu at the centre"
          subtitle="We exist because others exist. That truth is the operating system of the Big Five ecosystem."
        />
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: Heart,
              t: "Super-Cube® roots",
              d: "Born at the University of KwaZulu-Natal and shaped by Zulu wisdom, community, and lived experience — not imported theory alone.",
            },
            {
              icon: Users,
              t: "Umuntu ngumuntu ngabantu",
              d: "I am because we are. Every pillar is designed to strengthen the relationships that make nations strong.",
            },
            {
              icon: Crown,
              t: "I–Thou dignity",
              d: "We reject extractive models. Farmers, communities, governments, and the land are partners — never mere resources.",
            },
          ].map((card) => (
            <div
              key={card.t}
              className="bg-white border border-black/10 rounded-3xl p-8 hover:border-amber-300/50 transition-colors"
            >
              <card.icon className="w-8 h-8 text-amber-500 mb-5" />
              <h3 className="text-xl font-semibold text-black mb-3">{card.t}</h3>
              <p className="text-[#525252] leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
        <blockquote className="bg-white border-l-4 border-amber-400 rounded-r-3xl p-8 sm:p-10">
          <p className="text-xl sm:text-2xl text-black font-medium tracking-tight leading-snug italic">
            “Our work begins at home — with the Zulu Nation. We advance humanity not by leaving our
            heritage behind, but by carrying it forward with integrity, innovation, and love.”
          </p>
          <footer className="mt-5 text-sm text-[#737373]">
            — Dr. Craig R. Muller, Founder of Big Five Group
          </footer>
        </blockquote>
      </section>

      {/* How pillars serve Kingdom */}
      <section id="empower" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="SERVICE TO THE KINGDOM"
            title="How Big Five advances the Zulu Kingdom"
            subtitle="Our pillars are instruments of empowerment, sovereignty, and legacy — not ends in themselves."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Leaf,
                pillar: "Agri & Foods",
                impact:
                  "Regenerative farming and fortified nutrition restore dignity and health in rural communities — the backbone of the Kingdom.",
              },
              {
                icon: Landmark,
                pillar: "Direct & Access",
                impact:
                  "Micro-hubs and institutional access put economic power in the hands of families and cooperatives.",
              },
              {
                icon: Users,
                pillar: "Connect",
                impact:
                  "SupplierAdvisor® gives Zulu enterprises transparent, ethical access to national and global markets.",
              },
              {
                icon: Heart,
                pillar: "Leadership",
                impact:
                  "Super-Cube® develops the next generation of Zulu executives, traditional leaders, and public servants.",
              },
              {
                icon: Crown,
                pillar: "Foundation & Impact",
                impact:
                  "Transparent philanthropy and professional project delivery ensure programmes land with integrity.",
              },
              {
                icon: Landmark,
                pillar: "Heritage & legacy",
                impact:
                  "We honour the late King Goodwill Zwelithini, the 720 Tribal Authorities, and the Nguni people — building institutions for generations.",
              },
            ].map((item) => (
              <div
                key={item.pillar}
                className="bg-[#fafafa] border border-black/10 rounded-3xl p-8 hover:border-amber-300/40 transition-colors"
              >
                <item.icon className="w-7 h-7 text-amber-500 mb-4" />
                <h3 className="text-2xl font-semibold tracking-tight text-black mb-3">
                  {item.pillar}
                </h3>
                <p className="text-[#525252] leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-black py-20 sm:py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-amber-400 text-xs tracking-[4px] mb-6">
            INKOSI · ISIZWE · ISIKHATHI
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-semibold tracking-tighter leading-[1.05] mb-8">
            The Kingdom rises.
            <br />
            Big Five stands with it.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            In eternal honour of His Majesty the late King Goodwill Zwelithini kaBhekuzulu, the
            Goodwill Foundation, the 720 Tribal Authorities, and the Nguni people — we do not build
            on the Kingdom. We build <span className="text-white font-medium">for</span> the Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={KINGDOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-3 bg-amber-400 text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              Visit zulukingdom.co.za
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/about"
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              About Big Five
            </Link>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="PARTNER IN HERITAGE"
        title="Build with us — from KwaZulu-Natal outward"
        subtitle="Explore how Agri, Leadership, Foundation, and Impact serve communities with dignity."
        primary={{ href: "/agri", label: "Big Five Agri" }}
        secondary={{ href: "/connect", label: "Partner with us" }}
      />
    </div>
  );
}
