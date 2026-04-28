"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="text-[#fbbf24] text-xs tracking-[3px] mb-4">LEGAL</div>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">Terms of Service</h1>
          <p className="text-xl text-white/80">Last updated: 27 April 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-[#171717]">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[#525252] mb-12">
            These Terms of Service (“Terms”) govern your use of the Big Five Group Africa website, platforms (including Big Five Connect and SupplierAdvisor), and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">1. Acceptance of Terms</h2>
          <p>By using our website or services, you confirm that you have read, understood, and agree to these Terms. If you do not agree, please do not use our services.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">2. Services Provided</h2>
          <p>Big Five Group Africa provides:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Supply chain transparency and verification (Big Five Connect)</li>
            <li>Leadership development programmes (Super-Cube®)</li>
            <li>Donation and impact tracking platforms</li>
            <li>Information about our eight pillars and continental operations</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Provide accurate and complete information</li>
            <li>Respect the intellectual property and on-chain integrity of our platforms</li>
            <li>Not engage in any fraudulent, illegal, or harmful activity</li>
          </ul>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">4. Intellectual Property</h2>
          <p>All content, branding, logos, and technology on this website (including Super-Cube® and Big Five Connect) are the property of Big Five Group Africa or its licensors. You may not copy, modify, or distribute any content without prior written permission.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">5. Limitation of Liability</h2>
          <p>To the fullest extent permitted by South African law, Big Five Group Africa shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">6. Governing Law</h2>
          <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved in the courts of South Africa.</p>

          <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">7. Contact Us</h2>
          <p>For any questions regarding these Terms, please contact:</p>
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
