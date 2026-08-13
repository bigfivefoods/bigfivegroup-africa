/** Print CSS: isolate cloned web case-study card so PDF matches the site layout. */
export default function CaseStudyPdfStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.case-study-pdf-print-layer {
  display: none;
}

@media print {
  @page {
    size: A4 landscape;
    margin: 8mm;
  }

  html[data-print-case-active="true"] body {
    background: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  html[data-print-case-active="true"] body > *:not(.case-study-pdf-print-layer) {
    display: none !important;
  }

  html[data-print-case-active="true"] .case-study-pdf-print-layer {
    display: block !important;
    position: static !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
  }

  /* Cloned card fills the printable area */
  .case-study-pdf-clone {
    display: block !important;
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 auto !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    background: #fff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    page-break-inside: avoid;
  }

  /* Force the same 5/7 two-column layout as lg: desktop web */
  .case-study-pdf-clone .case-study-card-grid {
    display: grid !important;
    grid-template-columns: 5fr 7fr !important;
    gap: 0 !important;
  }

  .case-study-pdf-clone .case-study-card-left,
  .case-study-pdf-clone .case-study-card-right {
    display: flex !important;
    flex-direction: column !important;
    min-width: 0 !important;
    height: 100% !important;
  }

  .case-study-pdf-clone .case-study-card-left {
    padding: 18px 20px !important;
  }

  .case-study-pdf-clone .case-study-card-right {
    padding: 18px 22px !important;
  }

  /* Actor / stat grids: keep multi-column like sm+ */
  .case-study-pdf-clone .case-study-actors {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    gap: 8px !important;
  }

  .case-study-pdf-clone .case-study-stats {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    gap: 6px !important;
  }

  /* Hide interactive chrome */
  .case-study-pdf-clone .case-study-actions,
  .case-study-pdf-clone .print\\:hidden {
    display: none !important;
  }

  /* Typography slightly tighter for A4 landscape fit — same hierarchy as web */
  .case-study-pdf-clone h2 {
    font-size: 22px !important;
    line-height: 1.15 !important;
    margin-bottom: 10px !important;
  }

  .case-study-pdf-clone p,
  .case-study-pdf-clone li {
    font-size: 11px !important;
    line-height: 1.45 !important;
  }

  .case-study-pdf-clone .case-study-ambition {
    font-size: 40px !important;
    line-height: 1 !important;
  }

  .case-study-pdf-clone .case-study-secondary-stat {
    font-size: 24px !important;
  }

  .case-study-pdf-clone img {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    max-height: 48px !important;
    width: auto !important;
    object-fit: contain !important;
  }

  .case-study-pdf-clone * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Preserve gradients / soft fills */
  .case-study-pdf-clone .case-study-card-left {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  a {
    text-decoration: none !important;
    color: inherit !important;
  }
}
`,
      }}
    />
  );
}
