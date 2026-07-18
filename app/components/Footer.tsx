import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { companies } from "../lib/companies";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-black">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 sm:gap-y-12 gap-x-6 lg:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-5 min-w-0">
            <div className="font-semibold text-xl sm:text-2xl md:text-3xl tracking-tighter mb-3 sm:mb-4">
              BIG FIVE GROUP
            </div>
            <p className="text-lg sm:text-xl font-light tracking-tight mb-3 max-w-md">
              One Group. Ten Pillars. Infinite African Impact.
            </p>
            <p className="text-[#525252] text-sm mb-6">
              Regenerative. Sovereign. On-Chain. On-Purpose.
            </p>
            <a
              href="https://www.supplieradvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide hover:opacity-70 transition-opacity"
            >
              Launch SupplierAdvisor®
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              Explore
            </div>
            <div className="space-y-2.5 text-sm">
              <Link href="/group" className="block hover:text-black/70 transition-colors">
                The Group
              </Link>
              <Link href="/global" className="block hover:text-black/70 transition-colors">
                Global
              </Link>
              <Link href="/africa" className="block hover:text-black/70 transition-colors">
                Africa
              </Link>
              <Link href="/leadership" className="block hover:text-black/70 transition-colors">
                Leadership
              </Link>
              <Link href="/foundation" className="block hover:text-black/70 transition-colors">
                Foundation
              </Link>
              <Link href="/royal" className="block hover:text-black/70 transition-colors">
                Royal
              </Link>
              <Link href="/about" className="block hover:text-black/70 transition-colors">
                About
              </Link>
              <Link href="/connect" className="block hover:text-black/70 transition-colors">
                Connect · SAM
              </Link>
              <Link href="/connect/sam" className="block hover:text-black/70 transition-colors">
                SAM Messenger
              </Link>
              <Link href="/group#intelligence" className="block hover:text-black/70 transition-colors">
                AI · Future systems
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              The 10 Pillars
            </div>
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-sm min-w-0">
              {companies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="hover:text-black/70 transition-colors truncate"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              Legal
            </div>
            <div className="space-y-2.5 text-sm">
              <Link href="/privacy" className="block hover:text-black/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-black/70 transition-colors">
                Terms of Service
              </Link>
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
        PROUDLY AFRICAN · ON-CHAIN · SAM · SUPER-CUBE® · AI-READY
      </div>
    </footer>
  );
}
