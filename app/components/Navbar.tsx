"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Leaf,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies, type Company } from "../lib/companies";
import { PILLAR_MISSIONS, type PillarMission } from "../lib/pillarMissions";
import { CompanyIcon } from "../lib/icons";

const MISSION_ICONS = {
  feed: Leaf,
  educate: BookOpen,
  empower: Sparkles,
} as const;

const SIMPLE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function companyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

function pillarsFor(mission: PillarMission): Company[] {
  return mission.slugs
    .map((slug) => companyBySlug(slug))
    .filter((c): c is Company => Boolean(c));
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Which mission dropdown is open on desktop (hover/click) */
  const [openMission, setOpenMission] = useState<string | null>(null);
  /** Mobile accordion: which mission section is expanded */
  const [mobileMission, setMobileMission] = useState<string | null>(null);
  const navMissionsRef = useRef<HTMLDivElement>(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenMission(null);
    setMobileMission(null);
  };

  useEffect(() => {
    if (!openMission) return;
    const onPointerDown = (e: MouseEvent) => {
      if (navMissionsRef.current && !navMissionsRef.current.contains(e.target as Node)) {
        setOpenMission(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMission(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMission]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(`${href}/`));

  const isMissionActive = (mission: PillarMission) =>
    mission.slugs.some(
      (slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-black/10 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] sm:h-20 flex items-center justify-between gap-2 sm:gap-3 min-w-0">
        <Link
          href="/"
          className="flex items-center group min-w-0 shrink"
          aria-label="Big Five Group home"
        >
          <div className="min-w-0">
            <div className="font-semibold text-lg sm:text-2xl tracking-tighter text-black group-hover:opacity-80 transition-opacity truncate">
              BIG FIVE GROUP
            </div>
            <div className="text-[10px] text-[#525252] -mt-1 tracking-[1.5px]">.AFRICA</div>
          </div>
        </Link>

        {/* Desktop */}
        <div
          ref={navMissionsRef}
          className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-medium text-[#171717] shrink-0"
        >
          {PILLAR_MISSIONS.map((mission) => {
            const MissionIcon = MISSION_ICONS[mission.id];
            const pillars = pillarsFor(mission);
            const active = isMissionActive(mission);
            const open = openMission === mission.id;

            return (
              <div
                key={mission.id}
                className="relative"
                onMouseEnter={() => setOpenMission(mission.id)}
                onMouseLeave={() => setOpenMission(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenMission(open ? null : mission.id)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    active || open
                      ? "text-black bg-black/[0.04]"
                      : "text-[#404040] hover:text-black hover:bg-black/[0.03]"
                  }`}
                >
                  <MissionIcon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: active || open ? mission.accent : undefined }}
                  />
                  {mission.mission}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2 z-50"
                    >
                      <div
                        className={`bg-white rounded-2xl p-2 shadow-xl border border-black/10 ${
                          pillars.length >= 4
                            ? "w-[min(20rem,calc(100vw-2rem))]"
                            : "w-[min(16rem,calc(100vw-2rem))]"
                        }`}
                        style={{
                          boxShadow: `0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px ${mission.accent}22`,
                        }}
                      >
                        <div
                          className="px-3 py-2 mb-1 rounded-xl border border-black/5"
                          style={{
                            background: `linear-gradient(135deg, ${mission.accentSoft} 0%, #fff 80%)`,
                            borderLeft: `3px solid ${mission.accent}`,
                          }}
                        >
                          <div
                            className="text-[9px] font-semibold tracking-[1.5px] uppercase"
                            style={{ color: mission.accentDark }}
                          >
                            {mission.label}
                          </div>
                          <div className="text-xs text-[#525252] leading-snug mt-0.5 line-clamp-2">
                            {mission.blurb}
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {pillars.map((company) => {
                            const itemActive = pathname === `/${company.slug}`;
                            return (
                              <Link
                                key={company.slug}
                                href={`/${company.slug}`}
                                className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all ${
                                  itemActive ? "bg-[#f5f5f5]" : "hover:bg-[#fafafa]"
                                }`}
                                onClick={closeMenus}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                                  style={{
                                    backgroundColor: `${company.color}18`,
                                    color: company.color,
                                  }}
                                >
                                  <CompanyIcon name={company.icon} size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-black text-[13px] flex items-center gap-1 leading-tight">
                                    <span className="truncate">{company.name}</span>
                                    <ArrowRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <div className="text-[10px] text-[#737373] truncate">
                                    {company.tagline.split(" • ")[0]}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <span className="w-px h-4 bg-black/10 mx-0.5" aria-hidden />

          {SIMPLE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2.5 2xl:px-3 py-1.5 rounded-full transition-colors relative whitespace-nowrap ${
                isActive(link.href)
                  ? "text-black font-semibold"
                  : "text-[#404040] hover:text-black"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 bg-black rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2 2xl:gap-3 shrink-0">
          <a
            href="https://www.supplieradvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] 2xl:text-sm font-medium text-[#404040] hover:text-black whitespace-nowrap"
          >
            Launch Connect
          </a>
          <Link
            href="/contact"
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-4 2xl:px-6 py-2.5 rounded-full text-[13px] 2xl:text-sm font-semibold tracking-wide hover:bg-[#111] whitespace-nowrap"
          >
            Book a briefing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden w-11 h-11 flex items-center justify-center text-black rounded-full hover:bg-black/5 shrink-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-black/10 max-h-[calc(100dvh-var(--navbar-height,4.5rem))] overflow-y-auto overscroll-contain"
          >
            <div className="px-4 sm:px-6 py-5 sm:py-6 flex flex-col gap-3 text-base text-[#171717]">
              {PILLAR_MISSIONS.map((mission) => {
                const MissionIcon = MISSION_ICONS[mission.id];
                const pillars = pillarsFor(mission);
                const expanded = mobileMission === mission.id;
                const active = isMissionActive(mission);

                return (
                  <div
                    key={mission.id}
                    className="rounded-2xl border border-black/8 overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${mission.accentSoft} 0%, #ffffff 55%)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileMission(expanded ? null : mission.id)
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 text-left"
                      style={{ borderLeft: `3px solid ${mission.accent}` }}
                      aria-expanded={expanded}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: mission.accent }}
                      >
                        <MissionIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[9px] font-semibold tracking-[1.5px] uppercase"
                          style={{ color: mission.accentDark }}
                        >
                          {mission.label}
                        </div>
                        <div
                          className={`text-base font-semibold leading-tight ${
                            active ? "text-black" : "text-[#171717]"
                          }`}
                        >
                          {mission.mission}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#737373] transition-transform shrink-0 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-2 pb-2 space-y-0.5 border-t border-black/5 pt-1">
                            {pillars.map((c) => (
                              <Link
                                key={c.slug}
                                href={`/${c.slug}`}
                                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl ${
                                  pathname === `/${c.slug}`
                                    ? "bg-white font-semibold shadow-sm"
                                    : "hover:bg-white/80"
                                }`}
                                onClick={closeMenus}
                              >
                                <span
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{
                                    backgroundColor: `${c.color}15`,
                                    color: c.color,
                                  }}
                                >
                                  <CompanyIcon name={c.icon} size={16} />
                                </span>
                                <span className="truncate">{c.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="flex flex-col gap-1 pt-1">
                {SIMPLE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2.5 px-1 ${
                      isActive(link.href) ? "font-semibold text-black" : "text-[#171717]"
                    }`}
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-black/10 space-y-3">
                <Link
                  href="/contact"
                  onClick={closeMenus}
                  className="premium-button w-full inline-flex items-center justify-center gap-3 bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base font-semibold"
                >
                  Book a briefing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.supplieradvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenus}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm text-[#525252] hover:text-black py-2"
                >
                  Launch Connect · SupplierAdvisor®
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
