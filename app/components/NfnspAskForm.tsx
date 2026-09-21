"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { NFNSP } from "../lib/nfnspPartnership";

const GOLD = "#C4923A";

export default function NfnspAskForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      role: String(fd.get("role") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      sphere: String(fd.get("sphere") ?? ""),
      province: String(fd.get("province") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    try {
      const res = await fetch("/api/partner/nfnsp-briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not send. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Could not send. Please try again.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-[#C4923A]/35 bg-[#F7F1E6] p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D38] mb-2">
          <Check className="w-4 h-4" aria-hidden />
          Briefing request received.
        </div>
        <p className="text-sm text-[#404040] leading-relaxed">
          We will reply to the official email you gave. This form does not collect learner or
          beneficiary data.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-black placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#C4923A]/40";

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
      <p className="text-xs text-[#737373] leading-relaxed">
        Purpose-limited under POPIA — name, role, organisation, official email, phone, sphere,
        message. No learner or beneficiary data.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block text-xs font-semibold text-[#404040]">
          Name
          <input name="name" required minLength={2} className={`${field} mt-1`} autoComplete="name" />
        </label>
        <label className="block text-xs font-semibold text-[#404040]">
          Role
          <input name="role" required className={`${field} mt-1`} />
        </label>
        <label className="block text-xs font-semibold text-[#404040] sm:col-span-2">
          Organisation
          <input name="organisation" required className={`${field} mt-1`} autoComplete="organization" />
        </label>
        <label className="block text-xs font-semibold text-[#404040]">
          Official email
          <input name="email" type="email" required className={`${field} mt-1`} autoComplete="email" />
        </label>
        <label className="block text-xs font-semibold text-[#404040]">
          Phone
          <input name="phone" type="tel" className={`${field} mt-1`} autoComplete="tel" />
        </label>
        <label className="block text-xs font-semibold text-[#404040]">
          Sphere
          <select name="sphere" required className={`${field} mt-1`}>
            <option value="">Select…</option>
            {NFNSP.spheres.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-[#404040]">
          Province (optional)
          <input name="province" className={`${field} mt-1`} />
        </label>
      </div>
      <label className="block text-xs font-semibold text-[#404040]">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className={`${field} mt-1 resize-y`}
        />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        style={{ backgroundColor: GOLD }}
      >
        {status === "sending" ? "Sending…" : "Request a briefing"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
