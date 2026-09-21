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
HERO = ROOT / "public" / "og" / "home.jpg"

PAGE_W, PAGE_H = A4
FOREST = HexColor("#0F3D38")
FOREST_DK = HexColor("#0B1C22")
GOLD = HexColor("#C4923A")
GOLD_LT = HexColor("#E8C07A")
INK = HexColor("#171717")
MUTED = HexColor("#5C5C5C")
CREAM = HexColor("#F7F1E6")
PAPER = HexColor("#FBF8F2")
RULE = HexColor("#E5D9C4")

INNER = 16 * mm
CONTENT_W = PAGE_W - 2 * INNER
HEADER_H = 24 * mm
FOOTER_H = 13.2 * mm
FRAME = 5.2 * mm
BODY_BOTTOM = FOOTER_H + 6 * mm
TOTAL = 13


def fonts() -> dict[str, str]:
    c = {
        "sans": "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "sansBold": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
        "serif": "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        "serifBold": "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
        "serifItalic": "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
    }
    out: dict[str, str] = {}
    for k, p in c.items():
        n = f"NFN_{k}"
        if os.path.isfile(p):
            pdfmetrics.registerFont(TTFont(n, p))
            out[k] = n
        else:
            out[k] = "Times-Bold" if "Bold" in k else "Times-Roman"
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
    hero = cover_crop(src, tw, th, 0.22)
    dusk = PILImage.new("RGB", hero.size, (11, 28, 34))
    return to_reader(PILImage.blend(hero, dusk, 0.62), 88)


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


def para(c, text, x, y, font, size, lead, max_w, color) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    yy = y
    for line in wrap(c, text, font, size, max_w):
        c.drawString(x, yy, line)
        yy -= lead
    return y - yy


def rrect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    if fill is not None:
        c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill is not None else 0, stroke=1 if stroke is not None else 0)


def gold_rule(c, x, y, w, sw=0.7):
    c.setStrokeColor(GOLD)
    c.setLineWidth(sw)
    c.line(x, y, x + w, y)


def gold_frame(c):
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.85)
    c.rect(FRAME, FRAME, PAGE_W - 2 * FRAME, PAGE_H - 2 * FRAME, fill=0, stroke=1)
    arm = 5.4 * mm
    c.setLineWidth(1.35)
    c.setStrokeColor(GOLD_LT)
    pairs = [
        (FRAME, PAGE_H - FRAME, 1, -1),
        (PAGE_W - FRAME, PAGE_H - FRAME, -1, -1),
        (FRAME, FRAME, 1, 1),
        (PAGE_W - FRAME, FRAME, -1, 1),
    ]
    for x, y, dx, dy in pairs:
        c.line(x, y, x + dx * arm, y)
        c.line(x, y, x, y + dy * arm)


NDA_PLATE = None
BFG_PLATE = None
HERO_IMG = None


def cobrand(c, x, y, nda_w=52 * mm, nda_h=15.2 * mm):
    rrect(c, x, y, nda_w, nda_h, 1.8, fill=white, stroke=GOLD, sw=0.55)
    c.drawImage(NDA_PLATE, x + 1.6, y + 1.2, width=nda_w - 3.2, height=nda_h - 2.4, preserveAspectRatio=True, anchor="c")
    c.setFillColor(GOLD_LT)
    c.setFont(F["serifBold"], 10)
    c.drawCentredString(x + nda_w + 4.4 * mm, y + nda_h / 2 - 2.4, "×")
    bx = x + nda_w + 8.8 * mm
    rrect(c, bx, y, nda_h, nda_h, 1.8, fill=white, stroke=GOLD, sw=0.55)
    c.drawImage(BFG_PLATE, bx + 1.1, y + 1.1, width=nda_h - 2.2, height=nda_h - 2.2, preserveAspectRatio=True, anchor="c")


def footer(c, n):
    c.setFillColor(FOREST_DK)
    c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, FOOTER_H - 0.7, PAGE_W, 0.7, fill=1, stroke=0)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sans"], 6.1)
    c.drawString(INNER, 5.4, "CONFIDENTIAL  ·  NFNSP-2  ·  v2.0  ·  September 2026")
    c.drawCentredString(PAGE_W / 2, 5.4, "Principal terms  ·  not an awarded tender")
    c.setFont(F["sansBold"], 6.4)
    c.drawRightString(PAGE_W - INNER, 5.4, f"{n}   /   {TOTAL}")


def header_bar(c, running: str):
    y = PAGE_H - HEADER_H
    c.setFillColor(FOREST)
    c.rect(0, y, PAGE_W, HEADER_H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, y, PAGE_W, 0.7, fill=1, stroke=0)
    cobrand(c, INNER, y + 4.2)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sansBold"], 6.0)
    c.drawRightString(PAGE_W - INNER, y + 14.6, "NFNSP-2   ·   2027–2037")
    c.setFillColor(GOLD)
    c.setFont(F["serifItalic"], 7.4)
    c.drawRightString(PAGE_W - INNER, y + 6.6, running)
    return y


def chrome(c, n, running):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, running)
    footer(c, n)
    gold_frame(c)
    return top - 9 * mm


def kicker(c, text, x, y):
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.4)
    c.drawString(x, y, text.upper())
    gold_rule(c, x, y - 2.4, 18 * mm, 0.85)


def forest_bar(c, x, y, h):
    c.setFillColor(FOREST)
    c.rect(x, y, 2.0, h, fill=1, stroke=0)


def bullets(c, items, x, y, max_w, size=7.05, lead=9.25) -> float:
    for item in items:
        c.setFillColor(GOLD)
        c.circle(x + 1.8, y + 1.5, 1.15, fill=1, stroke=0)
        used = para(c, item, x + 7.5, y, F["sans"], size, lead, max_w - 7.5, INK)
        y -= used + 2.1 * mm
    return y


# ---------------------------------------------------------------------------
# Cover
# ---------------------------------------------------------------------------
def page_cover(c):
    if HERO_IMG:
        c.drawImage(HERO_IMG, 0, 0, width=PAGE_W, height=PAGE_H, preserveAspectRatio=False)
    c.setFillColor(FOREST_DK)
    c.rect(0, 0, PAGE_W, FOOTER_H + 2, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, PAGE_H - 3.2 * mm, PAGE_W, 3.2 * mm, fill=1, stroke=0)
    c.rect(0, FOOTER_H + 2, PAGE_W, 0.7, fill=1, stroke=0)

    cobrand(c, INNER, PAGE_H - 28 * mm)

    c.setFillColor(GOLD_LT)
    c.setFont(F["sansBold"], 6.6)
    c.drawString(INNER, PAGE_H - 38 * mm, "PARTNER PORTAL   ·   CONFIDENTIAL   ·   NFNSP-2")

    c.setFillColor(white)
    c.setFont(F["serifBold"], 26)
    c.drawString(INNER, PAGE_H - 52 * mm, "Implementation partnership")
    c.setFillColor(GOLD_LT)
    c.setFont(F["serifItalic"], 10.2)
    c.drawString(INNER, PAGE_H - 61 * mm, "Operationalising the National Food and Nutrition Security Plan  ·  2027–2037")

    gold_rule(c, INNER, PAGE_H - 66 * mm, 42 * mm, 1.05)

    para(
        c,
        "Private briefing for the NFNSP Technical Working Group / Department of Agriculture. "
        "Not a government publication. Not an awarded tender. Not a current NSNP daily headcount.",
        INNER,
        PAGE_H - 73 * mm,
        F["sans"],
        8.0,
        10.6,
        CONTENT_W * 0.92,
        HexColor("#F0E6D2"),
    )

    stats = [
        ("22.2%", "Households with inadequate or severely inadequate food access", "GHS 2024, as cited in NFNSP-2"),
        ("~29%", "Children under five stunted (severe 15%; Framework baseline 27%)", "NFNSS 2023"),
        ("17.6%", "People below the food poverty line of R777 pp/pm (2023 prices)", "Poverty Trends 2025"),
        ("10 / 20 / 30%", "Smallholder share of government food procurement", "Plan targets 2029 / 2033 / 2037"),
    ]
    tw = (CONTENT_W - 6 * mm) / 2
    th = 32 * mm
    y0 = 78 * mm
    for i, (v, lab, src) in enumerate(stats):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 6 * mm)
        ty = y0 + (1 - row) * (th + 4.5 * mm)
        rrect(c, x, ty, tw, th, 3.2, fill=Color(0.97, 0.94, 0.90, alpha=0.92), stroke=GOLD, sw=0.55)
        c.setFillColor(FOREST)
        c.setFont(F["serifBold"], 16)
        c.drawString(x + 8, ty + th - 13, v)
        para(c, lab, x + 8, ty + th - 24, F["sans"], 7.15, 9.3, tw - 16, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.1)
        c.drawString(x + 8, ty + 6, src)

    rrect(c, INNER, FOOTER_H + 8 * mm, CONTENT_W, 18 * mm, 2.8, fill=FOREST, stroke=None)
    para(
        c,
        "Honesty: programme-reported meals to date are in the hundreds of thousands (355 000 on the Group site), not millions. "
        "The 2.5 million children-per-day NSNP figure is a DBE-pathway plan, not a current daily headcount. "
        "SupplierAdvisor® does not replace BAS or LOGIS.",
        INNER + 8,
        FOOTER_H + 20 * mm,
        F["sans"],
        7.15,
        9.5,
        CONTENT_W - 16,
        GOLD_LT,
    )

    c.setFillColor(GOLD_LT)
    c.setFont(F["sans"], 6.1)
    c.drawString(INNER, 5.4, "CONFIDENTIAL  ·  NFNSP-2  ·  v2.0  ·  September 2026")
    c.drawCentredString(PAGE_W / 2, 5.4, "Big Five Group (Pty) Ltd  ×  Department of Agriculture")
    c.setFont(F["sansBold"], 6.4)
    c.drawRightString(PAGE_W - INNER, 5.4, f"1   /   {TOTAL}")
    c.showPage()


# ---------------------------------------------------------------------------
# Contents
# ---------------------------------------------------------------------------
def page_contents(c):
    y = chrome(c, 2, "Contents  ·  how to read this proposal")
    kicker(c, "02  ·  Contents", INNER, y)
    y -= 11 * mm
    toc = [
        ("01", "Cover — sourced national figures", "1"),
        ("02", "Contents and reading rules", "2"),
        ("03", "Executive summary", "3"),
        ("04", "The Plan — Goals 1–3", "4"),
        ("05", "The Plan — Enablers A–C and horizons", "5"),
        ("06", "How Big Five achieves Goals 1–2", "6"),
        ("07", "How Big Five achieves Goal 3 and Enablers A–C", "7"),
        ("08", "Nine pillars as one circuit", "8"),
        ("09", "Why now · reading the Plan · who we are", "9"),
        ("10", "Foods, workstreams, demonstration", "10"),
        ("11", "SupplierAdvisor® farm-to-fork operating system", "11"),
        ("12", "90-day ask and what we return", "12"),
        ("13", "Risk, labelled figures, conclusion", "13"),
    ]
    for n, t, p in toc:
        c.setStrokeColor(RULE)
        c.setLineWidth(0.35)
        c.setDash(0.8, 1.6)
        c.line(INNER + 16 * mm, y + 2, PAGE_W - INNER - 12 * mm, y + 2)
        c.setDash()
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER, y, n)
        c.setFillColor(INK)
        c.setFont(F["sans"], 9)
        c.drawString(INNER + 14 * mm, y, t)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8)
        c.drawRightString(PAGE_W - INNER, y, p)
        y -= 9.4 * mm

    y -= 3 * mm
    kicker(c, "How to read figures", INNER, y)
    y -= 9 * mm
    note = (
        "Official statistics (GHS 2024, NFNSS 2023, Poverty Trends 2025, NFNSP-2 Draft 2.2 / Results Framework 27 August 2026) carry a source. "
        "Group figures carry a label: plan, programme-reported, product specification, or internal comparison. "
        "This document does not invent government contracts, awarded tenders, or current daily NSNP volumes. "
        "SupplierAdvisor® does not replace BAS or LOGIS. No learner names. No beneficiary databases on the partner portal. "
        "This briefing does not replace the Plan; it proposes how to operationalise it."
    )
    nh = measure(c, note, F["sans"], 8.0, 10.8, CONTENT_W - 18) + 14
    rrect(c, INNER, y - nh, CONTENT_W, nh, 3, fill=CREAM, stroke=GOLD, sw=0.45)
    forest_bar(c, INNER, y - nh, nh)
    para(c, note, INNER + 10, y - 8, F["sans"], 8.0, 10.8, CONTENT_W - 18, MUTED)
    c.showPage()


# ---------------------------------------------------------------------------
# Executive summary
# ---------------------------------------------------------------------------
def page_exec(c):
    y = chrome(c, 3, "Executive summary")
    kicker(c, "03  ·  Executive summary", INNER, y)
    y -= 10 * mm

    lead = (
        "South Africa has a Plan. What it needs now is an implementation partner that can put a lawful plate on the table, "
        "a verified smallholder lot behind that plate, and proof that both happened — without claiming a government contract that has not been awarded."
    )
    lh = measure(c, lead, F["serifItalic"], 11, 14.4, CONTENT_W - 16) + 12
    rrect(c, INNER, y - lh, CONTENT_W, lh, 3, fill=FOREST, stroke=None)
    para(c, lead, INNER + 8, y - 9, F["serifItalic"], 11, 14.4, CONTENT_W - 16, GOLD_LT)
    y -= lh + 7 * mm

    paras = [
        "The National Food and Nutrition Security Plan 2027–2037 (NFNSP-2 Draft 2.2, July 2026, and Results Framework 27 August 2026) is the Department of Agriculture’s blueprint for Goals 1–3 and Enablers A–C: reduce hunger; scale nutrition for the first 1 000 days and school feeding; build inclusive food systems with a rising smallholder share of public procurement; and enable that work through governance, data (MELIA), and a lawful finance/procurement path.",
        "The Plan’s own numbers are the case for urgency. GHS 2024: 22.2% of households have inadequate or severely inadequate food access (Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%). NFNSS 2023: about 29% of children under five stunted; 15% severely (Framework working baseline 27%). Poverty Trends 2025: 17.6% below the food poverty line of R777 pp/pm (2023 prices); 71% of the poor in 2023 were under 35. Plan targets: 10% / 20% / 30% smallholder share of government food procurement by 2029 / 2033 / 2037, and complementary feeding in 50% of high-risk areas by 2029.",
        "Big Five Group (Pty) Ltd proposes to operationalise those goals as one coherent system — not nine disconnected companies. Agri verifies smallholders. Foods turns grain into fortified ambient meals in 5 kg institutional formats. Direct takes the plate to the last mile. Connect (SupplierAdvisor®) is the farm-to-fork operating system. Leadership (Super-Cube®) forms the people. Access opens capital. Impact is the PMO. Foundation channels 10% of group profits with proof. Global holds standards when corridors extend.",
        "We ask for 90 days: a closed technical briefing; KwaZulu-Natal named as joint demonstration province (two local municipalities + one metro cluster); a time-boxed PFMA/MFMA workstream; a MELIA data protocol; and a seat at the private-sector round tables the 27 August 2026 Framework is already written for. Scale only after a closed circuit holds. A second high-inadequacy province (Eastern Cape is the Plan’s own reference) is Phase 2 — not a current claim.",
    ]
    for p in paras:
        used = para(c, p, INNER, y, F["sans"], 8.05, 10.9, CONTENT_W, INK)
        y -= used + 4.6 * mm

    y -= 2 * mm
    close = (
        "Confidential partner briefing. It is not a government publication, not an awarded tender, and not a claim of current NSNP daily headcount. "
        "Programme-reported meals to date: 355 000 (Group site). 2.5 million children per day is a DBE-pathway plan."
    )
    ch = measure(c, close, F["sans"], 7.3, 9.6, CONTENT_W - 16) + 20
    rrect(c, INNER, y - ch, CONTENT_W, ch, 3, fill=CREAM, stroke=GOLD, sw=0.4)
    forest_bar(c, INNER, y - ch, ch)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.3)
    c.drawString(INNER + 10, y - 8, "THIS WORKSPACE")
    para(c, close, INNER + 10, y - 18, F["sans"], 7.3, 9.6, CONTENT_W - 18, MUTED)
    c.showPage()


# ---------------------------------------------------------------------------
# Goals 1–3
# ---------------------------------------------------------------------------
GOALS = [
    (
        "GOAL 1",
        "Reduce hunger — plates that can be bought and proved",
        "GHS 2024: 22.2% of households have inadequate or severely inadequate food access. Worst: Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%. Hunger is an access and last-mile problem as much as a production problem.",
        "A meal institutions can buy lawfully (PFMA/MFMA), kitchens can cook in minutes, that holds ambient, and that can be proved by lot — not a slogan.",
        "GHS 2024, as cited in NFNSP-2",
    ),
    (
        "GOAL 2",
        "Scale nutrition — first 1 000 days and school feeding",
        "NFNSS 2023: about 29% of children under five stunted; 15% severely. Framework working baseline: 27%. Complementary feeding in 50% of high-risk areas by 2029 is a Plan target, not a Group delivery claim.",
        "High-impact nutrition for women, infants and children; NSNP/ECD/CNDC plates that are fortified, fast to cook, and safe; people in kitchens who can run the protocol.",
        "NFNSS 2023  ·  Framework 27 Aug 2026",
    ),
    (
        "GOAL 3",
        "Inclusive food systems — smallholder share of public procurement",
        "Plan targets 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement. That target fails if the smallholder has no identity, no GPS, no lot and no invoice that PFMA can see.",
        "Verified producers, aggregation, a mill that can take a lot, and a buying path that is lawful — not a database of names without trade.",
        "NFNSP-2 procurement horizons",
    ),
]


def page_goals(c):
    y = chrome(c, 4, "The Plan — Goals 1–3")
    kicker(c, "04  ·  What the Department’s Plan asks", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Goals 1–3 as read from NFNSP-2 Draft 2.2 (July 2026) and the Results Framework of 27 August 2026. This page states the problem and what the Plan asks. How Big Five answers each goal follows on pages 6–7.",
        INNER,
        y,
        F["sans"],
        7.6,
        10.2,
        CONTENT_W,
        MUTED,
    )
    y -= 16 * mm

    for n, title, problem, asks, src in GOALS:
        pw = CONTENT_W - 18
        ph = measure(c, problem, F["sans"], 7.35, 9.7, pw)
        ah = measure(c, "The Plan asks: " + asks, F["sans"], 7.45, 9.8, pw)
        h = 22 + ph + 8 + ah + 12
        rrect(c, INNER, y - h, CONTENT_W, h, 3, fill=white, stroke=GOLD, sw=0.5)
        forest_bar(c, INNER, y - h, h)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 7)
        c.drawString(INNER + 10, y - 9, n)
        c.setFillColor(FOREST)
        c.setFont(F["serifBold"], 11.2)
        c.drawString(INNER + 10, y - 20, title)
        para(c, problem, INNER + 10, y - 32, F["sans"], 7.35, 9.7, pw, MUTED)
        para(c, "The Plan asks: " + asks, INNER + 10, y - 32 - ph - 6, F["sans"], 7.45, 9.8, pw, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.1)
        c.drawString(INNER + 10, y - h + 6, src)
        y -= h + 4.5 * mm
    c.showPage()


# ---------------------------------------------------------------------------
# Enablers
# ---------------------------------------------------------------------------
def page_enablers(c):
    y = chrome(c, 5, "The Plan — Enablers A–C")
    kicker(c, "05  ·  Enablers the goals cannot run without", INNER, y)
    y -= 9 * mm
    ens = [
        (
            "ENABLER A  ·  GOVERNANCE AND COORDINATION",
            "A multi-department briefing that can actually sit: NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD, KZN Treasury, SALGA KZN. Private-sector round tables and municipal roadshows the 27 August 2026 Framework is written for.",
            "Impact as PMO — one programme, one risk register, one cadence. Super-Cube® so coordination is a skill, not a meeting. 90-day asks 1 and 5.",
        ),
        (
            "ENABLER B  ·  DATA AND MELIA",
            "Evidence that a plate was produced, held, shipped and received — inside the Plan’s monitoring architecture, not in a parallel dashboard.",
            "SupplierAdvisor® extracts sit inside MELIA, not beside it. Lot-and-kitchen proof only. No learner names. SchoolAdvisor gates: a kitchen that is not ready does not receive the next lot.",
        ),
        (
            "ENABLER C  ·  FINANCE AND PROCUREMENT",
            "A time-boxed answer to how a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target actually requires.",
            "90-day ask 3 before any scale claim. Access for capital. Connect GL / AR / AP / VAT and selected bank feeds (FNB Integration Channel, BankLink). Foundation: 10% of group profits as a complementary rail.",
        ),
    ]
    for t, asks, deliver in ens:
        pw = CONTENT_W - 20
        ah = measure(c, "The Plan asks: " + asks, F["sans"], 7.4, 9.8, pw)
        dh = measure(c, "Big Five: " + deliver, F["sans"], 7.4, 9.8, pw)
        h = 16 + ah + 6 + dh + 8
        rrect(c, INNER, y - h, CONTENT_W, h, 3, fill=white, stroke=GOLD, sw=0.45)
        forest_bar(c, INNER, y - h, h)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 7)
        c.drawString(INNER + 10, y - 9, t)
        para(c, "The Plan asks: " + asks, INNER + 10, y - 20, F["sans"], 7.4, 9.8, pw, MUTED)
        para(c, "Big Five: " + deliver, INNER + 10, y - 20 - ah - 5, F["sans"], 7.4, 9.8, pw, INK)
        y -= h + 4.2 * mm

    y -= 1 * mm
    kicker(c, "Horizons the Plan itself writes", INNER, y)
    y -= 9 * mm
    rows = [
        ("2029", "10%", "Complementary feeding in 50% of high-risk areas"),
        ("2033", "20%", "Scale only after a closed-circuit demonstration"),
        ("2037", "30%", "National pathway — not a current claim"),
    ]
    col_w = (CONTENT_W - 8 * mm) / 3
    hh = 20 * mm
    for i, (year, sh, note) in enumerate(rows):
        x = INNER + i * (col_w + 4 * mm)
        rrect(c, x, y - hh, col_w, hh, 2.5, fill=CREAM, stroke=GOLD, sw=0.4)
        c.setFillColor(FOREST)
        c.setFont(F["serifBold"], 16)
        c.drawString(x + 7, y - 13, sh)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 7)
        c.drawRightString(x + col_w - 7, y - 11, year)
        para(c, note, x + 7, y - 22, F["sans"], 6.6, 8.4, col_w - 14, MUTED)
    c.showPage()


# ---------------------------------------------------------------------------
# How we achieve goals
# ---------------------------------------------------------------------------
HOW_G1 = (
    "GOAL 1 — REDUCE HUNGER",
    [
        "Foods: fortified porridge, soya, OnePot and soups at approximate institutional cost points (~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot). Internal comparison: ~50% below wholesale/retail. 24-month ambient shelf life (product specification).",
        "Direct: last-mile nodes so the plate reaches rank, rural and informal-trade markets. SANTACO 15 000 containers is pathway design, not a live national fleet.",
        "Connect: purchase orders, invoices and lot holds so a school or CNDC can show what was received.",
        "Impact: programme gates so delivery is reported as programme-reported until audited.",
    ],
    "Pillars: Foods  ·  Direct  ·  Connect  ·  Impact",
)
HOW_G2 = (
    "GOAL 2 — SCALE NUTRITION",
    [
        "Foods: one SKU family across NSNP, ECD, CNDC and holiday packs. 5 kg institutional formats. 5-minute porridge / 20-minute OnePot. 74% more nutrition / 185% more fortification are formulation/design claims — lab pack in the first 90 days.",
        "Leadership (Super-Cube®): whole-person capability for implementers, school-environment support, and municipal nutrition officers.",
        "Connect / SchoolAdvisor: kitchen gates and lot-and-kitchen proof. No learner names.",
        "Foundation: 10% of group profits (standing Group policy) as a complementary CSI rail — not a substitute for the fiscus.",
    ],
    "Pillars: Foods  ·  Leadership  ·  Connect  ·  Foundation",
)
HOW_G3 = (
    "GOAL 3 — INCLUSIVE FOOD SYSTEMS / SMALLHOLDER PROCUREMENT",
    [
        "Agri: regenerative onboarding, soil and practice verification, offtake into Foods. Farmers are trained as suppliers, not as beneficiaries of a once-off drop.",
        "Connect (SupplierAdvisor®): identity, GPS, lots, invoices so the 10% target survives PFMA.",
        "Foods mill: BOM, MPS, MRP, HACCP — the lot becomes a plate.",
        "Access: institutional, CSI and DFI pathways that finance real offtake, not workshops.",
        "Direct: local markets so smallholder value is not trapped at the farm gate.",
    ],
    "Pillars: Agri  ·  Connect  ·  Foods  ·  Access  ·  Direct",
)


def draw_how_block(c, y, title, lines, pil) -> float:
    inner_w = CONTENT_W - 18
    body = 0.0
    for line in lines:
        body += measure(c, line, F["sans"], 7.05, 9.25, inner_w) + 2.1 * mm
    h = 16 + body + 11
    rrect(c, INNER, y - h, CONTENT_W, h, 2.6, fill=white, stroke=GOLD, sw=0.45)
    forest_bar(c, INNER, y - h, h)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 7.2)
    c.drawString(INNER + 10, y - 9, title)
    yy = y - 18
    yy = bullets(c, lines, INNER + 10, yy, inner_w)
    c.setFillColor(FOREST)
    c.setFont(F["sansBold"], 7.1)
    c.drawString(INNER + 10, y - h + 6, pil)
    return y - h - 4.2 * mm


def page_how_12(c):
    y = chrome(c, 6, "How Big Five achieves Goals 1–2")
    kicker(c, "06  ·  Each objective, answered with a circuit", INNER, y)
    y -= 9 * mm
    para(
        c,
        "Not a slogan against a target. Each Plan goal is answered with named pillars, labelled Group figures, and an explicit non-claim where the work is still pathway design.",
        INNER,
        y,
        F["serifItalic"],
        8.6,
        11.4,
        CONTENT_W,
        FOREST,
    )
    y -= 18 * mm
    y = draw_how_block(c, y, *HOW_G1)
    y -= 2 * mm
    y = draw_how_block(c, y, *HOW_G2)
    c.showPage()


def page_how_3e(c):
    y = chrome(c, 7, "How Big Five achieves Goal 3 and Enablers A–C")
    kicker(c, "07  ·  Smallholders, governance, data, finance", INNER, y)
    y -= 9 * mm
    y = draw_how_block(c, y, *HOW_G3)

    ens = [
        (
            "ENABLER A — GOVERNANCE",
            [
                "Impact as PMO: one programme plan, one risk register, one reporting cadence.",
                "Leadership: Super-Cube® for public servants and implementers so coordination is a skill, not a meeting.",
                "90-day asks 1 and 5: the closed briefing and the seat at tables already in the Framework.",
            ],
            "Pillars: Impact  ·  Leadership",
        ),
        (
            "ENABLER B — DATA AND MELIA",
            [
                "SupplierAdvisor® extracts sit inside MELIA, not beside it (90-day ask 4).",
                "Lot-and-kitchen proof only. No learner names. No beneficiary PII on this portal. POPIA purpose-limited.",
                "SchoolAdvisor gates: a kitchen that is not ready does not receive the next lot.",
            ],
            "Pillars: Connect  ·  Impact",
        ),
        (
            "ENABLER C — FINANCE AND PROCUREMENT",
            [
                "90-day ask 3: PFMA/MFMA workstream before any scale claim.",
                "Access: capital pathways for verified nodes and producers.",
                "Connect: GL / AR / AP / VAT and selected bank feeds (FNB Integration Channel, BankLink) so money and lots reconcile.",
                "Foundation: 10% of group profits as a complementary rail.",
            ],
            "Pillars: Access  ·  Connect  ·  Foundation",
        ),
    ]
    for title, lines, pil in ens:
        y = draw_how_block(c, y, title, lines, pil)
    c.showPage()


# ---------------------------------------------------------------------------
# Pillars / circuit
# ---------------------------------------------------------------------------
def page_pillars(c):
    y = chrome(c, 8, "Nine pillars as one circuit")
    kicker(c, "08  ·  Feed  ·  Educate  ·  Empower", INNER, y)
    y -= 9 * mm
    para(
        c,
        "The Department does not need nine vendors. It needs one circuit that can put a lot on a mill, a plate in a kitchen, and proof in MELIA. Agri → Connect → Foods → Direct, with Leadership forming people and Impact reporting honestly.",
        INNER,
        y,
        F["serifItalic"],
        9.0,
        12.0,
        CONTENT_W,
        FOREST,
    )
    y -= 22 * mm

    steps = [
        ("01", "Agri", "Smallholders onboard with practice, soil and identity. Grain is a lot, not a donation."),
        ("02", "Connect", "SupplierAdvisor® records the lot, the invoice, the hold. BAS/LOGIS stay."),
        ("03", "Foods", "The mill turns the lot into a fortified ambient plate."),
        ("04", "Direct", "The plate moves to school, ECD, CNDC, rank and rural node."),
        ("05", "People", "Leadership runs the kitchen. Impact reports programme-reported until audited."),
    ]
    tw = (CONTENT_W - 8 * mm) / 5
    sh = 34 * mm
    for i, (n, t, d) in enumerate(steps):
        x = INNER + i * (tw + 2 * mm)
        rrect(c, x, y - sh, tw, sh, 2.4, fill=CREAM, stroke=GOLD, sw=0.4)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 7)
        c.drawString(x + 4.5, y - 8, n)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 7.6)
        c.drawString(x + 4.5, y - 16.5, t)
        para(c, d, x + 4.5, y - 25, F["sans"], 6.15, 8.0, tw - 9, MUTED)
    y -= sh + 7 * mm

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
    ph = 23 * mm
    for i, (t, mission, d) in enumerate(pillars):
        col, row = i % 3, i // 3
        x = INNER + col * (col_w + 3 * mm)
        ty = y - row * (ph + 3 * mm)
        rrect(c, x, ty - ph, col_w, ph, 2.2, fill=white, stroke=RULE, sw=0.4)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 5.8)
        c.drawString(x + 5, ty - 7, mission.upper())
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8.2)
        c.drawString(x + 5, ty - 16, t)
        para(c, d, x + 5, ty - 24, F["sans"], 6.3, 8.1, col_w - 10, MUTED)
    y -= 3 * (ph + 3 * mm) + 3 * mm

    kicker(c, "Where each pillar sits on the Plan", INNER, y)
    y -= 7 * mm
    cols = ["G1 Hunger", "G2 Nutrition", "G3 Smallholder", "EA Gov.", "EB MELIA", "EC Finance"]
    rows = [
        ("Agri", [0, 0, 1, 0, 0, 0]),
        ("Foods", [1, 1, 1, 0, 0, 0]),
        ("Leadership", [0, 1, 0, 1, 0, 0]),
        ("Connect", [1, 1, 1, 0, 1, 1]),
        ("Direct", [1, 0, 1, 0, 0, 0]),
        ("Access", [0, 0, 1, 0, 0, 1]),
        ("Impact", [1, 0, 0, 1, 1, 0]),
        ("Foundation", [0, 1, 0, 0, 0, 1]),
        ("Global", [0, 0, 0, 0, 0, 0]),
    ]
    name_w = 28 * mm
    cell_w = (CONTENT_W - name_w) / 6
    row_h = 6.1 * mm
    head_h = 7.2 * mm
    table_h = head_h + row_h * len(rows)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2, fill=white, stroke=GOLD, sw=0.4)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 5.6)
    c.drawString(INNER + 4, y - 5.4, "PILLAR")
    for i, lab in enumerate(cols):
        c.drawCentredString(INNER + name_w + i * cell_w + cell_w / 2, y - 5.4, lab)
    yy = y - head_h
    for i, (name, marks) in enumerate(rows):
        if i % 2:
            c.setFillColor(HexColor("#FBF7EE"))
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 6.4)
        c.drawString(INNER + 4, yy - 4.6, name)
        for j, m in enumerate(marks):
            cx = INNER + name_w + j * cell_w + cell_w / 2
            if m:
                c.setFillColor(GOLD)
                c.circle(cx, yy - 3.4, 2.1, fill=1, stroke=0)
            else:
                c.setFillColor(RULE)
                c.setFont(F["sans"], 7)
                c.drawCentredString(cx, yy - 4.6, "–")
        yy -= row_h
    c.setFillColor(MUTED)
    c.setFont(F["sansItalic"], 6)
    c.drawString(INNER, y - table_h - 5, "Gold mark = primary contribution. Global is held until a closed KZN circuit — not a current scale claim.")
    c.showPage()


# ---------------------------------------------------------------------------
# Why now / who we are
# ---------------------------------------------------------------------------
def page_why(c):
    y = chrome(c, 9, "Why now  ·  reading the Plan  ·  who we are")
    kicker(c, "09  ·  Why now — the Plan’s own numbers", INNER, y)
    y -= 8 * mm
    why = [
        ("Access is not improving fast enough", "GHS 2024: 22.2% of households have inadequate or severely inadequate food access. Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%.", "GHS 2024, as cited in NFNSP-2"),
        ("Stunting remains a first-1 000-days crisis", "NFNSS 2023: about 29% of children under five stunted; 15% severely. Framework working baseline: 27%. Complementary feeding target: 50% of high-risk areas by 2029.", "NFNSS 2023  ·  Framework 27 Aug 2026"),
        ("Poverty is young", "Poverty Trends 2025: 17.6% of people below the food poverty line of R777 per person per month (2023 prices). 71% of the poor in 2023 were under 35.", "Poverty Trends 2025, as cited in the Plan"),
        ("Procurement must reach smallholders", "Plan targets: 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement. That target only survives PFMA if lots, invoices and identity are real.", "NFNSP-2 procurement horizons"),
    ]
    for t, d, src in why:
        h = 24 * mm
        rrect(c, INNER, y - h, CONTENT_W, h, 2.4, fill=CREAM, stroke=RULE, sw=0.4)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER + 8, y - 8, t)
        para(c, d, INNER + 8, y - 16.5, F["sans"], 7.15, 9.3, CONTENT_W - 16, MUTED)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 5.9)
        c.drawString(INNER + 8, y - h + 5, src)
        y -= h + 3.2 * mm

    y -= 2 * mm
    kicker(c, "Reading the Plan", INNER, y)
    y -= 8 * mm
    para(
        c,
        "NFNSP-2 Draft 2.2 (July 2026) and the Results Framework of 27 August 2026 are the source documents. This briefing does not replace them. The 27 August 2026 Framework is written for private-sector round tables and municipal roadshows. The 90-day ask is a seat at those tables — not a claim that they have already been held with Big Five.",
        INNER,
        y,
        F["sans"],
        7.6,
        10.2,
        CONTENT_W,
        INK,
    )
    y -= 24 * mm
    kicker(c, "Who we are", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Big Five Group (Pty) Ltd — KwaZulu-Natal. Feed (Foods, Agri, Direct), Educate (Super-Cube®), Empower (SupplierAdvisor®, Foundation, Impact). Dr. Craig R. Muller, Founder — craig@bigfivegroup.africa  ·  +27 (0) 82 581 4215. This is a private partner workspace for the NFNSP Technical Working Group / Department of Agriculture. It does not speak for the Department.",
        INNER,
        y,
        F["sans"],
        7.6,
        10.2,
        CONTENT_W,
        INK,
    )
    c.showPage()


# ---------------------------------------------------------------------------
# Foods / workstreams / demonstration
# ---------------------------------------------------------------------------
def page_foods(c):
    y = chrome(c, 10, "Foods  ·  workstreams  ·  demonstration")
    kicker(c, "10  ·  Big Five Foods — labelled Group figures", INNER, y)
    y -= 8 * mm
    para(
        c,
        "One SKU family across NSNP, ECD, CNDC and holiday packs. Ambient, fortified, institutional 5 kg formats where school- or clinic-linked.",
        INNER,
        y,
        F["sans"],
        7.6,
        10.2,
        CONTENT_W,
        MUTED,
    )
    y -= 12 * mm
    foods = [
        ("~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot per meal", "Institutional cost points, approximate"),
        ("~50% below wholesale/retail", "Internal cost comparison"),
        ("24-month ambient shelf life", "Product specification"),
        ("74% more nutrition / 185% more fortification", "Formulation / design claims; lab pack in first 90 days"),
        ("ISO 9001, FSSC 22000, Sedex, SANHA Halaal, Kosher, SAAFoST", "As published on bigfivegroup.africa/foods"),
    ]
    col_w = (CONTENT_W - 6 * mm) / 2
    fh = 18 * mm
    for i, (t, lab) in enumerate(foods[:4]):
        col, row = i % 2, i // 2
        x = INNER + col * (col_w + 6 * mm)
        ty = y - row * (fh + 3 * mm)
        rrect(c, x, ty - fh, col_w, fh, 2.2, fill=white, stroke=RULE, sw=0.4)
        c.setFillColor(INK)
        c.setFont(F["sansBold"], 7.3)
        para(c, t, x + 6, ty - 7, F["sansBold"], 7.3, 9.2, col_w - 12, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.1)
        c.drawString(x + 6, ty - fh + 5, lab)
    y -= 2 * (fh + 3 * mm) + 2 * mm
    rrect(c, INNER, y - 14 * mm, CONTENT_W, 14 * mm, 2.2, fill=CREAM, stroke=GOLD, sw=0.4)
    c.setFillColor(FOREST)
    c.setFont(F["sansBold"], 7.4)
    c.drawString(INNER + 8, y - 6.5, foods[4][0])
    c.setFillColor(MUTED)
    c.setFont(F["sansItalic"], 6.1)
    c.drawString(INNER + 8, y - 12, foods[4][1])
    y -= 20 * mm

    kicker(c, "Five workstreams A–E", INNER, y)
    y -= 8 * mm
    ws = [
        ("A", "Plates", "One SKU family across NSNP, ECD, CNDC and holiday packs. 5 kg institutional packs."),
        ("B", "Markets", "Costed container / micro-hub spec for an IDP / DDM One Plan. SANTACO rank + rural nodes."),
        ("C", "Producers", "SupplierAdvisor® identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("D", "Agency", "5-minute porridge / 20-minute OnePot; 6–23 month complementary feeding. Super-Cube® for implementers."),
        ("E", "OS", "Onboarding, FNB/BankLink feeds, SchoolAdvisor gates, POPIA MELIA extract. No learner names."),
    ]
    for letter, t, d in ws:
        rrect(c, INNER, y - 14 * mm, CONTENT_W, 14 * mm, 2.2, fill=white, stroke=RULE, sw=0.35)
        c.setFillColor(FOREST)
        c.circle(INNER + 9, y - 7, 4.6, fill=1, stroke=0)
        c.setFillColor(GOLD_LT)
        c.setFont(F["sansBold"], 7.4)
        c.drawCentredString(INNER + 9, y - 8.8, letter)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER + 17, y - 5.8, t)
        para(c, d, INNER + 17, y - 12.4, F["sans"], 7.0, 9.0, CONTENT_W - 24, MUTED)
        y -= 15.6 * mm

    y -= 1 * mm
    kicker(c, "Demonstration design", INNER, y)
    y -= 8 * mm
    demo = (
        "Phase 1: two KZN local municipalities + one metro cluster (rural Zululand-type, peri-urban, dense informal-trade node in eThekwini or Msunduzi). "
        "Phase 2: a second high-inadequacy province (Eastern Cape is the Plan’s own reference). Scale only after a closed circuit holds."
    )
    dh = measure(c, demo, F["sans"], 7.6, 10.2, CONTENT_W - 16) + 14
    rrect(c, INNER, y - dh, CONTENT_W, dh, 3, fill=FOREST, stroke=None)
    para(c, demo, INNER + 8, y - 8, F["sans"], 7.6, 10.2, CONTENT_W - 16, GOLD_LT)
    c.showPage()


# ---------------------------------------------------------------------------
# OS
# ---------------------------------------------------------------------------
def page_os(c):
    y = chrome(c, 11, "SupplierAdvisor® farm-to-fork OS")
    kicker(c, "11  ·  Operating system", INNER, y)
    y -= 9 * mm
    c.setFillColor(FOREST)
    c.setFont(F["serifBold"], 13)
    c.drawString(INNER, y, "One workspace: network, buy, make, hold, ship, pay, prove")
    y -= 10 * mm
    rrect(c, INNER, y - 12 * mm, CONTENT_W, 12 * mm, 2.5, fill=FOREST, stroke=None)
    para(
        c,
        "SupplierAdvisor® does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have.",
        INNER + 8,
        y - 5.5,
        F["sansBold"],
        8.0,
        10.4,
        CONTENT_W - 16,
        GOLD_LT,
    )
    y -= 17 * mm
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
    for i, m in enumerate(mods):
        col, row = i % 3, i // 3
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * 11 * mm
        rrect(c, x, ty - 9.5 * mm, tw, 9.5 * mm, 2, fill=CREAM, stroke=RULE, sw=0.35)
        c.setFillColor(INK)
        c.setFont(F["sans"], 6.7)
        c.drawString(x + 5, ty - 6.4, m)
    y -= 4 * 11 * mm + 6 * mm

    kicker(c, "Actor table — farm to fork", INNER, y)
    y -= 6 * mm
    actors = [
        ("Smallholder", "Identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("Aggregation hub", "Receive, grade, lot, hold."),
        ("Foods mill", "BOM, MPS, MRP, HACCP, ship-or-hold."),
        ("Trader / distributor", "OTIFEF, inventory, invoices."),
        ("School / ECD / CNDC", "SchoolAdvisor gates. Lot-and-kitchen proof. No learner names."),
        ("Municipality / Treasury", "SLA, IDP/SDBIP annex, PFMA/MFMA workstream."),
        ("Bank / CSI / DFI", "FNB Integration Channel and BankLink feeds where selected."),
    ]
    head_h, row_h = 7 * mm, 12.2 * mm
    table_h = head_h + row_h * len(actors)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2.5, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.2)
    c.drawString(INNER + 8, y - 5, "ACTOR")
    c.drawString(INNER + 58 * mm, y - 5, "ROLE IN THE CIRCUIT")
    yy = y - head_h
    for i, (a, r) in enumerate(actors):
        if i % 2:
            c.setFillColor(HexColor("#FBF7EE"))
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 7.5)
        c.drawString(INNER + 8, yy - 7.6, a)
        para(c, r, INNER + 58 * mm, yy - 7.6, F["sans"], 7.2, 9.2, CONTENT_W - 66 * mm, MUTED)
        yy -= row_h
    c.showPage()


# ---------------------------------------------------------------------------
# 90-day ask
# ---------------------------------------------------------------------------
def page_ask(c):
    y = chrome(c, 12, "90-day ask")
    kicker(c, "12  ·  Five asks", INNER, y)
    y -= 8 * mm
    para(
        c,
        "What is asked in 90 days is a closed briefing, a named province, a lawful buying path, a MELIA protocol, and a seat at the tables already written into the Framework. Scale only after a closed circuit holds.",
        INNER,
        y,
        F["serifItalic"],
        8.6,
        11.4,
        CONTENT_W,
        FOREST,
    )
    y -= 18 * mm
    asks = [
        ("01", "Closed technical briefing", "NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD nutrition, KZN Provincial Treasury, SALGA KZN."),
        ("02", "Name KwaZulu-Natal", "Joint demonstration province — two local municipalities + one metro cluster."),
        ("03", "PFMA / MFMA workstream", "Time-boxed: how a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target actually requires."),
        ("04", "Data protocol", "SupplierAdvisor® extracts sit inside MELIA, not beside it. No learner names."),
        ("05", "A seat at the tables", "Private-sector round tables / municipal roadshows the 27 August 2026 Framework is written for."),
    ]
    for n, t, d in asks:
        rrect(c, INNER, y - 16.8 * mm, CONTENT_W, 16.8 * mm, 2.4, fill=white, stroke=RULE, sw=0.4)
        c.setFillColor(FOREST)
        c.circle(INNER + 11, y - 8.4, 5.4, fill=1, stroke=0)
        c.setFillColor(GOLD_LT)
        c.setFont(F["sansBold"], 6.6)
        c.drawCentredString(INNER + 11, y - 10.2, n)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8.2)
        c.drawString(INNER + 21, y - 6.6, t)
        para(c, d, INNER + 21, y - 14.2, F["sans"], 7.05, 9.2, CONTENT_W - 28, MUTED)
        y -= 18.6 * mm

    y -= 1 * mm
    kicker(c, "In return (90 days)", INNER, y)
    y -= 8 * mm
    ret = [
        "Costed node pack",
        "Three-menu institutional basket vs a reference school meal",
        "Producer-onboarding protocol",
        "Draft municipal SLA for an IDP/SDBIP annex",
        "One-page risk register",
    ]
    tw = (CONTENT_W - 8 * mm) / 2
    for i, item in enumerate(ret):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * 11 * mm
        rrect(c, x, ty - 9.5 * mm, tw, 9.5 * mm, 2, fill=CREAM, stroke=GOLD, sw=0.35)
        c.setFillColor(FOREST)
        c.setFont(F["sans"], 7.2)
        c.drawString(x + 6, ty - 6.4, item)
    c.showPage()


# ---------------------------------------------------------------------------
# Close
# ---------------------------------------------------------------------------
def page_close(c):
    y = chrome(c, 13, "Risk  ·  labelled figures  ·  conclusion")
    kicker(c, "13  ·  Governance and risk — what this briefing is not", INNER, y)
    y -= 8 * mm
    risks = [
        ("Presented as an awarded NSNP contract", "This briefing is a proposal. No government contract is claimed."),
        ("2.5 million daily meals read as current", "Labelled as DBE-pathway plan, not current headcount."),
        ("BAS / LOGIS replacement fear", "Explicit non-claim: SupplierAdvisor® does not replace BAS or LOGIS."),
        ("Learner data in MELIA extract", "Lot-and-kitchen proof only. No learner names. POPIA purpose-limited."),
        ("PFMA / MFMA cannot buy the meal", "90-day time-boxed legal workstream is ask 3 — before scale."),
    ]
    head_h, row_h = 7 * mm, 13.2 * mm
    table_h = head_h + row_h * len(risks)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2.4, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.2)
    c.drawString(INNER + 8, y - 5, "RISK")
    c.drawString(INNER + 82 * mm, y - 5, "MITIGATION")
    yy = y - head_h
    for i, (risk, mit) in enumerate(risks):
        if i % 2:
            c.setFillColor(HexColor("#FBF7EE"))
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 7.2)
        para(c, risk, INNER + 8, yy - 5.5, F["sansBold"], 7.2, 9.0, 70 * mm, FOREST)
        para(c, mit, INNER + 82 * mm, yy - 5.5, F["sans"], 7.1, 9.0, CONTENT_W - 90 * mm, MUTED)
        yy -= row_h
    y -= table_h + 7 * mm

    kicker(c, "Commercial model — labelled Group figures, not government contracts", INNER, y)
    y -= 8 * mm
    commercial = [
        ("355 000 meals", "Programme-reported, not audited public stats"),
        ("2.5 million children / day", "DBE-pathway delivery plan, not current headcount"),
        ("15 000 SANTACO containers", "Pathway design"),
        ("~20 jobs per mature node", "Design intent, to be measured"),
        ("10% of group profits to Foundation", "Standing Group policy"),
    ]
    tw = (CONTENT_W - 8 * mm) / 2
    for i, (t, lab) in enumerate(commercial):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 4 * mm)
        ty = y - row * 16 * mm
        if i == 4:
            x = INNER
        rrect(c, x, ty - 14 * mm, tw if i < 4 else CONTENT_W, 14 * mm, 2.2, fill=CREAM, stroke=RULE, sw=0.35)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 7.5)
        c.drawString(x + 7, ty - 6, t)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.1)
        c.drawString(x + 7, ty - 12, lab)
    y -= 3 * 16 * mm + 2 * mm

    kicker(c, "Conclusion", INNER, y)
    y -= 8 * mm
    close = (
        "The Plan has the targets. The Group has plates, an operating system, and a demonstration design. "
        "What is asked in 90 days is a closed briefing, a named province, a lawful buying path, a MELIA protocol, and a seat at the tables already written into the Framework. "
        "Nothing here is an awarded tender, a current daily NSNP headcount, or a replacement for BAS or LOGIS."
    )
    ch = measure(c, close, F["serifItalic"], 8.6, 11.6, CONTENT_W - 16) + 16
    rrect(c, INNER, y - ch, CONTENT_W, ch, 3, fill=FOREST, stroke=None)
    para(c, close, INNER + 8, y - 9, F["serifItalic"], 8.6, 11.6, CONTENT_W - 16, GOLD_LT)
    y -= ch + 6 * mm
    c.setFillColor(FOREST)
    c.setFont(F["sans"], 7.2)
    c.drawString(INNER, y, "Dr. Craig R. Muller  ·  craig@bigfivegroup.africa  ·  +27 (0) 82 581 4215  ·  bigfivegroup.africa")
    c.showPage()


def build():
    global NDA_PLATE, BFG_PLATE, HERO_IMG
    NDA_PLATE = plate(NDA, 1100, 360, pad=16)
    BFG_PLATE = plate(BFG, 420, 420, pad=16)
    HERO_IMG = make_hero()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("NFNSP-2 Implementation Partnership Proposal · Big Five Group")
    c.setAuthor("Big Five Group (Pty) Ltd")
    c.setSubject("Confidential partner briefing — not an awarded tender")
    c.setKeywords("NFNSP, Department of Agriculture, Big Five Foods, SupplierAdvisor")
    page_cover(c)
    page_contents(c)
    page_exec(c)
    page_goals(c)
    page_enablers(c)
    page_how_12(c)
    page_how_3e(c)
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
