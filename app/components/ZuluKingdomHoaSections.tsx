"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  Crown,
  Download,
  FileText,
  Handshake,
  HeartHandshake,
  Landmark,
  Package,
  Scale,
  Shield,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { ZULU_KINGDOM_PARTNERSHIP as P } from "../lib/zuluKingdomPartnership";

const hoa = P.hoa;

const creamCard =
  "rounded-2xl border border-[#e0b000]/22 bg-white/82 backdrop-blur-[1px] p-5 sm:p-6";
const darkCard =
  "rounded-2xl border border-[#e0b000]/22 bg-black/28 backdrop-blur-[2px] p-5 sm:p-6";

function GoldOrnament({ light, className }: { light?: boolean; className?: string }) {
  const line = light
    ? "bg-gradient-to-r from-transparent via-[#e0b000]/85 to-transparent"
    : "bg-gradient-to-r from-transparent via-[#a67c00]/75 to-transparent";
  const gem = light
    ? "border-[#e0b000] bg-[#e0b000]/35"
    : "border-[#a67c00] bg-[#e0b000]/45";
  return (
    <div className={`flex items-center gap-3 ${className ?? "my-6"}`} aria-hidden>
      <span className={`h-px flex-1 ${line}`} />
      <span className={`w-1.5 h-1.5 rotate-45 border shrink-0 ${gem}`} />
      <span className={`h-px flex-1 ${line}`} />
    </div>
  );
}

function GoldHairline({ light }: { light?: boolean }) {
  return (
    <div
      className={`h-px w-full ${
        light
          ? "bg-gradient-to-r from-transparent via-[#e0b000]/70 to-transparent"
          : "bg-gradient-to-r from-transparent via-[#a67c00]/55 to-transparent"
      }`}
      aria-hidden
    />
  );
}

function GoldCorners({ light }: { light?: boolean }) {
  const edge = light ? "border-[#e0b000]/75" : "border-[#a67c00]/70";
  return (
    <>
      <span className={`pointer-events-none absolute top-6 left-6 sm:top-8 sm:left-8 h-8 w-8 border-t border-l ${edge}`} aria-hidden />
      <span className={`pointer-events-none absolute top-6 right-6 sm:top-8 sm:right-8 h-8 w-8 border-t border-r ${edge}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-6 left-6 sm:bottom-8 sm:left-8 h-8 w-8 border-b border-l ${edge}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-6 right-6 sm:bottom-8 sm:right-8 h-8 w-8 border-b border-r ${edge}`} aria-hidden />
    </>
  );
}

function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className={`h-px w-7 sm:w-10 shrink-0 ${light ? "bg-[#e0b000]" : "bg-[#a67c00]"}`} aria-hidden />
      <div
        className={`text-[10px] sm:text-xs tracking-[2.5px] sm:tracking-[3.5px] font-semibold ${
          light ? "text-[#e0b000]" : "text-[#a67c00]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-[10px] tracking-[2.5px] font-semibold mb-2 ${
        light ? "text-[#e0b000]" : "text-[#a67c00]"
      }`}
    >
      {children}
    </div>
  );
}

function HonestyFooter({ light }: { light?: boolean }) {
  return (
    <div className="mt-10">
      <GoldHairline light={light} />
      <p
        className={`mt-5 text-[11px] leading-relaxed max-w-3xl ${
          light ? "text-white/45" : "text-[#737373]"
        }`}
      >
        {hoa.honestyFooter}
      </p>
    </div>
  );
}

function StatusBadge({ light }: { light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-wide ${
        light
          ? "border-[#e0b000]/60 bg-[#e0b000]/12 text-[#e0b000] shadow-[inset_0_1px_0_rgba(224,176,0,0.25),0_0_18px_rgba(224,176,0,0.12)]"
          : "border-[#e0b000]/45 bg-[#fff8e7] text-[#a67c00] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      }`}
    >
      <Scale className="w-3.5 h-3.5" aria-hidden />
      {hoa.statusLabel}
    </span>
  );
}

function EntityStatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0b000]/40 bg-[#faf6eb] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#5c4a12] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <BadgeCheck className="w-3.5 h-3.5 text-[#a67c00]" aria-hidden />
      {hoa.entityStatusLabel}
    </span>
  );
}

function TbcPill() {
  return (
    <span className="inline-flex items-center rounded-full border border-[#e0b000]/50 bg-white px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.5px] text-[#8a6400]">
      TBC
    </span>
  );
}

function TabledPill() {
  return (
    <span className="inline-flex items-center rounded-full border border-[#e0b000]/40 bg-[#faf6eb] px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.5px] text-[#8a6400]">
      Tabled
    </span>
  );
}

function GoldIconCircle({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shrink-0 ${
        light
          ? "border-[#e0b000]/55 bg-[#e0b000]/12 text-[#e0b000] shadow-[0_0_18px_rgba(224,176,0,0.18)]"
          : "border-[#e0b000]/40 bg-[#faf6eb] text-[#a67c00]"
      }`}
    >
      {children}
    </span>
  );
}

function DownloadCta({ light, href, label }: { light?: boolean; href: string; label: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border-2 font-semibold px-6 py-2.5 text-sm transition-colors ${
        light
          ? "border-[#e0b000] bg-[#0a0804]/55 text-[#e0b000] hover:bg-[#e0b000] hover:text-[#0a0804] shadow-[0_0_28px_rgba(224,176,0,0.22)]"
          : "border-[#a67c00] bg-[#0a0804] text-[#e0b000] hover:bg-[#e0b000] hover:text-[#0a0804]"
      }`}
    >
      <Download className="w-4 h-4" aria-hidden />
      {label}
    </a>
  );
}

function LeopardWash({ dark }: { dark?: boolean }) {
  return (
    <>
      <Image
        src={P.leopardHero}
        alt=""
        fill
        className={`object-cover object-center ${dark ? "scale-[1.04]" : "opacity-[0.16]"}`}
        sizes="100vw"
      />
      {dark ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 18% 0%, rgba(224,176,0,0.20), transparent 46%), linear-gradient(118deg, rgba(8,6,2,0.90) 0%, rgba(28,18,6,0.74) 44%, rgba(10,7,3,0.90) 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#e0b000] to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#e0b000]/80 to-transparent"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#faf6eb]/92 via-[#fffdf8]/90 to-[#faf6eb]/96"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e0b000]/50 to-transparent"
            aria-hidden
          />
        </>
      )}
    </>
  );
}

function CoBrandStrip({ light }: { light?: boolean }) {
  const frame = light ? "border-[#e0b000]/55" : "border-[#e0b000]/35";
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7">
      <div
        className={`relative h-14 w-40 sm:h-16 sm:w-52 rounded-xl overflow-hidden border bg-white ${frame}`}
      >
        <Image
          src={P.logoSrc}
          alt="The Zulu Kingdom"
          fill
          className="object-contain p-2"
          sizes="208px"
          priority={light}
        />
      </div>
      <span
        className={`text-lg sm:text-xl font-light leading-none ${light ? "text-[#e0b000]/70" : "text-[#a67c00]/70"}`}
        aria-hidden
      >
        ×
      </span>
      <div
        className={`relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border bg-white ${frame}`}
      >
        <Image
          src="/bigfivegroup-logo.jpg"
          alt="Big Five Group"
          fill
          className="object-contain p-1"
          sizes="64px"
          priority={light}
        />
      </div>
      <p
        className={`text-[10px] sm:text-[11px] tracking-[2px] font-semibold uppercase ${
          light ? "text-[#e0b000]/85" : "text-[#a67c00]"
        }`}
      >
        Zulu Kingdom × Big Five Group
      </p>
    </div>
  );
}

const ACTIVATION_ICONS = {
  izintombi: Sparkles,
  amabutho: Shield,
  calendar: CalendarDays,
  traditional: Landmark,
  yearround: HeartHandshake,
} as const;

/**
 * Long-form HOA principal-terms briefing for the Zulu Kingdom partner portal.
 * BF/RH/HOA/FINAL-V5 — proposed / subject to signature. Not a Palace publication.
 */
export default function ZuluKingdomHoaSections() {
  return (
    <div id="zulu-hoa" className="w-full">
      {/* Isidlo seSilo */}
      <section
        id="isidlo-sesilo"
        className="scroll-mt-28 border-b border-[#e0b000]/25 relative overflow-hidden text-white py-16 sm:py-20 md:py-24"
      >
        <LeopardWash dark />
        <GoldCorners light />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoBrandStrip light />
          <SectionEyebrow light>{hoa.eyebrow}</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-semibold tracking-tighter text-balance max-w-3xl leading-[1.08]">
            {hoa.programmeName}
          </h2>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament light className="my-0" />
          </div>
          <p className="text-[#e0b000] text-base sm:text-lg font-semibold tracking-[0.04em] mb-4">
            {hoa.programmeMeaning}
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <StatusBadge light />
          </div>
          <p className="text-white/72 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {hoa.purpose}
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <DownloadCta light href={hoa.downloadHref} label={hoa.downloadLabel} />
            <span className="text-[11px] text-[#e0b000]/70 tabular-nums tracking-wide">{hoa.ref}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <article className={darkCard}>
              <Kicker light>PROPOSED SIGNING</Kicker>
              <p className="text-lg font-semibold text-white mb-1 tracking-tight">{hoa.signing.date}</p>
              <p className="text-sm text-white/65 leading-relaxed">
                {hoa.signing.venue}
                <br />
                {hoa.signing.event}
              </p>
              <p className="text-[11px] text-white/45 mt-3">Subject to signature — not executed.</p>
            </article>
            <article className={darkCard}>
              <Kicker light>WITNESSES</Kicker>
              <ul className="space-y-2.5">
                {hoa.witnesses.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm text-white/82">
                    <Crown className="w-4 h-4 text-[#e0b000] shrink-0 mt-0.5" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={`${darkCard} sm:col-span-2 lg:col-span-1`}>
              <Kicker light>PARTIES</Kicker>
              <p className="text-sm font-semibold text-white mb-1">{hoa.parties.bigFive.name}</p>
              <p className="text-xs text-white/55 leading-relaxed mb-3">{hoa.parties.bigFive.d}</p>
              <p className="text-sm font-semibold text-white mb-1">{hoa.parties.household.name}</p>
              <p className="text-xs text-white/55 leading-relaxed">{hoa.parties.household.d}</p>
            </article>
          </div>
          <div className={darkCard}>
            <Kicker light>VISION · HOA-PROPOSED</Kicker>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {hoa.vision.map((v) => (
                <li key={v} className="flex gap-2.5 text-sm text-white/82">
                  <Check className="w-4 h-4 text-[#e0b000] shrink-0 mt-0.5" aria-hidden />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <HonestyFooter light />
        </div>
      </section>

      {/* Big Five Royal Foods entity */}
      <section
        id="royal-foods-entity"
        className="scroll-mt-28 border-b border-[#e0b000]/20 relative overflow-hidden py-14 sm:py-18 md:py-20"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>OPERATING COMPANY · ESTABLISHED</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl leading-tight">
            {hoa.entityName}
          </h2>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament className="my-0" />
          </div>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <EntityStatusBadge />
            <StatusBadge />
          </div>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-9">
            {hoa.entityStatusDetail} The HOA sets principal terms for designation as {hoa.entityRole}{" "}
            under Isidlo seSilo — not a Palace entity, and not yet an executed Official Meal Partner
            appointment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <article className={creamCard}>
              <div className="flex items-center gap-3 mb-3">
                <GoldIconCircle>
                  <UtensilsCrossed className="w-5 h-5" aria-hidden />
                </GoldIconCircle>
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  OFFICIAL MEAL PARTNER · AWAITING ROYAL APPROVAL
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2 tracking-tight">{hoa.entityRole}</h3>
              <p className="text-sm text-[#404040] leading-relaxed">
                Designation under {hoa.ref} for Isidlo seSilo — the Official Nutrition Programme of
                the Kingdom. Company established; Royal approval and HOA signature pending.
              </p>
            </article>
            <article className={creamCard}>
              <div className="flex items-center gap-3 mb-3">
                <GoldIconCircle>
                  <BadgeCheck className="w-5 h-5" aria-hidden />
                </GoldIconCircle>
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  EXCLUSIVE TERM · HOA-PROPOSED
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2 tracking-tight">Listed royal activations</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.exclusiveTerm}</p>
              <p className="text-xs text-[#737373] mt-3 leading-relaxed">
                Exclusivity is a principal commercial term only — not a gazetted royal appointment
                and not in force until the HOA is executed and Royal approval is granted.
              </p>
            </article>
          </div>
          <div className={`${creamCard} flex flex-wrap items-center gap-4`}>
            <div className="relative h-16 w-36 shrink-0 rounded-xl overflow-hidden bg-white border border-[#e0b000]/30 p-1.5 shadow-sm">
              <Image
                src="/bigfivefoods-logo.png"
                alt="Big Five Foods"
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
            <p className="text-sm text-[#525252] leading-relaxed min-w-0 flex-1">
              Manufacturing remains Big Five Foods™ — fortified porridges, one-pots, soya and soups
              placed through Big Five Royal Foods (Pty) Ltd for household, ceremonial and programme
              tables once Royal approval is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section
        id="governance"
        className="scroll-mt-28 border-b border-[#e0b000]/20 relative overflow-hidden py-14 sm:py-18 md:py-20"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>GOVERNANCE · BOARD &amp; PATRONS</SectionEyebrow>
          <div className="flex items-center gap-3 mb-3">
            <GoldIconCircle>
              <Building2 className="w-5 h-5" aria-hidden />
            </GoldIconCircle>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl leading-tight">
              Board as tabled in the HOA
            </h2>
          </div>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament className="my-0" />
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Seats below are principal terms only. TBC designations remain open until the Royal
            Household and Big Five Group confirm them — they are not appointments.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#e0b000]/25 mb-10 bg-white/80">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">Proposed board of {hoa.entityName}</caption>
              <thead>
                <tr className="border-b border-[#e0b000]/30 bg-[#faf6eb]">
                  <th className="px-4 sm:px-5 py-3.5 text-[10px] tracking-[2.5px] font-semibold text-[#8a6400]">
                    PERSON
                  </th>
                  <th className="px-4 sm:px-5 py-3.5 text-[10px] tracking-[2.5px] font-semibold text-[#8a6400]">
                    SEAT
                  </th>
                  <th className="px-4 sm:px-5 py-3.5 text-[10px] tracking-[2.5px] font-semibold text-[#8a6400]">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {hoa.board.map((row, i) => (
                  <tr
                    key={row.person}
                    className={`border-b border-[#e0b000]/10 last:border-0 ${
                      i % 2 === 0 ? "bg-white/70" : "bg-[#faf6eb]/70"
                    }`}
                  >
                    <td className="px-4 sm:px-5 py-4 text-sm font-semibold text-black align-top">
                      {row.person}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-sm text-[#404040] leading-relaxed align-top">
                      {row.seat}
                    </td>
                    <td className="px-4 sm:px-5 py-4 align-top">
                      {row.tbc ? <TbcPill /> : <TabledPill />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-7 bg-[#a67c00]" aria-hidden />
            <div className="text-[10px] tracking-[2.5px] font-semibold text-[#a67c00]">
              ROYAL PATRONS
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {hoa.patrons.map((p) => (
              <article key={p.person} className={creamCard}>
                <div className="flex items-center gap-3 mb-3">
                  <GoldIconCircle>
                    <Crown className="w-4 h-4" aria-hidden />
                  </GoldIconCircle>
                  <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    {p.role.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2 tracking-tight">{p.person}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{p.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-28 border-b border-[#e0b000]/20 relative overflow-hidden py-14 sm:py-18 md:py-20">
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>ROLES · EXECUTION &amp; LIAISON</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl leading-tight">
            Who stewards the proposed company
          </h2>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament className="my-0" />
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Operating roles as tabled. Dr. Joy&apos;s designation remains TBC; the Queens hold a
            joint mandate on meal standards and women-centric programmes.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
            {hoa.roles.map((r) => {
              const tbc = r.title.includes("TBC");
              return (
                <article
                  key={r.person}
                  className={`${creamCard} flex flex-col ${tbc ? "bg-[#fff8e7]/95" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                      {tbc ? "ROLE TBC" : "TABLED ROLE"}
                    </div>
                    {tbc ? <TbcPill /> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-1 tracking-tight">{r.person}</h3>
                  <p className="text-xs text-[#737373] leading-snug mb-4">{r.title}</p>
                  <ul className="space-y-2 mt-auto">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-[#404040] leading-relaxed">
                        <Check className="w-4 h-4 text-[#a67c00] shrink-0 mt-0.5" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <aside className={`${creamCard} border-[#e0b000]/45 shadow-[inset_3px_0_0_0_#e0b000,0_14px_40px_rgba(166,124,0,0.12)]`}>
            <div className="flex items-center gap-3 mb-3">
              <GoldIconCircle>
                <Handshake className="w-5 h-5" aria-hidden />
              </GoldIconCircle>
              <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                QUEENS · JOINT MANDATE
              </div>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2 tracking-tight">
              Prince Ntokozo and the Queens
            </h3>
            <p className="text-sm text-[#404040] leading-relaxed">{hoa.queensMandate}</p>
          </aside>
        </div>
      </section>

      {/* Activations */}
      <section
        id="activations"
        className="scroll-mt-28 border-b border-[#e0b000]/25 text-white py-14 sm:py-18 md:py-20 relative overflow-hidden"
      >
        <LeopardWash dark />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow light>ROYAL ACTIVATIONS · HOA-PROPOSED SCOPE</SectionEyebrow>
          <div className="flex items-center gap-3 mb-3">
            <GoldIconCircle light>
              <Crown className="w-5 h-5" aria-hidden />
            </GoldIconCircle>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance max-w-3xl leading-tight">
              Where Isidlo seSilo would serve
            </h2>
          </div>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament light className="my-0" />
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            Exclusive fortified-meal provision for the activations listed below is an HOA-proposed
            commercial term — not a live award. Headcounts are as tabled in {hoa.ref}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {hoa.activations.map((a) => {
              const Icon =
                ACTIVATION_ICONS[a.id as keyof typeof ACTIVATION_ICONS] ?? Users;
              return (
                <article
                  key={a.id}
                  className={`${darkCard} p-4 sm:p-5 flex flex-col`}
                >
                  <GoldIconCircle light>
                    <Icon className="w-5 h-5" aria-hidden />
                  </GoldIconCircle>
                  <h3 className="text-base font-semibold text-white mt-3.5 mb-1.5 tracking-tight">{a.t}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">{a.detail}</p>
                  <p className="text-xs font-semibold text-[#e0b000] leading-relaxed border-t border-[#e0b000]/25 pt-3">
                    {a.headcount}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Royal commercial */}
      <section
        id="royal-commercial"
        className="scroll-mt-28 border-b border-[#e0b000]/20 relative overflow-hidden py-14 sm:py-18 md:py-20"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>COMMERCIAL TERM · HOA-PROPOSED</SectionEyebrow>
          <div className="flex items-center gap-3 mb-3">
            <GoldIconCircle>
              <FileText className="w-5 h-5" aria-hidden />
            </GoldIconCircle>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl leading-tight">
              How offtake and invoicing would work
            </h2>
          </div>
          <div className="mt-4 mb-5 max-w-xs">
            <GoldOrnament className="my-0" />
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Figures and channels below are principal terms only. No Royal Rate rand amount is
            published here; offtake is a planned monthly range, not a contracted volume.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <article className={creamCard}>
              <GoldIconCircle>
                <CalendarDays className="w-5 h-5" aria-hidden />
              </GoldIconCircle>
              <h3 className="text-base font-semibold text-black mt-3 mb-2 tracking-tight">Advance headcount</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.commercial.headcountRule}</p>
            </article>
            <article className={creamCard}>
              <GoldIconCircle>
                <Scale className="w-5 h-5" aria-hidden />
              </GoldIconCircle>
              <h3 className="text-base font-semibold text-black mt-3 mb-2 tracking-tight">Royal Rate</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.commercial.price}</p>
            </article>
          </div>
          <article className={`${creamCard} mb-6 text-center sm:text-left py-7 sm:py-8`}>
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-4">
              <div className="text-[10px] tracking-[2.5px] font-semibold text-[#a67c00]">
                {hoa.commercial.offtakeLabel.toUpperCase()}
              </div>
              <span className="inline-flex items-center rounded-full border border-[#e0b000]/45 bg-[#fff8e7] px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.5px] text-[#a67c00]">
                HOA-proposed
              </span>
            </div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#e0b000] tabular-nums mb-3 leading-none">
              {hoa.commercial.offtakeRange}
            </p>
            <GoldOrnament className="my-4 max-w-md mx-auto sm:mx-0" />
            <p className="text-sm text-[#737373] leading-relaxed">
              Planned monthly range — not a contracted offtake, not a live order book.
            </p>
          </article>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <article className={creamCard}>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  FUNDING MIX · PROPOSED CHANNELS
                </div>
                <span className="inline-flex items-center rounded-full border border-[#c9a227] bg-gradient-to-b from-[#fff8e7] to-[#f3e2b0] px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.5px] text-[#8a6400]">
                  Proposed
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {hoa.commercial.fundingMix.map((ch) => (
                  <li
                    key={ch}
                    className="inline-flex items-center rounded-full border border-[#e0b000]/40 bg-[#fff8e7] px-3.5 py-1.5 text-sm text-[#404040] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                  >
                    {ch}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#737373] mt-4 leading-relaxed">
                Named corporates are illustrative CSI channels in the HOA — not confirmed sponsor
                awards.
              </p>
            </article>
            <article className={creamCard}>
              <div className="flex items-center gap-3 mb-4">
                <GoldIconCircle>
                  <Package className="w-4 h-4" aria-hidden />
                </GoldIconCircle>
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  PRODUCTS IN SCOPE
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {hoa.commercial.productsInScope.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center rounded-full border border-[#e0b000]/35 bg-white px-3.5 py-1.5 text-sm text-[#404040]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <DownloadCta href={hoa.downloadHref} label={hoa.downloadLabel} />
            <Link
              href="#honesty"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a67c00] hover:text-black"
            >
              Read honesty notes
            </Link>
          </div>
          <HonestyFooter />
        </div>
      </section>
    </div>
  );
}
