"use client";

import { Printer } from "lucide-react";

export default function PrintButton({
  label = "Print / Save PDF",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ||
        "premium-button inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold print:hidden"
      }
    >
      <Printer className="w-4 h-4" />
      {label}
    </button>
  );
}
