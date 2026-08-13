"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CaseStudyPdfStyles from "./CaseStudyPdfStyles";

/**
 * Body portal host for print clones of live case-study cards.
 * Content is injected at download time so the PDF matches the web DOM.
 */
export default function CaseStudyPdfLayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div className="case-study-pdf-print-layer" aria-hidden="true">
      <CaseStudyPdfStyles />
    </div>,
    document.body
  );
}
