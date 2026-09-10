"use client";

import Image from "next/image";
import {
  ArrowRight,
  Cross,
  Heart,
  Package,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import DeckShell, {
  DECK_THEMES,
  DeckEyebrow,
  DeckPrintImage,
  DeckSlideShell,
  DeckStatTile,
  DeckTitleLayout,
  useDeckPdfExport,
} from "./deck/DeckShell";
import { BLESSMAN_PARTNERSHIP } from "../lib/blessmanPartnership";

const theme = DECK_THEMES.blessman;
const TOTAL = 18;
const P = BLESSMAN_PARTNERSHIP;
const PORRIDGE = P.porridge;
const LABEL = PORRIDGE.label;

type NutriRow = {
  nutrient: string;
  per100g: string;
  perServing: string;
  nrv?: string;
  indent?: boolean;
};

function NutriPanel({
  title,
  rows,
  showNrv,
}: {
  title: string;
  rows: readonly NutriRow[];
  showNrv?: boolean;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white overflow-hidden min-h-0 flex flex-col shadow-sm">
      <div className="px-2.5 py-1.5 bg-[#fdf4f2] border-b border-[#b32317]/15">
        <div className="text-[9px] sm:text-[10px] tracking-[1.5px] font-semibold text-[#b32317] uppercase">
          {title}
        </div>
      </div>
      <div className="overflow-auto min-h-0 flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/5 bg-[#fafafa]">
              <th className="px-1.5 sm:px-2 py-1 text-[8px] sm:text-[9px] font-semibold text-[#737373]">
                Nutrient
              </th>
              <th className="px-1.5 sm:px-2 py-1 text-[8px] sm:text-[9px] font-semibold text-[#737373] text-right whitespace-nowrap">
                /100g
              </th>
              <th className="px-1.5 sm:px-2 py-1 text-[8px] sm:text-[9px] font-semibold text-[#737373] text-right whitespace-nowrap">
                /80g
              </th>
              {showNrv ? (
                <th className="px-1.5 sm:px-2 py-1 text-[8px] sm:text-[9px] font-semibold text-[#737373] text-right whitespace-nowrap">
                  %NRV
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.nutrient} className="border-b border-black/[0.04] last:border-0">
                <td
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-[3px] text-[8px] sm:text-[9px] leading-tight ${
                    row.indent ? "pl-2.5 sm:pl-3 text-[#737373]" : "font-medium text-[#404040]"
                  }`}
                >
                  {row.nutrient}
                </td>
                <td className="px-1.5 sm:px-2 py-0.5 sm:py-[3px] text-[8px] sm:text-[9px] text-right tabular-nums text-[#171717] leading-tight">
                  {row.per100g}
                </td>
                <td className="px-1.5 sm:px-2 py-0.5 sm:py-[3px] text-[8px] sm:text-[9px] text-right tabular-nums text-[#171717] leading-tight">
                  {row.perServing}
                </td>
                {showNrv ? (
                  <td className="px-1.5 sm:px-2 py-0.5 sm:py-[3px] text-[8px] sm:text-[9px] text-right tabular-nums font-semibold text-[#b32317] leading-tight">
                    {row.nrv}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScriptureQuote({
  verse,
  citation,
  light,
  compact,
  className = "",
}: {
  verse: string;
  citation: string;
  light?: boolean;
  /** Tighter type for dense cards / height-constrained slides */
  compact?: boolean;
  className?: string;
}) {
  return (
    <blockquote
      className={`border-l-2 ${compact ? "pl-2" : "pl-3"} ${
        light ? "border-amber-300/60" : "border-[#b32317]/40"
      } ${className}`}
    >
      <p
        className={`italic leading-snug text-balance ${
          compact
            ? light
              ? "text-amber-50/90 text-[10px] sm:text-[11px]"
              : "text-[#525252] text-[10px] sm:text-[11px]"
            : light
              ? "text-amber-50/90 text-xs sm:text-sm"
              : "text-[#525252] text-xs sm:text-sm"
        }`}
      >
        {verse}
      </p>
      <cite
        className={`block not-italic font-semibold tracking-wide uppercase ${
          compact ? "mt-1 text-[9px]" : "mt-1.5 text-[10px]"
        } ${light ? "text-amber-200/85" : "text-[#b32317]"}`}
      >
        — {citation}
      </cite>
    </blockquote>
  );
}

function CoBrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const blessmanSrc = "/partners/blessman-international-logo.png";
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 max-w-full">
      <div
        className={`relative h-11 sm:h-14 w-[9.5rem] sm:w-52 shrink-0 bg-white rounded-xl px-2.5 py-1 border-2 shadow-sm overflow-hidden ${
          light ? "border-white/40" : "border-[#b32317]/25"
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={blessmanSrc} alt="Blessman International" paddingClass="p-1" fit="contain" />
        ) : (
          <Image
            src={blessmanSrc}
            alt="Blessman International"
            fill
            className="object-contain p-1"
            sizes="208px"
            priority
          />
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

function Slide({ index }: { index: number }) {
  const pdf = useDeckPdfExport();

  switch (index) {
    case 0:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {pdf ? (
              <DeckPrintImage src="/foods/porridge-banana.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/foods/porridge-banana.jpg"
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
                  "linear-gradient(105deg, #2a0a08f5 0%, #8a1a12e6 42%, #2a0a0899 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a08]/95 via-transparent to-black/25" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    STRATEGIC PARTNERSHIP · CONDENSED
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    Kingdom plates.
                    <br />
                    <span style={{ color: "#f47835" }}>Delicious. Nutritious. Affordable.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    {P.tagline}
                  </p>
                  <ScriptureQuote
                    light
                    className="mt-4 sm:mt-5 max-w-xl"
                    verse={P.scripture.title.verse}
                    citation={P.scripture.title.ref}
                  />
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>Private partner briefing · {TOTAL} slides</p>
                  <p>bigfivegroup.africa/partner/blessman-international#blessman-partnership-deck</p>
                </div>
              </DeckTitleLayout>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>KINGDOM ALIGNMENT</DeckEyebrow>
          <CoBrandRow />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2 sm:mb-3">
            Shared calling — hope on the plate
          </h2>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3 min-h-0">
            <div className="rounded-lg sm:rounded-2xl border border-[#b32317]/20 bg-[#fdf4f2] p-2 sm:p-4">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#b32317] mb-1 sm:mb-1.5">
                <Cross className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden />
                <span className="leading-tight">BLESSMAN INTERNATIONAL</span>
              </div>
              <p className="text-[10px] sm:text-sm text-[#404040] leading-snug line-clamp-3 sm:line-clamp-5">
                {P.kingdom.blessman}
              </p>
            </div>
            <div className="rounded-lg sm:rounded-2xl border border-black/10 bg-[#fafafa] p-2 sm:p-4">
              <div className="text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#92400e] mb-1 sm:mb-1.5 leading-tight">
                DR. CRAIG R. MULLER · BIG FIVE GROUP
              </div>
              <p className="text-[10px] sm:text-sm text-[#404040] leading-snug line-clamp-3 sm:line-clamp-5">
                {P.kingdom.founder}
              </p>
            </div>
          </div>
          <div className="mt-1.5 sm:mt-3 grid grid-cols-2 gap-1 sm:gap-2 min-h-0">
            {P.kingdom.shared.map((item) => (
              <div
                key={item.line}
                className="rounded-lg sm:rounded-xl border border-black/10 bg-white px-1.5 py-1.5 sm:px-2.5 sm:py-2 min-w-0 flex flex-col gap-1"
              >
                <div className="flex gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#404040]">
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b32317] shrink-0 mt-0.5" aria-hidden />
                  <span className="font-medium leading-snug line-clamp-2">{item.line}</span>
                </div>
                <ScriptureQuote
                  compact
                  verse={item.verse}
                  citation={item.ref}
                  className="mt-auto"
                />
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>{P.challenge.eyebrow}</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            {P.challenge.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
            {P.challenge.points.map((p) => (
              <div key={p.t} className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm">
                <div className="text-sm font-semibold text-black mb-2">{p.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <ScriptureQuote
            className="mt-3"
            verse={P.scripture.challenge.verse}
            citation={P.scripture.challenge.ref}
          />
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRODUCT PROMISE</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            Three words that decide whether children eat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
            {[
              { t: "Delicious", d: P.productPromise.delicious, icon: Sparkles },
              { t: "Nutritious", d: P.productPromise.nutritious, icon: ShieldCheck },
              { t: "Affordable", d: P.productPromise.affordable, icon: Package },
            ].map((card) => (
              <div
                key={card.t}
                className="rounded-2xl border border-[#b32317]/20 bg-gradient-to-b from-[#fdf4f2] to-white p-4 sm:p-5 flex flex-col"
              >
                <card.icon className="w-5 h-5 text-[#b32317] mb-3" aria-hidden />
                <div className="text-lg font-semibold tracking-tight text-black mb-2">{card.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">{card.d}</p>
              </div>
            ))}
          </div>
          <ScriptureQuote
            className="mt-3"
            verse={P.scripture.product.verse}
            citation={P.scripture.product.ref}
          />
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FORTIFIED PORRIDGES</DeckEyebrow>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <UtensilsCrossed className="w-5 h-5 text-[#b32317] shrink-0" aria-hidden />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance">
              Flavours children ask for again
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525252] mb-2.5 sm:mb-3 max-w-3xl leading-relaxed">
            {PORRIDGE.title}. Four taste-forward SKUs — Original, Chocolate, Banana, Strawberry —
            so nutrition arrives in a bowl children finish.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 auto-rows-fr">
            {PORRIDGE.flavours.map((f) => (
              <div
                key={f.name}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm flex flex-col"
              >
                {/* Fixed-height in-flow frame — absolute/aspect boxes collapsed in A4 PDF clones */}
                <div className="flex h-40 sm:h-48 md:h-52 w-full shrink-0 items-center justify-center bg-[#fafafa] p-2 sm:p-3">
                  <img
                    src={f.src}
                    alt={f.name}
                    data-deck-src={f.src}
                    data-deck-fit="contain"
                    className="max-h-full max-w-full w-auto object-contain object-center"
                    loading={pdf ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-2 sm:p-2.5 border-t border-black/5 shrink-0">
                  <div className="text-xs sm:text-sm font-semibold text-black mb-0.5">{f.name}</div>
                  <p className="text-[10px] sm:text-[11px] text-[#737373] leading-snug line-clamp-2">
                    {f.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NUTRITIONAL SUPERIORITY</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
            Why fortified porridge outperforms empty staples
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
            {PORRIDGE.stats.map((s) => (
              <DeckStatTile
                key={s.label}
                value={s.value}
                subvalue={"usd" in s ? s.usd : undefined}
                label={s.label}
                theme={theme}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-2">
                WHAT&apos;S IN THE BOWL
              </div>
              <ul className="space-y-2">
                {PORRIDGE.nutritionBullets.map((b) => (
                  <li key={b} className="flex gap-2 text-xs sm:text-sm text-[#404040] leading-snug">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b32317] shrink-0 mt-0.5" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#b32317]/20 bg-[#fdf4f2] p-4 sm:p-5">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-2">
                DESIGN EDGE
              </div>
              <p className="text-sm text-[#404040] leading-relaxed mb-3">
                Internal Foods nutrition-design comparisons frame fortified porridges as{" "}
                <strong className="text-black">~74% more nutrition</strong> and{" "}
                <strong className="text-black">~185% more fortification</strong> versus alternative
                cereal formulations — built to close micronutrient gaps, not only add calories.
              </p>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                Not a clinical trial claim. Request a dated formulation / NDA brief for SKU-level
                nutrient panels when required for programme assurance.
              </p>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2">
            <div className="min-w-0">
              <DeckEyebrow theme={theme}>NUTRITION INFORMATION PANEL</DeckEyebrow>
              <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-semibold tracking-tighter text-black text-balance leading-tight">
                Fortified porridge — full nutrient profile
              </h2>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#737373] leading-snug sm:text-right shrink-0 max-w-xs">
              {LABEL.servingNote}
              <br />
              <span className="text-[#a3a3a3]">Typical Big Five Foods fortified porridge label</span>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
            <NutriPanel title="Macronutrients" rows={LABEL.macros} />
            <NutriPanel title="Vitamins" rows={LABEL.vitamins} showNrv />
            <NutriPanel title="Minerals & choline" rows={LABEL.minerals} showNrv />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
            {[
              "1 272 kJ / serving",
              "10.2 g protein",
              "5.6 g fibre",
              "High B-vitamins %NRV",
              "Iron · calcium · zinc",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-[#b32317]/20 bg-[#fdf4f2] px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold text-[#8a1a12]"
              >
                {chip}
              </span>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ADDRESSING MALNUTRITION</DeckEyebrow>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2">
            Why this porridge is so good for children — and people
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
            Empty calories fill stomachs; fortified porridge fills gaps. Energy, protein and a dense
            micronutrient panel help children learn, grow and stay healthier — in a flavour they will
            finish.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0 mb-2">
            {LABEL.childBenefits.map((b, i) => (
              <div
                key={b.t}
                className="rounded-xl border border-black/10 bg-white p-3 sm:p-3.5 shadow-sm min-w-0"
              >
                <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm font-semibold text-black mb-1">{b.t}</div>
                <p className="text-[11px] sm:text-xs text-[#525252] leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-2">
            {PORRIDGE.superiority.map((s) => (
              <div
                key={s.t}
                className="rounded-lg border border-[#b32317]/15 bg-[#fdf4f2] px-2.5 py-2 min-w-0"
              >
                <div className="text-[10px] sm:text-[11px] font-semibold text-[#8a1a12] mb-0.5">
                  {s.t}
                </div>
                <p className="text-[9px] sm:text-[10px] text-[#737373] leading-snug line-clamp-3">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
          <ScriptureQuote
            compact
            className="shrink-0"
            verse={P.scripture.malnutrition.verse}
            citation={P.scripture.malnutrition.ref}
          />
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AFFORDABLE AT SCALE</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
            Stretch every kingdom rand further
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <DeckStatTile
              value={PORRIDGE.tradeExVatLabel}
              subvalue={PORRIDGE.tradeExVatUsd}
              label="Per 1kg pack (ex. VAT framing)"
              theme={theme}
            />
            <DeckStatTile
              value={PORRIDGE.yield.costPerMealLabel}
              subvalue={PORRIDGE.yield.costPerMealUsd}
              label="Per 200g fortified meal"
              theme={theme}
            />
            <DeckStatTile value={PORRIDGE.shelfLifeLabel} label="Shelf life" theme={theme} />
          </div>
          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5 flex-1 min-h-0">
            <div className="text-sm font-semibold text-black mb-2">{PORRIDGE.yield.headline}</div>
            <p className="text-sm text-[#404040] leading-relaxed mb-2">{PORRIDGE.yield.costLine}</p>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
              {PORRIDGE.yield.detail} Roughly{" "}
              <strong className="text-black">50% cheaper</strong> than comparable wholesale/retail
              pathways (internal) — so Blessman hubs can serve more children from the same budget.
            </p>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              Preparation water, fuel and kitchen labour sit outside pack cost. Confirm VAT and SKU
              list on order. {P.fx.note}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 9: {
      const pc = P.packCompare;
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>{pc.eyebrow}</DeckEyebrow>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2">
            {pc.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
            {pc.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 flex-1 min-h-0">
            {pc.options.map((o) => (
              <div
                key={o.id}
                className={`rounded-2xl border p-3 sm:p-4 flex flex-col min-w-0 ${
                  o.highlight
                    ? "border-[#b32317]/40 bg-[#fdf4f2] ring-1 ring-[#b32317]/20 shadow-sm"
                    : "border-black/10 bg-white"
                }`}
              >
                <div
                  className={`text-[10px] tracking-[2px] font-semibold mb-2 ${
                    o.highlight ? "text-[#b32317]" : "text-[#737373]"
                  }`}
                >
                  {o.badge}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black tabular-nums">
                  {o.packLabel}
                </div>
                <div className="text-sm font-semibold text-[#737373] tabular-nums mt-0.5">
                  {o.packUsd}
                  {"wasPackLabel" in o && o.wasPackLabel ? (
                    <span className="ml-2 text-[11px] font-medium text-[#a3a3a3] line-through">
                      {o.wasPackLabel}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 space-y-1.5 text-xs text-[#404040] leading-snug flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#737373]">Per kg</span>
                    <span className="font-semibold tabular-nums">{o.perKgLabel}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#737373]">Meals / pack</span>
                    <span className="font-semibold tabular-nums">{o.meals}</span>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-2 mt-2">
                    <div className="text-[10px] tracking-[1.5px] font-semibold text-[#b32317] mb-0.5">
                      PER MEAL
                    </div>
                    <div className="text-lg font-semibold tracking-tighter text-black tabular-nums">
                      {o.mealLabel}
                    </div>
                    <div className="text-xs font-semibold text-[#737373] tabular-nums">
                      {o.mealUsd}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-[10px] sm:text-[11px] text-[#737373] leading-snug">{o.note}</p>
                {"saveLabel" in o && o.saveLabel ? (
                  <p className="mt-1 text-[10px] font-semibold text-[#b32317]">
                    Save {o.saveLabel} per 5kg pack
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] sm:text-[11px] text-[#737373] leading-relaxed">{pc.yieldNote}</p>
        </DeckSlideShell>
      );
    }

    case 10: {
      const day = P.threeMealsDay;
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>{day.eyebrow}</DeckEyebrow>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tighter text-black text-balance mb-1.5">
            {day.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-[#525252] leading-snug max-w-3xl mb-2 line-clamp-2">
            {day.intro}
          </p>
          {/* Totals first so day/month stay visible on short mobile viewports */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3 mb-2 shrink-0">
            <div className="rounded-xl sm:rounded-2xl border border-[#b32317]/25 bg-[#fdf4f2] px-3 py-2 sm:px-4 sm:py-3">
              <div className="text-[8px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#b32317] mb-0.5">
                {day.day.label.toUpperCase()}
              </div>
              <div className="text-xl sm:text-3xl font-semibold tracking-tighter text-black tabular-nums">
                {day.day.total.zar}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#737373] tabular-nums">
                {day.day.total.usd}
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#737373] mt-0.5 leading-snug line-clamp-1">
                {day.day.detail}
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-black/10 bg-[#0a0a0a] px-3 py-2 sm:px-4 sm:py-3 text-white">
              <div className="text-[8px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] font-semibold text-amber-300/90 mb-0.5">
                {day.month.label.toUpperCase()}
              </div>
              <div className="text-xl sm:text-3xl font-semibold tracking-tighter tabular-nums">
                {day.month.total.zar}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/70 tabular-nums">
                {day.month.total.usd}
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5 leading-snug line-clamp-1">
                {day.month.detail}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 min-h-0 flex-1">
            {day.meals.map((m) => (
              <div
                key={m.slot}
                className="rounded-xl sm:rounded-2xl border border-black/10 bg-white p-2 sm:p-3 flex flex-col min-w-0 shadow-sm"
              >
                <div className="flex gap-1.5 sm:gap-2 mb-1.5">
                  <div className="relative h-12 w-9 sm:h-16 sm:w-12 shrink-0 rounded-md overflow-hidden bg-[#fafafa] border border-black/5 flex items-center justify-center p-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.src}
                      alt={m.product}
                      data-deck-src={m.src}
                      data-deck-fit="contain"
                      className="max-h-full max-w-full object-contain"
                      loading={pdf ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#b32317]">
                      {m.slot.toUpperCase()}
                    </div>
                    <div className="text-[11px] sm:text-sm font-semibold text-black leading-snug line-clamp-2">
                      {m.product}
                    </div>
                  </div>
                </div>
                <p className="hidden sm:block text-[11px] text-[#525252] leading-snug mb-1.5 line-clamp-2 flex-1">
                  {m.blurb}
                </p>
                <div className="rounded-lg bg-[#fdf4f2] border border-[#b32317]/15 px-2 py-1.5 mt-auto">
                  <div className="text-sm sm:text-base font-semibold tracking-tighter text-black tabular-nums">
                    {m.cost.zar}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-[#737373] tabular-nums">
                    {m.cost.usd}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[9px] sm:text-[10px] text-[#737373] leading-snug line-clamp-2 shrink-0">
            {day.footnote}
          </p>
        </DeckSlideShell>
      );
    }

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HUBS · CAMPUSES · LOGISTICS</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            Built for Blessman&apos;s feeding reality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
            {[
              {
                t: "No cold chain",
                d: "Instant fortified porridge stores and moves to Limpopo hubs and care points without refrigeration risk.",
              },
              {
                t: "24-month shelf life",
                d: "Buy ahead of peak feeding seasons; deploy when campuses and centres need stock — less spoilage waste.",
              },
              {
                t: "Portionable packs",
                d: "Retail/catering and institutional formats for Del Cramer Children’s Campus, ECD and school-linked kitchens.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm">
                <div className="text-sm font-semibold text-black mb-2">{c.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#525252] leading-relaxed max-w-3xl">
            Aligns with Blessman&apos;s public “Feeding African children with African food” direction —
            fortified local staples that complement existing meal-packet partnerships with food
            children recognise.
          </p>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FULL RANGE · PORRIDGE FIRST</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            Porridge leads — soya, one-pots and soups support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 flex-1 min-h-0">
            {P.ranges.map((r) => (
              <div
                key={r.title}
                className={`rounded-2xl border flex gap-3 p-3 sm:p-3.5 min-w-0 ${
                  r.emphasis
                    ? "border-[#b32317]/35 bg-[#fdf4f2] ring-1 ring-[#b32317]/15"
                    : "border-black/10 bg-white"
                }`}
              >
                <div className="flex h-28 w-20 sm:h-32 sm:w-24 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-white border border-black/5 p-1.5">
                  <img
                    src={r.src}
                    alt={r.title}
                    data-deck-src={r.src}
                    data-deck-fit="contain"
                    className="max-h-full max-w-full w-auto object-contain object-center"
                    loading={pdf ? "eager" : "lazy"}
                  />
                </div>
                <div className="min-w-0 flex-1 self-center">
                  <div className="text-sm font-semibold text-black mb-0.5">
                    {r.title}
                    {r.emphasis ? (
                      <span className="ml-2 text-[10px] font-semibold tracking-wide text-[#b32317]">
                        FLAGSHIP
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#525252] leading-snug mb-1">{r.blurb}</p>
                  <div className="text-[10px] font-semibold text-[#b32317]">{r.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            KINGDOM + PLATE
          </DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance mb-3">
            Love that children can taste
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
            Faith formation and child development need energy, micronutrients and meals that do not
            shame the child. Fortified porridge is practical kingdom stewardship — delicious enough
            to finish, nutritious enough to build, affordable enough to serve again tomorrow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { t: "Dignity", d: "Familiar flavours · African food for African children" },
              { t: "Development", d: "Micronutrients for growth, immunity and learning" },
              { t: "Stewardship", d: "Clear meal maths · less waste · honest reporting" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/15 bg-white/[0.06] p-4">
                <div className="text-sm font-semibold text-white mb-1">{c.t}</div>
                <p className="text-xs text-white/60 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <ScriptureQuote
            light
            verse={P.scripture.kingdomPlate.verse}
            citation={P.scripture.kingdomPlate.ref}
          />
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PARTNERSHIP PATHWAYS</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            How Blessman and Big Five Foods work together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
            {P.pathways.map((p, i) => (
              <div key={p.t} className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm font-semibold text-black mb-1.5">{p.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <ScriptureQuote
            className="mt-3"
            verse={P.scripture.pathways.verse}
            citation={P.scripture.pathways.ref}
          />
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            A simple path from tasting to serving
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
            {P.ask.map((a) => (
              <div
                key={a.n}
                className="rounded-2xl border border-[#b32317]/20 bg-[#fdf4f2] p-4 sm:p-5 flex flex-col"
              >
                <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-2">
                  {a.n}
                </div>
                <div className="text-sm font-semibold text-black mb-2">{a.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">{a.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HONEST LANGUAGE</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            What we claim — and what we do not
          </h2>
          <ul className="space-y-2.5 flex-1 min-h-0">
            {P.honesty.map((h) => (
              <li
                key={h}
                className="rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 text-xs sm:text-sm text-[#404040] leading-relaxed"
              >
                {h}
              </li>
            ))}
          </ul>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <div className="relative h-full w-full min-h-0">
            {pdf ? (
              <DeckPrintImage src="/foods/porridge-chocolate.jpg" alt="" fit="cover" />
            ) : (
              <Image
                src="/foods/porridge-chocolate.jpg"
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
                  "linear-gradient(105deg, #2a0a08f5 0%, #8a1a12e6 42%, #2a0a08a6 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a08]/95 via-transparent to-black/30" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CALL TO ACTION
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl">
                    Put fortified porridge
                    <br />
                    <span style={{ color: "#f47835" }}>on kingdom tables.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed mb-3">
                    Delicious flavours · ~74% more nutrition by design ·{" "}
                    {PORRIDGE.yield.costPerMealInline} per meal · African food for African children —
                    with Dr. Craig R. Muller and Big Five Group as kingdom partners in the plate.
                  </p>
                  <ScriptureQuote
                    light
                    className="max-w-xl mb-4"
                    verse={P.scripture.cta.verse}
                    citation={P.scripture.cta.ref}
                  />
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "Blessman International × Big Five Foods — fortified porridge partnership"
                    )}&body=${encodeURIComponent(
                      "Hello Dr. Craig / Big Five team,\n\nI would like to progress the Blessman International × Big Five Foods partnership — starting with fortified porridge tasting and a pilot for our hubs / campuses.\n\nName:\nRole / campus or hub:\nEstimated children served:\n\nThank you."
                    )}`}
                    className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                    style={{ color: "#000000" }}
                  >
                    Email {P.contactEmail}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="text-white/45 text-xs">
                    blessmaninternational.org · bigfivegroup.africa/foods · Confidential partner
                    briefing
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

export default function BlessmanPartnershipDeck() {
  return (
    <div id="blessman-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#b32317]/20 px-3 py-1 shadow-sm">
            <Image
              src="/partners/blessman-international-logo.png"
              alt="Blessman International"
              fill
              className="object-contain p-1"
              sizes="208px"
            />
          </div>
          <div
            className="text-[10px] sm:text-xs tracking-[2px] font-semibold"
            style={{ color: "#b32317" }}
          >
            BLESSMAN × BIG FIVE · KINGDOM PARTNERSHIP · {TOTAL} SLIDES · PRIVATE
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          {P.title}
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl leading-relaxed">{P.tagline}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="blessman-deck-shell"
          printRootId="blessman-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="BLESSMAN PARTNERSHIP DECK"
          title="Blessman International × Big Five Group — kingdom partnership"
          description={`Fortified porridges that are delicious, nutritious and affordable — ~74% more nutrition by design, ${PORRIDGE.yield.costPerMealInline} per meal.`}
          sharePath="/partner/blessman-international#blessman-partnership-deck"
          shareTitle="Blessman International × Big Five Group"
          shareText={`Kingdom partnership: delicious fortified porridges for children — nutritious, affordable (${PORRIDGE.yield.costPerMealInline}/meal), African.`}
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-[10px] text-[#a3a3a3] leading-relaxed max-w-3xl">
          {P.honesty[0]} {P.honesty[1]}
        </p>
      </div>
    </div>
  );
}
