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
  formatZar,
  formatZarCompact,
  formatZarPrecise,
} from "../lib/checkersPartnership";

const theme = DECK_THEMES.checkers;
const TOTAL = 20;
const P = CHECKERS_PARTNERSHIP;
const EX = P.giving.example;
const M = P.checkersMargin;
const RANGES = P.mandelaPackRanges;
const IMPACT = buildCheckersImpactReport();

/**
 * PRODUCT Checkers CAN TRUST — one pack per category.
 * Different hero assets from Mandela Pack full-range (chocolate / rich beef / chakalaka / chicken).
 */
const PRODUCT_SHOTS = [
  { src: "/foods/porridge-banana.jpg", name: "Fortified porridges", flavour: "Banana" },
  { src: "/foods/soya-mutton.jpg", name: "Soya mince", flavour: "Mutton" },
  { src: "/foods/onepot-chicken.jpg", name: "One-pot meals", flavour: "Chicken" },
  { src: "/foods/soup-oxtail.jpg", name: "Fortified soups", flavour: "Oxtail" },
] as const;

/**
 * Checkers-forward co-brand.
 * Checkers logo is a wide wordmark; Big Five Foods mark is nearly square — never force
 * Foods into a wide short box (that caused PDF/title overlap).
 */
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
          light ? "border-white/40" : "border-[#001C5A]/25"
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
      {/* Square Foods crest — matches asset aspect (~1:1) */}
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

/**
 * Mandela quote — print-safe (solid colours, no &lt;footer&gt; / opacity that PDF drops).
 */
function MandelaQuote({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <blockquote
      className={`max-w-2xl border-l-2 pl-3 sm:pl-4 ${compact ? "mt-3" : "mt-4 sm:mt-5"}`}
      style={{ borderColor: "#6BBAEF" }}
    >
      <p
        className={`italic leading-snug text-balance ${
          compact ? "text-sm" : "text-sm sm:text-base md:text-lg"
        }`}
        style={{ color: light ? "#f0fdf4" : "#171717" }}
      >
        “It always seems impossible until it&apos;s done.”
      </p>
      {/* Use <cite> not <footer> — some print engines omit nested footer elements */}
      <cite
        className={`block not-italic font-semibold tracking-wide uppercase ${
          compact ? "mt-1 text-[10px]" : "mt-1.5 text-[10px] sm:text-xs"
        }`}
        style={{ color: light ? "#6BBAEF" : "#001C5A", fontStyle: "normal" }}
      >
        — Nelson Mandela
      </cite>
    </blockquote>
  );
}

function Slide({ index }: { index: number }) {
  // Layout matches digital (forPrint is false during PDF export)
  const forPrint = useDeckPrintMode();
  const pdf = useDeckPdfExport();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {/* Full-bleed hero — Next/Image on screen; print-safe img in PDF portal */}
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
                  "linear-gradient(105deg, #000e2ef2 0%, #001C5Ae6 42%, #000e2e99 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000a1f]/95 via-transparent to-black/25" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CHECKERS SOUTH AFRICA · PARTNERSHIP PRESENTATION · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                    When Checkers does good,
                    <br />
                    <span style={{ color: "#6BBAEF" }}>the whole community feels it.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    Put fortified Big Five Foods on Checkers shelves. Earn a healthy store margin.
                    Ring-fence 10% of partnership turnover (Checkers 5% + Big Five Foods 5%) for Restore
                    Africa Foundation and A Heart To Help — sell with purpose or donate with dignity.
                  </p>
                  <MandelaQuote light />
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Checkers leads the narrative · Big Five Foods supplies the product</p>
                  <p>bigfivegroup.africa · /partner/checkers#checkers-partnership-deck</p>
                  <p>{TOTAL} slides · Shareable · Printable · Not a binding offer</p>
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
          <DeckTitle>A Checkers story of good — commercially sound</DeckTitle>
          <ol className={forPrint ? "space-y-1 max-w-2xl" : "space-y-2 max-w-2xl"}>
            {[
              "Why Checkers should own the food-security narrative",
              "How Checkers does good — feed, fund, stand with foundations",
              "Mandela pack pricing · Checkers’ margin on every sale",
              "Mandela pack products — all four Big Five Foods categories",
              "Sell with purpose · donate with dignity · campaign hybrid",
              "The 10% model · Checkers 5% + Big Five Foods 5%",
              "National impact report — stores, sales, Checkers profit, people fed",
              "Restore Africa Foundation · A Heart To Help · SA Harvest delivery",
              "Governance · roadmap · the ask",
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
                <span
                  className={`text-[#404040] leading-relaxed pt-0.5 ${
                    forPrint ? "text-[11px]" : "text-sm"
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
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            Checkers DOES GOOD
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Communities already trust Checkers. This partnership makes that trust feed people.
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl mb-5 leading-relaxed ${
              forPrint ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            Hunger and hardship show up in the same towns as Checkers stores. This is not abstract CSI —
            it is fortified food on the shelf, rand into foundations, and Checkers as the face of care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {P.checkersStory.map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div
                  className={`font-semibold text-sky-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}
                >
                  {c.t}
                </div>
                <p
                  className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}
                >
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY Checkers LEADS</DeckEyebrow>
          <DeckTitle>Only Checkers can put purpose at the till and in the community</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
            {[
              {
                icon: Store,
                t: "Checkers is already in the community",
                d: "Independent retailers sit where people live. Purpose does not need a new warehouse — it needs a Checkers shelf.",
              },
              {
                icon: Users,
                t: "Shoppers want to feel proud",
                d: "A R67 Mandela pack is a weekly choice with a story: Checkers feeds families and supports foundations.",
              },
              {
                icon: Heart,
                t: "CSI customers can see",
                d: "Not only a donation cheque — product donated to Restore Africa Foundation and A Heart To Help, plus sell-through that funds care.",
              },
              {
                icon: Target,
                t: "Reputation that compounds",
                d: "Every pack strengthens Checkers as the retailer that does good — commercially healthy, publicly proud.",
              },
            ].map((p) => (
              <div
                key={p.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <p.icon
                  className={`mb-2 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.accentDark }}
                />
                <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}>
                  {p.t}
                </div>
                <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRICING · Checkers MARGIN</DeckEyebrow>
          <DeckTitle>Two pack tiers — clear Checkers front margin on each</DeckTitle>
          <p
            className={`text-[#525252] mb-3 max-w-3xl leading-relaxed ${
              forPrint ? "text-[11px]" : "text-sm"
            }`}
          >
            {P.product.vatNote}
          </p>
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
                  <div className={`bg-[#0a0a0a] text-white ${forPrint ? "p-2.5" : "p-4"}`}>
                    <div className="text-[9px] font-semibold uppercase text-sky-300/90">Buy</div>
                    <div
                      className={`font-semibold tracking-tighter tabular-nums ${
                        forPrint ? "text-xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {tier.tradeExVatLabel}
                    </div>
                    <div className="text-[9px] text-white/55">ex. VAT</div>
                  </div>
                  <div className={`border-l border-black/5 ${forPrint ? "p-2.5" : "p-4"}`}>
                    <div
                      className="text-[9px] font-semibold uppercase"
                      style={{ color: theme.accentDark }}
                    >
                      Sell RRP
                    </div>
                    <div
                      className={`font-semibold tracking-tighter tabular-nums text-black ${
                        forPrint ? "text-xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {tier.rrpInclVatLabel}
                    </div>
                    <div className="text-[9px] text-[#737373]">incl. VAT</div>
                  </div>
                  <div
                    className={`border-l border-sky-100 bg-sky-50/80 ${
                      forPrint ? "p-2.5" : "p-4"
                    }`}
                  >
                    <div
                      className="text-[9px] font-semibold uppercase"
                      style={{ color: theme.accentDark }}
                    >
                      Margin
                    </div>
                    <div
                      className={`font-semibold tracking-tighter tabular-nums ${
                        forPrint ? "text-xl" : "text-2xl sm:text-3xl"
                      }`}
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
          <div
            className={`rounded-xl border border-sky-100 bg-sky-50/60 ${
              forPrint ? "p-2.5 text-[10px]" : "p-3 text-sm"
            } text-[#404040] leading-relaxed mb-2`}
          >
            <strong className="text-black">For Checkers retailers:</strong> {M.detail}
          </div>
          <div
            className={`rounded-xl border-2 bg-white ${
              forPrint ? "p-2.5 text-[10px]" : "p-3 text-sm"
            } text-[#404040] leading-relaxed`}
            style={{ borderColor: theme.accent }}
          >
            <div
              className={`font-semibold tracking-wide uppercase mb-1 ${
                forPrint ? "text-[9px]" : "text-[10px]"
              }`}
              style={{ color: theme.accentDark }}
            >
              One-pot yield · shelf talk (1kg)
            </div>
            <p className="text-black font-semibold leading-snug mb-1">
              {P.product.onePotYield.headline}
            </p>
            <p className="leading-snug">
              {P.product.onePotYield.detail}{" "}
              <strong className="text-black">{P.product.onePotYield.costLine}</strong>
            </p>
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          {/* Same product image layout as PRODUCT Checkers CAN TRUST (format, size, grid) */}
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="shrink-0">
              <DeckEyebrow theme={theme}>MANDELA PACK · FULL RANGE</DeckEyebrow>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2 sm:mb-3">
                Four categories. Two pack prices. Sixteen flavours.
              </h2>
              <p className="text-[10px] sm:text-xs text-[#525252] leading-snug max-w-4xl mb-2 sm:mb-3">
                <strong className="text-black">1kg</strong> porridges &amp; one-pots ·{" "}
                <strong className="text-black">R45 ex. VAT / R67 incl. VAT</strong>
                {" · "}
                <strong className="text-black">400g</strong> soya &amp; soups ·{" "}
                <strong className="text-black">R18 ex. VAT / R33.50 incl. VAT</strong>
                {" · "}
                fortified · shelf-stable · sell or donate.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-0 content-start">
              {RANGES.map((range) => {
                const heroFlavour = range.flavours[0]?.name ?? "";
                const allFlavours = range.flavours.map((f) => f.name).join(" · ");
                const tier = range.pricingTier === "kg1" ? M.kg1 : M.g400;
                return (
                  <div key={range.id} className="min-w-0 flex flex-col">
                    {/* Flex-centred 2:3 plate — matches tall pack art; never crops */}
                    <div className="w-full aspect-[2/3] max-h-[15rem] sm:max-h-[16.5rem] rounded-xl border border-black/8 bg-[#f8f7f5] flex items-center justify-center p-2.5 sm:p-3.5 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={range.heroImage}
                        alt={`${range.title} — ${heroFlavour}`}
                        className="max-h-full max-w-full w-auto h-auto object-contain object-center"
                        loading={pdf ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="text-center mt-1.5 shrink-0 px-0.5">
                      <div className="text-[10px] sm:text-xs font-semibold text-black leading-tight">
                        {range.title}
                      </div>
                      <div
                        className="text-[9px] sm:text-[10px] font-semibold mt-0.5 tabular-nums"
                        style={{ color: theme.accentDark }}
                      >
                        {range.packSize} · {range.tradeExVatLabel} → {range.rrpInclVatLabel}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-[#525252] leading-snug mt-0.5 font-medium">
                        Margin {tier.marginRandLabel} · {tier.marginPctLabel}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-[#737373] leading-snug mt-0.5">
                        {allFlavours}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-2 shrink-0 rounded-xl border border-sky-200 bg-sky-50/70 ${
                forPrint ? "p-2 text-[8px]" : "p-2.5 sm:p-3 text-[10px] sm:text-xs"
              } text-[#404040] leading-snug`}
            >
              <strong className="text-black">One-pot (1kg Mandela pack):</strong>{" "}
              {P.product.onePotYield.headline}.{" "}
              <strong className="text-black">{P.product.onePotYield.costLine}</strong> — a complete
              fortified plate story for Checkers shoppers and donation hampers.
            </div>
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW Checkers DOES GOOD</DeckEyebrow>
          <DeckTitle>Three ways Checkers turns a pack into community impact</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 mb-3">
            {[
              { icon: ShoppingCart, ...P.pathways[0]! },
              { icon: Gift, ...P.pathways[1]! },
              { icon: HandHeart, ...P.pathways[2]! },
            ].map((path) => (
              <div
                key={path.id}
                className={`rounded-xl border border-black/10 bg-[#fafafa] flex flex-col min-w-0 ${
                  forPrint ? "p-2.5" : "p-4 sm:p-5"
                }`}
              >
                <path.icon
                  className={`mb-2 ${forPrint ? "w-4 h-4" : "w-6 h-6"}`}
                  style={{ color: theme.accentDark }}
                />
                <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-lg"}`}>
                  {path.title}
                </div>
                <p
                  className={`text-[#525252] leading-snug flex-1 ${
                    forPrint ? "text-[10px]" : "text-sm"
                  }`}
                >
                  {path.desc}
                </p>
              </div>
            ))}
          </div>
          <p className={`text-[#737373] ${forPrint ? "text-[9px]" : "text-xs"} leading-relaxed`}>
            Donation POs ship to Restore Africa Foundation and / or A Heart To Help under agreed
            logistics. Checkers stays the hero of every story — on the shelf and in the community.
          </p>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SHARED GIVING · 10%
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Checkers commits 5%. Big Five Foods matches 5%. Foundations receive 10%.
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl mb-5 leading-relaxed ${
              forPrint ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            {P.giving.detail}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <DeckStatTile
              dark
              theme={theme}
              value="5%"
              label="Checkers of retail sell-through (at RRP R67)"
            />
            <DeckStatTile
              dark
              theme={theme}
              value="5%"
              label="Big Five Foods matches — of trade to Checkers"
            />
            <DeckStatTile
              dark
              theme={theme}
              value="10%"
              label="Combined support named for the two foundations"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              className={`rounded-xl border border-white/10 bg-white/[0.06] ${
                forPrint ? "p-2.5" : "p-4"
              }`}
            >
              <div className={`font-semibold text-sky-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                Checkers’ 5%
              </div>
              <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                {P.giving.bases.checkers}
              </p>
            </div>
            <div
              className={`rounded-xl border border-white/10 bg-white/[0.06] ${
                forPrint ? "p-2.5" : "p-4"
              }`}
            >
              <div className={`font-semibold text-sky-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                Big Five Foods’ 5%
              </div>
              <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                {P.giving.bases.foods}
              </p>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>Checkers ECONOMICS · ILLUSTRATIVE</DeckEyebrow>
          <DeckTitle>Margin for Checkers stores · impact for foundations</DeckTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <DeckStatTile
              theme={theme}
              value={M.marginRandLabel}
              label="Checkers front margin per pack @ R67 RRP"
            />
            <DeckStatTile
              theme={theme}
              value={M.marginPctLabel}
              label="Indicative margin of RRP (VAT-aligned)"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarPrecise(P.giving.perUnitIllustrative.atRrp.checkers)}
              label="Checkers 5% contribution per pack sold"
            />
            <DeckStatTile
              theme={theme}
              value={formatZar(EX.checkersContribution + EX.foodsContribution)}
              label="Combined 10% ring-fence · 100k packs (illustrative)"
            />
          </div>
          <div
            className={`rounded-2xl border border-black/10 bg-[#0a0a0a] text-white mb-3 ${
              forPrint ? "p-3" : "p-5 sm:p-6"
            }`}
          >
            <div
              className={`text-sky-300/90 uppercase tracking-wide font-semibold ${
                forPrint ? "text-[9px]" : "text-[10px]"
              }`}
            >
              {EX.label} · Checkers front-margin pool (before overheads & 5% giving)
            </div>
            <div
              className={`font-semibold tracking-tighter tabular-nums ${
                forPrint ? "text-2xl" : "text-3xl sm:text-4xl"
              }`}
              style={{ color: theme.gradientFrom }}
            >
              {formatZar(EX.checkersMarginPool)}
            </div>
            <p className={`text-white/65 mt-1 ${forPrint ? "text-[10px]" : "text-sm"} leading-relaxed`}>
              Illustrative Checkers front margin on 100,000 packs at RRP (not net profit). Separately,
              Checkers’ 5% contribution ≈ {formatZar(EX.checkersContribution)} and Big Five Foods’ match ≈{" "}
              {formatZar(EX.foodsContribution)} toward foundations. {M.honesty}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>IMPACT REPORT · NATIONAL (ILLUSTRATIVE)</DeckEyebrow>
          <DeckTitle>What scale could mean across Checkers South Africa</DeckTitle>
          <p
            className={`text-[#525252] max-w-3xl mb-1.5 leading-relaxed ${
              forPrint ? "text-[9px]" : "text-xs sm:text-sm"
            }`}
          >
            Network anchor:{" "}
            <strong className="text-black font-semibold">
              {IMPACT.networkSource.claim}
            </strong>{" "}
            ({IMPACT.networkSource.formatsNamed}) —{" "}
            <a
              href={IMPACT.networkSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
              style={{ color: theme.accentDark }}
            >
              checkers.co.za
            </a>
            . Model estate: {IMPACT.networkSource.storeCountAnchor.toLocaleString("en-ZA")} stores
            (850+).
          </p>
          <p
            className={`text-[#525252] max-w-3xl mb-2 leading-relaxed ${
              forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
            }`}
          >
            {IMPACT.disclaimer}
          </p>
          <div className="overflow-x-auto mb-2.5 min-w-0">
            <table
              className={`w-full text-left border-collapse ${
                forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
              }`}
            >
              <thead>
                <tr className="border-b border-black/15" style={{ color: theme.accentDark }}>
                  <th className="py-1.5 pr-2 font-semibold">Store format</th>
                  <th className="py-1.5 pr-2 font-semibold text-right">Stores</th>
                  <th className="py-1.5 pr-2 font-semibold text-right">Packs / store / mo</th>
                  <th className="py-1.5 pr-2 font-semibold text-right">Packs / year</th>
                  <th className="py-1.5 pr-2 font-semibold text-right">RRP sell-through</th>
                  <th className="py-1.5 font-semibold text-right">Checkers front margin</th>
                </tr>
              </thead>
              <tbody>
                {IMPACT.tiers.map((t) => (
                  <tr key={t.format} className="border-b border-black/8 text-[#404040]">
                    <td className="py-1.5 pr-2 font-medium text-black min-w-0">
                      <div>{t.format}</div>
                      <div className={`text-[#737373] font-normal ${forPrint ? "text-[7px]" : "text-[9px]"}`}>
                        {t.note}
                      </div>
                    </td>
                    <td className="py-1.5 pr-2 text-right tabular-nums">
                      {t.stores.toLocaleString("en-ZA")}
                    </td>
                    <td className="py-1.5 pr-2 text-right tabular-nums">{t.packsPerStorePerMonth}</td>
                    <td className="py-1.5 pr-2 text-right tabular-nums">
                      {Math.round(t.packsYear).toLocaleString("en-ZA")}
                    </td>
                    <td className="py-1.5 pr-2 text-right tabular-nums">{formatZar(t.retailTurnover)}</td>
                    <td className="py-1.5 text-right tabular-nums font-semibold" style={{ color: theme.accentDark }}>
                      {formatZar(t.checkersFrontMargin)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-sky-50/80 font-semibold text-black">
                  <td className="py-1.5 pr-2">National total (Checkers estate · modelled)</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">
                    {IMPACT.national.stores.toLocaleString("en-ZA")}
                  </td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">
                    ~{Math.round(IMPACT.national.packsPerStorePerMonthBlended)}
                  </td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">
                    {Math.round(IMPACT.national.packsYear).toLocaleString("en-ZA")}
                  </td>
                  <td className="py-1.5 pr-2 text-right tabular-nums whitespace-nowrap">
                    {formatZarCompact(IMPACT.national.retailTurnover)}
                  </td>
                  <td
                    className="py-1.5 text-right tabular-nums whitespace-nowrap"
                    style={{ color: theme.accentDark }}
                  >
                    {formatZarCompact(IMPACT.national.checkersFrontMargin)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-2">
            <DeckStatTile
              theme={theme}
              value={formatZarCompact(IMPACT.national.checkersFrontMargin)}
              label="Checkers front margin pool / year (before overheads & 5% give)"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarCompact(IMPACT.national.combined10)}
              label="10% ring-fence to foundations (Checkers 5% + Foods 5%)"
            />
            <DeckStatTile
              theme={theme}
              value={`${Math.round(IMPACT.national.mealEquivalents / 1_000_000)}m+`}
              label={`Meal equivalents / year (~${IMPACT.unitAssumptions.servingsPerPack} servings / pack)`}
            />
            <DeckStatTile
              theme={theme}
              value={Math.round(IMPACT.national.peopleFedOneMealDay).toLocaleString("en-ZA")}
              label="People fed 1 meal / day for a year (illustrative)"
            />
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 ${
              forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
            }`}
          >
            <div className="rounded-xl border border-black/10 bg-[#fafafa] p-2 sm:p-2.5 text-[#404040] leading-snug">
              <strong className="text-black">Checkers commercial takeaway:</strong> At these velocities,{" "}
              {IMPACT.national.stores.toLocaleString("en-ZA")} stores generate ~{" "}
              {formatZarCompact(IMPACT.national.retailTurnover)} RRP sell-through and ~{" "}
              <span className="whitespace-nowrap font-semibold text-black">
                {formatZarCompact(IMPACT.national.checkersFrontMargin)}
              </span>{" "}
              front margin — with Checkers’ 5% contribution ≈{" "}
              {formatZarCompact(IMPACT.national.checkersGive5)} still leaving a large commercial pool for
              retailers (front margin is not net profit).
            </div>
            <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-2 sm:p-2.5 text-[#404040] leading-snug">
              <strong className="text-black">Community takeaway:</strong> ~{" "}
              {Math.round(IMPACT.national.mealEquivalents).toLocaleString("en-ZA")} meal equivalents
              sold into homes · + ~{Math.round(IMPACT.national.donatedMeals).toLocaleString("en-ZA")}{" "}
              meals via assumed 2% donation volume · foundations receive ~{" "}
              <span className="whitespace-nowrap font-semibold text-black">
                {formatZarCompact(IMPACT.national.combined10)}
              </span>{" "}
              (10% model). Pilot at 5% of network: ~{IMPACT.pilot.stores} stores ·{" "}
              {formatZarCompact(IMPACT.pilot.checkersFrontMargin)} front margin ·{" "}
              {Math.round(IMPACT.pilot.peopleFedOneMealDay).toLocaleString("en-ZA")} people-fed
              metric.
            </div>
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FOUNDATION · 01 · Checkers STANDS WITH</DeckEyebrow>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <div
              className={`relative bg-white rounded-xl border border-black/10 shrink-0 ${
                forPrint ? "h-16 w-16" : "h-20 w-20 sm:h-24 sm:w-24"
              }`}
            >
              <DeckPrintImage
                src={P.npos[0]!.logoSrc}
                alt={P.npos[0]!.name}
                paddingClass="p-1.5"
                fit="contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <DeckTitle>{P.npos[0]!.name}</DeckTitle>
              <p
                className={`text-[#737373] font-medium ${
                  forPrint ? "text-[10px] -mt-2 mb-2" : "text-sm -mt-3 mb-3"
                }`}
              >
                {P.npos[0]!.role}
              </p>
            </div>
          </div>
          <p
            className={`text-[#404040] max-w-3xl mb-3 ${
              forPrint ? "text-[11px]" : "text-sm"
            } leading-relaxed`}
          >
            {P.npos[0]!.summary}
          </p>
          {"verse" in P.npos[0]! && P.npos[0].verse && (
            <blockquote
              className={`max-w-3xl mb-3 rounded-xl border border-sky-100 bg-sky-50/40 ${
                forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"
              } text-[#404040] leading-relaxed`}
            >
              <p className="italic">
                “{P.npos[0].verse.text}”
              </p>
              <footer className="mt-2 not-italic font-semibold text-black">
                — {P.npos[0].verse.ref}
              </footer>
            </blockquote>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {P.npos[0]!.focus.map((f) => (
              <span
                key={f}
                className={`rounded-full border border-sky-200 bg-sky-50 font-semibold ${
                  forPrint ? "text-[9px] px-2 py-0.5" : "text-xs px-2.5 py-1"
                }`}
                style={{ color: theme.accentDark }}
              >
                {f}
              </span>
            ))}
          </div>
          <div
            className={`rounded-xl border border-black/10 bg-[#fafafa] ${
              forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"
            } text-[#404040] leading-relaxed`}
          >
            <strong className="text-black">Checkers’ role:</strong> Sell packs that fund care — and
            donate product into child- and community-facing programmes. SA Harvest can deliver
            Checkers-donated product into RAF feeding pathways so meals arrive with reliability.
          </div>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FOUNDATION · 02 · Checkers STANDS WITH</DeckEyebrow>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <div
              className={`relative bg-white rounded-xl border border-black/10 shrink-0 ${
                forPrint ? "h-14 w-40" : "h-16 sm:h-20 w-48 sm:w-56"
              }`}
            >
              <DeckPrintImage
                src={P.npos[1]!.logoSrc}
                alt={P.npos[1]!.name}
                paddingClass="p-2"
                fit="contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <DeckTitle>{P.npos[1]!.name}</DeckTitle>
              <p
                className={`text-[#737373] font-medium ${
                  forPrint ? "text-[10px] -mt-2 mb-2" : "text-sm -mt-3 mb-3"
                }`}
              >
                {P.npos[1]!.role}
              </p>
            </div>
          </div>
          <p
            className={`text-[#404040] max-w-3xl mb-4 ${
              forPrint ? "text-[11px]" : "text-sm"
            } leading-relaxed`}
          >
            {P.npos[1]!.summary}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {P.npos[1]!.focus.map((f) => (
              <span
                key={f}
                className={`rounded-full border border-sky-200 bg-sky-50 font-semibold ${
                  forPrint ? "text-[9px] px-2 py-0.5" : "text-xs px-2.5 py-1"
                }`}
                style={{ color: theme.accentDark }}
              >
                {f}
              </span>
            ))}
          </div>
          <div
            className={`rounded-xl border border-black/10 bg-[#fafafa] ${
              forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"
            } text-[#404040] leading-relaxed`}
          >
            <strong className="text-black">Checkers’ role:</strong> Dignity on the plate for women and
            children in care pathways — product donations and contribution support that Checkers
            communities can understand and champion. SA Harvest can deliver product into AHTH
            feeding pathways.
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>DELIVERY PARTNER · 03 · SA HARVEST</DeckEyebrow>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <div className="relative bg-white rounded-xl border border-black/10 shrink-0 h-16 sm:h-20 w-40 sm:w-52">
              <DeckPrintImage
                src={P.npos[2]!.logoSrc}
                alt={P.npos[2]!.name}
                paddingClass="p-2"
                fit="contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <DeckTitle>{P.npos[2]!.name}</DeckTitle>
              <p className="text-[#737373] font-medium text-sm -mt-3 mb-3">{P.npos[2]!.role}</p>
            </div>
          </div>
          <p className="text-[#404040] max-w-3xl mb-4 text-sm leading-relaxed">{P.npos[2]!.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {P.npos[2]!.focus.map((f) => (
              <span
                key={f}
                className="rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold px-2.5 py-1"
                style={{ color: theme.accentDark }}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
            {[
              {
                t: "Soup kitchens & community kitchens",
                d: "Reliable last-mile so Checkers-donated fortified food reaches local kitchens that feed daily.",
              },
              {
                t: "Institutional & community feeding schemes",
                d: "Routes into established schemes that need predictable product, not one-off drops.",
              },
              {
                t: "Restore Africa Foundation",
                d: "Delivers into RAF child- and school-linked feeding and community rebuild programmes.",
              },
              {
                t: "A Heart To Help",
                d: "Supports AHTH residential and community feeding pathways with dignified delivery.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3 sm:p-4 min-w-0"
              >
                <div className="text-sm font-semibold text-black mb-1">{x.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-3 sm:p-4 text-sm text-[#404040] leading-relaxed">
            <strong className="text-black">How the chain works:</strong> Checkers sells or donates · Big
            Five Foods supplies · <strong className="text-black">SA Harvest delivers</strong> to soup
            kitchens, feeding schemes, Restore Africa Foundation and A Heart To Help — so impact is
            operational, not only aspirational.
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHAT Checkers WINS</DeckEyebrow>
          <DeckTitle>Good for the brand. Good for the store. Good for the community.</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {P.outcomes.map((o) => (
              <div
                key={o.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div
                  className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}
                >
                  {o.t}
                </div>
                <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                  {o.d}
                </p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="shrink-0">
              <DeckEyebrow theme={theme}>PRODUCT Checkers CAN TRUST</DeckEyebrow>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2 sm:mb-3">
                Fortified African food ready for Checkers shelves and foundations
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 shrink-0 mb-2 sm:mb-3">
              {P.productCredibility.map((w) => (
                <div
                  key={w.t}
                  className="rounded-xl border border-black/10 bg-[#fafafa] min-w-0 p-2 sm:p-3"
                >
                  <div className="text-[10px] sm:text-xs font-semibold text-black mb-0.5">{w.t}</div>
                  <p className="text-[9px] sm:text-[10px] text-[#525252] leading-snug line-clamp-2">
                    {w.d}
                  </p>
                </div>
              ))}
            </div>

            {/* One product image per category (different packs from Mandela Pack range slide) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-0 content-start">
              {PRODUCT_SHOTS.map((s) => (
                <div key={s.src} className="min-w-0 flex flex-col">
                  <div className="w-full aspect-[2/3] max-h-[15rem] sm:max-h-[16.5rem] rounded-xl border border-black/8 bg-[#f8f7f5] flex items-center justify-center p-2.5 sm:p-3.5 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={`${s.name} — ${s.flavour}`}
                      className="max-h-full max-w-full w-auto h-auto object-contain object-center"
                      loading={pdf ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="text-center mt-1.5 shrink-0">
                    <div className="text-[10px] sm:text-xs font-semibold text-black leading-tight">
                      {s.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#737373] leading-tight">
                      {s.flavour}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[9px] sm:text-[10px] text-[#737373] leading-snug mt-2 shrink-0">
              One pack per category (different SKUs from the Mandela Pack range slide) ·
              bigfivegroup.africa/foods
            </p>
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GOVERNANCE</DeckEyebrow>
          <DeckTitle>Protect Checkers’ reputation while the good scales</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              {
                icon: Scale,
                t: "Term sheet first",
                d: "SKUs, R45 / R67, Checkers margin discipline, 5%+5% giving, NPO split, brand use for Checkers-led storytelling.",
              },
              {
                icon: Building2,
                t: "Transparent reporting Checkers can share",
                d: "Quarterly: units sold, packs donated, rand to each foundation, foundation stories and photos.",
              },
              {
                icon: HandHeart,
                t: "NPO MOUs",
                d: "Restore Africa Foundation, A Heart To Help and SA Harvest (delivery) receive under simple agreements — product, funds and last-mile routes for agreed care programmes.",
              },
              {
                icon: Target,
                t: "Honest customer claims",
                d: "Shelf and campaign copy celebrates Checkers doing good without over-claiming meal counts until yields are locked.",
              },
            ].map((it) => (
              <div
                key={it.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <it.icon
                  className={`mb-2 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.accentDark }}
                />
                <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}>
                  {it.t}
                </div>
                <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                  {it.d}
                </p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ROADMAP</DeckEyebrow>
          <DeckTitle>From Checkers pilot to a national rhythm of good</DeckTitle>
          <div className="flex flex-col gap-2 max-w-2xl">
            {P.roadmap.map((r) => (
              <div key={r.n} className="flex gap-3 items-start">
                <span
                  className="shrink-0 w-8 h-8 rounded-full text-white text-xs font-semibold flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {r.n}
                </span>
                <div
                  className={`flex-1 rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                    forPrint ? "p-2" : "p-3"
                  }`}
                >
                  <div className={`font-semibold text-black ${forPrint ? "text-xs" : "text-sm"}`}>
                    {r.t}
                  </div>
                  <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                    {r.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HONESTY LABELS</DeckEyebrow>
          <DeckTitle>What we will put in writing with Checkers</DeckTitle>
          <ul className={forPrint ? "space-y-1.5" : "space-y-2"}>
            {P.honesty.map((h) => (
              <li
                key={h}
                className={`flex gap-2 rounded-xl border border-sky-100 bg-sky-50/50 text-[#404040] ${
                  forPrint ? "p-2 text-[10px]" : "p-3 text-sm"
                }`}
              >
                <span className="text-sky-900 shrink-0 font-semibold">·</span>
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
        </DeckSlideShell>
      );

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE ASK</DeckEyebrow>
          <DeckTitle>Help Checkers lead — five decisions to start</DeckTitle>
          <ol className={forPrint ? "space-y-1.5" : "space-y-2"}>
            {[
              "Pilot listing of the Nelson Mandela pack (and agreed SKUs) in selected Checkers clusters",
              "Approve trade R45 ex. VAT and RRP R67 incl. VAT — with Checkers front-margin discipline",
              "Adopt Checkers 5% + Big Five Foods 5% giving to Restore Africa Foundation and A Heart To Help",
              "Authorise donation PO pathway with SA Harvest last-mile delivery to soup kitchens, feeding schemes, RAF and AHTH",
              "Nominate Checkers commercial + CSI leads for a 30-day term-sheet and campaign sprint",
            ].map((a, i) => (
              <li key={a} className="flex gap-2.5 items-start">
                <span
                  className="shrink-0 w-6 h-6 rounded-full text-white text-[10px] font-semibold flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[#404040] leading-relaxed pt-0.5 ${
                    forPrint ? "text-[11px]" : "text-sm"
                  }`}
                >
                  {a}
                </span>
              </li>
            ))}
          </ol>
        </DeckSlideShell>
      );

    case 19:
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
                  "linear-gradient(105deg, #000e2ef5 0%, #001C5Aeb 45%, #000e2ea6 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000a1f] via-transparent to-black/30" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    NEXT STEP · Checkers DOES GOOD
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2
                    className={`font-semibold tracking-tighter leading-[1.05] text-white text-balance max-w-3xl ${
                      forPrint ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"
                    }`}
                  >
                    Let Checkers be known for
                    <br />
                    <span style={{ color: theme.gradientFrom }}>feeding hope — every week.</span>
                  </h2>
                  <p
                    className={`text-white/75 max-w-2xl mt-4 ${
                      forPrint ? "text-xs" : "text-sm sm:text-base"
                    } leading-relaxed`}
                  >
                    Healthy Checkers margin · Mandela pack at R67 · 10% to foundations · sell or donate ·
                    Big Five Foods as product partner behind Checkers’ story of good.
                  </p>
                  <MandelaQuote light compact={forPrint || pdf} />
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "Checkers × Big Five Foods — Checkers does good partnership"
                    )}&body=${encodeURIComponent(
                      "Hello Big Five team,\n\nI would like to progress the Checkers partnership (Mandela pack, Checkers margin, 10% foundations model).\n\nName:\nRole / region:\nPreferred pilot stores:\n\nThank you."
                    )}`}
                    className={`deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold ${
                      forPrint ? "px-4 py-2 text-xs" : "px-6 py-3.5 text-sm sm:text-base"
                    }`}
                    style={{ color: "#000000" }}
                  >
                    Email {P.contactEmail}
                    <ArrowRight className={forPrint ? "w-3.5 h-3.5" : "w-4 h-4"} />
                  </a>
                  <div className={`text-white/45 ${forPrint ? "text-[9px]" : "text-xs"}`}>
                    bigfivegroup.africa/foods · /partner/checkers#checkers-partnership-deck · Confidential
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

export default function CheckersPartnershipDeck() {
  return (
    <div id="checkers-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#001C5A]/20 px-3 py-1 shadow-sm">
            <DeckPrintImage src="/partners/checkers-logo-on-white.png" alt="Checkers" paddingClass="p-1" fit="contain" />
          </div>
        </div>
        <div
          className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold"
          style={{ color: "#001C5A" }}
        >
          CHECKERS PARTNERSHIP PRESENTATION · {TOTAL} SLIDES · PRIVATE · CHECKERS ONLY
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          Checkers does good — partnership deck
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Private briefing for Checkers: store margin, Mandela pack pricing, sell-or-donate pathways,
          10% to foundations — with Checkers as the face of community good.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="checkers-partnership-deck-shell"
          printRootId="checkers-partnership-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="CHECKERS PARTNERSHIP DECK"
          title="Checkers does good — Partnership Presentation"
          description="Checkers-led narrative: store margin, Mandela pack, 10% to NPOs, sell or donate."
          sharePath="/partner/checkers#checkers-partnership-deck"
          shareTitle="Checkers does good — partnership"
          shareText="Checkers partnership briefing: fortified food on shelf, healthy store margin, 10% to foundations."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → · Private to Checkers partner logins ·{" "}
        <span className="font-medium text-black">/partner/checkers#checkers-partnership-deck</span>
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> — choose{" "}
        <strong className="text-black">Save as PDF</strong>.
      </p>
    </div>
  );
}
