"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">LEGAL</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none mb-4 sm:mb-6 text-balance">Privacy Policy</h1>
          <p className="text-base sm:text-xl text-white/80">Last updated: 19 July 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-[#171717]">
        <div className="prose prose-base sm:prose-lg max-w-none">
          <p className="text-lg sm:text-xl text-[#525252] mb-10 sm:mb-12">
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
          <p className="mt-4">This may include name, email, phone number, organisation name, business details, IP address, and transaction data.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">2. Website enquiries</h2>
          <p>
            When you use the contact form at <strong>/contact</strong>, your device opens your own
            email application with a draft addressed to{" "}
            <strong>craig@bigfivegroup.africa</strong> (the same address shown in the site footer).
            You send the message from your own email account — we do not use a third-party bulk email
            service to send enquiries on your behalf. Details you include in that draft are only
            received when you press send. We use them solely to respond and, where relevant, prepare a
            briefing. We do not sell this information.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">2A. Newsletter subscriptions</h2>
          <p>
            When you subscribe via the footer or <strong>/newsletter</strong>, your device opens your
            own email application with an opt-in draft to{" "}
            <strong>craig@bigfivegroup.africa</strong>. You complete subscription by pressing send —
            we only receive your email (and optional name / organisation) when you send that message.
            We use it to add you to our newsletter list and send occasional Group updates. You may
            unsubscribe at any time by emailing the same address. We do not sell newsletter data.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Respond to partnership and programme enquiries</li>
            <li>Provide and improve our services</li>
            <li>Process donations and issue Section 18A certificates</li>
            <li>Verify businesses on Big Five Connect</li>
            <li>Send newsletters and impact reports where you have opted in (including via the website newsletter form)</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">4. Data Sharing & Third Parties</h2>
          <p>We do not sell your personal information. We only share data with trusted partners (e.g., payment processors, auditors, government regulators) when necessary to deliver our services or comply with law.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">5. Your Rights (POPIA)</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Access your personal information</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">6. Data Security</h2>
          <p>We implement industry-standard security measures, including encryption, access controls, and regular audits. All sensitive data related to donations and on-chain transactions is protected with blockchain-level security.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">7. Analytics</h2>
          <p>
            We may use privacy-aware analytics (for example Plausible and/or Google Analytics with IP
            anonymisation) to understand site usage. Analytics scripts only load when configured by
            the site operator. You can use browser settings to limit tracking. We do not sell personal
            data collected via analytics.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">8. Contact Us</h2>
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
