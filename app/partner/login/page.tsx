"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, Mail } from "lucide-react";

function PartnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/partner";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/partner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Access denied.");
        setLoading(false);
        return;
      }
      router.replace(from.startsWith("/partner") ? from : "/partner");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto min-w-0">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 mb-6">
        <Lock className="w-5 h-5 text-emerald-300" />
      </div>
      <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-emerald-400/90 mb-3">
        PARTNER PORTAL · PRIVATE
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-3 text-balance">
        Sign in with your partner email
      </h1>
      <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-8 text-pretty">
        This area is for authorised partners only. Enter the email address Big Five has registered
        for your organisation.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-white/50 tracking-wide uppercase mb-1.5 block">
            Email
          </span>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organisation.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 min-w-0"
            />
          </div>
        </label>

        {error && (
          <p className="text-sm text-rose-300/95 leading-relaxed" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="premium-button w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold disabled:opacity-60"
        >
          {loading ? "Checking access…" : "Enter partner portal"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <p className="mt-8 text-xs text-white/40 leading-relaxed">
        Need access? Email{" "}
        <a
          href="mailto:craig@bigfivegroup.africa?subject=Partner%20portal%20access"
          className="text-emerald-300/90 underline underline-offset-2"
        >
          craig@bigfivegroup.africa
        </a>
        .
      </p>
      <Link
        href="/"
        className="inline-block mt-4 text-xs text-white/45 hover:text-white/70 transition-colors"
      >
        ← Back to bigfivegroup.africa
      </Link>
    </div>
  );
}

export default function PartnerLoginPage() {
  return (
    <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#052e1c] text-white flex items-center">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <Suspense
          fallback={
            <p className="text-white/50 text-sm text-center">Loading sign-in…</p>
          }
        >
          <PartnerLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
