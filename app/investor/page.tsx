import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  Leaf,
  Lock,
  Shield,
  Target,
  Wheat,
} from "lucide-react";
import {
  INVESTOR_COOKIE,
  verifyInvestorToken,
} from "../lib/investor-auth";
import { CONTACT_EMAIL } from "../lib/contact";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function InvestorPortalPage() {
  const jar = await cookies();
  const token = jar.get(INVESTOR_COOKIE)?.value;
  const session = await verifyInvestorToken(token);
  if (!session) {
    redirect("/investor/login?from=/investor");
  }

  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      {/* Hero band */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-amber-400 mb-4">
                <Lock className="w-3.5 h-3.5" />
                PRIVATE · INVESTOR PORTAL
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-3">
                Welcome, investor
              </h1>
              <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed">
                Signed in as{" "}
                <span className="text-white font-medium break-all">{session.email}</span>
                . This portal is for authorised investors only — materials are confidential.
              </p>
            </div>
            <LogoutButton />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { n: "10", l: "Pillars · one integrated Group" },
              { n: "2.5M", l: "Children / day NSNP plan (DBE pathway)" },
              { n: "12", l: "Priority distribution markets" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 min-w-0"
              >
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-amber-300 tabular-nums">
                  {s.n}
                </div>
                <div className="text-xs sm:text-sm text-white/55 mt-1 leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] mb-3">
          INVESTMENT THESIS
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-4 text-balance">
          One Group. Ten pillars. Measurable African impact.
        </h2>
        <p className="text-base sm:text-lg text-[#404040] leading-relaxed max-w-3xl mb-6 text-pretty">
          Big Five Group is an integrated African enterprise headquartered in KwaZulu-Natal —
          regenerative production, fortified nutrition, last-mile routes, institutional access,
          ethical commerce on SupplierAdvisor®, Super-Cube® leadership, philanthropy and PMO
          delivery — under one mission: <strong className="text-black">Feed · Educate · Empower</strong>.
        </p>
        <p className="text-sm text-[#525252] leading-relaxed max-w-3xl text-pretty">
          Figures on this site are labelled as ambition, programme-reported delivery, internal
          analysis or research. For audit-grade packs with dates and scopes, request a formal brief.
        </p>
      </section>

      {/* Pillar snapshot */}
      <section className="bg-white border-y border-black/10 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black mb-6">
            Operating system at a glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: Leaf,
                t: "Agri",
                d: "Regenerative opportunity at continental ambition — soil, farmers, provenance.",
              },
              {
                icon: Wheat,
                t: "Foods",
                d: "Fortified nutrition; NSNP pathway ambition of 2.5m children a day (DBE).",
              },
              {
                icon: Building2,
                t: "Access · Direct · Connect",
                d: "Capital pathways, route-to-market and SupplierAdvisor® verified trade.",
              },
              {
                icon: Target,
                t: "Impact PMO",
                d: "Cross-pillar delivery with gates, KPIs and field assurance.",
              },
              {
                icon: Shield,
                t: "Leadership",
                d: "Super-Cube® whole-person model — research-backed developability.",
              },
              {
                icon: Globe2,
                t: "Global · Royal",
                d: "12 priority markets (incl. DE · HU · GE); close ties and planned royal partnership.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0"
              >
                <c.icon className="w-6 h-6 text-amber-700 mb-3" />
                <h3 className="font-semibold text-black mb-1.5">{c.t}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black">
            Public decks & pages (share carefully)
          </h2>
        </div>
        <p className="text-sm text-[#525252] mb-6 max-w-2xl leading-relaxed">
          These pages are on the public site. Use them for orientation; request confidential
          financials and data rooms directly from the team.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/group", label: "Group overview · ten pillars" },
            { href: "/impact#strategy-deck", label: "Strategic overview deck" },
            { href: "/foods#foods-deck", label: "Foods product & impact deck" },
            { href: "/connect#connect-deck", label: "Connect · SupplierAdvisor® deck" },
            { href: "/leadership", label: "Leadership · Super-Cube®" },
            { href: "/global", label: "Global distribution markets" },
            { href: "/methodology", label: "Methodology & how we state numbers" },
            { href: "/partner-kit", label: "Partner kit (print)" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm font-medium text-black hover:border-black/25 transition-colors min-w-0"
            >
              <span className="truncate">{l.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#737373]" />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-3">
            Request the full data room
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8 leading-relaxed">
            Financial models, pipeline detail and partnership terms are shared under NDA — not on
            this public website.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "Investor enquiry — Big Five Group"
            )}&body=${encodeURIComponent(
              `Hello Big Five team,\n\nI am signed into the investor portal as ${session.email}.\nI would like to discuss investment / partnership materials.\n\nOrganisation:\nFocus:\nTimeline:\n\nThank you.`
            )}`}
            className="premium-button inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold"
          >
            Email {CONTACT_EMAIL}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
