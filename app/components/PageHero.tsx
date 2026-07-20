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
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    /** Extra classes e.g. brightness-0 invert for white logo on dark heroes */
    className?: string;
  };
}) {
  const manyCtas = ctas.length > 2;

  return (
    <section className="relative min-h-[min(82dvh,620px)] sm:min-h-[min(88dvh,720px)] md:min-h-[min(90dvh,780px)] lg:min-h-[min(92dvh,840px)] flex items-center justify-center overflow-hidden w-full min-w-0">
      <div
        className="absolute inset-0 bg-cover bg-center sm:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
        role="img"
        aria-hidden
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 md:py-20 lg:py-24 min-w-0">
        {logo && (
          <div className="flex justify-center mb-3 sm:mb-5 md:mb-6">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 160}
              height={logo.height ?? 160}
              className={`h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain drop-shadow-lg ${
                logo.className ?? ""
              }`}
              priority
            />
          </div>
        )}
        <div className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/25 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] text-white/90 mb-3 sm:mb-5 md:mb-6">
          <span className="truncate">{eyebrow}</span>
        </div>
        <h1 className="text-white text-[clamp(1.65rem,4.8vw+0.55rem,4.5rem)] font-semibold tracking-tighter leading-[1.06] sm:leading-[1.02] md:leading-[0.98] mb-3 sm:mb-5 md:mb-6 text-balance px-1">
          {title}
        </h1>
        <p className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-light tracking-tight mb-6 sm:mb-8 md:mb-10 text-pretty px-1">
          {subtitle}
        </p>
        {ctas.length > 0 && (
          <div
            className={`flex flex-col gap-3 sm:gap-4 justify-center items-stretch mx-auto w-full min-w-0 ${
              manyCtas
                ? "sm:flex-col md:flex-row md:flex-wrap md:items-center max-w-sm sm:max-w-md md:max-w-3xl"
                : "sm:flex-row sm:flex-wrap sm:items-center max-w-sm sm:max-w-none"
            }`}
          >
            {ctas.map((cta) => {
              const className = cta.primary
                ? "premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-7 md:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold"
                : "premium-button w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 border border-white/35 text-white px-5 sm:px-7 md:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10";
              if (cta.external) {
                return (
                  <a
                    key={cta.href + cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    <span className="text-center leading-snug">{cta.label}</span>
                    {cta.primary && <ArrowRight className="w-5 h-5 shrink-0" />}
                  </a>
                );
              }
              return (
                <Link key={cta.href + cta.label} href={cta.href} className={className}>
                  <span className="text-center leading-snug">{cta.label}</span>
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
