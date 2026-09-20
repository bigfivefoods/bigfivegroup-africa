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

function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] font-semibold mb-2 ${
        light ? "text-[#e0b000]" : "text-[#a67c00]"
      }`}
    >
      {children}
    </div>
  );
}

function HonestyFooter({ light }: { light?: boolean }) {
  return (
    <p
      className={`mt-8 text-[11px] leading-relaxed max-w-3xl ${
        light ? "text-white/45" : "text-[#737373]"
      }`}
    >
      {hoa.honestyFooter}
    </p>
  );
}

function StatusBadge({ light }: { light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${
        light
          ? "border-[#e0b000]/40 bg-black/40 text-[#e0b000]"
          : "border-[#e0b000]/40 bg-[#faf6eb] text-[#a67c00]"
      }`}
    >
      <Scale className="w-3.5 h-3.5" aria-hidden />
      {hoa.statusLabel}
    </span>
  );
}

function EntityStatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/30 bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-900">
      <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
      {hoa.entityStatusLabel}
    </span>
  );
}

function LeopardWash({ dark }: { dark?: boolean }) {
  return (
    <>
      <Image
        src={P.leopardHero}
        alt=""
        fill
        className={`object-cover object-center ${dark ? "" : "opacity-[0.14]"}`}
        sizes="100vw"
      />
      {dark ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(10,8,4,0.92) 0%, rgba(20,14,6,0.84) 50%, rgba(10,8,4,0.90) 100%)",
          }}
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6eb]/90 via-white/85 to-[#faf6eb]/95" aria-hidden />
      )}
    </>
  );
}

function CoBrandStrip({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <div
        className={`relative h-12 w-36 sm:h-14 sm:w-44 rounded-xl overflow-hidden border-2 bg-white shadow-sm ${
          light ? "border-white/50" : "border-[#e0b000]/35"
        }`}
      >
        <Image src={P.logoSrc} alt="The Zulu Kingdom" fill className="object-contain p-1.5" sizes="176px" />
      </div>
      <span className={`text-lg font-light ${light ? "text-white/40" : "text-black/25"}`} aria-hidden>
        ×
      </span>
      <div
        className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden border-2 bg-white shadow-sm ${
          light ? "border-white/50" : "border-black/10"
        }`}
      >
        <Image src="/bigfivefoods-logo.png" alt="Big Five Foods" fill className="object-contain p-1" sizes="56px" />
      </div>
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
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden text-white py-12 sm:py-16"
      >
        <LeopardWash dark />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoBrandStrip light />
          <SectionEyebrow light>{hoa.eyebrow}</SectionEyebrow>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance max-w-3xl">
              {hoa.programmeName}
            </h2>
            <StatusBadge light />
          </div>
          <p className="text-[#e0b000] text-sm sm:text-base font-semibold tracking-wide mb-3">
            {hoa.programmeMeaning}
          </p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
            {hoa.purpose}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href={hoa.downloadHref}
              className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold px-5 py-2.5 text-sm hover:bg-[#e0b000] transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden />
              {hoa.downloadLabel}
            </a>
            <span className="text-[11px] text-white/50 tabular-nums">{hoa.ref}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <article className="rounded-2xl border border-[#e0b000]/25 bg-black/35 backdrop-blur-[2px] p-5">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-2">
                PROPOSED SIGNING
              </div>
              <p className="text-base font-semibold text-white mb-1">{hoa.signing.date}</p>
              <p className="text-sm text-white/65 leading-relaxed">
                {hoa.signing.venue}
                <br />
                {hoa.signing.event}
              </p>
              <p className="text-[11px] text-white/45 mt-3">Subject to signature — not executed.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-[2px] p-5">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-2">
                WITNESSES
              </div>
              <ul className="space-y-2">
                {hoa.witnesses.map((w) => (
                  <li key={w} className="flex gap-2 text-sm text-white/80">
                    <Crown className="w-4 h-4 text-[#e0b000] shrink-0 mt-0.5" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-[2px] p-5 sm:col-span-2 lg:col-span-1">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-2">
                PARTIES
              </div>
              <p className="text-sm font-semibold text-white mb-1">{hoa.parties.bigFive.name}</p>
              <p className="text-xs text-white/55 leading-relaxed mb-3">{hoa.parties.bigFive.d}</p>
              <p className="text-sm font-semibold text-white mb-1">{hoa.parties.household.name}</p>
              <p className="text-xs text-white/55 leading-relaxed">{hoa.parties.household.d}</p>
            </article>
          </div>
          <div className="rounded-2xl border border-[#e0b000]/25 bg-black/35 backdrop-blur-[2px] p-5 sm:p-6">
            <div className="text-[10px] tracking-[2px] font-semibold text-[#e0b000] mb-3">
              VISION · HOA-PROPOSED
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {hoa.vision.map((v) => (
                <li key={v} className="flex gap-2 text-sm text-white/80">
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
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden py-12 sm:py-16"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoBrandStrip />
          <SectionEyebrow>OPERATING COMPANY · ESTABLISHED</SectionEyebrow>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              {hoa.entityName}
            </h2>
            <EntityStatusBadge />
            <StatusBadge />
          </div>
          <p className="text-sm sm:text-base text-[#404040] leading-relaxed max-w-3xl mb-8">
            {hoa.entityStatusDetail} The HOA sets principal terms for designation as {hoa.entityRole}{" "}
            under Isidlo seSilo — not a Palace entity, and not yet an executed Official Meal Partner
            appointment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <article className="rounded-2xl border border-[#e0b000]/35 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed className="w-5 h-5 text-[#a67c00]" aria-hidden />
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  OFFICIAL MEAL PARTNER · AWAITING ROYAL APPROVAL
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">{hoa.entityRole}</h3>
              <p className="text-sm text-[#404040] leading-relaxed">
                Designation under {hoa.ref} for Isidlo seSilo — the Official Nutrition Programme of
                the Kingdom. Company established; Royal approval and HOA signature pending.
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-[#a67c00]" aria-hidden />
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  EXCLUSIVE TERM · HOA-PROPOSED
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Listed royal activations</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.exclusiveTerm}</p>
              <p className="text-xs text-[#737373] mt-3 leading-relaxed">
                Exclusivity is a principal commercial term only — not a gazetted royal appointment
                and not in force until the HOA is executed and Royal approval is granted.
              </p>
            </article>
          </div>
          <div className="rounded-2xl border border-[#e0b000]/30 bg-white/95 p-5 sm:p-6 flex flex-wrap items-center gap-4 shadow-sm">
            <div className="relative h-14 w-32 shrink-0 rounded-xl overflow-hidden bg-white border border-black/10 p-1.5">
              <Image
                src="/bigfivefoods-logo.png"
                alt="Big Five Foods"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <p className="text-sm text-[#525252] leading-relaxed min-w-0 flex-1">
              Manufacturing remains Big Five Foods™ — fortified porridges, one-pots, soya and soups
              placed through Big Five Royal Foods (Pty) Ltd for household, ceremonial and programme
              tables once Royal approval is confirmed.
            </p>
          </div>
          <HonestyFooter />
        </div>
      </section>

      {/* Governance */}
      <section
        id="governance"
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden py-12 sm:py-16"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoBrandStrip />
          <SectionEyebrow>GOVERNANCE · BOARD &amp; PATRONS</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              Board as tabled in the HOA
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Seats below are principal terms only. TBC designations remain open until the Royal
            Household and Big Five Group confirm them — they are not appointments.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#e0b000]/25 bg-white mb-10">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">Proposed board of {hoa.entityName}</caption>
              <thead>
                <tr className="border-b border-[#e0b000]/25 bg-[#faf6eb]">
                  <th className="px-4 sm:px-5 py-3 text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    PERSON
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    SEAT
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {hoa.board.map((row) => (
                  <tr key={row.person} className="border-b border-black/5 last:border-0">
                    <td className="px-4 sm:px-5 py-4 text-sm font-semibold text-black align-top">
                      {row.person}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-sm text-[#404040] leading-relaxed align-top">
                      {row.seat}
                    </td>
                    <td className="px-4 sm:px-5 py-4 align-top">
                      {row.tbc ? (
                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-amber-800">
                          TBC
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-[#e0b000]/35 bg-[#faf6eb] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#a67c00]">
                          Tabled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00] mb-3">
            ROYAL PATRONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {hoa.patrons.map((p) => (
              <article
                key={p.person}
                className="rounded-2xl border border-[#e0b000]/30 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-[#a67c00]" aria-hidden />
                  <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                    {p.role.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{p.person}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{p.lead}</p>
              </article>
            ))}
          </div>
          <HonestyFooter />
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-28 border-b border-black/10 relative overflow-hidden py-12 sm:py-16">
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>ROLES · EXECUTION &amp; LIAISON</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance mb-3 max-w-3xl">
            Who stewards the proposed company
          </h2>
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
                  className={`rounded-2xl border p-5 sm:p-6 flex flex-col ${
                    tbc
                      ? "border-amber-200 bg-amber-50/40"
                      : "border-black/10 bg-[#fafafa]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                      {tbc ? "ROLE TBC" : "TABLED ROLE"}
                    </div>
                    {tbc ? (
                      <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                        TBC
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-1">{r.person}</h3>
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
          <aside className="rounded-2xl border-2 border-[#e0b000]/40 bg-[#faf6eb] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Handshake className="w-5 h-5 text-[#a67c00]" aria-hidden />
              <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                QUEENS · JOINT MANDATE
              </div>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Prince Ntokozo and the Queens
            </h3>
            <p className="text-sm text-[#404040] leading-relaxed">{hoa.queensMandate}</p>
          </aside>
          <HonestyFooter />
        </div>
      </section>

      {/* Activations */}
      <section
        id="activations"
        className="scroll-mt-28 border-b border-black/10 bg-[#0a0804] text-white py-12 sm:py-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url(${P.leopardHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow light>ROYAL ACTIVATIONS · HOA-PROPOSED SCOPE</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-6 h-6 text-[#e0b000]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance max-w-3xl">
              Where Isidlo seSilo would serve
            </h2>
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            Exclusive fortified-meal provision for the activations listed below is an HOA-proposed
            commercial term — not a live award. Headcounts are as tabled in {hoa.ref}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {hoa.activations.map((a) => {
              const Icon =
                ACTIVATION_ICONS[a.id as keyof typeof ACTIVATION_ICONS] ?? Users;
              return (
                <article
                  key={a.id}
                  className="rounded-2xl border border-[#e0b000]/25 bg-black/40 p-5 sm:p-6 flex flex-col"
                >
                  <Icon className="w-5 h-5 text-[#e0b000] mb-3" aria-hidden />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5">{a.t}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">{a.detail}</p>
                  <p className="text-xs font-semibold text-[#e0b000] leading-relaxed border-t border-[#e0b000]/20 pt-3">
                    {a.headcount}
                  </p>
                </article>
              );
            })}
          </div>
          <HonestyFooter light />
        </div>
      </section>

      {/* Royal commercial */}
      <section
        id="royal-commercial"
        className="scroll-mt-28 border-b border-black/10 relative overflow-hidden py-12 sm:py-16"
      >
        <LeopardWash />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoBrandStrip />
          <SectionEyebrow>COMMERCIAL TERM · HOA-PROPOSED</SectionEyebrow>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-6 h-6 text-[#a67c00]" aria-hidden />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance max-w-3xl">
              How offtake and invoicing would work
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl mb-8">
            Figures and channels below are principal terms only. No Royal Rate rand amount is
            published here; offtake is a planned monthly range, not a contracted volume.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <article className="rounded-2xl border border-[#e0b000]/30 bg-white p-5 sm:p-6">
              <CalendarDays className="w-5 h-5 text-[#a67c00] mb-3" aria-hidden />
              <h3 className="text-base font-semibold text-black mb-2">Advance headcount</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.commercial.headcountRule}</p>
            </article>
            <article className="rounded-2xl border border-[#e0b000]/30 bg-white p-5 sm:p-6">
              <Scale className="w-5 h-5 text-[#a67c00] mb-3" aria-hidden />
              <h3 className="text-base font-semibold text-black mb-2">Royal Rate</h3>
              <p className="text-sm text-[#404040] leading-relaxed">{hoa.commercial.price}</p>
            </article>
          </div>
          <article className="rounded-2xl border-2 border-[#e0b000]/40 bg-white p-5 sm:p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                {hoa.commercial.offtakeLabel.toUpperCase()}
              </div>
              <span className="inline-flex items-center rounded-full border border-[#e0b000]/40 bg-[#faf6eb] px-2.5 py-0.5 text-[11px] font-semibold text-[#a67c00]">
                HOA-proposed
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-semibold tracking-tighter text-black tabular-nums mb-1">
              {hoa.commercial.offtakeRange}
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Planned monthly range — not a contracted offtake, not a live order book.
            </p>
          </article>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <article className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  FUNDING MIX · PROPOSED CHANNELS
                </div>
                <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                  Proposed
                </span>
              </div>
              <ul className="space-y-2">
                {hoa.commercial.fundingMix.map((ch) => (
                  <li key={ch} className="flex gap-2 text-sm text-[#404040] leading-relaxed">
                    <Check className="w-4 h-4 text-[#a67c00] shrink-0 mt-0.5" aria-hidden />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#737373] mt-4 leading-relaxed">
                Named corporates are illustrative CSI channels in the HOA — not confirmed sponsor
                awards.
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[#a67c00]" aria-hidden />
                <div className="text-[10px] tracking-[2px] font-semibold text-[#a67c00]">
                  PRODUCTS IN SCOPE
                </div>
              </div>
              <ul className="space-y-2">
                {hoa.commercial.productsInScope.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-[#404040] leading-relaxed">
                    <Check className="w-4 h-4 text-[#a67c00] shrink-0 mt-0.5" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hoa.downloadHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0804] text-white font-semibold px-5 py-2.5 text-sm hover:bg-[#a67c00] transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden />
              {hoa.downloadLabel}
            </a>
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
