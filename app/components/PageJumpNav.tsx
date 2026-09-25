"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Check,
  Compass,
  Crown,
  FileCheck,
  Globe,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  Landmark,
  Leaf,
  LineChart,
  MapPin,
  Network,
  Newspaper,
  Package,
  Play,
  School,
  ShieldCheck,
  Store,
  Target,
  Tractor,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const JUMP_ICONS = {
  activity: Activity,
  alert: AlertTriangle,
  award: Award,
  "bar-chart": BarChart3,
  book: BookOpen,
  brain: Brain,
  building: Building2,
  check: Check,
  compass: Compass,
  crown: Crown,
  file: FileCheck,
  globe: Globe,
  "globe-2": Globe2,
  graduation: GraduationCap,
  handshake: Handshake,
  heart: Heart,
  landmark: Landmark,
  leaf: Leaf,
  chart: LineChart,
  pin: MapPin,
  network: Network,
  news: Newspaper,
  package: Package,
  play: Play,
  school: School,
  shield: ShieldCheck,
  store: Store,
  target: Target,
  tractor: Tractor,
  trending: TrendingUp,
  users: Users,
} as const;

export type JumpIconName = keyof typeof JUMP_ICONS;

export type PageJumpNavItem = {
  href: `#${string}`;
  label: string;
  desc?: string;
  /** Icon key resolved inside this client component (safe to pass from Server Components). */
  icon?: JumpIconName;
};

type PageJumpNavProps = {
  items: readonly PageJumpNavItem[];
  ariaLabel: string;
  accentDark?: string;
  accentSoft?: string;
  /**
   * overlay — sit in the site-nav center slot (best at ≤7 items).
   * scroll — one-row chips at every breakpoint (long pages).
   * auto — overlay when it fits, otherwise scroll.
   */
  layout?: "auto" | "overlay" | "scroll";
  /** Center the chapter row in the page. Overflow falls back to a start-aligned scroller. */
  align?: "start" | "center";
};

const TOP_NAV_MISSIONS = ["Feed", "Educate", "Empower"] as const;
const TOP_NAV_SIMPLE = ["Food Security", "Group", "About", "Contact"] as const;
const OVERLAY_SLOT_COUNT = TOP_NAV_MISSIONS.length + TOP_NAV_SIMPLE.length;

function sectionId(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

function JumpIcon({
  name,
  className,
  style,
}: {
  name?: JumpIconName;
  className?: string;
  style?: CSSProperties;
}) {
  if (!name) return null;
  const Icon: LucideIcon = JUMP_ICONS[name];
  return <Icon className={className} style={style} aria-hidden />;
}

export default function PageJumpNav({
  items,
  ariaLabel,
  accentDark = "#171717",
  accentSoft = "#f5f5f5",
  layout = "auto",
  align = "start",
}: PageJumpNavProps) {
  const navDomId = useId();
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? "");
  const useOverlay =
    layout === "overlay" || (layout === "auto" && items.length <= OVERLAY_SLOT_COUNT);
  const centered = align === "center";

  useEffect(() => {
    if (items.length === 0) return;

    const hrefs = items.map((item) => item.href);
    const hrefSet = new Set<string>(hrefs);
    let lockedUntil = 0;
    let observer: IntersectionObserver | null = null;
    let retryTimer: number | null = null;
    let observedIds = "";
    let didInitialHashScroll = false;

    const collectElements = () =>
      items
        .map((item) => document.getElementById(sectionId(item.href)))
        .filter((el): el is HTMLElement => Boolean(el));

    const lockTo = (href: string) => {
      lockedUntil = Date.now() + 2500;
      setActiveHref(href);
    };

    const pickActive = () => {
      if (Date.now() < lockedUntil) return;

      // Document-order spy: highlight the last chapter whose top has crossed
      // the sticky nav. Avoids bouncing when a tall later section (a deck)
      // intersects the viewport while an earlier chapter is still the read.
      const navEl = document.getElementById(navDomId);
      const marker = (navEl?.getBoundingClientRect().bottom ?? 120) + 24;
      let bestHref: string = hrefs[0] ?? "";
      for (const item of items) {
        const el = document.getElementById(sectionId(item.href));
        if (el && el.getBoundingClientRect().top <= marker) {
          bestHref = item.href;
        }
      }
      const last = items[items.length - 1];
      if (last) {
        const scrolled = window.scrollY + window.innerHeight;
        const max = document.documentElement.scrollHeight;
        if (scrolled >= max - 8) bestHref = last.href;
      }
      setActiveHref((prev) => (prev === bestHref ? prev : bestHref));
    };

    const observe = () => {
      const elements = collectElements();
      const nextIds = elements.map((el) => el.id).join(",");
      if (nextIds === observedIds) return;
      observedIds = nextIds;
      observer?.disconnect();
      if (elements.length === 0) return;
      observer = new IntersectionObserver(
        () => {
          pickActive();
        },
        {
          // Keep a band in the upper viewport as the "active" reading zone
          root: null,
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );
      for (const el of elements) observer.observe(el);
      const hash = window.location.hash;
      if (!didInitialHashScroll && hash && hrefSet.has(hash)) {
        const target = document.getElementById(sectionId(hash));
        if (target) {
          didInitialHashScroll = true;
          target.scrollIntoView();
          lockTo(hash);
        }
      }
      pickActive();
    };

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && hrefSet.has(hash)) lockTo(hash);
    };

    const onJumpClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href^='#']");
      if (!anchor || !anchor.closest(`[data-page-jump-nav]`)) return;
      const href = anchor.getAttribute("href");
      if (href && hrefSet.has(href)) lockTo(href);
    };

    observe();
    // Partner decks/briefings lazy-mount; keep scanning until every target exists.
    let tries = 0;
    const retry = () => {
      observe();
      if (collectElements().length >= items.length || tries++ >= 24) return;
      retryTimer = window.setTimeout(retry, 200);
    };
    retryTimer = window.setTimeout(retry, 200);

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        pickActive();
      });
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onJumpClick, true);
    onHashChange();

    return () => {
      observer?.disconnect();
      if (retryTimer != null) window.clearTimeout(retryTimer);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onJumpClick, true);
    };
  }, [items, navDomId]);

  useEffect(() => {
    if (!activeHref) return;
    const chip = document.querySelector<HTMLElement>(
      `#${CSS.escape(navDomId)} a[data-jump-mobile][href="${CSS.escape(activeHref)}"]`
    );
    chip?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeHref, navDomId]);

  if (items.length === 0) return null;

  return (
    <nav
      id={navDomId}
      aria-label={ariaLabel}
      data-page-jump-nav=""
      data-active={activeHref}
      className="sticky top-[var(--navbar-height)] z-20 border-b border-black/10 bg-white/95 backdrop-blur-md"
    >
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
        {/* Mobile / tablet — and desktop when the overlay slot cannot fit the items */}
        <div
          className={`flex w-full items-center gap-1.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            useOverlay ? "xl:hidden" : ""
          }`}
          style={centered ? { justifyContent: "safe center" } : undefined}
        >
          {items.map((item) => {
            const active = item.href === activeHref;
            return (
              <a
                key={item.href}
                href={item.href}
                data-jump-mobile
                title={item.desc}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveHref(item.href)}
                className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                  active
                    ? "border-transparent font-semibold text-black shadow-sm"
                    : "border-black/10 bg-[#fafafa] text-[#404040] hover:border-black/20 hover:bg-white hover:text-black"
                }`}
                style={active ? { backgroundColor: accentSoft } : undefined}
              >
                <JumpIcon
                  name={item.icon}
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: accentDark }}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop: navbar shell; links span Feed…Contact */}
        <div
          className={`${
            useOverlay ? "hidden xl:flex" : "hidden"
          } w-full items-center justify-between gap-2 sm:gap-3 min-w-0`}
        >
          <div
            className="shrink min-w-0 invisible pointer-events-none select-none"
            aria-hidden
          >
            <div className="font-semibold text-2xl tracking-tighter truncate leading-none">
              BIG FIVE GROUP
            </div>
            <div className="text-[10px] mt-0.5 tracking-[1.5px] leading-none">.AFRICA</div>
          </div>

          <div className="relative shrink-0">
            <div
              className="flex items-center gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-medium invisible pointer-events-none select-none"
              aria-hidden
            >
              {TOP_NAV_MISSIONS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 2xl:px-3 py-1 whitespace-nowrap"
                >
                  <span className="w-3.5 h-3.5 shrink-0" />
                  {label}
                  <span className="w-3.5 h-3.5 shrink-0" />
                </span>
              ))}
              <span className="w-px h-4 bg-black/10 mx-0.5" />
              {TOP_NAV_SIMPLE.map((label) => (
                <span
                  key={label}
                  className="px-2.5 2xl:px-3 py-1 whitespace-nowrap"
                >
                  {label}
                </span>
              ))}
            </div>
            <div
              className={`absolute inset-0 flex items-center gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-medium text-[#171717] ${
                centered ? "justify-center" : "justify-between"
              }`}
            >
              {items.map((item) => {
                const active = item.href === activeHref;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    data-jump-desktop
                    title={item.desc}
                    aria-current={active ? "location" : undefined}
                    onClick={() => setActiveHref(item.href)}
                    className={`relative inline-flex items-center gap-1.5 px-2.5 2xl:px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                      active
                        ? "text-black font-semibold bg-black/[0.04]"
                        : "text-[#404040] hover:text-black hover:bg-black/[0.03]"
                    }`}
                  >
                    <JumpIcon
                      name={item.icon}
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: accentDark }}
                    />
                    {item.label}
                    {active ? (
                      <span
                        className="absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full"
                        style={{ backgroundColor: accentDark }}
                        aria-hidden
                      />
                    ) : null}
                  </a>
                );
              })}
            </div>
          </div>

          <div
            className="flex items-center gap-2 2xl:gap-3 shrink-0 invisible pointer-events-none select-none"
            aria-hidden
          >
            <span className="text-[13px] 2xl:text-sm font-medium whitespace-nowrap">
              Launch Connect
            </span>
            <span className="inline-flex items-center gap-2 px-4 2xl:px-6 py-2 rounded-full text-[13px] 2xl:text-sm font-semibold whitespace-nowrap">
              Book a briefing
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
