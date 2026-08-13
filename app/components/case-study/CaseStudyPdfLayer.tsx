"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CaseStudyPdfDocument, { CaseStudyPdfStyles } from "./CaseStudyPdfDocument";
import type { CaseStudyPdfId } from "./CaseStudyPdfDownload";

/**
 * Screen-hidden print layer portaled to document.body so print CSS can hide
 * the app shell with `body > *:not(.case-study-pdf-print-layer)`.
 */
export default function CaseStudyPdfLayer({ ids }: { ids: CaseStudyPdfId[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div className="case-study-pdf-print-layer" aria-hidden="true">
      <CaseStudyPdfStyles />
      {ids.map((id) => (
        <CaseStudyPdfDocument key={id} pdfId={id} />
      ))}
    </div>,
    document.body
  );
}
