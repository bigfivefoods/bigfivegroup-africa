import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Cta = {
  href: string;
  label: string;
  primary?: boolean;
  external?: boolean;
};

export default function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  ctas = [],
  overlayClassName = "bg-black/50",
}: {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  ctas?: Cta[];
  overlayClassName?: string;
}) {
  return (
    <section className="relative min-h-[min(92dvh,820px)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div className="relative z-10 max-w-5xl px-6 text-center py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 text-[11px] tracking-[3px] text-white/90 mb-6">
          {eyebrow}
        </div>
        <h1 className="text-white text-[clamp(2.4rem,6.5vw,4.5rem)] font-semibold tracking-tighter leading-[0.98] mb-6">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-white/90 font-light tracking-tight mb-10">
          {subtitle}
        </p>
        {ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctas.map((cta) => {
              const className = cta.primary
                ? "premium-button inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full text-base sm:text-lg font-semibold"
                : "premium-button inline-flex items-center justify-center gap-3 border border-white/35 text-white px-9 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10";
              if (cta.external) {
                return (
                  <a
                    key={cta.href + cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {cta.label}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                );
              }
              return (
                <Link key={cta.href + cta.label} href={cta.href} className={className}>
                  {cta.label}
                  {cta.primary && <ArrowRight className="w-5 h-5" />}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
