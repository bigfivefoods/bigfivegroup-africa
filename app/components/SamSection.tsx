"use client";

import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { sa, SA_ONBOARDING, SA_LOGIN, SA_URL } from "../lib/saCopy";

type Props = {
  /** dark band for Connect page */
  dark?: boolean;
  showDeepLink?: boolean;
};

export default function SamSection({ dark = false, showDeepLink = true }: Props) {
  const sam = sa.sam;

  return (
    <section
      id="sam"
      className={`scroll-mt-24 border-y ${
        dark
          ? "border-white/10 bg-gradient-to-br from-[#083344] via-[#0e7490] to-[#155e75] text-white"
          : "border-black/10 bg-gradient-to-br from-cyan-50 to-sky-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 min-w-0">
            <div
              className={`text-xs tracking-[2px] font-semibold mb-3 ${
                dark ? "text-cyan-200" : "text-cyan-800"
              }`}
            >
              BIG FIVE CONNECT · {sam.fullName.toUpperCase()}
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance mb-3 ${
                dark ? "text-white" : "text-black"
              }`}
            >
              {sam.heroTitle}
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed mb-3 max-w-2xl ${
                dark ? "text-white/80" : "text-[#404040]"
              }`}
            >
              {sam.heroBody}
            </p>
            <p
              className={`text-sm leading-relaxed mb-6 max-w-2xl ${
                dark ? "text-cyan-100/90" : "text-[#525252]"
              }`}
            >
              <strong className={dark ? "text-white" : "text-black"}>{sam.oneLiner}</strong>
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={SA_ONBOARDING}
                target="_blank"
                rel="noopener noreferrer"
                className={`premium-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold ${
                  dark
                    ? "bg-white text-cyan-950"
                    : "bg-cyan-700 text-white hover:bg-cyan-800"
                }`}
              >
                {sam.cta}
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={SA_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className={`premium-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border ${
                  dark
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-cyan-800/25 text-cyan-950 hover:bg-white"
                }`}
              >
                Existing user? Log in
              </a>
              {showDeepLink && (
                <Link
                  href="/connect/sam"
                  className={`premium-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border ${
                    dark
                      ? "border-white/40 text-white hover:bg-white/10"
                      : "border-black/15 text-black hover:bg-white"
                  }`}
                >
                  Learn about {sam.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            <p
              className={`mt-4 text-xs ${dark ? "text-white/50" : "text-[#737373]"}`}
            >
              {sam.deepLinkNote}{" "}
              <a
                href={SA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-medium"
              >
                supplieradvisor.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <div
              className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 ${
                dark
                  ? "border-white/20 bg-black/20"
                  : "border-black/10 bg-white shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare
                  className={dark ? "w-6 h-6 text-cyan-200" : "w-6 h-6 text-cyan-700"}
                />
                <div>
                  <div
                    className={`font-semibold ${dark ? "text-white" : "text-black"}`}
                  >
                    {sam.name}
                  </div>
                  <div
                    className={`text-xs ${dark ? "text-white/55" : "text-[#737373]"}`}
                  >
                    {sam.tagline}
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {sam.useCases.map((u) => (
                  <li key={u.title} className="flex gap-2.5">
                    <Sparkles
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        dark ? "text-cyan-200" : "text-cyan-700"
                      }`}
                    />
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          dark ? "text-white" : "text-black"
                        }`}
                      >
                        {u.title}
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          dark ? "text-white/65" : "text-[#525252]"
                        }`}
                      >
                        {u.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                className={`mt-5 pt-4 border-t flex flex-wrap gap-3 text-xs ${
                  dark ? "border-white/15 text-white/55" : "border-black/10 text-[#737373]"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> Live pulse
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified trade
                </span>
                <span>Super-Cube® ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
