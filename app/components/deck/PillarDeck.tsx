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
};

/** Base: title, agenda, Group VMV, challenge… CTA = 13. Intel adds +1. */
const TOTAL_BASE = 13;

function slideCount(cfg: PillarDeckConfig) {
  return cfg.intelCards?.length ? TOTAL_BASE + 1 : TOTAL_BASE;
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
  const hasIntel = Boolean(cfg.intelCards?.length);
  /**
   * Layout: 0 title, 1 agenda, 2 Group VMV, 3 challenge … 12 CTA
   * With intel: insert at 9 (after stakeholders=8), shift SDG/why/CTA
   */
  const map = (i: number) => {
    if (!hasIntel) return i;
    if (i <= 8) return i;
    if (i === 9) return 100; // intel
    return i - 1;
  };
  const s = map(index);

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
