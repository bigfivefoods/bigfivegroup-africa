import Link from "next/link";
import { ArrowRight, BookOpen, Leaf, Sparkles } from "lucide-react";
import { NSNP } from "../lib/nsnp";
import { siteSocialImages } from "../lib/site";
import { listStories } from "../lib/stories/store";
import { formatStoryDate } from "../lib/stories/format";
import {
  missionAccent,
  missionLogo,
  resolveStoryTheme,
  storyCoverImage,
  type MissionPillar,
} from "../lib/stories/theme";
import StoryCover from "../components/StoryCover";
import type { Story } from "../lib/stories/types";

const social = siteSocialImages("updates");

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Updates",
  description:
    "Stories and milestones from Big Five Group Africa — school nutrition, Super-Cube®, partnerships, and continental delivery.",
  openGraph: {
    title: "Updates | Big Five Group Africa",
    url: "/updates",
    images: social.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    images: social.twitter.images,
  },

  alternates: { canonical: "/updates" },
};

function storyMeta(s: Story) {
  const theme = resolveStoryTheme(s.tag, `${s.title} ${s.slug}`);
  const cover = storyCoverImage(s.coverImage, theme);
  return { theme, cover };
}

function MissionChip({
  label,
  icon: Icon,
  color,
}: {
  label: string;
  icon: typeof Leaf;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] tracking-[1.5px] uppercase text-white/90 backdrop-blur-sm"
      style={{ boxShadow: `inset 0 0 0 1px ${color}33` }}
    >
      <Icon className="w-3 h-3" style={{ color }} />
      {label}
    </span>
  );
}

function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  const { theme, cover } = storyMeta(story);
  const { brand, mission, unitLabel } = theme;
  const href = `/updates/${story.slug}`;

  if (featured) {
    return (
      <article
        className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 bg-white shadow-sm min-w-0"
        style={{ boxShadow: `0 0 0 1px ${brand.accent}18` }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{ background: brand.accent }}
          aria-hidden
        />
        <Link href={href} className="grid grid-cols-1 md:grid-cols-2 min-h-0">
          <StoryCover
            src={cover}
            alt=""
            className="aspect-[16/11] md:aspect-auto md:min-h-[280px] lg:min-h-[320px]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            mission={mission}
            logoSize="md"
          />
          <div
            className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 min-w-0"
            style={{ background: `linear-gradient(180deg, ${brand.accentSoft} 0%, #ffffff 55%)` }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.2px] uppercase text-white"
                style={{ background: brand.accentDark }}
              >
                {mission}
              </span>
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-[1.2px] uppercase"
                style={{ color: brand.accentDark }}
              >
                {story.tag || unitLabel}
              </span>
              {story.publishedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span className="text-[10px] sm:text-xs text-[#737373] tracking-wide uppercase">
                    {formatStoryDate(story.publishedAt)}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black text-balance leading-tight mb-3 group-hover:underline decoration-2 underline-offset-4">
              {story.title}
            </h2>
            {story.excerpt && (
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-5 line-clamp-3">
                {story.excerpt}
              </p>
            )}
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: brand.accentDark }}
            >
              Read story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm min-w-0 h-full transition-shadow hover:shadow-md"
      style={{ boxShadow: `0 0 0 1px ${brand.accent}12` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: brand.accent }}
        aria-hidden
      />
      <Link href={href} className="flex flex-col flex-1 min-w-0">
        <StoryCover
          src={cover}
          alt=""
          className="aspect-[16/10]"
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          mission={mission}
          logoSize="sm"
        />
        <div
          className="flex flex-col flex-1 p-5 sm:p-6 min-w-0"
          style={{ background: `linear-gradient(180deg, ${brand.accentSoft}aa 0%, #ffffff 40%)` }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-[1px] uppercase text-white"
              style={{ background: brand.accentDark }}
            >
              {mission}
            </span>
            <span
              className="text-[10px] font-semibold tracking-[1px] uppercase truncate max-w-[12rem]"
              style={{ color: brand.accentDark }}
            >
              {story.tag || unitLabel}
            </span>
          </div>
          {story.publishedAt && (
            <div className="text-[10px] text-[#737373] tracking-wide uppercase mb-2">
              {formatStoryDate(story.publishedAt)}
            </div>
          )}
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black text-balance leading-snug mb-2 group-hover:underline decoration-2 underline-offset-4">
            {story.title}
          </h2>
          {story.excerpt && (
            <p className="text-sm text-[#525252] leading-relaxed line-clamp-3 mb-4 flex-1">
              {story.excerpt}
            </p>
          )}
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto"
            style={{ color: brand.accentDark }}
          >
            Read story
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default async function UpdatesPage() {
  const stories = await listStories({ status: "published" });
  const [featured, ...rest] = stories;

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      {/* Hero */}
      <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home-hero.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 h-1 flex" aria-hidden>
          <span className="flex-1" style={{ background: missionAccent("Feed") }} />
          <span className="flex-1" style={{ background: missionAccent("Educate") }} />
          <span className="flex-1" style={{ background: missionAccent("Empower") }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-14">
          <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-300/90 mb-4 font-medium">
            UPDATES · STORIES
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tighter text-white text-balance max-w-3xl leading-[1.05] mb-4">
            What’s moving across the Group
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
            Partner-ready milestones from Feed · Educate · Empower — Foods, Leadership, Connect,
            Direct and the full Big Five network.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-2">
              <MissionChip label="Feed" icon={Leaf} color={missionAccent("Feed")} />
              <MissionChip label="Educate" icon={BookOpen} color={missionAccent("Educate")} />
              <MissionChip label="Empower" icon={Sparkles} color={missionAccent("Empower")} />
            </div>
            <div
              className="hidden sm:block w-px h-10 bg-white/20 shrink-0"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5" aria-label="Mission brands">
              {(
                [
                  { mission: "Feed" as MissionPillar, caption: "Feed" },
                  { mission: "Educate" as MissionPillar, caption: "Educate" },
                  { mission: "Empower" as MissionPillar, caption: "Empower" },
                ] as const
              ).map(({ mission: m, caption }) => {
                const logo = missionLogo(m);
                return (
                  <div
                    key={m}
                    className={`rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-md ring-1 ${
                      logo.plate === "light"
                        ? "bg-white/95 ring-black/10"
                        : "bg-black/50 ring-white/15 backdrop-blur-sm"
                    }`}
                    title={`${caption} · ${logo.alt}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 sm:h-9 w-auto max-w-[3.25rem] sm:max-w-[3.75rem] object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {stories.length === 0 && (
          <p className="text-sm text-[#525252] text-center py-16">
            New stories will appear here soon.
          </p>
        )}

        {featured && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#737373]">
                Featured
              </span>
              <span className="h-px flex-1 bg-black/10" />
            </div>
            <StoryCard story={featured} featured />
          </div>
        )}

        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#737373]">
                All stories
              </span>
              <span className="h-px flex-1 bg-black/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {rest.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </>
        )}

        {/* Newsletter + pillar strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{
                background: `linear-gradient(180deg, ${missionAccent("Feed")}, ${missionAccent("Educate")}, ${missionAccent("Empower")})`,
              }}
              aria-hidden
            />
            <div className="pl-2">
              <p className="text-base sm:text-lg font-semibold tracking-tight text-black">
                Get stories in your inbox
              </p>
              <p className="text-sm text-[#525252] mt-1 leading-relaxed">
                Subscribe to the Group newsletter for partner-ready briefs across the network.
              </p>
            </div>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold shrink-0 hover:bg-black/90"
            >
              Newsletter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-black/10 overflow-hidden bg-[#0a0a0a] text-white p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-[10px] tracking-[2px] text-emerald-400/90 mb-2 uppercase font-semibold">
              Explore pillars
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/foods", label: "Foods", c: pageAccent("foods") },
                { href: "/leadership", label: "Leadership", c: pageAccent("leadership") },
                { href: "/connect", label: "Connect", c: pageAccent("connect") },
                { href: "/direct", label: "Direct", c: pageAccent("direct") },
                { href: "/impact", label: "Impact", c: pageAccent("impact") },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="text-xs font-semibold rounded-full px-3 py-1.5 border border-white/15 hover:border-white/35 transition-colors"
                  style={{ color: p.c }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-[#737373] leading-relaxed pt-8">
          NSNP programme reference:{" "}
          <a
            href={NSNP.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-black"
          >
            Department of Basic Education — National School Nutrition Programme
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function pageAccent(key: "foods" | "leadership" | "connect" | "direct" | "impact"): string {
  const map = {
    foods: "#fcd34d",
    leadership: "#fde047",
    connect: "#67e8f9",
    direct: "#fdba74",
    impact: "#c4b5fd",
  };
  return map[key];
}
