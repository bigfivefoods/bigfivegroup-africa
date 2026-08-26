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
  SPAR_PARTNERSHIP,
  buildSparImpactReport,
  formatZarCompact,
} from "../lib/sparPartnership";

const theme = DECK_THEMES.spar;
/** Condensed SPAR briefing — full deck remains at #spar-partnership-deck */
const TOTAL = 11;
const P = SPAR_PARTNERSHIP;
const M = P.sparMargin;
const RANGES = P.mandelaPackRanges;
const IMPACT = buildSparImpactReport();

function CoBrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const sparSrc = "/partners/spar-logo.png";
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 max-w-full">
      <div
        className={`relative h-11 sm:h-14 w-[8.5rem] sm:w-44 shrink-0 bg-white rounded-xl px-2.5 py-1 border-2 shadow-sm overflow-hidden ${
          light ? "border-white/40" : "border-[#006633]/25"
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={sparSrc} alt="SPAR" paddingClass="p-1" fit="contain" />
        ) : (
          <Image src={sparSrc} alt="SPAR" fill className="object-contain p-1" sizes="176px" priority />
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
      style={{ borderColor: "#7ddea8" }}
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
        style={{ color: light ? "#7ddea8" : "#006633", fontStyle: "normal" }}
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
                  "linear-gradient(105deg, #002916f2 0%, #004d26e6 42%, #00291699 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a0e]/95 via-transparent to-black/25" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    SPAR SOUTH AFRICA · CONDENSED BRIEFING · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    When SPAR does good,
                    <br />
                    <span style={{ color: "#7ddea8" }}>the whole community feels it.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    Condensed partnership brief: Mandela pack on SPAR shelves, healthy store margin
                    (R45 / R67), 10% to foundations — sell with purpose or donate with dignity.
                  </p>
                  <MandelaQuote light compact />
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Condensed · {TOTAL} slides · Full deck also available on this page</p>
                  <p>bigfivegroup.africa/partner/spar#spar-partnership-deck-condensed</p>
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
          <DeckTitle>SPAR does good — in {TOTAL} slides</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "Why SPAR leads · Mandela pack products",
              "Pricing & SPAR front margin (R45 / R67)",
              "Sell · donate · 10% to foundations",
              "National impact snapshot · NPOs · SA Harvest",
              "What SPAR wins · governance · the ask",
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
            <a href="#spar-partnership-deck" className="font-semibold underline underline-offset-2 text-black">
              full SPAR partnership deck
            </a>{" "}
            ({20} slides) on this page.
          </p>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            WHY SPAR LEADS
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Communities already trust SPAR. This partnership makes that trust feed people.
            </span>
          </DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2">
            {[
              {
                icon: Store,
                t: "SPAR is already in the community",
                d: "Independent retailers sit where people live — purpose needs a SPAR shelf, not a new warehouse.",
              },
              {
                icon: Users,
                t: "Shoppers want to feel proud",
                d: "A R67 Mandela pack is a weekly choice with a story: SPAR feeds families and supports foundations.",
              },
              {
                icon: Heart,
                t: "CSI customers can see",
                d: "Product donated and sell-through that funds care — not only a donation cheque.",
              },
              {
                icon: Target,
                t: "Reputation that compounds",
                d: "Every pack strengthens SPAR as the retailer that does good — commercially healthy, publicly proud.",
              },
            ].map((p) => (
              <div
                key={p.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <p.icon className={`mb-2 text-emerald-300 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`} />
                <div className={`font-semibold text-emerald-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {p.t}
                </div>
                <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
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
                  <div className="relative w-full h-[8.5rem] sm:h-[10.5rem] md:h-[12rem] rounded-xl border border-black/8 bg-[#f8f7f5] overflow-hidden">
                    <DeckPrintImage
                      src={range.heroImage}
                      alt={range.title}
                      paddingClass="p-3 sm:p-4"
                      fit="contain"
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
            className={`mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 ${
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
          <DeckEyebrow theme={theme}>PRICING · SPAR MARGIN</DeckEyebrow>
          <DeckTitle>Two pack tiers — clear SPAR front margin on each</DeckTitle>
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
                    <div className="text-[9px] font-semibold uppercase text-emerald-300/90">Buy</div>
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
                  <div className="p-3 border-l border-emerald-100 bg-emerald-50/80">
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
            <strong className="text-black">For SPAR retailers:</strong> {M.detail}
          </p>
          <p className="mt-2 text-[11px] text-[#737373]">{M.honesty}</p>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW SPAR DOES GOOD</DeckEyebrow>
          <DeckTitle>Sell · donate · 10% ring-fenced for foundations</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 mb-3">
            {[
              { icon: ShoppingCart, ...P.pathways[0]! },
              { icon: Gift, ...P.pathways[1]! },
              { icon: HandHeart, ...P.pathways[2]! },
            ].map((path) => (
              <div
                key={path.id}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <path.icon
                  className={`mb-2 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ color: theme.accentDark }}
                />
                <div className="text-sm font-semibold text-black mb-1">{path.title}</div>
                <p className="text-xs text-[#525252] leading-snug">{path.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
            <div className="text-[10px] font-bold tracking-wide uppercase mb-1" style={{ color: theme.accentDark }}>
              10% model · SPAR 5% + Big Five Foods 5%
            </div>
            <p className="text-sm text-[#404040] leading-relaxed">{P.giving.detail}</p>
            <p className="text-[11px] text-[#737373] mt-2">{P.giving.bases.spar}</p>
            <p className="text-[11px] text-[#737373]">{P.giving.bases.foods}</p>
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>IMPACT · NATIONAL SNAPSHOT</DeckEyebrow>
          <DeckTitle>Illustrative scale across SPAR South Africa</DeckTitle>
          <p className="text-[10px] sm:text-xs text-[#525252] mb-3 max-w-3xl leading-snug">
            Network: {IMPACT.networkSource.claim} · modelled {IMPACT.networkSource.storeCountAnchor}{" "}
            stores. Planning assumptions only.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <DeckStatTile
              theme={theme}
              value={IMPACT.national.stores.toLocaleString("en-ZA")}
              label="Stores modelled (850+ SPAR SA)"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarCompact(IMPACT.national.sparFrontMargin)}
              label="SPAR front margin pool / year"
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
            {formatZarCompact(IMPACT.pilot.sparFrontMargin)} front margin · full tables in the{" "}
            <a href="#spar-partnership-deck" className="font-semibold underline underline-offset-2">
              full deck
            </a>
            .
          </p>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHO SPAR STANDS WITH</DeckEyebrow>
          <DeckTitle>Foundations + last-mile delivery</DeckTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-1">
            {P.npos.map((n) => (
              <div
                key={n.name}
                className="rounded-2xl border border-black/10 bg-white p-4 min-w-0 flex flex-col"
              >
                <div className="relative h-12 w-full mb-3">
                  {pdf ? (
                    <DeckPrintImage src={n.logoSrc} alt={n.name} fit="contain" />
                  ) : (
                    <Image
                      src={n.logoSrc}
                      alt={n.name}
                      fill
                      className="object-contain object-left"
                      sizes="180px"
                    />
                  )}
                </div>
                <div className="text-[10px] font-bold tracking-wide uppercase text-emerald-800 mb-1">
                  {n.role}
                </div>
                <h3 className="text-sm font-semibold text-black mb-1.5 leading-snug">{n.name}</h3>
                <p className="text-[11px] text-[#525252] leading-snug flex-1 line-clamp-5">
                  {n.summary}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#525252] leading-relaxed">
            <strong className="text-black">Chain:</strong> SPAR sells or donates · Big Five Foods
            supplies · SA Harvest delivers to soup kitchens, feeding schemes and the foundations.
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHAT SPAR WINS</DeckEyebrow>
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
                d: "SKUs, R45 / R67, margin discipline, 5%+5% giving, NPO split, SPAR brand story.",
              },
              {
                icon: Building2,
                t: "Transparent reporting",
                d: "Quarterly units sold, packs donated, rand to each foundation, stories SPAR can share.",
              },
            ].map((it) => (
              <div
                key={it.t}
                className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 flex gap-2 min-w-0"
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
          <DeckTitle>Help SPAR lead — five decisions to start</DeckTitle>
          <ol className="space-y-2.5 max-w-2xl mt-1">
            {[
              "Pilot listing of the Nelson Mandela pack (and agreed SKUs) in selected SPAR clusters",
              "Approve trade R45 ex. VAT and RRP R67 incl. VAT — with SPAR front-margin discipline",
              "Adopt SPAR 5% + Big Five Foods 5% giving to Restore Africa Foundation and A Heart To Help",
              "Authorise donation PO pathway with SA Harvest last-mile delivery to soup kitchens, feeding schemes, RAF and AHTH",
              "Nominate SPAR commercial + CSI leads for a 30-day term-sheet and campaign sprint",
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
                  "linear-gradient(105deg, #002916f2 0%, #004d26e6 50%, #001a0ecc 100%)",
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
                    Help SPAR lead —
                    <br />
                    <span style={{ color: "#7ddea8" }}>commercially sound. Visibly good.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl text-sm leading-relaxed mb-5">
                    Healthy SPAR margin · Mandela pack at R67 · 10% to foundations · sell or donate.
                  </p>
                  <MandelaQuote light compact />
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "SPAR × Big Five Foods — condensed partnership brief"
                    )}`}
                    className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                    style={{ color: "#000000" }}
                  >
                    Email {P.contactEmail}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="text-white/45 text-xs">
                    Full deck: /partner/spar#spar-partnership-deck · Condensed: #spar-partnership-deck-condensed
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

export default function SparPartnershipDeckCondensed() {
  return (
    <div id="spar-partnership-deck-condensed" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#006633]/20 px-3 py-1 shadow-sm">
            <DeckPrintImage src="/partners/spar-logo.png" alt="SPAR" paddingClass="p-1" fit="contain" />
          </div>
        </div>
        <div
          className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-semibold"
          style={{ color: "#006633" }}
        >
          SPAR CONDENSED BRIEFING · {TOTAL} SLIDES · PRIVATE · SPAR ONLY
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          SPAR does good — condensed deck
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Shorter briefing for SPAR: margin, Mandela pack, 10% foundations, impact snapshot and the
          ask. The{" "}
          <a href="#spar-partnership-deck" className="font-semibold text-black underline underline-offset-2">
            full 20-slide deck
          </a>{" "}
          remains below for deep-dive sessions.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="spar-partnership-deck-condensed-shell"
          printRootId="spar-partnership-deck-condensed-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="SPAR CONDENSED DECK"
          title="SPAR does good — Condensed Partnership Briefing"
          description="Condensed SPAR briefing: R45/R67 margin, Mandela pack, 10% foundations, impact snapshot."
          sharePath="/partner/spar#spar-partnership-deck-condensed"
          shareTitle="SPAR does good — condensed briefing"
          shareText="Condensed SPAR partnership brief: Mandela pack, store margin, 10% to foundations."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → ·{" "}
        <span className="font-medium text-black">/partner/spar#spar-partnership-deck-condensed</span>
        {" · "}
        Full deck:{" "}
        <a href="#spar-partnership-deck" className="font-medium text-black underline underline-offset-2">
          #spar-partnership-deck
        </a>
      </p>
    </div>
  );
}
