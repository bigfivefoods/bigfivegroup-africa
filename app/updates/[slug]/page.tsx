import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE_OG_IMAGE } from "../../lib/site";
import { getStoryBySlug, listStories } from "../../lib/stories/store";
import { markdownToWebHtml } from "../../lib/stories/markdown-web";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

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
  const ogImage = story.coverImage
    ? { url: story.coverImage.startsWith("http") ? story.coverImage : story.coverImage }
    : SITE_OG_IMAGE;
  return {
    title: story.title,
    description: story.excerpt || story.title,
    openGraph: {
      title: `${story.title} | Big Five Group Africa`,
      description: story.excerpt || story.title,
      url: `/updates/${story.slug}`,
      images: [ogImage],
      type: "article",
      publishedTime: story.publishedAt,
    },
    alternates: { canonical: `/updates/${story.slug}` },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story || story.status !== "published") notFound();

  const html = markdownToWebHtml(story.body);
  const embed = youtubeEmbed(story.videoUrl);
  const others = (await listStories({ status: "published" }))
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <article>
        <header className="bg-[#0a0a0a] text-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/updates"
              className="inline-flex items-center gap-1.5 text-xs text-white/55 hover:text-white mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All updates
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs tracking-[1.5px] uppercase text-white/50 mb-4">
              {story.publishedAt && <span>{formatDate(story.publishedAt)}</span>}
              {story.publishedAt && <span className="w-1 h-1 rounded-full bg-white/30" />}
              <span className="text-emerald-400 font-semibold">{story.tag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tighter text-balance leading-tight">
              {story.title}
            </h1>
            {story.excerpt && (
              <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl">
                {story.excerpt}
              </p>
            )}
          </div>
        </header>

        {story.coverImage && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10 bg-black/5 shadow-sm">
              {story.coverImage.startsWith("http") ? (
                // Remote covers from admin may use any host (not in next/image remotePatterns).
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={story.coverImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={story.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              )}
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {embed && (
            <div className="mb-8 aspect-video rounded-2xl overflow-hidden border border-black/10 bg-black">
              <iframe
                src={embed}
                title={story.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div
            className="story-body min-w-0"
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
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline"
            >
              Subscribe to newsletter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-black/10 bg-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold tracking-tight text-black mb-6">
              More from the Group
            </h2>
            <ul className="space-y-4">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/updates/${s.slug}`}
                    className="block rounded-xl border border-black/10 p-4 sm:p-5 hover:border-emerald-300/60 transition-colors"
                  >
                    <div className="text-[10px] uppercase tracking-wide text-emerald-800 font-semibold mb-1">
                      {s.tag}
                    </div>
                    <div className="text-base font-semibold text-black">{s.title}</div>
                    {s.excerpt && (
                      <p className="text-sm text-[#525252] mt-1 line-clamp-2">{s.excerpt}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
