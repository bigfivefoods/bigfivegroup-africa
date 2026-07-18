"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Share2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

const TOTAL = 13;

type SlideProps = { index: number };

function SlideShell({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-y-auto overflow-x-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-8 md:p-10 lg:p-12 ${
        dark
          ? "bg-[#0a0a0a] border-white/10 text-white"
          : "bg-white border-black/10 text-black"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] font-semibold mb-3 sm:mb-4 ${
        light ? "text-violet-300" : "text-violet-700"
      }`}
    >
      {children}
    </div>
  );
}

function Ref({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  );
}

function Slide({ index }: SlideProps) {
  switch (index) {
    case 0:
      return (
        <SlideShell dark className="flex flex-col justify-between min-h-[min(70dvh,36rem)]">
          <div>
            <Eyebrow light>BIG FIVE GROUP · STRATEGIC OVERVIEW</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] max-w-3xl text-balance">
              One Group.
              <br />
              Ten Pillars.
              <br />
              Infinite African Impact.
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 gap-6 max-w-3xl">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              A strategic briefing for governments, DFIs, corporates, and partners who need a
              professional African delivery system — not another brochure.
            </p>
            <div className="text-xs sm:text-sm text-white/50 space-y-1">
              <p>KwaZulu-Natal · South Africa</p>
              <p>bigfivegroup.africa</p>
              <p>Confidential · For partnership discussions</p>
            </div>
          </div>
        </SlideShell>
      );

    case 1:
      return (
        <SlideShell>
          <Eyebrow>AGENDA</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            What this briefing covers
          </h2>
          <ol className="space-y-3 sm:space-y-4 max-w-2xl">
            {[
              "Who Big Five Group is — and how the ten pillars work as one system",
              "Vision, mission and values that govern every business",
              "Credible challenges across African food systems, markets and institutions",
              "How Big Five addresses those challenges — Feed · Educate · Empower",
              "Why partners choose to work with us — and how to engage",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 sm:gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-800 text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base text-[#404040] leading-relaxed pt-1">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </SlideShell>
      );

    case 2:
      return (
        <SlideShell>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            An integrated African enterprise — not a loose brand collection
          </h2>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed max-w-3xl mb-6 sm:mb-8">
            Headquartered in KwaZulu-Natal, Big Five Group unites regenerative production, fortified
            nutrition, distribution, capital access, ethical commerce, leadership education,
            philanthropy, programme delivery, global corridors and royal partnership — so impact
            compounds instead of competing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {companies.map((c) => (
              <div
                key={c.slug}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3 flex flex-col items-center text-center min-w-0"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${c.color}18`, color: c.color }}
                >
                  <CompanyIcon name={c.icon} size={18} />
                </div>
                <div className="text-xs font-semibold text-black truncate w-full">{c.name}</div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 3:
      return (
        <SlideShell>
          <Eyebrow>NORTH STAR</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            Vision · Mission · Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                t: "Vision",
                d: "A prosperous Africa — for everyone on it. Food with dignity, ethical leadership, and economies communities own.",
              },
              {
                t: "Mission",
                d: "Feed. Educate. Empower. Deploy skills, capital, platforms and relationships where they create lasting opportunity.",
              },
              {
                t: "Values",
                d: "Humanity · Innovation · Integrity · Excellence · Impact — how we hire, partner, trade and deliver.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0"
              >
                <div className="text-xs tracking-[2px] text-violet-700 font-semibold mb-2">
                  {x.t.toUpperCase()}
                </div>
                <p className="text-sm sm:text-base text-[#404040] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 4:
      return (
        <SlideShell dark>
          <Eyebrow light>THE CHALLENGE · FOOD SYSTEMS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Hunger is rising in Africa — even as the global picture improves
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-violet-200 mb-2">
                307M
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                People in Africa faced hunger in 2024 — more than one in five people on the continent
                (prevalence above 20%).
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-violet-200 mb-2">
                ~60%
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Of the 512 million people projected to face chronic undernourishment by 2030 if
                trends continue could be in Africa.
              </p>
            </div>
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://www.who.int/news/item/28-07-2025-global-hunger-declines-but-rises-in-africa-and-western-asia-un-report">
              WHO / FAO / IFAD / UNICEF / WFP — SOFI 2025 press release
            </Ref>
            ;{" "}
            <Ref href="https://data.unicef.org/resources/sofi-2025/">
              UNICEF SOFI 2025 data brief
            </Ref>
            . Globally ~673 million people experienced hunger in 2024.
          </p>
        </SlideShell>
      );

    case 5:
      return (
        <SlideShell>
          <Eyebrow>THE CHALLENGE · ACCESS & AFFORDABILITY</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Food is not only scarce — healthy diets remain out of reach
          </h2>
          <ul className="space-y-4 mb-6 max-w-3xl">
            <li className="flex gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-violet-600 mt-2" />
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed">
                About <strong className="text-black">2.3 billion people</strong> experienced moderate
                or severe food insecurity in 2024 — hundreds of millions more than pre-pandemic
                levels.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-violet-600 mt-2" />
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed">
                <strong className="text-black">2.6 billion people</strong> could not afford a healthy
                diet in 2024; affordability worsened in Africa and many low- and lower-middle-income
                countries.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-violet-600 mt-2" />
              <p className="text-sm sm:text-base text-[#404040] leading-relaxed">
                Acute food crises remain widespread: the{" "}
                <strong className="text-black">Global Report on Food Crises 2026</strong> confirms
                that in 2025 acute food insecurity stayed high across crisis-affected countries.
              </p>
            </li>
          </ul>
          <p className="text-xs text-[#737373] leading-relaxed max-w-3xl">
            Sources:{" "}
            <Ref href="https://data.unicef.org/resources/sofi-2025/">SOFI 2025 (UNICEF summary)</Ref>
            ;{" "}
            <Ref href="https://www.wfp.org/publications/global-report-food-crises-grfc">
              Global Report on Food Crises 2026 (FAO, WFP & GNAFC)
            </Ref>
            .
          </p>
        </SlideShell>
      );

    case 6:
      return (
        <SlideShell>
          <Eyebrow>THE CHALLENGE · MARKETS & TRUST</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            Value leaks before food and capital reach communities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            {[
              {
                t: "Fragmented last mile",
                d: "Producers and manufacturers struggle to reach institutions and households without costly intermediaries — spoilage, opacity and leakage rise.",
              },
              {
                t: "Trust deficit in supply chains",
                d: "Buyers, governments and DFIs need verification, quality evidence and audit trails — not claims on a slide.",
              },
              {
                t: "Leadership & delivery capacity",
                d: "Programmes fail when design, field execution and ethical decision-making are siloed across vendors.",
              },
              {
                t: "Capital without pathways",
                d: "CSI, tenders and development finance exist — but SMEs and implementers lack professional routes to qualify and deliver.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 min-w-0"
              >
                <h3 className="font-semibold text-black mb-2">{x.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#737373] leading-relaxed">
            These operational challenges are well documented across development and agribusiness
            literature; Big Five focuses on integrated delivery rather than single-point interventions.
          </p>
        </SlideShell>
      );

    case 7:
      return (
        <SlideShell dark>
          <Eyebrow light>OUR RESPONSE</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            Feed. Educate. Empower.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                t: "Feed",
                color: "#6ee7b7",
                d: "Agri + Foods: regenerative production and fortified nutrition that is affordable, shelf-stable and designed for real households, schools and institutions.",
                proof: "150k meals · 100k children · 83% cheaper · 74% more nutrition",
              },
              {
                t: "Educate",
                color: "#fcd34d",
                d: "Leadership: Super-Cube® development so decisions in business and public life are ethical, whole-person and Africa-centred.",
                proof: "Capability for nations & enterprises",
              },
              {
                t: "Empower",
                color: "#7dd3fc",
                d: "Direct, Access, Connect, Global: distribution, capital pathways, SupplierAdvisor® commerce and international route-to-market.",
                proof: "Verified trade · last-mile containers · institutional access",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 min-w-0"
              >
                <div className="text-2xl font-semibold tracking-tight mb-3" style={{ color: x.color }}>
                  {x.t}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{x.d}</p>
                <p className="text-xs font-medium text-white/50">{x.proof}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-3xl">
            Foundation, Impact and Royal cut across all three — funding, programme delivery and
            community partnership with the royal family.
          </p>
        </SlideShell>
      );

    case 8:
      return (
        <SlideShell>
          <Eyebrow>HOW WE ADDRESS THE CHALLENGES</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            Challenge → Big Five response
          </h2>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs tracking-[1px] text-[#737373]">
                  <th className="py-3 pr-4 font-semibold">Challenge</th>
                  <th className="py-3 pr-4 font-semibold">Our response</th>
                  <th className="py-3 font-semibold">Pillars</th>
                </tr>
              </thead>
              <tbody className="text-[#404040]">
                {[
                  {
                    c: "Hunger & undernutrition",
                    r: "Fortified staples + regenerative supply + last-mile containers",
                    p: "Foods · Agri · Direct",
                  },
                  {
                    c: "Unaffordable diets",
                    r: "83% cheaper pathways with 74% more nutrition design",
                    p: "Foods · Direct",
                  },
                  {
                    c: "Opaque supply chains",
                    r: "SupplierAdvisor® verification, lots, OTIFEF-ready commerce",
                    p: "Connect · Foods",
                  },
                  {
                    c: "Weak programme delivery",
                    r: "Cross-pillar PMO with gates, KPIs and field assurance",
                    p: "Impact · Foundation",
                  },
                  {
                    c: "Leadership gaps",
                    r: "Super-Cube® ethical leadership development",
                    p: "Leadership",
                  },
                  {
                    c: "Capital & markets",
                    r: "Institutional access + international route-to-market",
                    p: "Access · Global",
                  },
                ].map((row) => (
                  <tr key={row.c} className="border-b border-black/5">
                    <td className="py-3 pr-4 font-medium text-black align-top">{row.c}</td>
                    <td className="py-3 pr-4 align-top">{row.r}</td>
                    <td className="py-3 text-xs text-violet-800 font-medium align-top">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SlideShell>
      );

    case 9:
      return (
        <SlideShell>
          <Eyebrow>BIG FIVE IMPACT</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-4 sm:mb-6 text-balance">
            The delivery spine of the group
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-6">
            Big Five Impact is the programme management office that turns multi-pillar ambition into
            sequenced field delivery — one accountable partner for governments, DFIs and corporates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { n: "01", t: "Scope & design", d: "Theory of change, budget, risk, SDG alignment." },
              {
                n: "02",
                t: "Orchestrate & execute",
                d: "Agri, food, hubs, capital, leadership under one plan.",
              },
              {
                n: "03",
                t: "Measure & assure",
                d: "KPIs, field verification, SupplierAdvisor® rails where commerce applies.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
                <div className="text-2xl font-light text-violet-300 mb-2">{s.n}</div>
                <div className="font-semibold text-black mb-1">{s.t}</div>
                <p className="text-sm text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 10:
      return (
        <SlideShell dark>
          <Eyebrow light>PROOF POINTS</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6 sm:mb-8">
            What we can put on the table today
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { v: "150k", l: "Meals delivered" },
              { v: "100k", l: "Children reached" },
              { v: "83%", l: "Cheaper pathways" },
              { v: "74%", l: "More nutrition" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-violet-200">
                  {s.v}
                </div>
                <div className="text-xs text-white/55 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <ul className="space-y-2 text-sm text-white/70 max-w-2xl">
            <li>· Ten pillars integrated under one group governance</li>
            <li>· Big Five Foods verified on SupplierAdvisor® with live container embed</li>
            <li>· Foundation registered on SupplierAdvisor®</li>
            <li>· Priority distribution markets across Africa + DE · HU corridors</li>
            <li>· SABC News coverage of KZN food insecurity response</li>
          </ul>
        </SlideShell>
      );

    case 11:
      return (
        <SlideShell>
          <Eyebrow>WHY WORK WITH US</Eyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter mb-6">
            Reasons partners choose Big Five
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                t: "One system, not seven vendors",
                d: "Food, logistics, capital, leadership and PMO in one accountable relationship.",
              },
              {
                t: "African HQ, global standards",
                d: "Rooted in KwaZulu-Natal with ISO/FSSC-grade manufacturing and verified trade rails.",
              },
              {
                t: "Evidence over theatre",
                d: "Published impact metrics, live container transparency, certifications the market can audit.",
              },
              {
                t: "Institutional fluency",
                d: "We work with ministries, DFIs, CSI, traditional leadership and operators — without losing field reality.",
              },
              {
                t: "Royal partnership & community service",
                d: "Service mandate to feed, educate and empower — with respect for heritage and local authority.",
              },
              {
                t: "Scalable unit economics",
                d: "Containers, hubs and programmes designed to replicate — not one-off projects that die with the grant cycle.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 flex gap-3 min-w-0"
              >
                <Check className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-black mb-1">{x.t}</div>
                  <p className="text-sm text-[#525252] leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideShell>
      );

    case 12:
      return (
        <SlideShell dark className="flex flex-col justify-between min-h-[min(70dvh,36rem)]">
          <div>
            <Eyebrow light>NEXT STEP</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] mb-4 sm:mb-6 text-balance">
              Let&apos;s put a professional delivery system on your African ambition
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
              Whether you need fortified nutrition at scale, last-mile distribution, multi-pillar
              programmes, or verified ethical commerce — start a conversation with Big Five Impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/connect"
                className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/group"
                className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
              >
                Explore the Group
              </Link>
              <a
                href="mailto:craig@bigfivegroup.africa"
                className="premium-button inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10"
              >
                craig@bigfivegroup.africa
              </a>
            </div>
          </div>
          <div className="mt-10 text-xs text-white/40 space-y-1">
            <p>Big Five Group (Pty) Ltd · KwaZulu-Natal · bigfivegroup.africa</p>
            <p>Sources cited on challenge slides: SOFI 2025 (FAO/IFAD/UNICEF/WFP/WHO); GRFC 2026.</p>
          </div>
        </SlideShell>
      );

    default:
      return null;
  }
}

export default function StrategyDeck() {
  const [index, setIndex] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [fullscreen, setFullscreen] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(TOTAL - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, fullscreen]);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/impact#strategy-deck`
      : "https://bigfivegroup.africa/impact#strategy-deck";

  const onShare = async () => {
    const payload = {
      title: "Big Five Group — Strategic Overview",
      text: "Strategic briefing: African challenges, how Big Five responds, and why partners work with us.",
      url: shareUrl,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(payload);
        setShareState("shared");
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      } catch {
        /* ignore */
      }
    }
    window.setTimeout(() => setShareState("idle"), 2500);
  };

  const deck = (
    <div
      className={`flex flex-col min-w-0 ${
        fullscreen
          ? "fixed inset-0 z-[100] bg-[#111] p-3 sm:p-6"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-[#f3f4f6] p-2 sm:p-3 shadow-[0_25px_50px_-12px_rgb(0_0_0_/0.12)]"
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 mb-2">
        <div className="text-xs sm:text-sm font-medium text-[#404040]">
          Strategic overview{" "}
          <span className="text-[#737373] font-normal">
            · {index + 1} / {TOTAL}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5"
          >
            {shareState === "copied" ? (
              <>
                <Copy className="w-3.5 h-3.5" /> Link copied
              </>
            ) : shareState === "shared" ? (
              <>
                <Check className="w-3.5 h-3.5" /> Shared
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className={`relative flex-1 min-h-0 ${
          fullscreen ? "min-h-0" : "min-h-[min(72dvh,40rem)] sm:min-h-[min(75dvh,44rem)]"
        }`}
        style={fullscreen ? { height: "calc(100dvh - 7.5rem)" } : undefined}
      >
        <Slide index={index} />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 px-1 sm:px-2 pt-3 pb-1">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black disabled:opacity-30 hover:bg-black/5"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="flex flex-wrap justify-center gap-1 max-w-[50%] sm:max-w-none">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-violet-700" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === TOTAL - 1}
          className="inline-flex items-center gap-1 rounded-full bg-black text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30 hover:bg-[#111]"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id="strategy-deck" className="scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <div className="text-xs tracking-[3px] text-violet-700 mb-3 font-medium">
          STRATEGIC BRIEFING · ONLINE DECK
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4 text-balance">
          Big Five Group — strategic overview
        </h2>
        <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-5">
          A responsive 13-slide pitch for partners: who we are, Africa&apos;s challenges with
          credible references, how we respond, and why to work with us. Share the link anytime.
        </p>
        <button
          type="button"
          onClick={onShare}
          className="premium-button inline-flex items-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-violet-800"
        >
          <Share2 className="w-4 h-4" />
          {shareState === "copied"
            ? "Link copied"
            : shareState === "shared"
              ? "Shared"
              : "Share this deck"}
        </button>
      </div>
      {deck}
      <p className="mt-4 text-center text-xs text-[#737373]">
        Keyboard: ← → · Share link:{" "}
        <span className="font-medium text-black">/impact#strategy-deck</span>
      </p>
    </div>
  );
}
