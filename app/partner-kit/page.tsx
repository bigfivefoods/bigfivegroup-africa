import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NSNP_CASE, NSNP } from "../lib/nsnp";
import { SUPER_CUBE_FMCG_CASE } from "../lib/superCubeCase";
import { SA_CASE } from "../lib/supplierAdvisorCase";
import PrintButton from "../components/PrintButton";
import { siteSocialImages } from "../lib/site";

const social = siteSocialImages("partner-kit");

export const metadata = {
  title: "Partner kit",
  description:
    "One-page partner pack: Big Five Group mission, NSNP school nutrition case, Super-Cube® FMCG lifts, and how to engage.",
  openGraph: {
    title: "Partner kit | Big Five Group Africa",
    url: "/partner-kit",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },

  alternates: { canonical: "/partner-kit" },
};

export default function PartnerKitPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa] print:bg-white">
      <section className="bg-[#0a0a0a] text-white py-12 sm:py-16 print:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-[10px] tracking-[3px] text-emerald-400 mb-3">PARTNER KIT</div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-balance">
                Big Five Group Africa
              </h1>
              <p className="text-white/70 mt-2 max-w-xl text-sm sm:text-base">
                Feed · Educate · Empower — one group, ten pillars, measurable African impact.
              </p>
            </div>
            <PrintButton />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 print:py-6 print:space-y-6">
        <PrintButton
          className="sm:hidden premium-button inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold print:hidden"
        />

        <div className="rounded-2xl border border-black/10 bg-white p-6 print:border print:p-4">
          <h2 className="text-lg font-semibold text-black mb-2">Vision · Mission · Values</h2>
          <p className="text-sm text-[#404040] leading-relaxed mb-2">
            <strong>Vision:</strong> A prosperous Africa — for everyone on it.
          </p>
          <p className="text-sm text-[#404040] leading-relaxed mb-2">
            <strong>Mission:</strong> Feed · Educate · Empower.
          </p>
          <p className="text-sm text-[#525252] leading-relaxed">
            Integrated pillars from regenerative agri and fortified foods to Super-Cube® leadership,
            ethical commerce on SupplierAdvisor®, Foundation philanthropy and Impact PMO delivery.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 print:p-4">
          <Image
            src="/bigfivefoods-logo.png"
            alt="Big Five Foods"
            width={120}
            height={120}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain mb-3"
          />
          <h2 className="text-lg font-semibold text-black mb-2">Case · School nutrition (NSNP)</h2>
          <p className="text-2xl font-semibold tracking-tighter text-amber-900 mb-2">
            {NSNP_CASE.ambition} {NSNP_CASE.ambitionUnit}
          </p>
          <p className="text-sm text-[#404040] leading-relaxed mb-2">{NSNP_CASE.approval}</p>
          <a
            href={NSNP.officialUrl}
            className="text-xs font-medium text-[#854d0e] underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {NSNP.officialUrl}
          </a>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 print:p-4">
          <Image
            src="/super-cube-logo-transparent.png"
            alt="Super-Cube®"
            width={180}
            height={38}
            className="h-8 w-auto object-contain mb-3"
            unoptimized
          />
          <h2 className="text-lg font-semibold text-black mb-2">
            Case · Super-Cube® FMCG intervention
          </h2>
          <p className="text-sm text-[#525252] mb-4">{SUPER_CUBE_FMCG_CASE.body}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {SUPER_CUBE_FMCG_CASE.lifts.map((l) => (
              <div key={l.name} className="rounded-lg border border-black/10 bg-[#fafafa] px-3 py-2">
                <div className="text-lg font-semibold" style={{ color: l.color }}>
                  +{l.lift}
                </div>
                <div className="text-xs font-semibold text-black">{l.name}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#737373]">{SUPER_CUBE_FMCG_CASE.continentalBody}</p>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/30 p-6 print:p-4">
          <Image
            src={SA_CASE.logoSrc}
            alt={SA_CASE.logoAlt}
            width={140}
            height={100}
            className="h-14 w-auto object-contain mb-3"
            unoptimized
          />
          <h2 className="text-lg font-semibold text-black mb-2">
            Case · SupplierAdvisor® · trusted supplier OS
          </h2>
          <p className="text-base font-semibold text-cyan-900 mb-2 tracking-tight">
            &ldquo;{SA_CASE.tagline}&rdquo;
          </p>
          <p className="text-sm text-[#404040] leading-relaxed mb-3">{SA_CASE.body}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {SA_CASE.pillars.map((p) => (
              <div key={p.t} className="rounded-lg border border-cyan-100 bg-white px-3 py-2">
                <div className="text-xs font-bold text-cyan-900">{p.t}</div>
                <p className="text-[11px] text-[#525252] leading-snug line-clamp-3">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#737373] mb-2">{SA_CASE.revolutionBody}</p>
          <a
            href={SA_CASE.siteUrl}
            className="text-xs font-medium text-cyan-900 underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {SA_CASE.siteUrl}
          </a>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 print:p-4">
          <h2 className="text-lg font-semibold text-black mb-3">How to engage</h2>
          <ul className="text-sm text-[#404040] space-y-2 mb-4">
            <li>
              <strong>Strategic briefing</strong> — /contact
            </li>
            <li>
              <strong>Foods / NSNP supply</strong> — /foods
            </li>
            <li>
              <strong>Leadership cohorts</strong> — /leadership
            </li>
            <li>
              <strong>Methodology</strong> — /methodology
            </li>
          </ul>
          <Link
            href="/contact"
            className="premium-button inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold print:hidden"
          >
            Book a briefing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[11px] text-[#737373] print:text-[9px]">
          bigfivegroup.africa · craig@bigfivegroup.africa · +27 (0) 82 581 4215 · KwaZulu-Natal, South
          Africa. Figures: see Methodology. Super-Cube® and SupplierAdvisor® are trademarks of their
          respective owners.
        </p>
      </section>
    </div>
  );
}
