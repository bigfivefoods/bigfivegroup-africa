"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";

export type CaseStudyPdfId = "sa-dbe-kzn" | "schooladvisor-kitchen" | "nsnp-foods";

/**
 * Triggers browser print → Save as PDF for a designed case-study document.
 * Pairs with CaseStudyPdfDocument (must be mounted with matching `pdfId`).
 */
export default function CaseStudyPdfDownload({
  pdfId,
  label = "Download PDF",
  className,
}: {
  pdfId: CaseStudyPdfId;
  label?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  const onDownload = useCallback(() => {
    if (typeof window === "undefined") return;
    setBusy(true);
    const root = document.documentElement;
    const prev = root.getAttribute("data-print-case");
    const prevTitle = document.title;
    const titles: Record<CaseStudyPdfId, string> = {
      "sa-dbe-kzn": "Big Five Connect · SupplierAdvisor DBE KZN case study",
      "schooladvisor-kitchen": "Big Five Connect · SchoolAdvisor kitchen safety case study",
      "nsnp-foods": "Big Five Foods · NSNP school nutrition case study",
    };
    document.title = titles[pdfId];
    root.setAttribute("data-print-case", pdfId);
    root.setAttribute("data-print-case-active", "true");

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      if (prev) root.setAttribute("data-print-case", prev);
      else root.removeAttribute("data-print-case");
      root.removeAttribute("data-print-case-active");
      document.title = prevTitle;
      setBusy(false);
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    // Fallback if afterprint is flaky (some mobile browsers)
    window.setTimeout(cleanup, 90_000);

    // Let print CSS apply before opening the dialog
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          window.print();
        } catch {
          cleanup();
        }
      });
    });
  }, [pdfId]);

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={busy}
      className={
        className ||
        "premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto hover:bg-[#fafafa] disabled:opacity-60 print:hidden"
      }
      title="Opens print dialog — choose Save as PDF for a designed A4 brief"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {busy ? "Preparing…" : label}
    </button>
  );
}
