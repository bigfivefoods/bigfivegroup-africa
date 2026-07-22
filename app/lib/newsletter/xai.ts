/**
 * Grok (xAI / SpaceXAI) — OpenAI-compatible chat for newsletter drafting.
 * Server-only. Env: XAI_API_KEY
 */

import "server-only";

const XAI_BASE = "https://api.x.ai/v1";
const DEFAULT_MODEL = process.env.XAI_MODEL?.trim() || "grok-4.5";

export type GrokDraftResult =
  | { ok: true; subject: string; preheader: string; body: string; model: string }
  | { ok: false; error: string };

export function xaiConfigured(): boolean {
  return Boolean(process.env.XAI_API_KEY?.trim());
}

/**
 * Draft a Big Five Group Africa newsletter from a brief.
 * Returns subject, preheader, and body as plain text with simple markdown.
 */
export async function draftNewsletterWithGrok(opts: {
  brief: string;
  tone?: string;
  topics?: string[];
}): Promise<GrokDraftResult> {
  const key = process.env.XAI_API_KEY?.trim();
  if (!key) {
    return {
      ok: false,
      error: "XAI_API_KEY is not set. Add it in Vercel to enable Grok drafting.",
    };
  }

  const brief = opts.brief.trim().slice(0, 4000);
  if (brief.length < 8) {
    return { ok: false, error: "Please provide a longer brief for Grok." };
  }

  const system = `You are the editorial voice of Big Five Group Africa — a proudly African enterprise (Feed · Educate · Empower).
Write occasional partner/public newsletters: clear, dignified, non-hype, POPIA-aware (no pressure language).
Never invent closed contracts, audited financials, or government awards. Prefer "pathway", "plan scale", "programme-reported" where claims are forward-looking.
Output STRICT JSON only (no markdown fences) with keys:
  "subject" (string, max ~70 chars),
  "preheader" (string, max ~100 chars),
  "body" (string: plain text with simple markdown: **bold**, paragraphs separated by blank lines, optional - bullet lists, optional [label](https://url) links).
Include a short sign-off from Big Five Group Africa. Do not invent unsubscribe links (we append those).`;

  const user = [
    `Brief:\n${brief}`,
    opts.tone ? `Tone: ${opts.tone}` : "Tone: professional, warm, African-rooted",
    opts.topics?.length ? `Emphasise topics: ${opts.topics.join(", ")}` : "",
    "Write one complete newsletter draft.",
  ]
    .filter(Boolean)
    .join("\n\n");

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
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[newsletter/xai]", res.status, errText.slice(0, 400));
      return {
        ok: false,
        error: `Grok request failed (${res.status}). Check XAI_API_KEY and credits.`,
      };
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      model?: string;
    };
    const raw = data.choices?.[0]?.message?.content?.trim() || "";
    if (!raw) return { ok: false, error: "Grok returned an empty draft." };

    const parsed = parseDraftJson(raw);
    if (!parsed) {
      // Fallback: treat whole response as body
      return {
        ok: true,
        subject: "Big Five Group Africa update",
        preheader: "News from the Group",
        body: raw.replace(/^```[\w]*\n?|\n?```$/g, "").trim(),
        model: data.model || DEFAULT_MODEL,
      };
    }

    return {
      ok: true,
      subject: parsed.subject.slice(0, 120),
      preheader: parsed.preheader.slice(0, 160),
      body: parsed.body.slice(0, 50_000),
      model: data.model || DEFAULT_MODEL,
    };
  } catch (err) {
    console.warn("[newsletter/xai]", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Grok network error",
    };
  }
}

function parseDraftJson(raw: string): { subject: string; preheader: string; body: string } | null {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();
  try {
    const obj = JSON.parse(text) as Record<string, unknown>;
    const subject = String(obj.subject ?? "").trim();
    const preheader = String(obj.preheader ?? obj.preview ?? "").trim();
    const body = String(obj.body ?? obj.content ?? "").trim();
    if (!subject || !body) return null;
    return { subject, preheader: preheader || subject, body };
  } catch {
    return null;
  }
}
