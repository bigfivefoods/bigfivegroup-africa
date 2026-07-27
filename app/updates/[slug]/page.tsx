import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE_OG_IMAGE } from "../../lib/site";
import { getStoryBySlug, listStories } from "../../lib/stories/store";
import { markdownToWebHtml } from "../../lib/stories/markdown-web";
import { formatStoryDate } from "../../lib/stories/format";
import {
  resolveStoryTheme,
  storyCoverImage,
} from "../../lib/stories/theme";
import StoryCover from "../../components/StoryCover";
import type { Story } from "../../lib/stories/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function youtubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story || story.status !== "published") {
    return { title: "Update not found" };
  }
  return {
    title: story.title,
    description: story.excerpt || story.title,
    openGraph: {
      title: `${story.title} | Big Five Group Africa`,
      description: story.excerpt || story.title,
      url: `/updates/${story.slug}`,
      // Always Group logo share card — not story/pillar covers
      images: [SITE_OG_IMAGE],
      type: "article",
      publishedTime: story.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      images: [SITE_OG_IMAGE.url],
    },
    alternates: { canonical: `/updates/${story.slug}` },
  };
}

function RelatedCard({ story }: { story: Story }) {
  const theme = resolveStoryTheme(story.tag, `${story.title} ${story.slug}`);
  const cover = storyCoverImage(story.coverImage, theme);
  return (
    <Link
      href={`/updates/${story.slug}`}
      className="group flex flex-col sm:flex-row gap-0 sm:gap-0 rounded-xl overflow-hidden border border-black/10 bg-white hover:shadow-md transition-shadow min-w-0"
      style={{ boxShadow: `0 0 0 1px ${theme.brand.accent}10` }}
    >
      <StoryCover
        src={cover}
        alt=""
        className="aspect-[16/10] sm:aspect-auto sm:w-36 sm:shrink-0"
        sizes="(max-width: 640px) 100vw, 144px"
        imageClassName="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
      />
      <div className="p-4 sm:p-5 min-w-0 flex-1" style={{ background: theme.brand.accentSoft }}>
        <div
          className="text-[10px] uppercase tracking-wide font-semibold mb-1"
          style={{ color: theme.brand.accentDark }}
        >
          {story.tag || theme.unitLabel}
        </div>
        <div className="text-sm sm:text-base font-semibold text-black leading-snug group-hover:underline">
          {story.title}
        </div>
        {story.excerpt && (
          <p className="text-xs sm:text-sm text-[#525252] mt-1 line-clamp-2">{story.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story || story.status !== "published") notFound();

  const theme = resolveStoryTheme(story.tag, `${story.title} ${story.slug}`);
  const { brand, mission, unitLabel, unitHref } = theme;
  const cover = storyCoverImage(story.coverImage, theme);
  const html = markdownToWebHtml(story.body);
  const embed = youtubeEmbed(story.videoUrl);
  const others = (await listStories({ status: "published" }))
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <article>
        {/* Editorial hero with cover */}
        <header className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url('${cover.startsWith("http") ? cover : cover}')` }}
            aria-hidden
          />
          <div className={`absolute inset-0 ${brand.overlay}`} aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25"
            aria-hidden
          />
          <div
            className="absolute top-0 left-0 right-0 h-1.5 z-10"
            style={{ background: brand.accent }}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pb-14">
            <Link
              href="/updates"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All updates
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[1.2px] uppercase text-black"
                style={{ background: brand.accentLight }}
              >
                {mission}
              </span>
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-[1.5px] uppercase"
                style={{ color: brand.accentLight }}
              >
                {story.tag || unitLabel}
              </span>
              {story.publishedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/35" />
                  <span className="text-[10px] sm:text-xs text-white/55 tracking-wide uppercase">
                    {formatStoryDate(story.publishedAt, "long")}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tighter text-white text-balance leading-[1.08]">
              {story.title}
            </h1>
            {story.excerpt && (
              <p className="mt-4 text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
                {story.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Soft brand band */}
        <div
          className="border-b border-black/5"
          style={{ background: brand.accentSoft }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-2">
            <Link
              href={unitHref}
              className="text-xs sm:text-sm font-semibold hover:underline"
              style={{ color: brand.accentDark }}
            >
              Explore {unitLabel}
              <ArrowRight className="inline w-3.5 h-3.5 ml-1 -mt-0.5" />
            </Link>
            <span className="text-[10px] tracking-[1.5px] uppercase text-[#737373]">
              {brand.eyebrow}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {embed && (
            <div className="mb-8 aspect-video rounded-2xl overflow-hidden border border-black/10 bg-black shadow-sm">
              <iframe
                src={embed}
                title={story.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Accent rule before body */}
          <div
            className="w-12 h-1 rounded-full mb-8"
            style={{ background: brand.accent }}
            aria-hidden
          />

          <div
            className="story-body min-w-0 prose-story"
            style={{ ["--story-accent" as string]: brand.accentDark } as CSSProperties}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Link
              href="/updates"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              More updates
            </Link>
            <div className="flex flex-wrap gap-3">
              <Link
                href={unitHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                style={{ color: brand.accentDark }}
              >
                {unitLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
              >
                Newsletter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-black/10 bg-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold tracking-tight text-black">
                More from the Group
              </h2>
              <span className="h-px flex-1 bg-black/10" />
            </div>
            <ul className="space-y-4">
              {others.map((s) => (
                <li key={s.id}>
                  <RelatedCard story={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
