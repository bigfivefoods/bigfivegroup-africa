import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { companies } from "../lib/companies";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-black">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-y-12 gap-x-8">
          <div className="md:col-span-5">
            <div className="font-semibold text-3xl tracking-tighter mb-4">BIG FIVE GROUP</div>
            <p className="text-xl font-light tracking-tight mb-3 max-w-md">
              One Group. Eight Pillars. Infinite African Impact.
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

          <div className="md:col-span-2">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              Explore
            </div>
            <div className="space-y-2.5 text-sm">
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
              <Link href="/tribal" className="block hover:text-black/70 transition-colors">
                Heritage
              </Link>
              <Link href="/connect" className="block hover:text-black/70 transition-colors">
                Connect
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4 text-[#525252]">
              The 8 Pillars
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {companies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="hover:text-black/70 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
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

        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-3">
            <a
              href="mailto:craig@bigfivegroup.africa"
              className="flex items-center gap-2 hover:text-black/70 transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              craig@bigfivegroup.africa
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
          <div className="text-xs text-[#525252]">
            KwaZulu-Natal · South Africa · Continent-wide
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-6 text-center text-xs text-[#525252] px-6">
        © {new Date().getFullYear()} BIG FIVE GROUP (PTY) LTD · ALL RIGHTS RESERVED
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> · </span>
        PROUDLY AFRICAN · ON-CHAIN · SUPER-CUBE® POWERED
      </div>
    </footer>
  );
}
