"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, Settings2 } from "lucide-react";
import {
  NEWSLETTER_TOPIC_OPTIONS,
  type NewsletterTopicId,
} from "../../lib/newsletter/client";

function PreferencesInner() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [topics, setTopics] = useState<NewsletterTopicId[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "ok" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [subStatus, setSubStatus] = useState<string>("");

  useEffect(() => {
    const e = params.get("email") ?? "";
    const t = params.get("token") ?? "";
    setEmail(e);
    setToken(t);

    if (!t) {
      setStatus("error");
      setMessage("This preferences link is incomplete. Use the link from your welcome email.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/newsletter/preferences?email=${encodeURIComponent(e)}&token=${encodeURIComponent(t)}`
        );
        const data = (await res.json()) as {
          ok?: boolean;
          error?: string;
          email?: string;
          topics?: NewsletterTopicId[];
          status?: string;
        };
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setStatus("error");
          setMessage(data.error ?? "Could not load preferences.");
          return;
        }
        setEmail(data.email ?? e);
        setTopics(data.topics ?? []);
        setSubStatus(data.status ?? "");
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setMessage("Network error. Please try again.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params]);

  function toggleTopic(id: NewsletterTopicId) {
    setTopics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!topics.length) {
      setMessage("Select at least one topic.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, topics }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not save preferences.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "Preferences saved.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="max-w-lg mx-auto rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
      <div className="inline-flex items-center gap-2 text-[10px] tracking-[2px] text-emerald-800 font-semibold mb-3">
        <Settings2 className="w-3.5 h-3.5" />
        PREFERENCES
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2">
        Manage your newsletter
      </h1>
      <p className="text-sm text-[#525252] leading-relaxed mb-6">
        Choose which topics you want from Big Five Group Africa. You can leave anytime via{" "}
        <Link
          href="/newsletter/unsubscribe"
          className="font-semibold text-black underline underline-offset-2"
        >
          unsubscribe
        </Link>
        .
      </p>

      {status === "loading" && (
        <div className="flex items-center gap-2 text-sm text-[#525252]">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading preferences…
        </div>
      )}

      {status === "ok" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 flex gap-3">
          <Check className="w-5 h-5 text-emerald-800 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-black mb-1">Saved</p>
            <p className="text-xs text-[#525252] leading-relaxed">{message}</p>
            {email && (
              <p className="text-[11px] text-[#737373] mt-2">
                Signed in as <strong className="text-black">{email}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {(status === "ready" || status === "saving" || (status === "error" && topics.length > 0)) && (
        <form onSubmit={onSubmit} className="space-y-4">
          {email && (
            <p className="text-xs text-[#737373]">
              {email}
              {subStatus ? (
                <span className="ml-2 inline-flex rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#404040]">
                  {subStatus}
                </span>
              ) : null}
            </p>
          )}

          <fieldset>
            <legend className="text-xs font-medium text-[#737373] mb-2">Topics</legend>
            <div className="grid grid-cols-1 gap-2">
              {NEWSLETTER_TOPIC_OPTIONS.map((t) => {
                const checked = topics.includes(t.id);
                return (
                  <label
                    key={t.id}
                    className={`flex gap-2.5 rounded-xl border px-3 py-2.5 cursor-pointer transition-colors ${
                      checked
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-black/10 bg-white hover:border-black/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 rounded border-black/20"
                      checked={checked}
                      onChange={() => toggleTopic(t.id)}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-black">{t.label}</span>
                      <span className="block text-[10px] text-[#737373] leading-snug">
                        {t.desc}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {status === "error" && message && (
            <p className="text-sm text-rose-700" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "saving"}
            className="premium-button w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-full text-sm font-semibold py-3 disabled:opacity-60"
          >
            {status === "saving" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                Save preferences
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {status === "error" && topics.length === 0 && (
        <div className="space-y-4">
          <p className="text-sm text-rose-700" role="alert">
            {message}
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-2"
          >
            Go to newsletter signup
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function NewsletterPreferencesPage() {
  return (
    <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#fafafa] flex items-center">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-14">
        <Suspense fallback={<p className="text-center text-sm text-[#737373]">Loading…</p>}>
          <PreferencesInner />
        </Suspense>
      </div>
    </div>
  );
}
