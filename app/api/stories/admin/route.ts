import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../lib/newsletter/auth";
import { createStory, listStories } from "../../../lib/stories/store";
import { xaiConfigured } from "../../../lib/stories/xai-story";

export const runtime = "nodejs";

/**
 * List all stories (admin) or create a draft.
 * Auth: same NEWSLETTER_ADMIN_SECRET as newsletter composer.
 */
export async function GET(request: Request) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const stories = await listStories({ status: "all" });
  return NextResponse.json({
    ok: true,
    stories,
    grok: xaiConfigured(),
    counts: {
      total: stories.length,
      published: stories.filter((s) => s.status === "published").length,
      drafts: stories.filter((s) => s.status === "draft").length,
    },
  });
}

export async function POST(request: Request) {
  let body: {
    secret?: string;
    title?: string;
    excerpt?: string;
    body?: string;
    tag?: string;
    coverImage?: string;
    videoUrl?: string;
    grokBrief?: string;
  } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    /* empty create */
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const story = await createStory({
    title: body.title,
    excerpt: body.excerpt,
    body: body.body,
    tag: body.tag,
    coverImage: body.coverImage,
    videoUrl: body.videoUrl,
    grokBrief: body.grokBrief,
  });

  return NextResponse.json({ ok: true, story });
}
