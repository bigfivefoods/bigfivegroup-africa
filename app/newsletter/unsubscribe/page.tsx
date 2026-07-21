"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

function UnsubscribeInner() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const e = params.get("email") ?? "";
    const t = params.get("token") ?? undefined;
    const ok = params.get("ok");
    const err = params.get("error");
    if (e) setEmail(e);
    if (t) setToken(t);

    if (err) {
      setStatus("error");
      setMessage(err);
      return;
    }
    if (ok === "1") {
      setStatus("ok");
      setMessage("You have been unsubscribed.");
      return;
    }

    // Auto-unsubscribe when both email + token present (from email link)
    if (e && t) {
      setStatus("loading");
      void (async () => {
        try {
          const res = await fetch("/api/newsletter/unsubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: e, token: t }),
          });
          const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
          if (!res.ok || !data.ok) {
            setStatus("error");
            setMessage(data.error ?? "Could not unsubscribe.");
            return;
          }
          setStatus("ok");
          setMessage(data.message ?? "You have been unsubscribed.");
        } catch {
          setStatus("error");
          setMessage("Network error. Please try again.");
        }
      })();
    }
  }, [params]);

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not unsubscribe.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "You have been unsubscribed.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="max-w-lg mx-auto rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2">
        Unsubscribe
      </h1>
      <p className="text-sm text-[#525252] leading-relaxed mb-6">
        Leave the Big Five Group Africa newsletter. You can re-subscribe anytime from the{" "}
        <Link href="/newsletter" className="font-semibold text-black underline underline-offset-2">
          newsletter page
        </Link>
        .
      </p>

      {status === "ok" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 flex gap-3">
          <Check className="w-5 h-5 text-emerald-800 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-black mb-1">Done</p>
            <p className="text-xs text-[#525252] leading-relaxed">{message}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[#737373] mb-1.5 block">Email</span>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-white pl-10 pr-4 py-3 text-sm"
                placeholder="you@organisation.com"
              />
            </div>
          </label>
          {status === "error" && (
            <p className="text-sm text-rose-700" role="alert">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="premium-button w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-full text-sm font-semibold py-3 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Working…
              </>
            ) : (
              <>
                Unsubscribe
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#fafafa] flex items-center">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-14">
        <Suspense fallback={<p className="text-center text-sm text-[#737373]">Loading…</p>}>
          <UnsubscribeInner />
        </Suspense>
      </div>
    </div>
  );
}
