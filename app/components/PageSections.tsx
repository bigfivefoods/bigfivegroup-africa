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
      className={`mb-10 sm:mb-12 md:mb-14 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
      }`}
    >
      {eyebrow && (
        <div
          className={`text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 sm:mb-4 ${
            light ? "text-white/50" : "text-[#525252]"
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-balance ${
          light ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed ${
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-black/20 hover:shadow-lg transition-all min-w-0"
        >
          <item.icon className="w-9 h-9 sm:w-10 sm:h-10 mb-4 sm:mb-5" style={{ color: accent }} />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-2 sm:mb-3">
            {item.title}
          </h3>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed">{item.desc}</p>
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
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-center min-w-0"
        >
          <div
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-1 sm:mb-2 break-words"
            style={{ color: accent }}
          >
            {s.value}
          </div>
          <div className="text-xs sm:text-sm md:text-base text-[#525252]">{s.label}</div>
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
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-8 items-start bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 min-w-0"
        >
          <div
            className="text-2xl sm:text-3xl font-light tracking-tighter shrink-0"
            style={{ color: accent }}
          >
            {s.step}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2">
              {s.title}
            </h3>
            <p className="text-[#525252] text-base sm:text-lg leading-relaxed">{s.desc}</p>
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
    "premium-button w-full sm:w-auto sm:min-w-[11rem] inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold";

  const primaryEl = primary.external ? (
    <a
      href={primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} bg-white text-black`}
    >
      {primary.label}
      <ArrowRight className="w-5 h-5 shrink-0" />
    </a>
  ) : (
    <Link href={primary.href} className={`${btnBase} bg-white text-black`}>
      {primary.label}
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
        {secondary.label}
      </a>
    ) : (
      <Link
        href={secondary.href}
        className={`${btnBase} border border-white/30 text-white hover:bg-white/10`}
      >
        {secondary.label}
      </Link>
    )
  ) : null;

  return (
    <section className="bg-black py-14 sm:py-20 md:py-24 text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto min-w-0">
        {eyebrow && (
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-white/40 mb-3 sm:mb-4">
            {eyebrow}
          </div>
        )}
        <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4 sm:mb-5 text-balance px-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/65 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 text-pretty">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto">
          {primaryEl}
          {secondaryEl}
        </div>
      </div>
    </section>
  );
}
