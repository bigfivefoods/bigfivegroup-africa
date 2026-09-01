"use client";

import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Gift,
  HandHeart,
  Heart,
  Scale,
  ShoppingCart,
  Store,
  Target,
  Users,
} from "lucide-react";
import DeckShell, {
  DECK_THEMES,
  DeckEyebrow,
  DeckPrintImage,
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  useDeckPdfExport,
  useDeckPrintMode,
} from "./deck/DeckShell";
import {
  CHECKERS_PARTNERSHIP,
  buildCheckersImpactReport,
  formatZarCompact,
} from "../lib/checkersPartnership";

const theme = DECK_THEMES.checkers;
/** Condensed Checkers briefing — full deck remains at #checkers-partnership-deck */
const TOTAL = 11;
const P = CHECKERS_PARTNERSHIP;
const M = P.checkersMargin;
const RANGES = P.mandelaPackRanges;
const IMPACT = buildCheckersImpactReport();

function CoBrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const checkersSrc = light
    ? "/partners/checkers-logo.png"
    : "/partners/checkers-logo-on-white.png";
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 max-w-full">
      <div
        className={`relative h-11 sm:h-14 w-[8.5rem] sm:w-44 shrink-0 bg-white rounded-xl px-2.5 py-1 border-2 shadow-sm overflow-hidden ${
          light ? "border-white/40" : "border-[#38A8AE]/25"
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={checkersSrc} alt="Checkers" paddingClass="p-1" fit="contain" />
        ) : (
          <Image src={checkersSrc} alt="Checkers" fill className="object-contain p-1" sizes="176px" priority />
        )}
      </div>
      <span
        className={`shrink-0 text-base sm:text-xl font-light leading-none ${
          light ? "text-white/40" : "text-black/25"
        }`}
        aria-hidden
      >
        ×
      </span>
      <div className="relative h-11 w-11 sm:h-14 sm:w-14 shrink-0 overflow-hidden drop-shadow-md">
        {pdf ? (
          <DeckPrintImage src={foodsSrc} alt="Big Five Foods" fit="contain" />
        ) : (
          <Image
            src={foodsSrc}
            alt="Big Five Foods"
            fill
            className="object-contain object-center"
            sizes="56px"
            priority
          />
        )}
      </div>
    </div>
  );
}

function MandelaQuote({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <blockquote
      className={`max-w-2xl border-l-2 pl-3 sm:pl-4 ${compact ? "mt-3" : "mt-4 sm:mt-5"}`}
      style={{ borderColor: "#5ec4c9" }}
    >
      <p
        className={`italic leading-snug text-balance ${
          compact ? "text-sm" : "text-sm sm:text-base"
        }`}
        style={{ color: light ? "#f0fdf4" : "#171717" }}
      >
        “It always seems impossible until it&apos;s done.”
      </p>
      <cite
        className={`block not-italic font-semibold tracking-wide uppercase ${
          compact ? "mt-1 text-[10px]" : "mt-1.5 text-[10px] sm:text-xs"
        }`}
        style={{ color: light ? "#5ec4c9" : "#38A8AE", fontStyle: "normal" }}
      >
        — Nelson Mandela
      </cite>
    </blockquote>
  );
}

function Slide({ index }: { index: number }) {
  const forPrint = useDeckPrintMode();
  const pdf = useDeckPdfExport();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {pdf ? (
              <DeckPrintImage src="/foods-hero.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/foods-hero.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width:1280px) 100vw, 1200px"
                priority
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, #0a2a2cf2 0%, #38A8AEe6 42%, #0a2a2c99 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061c1e]/95 via-transparent to-black/25" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CHECKERS SOUTH AFRICA · CONDENSED BRIEFING · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    Democratise premium —
                    <br />
                    <span style={{ color: "#5ec4c9" }}>with nutrition communities can feel.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    Condensed partnership brief: Mandela pack on Checkers shelves, healthy store margin
                    (R45 / R67), 10% to foundations — sell with purpose or donate with dignity.
                  </p>
                  <MandelaQuote light compact />
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Condensed · {TOTAL} slides · Full deck also available on this page</p>
                  <p>bigfivegroup.africa/partner/checkers#checkers-partnership-deck-condensed</p>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AGENDA · CONDENSED</DeckEyebrow>
          <DeckTitle>Checkers does good — in {TOTAL} slides</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "Why Checkers leads · Mandela pack products",
              "Pricing & Checkers front margin (R45 / R67)",
              "Sell · donate · 10% to foundations",
              "National impact snapshot · NPOs · SA Harvest",
              "What Checkers wins · governance · the ask",
            ].map((item, i) => (
              <li key={item} className="flex gap-2.5 items-start">
                <span
                  className="shrink-0 w-6 h-6 rounded-full text-white text-[10px] font-semibold flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[#404040] leading-relaxed pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[11px] text-[#737373]">
            Need full detail? Open the{" "}
            <a href="#checkers-partnership-deck" className="font-semibold underline underline-offset-2 text-black">
              full Checkers partnership deck
            </a>{" "}
            ({20} slides) on this page.
          </p>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            CHECKERS · SHOPRITE STRATEGY
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Aligned to democratising premium food retail — FreshX, Sixty60 and 350 grocery stores.
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl mb-3 leading-relaxed ${
              forPrint ? "text-[10px]" : "text-xs sm:text-sm"
            }`}
          >
            {P.groupStrategy.brandPosition}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-1">
            {P.groupStrategy.strategicPillars.slice(0, 4).map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-3.5"
                }`}
              >
                <div className={`font-semibold text-teal-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {c.t}
                </div>
                <p className={`text-white/65 leading-snug ${forPrint ? "text-[9px]" : "text-xs sm:text-sm"}`}>
                  {c.d}
                </p>
              </div>
            ))}
          </div>
          <p className={`mt-3 text-white/45 ${forPrint ? "text-[8px]" : "text-[10px]"}`}>
            Network: {IMPACT.networkSource.checkersSupermarkets} Checkers +{" "}
            {IMPACT.networkSource.checkersHyper} Hyper = {IMPACT.networkSource.storeCountAnchor} grocery
            · {IMPACT.networkSource.bannerTotalInclLiquor} incl. LiquorShop · FreshX ~
            {IMPACT.networkSource.freshXApprox} (Shoprite Holdings FY2025)
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>MANDELA PACK · PRODUCTS</DeckEyebrow>
          <DeckTitle>Four categories. Two pack prices. Sixteen flavours.</DeckTitle>
          <p className="text-[10px] sm:text-xs text-[#525252] mb-3 max-w-3xl leading-snug">
            <strong className="text-black">1kg</strong> porridges &amp; one-pots ·{" "}
            <strong className="text-black">R45 ex. VAT / R67 incl. VAT</strong>
            {" · "}
            <strong className="text-black">400g</strong> soya &amp; soups ·{" "}
            <strong className="text-black">R18 ex. VAT / R33.50 incl. VAT</strong>
            {" · "}
            fortified · shelf-stable · sell or donate.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {RANGES.map((range) => {
              const tier = range.pricingTier === "kg1" ? M.kg1 : M.g400;
              return (
                <div key={range.id} className="min-w-0 flex flex-col">
                  {/* Flex-centred plate (no absolute fill) so tall pack art is never cropped */}
                  <div className="w-full aspect-[2/3] rounded-xl border border-black/8 bg-[#f8f7f5] flex items-center justify-center p-2.5 sm:p-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={range.heroImage}
                      alt={range.title}
                      className="max-h-full max-w-full w-auto h-auto object-contain object-center"
                      loading={pdf ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="text-center mt-1.5 px-0.5">
                    <div className="text-[10px] sm:text-xs font-semibold text-black leading-tight">
                      {range.title}
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] font-semibold mt-0.5 tabular-nums"
                      style={{ color: theme.accentDark }}
                    >
                      {range.packSize} · {range.tradeExVatLabel} → {range.rrpInclVatLabel}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-[#737373] leading-snug mt-0.5">
                      Margin {tier.marginRandLabel} · {tier.marginPctLabel} of RRP
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-[#737373] leading-snug mt-0.5">
                      {range.flavours.map((f) => f.name).join(" · ")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`mt-3 rounded-xl border border-teal-200 bg-teal-50/70 ${
              forPrint ? "p-2 text-[9px]" : "p-2.5 text-[10px] sm:text-xs"
            } text-[#404040] leading-snug`}
          >
            <strong className="text-black">One-pot (1kg):</strong> {P.product.onePotYield.headline}.{" "}
            <strong className="text-black">{P.product.onePotYield.costLine}</strong>
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRICING · Checkers MARGIN</DeckEyebrow>
          <DeckTitle>Two pack tiers — clear Checkers front margin on each</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {[M.kg1, M.g400].map((tier) => (
              <div
                key={tier.packSize}
                className="rounded-2xl border-2 bg-white overflow-hidden min-w-0"
                style={{ borderColor: theme.accent }}
              >
                <div
                  className="px-4 py-2.5 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  <div className="text-[10px] font-bold tracking-wide uppercase opacity-90">
                    {tier.packSize} pack
                  </div>
                  <div className="text-sm font-semibold">{tier.categories}</div>
                </div>
                <div className="grid grid-cols-3 gap-0 border-t border-black/5">
                  <div className="p-3 bg-[#0a0a0a] text-white">
                    <div className="text-[9px] font-semibold uppercase text-teal-300/90">Buy</div>
                    <div className="text-xl font-semibold tracking-tight tabular-nums">
                      {tier.tradeExVatLabel}
                    </div>
                    <div className="text-[9px] text-white/55">ex. VAT</div>
                  </div>
                  <div className="p-3 border-l border-black/5">
                    <div className="text-[9px] font-semibold uppercase" style={{ color: theme.accentDark }}>
                      Sell RRP
                    </div>
                    <div className="text-xl font-semibold tracking-tight tabular-nums text-black">
                      {tier.rrpInclVatLabel}
                    </div>
                    <div className="text-[9px] text-[#737373]">incl. VAT</div>
                  </div>
                  <div className="p-3 border-l border-teal-100 bg-teal-50/80">
                    <div className="text-[9px] font-semibold uppercase" style={{ color: theme.accentDark }}>
                      Margin
                    </div>
                    <div
                      className="text-xl font-semibold tracking-tight tabular-nums"
                      style={{ color: theme.accentDark }}
                    >
                      {tier.marginRandLabel}
                    </div>
                    <div className="text-[9px] font-semibold" style={{ color: theme.accentDark }}>
                      {tier.marginPctLabel} of RRP
                    </div>
                  </div>
                </div>
                <p className="px-3 py-2 text-[10px] text-[#525252] leading-snug border-t border-black/5">
                  Cost aligned at 15% VAT: {tier.tradeExVatLabel} → {tier.tradeInclVatLabel} incl. ·
                  margin = RRP − VAT-aligned cost
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[#404040] leading-relaxed max-w-3xl">
            <strong className="text-black">For Checkers retailers:</strong> {M.detail}
          </p>
          <p className="mt-2 text-[11px] text-[#737373]">{M.honesty}</p>
        </DeckSlideShell>
      );

    case 5: {
      const dense = forPrint || pdf;
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex h-full min-h-0 flex-col">
            <div className="shrink-0">
              <DeckEyebrow theme={theme}>HOW Checkers DOES GOOD</DeckEyebrow>
              <DeckTitle>Sell · donate · 10% ring-fenced for foundations</DeckTitle>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-3 shrink-0 ${
                dense ? "gap-1.5 mb-2" : "gap-2 sm:gap-3 mb-3"
              }`}
            >
              {[
                { icon: ShoppingCart, ...P.pathways[0]! },
                { icon: Gift, ...P.pathways[1]! },
                { icon: HandHeart, ...P.pathways[2]! },
              ].map((path) => (
                <div
                  key={path.id}
                  className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                    dense ? "p-2" : "p-4"
                  }`}
                >
                  <path.icon
                    className={`mb-1 ${dense ? "w-3.5 h-3.5" : "w-5 h-5"}`}
                    style={{ color: theme.accentDark }}
                  />
                  <div className={`font-semibold text-black mb-0.5 ${dense ? "text-[11px]" : "text-sm"}`}>
                    {path.title}
                  </div>
                  <p className={`text-[#525252] leading-snug ${dense ? "text-[9px]" : "text-xs"}`}>
                    {path.desc}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`rounded-2xl border-2 border-teal-200 bg-teal-50/60 shrink-0 ${
                dense ? "p-2" : "p-4 sm:p-5"
              }`}
            >
              <div
                className={`font-bold tracking-wide uppercase mb-1 ${dense ? "text-[9px]" : "text-[10px]"}`}
                style={{ color: theme.accentDark }}
              >
                10% model · Checkers 5% + Big Five Foods 5%
              </div>
              <p
                className={`text-[#404040] leading-snug ${
                  dense ? "text-[9px]" : "text-sm leading-relaxed"
                }`}
              >
                {dense
                  ? "Checkers and Big Five Foods ring-fence 10% of partnership product turnover (Checkers 5% + Foods 5%) so every sale supports Restore Africa Foundation and A Heart To Help — Checkers as the face of good in the community."
                  : P.giving.detail}
              </p>
              <div
                className={`mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1 ${
                  dense ? "text-[8px]" : "text-[11px]"
                } text-[#525252]`}
              >
                <p className="leading-snug">{P.giving.bases.checkers}</p>
                <p className="leading-snug">{P.giving.bases.foods}</p>
              </div>
            </div>
          </div>
        </DeckSlideShell>
      );
    }

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>IMPACT · NATIONAL SNAPSHOT</DeckEyebrow>
          <DeckTitle>Illustrative scale across Checkers South Africa</DeckTitle>
          <p className="text-[10px] sm:text-xs text-[#525252] mb-3 max-w-3xl leading-snug">
            Grocery listing estate: {IMPACT.networkSource.storeCountAnchor} stores (310 Checkers + 40
            Hyper · FY2025) · modelled{" "}
            stores. Planning assumptions only.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <DeckStatTile
              theme={theme}
              value={IMPACT.national.stores.toLocaleString("en-ZA")}
              label="Grocery stores (310 + 40 Hyper)"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarCompact(IMPACT.national.checkersFrontMargin)}
              label="Checkers front margin pool / year"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarCompact(IMPACT.national.combined10)}
              label="10% to foundations / year"
            />
            <DeckStatTile
              theme={theme}
              value={Math.round(IMPACT.national.peopleFedOneMealDay).toLocaleString("en-ZA")}
              label="People fed 1 meal/day (illustrative)"
            />
          </div>
          <p className="text-[10px] text-[#737373] leading-snug">{IMPACT.disclaimer}</p>
          <p className="mt-2 text-[11px] text-[#404040]">
            Pilot at 5% of network: ~{IMPACT.pilot.stores} stores ·{" "}
            {formatZarCompact(IMPACT.pilot.checkersFrontMargin)} front margin · full tables in the{" "}
            <a href="#checkers-partnership-deck" className="font-semibold underline underline-offset-2">
              full deck
            </a>
            .
          </p>
        </DeckSlideShell>
      );

    case 7: {
      const dense = forPrint || pdf;
      /** Compact copy for A4 landscape — logo sits beside text, not above */
      const npoPrintSummary: Record<string, string> = {
        "restore-africa-foundation":
          "NPC for children — nutritious support, school-linked programmes (e.g. Veggies4Kids), community rebuild. KZN roots; education pathways.",
        "a-heart-to-help":
          "Safety, counselling and skills for women experiencing abuse — and their children. Freedom Farm centre, KZN North Coast.",
        "sa-harvest":
          "Last-mile delivery of donated product to soup kitchens, feeding schemes, Restore Africa Foundation and A Heart To Help — so Checkers donations reach plates.",
      };
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex h-full min-h-0 flex-col">
            <div className="shrink-0">
              <DeckEyebrow theme={theme}>WHO Checkers STANDS WITH</DeckEyebrow>
              <DeckTitle>Foundations + last-mile delivery</DeckTitle>
            </div>
            {/* Three horizontal cards: logo | copy — saves vertical space in PDF */}
            <div className={`flex flex-col flex-1 min-h-0 ${dense ? "gap-2" : "gap-2.5 sm:gap-3"}`}>
              {P.npos.map((n) => (
                <div
                  key={n.name}
                  className={`rounded-2xl border border-black/10 bg-white min-w-0 flex flex-row items-start gap-3 ${
                    dense ? "p-2.5" : "p-3 sm:p-4"
                  }`}
                >
                  <div
                    className={`relative shrink-0 bg-[#fafafa] rounded-xl border border-black/5 ${
                      dense ? "h-14 w-28" : "h-16 w-32 sm:h-[4.5rem] sm:w-36"
                    }`}
                  >
                    {pdf ? (
                      <DeckPrintImage src={n.logoSrc} alt={n.name} fit="contain" paddingClass="p-1.5" />
                    ) : (
                      <Image
                        src={n.logoSrc}
                        alt={n.name}
                        fill
                        className="object-contain object-center p-1.5"
                        sizes="144px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-bold tracking-wide uppercase text-teal-800 ${
                        dense ? "text-[9px]" : "text-[10px]"
                      }`}
                    >
                      {n.role}
                    </div>
                    <h3
                      className={`font-semibold text-black leading-snug ${
                        dense ? "text-xs mt-0.5" : "text-sm mt-0.5"
                      }`}
                    >
                      {n.name}
                    </h3>
                    <p
                      className={`text-[#525252] leading-snug mt-1 ${
                        dense ? "text-[9px]" : "text-[11px] sm:text-xs"
                      }`}
                    >
                      {dense ? npoPrintSummary[n.slug] ?? n.summary : n.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              className={`shrink-0 text-[#525252] leading-snug ${
                dense ? "mt-2 text-[9px]" : "mt-3 text-[11px] leading-relaxed"
              }`}
            >
              <strong className="text-black">Chain:</strong> Checkers sells or donates · Big Five Foods
              supplies · SA Harvest delivers to soup kitchens, feeding schemes and the foundations.
            </p>
          </div>
        </DeckSlideShell>
      );
    }

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHAT Checkers WINS</DeckEyebrow>
          <DeckTitle>Brand · store · community</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
            {P.outcomes.map((o) => (
              <div
                key={o.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div className="text-sm font-semibold text-black mb-1">{o.t}</div>
                <p className="text-xs text-[#525252] leading-snug">{o.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                icon: Scale,
                t: "Term sheet first",
                d: "SKUs, R45 / R67, margin discipline, 5%+5% giving, NPO split, Checkers brand story.",
              },
              {
                icon: Building2,
                t: "Transparent reporting",
                d: "Quarterly units sold, packs donated, rand to each foundation, stories Checkers can share.",
              },
            ].map((it) => (
              <div
                key={it.t}
                className="rounded-xl border border-teal-100 bg-teal-50/50 p-3 flex gap-2 min-w-0"
              >
                <it.icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentDark }} />
                <div>
                  <div className="text-xs font-semibold text-black">{it.t}</div>
                  <p className="text-[11px] text-[#525252] leading-snug">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE ASK</DeckEyebrow>
          <DeckTitle>Help Checkers lead — five decisions to start</DeckTitle>
          <ol className="space-y-2.5 max-w-2xl mt-1">
            {[
              "Pilot listing of the Nelson Mandela pack (and agreed SKUs) in selected Checkers clusters",
              "Approve trade R45 ex. VAT and RRP R67 incl. VAT — with Checkers front-margin discipline",
              "Adopt Checkers 5% + Big Five Foods 5% giving to Restore Africa Foundation and A Heart To Help",
              "Authorise donation PO pathway with SA Harvest last-mile delivery to soup kitchens, feeding schemes, RAF and AHTH",
              "Nominate Checkers commercial + CSI leads for a 30-day term-sheet and campaign sprint",
            ].map((a, i) => (
              <li key={a} className="flex gap-3 items-start">
                <span
                  className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: theme.accentDark }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[#404040] leading-relaxed pt-0.5">{a}</span>
              </li>
            ))}
          </ol>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {pdf ? (
              <DeckPrintImage src="/foods-hero.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/foods-hero.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width:1280px) 100vw, 1200px"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, #0a2a2cf2 0%, #38A8AEe6 50%, #061c1ecc 100%)",
              }}
            />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CALL TO ACTION
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                    Help Checkers lead —
                    <br />
                    <span style={{ color: "#5ec4c9" }}>commercially sound. Visibly good.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl text-sm leading-relaxed mb-5">
                    Healthy Checkers margin · Mandela pack at R67 · 10% to foundations · sell or donate.
                  </p>
                  <MandelaQuote light compact />
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "Checkers × Big Five Foods — condensed partnership brief"
                    )}`}
                    className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                    style={{ color: "#000000" }}
                  >
                    Email {P.contactEmail}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="text-white/45 text-xs">
                    Full deck: /partner/checkers#checkers-partnership-deck · Condensed: #checkers-partnership-deck-condensed
                  </div>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function CheckersPartnershipDeckCondensed() {
  return (
    <div id="checkers-partnership-deck-condensed" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#38A8AE]/20 px-3 py-1 shadow-sm">
            <DeckPrintImage src="/partners/checkers-logo-on-white.png" alt="Checkers" paddingClass="p-1" fit="contain" />
          </div>
        </div>
        <div
          className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold"
          style={{ color: "#38A8AE" }}
        >
          CHECKERS CONDENSED BRIEFING · {TOTAL} SLIDES · PRIVATE · CHECKERS ONLY
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Checkers does good — condensed deck
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Shorter briefing for Checkers: margin, Mandela pack, 10% foundations, impact snapshot and the
          ask. The{" "}
          <a href="#checkers-partnership-deck" className="font-semibold text-black underline underline-offset-2">
            full 20-slide deck
          </a>{" "}
          remains below for deep-dive sessions.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="checkers-partnership-deck-condensed-shell"
          printRootId="checkers-partnership-deck-condensed-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="CHECKERS CONDENSED DECK"
          title="Checkers does good — Condensed Partnership Briefing"
          description="Condensed Checkers briefing: R45/R67 margin, Mandela pack, 10% foundations, impact snapshot."
          sharePath="/partner/checkers#checkers-partnership-deck-condensed"
          shareTitle="Checkers does good — condensed briefing"
          shareText="Condensed Checkers partnership brief: Mandela pack, store margin, 10% to foundations."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → ·{" "}
        <span className="font-medium text-black">/partner/checkers#checkers-partnership-deck-condensed</span>
        {" · "}
        Full deck:{" "}
        <a href="#checkers-partnership-deck" className="font-medium text-black underline underline-offset-2">
          #checkers-partnership-deck
        </a>
      </p>
    </div>
  );
}
