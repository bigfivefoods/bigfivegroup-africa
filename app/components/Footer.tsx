import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-black">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-y-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-semibold text-3xl tracking-tighter mb-4">BIG FIVE GROUP</div>
            <div className="text-xl font-light tracking-tight mb-2">One Group. Eight Pillars. Infinite African Impact.</div>
            <div className="text-[#525252] text-sm">Regenerative. Sovereign. On-Chain. On-Purpose.</div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4">EXPLORE</div>
            <div className="space-y-2 text-sm">
              <Link href="/global" className="block hover:text-black/70">Global</Link>
              <Link href="/africa" className="block hover:text-black/70">Africa</Link>
              <Link href="/leadership" className="block hover:text-black/70">Leadership</Link>
              <Link href="/foundation" className="block hover:text-black/70">Foundation</Link>
            </div>
          </div>

          {/* 8 Pillars */}
          <div className="md:col-span-4">
            <div className="uppercase tracking-[2px] text-xs font-semibold mb-4">THE 8 PILLARS</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              <Link href="/agri" className="hover:text-black/70">Agri</Link>
              <Link href="/foods" className="hover:text-black/70">Foods</Link>
              <Link href="/direct" className="hover:text-black/70">Direct</Link>
              <Link href="/access" className="hover:text-black/70">Access</Link>
              <Link href="/connect" className="hover:text-black/70">Connect</Link>
              <Link href="/leadership" className="hover:text-black/70">Leadership</Link>
              <Link href="/foundation" className="hover:text-black/70">Foundation</Link>
              <Link href="/global" className="hover:text-black/70">Global</Link>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-3">
            <a href="mailto:craig@bigfivegroup.africa" className="flex items-center gap-2 hover:text-black/70">
              <Mail className="w-4 h-4" /> craig@bigfivegroup.africa
            </a>
            <a href="tel:+27825814215" className="flex items-center gap-2 hover:text-black/70">
              <Phone className="w-4 h-4" /> +27 (0) 82 581 4215
            </a>
            <a href="https://wa.me/27825814215" target="_blank" className="flex items-center gap-2 hover:text-black/70">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#525252]">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 py-6 text-center text-xs text-[#525252]">
        © 2026 BIG FIVE GROUP (PTY) LTD • ALL RIGHTS RESERVED<br />
        PROUDLY AFRICAN • ON-CHAIN • SUPER-CUBE® POWERED
      </div>
    </footer>
  );
}
