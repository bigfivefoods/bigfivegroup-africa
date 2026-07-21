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
  DeckSlideShell,
  DeckStatTile,
  DeckTitle,
  DeckTitleLayout,
  useDeckPrintMode,
} from "./deck/DeckShell";
import {
  SPAR_PARTNERSHIP,
  formatZar,
  formatZarPrecise,
} from "../lib/sparPartnership";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";

const theme = DECK_THEMES.amber;
const TOTAL = 17;
const P = SPAR_PARTNERSHIP;
const EX = P.giving.example;

const PRODUCT_SHOTS = [
  { src: "/foods/porridge-chocolate.jpg", name: "Porridge" },
  { src: "/foods/soya-beef.jpg", name: "Soya mince" },
  { src: "/foods/onepot-chakalaka.jpg", name: "One-pot" },
  { src: "/foods/soup-chicken.jpg", name: "Soup" },
] as const;

function ProductThumb({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/8 bg-[#f8f7f5] min-h-0 min-w-0 ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-contain object-center p-1.5" sizes="160px" />
    </div>
  );
}

function CoBrandRow({ light }: { light?: boolean }) {
  const forPrint = useDeckPrintMode();
  const h = forPrint ? "h-10" : "h-12 sm:h-14";
  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${forPrint ? "mb-2" : "mb-4 sm:mb-5"}`}>
      <div
        className={`relative ${h} w-28 sm:w-36 bg-white rounded-lg px-2 py-1 border ${
          light ? "border-white/30" : "border-black/10"
        }`}
      >
        <Image
          src="/partners/spar-logo.png"
          alt="SPAR"
          fill
          className="object-contain p-1"
          sizes="144px"
          priority
        />
      </div>
      <span className={`text-xl font-light ${light ? "text-white/40" : "text-black/25"}`}>×</span>
      <div className={`relative ${h} w-28 sm:w-40`}>
        <Image
          src={light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png"}
          alt="Big Five Foods"
          fill
          className="object-contain object-left"
          sizes="160px"
          priority
        />
      </div>
    </div>
  );
}

function Slide({ index }: { index: number }) {
  const forPrint = useDeckPrintMode();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            <Image
              src="/foods-hero.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width:1280px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    SPAR × BIG FIVE FOODS · PARTNERSHIP PRESENTATION · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2
                    className={`font-semibold tracking-tighter leading-[1.05] text-white text-balance max-w-3xl ${
                      forPrint ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"
                    }`}
                  >
                    Feed the nation from the SPAR shelf.
                    <br />
                    <span style={{ color: theme.gradientFrom }}>
                      Fund the foundations that heal it.
                    </span>
                  </h2>
                  <p
                    className={`text-white/75 max-w-2xl mt-4 ${
                      forPrint ? "text-xs" : "text-sm sm:text-base"
                    } leading-relaxed`}
                  >
                    Fortified Big Five Foods at SPAR · R45 trade (ex. VAT) · R67 RRP (incl. VAT ·
                    Nelson Mandela pack) · 10% of turnover (SPAR 5% + Big Five Foods 5%) to Restore
                    Africa Foundation and A Heart To Help.
                  </p>
                </div>
                <div
                  className={`text-white/45 space-y-1 ${
                    forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                  }`}
                >
                  <p>Retail nutrition partnership · sell or donate</p>
                  <p>bigfivegroup.africa · /partner/spar#spar-partnership-deck</p>
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
          <DeckTitle>What this SPAR partnership briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1 max-w-2xl" : "space-y-2 max-w-2xl"}>
            {[
              "Why food security needs retail + fortified product + NPOs",
              "Why SPAR — footprint, shoppers, CSI that compounds",
              "Nelson Mandela pack pricing · R45 trade · R67 RRP",
              "Dual pathways: sell to customers · donate to foundations",
              "The 10% model · SPAR 5% + Big Five Foods 5%",
              "Worked economics · Restore Africa Foundation · A Heart To Help",
              "Why Big Five Foods · governance · roadmap · the ask",
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
            THE OPPORTUNITY
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Africa needs fortified food at scale — not another poster campaign
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl mb-5 leading-relaxed ${
              forPrint ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            Hunger shows up in the same aisles as the weekly shop. SPAR and Big Five Foods can put
            nutrition on the shelf, fund feeding, and support NPOs that restore dignity in KZN and
            beyond.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              {
                t: "Hunger is retail-shaped",
                d: "Families buy where they trust the store. Purpose must live next to price and convenience.",
              },
              {
                t: "Malnutrition is not only calories",
                d: "Stunting and hidden hunger need fortified staples — not only larger empty portions.",
              },
              {
                t: "NPOs need product + capital",
                d: "Foundations delivering care need predictable food and rand-flow, not one-off charity dumps.",
              },
              {
                t: "Purpose needs a commercial engine",
                d: "CSI unattached to a sellable product dies at budget cut. This model is shelf-funded.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div
                  className={`font-semibold text-amber-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}
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
          <DeckEyebrow theme={theme}>WHY SPAR</DeckEyebrow>
          <DeckTitle>SPAR is the natural retail partner for African food security</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
            {[
              {
                icon: Store,
                t: "National footprint, local stores",
                d: "Independent retailers sit inside communities — perfect last metre for fortified staples and Mandela campaigns.",
              },
              {
                icon: Users,
                t: "Shoppers who care",
                d: "Customers respond to value and purpose. A R67 Mandela pack is a purchase with a story.",
              },
              {
                icon: Heart,
                t: "CSI that compounds",
                d: "Link every pack to foundations SPAR communities can name — Restore Africa Foundation and A Heart To Help.",
              },
              {
                icon: Target,
                t: "Competitive differentiation",
                d: "Own a fortified African nutrition lane with transparent 10% giving — not generic house-brand CSI.",
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
          <DeckEyebrow theme={theme}>PRODUCT · NELSON MANDELA PACK</DeckEyebrow>
          <DeckTitle>Clear trade and retail prices SPAR can execute</DeckTitle>
          <p
            className={`text-[#525252] mb-4 max-w-3xl leading-relaxed ${
              forPrint ? "text-[11px]" : "text-sm"
            }`}
          >
            {P.product.vatNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div
              className={`rounded-2xl border border-black/10 bg-[#0a0a0a] text-white ${
                forPrint ? "p-3" : "p-5 sm:p-6"
              }`}
            >
              <div
                className={`font-semibold tracking-wide uppercase text-amber-300/90 ${
                  forPrint ? "text-[9px]" : "text-[10px]"
                }`}
              >
                SPAR cost · trade
              </div>
              <div
                className={`font-semibold tracking-tighter tabular-nums ${
                  forPrint ? "text-3xl" : "text-4xl sm:text-5xl"
                }`}
              >
                {P.product.tradePriceExVatLabel}
              </div>
              <div className={`text-white/60 ${forPrint ? "text-[10px]" : "text-sm"}`}>
                exclusive of VAT · Big Five Foods → SPAR
              </div>
            </div>
            <div
              className={`rounded-2xl border-2 bg-white ${forPrint ? "p-3" : "p-5 sm:p-6"}`}
              style={{ borderColor: theme.accent }}
            >
              <div
                className={`font-semibold tracking-wide uppercase ${
                  forPrint ? "text-[9px]" : "text-[10px]"
                }`}
                style={{ color: theme.accentDark }}
              >
                Recommended retail · Mandela pack
              </div>
              <div
                className={`font-semibold tracking-tighter tabular-nums text-black ${
                  forPrint ? "text-3xl" : "text-4xl sm:text-5xl"
                }`}
              >
                {P.product.rrpInclVatLabel}
              </div>
              <div className={`text-[#525252] ${forPrint ? "text-[10px]" : "text-sm"}`}>
                inclusive of VAT · shelf price to SPAR customers
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {PRODUCT_SHOTS.map((s) => (
              <div key={s.src} className="min-w-0">
                <ProductThumb
                  src={s.src}
                  alt={s.name}
                  className={forPrint ? "aspect-square h-16" : "aspect-square h-20 sm:h-24"}
                />
                <div
                  className={`text-center text-[#737373] mt-1 ${
                    forPrint ? "text-[8px]" : "text-[10px]"
                  }`}
                >
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW IT WORKS</DeckEyebrow>
          <DeckTitle>Two routes to impact — one partnership</DeckTitle>
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
            logistics — not ad-hoc stock dumps. Sell-through funds the SPAR 5% contribution every
            week the product moves.
          </p>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            THE 10% MODEL
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">SPAR 5% + Big Five Foods 5% = 10% to the foundations</span>
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
              label="SPAR of retail sell-through (at RRP R67)"
            />
            <DeckStatTile
              dark
              theme={theme}
              value="5%"
              label="Big Five Foods of trade turnover (at R45 ex. VAT)"
            />
            <DeckStatTile
              dark
              theme={theme}
              value="10%"
              label="Combined ring-fence to NPO feeding initiatives"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              className={`rounded-xl border border-white/10 bg-white/[0.06] ${
                forPrint ? "p-2.5" : "p-4"
              }`}
            >
              <div className={`font-semibold text-amber-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                SPAR contribution base
              </div>
              <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                {P.giving.bases.spar}
              </p>
            </div>
            <div
              className={`rounded-xl border border-white/10 bg-white/[0.06] ${
                forPrint ? "p-2.5" : "p-4"
              }`}
            >
              <div className={`font-semibold text-amber-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                Big Five Foods contribution base
              </div>
              <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                {P.giving.bases.foods}
              </p>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>UNIT ECONOMICS · ILLUSTRATIVE</DeckEyebrow>
          <DeckTitle>What one pack and 100,000 packs can unlock</DeckTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <DeckStatTile
              theme={theme}
              value={formatZarPrecise(P.giving.perUnitIllustrative.atRrp.spar)}
              label="SPAR 5% per pack @ R67 RRP"
            />
            <DeckStatTile
              theme={theme}
              value={formatZarPrecise(P.giving.perUnitIllustrative.atTrade.foods)}
              label="Foods 5% per pack @ R45 trade"
            />
            <DeckStatTile
              theme={theme}
              value={formatZar(EX.sparContribution)}
              label="SPAR at 100k packs (5% of RRP)"
            />
            <DeckStatTile
              theme={theme}
              value={formatZar(EX.foodsContribution)}
              label="Foods at 100k packs (5% of trade)"
            />
          </div>
          <div
            className={`rounded-2xl border border-black/10 bg-[#0a0a0a] text-white ${
              forPrint ? "p-3" : "p-5 sm:p-6"
            }`}
          >
            <div
              className={`text-amber-300/90 uppercase tracking-wide font-semibold ${
                forPrint ? "text-[9px]" : "text-[10px]"
              }`}
            >
              {EX.label}
            </div>
            <div
              className={`font-semibold tracking-tighter tabular-nums ${
                forPrint ? "text-2xl" : "text-3xl sm:text-4xl"
              }`}
              style={{ color: theme.gradientFrom }}
            >
              {formatZar(EX.sparContribution + EX.foodsContribution)}
            </div>
            <p className={`text-white/65 mt-1 ${forPrint ? "text-[10px]" : "text-sm"} leading-relaxed`}>
              Combined illustrative ring-fence (SPAR 5% of {formatZar(EX.sparRetailTurnover)} RRP
              sell-through + Foods 5% of {formatZar(EX.foodsTradeTurnover)} trade). Not a forecast —
              a model for the term sheet.
            </p>
          </div>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NPO PARTNER · 01</DeckEyebrow>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <div
              className={`relative bg-white rounded-xl border border-black/10 shrink-0 ${
                forPrint ? "h-14 w-40" : "h-16 sm:h-20 w-48 sm:w-56"
              }`}
            >
              <Image
                src={P.npos[0]!.logoSrc}
                alt={P.npos[0]!.name}
                fill
                className="object-contain p-2"
                sizes="224px"
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
            className={`text-[#404040] max-w-3xl mb-4 ${
              forPrint ? "text-[11px]" : "text-sm"
            } leading-relaxed`}
          >
            {P.npos[0]!.summary}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {P.npos[0]!.focus.map((f) => (
              <span
                key={f}
                className={`rounded-full border border-amber-200 bg-amber-50 font-semibold ${
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
            <strong className="text-black">Partnership fit:</strong> Donate fortified product into
            child- and community-facing programmes; use SPAR sell-through contributions to fund
            distribution, school days and rebuild work. Children first — food and skills together.
          </div>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NPO PARTNER · 02</DeckEyebrow>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <div
              className={`relative bg-white rounded-xl border border-black/10 shrink-0 ${
                forPrint ? "h-14 w-40" : "h-16 sm:h-20 w-48 sm:w-56"
              }`}
            >
              <Image
                src={P.npos[1]!.logoSrc}
                alt={P.npos[1]!.name}
                fill
                className="object-contain p-2"
                sizes="224px"
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
                className={`rounded-full border border-amber-200 bg-amber-50 font-semibold ${
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
            <strong className="text-black">Partnership fit:</strong> Residential and community care
            settings need reliable, dignified nutrition. SPAR-donated product and contribution rand
            support healing pathways for women and children while Freedom Farm scales.
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>SHARED OUTCOMES</DeckEyebrow>
          <DeckTitle>What success looks like for SPAR, Foods and the NPOs</DeckTitle>
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

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY BIG FIVE FOODS</DeckEyebrow>
          <DeckTitle>A product partner SPAR can put on shelf with confidence</DeckTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3">
            {[
              {
                value: FOODS_ECONOMICS.cheaperThanMarket.value,
                label: FOODS_ECONOMICS.cheaperThanMarket.label,
              },
              {
                value: FOODS_ECONOMICS.grossProfit.value,
                label: FOODS_ECONOMICS.grossProfit.label,
              },
              {
                value: FOODS_ECONOMICS.nutritionDesign.value,
                label: FOODS_ECONOMICS.nutritionDesign.label,
              },
            ].map((s) => (
              <DeckStatTile key={s.label} theme={theme} value={s.value} label={s.label} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {P.whyFoods.slice(3).map((w) => (
              <div
                key={w.t}
                className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
                  forPrint ? "p-2" : "p-3"
                }`}
              >
                <div className={`font-semibold text-black mb-0.5 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {w.t}
                </div>
                <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-xs"}`}>
                  {w.d}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {PRODUCT_SHOTS.map((s) => (
              <ProductThumb
                key={s.src}
                src={s.src}
                alt={s.name}
                className={forPrint ? "aspect-square h-14" : "aspect-square h-16 sm:h-20"}
              />
            ))}
          </div>
          <p className={`text-[#737373] ${forPrint ? "text-[9px]" : "text-xs"} leading-relaxed`}>
            {FOODS_ECONOMICS.honesty} Full range: bigfivegroup.africa/foods
          </p>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>GOVERNANCE</DeckEyebrow>
          <DeckTitle>Trust is the product as much as the porridge</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              {
                icon: Scale,
                t: "Term sheet first",
                d: "SKUs, prices, 5%+5% bases, NPO split, audit rights, brand use (SPAR + Mandela pack + NPO marks).",
              },
              {
                icon: Building2,
                t: "Transparent reporting",
                d: "Quarterly: units, RRP sell-through, trade turnover, rand to each foundation, donation POs fulfilled.",
              },
              {
                icon: HandHeart,
                t: "NPO MOUs",
                d: "Restore Africa Foundation and A Heart To Help sign simple receiving agreements for product and funds.",
              },
              {
                icon: Target,
                t: "Customer-facing honesty",
                d: "Shelf and campaign copy states the 10% model without over-claiming meal counts until yields are locked.",
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

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ROADMAP</DeckEyebrow>
          <DeckTitle>From pitch to shelf to proof</DeckTitle>
          <div className="flex flex-col gap-2 max-w-2xl">
            {P.roadmap.map((r, i) => (
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
                {i < P.roadmap.length - 1 ? null : null}
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HONESTY LABELS</DeckEyebrow>
          <DeckTitle>What we will put in writing</DeckTitle>
          <ul className={forPrint ? "space-y-1.5" : "space-y-2"}>
            {P.honesty.map((h) => (
              <li
                key={h}
                className={`flex gap-2 rounded-xl border border-amber-100 bg-amber-50/50 text-[#404040] ${
                  forPrint ? "p-2 text-[10px]" : "p-3 text-sm"
                }`}
              >
                <span className="text-amber-800 shrink-0 font-semibold">·</span>
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE ASK</DeckEyebrow>
          <DeckTitle>What we need from SPAR to start</DeckTitle>
          <ol className={forPrint ? "space-y-1.5" : "space-y-2"}>
            {[
              "Pilot listing of Nelson Mandela pack (and agreed SKUs) in selected SPAR clusters",
              "Approve trade R45 ex. VAT and RRP R67 incl. VAT for the campaign pack",
              "Adopt 5% SPAR + 5% Big Five Foods contribution model to the two foundations",
              "Authorise donation PO pathway for CSI / franchisee bulk gifts to NPOs",
              "Nominate SPAR commercial + CSI leads for a 30-day term-sheet sprint",
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

    case 16:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            <Image
              src="/foods-hero.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width:1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    NEXT STEP
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2
                    className={`font-semibold tracking-tighter leading-[1.05] text-white text-balance max-w-3xl ${
                      forPrint ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"
                    }`}
                  >
                    Fortified food on the SPAR shelf —
                    <br />
                    <span style={{ color: theme.gradientFrom }}>purpose in every pack.</span>
                  </h2>
                  <p
                    className={`text-white/75 max-w-2xl mt-4 ${
                      forPrint ? "text-xs" : "text-sm sm:text-base"
                    } leading-relaxed`}
                  >
                    R45 trade · R67 RRP · 10% to Restore Africa Foundation & A Heart To Help · sell
                    or donate · accelerate food security with Big Five Foods.
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "SPAR × Big Five Foods partnership — term sheet"
                    )}&body=${encodeURIComponent(
                      "Hello Big Five team,\n\nI would like to progress the SPAR × Big Five Foods partnership (Mandela pack, R45/R67, 10% model, NPO support).\n\nName:\nRole / region:\nPreferred pilot stores:\n\nThank you."
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
                    bigfivegroup.africa/foods · /partner/spar#spar-partnership-deck · Confidential
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

export default function SparPartnershipDeck() {
  return (
    <div id="spar-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-amber-800 mb-3 font-medium">
          SPAR PARTNERSHIP PRESENTATION · {TOTAL} SLIDES · CONFIDENTIAL
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          SPAR × Big Five Foods — partnership deck
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
          Shareable, printable pitch: Nelson Mandela pack pricing (R45 / R67), dual sell-or-donate
          pathways, 10% turnover model, NPO partners, governance and the commercial ask.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="spar-partnership-deck-shell"
          printRootId="spar-partnership-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="SPAR PARTNERSHIP DECK"
          title="SPAR × Big Five Foods — Partnership Presentation"
          description="Retail partnership: Mandela pack pricing, 10% to NPOs, dual sell/donate pathways."
          sharePath="/partner/spar#spar-partnership-deck"
          shareTitle="SPAR × Big Five Foods partnership"
          shareText="SPAR × Big Five Foods: fortified food on shelf, 10% to Restore Africa Foundation & A Heart To Help."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <p className="mt-4 text-center text-xs text-[#737373] px-4 max-w-2xl mx-auto">
        Keyboard: ← → · Share:{" "}
        <span className="font-medium text-black">/partner/spar#spar-partnership-deck</span>
        {" · "}
        PDF is exact <strong className="text-black">A4</strong> — choose{" "}
        <strong className="text-black">Save as PDF</strong>.
      </p>
    </div>
  );
}
