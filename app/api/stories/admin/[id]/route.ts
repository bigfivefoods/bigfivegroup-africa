import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import {
  deleteStory,
  getStoryById,
  updateStory,
} from "../../../../lib/stories/store";
import { markdownToWebHtml } from "../../../../lib/stories/markdown-web";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const story = await getStoryById(id);
  if (!story) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });

  return NextResponse.json({
    ok: true,
    story,
    previewHtml: markdownToWebHtml(story.body || ""),
  });
}

export async function PATCH(request: Request, ctx: Ctx) {
  let body: {
    secret?: string;
    title?: string;
    excerpt?: string;
    body?: string;
    tag?: string;
    status?: "draft" | "published";
    coverImage?: string;
    videoUrl?: string;
    slug?: string;
    grokBrief?: string;
    grokModel?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const existing = await getStoryById(id);
  if (!existing) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });

  const patch: Parameters<typeof updateStory>[1] = {};
  if (body.title !== undefined) patch.title = String(body.title).slice(0, 200);
  if (body.excerpt !== undefined) patch.excerpt = String(body.excerpt).slice(0, 500);
  if (body.body !== undefined) patch.body = String(body.body).slice(0, 100_000);
  if (body.tag !== undefined) patch.tag = String(body.tag).slice(0, 80);
  if (body.status === "draft" || body.status === "published") patch.status = body.status;
  if (body.coverImage !== undefined) {
    patch.coverImage = body.coverImage.trim() || undefined;
  }
  if (body.videoUrl !== undefined) {
    patch.videoUrl = body.videoUrl.trim() || undefined;
  }
  if (body.slug !== undefined) patch.slug = body.slug;
  if (body.grokBrief !== undefined) patch.grokBrief = String(body.grokBrief).slice(0, 4000);
  if (body.grokModel !== undefined) patch.grokModel = body.grokModel;

  const story = await updateStory(id, patch);
  return NextResponse.json({
    ok: true,
    story,
    previewHtml: story ? markdownToWebHtml(story.body || "") : undefined,
  });
}

export async function DELETE(request: Request, ctx: Ctx) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const ok = await deleteStory(id);
  if (!ok) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
