"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Check,
  Copy,
  Loader2,
  Mail,
  Trash2,
  UserPlus,
} from "lucide-react";

type OrgOption = { slug: string; name: string; organisation: string };

type ContactRow = {
  id: string;
  slug: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  invitedAt?: string;
};

export default function PartnerInviteAdmin({
  organisations,
  mode = "admin",
  lockedSlug,
  viewerEmail,
}: {
  organisations: OrgOption[];
  /** admin = Group hub (any org). org = locked to this workspace. */
  mode?: "admin" | "org";
  /** Required in org mode — invites only go to this slug. */
  lockedSlug?: string;
  /** Signed-in email — cannot revoke yourself. */
  viewerEmail?: string;
}) {
  const isOrgMode = mode === "org";
  const initialSlug = (lockedSlug || organisations[0]?.slug || "").toLowerCase();
  const [orgs] = useState<OrgOption[]>(organisations);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState(initialSlug);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sendInvite, setSendInvite] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [lastLoginUrl, setLastLoginUrl] = useState<string | null>(null);
  const [filterSlug, setFilterSlug] = useState(isOrgMode ? initialSlug : "");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const effectiveFilter = isOrgMode ? lockedSlug || initialSlug : filterSlug;
      const q = effectiveFilter ? `?slug=${encodeURIComponent(effectiveFilter)}` : "";
      const res = await fetch(`/api/partner/admin/contacts${q}`, {
        cache: "no-store",
        credentials: "same-origin",
      });
      const data = (await res.json()) as {
        ok?: boolean;
        contacts?: ContactRow[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setMessage({ tone: "err", text: data.error || "Could not load contacts." });
        return;
      }
      setContacts(data.contacts ?? []);
    } catch {
      setMessage({ tone: "err", text: "Network error loading contacts." });
    } finally {
      setLoading(false);
    }
  }, [filterSlug, isOrgMode, lockedSlug, initialSlug]);

  useEffect(() => {
    void load();
  }, [load]);

  const orgName = useMemo(() => {
    const map = new Map(orgs.map((o) => [o.slug, o.name]));
    return (s: string) => map.get(s) ?? s;
  }, [orgs]);

  const workspaceLabel = orgName(slug) || "your organisation";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const targetSlug = isOrgMode ? lockedSlug || slug : slug;
      const res = await fetch("/api/partner/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ slug: targetSlug, name, email, sendInvite }),
      });
      let data: {
        ok?: boolean;
        error?: string;
        loginUrl?: string;
        invite?: { ok?: boolean; mode?: string; reason?: string };
      } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setMessage({
          tone: "err",
          text: `Could not add contact (HTTP ${res.status}). Refresh and try again.`,
        });
        return;
      }
      if (!res.ok || !data.ok) {
        setMessage({ tone: "err", text: data.error || "Could not add contact." });
        return;
      }
      const inviteNote =
        data.invite?.mode === "resend"
          ? " Invite email sent."
          : data.invite?.mode === "link_only"
            ? ` ${data.invite.reason || "Copy the login link to share manually."}`
            : sendInvite
              ? ""
              : " Saved — invite not sent.";
      setLastLoginUrl(data.loginUrl ?? null);
      setMessage({
        tone: "ok",
        text: `Added ${name} (${email}) to ${orgName(targetSlug)}.${inviteNote}`,
      });
      setName("");
      setEmail("");
      await load();
    } catch {
      setMessage({ tone: "err", text: "Network error — try again." });
    } finally {
      setBusy(false);
    }
  }

  async function resendInvite(contactEmail: string) {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/partner/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: contactEmail, resendOnly: true }),
      });
      let data: {
        ok?: boolean;
        error?: string;
        loginUrl?: string;
        invite?: { mode?: string; reason?: string };
      } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setMessage({
          tone: "err",
          text: `Could not resend invite (HTTP ${res.status}). Try again.`,
        });
        return;
      }
      if (!res.ok || !data.ok) {
        setMessage({ tone: "err", text: data.error || "Could not resend invite." });
        return;
      }
      setLastLoginUrl(data.loginUrl ?? null);
      setMessage({
        tone: "ok",
        text:
          data.invite?.mode === "resend"
            ? `Invite resent to ${contactEmail}.`
            : data.invite?.reason || "Copy the login link below to share manually.",
      });
      await load();
    } catch {
      setMessage({ tone: "err", text: "Network error — try again." });
    } finally {
      setBusy(false);
    }
  }

  async function revoke(contactEmail: string) {
    if (
      viewerEmail &&
      contactEmail.trim().toLowerCase() === viewerEmail.trim().toLowerCase()
    ) {
      setMessage({ tone: "err", text: "You cannot revoke your own access." });
      return;
    }
    if (!confirm(`Revoke portal access for ${contactEmail}?`)) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/partner/admin/contacts?email=${encodeURIComponent(contactEmail)}`,
        { method: "DELETE", credentials: "same-origin" }
      );
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setMessage({ tone: "err", text: data.error || "Could not revoke." });
        return;
      }
      setMessage({ tone: "ok", text: `Revoked access for ${contactEmail}.` });
      await load();
    } catch {
      setMessage({ tone: "err", text: "Network error — try again." });
    } finally {
      setBusy(false);
    }
  }

  async function copyText(key: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 2000);
  }

  async function copyLink(slugForLink: string) {
    const origin = window.location.origin;
    const url = `${origin}/partner/login?from=${encodeURIComponent(`/partner/${slugForLink}`)}`;
    await copyText(slugForLink, url);
  }

  return (
    <section
      id="invite-partners"
      className="scroll-mt-28 border-b border-black/10 bg-[#fafafa] py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="w-5 h-5 text-emerald-800" />
          <div className="text-[10px] sm:text-xs tracking-[2px] text-[#737373] font-semibold">
            {isOrgMode ? "YOUR TEAM · INVITE COLLEAGUES" : "ADMIN · INVITE PARTNERS"}
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-2 text-balance">
          {isOrgMode
            ? `Invite people to ${workspaceLabel}`
            : "Add names & emails · send invites"}
        </h2>
        <p className="text-sm text-[#525252] mb-8 max-w-2xl leading-relaxed">
          {isOrgMode ? (
            <>
              Add colleagues to <strong className="text-[#404040]">{workspaceLabel}</strong>. They
              sign in with their email at{" "}
              <code className="text-xs bg-white border border-black/10 px-1.5 py-0.5 rounded">
                /partner/login
              </code>{" "}
              and only see this organisation&apos;s materials — not other partners.
            </>
          ) : (
            <>
              Invite people to a specific organisation workspace. They sign in with their email at{" "}
              <code className="text-xs bg-white border border-black/10 px-1.5 py-0.5 rounded">
                /partner/login
              </code>{" "}
              and only see that partner&apos;s materials. Contacts are stored server-side and never
              shown to other partners.
            </>
          )}
        </p>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {isOrgMode ? (
            <div className="sm:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2.5 text-sm text-emerald-950">
              Workspace: <strong>{workspaceLabel}</strong>
              <span className="text-emerald-800/80"> · /partner/{slug}</span>
            </div>
          ) : (
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-1.5 block">
                Organisation
              </span>
              <select
                id="invite-org-select"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full rounded-xl border border-black/15 bg-[#fafafa] px-3.5 py-2.5 text-sm text-black"
              >
                {orgs.map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.name} — {o.organisation}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="block">
            <span className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-1.5 block">
              Full name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Ndlovu"
              className="w-full rounded-xl border border-black/15 bg-[#fafafa] px-3.5 py-2.5 text-sm text-black"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-1.5 block">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@partner.org"
              className="w-full rounded-xl border border-black/15 bg-[#fafafa] px-3.5 py-2.5 text-sm text-black"
            />
          </label>
          <label className="sm:col-span-2 flex items-center gap-2 text-sm text-[#404040]">
            <input
              type="checkbox"
              checked={sendInvite}
              onChange={(e) => setSendInvite(e.target.checked)}
              className="rounded border-black/20"
            />
            Send invite email now — includes login link for this organisation
          </label>
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={busy || !slug}
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] text-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald-800 disabled:opacity-50 transition-colors"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              {sendInvite ? "Save & send invite" : "Save contact"}
            </button>
            <button
              type="button"
              onClick={() => slug && copyLink(slug)}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5"
            >
              {copied === slug ? (
                <Check className="w-4 h-4 text-emerald-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              Copy login link
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
              message.tone === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-red-200 bg-red-50 text-red-950"
            }`}
          >
            <p>{message.text}</p>
            {message.tone === "ok" && lastLoginUrl && (
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <code className="flex-1 text-xs break-all bg-white/80 border border-emerald-200 rounded-lg px-2.5 py-2 text-emerald-950">
                  {lastLoginUrl}
                </code>
                <button
                  type="button"
                  onClick={() => copyText("last-url", lastLoginUrl)}
                  className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-full border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
                >
                  {copied === "last-url" ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied === "last-url" ? "Copied" : "Copy link"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold tracking-tight text-black">
            {isOrgMode ? "People with access" : "Active invites"}
          </h3>
          {!isOrgMode && (
            <label className="text-sm text-[#525252]">
              Filter{" "}
              <select
                value={filterSlug}
                onChange={(e) => setFilterSlug(e.target.value)}
                className="ml-1 rounded-lg border border-black/15 bg-white px-2 py-1.5 text-sm"
              >
                <option value="">All organisations</option>
                {orgs.map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading contacts…
          </div>
        ) : contacts.length === 0 ? (
          <p className="text-sm text-[#737373]">
            {isOrgMode
              ? "No colleagues invited yet — add the first person above."
              : "No invited contacts yet for this filter."}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="text-[10px] tracking-[1px] text-[#737373] border-b border-black/10">
                  <th className="py-2.5 px-3 font-semibold">Name</th>
                  <th className="py-2.5 px-3 font-semibold">Email</th>
                  {!isOrgMode && (
                    <th className="py-2.5 px-3 font-semibold">Organisation</th>
                  )}
                  <th className="py-2.5 px-3 font-semibold">Invited</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const isSelf =
                    !!viewerEmail &&
                    c.email.trim().toLowerCase() === viewerEmail.trim().toLowerCase();
                  return (
                    <tr key={c.id} className="border-t border-black/5 align-top">
                      <td className="py-2.5 px-3 font-medium text-black">
                        {c.name}
                        {isSelf ? (
                          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                            You
                          </span>
                        ) : null}
                      </td>
                      <td className="py-2.5 px-3 text-[#404040] break-all">{c.email}</td>
                      {!isOrgMode && (
                        <td className="py-2.5 px-3 text-[#525252]">
                          {orgName(c.slug)}
                          <div className="text-[10px] text-[#a3a3a3]">/partner/{c.slug}</div>
                        </td>
                      )}
                      <td className="py-2.5 px-3 text-xs text-[#737373] tabular-nums whitespace-nowrap">
                        {c.invitedAt
                          ? new Date(c.invitedAt).toLocaleString("en-ZA", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "—"}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => resendInvite(c.email)}
                          className="text-xs font-semibold text-emerald-800 hover:underline mr-3"
                        >
                          Resend
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => copyLink(c.slug)}
                          className="text-xs font-semibold text-[#404040] hover:underline mr-3"
                        >
                          Copy link
                        </button>
                        <button
                          type="button"
                          disabled={busy || isSelf}
                          onClick={() => revoke(c.email)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-800 hover:underline disabled:opacity-40"
                          title={isSelf ? "You cannot revoke your own access" : "Revoke access"}
                        >
                          <Trash2 className="w-3 h-3" />
                          Revoke
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
