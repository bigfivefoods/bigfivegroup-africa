"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Crown,
  GraduationCap,
  Handshake,
  Leaf,
  Package,
  Scale,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
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
import { ZULU_KINGDOM_PARTNERSHIP } from "../lib/zuluKingdomPartnership";

const theme = DECK_THEMES.zulu;
const TOTAL = 20;
const P = ZULU_KINGDOM_PARTNERSHIP;
const MEAL_ZAR = P.nutrition.mealInline.replace(/\s*\([^)]*\)/, "");
const MEAL_USD = P.nutrition.mealInline.match(/\([^)]+\)/)?.[0] ?? "";

/** Dark leopard backdrop used on title / CTA / key royal slides */
function LeopardDarkField({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pdf = useDeckPdfExport();
  return (
    <div className={`relative h-full w-full min-h-0 overflow-hidden ${className}`}>
      {pdf ? (
        <DeckPrintImage src={P.leopardHero} alt="" fit="cover" />
      ) : (
        <Image
          src={P.leopardHero}
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
            "linear-gradient(115deg, rgba(10,8,4,0.90) 0%, rgba(20,14,6,0.80) 48%, rgba(10,8,4,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/** Subtle leopard watermark for light slides */
function LeopardWatermark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `url(${P.leopardHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden
    />
  );
}

function CoBrandRow({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 max-w-full">
      <div
        className={`relative h-11 sm:h-14 w-[9.5rem] sm:w-52 shrink-0 bg-white rounded-xl px-2.5 py-1 border-2 shadow-sm overflow-hidden flex items-center justify-center ${
          light ? "border-white/50" : "border-[#e0b000]/40"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={P.logoSrc}
          alt="The Zulu Kingdom"
          data-deck-src={P.logoSrc}
          data-deck-fit="contain"
          className="max-h-full max-w-full w-auto h-auto object-contain p-0.5"
          width={208}
          height={80}
        />
      </div>
      <span
        className={`shrink-0 text-base sm:text-xl font-light leading-none ${
          light ? "text-white/40" : "text-black/25"
        }`}
        aria-hidden
      >
        ×
      </span>
      <div
        className={`relative h-11 w-11 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl bg-white border-2 shadow-sm flex items-center justify-center ${
          light ? "border-white/50" : "border-black/10"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bigfivefoods-logo.png"
          alt="Big Five Foods"
          data-deck-src="/bigfivefoods-logo.png"
          data-deck-fit="contain"
          className="max-h-full max-w-full w-auto h-auto object-contain p-0.5"
          width={56}
          height={56}
        />
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
          <LeopardDarkField>
            <DeckTitleLayout>
              <div>
                <DeckEyebrow light theme={theme}>
                  STRATEGIC PARTNERSHIP · 50 : 50
                </DeckEyebrow>
                <CoBrandRow light />
                <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]">
                  Feed. Educate. Empower.
                  <br />
                  <span style={{ color: "#e0b000" }}>The Zulu Nation — as equal partners.</span>
                </h2>
                <p className="text-white/75 max-w-2xl mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                  {P.tagline}
                </p>
              </div>
              <div className="text-white/45 space-y-0.5 text-[10px] sm:text-xs">
                <p>Private partner briefing · {TOTAL} slides</p>
                <p>bigfivegroup.africa/partner/zulu-kingdom#zulu-partnership-deck</p>
              </div>
            </DeckTitleLayout>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    case 1:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>THE OPPORTUNITY</DeckEyebrow>
            <CoBrandRow />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
              A Nation of heritage — a Group built to serve
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="rounded-2xl border border-[#e0b000]/30 bg-[#faf6eb] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-2">
                  <Crown className="w-3.5 h-3.5" aria-hidden />
                  THE ZULU KINGDOM
                </div>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">{P.majesty.blurb}</p>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Official Private Office: zulukingdom.co.za — cultural heritage, community unity and
                  progress under His Majesty.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-2">
                  BIG FIVE GROUP
                </div>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">
                  Dr. Craig R. Muller founded Big Five Group to{" "}
                  <strong className="text-black">Feed</strong> (Big Five Foods™),{" "}
                  <strong className="text-black">Educate</strong> (Super-Cube®) and{" "}
                  <strong className="text-black">Empower</strong> (SupplierAdvisor®) — so people eat
                  with dignity, lead with integrity and build economies they own.
                </p>
                <p className="text-xs text-[#737373] leading-relaxed">
                  This deck proposes joining those rails to the Royal House in a 50:50 partnership
                  for the people of the Nation.
                </p>
              </div>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 2:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <LeopardDarkField>
            <div className="flex flex-col h-full min-h-0 p-5 sm:p-8 md:p-10">
              <DeckEyebrow light theme={theme}>
                ROYAL HOUSE
              </DeckEyebrow>
              <div className="flex gap-4 items-start mb-4">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden border border-[#e0b000]/40 bg-black/40 p-1.5">
                  {pdf ? (
                    <DeckPrintImage src={P.shieldSrc} alt="" fit="contain" />
                  ) : (
                    <Image src={P.shieldSrc} alt="" fill className="object-contain p-1" sizes="80px" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-white text-balance">
                    {P.majesty.name}
                  </h2>
                  <p className="text-sm text-[#e0b000]/90 mt-1">{P.majesty.role}</p>
                </div>
              </div>
              <p className="text-white/75 text-sm leading-relaxed max-w-3xl mb-6">{P.majesty.blurb}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-auto">
                {["Heritage", "Unity", "Progress"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-center"
                  >
                    <div className="text-sm font-semibold text-white">{t}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">Under the Royal House</div>
                  </div>
                ))}
              </div>
            </div>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    case 3:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>50 : 50 PARTNERSHIP MODEL</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2">
              {P.equity.headline}
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-4">{P.equity.detail}</p>
            <div className="rounded-2xl border-2 border-[#e0b000]/40 bg-[#faf6eb] px-4 py-5 sm:px-6 sm:py-6 mb-4 text-center">
              <div className="text-[10px] tracking-[3px] font-semibold text-[#a67c00] mb-1">
                PROPOSED EQUITY · SHARED STEWARDSHIP
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-black tabular-nums">
                {P.equity.split}
              </div>
              <div className="text-xs text-[#737373] mt-2">
                Zulu Nation / Private Office structures · Big Five Group
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-2">
                  BIG FIVE BRINGS
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">{P.equity.bigFive}</p>
              </div>
              <div className="rounded-2xl border border-[#e0b000]/25 bg-[#faf6eb] p-4">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-2">
                  THE NATION BRINGS
                </div>
                <p className="text-sm text-[#404040] leading-relaxed">{P.equity.nation}</p>
              </div>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 4:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>FEED · EDUCATE · EMPOWER</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2">
              Three pillars — one calling for the Nation
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-4">
              The same life goal that built Big Five Group — applied in 50:50 partnership so His
              Majesty&apos;s people are fed, formed and empowered with dignity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
              {P.pillars.map((p) => {
                const Icon =
                  p.id === "feed" ? UtensilsCrossed : p.id === "educate" ? GraduationCap : Handshake;
                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex flex-col shadow-sm"
                  >
                    <Icon className="w-5 h-5 text-[#a67c00] mb-2" aria-hidden />
                    <div className="text-lg font-semibold tracking-tight text-black mb-0.5">{p.t}</div>
                    <div className="text-[10px] tracking-[1.5px] font-semibold text-[#a67c00] mb-2">
                      {p.vehicle}
                    </div>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">{p.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 5:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>{P.valueChain.eyebrow}</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-2">
              {P.valueChain.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
              {P.valueChain.intro}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-1 min-h-0">
              {P.valueChain.stages.map((s) => {
                const Icon = s.id === "agri" ? Leaf : s.id === "foods" ? Package : s.id === "royal" ? Crown : Truck;
                return (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-black/10 bg-white p-3.5 sm:p-4 flex flex-col shadow-sm min-w-0"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="text-2xl font-semibold tracking-tighter text-[#e0b000] tabular-nums">
                        {s.n}
                      </div>
                      <Icon className="w-5 h-5 text-[#a67c00] shrink-0" aria-hidden />
                    </div>
                    <div className="text-[10px] tracking-[1.5px] font-semibold text-[#a67c00] mb-1">
                      {s.brand.toUpperCase()}
                    </div>
                    <div className="text-sm font-semibold text-black mb-1.5 leading-snug">{s.t}</div>
                    <p className="text-[11px] sm:text-xs text-[#525252] leading-relaxed mb-3 flex-1">
                      {s.d}
                    </p>
                    <ul className="space-y-1 mt-auto">
                      {s.outcomes.map((o) => (
                        <li key={o} className="flex gap-1.5 text-[10px] sm:text-[11px] text-[#404040]">
                          <Check className="w-3 h-3 text-[#a67c00] shrink-0 mt-0.5" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] sm:text-[11px] text-[#737373] leading-relaxed">
              {P.valueChain.loopNote}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 6:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <LeopardDarkField>
            <div className="flex flex-col h-full min-h-0 p-5 sm:p-8 md:p-10">
              <DeckEyebrow light theme={theme}>
                {P.agri.eyebrow}
              </DeckEyebrow>
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-[#e0b000]" aria-hidden />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-white text-balance">
                  {P.agri.title}
                </h2>
              </div>
              <p className="text-sm text-white/75 leading-relaxed max-w-3xl mb-4">{P.agri.intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0 content-start">
                {P.agri.points.map((p) => (
                  <div
                    key={p.t}
                    className="rounded-xl border border-white/10 bg-black/35 px-3.5 py-3"
                  >
                    <div className="text-sm font-semibold text-white mb-1">{p.t}</div>
                    <p className="text-xs text-white/60 leading-relaxed">{p.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-white/45 leading-relaxed max-w-3xl">
                Next in the chain: Big Five Foods manufactures from those crops — then Big Five Royal
                places finished foods into national departments for the people of the Nation.
              </p>
            </div>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    case 7:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>FEED · BIG FIVE FOODS™</DeckEyebrow>
            <div className="flex items-center gap-2 mb-1.5">
              <Package className="w-5 h-5 text-[#a67c00] shrink-0" aria-hidden />
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tighter text-black text-balance">
                Products for the Nation&apos;s tables
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-[#525252] mb-2.5 max-w-3xl leading-relaxed">
              Manufactured by Big Five Foods from Nation-farmer crops — delicious, nutritious,
              affordable staples with full flavour ranges for Royal, departmental and community
              kitchens.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2.5 flex-1 min-h-0 content-start">
              {P.products.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl sm:rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm flex flex-col min-w-0"
                >
                  <div className="flex h-20 sm:h-28 w-full shrink-0 items-center justify-center bg-[#fafafa] p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.src}
                      alt={f.title}
                      width={160}
                      height={210}
                      data-deck-src={f.src}
                      data-deck-fit="contain"
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                      loading={pdf ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="p-2 sm:p-2.5 border-t border-black/5 flex flex-col flex-1 min-h-0">
                    <div className="text-[11px] sm:text-xs font-semibold text-black mb-0.5 leading-snug">
                      {f.title}
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-[#737373] leading-snug mb-1.5 line-clamp-2">
                      {f.blurb}
                    </p>
                    <div className="text-[8px] sm:text-[9px] font-semibold text-[#a67c00] mb-1">
                      {f.stats}
                    </div>
                    <div className="mt-auto">
                      <div className="text-[8px] tracking-[1px] font-semibold text-[#a3a3a3] uppercase mb-1">
                        Flavours
                      </div>
                      <div className="flex flex-wrap gap-0.5 sm:gap-1">
                        {f.flavours.map((fl) => (
                          <span
                            key={fl}
                            className="text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-[#e0b000]/30 bg-[#faf6eb] text-[#404040]"
                          >
                            {fl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 8:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>FEED · NUTRITION &amp; VALUE</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
              More nutrition · clearer meal maths
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
              <DeckStatTile
                value={P.nutrition.moreNutrition}
                label="More nutrition by design"
                theme={theme}
              />
              <DeckStatTile
                value={P.nutrition.moreFortification}
                label="More fortification"
                theme={theme}
              />
              <DeckStatTile value={P.nutrition.cheaper} label="Cheaper vs wholesale/retail" theme={theme} />
              <DeckStatTile
                value={MEAL_ZAR}
                subvalue={MEAL_USD}
                label="Per 200g meal framing"
                theme={theme}
              />
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 sm:p-5 flex-1 min-h-0">
              <div className="text-sm font-semibold text-black mb-2">Where it serves the Nation</div>
              <ul className="space-y-2">
                {P.products.map((f) => (
                  <li key={f.title} className="flex gap-2 text-xs sm:text-sm text-[#404040]">
                    <Check className="w-3.5 h-3.5 text-[#a67c00] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-black">{f.title}</strong> — {f.serve}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 9:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>{P.royalDepartments.eyebrow}</DeckEyebrow>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-[#a67c00]" aria-hidden />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance">
                {P.royalDepartments.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed max-w-3xl mb-3">
              {P.royalDepartments.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0 content-start">
              {P.royalDepartments.departments.map((d) => (
                <div
                  key={d.id}
                  className="rounded-xl border border-[#e0b000]/25 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3 shadow-sm flex flex-col"
                >
                  <div className="text-[10px] tracking-[1.5px] font-semibold text-[#a67c00] mb-0.5">
                    {d.short.toUpperCase()}
                  </div>
                  <div className="text-sm font-semibold text-black mb-1 leading-snug">{d.name}</div>
                  <p className="text-[11px] sm:text-xs text-[#525252] leading-relaxed mb-2 flex-1">{d.d}</p>
                  <p className="text-[10px] text-[#a67c00] leading-snug border-t border-[#e0b000]/20 pt-1.5">
                    {d.enable}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-medium text-[#a67c00] leading-relaxed">
              {P.royalDepartments.stackNote}
            </p>
            <p className="mt-1 text-[10px] text-[#737373] leading-relaxed line-clamp-2">
              {P.royalDepartments.note}
            </p>
          </div>
        </DeckSlideShell>
      );

    case 10:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <LeopardDarkField>
            <div className="flex flex-col h-full min-h-0 p-5 sm:p-8 md:p-10">
              <DeckEyebrow light theme={theme}>
                {P.directContainers.eyebrow}
              </DeckEyebrow>
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-[#e0b000]" aria-hidden />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-white text-balance">
                  {P.directContainers.title}
                </h2>
              </div>
              <p className="text-sm text-white/75 leading-relaxed max-w-3xl mb-4">
                {P.directContainers.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0 content-start">
                {P.directContainers.points.map((p) => (
                  <div
                    key={p.t}
                    className="rounded-xl border border-white/10 bg-black/35 px-3.5 py-3"
                  >
                    <div className="text-sm font-semibold text-white mb-1">{p.t}</div>
                    <p className="text-xs text-white/60 leading-relaxed">{p.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-white/45 leading-relaxed max-w-3xl">
                {P.directContainers.note}
              </p>
            </div>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    case 11:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>EDUCATE · SUPER-CUBE®</DeckEyebrow>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-[#a67c00]" aria-hidden />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance">
                {P.leadership.headline}
              </h2>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-4">
              Leadership is how a Nation multiplies dignity. Super-Cube® forms stewards across Royal
              departmental channels, Agri farmer leaders and Direct operators — alongside Connect
              (supplieradvisor.com) so people and trade accelerate together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
              {P.leadership.points.map((p) => (
                <div
                  key={p.t}
                  className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex flex-col shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#a67c00] mb-2" aria-hidden />
                  <div className="text-sm font-semibold text-black mb-2">{p.t}</div>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 12:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <LeopardDarkField>
            <div className="flex flex-col h-full min-h-0 p-5 sm:p-8 md:p-10">
              <DeckEyebrow light theme={theme}>
                EDUCATE · FOR THE NATION
              </DeckEyebrow>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-white text-balance mb-3 max-w-3xl">
                Form stewards who honour the House — and deliver for the people
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0 content-start">
                {[
                  {
                    t: "Royal & household stewards",
                    d: "Whole-person capacity for those closest to ceremonial, hospitality and household service.",
                  },
                  {
                    t: "Community & programme leads",
                    d: "Field and kitchen leadership so Feed programmes run with discipline and dignity.",
                  },
                  {
                    t: "Youth & next generation",
                    d: "Formation pathways so young leaders carry heritage forward without losing modern competence.",
                  },
                  {
                    t: "Public & partner interfaces",
                    d: "Ethical presence where the Nation meets government, donors and commercial partners.",
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="rounded-xl border border-white/10 bg-black/35 px-4 py-3.5"
                  >
                    <div className="text-sm font-semibold text-white mb-1">{item.t}</div>
                    <p className="text-xs text-white/60 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    case 13:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>EMPOWER</DeckEyebrow>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-[#a67c00]" aria-hidden />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance">
                Economic dignity · transparent delivery
              </h2>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed max-w-3xl mb-4">
              Empowerment without proof is theatre. These rails let the Nation trade, give and scale
              with honesty.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
              {P.empower.points.map((p) => (
                <div
                  key={p.t}
                  className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex flex-col shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#a67c00] mb-2" aria-hidden />
                  <div className="text-sm font-semibold text-black mb-2">{p.t}</div>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed flex-1">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 14:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>WHAT EACH SIDE BRINGS</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
              50:50 is not a slogan — it is a division of gifts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="rounded-2xl border border-[#e0b000]/35 bg-[#faf6eb] p-4 sm:p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-4 h-4 text-[#a67c00]" aria-hidden />
                  <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    ZULU NATION · 50%
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  {[
                    "Royal legitimacy and cultural authority",
                    "Community reach across KwaZulu-Natal",
                    "Ceremonial and household pathways",
                    "Stewardship of heritage that must never be diluted",
                    "Vision for unity and progress under His Majesty",
                  ].map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-[#404040]">
                      <Check className="w-3.5 h-3.5 text-[#a67c00] shrink-0 mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#a67c00]" aria-hidden />
                  <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    BIG FIVE GROUP · 50%
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  {[
                    "Big Five Agri — train Nation farmers & secure crop offtake",
                    "Big Five Foods — manufacture fortified African staples",
                    "Big Five Royal — Sports/Arts & Culture, Health, Agriculture, COGTA",
                    "Big Five Direct — community containers selling Foods",
                    "Super-Cube® · SupplierAdvisor® · Foundation · Impact",
                  ].map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-[#404040]">
                      <Check className="w-3.5 h-3.5 text-[#a67c00] shrink-0 mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 15:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>PARTNERSHIP PATHWAYS</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
              How we begin — together
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
              {P.pathways.map((p, i) => (
                <div
                  key={p.t}
                  className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex gap-3 shadow-sm"
                >
                  <div className="text-2xl font-semibold tracking-tighter text-[#e0b000] tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black mb-1">{p.t}</div>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 16:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>SOLUTIONS MAP</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-3">
              Products and solutions at a glance
            </h2>
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white flex-1 min-h-0">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-black/10 bg-[#faf6eb]">
                    <th className="px-3 py-2.5 font-semibold text-[#a67c00]">Need</th>
                    <th className="px-3 py-2.5 font-semibold text-[#a67c00]">Big Five solution</th>
                    <th className="px-3 py-2.5 font-semibold text-[#a67c00] hidden sm:table-cell">
                      For the Nation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      need: "Local farmer livelihoods",
                      sol: "Big Five Agri training & offtake",
                      for: "Zulu Nation farmers supply Foods",
                    },
                    {
                      need: "Fortified manufacturing",
                      sol: "Big Five Foods™ staples",
                      for: "Crops → porridge, soya, one-pots, soups",
                    },
                    {
                      need: "Departmental unlock",
                      sol: "Big Five Royal",
                      for: "Sports/Arts & Culture · Health · Agriculture · COGTA",
                    },
                    {
                      need: "Community enterprise",
                      sol: "Big Five Direct containers",
                      for: "Local people sell & distribute Foods",
                    },
                    {
                      need: "Leadership depth",
                      sol: "Big Five Leadership · Super-Cube®",
                      for: "Royal channels · Agri · Direct operators",
                    },
                    {
                      need: "Verified trade",
                      sol: "Big Five Connect · SupplierAdvisor®",
                      for: "supplieradvisor.com across every channel",
                    },
                    {
                      need: "Shared governance",
                      sol: "50:50 joint steering",
                      for: "Equal voice · equal responsibility",
                    },
                  ].map((row) => (
                    <tr key={row.need} className="border-b border-black/[0.06] last:border-0">
                      <td className="px-3 py-2.5 font-medium text-black align-top">{row.need}</td>
                      <td className="px-3 py-2.5 text-[#404040] align-top">{row.sol}</td>
                      <td className="px-3 py-2.5 text-[#737373] align-top hidden sm:table-cell">
                        {row.for}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DeckSlideShell>
      );

    case 17:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>HONEST LANGUAGE</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
              What this briefing is — and is not
            </h2>
            <ul className="space-y-3 flex-1 min-h-0">
              {P.honesty.map((line) => (
                <li
                  key={line.slice(0, 40)}
                  className="rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 text-xs sm:text-sm text-[#404040] leading-relaxed"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </DeckSlideShell>
      );

    case 18:
      return (
        <DeckSlideShell theme={theme}>
          <LeopardWatermark />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <DeckEyebrow theme={theme}>NEXT STEPS</DeckEyebrow>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tighter text-black text-balance mb-4">
              From briefing to shared work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
              {[
                {
                  n: "01",
                  t: "Private Office dialogue",
                  d: "Confirm authorised counterparts and the scope of a 50:50 discussion under His Majesty’s vision.",
                },
                {
                  n: "02",
                  t: "Agri farmer pilot",
                  d: "Select first Zulu Nation farmer cohorts for Big Five Agri training and crop offtake into Foods.",
                },
                {
                  n: "03",
                  t: "Foods + Royal placement",
                  d: "Manufacture from Nation crops; agree Big Five Royal pathways into departments and community kitchens.",
                },
                {
                  n: "04",
                  t: "Term sheet principles",
                  d: "50:50 equity, governance, community benefit and public language — drafted for legal review.",
                },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold tracking-tighter text-[#e0b000] mb-1">
                    {s.n}
                  </div>
                  <div className="text-sm font-semibold text-black mb-1">{s.t}</div>
                  <p className="text-xs text-[#525252] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </DeckSlideShell>
      );

    case 19:
      return (
        <DeckSlideShell dark theme={theme} className="!p-0">
          <LeopardDarkField>
            <DeckTitleLayout>
              <div>
                <DeckEyebrow light theme={theme}>
                  CALL TO ACTION
                </DeckEyebrow>
                <CoBrandRow light />
                <h2 className="font-semibold tracking-tighter leading-[1.08] text-white text-balance max-w-3xl text-2xl sm:text-3xl md:text-4xl">
                  Let us feed, educate and empower
                  <br />
                  <span style={{ color: "#e0b000" }}>His Majesty&apos;s people — together.</span>
                </h2>
                <p className="text-white/75 max-w-xl mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed mb-4">
                  50:50 · Agri → Foods → Royal (departments) → Direct — accelerated by Connect
                  (supplieradvisor.com) and Leadership (Super-Cube®) on every channel.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${P.contactEmail}?subject=${encodeURIComponent(
                    "Zulu Kingdom × Big Five Group — 50:50 strategic partnership"
                  )}&body=${encodeURIComponent(
                    "Hello Dr. Craig / Big Five team,\n\nI would like to progress a 50:50 strategic partnership discussion between the Zulu Kingdom / Private Office and Big Five Group — Feed · Educate · Empower.\n\nName:\nRole / office:\nPriority interest (nutrition / leadership / empowerment):\n\nThank you."
                  )}`}
                  className="deck-email-cta inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 text-sm"
                  style={{ color: "#000000" }}
                >
                  Email {P.contactEmail}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="text-white/45 text-xs">
                  zulukingdom.co.za · bigfivegroup.africa · Confidential partner briefing
                </div>
              </div>
            </DeckTitleLayout>
          </LeopardDarkField>
        </DeckSlideShell>
      );

    default:
      return null;
  }
}

export default function ZuluKingdomPartnershipDeck() {
  return (
    <div id="zulu-partnership-deck" className="scroll-mt-28 w-full min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="relative h-12 sm:h-14 w-40 sm:w-52 bg-white rounded-xl border-2 border-[#e0b000]/35 px-3 py-1 shadow-sm">
            <Image
              src={P.logoSrc}
              alt="The Zulu Kingdom"
              fill
              className="object-contain p-1"
              sizes="208px"
            />
          </div>
          <div
            className="text-[10px] sm:text-xs tracking-[2px] font-semibold"
            style={{ color: "#a67c00" }}
          >
            ZULU KINGDOM × BIG FIVE · 50:50 PARTNERSHIP · {TOTAL} SLIDES · PRIVATE
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-2 text-balance">
          {P.title}
        </h2>
        <p className="text-sm sm:text-base text-[#525252] max-w-2xl leading-relaxed">{P.subtitle}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeckShell
          id="zulu-deck-shell"
          printRootId="zulu-deck-print-root"
          total={TOTAL}
          theme={theme}
          eyebrow="ZULU KINGDOM PARTNERSHIP DECK"
          title="The Zulu Kingdom × Big Five Group — 50:50 strategic partnership"
          description="Feed · Educate · Empower the Nation — equal partners in service of His Majesty's people."
          sharePath="/partner/zulu-kingdom#zulu-partnership-deck"
          shareTitle="Zulu Kingdom × Big Five Group"
          shareText="50:50 strategic partnership — Feed · Educate · Empower the Zulu Nation."
          renderSlide={(i) => <Slide index={i} />}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-[10px] text-[#a3a3a3] leading-relaxed max-w-3xl">
          {P.honesty[0]} {P.honesty[2]}
        </p>
      </div>
    </div>
  );
}
