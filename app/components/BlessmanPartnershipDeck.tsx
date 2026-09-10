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
const TOTAL = 15;
const P = BLESSMAN_PARTNERSHIP;
const PORRIDGE = P.porridge;

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
                sizes="100vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a0a08]/95 via-[#2a0a08]/80 to-[#2a0a08]/45" />
            <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    STRATEGIC PARTNERSHIP · CONDENSED
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white text-balance leading-[1.05] mb-3">
                    Kingdom plates.
                    <br />
                    <span style={{ color: "#f47835" }}>Delicious. Nutritious. Affordable.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl text-sm sm:text-base leading-relaxed">
                    {P.tagline}
                  </p>
                </div>
                <div className="text-white/50 text-xs">
                  Private partner briefing · {TOTAL} slides · bigfivegroup.africa/partner/blessman-international
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
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            Shared calling — hope on the plate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 min-h-0">
            <div className="rounded-2xl border border-[#b32317]/20 bg-[#fdf4f2] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-2">
                <Cross className="w-3.5 h-3.5" aria-hidden />
                BLESSMAN INTERNATIONAL
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{P.kingdom.blessman}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#92400e] mb-2">
                DR. CRAIG R. MULLER · BIG FIVE GROUP
              </div>
              <p className="text-sm text-[#404040] leading-relaxed">{P.kingdom.founder}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {P.kingdom.shared.map((line) => (
              <div
                key={line}
                className="flex gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-xs sm:text-sm text-[#404040]"
              >
                <Heart className="w-3.5 h-3.5 text-[#b32317] shrink-0 mt-0.5" aria-hidden />
                <span>{line}</span>
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
          <p className="mt-3 text-[11px] text-[#737373] leading-relaxed">
            Feeding programmes win when food is eaten, nutrient-dense and affordable enough to serve
            every school day — that is the design brief for Big Five Foods fortified porridges.
          </p>
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
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FORTIFIED PORRIDGES</DeckEyebrow>
          <div className="flex items-center gap-2 mb-2">
            <UtensilsCrossed className="w-5 h-5 text-[#b32317]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance">
              Flavours children ask for again
            </h2>
          </div>
          <p className="text-sm text-[#525252] mb-4 max-w-3xl leading-relaxed">
            {PORRIDGE.title}. Four taste-forward SKUs — Original, Chocolate, Banana, Strawberry —
            so nutrition arrives in a bowl children finish.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 flex-1 min-h-0">
            {PORRIDGE.flavours.map((f) => (
              <div
                key={f.name}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm flex flex-col min-h-0"
              >
                <div className="relative aspect-[4/3] bg-[#fafafa]">
                  {pdf ? (
                    <DeckPrintImage src={f.src} alt={f.name} fit="cover" />
                  ) : (
                    <Image src={f.src} alt={f.name} fill className="object-cover" sizes="200px" />
                  )}
                </div>
                <div className="p-2.5 sm:p-3">
                  <div className="text-sm font-semibold text-black mb-0.5">{f.name}</div>
                  <p className="text-[11px] text-[#737373] leading-snug">{f.blurb}</p>
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
          <DeckEyebrow theme={theme}>AGAINST MALNUTRITION</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
            Four ways porridge protects the child
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
            {PORRIDGE.superiority.map((s, i) => (
              <div key={s.t} className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#b32317] mb-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm sm:text-base font-semibold text-black mb-1.5">{s.t}</div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>AFFORDABLE AT SCALE</DeckEyebrow>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
            Stretch every kingdom rand further
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <DeckStatTile value={PORRIDGE.tradeExVatLabel} label="Per 1kg pack (ex. VAT framing)" theme={theme} />
            <DeckStatTile value={PORRIDGE.yield.costPerMealLabel} label="Per 200g fortified meal" theme={theme} />
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
              list on order.
            </p>
          </div>
        </DeckSlideShell>
      );

    case 8:
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

    case 9:
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
                className={`rounded-2xl border overflow-hidden flex gap-3 p-3 sm:p-3.5 ${
                  r.emphasis
                    ? "border-[#b32317]/35 bg-[#fdf4f2] ring-1 ring-[#b32317]/15"
                    : "border-black/10 bg-white"
                }`}
              >
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-[#fafafa]">
                  {pdf ? (
                    <DeckPrintImage src={r.src} alt={r.title} fit="cover" />
                  ) : (
                    <Image src={r.src} alt={r.title} fill className="object-cover" sizes="96px" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
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

    case 10:
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
        </DeckSlideShell>
      );

    case 11:
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
        </DeckSlideShell>
      );

    case 12:
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

    case 13:
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

    case 14:
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
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a08] via-[#2a0a08]/85 to-[#2a0a08]/40" />
            <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CALL TO ACTION
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white text-balance leading-[1.1] mb-3">
                    Put fortified porridge
                    <br />
                    <span style={{ color: "#f47835" }}>on kingdom tables.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl text-sm leading-relaxed mb-4">
                    Delicious flavours · ~74% more nutrition by design · ~R2.25 per meal · African
                    food for African children — with Dr. Craig R. Muller and Big Five Group as
                    kingdom partners in the plate.
                  </p>
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
                    blessmaninternational.org · bigfivegroup.africa/foods · Confidential partner briefing
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
          description="Fortified porridges that are delicious, nutritious and affordable — ~74% more nutrition by design, ~R2.25 per meal."
          sharePath="/partner/blessman-international#blessman-partnership-deck"
          shareTitle="Blessman International × Big Five Group"
          shareText="Kingdom partnership: delicious fortified porridges for children — nutritious, affordable, African."
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
