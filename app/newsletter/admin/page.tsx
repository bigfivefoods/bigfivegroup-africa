"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Download,
  Loader2,
  Lock,
  Mail,
  Plus,
  Save,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";

type Campaign = {
  id: string;
  subject: string;
  preheader: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  sentCount?: number;
  failCount?: number;
  grokBrief?: string;
  grokModel?: string;
  lastError?: string;
};

type Stats = {
  backend: string;
  resend: boolean;
  grok: boolean;
  counts: {
    total: number;
    active: number;
    pending: number;
    unsubscribed: number;
    campaigns: number;
    drafts: number;
    sent: number;
  };
};

const SECRET_KEY = "bfg_newsletter_admin_secret";

function authHeaders(secret: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };
}

export default function NewsletterAdminPage() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [body, setBody] = useState("");
  const [grokBrief, setGrokBrief] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [confirmSend, setConfirmSend] = useState(false);

  const loadAll = useCallback(async (sec: string) => {
    const [sRes, cRes] = await Promise.all([
      fetch("/api/newsletter/admin/stats", { headers: authHeaders(sec) }),
      fetch("/api/newsletter/admin/campaigns", { headers: authHeaders(sec) }),
    ]);
    const sData = (await sRes.json()) as Stats & { ok?: boolean; error?: string };
    const cData = (await cRes.json()) as {
      ok?: boolean;
      campaigns?: Campaign[];
      error?: string;
    };
    if (!sRes.ok || !sData.ok) throw new Error(sData.error || "Stats failed");
    if (!cRes.ok || !cData.ok) throw new Error(cData.error || "Campaigns failed");
    setStats(sData);
    setCampaigns(cData.campaigns ?? []);
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

  function selectCampaign(c: Campaign) {
    setActiveId(c.id);
    setSubject(c.subject);
    setPreheader(c.preheader);
    setBody(c.body);
    setGrokBrief(c.grokBrief ?? "");
    setPreviewHtml("");
    setMessage(null);
    setConfirmSend(false);
    void loadPreview(c.id);
  }

  async function loadPreview(id: string) {
    try {
      const res = await fetch(`/api/newsletter/admin/campaigns/${id}`, {
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
      const res = await fetch("/api/newsletter/admin/campaigns", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({ subject: "Untitled draft", body: "" }),
      });
      const data = (await res.json()) as { ok?: boolean; campaign?: Campaign; error?: string };
      if (!res.ok || !data.ok || !data.campaign) throw new Error(data.error || "Create failed");
      await loadAll(secret);
      selectCampaign(data.campaign);
      setMessage("New draft created.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(null);
    }
  }

  async function saveDraft() {
    if (!activeId) return;
    setBusy("save");
    setMessage(null);
    try {
      const res = await fetch(`/api/newsletter/admin/campaigns/${activeId}`, {
        method: "PATCH",
        headers: authHeaders(secret),
        body: JSON.stringify({ subject, preheader, body, grokBrief }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        campaign?: Campaign;
        previewHtml?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      if (data.previewHtml) setPreviewHtml(data.previewHtml);
      await loadAll(secret);
      setMessage("Draft saved.");
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
      const res = await fetch("/api/newsletter/admin/compose", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({
          brief: grokBrief || body || "Write a short Group update on Feed · Educate · Empower.",
          campaignId: activeId || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        draft?: { subject: string; preheader: string; body: string; model: string };
        campaign?: Campaign;
      };
      if (!res.ok || !data.ok || !data.draft) throw new Error(data.error || "Grok draft failed");
      setSubject(data.draft.subject);
      setPreheader(data.draft.preheader);
      setBody(data.draft.body);
      if (data.campaign) {
        setActiveId(data.campaign.id);
        await loadPreview(data.campaign.id);
      }
      await loadAll(secret);
      setMessage(`Grok drafted this issue${data.draft.model ? ` (${data.draft.model})` : ""}. Review before sending.`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Grok failed");
    } finally {
      setBusy(null);
    }
  }

  async function sendTest() {
    if (!activeId || !testEmail.trim()) {
      setMessage("Enter a test email address.");
      return;
    }
    await saveDraft();
    setBusy("test");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter/admin/send", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({ campaignId: activeId, testEmail: testEmail.trim() }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        sent?: number;
        failed?: number;
      };
      if (!res.ok || !data.ok) throw new Error(data.error || "Test send failed");
      setMessage(`Test sent to ${testEmail} (ok: ${data.sent}, fail: ${data.failed}).`);
      await loadAll(secret);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Test send failed");
    } finally {
      setBusy(null);
    }
  }

  async function sendBroadcast() {
    if (!activeId || !confirmSend) return;
    await saveDraft();
    setBusy("broadcast");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter/admin/send", {
        method: "POST",
        headers: authHeaders(secret),
        body: JSON.stringify({ campaignId: activeId, confirmBroadcast: true }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        sent?: number;
        failed?: number;
      };
      if (!res.ok || !data.ok) throw new Error(data.error || "Broadcast failed");
      setMessage(`Broadcast complete — sent ${data.sent}, failed ${data.failed}.`);
      setConfirmSend(false);
      await loadAll(secret);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Broadcast failed");
    } finally {
      setBusy(null);
    }
  }

  async function removeCampaign(id: string) {
    if (!confirm("Delete this draft permanently?")) return;
    setBusy("delete");
    try {
      const res = await fetch(`/api/newsletter/admin/campaigns/${id}`, {
        method: "DELETE",
        headers: authHeaders(secret),
      });
      if (!res.ok) throw new Error("Delete failed");
      if (activeId === id) {
        setActiveId(null);
        setSubject("");
        setPreheader("");
        setBody("");
        setPreviewHtml("");
      }
      await loadAll(secret);
      setMessage("Deleted.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  }

  function exportCsv() {
    window.open(
      `/api/newsletter/admin?format=csv&secret=${encodeURIComponent(secret)}`,
      "_blank"
    );
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
              Newsletter admin
            </h1>
            <p className="text-sm text-[#525252] leading-relaxed mb-5">
              Enter your <code className="text-xs bg-black/5 px-1 rounded">NEWSLETTER_ADMIN_SECRET</code>{" "}
              to compose and send campaigns (Grok drafts · Resend delivery).
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
              href="/newsletter"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-black"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Public newsletter page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell bg-[#fafafa] min-h-[calc(100dvh-var(--navbar-height))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[2px] text-emerald-800 font-semibold mb-1">
              ADMIN · NEWSLETTER COMPOSER · GROK
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black">
              Write &amp; publish
            </h1>
            <p className="text-sm text-[#525252] mt-1">
              Draft with Grok, edit on-site, send via Resend to active subscribers.
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
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
            {[
              { l: "Active", v: stats.counts.active },
              { l: "Pending", v: stats.counts.pending },
              { l: "Unsub", v: stats.counts.unsubscribed },
              { l: "Drafts", v: stats.counts.drafts },
              { l: "Sent issues", v: stats.counts.sent },
              {
                l: "Stack",
                v: `${stats.resend ? "Resend" : "No Resend"} · ${stats.grok ? "Grok" : "No Grok"} · ${stats.backend}`,
              },
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
        )}

        {message && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-950">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Campaign list */}
          <aside className="lg:col-span-3 rounded-2xl border border-black/10 bg-white p-3 sm:p-4 min-w-0">
            <div className="text-xs font-semibold text-[#737373] mb-3">Campaigns</div>
            <ul className="space-y-1.5 max-h-[28rem] overflow-y-auto">
              {campaigns.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => selectCampaign(c)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 border transition-colors ${
                      activeId === c.id
                        ? "border-emerald-300 bg-emerald-50/60"
                        : "border-transparent hover:bg-black/[0.03]"
                    }`}
                  >
                    <div className="text-sm font-semibold text-black truncate">{c.subject}</div>
                    <div className="text-[10px] text-[#737373] mt-0.5 flex justify-between gap-2">
                      <span className="uppercase">{c.status}</span>
                      <span>{new Date(c.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                </li>
              ))}
              {!campaigns.length && (
                <li className="text-xs text-[#737373] px-2 py-4">No campaigns yet.</li>
              )}
            </ul>
          </aside>

          {/* Editor */}
          <section className="lg:col-span-5 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 min-w-0 space-y-4">
            {!activeId ? (
              <p className="text-sm text-[#525252]">
                Create a new draft or select one from the list. Use Grok to generate from a brief.
              </p>
            ) : (
              <>
                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Grok brief (what should this issue cover?)
                  </label>
                  <textarea
                    value={grokBrief}
                    onChange={(e) => setGrokBrief(e.target.value)}
                    rows={3}
                    placeholder="e.g. Update partners on NSNP pathway, SPAR partnership, and SANTACO containers — keep dignified, no overclaims."
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => void draftWithGrok()}
                    disabled={!!busy || Boolean(stats && !stats.grok)}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet-700 text-white px-4 py-2 text-xs font-semibold disabled:opacity-50"
                    title={!stats?.grok ? "Set XAI_API_KEY in Vercel" : "Draft with Grok"}
                  >
                    {busy === "grok" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    Draft with Grok
                  </button>
                  {!stats?.grok && (
                    <p className="text-[11px] text-amber-800 mt-1.5">
                      Add <code className="bg-black/5 px-1 rounded">XAI_API_KEY</code> in Vercel to
                      enable Grok.
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Preheader (inbox preview)
                  </label>
                  <input
                    value={preheader}
                    onChange={(e) => setPreheader(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#737373] mb-1.5 block">
                    Body (simple markdown: **bold**, lists, [links](url))
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={14}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-mono leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void saveDraft()}
                    disabled={!!busy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold disabled:opacity-60"
                  >
                    {busy === "save" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadPreview(activeId)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Refresh preview
                  </button>
                  <button
                    type="button"
                    onClick={() => void removeCampaign(activeId)}
                    disabled={!!busy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 text-rose-800 px-4 py-2 text-xs font-semibold disabled:opacity-60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>

                <div className="pt-4 border-t border-black/10 space-y-3">
                  <div className="text-xs font-semibold text-[#737373]">Send</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="you@bigfivegroup.africa"
                      className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => void sendTest()}
                      disabled={!!busy || !stats?.resend}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-950 px-4 py-2 text-xs font-semibold disabled:opacity-50"
                    >
                      {busy === "test" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      Send test
                    </button>
                  </div>
                  <label className="flex items-start gap-2 text-xs text-[#525252] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmSend}
                      onChange={(e) => setConfirmSend(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      I confirm: send this issue to all{" "}
                      <strong className="text-black">{stats?.counts.active ?? 0} active</strong>{" "}
                      subscribers via Resend.
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => void sendBroadcast()}
                    disabled={!!busy || !confirmSend || !stats?.resend || !stats?.counts.active}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-black text-white px-5 py-2.5 text-xs font-semibold disabled:opacity-50"
                  >
                    {busy === "broadcast" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                    Publish to all active
                  </button>
                </div>
              </>
            )}
          </section>

          {/* Preview */}
          <section className="lg:col-span-4 rounded-2xl border border-black/10 bg-white overflow-hidden min-w-0">
            <div className="px-4 py-3 border-b border-black/10 text-xs font-semibold text-[#737373]">
              Email preview
            </div>
            <div className="bg-[#f4f4f5] p-3 sm:p-4 max-h-[40rem] overflow-auto">
              {previewHtml ? (
                <div
                  className="mx-auto max-w-full bg-white rounded-lg shadow-sm overflow-hidden text-[13px]"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              ) : (
                <p className="text-xs text-[#737373] text-center py-12">
                  Save or select a draft to preview.
                </p>
              )}
            </div>
          </section>
        </div>

        <p className="mt-8 text-[11px] text-[#737373] leading-relaxed max-w-2xl">
          Unlock secret is stored only in this browser session. Add{" "}
          <code className="bg-black/5 px-1 rounded">XAI_API_KEY</code> for Grok drafting. Campaigns
          store in the same backend as subscribers ({stats?.backend ?? "…"}).
        </p>
      </div>
    </div>
  );
}
