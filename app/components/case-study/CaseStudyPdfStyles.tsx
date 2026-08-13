/** Print CSS: A4 portrait, same web case-study design, fit to one page. */
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
    size: A4 portrait;
    margin: 0;
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
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 auto !important;
    padding: 0 !important;
    background: #fff !important;
    overflow: hidden !important;
  }

  /* Fixed A4 frame — clone is scaled to fit inside */
  .case-study-pdf-scale-wrap {
    box-sizing: border-box !important;
    width: 210mm !important;
    height: 297mm !important;
    padding: 6mm !important;
    margin: 0 !important;
    overflow: hidden !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: center !important;
    background: #fff !important;
  }

  .case-study-pdf-clone {
    display: block !important;
    box-sizing: border-box !important;
    width: 198mm !important; /* 210 − 2×6mm */
    max-width: 198mm !important;
    margin: 0 auto !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    background: #fff !important;
    transform-origin: top center !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    page-break-inside: avoid !important;
    page-break-after: avoid !important;
  }

  /* Same 5/7 two-column layout as desktop web */
  .case-study-pdf-clone .case-study-card-grid {
    display: grid !important;
    grid-template-columns: 5fr 7fr !important;
    gap: 0 !important;
    width: 100% !important;
  }

  .case-study-pdf-clone .case-study-card-left,
  .case-study-pdf-clone .case-study-card-right {
    display: flex !important;
    flex-direction: column !important;
    min-width: 0 !important;
  }

  .case-study-pdf-clone .case-study-card-left {
    padding: 14px 14px !important;
  }

  .case-study-pdf-clone .case-study-card-right {
    padding: 14px 16px !important;
  }

  .case-study-pdf-clone .case-study-actors {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    gap: 6px !important;
    margin-bottom: 10px !important;
  }

  .case-study-pdf-clone .case-study-stats {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    gap: 5px !important;
    margin-bottom: 10px !important;
  }

  .case-study-pdf-clone .case-study-actions,
  .case-study-pdf-clone .print\\:hidden {
    display: none !important;
  }

  /* Slightly denser type so one page is realistic before scale kicks in */
  .case-study-pdf-clone h2 {
    font-size: 17px !important;
    line-height: 1.15 !important;
    margin-bottom: 8px !important;
  }

  .case-study-pdf-clone h3 {
    font-size: 11px !important;
    margin-bottom: 6px !important;
  }

  .case-study-pdf-clone p,
  .case-study-pdf-clone li {
    font-size: 9px !important;
    line-height: 1.4 !important;
  }

  .case-study-pdf-clone .case-study-ambition {
    font-size: 32px !important;
    line-height: 1 !important;
    margin-bottom: 4px !important;
  }

  .case-study-pdf-clone .case-study-secondary-stat {
    font-size: 18px !important;
  }

  .case-study-pdf-clone .mb-5 { margin-bottom: 10px !important; }
  .case-study-pdf-clone .mb-6 { margin-bottom: 10px !important; }
  .case-study-pdf-clone .mb-4 { margin-bottom: 8px !important; }
  .case-study-pdf-clone .mb-3 { margin-bottom: 6px !important; }
  .case-study-pdf-clone .mt-8 { margin-top: 12px !important; }
  .case-study-pdf-clone .pt-6 { padding-top: 10px !important; }
  .case-study-pdf-clone .space-y-2 > :not([hidden]) ~ :not([hidden]),
  .case-study-pdf-clone .space-y-2\\.5 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 4px !important;
  }

  .case-study-pdf-clone img {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    max-height: 40px !important;
    width: auto !important;
    object-fit: contain !important;
  }

  .case-study-pdf-clone * {
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
