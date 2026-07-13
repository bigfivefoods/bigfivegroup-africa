type LocalNewsVideoProps = {
  /** Optional section id for anchor links */
  id?: string;
  /** Accent colour for eyebrow (hex) */
  accent?: string;
  /** Layout: full width on light bg, or inset card */
  variant?: "section" | "card";
};

const VIDEO_ID = "2_O1S1Aue0c";
const VIDEO_TITLE = "Food insecurity | KZN Taxi industry joins fight against hunger";
const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`;

/**
 * SABC News feature — local publicity for Big Five Foods / hunger response.
 */
export default function LocalNewsVideo({
  id = "in-the-news",
  accent = "#d97706",
  variant = "section",
}: LocalNewsVideoProps) {
  const inner = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
      <div className="lg:col-span-5 min-w-0">
        <div
          className="text-xs tracking-[2px] sm:tracking-[3px] mb-3 sm:mb-4 font-medium"
          style={{ color: accent }}
        >
          IN THE NEWS · SABC
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 sm:mb-4 text-balance">
          Featured on SABC News
        </h2>
        <p className="text-[#525252] text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
          Local coverage of the fight against food insecurity in KwaZulu-Natal — including the taxi
          industry joining the response. Watch how communities and partners are mobilising around
          nutrition and access.
        </p>
        <p className="text-sm font-medium text-black mb-5 sm:mb-6 leading-snug">
          {VIDEO_TITLE}
        </p>
        <a
          href={VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-4 hover:opacity-70"
        >
          Watch on YouTube
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className="lg:col-span-7 min-w-0">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-black shadow-lg aspect-video">
          <iframe
            src={EMBED_URL}
            title={VIDEO_TITLE}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );

  if (variant === "card") {
    return (
      <div id={id} className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-8 md:p-10">
        {inner}
      </div>
    );
  }

  return (
    <section id={id} className="bg-white border-y border-black/10 py-14 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{inner}</div>
    </section>
  );
}
