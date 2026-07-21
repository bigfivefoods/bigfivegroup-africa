import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Newspaper } from "lucide-react";
import NewsletterForm from "../components/NewsletterForm";
import { NEWSLETTER_TOPICS } from "../lib/newsletter";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the Big Five Group Africa newsletter — programme updates, partnership pathways, and continental Group news.",
  openGraph: {
    title: "Newsletter | Big Five Group Africa",
    description:
      "Occasional updates on nutrition programmes, partnerships, leadership and Group milestones.",
    url: "/newsletter",
    images: [SITE_OG_IMAGE],
  },
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <div className="page-shell overflow-x-clip bg-[#fafafa]">
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-emerald-300/90 mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            NEWSLETTER · BIG FIVE GROUP AFRICA
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance max-w-3xl mb-4">
            Stay close to the work.
          </h1>
          <p className="text-white/65 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-pretty">
            Occasional updates on Feed · Educate · Empower — school nutrition, last-mile
            partnerships, leadership, and continental milestones. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black mb-3">
              What you&apos;ll receive
            </h2>
            <ul className="space-y-3 mb-8">
              {NEWSLETTER_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="flex gap-2.5 text-sm text-[#404040] leading-relaxed"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#737373] leading-relaxed mb-4">
              For private investor materials use the{" "}
              <Link href="/investor" className="font-semibold text-black underline underline-offset-2">
                investor portal
              </Link>
              . For authorised partners, the{" "}
              <Link href="/partner" className="font-semibold text-black underline underline-offset-2">
                partner portal
              </Link>
              .
            </p>
            <Link
              href="/updates"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black"
            >
              Browse public updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-1">
                Subscribe
              </h2>
              <p className="text-sm text-[#525252] mb-6 leading-relaxed">
                Choose topics, enter your email and confirm consent. We store your subscription
                securely and you can unsubscribe anytime.
              </p>
              <NewsletterForm variant="page" source="newsletter_page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
