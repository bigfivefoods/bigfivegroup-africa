import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { companies } from "./lib/companies";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Big Five Group | Africa's Regenerative Future",
  description: "Eight sovereign companies powering Africa's future. Regenerative • Sovereign • Ethical. Tesla-premium design inspired by SupplierAdvisor®.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafafa] text-[#171717]">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        
        <footer className="bg-white border-t border-black/10 py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-y-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-lg font-bold tracking-tighter">B5</span>
                </div>
                <span className="font-semibold text-2xl tracking-tighter text-black">BIG FIVE GROUP</span>
              </div>
              <p className="max-w-md text-[#525252] text-[15px] leading-relaxed">
                One Group. Eight Pillars. Infinite African Impact.<br />
                Regenerative. Sovereign. On-Chain. On-Purpose.
              </p>
            </div>

            <div className="md:col-span-3 text-sm">
              <div className="font-medium mb-4 text-[#525252]">EXPLORE</div>
              <div className="space-y-2 text-[#525252]">
                <Link href="/tribal" className="block hover:text-black">Tribal</Link>
                <Link href="/africa" className="block hover:text-black">Africa</Link>
                <Link href="/leadership" className="block hover:text-black">Leadership</Link>
                <Link href="/foundation" className="block hover:text-black">Foundation</Link>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="font-medium mb-4 text-[#525252]">THE 8 PILLARS</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-[#525252]">
                {companies.map((c, i) => (
                  <Link key={i} href={`/${c.slug}`} className="hover:text-black transition-colors">{c.name}</Link>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-black/10 text-[10px] text-[#737373] tracking-[1px]">
                © {new Date().getFullYear()} BIG FIVE GROUP (PTY) LTD • ALL RIGHTS RESERVED<br />
                PROUDLY AFRICAN • ON-CHAIN • SUPER-CUBE® POWERED
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
