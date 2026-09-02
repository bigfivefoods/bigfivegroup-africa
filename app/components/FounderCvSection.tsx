"use client";

import Image from "next/image";
import {
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
} from "lucide-react";
import { FOUNDER_CV } from "../lib/founderCv";

export default function FounderCvSection() {
  const cv = FOUNDER_CV;

  return (
    <section
      id="founder-cv"
      className="scroll-mt-28 bg-[#fafafa] border-b border-black/10 py-12 sm:py-16 md:py-20 print:bg-white print:py-6"
      aria-labelledby="founder-cv-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10 print:mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-amber-700" />
              <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373]">
                FOUNDER · GROUP CEO · DILIGENCE PROFILE
              </div>
            </div>
            <h2
              id="founder-cv-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black text-balance"
            >
              Curriculum vitae — {cv.name}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] mt-2 max-w-2xl leading-relaxed text-pretty">
              Full professional profile for investor diligence. LinkedIn and ResearchGate linked
              below; print or save as PDF from this page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black hover:border-amber-400/80 hover:bg-amber-50 transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>

        {/* Hero card */}
        <div className="rounded-3xl border border-black/10 bg-[#0a0a0a] text-white overflow-hidden mb-8 sm:mb-10 print:border print:border-black/20 print:break-inside-avoid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 md:p-10">
            <div className="lg:col-span-4 min-w-0 flex flex-col items-center lg:items-start">
              <div className="relative w-full max-w-[11rem] sm:max-w-[13rem] mb-6">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/40 via-transparent to-emerald-500/20 blur-sm print:hidden" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/5">
                  <Image
                    src={cv.photo.src}
                    alt={cv.photo.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 176px, 208px"
                    priority
                  />
                </div>
              </div>
              <div className="text-[10px] tracking-[2px] text-amber-400 mb-2 text-center lg:text-left">
                {cv.title.toUpperCase()}
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter mb-1 text-center lg:text-left">
                {cv.name}
              </h3>
              <p className="text-white/60 text-sm mb-5 text-center lg:text-left">
                {cv.organisation}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {cv.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium border border-white/20 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors"
                  >
                    {l.label}
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 min-w-0 space-y-5">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed text-pretty">
                {cv.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <a
                  href={`mailto:${cv.personal.email}`}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 hover:bg-white/[0.08] transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block text-[10px] tracking-[1px] text-white/40 mb-0.5">
                      EMAIL
                    </span>
                    <span className="text-white/90 break-all">{cv.personal.email}</span>
                    <span className="block text-white/45 text-xs mt-0.5 break-all">
                      {cv.personal.emailAlt}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${cv.personal.mobileE164}`}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 hover:bg-white/[0.08] transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block text-[10px] tracking-[1px] text-white/40 mb-0.5">
                      MOBILE
                    </span>
                    <span className="text-white/90">{cv.personal.mobile}</span>
                  </span>
                </a>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block text-[10px] tracking-[1px] text-white/40 mb-0.5">
                      LOCATION · WORK AUTHORISATION
                    </span>
                    <span className="text-white/90">{cv.personal.location}</span>
                    <span className="block text-white/45 text-xs mt-0.5">
                      Authorised to work: {cv.personal.workAuthorisation}
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                  <Award className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block text-[10px] tracking-[1px] text-white/40 mb-0.5">
                      ID NUMBER
                    </span>
                    <span className="text-white/90 tabular-nums tracking-wide">
                      {cv.personal.idNumber}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional profile */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 mb-6 sm:mb-8 print:break-inside-avoid">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Professional profile
          </h3>
          <div className="space-y-3 text-sm sm:text-base text-[#404040] leading-relaxed">
            {cv.profile.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>

        {/* Education + certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 print:break-inside-avoid">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              Education
            </h3>
            <ul className="space-y-5">
              {cv.education.map((e) => (
                <li key={e.award + e.year} className="border-b border-black/5 last:border-0 pb-4 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <span className="font-semibold text-black">
                      {e.award} · {e.subject}
                    </span>
                    <span className="text-xs tabular-nums text-[#737373] shrink-0">{e.year}</span>
                  </div>
                  <p className="text-sm text-[#525252]">
                    {e.institution} · {e.country}
                  </p>
                  {"note" in e && e.note ? (
                    <p className="text-xs text-[#737373] mt-1.5 leading-relaxed">{e.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 print:break-inside-avoid">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Professional certifications
            </h3>
            <ul className="space-y-3">
              {cv.certifications.map((c) => (
                <li
                  key={c.name}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm border-b border-black/5 last:border-0 pb-3 last:pb-0"
                >
                  <span>
                    <span className="font-semibold text-black">{c.name}</span>
                    <span className="text-[#737373]"> · {c.institute}</span>
                  </span>
                  <span className="text-xs tabular-nums text-[#737373]">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Publications */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 mb-6 sm:mb-8 print:break-inside-avoid">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Selected publications
          </h3>
          <ul className="space-y-4">
            {cv.publications.map((pub) => (
              <li key={pub.title} className="text-sm">
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-black hover:underline inline-flex items-start gap-1.5"
                >
                  <span>{pub.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50" />
                </a>
                <p className="text-[#525252] mt-1">
                  {pub.venue} · {pub.year}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Career summary table */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 mb-6 sm:mb-8 overflow-hidden">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5">
            Career summary
          </h3>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[40rem] text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-[10px] tracking-[1px] text-[#737373] border-b border-black/10">
                  <th className="py-2 pr-3 font-semibold">Years</th>
                  <th className="py-2 pr-3 font-semibold">Organisation</th>
                  <th className="py-2 pr-3 font-semibold">Role</th>
                  <th className="py-2 pr-3 font-semibold">Industry</th>
                  <th className="py-2 font-semibold">Country</th>
                </tr>
              </thead>
              <tbody>
                {cv.careerSummary.map((row) => (
                  <tr key={row.org + row.years} className="border-t border-black/5 align-top">
                    <td className="py-2.5 pr-3 tabular-nums text-[#525252] whitespace-nowrap">
                      {row.years}
                    </td>
                    <td className="py-2.5 pr-3 font-medium text-black">{row.org}</td>
                    <td className="py-2.5 pr-3 text-[#404040]">{row.role}</td>
                    <td className="py-2.5 pr-3 text-[#525252]">{row.industry}</td>
                    <td className="py-2.5 text-[#525252]">{row.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed experience */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5 px-1">
            Career detail
          </h3>
          <div className="space-y-4 sm:space-y-5">
            {cv.experience.map((job) => (
              <article
                key={job.org + job.period}
                className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7 print:break-inside-avoid"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-black tracking-tight">
                      {job.org}
                    </h4>
                    <p className="text-sm font-medium text-amber-900/90">{job.role}</p>
                  </div>
                  <div className="text-xs sm:text-sm text-[#737373] sm:text-right shrink-0">
                    <div className="tabular-nums">{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">{job.overview}</p>
                {job.highlights.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-[#404040]">
                    {job.highlights.map((h) => (
                      <li key={h.slice(0, 60)} className="flex gap-2 leading-relaxed">
                        <span className="text-amber-600 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* Expertise + interests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 print:break-inside-avoid">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5">
              Skills & expertise
            </h3>
            <ul className="space-y-3.5">
              {cv.expertise.map((x) => (
                <li key={x.area}>
                  <div className="text-sm font-semibold text-black mb-0.5">{x.area}</div>
                  <p className="text-sm text-[#525252] leading-relaxed">{x.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 print:break-inside-avoid">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-5">
              Interests & community
            </h3>
            <ul className="space-y-2.5 text-sm text-[#404040] leading-relaxed">
              {cv.interests.map((i) => (
                <li key={i.slice(0, 40)} className="flex gap-2">
                  <span className="text-amber-600 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[#737373] leading-relaxed border-t border-black/5 pt-4">
              Profiles:{" "}
              <a
                href="https://za.linkedin.com/in/craigmuller"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium hover:underline"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href="https://www.researchgate.net/profile/Craig-Muller"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium hover:underline"
              >
                ResearchGate
              </a>
              {" · "}
              <a
                href="https://bigfivegroup.africa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium hover:underline"
              >
                bigfivegroup.africa
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
