#!/usr/bin/env python3
"""NFNSP-2 implementation partnership proposal — A4 portrait.

Output: public/partners/BigFive_NFNSP_Implementation_Partnership_Proposal.pdf
Run: python3 scripts/generate-nfnsp-proposal-pdf.py
"""

from __future__ import annotations

import os
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "partners" / "BigFive_NFNSP_Implementation_Partnership_Proposal.pdf"
NDA = ROOT / "public" / "partners" / "department-of-agriculture-logo.png"
BFG = ROOT / "public" / "bigfivegroup-logo.jpg"
HERO = ROOT / "public" / "home-hero.jpg"
FONTDIR = Path(__file__).resolve().parent / "fonts"

PAGE_W, PAGE_H = A4
FOREST = HexColor("#0F3D38")
FOREST_DK = HexColor("#0B1C22")
GOLD = HexColor("#C4923A")
GOLD_LT = HexColor("#E8C07A")
INK = HexColor("#171717")
MUTED = HexColor("#525252")
CREAM = HexColor("#F7F1E6")
PAPER = HexColor("#FAFAFA")
RULE = HexColor("#E5D9C4")
CARD = HexColor("#FFFFFF")

INNER = 18 * mm
CONTENT_W = PAGE_W - 2 * INNER
HEADER_H = 26 * mm
FOOTER_H = 20 * mm
BODY_BOTTOM = FOOTER_H + 7.5 * mm
TOTAL = 16
BODY = 10.5
LEAD = 15.75  # 1.5 like the portal
CAPTION = 8.5
CAPTION_LEAD = 12.6
RADIUS = 4.2 * mm  # portal rounded-2xl
GAP = 4.0 * mm
PAD = 5.5 * mm
BAR = 3.2
SOFT = HexColor("#FBF7EE")


def fonts() -> dict[str, str]:
    inter = {
        "sans": FONTDIR / "Inter-Regular.ttf",
        "sansBold": FONTDIR / "Inter-Bold.ttf",
        "sansSemi": FONTDIR / "Inter-SemiBold.ttf",
        "sansItalic": FONTDIR / "Inter-Italic.ttf",
    }
    fallback = {
        "sans": "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "sansBold": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansSemi": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
    }
    out: dict[str, str] = {}
    for k in ("sans", "sansBold", "sansSemi", "sansItalic"):
        p = inter[k]
        n = f"NFN_{k}"
        if p.is_file():
            pdfmetrics.registerFont(TTFont(n, str(p)))
            out[k] = n
        elif os.path.isfile(fallback[k]):
            pdfmetrics.registerFont(TTFont(n, fallback[k]))
            out[k] = n
        else:
            out[k] = "Helvetica-Bold" if "Bold" in k or k == "sansSemi" else "Helvetica"
    # Portal headings are Inter, not serif — map former serif keys.
    out["serif"] = out["sans"]
    out["serifBold"] = out["sansBold"]
    out["serifItalic"] = out["sansItalic"]
    return out


F = fonts()


def to_reader(im: PILImage.Image, q=90) -> ImageReader:
    buf = BytesIO()
    if im.mode == "RGBA":
        im.save(buf, format="PNG", optimize=True)
    else:
        im.save(buf, format="JPEG", quality=q, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def cover_crop(im: PILImage.Image, tw: int, th: int, bias_top: float = 0.28) -> PILImage.Image:
    scale = max(tw / im.width, th / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    left = max(0, (nw - tw) // 2)
    top = max(0, int((nh - th) * bias_top))
    return im.crop((left, top, left + tw, top + th))


def plate(path: Path, bw: int, bh: int, pad=12) -> ImageReader:
    im = PILImage.open(path).convert("RGBA")
    canvas = PILImage.new("RGB", (bw, bh), (255, 255, 255))
    aw, ah = bw - 2 * pad, bh - 2 * pad
    sc = min(aw / im.width, ah / im.height)
    nw, nh = max(1, int(im.width * sc)), max(1, int(im.height * sc))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    canvas.paste(im, ((bw - nw) // 2, (bh - nh) // 2), im)
    return to_reader(canvas, 93)


def make_hero() -> ImageReader:
    src = PILImage.open(HERO).convert("RGB")
    dpi = 168
    tw = int(PAGE_W / 72 * dpi)
    th = int(PAGE_H / 72 * dpi)
    hero = cover_crop(src, tw, th, 0.18)
    dusk = PILImage.new("RGB", hero.size, (11, 28, 34))
    return to_reader(PILImage.blend(hero, dusk, 0.40), 88)


def make_footer_band() -> ImageReader:
    """Hero pattern only — kente/paint from home-hero.jpg, never the globe lockup."""
    src = PILImage.open(HERO).convert("RGB")
    dpi = 200
    tw = int(PAGE_W / 72 * dpi)
    th = max(1, int(FOOTER_H / 72 * dpi))
    strip = cover_crop(src, tw, th, 0.84)
    dusk = PILImage.new("RGB", strip.size, (11, 28, 34))
    return to_reader(PILImage.blend(strip, dusk, 0.30), 90)


def wrap(c, text, font, size, max_w):
    words = text.replace("\n", " ").split()
    if not words:
        return []
    lines, cur = [], words[0]
    for w in words[1:]:
        t = f"{cur} {w}"
        if c.stringWidth(t, font, size) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def measure(c, text, font, size, lead, max_w) -> float:
    n = max(1, len(wrap(c, text, font, size, max_w)))
    return n * lead


def draw_str(c, text, x, y, font, size, color, tracking=0, align="left"):
    """Draw a string; tracking uses a text object (Canvas has no setCharSpace)."""
    c.setFillColor(color)
    c.setFont(font, size)
    if not tracking:
        if align == "right":
            c.drawRightString(x, y, text)
        else:
            c.drawString(x, y, text)
        return
    extra = tracking * max(0, len(text) - 1)
    w = c.stringWidth(text, font, size) + extra
    ox = x if align != "right" else x - w
    t = c.beginText()
    t.setTextOrigin(ox, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(tracking)
    t.textLine(text)
    c.drawText(t)
    c._code.append("0 Tc")


def para(c, text, x, y, font, size, lead, max_w, color, tracking=0) -> float:
    yy = y
    for line in wrap(c, text, font, size, max_w):
        draw_str(c, line, x, yy, font, size, color, tracking=tracking)
        yy -= lead
    return y - yy


def rrect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    if fill is not None:
        c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill is not None else 0, stroke=1 if stroke is not None else 0)


def gold_rule(c, x, y, w, sw=0.8):
    c.setStrokeColor(GOLD)
    c.setLineWidth(sw)
    c.line(x, y, x + w, y)


def forest_bar(c, x, y, h):
    c.setFillColor(FOREST)
    c.rect(x, y, BAR, h, fill=1, stroke=0)


def card(c, x, yb, w, h, fill=white, stroke=GOLD, sw=0.45, bar=True, radius=None):
    r = RADIUS if radius is None else radius
    rrect(c, x, yb, w, h, r, fill=fill, stroke=None)
    if bar:
        c.saveState()
        p = c.beginPath()
        p.roundRect(x, yb, w, h, r)
        c.clipPath(p, stroke=0)
        forest_bar(c, x, yb, h)
        c.restoreState()
    if stroke is not None:
        rrect(c, x, yb, w, h, r, fill=None, stroke=stroke, sw=sw)


NDA_PLATE = None
BFG_PLATE = None
HERO_IMG = None
FOOTER_IMG = None


def footer(c, n):
    if FOOTER_IMG:
        c.drawImage(FOOTER_IMG, 0, 0, width=PAGE_W, height=FOOTER_H, preserveAspectRatio=False)
    else:
        c.setFillColor(FOREST_DK)
        c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, FOOTER_H - 1.15, PAGE_W, 1.15, fill=1, stroke=0)
    baseline = FOOTER_H * 0.42
    c.setFillColor(white)
    c.setFont(F["sansSemi"], 8)
    c.drawString(INNER, baseline, "CONFIDENTIAL  ·  NFNSP-2  ·  v3.1  ·  Not an awarded tender")
    c.drawRightString(PAGE_W - INNER, baseline, f"{n}   /   {TOTAL}")


def header_bar(c, running: str):
    y = PAGE_H - HEADER_H
    c.setFillColor(white)
    c.rect(0, y, PAGE_W, HEADER_H, fill=1, stroke=0)
    nda_w, nda_h = 62 * mm, 17.2 * mm
    bfg = 20 * mm
    c.drawImage(
        NDA_PLATE,
        INNER,
        y + (HEADER_H - nda_h) / 2,
        width=nda_w,
        height=nda_h,
        preserveAspectRatio=True,
        anchor="c",
    )
    c.drawImage(
        BFG_PLATE,
        PAGE_W - INNER - bfg,
        y + (HEADER_H - bfg) / 2,
        width=bfg,
        height=bfg,
        preserveAspectRatio=True,
        anchor="c",
    )
    c.setFillColor(GOLD)
    c.rect(0, y, PAGE_W, 1.15, fill=1, stroke=0)
    return y


def chrome(c, n, running):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, running)
    footer(c, n)
    draw_str(c, "NFNSP-2  ·  2027–2037", INNER, top - 6.2 * mm, F["sansSemi"], 7.5, GOLD, tracking=0.9)
    draw_str(c, running, PAGE_W - INNER, top - 6.2 * mm, F["sansItalic"], 8, MUTED, align="right")
    return top - 12.5 * mm


def kicker(c, text, x, y):
    draw_str(c, text.upper(), x, y, F["sansSemi"], 7.5, GOLD, tracking=1.2)
    gold_rule(c, x, y - 2.8, 22 * mm, 0.9)


def bullets(c, items, x, y, max_w, size=BODY, lead=LEAD) -> float:
    for item in items:
        c.setFillColor(GOLD)
        c.circle(x + 2.0, y + 2.2, 1.35, fill=1, stroke=0)
        used = para(c, item, x + 9, y, F["sans"], size, lead, max_w - 9, INK)
        y -= used + 2.4 * mm
    return y


def quote_box(c, y, text, size=BODY, lead=LEAD) -> float:
    pw = CONTENT_W - 2 * PAD
    h = measure(c, text, F["sansItalic"], size, lead, pw) + 2 * 5.2 * mm
    rrect(c, INNER, y - h, CONTENT_W, h, RADIUS, fill=FOREST, stroke=None)
    para(c, text, INNER + PAD, y - 5.6 * mm, F["sansItalic"], size, lead, pw, GOLD_LT)
    return y - h - GAP


def note_box(c, y, text, size=BODY, lead=LEAD) -> float:
    pw = CONTENT_W - PAD - 8
    h = measure(c, text, F["sans"], size, lead, pw) + 2 * 5.2 * mm
    card(c, INNER, y - h, CONTENT_W, h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
    para(c, text, INNER + 9, y - 5.6 * mm, F["sans"], size, lead, pw, MUTED)
    return y - h - GAP


def metric_row(c, y, stats) -> float:
    """Portal-style callout cards: (value, label, source) — height follows content."""
    n = len(stats)
    gap = 3.6 * mm
    tw = (CONTENT_W - gap * (n - 1)) / n
    inner_w = tw - 12
    lab_h = [
        measure(c, lab, F["sans"], 8.4, 11.8, inner_w)
        for _, lab, _ in stats
    ]
    th = 5.2 * mm + 15 + 3.2 + max(lab_h) + 10 + 4.2 * mm
    for i, (v, lab, src) in enumerate(stats):
        x = INNER + i * (tw + gap)
        card(c, x, y - th, tw, th, fill=white, stroke=GOLD, sw=0.45, bar=True)
        draw_str(c, v, x + 7.5, y - 7.2 * mm, F["sansSemi"], 14.5, FOREST, tracking=-0.35)
        para(c, lab, x + 7.5, y - 12.2 * mm, F["sans"], 8.4, 11.8, inner_w, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 7.4)
        c.drawString(x + 7.5, y - th + 4.2 * mm, src)
    return y - th - 5.5 * mm


def numbered_card(c, y, mark, title, body, size=BODY, lead=LEAD) -> float:
    """Full-width row: forest disc + title + body, height follows content."""
    pw = CONTENT_W - 22
    title_h = measure(c, title, F["sansSemi"], size, lead, pw)
    body_h = measure(c, body, F["sans"], size, lead, pw)
    h = 4.4 * mm + title_h + 1.8 + body_h + 4.0 * mm
    card(c, INNER, y - h, CONTENT_W, h, fill=white, stroke=GOLD, sw=0.4, bar=False)
    title_base = y - 5.0 * mm
    c.setFillColor(FOREST)
    c.circle(INNER + 10, title_base + 2.4, 5.4, fill=1, stroke=0)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sansSemi"], 7.2)
    c.drawCentredString(INNER + 10, title_base, mark)
    tx = INNER + 18
    para(c, title, tx, title_base, F["sansSemi"], size, lead, pw, FOREST)
    para(c, body, tx, title_base - title_h - 1.8, F["sans"], size, lead, pw, MUTED)
    return y - h - 2.8 * mm


# ---------------------------------------------------------------------------
# Cover
# ---------------------------------------------------------------------------
def page_cover(c):
    if HERO_IMG:
        c.drawImage(HERO_IMG, 0, 0, width=PAGE_W, height=PAGE_H, preserveAspectRatio=False)
    header_bar(c, "")
    footer(c, 1)

    y = PAGE_H - HEADER_H - 12 * mm
    draw_str(c, "PARTNER PORTAL   ·   CONFIDENTIAL   ·   NFNSP-2", INNER, y, F["sansSemi"], 7.5, GOLD_LT, tracking=1.3)
    y -= 11 * mm
    draw_str(c, "Implementation partnership", INNER, y, F["sansSemi"], 26, white, tracking=-0.45)
    y -= 9 * mm
    para(
        c,
        "Operationalising the National Food and Nutrition Security Plan  ·  2027–2037",
        INNER,
        y,
        F["sansItalic"],
        12,
        16,
        CONTENT_W * 0.92,
        GOLD_LT,
    )
    y -= 16 * mm
    gold_rule(c, INNER, y, 46 * mm, 1.15)
    y -= 9 * mm
    para(
        c,
        "Private briefing for the NFNSP Technical Working Group / Department of Agriculture. "
        "Not a government publication. Not an awarded tender. Not a current NSNP daily headcount.",
        INNER,
        y,
        F["sans"],
        BODY,
        LEAD,
        CONTENT_W * 0.92,
        HexColor("#F3E9D6"),
    )
    y -= 26 * mm

    stats = [
        ("22.2%", "Households with inadequate or severely inadequate food access", "GHS 2024"),
        ("~29%", "Children under five stunted (severe 15%)", "NFNSS 2023"),
        ("17.6%", "Below the food poverty line of R777 pp/pm", "Poverty Trends 2025"),
        ("10 / 20 / 30%", "Smallholder share of government food procurement", "Framework 2029 / 2033 / 2037"),
    ]
    tw = (CONTENT_W - 5 * mm) / 2
    inner_w = tw - 16
    lab_h = [measure(c, lab, F["sans"], BODY, LEAD, inner_w) for _, lab, _ in stats]
    th = 6 * mm + 18 + 4 + max(lab_h) + 12
    for i, (v, lab, src) in enumerate(stats):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 5 * mm)
        ty = y - th - row * (th + 4 * mm)
        card(c, x, ty, tw, th, fill=Color(1, 1, 1, alpha=0.95), stroke=GOLD, sw=0.5, bar=True)
        draw_str(c, v, x + 9, ty + th - 8.2 * mm, F["sansSemi"], 18, FOREST, tracking=-0.4)
        para(c, lab, x + 9, ty + th - 15 * mm, F["sans"], BODY, LEAD, inner_w, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], CAPTION)
        c.drawString(x + 9, ty + 5.2 * mm, src)

    honesty = (
        "Honesty: 355 000 meals is programme-reported, not millions. 2.5 million children per day is a DBE-pathway plan, not current headcount. "
        "SupplierAdvisor® does not replace BAS or LOGIS."
    )
    hh = measure(c, honesty, F["sans"], BODY, LEAD, CONTENT_W - 16) + 12
    by = FOOTER_H + 8 * mm
    rrect(c, INNER, by, CONTENT_W, hh, RADIUS, fill=Color(0.04, 0.11, 0.13, alpha=0.78), stroke=None)
    para(c, honesty, INNER + 8, by + hh - 8, F["sans"], BODY, LEAD, CONTENT_W - 16, white)
    c.showPage()


# ---------------------------------------------------------------------------
# Contents
# ---------------------------------------------------------------------------
def page_contents(c):
    y = chrome(c, 2, "Contents  ·  how to read this proposal")
    kicker(c, "02  ·  Contents", INNER, y)
    y -= 9 * mm
    toc = [
        ("01", "Cover — sourced national figures", "1"),
        ("02", "Contents and reading rules", "2"),
        ("03", "Executive summary", "3"),
        ("04", "Vision · mission · values", "4"),
        ("05", "Feed · Educate · Empower × the Plan", "5"),
        ("06", "Goal 1 — local agri-food system (1.1–1.2)", "6"),
        ("07", "Goal 1 — production and informal trade (1.3–1.4)", "7"),
        ("08", "Goal 2 — equitable access (2.1–2.3)", "8"),
        ("09", "Goal 3 — protection of the vulnerable (3.1–3.3)", "9"),
        ("10", "Enablers A–C — governance, resourcing, capacity/data", "10"),
        ("11", "Nine pillars as one circuit", "11"),
        ("12", "Why now · reading the Plan · who we are", "12"),
        ("13", "Foods, workstreams, demonstration", "13"),
        ("14", "SupplierAdvisor® farm-to-fork operating system", "14"),
        ("15", "90-day ask and what we return", "15"),
        ("16", "Risk, labelled figures, conclusion", "16"),
    ]
    for n, t, p in toc:
        c.setStrokeColor(RULE)
        c.setLineWidth(0.35)
        c.setDash(0.7, 1.5)
        c.line(INNER + 16 * mm, y + 2, PAGE_W - INNER - 12 * mm, y + 2)
        c.setDash()
        c.setFillColor(GOLD)
        c.setFont(F["sansSemi"], BODY)
        c.drawString(INNER, y, n)
        c.setFillColor(INK)
        c.setFont(F["sans"], BODY)
        c.drawString(INNER + 16 * mm, y, t)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], BODY)
        c.drawRightString(PAGE_W - INNER, y, p)
        y -= LEAD + 1.6

    y -= 4 * mm
    kicker(c, "How to read figures", INNER, y)
    y -= 8 * mm
    note = (
        "Official Goal, Enabler and Game-changer titles are from NFNSP-2 Draft 2 (July 2026) and the Results Framework of 27 August 2026. "
        "Official statistics (GHS 2024, NFNSS 2023, Poverty Trends 2025) carry a source. Group figures carry a label: plan, programme-reported, product specification, or internal comparison. "
        "This document does not invent government contracts, awarded tenders, current daily NSNP volumes, or Framework cells left as XX. "
        "SupplierAdvisor® does not replace BAS or LOGIS. No learner names. Treasury, DoH, DSD/SASSA and COGTA/SALGA lead VAT, labelling, grants and the local mandate — Big Five operationalises lots, plates, nodes and MELIA extracts. "
        "This briefing does not replace the Plan; it proposes how to operationalise it."
    )
    note_box(c, y, note)
    c.showPage()


# ---------------------------------------------------------------------------
# Executive summary
# ---------------------------------------------------------------------------
def page_exec(c):
    y = chrome(c, 3, "Executive summary")
    kicker(c, "03  ·  Executive summary", INNER, y)
    y -= 8.5 * mm

    lead = (
        "South Africa has a Plan with named Goals, Game Changers and Enablers. What it needs now is an implementation partner "
        "that can put a lawful plate on the table, a verified smallholder lot behind that plate, and proof that both happened."
    )
    y = quote_box(c, y, lead)

    y = metric_row(
        c,
        y,
        [
            ("22.2%", "Inadequate household food access", "GHS 2024"),
            ("~29%", "Children under five stunted", "NFNSS 2023"),
            ("17.6%", "Below the food poverty line", "Poverty Trends 2025"),
            ("10–30%", "Smallholder procurement target", "Framework 2029–2037"),
        ],
    )

    paras = [
        "Goal 1 transforms the local agri-food system. Goal 2 is equitable access to nutritious, safe, affordable food. Goal 3 protects the vulnerable. Enabler A is governance; B is resourcing; C is capacity, innovation and MELIA. Sources: NFNSP-2 Draft 2 (July 2026) and the Results Framework of 27 August 2026.",
        "Big Five Group runs those Game Changers as one circuit: Agri verifies producers, Connect proves the lot, Foods mills the plate, Direct moves it to hub, market, rank and kitchen. Leadership forms people. Impact reports honestly. We do not gazette VAT, grants or a Food and Nutrition Security Act.",
        "90 days: a closed technical briefing; KwaZulu-Natal as joint demonstration; a PFMA/MFMA workstream for Game Changer 1.2; a MELIA data protocol; a seat at the Framework’s round tables. Scale only after a closed circuit holds.",
    ]
    for p in paras:
        used = para(c, p, INNER, y, F["sans"], BODY, LEAD, CONTENT_W, INK)
        y -= used + 3.6 * mm

    close = (
        "Confidential partner briefing — not a government publication, not an awarded tender. "
        "355 000 meals is programme-reported. 2.5 million children per day is a DBE-pathway plan. SupplierAdvisor® does not replace BAS or LOGIS."
    )
    note_box(c, y, close)
    c.showPage()


# ---------------------------------------------------------------------------
# Vision · mission · values
# ---------------------------------------------------------------------------
def page_purpose(c):
    y = chrome(c, 4, "Vision · mission · values")
    kicker(c, "04  ·  The north star this partnership already answers to", INNER, y)
    y -= 8.5 * mm
    lead = (
        "The companies are instruments of one purpose. The Plan needs a partner that already answers to a north star — not a slide deck assembled for a tender."
    )
    y = quote_box(c, y, lead)

    cards = [
        ("VISION", "A prosperous Africa — for everyone on it",
         "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, and communities build economies they own. That is the same destination as the NFNSP-2 vision of well-coordinated, inclusive, just local food systems."),
        ("MISSION", "Feed. Educate. Empower.",
         "We deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises — at scale and with proof. That is how Big Five shows up against Goals 1–3 and Enablers A–C."),
        ("VALUES", "What we refuse to compromise",
         "Humanity, innovation, integrity, excellence, and purposeful impact. Values shape how we hire, partner, trade and deliver — including on this Plan."),
    ]
    tw = (CONTENT_W - 6 * mm) / 3
    inner_w = tw - 16
    heights = []
    for k, t, d in cards:
        h = (
            6 * mm
            + 10
            + measure(c, t, F["sansSemi"], BODY, LEAD, inner_w)
            + 4
            + measure(c, d, F["sans"], BODY, LEAD, inner_w)
            + 6 * mm
        )
        heights.append(h)
    th = max(heights)
    for i, (k, t, d) in enumerate(cards):
        x = INNER + i * (tw + 3 * mm)
        card(c, x, y - th, tw, th, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
        draw_str(c, k, x + 8, y - 5.6 * mm, F["sansSemi"], 7.4, GOLD, tracking=1.1)
        yy = y - 10.5 * mm
        used = para(c, t, x + 8, yy, F["sansSemi"], BODY, LEAD, inner_w, FOREST)
        yy -= used + 3.5
        para(c, d, x + 8, yy, F["sans"], BODY, LEAD, inner_w, MUTED)
    y -= th + 6.5 * mm

    kicker(c, "Five values on this Plan", INNER, y)
    y -= 8 * mm
    vals = [
        ("Humanity", "Goal 3: dignity in kitchens and the first 1 000 days — a plate and a livelihood path, not a grant we set."),
        ("Innovation", "Enabler C and Goal 1.2: lots, ambient plates, SchoolAdvisor gates. Not BAS or LOGIS."),
        ("Integrity", "Labelled figures. Programme-reported until audited. No awarded-tender claim."),
        ("Excellence", "HACCP, published certifications, Super-Cube® for the people who run the protocol."),
        ("Impact", "PMO under Enabler A. Scale only after a closed KZN circuit holds."),
    ]
    vw = (CONTENT_W - 8 * mm) / 5
    inner_v = vw - 12
    vh = max(
        5.2 * mm
        + measure(c, t, F["sansSemi"], BODY, LEAD, inner_v)
        + 3
        + measure(c, d, F["sans"], CAPTION, CAPTION_LEAD, inner_v)
        + 5 * mm
        for t, d in vals
    )
    for i, (t, d) in enumerate(vals):
        x = INNER + i * (vw + 2 * mm)
        card(c, x, y - vh, vw, vh, fill=white, stroke=GOLD, sw=0.4, bar=True)
        used = para(c, t, x + 6, y - 5.4 * mm, F["sansSemi"], BODY, LEAD, inner_v, FOREST)
        para(c, d, x + 6, y - 5.4 * mm - used - 2.5, F["sans"], CAPTION, CAPTION_LEAD, inner_v, MUTED)
    c.showPage()


# ---------------------------------------------------------------------------
# Feed · Educate · Empower
# ---------------------------------------------------------------------------
def page_missions(c):
    y = chrome(c, 5, "Feed · Educate · Empower")
    kicker(c, "05  ·  How the Group mission serves the Department’s Goals", INNER, y)
    y -= 8.5 * mm
    y = quote_box(
        c,
        y,
        "Feed · Educate · Empower is not a slogan beside the Plan. It is the way nine pillars become one delivery against Goals 1–3 and Enablers A–C.",
    )
    missions = [
        ("01  FEED", "Agri · Foods",
         "Regenerative production and fortified nutrition — farm gate to school kitchen.",
         "Goal 1: hubs, markets, smallholder lots, traders. Goals 2–3: affordable plates, NSNP, ECD, CNDC, complementary feeding. Agri opens the lot. Foods mills the plate."),
        ("02  EDUCATE", "Leadership · Super-Cube®",
         "Whole-person leadership for public servants, kitchen teams and implementers.",
         "Goal 2.3 behavioural change and Enabler C capacity. Coordination becomes a skill, not a meeting. We do not write the national SBCC or the Grade 1–12 curriculum."),
        ("03  EMPOWER", "Connect · Direct · Access · Global",
         "Last-mile rails, capital access, verified trade and corridors.",
         "Goal 1.2 invoices that survive PFMA. Goals 1.1 and 1.4: IDP/DDM nodes and trader infrastructure. Enabler B: capital behind a lawful buy. Global waits for a closed circuit."),
    ]
    tw = (CONTENT_W - 6 * mm) / 3
    inner_w = tw - 16
    heights = []
    for k, pil, blurb, nda in missions:
        h = (
            6 * mm
            + 10
            + measure(c, pil, F["sansSemi"], BODY, LEAD, inner_w)
            + 3.5
            + measure(c, blurb, F["sans"], BODY, LEAD, inner_w)
            + 4
            + measure(c, nda, F["sans"], BODY, LEAD, inner_w)
            + 6 * mm
        )
        heights.append(h)
    th = max(heights)
    for i, (k, pil, blurb, nda) in enumerate(missions):
        x = INNER + i * (tw + 3 * mm)
        card(c, x, y - th, tw, th, fill=white, stroke=GOLD, sw=0.4, bar=True)
        draw_str(c, k, x + 8, y - 5.6 * mm, F["sansSemi"], 7.4, GOLD, tracking=1.0)
        yy = y - 10.5 * mm
        used = para(c, pil, x + 8, yy, F["sansSemi"], BODY, LEAD, inner_w, FOREST)
        yy -= used + 3.2
        used = para(c, blurb, x + 8, yy, F["sans"], BODY, LEAD, inner_w, INK)
        yy -= used + 4
        para(c, nda, x + 8, yy, F["sans"], BODY, LEAD, inner_w, MUTED)
    y -= th + 5.5 * mm
    cross = (
        "Impact is the PMO — Enabler A, one programme, one risk register. Foundation channels 10% of group profits with proof. Complementary CSI — not a substitute for the fiscus or SASSA."
    )
    ch = 6 * mm + 10 + measure(c, cross, F["sans"], BODY, LEAD, CONTENT_W - 20) + 5.5 * mm
    rrect(c, INNER, y - ch, CONTENT_W, ch, RADIUS, fill=FOREST, stroke=None)
    draw_str(c, "CROSS-CUTTING  ·  IMPACT  ·  FOUNDATION", INNER + 10, y - 5.6 * mm, F["sansSemi"], 7.4, GOLD_LT, tracking=1.0)
    para(c, cross, INNER + 10, y - 11.5 * mm, F["sans"], BODY, LEAD, CONTENT_W - 20, white)
    c.showPage()


# ---------------------------------------------------------------------------
# Game-changer cards
# ---------------------------------------------------------------------------
def draw_gc(c, y, n, title, asks, deliver, limit) -> float:
    pad = 7.5
    pw = CONTENT_W - 18
    num_w = c.stringWidth(n + "  ", F["sansSemi"], BODY) + 2
    title_w = CONTENT_W - 18 - num_w
    th = measure(c, title, F["sansSemi"], BODY, LEAD, title_w)
    ah = measure(c, "Plan: " + asks, F["sans"], BODY, LEAD, pw)
    dh = measure(c, "Big Five: " + deliver, F["sans"], BODY, LEAD, pw)
    lh = measure(c, limit, F["sansItalic"], CAPTION, CAPTION_LEAD, pw)
    h = 5.4 * mm + th + 3.5 + ah + 3.2 + dh + 3.2 + lh + 5.2 * mm
    card(c, INNER, y - h, CONTENT_W, h, fill=white, stroke=GOLD, sw=0.45, bar=True)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], BODY)
    c.drawString(INNER + pad, y - 5.4 * mm, n)
    para(c, title, INNER + pad + num_w, y - 5.4 * mm, F["sansSemi"], BODY, LEAD, title_w, FOREST)
    y_body = y - 5.4 * mm - th - 3.5
    para(c, "Plan: " + asks, INNER + pad, y_body, F["sans"], BODY, LEAD, pw, MUTED)
    para(c, "Big Five: " + deliver, INNER + pad, y_body - ah - 3.2, F["sans"], BODY, LEAD, pw, INK)
    para(c, limit, INNER + pad, y_body - ah - 3.2 - dh - 3.2, F["sansItalic"], CAPTION, CAPTION_LEAD, pw, FOREST)
    return y - h - GAP


def page_goal_head(c, num, running, kicker_t, title, rationale):
    y = chrome(c, num, running)
    kicker(c, kicker_t, INNER, y)
    y -= 10 * mm
    used = para(c, title, INNER, y, F["sansSemi"], 15.5, 20, CONTENT_W, FOREST, tracking=-0.25)
    y -= used + 3.2 * mm
    used = para(c, rationale, INNER, y, F["sans"], BODY, LEAD, CONTENT_W, MUTED)
    y -= used + 4.5 * mm
    return y


def page_g1a(c):
    y = page_goal_head(
        c,
        6,
        "Goal 1 — local agri-food system",
        "06  ·  Goal 1  ·  Game Changers 1.1–1.2",
        "Transformation of the local agri-food system to be sustainable, diversified, and inclusive",
        "Lead: Agriculture. GHS 2024: 22.2% of households still have inadequate food access. Framework: 1 / 3 / 5 new agri-hubs and produce markets per municipality by 2029 / 2033 / 2037.",
    )
    y = metric_row(
        c,
        y,
        [
            ("22.2%", "Inadequate household food access", "GHS 2024"),
            ("10%", "Smallholder procurement by 2029", "Framework"),
            ("20%", "Smallholder procurement by 2033", "Framework"),
            ("30%", "Smallholder procurement by 2037", "Framework"),
        ],
    )
    y = draw_gc(
        c, y, "1.1",
        "Local food value chains — agri-hubs, produce markets, distribution centres",
        "Municipal spatial planning for agri-hubs, produce markets and distribution centres; revitalise with the private sector; producer-development support.",
        "Direct specifies a costed IDP / DDM node. Agri onboard lots. Connect records identity, GPS and hold. Foods mills. 90-day return: costed node pack.",
        "Limit: we do not claim a national agri-hub build-out. Demonstration first.",
    )
    y = draw_gc(
        c, y, "1.2",
        "Government food procurement from local smallholder producers",
        "Link public kitchens to local markets. Review procurement so smallholders survive the rules. Target: 10% / 20% / 30% of the food-procurement budget.",
        "Connect: lots and invoices so the 10% target survives PFMA. Foods: 5 kg institutional SKUs. 90-day ask 3: PFMA/MFMA workstream.",
        "Limit: Treasury and DoA lead policy. We make a lot those rules can buy.",
    )
    c.showPage()


def page_g1b(c):
    y = page_goal_head(
        c,
        7,
        "Goal 1 — production and informal trade",
        "07  ·  Goal 1  ·  Game Changers 1.3–1.4",
        "Urban and peri-urban production, informal traders and spaza shops",
        "Goal 1 continues: production on municipal and customary land, and a hygienic informal market. Framework XX cells are not invented here.",
    )
    y = draw_gc(
        c, y, "1.3",
        "Urban and peri-urban household and smallholder production",
        "Extension, farmer support, land access through municipal spatial plans, tenure that can underpin loans. Register targets: +10% / +25% / +50% by 2029 / 2033 / 2037.",
        "Agri trains producers as suppliers. Super-Cube® forms implementers. Access finances offtake where tenure is defendable. Connect is a verified network, not a mailing list.",
        "Limit: we do not allocate land. COGTA, SALGA and traditional authorities lead. We take a verified producer into trade.",
    )
    y = draw_gc(
        c, y, "1.4",
        "Informal traders and spaza shops — infrastructure and healthy food",
        "Trading space with storage, water, energy and security; sale of local produce and healthy food; health-and-safety that fits informal operations.",
        "Direct: SANTACO-rank and rural node spec (15 000 containers is pathway design). Foods: ambient SKUs without a cold chain. Connect: HACCP holds.",
        "Limit: SALGA / COGTA lead by-laws. DoH leads norms. We specify a node and a plate those norms can use.",
    )
    c.showPage()


def page_g2(c):
    y = page_goal_head(
        c,
        8,
        "Goal 2 — equitable access",
        "08  ·  Goal 2  ·  Game Changers 2.1–2.3",
        "Equitable and dignified individual, household and community access to nutritious, safe, affordable, and healthy food",
        "Leads: Treasury (affordability), DoH (regulation), GCIS / DBE (behaviour).",
    )
    y = metric_row(
        c,
        y,
        [
            ("17.6%", "Below the food poverty line", "Poverty Trends 2025"),
            ("60%", "Households above FPL by 2029", "Framework target"),
            ("~R1.10–2.50", "Institutional meal cost points", "Group, approximate"),
        ],
    )
    y = draw_gc(
        c, y, "2.1",
        "Affordable healthy food in the local food environment",
        "Price stabilisation, VAT methodology, food-waste redirection, possible national food reserve. Targets: 60% / 70% / 80% of households above the food poverty line.",
        "Foods: ~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot (internal comparison). Ambient 24-month shelf life. 90-day return: three-menu basket versus a reference school meal.",
        "Limit: Treasury leads VAT, subsidies and a food reserve. We put a costed plate on the table.",
    )
    y = draw_gc(
        c, y, "2.2–2.3",
        "Regulate the food environment and shift behaviour toward healthy diets",
        "Front-of-pack labelling, advertising rules, school-ground norms; a costed SBCC and nutrition in the Grade 1–12 curriculum.",
        "SchoolAdvisor gates kitchens and vendors (no learner names). Super-Cube® forms implementers. Instant fortified porridge: water or milk, under a minute. OnePot ~20 minutes. Foundation CSI is complementary, not a curriculum.",
        "Limit: DoH gazettes FoP. DBE and GCIS lead school norms and SBCC. We run the gate and the plate.",
    )
    c.showPage()


def page_g3(c):
    y = page_goal_head(
        c,
        9,
        "Goal 3 — protection of the vulnerable",
        "09  ·  Goal 3  ·  Game Changers 3.1–3.3",
        "Mitigate risks to the most vulnerable through social, livelihood, and nutrition protection",
        "Leads: DSD / SASSA, DoH and DBE. NFNSS 2023: about 29% of children under five stunted (Framework baseline 27%).",
    )
    y = metric_row(
        c,
        y,
        [
            ("~29%", "Children under five stunted", "NFNSS 2023"),
            ("< 1 min", "Instant fortified porridge — water or milk", "Product specification"),
            ("355 000", "Meals, programme-reported", "Group site"),
        ],
    )
    y = draw_gc(
        c, y, "3.1",
        "Strengthened social-support systems",
        "A social-security net aimed at ending food insecurity; livelihood pathways; close holiday and seasonal gaps.",
        "Offtake so a grant household can become a supplier. CNDC and holiday packs. Foundation CSI is complementary — not a substitute for SASSA.",
        "Limit: DSD, SASSA and Treasury lead grant levels. We do not set the Child Support Grant.",
    )
    y = draw_gc(
        c, y, "3.2–3.3",
        "High-impact nutrition and the first 1 000 days",
        "NSNP, ECD, CNDC, fortification, holiday referrals. Complementary feeding 6–23 months in 50% then 100% of high-risk areas. Any voucher instrument is DSD lead.",
        "Instant fortified porridge is the malnutrition plate: add water or milk; ready in under a minute. No stove cycle, no cold chain, no trained cook. One SKU family across NSNP, ECD, CNDC and holiday packs. SchoolAdvisor: lot-and-kitchen proof. No learner names.",
        "Limit: 2.5 million children per day is a DBE-pathway plan, not current headcount. We do not issue nutrition vouchers.",
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Enablers
# ---------------------------------------------------------------------------
def page_enablers(c):
    y = chrome(c, 10, "Enablers A–C — official titles")
    kicker(c, "10  ·  Governance, resourcing, capacity and data", INNER, y)
    y -= 8 * mm
    used = para(
        c,
        "In the official Plan, Enabler B is resourcing — not MELIA. Enabler C is capacity, innovation and technological support, and it is Enabler C that carries data and MELIA. This page uses those titles.",
        INNER,
        y,
        F["sans"],
        BODY,
        LEAD,
        CONTENT_W,
        MUTED,
    )
    y -= used + 5 * mm
    y = draw_gc(
        c, y, "A",
        "Multi-actor food-system governance",
        "NFNS Council, IMC on Poverty, Premier and Mayoral committees, a Food and Nutrition Security Bill, IDP / DDM One Plans, quarterly round tables.",
        "Impact as PMO. 90-day asks 1 and 5: closed TWG briefing and a seat at Framework tables. Return: draft municipal SLA for an IDP/SDBIP annex.",
        "Limit: we do not appoint the Council or draft the Act. COGTA and SALGA lead the local mandate.",
    )
    y = draw_gc(
        c, y, "B–C",
        "Resourcing, capacity, innovation and MELIA",
        "Enabler B is resourcing (costing, DFIs, 50% then 100% of unfunded activities). Enabler C is capacity and data — MELIA sits here, not under B.",
        "Access and Foundation finance offtake. Super-Cube® forms people. SupplierAdvisor® extracts sit inside MELIA. Lot-and-kitchen proof. No learner names.",
        "Limit: we do not reallocate votes. SupplierAdvisor® does not replace BAS or LOGIS.",
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Pillars / circuit
# ---------------------------------------------------------------------------
def page_pillars(c):
    y = chrome(c, 11, "Nine pillars as one circuit")
    kicker(c, "11  ·  Nine pillars as one circuit", INNER, y)
    y -= 8 * mm
    used = para(
        c,
        "The Department does not need nine vendors. It needs one circuit mapped to the Plan’s Game Changers: Agri opens a lot (1.3), Connect proves it for the 10% target (1.2), Foods mills a plate (Goals 2–3), Direct moves it to hub, market, rank and kitchen (1.1, 1.4). Leadership forms people. Impact reports programme-reported until audited.",
        INNER,
        y,
        F["sansItalic"],
        BODY,
        LEAD,
        CONTENT_W,
        FOREST,
    )
    y -= used + 4.5 * mm

    steps = [
        ("01", "Agri", "Smallholders onboard with practice, soil and identity. Grain is a lot, not a donation."),
        ("02", "Connect", "SupplierAdvisor® records the lot, the invoice, the hold. BAS/LOGIS stay."),
        ("03", "Foods", "The mill turns the lot into a fortified ambient plate."),
        ("04", "Direct", "The plate moves to school, ECD, CNDC, rank and rural node."),
        ("05", "People", "Leadership runs the kitchen. Impact reports programme-reported until audited."),
    ]
    tw = (CONTENT_W - 8 * mm) / 5
    inner_s = tw - 10
    sh = max(
        5 * mm
        + 9
        + 11
        + measure(c, d, F["sans"], 7.2, 10.0, inner_s)
        + 4.5 * mm
        for _, _, d in steps
    )
    for i, (n, t, d) in enumerate(steps):
        x = INNER + i * (tw + 2 * mm)
        card(c, x, y - sh, tw, sh, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
        c.setFillColor(GOLD)
        c.setFont(F["sansSemi"], 7)
        c.drawString(x + 5.5, y - 5 * mm, n)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9)
        c.drawString(x + 5.5, y - 9.2 * mm, t)
        para(c, d, x + 5.5, y - 14 * mm, F["sans"], 7.2, 10.0, inner_s, MUTED)
    y -= sh + 6 * mm

    kicker(c, "Nine pillars — what each does for NDA", INNER, y)
    y -= 8 * mm
    pillars = [
        ("Agri", "Feed", "Goal 3 — the 10% smallholder target has no meaning without producers who can invoice."),
        ("Foods", "Feed", "Goals 1 and 2 — the plate. Certifications as published on bigfivegroup.africa/foods."),
        ("Leadership", "Educate", "Goal 2 agency + Enabler A — programmes fail when people are unformed."),
        ("Connect", "Empower", "Goal 3 proof + Enablers B and C — the OS the Plan can actually use. Not BAS/LOGIS."),
        ("Direct", "Empower", "Goal 1 access — 15 000 containers is pathway design, to be measured."),
        ("Access", "Empower", "Enabler C — capital behind a lawful buy."),
        ("Impact", "Cross-cut", "Enabler A — one PMO, not nine slide decks."),
        ("Foundation", "Cross-cut", "Goal 2 complementary feeding CSI — 10% of group profits, standing policy."),
        ("Global", "Empower", "After a closed KZN circuit — not a current scale claim."),
    ]
    col_w = (CONTENT_W - 6 * mm) / 3
    inner_p = col_w - 12
    ph = max(
        4.6 * mm
        + 8
        + 11
        + measure(c, d, F["sans"], 7.4, 10.2, inner_p)
        + 4.2 * mm
        for _, _, d in pillars
    )
    for i, (t, mission, d) in enumerate(pillars):
        col, row = i % 3, i // 3
        x = INNER + col * (col_w + 3 * mm)
        ty = y - row * (ph + 3 * mm)
        card(c, x, ty - ph, col_w, ph, fill=white, stroke=GOLD, sw=0.4, bar=True)
        draw_str(c, mission.upper(), x + 6, ty - 4.6 * mm, F["sansSemi"], 6.4, GOLD, tracking=0.8)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9.5)
        c.drawString(x + 6, ty - 9.2 * mm, t)
        para(c, d, x + 6, ty - 13.6 * mm, F["sans"], 7.4, 10.2, inner_p, MUTED)
    y -= 3 * (ph + 3 * mm) + 2.5 * mm

    kicker(c, "Where each pillar sits on the Plan", INNER, y)
    y -= 7 * mm
    cols = ["G1 Agri-food", "G2 Access", "G3 Protect", "EA Gov.", "EB Resource", "EC Cap/data"]
    rows = [
        ("Agri", [1, 0, 1, 0, 0, 1]),
        ("Foods", [1, 1, 1, 0, 0, 1]),
        ("Leadership", [1, 1, 1, 1, 0, 1]),
        ("Connect", [1, 1, 1, 0, 1, 1]),
        ("Direct", [1, 1, 1, 1, 0, 0]),
        ("Access", [1, 0, 0, 0, 1, 0]),
        ("Impact", [1, 0, 1, 1, 1, 1]),
        ("Foundation", [0, 1, 1, 0, 1, 0]),
        ("Global", [0, 0, 0, 0, 0, 0]),
    ]
    name_w = 28 * mm
    cell_w = (CONTENT_W - name_w) / 6
    row_h = 5.0 * mm
    head_h = 6.0 * mm
    table_h = head_h + row_h * len(rows)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, RADIUS, fill=white, stroke=GOLD, sw=0.4)
    c.setFillColor(CREAM)
    c.roundRect(INNER, y - head_h, CONTENT_W, head_h, RADIUS, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h / 2, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], 6)
    c.drawString(INNER + 5, y - 4.6, "PILLAR")
    for i, lab in enumerate(cols):
        c.drawCentredString(INNER + name_w + i * cell_w + cell_w / 2, y - 4.6, lab)
    yy = y - head_h
    for i, (name, marks) in enumerate(rows):
        if i % 2:
            c.setFillColor(SOFT)
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 7)
        c.drawString(INNER + 5, yy - 4.0, name)
        for j, m in enumerate(marks):
            cx = INNER + name_w + j * cell_w + cell_w / 2
            if m:
                c.setFillColor(GOLD)
                c.circle(cx, yy - 2.8, 2.0, fill=1, stroke=0)
            else:
                c.setFillColor(RULE)
                c.setFont(F["sans"], 7)
                c.drawCentredString(cx, yy - 4.0, "–")
        yy -= row_h
    cap_y = y - table_h - 4.5
    if cap_y > BODY_BOTTOM - 1:
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 7)
        c.drawString(INNER, cap_y, "Gold mark = primary contribution. Global is held until a closed KZN circuit — not a current scale claim.")
    c.showPage()


# ---------------------------------------------------------------------------
# Why now / who we are
# ---------------------------------------------------------------------------
def page_why(c):
    y = chrome(c, 12, "Why now  ·  reading the Plan  ·  who we are")
    kicker(c, "12  ·  Why now — the Plan’s own numbers", INNER, y)
    y -= 8 * mm
    why = [
        ("Access is not improving fast enough", "GHS 2024: 22.2% of households have inadequate or severely inadequate food access. Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%.", "GHS 2024, as cited in NFNSP-2"),
        ("Stunting remains a first-1 000-days crisis", "NFNSS 2023: about 29% of children under five stunted; 15% severely. Framework working baseline: 27%. Complementary feeding target: 50% of high-risk areas by 2029.", "NFNSS 2023  ·  Framework 27 Aug 2026"),
        ("Poverty is young", "Poverty Trends 2025: 17.6% of people below the food poverty line of R777 per person per month (2023 prices). 71% of the poor in 2023 were under 35.", "Poverty Trends 2025, as cited in the Plan"),
        ("Procurement must reach smallholders", "Plan targets: 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement. That target only survives PFMA if lots, invoices and identity are real.", "NFNSP-2 procurement horizons"),
    ]
    for t, d, src in why:
        pw = CONTENT_W - 16
        h = 5 * mm + 12 + measure(c, d, F["sans"], BODY, LEAD, pw) + 10 + 4.5 * mm
        card(c, INNER, y - h, CONTENT_W, h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], BODY)
        c.drawString(INNER + 8, y - 5.4 * mm, t)
        para(c, d, INNER + 8, y - 10.6 * mm, F["sans"], BODY, LEAD, pw, MUTED)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 7.4)
        c.drawString(INNER + 8, y - h + 4.2 * mm, src)
        y -= h + 3.4 * mm

    y -= 1.5 * mm
    kicker(c, "Reading the Plan", INNER, y)
    y -= 8 * mm
    used = para(
        c,
        "NFNSP-2 Draft 2 (July 2026, internal discussion) and the Results Framework of 27 August 2026 are the source documents. Official Goal, Enabler and Game-changer titles are used in full. The 90-day ask is a seat at the Framework’s private-sector round tables — not a claim that they have already been held with Big Five. Several Framework cells remain XX and are not invented here.",
        INNER,
        y,
        F["sans"],
        BODY,
        LEAD,
        CONTENT_W,
        INK,
    )
    y -= used + 5 * mm
    kicker(c, "Who we are", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Big Five Group (Pty) Ltd — KwaZulu-Natal. Feed (Foods, Agri, Direct), Educate (Super-Cube®), Empower (SupplierAdvisor®, Foundation, Impact). Dr. Craig R. Muller, Founder — craig@bigfivegroup.africa  ·  +27 (0) 82 581 4215. This is a private partner workspace for the NFNSP Technical Working Group / Department of Agriculture. It does not speak for the Department.",
        INNER,
        y,
        F["sans"],
        BODY,
        LEAD,
        CONTENT_W,
        INK,
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Foods / workstreams / demonstration
# ---------------------------------------------------------------------------
def page_foods(c):
    y = chrome(c, 13, "Foods  ·  workstreams  ·  demonstration")
    kicker(c, "13  ·  Big Five Foods — labelled Group figures", INNER, y)
    y -= 7.5 * mm
    para(
        c,
        "One SKU family across NSNP, ECD, CNDC and holiday packs. Instant fortified porridge is the malnutrition plate: add water or milk; ready in under a minute. Ambient, fortified, institutional 5 kg formats where school- or clinic-linked.",
        INNER,
        y,
        F["sans"],
        BODY,
        LEAD,
        CONTENT_W,
        MUTED,
    )
    y -= 16 * mm
    y = metric_row(
        c,
        y,
        [
            ("< 1 min", "Instant fortified porridge — water or milk", "Product specification"),
            ("~R1.10–2.50", "Institutional meal cost points", "Approximate"),
            ("24 mo", "Ambient shelf life", "Product specification"),
            ("74% / 185%", "Nutrition / fortification", "Formulation; lab pack 90 days"),
        ],
    )
    cert_h = 12.5 * mm
    card(c, INNER, y - cert_h, CONTENT_W, cert_h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], BODY)
    c.drawString(INNER + 8, y - 5.6 * mm, "ISO 9001, FSSC 22000, Sedex, SANHA Halaal, Kosher, SAAFoST")
    c.setFillColor(MUTED)
    c.setFont(F["sansItalic"], CAPTION)
    c.drawString(INNER + 8, y - 10.2 * mm, "As published on bigfivegroup.africa/foods")
    y -= cert_h + 5 * mm

    kicker(c, "Five workstreams A–E", INNER, y)
    y -= 7.5 * mm
    ws = [
        ("A", "Plates", "Instant fortified porridge (water or milk, under a minute) plus soya, OnePot, soups. 5 kg institutional packs."),
        ("B", "Markets", "Costed container / micro-hub spec for an IDP / DDM One Plan. SANTACO rank + rural nodes."),
        ("C", "Producers", "SupplierAdvisor® identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("D", "Agency", "Instant fortified porridge (water or milk, under a minute); ~20-minute OnePot; complementary feeding. Super-Cube®."),
        ("E", "OS", "Onboarding, FNB/BankLink feeds, SchoolAdvisor gates, POPIA MELIA extract. No learner names."),
    ]
    for letter, t, d in ws:
        y = numbered_card(c, y, letter, t, d, size=9.4, lead=13.2)

    y -= 1 * mm
    kicker(c, "Demonstration design", INNER, y)
    y -= 7.5 * mm
    demo = (
        "Phase 1: two KZN local municipalities + one metro cluster (rural Zululand-type, peri-urban, dense informal-trade node in eThekwini or Msunduzi). "
        "Phase 2: a second high-inadequacy province (Eastern Cape is the Plan’s own reference). Scale only after a closed circuit holds."
    )
    quote_box(c, y, demo)
    c.showPage()


# ---------------------------------------------------------------------------
# OS
# ---------------------------------------------------------------------------
def page_os(c):
    y = chrome(c, 14, "SupplierAdvisor® farm-to-fork OS")
    kicker(c, "14  ·  Operating system", INNER, y)
    y -= 8 * mm
    draw_str(c, "One workspace: network, buy, make, hold, ship, pay, prove", INNER, y, F["sansSemi"], 13.5, FOREST, tracking=-0.25)
    y -= 8 * mm
    y = quote_box(
        c,
        y,
        "SupplierAdvisor® does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have.",
        size=BODY,
        lead=LEAD,
    )
    mods = [
        "Verified network + OTIFEF",
        "POs, invoices, lot holds",
        "Inventory",
        "BOM / MPS / MRP",
        "GPS shipping",
        "HACCP holds that stop ship",
        "SHEQ",
        "SchoolAdvisor",
        "ContainerAdvisor®",
        "Full GL / AR / AP / VAT",
        "FNB Integration Channel + BankLink",
        "Yoco-class last-mile acceptance",
    ]
    tw = (CONTENT_W - 8 * mm) / 3
    chip_h = 9.2 * mm
    chip_gap = 2.8 * mm
    for i, m in enumerate(mods):
        col, row = i % 3, i // 3
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * (chip_h + chip_gap)
        card(c, x, ty - chip_h, tw, chip_h, fill=CREAM, stroke=GOLD, sw=0.35, bar=False, radius=2.8 * mm)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8)
        c.drawString(x + 6, ty - 6.0, m)
    y -= 4 * (chip_h + chip_gap) + 3 * mm

    kicker(c, "Actor table — farm to fork", INNER, y)
    y -= 6.5 * mm
    actors = [
        ("Smallholder", "Identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("Aggregation hub", "Receive, grade, lot, hold."),
        ("Foods mill", "BOM, MPS, MRP, HACCP, ship-or-hold."),
        ("Trader / distributor", "OTIFEF, inventory, invoices."),
        ("School / ECD / CNDC", "SchoolAdvisor gates. Lot-and-kitchen proof. No learner names."),
        ("Municipality / Treasury", "SLA, IDP/SDBIP annex, PFMA/MFMA workstream."),
        ("Bank / CSI / DFI", "FNB Integration Channel and BankLink feeds where selected."),
    ]
    head_h, row_h = 6.8 * mm, 8.8 * mm
    table_h = head_h + row_h * len(actors)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, RADIUS, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.roundRect(INNER, y - head_h, CONTENT_W, head_h, RADIUS, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h / 2, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], 6.4)
    c.drawString(INNER + 8, y - 4.6, "ACTOR")
    c.drawString(INNER + 58 * mm, y - 4.6, "ROLE IN THE CIRCUIT")
    yy = y - head_h
    for i, (a, r) in enumerate(actors):
        if i % 2:
            c.setFillColor(SOFT)
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8.2)
        c.drawString(INNER + 8, yy - 5.6, a)
        para(c, r, INNER + 58 * mm, yy - 5.6, F["sans"], 8.0, 10.2, CONTENT_W - 66 * mm, MUTED)
        yy -= row_h
    c.showPage()


# ---------------------------------------------------------------------------
# 90-day ask
# ---------------------------------------------------------------------------
def page_ask(c):
    y = chrome(c, 15, "90-day ask")
    kicker(c, "15  ·  Five asks", INNER, y)
    y -= 8 * mm
    y = quote_box(
        c,
        y,
        "What is asked in 90 days is a closed briefing, a named province, a lawful buying path, a MELIA protocol, and a seat at the tables already written into the Framework. Scale only after a closed circuit holds.",
    )
    asks = [
        ("01", "Closed technical briefing", "NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD nutrition, KZN Provincial Treasury, SALGA KZN."),
        ("02", "Name KwaZulu-Natal", "Joint demonstration province — two local municipalities + one metro cluster."),
        ("03", "PFMA / MFMA workstream", "Time-boxed: how a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target actually requires."),
        ("04", "Data protocol", "SupplierAdvisor® extracts sit inside MELIA, not beside it. No learner names."),
        ("05", "A seat at the tables", "Private-sector round tables / municipal roadshows the 27 August 2026 Framework is written for."),
    ]
    for n, t, d in asks:
        y = numbered_card(c, y, n, t, d, size=9.4, lead=13.2)

    y -= 1.5 * mm
    kicker(c, "In return (90 days)", INNER, y)
    y -= 7.5 * mm
    ret = [
        "Costed node pack",
        "Three-menu institutional basket vs a reference school meal",
        "Producer-onboarding protocol",
        "Draft municipal SLA for an IDP/SDBIP annex",
        "One-page risk register",
    ]
    tw = (CONTENT_W - 8 * mm) / 2
    chip_h = 10 * mm
    for i, item in enumerate(ret):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * (chip_h + 2.8 * mm)
        w = tw if not (i == 4) else tw
        card(c, x, ty - chip_h, w, chip_h, fill=CREAM, stroke=GOLD, sw=0.4, bar=False, radius=2.8 * mm)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8.4)
        c.drawString(x + 7, ty - 6.4, item)
    c.showPage()


# ---------------------------------------------------------------------------
# Close
# ---------------------------------------------------------------------------
def page_close(c):
    y = chrome(c, 16, "Risk  ·  labelled figures  ·  conclusion")
    kicker(c, "16  ·  Governance and risk — what this briefing is not", INNER, y)
    y -= 8 * mm
    risks = [
        ("Presented as an awarded NSNP contract", "This briefing is a proposal. No government contract is claimed."),
        ("2.5 million daily meals read as current", "Labelled as DBE-pathway plan, not current headcount."),
        ("BAS / LOGIS replacement fear", "Explicit non-claim: SupplierAdvisor® does not replace BAS or LOGIS."),
        ("Learner data in MELIA extract", "Lot-and-kitchen proof only. No learner names. POPIA purpose-limited."),
        ("PFMA / MFMA cannot buy the meal", "90-day time-boxed legal workstream is ask 3 — before scale."),
    ]
    head_h, row_h = 6.8 * mm, 9.4 * mm
    table_h = head_h + row_h * len(risks)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, RADIUS, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.roundRect(INNER, y - head_h, CONTENT_W, head_h, RADIUS, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h / 2, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], 6.4)
    c.drawString(INNER + 8, y - 4.6, "RISK")
    c.drawString(INNER + 82 * mm, y - 4.6, "MITIGATION")
    yy = y - head_h
    for i, (risk, mit) in enumerate(risks):
        if i % 2:
            c.setFillColor(SOFT)
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8)
        para(c, risk, INNER + 8, yy - 6.0, F["sansSemi"], 8, 10.4, 70 * mm, FOREST)
        para(c, mit, INNER + 82 * mm, yy - 6.0, F["sans"], 8, 10.4, CONTENT_W - 90 * mm, MUTED)
        yy -= row_h
    y -= table_h + 6 * mm

    kicker(c, "Commercial model — labelled Group figures, not government contracts", INNER, y)
    y -= 7.5 * mm
    commercial = [
        ("355 000 meals", "Programme-reported, not audited public stats"),
        ("2.5 million children / day", "DBE-pathway delivery plan, not current headcount"),
        ("15 000 SANTACO containers", "Pathway design"),
        ("~20 jobs per mature node", "Design intent, to be measured"),
        ("10% of group profits to Foundation", "Standing Group policy"),
    ]
    tw = (CONTENT_W - 5 * mm) / 2
    chip_h = 14 * mm
    for i, (t, lab) in enumerate(commercial):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 5 * mm)
        ty = y - row * (chip_h + 3 * mm)
        w = tw if i < 4 else CONTENT_W
        if i == 4:
            x = INNER
        card(c, x, ty - chip_h, w, chip_h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9.5)
        c.drawString(x + 8, ty - 6.2 * mm, t)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 7.6)
        c.drawString(x + 8, ty - 11.2 * mm, lab)
    y -= 3 * (chip_h + 3 * mm) + 1.5 * mm

    kicker(c, "Conclusion", INNER, y)
    y -= 7.5 * mm
    close = (
        "The Plan has named Goals, Game Changers and Enablers. The Group has plates, an operating system, and a demonstration design mapped to each of them. "
        "What is asked in 90 days is a closed briefing, a named province, a lawful buying path for Game Changer 1.2, a MELIA protocol, and a seat at the tables already written into the Framework. "
        "Nothing here is an awarded tender, a current daily NSNP headcount, a replacement for BAS or LOGIS, or a claim to gazette VAT, grants or a Food and Nutrition Security Act."
    )
    y = quote_box(c, y, close)
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], 8)
    c.drawString(INNER, y, "Dr. Craig R. Muller  ·  craig@bigfivegroup.africa  ·  +27 (0) 82 581 4215  ·  bigfivegroup.africa")
    c.showPage()


def build():
    global NDA_PLATE, BFG_PLATE, HERO_IMG, FOOTER_IMG
    NDA_PLATE = plate(NDA, 1200, 380, pad=10)
    BFG_PLATE = plate(BFG, 480, 480, pad=6)
    HERO_IMG = make_hero()
    FOOTER_IMG = make_footer_band()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("NFNSP-2 Implementation Partnership Proposal · Big Five Group")
    c.setAuthor("Big Five Group (Pty) Ltd")
    c.setSubject("Confidential partner briefing — not an awarded tender")
    c.setKeywords("NFNSP, Department of Agriculture, Big Five Foods, SupplierAdvisor")
    page_cover(c)
    page_contents(c)
    page_exec(c)
    page_purpose(c)
    page_missions(c)
    page_g1a(c)
    page_g1b(c)
    page_g2(c)
    page_g3(c)
    page_enablers(c)
    page_pillars(c)
    page_why(c)
    page_foods(c)
    page_os(c)
    page_ask(c)
    page_close(c)
    c.save()
    print(f"Wrote {OUT}  ({TOTAL} pages)")


if __name__ == "__main__":
    build()
