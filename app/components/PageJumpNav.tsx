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
};

const TOP_NAV_MISSIONS = ["Feed", "Educate", "Empower"] as const;
const TOP_NAV_SIMPLE = ["Food Security", "Group", "About", "Contact"] as const;

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
}: PageJumpNavProps) {
  const navDomId = useId();
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const hrefs = items.map((item) => item.href);
    const hrefSet = new Set<string>(hrefs);
    const elements = items
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    let lockedUntil = 0;

    const pickActive = () => {
      if (Date.now() < lockedUntil) return;

      // Prefer the section with the strongest intersection in the upper viewport band
      let bestHref: string = hrefs[0] ?? "";
      let bestScore = -1;
      for (const [href, ratio] of visible) {
        if (ratio >= bestScore) {
          bestScore = ratio;
          bestHref = href;
        }
      }
      if (bestScore < 0) {
        // Fallback: last section whose top has crossed the sticky offset
        const navEl = document.getElementById(navDomId);
        const marker = (navEl?.getBoundingClientRect().bottom ?? 120) + 8;
        for (const item of items) {
          const el = document.getElementById(sectionId(item.href));
          if (el && el.getBoundingClientRect().top <= marker) {
            bestHref = item.href;
          }
        }
      }
      setActiveHref((prev) => (prev === bestHref ? prev : bestHref));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (!hrefSet.has(href)) continue;
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            visible.set(href, entry.intersectionRatio);
          } else {
            visible.delete(href);
          }
        }
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

    const lockTo = (href: string) => {
      lockedUntil = Date.now() + 1200;
      setActiveHref(href);
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

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onJumpClick, true);
    onHashChange();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
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
        {/* Mobile / tablet */}
        <div className="flex items-center gap-1.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden">
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
        <div className="hidden xl:flex w-full items-center justify-between gap-2 sm:gap-3 min-w-0">
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
            <div className="absolute inset-0 flex items-center justify-between gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-medium text-[#171717]">
              {items.map((item) => {
                const active = item.href === activeHref;
                return (
                  <a
                    key={item.href}
                    href={item.href}
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
