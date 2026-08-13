"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";

export type CaseStudyPdfId = "sa-dbe-kzn" | "schooladvisor-kitchen" | "nsnp-foods";

const TITLES: Record<CaseStudyPdfId, string> = {
  "sa-dbe-kzn": "Big Five Connect · SupplierAdvisor DBE KZN case study",
  "schooladvisor-kitchen": "Big Five Connect · SchoolAdvisor kitchen safety case study",
  "nsnp-foods": "Big Five Foods · NSNP school nutrition case study",
};

/**
 * Clones the live case-study card into a print layer and opens Save as PDF.
 * Result matches the web design (same DOM/styles), landscape A4.
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
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const source = document.querySelector(
      `[data-case-pdf-id="${pdfId}"]`
    ) as HTMLElement | null;
    const layer = document.querySelector(
      ".case-study-pdf-print-layer"
    ) as HTMLElement | null;

    if (!source || !layer) {
      console.warn("[CaseStudyPdf] missing source or print layer", pdfId);
      return;
    }

    setBusy(true);
    const root = document.documentElement;
    const prevCase = root.getAttribute("data-print-case");
    const prevTitle = document.title;

    // Clear prior clones
    layer.querySelectorAll("[data-case-pdf-clone]").forEach((n) => n.remove());

    const clone = source.cloneNode(true) as HTMLElement;
    clone.setAttribute("data-case-pdf-clone", pdfId);
    clone.classList.add("case-study-pdf-clone");
    // Strip interactive controls from the print copy
    clone.querySelectorAll(".case-study-actions").forEach((n) => n.remove());
    // Absolute img URLs so print engine can resolve Next.js optimised images
    clone.querySelectorAll("img").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.currentSrc) el.setAttribute("src", el.currentSrc);
      el.removeAttribute("srcset");
      el.removeAttribute("sizes");
    });

    layer.appendChild(clone);

    document.title = TITLES[pdfId];
    root.setAttribute("data-print-case", pdfId);
    root.setAttribute("data-print-case-active", "true");

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      layer.querySelectorAll("[data-case-pdf-clone]").forEach((n) => n.remove());
      if (prevCase) root.setAttribute("data-print-case", prevCase);
      else root.removeAttribute("data-print-case");
      root.removeAttribute("data-print-case-active");
      document.title = prevTitle;
      setBusy(false);
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    window.setTimeout(cleanup, 90_000);

    // Wait for clone paint + images
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const imgs = Array.from(clone.querySelectorAll("img"));
        Promise.all(
          imgs.map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) resolve();
                else {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                }
              })
          )
        ).then(() => {
          try {
            window.print();
          } catch {
            cleanup();
          }
        });
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
      title="Opens print dialog — choose Save as PDF (matches the web case study)"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {busy ? "Preparing…" : label}
    </button>
  );
}
