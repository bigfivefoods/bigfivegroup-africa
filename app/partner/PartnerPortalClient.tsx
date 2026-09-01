"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Handshake,
  Lock,
  Package,
  Share2,
  Truck,
  Users,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { CONTACT_EMAIL } from "../lib/contact";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { SANTACO, SANTACO_PARTNERSHIP } from "../lib/santaco";
import { FOODS_ECONOMICS } from "../lib/foodsEconomics";
import {
  BIG_FIVE_LOGO,
  mergePartnerResources,
  type ClientPartnerProfile,
  type PartnerDirectoryEntry,
  type PartnerProgrammeId,
} from "../lib/partner-public";
import { track } from "../lib/analytics";
import SparPartnershipDeck from "../components/SparPartnershipDeck";
import SparPartnershipDeckCondensed from "../components/SparPartnershipDeckCondensed";
import CheckersPartnershipDeck from "../components/CheckersPartnershipDeck";
import CheckersPartnershipDeckCondensed from "../components/CheckersPartnershipDeckCondensed";
import BffSwtAgPartnershipDeck from "../components/BffSwtAgPartnershipDeck";
import BfgPartnerDeck from "../components/BfgPartnerDeck";

function partnerShareUrls(slug: string) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://bigfivegroup.africa";
  const workspace = `${origin}/partner/${slug}`;
  const login = `${origin}/partner/login?from=${encodeURIComponent(`/partner/${slug}`)}`;
  return { workspace, login };
}

function SharePartnerButton({ partner }: { partner: ClientPartnerProfile }) {
  const [state, setState] = useState<"idle" | "copied" | "shared" | "error">("idle");

  const onShare = useCallback(async () => {
    const { workspace, login } = partnerShareUrls(partner.slug);
    const title = `${partner.name} × Big Five Group — partner workspace`;
    const text = [
      partner.headline,
      "",
      "Open your private partner briefing:",
      workspace,
      "",
      "If you need to sign in first:",
      login,
    ].join("\n");

    track("partner_share", { slug: partner.slug });

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url: workspace });
        setState("shared");
        window.setTimeout(() => setState("idle"), 2500);
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${title}\n\n${text}`);
        setState("copied");
        window.setTimeout(() => setState("idle"), 2500);
        return;
      }
      setState("error");
    } catch (e) {
      // User cancelled share sheet — ignore
      if (e instanceof Error && e.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(workspace);
        setState("copied");
        window.setTimeout(() => setState("idle"), 2500);
      } catch {
        setState("error");
      }
    }
  }, [partner.headline, partner.name, partner.slug]);

  const label =
    state === "copied"
      ? "Link copied"
      : state === "shared"
        ? "Shared"
        : state === "error"
          ? "Copy failed"
          : "Share workspace";

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 text-sm font-semibold transition-colors"
      title="Share this partner page URL (and login link) with your contact"
    >
      {state === "copied" || state === "shared" ? (
        <Check className="w-4 h-4 shrink-0" />
      ) : state === "error" ? (
        <Copy className="w-4 h-4 shrink-0" />
      ) : (
        <Share2 className="w-4 h-4 shrink-0" />
      )}
      {label}
    </button>
  );
}

function CoBrandHeader({ partner }: { partner: ClientPartnerProfile }) {
  const partnerLogo = partner.logoSrc;
  const showPartnerLogo = partnerLogo && partner.slug !== "big-five-group";
  /** Crest-style logos need a taller tile */
  const tallCrest =
    partner.slug === "the-sharks" ||
    partner.slug === "restore-africa-foundation" ||
    partner.slug === "department-of-basic-education" ||
    partner.slug === "department-of-health";

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {showPartnerLogo ? (
          <>
            <div
              className={`relative bg-white rounded-xl border border-white/25 shadow-sm ${
                tallCrest
                  ? "h-20 sm:h-24 w-20 sm:w-24 p-2"
                  : "h-14 sm:h-16 w-[min(100%,12rem)] sm:w-56 px-3 py-2"
              }`}
            >
              <Image
                src={partnerLogo}
                alt={partner.organisation}
                fill
                className="object-contain p-1.5"
                sizes={tallCrest ? "96px" : "224px"}
                priority
              />
            </div>
            <div
              className="text-white/40 text-xl sm:text-2xl font-light select-none px-0.5"
              aria-hidden
            >
              ×
            </div>
            <div className="relative h-14 sm:h-16 w-14 sm:w-16 shrink-0 drop-shadow-md">
              <Image
                src={BIG_FIVE_LOGO}
                alt="Big Five Group"
                fill
                className="object-contain object-left"
                sizes="64px"
                priority
              />
            </div>
          </>
        ) : (
          <div className="relative h-14 w-14 sm:h-16 sm:w-16">
            <Image
              src={BIG_FIVE_LOGO}
              alt="Big Five Group"
              fill
              className="object-contain object-left drop-shadow-md"
              sizes="64px"
              priority
            />
          </div>
        )}
      </div>
      {showPartnerLogo && (
        <p className="mt-3 text-[10px] sm:text-xs tracking-[2px] text-white/45 font-medium uppercase">
          Co-branded partnership · {partner.name} × Big Five Group
        </p>
      )}
    </div>
  );
}

function ProgrammeBlocks({ ids }: { ids?: PartnerProgrammeId[] }) {
  const show = new Set(ids ?? ["nsnp", "santaco"]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      {show.has("nsnp") && (
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
          <div className="text-[10px] tracking-[2px] font-semibold text-amber-800 mb-2">
            FOODS · {NSNP.shortName}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
            {NSNP_CASE.headline}
          </h3>
          <p className="text-sm text-[#404040] leading-relaxed mb-4">{NSNP_CASE.approval}</p>
          <ul className="space-y-1.5 text-sm text-[#525252] mb-4">
            <li>· {FOODS_ECONOMICS.grossProfit.value} GP (management-reported)</li>
            <li>
              · {FOODS_ECONOMICS.cheaperThanMarket.value} cheaper vs wholesale & retail (internal)
            </li>
            <li>· Recurring institutional demand as menus reorder</li>
          </ul>
          <a
            href={NSNP.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            DBE · {NSNP.shortName}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </article>
      )}
      {show.has("santaco") && (
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
          <div className="text-[10px] tracking-[2px] font-semibold text-orange-800 mb-2">
            DIRECT · {SANTACO.shortName}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
            {SANTACO_PARTNERSHIP.title}
          </h3>
          <p className="text-sm text-[#404040] leading-relaxed mb-4">
            {SANTACO_PARTNERSHIP.containers.detail}
          </p>
          <ul className="space-y-1.5 text-sm text-[#525252] mb-4">
            {SANTACO_PARTNERSHIP.inContainer.map((x) => (
              <li key={x.t}>
                · <strong className="text-[#404040]">{x.t}:</strong> {x.d}
              </li>
            ))}
          </ul>
          <a
            href={SANTACO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            {SANTACO.shortName}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </article>
      )}
      {show.has("connect") && (
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
          <div className="text-[10px] tracking-[2px] font-semibold text-cyan-800 mb-2">
            CONNECT · SUPPLIERADVISOR®
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
            Verified trade operating system
          </h3>
          <p className="text-sm text-[#404040] leading-relaxed mb-4">
            Ethical B2B / B2G commerce rails — verification, lots, SHEQ and SAM — so partnerships
            run with proof, not spreadsheets alone.
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            Open Connect
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </article>
      )}
      {show.has("leadership") && (
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
          <div className="text-[10px] tracking-[2px] font-semibold text-yellow-800 mb-2">
            LEADERSHIP · SUPER-CUBE®
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
            Whole-person leadership formation
          </h3>
          <p className="text-sm text-[#404040] leading-relaxed mb-4">
            Super-Cube® programmes for public and private cohorts — capacity that holds complex
            multi-stakeholder delivery.
          </p>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            Open Leadership
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </article>
      )}
      {show.has("impact") && (
        <article className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0">
          <div className="text-[10px] tracking-[2px] font-semibold text-violet-800 mb-2">
            IMPACT · PMO
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-black mb-2">
            Cross-pillar delivery office
          </h3>
          <p className="text-sm text-[#404040] leading-relaxed mb-4">
            Programme design, gates and field assurance — including institutional health pathways
            via Big Five Impact.
          </p>
          <Link
            href="/impact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
          >
            Open Impact
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </article>
      )}
    </div>
  );
}

export default function PartnerPortalClient({
  email,
  partner,
  isAdmin,
  directory,
}: {
  email: string;
  partner: ClientPartnerProfile;
  isAdmin?: boolean;
  /** Admin-only list of other workspaces (no emails). */
  directory?: PartnerDirectoryEntry[];
}) {
  const resources = mergePartnerResources(partner);

  const heroBg = partner.brandColor ?? "#052e1c";

  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      <section className="text-white" style={{ backgroundColor: heroBg }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-white/70 mb-4">
                <Lock className="w-3.5 h-3.5" />
                PRIVATE · YOUR ORGANISATION · /partner/{partner.slug}
              </div>
              <CoBrandHeader partner={partner} />
              <div className="text-xs font-semibold text-white/70 mb-2">
                {partner.organisation} · {partner.role}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-3">
                {partner.headline}
              </h1>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-2">
                Signed in as{" "}
                <span className="text-white font-medium break-all">{email}</span>
              </p>
              <p className="text-white/55 text-sm leading-relaxed text-pretty">{partner.summary}</p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-semibold text-white/80 hover:text-white underline underline-offset-2"
                >
                  {partner.websiteLabel ?? partner.website}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {partner.focus.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {partner.focus.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/25 bg-white/10 text-white"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 items-stretch sm:items-end lg:items-stretch">
              <SharePartnerButton partner={partner} />
              <LogoutButton />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: Package,
                t: "Foods · NSNP",
                d: "Programme landed · plan scale · institutional economics",
              },
              {
                icon: Truck,
                t: "Direct · SANTACO",
                d: "Rank & rural container partnership plan",
              },
              {
                icon: Handshake,
                t: partner.name,
                d: "Your organisation workspace on Big Five Group",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 min-w-0"
              >
                <c.icon className="w-5 h-5 text-emerald-300 mb-3" />
                <div className="text-sm font-semibold text-white mb-1">{c.t}</div>
                <p className="text-xs text-white/55 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sticky top-[var(--navbar-height)] z-30 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {(() => {
            const navLinks = [
              { href: "#for-you", label: "For you" },
              { href: "#programmes", label: "Programmes" },
              ...(partner.slug === "spar"
                ? [
                    { href: "#spar-partnership-deck-condensed", label: "SPAR condensed" },
                    { href: "#spar-partnership-deck", label: "SPAR full deck" },
                  ]
                : []),
              ...(partner.slug === "checkers"
                ? [
                    { href: "#checkers-partnership-deck-condensed", label: "Checkers condensed" },
                    { href: "#checkers-partnership-deck", label: "Checkers full deck" },
                  ]
                : []),
              ...(partner.slug === "swt-ag"
                ? [{ href: "#bff-swt-deck", label: "BFF × SWT-AG funding deck" }]
                : []),
              ...(partner.slug === "big-five-group"
                ? [{ href: "#bfg-partner-deck", label: "Partner deck" }]
                : []),
              { href: "#pillars", label: "Pillars" },
              { href: "#resources", label: "Resources" },
              ...(isAdmin ? [{ href: "#directory", label: "All partners" }] : []),
              { href: "#contact", label: "Contact" },
            ];
            return (
              <div
                className="grid w-full items-center gap-1 text-[10px] sm:text-xs md:text-sm font-medium"
                style={{
                  gridTemplateColumns: `repeat(${navLinks.length}, minmax(0, 1fr))`,
                }}
              >
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="min-w-0 w-full text-center rounded-full px-0.5 sm:px-2 py-1.5 text-[#404040] hover:bg-black/5 hover:text-black truncate"
                    title={l.label}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            );
          })()}
        </div>
      </nav>

      {/* Partner-specific notes */}
      <section
        id="for-you"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            FOR {partner.organisation.toUpperCase()}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3 text-balance">
            Your partnership workspace
          </h2>
          <p className="text-sm sm:text-base text-[#525252] max-w-3xl leading-relaxed mb-6">
            Signed in to <strong className="text-black">/partner/{partner.slug}</strong> only —
            private to <strong className="text-black">{partner.organisation}</strong> authorised
            emails
            {isAdmin ? " (you have Group admin access to other workspaces)" : ""}. Other
            organisations cannot open this page. Content below is tailored for this partnership.
          </p>
          {partner.notes && partner.notes.length > 0 && (
            <ul className="space-y-2 max-w-3xl mb-6">
              {partner.notes.map((n) => (
                <li
                  key={n}
                  className="flex gap-2 text-sm text-[#404040] leading-relaxed rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                >
                  <span className="text-emerald-700 shrink-0">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                n: "01",
                t: "Define the outcome",
                d: "Nutrition, markets, leadership, capital access or multi-pillar programmes.",
              },
              {
                n: "02",
                t: "Attach the rails",
                d: "Foods, Direct, Connect, Impact and others as the work requires.",
              },
              {
                n: "03",
                t: "Deliver with gates",
                d: "Impact PMO, verification where commerce runs on SupplierAdvisor®.",
              },
              {
                n: "04",
                t: "Report honestly",
                d: "Ambition vs programme-reported vs internal analysis — see Methodology.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 min-w-0"
              >
                <div className="text-[10px] tracking-[2px] font-semibold text-emerald-800 mb-2">
                  {s.n}
                </div>
                <div className="text-sm font-semibold text-black mb-1">{s.t}</div>
                <p className="text-xs text-[#525252] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="programmes"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            PROGRAMMES RELEVANT TO YOU
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8 text-balance">
            Flagship pathways
          </h2>
          <ProgrammeBlocks ids={partner.programmes} />
        </div>
      </section>

      <section
        id="pillars"
        className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
            NINE PILLARS
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6 text-balance">
            Public pillar pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {companies.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-xl border border-black/10 bg-[#fafafa] p-3 sm:p-4 hover:border-black/25 transition-colors min-w-0 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${c.color}18`, color: c.color }}
                >
                  <CompanyIcon name={c.icon} size={16} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-black group-hover:underline underline-offset-2 truncate">
                  {c.name}
                </div>
                <div className="text-[10px] text-[#737373] line-clamp-2 mt-0.5 leading-snug">
                  {c.tagline}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {partner.slug === "spar" && (
        <>
          <section className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
            <SparPartnershipDeckCondensed />
          </section>
          <section className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
            <SparPartnershipDeck />
          </section>
        </>
      )}

      {partner.slug === "checkers" && (
        <>
          <section className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
            <CheckersPartnershipDeckCondensed />
          </section>
          <section className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
            <CheckersPartnershipDeck />
          </section>
        </>
      )}

      {partner.slug === "swt-ag" && (
        <section className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
          <BffSwtAgPartnershipDeck />
        </section>
      )}

      {partner.slug === "big-five-group" && (
        <section className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
          <BfgPartnerDeck />
        </section>
      )}

      <section
        id="resources"
        className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold">
              RESOURCES
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-6 text-balance">
            Decks and pages for this partnership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.map((r) => {
              const external = /^https?:\/\//i.test(r.href);
              const cardClass =
                "rounded-2xl border border-black/10 bg-white p-5 hover:border-emerald-300/80 transition-colors min-w-0 group block";
              const body = (
                <>
                  <div className="text-sm font-semibold text-black group-hover:underline underline-offset-2 mb-1">
                    {r.label}
                  </div>
                  <p className="text-xs text-[#525252] leading-relaxed mb-3">{r.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                    {external ? "Visit site" : "Open"}
                    {external ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </>
              );
              if (external) {
                return (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {body}
                  </a>
                );
              }
              return (
                <Link key={r.href} href={r.href} className={cardClass}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {isAdmin && directory && directory.length > 0 && (
        <section
          id="directory"
          className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
              ADMIN · ALL PARTNER WORKSPACES
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-2 text-balance">
              Partner directory
            </h2>
            <p className="text-sm text-[#525252] mb-6 max-w-2xl leading-relaxed">
              Group admins only. Each partner email can open only their own workspace; this list
              is not shown to partner logins.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {directory.map((p) => (
                <Link
                  key={p.slug}
                  href={`/partner/${p.slug}`}
                  className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 hover:border-emerald-400/50 transition-colors"
                >
                  {p.logoSrc && (
                    <div className="relative h-10 w-full max-w-[10rem] mb-3">
                      <Image
                        src={p.logoSrc}
                        alt=""
                        fill
                        className="object-contain object-left"
                        sizes="160px"
                      />
                    </div>
                  )}
                  <div className="text-xs font-semibold text-emerald-800 mb-1">{p.role}</div>
                  <div className="text-sm font-semibold text-black mb-1">{p.organisation}</div>
                  <p className="text-xs text-[#525252] line-clamp-2 mb-2">{p.summary}</p>
                  <span className="text-[11px] font-semibold text-black">
                    /partner/{p.slug} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="scroll-mt-28 bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-8 h-8 text-emerald-800 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
            Need a deeper brief?
          </h2>
          <p className="text-sm sm:text-base text-[#525252] mb-2 leading-relaxed">
            {partner.contactNote ??
              "Programme SOWs and commercial terms are shared by the partnership team."}
          </p>
          <p className="text-xs text-[#737373] mb-6">
            Workspace: <strong className="text-[#404040]">/partner/{partner.slug}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                `Partner follow-up — ${partner.organisation}`
              )}&body=${encodeURIComponent(
                `Hello Big Five team,\n\nI am signed into the partner portal as ${email} (${partner.organisation} · /partner/${partner.slug}).\nPlease follow up regarding partnership scope.\n\nInterest area:\n\nThank you.`
              )}`}
              className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold"
            >
              Email {CONTACT_EMAIL}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-black/15 text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/5"
            >
              <Building2 className="w-4 h-4" />
              Public contact form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
