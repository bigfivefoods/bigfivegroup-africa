"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Mail, MessageCircle } from "lucide-react";
import {
  ENQUIRY_INTERESTS,
  buildWhatsAppLink,
  type EnquiryPayload,
  CONTACT_EMAIL,
} from "../lib/contact";
import { track } from "../lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

function interestFromSearch(): string {
  if (typeof window === "undefined") return "partnership";
  const q = new URLSearchParams(window.location.search).get("interest");
  if (q && ENQUIRY_INTERESTS.some((i) => i.value === q)) return q;
  return "partnership";
}

function messageFromSearch(): string {
  if (typeof window === "undefined") return "";
  const intent = new URLSearchParams(window.location.search).get("intent");
  if (intent === "sample") {
    return "I would like a sample pack and/or volume quote for Big Five Foods (porridges / soya). Region: · Estimated monthly volume: · Preferred pack format: ·";
  }
  if (intent === "cohort") {
    return "I am interested in a Super-Cube® leadership cohort for our organisation. Audience (exec / public / youth): · Preferred format (in-person / blended): · Approximate cohort size: · Timing: ·";
  }
  if (intent === "foundation") {
    return "I would like to discuss funding or partnering with Big Five Foundation. Focus area (nutrition / livelihoods / other): ·";
  }
  return "";
}

export default function ContactForm({
  defaultInterest,
}: {
  defaultInterest?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [whatsApp, setWhatsApp] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    phone: "",
    interest: defaultInterest ?? "partnership",
    message: "",
    website: "",
  });

  useEffect(() => {
    const interest = defaultInterest ?? interestFromSearch();
    const message = messageFromSearch();
    setForm((f) => ({
      ...f,
      interest: interest || f.interest,
      message: message || f.message,
    }));
    if (message.includes("sample")) {
      track("sample_request", { source: "contact_prefill" });
    }
  }, [defaultInterest]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    track("contact_submit", { interest: form.interest });

    const payload: EnquiryPayload = {
      name: form.name,
      email: form.email,
      organisation: form.organisation || undefined,
      phone: form.phone || undefined,
      interest: form.interest,
      message: form.message,
      website: form.website,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        mailto?: string | null;
        emailed?: boolean;
      };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try email or WhatsApp.");
        setStatus("error");
        return;
      }

      setMailto(data.mailto ?? null);
      setWhatsApp(buildWhatsAppLink(payload));

      track("contact_submit_success", {
        interest: payload.interest,
        emailed: Boolean(data.emailed),
      });

      if (data.emailed) {
        window.location.href = `/contact/thanks?emailed=1&interest=${encodeURIComponent(payload.interest)}`;
        return;
      }

      setStatus("success");
      if (data.mailto) {
        // Open the user's mail client with a pre-filled enquiry, then offer next steps
        window.setTimeout(() => {
          window.location.href = data.mailto!;
        }, 100);
      }
    } catch {
      setError("Network error. Please email us directly or use WhatsApp.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mb-4">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-2">
          Enquiry ready
        </h3>
        <p className="text-sm sm:text-base text-[#525252] leading-relaxed mb-6 max-w-md mx-auto">
          Your mail app should open with a pre-filled message to{" "}
          <strong className="text-black">{CONTACT_EMAIL}</strong>. If it didn&apos;t, use the
          options below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-md mx-auto">
          {mailto && (
            <a
              href={mailto}
              className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
            >
              <Mail className="w-4 h-4" />
              Open email draft
            </a>
          )}
          {whatsApp && (
            <a
              href={whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              Send on WhatsApp
            </a>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <a
            href="/contact/thanks"
            className="text-sm font-medium text-black underline underline-offset-2"
          >
            Continue to next steps
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setForm((f) => ({ ...f, message: "" }));
            }}
            className="text-sm text-[#525252] underline underline-offset-2 hover:text-black"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm sm:text-base text-black placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/20 min-w-0";
  const label = "block text-xs font-semibold tracking-wide text-[#404040] mb-1.5 uppercase";

  return (
    <form onSubmit={onSubmit} className="relative space-y-4 sm:space-y-5" noValidate>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={label}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            className={field}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            className={field}
            placeholder="you@organisation.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="organisation" className={label}>
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            value={form.organisation}
            onChange={onChange}
            className={field}
            placeholder="Company, ministry, NGO…"
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={onChange}
            className={field}
            placeholder="+27…"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={label}>
          I&apos;m interested in *
        </label>
        <select
          id="interest"
          name="interest"
          required
          value={form.interest}
          onChange={onChange}
          className={`${field} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%23525252%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
        >
          {ENQUIRY_INTERESTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={onChange}
          className={`${field} resize-y min-h-[8rem]`}
          placeholder="Outcome you need, timeline, geography, and any context that helps us prepare…"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="premium-button w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing…
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      <p className="text-xs text-[#737373] leading-relaxed max-w-lg">
        By submitting, you agree we may use your details to respond to this enquiry (see our{" "}
        <a href="/privacy" className="underline underline-offset-2 text-black">
          Privacy Policy
        </a>
        ). If server email is configured, we send directly; otherwise your mail app opens a draft to{" "}
        {CONTACT_EMAIL}. We typically respond within 1–2 business days.
      </p>
    </form>
  );
}
