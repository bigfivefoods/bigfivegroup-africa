#!/usr/bin/env python3
"""
Generate a beautiful A4 portrait PDF CV for Dr. Craig R. Muller.
Output: public/founder-cv-craig-muller.pdf

Run: python3 scripts/generate-founder-cv-pdf.py
"""

from __future__ import annotations

import os
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "founder-cv-craig-muller.pdf"
PHOTO = ROOT / "public" / "craig-muller.png"
LOGO = ROOT / "public" / "bigfivegroup-logo.png"

# Brand
INK = colors.HexColor("#0a0a0a")
INK_SOFT = colors.HexColor("#262626")
MUTED = colors.HexColor("#525252")
MUTED_LIGHT = colors.HexColor("#737373")
RULE = colors.HexColor("#e5e5e5")
AMBER = colors.HexColor("#d97706")
AMBER_DARK = colors.HexColor("#92400e")
AMBER_SOFT = colors.HexColor("#fffbeb")
PAPER = colors.HexColor("#ffffff")
BAND = colors.HexColor("#0a0a0a")

PAGE_W, PAGE_H = A4
MARGIN_L = 14 * mm
MARGIN_R = 14 * mm
MARGIN_T = 12 * mm
MARGIN_B = 16 * mm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R


def register_fonts() -> dict[str, str]:
    candidates = {
        "sans": [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ],
        "sansBold": [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ],
        "sansItalic": [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf",
        ],
        "sansBoldItalic": [
            "/usr/share/fonts/truetype/liberation/LiberationSans-BoldItalic.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-BoldOblique.ttf",
        ],
    }
    names: dict[str, str] = {}
    for key, paths in candidates.items():
        for path in paths:
            if os.path.isfile(path):
                font_name = f"BFG_{key}"
                pdfmetrics.registerFont(TTFont(font_name, path))
                names[key] = font_name
                break
        else:
            names[key] = "Helvetica" if "Bold" not in key else "Helvetica-Bold"
    return names


FONTS = register_fonts()


def prepare_photo(path: Path, size_px: int = 560) -> BytesIO:
    """Portrait crop, lightly lifted for print, RGB JPEG for reportlab."""
    im = PILImage.open(path).convert("RGBA")
    # Prefer top-weighted crop (face)
    w, h = im.size
    target_ratio = 3 / 4
    cur_ratio = w / h
    if cur_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = 0  # keep head
        im = im.crop((0, top, w, min(h, top + new_h)))

    im = im.resize((size_px, int(size_px / target_ratio)), PILImage.Resampling.LANCZOS)
    # Soft warm plate under transparency (reads better on the dark header)
    bg = PILImage.new("RGB", im.size, (28, 22, 14))
    bg.paste(im, mask=im.split()[3] if im.mode == "RGBA" else None)
    # Gentle lift so facial detail survives print / PDF raster
    from PIL import ImageEnhance

    bg = ImageEnhance.Brightness(bg).enhance(1.08)
    bg = ImageEnhance.Contrast(bg).enhance(1.06)
    buf = BytesIO()
    bg.save(buf, format="JPEG", quality=94, optimize=True)
    buf.seek(0)
    return buf


class RoundedPhoto(Flowable):
    """Portrait photo with amber border on dark plate."""

    def __init__(self, img_buf: BytesIO, width: float, height: float):
        super().__init__()
        self.img = ImageReader(img_buf)
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        r = 4
        # Outer amber ring
        c.setFillColor(AMBER)
        c.roundRect(0, 0, self.width, self.height, r + 1, fill=1, stroke=0)
        # Inner dark
        inset = 1.6
        c.setFillColor(BAND)
        c.roundRect(
            inset,
            inset,
            self.width - 2 * inset,
            self.height - 2 * inset,
            r,
            fill=1,
            stroke=0,
        )
        # Clip and draw image
        pad = 2.2
        c.saveState()
        p = c.beginPath()
        p.roundRect(
            pad,
            pad,
            self.width - 2 * pad,
            self.height - 2 * pad,
            r - 0.5,
        )
        c.clipPath(p, stroke=0)
        c.drawImage(
            self.img,
            pad,
            pad,
            width=self.width - 2 * pad,
            height=self.height - 2 * pad,
            preserveAspectRatio=True,
            anchor="c",
            mask="auto",
        )
        c.restoreState()


class SectionLabel(Flowable):
    """Amber eyebrow + title with rule."""

    def __init__(self, eyebrow: str, title: str, width: float):
        super().__init__()
        self.eyebrow = eyebrow
        self.title = title
        self._width = width
        self._height = 18

    def wrap(self, availWidth, availHeight):
        return self._width, self._height

    def draw(self):
        c = self.canv
        c.setFillColor(AMBER)
        c.setFont(FONTS["sansBold"], 7)
        c.drawString(0, self._height - 7, self.eyebrow.upper())
        c.setFillColor(INK)
        c.setFont(FONTS["sansBold"], 12)
        c.drawString(0, 2, self.title)
        c.setStrokeColor(AMBER)
        c.setLineWidth(1.2)
        c.line(0, 0, min(42, self._width * 0.12), 0)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.4)
        c.line(min(46, self._width * 0.12) + 2, 0, self._width, 0)


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    styles: dict[str, ParagraphStyle] = {}

    styles["name"] = ParagraphStyle(
        "name",
        parent=base["Normal"],
        fontName=FONTS["sansBold"],
        fontSize=20,
        leading=24,
        textColor=colors.white,
        spaceAfter=2,
    )
    styles["role"] = ParagraphStyle(
        "role",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=10,
        leading=13,
        textColor=AMBER,
        spaceAfter=4,
    )
    styles["tagline"] = ParagraphStyle(
        "tagline",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#d4d4d4"),
        alignment=TA_JUSTIFY,
    )
    styles["meta"] = ParagraphStyle(
        "meta",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#e5e5e5"),
    )
    styles["metaMuted"] = ParagraphStyle(
        "metaMuted",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=6.5,
        leading=8.5,
        textColor=colors.HexColor("#a3a3a3"),
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=8.4,
        leading=11.4,
        textColor=INK_SOFT,
        alignment=TA_JUSTIFY,
        spaceAfter=5,
    )
    styles["h_job"] = ParagraphStyle(
        "h_job",
        parent=base["Normal"],
        fontName=FONTS["sansBold"],
        fontSize=9.5,
        leading=12,
        textColor=INK,
        spaceAfter=0,
    )
    styles["h_role"] = ParagraphStyle(
        "h_role",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=8.2,
        leading=10.5,
        textColor=AMBER_DARK,
        spaceAfter=1,
    )
    styles["period"] = ParagraphStyle(
        "period",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7.5,
        leading=9.5,
        textColor=MUTED,
        alignment=TA_RIGHT,
    )
    styles["overview"] = ParagraphStyle(
        "overview",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=8,
        leading=10.8,
        textColor=MUTED,
        alignment=TA_JUSTIFY,
        spaceAfter=3,
        spaceBefore=2,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7.8,
        leading=10.4,
        textColor=INK_SOFT,
        leftIndent=0,
    )
    styles["edu_title"] = ParagraphStyle(
        "edu_title",
        parent=base["Normal"],
        fontName=FONTS["sansBold"],
        fontSize=8.2,
        leading=10.5,
        textColor=INK,
    )
    styles["edu_sub"] = ParagraphStyle(
        "edu_sub",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7.5,
        leading=9.5,
        textColor=MUTED,
    )
    styles["edu_note"] = ParagraphStyle(
        "edu_note",
        parent=base["Normal"],
        fontName=FONTS["sansItalic"],
        fontSize=7,
        leading=9,
        textColor=MUTED_LIGHT,
        spaceBefore=1,
    )
    styles["link"] = ParagraphStyle(
        "link",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7.2,
        leading=9.5,
        textColor=AMBER_DARK,
    )
    styles["footer"] = ParagraphStyle(
        "footer",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=6.5,
        leading=8,
        textColor=MUTED_LIGHT,
    )
    styles["table_cell"] = ParagraphStyle(
        "table_cell",
        parent=base["Normal"],
        fontName=FONTS["sans"],
        fontSize=7,
        leading=9,
        textColor=INK_SOFT,
    )
    styles["table_head"] = ParagraphStyle(
        "table_head",
        parent=base["Normal"],
        fontName=FONTS["sansBold"],
        fontSize=6.5,
        leading=8,
        textColor=MUTED,
    )
    styles["table_org"] = ParagraphStyle(
        "table_org",
        parent=base["Normal"],
        fontName=FONTS["sansBold"],
        fontSize=7,
        leading=9,
        textColor=INK,
    )
    return styles


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("®", "®")
        .replace("™", "™")
        .replace("±", "±")
        .replace("≈", "~")
        .replace("·", "·")
    )


def link_p(label: str, href: str, styles: dict) -> Paragraph:
    return Paragraph(
        f'<link href="{href}" color="#92400e"><u>{esc(label)}</u></link>',
        styles["link"],
    )


def build_header(styles: dict) -> list:
    photo_buf = prepare_photo(PHOTO)
    photo_w = 32 * mm
    photo_h = 42.5 * mm
    photo = RoundedPhoto(photo_buf, photo_w, photo_h)

    right = [
        Paragraph("CURRICULUM VITAE · CONFIDENTIAL", styles["metaMuted"]),
        Spacer(1, 2),
        Paragraph(esc("Dr. Craig R. Muller"), styles["name"]),
        Paragraph(
            esc("Founder & Group CEO · Big Five Group Africa"),
            styles["role"],
        ),
        Paragraph(
            esc(
                "DBA-credentialed executive building Feed · Educate · Empower platforms "
                "across Africa — fortified nutrition, measurable leadership development, "
                "and ethical digital commerce."
            ),
            styles["tagline"],
        ),
        Spacer(1, 6),
        Paragraph(
            esc("Email: craig@super-cube.com  ·  craig@bigfivegroup.africa"),
            styles["meta"],
        ),
        Paragraph(
            esc("Mobile: +27 (0) 82 581 4215  ·  ID: 800101 5069 081"),
            styles["meta"],
        ),
        Paragraph(
            esc(
                "Durban, KwaZulu-Natal, South Africa  ·  Authorised to work: South Africa"
            ),
            styles["meta"],
        ),
        Spacer(1, 4),
        Paragraph(
            " · ".join(
                [
                    f'<link href="https://za.linkedin.com/in/craigmuller" color="#fbbf24"><u>LinkedIn</u></link>',
                    f'<link href="https://www.researchgate.net/profile/Craig-Muller" color="#fbbf24"><u>ResearchGate</u></link>',
                    f'<link href="https://bigfivegroup.africa" color="#fbbf24"><u>bigfivegroup.africa</u></link>',
                    f'<link href="https://www.super-cube.me" color="#fbbf24"><u>Super-Cube®</u></link>',
                ]
            ),
            styles["meta"],
        ),
    ]

    # Dark band via colored table background
    inner = Table(
        [[photo, right]],
        colWidths=[photo_w + 4 * mm, CONTENT_W - photo_w - 4 * mm],
    )
    inner.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 4 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 2 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    band = Table([[inner]], colWidths=[CONTENT_W])
    band.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), BAND),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5 * mm),
                ("BOX", (0, 0), (-1, -1), 0, BAND),
            ]
        )
    )
    # Amber accent bar under header
    accent = Table([[""]], colWidths=[CONTENT_W], rowHeights=[2.2])
    accent.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), AMBER),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return [band, accent, Spacer(1, 7 * mm)]


PROFILE = [
    "Doctor of Business Administration (DBA) with a research focus on leadership skills development, and more than two decades of blue-chip experience across FMCG operations, global supply chains, and top-tier management consulting (Accenture, Pcubed London — Aston Martin, Merrill Lynch / Bank of America, VISA, RBS).",
    "Founder & Group CEO of Big Five Group Africa (bigfivegroup.africa) — building an integrated Feed · Educate · Empower ecosystem: Big Five Foods™ (fortified nutrition and institutional programmes), Super-Cube® leadership development, and SupplierAdvisor® ethical digital commerce.",
    "Creator of the Super-Cube® leadership model — empirically validated in an African FMCG business-network (UKZN doctoral research; peer-reviewed in SAJEMS). Measured average leadership-capacity gains of +32.2% across six human-centric constructs.",
    "Track record of turning around and scaling operations: ±R140m net-profit improvement at Imana Foods; R17.5m annualised cost-reduction programme at Petrow; multi-country cold-chain leadership at Merlog; £500m product-creation system work at Aston Martin.",
    "Committed to ESG / SDG outcomes — accelerating leadership capability in supply chains to improve society, business, and the natural environment.",
]

EDUCATION = [
    (
        "D.B.A. · Doctor of Business Administration — Leadership",
        "University of KwaZulu-Natal · South Africa · 2021",
        "Thesis: A leadership skills development model for the Kwaden Group — African FMCG business-network (Super-Cube®).",
    ),
    (
        "M.B.A. · Master of Business Administration",
        "University of KwaZulu-Natal · South Africa · 2006",
        "Dissertation on sub-Saharan vendor reliability — distinction.",
    ),
    (
        "P.D.M. · Postgraduate Diploma in Management",
        "University of KwaZulu-Natal · South Africa · 2004",
        None,
    ),
    (
        "B.Comm · Supply Chain, HR & Economics",
        "University of Natal · South Africa · 2002",
        None,
    ),
]

CERTS = [
    ("Project Management Professional (PMP)", "PMI", "2009"),
    ("Managing Successful Programmes (MSP)", "OGC", "2008"),
    ("PRINCE2", "OGC", "2008"),
    ("Microsoft SharePoint Server (MCP)", "Microsoft", "2008"),
    ("Enterprise Project Management — EPM (MCP)", "Microsoft", "2008"),
    ("Lean Six Sigma Black Belt", "Acuity Institute", "2007"),
]

PUBLICATIONS = [
    (
        "A proposed leadership skills development model for African FMCG business-networks: Super-Cube®",
        "South African Journal of Economic and Management Sciences (SAJEMS) · 2022",
        "https://journals.co.za/doi/10.4102/sajems.v25i1.4303",
    ),
    (
        "A leadership skills development model for the Kwaden Group: case study of an African FMCG business-network",
        "14th International Business Conference; Journal of Contemporary Management · 2021–2022",
        "https://www.researchgate.net/profile/Craig-Muller",
    ),
]

CAREER_SUMMARY = [
    ("2025 – Present", "Big Five Group Africa", "Founder & Group CEO", "Holding · Foods · Leadership · Digital", "SA / Africa"),
    ("Oct 2023 – Present", "Merlog Foods", "Operations Executive", "FMCG · Cold chain", "South Africa"),
    ("Feb – Oct 2023", "Petrow Food Ingredients", "Chief Operating Officer", "FMCG", "South Africa"),
    ("2014 – 2023", "Imana Foods (Kwaden)", "Supply Chain Executive / Acting COO", "FMCG", "South Africa"),
    ("2011 – 2014", "Varsity College", "Lecturer — Supply Chain (evenings)", "Higher education", "South Africa"),
    ("2010 – 2014", "Barrows (WPP)", "Managing Director; Group Commercial Mgr", "Retail marketing", "SA / Global"),
    ("2009 – 2010", "Accenture", "Management Consultant — Strategy & Process", "Consulting", "South Africa"),
    ("2007 – 2009", "Pcubed London", "Consultant — Enterprise Project Mgmt", "Consulting", "United Kingdom"),
    ("2006 – 2007", "TLC Consulting", "Management Consultant (contract)", "Consulting", "South Africa"),
    ("2006", "Toyota Tsusho Africa", "Supply Chain Manager", "Automotive", "South Africa"),
    ("2004 – 2006", "Kingfisher Sourcing Africa", "Supply Chain Manager", "FMCG / DIY", "SA / UK"),
    ("2003 – 2004", "Matelec", "Operations Manager", "Manufacturing", "South Africa"),
    ("1999 – 2000", "BDO Spencer Steward", "Article Clerk", "Professional services", "South Africa"),
]

EXPERIENCE = [
    {
        "org": "Big Five Group Africa",
        "role": "Founder & Group CEO",
        "period": "2025 – Present (approx. 18 months)",
        "location": "KwaZulu-Natal · Africa corridors",
        "overview": "Founded and leads Big Five Group Africa (bigfivegroup.africa) — One Group delivering Feed (Big Five Foods™), Educate (Super-Cube® / Leadership), and Empower (SupplierAdvisor® / Connect), with aligned Agri, Access and Foundation rails.",
        "highlights": [
            "Architected the group holding and opco model for investor-grade scale across foods, leadership and digital commerce",
            "Big Five Foods™ — fortified porridges, one-pot meals, soya and soups for institutional, retail and community channels; Sharks Women’s Rugby partnership",
            "Scaled Super-Cube® from doctoral research into a commercial leadership platform with baseline assessment and verified growth reporting",
            "Advanced SupplierAdvisor® as the ethical B2B/B2G commerce rail; engaged SPAR / Shoprite Checkers wholesale pathways and government nutrition programmes",
        ],
    },
    {
        "org": "Merlog Foods",
        "role": "Operations Executive",
        "period": "October 2023 – Present",
        "location": "South Africa · Sub-Saharan Africa",
        "overview": "Multi-nation, multi-billion-Rand FMCG cold-chain operator across Sub-Saharan Africa.",
        "highlights": [
            "Lead day-to-day operations and global supply chain; appointed to lead Manco and join group Exco",
            "Company-wide KPIs with real-time SharePoint / Power BI dashboards",
            "Lead 14,000 pallet-bay cold store (~193 people, 3PL network), SHEQ (ISO pathway), >40-vehicle fleet, and group IT / ERP digitalisation",
        ],
    },
    {
        "org": "Petrow Food Ingredients (C.J. Petrow Group)",
        "role": "Chief Operating Officer",
        "period": "February 2023 – October 2023",
        "location": "KwaZulu-Natal & Johannesburg",
        "overview": "Product innovation partnerships for local and multinational food companies. Business rescue commenced within two months of appointment.",
        "highlights": [
            "Production efficiency +448%; customer strike rate 60% → 93%",
            "National inventory (~R150m) and HR Director accountability (~280 staff)",
            "Efficiency programme targeting R17.5m annual savings — R3.7m realised during tenure",
        ],
    },
    {
        "org": "Imana Foods (Kwaden Investments Group)",
        "role": "Supply Chain Executive · Assumed COO duties from 2015",
        "period": "April 2014 – January 2023",
        "location": "New Germany, South Africa",
        "overview": "Privately owned food manufacturer delivering meal solutions across the African continent.",
        "highlights": [
            "Full P&L leadership across commercial, financial, operational, technology and HR (~250 staff)",
            "Improved net profit before tax by approximately R140 million within four years",
            "Implemented Super-Cube® leadership development across the supply chain; led ISO 45001 and FSSC 22000",
        ],
    },
    {
        "org": "Barrows Design and Manufacture (WPP)",
        "role": "Managing Director (1.5 yrs) · previously Group Commercial Manager",
        "period": "October 2010 – March 2014",
        "location": "South Africa · USA, Canada, UK, Africa & APAC",
        "overview": "Global retail marketing and manufacturing leader with lean supply chain and strong governance.",
        "highlights": [
            "Led innovation unit (commercial solar freezer launch, New York, June 2014)",
            "Group commercial / supply-chain framework; ERP / MIS strategy; bespoke balanced scorecard",
            "Leadership development framework linked to the scorecard (Super-Cube® precursor)",
        ],
    },
    {
        "org": "Accenture",
        "role": "Management Consultant — Manager, Strategy, Process & Innovation",
        "period": "November 2009 – October 2010",
        "location": "South Africa",
        "overview": "WesBank Lean Six Sigma BPI and Standard Bank SAP Connect 2 / Private & Personal Banking.",
        "highlights": [
            "WesBank: project leadership, Lean Six Sigma on Corporate Asset Finance, target operating model",
            "Standard Bank: end-to-end SAP Connect 2 project management; Lean Six Sigma ‘to-be’ analysis",
        ],
    },
    {
        "org": "Pcubed — London",
        "role": "Management Consultant — Enterprise Project Management",
        "period": "August 2007 – August 2009",
        "location": "United Kingdom",
        "overview": "Global programme consultancy — PMO design, BPR and EPM architecture.",
        "highlights": [
            "Aston Martin (£500m AMPCS): weekly CEO/COO reviews; BPR; bespoke EPM; Europe-wide training",
            "Merrill Lynch / Bank of America: global EPM architecture and PMO; Americas / Europe / Asia-Pac training",
            "Also: RBS, Lloyds Register (£85m relocation), VISA, Orange (£10m billing)",
        ],
    },
    {
        "org": "Earlier career",
        "role": "Supply chain, operations and articles",
        "period": "1999 – 2007",
        "location": "South Africa / UK",
        "overview": "TLC Consulting (Group Five Lean Six Sigma SOM); Toyota Tsusho Africa Supply Chain Manager (R950m Vendor-to-Vendor); Kingfisher Sourcing Africa Supply Chain Manager (£40m); Matelec Operations Manager; BDO Spencer Steward articles.",
        "highlights": [
            "Toyota Tsusho: ABC reduced logistics costs by R36m p.a.; R4m monthly loss → R6m monthly profit in three months; CSI 3.71 → 4.50/5.0",
            "Matelec: inventory system delivering ~R10m net annual cost reduction",
            "Guest speaker — Toyota Supply Chain World Conference (Singapore & Indonesia)",
        ],
    },
]

EXPERTISE = [
    ("Strategy & performance", "Strategy maps, balanced scorecard, KPAs & KPIs; commercial and financial performance management"),
    ("Supply chain", "End-to-end management and optimisation; cold chain; vendor reliability; multi-country logistics"),
    ("Leadership & people", "Coaching, mentoring, culture; Super-Cube® leadership skills development (DBA); YPO speaking"),
    ("Process excellence", "Lean Six Sigma Black Belt; DMAIC; standard operating models; business process redesign"),
    ("Technology & analytics", "ERP / MIS; SharePoint; Power BI; JIRA; Confluence; BI and predictive analytics"),
    ("Programme & project management", "PMP, PRINCE2, MSP, Microsoft EPM — PMO design and transformation programmes"),
]

INTERESTS = [
    "Golf; provincial swimming and triathlon; Comrades Marathon (2023); full Ironman (Port Elizabeth, 2022 & 2025)",
    "Day-yacht skipper; kayak fishing; time with family and friends",
    "Public speaking (YPO), lecturing, publishing on strategy and leadership; UN volunteering",
]


def job_block(job: dict, styles: dict) -> KeepTogether:
    header = Table(
        [
            [
                Paragraph(esc(job["org"]), styles["h_job"]),
                Paragraph(esc(job["period"]), styles["period"]),
            ],
            [
                Paragraph(esc(job["role"]), styles["h_role"]),
                Paragraph(esc(job["location"]), styles["period"]),
            ],
        ],
        colWidths=[CONTENT_W * 0.68, CONTENT_W * 0.32],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    bullets = []
    for h in job["highlights"]:
        bullets.append(
            ListItem(
                Paragraph(esc(h), styles["bullet"]),
                leftIndent=8,
                bulletColor=AMBER,
                value="•",
            )
        )
    parts: list = [
        header,
        Paragraph(esc(job["overview"]), styles["overview"]),
    ]
    if bullets:
        parts.append(
            ListFlowable(
                bullets,
                bulletType="bullet",
                start="•",
                leftIndent=10,
                bulletFontName=FONTS["sans"],
                bulletFontSize=8,
                spaceBefore=0,
                spaceAfter=2,
            )
        )
    parts.append(Spacer(1, 3.5 * mm))
    return KeepTogether(parts)


def add_footer(canvas, doc):
    canvas.saveState()
    y = 9 * mm
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN_L, y + 5 * mm, PAGE_W - MARGIN_R, y + 5 * mm)

    canvas.setFillColor(MUTED_LIGHT)
    canvas.setFont(FONTS["sans"], 6.5)
    canvas.drawString(
        MARGIN_L,
        y,
        "Big Five Group Africa  ·  Confidential — investor diligence  ·  bigfivegroup.africa",
    )
    canvas.drawRightString(
        PAGE_W - MARGIN_R,
        y,
        f"Page {doc.page}",
    )
    # Amber corner tick
    canvas.setFillColor(AMBER)
    canvas.rect(PAGE_W - MARGIN_R - 8, PAGE_H - 4, 8, 2.5, fill=1, stroke=0)
    canvas.restoreState()


def build_story(styles: dict) -> list:
    story: list = []
    story.extend(build_header(styles))

    # Profile
    story.append(SectionLabel("01", "Professional profile", CONTENT_W))
    story.append(Spacer(1, 3 * mm))
    for p in PROFILE:
        story.append(Paragraph(esc(p), styles["body"]))
    story.append(Spacer(1, 3 * mm))

    # Education + Certs side by side
    edu_bits: list = []
    for title, sub, note in EDUCATION:
        block = [Paragraph(esc(title), styles["edu_title"]), Paragraph(esc(sub), styles["edu_sub"])]
        if note:
            block.append(Paragraph(esc(note), styles["edu_note"]))
        block.append(Spacer(1, 2.2 * mm))
        edu_bits.extend(block)

    cert_bits: list = []
    for name, inst, year in CERTS:
        cert_bits.append(
            Paragraph(
                f"<b>{esc(name)}</b>  ·  {esc(inst)}  ·  {esc(year)}",
                styles["edu_sub"],
            )
        )
        cert_bits.append(Spacer(1, 1.6 * mm))

    left_col = [SectionLabel("02", "Education", CONTENT_W * 0.48), Spacer(1, 2.5 * mm), *edu_bits]
    right_col = [
        SectionLabel("03", "Certifications", CONTENT_W * 0.48),
        Spacer(1, 2.5 * mm),
        *cert_bits,
    ]
    twin = Table([[left_col, right_col]], colWidths=[CONTENT_W * 0.5, CONTENT_W * 0.5])
    twin.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 3 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 3 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(KeepTogether([twin, Spacer(1, 3 * mm)]))

    # Publications
    story.append(SectionLabel("04", "Selected publications", CONTENT_W))
    story.append(Spacer(1, 2.5 * mm))
    for title, venue, href in PUBLICATIONS:
        story.append(
            Paragraph(
                f'<link href="{href}" color="#0a0a0a"><b>{esc(title)}</b></link>',
                styles["edu_title"],
            )
        )
        story.append(Paragraph(esc(venue), styles["edu_sub"]))
        story.append(Spacer(1, 2 * mm))
    story.append(Spacer(1, 1 * mm))

    # Career summary table
    story.append(SectionLabel("05", "Career summary", CONTENT_W))
    story.append(Spacer(1, 2.5 * mm))
    rows = [
        [
            Paragraph("YEARS", styles["table_head"]),
            Paragraph("ORGANISATION", styles["table_head"]),
            Paragraph("ROLE", styles["table_head"]),
            Paragraph("INDUSTRY", styles["table_head"]),
            Paragraph("COUNTRY", styles["table_head"]),
        ]
    ]
    for years, org, role, industry, country in CAREER_SUMMARY:
        rows.append(
            [
                Paragraph(esc(years), styles["table_cell"]),
                Paragraph(esc(org), styles["table_org"]),
                Paragraph(esc(role), styles["table_cell"]),
                Paragraph(esc(industry), styles["table_cell"]),
                Paragraph(esc(country), styles["table_cell"]),
            ]
        )
    col_w = [
        CONTENT_W * 0.16,
        CONTENT_W * 0.24,
        CONTENT_W * 0.30,
        CONTENT_W * 0.18,
        CONTENT_W * 0.12,
    ]
    table = Table(rows, colWidths=col_w, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), AMBER_SOFT),
                ("TEXTCOLOR", (0, 0), (-1, 0), AMBER_DARK),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, AMBER),
                ("LINEBELOW", (0, 1), (-1, -1), 0.3, RULE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3),
                ("TOPPADDING", (0, 0), (-1, -1), 3.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, colors.HexColor("#fafafa")]),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 5 * mm))

    # Experience detail
    story.append(SectionLabel("06", "Career detail", CONTENT_W))
    story.append(Spacer(1, 3 * mm))
    for job in EXPERIENCE:
        story.append(job_block(job, styles))

    # Expertise + interests
    exp_bits: list = []
    for area, detail in EXPERTISE:
        exp_bits.append(Paragraph(f"<b>{esc(area)}</b>", styles["edu_title"]))
        exp_bits.append(Paragraph(esc(detail), styles["edu_sub"]))
        exp_bits.append(Spacer(1, 1.8 * mm))

    int_bits: list = [
        Paragraph(f"• {esc(i)}", styles["edu_sub"]) for i in INTERESTS
    ]
    for i, _ in enumerate(INTERESTS):
        if i < len(int_bits) - 1:
            int_bits.insert(2 * i + 1, Spacer(1, 1.5 * mm))

    # rebuild interests cleanly
    int_flow: list = []
    for i in INTERESTS:
        int_flow.append(Paragraph(f"•  {esc(i)}", styles["edu_sub"]))
        int_flow.append(Spacer(1, 1.6 * mm))

    bottom = Table(
        [
            [
                [
                    SectionLabel("07", "Skills & expertise", CONTENT_W * 0.48),
                    Spacer(1, 2.5 * mm),
                    *exp_bits,
                ],
                [
                    SectionLabel("08", "Interests & community", CONTENT_W * 0.48),
                    Spacer(1, 2.5 * mm),
                    *int_flow,
                    Spacer(1, 3 * mm),
                    Paragraph(
                        '<link href="https://za.linkedin.com/in/craigmuller" color="#92400e"><u>LinkedIn</u></link>'
                        "  ·  "
                        '<link href="https://www.researchgate.net/profile/Craig-Muller" color="#92400e"><u>ResearchGate</u></link>'
                        "  ·  "
                        '<link href="https://bigfivegroup.africa" color="#92400e"><u>bigfivegroup.africa</u></link>',
                        styles["link"],
                    ),
                ],
            ]
        ],
        colWidths=[CONTENT_W * 0.5, CONTENT_W * 0.5],
    )
    bottom.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 3 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 3 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(Spacer(1, 2 * mm))
    story.append(bottom)

    return story


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    styles = make_styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="Curriculum Vitae — Dr. Craig R. Muller",
        author="Dr. Craig R. Muller · Big Five Group Africa",
        subject="Founder CV — Big Five Group Africa investor diligence",
        creator="Big Five Group Africa",
    )
    story = build_story(styles)
    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
