import Image from "next/image";
import {
  missionLogo,
  type MissionPillar,
} from "../lib/stories/theme";

/**
 * Story cover — local paths use next/image; remote URLs use img.
 * Optional mission logo badge (Feed / Educate / Empower).
 */
export default function StoryCover({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  mission,
  logoSize = "md",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** When set, overlays the mission brand mark on the cover */
  mission?: MissionPillar;
  logoSize?: "sm" | "md";
}) {
  const remote = src.startsWith("http://") || src.startsWith("https://");
  const logo = mission ? missionLogo(mission) : null;
  const pad = logoSize === "sm" ? "p-1.5 sm:p-2" : "p-2 sm:p-2.5";
  const h = logoSize === "sm" ? "h-7 sm:h-8" : "h-9 sm:h-11";
  const w = logoSize === "sm" ? "w-auto max-w-[4.5rem] sm:max-w-[5.5rem]" : "w-auto max-w-[5.5rem] sm:max-w-[7rem]";

  return (
    <div className={`relative overflow-hidden bg-black/5 ${className}`}>
      {remote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`absolute inset-0 w-full h-full ${imageClassName}`} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
      )}

      {logo && (
        <div
          className={`absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-[2] rounded-xl sm:rounded-2xl shadow-md ring-1 ring-black/10 ${pad} ${
            logo.plate === "light" ? "bg-white/95 backdrop-blur-sm" : "bg-black/55 backdrop-blur-sm ring-white/15"
          }`}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt=""
            className={`${h} ${w} object-contain`}
          />
        </div>
      )}
    </div>
  );
}
