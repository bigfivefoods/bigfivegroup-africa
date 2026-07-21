import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NSNP, NSNP_CASE } from "../lib/nsnp";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata = {
  title: "Updates",
  description:
    "News and milestones from Big Five Group Africa — school nutrition, Super-Cube®, and continental delivery.",
  openGraph: {
    title: "Updates | Big Five Group Africa",
    url: "/updates",
    images: [SITE_OG_IMAGE],
  },
  alternates: { canonical: "/updates" },
};

const posts = [
  {
    date: "2026",
    tag: "Foods · NSNP",
    title: "School nutrition at national scale — 2.5 million children a day",
    body: `${NSNP_CASE.approval} Our fortified porridges and soya minces are built for daily institutional menus.`,
    href: "/foods#case-study",
    linkLabel: "Read the case study",
  },
  {
    date: "2026",
    tag: "Connect · SupplierAdvisor®",
    title: "The world’s most trusted supplier advice — blockchain ERP for B2B, B2G & B2C",
    body: "SupplierAdvisor® unites private trade, public procurement and consumer provenance on one verified OS — transparency, efficiency and live trust controls that can reshape how African and global businesses operate.",
    href: "/connect#case-study-sa",
    linkLabel: "Read the SupplierAdvisor case",
  },
  {
    date: "2026",
    tag: "Leadership · FMCG",
    title: "Super-Cube® lifts across the African FMCG value chain",
    body: "Measured construct improvements after a Super-Cube® intervention for local and international FMCG businesses — Principles +45.1%, Emotional +39.5%, and lifts across all six faces of the cube.",
    href: "/leadership#case-study",
    linkLabel: "View FMCG case study",
  },
  {
    date: "2020–2026",
    tag: "Leadership",
    title: "Super-Cube® — from DBA thesis to group Educate pillar",
    body: "Empirically grounded leadership formation for executives, public servants and youth — free book and peer-reviewed papers available.",
    href: "/leadership",
    linkLabel: "Explore Leadership",
  },
  {
    date: "Ongoing",
    tag: "Connect",
    title: "SupplierAdvisor® · SAM — ethical commerce and messenger AI",
    body: "Verified trade infrastructure and SAM (SupplierAdvisor Messenger) for the humans who run the chain.",
    href: "/connect/sam",
    linkLabel: "Meet SAM",
  },
];

export default function UpdatesPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-400 mb-4">UPDATES</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-4">
            What’s moving across the Group
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto">
            High-level milestones partners can reference — not a newsroom, a living brief.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-6">
        {posts.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0"
          >
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs tracking-[1.5px] uppercase text-[#737373] mb-3">
              <span>{p.date}</span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span className="text-emerald-800 font-semibold">{p.tag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2 text-balance">
              {p.title}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-4">{p.body}</p>
            <Link
              href={p.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
            >
              {p.linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}

        <p className="text-xs text-[#737373] leading-relaxed pt-4">
          NSNP programme reference:{" "}
          <a
            href={NSNP.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-black"
          >
            Department of Basic Education — National School Nutrition Programme
          </a>
          .
        </p>
      </section>
    </div>
  );
}
