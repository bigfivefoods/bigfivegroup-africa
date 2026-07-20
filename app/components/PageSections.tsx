import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-8 sm:mb-10 md:mb-12 lg:mb-14 min-w-0 px-1 ${
        align === "center" ? "text-center max-w-3xl 2xl:max-w-4xl mx-auto" : "max-w-3xl 2xl:max-w-4xl"
      }`}
    >
      {eyebrow && (
        <div
          className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-2.5 sm:mb-3 md:mb-4 break-words ${
            light ? "text-white/50" : "text-[#525252]"
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-balance ${
          light ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2.5 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-pretty ${
            light ? "text-white/65" : "text-[#525252]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function FeatureGrid({
  items,
  accent = "#111",
}: {
  items: { icon: LucideIcon; title: string; desc: string }[];
  accent?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-black/20 hover:shadow-lg transition-all min-w-0 h-full"
        >
          <item.icon
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mb-3 sm:mb-4 md:mb-5"
            style={{ color: accent }}
          />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-black mb-2 sm:mb-3 break-words">
            {item.title}
          </h3>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed text-pretty">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export function StatRow({
  stats,
  accent = "#111",
}: {
  stats: { value: string; label: string }[];
  accent?: string;
}) {
  const cols =
    stats.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : stats.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${cols} gap-3 sm:gap-4 md:gap-5`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8 text-center min-w-0"
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter mb-1 sm:mb-2 break-words tabular-nums"
            style={{ color: accent }}
          >
            {s.value}
          </div>
          <div className="text-[11px] sm:text-sm md:text-base text-[#525252] leading-snug break-words text-pretty">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps({
  steps,
  accent = "#111",
}: {
  steps: { step: string; title: string; desc: string }[];
  accent?: string;
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {steps.map((s) => (
        <div
          key={s.step}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-8 items-start bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 min-w-0"
        >
          <div
            className="text-xl sm:text-2xl md:text-3xl font-light tracking-tighter shrink-0"
            style={{ color: accent }}
          >
            {s.step}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-black mb-1.5 sm:mb-2 break-words">
              {s.title}
            </h3>
            <p className="text-[#525252] text-sm sm:text-base md:text-lg leading-relaxed text-pretty">
              {s.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FinalCta({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: { href: string; label: string; external?: boolean };
  secondary?: { href: string; label: string; external?: boolean };
}) {
  const btnBase =
    "premium-button w-full sm:w-auto sm:min-w-[11rem] min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold";

  const primaryEl = primary.external ? (
    <a
      href={primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} bg-white text-black`}
    >
      <span className="text-center leading-snug">{primary.label}</span>
      <ArrowRight className="w-5 h-5 shrink-0" />
    </a>
  ) : (
    <Link href={primary.href} className={`${btnBase} bg-white text-black`}>
      <span className="text-center leading-snug">{primary.label}</span>
      <ArrowRight className="w-5 h-5 shrink-0" />
    </Link>
  );

  const secondaryEl = secondary ? (
    secondary.external ? (
      <a
        href={secondary.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} border border-white/30 text-white hover:bg-white/10`}
      >
        <span className="text-center leading-snug">{secondary.label}</span>
      </a>
    ) : (
      <Link
        href={secondary.href}
        className={`${btnBase} border border-white/30 text-white hover:bg-white/10`}
      >
        <span className="text-center leading-snug">{secondary.label}</span>
      </Link>
    )
  ) : null;

  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 lg:py-24 text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl md:max-w-3xl mx-auto min-w-0">
        {eyebrow && (
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-white/40 mb-3 sm:mb-4 break-words">
            {eyebrow}
          </div>
        )}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter mb-3 sm:mb-5 text-balance px-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/65 text-sm sm:text-base md:text-lg mb-7 sm:mb-10 text-pretty px-1">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto w-full">
          {primaryEl}
          {secondaryEl}
        </div>
      </div>
    </section>
  );
}
