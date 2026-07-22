import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import { createStory, updateStory } from "../../../../lib/stories/store";
import { draftStoryWithGrok } from "../../../../lib/stories/xai-story";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Draft (or rewrite) a public story with Grok.
 * body: { brief, tag?, storyId? }
 */
export async function POST(request: Request) {
  let body: {
    secret?: string;
    brief?: string;
    tag?: string;
    storyId?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const draft = await draftStoryWithGrok({
    brief: String(body.brief ?? ""),
    tag: body.tag,
  });

  if (!draft.ok) {
    return NextResponse.json(draft, { status: 400 });
  }

  const brief = String(body.brief ?? "").slice(0, 4000);
  let storyId = body.storyId?.trim();

  if (storyId) {
    const updated = await updateStory(storyId, {
      title: draft.title,
      excerpt: draft.excerpt,
      body: draft.body,
      tag: draft.tag,
      grokBrief: brief,
      grokModel: draft.model,
      status: "draft",
    });
    return NextResponse.json({
      ok: true,
      draft: {
        title: draft.title,
        excerpt: draft.excerpt,
        body: draft.body,
        tag: draft.tag,
        model: draft.model,
      },
      story: updated,
    });
  }

  const story = await createStory({
    title: draft.title,
    excerpt: draft.excerpt,
    body: draft.body,
    tag: draft.tag,
    grokBrief: brief,
  });
  const withModel = await updateStory(story.id, { grokModel: draft.model });

  return NextResponse.json({
    ok: true,
    draft: {
      title: draft.title,
      excerpt: draft.excerpt,
      body: draft.body,
      tag: draft.tag,
      model: draft.model,
    },
    story: withModel ?? story,
  });
}
