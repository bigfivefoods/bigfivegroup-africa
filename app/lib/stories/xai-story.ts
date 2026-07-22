/**
 * Grok draft for public Updates / Stories posts.
 */

import "server-only";

const XAI_BASE = "https://api.x.ai/v1";
const DEFAULT_MODEL = process.env.XAI_MODEL?.trim() || "grok-4.5";

export type StoryDraftResult =
  | {
      ok: true;
      title: string;
      excerpt: string;
      body: string;
      tag: string;
      model: string;
    }
  | { ok: false; error: string };

export function xaiConfigured(): boolean {
  return Boolean(process.env.XAI_API_KEY?.trim());
}

export async function draftStoryWithGrok(opts: {
  brief: string;
  tag?: string;
}): Promise<StoryDraftResult> {
  const key = process.env.XAI_API_KEY?.trim();
  if (!key) {
    return { ok: false, error: "XAI_API_KEY is not set. Add it in Vercel for Grok drafting." };
  }
  const brief = opts.brief.trim().slice(0, 4000);
  if (brief.length < 8) {
    return { ok: false, error: "Please provide a longer brief." };
  }

  const system = `You are the editorial voice of Big Five Group Africa — proudly African (Feed · Educate · Empower).
Write a short public website update/story partners and citizens can read.
Tone: clear, dignified, non-hype. Never invent closed awards, audited financials, or multi-country contracts.
Use "pathway", "plan scale", "programme-reported" for forward-looking claims.
Output STRICT JSON only (no markdown fences) with keys:
  "title" (string, max ~90 chars),
  "excerpt" (string, max ~200 chars, plain),
  "tag" (short label e.g. "Foods · NSNP"),
  "body" (string: markdown with ## headings, paragraphs, optional - bullets, optional [label](/path) internal links).
End with 1–2 useful internal links to bigfivegroup.africa paths when relevant (/foods, /direct, /leadership, /impact, /connect).`;

  try {
    const res = await fetch(`${XAI_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.7,
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content: `Brief:\n${brief}\n\nPreferred tag: ${opts.tag || "Group"}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.warn("[stories/xai]", res.status, t.slice(0, 300));
      return { ok: false, error: `Grok failed (${res.status}). Check XAI_API_KEY.` };
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      model?: string;
    };
    const raw = data.choices?.[0]?.message?.content?.trim() || "";
    if (!raw) return { ok: false, error: "Empty Grok response." };

    let text = raw;
    const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) text = fence[1].trim();
    try {
      const obj = JSON.parse(text) as Record<string, unknown>;
      const title = String(obj.title ?? "").trim();
      const excerpt = String(obj.excerpt ?? "").trim();
      const body = String(obj.body ?? "").trim();
      const tag = String(obj.tag ?? opts.tag ?? "Group").trim();
      if (!title || !body) return { ok: false, error: "Grok JSON missing title/body." };
      return {
        ok: true,
        title: title.slice(0, 120),
        excerpt: excerpt.slice(0, 300) || title,
        body: body.slice(0, 100_000),
        tag: tag.slice(0, 80),
        model: data.model || DEFAULT_MODEL,
      };
    } catch {
      return {
        ok: true,
        title: "Group update",
        excerpt: brief.slice(0, 200),
        body: raw.replace(/^```[\w]*\n?|\n?```$/g, "").trim(),
        tag: opts.tag || "Group",
        model: data.model || DEFAULT_MODEL,
      };
    }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Grok network error",
    };
  }
}
