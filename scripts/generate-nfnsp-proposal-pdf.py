#!/usr/bin/env python3
"""NFNSP-2 implementation partnership proposal — A4 portrait.

Output: private/partner-files/BigFive_NFNSP_Implementation_Partnership_Proposal.pdf
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
OUT = ROOT / "private" / "partner-files" / "BigFive_NFNSP_Implementation_Partnership_Proposal.pdf"
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
TOTAL = 22
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
    c.drawString(INNER, baseline, "CONFIDENTIAL  ·  NFNSP-2  ·  v3.7  ·  Not an awarded tender")
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


def back_to_plan(c, y):
    """Gold return link to the project-plan page, same idea as the portal."""
    label = "Project plan  ·  p.5"
    font, size = F["sansSemi"], 7.4
    c.setFont(font, size)
    w = c.stringWidth(label, font, size)
    x = INNER + CONTENT_W - w
    c.setFillColor(GOLD)
    c.drawString(x, y, label)
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.45)
    c.line(x, y - 1.05, x + w, y - 1.05)
    c.linkAbsolute("", "p05", (x - 1, y - 2.4, x + w + 1, y + 8))


OFFER_DEST = {
    "Direct": "p14",
    "Agri": "p10",
    "Connect": "p18",
    "Foods": "p16",
    "Leadership": "p17",
    "Access": "p13",
    "Foundation": "p13",
    "Impact": "p13",
}


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
    c.bookmarkPage("p01")
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
    c.bookmarkPage("p02")
    kicker(c, "02  ·  Contents", INNER, y)
    y -= 9 * mm
    toc = [
        ("01", "Cover — sourced national figures", "1"),
        ("02", "Contents and reading rules", "2"),
        ("03", "Executive summary — the case", "3"),
        ("04", "Executive summary — the circuit and the ask", "4"),
        ("05", "Gantt — every Goal linked to an offering", "5"),
        ("06", "Phase goals, deliverables and products", "6"),
        ("07", "Vision · mission · values", "7"),
        ("08", "Feed · Educate · Empower × the Plan", "8"),
        ("09", "Goal 1 — hubs and procurement (1.1–1.2)", "9"),
        ("10", "Goal 1 — producers and informal trade (1.3–1.4)", "10"),
        ("11", "Goal 2 — equitable access (2.1–2.3)", "11"),
        ("12", "Goal 3 — protection of the vulnerable (3.1–3.3)", "12"),
        ("13", "Enablers A–C — governance, resourcing, data", "13"),
        ("14", "Nine pillars as one circuit", "14"),
        ("15", "Why now · reading the Plan · who we are", "15"),
        ("16", "Foods, workstreams, demonstration", "16"),
        ("17", "Super-Cube® — Leadership", "17"),
        ("18", "Empower — Connect, the operating system", "18"),
        ("19", "Empower — Direct, Access, Global, PMO, Foundation", "19"),
        ("20", "Zulu Kingdom — Heads of Agreement in signature", "20"),
        ("21", "90-day ask and what we return", "21"),
        ("22", "Risk, labelled figures, conclusion", "22"),
    ]
    for n, t, p in toc:
        c.setStrokeColor(RULE)
        c.setLineWidth(0.35)
        c.setDash(0.7, 1.5)
        c.line(INNER + 14 * mm, y + 2, PAGE_W - INNER - 10 * mm, y + 2)
        c.setDash()
        c.setFillColor(GOLD)
        c.setFont(F["sansSemi"], 9.5)
        c.drawString(INNER, y, n)
        c.setFillColor(INK)
        c.setFont(F["sans"], 9.5)
        c.drawString(INNER + 14 * mm, y, t)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9.5)
        c.drawRightString(PAGE_W - INNER, y, p)
        c.linkAbsolute("", f"p{int(p):02d}", (INNER, y - 3, PAGE_W - INNER, y + 9))
        y -= 11.6

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
    c.bookmarkPage("p03")
    kicker(c, "03  ·  Executive summary — the case", INNER, y)
    y -= 8 * mm

    y = quote_box(
        c,
        y,
        "South Africa already has the Plan. What it does not yet have is one partner who can put a lawful plate on a table, a verified smallholder lot behind that plate, and proof that both happened — without inventing a contract, a headcount, or a law.",
    )

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
        "The source documents are NFNSP-2 Draft 2 (July 2026, internal) and the Results Framework of 27 August 2026. The operational period is 2027–2037. This proposal uses the official titles in full. Goal 1 transforms the local agri-food system so it is sustainable, diversified and inclusive. Goal 2 is equitable, dignified access to nutritious, safe, affordable food. Goal 3 protects the most vulnerable. Enabler A is multi-actor governance. Enabler B is resourcing — not MELIA. Enabler C is capacity, innovation and data, and that is where MELIA sits.",
        "Those four figures are the Plan’s own case, not ours. Household hunger is not improving fast enough. Stunting is still a first-1 000-days crisis. Poverty is young. And a 10, then 20, then 30 percent smallholder share of government food procurement only survives if the lot, the invoice and the plate are real. Framework cells left as XX are not filled in here.",
        "Big Five Group proposes to run the Game Changers a private partner can actually touch, as one circuit under Big Five Impact — the PMO — rather than as nine vendors. The Gantt on page 5 places every Goal on a year and names the offering. Pages 9 to 13 argue each Goal and Enabler. Page 6 states what each phase must deliver before the next one starts.",
    ]
    for p in paras:
        used = para(c, p, INNER, y, F["sans"], BODY, LEAD, CONTENT_W, INK)
        y -= used + 3.2 * mm

    note_box(
        c,
        y,
        "Confidential partner briefing — not a government publication and not an awarded tender. 355 000 meals is programme-reported. 2.5 million children per day is a DBE-pathway plan, not current headcount. SupplierAdvisor® does not replace BAS or LOGIS.",
    )
    c.showPage()


def page_exec_b(c):
    y = chrome(c, 4, "Executive summary")
    c.bookmarkPage("p04")
    kicker(c, "04  ·  Executive summary — the circuit and the ask", INNER, y)
    y -= 8 * mm
    y = quote_box(
        c,
        y,
        "The Department of Education has approved Big Five Foods fortified instant porridge, soya mince and OnePot meals for National School Nutrition Programme school feeding. That is menu approval. It is not an awarded NFNSP contract, and it is not a current daily headcount.",
    )
    paras = [
        "Feed is Agri, Foods and Direct. Agri verifies the producer. Foods mills the lot into an ambient plate — porridge ready in under a minute with water or milk, soya mince, OnePot, and soups in 5 kg institutional packs. Direct specifies the last-mile node: agri-hub, produce market, SANTACO rank or rural trader, written as an IDP / DDM annex rather than a national build-out.",
        "Educate is Leadership (super-cube.me). Super-Cube® has six faces — Choices, Principles, Mental, Emotional, Physical and Spiritual — with the person at the centre. It forms the public servants, kitchen teams and implementers who run the protocol. We do not write the national behaviour-change campaign or the Grade 1–12 curriculum.",
        "Empower is Connect (supplieradvisor.com), Access, Foundation and Impact. SupplierAdvisor® is one operating system: verified companies, OTIFEF scores, purchase orders, invoices and lot holds, and HACCP gates that stop a ship. SchoolAdvisor® is the kitchen gate. It does not replace BAS or LOGIS. Access and Foundation put capital and complementary CSI behind a lawful buy — Enabler B — without reallocating a vote. Impact is the single PMO: one plan, one risk register, one cadence.",
        "Ninety days is the start, not the scale. A closed technical briefing. KwaZulu-Natal named as the joint demonstration — two local municipalities and one metro cluster. A time-boxed PFMA/MFMA workstream for Game Changer 1.2. A MELIA data protocol with no learner names. A seat at the Framework’s round tables. Scale only after that circuit holds. In that province, a Heads of Agreement with the Zulu Kingdom is in the process of being signed — community and cultural buy-in, not yet executed, and not an NFNSP award.",
    ]
    for p in paras:
        used = para(c, p, INNER, y, F["sans"], BODY, LEAD, CONTENT_W, INK)
        y -= used + 3.0 * mm
    label = "The project plan overleaf is the map."
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], BODY)
    c.drawString(INNER, y, label)
    w = c.stringWidth(label, F["sansSemi"], BODY)
    c.setStrokeColor(FOREST)
    c.setLineWidth(0.5)
    c.line(INNER, y - 1.1, INNER + w, y - 1.1)
    c.linkAbsolute("", "p05", (INNER, y - 3, INNER + w, y + 11))
    c.showPage()


# ---------------------------------------------------------------------------
# Vision · mission · values
# ---------------------------------------------------------------------------
def page_purpose(c):
    y = chrome(c, 7, "Vision · mission · values")
    c.bookmarkPage("p07")
    kicker(c, "07  ·  The north star this partnership already answers to", INNER, y)
    back_to_plan(c, y)
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
    y = chrome(c, 8, "Feed · Educate · Empower")
    c.bookmarkPage("p08")
    kicker(c, "08  ·  How the Group mission serves the Department’s Goals", INNER, y)
    back_to_plan(c, y)
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
         "Six faces, the person at the centre, then the kitchen and the network.",
         "Choices, Principles, Mental, Emotional, Physical, Spiritual. Goal 2.3 and Enabler C. Not the national SBCC or the Grade 1–12 curriculum."),
        ("03  EMPOWER", "Connect · Direct · Access · Global",
         "SupplierAdvisor®: verified trade, OTIFEF, lot holds, SchoolAdvisor®.",
         "Goal 1.2 proof that survives PFMA. HACCP can stop the ship. Not BAS or LOGIS. Global waits for a closed circuit."),
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
    c.bookmarkPage(f"p{num:02d}")
    kicker(c, kicker_t, INNER, y)
    back_to_plan(c, y)
    y -= 10 * mm
    used = para(c, title, INNER, y, F["sansSemi"], 15.5, 20, CONTENT_W, FOREST, tracking=-0.25)
    y -= used + 3.2 * mm
    used = para(c, rationale, INNER, y, F["sans"], BODY, LEAD, CONTENT_W, MUTED)
    y -= used + 4.5 * mm
    return y


def page_g1a(c):
    y = page_goal_head(
        c,
        9,
        "Goal 1 — local agri-food system",
        "09  ·  Goal 1  ·  Game Changers 1.1–1.2",
        "Transformation of the local agri-food system to be sustainable, diversified, and inclusive",
        "Lead: Agriculture. GHS 2024: 22.2% of households still have inadequate food access. Framework: 1 / 3 / 5 new agri-hubs and produce markets per municipality by 2029 / 2033 / 2037.",
    )
    c.bookmarkHorizontal("horizons", INNER, y)
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
        "Direct writes a costed micro-hub — storage, water, energy, security — as an IDP / DDM annex, not a hub in every municipality. Agri turns grain into a lot. Connect records identity, GPS and hold. Foods mills it. Access finances only a verified node. Ninety-day return: the costed node pack.",
        "Limit: we do not claim a national agri-hub build-out. Demonstration first.",
    )
    y = draw_gc(
        c, y, "1.2",
        "Government food procurement from local smallholder producers",
        "Link public kitchens to local markets. Review procurement so smallholders survive the rules. Target: 10% / 20% / 30% of the food-procurement budget.",
        "Connect (SupplierAdvisor®) keeps the company, the OTIFEF score, the purchase order, the invoice and the lot hold on one OS, so a smallholder lot can survive a PFMA test. A HACCP hold stops the ship. It does not replace BAS or LOGIS. Foods supplies the 5 kg plates, including the NSNP-approved porridge, soya mince and OnePot.",
        "Limit: Treasury and DoA lead policy. We make a lot those rules can buy.",
    )
    c.showPage()


def page_g1b(c):
    y = page_goal_head(
        c,
        10,
        "Goal 1 — production and informal trade",
        "10  ·  Goal 1  ·  Game Changers 1.3–1.4",
        "Urban and peri-urban production, informal traders and spaza shops",
        "Goal 1 continues: production on municipal and customary land, and a hygienic informal market. Framework XX cells are not invented here.",
    )
    y = draw_gc(
        c, y, "1.3",
        "Urban and peri-urban household and smallholder production",
        "Extension, farmer support, land access through municipal spatial plans, tenure that can underpin loans. Register targets: +10% / +25% / +50% by 2029 / 2033 / 2037.",
        "Agri trains households and smallholders as suppliers. CropAdvisor® records the field and the harvest on the same OS that raises the invoice — not a replacement for provincial extension. Super-Cube® forms the officer: six faces, the person first. Access finances offtake only where tenure can carry a loan.",
        "Limit: we do not allocate land. COGTA, SALGA and traditional authorities lead. We take a verified producer into trade.",
    )
    y = draw_gc(
        c, y, "1.4",
        "Informal traders and spaza shops — infrastructure and healthy food",
        "Trading space with storage, water, energy and security; sale of local produce and healthy food; health-and-safety that fits informal operations.",
        "Direct specifies the SANTACO-rank and rural node so traders already at transport nodes get storage, water and energy. 15 000 containers is pathway design, not a live fleet. Foods’ ambient SKUs — 24-month shelf life — let a spaza hold porridge, soya mince or OnePot without a cold chain. Connect stops the next lot if HACCP does not hold.",
        "Limit: SALGA / COGTA lead by-laws. DoH leads norms. We specify a node and a plate those norms can use.",
    )
    c.showPage()


def page_g2(c):
    y = page_goal_head(
        c,
        11,
        "Goal 2 — equitable access",
        "11  ·  Goal 2  ·  Game Changers 2.1–2.3",
        "Equitable and dignified individual, household and community access to nutritious, safe, affordable, and healthy food",
        "Leads: Treasury (affordability), DoH (regulation), GCIS / DBE (behaviour). Poverty Trends 2025: 17.6% below the food poverty line. Framework: 60% of households above that line by 2029.",
    )
    y = draw_gc(
        c, y, "2.1",
        "Affordable healthy food in the local food environment",
        "Price stabilisation, VAT methodology, food-waste redirection, possible national food reserve. Targets: 60% / 70% / 80% of households above the food poverty line.",
        "Foods puts a costed plate on the table: about R1.10 soup, R1.30 soya mince, R2.50 OnePot — an internal comparison, not a price policy. A 24-month ambient life turns last-mile waste into a hold. The 90-day return is a three-menu basket against a reference school meal.",
        "Limit: Treasury leads VAT, subsidies and a food reserve. We put a costed plate on the table.",
    )
    y = draw_gc(
        c, y, "2.2",
        "Regulate the food environment toward healthy diets",
        "Front-of-pack labelling, advertising rules, and school-ground norms. DoH writes the law. DBE leads the school norms.",
        "SchoolAdvisor® gates the kitchen and the vendor on SupplierAdvisor®: if the environment is not ready, the next lot does not ship. No learner names. Super-Cube® makes that protocol a skill the adults in the kitchen can run. The NSNP-approved plate sits there as a meal, not as confectionery.",
        "Limit: we do not gazette labelling or advertising rules. We run the gate those rules can use.",
    )
    y = draw_gc(
        c, y, "2.3",
        "Shift behaviour toward healthy diets",
        "A national behaviour-change strategy and the school curriculum stay with GCIS and DBE. The Plan also asks for a practical plate people can actually prepare.",
        "Super-Cube® assesses six faces, then practises them with the kitchen team — Choices through Spiritual, the person at the centre. Instant porridge — water or milk, under a minute — and a twenty-minute OnePot are the plates they can actually run. Foundation’s 10% of group profits is complementary CSI, not the curriculum.",
        "Limit: we do not claim the national airtime or write Grade 1–12. We form the people and the plate a campaign can point to.",
    )
    c.showPage()


def page_g3(c):
    y = page_goal_head(
        c,
        12,
        "Goal 3 — protection of the vulnerable",
        "12  ·  Goal 3  ·  Game Changers 3.1–3.3",
        "Mitigate risks to the most vulnerable through social, livelihood, and nutrition protection",
        "Leads: DSD / SASSA, DoH and DBE. NFNSS 2023: about 29% of children under five stunted (Framework baseline 27%). 355 000 meals is programme-reported, not an NSNP headcount.",
    )
    y = draw_gc(
        c, y, "3.1",
        "Strengthened social-support systems",
        "A social-security net aimed at ending food insecurity; livelihood pathways; close holiday and seasonal gaps.",
        "Agri and Connect offer a grant household a path to become a supplier — the Plan’s livelihood route, labelled as design until it is measured. Foods covers the gaps the grant does not: CNDC and holiday packs of instant porridge. Foundation CSI is complementary, not a SASSA substitute.",
        "Limit: DSD, SASSA and Treasury lead grant levels. We do not set the Child Support Grant.",
    )
    y = draw_gc(
        c, y, "3.2",
        "High-impact nutrition — NSNP, ECD, CNDC, fortification",
        "Strengthen school, early-childhood and community feeding, including holiday referrals. DBE and DoH lead the programmes and the stunting target.",
        "The Department of Education has approved fortified instant porridge, soya mince and OnePot for NSNP school feeding. Porridge needs only water or milk and is ready in under a minute — no stove, no cold chain, no trained cook — so the same plate can serve NSNP, ECD, CNDC and a holiday pack. SchoolAdvisor proves the lot reached the kitchen. No learner names.",
        "Limit: menu approval is not an awarded NFNSP contract. 2.5 million children per day is a DBE-pathway plan, not current headcount.",
    )
    y = draw_gc(
        c, y, "3.3",
        "First 1 000 days — complementary feeding 6–23 months",
        "Preventative feeding for children 6–23 months in 50% then 100% of high-risk areas. Breastfeeding support and any voucher stay with DSD and DoH.",
        "The same instant porridge is the complementary plate: water or milk, under a minute, beside breastfeeding support rather than instead of it. Super-Cube® forms the implementers. Foundation does not issue vouchers.",
        "Limit: we do not replace breastfeeding support and we do not set a voucher. We offer the plate and the people in a closed circuit.",
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Enablers
# ---------------------------------------------------------------------------
def page_enablers(c):
    y = chrome(c, 13, "Enablers A–C — official titles")
    c.bookmarkPage("p13")
    kicker(c, "13  ·  Governance, resourcing, capacity and data", INNER, y)
    back_to_plan(c, y)
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
        "Impact is the PMO: one programme plan, one risk register, one cadence, so the TWG hears one Group voice. Ninety days returns the closed briefing, a seat at the Framework tables, and a draft municipal SLA for an IDP annex.",
        "Limit: we do not appoint the Council or draft the Act. COGTA and SALGA lead the local mandate.",
    )
    y = draw_gc(
        c, y, "B–C",
        "Resourcing, capacity, innovation and MELIA",
        "Enabler B is resourcing (costing, DFIs, 50% then 100% of unfunded activities). Enabler C is capacity and data — MELIA sits here, not under B.",
        "Access and Foundation finance offtake and complementary CSI — Enabler B — without reallocating a vote. Enabler C is Super-Cube® for the people and SupplierAdvisor® for the record: OTIFEF, lot holds, SchoolAdvisor® gates, extracts inside MELIA. No learner names.",
        "Limit: we do not reallocate votes. SupplierAdvisor® does not replace BAS or LOGIS.",
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Pillars / circuit
# ---------------------------------------------------------------------------
def page_pillars(c):
    y = chrome(c, 14, "Nine pillars as one circuit")
    c.bookmarkPage("p14")
    kicker(c, "14  ·  Nine pillars as one circuit", INNER, y)
    back_to_plan(c, y)
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
    y = chrome(c, 15, "Why now  ·  reading the Plan  ·  who we are")
    c.bookmarkPage("p15")
    kicker(c, "15  ·  Why now — the Plan’s own numbers", INNER, y)
    back_to_plan(c, y)
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
def draw_contained(c, path: Path, x, yb, w, h):
    """Fit the whole bitmap inside the box. Nothing is cropped."""
    im = PILImage.open(path)
    iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(
        ImageReader(str(path)),
        x + (w - dw) / 2,
        yb + (h - dh) / 2,
        width=dw,
        height=dh,
        mask="auto",
    )


def food_shots(c, y) -> float:
    shots = [
        (ROOT / "public/foods/porridge-original.jpg", "Porridge"),
        (ROOT / "public/foods/soya-beef.jpg", "Soya mince"),
        (ROOT / "public/foods/onepot-chicken.jpg", "OnePot"),
        (ROOT / "public/foods/soup-chicken.jpg", "Soups"),
    ]
    gap = 3 * mm
    cap = 4.8 * mm
    box_h = 20 * mm
    tw = (CONTENT_W - gap * (len(shots) - 1)) / len(shots)
    total_h = box_h + cap
    for i, (path, label) in enumerate(shots):
        x = INNER + i * (tw + gap)
        card(c, x, y - total_h, tw, total_h, fill=CREAM, stroke=GOLD, sw=0.35, bar=False)
        pad = 1.4 * mm
        draw_contained(c, path, x + pad, y - box_h + pad, tw - 2 * pad, box_h - 2 * pad)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 7.2)
        c.drawCentredString(x + tw / 2, y - box_h - 3.6 * mm, label)
    return y - total_h - 2.4 * mm


def page_foods(c):
    y = chrome(c, 16, "Foods  ·  workstreams  ·  demonstration")
    c.bookmarkPage("p16")
    kicker(c, "16  ·  Big Five Foods — labelled Group figures", INNER, y)
    back_to_plan(c, y)
    y -= 4.2 * mm
    y = quote_box(
        c,
        y,
        "Department of Education approval for NSNP school feeding: fortified instant porridge, soya mince and OnePot meals. Menu approval — not an awarded NFNSP contract, and not a current daily headcount.",
        size=9.5,
        lead=13.2,
    )
    y = food_shots(c, y)
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
    y -= cert_h + 3.6 * mm

    kicker(c, "Five workstreams A–E", INNER, y)
    y -= 6.2 * mm
    ws = [
        ("A", "Plates", "NSNP-approved porridge, soya mince, OnePot and soups. 5 kg packs."),
        ("B", "Markets", "Costed container / micro-hub spec for an IDP / DDM One Plan. SANTACO rank + rural nodes."),
        ("C", "Producers", "SupplierAdvisor®: OTIFEF, the lot and the invoice on one OS. Not BAS or LOGIS."),
        ("D", "Agency", "Super-Cube® six faces for the adults who run the plate. Porridge and OnePot. Not the curriculum."),
        ("E", "OS", "SchoolAdvisor® gates the kitchen. HACCP holds stop the ship. MELIA extract. No learner names."),
    ]
    for letter, t, d in ws:
        y = numbered_card(c, y, letter, t, d, size=8, lead=10.4)

    c.bookmarkHorizontal("demo", INNER, y)
    kicker(c, "Demonstration design", INNER, y)
    y -= 6.2 * mm
    demo = (
        "Phase 1: two KZN municipalities and one metro cluster. Phase 2: a second high-inadequacy province, only after that circuit holds. Eastern Cape is the Plan’s reference."
    )
    quote_box(c, y, demo, size=9.2, lead=12.4)
    c.showPage()


# ---------------------------------------------------------------------------
# Leadership
# ---------------------------------------------------------------------------
def page_leadership(c):
    y = chrome(c, 17, "Super-Cube®  ·  Leadership")
    c.bookmarkPage("p17")
    kicker(c, "17  ·  Big Five Leadership", INNER, y)
    back_to_plan(c, y)
    y -= 8 * mm
    draw_str(c, "Six faces. The person at the centre.", INNER, y, F["sansSemi"], 13.5, FOREST, tracking=-0.25)
    y -= 7.2 * mm
    used = para(
        c,
        "Super-Cube® is the Educate pillar (super-cube.me). Six developable faces, the person at the centre, then the team and the supply network. Dr Craig Ross Muller developed it as his DBA at the University of KwaZulu-Natal in 2020, and tested it in an African FMCG network.",
        INNER, y, F["sans"], 9.6, 13.2, CONTENT_W, INK,
    )
    y -= used + 3.2 * mm
    y = quote_box(
        c, y,
        "We form the adults who run kitchens, hubs, extension and municipal SLAs. We do not write the national behaviour-change campaign or the Grade 1–12 curriculum. Learner names do not enter the MELIA extract.",
        size=9.2, lead=12.6,
    )
    faces = [
        ("Choices", "A buyer or kitchen lead chooses a lawful lot — not an invented headcount."),
        ("Principles", "The record stays honest: labelled figures, no tender claim, no learner names."),
        ("Mental", "An IDP annex, a MELIA extract and a kitchen gate people can run."),
        ("Emotional", "Producer, mill and school kitchen trust one circuit, not one meeting."),
        ("Physical", "The stamina to run a feeding day. The plate itself stays with Foods."),
        ("Spiritual", "Dignity in a school kitchen and in the first 1 000 days."),
    ]
    tw = (CONTENT_W - 8 * mm) / 3
    chip_h = 24 * mm
    for i, (name, body) in enumerate(faces):
        col, row = i % 3, i // 3
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * (chip_h + 3 * mm)
        card(c, x, ty - chip_h, tw, chip_h, fill=white, stroke=GOLD, sw=0.4, bar=True)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9)
        c.drawString(x + 6, ty - 6.2 * mm, name)
        para(c, body, x + 6, ty - 11 * mm, F["sans"], 7.6, 10.2, tw - 12, MUTED)
    y -= 2 * (chip_h + 3 * mm) + 1 * mm
    levels = [
        ("01", "The person", "Implementer, kitchen lead or extension officer. Assess the six faces, then practise."),
        ("02", "Kitchen or hub", "One operation shares the same language for judgement and care."),
        ("03", "Supply network", "Producer, mill, transporter and kitchen. Industry scale waits for a closed circuit."),
    ]
    tw = (CONTENT_W - 8 * mm) / 3
    lh = 20 * mm
    for i, (n, t, d) in enumerate(levels):
        x = INNER + i * (tw + 4 * mm)
        card(c, x, y - lh, tw, lh, fill=CREAM, stroke=GOLD, sw=0.35, bar=False)
        c.setFillColor(GOLD)
        c.setFont(F["sansSemi"], 7.2)
        c.drawString(x + 6, y - 5.4 * mm, n)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8.4)
        c.drawString(x + 16, y - 5.4 * mm, t)
        para(c, d, x + 6, y - 10.2 * mm, F["sans"], 7.4, 10, tw - 12, MUTED)
    y -= lh + 4 * mm
    para(
        c,
        "An FMCG value-chain case recorded lifts on all six faces. Principles was the largest, at +45.1%. That is one network — not an NFNSP result, and not a forecast for KwaZulu-Natal.",
        INNER, y, F["sansItalic"], 8, 11, CONTENT_W, MUTED,
    )
    y -= 14 * mm
    site = "super-cube.me"
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], 8.5)
    c.drawString(INNER, y, site)
    sw = c.stringWidth(site, F["sansSemi"], 8.5)
    c.setStrokeColor(FOREST)
    c.setLineWidth(0.45)
    c.line(INNER, y - 1.1, INNER + sw, y - 1.1)
    c.linkURL("https://www.super-cube.me/", (INNER - 1, y - 3, INNER + sw + 2, y + 10))
    c.showPage()


# ---------------------------------------------------------------------------
# OS
# ---------------------------------------------------------------------------
def page_os(c):
    y = chrome(c, 18, "Empower  ·  Connect")
    c.bookmarkPage("p18")
    kicker(c, "18  ·  Empower — Connect, the operating system", INNER, y)
    back_to_plan(c, y)
    y -= 8 * mm
    draw_str(c, "One chain: verify, trade, hold, ship, prove", INNER, y, F["sansSemi"], 13.5, FOREST, tracking=-0.25)
    y -= 7.2 * mm
    y = quote_box(
        c, y,
        "SupplierAdvisor® (supplieradvisor.com) does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have. No learner names.",
        size=9.4, lead=13,
    )
    groups = [
        ("Core OS", "Verified companies. Buy and sell, inventory, make, ship, finance, SHEQ and quality. OTIFEF scores every delivery On-Time, In-Full, Error-Free. Purchase orders, invoices and lot holds sit on the same books."),
        ("Food safety", "HACCP plans and inspections that block shipping when a lot is on hold. When a lot fails, the ship stops."),
        ("SchoolAdvisor®", "The NSNP kitchen gate on the same OS. A kitchen or vendor that is not ready does not receive the next lot. Lot-and-kitchen proof for MELIA."),
        ("CropAdvisor®", "Fields, harvest and the farm-to-buyer handoff, so a household lot can become an invoice. Not a replacement for provincial extension."),
    ]
    tw = (CONTENT_W - 4 * mm) / 2
    # measure heights
    heights = []
    for title, body in groups:
        heights.append(6.2 * mm + measure(c, body, F["sans"], 8, 10.8, tw - 14) + 4.2 * mm)
    row_h = max(heights[0], heights[1]) 
    row_h2 = max(heights[2], heights[3])
    for i, (title, body) in enumerate(groups):
        col, row = i % 2, i // 2
        h = row_h if row == 0 else row_h2
        x = INNER + col * (tw + 4 * mm)
        ty = y - (0 if row == 0 else row_h + 3 * mm)
        card(c, x, ty - h, tw, h, fill=white, stroke=GOLD, sw=0.4, bar=True)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 9)
        c.drawString(x + 7, ty - 5.6 * mm, title)
        para(c, body, x + 7, ty - 10.4 * mm, F["sans"], 8, 10.8, tw - 14, MUTED)
    y -= row_h + row_h2 + 6 * mm
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], 8.5)
    label = "supplieradvisor.com"
    c.drawString(INNER, y, label)
    w = c.stringWidth(label, F["sansSemi"], 8.5)
    c.setStrokeColor(FOREST)
    c.setLineWidth(0.45)
    c.line(INNER, y - 1.1, INNER + w, y - 1.1)
    c.linkURL("https://www.supplieradvisor.com/", (INNER - 1, y - 3, INNER + w + 2, y + 10))
    y -= 7 * mm
    actors = [
        ("Smallholder", "Identity, lot, invoice and OTIFEF so the 10% target can survive PFMA."),
        ("Foods mill", "BOM, MPS, MRP. HACCP hold stops the ship."),
        ("School / ECD / CNDC", "SchoolAdvisor® gate. Lot-and-kitchen proof. No learner names."),
        ("Municipality", "The extract sits inside MELIA. BAS and LOGIS stay the systems of record."),
    ]
    head_h, arow = 6.4 * mm, 9.2 * mm
    table_h = head_h + arow * len(actors)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, RADIUS, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.rect(INNER + 0.4, y - head_h, CONTENT_W - 0.8, head_h - 0.6, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], 6.4)
    c.drawString(INNER + 8, y - 4.4, "ACTOR")
    c.drawString(INNER + 48 * mm, y - 4.4, "WHAT THE OS HOLDS")
    yy = y - head_h
    for i, (a, r) in enumerate(actors):
        if i % 2:
            c.setFillColor(SOFT)
            c.rect(INNER + 0.4, yy - arow, CONTENT_W - 0.8, arow, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 8)
        c.drawString(INNER + 8, yy - 5.8, a)
        para(c, r, INNER + 48 * mm, yy - 5.8, F["sans"], 8, 10.4, CONTENT_W - 56 * mm, MUTED)
        yy -= arow
    c.showPage()


# ---------------------------------------------------------------------------
# 90-day ask
# ---------------------------------------------------------------------------
def page_empower_rest(c):
    y = chrome(c, 19, "Empower  ·  Direct to Foundation")
    c.bookmarkPage("p19")
    kicker(c, "19  ·  Empower — the rest of the circuit", INNER, y)
    back_to_plan(c, y)
    y -= 8 * mm
    used = para(
        c,
        "Connect, on the previous page, is the operating system. The same Empower mission carries the plate the rest of the way: a container, a lawful buy, a corridor after proof, a PMO, and a foundation that gives back.",
        INNER, y, F["sans"], 9.6, 13.2, CONTENT_W, INK,
    )
    y -= used + 3.5 * mm
    parts = [
        ("Direct", "Containers and last mile",
         "A SANTACO rank, produce market or rural node — storage, water and energy — so an ambient plate can be held. Specified for an IDP or DDM One Plan. Goals 1.1 and 1.4. 15 000 containers is pathway design, not a live fleet. SALGA and COGTA lead the space."),
        ("Access", "Government funding and feeding schemes",
         "How a school, hospital, ECD, CNDC or municipality can buy the plate and a smallholder lot lawfully, with offtake finance where tenure can carry it. Enabler B. Access does not award the scheme, set the grant, or reallocate a vote."),
        ("Global", "Exports, after proof",
         "Standards and a corridor for when a closed KwaZulu-Natal circuit is ready to travel. The Group’s wider route-to-market work is not this partnership’s export book. No invented cross-border volume."),
        ("Impact", "PMO — delivers the project",
         "One plan, one risk register, one cadence across Feed, Educate and Empower. Gates the 90 days and the demonstration. Programme-reported until audited. Enabler A. Does not appoint the Council or draft the Act."),
        ("Foundation", "Giving back",
         "Registered non-profit. Ten percent of group profits, standing policy, with proof on SupplierAdvisor®. Social, economic and environmental development. Complementary CSI for Goals 2 and 3 — not the fiscus, not SASSA, not a voucher."),
    ]
    for name, role, body in parts:
        pw = CONTENT_W - 16
        title = f"{name}  —  {role}"
        th = measure(c, title, F["sansSemi"], 9.2, 12.4, pw)
        bh = measure(c, body, F["sans"], 8.4, 11.4, pw)
        h = 4.2 * mm + th + 2.2 + bh + 3.8 * mm
        card(c, INNER, y - h, CONTENT_W, h, fill=white, stroke=GOLD, sw=0.4, bar=True)
        para(c, title, INNER + 8, y - 4.4 * mm, F["sansSemi"], 9.2, 12.4, pw, FOREST)
        para(c, body, INNER + 8, y - 4.4 * mm - th - 2.2, F["sans"], 8.4, 11.4, pw, MUTED)
        y -= h + 2.6 * mm
    c.showPage()


def page_kingdom(c):
    y = chrome(c, 20, "Zulu Kingdom  ·  Heads of Agreement")
    c.bookmarkPage("p20")
    kicker(c, "20  ·  Community and cultural buy-in", INNER, y)
    back_to_plan(c, y)
    y -= 8 * mm
    draw_str(c, "A Kingdom partnership, in signature", INNER, y, F["sansSemi"], 14, FOREST, tracking=-0.2)
    y -= 8 * mm
    y = quote_box(
        c, y,
        "Big Five Group is in the process of signing a Heads of Agreement with the Zulu Kingdom — the Private Office of His Majesty King Misuzulu kaZwelithini. Signature is not complete. This is not an NFNSP award.",
        size=9.6, lead=13.2,
    )
    used = para(
        c,
        "The proposed programme in that Heads of Agreement is Isidlo seSilo — a Kingdom nutrition pathway rooted in Ubuntu, dignity and heritage. KwaZulu-Natal is the demonstration province in this briefing. A circuit communities recognise as food of the Nation is received differently from a vendor drop. Royal legitimacy and household reach are the cultural rail. They do not replace a municipal mandate, a PFMA test, or the Department’s own decision.",
        INNER, y, F["sans"], BODY, LEAD, CONTENT_W, INK,
    )
    y -= used + 4 * mm
    points = [
        ("Community buy-in", "Traditional leadership and household pathways, so producers, kitchens and traders meet the plate as something of their own place."),
        ("A cultural home", "Isidlo seSilo is proposed, not proclaimed. Until the Heads of Agreement is signed, treat the programme as in signature."),
        ("What this is not", "Not an awarded NFNSP contract. Not a gazetted royal appointment. Not consent from every municipality. Not a reason to skip the 90-day legal workstream."),
    ]
    for title, body in points:
        pw = CONTENT_W - 16
        th = measure(c, title, F["sansSemi"], 10, 13.5, pw)
        bh = measure(c, body, F["sans"], 9.2, 12.8, pw)
        h = 4.6 * mm + th + 2.4 + bh + 4.2 * mm
        card(c, INNER, y - h, CONTENT_W, h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
        para(c, title, INNER + 8, y - 4.8 * mm, F["sansSemi"], 10, 13.5, pw, FOREST)
        para(c, body, INNER + 8, y - 4.8 * mm - th - 2.4, F["sans"], 9.2, 12.8, pw, MUTED)
        y -= h + 3 * mm
    c.setFillColor(FOREST)
    c.setFont(F["sansSemi"], 9)
    label = "Private workspace  ·  bigfivegroup.africa/partner/zulu-kingdom"
    c.drawString(INNER, y, label)
    w = c.stringWidth(label, F["sansSemi"], 9)
    c.setStrokeColor(FOREST)
    c.setLineWidth(0.45)
    c.line(INNER, y - 1.1, INNER + w, y - 1.1)
    c.linkURL("https://bigfivegroup.africa/partner/zulu-kingdom", (INNER - 1, y - 3, INNER + w + 2, y + 11))
    y -= 8 * mm
    para(
        c,
        "That workspace is private to the Zulu Kingdom partnership. This page does not reproduce the Heads of Agreement.",
        INNER, y, F["sansItalic"], 8.4, 11.4, CONTENT_W, MUTED,
    )
    c.showPage()


def page_ask(c):
    y = chrome(c, 21, "90-day ask")
    c.bookmarkPage("p21")
    kicker(c, "21  ·  Five asks", INNER, y)
    back_to_plan(c, y)
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
def _offer_links(c, offering, x, y, max_w, fallback):
    parts = [part.strip() for part in offering.split("·")]
    font = F["sans"]
    size = 6.15
    gap = " · "
    while size > 5.0 and c.stringWidth(gap.join(parts), font, size) > max_w:
        size -= 0.12
    cursor = x
    gap_w = c.stringWidth(gap, font, size)
    for i, part in enumerate(parts):
        if i:
            c.setFillColor(HexColor("#A8A29E"))
            c.setFont(font, size)
            c.drawString(cursor, y, "·")
            cursor += gap_w
        c.setFillColor(FOREST)
        c.setFont(font, size)
        pw = c.stringWidth(part, font, size)
        c.drawString(cursor, y, part)
        c.setStrokeColor(FOREST)
        c.setLineWidth(0.3)
        c.line(cursor, y - 0.7, cursor + pw, y - 0.7)
        c.linkAbsolute("", OFFER_DEST.get(part, fallback), (cursor - 0.4, y - 1.8, cursor + pw + 0.6, y + 6.5))
        cursor += pw


def page_gantt(c):
    y = chrome(c, 5, "Project plan  ·  Goals linked to offerings")
    c.bookmarkPage("p05")
    kicker(c, "05  ·  Project plan", INNER, y)
    y -= 7 * mm
    used = para(
        c,
        "Select a row to open that Goal or Enabler. Select a pillar name to open Connect, Leadership, Foods or the circuit. Each of those pages links back here. Gold bars are the Impact PMO and the NSNP-approved plate. Forest bars are the other Game Changers and Enablers.",
        INNER, y, F["sans"], 8.6, 11.6, CONTENT_W, MUTED,
    )
    y -= used + 3 * mm

    cols = [
        ("90 days", "Q4 26 – Q1 27"),
        ("2027", "KZN year 1"),
        ("2028", "KZN year 2"),
        ("2029", "Plan 10%"),
        ("2030–33", "Plan 20%"),
        ("2034–37", "Plan 30%"),
    ]
    rows = [
        ("Impact PMO", "One plan · one risk register", "Impact", 0, 5, GOLD, "p13", "p.13"),
        ("Goal 1.1 · Hubs", "Micro-hub, lot, mill", "Direct · Agri · Connect · Foods · Access", 0, 4, FOREST, "p09", "p.9"),
        ("Goal 1.2 · Procurement", "OTIFEF, invoice, plate", "Connect · Foods · Agri · Impact", 0, 5, FOREST, "p09", "p.9"),
        ("Goal 1.3 · Producers", "Harvest into a lot", "Agri · Leadership · Access · Connect", 0, 4, FOREST, "p10", "p.10"),
        ("Goal 1.4 · Traders", "Ambient SKU, HACCP hold", "Direct · Foods · Connect · Leadership", 0, 4, FOREST, "p10", "p.10"),
        ("Goal 2.1 · Affordable plate", "Porridge, soya, OnePot", "Foods · Direct · Foundation", 0, 5, GOLD, "p11", "p.11"),
        ("Goal 2.2 · Food environment", "SchoolAdvisor® gate", "Connect · Leadership · Foods", 1, 4, FOREST, "p11", "p.11"),
        ("Goal 2.3 · Behaviour", "Six faces, then the plate", "Leadership · Foods · Foundation", 1, 4, FOREST, "p11", "p.11"),
        ("Goal 3.1 · Social support", "Offtake, not a grant", "Agri · Connect · Foods · Foundation", 0, 4, FOREST, "p12", "p.12"),
        ("Goal 3.2 · NSNP / ECD", "DoE-approved plate", "Foods · Connect · Direct · Impact", 0, 5, GOLD, "p12", "p.12"),
        ("Goal 3.3 · First 1 000 days", "Porridge, 6–23 months", "Foods · Leadership · Foundation", 1, 3, FOREST, "p12", "p.12"),
        ("Enabler B · Capital", "Offtake finance, CSI", "Access · Foundation", 0, 5, FOREST, "p13", "p.13"),
        ("Enabler C · OS / MELIA", "Holds inside MELIA", "Connect · Leadership · Impact", 0, 5, FOREST, "p18", "p.18"),
    ]
    label_w = 74 * mm
    track_w = CONTENT_W - label_w
    n_cols = len(cols)
    cell_w = track_w / n_cols
    head_h = 11 * mm
    row_h = 13.15 * mm
    chart_h = head_h + row_h * len(rows)
    if y - chart_h < BODY_BOTTOM + 12 * mm:
        row_h = (y - BODY_BOTTOM - 14 * mm - head_h) / len(rows)
        chart_h = head_h + row_h * len(rows)

    chart_bottom = y - chart_h
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(INNER, chart_bottom, CONTENT_W, chart_h, 3.2 * mm)
    c.clipPath(clip, stroke=0, fill=0)
    c.setFillColor(white)
    c.rect(INNER, chart_bottom, CONTENT_W, chart_h, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansSemi"], 6.2)
    c.drawString(INNER + 4, y - 4.6 * mm, "IMPACT STREAM")
    for i, (lab, sub) in enumerate(cols):
        cx = INNER + label_w + i * cell_w + cell_w / 2
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 6.5)
        c.drawCentredString(cx, y - 4.2 * mm, lab)
        c.setFillColor(MUTED)
        c.setFont(F["sans"], 5.4)
        c.drawCentredString(cx, y - 8.2 * mm, sub)

    yy = y - head_h
    for i, (stream, product, offering, start, end, colour, dest, page_lbl) in enumerate(rows):
        if i:
            c.setStrokeColor(HexColor("#EFE6D4"))
            c.setLineWidth(0.3)
            c.line(INNER + 3, yy, INNER + CONTENT_W - 3, yy)
        c.setFillColor(FOREST)
        c.setFont(F["sansSemi"], 7.15)
        c.drawString(INNER + 4, yy - 3.55 * mm, stream)
        sw = c.stringWidth(stream, F["sansSemi"], 7.15)
        c.linkAbsolute("", dest, (INNER + 3, yy - row_h + 1, INNER + 6 + sw, yy - 1.2 * mm))
        c.setFillColor(GOLD)
        c.setFont(F["sansSemi"], 6.4)
        c.drawRightString(INNER + label_w - 3.2, yy - 3.55 * mm, page_lbl)
        pw = c.stringWidth(page_lbl, F["sansSemi"], 6.4)
        c.linkAbsolute("", dest, (INNER + label_w - 4 - pw, yy - 6.2 * mm, INNER + label_w - 2, yy - 1.4 * mm))
        c.setFillColor(MUTED)
        c.setFont(F["sans"], 5.7)
        c.drawString(INNER + 4, yy - 6.7 * mm, product)
        _offer_links(c, offering, INNER + 4, yy - 9.7 * mm, label_w - 8, dest)

        track_x = INNER + label_w + 1.6 * mm
        track_w_draw = track_w - 3.2 * mm
        track_h = min(5.6 * mm, row_h - 5.2 * mm)
        track_y = yy - row_h / 2 - track_h / 2
        c.setFillColor(CREAM)
        c.roundRect(track_x, track_y, track_w_draw, track_h, track_h / 2, fill=1, stroke=0)
        c.setStrokeColor(HexColor("#E8D7B0"))
        c.setLineWidth(0.25)
        for col in range(1, n_cols):
            lx = track_x + col * cell_w
            c.line(lx, track_y + 1.1, lx, track_y + track_h - 1.1)
        bar_h = track_h - 1.5 * mm
        bar_y = track_y + 0.75 * mm
        bar_x = track_x + start * cell_w + 1.6
        bar_w = max(bar_h, (end - start + 1) * cell_w - 3.2)
        c.setFillColor(colour)
        c.roundRect(bar_x, bar_y, bar_w, bar_h, bar_h / 2, fill=1, stroke=0)
        c.linkAbsolute("", dest, (bar_x, bar_y, bar_x + bar_w, bar_y + bar_h))
        yy -= row_h
    c.restoreState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.7)
    c.roundRect(INNER, chart_bottom, CONTENT_W, chart_h, 3.2 * mm, fill=0, stroke=1)

    y = chart_bottom - 4.2 * mm
    para(
        c,
        "10 / 20 / 30% and 1 / 3 / 5 hubs are Framework targets, not Group headcount. Department of Education approval covers fortified instant porridge, soya mince and OnePot for NSNP menus — not an awarded NFNSP contract. SupplierAdvisor® does not replace BAS or LOGIS.",
        INNER, y, F["sansItalic"], 7.3, 10, CONTENT_W, MUTED,
    )
    c.showPage()


def _phase_card(c, x, y, w, title, body, dest) -> float:
    pw = w - 14
    th = measure(c, title, F["sansSemi"], 8.4, 11.2, pw)
    bh = measure(c, body, F["sans"], 7.6, 10.4, pw)
    h = 4.6 * mm + th + 2.4 + bh + 4.2 * mm
    card(c, x, y - h, w, h, fill=CREAM, stroke=GOLD, sw=0.4, bar=True)
    para(c, title, x + 7, y - 4.6 * mm, F["sansSemi"], 8.4, 11.2, pw, FOREST)
    c.linkAbsolute("", dest, (x + 6, y - 5.2 * mm - th, x + w - 6, y - 2.2 * mm))
    para(c, body, x + 7, y - 4.6 * mm - th - 2.4, F["sans"], 7.6, 10.4, pw, MUTED)
    return h


def page_phases(c):
    y = chrome(c, 6, "Phase goals  ·  deliverables  ·  products")
    c.bookmarkPage("p06")
    kicker(c, "06  ·  What Impact delivers in each phase", INNER, y)
    back_to_plan(c, y)
    y -= 7.2 * mm
    phases = [
        (
            "0  ·  Mobilise  ·  90 days",
            "Goal: Enabler A — one Group voice. Objective: close the five asks. Deliverables: TWG briefing, KZN named, PFMA/MFMA workstream, MELIA protocol, Framework tables. Products: Impact PMO, costed node pack, three-menu basket, producer protocol, draft municipal SLA.",
            "p21",
        ),
        (
            "1  ·  Closed KZN circuit  ·  2027–2028",
            "Goal: Goals 1.1–1.4, 2 and 3 in two locals + one metro. Objective: lot, plate and MELIA extract hold. Deliverables: NSNP-approved porridge, soya mince and OnePot in demo kitchens; SchoolAdvisor® gates; Super-Cube®. Products: 5 kg SKUs, Agri producers, Direct nodes, Connect OS. Scale gate.",
            "demo",
        ),
        (
            "2  ·  Second province  ·  2029",
            "Goal: repeat a closed circuit. Objective: only if Phase 1 holds. Eastern Cape is the Plan’s GHS reference. Framework 10% is a Plan target, not a Group headcount. Products: same NSNP-approved plate, local onboarding, IDP/DDM node spec.",
            "demo",
        ),
        (
            "3  ·  Named circuits  ·  2030–2033",
            "Goal: Framework 20% as context. Objective: expand only where a lawful buy already holds. 1/3/5 hubs per municipality stays a Plan target. Products: plates, lots, nodes and MELIA extracts; Access and Foundation as complementary rails.",
            "horizons",
        ),
        (
            "4  ·  Horizon 2037",
            "Goal: Framework 30% is the Plan’s horizon. Objective: hold circuits that already work. Global waits. No invented national volumes. Impact reports programme-reported until audited.",
            "horizons",
        ),
    ]
    for title, body, dest in phases:
        h = _phase_card(c, INNER, y, CONTENT_W, title, body, dest)
        y -= h + 3.2 * mm
    c.showPage()


def page_close(c):
    y = chrome(c, 22, "Risk  ·  labelled figures  ·  conclusion")
    c.bookmarkPage("p22")
    kicker(c, "22  ·  Governance and risk — what this briefing is not", INNER, y)
    back_to_plan(c, y)
    y -= 8 * mm
    risks = [
        ("NSNP approval read as an NFNSP contract", "DoE approved porridge, soya mince and OnePot for NSNP menus. This briefing is not an awarded NFNSP contract."),
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
    page_exec_b(c)
    page_gantt(c)
    page_phases(c)
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
    page_leadership(c)
    page_os(c)
    page_empower_rest(c)
    page_kingdom(c)
    page_ask(c)
    page_close(c)
    c.save()
    print(f"Wrote {OUT}  ({TOTAL} pages)")


if __name__ == "__main__":
    build()
