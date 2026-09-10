"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Cross,
  ExternalLink,
  FileText,
  Handshake,
  Heart,
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
import PartnerInviteAdmin from "./PartnerInviteAdmin";

/** Lazy-load decks so other organisations' pitch materials never enter this partner's JS bundle. */
const SparPartnershipDeck = dynamic(() => import("../components/SparPartnershipDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="SPAR deck" />,
});
const SparPartnershipDeckCondensed = dynamic(
  () => import("../components/SparPartnershipDeckCondensed"),
  { ssr: false, loading: () => <DeckLoading label="SPAR condensed" /> }
);
const CheckersPartnershipDeck = dynamic(() => import("../components/CheckersPartnershipDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="Checkers deck" />,
});
const CheckersPartnershipDeckCondensed = dynamic(
  () => import("../components/CheckersPartnershipDeckCondensed"),
  { ssr: false, loading: () => <DeckLoading label="Checkers condensed" /> }
);
const PicknPayPartnershipDeck = dynamic(() => import("../components/PicknPayPartnershipDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="Pick n Pay deck" />,
});
const PicknPayPartnershipDeckCondensed = dynamic(
  () => import("../components/PicknPayPartnershipDeckCondensed"),
  { ssr: false, loading: () => <DeckLoading label="Pick n Pay condensed" /> }
);
const CmhFordPartnershipDeck = dynamic(() => import("../components/CmhFordPartnershipDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="CMH Ford deck" />,
});
const BlessmanPartnershipDeck = dynamic(() => import("../components/BlessmanPartnershipDeck"), {
  ssr: true,
  loading: () => <DeckLoading label="Blessman deck" />,
});
const BffSwtAgPartnershipDeck = dynamic(() => import("../components/BffSwtAgPartnershipDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="SWT-AG deck" />,
});
const BfgPartnerDeck = dynamic(() => import("../components/BfgPartnerDeck"), {
  ssr: false,
  loading: () => <DeckLoading label="Partner deck" />,
});

function DeckLoading({ label }: { label: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-[#737373]">
      Loading {label}…
    </div>
  );
}

type HeroTile = {
  icon: typeof Package;
  t: string;
  d: string;
};

/** Hero cards follow this organisation's programmes — not a fixed Group-wide strip. */
function heroTilesForPartner(partner: ClientPartnerProfile): HeroTile[] {
  if (partner.slug === "blessman-international") {
    return [
      {
        icon: Heart,
        t: "Kingdom · shared calling",
        d: "Faith, dignity and hope for children — Blessman × Big Five",
      },
      {
        icon: Package,
        t: "Feed the hungry",
        d: "Fortified African food for hubs, schools and care points",
      },
      {
        icon: Users,
        t: "Form people who serve",
        d: "Super-Cube® whole-person leadership, including Spiritual intelligence",
      },
    ];
  }
  const programmes = new Set(partner.programmes ?? []);
  const tiles: HeroTile[] = [];
  if (programmes.has("nsnp")) {
    tiles.push({
      icon: Package,
      t: "Foods · nutrition",
      d: "Fortified packs and institutional / CSI feeding pathways",
    });
  }
  if (programmes.has("santaco")) {
    tiles.push({
      icon: Truck,
      t: "Direct · SANTACO",
      d: "Rank & rural container partnership plan",
    });
  }
  if (programmes.has("connect")) {
    tiles.push({
      icon: Users,
      t: "Connect · SupplierAdvisor®",
      d: "Verified trade rails for this partnership",
    });
  }
  if (programmes.has("leadership")) {
    tiles.push({
      icon: Building2,
      t: "Leadership · Super-Cube®",
      d: "Whole-person capacity for delivery teams",
    });
  }
  if (programmes.has("impact") && tiles.length < 3) {
    tiles.push({
      icon: FileText,
      t: "Impact · delivery",
      d: "Gates, KPIs and field assurance where programmes run",
    });
  }
  tiles.push({
    icon: Handshake,
    t: partner.name,
    d: "Private organisation workspace — your materials only",
  });
  return tiles.slice(0, 3);
}

function BlessmanKingdomSection() {
  const shared = [
    {
      t: "Feed hungry people",
      d: "Blessman’s hubs and care points · Big Five Foods fortified staples for African kitchens.",
    },
    {
      t: "Dignity before dependency",
      d: "Locally sustainable programmes · compassionate empowerment — skills, markets and capacity, not charity theatre.",
    },
    {
      t: "Form whole people",
      d: "Faith formation and child development · Super-Cube® (including Spiritual intelligence) for those who lead and serve.",
    },
    {
      t: "Prove love with honesty",
      d: "Transparent stewardship · Impact PMO and SupplierAdvisor® where commerce and programmes need rails of trust.",
    },
  ];

  return (
    <section
      id="kingdom"
      className="scroll-mt-28 border-b border-black/10 bg-[#0a0a0a] text-white py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-[10px] sm:text-xs tracking-[2px] text-amber-400/90 font-semibold mb-2">
          KINGDOM WORK · SHARED CALLING
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance mb-3 max-w-3xl">
          Where Blessman International and Big Five Group meet
        </h2>
        <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 sm:mb-10">
          This partnership is framed first as{" "}
          <strong className="text-white">kingdom-centred work</strong> — serving South African
          children with hope, food and dignity — then as practical rails (Foods, Leadership,
          Foundation, Impact) that help that calling scale with integrity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 min-w-0">
            <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-semibold text-[#f47835] mb-3">
              <Cross className="w-3.5 h-3.5" aria-hidden />
              BLESSMAN INTERNATIONAL
            </div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3">
              Gospel hope · locally sustainable ministry
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Blessman International exists to share the hope of Jesus Christ with South African
              children and families through faith formation and programmes that feed the hungry,
              foster food-secure communities, offer dignity through water and sanitation, and support
              child development — with a vision that every child in Limpopo would know hope and
              receive nurturing support.
            </p>
            <a
              href="https://www.blessmaninternational.org/who-we-are"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-2 hover:text-amber-200"
            >
              Blessman · Who we are
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 min-w-0">
            <div className="text-[10px] tracking-[2px] font-semibold text-amber-400 mb-3">
              BIG FIVE GROUP · FOUNDER
            </div>
            <div className="flex gap-4 mb-4">
              <div className="relative h-16 w-12 sm:h-20 sm:w-14 shrink-0 rounded-xl overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src="/craig-muller.png"
                  alt="Dr. Craig R. Muller, Founder & CEO of Big Five Group"
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1">
                  Dr. Craig R. Muller
                </h3>
                <p className="text-xs sm:text-sm text-white/55 leading-snug">
                  Founder &amp; CEO · visionary architect of kingdom-centred leadership and
                  sustainable impact in Africa
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              His life goal is to <strong className="text-white">feed</strong> (Big Five Foods™),{" "}
              <strong className="text-white">educate</strong> (Super-Cube®) and{" "}
              <strong className="text-white">empower</strong> (SupplierAdvisor®) people across Africa
              — integrating commercial excellence with doctoral research and a deep commitment to
              ethical, kingdom-centred impact. The Group&apos;s values put humanity, integrity and
              compassionate empowerment first — Ubuntu in practice.
            </p>
            <Link
              href="/about#founder"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-2 hover:text-amber-200"
            >
              Read the founder story on About
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        </div>

        <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-400/10 via-transparent to-white/[0.03] p-5 sm:p-6 md:p-7">
          <div className="text-[10px] sm:text-xs tracking-[2px] font-semibold text-amber-300 mb-2">
            ALIGNED GOALS · KINGDOM STEWARDSHIP
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-balance">
            One table of purpose
          </h3>
          <p className="text-sm text-white/65 leading-relaxed max-w-3xl mb-6">
            Blessman brings gospel-rooted presence among children in Limpopo and Southern Africa.
            Big Five brings systems — fortified food, leadership formation and transparent delivery —
            so that calling can scale without losing dignity or honesty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shared.map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 min-w-0"
              >
                <div className="text-sm font-semibold text-white mb-1">{item.t}</div>
                <p className="text-xs text-white/60 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
  canInvite,
  directory,
}: {
  email: string;
  partner: ClientPartnerProfile;
  isAdmin?: boolean;
  /** May invite colleagues to this organisation workspace. */
  canInvite?: boolean;
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
            {heroTilesForPartner(partner).map((c) => (
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
              ...(partner.slug === "blessman-international"
                ? [{ href: "#kingdom", label: "Kingdom" }]
                : []),
              ...((partner.programmes?.length ?? 0) > 0
                ? [{ href: "#programmes", label: "Programmes" }]
                : []),
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
              ...(partner.slug === "pick-n-pay"
                ? [
                    {
                      href: "#pick-n-pay-partnership-deck-condensed",
                      label: "Pick n Pay condensed",
                    },
                    { href: "#pick-n-pay-partnership-deck", label: "Pick n Pay full deck" },
                  ]
                : []),
              ...(partner.slug === "cmh-ford-ballito"
                ? [{ href: "#cmh-ford-partnership-deck", label: "Feeding scheme deck" }]
                : []),
              ...(partner.slug === "blessman-international"
                ? [{ href: "#blessman-partnership-deck", label: "Partnership deck" }]
                : []),
              ...(partner.slug === "swt-ag"
                ? [{ href: "#bff-swt-deck", label: "BFF × SWT-AG funding deck" }]
                : []),
              ...(partner.slug === "big-five-group"
                ? [{ href: "#bfg-partner-deck", label: "Partner deck" }]
                : []),
              ...(partner.showPublicPillars
                ? [{ href: "#pillars", label: "Pillars" }]
                : []),
              { href: "#resources", label: "Resources" },
              // Invites only on each partner workspace page — never from the Group hub
              ...(canInvite && partner.slug !== "big-five-group" && partner.slug !== "general"
                ? [{ href: "#invite-partners", label: "Invite partners" }]
                : []),
              ...(isAdmin && partner.slug === "big-five-group"
                ? [{ href: "#directory", label: "All partners" }]
                : []),
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
            {(partner.slug === "blessman-international"
              ? [
                  {
                    n: "01",
                    t: "Centre the Kingdom calling",
                    d: "Children fed with dignity, hope proclaimed, communities strengthened — not transactions first.",
                  },
                  {
                    n: "02",
                    t: "Put African food on African plates",
                    d: "Big Five Foods fortified staples for Blessman hubs, schools and care points.",
                  },
                  {
                    n: "03",
                    t: "Form people who serve",
                    d: "Super-Cube® whole-person leadership — including Spiritual intelligence — for teams and partners.",
                  },
                  {
                    n: "04",
                    t: "Steward with proof",
                    d: "Foundation and Impact rails so generosity and delivery stay transparent and honest.",
                  },
                ]
              : [
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
                ]
            ).map((s) => (
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

      {partner.slug === "blessman-international" && <BlessmanKingdomSection />}

      {(partner.programmes?.length ?? 0) > 0 && (
        <section
          id="programmes"
          className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold mb-2">
              PROGRAMMES FOR THIS PARTNERSHIP
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-8 text-balance">
              Pathways relevant to {partner.name}
            </h2>
            <ProgrammeBlocks ids={partner.programmes} />
          </div>
        </section>
      )}

      {partner.showPublicPillars && (
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
      )}

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

      {partner.slug === "pick-n-pay" && (
        <>
          <section className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
            <PicknPayPartnershipDeckCondensed />
          </section>
          <section className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16">
            <PicknPayPartnershipDeck />
          </section>
        </>
      )}

      {partner.slug === "cmh-ford-ballito" && (
        <section className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
          <CmhFordPartnershipDeck />
        </section>
      )}

      {partner.slug === "blessman-international" && (
        <section className="scroll-mt-28 border-b border-black/10 bg-white py-12 sm:py-16">
          <BlessmanPartnershipDeck />
        </section>
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
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-2 text-balance">
            Materials for {partner.name}
          </h2>
          <p className="text-sm text-[#525252] mb-6 max-w-2xl leading-relaxed">
            Only this organisation&apos;s workspace materials — other partners cannot open these
            links from their portals, and you will not see theirs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.length === 0 ? (
              <p className="text-sm text-[#737373] sm:col-span-2 lg:col-span-3">
                No resources listed yet for this workspace. Contact Big Five to add decks or links.
              </p>
            ) : null}
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

      {/*
        Invite partners ONLY on the organisation workspace itself (e.g. /partner/spar).
        The Group hub (/partner/big-five-group) cannot invite people into other portals —
        open that partner’s page to invite there. Anyone already on the page can invite more.
      */}
      {canInvite && partner.slug !== "big-five-group" && partner.slug !== "general" && (
        <PartnerInviteAdmin
          lockedSlug={partner.slug}
          viewerEmail={email}
          organisations={[
            {
              slug: partner.slug,
              name: partner.name,
              organisation: partner.organisation,
            },
          ]}
        />
      )}

      {isAdmin &&
        partner.slug === "big-five-group" &&
        directory &&
        directory.length > 0 && (
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
              Group admins only — open a partner workspace to invite people to that page. Invites
              cannot be sent from this hub into other portals. Each partner email can open only
              their own workspace; this list is not shown to partner logins.
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
