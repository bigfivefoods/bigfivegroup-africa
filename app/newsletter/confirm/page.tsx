"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, XCircle } from "lucide-react";

function ConfirmInner() {
  const params = useSearchParams();
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const err = params.get("error");
    const ok = params.get("ok");
    const emailParam = params.get("email") ?? "";
    const token = params.get("token") ?? "";

    if (err) {
      setState("error");
      setMessage(err);
      return;
    }

    if (ok === "1") {
      setState("ok");
      setEmail(emailParam);
      setMessage("Subscription confirmed. You are on the list.");
      return;
    }

    if (!token || !emailParam) {
      setState("error");
      setMessage("This confirmation link is incomplete.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/newsletter/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailParam, token }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          error?: string;
          message?: string;
          email?: string;
        };
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setState("error");
          setMessage(data.error ?? "Could not confirm subscription.");
          return;
        }
        setEmail(data.email ?? emailParam);
        setMessage(data.message ?? "Subscription confirmed.");
        setState("ok");
      } catch {
        if (!cancelled) {
          setState("error");
          setMessage("Network error. Please try again.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <div className="max-w-lg mx-auto rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm text-center">
      {state === "loading" && (
        <>
          <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-4" />
          <p className="text-sm text-[#525252]">Confirming your subscription…</p>
        </>
      )}
      {state === "ok" && (
        <>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-black mb-2">You&apos;re in</h1>
          <p className="text-sm text-[#525252] leading-relaxed mb-1">{message}</p>
          {email && (
            <p className="text-xs text-[#737373] mb-6">
              Subscribed as <strong className="text-black">{email}</strong>
            </p>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-2"
          >
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}
      {state === "error" && (
        <>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-800 mb-4">
            <XCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-black mb-2">
            Confirmation failed
          </h1>
          <p className="text-sm text-[#525252] leading-relaxed mb-6">{message}</p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-2"
          >
            Try subscribing again
            <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}
    </div>
  );
}

export default function NewsletterConfirmPage() {
  return (
    <div className="page-shell min-h-[calc(100dvh-var(--navbar-height))] bg-[#fafafa] flex items-center">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-14">
        <Suspense
          fallback={
            <p className="text-center text-sm text-[#737373]">Loading confirmation…</p>
          }
        >
          <ConfirmInner />
        </Suspense>
      </div>
    </div>
  );
}
