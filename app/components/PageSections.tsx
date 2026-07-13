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
    <div className={`mb-12 sm:mb-14 ${align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}`}>
      {eyebrow && (
        <div
          className={`text-xs tracking-[3px] mb-4 ${light ? "text-white/50" : "text-[#525252]"}`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-4xl sm:text-5xl font-semibold tracking-tighter ${light ? "text-white" : "text-black"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/65" : "text-[#525252]"}`}>
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-white border border-black/10 rounded-3xl p-8 hover:border-black/20 hover:shadow-lg transition-all"
        >
          <item.icon className="w-10 h-10 mb-5" style={{ color: accent }} />
          <h3 className="text-xl font-semibold tracking-tight text-black mb-3">{item.title}</h3>
          <p className="text-[#525252] leading-relaxed">{item.desc}</p>
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-black/10 rounded-3xl p-7 sm:p-8 text-center"
        >
          <div className="text-4xl sm:text-5xl font-semibold tracking-tighter mb-2" style={{ color: accent }}>
            {s.value}
          </div>
          <div className="text-sm sm:text-base text-[#525252]">{s.label}</div>
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
    <div className="space-y-4">
      {steps.map((s) => (
        <div
          key={s.step}
          className="flex flex-col md:flex-row gap-5 md:gap-8 items-start bg-white border border-black/10 rounded-3xl p-7 sm:p-8"
        >
          <div className="text-3xl font-light tracking-tighter" style={{ color: accent }}>
            {s.step}
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-black mb-2">{s.title}</h3>
            <p className="text-[#525252] text-lg leading-relaxed">{s.desc}</p>
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
  const primaryEl = primary.external ? (
    <a
      href={primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
    >
      {primary.label}
      <ArrowRight className="w-5 h-5" />
    </a>
  ) : (
    <Link
      href={primary.href}
      className="premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
    >
      {primary.label}
      <ArrowRight className="w-5 h-5" />
    </Link>
  );

  const secondaryEl = secondary ? (
    secondary.external ? (
      <a
        href={secondary.href}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
      >
        {secondary.label}
      </a>
    ) : (
      <Link
        href={secondary.href}
        className="premium-button inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10"
      >
        {secondary.label}
      </Link>
    )
  ) : null;

  return (
    <section className="bg-black py-20 sm:py-24 text-center px-6">
      <div className="max-w-2xl mx-auto">
        {eyebrow && (
          <div className="text-xs tracking-[3px] text-white/40 mb-4">{eyebrow}</div>
        )}
        <h2 className="text-white text-4xl sm:text-5xl font-semibold tracking-tighter mb-5">
          {title}
        </h2>
        {subtitle && <p className="text-white/65 text-lg mb-10">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryEl}
          {secondaryEl}
        </div>
      </div>
    </section>
  );
}
