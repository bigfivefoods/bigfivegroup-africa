"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Lightbulb,
  Shield,
  Sparkles,
  Users,
  UtensilsCrossed,
  GraduationCap,
  Zap,
  ArrowRight,
  ExternalLink,
  Target,
  Compass,
  AlertTriangle,
  Leaf,
  BookOpen,
  Network,
  Globe2,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";
import { pageBrand } from "../lib/pageBrand";
import { SOFI } from "../lib/sofi";
import { PILLAR_MISSIONS } from "../lib/pillarMissions";
import { getPillarAlignment } from "../lib/pillarAlignment";

const SUPER_CUBE_URL = "https://www.super-cube.me";
const SUPPLIER_URL = "https://www.supplieradvisor.com/onboarding?type=business";

export default function AboutPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <PageHero
        image="/about-hero.jpg"
        eyebrow="ABOUT BIG FIVE GROUP"
        title={
          <>
            We exist so Africa
            <br />
            can prosper
          </>
        }
        subtitle="Big Five Group is a multi-pillar African enterprise built to feed, educate, and empower people across the continent — with integrity, innovation, and measurable impact."
        ctas={[
          { href: "#vision", label: "Vision, mission & values", primary: true },
          { href: "#sofi", label: "Africa challenge · SOFI" },
          { href: "#founder", label: "Meet the founder" },
        ]}
        overlayClassName={pageBrand.about.overlay}
      />

      {/* Who we are */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="WHO WE ARE"
          title="An African group with a human mission"
          subtitle="Headquartered in KwaZulu-Natal, South Africa, Big Five Group brings together regenerative agriculture, fortified nutrition, ethical commerce, project delivery, leadership education, and philanthropy — not as separate brands, but as one system designed to serve people."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: UtensilsCrossed,
              t: "Feed",
              d: "Big Five Foods and Agri pathways that strengthen food security with dignity and quality.",
            },
            {
              icon: GraduationCap,
              t: "Educate",
              d: "Super-Cube® leadership development — ethical, holistic, and Africa-centric.",
            },
            {
              icon: Zap,
              t: "Empower",
              d: "SupplierAdvisor® and Access pathways that equip enterprises and communities to grow.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="bg-white border border-black/10 rounded-3xl p-8 text-center hover:border-black/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <x.icon className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{x.t}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-emerald-700 mb-4">
                <Compass className="w-4 h-4" />
                VISION
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
                A prosperous Africa — for everyone on it
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-base sm:text-lg text-[#404040] leading-relaxed min-w-0">
              <p>
                We envision an Africa where{" "}
                <strong className="text-black">well-being is not a privilege</strong> — where
                families eat with dignity, leaders decide with integrity, and communities build
                economies they own.
              </p>
              <p>
                Prosperity, for us, is more than GDP. It is food on the table, skills in the hands of
                the next generation, ethical enterprises that create jobs, and systems people can
                trust. We care deeply about the{" "}
                <strong className="text-black">well-being of all people on this continent</strong> —
                rural and urban, producers and professionals, today&apos;s workers and tomorrow&apos;s
                children.
              </p>
              <p className="text-xl text-black font-medium tracking-tight">
                Our vision is to help Africa prosper — by accelerating food security, transformative
                leadership, and economic empowerment through scalable solutions that create lasting
                opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-sky-700 mb-4">
              <Target className="w-4 h-4" />
              MISSION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
              Feed. Educate. Empower.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-lg text-[#404040] leading-relaxed">
            <p>
              Our mission is to put our{" "}
              <strong className="text-black">skills, capital, platforms, and relationships</strong>{" "}
              to work where they matter most — so the continent can feed its people, educate its
              leaders, and empower its enterprises.
            </p>
            <p>
              That is why the businesses exist. Each pillar of Big Five Group is a deliberate
              instrument of the mission:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold shrink-0">Feed —</span>
                <span>
                  Big Five Foods and Agri deliver nutritious, accessible, and regenerative pathways
                  that strengthen food security.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold shrink-0">Educate —</span>
                <span>
                  Super-Cube® and Big Five Leadership develop ethical, whole-person leaders for
                  business and public life.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-600 font-bold shrink-0">Empower —</span>
                <span>
                  SupplierAdvisor® with SAM, Access, Direct, and Impact equip suppliers,
                  entrepreneurs, and institutions with tools, markets, intelligence and delivery
                  capacity for self-reliance.
                </span>
              </li>
            </ul>
            <p className="text-base sm:text-lg text-[#404040] leading-relaxed pt-2 border-t border-black/10 mt-2">
              The future of this mission is intelligent: ethical AI and robotics where they multiply
              dignity, Super-Cube® for human leaders, and{" "}
              <strong className="text-black">SAM (SupplierAdvisor Messenger)</strong> as the
              always-on guide inside the commerce OS we run on. We do not chase tech for theatre —
              we use intelligence so Africa can feed, educate and empower at continental scale.
            </p>
            <p className="text-xl text-black font-medium tracking-tight pt-2">
              We deploy evidence-based models that equip leaders and organisations for ethical
              decision-making, innovation, and meaningful societal impact — aligned with the UN SDGs,
              including Zero Hunger, Quality Education, and No Poverty.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="VALUES"
            title="What we refuse to compromise"
            subtitle="Our values are not posters on a wall. They are how we hire, partner, trade, and deliver — every day."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Humanity",
                desc: "People come first. We design for dignity, well-being, and the common good — Ubuntu in practice, not just in words.",
              },
              {
                icon: Lightbulb,
                title: "Innovation & progress",
                desc: "We advance continuously — new products, better systems, smarter platforms — so Africa is never left with yesterday’s tools.",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "Honesty, transparency, and ethical commerce. Where applicable, our companies are verified on SupplierAdvisor® so trust is earned.",
              },
              {
                icon: Sparkles,
                title: "Excellence",
                desc: "World-class standards in food, leadership, project delivery, and partnerships. Good enough is not enough for a continent.",
              },
              {
                icon: Heart,
                title: "Compassionate empowerment",
                desc: "We do not create dependency. We transfer skills, open markets, and build capacity so communities rise under their own power.",
              },
              {
                icon: Users,
                title: "Humility & collaboration",
                desc: "We learn, partner, and improve. Progress is a team sport — with governments, enterprises, and communities.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-[#fafafa] border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-colors"
              >
                <v.icon className="w-9 h-9 text-emerald-700 mb-5" />
                <h3 className="text-xl font-semibold text-black mb-3">{v.title}</h3>
                <p className="text-[#525252] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UN SOFI — Africa challenges */}
      <section
        id="sofi"
        className="scroll-mt-28 relative overflow-hidden border-y border-black/10 bg-[#0a0a0a] text-white"
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(5,150,105,0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 100%, rgba(217,119,6,0.2), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="page-hero__dots opacity-30 absolute inset-0 z-0" aria-hidden />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] font-semibold uppercase text-emerald-400/90 mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              {SOFI.shortCite}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance leading-[1.05] mb-4">
              The challenge facing Africa
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              The United Nations&apos; State of Food Security and Nutrition in the World (
              {SOFI.edition}) is the multi-agency reference for hunger and nutrition. Global
              indicators eased slightly — but <strong className="text-white font-semibold">Africa
              remains the epicentre of undernourishment</strong>. That is the landscape our vision,
              mission and values answer.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {[
              {
                value: SOFI.africa.hungryLabel,
                label: `People in Africa faced hunger in ${SOFI.dataYearHunger}`,
                sub: `~${SOFI.africa.prevalencePct}% of the population · ~1 in 5`,
              },
              {
                value: SOFI.global.hungryLabel,
                label: `People globally faced hunger in ${SOFI.dataYearHunger}`,
                sub: `~${SOFI.global.prevalencePct}% of the world · SOFI point estimate`,
              },
              {
                value: SOFI.healthyDiets.cannotAffordLabel,
                label: "Cannot afford a healthy diet worldwide",
                sub: "Economic access — not only calories",
              },
              {
                value: SOFI.childNutrition.stuntedLabel,
                label: "Children under 5 stunted globally (2024 JME)",
                sub: `~${SOFI.childNutrition.stuntingPrevalence2024Pct}% · off-track for 2030`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-5 min-w-0 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-white/90 mt-2 leading-snug">
                  {s.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-white/45 mt-1.5 leading-snug">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {[
              {
                t: "Africa first in absolute hunger",
                d: SOFI.africa.epicentreNote + " Absolute numbers remain extremely high even where prevalence eases slightly.",
              },
              {
                t: "Healthy diets out of reach",
                d: SOFI.healthyDiets.note + " Fortification and affordable staples are structural answers — not boutique nutrition.",
              },
              {
                t: "2030 still off-track",
                d: SOFI.outlook2030.note + ` Pathways still imply ~${SOFI.outlook2030.shareInAfricaApprox} of residual undernourishment in Africa.`,
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 min-w-0"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-tight">
                  {c.t}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed max-w-3xl">
            Figures are multi-agency UN estimates ({SOFI.agencies}) — not Big Five audited counts.
            Sources:{" "}
            <a
              href={SOFI.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-white/55 hover:text-white"
            >
              SOFI 2026 FAO news
            </a>
            {" · "}
            <a
              href={SOFI.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-white/55 hover:text-white"
            >
              SOFI flagship page
            </a>
            .
          </p>
        </div>
      </section>

      {/* How the Group resolves SOFI challenges */}
      <section
        id="sofi-response"
        className="scroll-mt-28 bg-white border-b border-black/10 py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="text-[10px] sm:text-xs tracking-[2px] font-semibold uppercase text-emerald-800 mb-3">
              How the Group is geared to respond
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black text-balance leading-[1.05] mb-4">
              From challenge to system
            </h2>
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed">
              Vision sets the north star. Mission names the work —{" "}
              <strong className="text-black">Feed · Educate · Empower</strong>. Values discipline
              how we deliver. The nine pillars are the operating system that turns SOFI-scale problems
              into programmes with proof.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {[
              {
                id: "feed" as const,
                icon: Leaf,
                accent: "#d97706",
                soft: "#fffbeb",
                dark: "#b45309",
                title: "Feed",
                problem:
                  "Hunger on the plate and in the ground — ~309M people undernourished in Africa; healthy diets unaffordable for billions worldwide.",
                response:
                  "Agri regenerates soil and offtake. Foods fortifies affordable staples and institutional packs (including NSNP pathways). Direct moves product to where people already are.",
                pillars: [
                  { href: "/agri", name: "Agri" },
                  { href: "/foods", name: "Foods" },
                  { href: "/direct", name: "Direct" },
                ],
              },
              {
                id: "educate" as const,
                icon: BookOpen,
                accent: "#eab308",
                soft: "#fefce8",
                dark: "#a16207",
                title: "Educate",
                problem:
                  "Food-system failures are also leadership failures — tools without ethical judgment multiply harm under climate, conflict and capital pressure.",
                response:
                  "Super-Cube® whole-person leadership for executives, public servants and youth so ministries, enterprises and programmes can hold multi-stakeholder complexity.",
                pillars: [{ href: "/leadership", name: "Leadership · Super-Cube®" }],
              },
              {
                id: "empower" as const,
                icon: Sparkles,
                accent: "#059669",
                soft: "#ecfdf5",
                dark: "#065f46",
                title: "Empower",
                problem:
                  "Without trust rails, capital pathways and programme discipline, nutrition never becomes a plated, auditable outcome.",
                response:
                  "Connect verifies trade; Access opens institutional capital; Impact runs the PMO; Foundation funds with proof; Global extends corridors and partnerships.",
                pillars: [
                  { href: "/connect", name: "Connect" },
                  { href: "/access", name: "Access" },
                  { href: "/impact", name: "Impact" },
                  { href: "/foundation", name: "Foundation" },
                ],
              },
            ].map((m) => (
              <div
                key={m.id}
                className="rounded-2xl sm:rounded-3xl border border-black/10 overflow-hidden flex flex-col min-w-0 shadow-sm"
                style={{ boxShadow: `0 0 0 1px ${m.accent}18` }}
              >
                <div
                  className="px-5 sm:px-6 py-5 border-b border-black/5"
                  style={{
                    background: `linear-gradient(135deg, ${m.soft} 0%, #ffffff 75%)`,
                    borderLeft: `4px solid ${m.accent}`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: m.accent }}
                    >
                      <m.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[2px] uppercase"
                        style={{ color: m.dark }}
                      >
                        Mission · {m.title}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tighter text-black">
                        {m.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
                    <strong className="text-black">SOFI challenge:</strong> {m.problem}
                  </p>
                  <p className="text-xs sm:text-sm text-[#404040] leading-relaxed mb-4 flex-1">
                    <strong className="text-black">Group response:</strong> {m.response}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.pillars.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="text-[10px] sm:text-[11px] font-semibold rounded-full border border-black/10 bg-[#fafafa] px-2.5 py-1 text-[#404040] hover:border-black/25 hover:bg-white transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact pillar response grid */}
          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-5 sm:p-7 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[#737373] mb-1">
                  Nine pillars · one system
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black">
                  How each pillar is geared to the problem
                </h3>
              </div>
              <Link
                href="/group"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline shrink-0"
              >
                The Group overview
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PILLAR_MISSIONS.flatMap((mission) =>
                mission.slugs.map((slug) => {
                  const a = getPillarAlignment(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className="group rounded-xl border border-black/8 bg-white p-4 hover:border-emerald-300/50 hover:shadow-sm transition-all min-w-0"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[9px] font-semibold tracking-[1.5px] uppercase"
                          style={{ color: mission.accentDark }}
                        >
                          {mission.mission}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d4d4d4] group-hover:text-black transition-colors shrink-0" />
                      </div>
                      <div className="text-sm font-semibold text-black capitalize mb-1.5">
                        {slug === "leadership" ? "Leadership" : slug}
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#525252] leading-relaxed line-clamp-3">
                        {a.sofiResponse}
                      </p>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: Network,
                t: "Integrated, not siloed",
                d: "Produce → fortify → move → fund → verify → lead — impact compounds across pillars.",
              },
              {
                icon: Shield,
                t: "Proof over theatre",
                d: "SupplierAdvisor®, Impact PMO, certifications and honest SOFI-aligned language — not overclaims.",
              },
              {
                icon: Globe2,
                t: "African for Africa",
                d: "HQ KwaZulu-Natal · continental ambition · corridors that serve dignity, not extraction.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-white p-5 min-w-0"
              >
                <x.icon className="w-5 h-5 text-emerald-700 mb-3" />
                <h4 className="text-sm font-semibold text-black mb-1.5">{x.t}</h4>
                <p className="text-xs text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the businesses serve the mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="WHY THE PILLARS EXIST"
          title="Business as a vehicle for mission"
          subtitle="Every company in the group exists to move the mission forward — commercially sustainable, ethically grounded, and continent-facing — against the SOFI-scale challenges above."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              href: "/foods",
              title: "Big Five Foods",
              role: "Feed",
              desc: "Fortified, accessible nutrition at scale.",
            },
            {
              href: "/agri",
              title: "Big Five Agri",
              role: "Feed",
              desc: "Regenerative farming and producer sovereignty.",
            },
            {
              href: "/leadership",
              title: "Leadership · Super-Cube®",
              role: "Educate",
              desc: "Holistic leadership development for Africa.",
            },
            {
              href: "/connect",
              title: "Connect · SupplierAdvisor®",
              role: "Empower",
              desc: "Verified ethical commerce and real-time trade.",
            },
            {
              href: "/impact",
              title: "Big Five Impact",
              role: "Deliver",
              desc: "Cross-pillar PMO — supports the Director General of Health with initiatives to accelerate and promote health and wellness in South Africa, Africa and beyond.",
            },
            {
              href: "/foundation",
              title: "Foundation",
              role: "Serve",
              desc: "Transparent philanthropy and community impact.",
            },
          ].map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-center justify-between gap-4 bg-white border border-black/10 rounded-3xl p-6 hover:border-black/25 transition-all"
            >
              <div>
                <div className="text-[10px] tracking-[2px] uppercase text-emerald-700 font-semibold mb-1">
                  {p.role}
                </div>
                <div className="font-semibold text-lg text-black group-hover:underline underline-offset-4">
                  {p.title}
                </div>
                <p className="text-sm text-[#525252] mt-1">{p.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#a3a3a3] group-hover:text-black shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-5 min-w-0">
              <div className="relative mx-auto lg:mx-0 w-full max-w-[11.5rem] sm:max-w-[13rem] md:max-w-[14.5rem] mb-8">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/40 via-transparent to-emerald-500/20 blur-sm" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/5">
                  <Image
                    src="/craig-muller.png"
                    alt="Dr. Craig R. Muller, Founder & CEO of Big Five Group"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 184px, 232px"
                    priority
                  />
                </div>
              </div>
              <div className="text-xs tracking-[3px] text-amber-400 mb-4">FOUNDER & CEO</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-3">
                Dr. Craig R. Muller
              </h2>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Visionary architect of kingdom-centred leadership and sustainable impact in Africa.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://za.linkedin.com/in/craigmuller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-4 py-2 hover:bg-white/10"
                >
                  LinkedIn
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.researchgate.net/profile/Craig-Muller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-4 py-2 hover:bg-white/10"
                >
                  ResearchGate
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SUPER_CUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-4 py-2 hover:bg-white/10"
                >
                  Super-Cube®
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-white/75 leading-relaxed text-base sm:text-lg min-w-0">
              <p>
                Dr. Craig Muller is a driven innovator — a{" "}
                <strong className="text-white">DBA-credentialed executive</strong> with over 20 years
                of blue-chip experience in FMCG, supply chain optimisation, and global consulting.
              </p>
              <p>
                His life goal is clear: to{" "}
                <strong className="text-white">feed</strong> (Big Five Foods™),{" "}
                <strong className="text-white">educate</strong> (Super-Cube® leadership development),
                and <strong className="text-white">empower</strong> (SupplierAdvisor®) people across
                the African continent — so humanity progresses from African soil outward.
              </p>
              <p>
                As creator of the Super-Cube® leadership model and founder of the Big Five ecosystem,
                he integrates commercial excellence with doctoral research and a deep commitment to
                ethical, kingdom-centred impact.
              </p>

              <div className="pt-4 grid sm:grid-cols-2 gap-3">
                {[
                  "Doctor of Business Administration (DBA) — UKZN, 2021",
                  "Creator of the Super-Cube® leadership model",
                  "Master of Business Administration (MBA) — 2006",
                  "Postgraduate Diploma in Management — 2004",
                  "Bachelor of Commerce (B.Comm) — 2002",
                  "20+ years FMCG, supply chain & consulting",
                ].map((e) => (
                  <div
                    key={e}
                    className="text-sm text-white/80 border border-white/10 rounded-2xl px-4 py-3 bg-white/[0.03]"
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose engines */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="THREE INTEGRATED SOLUTIONS"
          title="How Craig’s purpose became the group"
          subtitle="Three platforms — feed, educate, empower — sit at the heart of the Big Five story."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <div className="text-xs tracking-[2px] text-emerald-700 font-semibold mb-3">FEED</div>
            <h3 className="text-2xl font-semibold text-black mb-3">Big Five Foods™</h3>
            <p className="text-[#525252] leading-relaxed">
              Innovative, accessible, nutritious FMCG solutions that strengthen food security
              continent-wide — backed by certified manufacturing and ethical supply chains.
            </p>
            <Link
              href="/foods"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-black"
            >
              Explore Foods <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <div className="text-xs tracking-[2px] text-amber-700 font-semibold mb-3">EDUCATE</div>
            <h3 className="text-2xl font-semibold text-black mb-3">Super-Cube®</h3>
            <p className="text-[#525252] leading-relaxed">
              A pioneering holistic leadership model — Choices, Principles, Mental, Emotional,
              Physical, and Spiritual intelligence — for ethical, high-impact leaders.
            </p>
            <a
              href={SUPER_CUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-black"
            >
              super-cube.me <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <div className="text-xs tracking-[2px] text-sky-700 font-semibold mb-3">EMPOWER</div>
            <h3 className="text-2xl font-semibold text-black mb-3">SupplierAdvisor®</h3>
            <p className="text-[#525252] leading-relaxed">
              Strategic programmes and a verified commerce network that equip suppliers,
              entrepreneurs, and communities for sustainable growth and self-reliance.
            </p>
            <a
              href={SUPPLIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-black"
            >
              supplieradvisor.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="JOIN THE MISSION"
        title="Build Africa’s prosperity with us"
        subtitle="Whether you are a government, investor, enterprise, or partner — there is a place for you in the Big Five ecosystem."
        primary={{ href: "/connect", label: "Partner with Big Five" }}
        secondary={{
          href: SUPPLIER_URL,
          label: "Start free trial",
          external: true,
        }}
      />
    </div>
  );
}
