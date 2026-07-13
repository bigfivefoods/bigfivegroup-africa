"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  User,
  Users,
  Building2,
  Globe,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { useState, useRef } from "react";
import PageHero from "../components/PageHero";
import SupplierTrust from "../components/SupplierTrust";
import { SectionHeading, FinalCta } from "../components/PageSections";

const SUPER_CUBE_URL = "https://www.super-cube.com";
const ACCENT = "#fbbf24";

const dimensions = [
  {
    name: "Choices",
    icon: "/choices-icon.png",
    color: "#ef4444",
    quote:
      "The history of free man is never written by chance, but by choice, their choice. — Dwight D. Eisenhower",
    overview:
      "The Choices construct focuses on moral values, decision-making intelligence, judgement, and risk-taking. Grounded in choice theory, it equips leaders to evaluate options consistently and choose actions that serve humanity. In Africa, where corruption, poverty, and rapid change create constant high-stakes decisions, Super-Cube® develops ethical judgement and calculated risk-taking.",
    courseOverview:
      "This programme develops moral decision-making intelligence. Learners master identifying the components of moral problems, understanding corruption drivers, and applying proven ethical frameworks (Utilitarian, Rights, Justice, Common Good, Virtue).",
    skills: [
      "Moral reasoning & judgement",
      "Corruption risk analysis",
      "Ethical code application",
      "Contextual decision-making",
      "Personal values alignment",
    ],
    improvement: "26.6%",
    impact:
      "Leaders make more ethical and effective decisions in high-stakes African environments — reducing corruption risk and building trust across supply chains and communities.",
  },
  {
    name: "Principles",
    icon: "/principles-icon.png",
    color: "#a855f7",
    quote: "You must be the change you wish to see in the world. — Mahatma Gandhi",
    overview:
      "The Principles construct provides the foundation of ethics, governance, context, and standards. Deeply rooted in Ubuntu (“I am because we are”) and Buber’s I-Thou philosophy, it ensures leaders act with integrity and accountability in complex markets.",
    courseOverview:
      "Leaders learn that principles are natural laws that govern consequences. The course focuses on aligning personal and organisational values with ethical governance and strong codes of conduct.",
    skills: [
      "Corporate ethics implementation",
      "Value-principle alignment",
      "Ethical governance",
      "Strengthening organisational culture",
      "Code of conduct development",
    ],
    improvement: "45.1%",
    impact:
      "The largest measured gain — leaders operate from a rock-solid ethical foundation, creating organisations that withstand corruption and build long-term trust.",
  },
  {
    name: "Mental",
    icon: "/mental-icon.png",
    color: "#f97316",
    quote:
      "Imagination is more important than knowledge. Memory is past. It's finite. Vision is future. It's infinite. — Albert Einstein",
    overview:
      "The Mental construct develops cognitive intelligence, strategic thinking, problem-solving, vision, and continuous learning. Africa faces multidimensional issues — growth, infrastructure, climate — and Super-Cube® turns talent into strategic capability.",
    courseOverview:
      "Advanced cognitive intelligence through critical, lateral, inductive and deductive thinking, combined with personal study methodology and learning-style optimisation.",
    skills: [
      "Strategic & critical thinking",
      "Problem-solving frameworks",
      "Knowledge synthesis",
      "Self-directed learning",
      "Analytical reasoning",
    ],
    improvement: "29.7%",
    impact:
      "Leaders solve complex problems with clarity — turning Africa’s talent into competitive advantage and innovation.",
  },
  {
    name: "Emotional",
    icon: "/emotional-icon.png",
    color: "#22c55e",
    quote:
      "One of the most difficult things to give away is kindness, for it is often returned. — Mark Ortman",
    overview:
      "The Emotional construct focuses on emotional intelligence, empathy, motivation, and social skills. Leadership in Africa is highly relational; teams and communities thrive on trust and connection.",
    courseOverview:
      "Deep emotional intelligence across self-awareness, self-regulation, motivation, empathy and social skills for stronger relationships and leadership impact.",
    skills: [
      "Emotional self-management",
      "Empathy & social skills",
      "Motivation techniques",
      "Interpersonal competence",
    ],
    improvement: "39.5%",
    impact:
      "Teams experience deeper trust and connection — the relational glue of Ubuntu-style, high-performing organisations.",
  },
  {
    name: "Physical",
    icon: "/physical-icon.png",
    color: "#3b82f6",
    quote: "Take care of your body, it is the only place you have to live. — Jim Rohn",
    overview:
      "The Physical construct emphasises well-being, energy management, fitness, nutrition, and resilience. African leaders operate under extreme pressure; Super-Cube® builds the foundation to prevent burnout.",
    courseOverview:
      "Wellness models and discipline for peak physical and mental performance through practical stress management and balanced lifestyle design.",
    skills: [
      "Wellness practices",
      "Stress resilience",
      "Discipline & alignment",
      "Energy management",
    ],
    improvement: "27.7%",
    impact:
      "Leaders sustain peak energy under pressure — consistent, high-impact performance over years, not months.",
  },
  {
    name: "Spiritual",
    icon: "/spiritual-icon.png",
    color: "#1e40af",
    quote:
      "Example is not the main thing in influencing people, it is the only thing. — Albert Schweitzer",
    overview:
      "The Spiritual construct integrates purpose, meaning, integrity, and spiritual intelligence. It connects all other dimensions and aligns personal purpose with a greater “why”, rooted in Ubuntu and I-Thou philosophy.",
    courseOverview:
      "Purpose, meaning, integrity and higher consciousness — connecting all dimensions and aligning daily action with a greater mission.",
    skills: [
      "Purpose discovery",
      "Integrity building",
      "Spiritual intelligence application",
      "Meaning-making",
    ],
    improvement: "24.7%",
    impact:
      "Leaders operate with deep purpose and authenticity — the force that turns individual effort into continent-wide transformation.",
  },
];

const assessmentQuestions: Record<string, string[]> = {
  Choices: [
    "I consistently make decisions that align with my core values even under pressure.",
    "I can quickly identify ethical dilemmas in complex business situations.",
    "I evaluate the long-term consequences of my choices on communities and stakeholders.",
    "I take calculated risks when they serve the greater good.",
    "I reflect on past decisions to improve future moral judgement.",
  ],
  Principles: [
    "I operate from a clear set of ethical principles in all business dealings.",
    "I hold myself and my team accountable to high standards of integrity.",
    "I align personal and organisational values in decision-making.",
    "I build strong codes of conduct that guide organisational culture.",
    "I practice Ubuntu by treating every stakeholder with dignity and respect.",
  ],
  Mental: [
    "I think strategically about long-term opportunities and risks for Africa.",
    "I solve complex problems using critical and creative thinking.",
    "I continuously learn and adapt to new knowledge and technologies.",
    "I synthesize information from multiple sources to make informed decisions.",
    "I maintain a clear vision for the future while managing day-to-day complexity.",
  ],
  Emotional: [
    "I am highly aware of my own emotions and how they affect others.",
    "I manage stress and emotions effectively in high-pressure situations.",
    "I show genuine empathy and build strong relationships with team members.",
    "I motivate others by understanding their needs and aspirations.",
    "I handle conflict with emotional intelligence and respect.",
  ],
  Physical: [
    "I maintain high energy levels through healthy habits and routines.",
    "I manage stress through physical wellness practices.",
    "I prioritise sleep, nutrition, and exercise to sustain performance.",
    "I recover quickly from setbacks and maintain resilience.",
    "I model healthy work-life balance for my team.",
  ],
  Spiritual: [
    "I have a clear sense of purpose that guides my leadership.",
    "I align my daily actions with a greater 'why' beyond profit.",
    "I practice integrity and authenticity in all interactions.",
    "I draw strength from faith, values, or higher consciousness.",
    "I inspire others through my sense of meaning and contribution to society.",
  ],
};

export default function LeadershipPage() {
  const [answers, setAnswers] = useState<Record<string, number[]>>({
    Choices: Array(5).fill(3),
    Principles: Array(5).fill(3),
    Mental: Array(5).fill(3),
    Emotional: Array(5).fill(3),
    Physical: Array(5).fill(3),
    Spiritual: Array(5).fill(3),
  });
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const chartRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (construct: string, qIndex: number, value: number) => {
    setAnswers((prev) => {
      const next = { ...prev };
      next[construct] = [...next[construct]];
      next[construct][qIndex] = value;
      return next;
    });
  };

  const getAdvice = (construct: string, score: number) => {
    if (score >= 4.5) {
      return `Excellent strength in ${construct}. Continue leading by example and explore advanced Super-Cube® programmes at super-cube.com.`;
    }
    if (score >= 3.5) {
      return `Strong foundation in ${construct}. Deepen application in high-stakes contexts via Super-Cube® advanced modules.`;
    }
    if (score >= 2.5) {
      return `Solid starting point. Foundational Super-Cube® training for ${construct} will accelerate consistency.`;
    }
    return `Priority growth area. Begin with Super-Cube® entry programmes for ${construct} at www.super-cube.com.`;
  };

  const drawRadarChart = (scoreMap: Record<string, number>) => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 180;
    const labels = Object.keys(scoreMap);
    const values = Object.values(scoreMap).map((v) => v / 5);
    const angleStep = (Math.PI * 2) / labels.length;

    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1;
    for (let r = 1; r <= 5; r++) {
      const radius = (r / 5) * maxRadius;
      ctx.beginPath();
      for (let i = 0; i < labels.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.strokeStyle = "#ccc";
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
      ctx.stroke();
    }

    ctx.strokeStyle = "#fbbf24";
    ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const radius = values[i] * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (maxRadius + 32);
      const y = centerY + Math.sin(angle) * (maxRadius + 32);
      const dim = dimensions.find((d) => d.name === labels[i]);
      ctx.fillStyle = dim?.color || "#171717";
      ctx.fillText(labels[i], x, y + 4);
    }
  };

  const calculateResults = () => {
    const newScores: Record<string, number> = {};
    dimensions.forEach((dim) => {
      const avg = answers[dim.name].reduce((a, b) => a + b, 0) / 5;
      newScores[dim.name] = parseFloat(avg.toFixed(1));
    });
    setScores(newScores);
    setShowResults(true);
    setTimeout(() => drawRadarChart(newScores), 100);
  };

  const downloadChart = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "super-cube-leadership-radar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <PageHero
        image="/leadership-hero.jpg"
        eyebrow="DR. CRAIG R. MULLER · UNIVERSITY OF KWAZULU-NATAL"
        title={
          <>
            Leadership that
            <br />
            builds nations
          </>
        }
        subtitle="The Super-Cube® Doctoral Leadership Model — Africa-centric, empirically validated, and home at www.super-cube.com — redefining ethical, sovereign leadership for the 21st century."
        ctas={[
          { href: "#model", label: "Discover the model", primary: true },
          {
            href: SUPER_CUBE_URL,
            label: "Visit super-cube.com",
            external: true,
          },
        ]}
        overlayClassName="bg-black/55"
      />

      {/* Super-Cube brand bar */}
      <div className="border-b border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/super-cube-logo.png"
              alt="Super-Cube®"
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <p className="text-sm text-[#525252]">
              Full programmes, cohorts, and resources live on{" "}
              <a
                href={SUPER_CUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black underline underline-offset-2"
              >
                www.super-cube.com
              </a>
            </p>
          </div>
          <a
            href={SUPER_CUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black shrink-0 hover:opacity-70"
          >
            Open Super-Cube®
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <SupplierTrust entityName="Big Five Leadership programme partners" compact />

      {/* MODEL INTRO */}
      <section id="model" className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-8">
            <Image
              src="/super-cube-logo.png"
              alt="Super-Cube®"
              width={320}
              height={72}
              className="h-auto"
            />
          </div>
          <SectionHeading
            eyebrow="DOCTORAL · EMPIRICALLY VALIDATED · AFRICA-CENTRIC"
            title="The Super-Cube® Leadership Model"
            subtitle="Developed by Dr. Craig Ross Muller (DBA, University of KwaZulu-Natal) — one of the first empirically validated leadership frameworks built for African realities, not imported wholesale from the West."
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-5 text-lg text-[#525252] leading-relaxed mb-16">
          <p>
            Tested in a leading African FMCG business network, Super-Cube® structures development
            around a cubic architecture. At the centre is the individual (“you”); six interconnected
            dimensions form the faces of the cube — so personal growth radiates to teams,
            organisations, supply chains, and the broader economy.
          </p>
          <p>
            Rooted in <strong className="text-black">Ubuntu</strong> (“I am because we are”) and
            Martin Buber’s <strong className="text-black">I-Thou</strong> philosophy, the model
            treats every interaction as an encounter between equals. Leadership capacity is{" "}
            <strong className="text-black">70–76% developable</strong> through deliberate practice —
            not fixed by genetics alone.
          </p>
          <p>
            Validated through mixed-methods research with confirmatory factor analysis, Super-Cube®
            addresses Africa’s challenges — skills gaps, corruption, institutional weakness, climate
            and growth pressure — while remaining world-class in rigour.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          {[
            {
              icon: User,
              title: "For individuals",
              desc: "Moral clarity, emotional resilience, strategic thinking, and purpose — the leader Africa needs.",
            },
            {
              icon: Users,
              title: "For teams",
              desc: "Trust, psychological safety, and shared purpose that unlock collaboration and innovation.",
            },
            {
              icon: Building2,
              title: "For governments",
              desc: "Ethical, visionary public leadership with transparency and delivery discipline.",
            },
            {
              icon: Globe,
              title: "For society",
              desc: "Ripple effects across communities — prosperity, unity, and self-reliance at scale.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-black/10 rounded-3xl p-8 hover:border-amber-300/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">{card.title}</h3>
              <p className="text-[#525252] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={SUPER_CUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-semibold"
          >
            Explore programmes on super-cube.com
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* SIX DIMENSIONS */}
      <section className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="SIX FACES OF THE CUBE"
            title="Dimensions that transform leaders"
            subtitle="Each construct is measurable, teachable, and proven in African enterprise networks — with published improvement ranges from the doctoral research."
          />
          <div className="space-y-6">
            {dimensions.map((dim, index) => (
              <motion.article
                key={dim.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.04, 0.2) }}
                className="bg-[#fafafa] border border-black/10 rounded-[1.75rem] p-8 sm:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-56 shrink-0 text-center lg:text-left">
                    <Image
                      src={dim.icon}
                      alt={dim.name}
                      width={88}
                      height={88}
                      className="mx-auto lg:mx-0 mb-4"
                    />
                    <h3 className="text-3xl font-semibold tracking-tight text-black">
                      {dim.name}
                    </h3>
                    <div
                      className="mt-4 inline-flex px-5 py-2.5 rounded-2xl text-white text-lg font-bold shadow-md"
                      style={{ backgroundColor: dim.color }}
                    >
                      +{dim.improvement}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="italic text-[#737373] mb-5 text-sm sm:text-base">
                      “{dim.quote}”
                    </p>
                    <div className="mb-5">
                      <div
                        className="text-xs tracking-[2px] font-semibold mb-2"
                        style={{ color: dim.color }}
                      >
                        OVERVIEW
                      </div>
                      <p className="text-[#404040] leading-relaxed">{dim.overview}</p>
                    </div>
                    <div className="mb-5">
                      <div
                        className="text-xs tracking-[2px] font-semibold mb-2"
                        style={{ color: dim.color }}
                      >
                        COURSE FOCUS
                      </div>
                      <p className="text-[#404040] leading-relaxed">{dim.courseOverview}</p>
                    </div>
                    <div className="mb-5">
                      <div
                        className="text-xs tracking-[2px] font-semibold mb-3"
                        style={{ color: dim.color }}
                      >
                        KEY SKILLS
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-2 text-[#404040] text-sm">
                        {dim.skills.map((skill) => (
                          <li key={skill} className="flex gap-2">
                            <span style={{ color: dim.color }}>•</span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-5 border-t border-black/10">
                      <div
                        className="text-xs tracking-[2px] font-semibold mb-2"
                        style={{ color: dim.color }}
                      >
                        IMPACT
                      </div>
                      <p className="text-[#171717] leading-relaxed">{dim.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#fefce8] via-[#fffbeb] to-[#fefce8] border-y border-amber-200/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-black px-5 py-2 rounded-full text-xs font-bold tracking-[2px] mb-8">
            <BookOpen className="w-4 h-4" />
            FREE DOCTORAL BLUEPRINT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-black mb-5">
            Get the Super-Cube® Leadership Model book
          </h2>
          <p className="text-xl text-[#525252] mb-8 max-w-2xl mx-auto">
            Igniting Africa&apos;s potential — a human-centric blueprint based on the groundbreaking
            doctorate research of Dr. Craig Ross Muller.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/the-super-cube-leadership-model.pdf"
              download="The-Super-Cube-Leadership-Model.pdf"
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-full text-lg font-semibold"
            >
              <Download className="w-5 h-5" />
              Download free PDF
            </a>
            <a
              href={SUPER_CUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-3 border border-black/20 text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-black/5"
            >
              Continue at super-cube.com
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-[#737373]">
            No email. No signup. Full ~70-page doctoral blueprint — free to use and share.
          </p>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="py-20 sm:py-24 bg-white border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading
            eyebrow="PEER-REVIEWED RESEARCH"
            title="Download the research"
            subtitle="Super-Cube® is backed by rigorous academic publication — not marketing claims."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/research/sajems-2022.pdf"
              download
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold"
            >
              <Download className="w-5 h-5" />
              SAJEMS Journal (2022)
            </a>
            <a
              href="/research/jcm-2022.pdf"
              download
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold"
            >
              <Download className="w-5 h-5" />
              JCM Journal (2022)
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
            <a
              href="https://www.researchgate.net/profile/Craig-Muller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800"
            >
              ResearchGate profile
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={SUPER_CUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800"
            >
              super-cube.com
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="WHY SUPER-CUBE® IS DIFFERENT"
          title="Programme benefits"
          subtitle="Not another generic leadership course — a doctoral, multilevel system designed for African enterprise and public leadership."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Coherent",
              desc: "Scientific, literature-grounded, and evaluated in real African FMCG networks — the most reliable evidence-based path to leadership growth.",
            },
            {
              title: "Longitudinal",
              desc: "A lifetime journey. Content progresses with the learner from foundations to mastery over decades, not a weekend certificate.",
            },
            {
              title: "Multilevel",
              desc: "Applies at individual, team, organisation and society — rooted in Ubuntu and I-Thou mutual respect.",
            },
            {
              title: "Influential",
              desc: "Creates ripple effects across families, teams, organisations and communities — ethical growth and sustainable development.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white border border-black/10 rounded-3xl p-8 hover:border-amber-300/50 transition-colors"
            >
              <GraduationCap className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="text-2xl font-semibold text-black mb-3">{b.title}</h3>
              <p className="text-[#525252] leading-relaxed text-lg">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ASSESSMENT */}
      <section id="assessment" className="bg-white border-y border-black/10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow="KNOW YOUR OPERATING SYSTEM"
            title="Take the Super-Cube® assessment"
            subtitle="Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree). Generate a personalised radar profile — then continue your journey on super-cube.com."
          />

          <div className="space-y-8">
            {dimensions.map((dim) => (
              <div key={dim.name} className="border border-black/10 rounded-3xl p-8 sm:p-10 bg-[#fafafa]">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${dim.color}18` }}
                  >
                    <Image src={dim.icon} alt={dim.name} width={40} height={40} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold" style={{ color: dim.color }}>
                      {dim.name}
                    </h4>
                    <p className="text-sm text-[#737373]">1 = Strongly disagree · 5 = Strongly agree</p>
                  </div>
                </div>
                <div className="space-y-7">
                  {assessmentQuestions[dim.name].map((q, qIndex) => (
                    <div key={q} className="flex flex-col gap-3">
                      <div className="text-[#171717]">{q}</div>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <label key={val} className="flex flex-col items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`${dim.name}-${qIndex}`}
                              value={val}
                              checked={answers[dim.name][qIndex] === val}
                              onChange={() => handleAnswer(dim.name, qIndex, val)}
                              className="w-5 h-5 accent-black"
                            />
                            <span className="text-xs mt-1 text-[#737373]">{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={calculateResults}
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-12 py-5 rounded-full text-lg font-semibold"
            >
              Calculate my Super-Cube® profile
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {showResults && (
            <div
              ref={resultsRef}
              className="mt-14 bg-[#fafafa] border border-black/10 rounded-[1.75rem] p-8 sm:p-12"
            >
              <h4 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-center mb-8">
                Your Super-Cube® leadership profile
              </h4>
              <div className="flex justify-center mb-10">
                <canvas ref={chartRef} width={500} height={500} className="max-w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {Object.entries(scores).map(([name, score]) => {
                  const dim = dimensions.find((d) => d.name === name);
                  return (
                    <div key={name} className="bg-white p-6 rounded-2xl border border-black/10">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-xl" style={{ color: dim?.color }}>
                          {name}
                        </div>
                        <div className="text-3xl font-bold tabular-nums" style={{ color: dim?.color }}>
                          {score}
                        </div>
                      </div>
                      <div className="text-xs text-[#737373] mb-3">Average out of 5</div>
                      <p className="text-sm text-[#404040] leading-relaxed">
                        <strong>Advice:</strong> {getAdvice(name, score)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  type="button"
                  onClick={downloadChart}
                  className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Download radar chart
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="premium-button inline-flex items-center justify-center gap-3 border border-black/20 text-black px-8 py-4 rounded-full font-semibold"
                >
                  Print full report
                </button>
              </div>
              <div className="text-center">
                <p className="text-[#525252] mb-6 max-w-xl mx-auto">
                  Ready to develop every dimension? Full programmes, coaching, and cohorts live on
                  Super-Cube®.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={SUPER_CUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button inline-flex items-center justify-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-full font-semibold"
                  >
                    Continue on super-cube.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:craig@bigfivegroup.africa?subject=Super-Cube%20Personalised%20Coaching"
                    className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 px-8 py-4 rounded-full font-semibold"
                  >
                    Book coaching
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SUPER-CUBE HUB CTA */}
      <section className="bg-[#0a0a0a] text-white py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter mb-5">
            Super-Cube® lives at www.super-cube.com
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Big Five Leadership is the group pillar. Super-Cube® is the dedicated platform for
            programmes, research, assessments, and the global Super-Cube community — launching next
            on its own domain.
          </p>
          <a
            href={SUPER_CUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-3 bg-amber-400 text-black px-10 py-4 rounded-full text-lg font-semibold"
          >
            Visit www.super-cube.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      <SupplierTrust entityName="Big Five Leadership and Super-Cube® partners" />

      <FinalCta
        eyebrow="THE FUTURE OF AFRICAN LEADERSHIP"
        title="Become the leader Africa needs"
        subtitle="Join Super-Cube® certified leaders transforming individuals, institutions, and nations."
        primary={{
          href: SUPER_CUBE_URL,
          label: "Go to super-cube.com",
          external: true,
        }}
        secondary={{ href: "/connect", label: "Partner via Big Five Connect" }}
      />
    </div>
  );
}
