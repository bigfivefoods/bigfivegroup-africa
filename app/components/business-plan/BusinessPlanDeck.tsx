"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import DeckShell, {
  DeckEyebrow,
  DeckPrintImage,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  DECK_THEMES,
  useDeckPdfExport,
  useDeckPrintMode,
  type DeckTheme,
} from "../deck/DeckShell";
import { pageBrand } from "../../lib/pageBrand";
import { SPAR_PARTNERSHIP } from "../../lib/sparPartnership";
import { NSNP_PRODUCTS } from "../../lib/foodsProducts";
import type { BusinessPlan, BusinessPlanChapter } from "../../lib/businessPlans/types";

/** Same four-category retail one-pager layout as the SPAR Mandela Pack products slide. */
const FOODS_PRODUCT_RANGES = SPAR_PARTNERSHIP.mandelaPackRanges;
const FOODS_MARGIN = SPAR_PARTNERSHIP.sparMargin;

/**
 * Big Five Foods — Group black (#0a0a0a) + amber/gold chrome + Foods pillar accent.
 * Matches bigfivegroup.africa site branding and /brand kit.
 */
const BFG_FOODS_THEME: DeckTheme = {
  name: "foods-group",
  accent: pageBrand.foods.accent, // #f59e0b
  accentDark: pageBrand.foods.accentDark, // #b45309
  gradientFrom: "#f59e0b",
  gradientTo: "#fbbf24",
  frameFrom: pageBrand.foods.accentSoft, // #fffbeb
  frameTo: "#f3f4f6",
  darkBg: "#0a0a0a", // Group black (not brown amber)
  eyebrowLight: "text-amber-300",
  eyebrow: "text-amber-800",
  softBorder: "border-amber-200",
  softBg: "bg-amber-50",
  softText: "text-amber-950",
};

type PlanBrandAssets = {
  theme: DeckTheme;
  /** Logo on dark backgrounds */
  logoOnDark: string;
  /** Logo on light backgrounds */
  logoOnLight: string;
  logoAlt: string;
  /**
   * Aspect handling — SupplierAdvisor® wordmark from www.supplieradvisor.com
   * is wide (~640×277); Foods seal is near-square.
   */
  logoShape?: "square" | "wide";
  coverEyebrow?: string;
};

const PLAN_BRAND: Record<string, PlanBrandAssets> = {
  foods: {
    theme: BFG_FOODS_THEME,
    logoOnDark: "/bigfivefoods-logo-white.png",
    logoOnLight: "/bigfivefoods-logo.png",
    logoAlt: "Big Five Foods",
    logoShape: "square",
    coverEyebrow: "BIG FIVE FOODS · BUSINESS PLAN · CONFIDENTIAL",
  },
  connect: {
    theme: DECK_THEMES.cyan,
    /** Official colour wordmark (same asset as https://www.supplieradvisor.com/sa-logo.png) */
    logoOnLight: "/sa-logo.png",
    logoOnDark: "/supplieradvisor-logo-white.png",
    logoAlt: "SupplierAdvisor®",
    logoShape: "wide",
    coverEyebrow:
      "BIG FIVE CONNECT · SUPPLIERADVISOR® · WWW.SUPPLIERADVISOR.COM · CONFIDENTIAL",
  },
  agri: { theme: DECK_THEMES.emerald, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Agri", logoShape: "square" },
  direct: { theme: DECK_THEMES.orange, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Direct", logoShape: "square" },
  access: { theme: DECK_THEMES.violet, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Access", logoShape: "square" },
  impact: { theme: DECK_THEMES.gold, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Impact", logoShape: "square" },
  leadership: { theme: DECK_THEMES.teal, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Leadership", logoShape: "square" },
  foundation: { theme: DECK_THEMES.violet, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Foundation", logoShape: "square" },
  global: { theme: DECK_THEMES.blue, logoOnDark: "/bigfivegroup-logo.png", logoOnLight: "/bigfivegroup-logo.jpg", logoAlt: "Big Five Global", logoShape: "square" },
};

function brandFor(slug: string): PlanBrandAssets {
  return (
    PLAN_BRAND[slug] ?? {
      theme: DECK_THEMES.amber,
      logoOnDark: "/bigfivegroup-logo.png",
      logoOnLight: "/bigfivegroup-logo.jpg",
      logoAlt: "Big Five Group",
    }
  );
}

function themeFor(slug: string): DeckTheme {
  return brandFor(slug).theme;
}

function PlanLogo({
  slug,
  onDark,
  size = "md",
  plate,
}: {
  slug: string;
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  /** Light plate behind wide wordmarks on dark slides (optional) */
  plate?: boolean;
}) {
  const brand = brandFor(slug);
  const forPrint = useDeckPrintMode();
  const pdf = useDeckPdfExport();
  const wide = brand.logoShape === "wide";
  const src = onDark ? brand.logoOnDark : brand.logoOnLight;

  /**
   * Wide SupplierAdvisor® wordmark (~640×277) must NOT use absolute-fill + overflow-hidden
   * — that cropped the mark. Flex + max-contain (SPAR co-brand pattern) keeps the full logo.
   */
  if (wide) {
    const shell =
      size === "lg"
        ? forPrint
          ? "h-11 max-w-[15rem] px-3 py-1.5"
          : "h-12 sm:h-14 max-w-[16rem] sm:max-w-[18rem] px-3 sm:px-3.5 py-1.5 sm:py-2"
        : size === "sm"
          ? forPrint
            ? "h-8 max-w-[9.5rem] px-2 py-1"
            : "h-8 sm:h-9 max-w-[10rem] sm:max-w-[11rem] px-2 py-1"
          : forPrint
            ? "h-9 max-w-[12rem] px-2.5 py-1"
            : "h-10 sm:h-11 max-w-[13rem] sm:max-w-[14rem] px-2.5 py-1.5";

    return (
      <div
        className={`shrink-0 flex items-center justify-center overflow-visible ${shell} ${
          plate
            ? "rounded-xl bg-white border border-white/35 shadow-sm"
            : "rounded-lg bg-white/95 border border-black/5"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- print-safe wide wordmark */}
        <img
          src={src}
          alt={brand.logoAlt}
          className="max-h-full max-w-full w-auto h-auto object-contain object-center"
          loading={pdf ? "eager" : "lazy"}
          decoding={pdf ? "sync" : "async"}
          {...(pdf ? { fetchPriority: "high" as const } : {})}
        />
      </div>
    );
  }

  const box =
    size === "lg"
      ? forPrint
        ? "w-20 h-20"
        : "w-24 h-24 sm:w-28 sm:h-28"
      : size === "sm"
        ? forPrint
          ? "w-10 h-10"
          : "w-11 h-11 sm:w-12 sm:h-12"
        : forPrint
          ? "w-14 h-14"
          : "w-16 h-16 sm:w-20 sm:h-20";

  return (
    <div className={`relative shrink-0 ${box}`}>
      <DeckPrintImage src={src} alt={brand.logoAlt} fit="contain" />
    </div>
  );
}

/** Corner brand mark on light slides (Foods seal / SupplierAdvisor® wordmark). */
function LightSlideBrandChrome({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const forPrint = useDeckPrintMode();
  const wide = brandFor(slug).logoShape === "wide";
  return (
    <div className="relative h-full min-h-0 flex flex-col">
      <div className="absolute top-0 right-0 z-10 max-w-[42%]">
        <PlanLogo slug={slug} size="sm" />
      </div>
      <div
        className={`flex-1 min-h-0 flex flex-col ${
          wide
            ? forPrint
              ? "pr-[10.5rem]"
              : "pr-40 sm:pr-44"
            : forPrint
              ? "pr-12"
              : "pr-14 sm:pr-16"
        }`}
      >
        {children}
      </div>
    </div>
  );
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
  const brand = brandFor(plan.meta.slug);
  const isConnect = plan.meta.slug === "connect";

  return (
    <DeckSlideShell dark theme={theme}>
      <DeckTitleLayout>
        <div>
          <DeckEyebrow light theme={theme}>
            {brand.coverEyebrow ?? plan.meta.classification}
          </DeckEyebrow>

          <div
            className={`flex flex-wrap items-center gap-4 sm:gap-5 ${forPrint ? "mb-3" : "mb-4 sm:mb-6"}`}
          >
            {/* Connect: official SupplierAdvisor® wordmark (www.supplieradvisor.com/sa-logo.png) */}
            <PlanLogo
              slug={plan.meta.slug}
              onDark={isConnect ? false : true}
              size="lg"
              plate={isConnect}
            />
          </div>

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
            <span>{plan.meta.companyName}</span>
            {isConnect ? (
              <>
                <span>·</span>
                <span>supplieradvisor.com</span>
              </>
            ) : null}
            <span>·</span>
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
      <LightSlideBrandChrome slug={plan.meta.slug}>
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
      </LightSlideBrandChrome>
    </DeckSlideShell>
  );
}

function ContentsSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  const agenda = [
    ...(plan.meta.slug === "foods"
      ? [{ n: "P", id: "products", title: "Product range one-pager (four categories)" }]
      : []),
    ...plan.chapters.map((ch) => ({ n: ch.n, id: ch.id, title: ch.title })),
  ];
  return (
    <DeckSlideShell theme={theme}>
      <LightSlideBrandChrome slug={plan.meta.slug}>
        <DeckEyebrow theme={theme}>CONTENTS</DeckEyebrow>
        <DeckTitle>Presentation agenda</DeckTitle>
        <ol
          className={`grid grid-cols-1 sm:grid-cols-2 ${forPrint ? "gap-1" : "gap-1.5 sm:gap-2"}`}
        >
          {agenda.map((ch) => (
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
      </LightSlideBrandChrome>
    </DeckSlideShell>
  );
}

function ChapterSlide({
  chapter,
  theme,
  planName,
  planSlug,
}: {
  chapter: BusinessPlanChapter;
  theme: DeckTheme;
  planName: string;
  planSlug: string;
}) {
  const forPrint = useDeckPrintMode();
  const data = useMemo(() => chapterSlideBlocks(chapter), [chapter]);
  const showTable = Boolean(data.table) && data.stats.length === 0;
  const showBullets = data.bullets.length > 0 && !showTable;

  return (
    <DeckSlideShell theme={theme}>
      <LightSlideBrandChrome slug={planSlug}>
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

        {showBullets ? <SlideBullets items={data.bullets} forPrint={forPrint} /> : null}

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
      </LightSlideBrandChrome>
    </DeckSlideShell>
  );
}

/**
 * Foods products one-pager — mirrors SPAR Mandela Pack products slide:
 * four categories, pack images (object-contain), flavours, pack pricing.
 */
function FoodsProductsSlide({ theme }: { theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  const pdf = useDeckPdfExport();
  const M = FOODS_MARGIN;

  return (
    <DeckSlideShell theme={theme}>
      <LightSlideBrandChrome slug="foods">
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="shrink-0">
            <DeckEyebrow theme={theme}>PRODUCT RANGE · ONE-PAGER</DeckEyebrow>
            <h2
              className={`font-semibold tracking-tighter text-black text-balance ${
                forPrint ? "text-lg mb-1.5" : "text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3"
              }`}
            >
              Four categories. Two pack prices. Sixteen flavours.
            </h2>
            <p
              className={`text-[#525252] leading-snug max-w-4xl ${
                forPrint ? "text-[9px] mb-1.5" : "text-[10px] sm:text-xs mb-2 sm:mb-3"
              }`}
            >
              <strong className="text-black">1kg</strong> porridges &amp; one-pots ·{" "}
              <strong className="text-black">R45 ex. VAT / R67 incl. VAT</strong>
              {" · "}
              <strong className="text-black">400g</strong> soya &amp; soups ·{" "}
              <strong className="text-black">R18 ex. VAT / R33.50 incl. VAT</strong>
              {" · "}
              fortified · shelf-stable · retail, institutional &amp; Africa trade.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-0 content-start">
            {FOODS_PRODUCT_RANGES.map((range) => {
              const allFlavours = range.flavours.map((f) => f.name).join(" · ");
              const tier = range.pricingTier === "kg1" ? M.kg1 : M.g400;
              return (
                <div key={range.id} className="min-w-0 flex flex-col">
                  <div className="w-full aspect-[2/3] max-h-[13rem] sm:max-h-[15rem] rounded-xl border border-black/8 bg-[#f8f7f5] flex items-center justify-center p-2 sm:p-3 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element -- print-safe pack art */}
                    <img
                      src={range.heroImage}
                      alt={`${range.title} — ${range.flavours[0]?.name ?? ""}`}
                      className="max-h-full max-w-full w-auto h-auto object-contain object-center"
                      loading={pdf ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="text-center mt-1.5 shrink-0 px-0.5">
                    <div
                      className={`font-semibold text-black leading-tight ${
                        forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                      }`}
                    >
                      {range.title}
                    </div>
                    <div
                      className={`font-semibold mt-0.5 tabular-nums ${
                        forPrint ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                      }`}
                      style={{ color: theme.accentDark }}
                    >
                      {range.packSize} · {range.tradeExVatLabel} → {range.rrpInclVatLabel}
                    </div>
                    <div
                      className={`text-[#525252] leading-snug mt-0.5 font-medium ${
                        forPrint ? "text-[7px]" : "text-[8px] sm:text-[9px]"
                      }`}
                    >
                      Margin {tier.marginRandLabel} · {tier.marginPctLabel}
                    </div>
                    <div
                      className={`text-[#737373] leading-snug mt-0.5 ${
                        forPrint ? "text-[7px]" : "text-[8px] sm:text-[9px]"
                      }`}
                    >
                      {allFlavours}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-2 shrink-0 rounded-xl border border-amber-200 bg-amber-50/80 ${
              forPrint ? "p-2 text-[8px]" : "p-2.5 sm:p-3 text-[10px] sm:text-xs"
            } text-[#404040] leading-snug`}
          >
            <strong className="text-black">Also institutional (NSNP):</strong>{" "}
            {NSNP_PRODUCTS.map((p) => p.shortName).join(" · ")} — 5kg programme packs on the KZN
            school-feeding pathway.{" "}
            <strong className="text-black">One-pot (1kg):</strong>{" "}
            {SPAR_PARTNERSHIP.product.onePotYield.headline}.{" "}
            <strong className="text-black">{SPAR_PARTNERSHIP.product.onePotYield.costLine}</strong>
          </div>
        </div>
      </LightSlideBrandChrome>
    </DeckSlideShell>
  );
}

function ClosingSlide({ plan, theme }: { plan: BusinessPlan; theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();
  const isConnect = plan.meta.slug === "connect";
  return (
    <DeckSlideShell dark theme={theme}>
      <DeckTitleLayout>
        <div>
          <div className={`flex items-center gap-4 ${forPrint ? "mb-3" : "mb-4"}`}>
            <PlanLogo
              slug={plan.meta.slug}
              onDark={!isConnect}
              size="md"
              plate={isConnect}
            />
          </div>
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
          className={`rounded-xl border border-amber-400/25 bg-amber-400/10 ${
            forPrint ? "p-3" : "p-4 sm:p-5"
          }`}
        >
          <div
            className={`text-amber-200 font-semibold tracking-wide ${
              forPrint ? "text-[9px] mb-1" : "text-[10px] mb-2"
            }`}
          >
            CTA
          </div>
          <p className={`text-white font-semibold ${forPrint ? "text-sm" : "text-base sm:text-lg"}`}>
            {plan.closing.cta}
          </p>
          <p className={`text-white/45 mt-1 ${forPrint ? "text-[10px]" : "text-xs"}`}>
            {plan.meta.disclaimer.slice(0, 160)}…
          </p>
        </div>
      </DeckTitleLayout>
    </DeckSlideShell>
  );
}

/**
 * Slide index map:
 * 0 cover · 1 highlights · 2 contents
 * [Foods only] 3 products one-pager
 * then chapters · last closing
 */
function hasProductsSlide(plan: BusinessPlan): boolean {
  return plan.meta.slug === "foods";
}

function slideCount(plan: BusinessPlan): number {
  const extra = hasProductsSlide(plan) ? 1 : 0;
  return 3 + extra + plan.chapters.length + 1;
}

export default function BusinessPlanDeck({ plan }: { plan: BusinessPlan }) {
  const theme = themeFor(plan.meta.slug);
  const total = slideCount(plan);
  const slug = plan.meta.slug;
  const productsSlide = hasProductsSlide(plan);

  const renderSlide = useCallback(
    (index: number) => {
      if (index === 0) return <CoverSlide plan={plan} theme={theme} />;
      if (index === 1) return <HighlightsSlide plan={plan} theme={theme} />;
      if (index === 2) return <ContentsSlide plan={plan} theme={theme} />;
      let cursor = 3;
      if (productsSlide) {
        if (index === cursor) return <FoodsProductsSlide theme={theme} />;
        cursor += 1;
      }
      const chapterIndex = index - cursor;
      if (chapterIndex >= 0 && chapterIndex < plan.chapters.length) {
        return (
          <ChapterSlide
            chapter={plan.chapters[chapterIndex]}
            theme={theme}
            planName={plan.meta.companyName}
            planSlug={plan.meta.slug}
          />
        );
      }
      return <ClosingSlide plan={plan} theme={theme} />;
    },
    [plan, theme, productsSlide]
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
