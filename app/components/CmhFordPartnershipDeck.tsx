"use client";

import Image from "next/image";
import {
  ArrowRight,
  Clock,
  HandHeart,
  Heart,
  Package,
  Scale,
  ShoppingCart,
  Target,
  Users,
  Utensils,
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
  CMH_FORD_PARTNERSHIP,
  formatNumber,
  formatZar,
  formatZarPrecise,
} from "../lib/cmhFordPartnership";

const theme = DECK_THEMES.ford;
const TOTAL = 17;
const P = CMH_FORD_PARTNERSHIP;
const Y = P.product.yield;
const G = P.giving;
const SDGS = P.sdgAlignment;

function CoBrandRow({ light }: { light?: boolean }) {
  const pdf = useDeckPdfExport();
  const cmhSrc = "/partners/cmh-ford-ballito-logo.png";
  const foodsSrc = light ? "/bigfivefoods-logo-white.png" : "/bigfivefoods-logo.png";
  return (
    <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 max-w-full">
      <div
        className={`relative h-11 sm:h-14 w-[9.5rem] sm:w-52 shrink-0 bg-white rounded-xl px-2.5 py-1 border-2 shadow-sm overflow-hidden ${
          light ? "border-white/40" : "border-[#003478]/25"
        }`}
      >
        {pdf ? (
          <DeckPrintImage src={cmhSrc} alt="CMH Ford" paddingClass="p-1" fit="contain" />
        ) : (
          <Image src={cmhSrc} alt="CMH Ford" fill className="object-contain p-1" sizes="208px" priority />
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
      style={{ borderColor: light ? "#7eb8e0" : "#003478" }}
    >
      <p
        className={`italic leading-snug text-balance ${
          compact ? "text-sm" : "text-sm sm:text-base"
        }`}
        style={{ color: light ? "#e8f4fc" : "#171717" }}
      >
        “It always seems impossible until it&apos;s done.”
      </p>
      <cite
        className={`block not-italic font-semibold tracking-wide uppercase ${
          compact ? "mt-1 text-[10px]" : "mt-1.5 text-[10px] sm:text-xs"
        }`}
        style={{ color: light ? "#ffffff" : "#003478", fontStyle: "normal" }}
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
                  "linear-gradient(105deg, #001a2ef2 0%, #003478e6 42%, #001a2e99 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001528]/95 via-transparent to-black/25" />
            <div className="relative z-10 h-full">
              <DeckTitleLayout>
                <div>
                  <DeckEyebrow light theme={theme}>
                    CMH FORD GROUP · STRATEGIC PARTNERSHIP · CONFIDENTIAL
                  </DeckEyebrow>
                  <CoBrandRow light />
                  <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                    Fuel the Ford feeding scheme —
                    <br />
                    <span style={{ color: "#7eb8e0" }}>more meals, less money.</span>
                  </h2>
                  <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                    Buy fortified porridges and one-pots at{" "}
                    <strong className="text-white">R45</strong> a pack ·{" "}
                    <strong className="text-white">1kg one-pot → 4kg of food</strong> ·{" "}
                    <strong className="text-white">20 meals</strong> at{" "}
                    <strong className="text-white">R2.25</strong> ·{" "}
                    <strong className="text-white">24-month</strong> shelf life.
                  </p>
                  <MandelaQuote light />
                </div>
                <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                  <p>{TOTAL} slides · Aligned to Ford Building Together · food security</p>
                  <p>bigfivegroup.africa/partner/cmh-ford-ballito#cmh-ford-partnership-deck</p>
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
          <DeckTitle>What this partnership briefing covers</DeckTitle>
          <ol className={forPrint ? "space-y-1.5 max-w-2xl" : "space-y-2.5 max-w-2xl"}>
            {[
              "Ford Building Together · food security & dealer food drives",
              "Buy direct: R45 packs · 1kg one-pot → 4kg food · R2.25/meal",
              "5% + 5% to Restore Africa Foundation & A Heart To Help (GBV)",
              "UN SDGs · South Africa & Africa impact",
              "Activation roadmap & the ask",
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
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            FORD ALIGNMENT · BUILDING TOGETHER
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">
              Food security is already on Ford&apos;s agenda — this makes it efficient.
            </span>
          </DeckTitle>
          <p
            className={`text-white/70 max-w-3xl leading-snug ${
              forPrint ? "text-[10px] mb-2" : "text-xs sm:text-sm mb-3"
            }`}
          >
            Ford Building Together in South Africa intensifies support for community development,
            education, <strong className="text-white">food security</strong> and disaster relief —
            including global dealer food drives that invite the public to bring non-perishables to Ford
            dealers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {P.fordAlignment.pillars.map((p) => (
              <div
                key={p.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-4"
                }`}
              >
                <div className={`font-semibold text-sky-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {p.t}
                </div>
                <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-sm"}`}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
          <p className={`text-white/40 mt-3 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            Sources: ford.co.za · Ford Building Together · Ford Media (dealer food drives · Global
            Caring Month · NMF / Meals on Wheels history)
          </p>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE OPPORTUNITY</DeckEyebrow>
          <DeckTitle>Turn CSI rand into more fortified meals</DeckTitle>
          <p className="text-sm text-[#525252] max-w-3xl mb-4 leading-relaxed">
            CMH Ford Group can buy meals for the Ford feeding scheme drive{" "}
            <strong className="text-black">directly from Big Five Foods</strong> — fortified porridges
            and one-pot meals at a clear pack price, ready for dealership storage and community
            kitchens.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: ShoppingCart,
                t: "Buy direct",
                d: "Simple CSI purchase from Big Five Foods — invoice trail for ESG reporting.",
              },
              {
                icon: Package,
                t: "Stock the dealership",
                d: "Hold packs for food drives, Mandela Day and weekly scheme drop-offs.",
              },
              {
                icon: HandHeart,
                t: "Feed with dignity",
                d: "Complete fortified plates communities recognise — not empty fill.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 min-w-0"
              >
                <c.icon className="w-5 h-5 text-[#003478] mb-2" />
                <div className="font-semibold text-black text-sm mb-1">{c.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>PRODUCT · BUY DIRECT</DeckEyebrow>
          <DeckTitle>Two hero packs · R45 each</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] mb-3 max-w-3xl leading-snug">
            Fortified porridge <strong className="text-black">or</strong> one-pot meal — same{" "}
            <strong className="text-black">R45</strong> purchase price for the feeding scheme, bought
            direct from Big Five Foods.
          </p>
          <div className="rounded-xl border border-[#003478]/25 bg-[#003478] text-white px-4 py-3 mb-4 max-w-3xl">
            <p className="text-sm sm:text-base font-semibold leading-snug">
              1kg one-pot provides <span className="text-sky-200">4kg of food</span> when prepared —
              20 × 200g meals at R2.25 each.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {P.product.skus.map((sku) => (
              <div
                key={sku.id}
                className="rounded-2xl border border-black/10 bg-white overflow-hidden flex flex-col sm:flex-row min-w-0"
              >
                <div className="relative w-full sm:w-36 h-28 sm:h-auto shrink-0 bg-[#fafafa]">
                  {pdf ? (
                    <DeckPrintImage src={sku.heroImage} alt={sku.title} fit="cover" />
                  ) : (
                    <Image
                      src={sku.heroImage}
                      alt={sku.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  )}
                </div>
                <div className="p-4 min-w-0 flex-1">
                  <div className="text-[10px] tracking-[1px] text-[#003478] font-semibold mb-0.5">
                    {sku.packSize} · {sku.tradeLabel}
                  </div>
                  <div className="font-semibold text-black text-base mb-1">{sku.title}</div>
                  <p className="text-xs text-[#525252] leading-relaxed mb-2">{sku.tagline}</p>
                  {"stats" in sku && sku.stats ? (
                    <p className="text-[11px] font-semibold text-[#003478] leading-snug mb-1.5">
                      {sku.stats}
                    </p>
                  ) : null}
                  <p className="text-[11px] text-[#737373] leading-relaxed">{sku.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>YIELD · ONE-POT METRIC</DeckEyebrow>
          <DeckTitle>1kg one-pot → 4kg of food = 20 meals</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] mb-3 max-w-3xl leading-snug">
            Flagship feeding-scheme claim: a{" "}
            <strong className="text-black">1kg Big Five Foods one-pot</strong> pack provides{" "}
            <strong className="text-black">4kg of food</strong> when prepared.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <DeckStatTile theme={theme} label="One-pot pack price" value="R45" />
            <DeckStatTile theme={theme} label="Food from 1kg one-pot" value="4kg" />
            <DeckStatTile theme={theme} label="Meals · 200g plates" value="20" />
            <DeckStatTile theme={theme} label="Cost per meal · R45 ÷ 20" value={Y.costPerMealLabel} />
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Utensils className="w-5 h-5 text-[#003478] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-black text-sm mb-1">
                  1kg one-pot provides 4kg of food when prepared
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">
                  That is 20 × 200g servings. At R45 per pack:{" "}
                  <strong className="text-black">{Y.costLine}</strong>. Same R45 pack price applies
                  to fortified porridge for breakfast occasions — one-pot is the complete-plate hero
                  for community kitchens and feeding-scheme drop-offs.
                </p>
              </div>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>SHELF LIFE</DeckEyebrow>
          <DeckTitle>24 months — buy ahead, waste less</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-black/10 bg-[#0a0a0a] text-white p-5 sm:p-6">
              <Clock className="w-6 h-6 text-sky-300 mb-3" />
              <div className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-2">
                {P.product.shelfLifeLabel}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{P.product.shelfLifeDetail}</p>
            </div>
            <div className="space-y-3">
              {[
                {
                  t: "Plan Global Caring Month early",
                  d: "Order once, stage at CMH Ford dealerships, release through the drive calendar.",
                },
                {
                  t: "Disaster-ready stock",
                  d: "Shelf-stable packs sit ready when floods or local crises hit — no cold chain.",
                },
                {
                  t: "Less spoilage than fresh drives",
                  d: "Non-perishable fortified staples stretch CSI budgets that perishable donations can waste.",
                },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5">
                  <div className="font-semibold text-black text-sm mb-0.5">{c.t}</div>
                  <p className="text-xs text-[#525252] leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>VALUE CASE</DeckEyebrow>
          <DeckTitle>{P.valueCase.title}</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3">
            {P.valueCase.points.map((p) => (
              <div
                key={p.t}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3.5 sm:p-4 min-w-0"
              >
                <div className="font-semibold text-black text-sm mb-1">{p.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#737373] leading-relaxed max-w-3xl border-t border-black/5 pt-3">
            {P.valueCase.comparisonNote}
          </p>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ILLUSTRATIVE SCALE</DeckEyebrow>
          <DeckTitle>Same budget · far more meal equivalents</DeckTitle>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[32rem] text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-[10px] tracking-[1px] text-[#737373] border-b border-black/10">
                  <th className="py-2 pr-3 font-semibold">Scenario</th>
                  <th className="py-2 pr-3 font-semibold text-right">Packs</th>
                  <th className="py-2 pr-3 font-semibold text-right">CSI spend</th>
                  <th className="py-2 pr-3 font-semibold text-right">Meals</th>
                  <th className="py-2 font-semibold text-right">≈ People · 1 meal/day · year</th>
                </tr>
              </thead>
              <tbody>
                {P.scaleExamples.map((row) => (
                  <tr key={row.label} className="border-t border-black/5">
                    <td className="py-2.5 pr-3 font-medium text-black">{row.label}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">
                      {formatNumber(row.packs)}
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">{formatZar(row.spend)}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums font-semibold text-[#003478]">
                      {formatNumber(row.meals)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#525252]">
                      ~{formatNumber(Math.round(row.peopleFedOneMealDay))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[#737373] mt-3 leading-relaxed max-w-3xl">
            Meal equivalents = packs × 20 servings. People figure = meal equivalents ÷ 365
            (illustrative one-meal-a-day year — not unique individuals). Planning only — not a forecast.
          </p>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>HOW IT WORKS</DeckEyebrow>
          <DeckTitle>Three steps from dealership to plate</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {P.pathways.map((path, i) => (
              <div
                key={path.id}
                className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-w-0"
              >
                <div
                  className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  {i + 1}
                </div>
                <div className="font-semibold text-black text-sm mb-1.5">{path.title}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{path.desc}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>FOUNDATIONS · RING-FENCED GIVING</DeckEyebrow>
          <DeckTitle>5% + 5% ring-fenced for RAF &amp; A Heart To Help</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] mb-3 max-w-3xl leading-snug">
            For this CMH Ford × Big Five Foods partnership:{" "}
            <strong className="text-black">CMH Ford 5%</strong> +{" "}
            <strong className="text-black">Big Five Foods 5%</strong> of pack turnover (at R45) —
            <strong className="text-black"> 10% total</strong> — supports{" "}
            <strong className="text-black">Restore Africa Foundation</strong> and{" "}
            <strong className="text-black">A Heart To Help</strong> (GBV organisation), on top of the
            meals delivered to the feeding scheme.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
            <DeckStatTile theme={theme} label="CMH Ford · 5% per pack" value={G.perPack.cmhFordLabel} />
            <DeckStatTile theme={theme} label="Big Five Foods · 5% per pack" value={G.perPack.foodsLabel} />
            <DeckStatTile theme={theme} label="Combined · 10% per pack" value={G.perPack.totalLabel} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-xs text-[#404040] leading-snug">
              <strong className="text-black">CMH Ford 5%:</strong> {G.bases.cmhFord}
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-xs text-[#404040] leading-snug">
              <strong className="text-black">Foods 5%:</strong> {G.bases.foods}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {P.npos.map((npo) => (
              <div
                key={npo.slug}
                className="rounded-2xl border border-black/10 bg-white p-4 flex gap-3 min-w-0"
              >
                <div className="relative h-12 w-12 shrink-0 rounded-lg border border-black/10 bg-[#fafafa] overflow-hidden">
                  {pdf ? (
                    <DeckPrintImage src={npo.logoSrc} alt={npo.name} fit="contain" />
                  ) : (
                    <Image
                      src={npo.logoSrc}
                      alt={npo.name}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-black text-sm">{npo.name}</div>
                  <div className="text-[10px] text-[#003478] font-medium mb-1">{npo.role}</div>
                  <p className="text-[11px] text-[#525252] leading-relaxed">{npo.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#737373] mt-3 leading-relaxed max-w-3xl">
            Illustrative at 10,000 packs: trade {formatZar(G.example.tradeTurnover)} · foundations
            combined ~{formatZar(G.example.cmhFordContribution + G.example.foodsContribution)} (
            {G.example.label}).
          </p>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>WHY CMH FORD</DeckEyebrow>
          <DeckTitle>Dealerships already sit where communities gather</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: Users,
                t: "Ford dealer food-drive network",
                d: "Ford invites the public to bring non-perishables to dealers — CMH Ford can also issue fortified BFF packs as the backbone of a feeding scheme.",
              },
              {
                icon: Target,
                t: "Ballito & CMH Ford footprint",
                d: "KZN North Coast flagship with Group reach — activate locally, report as CMH Ford Group CSI.",
              },
              {
                icon: Scale,
                t: "ESG-ready numbers",
                d: `Packs × 20 = meals; ${formatZarPrecise(Y.costPerMeal)} per serving; 24-month stock discipline.`,
              },
              {
                icon: Heart,
                t: "Dignity on the plate",
                d: "Fortified African staples people know — aligned with Ford’s food-security intent, not token giveaways.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 min-w-0"
              >
                <c.icon className="w-5 h-5 text-[#003478] mb-2" />
                <div className="font-semibold text-black text-sm mb-1">{c.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell theme={theme}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
            <DeckEyebrow theme={theme}>GLOBAL FRAMEWORK · UN SDGs</DeckEyebrow>
            <div className="relative w-24 h-12 sm:w-28 sm:h-14 shrink-0">
              {pdf ? (
                <DeckPrintImage
                  src="/sdg/un-sdg-logo.png"
                  alt="United Nations Sustainable Development Goals"
                  fit="contain"
                />
              ) : (
                <Image
                  src="/sdg/un-sdg-logo.png"
                  alt="United Nations Sustainable Development Goals"
                  fill
                  sizes="112px"
                  className="object-contain object-right"
                />
              )}
            </div>
          </div>
          <DeckTitle>How this partnership serves the Goals</DeckTitle>
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
            Fortified meals for the Ford feeding scheme, plus 10% to Restore Africa Foundation and A
            Heart To Help, map cleanly onto the UN 2030 Agenda — reportable for CSI and ESG packs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 min-h-0">
            {SDGS.map((g) => (
              <div
                key={`sdg-${g.number}`}
                className="rounded-xl border border-black/10 bg-white p-2.5 sm:p-3 min-w-0 flex gap-2.5 sm:gap-3 items-start"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 overflow-hidden rounded-md ring-1 ring-black/10 bg-white">
                  {pdf ? (
                    <DeckPrintImage
                      src={g.icon}
                      alt={`United Nations SDG ${g.number} — ${g.title}`}
                      fit="contain"
                    />
                  ) : (
                    <Image
                      src={g.icon}
                      alt={`United Nations SDG ${g.number} — ${g.title}`}
                      fill
                      sizes="44px"
                      className="object-contain object-center"
                      priority={g.number === "1" || g.number === "2"}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div
                    className="text-[10px] tracking-[1.5px] font-bold mb-0.5"
                    style={{ color: g.color }}
                  >
                    SDG {g.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-black leading-tight mb-1">
                    {g.title}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#525252] leading-snug line-clamp-4">
                    {g.how}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[10px] sm:text-xs text-[#737373] leading-relaxed">
            Official UN SDG colour tiles · sdgs.un.org/goals · Goals 1 · 2 · 4 · 8 · 10 · 17
          </p>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell dark theme={theme}>
          <DeckEyebrow light theme={theme}>
            SOUTH AFRICA · AFRICA · ZERO HUNGER
          </DeckEyebrow>
          <DeckTitle>
            <span className="text-white">{P.africaImpact.title}</span>
          </DeckTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <DeckStatTile theme={theme} dark label="People in Africa faced hunger (2025)" value="309M" />
            <DeckStatTile theme={theme} dark label="~Share of Africa’s population" value="1 in 5" />
            <DeckStatTile
              theme={theme}
              dark
              label="Meal cost from a R45 one-pot"
              value={Y.costPerMealLabel}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {P.africaImpact.points.map((p) => (
              <div
                key={p.t}
                className={`rounded-xl border border-white/10 bg-white/[0.06] min-w-0 ${
                  forPrint ? "p-2.5" : "p-3.5"
                }`}
              >
                <div className={`font-semibold text-sky-200 mb-1 ${forPrint ? "text-xs" : "text-sm"}`}>
                  {p.t}
                </div>
                <p className={`text-white/65 leading-snug ${forPrint ? "text-[10px]" : "text-xs"}`}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
          <p className={`text-white/40 mt-3 ${forPrint ? "text-[9px]" : "text-[10px]"}`}>
            {P.africaImpact.sofiNote}
          </p>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>ROADMAP</DeckEyebrow>
          <DeckTitle>From brief to first meal drop</DeckTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {P.roadmap.map((r) => (
              <div
                key={r.n}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-4 flex gap-3 min-w-0"
              >
                <span className="text-[#003478] font-semibold text-sm tabular-nums shrink-0">
                  {r.n}
                </span>
                <div>
                  <div className="font-semibold text-black text-sm mb-0.5">{r.t}</div>
                  <p className="text-xs text-[#525252] leading-relaxed">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <DeckEyebrow theme={theme}>THE ASK</DeckEyebrow>
          <DeckTitle>Five decisions to start feeding smarter</DeckTitle>
          <ol className="space-y-2.5 max-w-2xl mt-1">
            {[
              "Approve direct purchase of Big Five Foods fortified porridges and one-pots at R45 per 1kg pack for the Ford feeding scheme",
              "Adopt CMH Ford 5% + Big Five Foods 5% giving to Restore Africa Foundation and A Heart To Help (GBV)",
              "Pilot volume (e.g. 1,000–5,000 packs) across Ballito and selected CMH Ford dealerships",
              "Nominate CSI / marketing leads for ordering, storage FIFO and beneficiary drop-offs",
              "Agree a simple quarterly meal-equivalent + foundations report for ESG packs",
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

    case 16:
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
                  "linear-gradient(105deg, #001a2ef2 0%, #003478e6 50%, #001528cc 100%)",
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
                    Go further on food security —
                    <br />
                    <span style={{ color: "#7eb8e0" }}>meals + 10% to foundations.</span>
                  </h2>
                  <p className="text-white/75 max-w-xl text-sm leading-relaxed mb-3">
                    R45 packs · 1kg one-pot → 4kg food · R2.25/meal · 24-month shelf life · CMH Ford
                    5% + Foods 5% to Restore Africa Foundation and A Heart To Help (GBV).
                  </p>
                  <MandelaQuote light compact />
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                      "CMH Ford Group × Big Five Foods — feeding scheme partnership"
                    )}&body=${encodeURIComponent(
                      "Hello Big Five team,\n\nI would like to progress the CMH Ford Group feeding-scheme partnership (R45 porridge / one-pot, direct purchase).\n\nName:\nDealership / role:\nPilot pack volume:\n\nThank you."
                    )}`}
                    className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                    style={{ color: "#000000" }}
                  >
                    Email {P.contactEmail}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="text-white/45 text-xs">
                    cmhford.co.za · bigfivegroup.africa/foods · Confidential partner briefing
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

export default function CmhFordPartnershipDeck() {
  return (
    <div id="cmh-ford-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#003478]/20 px-3 py-1 shadow-sm">
            <Image
              src="/partners/cmh-ford-ballito-logo.png"
              alt="CMH Ford"
              fill
              className="object-contain p-1"
              sizes="208px"
            />
          </div>
          <div
            className="text-[10px] sm:text-xs tracking-[2px] font-semibold"
            style={{ color: "#003478" }}
          >
            CMH FORD GROUP · FEEDING SCHEME PARTNERSHIP · {TOTAL} SLIDES · PRIVATE
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          CMH Ford Group × Big Five Foods
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl leading-relaxed">
          {P.tagline} Aligned to Ford Building Together food security and dealer food-drive
          pathways.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="cmh-ford-deck-shell"
          printRootId="cmh-ford-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="CMH FORD FEEDING SCHEME DECK"
          title="CMH Ford Group × Big Five Foods — feeding scheme partnership"
          description="Buy fortified porridges and one-pots at R45 — 24-month shelf life, 4kg prepared, R2.25 per meal for Ford feeding schemes."
          sharePath="/partner/cmh-ford-ballito#cmh-ford-partnership-deck"
          shareTitle="CMH Ford Group × Big Five Foods — feeding scheme"
          shareText="Fuel the Ford feeding scheme: R45 packs, 24-month shelf life, R2.25 per meal."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-[10px] text-[#a3a3a3] leading-relaxed max-w-3xl">
          {P.honesty[3]} {P.honesty[0]}
        </p>
      </div>
    </div>
  );
}
