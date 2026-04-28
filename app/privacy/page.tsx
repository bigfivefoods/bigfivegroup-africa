"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">LEGAL</div>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/80">Last updated: 27 April 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-[#171717]">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[#525252] mb-12">
            Big Five Group Africa (“we”, “us”, “our”) is committed to protecting your personal information in accordance with the 
            Protection of Personal Information Act (POPIA) of South Africa and international best practices.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">1. Information We Collect</h2>
          <p>We collect personal information when you:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Visit our website or use our platforms (Big Five Connect, SupplierAdvisor)</li>
            <li>Register as a business, partner, or donor</li>
            <li>Make a donation or submit an inquiry</li>
            <li>Scan QR codes or interact with on-chain features</li>
          </ul>
          <p className="mt-4">This may include name, email, phone number, business details, IP address, and transaction data.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Provide and improve our services</li>
            <li>Process donations and issue Section 18A certificates</li>
            <li>Verify businesses on Big Five Connect</li>
            <li>Send important updates and impact reports</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">3. Data Sharing & Third Parties</h2>
          <p>We do not sell your personal information. We only share data with trusted partners (e.g., payment processors, auditors, government regulators) when necessary to deliver our services or comply with law.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">4. Your Rights (POPIA)</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Access your personal information</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">5. Data Security</h2>
          <p>We implement industry-standard security measures, including encryption, access controls, and regular audits. All sensitive data related to donations and on-chain transactions is protected with blockchain-level security.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <div className="mt-4">
            <p><strong>Dr. Craig R. Muller</strong><br />
            Email: <a href="mailto:craig@bigfivegroup.africa" className="text-[#fbbf24] hover:underline">craig@bigfivegroup.africa</a><br />
            Phone: <a href="tel:+27825814215" className="text-[#fbbf24] hover:underline">+27 (0) 82 581 4215</a></p>
          </div>
        </div>
      </section>

      <div className="text-center pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
