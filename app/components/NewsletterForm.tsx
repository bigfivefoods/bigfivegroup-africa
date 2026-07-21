"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "../lib/contact";
import {
  NEWSLETTER_TOPIC_OPTIONS,
  type NewsletterTopicId,
} from "../lib/newsletter/client";
import { track } from "../lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Visual density */
  variant?: "footer" | "page" | "inline";
  source?: string;
  className?: string;
};

export default function NewsletterForm({
  variant = "page",
  source = "website",
  className = "",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmPath, setConfirmPath] = useState<string | null>(null);
  const [mode, setMode] = useState<"double_opt_in" | "single_opt_in" | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    organisation: "",
    website: "",
    consent: false,
  });
  const [topics, setTopics] = useState<NewsletterTopicId[]>(
    NEWSLETTER_TOPIC_OPTIONS.map((t) => t.id)
  );

  const compact = variant === "footer" || variant === "inline";

  function toggleTopic(id: NewsletterTopicId) {
    setTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    track("newsletter_subscribe", { source });

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name || undefined,
          organisation: form.organisation || undefined,
          website: form.website,
          source,
          consent: form.consent,
          topics: compact ? undefined : topics,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        confirmPath?: string;
        mode?: "double_opt_in" | "single_opt_in";
        status?: string;
      };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      track("newsletter_subscribe_success", { source });
      setSuccessMessage(data.message ?? "You are subscribed.");
      setConfirmPath(data.confirmPath ?? null);
      setMode(data.mode ?? "single_opt_in");
      setStatus("success");
      setForm((f) => ({ ...f, email: "", name: "", organisation: "", consent: false }));
    } catch {
      setError("Network error. Please try again or email us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border border-emerald-200 bg-emerald-50/70 ${
          compact ? "p-4" : "p-6 sm:p-8"
        } ${className}`}
        role="status"
      >
        <div className="flex items-start gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black mb-1">
              {mode === "double_opt_in" && confirmPath
                ? "Confirm your subscription"
                : mode === "double_opt_in"
                  ? "Check your email"
                  : "You are subscribed"}
            </h3>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
              {successMessage}
            </p>
            {confirmPath && (
              <Link
                href={confirmPath}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-2"
              >
                Confirm subscription
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <p className="text-[11px] text-[#737373] mt-3 leading-relaxed">
              Manage topics or leave anytime via{" "}
              <Link href="/newsletter/unsubscribe" className="underline underline-offset-2">
                unsubscribe
              </Link>{" "}
              or{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`relative space-y-3 ${className}`} noValidate>
      {/* Honeypot — bots fill this; humans never see it */}
      <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block min-w-0">
            <span className="text-xs font-medium text-[#737373] mb-1.5 block">Name (optional)</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-emerald-600/25"
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
          <label className="block min-w-0">
            <span className="text-xs font-medium text-[#737373] mb-1.5 block">
              Organisation (optional)
            </span>
            <input
              type="text"
              name="organisation"
              value={form.organisation}
              onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-emerald-600/25"
              placeholder="Organisation"
              autoComplete="organization"
            />
          </label>
        </div>
      )}

      {!compact && (
        <fieldset className="min-w-0">
          <legend className="text-xs font-medium text-[#737373] mb-2">Topics</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    <span className="block text-[10px] text-[#737373] leading-snug">{t.desc}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div
        className={
          compact
            ? "flex flex-col sm:flex-row gap-2 sm:gap-3"
            : "flex flex-col sm:flex-row gap-3"
        }
      >
        <label className="block flex-1 min-w-0">
          {!compact && (
            <span className="text-xs font-medium text-[#737373] mb-1.5 block">Email</span>
          )}
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@organisation.com"
              className={`w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-sm text-black placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-emerald-600/25 ${
                compact ? "py-3" : "py-3.5"
              }`}
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`premium-button inline-flex items-center justify-center gap-2 bg-black text-white rounded-full text-sm font-semibold disabled:opacity-60 shrink-0 ${
            compact ? "px-5 py-3" : "px-6 py-3.5"
          }`}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <label className="flex gap-2.5 items-start cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-1 rounded border-black/20"
        />
        <span className={`text-[#525252] leading-snug ${compact ? "text-[10px]" : "text-xs"}`}>
          I agree to receive occasional email updates from Big Five Group Africa about programmes,
          partnerships and Group news. I can unsubscribe at any time. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 text-black">
            privacy notice
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}

      <p className={`text-[#737373] leading-relaxed ${compact ? "text-[10px]" : "text-xs"}`}>
        Occasional updates only — no spam. Leave via{" "}
        <Link href="/newsletter/unsubscribe" className="underline underline-offset-2 text-[#404040]">
          unsubscribe
        </Link>
        .
      </p>
    </form>
  );
}
