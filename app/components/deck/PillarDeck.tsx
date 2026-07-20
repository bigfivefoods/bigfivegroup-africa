"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import DeckShell, {
  DECK_THEMES,
  DeckEyebrow,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  useDeckPrintMode,
  type DeckTheme,
} from "./DeckShell";
import { GroupVmvSlide } from "./GroupVmvContent";
import { SA_LOGIN, SA_ONBOARDING, SA_URL } from "../../lib/saCopy";

/** Optional Super-Cube® deep-dive (Leadership deck) */
export type SuperCubeModelConfig = {
  logoSrc: string;
  logoAlt: string;
  modelTitle: string;
  modelSubtitle: string;
  modelBody: string;
  highlights: { value: string; label: string }[];
  constructs: {
    name: string;
    icon: string;
    color: string;
    blurb: string;
    elements: string;
  }[];
  originsTitle: string;
  originsBody: string;
  foundations: { t: string; d: string }[];
  levelsTitle: string;
  levels: { n: string; t: string; d: string }[];
  validationTitle: string;
  validationPoints: string[];
  bookHref?: string;
  bookLabel?: string;
  siteHref?: string;
  siteLabel?: string;
  /** Optional measured intervention case study (adds +1 slide) */
  caseStudy?: {
    eyebrow: string;
    title: string;
    body: string;
    context?: string;
    lifts: {
      name: string;
      icon: string;
      color: string;
      lift: string;
      label: string;
    }[];
    continentalTitle?: string;
    continentalBody?: string;
    continentalImpacts?: { t: string; d: string }[];
    note?: string;
  };
};

export type PillarDeckConfig = {
  id: string;
  printRootId: string;
  themeKey: keyof typeof DECK_THEMES;
  eyebrow: string;
  title: string;
  description: string;
  sharePath: string;
  shareTitle: string;
  shareText: string;
  /** Optional full-bleed hero image behind title slide */
  heroImage?: string;
  /** Optional brand mark on title slide (e.g. SupplierAdvisor® for Connect) */
  titleLogoSrc?: string;
  titleLogoAlt?: string;
  heroTitle: string;
  heroHighlight: string;
  heroBody: string;
  meta: string[];
  agenda: string[];
  challengeTitle: string;
  challengeStats: { value: string; label: string }[];
  challengeBody: string;
  solutionTitle: string;
  solutionBody: string;
  solutionCards: { t: string; d: string; icon: LucideIcon }[];
  proofTitle: string;
  proofStats: { value: string; label: string }[];
  proofPoints: string[];
  howTitle: string;
  howSteps: { step: string; t: string; d: string }[];
  ecosystemTitle: string;
  ecosystemBody: string;
  ecosystemLinks: { label: string; href: string }[];
  stakeholdersTitle: string;
  stakeholders: { t: string; d: string; icon: LucideIcon }[];
  sdgTitle: string;
  sdgs: { n: string; t: string; d: string; color: string }[];
  whyTitle: string;
  whyPoints: { t: string; d: string }[];
  ctaTitle: string;
  ctaHighlight: string;
  ctaBody: string;
  ctaSteps: { n: string; t: string; d: string }[];
  ctaPrimary: { label: string; href: string; external?: boolean };
  ctaSecondary?: { label: string; href: string; external?: boolean };
  ctaEmail?: string;
  footerLine: string;
  /** Optional SAM / AI block for Connect */
  intelCards?: { t: string; d: string; icon: LucideIcon }[];
  intelTitle?: string;
  intelBody?: string;
  /** Optional Super-Cube® model deep-dive (Leadership) — adds 3 slides after solution */
  superCubeModel?: SuperCubeModelConfig;
};

/**
 * Base: title, agenda, Group VMV, challenge, solution, proof… CTA = 13.
 * Super-Cube model adds +3 after solution (+1 more if case study). Intel adds +1 after stakeholders.
 */
const TOTAL_BASE = 13;

function superCubeSlideCount(cfg: PillarDeckConfig) {
  if (!cfg.superCubeModel) return 0;
  return cfg.superCubeModel.caseStudy ? 4 : 3;
}

function slideCount(cfg: PillarDeckConfig) {
  let n = TOTAL_BASE;
  n += superCubeSlideCount(cfg);
  if (cfg.intelCards?.length) n += 1;
  return n;
}

/** Map linear index → logical case id (handles Super-Cube + intel inserts). */
function logicalSlide(index: number, cfg: PillarDeckConfig): number {
  const hasSC = Boolean(cfg.superCubeModel);
  const hasCase = Boolean(cfg.superCubeModel?.caseStudy);
  const hasIntel = Boolean(cfg.intelCards?.length);
  const keys: number[] = [0, 1, 2, 3, 4];
  if (hasSC) {
    keys.push(50, 51, 52);
    if (hasCase) keys.push(53);
  }
  keys.push(5, 6, 7, 8);
  if (hasIntel) keys.push(100);
  keys.push(9, 10, 11);
  return keys[index] ?? -1;
}

function Slide({
  index,
  cfg,
  theme,
}: {
  index: number;
  cfg: PillarDeckConfig;
  theme: DeckTheme;
}) {
  const forPrint = useDeckPrintMode();
  const s = logicalSlide(index, cfg);
  const sc = cfg.superCubeModel;

  switch (s) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {cfg.heroImage && (
              <>
                <Image
                  src={cfg.heroImage}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:1280px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              </>
            )}
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div className="flex flex-col h-full justify-between min-h-0">
                  <div>
                    {(sc || cfg.titleLogoSrc) && (
                      <div className={`mb-3 sm:mb-4 ${forPrint ? "mb-2" : ""}`}>
                        <Image
                          src={sc ? sc.logoSrc : (cfg.titleLogoSrc as string)}
                          alt={sc ? sc.logoAlt : (cfg.titleLogoAlt ?? "")}
                          width={280}
                          height={60}
                          className={`h-auto w-auto max-w-full object-contain object-left ${
                            forPrint ? "max-h-8" : "max-h-10 sm:max-h-12"
                          }`}
                          priority
                          unoptimized
                        />
                      </div>
                    )}
                    <DeckEyebrow light theme={theme}>
                      {cfg.eyebrow}
                    </DeckEyebrow>
                    <h2
                      className={`font-semibold tracking-tighter leading-[1.05] text-balance text-white ${
                        forPrint ? "text-xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-4"
                      }`}
                    >
                      {cfg.heroTitle}
                      <br />
                      <span style={{ color: theme.gradientFrom }}>{cfg.heroHighlight}</span>
                    </h2>
                    <p
                      className={`text-white/80 max-w-2xl ${
                        forPrint
                          ? "text-[11px] leading-snug"
                          : "text-sm sm:text-base leading-relaxed"
                      }`}
                    >
                      {cfg.heroBody}
                    </p>
                  </div>
                  <div
                    className={`flex flex-wrap gap-x-3 text-white/50 ${
                      forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                    }`}
                  >
                    {cfg.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AGENDA</DeckEyebrow>
          <DeckTitle>What this briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-3 max-w-2xl"}>
            {cfg.agenda.map((item, i) => (
              <li key={item} className="flex gap-2.5 items-start">
                <span
                  className={`shrink-0 rounded-full text-white font-semibold flex items-center justify-center ${
                    forPrint ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[#404040] ${
                    forPrint ? "text-xs leading-snug pt-0.5" : "text-sm sm:text-base pt-1.5"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </DeckSlideShell>
      );

    case 2:
      return <GroupVmvSlide theme={theme} />;

    case 3:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE CHALLENGE
          </DeckEyebrow>
          <DeckTitle>{cfg.challengeTitle}</DeckTitle>
          <div
            className={`grid grid-cols-2 ${forPrint ? "gap-2 mb-2" : "gap-3 sm:gap-4 mb-5"}`}
          >
            {cfg.challengeStats.map((st) => (
              <DeckStatTile key={st.label} dark theme={theme} value={st.value} label={st.label} />
            ))}
          </div>
          <p
            className={`text-white/70 max-w-3xl ${
              forPrint ? "text-[11px] leading-snug" : "text-sm leading-relaxed"
            }`}
          >
            {cfg.challengeBody}
          </p>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>OUR SOLUTION</DeckEyebrow>
          <DeckTitle>{cfg.solutionTitle}</DeckTitle>
          <p
            className={`text-[#525252] max-w-3xl ${
              forPrint ? "text-[11px] mb-2 leading-snug" : "text-sm mb-5 leading-relaxed"
            }`}
          >
            {cfg.solutionBody}
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${forPrint ? "gap-1.5" : "gap-3"}`}
          >
            {cfg.solutionCards.map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2.5 min-w-0 ${
                  forPrint ? "p-2.5" : "p-4 sm:p-5"
                }`}
              >
                <c.icon
                  className={`shrink-0 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.accent }}
                />
                <div>
                  <div
                    className={`font-semibold text-black ${forPrint ? "text-[11px] mb-0.5" : "mb-1"}`}
                  >
                    {c.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[10px]" : "text-sm"
                    }`}
                  >
                    {c.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    /* —— Super-Cube® model overview —— */
    case 50:
      if (!sc) return null;
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex flex-col h-full min-h-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
              <div className="min-w-0">
                <DeckEyebrow theme={theme}>SUPER-CUBE® LEADERSHIP MODEL</DeckEyebrow>
                <DeckTitle>{sc.modelTitle}</DeckTitle>
              </div>
              <Image
                src={sc.logoSrc}
                alt={sc.logoAlt}
                width={200}
                height={44}
                className={`shrink-0 h-auto object-contain self-start ${
                  forPrint ? "w-28" : "w-32 sm:w-44"
                }`}
              />
            </div>
            <p
              className={`text-[#525252] max-w-3xl ${
                forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"
              }`}
            >
              {sc.modelSubtitle}
            </p>
            <p
              className={`text-[#404040] max-w-3xl ${
                forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"
              }`}
            >
              {sc.modelBody}
            </p>
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 ${
                forPrint ? "gap-1.5 mb-2" : "gap-2 sm:gap-3 mb-4"
              }`}
            >
              {sc.highlights.map((h) => (
                <DeckStatTile key={h.label} theme={theme} value={h.value} label={h.label} />
              ))}
            </div>
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${
                forPrint ? "gap-1 mt-auto" : "gap-2 sm:gap-3 mt-auto"
              }`}
            >
              {sc.constructs.map((c) => (
                <div
                  key={c.name}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] text-center min-w-0 ${
                    forPrint ? "p-1.5" : "p-2 sm:p-3"
                  }`}
                >
                  <Image
                    src={c.icon}
                    alt={c.name}
                    width={forPrint ? 28 : 40}
                    height={forPrint ? 28 : 40}
                    className={`mx-auto object-contain ${forPrint ? "w-7 h-7" : "w-8 h-8 sm:w-10 sm:h-10"}`}
                  />
                  <div
                    className={`font-semibold text-black mt-1 ${
                      forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                    }`}
                  >
                    {c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    /* —— Six constructs deep-dive —— */
    case 51:
      if (!sc) return null;
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE SIX FACES OF THE CUBE</DeckEyebrow>
          <DeckTitle>You at the centre. Six constructs around you.</DeckTitle>
          <p
            className={`text-[#525252] max-w-3xl ${
              forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"
            }`}
          >
            Each face of the Super-Cube® develops a human-centric capacity. Leadership radiates
            outward from personal agency to organisations and networks — balanced, interdependent
            development for Africa&apos;s complex environments.
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-0 flex-1 content-start ${
              forPrint ? "gap-1.5" : "gap-2 sm:gap-3"
            }`}
          >
            {sc.constructs.map((c) => (
              <div
                key={c.name}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 min-w-0 ${
                  forPrint ? "p-2" : "p-3 sm:p-4"
                }`}
              >
                <div
                  className={`shrink-0 rounded-lg flex items-center justify-center ${
                    forPrint ? "w-8 h-8" : "w-10 h-10 sm:w-11 sm:h-11"
                  }`}
                  style={{ backgroundColor: `${c.color}18` }}
                >
                  <Image
                    src={c.icon}
                    alt={c.name}
                    width={forPrint ? 24 : 32}
                    height={forPrint ? 24 : 32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[11px] mb-0.5" : "text-sm mb-0.5"
                    }`}
                    style={{ color: c.color }}
                  >
                    {c.name}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[9px] line-clamp-2" : "text-xs sm:text-sm line-clamp-3"
                    }`}
                  >
                    {c.blurb}
                  </p>
                  <p
                    className={`text-[#737373] leading-snug mt-0.5 ${
                      forPrint ? "text-[8px] line-clamp-1" : "text-[10px] sm:text-xs line-clamp-2"
                    }`}
                  >
                    {c.elements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    /* —— Origins, foundations, levels, validation —— */
    case 52:
      if (!sc) return null;
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex flex-col h-full min-h-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div className="min-w-0">
                <DeckEyebrow theme={theme}>ORIGINS · THEORY · VALIDATION</DeckEyebrow>
                <DeckTitle>{sc.originsTitle}</DeckTitle>
              </div>
              <Image
                src={sc.logoSrc}
                alt={sc.logoAlt}
                width={160}
                height={36}
                className={`shrink-0 h-auto object-contain hidden sm:block ${
                  forPrint ? "w-24" : "w-28 sm:w-36"
                }`}
              />
            </div>
            <p
              className={`text-[#525252] max-w-3xl ${
                forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-3 leading-relaxed"
              }`}
            >
              {sc.originsBody}
            </p>
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 ${
                forPrint ? "gap-1.5 mb-2" : "gap-2 sm:gap-3 mb-3"
              }`}
            >
              {sc.foundations.map((f) => (
                <div
                  key={f.t}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                    forPrint ? "p-2" : "p-3"
                  }`}
                >
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[10px] mb-0.5" : "text-xs sm:text-sm mb-1"
                    }`}
                  >
                    {f.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[9px] line-clamp-3" : "text-[11px] sm:text-xs line-clamp-4"
                    }`}
                  >
                    {f.d}
                  </p>
                </div>
              ))}
            </div>
            <div className={`font-semibold text-[#737373] tracking-[1.5px] uppercase ${forPrint ? "text-[8px] mb-1" : "text-[10px] mb-1.5"}`}>
              {sc.levelsTitle}
            </div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-5 ${
                forPrint ? "gap-1 mb-2" : "gap-1.5 sm:gap-2 mb-3"
              }`}
            >
              {sc.levels.map((lv) => (
                <div
                  key={lv.n}
                  className={`rounded-lg border border-black/10 bg-white min-w-0 ${
                    forPrint ? "p-1.5" : "p-2 sm:p-2.5"
                  }`}
                >
                  <div
                    className={`font-semibold ${forPrint ? "text-[9px]" : "text-[10px]"}`}
                    style={{ color: theme.accentDark }}
                  >
                    {lv.n}
                  </div>
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[9px]" : "text-[11px] sm:text-xs"
                    }`}
                  >
                    {lv.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[8px] line-clamp-2" : "text-[10px] line-clamp-2 sm:line-clamp-3"
                    }`}
                  >
                    {lv.d}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`rounded-xl border border-black/10 bg-gradient-to-br from-amber-50/80 to-white mt-auto ${
                forPrint ? "p-2" : "p-3 sm:p-4"
              }`}
            >
              <div
                className={`font-semibold text-black ${
                  forPrint ? "text-[10px] mb-1" : "text-xs sm:text-sm mb-1.5"
                }`}
              >
                {sc.validationTitle}
              </div>
              <ul
                className={`text-[#525252] space-y-0.5 ${
                  forPrint ? "text-[9px]" : "text-[11px] sm:text-xs"
                }`}
              >
                {sc.validationPoints.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
              {!forPrint && (sc.bookHref || sc.siteHref) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {sc.bookHref && (
                    <a
                      href={sc.bookHref}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5"
                      download={sc.bookHref.endsWith(".pdf") ? true : undefined}
                    >
                      {sc.bookLabel ?? "Free book"}
                    </a>
                  )}
                  {sc.siteHref && (
                    <a
                      href={sc.siteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-3 py-1.5 text-xs font-semibold hover:bg-[#111]"
                    >
                      {sc.siteLabel ?? "super-cube.com"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </DeckSlideShell>
      );

    /* —— Super-Cube® FMCG intervention case study —— */
    case 53: {
      const cs = sc?.caseStudy;
      if (!cs) return null;
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <DeckEyebrow theme={theme}>{cs.eyebrow}</DeckEyebrow>
            <DeckTitle>{cs.title}</DeckTitle>
            <p
              className={`text-[#525252] max-w-3xl ${
                forPrint ? "text-[10px] mb-1.5 leading-snug line-clamp-2" : "text-sm mb-2 leading-relaxed"
              }`}
            >
              {cs.body}
            </p>
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 shrink-0 ${
                forPrint ? "gap-1 mb-2" : "gap-1.5 sm:gap-2 mb-3"
              }`}
            >
              {cs.lifts.map((l) => (
                <div
                  key={l.name}
                  className={`rounded-lg border border-black/10 bg-[#fafafa] text-center min-w-0 flex flex-col items-center ${
                    forPrint ? "p-1" : "p-2"
                  }`}
                >
                  <Image
                    src={l.icon}
                    alt={l.name}
                    width={forPrint ? 22 : 28}
                    height={forPrint ? 22 : 28}
                    className={`object-contain ${forPrint ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"}`}
                  />
                  <div
                    className={`font-semibold tracking-tighter mt-0.5 ${
                      forPrint ? "text-sm" : "text-base sm:text-lg"
                    }`}
                    style={{ color: l.color }}
                  >
                    +{l.lift.replace(/^\+/, "")}
                  </div>
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                    }`}
                  >
                    {l.name}
                  </div>
                </div>
              ))}
            </div>
            {(cs.continentalTitle || cs.continentalImpacts?.length) && (
              <div className="min-h-0 flex-1 flex flex-col">
                {cs.continentalTitle && (
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[10px] mb-0.5" : "text-xs sm:text-sm mb-1"
                    }`}
                  >
                    {cs.continentalTitle}
                  </div>
                )}
                {cs.continentalBody && (
                  <p
                    className={`text-[#525252] ${
                      forPrint
                        ? "text-[9px] mb-1.5 leading-snug line-clamp-2"
                        : "text-[11px] sm:text-xs mb-2 leading-relaxed line-clamp-2 sm:line-clamp-3"
                    }`}
                  >
                    {cs.continentalBody}
                  </p>
                )}
                {cs.continentalImpacts && cs.continentalImpacts.length > 0 && (
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-0 content-start ${
                      forPrint ? "gap-1" : "gap-1.5 sm:gap-2"
                    }`}
                  >
                    {cs.continentalImpacts.map((x) => (
                      <div
                        key={x.t}
                        className={`rounded-lg border border-black/10 bg-white min-w-0 ${
                          forPrint ? "p-1.5" : "p-2 sm:p-2.5"
                        }`}
                      >
                        <div
                          className={`font-semibold text-black ${
                            forPrint ? "text-[9px] mb-0.5" : "text-[10px] sm:text-xs mb-0.5"
                          }`}
                        >
                          {x.t}
                        </div>
                        <p
                          className={`text-[#525252] leading-snug ${
                            forPrint ? "text-[8px] line-clamp-3" : "text-[10px] sm:text-[11px] line-clamp-3"
                          }`}
                        >
                          {x.d}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {cs.note && (
              <p
                className={`text-[#737373] shrink-0 ${
                  forPrint ? "text-[8px] mt-1 leading-snug" : "text-[10px] mt-2 leading-relaxed"
                }`}
              >
                {cs.note}
              </p>
            )}
          </div>
        </DeckSlideShell>
      );
    }

    case 5:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            PROOF POINTS
          </DeckEyebrow>
          <DeckTitle>{cfg.proofTitle}</DeckTitle>
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 ${forPrint ? "gap-2 mb-2" : "gap-2 sm:gap-3 mb-5"}`}
          >
            {cfg.proofStats.map((st) => (
              <DeckStatTile key={st.label} dark theme={theme} value={st.value} label={st.label} />
            ))}
          </div>
          <ul
            className={`text-white/70 space-y-1 max-w-2xl ${
              forPrint ? "text-[11px]" : "text-sm"
            }`}
          >
            {cfg.proofPoints.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW IT WORKS</DeckEyebrow>
          <DeckTitle>{cfg.howTitle}</DeckTitle>
          <div
            className={`grid ${
              forPrint ? "grid-cols-3 gap-2" : "grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            }`}
          >
            {cfg.howSteps.map((s) => (
              <div
                key={s.step}
                className={`rounded-xl border border-black/10 bg-[#fafafa] relative overflow-hidden ${
                  forPrint ? "p-2.5" : "p-5"
                }`}
              >
                <div
                  className="absolute top-0 left-0 w-full h-0.5"
                  style={{
                    background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                />
                <div
                  className={`font-semibold tracking-tighter ${
                    forPrint ? "text-lg mb-0.5" : "text-3xl mb-2"
                  }`}
                  style={{ color: `${theme.accent}55` }}
                >
                  {s.step}
                </div>
                <h3
                  className={`font-semibold text-black ${
                    forPrint ? "text-xs mb-0.5" : "text-lg mb-2"
                  }`}
                >
                  {s.t}
                </h3>
                <p
                  className={`text-[#525252] leading-snug ${
                    forPrint ? "text-[10px]" : "text-sm"
                  }`}
                >
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>IN THE GROUP</DeckEyebrow>
          <DeckTitle>{cfg.ecosystemTitle}</DeckTitle>
          <p
            className={`text-[#525252] max-w-3xl ${
              forPrint ? "text-[11px] mb-2 leading-snug" : "text-sm mb-5 leading-relaxed"
            }`}
          >
            {cfg.ecosystemBody}
          </p>
          <div className={`flex flex-wrap gap-2 ${forPrint ? "gap-1.5" : "gap-3"}`}>
            {cfg.ecosystemLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full border border-black/10 bg-white font-semibold text-black ${
                  forPrint ? "text-[10px] px-2.5 py-1" : "text-sm px-4 py-2"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHO WE SERVE</DeckEyebrow>
          <DeckTitle>{cfg.stakeholdersTitle}</DeckTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${forPrint ? "gap-1.5" : "gap-3"}`}>
            {cfg.stakeholders.map((x) => (
              <div
                key={x.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2.5 min-w-0 ${
                  forPrint ? "p-2.5" : "p-5"
                }`}
              >
                <div
                  className={`rounded-lg flex items-center justify-center shrink-0 ${
                    forPrint ? "w-8 h-8" : "w-10 h-10"
                  }`}
                  style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
                >
                  <x.icon className={forPrint ? "w-4 h-4" : "w-5 h-5"} />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-black ${
                      forPrint ? "text-[11px] mb-0.5" : "mb-1"
                    }`}
                  >
                    {x.t}
                  </h3>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[10px]" : "text-sm"
                    }`}
                  >
                    {x.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 100:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            INTELLIGENCE · AI · SAM
          </DeckEyebrow>
          <DeckTitle>{cfg.intelTitle ?? "Intelligence that multiplies the mission"}</DeckTitle>
          <p
            className={`text-white/70 max-w-3xl ${
              forPrint ? "text-[11px] mb-2 leading-snug" : "text-sm mb-5 leading-relaxed"
            }`}
          >
            {cfg.intelBody}
          </p>
          <div className={`grid grid-cols-2 ${forPrint ? "gap-1.5" : "gap-3"}`}>
            {(cfg.intelCards ?? []).map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-white/10 bg-white/[0.05] flex gap-2 min-w-0 ${
                  forPrint ? "p-2" : "p-4"
                }`}
              >
                <c.icon
                  className={`shrink-0 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.gradientFrom }}
                />
                <div>
                  <div
                    className={`font-semibold text-white ${
                      forPrint ? "text-[11px] mb-0.5" : "mb-1"
                    }`}
                  >
                    {c.t}
                  </div>
                  <p
                    className={`text-white/65 leading-snug ${
                      forPrint ? "text-[10px]" : "text-sm"
                    }`}
                  >
                    {c.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UN SDGs</DeckEyebrow>
          <DeckTitle>{cfg.sdgTitle}</DeckTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-3 ${forPrint ? "gap-1.5" : "gap-3"}`}>
            {cfg.sdgs.map((g) => (
              <div
                key={g.n}
                className={`rounded-xl border border-black/10 bg-white flex gap-2 min-w-0 ${
                  forPrint ? "p-2" : "p-4"
                }`}
              >
                <div
                  className={`shrink-0 rounded font-bold text-white flex items-center justify-center ${
                    forPrint ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
                  }`}
                  style={{ backgroundColor: g.color }}
                >
                  {g.n}
                </div>
                <div>
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[11px]" : "text-sm"
                    }`}
                  >
                    SDG {g.n} · {g.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[10px]" : "text-xs"
                    }`}
                  >
                    {g.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY PARTNER</DeckEyebrow>
          <DeckTitle>{cfg.whyTitle}</DeckTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${forPrint ? "gap-1.5" : "gap-3"}`}>
            {cfg.whyPoints.map((x) => (
              <div
                key={x.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex gap-2 min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <Check
                  className={`shrink-0 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.accent }}
                />
                <div>
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[11px] mb-0.5" : "mb-1"
                    }`}
                  >
                    {x.t}
                  </div>
                  <p
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[10px]" : "text-sm"
                    }`}
                  >
                    {x.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <DeckTitleLayout>
            <div className="flex flex-col h-full justify-between min-h-0">
              <div>
                <DeckEyebrow light theme={theme}>
                  CALL TO ACTION
                </DeckEyebrow>
                <h2
                  className={`font-semibold tracking-tighter leading-[1.05] text-balance ${
                    forPrint ? "text-xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-4"
                  }`}
                >
                  {cfg.ctaTitle}
                  <br />
                  <span style={{ color: theme.gradientFrom }}>{cfg.ctaHighlight}</span>
                </h2>
                <p
                  className={`text-white/80 max-w-2xl ${
                    forPrint ? "text-[11px] mb-2 leading-snug" : "text-base mb-4 leading-relaxed"
                  }`}
                >
                  {cfg.ctaBody}
                </p>
                <div
                  className={`grid max-w-3xl ${
                    forPrint
                      ? "grid-cols-3 gap-1.5 mb-3"
                      : "grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6"
                  }`}
                >
                  {cfg.ctaSteps.map((s) => (
                    <div
                      key={s.n}
                      className={`rounded-xl border border-white/15 bg-white/[0.06] ${
                        forPrint ? "px-2 py-1.5" : "px-4 py-3"
                      }`}
                    >
                      <div
                        className={`tracking-[2px] font-semibold ${
                          forPrint ? "text-[8px]" : "text-[10px]"
                        }`}
                        style={{ color: theme.gradientFrom }}
                      >
                        {s.n}
                      </div>
                      <div
                        className={`font-semibold text-white ${
                          forPrint ? "text-[10px]" : "text-sm"
                        }`}
                      >
                        {s.t}
                      </div>
                      <div
                        className={`text-white/55 ${forPrint ? "text-[9px]" : "text-xs"}`}
                      >
                        {s.d}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`flex flex-wrap ${forPrint ? "gap-1.5" : "gap-3"}`}>
                  {cfg.ctaPrimary.external ? (
                    <a
                      href={cfg.ctaPrimary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`premium-button inline-flex items-center gap-1.5 bg-white text-black rounded-full font-semibold ${
                        forPrint ? "px-3 py-1.5 text-[10px]" : "px-7 py-3.5 text-sm"
                      }`}
                    >
                      {cfg.ctaPrimary.label}
                      <ArrowRight className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                    </a>
                  ) : (
                    <Link
                      href={cfg.ctaPrimary.href}
                      className={`premium-button inline-flex items-center gap-1.5 bg-white text-black rounded-full font-semibold ${
                        forPrint ? "px-3 py-1.5 text-[10px]" : "px-7 py-3.5 text-sm"
                      }`}
                    >
                      {cfg.ctaPrimary.label}
                      <ArrowRight className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                    </Link>
                  )}
                  {cfg.ctaSecondary &&
                    (cfg.ctaSecondary.external ? (
                      <a
                        href={cfg.ctaSecondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`premium-button inline-flex items-center border border-white/30 text-white rounded-full font-semibold ${
                          forPrint ? "px-3 py-1.5 text-[10px]" : "px-6 py-3 text-sm"
                        }`}
                      >
                        {cfg.ctaSecondary.label}
                      </a>
                    ) : (
                      <Link
                        href={cfg.ctaSecondary.href}
                        className={`premium-button inline-flex items-center border border-white/30 text-white rounded-full font-semibold ${
                          forPrint ? "px-3 py-1.5 text-[10px]" : "px-6 py-3 text-sm"
                        }`}
                      >
                        {cfg.ctaSecondary.label}
                      </Link>
                    ))}
                  {!forPrint && (
                    <>
                      <a
                        href={SA_ONBOARDING}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="premium-button inline-flex items-center border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold"
                      >
                        SupplierAdvisor® trial
                      </a>
                      {cfg.ctaEmail && (
                        <a
                          href={`mailto:${cfg.ctaEmail}`}
                          className="premium-button inline-flex items-center border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold"
                        >
                          {cfg.ctaEmail}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
              <p
                className={`text-white/45 shrink-0 ${forPrint ? "text-[9px] mt-2" : "text-xs mt-6"}`}
              >
                {cfg.footerLine}
              </p>
            </div>
          </DeckTitleLayout>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function PillarDeck({ config }: { config: PillarDeckConfig }) {
  const theme = DECK_THEMES[config.themeKey];
  const total = slideCount(config);

  return (
    <DeckShell
      id={config.id}
      printRootId={config.printRootId}
      total={total}
      theme={theme}
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      sharePath={config.sharePath}
      shareTitle={config.shareTitle}
      shareText={config.shareText}
      renderSlide={(i) => <Slide index={i} cfg={config} theme={theme} />}
    />
  );
}

// re-export for convenience
export { SA_LOGIN, SA_ONBOARDING, SA_URL };
