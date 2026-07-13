"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "../lib/companies";
import { CompanyIcon } from "../lib/icons";

const navLinks = [
  { href: "/global", label: "Global" },
  { href: "/africa", label: "Africa" },
  { href: "#", label: "Group", isDropdown: true },
  { href: "/leadership", label: "Leadership" },
  { href: "/foundation", label: "Foundation" },
  { href: "/royal", label: "Royal" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setGroupOpen(false);
  };

  useEffect(() => {
    if (!groupOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGroupOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGroupOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [groupOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer when crossing to desktop (2xl = 1536px — room for 7 nav links)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(`${href}/`));

  const isGroupActive =
    pathname === "/group" ||
    pathname.startsWith("/group/") ||
    companies.some((c) => pathname === `/${c.slug}` || pathname.startsWith(`/${c.slug}/`));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-black/10">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] sm:h-20 flex items-center justify-between gap-3 min-w-0">
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

        {/* Desktop nav from 2xl (1536px): phones/tablets/laptops use hamburger for 7 links */}
        <div className="hidden 2xl:flex items-center gap-6 text-sm font-medium text-[#171717] shrink-0">
          {navLinks.map((link) =>
            link.isDropdown ? (
              <div
                key={link.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setGroupOpen(true)}
                onMouseLeave={() => setGroupOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setGroupOpen((v) => !v)}
                  aria-expanded={groupOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                    isGroupActive || groupOpen ? "text-black" : "hover:text-black text-[#404040]"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${groupOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {groupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-3 z-50"
                    >
                      <div className="w-[min(22rem,calc(100vw-2rem))] 2xl:w-[25rem] bg-white rounded-3xl p-2 sm:p-3 shadow-xl border border-black/10 max-h-[min(70vh,32rem)] overflow-y-auto">
                        <div className="flex flex-col">
                          <Link
                            href="/group"
                            className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all mb-1 border-b border-black/5 ${
                              pathname === "/group" ? "bg-[#f5f5f5]" : "hover:bg-[#fafafa]"
                            }`}
                            onClick={closeMenus}
                          >
                            <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-black text-white">
                              <span className="text-xs font-bold">10</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-black flex items-center gap-2">
                                <span className="truncate">Group overview</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                              </div>
                              <div className="text-xs text-[#525252] truncate">
                                All ten pillars · one system
                              </div>
                            </div>
                          </Link>
                          {companies.map((company) => {
                            const active = pathname === `/${company.slug}`;
                            return (
                              <Link
                                key={company.slug}
                                href={`/${company.slug}`}
                                className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all ${
                                  active ? "bg-[#f5f5f5]" : "hover:bg-[#fafafa]"
                                }`}
                                onClick={closeMenus}
                              >
                                <div
                                  className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center"
                                  style={{
                                    backgroundColor: `${company.color}15`,
                                    color: company.color,
                                  }}
                                >
                                  <CompanyIcon name={company.icon} size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-black flex items-center gap-2">
                                    <span className="truncate">{company.name}</span>
                                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                  </div>
                                  <div className="text-xs text-[#525252] truncate">
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
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors relative whitespace-nowrap ${
                  isActive(link.href)
                    ? "text-black font-semibold"
                    : "text-[#404040] hover:text-black"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full" />
                )}
              </Link>
            )
          )}
        </div>

        <div className="hidden 2xl:block shrink-0">
          <a
            href="https://www.supplieradvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#111] whitespace-nowrap"
          >
            LAUNCH CONNECT
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="2xl:hidden w-11 h-11 flex items-center justify-center text-black rounded-full hover:bg-black/5 shrink-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="2xl:hidden bg-white border-t border-black/10 max-h-[calc(100dvh-var(--navbar-height,4.5rem))] overflow-y-auto overscroll-contain"
          >
            <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-5 text-base sm:text-lg text-[#171717]">
              {navLinks.map((link) =>
                link.isDropdown ? (
                  <div key={link.label} className="space-y-3">
                    <div className="font-medium text-[#525252] text-sm uppercase tracking-[2px]">
                      {link.label}
                    </div>
                    <div className="pl-0 sm:pl-1 space-y-1">
                      <Link
                        href="/group"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl ${
                          pathname === "/group"
                            ? "bg-[#f5f5f5] font-semibold"
                            : "hover:bg-[#fafafa]"
                        }`}
                        onClick={closeMenus}
                      >
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-black text-white text-xs font-bold">
                          10
                        </span>
                        <span className="truncate">Group overview</span>
                      </Link>
                      {companies.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/${c.slug}`}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-xl ${
                            pathname === `/${c.slug}`
                              ? "bg-[#f5f5f5] font-semibold"
                              : "hover:bg-[#fafafa]"
                          }`}
                          onClick={closeMenus}
                        >
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${c.color}15`, color: c.color }}
                          >
                            <CompanyIcon name={c.icon} size={16} />
                          </span>
                          <span className="truncate">{c.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-1 ${
                      isActive(link.href) ? "font-semibold text-black" : "text-[#171717]"
                    }`}
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-black/10 space-y-3">
                <a
                  href="https://www.supplieradvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenus}
                  className="premium-button w-full inline-flex items-center justify-center gap-3 bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base font-semibold"
                >
                  LAUNCH CONNECT
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/connect"
                  onClick={closeMenus}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm text-[#525252] hover:text-black py-2"
                >
                  Learn about Connect
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
