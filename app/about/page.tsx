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
} from "lucide-react";
import PageHero from "../components/PageHero";
import { SectionHeading, FinalCta } from "../components/PageSections";

const SUPER_CUBE_URL = "https://www.super-cube.com";
const SUPPLIER_URL = "https://www.supplieradvisor.com/";

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
          { href: "#founder", label: "Meet the founder" },
        ]}
        overlayClassName="bg-black/55"
      />

      {/* Who we are */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="WHO WE ARE"
          title="An African group with a human mission"
          subtitle="Headquartered in KwaZulu-Natal, South Africa, Big Five Group brings together regenerative agriculture, fortified nutrition, ethical commerce, project delivery, leadership education, and philanthropy — not as separate brands, but as one system designed to serve people."
        />
        <div className="grid sm:grid-cols-3 gap-5">
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
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-emerald-700 mb-4">
                <Compass className="w-4 h-4" />
                VISION
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black">
                A prosperous Africa — for everyone on it
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-lg text-[#404040] leading-relaxed">
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
        <div className="grid lg:grid-cols-12 gap-12 items-start">
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
                  SupplierAdvisor®, Access, Direct, and Impact equip suppliers, entrepreneurs, and
                  institutions with tools, markets, and delivery capacity for self-reliance.
                </span>
              </li>
            </ul>
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
                desc: "We learn, partner, and improve. Progress is a team sport — with traditional authorities, governments, enterprises, and communities.",
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

      {/* How the businesses serve the mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading
          eyebrow="WHY THE PILLARS EXIST"
          title="Business as a vehicle for mission"
          subtitle="Every company in the group exists to move the mission forward — commercially sustainable, ethically grounded, and continent-facing."
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
              desc: "Cross-pillar project management for real outcomes.",
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
              <div className="relative mx-auto lg:mx-0 w-full max-w-xs sm:max-w-sm mb-8">
                <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-amber-400/40 via-transparent to-emerald-500/20 blur-sm" />
                <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden border border-white/15 shadow-2xl bg-white/5">
                  <Image
                    src="/craig-muller.png"
                    alt="Dr. Craig R. Muller, Founder & CEO of Big Five Group"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 380px"
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
        <div className="grid md:grid-cols-3 gap-5">
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
              super-cube.com <ExternalLink className="w-4 h-4" />
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
          label: "SupplierAdvisor®",
          external: true,
        }}
      />
    </div>
  );
}
