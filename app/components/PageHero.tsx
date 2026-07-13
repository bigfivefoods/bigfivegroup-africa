import Image from "next/image";
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
  logo,
}: {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  ctas?: Cta[];
  overlayClassName?: string;
  logo?: { src: string; alt: string; width?: number; height?: number };
}) {
  return (
    <section className="relative min-h-[min(88dvh,720px)] sm:min-h-[min(92dvh,820px)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 md:py-24">
        {logo && (
          <div className="flex justify-center mb-5 sm:mb-6">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 160}
              height={logo.height ?? 160}
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-lg"
              priority
            />
          </div>
        )}
        <div className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/25 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] text-white/90 mb-5 sm:mb-6">
          <span className="truncate">{eyebrow}</span>
        </div>
        <h1 className="text-white text-[clamp(1.85rem,5.5vw+0.5rem,4.5rem)] font-semibold tracking-tighter leading-[1.02] sm:leading-[0.98] mb-5 sm:mb-6 text-balance">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-white/90 font-light tracking-tight mb-8 sm:mb-10 text-pretty">
          {subtitle}
        </p>
        {ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto max-w-lg sm:max-w-none mx-auto">
            {ctas.map((cta) => {
              const className = cta.primary
                ? "premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
                : "premium-button w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/35 text-white px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10";
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
                    {cta.primary && <ArrowRight className="w-5 h-5 shrink-0" />}
                  </a>
                );
              }
              return (
                <Link key={cta.href + cta.label} href={cta.href} className={className}>
                  {cta.label}
                  {cta.primary && <ArrowRight className="w-5 h-5 shrink-0" />}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
