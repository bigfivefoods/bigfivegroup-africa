"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function LeadershipPage() {
  const dimensions = [
    {
      name: "Choices",
      icon: "/choices-icon.png",
      color: "#ef4444", // Red
      quote: "“The history of free man is never written by chance, but by choice, their choice.” — Dwight D. Eisenhower",
      overview: "The Choices construct focuses on moral values, decision-making intelligence, judgement, and risk-taking. Grounded in choice theory, it equips leaders to evaluate options consistently and choose actions that serve humanity. In Africa, where corruption, poverty, and rapid change create constant high-stakes decisions, Super-Cube® develops ethical judgement and calculated risk-taking — critical because poor choices destroy trust and sustainable business networks.",
      courseOverview: "This programme develops moral decision-making intelligence. Learners master identifying the components of moral problems, understanding corruption drivers, and applying proven ethical frameworks (Utilitarian, Rights, Justice, Common Good, Virtue principles).",
      skills: [
        "Moral reasoning & judgement",
        "Corruption risk analysis",
        "Ethical code application",
        "Contextual decision-making",
        "Personal values alignment"
      ],
      improvement: "26.6%",
      impact: "Leaders now make dramatically more ethical and effective decisions in high-stakes African environments — slashing corruption risk and building unbreakable trust across supply chains and communities."
    },
    {
      name: "Principles",
      icon: "/principles-icon.png",
      color: "#a855f7", // Purple
      quote: "“You must be the change you wish to see in the world.” — Mahatma Gandhi",
      overview: "The Principles construct provides the foundation of ethics, governance, context, and standards. It draws from principle theory and is deeply rooted in Ubuntu (“I am because we are”) and Buber’s I-Thou philosophy of mutual respect. In Africa’s complex FMCG environment, where corruption and institutional weaknesses are prevalent, this construct ensures leaders act with integrity and accountability.",
      courseOverview: "Leaders learn that principles are natural, impersonal laws that govern consequences. The course focuses on aligning personal and organisational values with ethical governance and building strong codes of conduct.",
      skills: [
        "Corporate ethics implementation",
        "Value-principle alignment",
        "Ethical governance",
        "Strengthening organisational culture",
        "Code of conduct development"
      ],
      improvement: "45.1%",
      impact: "The largest gain across all constructs — leaders now operate from a rock-solid ethical foundation, creating resilient organisations that withstand corruption and build long-term trust in Africa’s complex markets."
    },
    {
      name: "Mental",
      icon: "/mental-icon.png",
      color: "#f97316", // Orange
      quote: "“Imagination is more important than knowledge. Memory is past. It's finite. Vision is future. It's infinite.” — Albert Einstein",
      overview: "The Mental construct develops cognitive intelligence, strategic thinking, problem-solving, vision, and continuous learning. Supported by cognition theory, it enables leaders to process complexity and innovate. Africa faces multidimensional issues — population growth, infrastructure gaps, climate shocks — and a severe skills shortage despite abundant talent.",
      courseOverview: "This module builds advanced cognitive intelligence through critical, lateral, inductive and deductive thinking, combined with personal study methodology and learning style optimisation.",
      skills: [
        "Strategic & critical thinking",
        "Problem-solving frameworks",
        "Knowledge synthesis",
        "Self-directed learning",
        "Analytical reasoning"
      ],
      improvement: "29.7%",
      impact: "Leaders now think strategically and solve complex problems with clarity — turning Africa’s abundance of talent into real competitive advantage and driving innovation in fast-growing markets."
    },
    {
      name: "Emotional",
      icon: "/emotional-icon.png",
      color: "#22c55e", // Green
      quote: "“One of the most difficult things to give away is kindness, for its often returned.” — Mark Ortman",
      overview: "The Emotional construct focuses on emotional intelligence, empathy, motivation, and social skills. Based on the four-branch ability model, it develops the ability to perceive, use, understand, and manage emotions. Leadership in Africa is highly relational; teams and communities thrive on trust and connection.",
      courseOverview: "Participants develop deep emotional intelligence across self-awareness, self-regulation, motivation, empathy and social skills for stronger relationships and leadership impact.",
      skills: [
        "Emotional self-management",
        "Empathy & social skills",
        "Motivation techniques",
        "Interpersonal competence"
      ],
      improvement: "39.5%",
      impact: "Teams and communities now experience deeper trust and connection — the relational glue that makes Ubuntu-style leadership and high-performing African organisations possible."
    },
    {
      name: "Physical",
      icon: "/physical-icon.png",
      color: "#3b82f6", // Blue
      quote: "“Take care of your body, its the only place you have to live.” — Jim Rohn",
      overview: "The Physical construct emphasises bodily well-being, energy management, fitness, nutrition, and resilience. It is grounded in the Wheel of Wellness theory. African leaders operate under extreme pressure from rapid growth and resource constraints. Super-Cube® develops the physical foundation needed to prevent burnout and sustain long-term impact.",
      courseOverview: "This programme explores wellness models and the discipline required to maintain peak physical and mental performance through practical stress management and balanced lifestyle design.",
      skills: [
        "Wellness practices",
        "Stress resilience",
        "Discipline & alignment",
        "Energy management"
      ],
      improvement: "27.7%",
      impact: "Leaders now sustain peak energy and resilience under intense African pressure — preventing burnout and delivering consistent, high-impact performance for years to come."
    },
    {
      name: "Spiritual",
      icon: "/spiritual-icon.png",
      color: "#1e40af", // Dark Blue
      quote: "“Example is not the main thing in influencing people, it is the only thing.” — Albert Schweitzer",
      overview: "The Spiritual construct integrates purpose, meaning, integrity, faith, and spiritual intelligence. It acts as the conduit connecting all other dimensions and aligns personal purpose with a greater “why”. Rooted in Ubuntu and I-Thou philosophy, it gives leaders authentic motivation and ethical depth.",
      courseOverview: "The Spiritual construct integrates purpose, meaning, integrity and higher consciousness, connecting all other dimensions and aligning daily actions with a greater “why”.",
      skills: [
        "Purpose discovery",
        "Integrity building",
        "Spiritual intelligence application",
        "Meaning-making"
      ],
      improvement: "24.7%",
      impact: "Leaders now operate with deep purpose and authenticity — the invisible force that turns individual effort into continent-wide transformation aligned with Ubuntu values."
    }
  ];

  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/leadership-hero.jpg')",
            backgroundPosition: "center 40%"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#000000_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-30" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-4xl px-6 text-center mt-[-80px]">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-px h-8 bg-[#fbbf24]" />
            <div className="uppercase tracking-[4px] text-xs text-[#fbbf24]">DR. CRAIG R. MULLER • UNIVERSITY OF KWAZULU-NATAL</div>
            <div className="w-px h-8 bg-[#fbbf24]" />
          </div>

          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-8">
            Leadership That<br />Builds Nations.
          </h1>

          <p className="max-w-2xl mx-auto text-2xl text-white/90 font-light tracking-tight mb-12">
            The Super-Cube® Doctoral Leadership Model — pioneered at the University of KwaZulu-Natal — 
            is redefining ethical, sovereign African leadership for the 21st century.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#model" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-[#fbbf24] text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#f59e0b]"
            >
              DISCOVER THE MODEL
            </Link>
            <Link 
              href="#programs" 
              className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
            >
              JOIN THE PROGRAM
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 text-white/50 text-xs tracking-[2px] flex flex-col items-center">
          SCROLL TO BEGIN YOUR JOURNEY
          <div className="w-px h-10 bg-white/20 mt-2" />
        </div>
      </section>

      {/* THE SUPER-CUBE® MODEL */}
      <section id="model" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="/super-cube-logo.png" 
              alt="Super-Cube®" 
              width={380} 
              height={85}
              className="h-auto"
            />
          </div>
          <h2 className="text-5xl font-semibold tracking-tighter text-black mb-6">The Super-Cube® Leadership Model</h2>
          <p className="max-w-3xl mx-auto text-xl text-[#525252]">
            A doctoral framework that fuses ancient African wisdom with modern leadership science — 
            designed to develop leaders who build nations, not just organisations.
          </p>
        </div>

        {/* 6 Dimensions with Dynamic Colors */}
        <div className="space-y-12">
          {dimensions.map((dim, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-black/10 rounded-3xl p-10 hover:border-black/20 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Icon + Title */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <Image 
                    src={dim.icon} 
                    alt={dim.name} 
                    width={100} 
                    height={100}
                    className="mx-auto md:mx-0 mb-4"
                  />
                  <h3 className="text-4xl font-semibold tracking-tight text-black">{dim.name}</h3>
                  
                  {/* Big Call-out Card for Improvement % */}
                  <div 
                    className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-2xl text-white text-xl font-bold shadow-lg"
                    style={{ backgroundColor: dim.color }}
                  >
                    +{dim.improvement} Improvement
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="italic text-[#525252] mb-6">“{dim.quote}”</p>
                  
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-2" style={{ color: dim.color }}>
                      CONSTRUCT OVERVIEW
                    </div>
                    <p className="text-[#404040] leading-relaxed">{dim.overview}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-2" style={{ color: dim.color }}>
                      COURSE OVERVIEW
                    </div>
                    <p className="text-[#404040] leading-relaxed">{dim.courseOverview}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-3" style={{ color: dim.color }}>
                      KEY SKILLS TO BE DEVELOPED
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-[#404040]">
                      {dim.skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: dim.color }}>•</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-black/10">
                    <div className="text-sm font-semibold mb-2" style={{ color: dim.color }}>
                      COURSE RESULTS
                    </div>
                    <p className="text-[#171717] font-medium mb-4">{dim.name} improved by {dim.improvement}</p>
                    <p className="text-[#404040] leading-relaxed mb-6">{dim.impact}</p>

                    <div className="text-sm font-semibold mb-2" style={{ color: dim.color }}>
                      WHY THIS IS POWERFUL IN THE AFRICAN CONTEXT
                    </div>
                    <p className="text-[#404040] leading-relaxed">{dim.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUPER-CUBE® PROGRAMME BENEFITS */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">WHY SUPER-CUBE® IS DIFFERENT</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black mb-6">Super-Cube® Programme Benefits</h3>
            <p className="max-w-3xl mx-auto text-xl text-[#525252]">
              Super-Cube® is not just another leadership course — it is the only doctoral, empirically validated model specifically designed for Africa. It delivers measurable, lifelong transformation that builds effective leadership at every level of society: from the individual to entire business networks and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "1. Coherent",
                desc: "The Super-Cube® model is a coherent and scientific approach to leadership and leadership development. Grounded in academic literature and rigorously evaluated in real African FMCG business networks, it provides the most reliable, evidence-based pathway to genuine leadership growth."
              },
              {
                title: "2. Longitudinal",
                desc: "Super-Cube® is a lifetime journey. The content progresses with the learner, building knowledge, skills and abilities stage by stage. What begins as foundational understanding evolves into mastery — creating leaders who continue to grow and impact for decades."
              },
              {
                title: "3. Multilevel",
                desc: "The model applies at every level — individual, team, organisation and society. Rooted in I-Thou philosophy and Ubuntu (“I am because we are”), it fosters mutual respect and holistic development across all layers of African business and community life."
              },
              {
                title: "4. Influential",
                desc: "Exercising Super-Cube® leadership creates a profound ripple effect. Leaders positively influence their entire circle of influence — families, teams, organisations and communities — driving ethical growth, job creation and sustainable development across the continent."
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#fafafa] border border-black/10 rounded-3xl p-9 hover:border-black/20 transition-all"
              >
                <h4 className="text-2xl font-semibold tracking-tight text-black mb-6">{benefit.title}</h4>
                <p className="text-lg text-[#404040] leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-xl text-[#171717] font-medium">
              This is not incremental training. This is systemic transformation — the leadership infrastructure Africa needs to feed its people, empower its youth and build unbreakable economies.
            </p>
          </div>
        </div>
      </section>

      {/* DOWNLOAD THE RESEARCH */}
      <section className="py-24 bg-white border-y border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">PEER-REVIEWED RESEARCH</div>
          <h3 className="text-5xl font-semibold tracking-tighter text-black mb-8">Download the Research</h3>
          
          <p className="text-xl text-[#525252] max-w-2xl mx-auto mb-12">
            The Super-Cube® model is backed by rigorous academic research published in leading journals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="/research/sajems-2022.pdf" 
              download
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#111]"
            >
              <Download className="w-5 h-5" />
              SAJEMS Journal Article (2022)
            </a>
            
            <a 
              href="/research/jcm-2022.pdf" 
              download
              className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#111]"
            >
              <Download className="w-5 h-5" />
              JCM Journal Article (2022)
            </a>
          </div>

          <a 
            href="https://www.researchgate.net/profile/Craig-Muller" 
            target="_blank"
            className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] text-lg font-medium"
          >
            View full profile & publications on ResearchGate 
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24 border-y border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[3px] text-[#fbbf24] mb-4">THE JOURNEY</div>
            <h3 className="text-5xl font-semibold tracking-tighter text-black">How Super-Cube® Works</h3>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Assess & Diagnose",
                desc: "Complete the proprietary Super-Cube® 360° assessment measuring all 6 dimensions. Receive a detailed personal leadership operating system report with clear development priorities."
              },
              {
                step: "02",
                title: "Develop & Embed",
                desc: "Immersive 6–12 month programs combining AI coaching, peer masterminds, real-world projects, and on-chain credentialing. Every participant leaves with a personalised leadership framework rooted in Ubuntu."
              },
              {
                step: "03",
                title: "Scale & Multiply",
                desc: "Graduates become certified Super-Cube® facilitators. They go on to transform organisations, governments, and communities — creating a multiplying effect across the continent."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#fafafa] flex items-center justify-center text-4xl font-light text-[#fbbf24] border border-black/10">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-4xl font-semibold tracking-tight text-black mb-4">{item.title}</h4>
                  <p className="text-xl text-[#404040] leading-relaxed max-w-3xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-6">THE FUTURE OF AFRICAN LEADERSHIP STARTS HERE</div>
          
          <h2 className="text-white text-5xl font-semibold tracking-tighter mb-8">
            Become the leader<br />Africa needs.
          </h2>

          <p className="text-white/80 text-xl mb-12 max-w-lg mx-auto">
            Join the next cohort of Super-Cube® certified leaders transforming the continent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/connect" 
              className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
            >
              APPLY FOR THE PROGRAM
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
