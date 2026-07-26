import Link from "next/link";
import { Compass, Target, ArrowRight } from "lucide-react";
import { getPillarAlignment, GROUP_VMV } from "../lib/pillarAlignment";
import { SOFI } from "../lib/sofi";

/**
 * Compact band: Group VMV + SOFI challenge + how this pillar responds.
 * Place early on pillar pages (after trust strip) for coherence.
 */
export default function PillarAlignmentBand({
  slug,
  accent = "#059669",
  accentSoft = "#ecfdf5",
}: {
  slug: string;
  accent?: string;
  accentSoft?: string;
}) {
  const a = getPillarAlignment(slug);

  return (
    <section
      className="border-b border-black/10 bg-white"
      aria-label="Vision mission and food-security alignment"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className="text-[10px] font-semibold tracking-[2px] uppercase px-2.5 py-1 rounded-full border"
            style={{ color: accent, borderColor: `${accent}44`, backgroundColor: accentSoft }}
          >
            {a.mission} · Group north star
          </span>
          <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#a3a3a3]">
            {SOFI.shortCite}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-6">
          <div className="lg:col-span-4 rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-emerald-800">
                Vision
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black mb-1.5">
              {GROUP_VMV.vision.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
              {GROUP_VMV.vision.body}
            </p>
          </div>
          <div className="lg:col-span-4 rounded-2xl border border-black/10 bg-[#fafafa] p-5 sm:p-6 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-sky-700" />
              <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-sky-800">
                Mission
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black mb-1.5">
              {GROUP_VMV.mission.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
              {a.missionFit}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {GROUP_VMV.values.map((v) => (
                <span
                  key={v.title}
                  className="text-[10px] font-semibold rounded-full bg-white border border-black/10 px-2 py-0.5 text-[#404040]"
                >
                  {v.title}
                </span>
              ))}
            </div>
          </div>
          <div
            className="lg:col-span-4 rounded-2xl border p-5 sm:p-6 min-w-0"
            style={{
              borderColor: `${accent}33`,
              background: `linear-gradient(160deg, ${accentSoft} 0%, #ffffff 65%)`,
            }}
          >
            <div
              className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-2"
              style={{ color: accent }}
            >
              UN SOFI · How this pillar answers
            </div>
            <p className="text-xs sm:text-sm text-[#404040] leading-relaxed mb-3">
              <strong className="text-black">Challenge:</strong> {a.sofiChallenge}
            </p>
            <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
              <strong className="text-black">Our response:</strong> {a.sofiResponse}
            </p>
          </div>
        </div>

        {a.stats && a.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {a.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-black/10 bg-white px-3 py-2.5 min-w-0"
              >
                <div
                  className="text-lg sm:text-xl font-semibold tracking-tighter"
                  style={{ color: accent }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#525252] leading-snug mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-[10px] sm:text-[11px] text-[#a3a3a3] leading-relaxed max-w-3xl">
          External hunger and nutrition figures are multi-agency UN SOFI / JME estimates — not Big
          Five audited counts.{" "}
          <a
            href={SOFI.newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[#737373] hover:text-black"
          >
            SOFI 2026 source
          </a>
          {" · "}
          <Link href="/group#vision" className="underline underline-offset-2 hover:text-black">
            Full Group VMV
            <ArrowRight className="inline w-3 h-3 ml-0.5 -mt-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
