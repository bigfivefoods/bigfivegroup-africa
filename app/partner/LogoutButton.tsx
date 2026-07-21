"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/partner/logout", { method: "POST" });
    } finally {
      router.replace("/partner/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full border border-white/25 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-60"
    >
      <LogOut className="w-3.5 h-3.5" />
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
