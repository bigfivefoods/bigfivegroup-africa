"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "../lib/contact";
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
  const [mailto, setMailto] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    organisation: "",
    website: "",
  });

  const compact = variant === "footer" || variant === "inline";

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
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        mailto?: string | null;
      };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setMailto(data.mailto ?? null);
      track("newsletter_subscribe_success", { source });
      setStatus("success");

      if (data.mailto) {
        window.setTimeout(() => {
          window.location.href = data.mailto!;
        }, 150);
      }
    } catch {
      setError("Network error. Please email us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border border-emerald-200 bg-emerald-50/70 ${
          compact ? "p-4" : "p-6 sm:p-8"
        } ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black mb-1">
              Confirm in your email app
            </h3>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
              A draft to <strong className="text-black">{CONTACT_EMAIL}</strong> should open from
              your address. Press <strong className="text-black">send</strong> to complete your
              subscription. You can unsubscribe any time by emailing us.
            </p>
            {mailto && (
              <a
                href={mailto}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-2"
              >
                <Mail className="w-4 h-4" />
                Open email draft again
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

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
            />
          </label>
        </div>
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

      {error && (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}

      <p className={`text-[#737373] leading-relaxed ${compact ? "text-[10px]" : "text-xs"}`}>
        Occasional updates only — no spam. Unsubscribe anytime via{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 text-[#404040]">
          {CONTACT_EMAIL}
        </a>
        . By subscribing you confirm the draft email opt-in.
      </p>
    </form>
  );
}
