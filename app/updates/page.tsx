import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NSNP } from "../lib/nsnp";
import { SITE_OG_IMAGE } from "../lib/site";
import { listStories } from "../lib/stories/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Updates",
  description:
    "Stories and milestones from Big Five Group Africa — school nutrition, Super-Cube®, partnerships, and continental delivery.",
  openGraph: {
    title: "Updates | Big Five Group Africa",
    url: "/updates",
    images: [SITE_OG_IMAGE],
  },
  alternates: { canonical: "/updates" },
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export default async function UpdatesPage() {
  const stories = await listStories({ status: "published" });

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-400 mb-4">
            UPDATES · STORIES
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance mb-4">
            What’s moving across the Group
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto">
            High-level milestones partners can reference — not a newsroom, a living brief.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-6">
        {stories.length === 0 && (
          <p className="text-sm text-[#525252] text-center py-12">
            New stories will appear here soon.
          </p>
        )}

        {stories.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 min-w-0"
          >
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs tracking-[1.5px] uppercase text-[#737373] mb-3">
              {s.publishedAt && <span>{formatDate(s.publishedAt)}</span>}
              {s.publishedAt && <span className="w-1 h-1 rounded-full bg-black/20" />}
              <span className="text-emerald-800 font-semibold">{s.tag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2 text-balance">
              <Link href={`/updates/${s.slug}`} className="hover:underline">
                {s.title}
              </Link>
            </h2>
            {s.excerpt && (
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-4">
                {s.excerpt}
              </p>
            )}
            <Link
              href={`/updates/${s.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
            >
              Read story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}

        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-black">Get stories in your inbox</p>
            <p className="text-xs text-[#737373] mt-1">
              Subscribe to the Group newsletter for partner-ready briefs.
            </p>
          </div>
          <Link
            href="/newsletter"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold shrink-0"
          >
            Newsletter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-[#737373] leading-relaxed pt-2">
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
