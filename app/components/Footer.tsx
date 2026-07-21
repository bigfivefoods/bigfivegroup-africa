import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { companies } from "../lib/companies";

const linkClass = "block hover:text-black/70 transition-colors";

const exploreLinks = [
  { href: "/group", label: "The Group" },
  { href: "/africa", label: "Africa" },
  { href: "/global", label: "Global" },
  { href: "/leadership", label: "Leadership" },
  { href: "/foundation", label: "Foundation" },
  { href: "/royal", label: "Royal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/updates", label: "Updates" },
  { href: "/partner-kit", label: "Partner kit" },
  { href: "/partner", label: "Partner portal" },
  { href: "/methodology", label: "Methodology" },
  { href: "/brand", label: "Brand kit" },
  { href: "/investor", label: "Investor portal" },
  { href: "/connect#case-study-sa", label: "SupplierAdvisor® case" },
  { href: "/connect", label: "Connect · SAM" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-black">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-y-10 sm:gap-y-12 gap-x-6 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4 min-w-0">
            <div className="font-semibold text-xl sm:text-2xl md:text-3xl tracking-tighter mb-3 sm:mb-4">
              BIG FIVE GROUP
            </div>
            <p className="text-base sm:text-lg font-light tracking-tight mb-2 max-w-md">
              One Group. Ten Pillars. Infinite African Impact.
            </p>
            <p className="text-[#525252] text-sm mb-5 max-w-sm">
              Regenerative. Sovereign. On-Chain. On-Purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-full hover:bg-[#111] transition-colors w-fit"
              >
                Book a briefing
              </Link>
              <a
                href="https://www.supplieradvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:opacity-70 transition-opacity"
              >
                SupplierAdvisor®
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore — primary site navigation */}
          <div className="lg:col-span-2 min-w-0">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              Explore
            </div>
            <nav className="space-y-2.5 text-sm" aria-label="Explore">
              {exploreLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-3 min-w-0">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              The 10 Pillars
            </div>
            <nav
              className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 text-sm min-w-0"
              aria-label="Pillars"
            >
              {companies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className={`${linkClass} truncate`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources + Legal */}
          <div className="lg:col-span-3 min-w-0 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-6">
            <div>
              <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
                Resources
              </div>
              <nav className="space-y-2.5 text-sm" aria-label="Resources">
                {resourceLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
                Legal
              </div>
              <nav className="space-y-2.5 text-sm" aria-label="Legal">
                {legalLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-black/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-sm">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 xl:gap-x-8 gap-y-3 min-w-0">
            <a
              href="mailto:craig@bigfivegroup.africa"
              className="flex items-center gap-2 hover:text-black/70 transition-colors min-w-0 break-all sm:break-normal"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">craig@bigfivegroup.africa</span>
            </a>
            <a
              href="tel:+27825814215"
              className="flex items-center gap-2 hover:text-black/70 transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              +27 (0) 82 581 4215
            </a>
            <a
              href="https://wa.me/27825814215"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black/70 transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              WhatsApp
            </a>
          </div>
          <div className="text-xs text-[#525252] shrink-0">
            KwaZulu-Natal · South Africa · Continent-wide
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-5 sm:py-6 text-center text-xs text-[#525252] px-4 sm:px-6">
        © {new Date().getFullYear()} BIG FIVE GROUP (PTY) LTD · ALL RIGHTS RESERVED
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> · </span>
        PROUDLY AFRICAN · ON-CHAIN · SUPER-CUBE®
      </div>
    </footer>
  );
}
