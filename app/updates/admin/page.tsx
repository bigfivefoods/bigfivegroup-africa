"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tag: string;
  status: "draft" | "published";
  coverImage?: string;
  videoUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  grokBrief?: string;
  grokModel?: string;
};

type ListResponse = {
  ok?: boolean;
  stories?: Story[];
  grok?: boolean;
  counts?: { total: number; published: number; drafts: number };
  error?: string;
};

const SECRET_KEY = "bfg_newsletter_admin_secret";

const TAG_OPTIONS = [
  "Group",
  "Foods",
  "NSNP",
  "Direct",
  "SANTACO",
  "Leadership",
  "Connect",
  "Foundation",
  "Impact",
  "Partnerships",
  "SPAR",
];

function authHeaders(secret: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };
}

export default function StoriesAdminPage() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [grok, setGrok] = useState(false);
  const [counts, setCounts] = useState({ total: 0, published: 0, drafts: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("Group");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [grokBrief, setGrokBrief] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadAll = useCallback(async (sec: string) => {
    const res = await fetch("/api/stories/admin", { headers: authHeaders(sec) });
    const data = (await res.json()) as ListResponse;
    if (!res.ok || !data.ok) throw new Error(data.error || "Failed to load stories");
    setStories(data.stories ?? []);
    setGrok(Boolean(data.grok));
    if (data.counts) setCounts(data.counts);
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SECRET_KEY);
      if (saved) {
        setSecret(saved);
        void (async () => {
          try {
            await loadAll(saved);
            setUnlocked(true);
          } catch {
            sessionStorage.removeItem(SECRET_KEY);
          }
        })();
      }
    } catch {
      /* ignore */
    }
  }, [loadAll]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setUnlockError(null);
    setBusy("unlock");
    try {
      await loadAll(secret.trim());
      sessionStorage.setItem(SECRET_KEY, secret.trim());
      setUnlocked(true);
    } catch (err) {
      setUnlockError(err instanceof Error ? err.message : "Unlock failed");
    } finally {
      setBusy(null);
    }
  }

  function selectStory(s: Story) {
    setActiveId(s.id);
    setTitle(s.title);
    setExcerpt(s.excerpt);
    setBody(s.body);
    setTag(s.tag);
    setStatus(s.status);
    setCoverImage(s.coverImage ?? "");
    setVideoUrl(s.videoUrl ?? "");
    setSlug(s.slug);
    setGrokBrief(s.grokBrief ?? "");
    setPreviewHtml("");
    setMessage(null);
    void loadPreview(s.id);
  }

  async function loadPreview(id: string) {
    try {
      const res = await fetch(`/api/stories/admin/${id}`, {
        headers: authHeaders(secret),
      });
      const data = (await res.json()) as { previewHtml?: string };
      if (data.previewHtml) setPreviewHtml(data.previewHtml);
    } catch {
      /* ignore */
    }
  }

  async function createDraft() {
    setBusy("create");
    setMessage(null);
    try {
      const res = await fetch("/api/stories/admin", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({ title: "Untitled story", body: "", tag: "Group" }),
      });
      const data = (await res.json()) as { ok?: boolean; story?: Story; error?: string };
      if (!res.ok || !data.ok || !data.story) throw new Error(data.error || "Create failed");
      await loadAll(secret);
      selectStory(data.story);
      setMessage("New draft created.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(null);
    }
  }

  async function saveDraft(nextStatus?: "draft" | "published") {
    if (!activeId) return;
    setBusy("save");
    setMessage(null);
    const st = nextStatus ?? status;
    try {
      const res = await fetch(`/api/stories/admin/${activeId}`, {
        method: "PATCH",
        headers: authHeaders(secret),
        body: JSON.stringify({
          title,
          excerpt,
          body,
          tag,
          status: st,
          coverImage,
          videoUrl,
          slug: slug || undefined,
          grokBrief,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        story?: Story;
        previewHtml?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      if (data.story) {
        setStatus(data.story.status);
        setSlug(data.story.slug);
      }
      if (data.previewHtml) setPreviewHtml(data.previewHtml);
      await loadAll(secret);
      setMessage(
        st === "published" ? "Published on /updates." : "Draft saved."
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function draftWithGrok() {
    setBusy("grok");
    setMessage(null);
    try {
      const res = await fetch("/api/stories/admin/compose", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({
          brief:
            grokBrief ||
            body ||
            "Write a short public Group update on Feed · Educate · Empower.",
          tag,
          storyId: activeId || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        draft?: { title: string; excerpt: string; body: string; tag: string; model: string };
        story?: Story;
      };
      if (!res.ok || !data.ok || !data.draft) throw new Error(data.error || "Grok draft failed");
      setTitle(data.draft.title);
      setExcerpt(data.draft.excerpt);
      setBody(data.draft.body);
      setTag(data.draft.tag);
      setStatus("draft");
      if (data.story) {
        setActiveId(data.story.id);
        setSlug(data.story.slug);
        await loadPreview(data.story.id);
      }
      await loadAll(secret);
      setMessage(
        `Grok drafted this story${data.draft.model ? ` (${data.draft.model})` : ""}. Review, then publish.`
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Grok failed");
    } finally {
      setBusy(null);
    }
  }

  async function removeStory(id: string) {
    if (!confirm("Delete this story permanently?")) return;
    setBusy("delete");
    try {
      const res = await fetch(`/api/stories/admin/${id}`, {
        method: "DELETE",
        headers: authHeaders(secret),
      });
      if (!res.ok) throw new Error("Delete failed");
      if (activeId === id) {
        setActiveId(null);
        setTitle("");
        setExcerpt("");
        setBody("");
        setPreviewHtml("");
        setSlug("");
      }
      await loadAll(secret);
      setMessage("Deleted.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  }

  if (!unlocked) {
    return (
      <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#fafafa] flex items-center">
        <div className="w-full max-w-md mx-auto px-4 py-14">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-black mb-2">
              Updates admin
            </h1>
            <p className="text-sm text-[#525252] leading-relaxed mb-5">
              Enter your{" "}
              <code className="text-xs bg-black/5 px-1 rounded">NEWSLETTER_ADMIN_SECRET</code>{" "}
              to write and publish Stories on /updates (same secret as newsletter admin).
            </p>
            <form onSubmit={unlock} className="space-y-3">
              <input
                type="password"
                autoComplete="current-password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Admin secret"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                required
              />
              {unlockError && (
                <p className="text-sm text-rose-700" role="alert">
                  {unlockError}
                </p>
              )}
              <button
                type="submit"
                disabled={busy === "unlock"}
                className="w-full premium-button inline-flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 text-sm font-semibold disabled:opacity-60"
              >
                {busy === "unlock" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Unlock
              </button>
            </form>
            <Link
              href="/updates"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-black"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Public updates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const active = stories.find((s) => s.id === activeId);

  return (
    <div className="page-shell bg-[#fafafa] min-h-[calc(100dvh-var(--navbar-height))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[2px] text-emerald-800 font-semibold mb-1">
              ADMIN · UPDATES · STORIES · GROK
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black">
              Write &amp; publish stories
            </h1>
            <p className="text-sm text-[#525252] mt-1">
              Draft with Grok, edit on-site, publish to the public /updates hub.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void createDraft()}
              disabled={!!busy}
              className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-4 py-2 text-xs font-semibold disabled:opacity-60"
            >
              <Plus className="w-3.5 h-3.5" />
              New draft
            </button>
            <Link
              href="/updates"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View hub
            </Link>
            <Link
              href="/newsletter/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#525252]"
            >
              Newsletter admin
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {[
            { l: "Total", v: counts.total },
            { l: "Published", v: counts.published },
            { l: "Drafts", v: counts.drafts },
            { l: "Grok", v: grok ? "Ready" : "No XAI_API_KEY" },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-black/10 bg-white px-3 py-2.5 min-w-0"
            >
              <div className="text-[10px] uppercase tracking-wide text-[#737373]">{x.l}</div>
              <div className="text-sm font-semibold text-black truncate">{x.v}</div>
            </div>
          ))}
        </div>

        {message && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-950">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 rounded-2xl border border-black/10 bg-white p-3 sm:p-4 min-w-0">
            <div className="text-xs font-semibold text-[#737373] mb-3">Stories</div>
            <ul className="space-y-1.5 max-h-[32rem] overflow-y-auto">
              {stories.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => selectStory(s)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 border transition-colors ${
                      activeId === s.id
                        ? "border-emerald-300 bg-emerald-50/60"
                        : "border-transparent hover:bg-black/[0.03]"
                    }`}
                  >
                    <div className="text-sm font-semibold text-black truncate">{s.title}</div>
                    <div className="text-[10px] text-[#737373] mt-0.5 flex justify-between gap-2">
                      <span className="uppercase">{s.status}</span>
                      <span className="truncate">{s.tag}</span>
                    </div>
                  </button>
                </li>
              ))}
              {!stories.length && (
                <li className="text-xs text-[#737373] px-2 py-4">No stories yet.</li>
              )}
            </ul>
          </aside>

          <section className="lg:col-span-5 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 min-w-0 space-y-4">
            {!activeId ? (
              <p className="text-sm text-[#525252]">
                Create a new draft or select one from the list. Use Grok to generate from a brief.
              </p>
            ) : (
              <>
                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Grok brief (what should this story cover?)
                  </label>
                  <textarea
                    value={grokBrief}
                    onChange={(e) => setGrokBrief(e.target.value)}
                    rows={3}
                    placeholder="e.g. Partner update on NSNP 5kg SKUs, SANTACO logistics, and SPAR pathway — dignified tone, no overclaims."
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => void draftWithGrok()}
                    disabled={!!busy || !grok}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet-700 text-white px-4 py-2 text-xs font-semibold disabled:opacity-50"
                    title={!grok ? "Set XAI_API_KEY in Vercel" : "Draft with Grok"}
                  >
                    {busy === "grok" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    Draft with Grok
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Excerpt (list card)
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#737373] mb-1.5 block">Tag</label>
                    <input
                      list="story-tags"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                    />
                    <datalist id="story-tags">
                      {TAG_OPTIONS.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value === "published" ? "published" : "draft")
                      }
                      className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    URL slug
                  </label>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-mono text-xs"
                  />
                  {active?.status === "published" && (
                    <Link
                      href={`/updates/${slug || active.slug}`}
                      target="_blank"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:underline"
                    >
                      /updates/{slug || active.slug}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Cover image path or URL (optional)
                  </label>
                  <input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/foods-hero.jpg"
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Video URL (YouTube / Vimeo, optional)
                  </label>
                  <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=…"
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Body (markdown: ## headings, **bold**, - bullets, [links](/path))
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={14}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-mono leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => void saveDraft("draft")}
                    disabled={!!busy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold disabled:opacity-60"
                  >
                    {busy === "save" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    Save draft
                  </button>
                  <button
                    type="button"
                    onClick={() => void saveDraft("published")}
                    disabled={!!busy}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 text-white px-4 py-2 text-xs font-semibold disabled:opacity-60"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => void removeStory(activeId)}
                    disabled={!!busy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 text-rose-800 px-4 py-2 text-xs font-semibold disabled:opacity-60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreview((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold lg:hidden"
                  >
                    {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    Preview
                  </button>
                </div>
              </>
            )}
          </section>

          <section
            className={`lg:col-span-4 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 min-w-0 ${
              showPreview ? "" : "hidden lg:block"
            }`}
          >
            <div className="text-xs font-semibold text-[#737373] mb-3">Live preview</div>
            {!activeId ? (
              <p className="text-sm text-[#525252]">Select a story to preview.</p>
            ) : (
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-wide text-emerald-800 font-semibold">
                  {tag}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-black text-balance">
                  {title || "Untitled"}
                </h2>
                {excerpt && (
                  <p className="text-sm text-[#525252] leading-relaxed">{excerpt}</p>
                )}
                <div
                  className="border-t border-black/10 pt-4 story-preview"
                  dangerouslySetInnerHTML={{
                    __html:
                      previewHtml ||
                      `<p class="text-sm text-[#737373]">Save to refresh formatted preview, or edit markdown above.</p>`,
                  }}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
