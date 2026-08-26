"use client";

import { useCallback, useMemo } from "react";
import DeckShell, {
  DeckEyebrow,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  DECK_THEMES,
  useDeckPrintMode,
  type DeckTheme,
} from "../deck/DeckShell";
import type { BusinessPlan, BusinessPlanChapter } from "../../lib/businessPlans/types";

/** Theme per opco — matches company accent on the investor portal. */
const PLAN_THEMES: Record<string, DeckTheme> = {
  foods: DECK_THEMES.amber,
  connect: DECK_THEMES.cyan,
  agri: DECK_THEMES.emerald,
  direct: DECK_THEMES.orange,
  access: DECK_THEMES.violet,
  impact: DECK_THEMES.gold,
  leadership: DECK_THEMES.teal,
  foundation: DECK_THEMES.violet,
  global: DECK_THEMES.blue,
};

function themeFor(slug: string): DeckTheme {
  return PLAN_THEMES[slug] ?? DECK_THEMES.amber;
}

function truncate(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/** Pick the densest, presentation-friendly blocks from a chapter. */
function chapterSlideBlocks(chapter: BusinessPlanChapter): {
  lead?: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  callout?: { title: string; body: string };
  table?: { headers: string[]; rows: string[][] };
  paragraph?: string;
} {
  let lead: string | undefined;
  let paragraph: string | undefined;
  const bullets: string[] = [];
  const stats: { value: string; label: string }[] = [];
  let callout: { title: string; body: string } | undefined;
  let table: { headers: string[]; rows: string[][] } | undefined;

  for (const b of chapter.blocks) {
    if (b.type === "lead" && !lead) lead = b.text;
    else if (b.type === "paragraph" && !paragraph) paragraph = b.text;
    else if (b.type === "bullets") bullets.push(...b.items);
    else if (b.type === "stats") {
      for (const s of b.items) stats.push({ value: s.value, label: s.label });
    } else if (b.type === "callout" && !callout) {
      callout = { title: b.title, body: b.body };
    } else if (b.type === "table" && !table) {
      table = {
        headers: b.table.headers,
        rows: b.table.rows.map((r) => r.cells),
      };
    }
  }

  return {
    lead,
    paragraph,
    bullets: bullets.slice(0, 5),
    stats: stats.slice(0, 4),
    callout: callout
      ? { title: callout.title, body: truncate(callout.body, 220) }
      : undefined,
    table: table
      ? {
          headers: table.headers.slice(0, 4),
          rows: table.rows.slice(0, 4).map((r) => r.slice(0, 4)),
        }
      : undefined,
  };
}

function SlideBullets({
  items,
  dark,
  forPrint,
}: {
  items: string[];
  dark?: boolean;
  forPrint: boolean;
}) {
  if (!items.length) return null;
  return (
    <ul
      className={`space-y-1.5 ${forPrint ? "text-[11px] leading-snug" : "text-sm sm:text-[15px] leading-relaxed"} ${
        dark ? "text-white/80" : "text-[#404040]"
      }`}
    >
      {items.map((item) => (
        <li key={item.slice(0, 36)} className="flex gap-2">
          <span
            className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
              dark ? "bg-amber-300" : "bg-current opacity-50"
            }`}
          />
          <span>{forPrint ? truncate(item, 140) : item}</span>
        </li>
      ))}
    </ul>
  );
}

function SlideTable({
  headers,
  rows,
  dark,
  forPrint,
}: {
  headers: string[];
  rows: string[][];
  dark?: boolean;
  forPrint: boolean;
}) {
  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        dark ? "border-white/15" : "border-black/10"
      }`}
    >
      <table className="w-full text-left">
        <thead>
          <tr className={dark ? "bg-white/5" : "bg-[#fafafa]"}>
            {headers.map((h) => (
              <th
                key={h}
                className={`font-semibold ${forPrint ? "text-[9px] px-2 py-1.5" : "text-[10px] sm:text-xs px-2.5 py-2"} ${
                  dark ? "text-white/50" : "text-[#737373]"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={dark ? "border-t border-white/10" : "border-t border-black/5"}>
              {row.map((c, j) => (
                <td
                  key={j}
                  className={`${forPrint ? "text-[10px] px-2 py-1.5 leading-snug" : "text-xs sm:text-sm px-2.5 py-2 leading-snug"} ${
                    j === 0
                      ? dark
                        ? "font-semibold text-white"
                        : "font-semibold text-black"
                      : dark
                        ? "text-white/70"
                        : "text-[#404040]"
                  }`}
                >
                  {forPrint ? truncate(c, 72) : truncate(c, 120)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CoverSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell dark theme={theme}>
      <DeckTitleLayout>
        <div>
          <DeckEyebrow light theme={theme}>
            {plan.meta.classification}
          </DeckEyebrow>
          <h2
            className={`font-semibold tracking-tighter text-balance text-white ${
              forPrint ? "text-2xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-3"
            }`}
          >
            {plan.meta.fullTitle}
          </h2>
          <p
            className={`text-white/65 max-w-3xl text-pretty ${
              forPrint ? "text-xs leading-snug mb-3" : "text-sm sm:text-base leading-relaxed mb-5"
            }`}
          >
            {plan.meta.subtitle}
          </p>
          <div
            className={`flex flex-wrap gap-2 ${forPrint ? "text-[10px]" : "text-xs"} text-white/40`}
          >
            <span>Version {plan.meta.version}</span>
            <span>·</span>
            <span>As of {plan.meta.asOf}</span>
            <span>·</span>
            <span>{plan.meta.pageTarget}</span>
            <span>·</span>
            <span>PDF presentation</span>
          </div>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 ${forPrint ? "gap-2" : "gap-3"}`}>
          {plan.coverStats.map((s) => (
            <DeckStatTile
              key={s.label}
              value={s.value}
              label={s.note ? `${s.label} · ${s.note}` : s.label}
              dark
              theme={theme}
            />
          ))}
        </div>
      </DeckTitleLayout>
    </DeckSlideShell>
  );
}

function HighlightsSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={theme}>
      <DeckEyebrow theme={theme}>EXECUTIVE HIGHLIGHTS</DeckEyebrow>
      <DeckTitle>What investors should remember</DeckTitle>
      <ul className={`space-y-2.5 ${forPrint ? "mt-1" : "mt-2"}`}>
        {plan.executiveHighlights.slice(0, 6).map((h, i) => (
          <li key={h.slice(0, 40)} className="flex gap-3">
            <span
              className={`shrink-0 font-semibold tabular-nums ${forPrint ? "text-xs" : "text-sm"}`}
              style={{ color: theme.accentDark }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`${forPrint ? "text-xs leading-snug" : "text-sm sm:text-[15px] leading-relaxed"} text-[#404040]`}
            >
              {forPrint ? truncate(h, 180) : h}
            </span>
          </li>
        ))}
      </ul>
    </DeckSlideShell>
  );
}

function ContentsSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={theme}>
      <DeckEyebrow theme={theme}>CONTENTS</DeckEyebrow>
      <DeckTitle>Presentation agenda</DeckTitle>
      <ol
        className={`grid grid-cols-1 sm:grid-cols-2 ${forPrint ? "gap-1" : "gap-1.5 sm:gap-2"}`}
      >
        {plan.chapters.map((ch) => (
          <li
            key={ch.id}
            className={`flex gap-2 rounded-lg ${forPrint ? "px-1.5 py-1" : "px-2 py-1.5"} ${
              forPrint ? "bg-[#fafafa]" : "bg-[#fafafa] border border-black/5"
            }`}
          >
            <span
              className={`font-semibold tabular-nums shrink-0 ${forPrint ? "text-[10px]" : "text-xs"}`}
              style={{ color: theme.accentDark }}
            >
              {ch.n}
            </span>
            <span
              className={`font-medium text-black ${forPrint ? "text-[11px] leading-snug" : "text-sm leading-snug"}`}
            >
              {ch.title}
            </span>
          </li>
        ))}
      </ol>
    </DeckSlideShell>
  );
}

function ChapterSlide({
  chapter,
  theme,
  planName,
}: {
  chapter: BusinessPlanChapter;
  theme: DeckTheme;
  planName: string;
}) {
  const forPrint = useDeckPrintMode();
  const data = useMemo(() => chapterSlideBlocks(chapter), [chapter]);
  const showTable = Boolean(data.table) && data.stats.length === 0;
  const showBullets = data.bullets.length > 0 && !showTable;

  return (
    <DeckSlideShell theme={theme}>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <DeckEyebrow theme={theme}>
          {chapter.eyebrow ?? `${planName.toUpperCase()} · CHAPTER ${chapter.n}`}
        </DeckEyebrow>
        <span
          className={`shrink-0 font-semibold tabular-nums ${forPrint ? "text-[10px]" : "text-xs"}`}
          style={{ color: theme.accentDark }}
        >
          {chapter.n}
        </span>
      </div>
      <h2
        className={`font-semibold tracking-tighter text-balance text-black ${
          forPrint ? "text-lg mb-2" : "text-xl sm:text-2xl md:text-3xl mb-3"
        }`}
      >
        {chapter.title}
      </h2>

      {data.lead ? (
        <p
          className={`font-medium text-black text-pretty ${
            forPrint ? "text-xs leading-snug mb-2" : "text-sm sm:text-base leading-relaxed mb-3"
          }`}
        >
          {forPrint ? truncate(data.lead, 220) : truncate(data.lead, 320)}
        </p>
      ) : data.paragraph ? (
        <p
          className={`text-[#404040] text-pretty ${
            forPrint ? "text-[11px] leading-snug mb-2" : "text-sm leading-relaxed mb-3"
          }`}
        >
          {forPrint ? truncate(data.paragraph, 200) : truncate(data.paragraph, 280)}
        </p>
      ) : null}

      {data.stats.length > 0 ? (
        <div
          className={`grid grid-cols-2 ${data.stats.length > 2 ? "lg:grid-cols-4" : ""} ${
            forPrint ? "gap-2 mb-2" : "gap-3 mb-3"
          }`}
        >
          {data.stats.map((s) => (
            <DeckStatTile key={s.label} value={s.value} label={s.label} theme={theme} />
          ))}
        </div>
      ) : null}

      {showBullets ? (
        <SlideBullets items={data.bullets} forPrint={forPrint} />
      ) : null}

      {showTable && data.table ? (
        <SlideTable
          headers={data.table.headers}
          rows={data.table.rows}
          forPrint={forPrint}
        />
      ) : null}

      {data.callout ? (
        <aside
          className={`rounded-xl border mt-auto ${
            forPrint ? "mt-2 p-2.5" : "mt-3 p-3 sm:p-4"
          } border-amber-200 bg-amber-50`}
        >
          <div
            className={`font-semibold tracking-wide text-amber-900/70 ${
              forPrint ? "text-[9px] mb-0.5" : "text-[10px] mb-1"
            }`}
          >
            {data.callout.title.toUpperCase()}
          </div>
          <p
            className={`text-amber-950 ${
              forPrint ? "text-[10px] leading-snug" : "text-xs sm:text-sm leading-relaxed"
            }`}
          >
            {data.callout.body}
          </p>
        </aside>
      ) : null}
    </DeckSlideShell>
  );
}

function ClosingSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell dark theme={theme}>
      <DeckTitleLayout>
        <div>
          <DeckEyebrow light theme={theme}>
            NEXT STEP · NDA DILIGENCE
          </DeckEyebrow>
          <h2
            className={`font-semibold tracking-tighter text-balance text-white ${
              forPrint ? "text-2xl mb-2" : "text-3xl sm:text-4xl mb-3"
            }`}
          >
            {plan.closing.title}
          </h2>
          <p
            className={`text-white/70 max-w-2xl text-pretty ${
              forPrint ? "text-xs leading-snug" : "text-sm sm:text-base leading-relaxed"
            }`}
          >
            {plan.closing.body}
          </p>
        </div>
        <div
          className={`rounded-xl border border-white/15 bg-white/[0.06] ${
            forPrint ? "p-3" : "p-4 sm:p-5"
          }`}
        >
          <div
            className={`text-amber-200/80 font-semibold tracking-wide ${
              forPrint ? "text-[9px] mb-1" : "text-[10px] mb-2"
            }`}
          >
            CTA
          </div>
          <p className={`text-white font-semibold ${forPrint ? "text-sm" : "text-base sm:text-lg"}`}>
            {plan.closing.cta}
          </p>
          <p
            className={`text-white/45 mt-1 ${forPrint ? "text-[10px]" : "text-xs"}`}
          >
            {plan.meta.disclaimer.slice(0, 160)}…
          </p>
        </div>
      </DeckTitleLayout>
    </DeckSlideShell>
  );
}

/**
 * Slide index map:
 * 0 cover · 1 highlights · 2 contents · 3..(2+N) chapters · last closing
 */
function slideCount(plan: BusinessPlan): number {
  return 3 + plan.chapters.length + 1;
}

export default function BusinessPlanDeck({ plan }: { plan: BusinessPlan }) {
  const theme = themeFor(plan.meta.slug);
  const total = slideCount(plan);
  const slug = plan.meta.slug;

  const renderSlide = useCallback(
    (index: number) => {
      if (index === 0) return <CoverSlide plan={plan} theme={theme} />;
      if (index === 1) return <HighlightsSlide plan={plan} theme={theme} />;
      if (index === 2) return <ContentsSlide plan={plan} theme={theme} />;
      const chapterIndex = index - 3;
      if (chapterIndex >= 0 && chapterIndex < plan.chapters.length) {
        return (
          <ChapterSlide
            chapter={plan.chapters[chapterIndex]}
            theme={theme}
            planName={plan.meta.companyName}
          />
        );
      }
      return <ClosingSlide plan={plan} theme={theme} />;
    },
    [plan, theme]
  );

  return (
    <div id={`business-plan-deck-${slug}`} className="business-plan-deck mb-10">
      <DeckShell
        id={`bp-deck-${slug}`}
        printRootId={`bp-deck-print-${slug}`}
        total={total}
        theme={theme}
        eyebrow={`BUSINESS PLAN · PDF PRESENTATION · ${plan.meta.companyName.toUpperCase()}`}
        title={`${plan.meta.companyName} — investor business plan`}
        description={`Downloadable A4 PDF presentation (${total} slides). Use Landscape or Portrait · Save as PDF. Full written narrative is below for on-page reading.`}
        sharePath={`/investor#business-plans`}
        shareTitle={`${plan.meta.fullTitle} · Big Five Group`}
        shareText={plan.meta.subtitle}
        renderSlide={renderSlide}
      />
    </div>
  );
}

/** Exported for tests / slide-count assertions */
export function getBusinessPlanSlideCount(plan: BusinessPlan): number {
  return slideCount(plan);
}
