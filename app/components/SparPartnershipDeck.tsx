"use client";

import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Gift,
  HandHeart,
  Heart,
  Leaf,
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
  type DeckTheme,
} from "./deck/DeckShell";
import {
  SPAR_PARTNERSHIP,
  formatZar,
  formatZarPrecise,
} from "../lib/sparPartnership";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";

const THEME: DeckTheme = DECK_THEMES.emerald;
const P = SPAR_PARTNERSHIP;
const EX = P.giving.example;

function CoBrand({ light }: { light?: boolean }) {
  const forPrint = useDeckPrintMode();
  const h = forPrint ? "h-10" : "h-12 sm:h-14";
  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${forPrint ? "mb-2" : "mb-4"}`}>
      <div className={`relative ${h} w-28 sm:w-36 bg-white rounded-lg px-2 py-1 border border-black/10`}>
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
      <div className={`relative ${h} w-28 sm:w-36`}>
        <Image
          src={light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png"}
          alt="Big Five Foods"
          fill
          className="object-contain object-left"
          sizes="144px"
          priority
        />
      </div>
    </div>
  );
}

function TitleSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell dark theme={THEME} className="!p-0">
      <div className="relative h-full w-full min-h-0">
        <Image
          src="/foods-hero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width:1280px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052e1c]/95 via-[#052e1c]/85 to-[#052e1c]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="relative z-10 h-full">
          <DeckTitleLayout>
            <div className="flex flex-col h-full min-h-0 justify-between">
              <div className="min-w-0 max-w-3xl">
                <DeckEyebrow light theme={THEME}>
                  PARTNERSHIP PITCH · SPAR SOUTH AFRICA
                </DeckEyebrow>
                <CoBrand light />
                <h2
                  className={`font-semibold tracking-tighter leading-[1.05] text-balance text-white ${
                    forPrint
                      ? "text-2xl mb-2"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
                  }`}
                >
                  Feed the nation from the SPAR shelf.
                  <br />
                  <span className="text-emerald-300">Fund the foundations that heal it.</span>
                </h2>
                <p
                  className={`text-white/80 max-w-2xl ${
                    forPrint ? "text-[11px] leading-snug" : "text-sm sm:text-base leading-relaxed"
                  }`}
                >
                  A commercial partnership: Big Five Foods at SPAR, R45 trade (ex. VAT) · R67 RRP
                  (incl. VAT · Nelson Mandela pack) · <strong className="text-white">10% of
                  turnover</strong> (SPAR 5% + Big Five Foods 5%) to Restore Africa Foundation and A
                  Heart To Help.
                </p>
              </div>
              <div
                className={`flex flex-wrap gap-x-4 text-white/50 ${
                  forPrint ? "text-[9px]" : "text-[10px] sm:text-xs"
                }`}
              >
                <span>bigfivegroup.africa</span>
                <span>16 slides</span>
                <span>Private · SPAR partnership</span>
              </div>
            </div>
          </DeckTitleLayout>
        </div>
      </div>
    </DeckSlideShell>
  );
}

function AgendaSlide() {
  const forPrint = useDeckPrintMode();
  const items = [
    "Why this partnership — food security & malnutrition",
    "Why SPAR — retail power with community DNA",
    "The product & Mandela pack pricing (R45 / R67)",
    "Dual pathways: sell to customers · donate to NPOs",
    "The 10% model — SPAR 5% + Big Five Foods 5%",
    "Worked economics & illustrative impact",
    "NPO partners: Restore Africa Foundation · A Heart To Help",
    "Implementation roadmap, governance, next steps",
  ];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>AGENDA</DeckEyebrow>
      <DeckTitle>What this SPAR briefing covers</DeckTitle>
      <ol className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start ${forPrint ? "gap-1.5" : ""}`}>
        {items.map((t, i) => (
          <li
            key={t}
            className={`flex gap-3 rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${
              forPrint ? "p-2" : "p-3 sm:p-4"
            }`}
          >
            <span
              className={`font-semibold tabular-nums shrink-0 ${forPrint ? "text-sm" : "text-base"}`}
              style={{ color: THEME.accentDark }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-[#404040] leading-snug ${forPrint ? "text-[11px]" : "text-sm"}`}>
              {t}
            </span>
          </li>
        ))}
      </ol>
    </DeckSlideShell>
  );
}

function ProblemSlide() {
  const forPrint = useDeckPrintMode();
  const cards = [
    {
      t: "Hunger is retail-shaped",
      d: "Families buy food where they already trust the store. Hunger seasons and empty plates show up in the same aisles as weekly shops.",
    },
    {
      t: "Malnutrition is not only calories",
      d: "Stunting and hidden hunger need fortified, affordable staples — not only larger portions of empty energy.",
    },
    {
      t: "NPOs need product + capital",
      d: "Foundations delivering care cannot run on goodwill alone. Predictable fortified food and rand-flow change programme reliability.",
    },
    {
      t: "Purpose needs a commercial engine",
      d: "CSI that is not attached to a sellable product dies at budget cut. This model is shelf-funded and scalable.",
    },
  ];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>THE OPPORTUNITY</DeckEyebrow>
      <DeckTitle>Africa does not need another charity poster. It needs fortified food at scale.</DeckTitle>
      <p className={`text-[#525252] max-w-3xl mb-4 ${forPrint ? "text-[11px]" : "text-sm"}`}>
        SPAR and Big Five Foods can accelerate food security and malnutrition response while
        supporting NPOs that restore dignity in KZN and beyond.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
        {cards.map((c) => (
          <div
            key={c.t}
            className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${forPrint ? "p-2.5" : "p-4"}`}
          >
            <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}>
              {c.t}
            </div>
            <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
              {c.d}
            </p>
          </div>
        ))}
      </div>
    </DeckSlideShell>
  );
}

function WhySparSlide() {
  const forPrint = useDeckPrintMode();
  const points = [
    {
      icon: Store,
      t: "National footprint, local stores",
      d: "SPAR’s independent retailers sit inside communities — perfect last metre for fortified staples and Mandela campaigns.",
    },
    {
      icon: Users,
      t: "Shoppers who care",
      d: "Customers already respond to value and purpose. A R67 Mandela pack is a purchase with a story.",
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
  ];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>WHY SPAR</DeckEyebrow>
      <DeckTitle>SPAR is the natural retail partner for African food security</DeckTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
        {points.map((p) => (
          <div
            key={p.t}
            className={`rounded-xl border border-emerald-100 bg-emerald-50/40 min-w-0 ${forPrint ? "p-2.5" : "p-4"}`}
          >
            <p.icon
              className={`mb-2 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
              style={{ color: THEME.accentDark }}
            />
            <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}>
              {p.t}
            </div>
            <p className={`text-[#404040] leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
              {p.d}
            </p>
          </div>
        ))}
      </div>
    </DeckSlideShell>
  );
}

function ProductPriceSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>PRODUCT · PRICING</DeckEyebrow>
      <DeckTitle>Nelson Mandela pack — clear trade and retail prices</DeckTitle>
      <p className={`text-[#525252] mb-4 max-w-3xl ${forPrint ? "text-[11px]" : "text-sm"}`}>
        {P.product.vatNote}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div
          className={`rounded-2xl border-2 border-emerald-700 bg-emerald-950 text-white ${forPrint ? "p-3" : "p-5 sm:p-6"}`}
        >
          <div className={`text-emerald-300/90 font-semibold tracking-wide uppercase ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            SPAR cost · trade
          </div>
          <div className={`font-semibold tracking-tighter tabular-nums ${forPrint ? "text-3xl" : "text-4xl sm:text-5xl"}`}>
            {P.product.tradePriceExVatLabel}
          </div>
          <div className={`text-white/70 ${forPrint ? "text-[10px]" : "text-sm"}`}>
            exclusive of VAT · Big Five Foods to SPAR
          </div>
        </div>
        <div
          className={`rounded-2xl border-2 border-emerald-200 bg-white ${forPrint ? "p-3" : "p-5 sm:p-6"}`}
        >
          <div className={`font-semibold tracking-wide uppercase ${forPrint ? "text-[9px]" : "text-[10px]"}`} style={{ color: THEME.accentDark }}>
            Recommended retail · Mandela pack
          </div>
          <div className={`font-semibold tracking-tighter tabular-nums text-black ${forPrint ? "text-3xl" : "text-4xl sm:text-5xl"}`}>
            {P.product.rrpInclVatLabel}
          </div>
          <div className={`text-[#525252] ${forPrint ? "text-[10px]" : "text-sm"}`}>
            inclusive of VAT · shelf price to SPAR customers
          </div>
        </div>
      </div>
      <div
        className={`rounded-xl border border-black/10 bg-[#fafafa] ${forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"} text-[#404040]`}
      >
        <strong className="text-black">Product story:</strong> Big Five Foods fortified African
        staples — designed for household and institutional nutrition, certified manufacture, long
        shelf life. The Nelson Mandela pack makes purpose visible on the shelf at a fixed RRP
        customers can understand.
      </div>
    </DeckSlideShell>
  );
}

function PathwaysSlide() {
  const forPrint = useDeckPrintMode();
  const icons = [ShoppingCart, Gift, HandHeart];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>HOW IT WORKS</DeckEyebrow>
      <DeckTitle>Two routes to impact — one partnership</DeckTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 flex-1 content-start">
        {P.pathways.map((path, i) => {
          const Icon = icons[i] ?? ShoppingCart;
          return (
            <div
              key={path.id}
              className={`rounded-xl border border-black/10 bg-[#fafafa] flex flex-col min-w-0 ${forPrint ? "p-2.5" : "p-4 sm:p-5"}`}
            >
              <Icon
                className={`mb-2 ${forPrint ? "w-4 h-4" : "w-6 h-6"}`}
                style={{ color: THEME.accentDark }}
              />
              <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-lg"}`}>
                {path.title}
              </div>
              <p className={`text-[#525252] leading-snug flex-1 ${forPrint ? "text-[10px]" : "text-sm"}`}>
                {path.desc}
              </p>
            </div>
          );
        })}
      </div>
      <p className={`mt-3 text-[#737373] ${forPrint ? "text-[9px]" : "text-xs"}`}>
        Donation POs ship to Restore Africa Foundation and / or A Heart To Help under agreed
        logistics — not ad-hoc charity stock dumps.
      </p>
    </DeckSlideShell>
  );
}

function GivingModelSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>THE 10% MODEL</DeckEyebrow>
      <DeckTitle>SPAR 5% + Big Five Foods 5% = 10% to the foundations</DeckTitle>
      <p className={`text-[#525252] max-w-3xl mb-4 ${forPrint ? "text-[11px]" : "text-sm"}`}>
        {P.giving.detail}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
        <DeckStatTile value="5%" label="SPAR of retail sell-through (RRP)" theme={THEME} />
        <DeckStatTile value="5%" label="Big Five Foods of trade turnover (R45 ex. VAT)" theme={THEME} />
        <DeckStatTile value="10%" label="Combined support to NPO feeding initiatives" theme={THEME} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className={`rounded-xl border border-emerald-200 bg-emerald-50/50 ${forPrint ? "p-2.5" : "p-4"}`}>
          <div className={`font-semibold text-emerald-950 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
            SPAR contribution base
          </div>
          <p className={`text-emerald-900/80 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
            {P.giving.bases.spar}
          </p>
        </div>
        <div className={`rounded-xl border border-emerald-200 bg-emerald-50/50 ${forPrint ? "p-2.5" : "p-4"}`}>
          <div className={`font-semibold text-emerald-950 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
            Big Five Foods contribution base
          </div>
          <p className={`text-emerald-900/80 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
            {P.giving.bases.foods}
          </p>
        </div>
      </div>
    </DeckSlideShell>
  );
}

function EconomicsSlide() {
  const forPrint = useDeckPrintMode();
  const perRrp = P.giving.perUnitIllustrative.atRrp;
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>UNIT ECONOMICS · ILLUSTRATIVE</DeckEyebrow>
      <DeckTitle>What one pack and 100,000 packs can unlock</DeckTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <DeckStatTile value={formatZarPrecise(perRrp.spar)} label="SPAR 5% per pack @ R67 RRP" theme={THEME} />
        <DeckStatTile
          value={formatZarPrecise(P.giving.perUnitIllustrative.atTrade.foods)}
          label="Foods 5% per pack @ R45 trade"
          theme={THEME}
        />
        <DeckStatTile value={formatZar(EX.sparContribution)} label="SPAR at 100k packs (5% of RRP)" theme={THEME} />
        <DeckStatTile value={formatZar(EX.foodsContribution)} label="Foods at 100k packs (5% of trade)" theme={THEME} />
      </div>
      <div
        className={`rounded-2xl border-2 border-emerald-700 bg-[#052e1c] text-white ${forPrint ? "p-3" : "p-5 sm:p-6"}`}
      >
        <div className={`text-emerald-300/90 uppercase tracking-wide font-semibold ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
          {EX.label}
        </div>
        <div className={`font-semibold tracking-tighter tabular-nums text-emerald-200 ${forPrint ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
          {formatZar(EX.sparContribution + EX.foodsContribution)}
        </div>
        <p className={`text-white/70 mt-1 ${forPrint ? "text-[10px]" : "text-sm"}`}>
          Combined illustrative ring-fence to foundations (SPAR 5% of{" "}
          {formatZar(EX.sparRetailTurnover)} RRP sell-through + Foods 5% of{" "}
          {formatZar(EX.foodsTradeTurnover)} trade). Not a forecast — a model for the term sheet.
        </p>
      </div>
    </DeckSlideShell>
  );
}

function NpoRestoreSlide() {
  const forPrint = useDeckPrintMode();
  const n = P.npos[0]!;
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>NPO PARTNER · 01</DeckEyebrow>
      <div className="flex flex-wrap items-start gap-4 mb-3">
        <div className={`relative bg-white rounded-xl border border-black/10 ${forPrint ? "h-14 w-40" : "h-16 sm:h-20 w-48 sm:w-56"}`}>
          <Image src={n.logoSrc} alt={n.name} fill className="object-contain p-2" sizes="224px" />
        </div>
        <div className="min-w-0 flex-1">
          <DeckTitle>{n.name}</DeckTitle>
          <p className={`text-[#737373] font-medium ${forPrint ? "text-[10px] -mt-2 mb-2" : "text-sm -mt-3 mb-3"}`}>
            {n.role}
          </p>
        </div>
      </div>
      <p className={`text-[#404040] max-w-3xl mb-4 ${forPrint ? "text-[11px]" : "text-sm leading-relaxed"}`}>
        {n.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {n.focus.map((f) => (
          <span
            key={f}
            className={`rounded-full border border-emerald-200 bg-emerald-50 text-emerald-950 font-semibold ${forPrint ? "text-[9px] px-2 py-0.5" : "text-xs px-2.5 py-1"}`}
          >
            {f}
          </span>
        ))}
      </div>
      <div className={`rounded-xl border border-black/10 bg-[#fafafa] ${forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"} text-[#404040]`}>
        <strong className="text-black">Partnership fit:</strong> Donate fortified product into
        child- and community-facing programmes; use SPAR sell-through contributions to fund
        distribution, school days and rebuild work. Children first — food and skills together.
      </div>
    </DeckSlideShell>
  );
}

function NpoHeartSlide() {
  const forPrint = useDeckPrintMode();
  const n = P.npos[1]!;
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>NPO PARTNER · 02</DeckEyebrow>
      <div className="flex flex-wrap items-start gap-4 mb-3">
        <div className={`relative bg-white rounded-xl border border-black/10 ${forPrint ? "h-14 w-40" : "h-16 sm:h-20 w-48 sm:w-56"}`}>
          <Image src={n.logoSrc} alt={n.name} fill className="object-contain p-2" sizes="224px" />
        </div>
        <div className="min-w-0 flex-1">
          <DeckTitle>{n.name}</DeckTitle>
          <p className={`text-[#737373] font-medium ${forPrint ? "text-[10px] -mt-2 mb-2" : "text-sm -mt-3 mb-3"}`}>
            {n.role}
          </p>
        </div>
      </div>
      <p className={`text-[#404040] max-w-3xl mb-4 ${forPrint ? "text-[11px]" : "text-sm leading-relaxed"}`}>
        {n.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {n.focus.map((f) => (
          <span
            key={f}
            className={`rounded-full border border-teal-200 bg-teal-50 text-teal-950 font-semibold ${forPrint ? "text-[9px] px-2 py-0.5" : "text-xs px-2.5 py-1"}`}
          >
            {f}
          </span>
        ))}
      </div>
      <div className={`rounded-xl border border-black/10 bg-[#fafafa] ${forPrint ? "p-2.5 text-[10px]" : "p-4 text-sm"} text-[#404040]`}>
        <strong className="text-black">Partnership fit:</strong> Residential and community care
        settings need reliable, dignified nutrition. SPAR-donated product and contribution rand
        support healing pathways for women and children while Freedom Farm scales.
      </div>
    </DeckSlideShell>
  );
}

function OutcomesSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>SHARED OUTCOMES</DeckEyebrow>
      <DeckTitle>What success looks like for SPAR, Foods and the NPOs</DeckTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
        {P.outcomes.map((o) => (
          <div
            key={o.t}
            className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${forPrint ? "p-2.5" : "p-4"}`}
          >
            <div className={`font-semibold text-black mb-1 ${forPrint ? "text-sm" : "text-base"}`}>
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
}

function WhyFoodsSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>WHY BIG FIVE FOODS</DeckEyebrow>
      <DeckTitle>A product partner SPAR can put on shelf with confidence</DeckTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3">
        {P.whyFoods.map((w) => (
          <div
            key={w.t}
            className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${forPrint ? "p-2.5" : "p-4"}`}
          >
            <div className={`font-semibold text-black mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
              {w.t}
            </div>
            <p className={`text-[#525252] leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"}`}>
              {w.d}
            </p>
          </div>
        ))}
      </div>
      <p className={`text-[#737373] ${forPrint ? "text-[9px]" : "text-xs"}`}>
        {FOODS_ECONOMICS.honesty} Full range: bigfivegroup.africa/foods
      </p>
    </DeckSlideShell>
  );
}

function GovernanceSlide() {
  const forPrint = useDeckPrintMode();
  const items = [
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
      icon: Leaf,
      t: "NPO MOUs",
      d: "Restore Africa Foundation and A Heart To Help sign simple receiving agreements — use of product and funds for feeding / care programmes.",
    },
    {
      icon: HandHeart,
      t: "Customer-facing honesty",
      d: "Shelf and campaign copy states the 10% model without over-claiming meal counts until yields are locked.",
    },
  ];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>GOVERNANCE</DeckEyebrow>
      <DeckTitle>Trust is the product as much as the porridge</DeckTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 content-start">
        {items.map((it) => (
          <div
            key={it.t}
            className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 ${forPrint ? "p-2.5" : "p-4"}`}
          >
            <it.icon
              className={`mb-2 ${forPrint ? "w-4 h-4" : "w-5 h-5"}`}
              style={{ color: THEME.accentDark }}
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
}

function RoadmapSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>ROADMAP</DeckEyebrow>
      <DeckTitle>From pitch to shelf to proof</DeckTitle>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 flex-1 content-start">
        {P.roadmap.map((r) => (
          <div
            key={r.n}
            className={`rounded-xl border border-emerald-100 bg-emerald-50/40 min-w-0 ${forPrint ? "p-2" : "p-3 sm:p-4"}`}
          >
            <div
              className={`font-semibold tabular-nums ${forPrint ? "text-xs" : "text-sm"}`}
              style={{ color: THEME.accentDark }}
            >
              {r.n}
            </div>
            <div className={`font-semibold text-black ${forPrint ? "text-xs mb-0.5" : "text-sm mb-1"}`}>
              {r.t}
            </div>
            <p className={`text-[#404040] leading-snug ${forPrint ? "text-[9px]" : "text-xs"}`}>
              {r.d}
            </p>
          </div>
        ))}
      </div>
    </DeckSlideShell>
  );
}

function HonestySlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>HONESTY LABELS</DeckEyebrow>
      <DeckTitle>What we will put in writing</DeckTitle>
      <ul className="space-y-2 flex-1">
        {P.honesty.map((h) => (
          <li
            key={h}
            className={`flex gap-2 rounded-xl border border-amber-100 bg-amber-50/40 text-[#404040] ${forPrint ? "p-2 text-[10px]" : "p-3 text-sm"}`}
          >
            <span className="text-amber-800 shrink-0">·</span>
            <span className="leading-snug">{h}</span>
          </li>
        ))}
      </ul>
    </DeckSlideShell>
  );
}

function AskSlide() {
  const forPrint = useDeckPrintMode();
  const asks = [
    "Pilot listing of Nelson Mandela pack (and agreed SKUs) in selected SPAR clusters",
    "Approve trade R45 ex. VAT and RRP R67 incl. VAT for the campaign pack",
    "Adopt 5% SPAR + 5% Big Five Foods contribution model to the two foundations",
    "Authorise donation PO pathway for CSI / franchisee bulk gifts to NPOs",
    "Nominate SPAR commercial + CSI leads for a 30-day term-sheet sprint",
  ];
  return (
    <DeckSlideShell theme={THEME}>
      <DeckEyebrow theme={THEME}>THE ASK</DeckEyebrow>
      <DeckTitle>What we need from SPAR to start</DeckTitle>
      <ol className="space-y-2 flex-1 content-start">
        {asks.map((a, i) => (
          <li
            key={a}
            className={`flex gap-3 rounded-xl border border-black/10 bg-[#fafafa] ${forPrint ? "p-2" : "p-3 sm:p-4"}`}
          >
            <span
              className={`font-semibold shrink-0 ${forPrint ? "text-sm" : "text-base"}`}
              style={{ color: THEME.accentDark }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-[#404040] leading-snug ${forPrint ? "text-[11px]" : "text-sm sm:text-base"}`}>
              {a}
            </span>
          </li>
        ))}
      </ol>
    </DeckSlideShell>
  );
}

function CtaSlide() {
  const forPrint = useDeckPrintMode();
  return (
    <DeckSlideShell dark theme={THEME}>
      <div className="flex flex-col h-full min-h-0 justify-between">
        <div>
          <DeckEyebrow light theme={THEME}>
            NEXT STEP
          </DeckEyebrow>
          <CoBrand light />
          <h2
            className={`font-semibold tracking-tighter text-white text-balance ${
              forPrint ? "text-2xl mb-2" : "text-3xl sm:text-4xl md:text-5xl mb-4"
            }`}
          >
            Let’s put fortified food on the SPAR shelf —
            <span className="text-emerald-300"> and purpose in every pack.</span>
          </h2>
          <p className={`text-white/70 max-w-2xl ${forPrint ? "text-[11px]" : "text-sm sm:text-base"}`}>
            R45 trade · R67 RRP · 10% to Restore Africa Foundation & A Heart To Help · sell or
            donate · accelerate food security with Big Five Foods.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
              "SPAR × Big Five Foods partnership — term sheet"
            )}&body=${encodeURIComponent(
              "Hello Big Five team,\n\nI would like to progress the SPAR × Big Five Foods partnership (Mandela pack, R45/R67, 10% model, NPO support).\n\nName:\nRole / region:\nPreferred pilot stores:\n\nThank you."
            )}`}
            className={`deck-email-cta inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold ${
              forPrint ? "px-4 py-2 text-xs" : "px-6 py-3.5 text-sm sm:text-base"
            }`}
          >
            Email {P.contactEmail}
            <ArrowRight className={forPrint ? "w-3.5 h-3.5" : "w-4 h-4"} />
          </a>
          <div className={`text-white/45 ${forPrint ? "text-[9px]" : "text-xs"}`}>
            bigfivegroup.africa/foods · Partner portal /partner/spar · Confidential
          </div>
        </div>
      </div>
    </DeckSlideShell>
  );
}

function Slide({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <TitleSlide />;
    case 1:
      return <AgendaSlide />;
    case 2:
      return <ProblemSlide />;
    case 3:
      return <WhySparSlide />;
    case 4:
      return <ProductPriceSlide />;
    case 5:
      return <PathwaysSlide />;
    case 6:
      return <GivingModelSlide />;
    case 7:
      return <EconomicsSlide />;
    case 8:
      return <NpoRestoreSlide />;
    case 9:
      return <NpoHeartSlide />;
    case 10:
      return <OutcomesSlide />;
    case 11:
      return <WhyFoodsSlide />;
    case 12:
      return <GovernanceSlide />;
    case 13:
      return <RoadmapSlide />;
    case 14:
      return <HonestySlide />;
    case 15:
      return <AskSlide />;
    case 16:
      return <CtaSlide />;
    default:
      return null;
  }
}

// Title through CTA = 17 slides (0-16)
const SLIDE_COUNT = 17;

export default function SparPartnershipDeck() {
  return (
    <DeckShell
      id="spar-partnership-deck"
      printRootId="spar-partnership-deck-print-root"
      total={SLIDE_COUNT}
      theme={THEME}
      eyebrow="SPAR PARTNERSHIP DECK"
      title="SPAR × Big Five Foods — feeding & foundations"
      description="Retail partnership pitch: Mandela pack pricing, 10% turnover to NPOs, dual sell/donate pathways."
      sharePath="/partner/spar#spar-partnership-deck"
      shareTitle="SPAR × Big Five Foods partnership"
      shareText="SPAR × Big Five Foods: fortified food on shelf, 10% to Restore Africa Foundation & A Heart To Help."
      renderSlide={(i) => <Slide index={i} />}
    />
  );
}
