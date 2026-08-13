"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";

export type CaseStudyPdfId = "sa-dbe-kzn" | "schooladvisor-kitchen" | "nsnp-foods";

const TITLES: Record<CaseStudyPdfId, string> = {
  "sa-dbe-kzn": "Big Five Connect · SupplierAdvisor DBE KZN case study",
  "schooladvisor-kitchen": "Big Five Connect · SchoolAdvisor kitchen safety case study",
  "nsnp-foods": "Big Five Foods · NSNP school nutrition case study",
};

/** A4 portrait content box at 96dpi (210−12mm)×(297−12mm) */
const A4_CONTENT_W_PX = (198 / 25.4) * 96;
const A4_CONTENT_H_PX = (285 / 25.4) * 96;

/**
 * Clones the live case-study card, scales it to fit one A4 portrait page,
 * and opens Save as PDF. Design matches the web card (same DOM).
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

    layer.querySelectorAll("[data-case-pdf-clone], .case-study-pdf-scale-wrap").forEach((n) => {
      n.remove();
    });

    const wrap = document.createElement("div");
    wrap.className = "case-study-pdf-scale-wrap";

    const clone = source.cloneNode(true) as HTMLElement;
    clone.setAttribute("data-case-pdf-clone", pdfId);
    clone.classList.add("case-study-pdf-clone");
    clone.querySelectorAll(".case-study-actions").forEach((n) => n.remove());
    clone.querySelectorAll("img").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.currentSrc) el.setAttribute("src", el.currentSrc);
      el.removeAttribute("srcset");
      el.removeAttribute("sizes");
    });

    wrap.appendChild(clone);
    layer.appendChild(wrap);

    document.title = TITLES[pdfId];
    root.setAttribute("data-print-case", pdfId);
    root.setAttribute("data-print-case-active", "true");

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      layer
        .querySelectorAll("[data-case-pdf-clone], .case-study-pdf-scale-wrap")
        .forEach((n) => n.remove());
      if (prevCase) root.setAttribute("data-print-case", prevCase);
      else root.removeAttribute("data-print-case");
      root.removeAttribute("data-print-case-active");
      document.title = prevTitle;
      setBusy(false);
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    window.setTimeout(cleanup, 90_000);

    const fitAndPrint = () => {
      // Natural size at print width (198mm ≈ content width)
      clone.style.width = `${A4_CONTENT_W_PX}px`;
      clone.style.maxWidth = `${A4_CONTENT_W_PX}px`;
      clone.style.transform = "none";

      // Force layout
      void clone.offsetHeight;
      const naturalH = clone.scrollHeight || clone.offsetHeight || 1;
      const naturalW = clone.scrollWidth || A4_CONTENT_W_PX;

      const scaleH = A4_CONTENT_H_PX / naturalH;
      const scaleW = A4_CONTENT_W_PX / naturalW;
      // Prefer full width; only scale down if taller than one page
      const scale = Math.min(1, scaleW, scaleH);

      clone.style.transformOrigin = "top center";
      clone.style.transform = scale < 0.999 ? `scale(${scale.toFixed(4)})` : "none";

      // Reserve scaled footprint so nothing clips oddly in some engines
      if (scale < 0.999) {
        wrap.style.alignItems = "flex-start";
      }

      try {
        window.print();
      } catch {
        cleanup();
      }
    };

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
          // One more frame after images for layout settle
          requestAnimationFrame(fitAndPrint);
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
      title="Opens print dialog — Save as PDF on one A4 portrait page (same design as web)"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {busy ? "Preparing…" : label}
    </button>
  );
}
