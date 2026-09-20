#!/usr/bin/env python3
"""
Co-branded A4 portrait HOA briefing — Isidlo seSilo × Big Five Royal Foods.

Output: public/partners/zulu-kingdom-hoa-isidlo-sesilo.pdf

Run: python3 scripts/generate-zulu-hoa-pdf.py
"""

from __future__ import annotations

import os
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from PIL import ImageEnhance
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "partners" / "zulu-kingdom-hoa-isidlo-sesilo.pdf"
LEOPARD = ROOT / "public" / "partners" / "zulu-kingdom-leopard-hero.jpg"
ZK_LOGO = ROOT / "public" / "partners" / "zulu-kingdom-logo.png"
BFF_LOGO = ROOT / "public" / "bigfivefoods-logo.png"

PAGE_W, PAGE_H = A4

GOLD = HexColor("#E0B000")
GOLD_DK = HexColor("#A67C00")
GOLD_LT = HexColor("#F3D56B")
GOLD_SOFT = HexColor("#F3E6B0")
INK = HexColor("#0A0804")
INK_SOFT = HexColor("#2C261C")
MUTED = HexColor("#5C5346")
CREAM = HexColor("#FAF6EB")
CREAM_DEEP = HexColor("#F3EAD3")
CREAM_CARD = HexColor("#FFFCF6")
CHAR = HexColor("#120E0A")
EMERALD = HexColor("#14532D")
EMERALD_BG = HexColor("#ECFDF5")
EMERALD_BD = HexColor("#6EE7B7")
AMBER_BG = HexColor("#FFFBEB")
AMBER_BD = HexColor("#F5D76E")
AMBER_TX = HexColor("#92400E")
RULE_SOFT = HexColor("#E8D9A8")

M = 8 * mm
RAIL = 4.2 * mm
INNER = M + RAIL + 5.5 * mm
CONTENT_W = PAGE_W - 2 * INNER
FOOTER_H = 12.8 * mm
BODY_BOTTOM = FOOTER_H + 4.6 * mm
TOTAL_PAGES = 3


def register_fonts() -> dict[str, str]:
    candidates = {
        "sans": "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "sansBold": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
        "serif": "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        "serifBold": "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
        "serifItalic": "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
    }
    names: dict[str, str] = {}
    for key, path in candidates.items():
        font_name = f"HOA_{key}"
        if os.path.isfile(path):
            pdfmetrics.registerFont(TTFont(font_name, path))
            names[key] = font_name
        else:
            names[key] = "Times-Bold" if "Bold" in key else "Times-Roman"
    return names


FONTS = register_fonts()


def cover_resize(im: PILImage.Image, tw: int, th: int) -> PILImage.Image:
    scale = max(tw / im.width, th / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    left = max(0, (nw - tw) // 2)
    top = max(0, (nh - th) // 2)
    return im.crop((left, top, left + tw, top + th))


def to_reader(im: PILImage.Image, quality: int = 92) -> ImageReader:
    buf = BytesIO()
    if im.mode == "RGBA":
        im.save(buf, format="PNG", optimize=True)
    else:
        im.save(buf, format="JPEG", quality=quality, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def make_leopard_assets() -> dict[str, ImageReader]:
    src = PILImage.open(LEOPARD).convert("RGB")
    src = ImageEnhance.Contrast(src).enhance(1.12)
    src = ImageEnhance.Color(src).enhance(1.08)

    dpi = 170
    pw, ph = int(PAGE_W / 72 * dpi), int(PAGE_H / 72 * dpi)
    full = cover_resize(src, pw, ph)

    cream = PILImage.new("RGB", (pw, ph), (250, 246, 235))
    wash = PILImage.blend(cream, full, 0.20)
    wash = ImageEnhance.Brightness(wash).enhance(1.03)

    header_h = int(100 * mm / 72 * dpi)
    hero = cover_resize(src, pw, header_h)
    dark = PILImage.new("RGB", hero.size, (18, 12, 8))
    grad = PILImage.linear_gradient("L").resize(hero.size)
    # Keep leopard vivid at the top; deepen only toward the baseline
    alpha = grad.point(lambda p: int(55 + p * (150 - 55) / 255))
    hero_dark = PILImage.composite(dark, hero, alpha)

    slim_h = int(34 * mm / 72 * dpi)
    slim = cover_resize(src, pw, slim_h)
    slim = PILImage.blend(slim, PILImage.new("RGB", slim.size, (16, 11, 7)), 0.48)

    foot_h = int(FOOTER_H / 72 * dpi)
    foot = cover_resize(src, pw, max(foot_h, 48))
    foot = foot.crop((0, 0, pw, foot_h))
    foot = PILImage.blend(foot, PILImage.new("RGB", foot.size, (16, 11, 7)), 0.30)

    rail_w = int(RAIL / 72 * dpi)
    rail = cover_resize(src, max(rail_w, 24), ph).crop((0, 0, rail_w, ph))

    return {
        "wash": to_reader(wash, 90),
        "hero": to_reader(hero_dark, 92),
        "slim": to_reader(slim, 90),
        "foot": to_reader(foot, 88),
        "rail": to_reader(rail, 88),
    }


def plate_logo(path: Path, box_w: int, box_h: int, pad: int = 10) -> ImageReader:
    im = PILImage.open(path).convert("RGBA")
    plate = PILImage.new("RGBA", (box_w, box_h), (255, 255, 255, 255))
    avail_w, avail_h = box_w - 2 * pad, box_h - 2 * pad
    scale = min(avail_w / im.width, avail_h / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    plate.paste(im, ((box_w - nw) // 2, (box_h - nh) // 2), im)
    return to_reader(plate)


def rrect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.7):
    if fill is not None:
        c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill is not None else 0, stroke=1 if stroke is not None else 0)


def clip_image(c, img, x, y, w, h, r=0):
    c.saveState()
    if r:
        p = c.beginPath()
        p.roundRect(x, y, w, h, r)
        c.clipPath(p, stroke=0, fill=0)
    c.drawImage(img, x, y, width=w, height=h, preserveAspectRatio=False, mask="auto")
    c.restoreState()


def wrap_text(c, text: str, font: str, size: float, max_w: float) -> list[str]:
    words = text.replace("\n", " ").split()
    if not words:
        return []
    lines: list[str] = []
    cur = words[0]
    for word in words[1:]:
        trial = f"{cur} {word}"
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)
    return lines


def draw_lines(c, lines, x, y, font, size, leading, color) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    yy = y
    for line in lines:
        c.drawString(x, yy, line)
        yy -= leading
    return y - yy


def draw_para(c, text, x, y, font, size, leading, max_w, color) -> float:
    return draw_lines(c, wrap_text(c, text, font, size, max_w), x, y, font, size, leading, color)


def draw_tracked(c, text, x, y, font, size, tracking, color) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    cx = x
    for ch in text:
        c.drawString(cx, y, ch)
        cx += c.stringWidth(ch, font, size) + tracking
    return cx - x


def tracked_width(c, text, font, size, tracking) -> float:
    c.setFont(font, size)
    if not text:
        return 0.0
    return c.stringWidth(text, font, size) + tracking * (len(text) - 1)


def badge(c, text, x, y, *, fill, stroke, text_color, size=6.5, h=11.4, pad=5.4) -> float:
    font = FONTS["sansBold"]
    c.setFont(font, size)
    w = c.stringWidth(text, font, size) + pad * 2
    rrect(c, x, y, w, h, h / 2, fill=fill, stroke=stroke, sw=0.75)
    c.setFillColor(text_color)
    c.drawString(x + pad, y + 3.2, text)
    return w


def gold_double_rule(c, x, y, w):
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(x, y, x + w, y)
    c.setLineWidth(0.35)
    c.setStrokeColor(GOLD_LT)
    c.line(x, y - 2.15, x + w, y - 2.15)


def section_label(c, eyebrow, x, y):
    draw_tracked(c, eyebrow.upper(), x, y, FONTS["sansBold"], 6.35, 0.82, GOLD_DK)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.45)
    c.line(x, y - 3.3, x + 20, y - 3.3)


def gold_dot(c, x, y):
    c.setFillColor(GOLD)
    c.circle(x + 2.0, y + 2.4, 1.55, fill=1, stroke=0)


def check_item(c, text, x, y, max_w, size=7.0, leading=9.2, color=INK_SOFT) -> float:
    gold_dot(c, x, y)
    return max(draw_para(c, text, x + 9.5, y, FONTS["sans"], size, leading, max_w - 9.5, color), leading)


# ---------------------------------------------------------------------------
# Page décor
# ---------------------------------------------------------------------------

ASSETS: dict[str, ImageReader] = {}
ZK_PLATE: ImageReader | None = None
BFF_PLATE: ImageReader | None = None


def draw_page_ground(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.drawImage(ASSETS["wash"], 0, 0, width=PAGE_W, height=PAGE_H, mask="auto")
    c.drawImage(ASSETS["rail"], M, 0, width=RAIL, height=PAGE_H, mask="auto")
    c.drawImage(ASSETS["rail"], PAGE_W - M - RAIL, 0, width=RAIL, height=PAGE_H, mask="auto")
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.4)
    c.rect(M - 1.1, M - 1.1, PAGE_W - 2 * (M - 1.1), PAGE_H - 2 * (M - 1.1), fill=0, stroke=1)
    c.setLineWidth(0.35)
    c.setStrokeColor(GOLD_LT)
    c.rect(M + 1.7, M + 1.7, PAGE_W - 2 * (M + 1.7), PAGE_H - 2 * (M + 1.7), fill=0, stroke=1)


def draw_footer(c, page_num: int):
    """Always painted last so the leopard footer is never covered."""
    y = M + 0.6
    w = PAGE_W - 2 * M - 4.2
    x = M + 2.1
    h = FOOTER_H - 1.4
    clip_image(c, ASSETS["foot"], x, y, w, h, r=2.2)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.05)
    c.line(INNER, y + h - 0.4, PAGE_W - INNER, y + h - 0.4)
    ty = y + 4.6
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 6.2)
    c.drawString(INNER, ty, "BF/RH/HOA/FINAL-V5")
    c.setFillColor(GOLD)
    c.setFont(FONTS["sans"], 6.15)
    c.drawCentredString(PAGE_W / 2, ty, "Principal terms · subject to signature")
    c.setFont(FONTS["sansBold"], 6.3)
    c.drawRightString(PAGE_W - INNER, ty, f"Page {page_num} of {TOTAL_PAGES}")


def draw_cobrand(c, x, y, zk_w=44 * mm, zk_h=15.6 * mm, bff=15.6 * mm):
    rrect(c, x, y, zk_w, zk_h, 3.0, fill=white, stroke=GOLD, sw=1.1)
    c.drawImage(
        ZK_PLATE,
        x + 2.0,
        y + 1.2,
        width=zk_w - 4.0,
        height=zk_h - 2.4,
        mask="auto",
        preserveAspectRatio=True,
        anchor="c",
    )
    gap = 7.2 * mm
    c.setFillColor(GOLD)
    c.setFont(FONTS["serif"], 12)
    c.drawCentredString(x + zk_w + gap / 2 + 0.6, y + zk_h / 2 - 3.4, "×")
    bx = x + zk_w + gap
    rrect(c, bx, y, bff, bff, 3.0, fill=white, stroke=GOLD, sw=1.1)
    c.drawImage(
        BFF_PLATE,
        bx + 1.5,
        y + 1.5,
        width=bff - 3.0,
        height=bff - 3.0,
        mask="auto",
        preserveAspectRatio=True,
        anchor="c",
    )
    return bx + bff


def draw_slim_header(c, running: str) -> float:
    h = 29.5 * mm
    y = PAGE_H - M - h
    clip_image(c, ASSETS["slim"], M + 2.0, y, PAGE_W - 2 * M - 4.0, h)
    gold_double_rule(c, INNER, PAGE_H - M - 3.0, CONTENT_W)
    draw_cobrand(c, INNER, y + 7.2)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.2)
    c.drawRightString(PAGE_W - INNER, y + 18.4, "HEADS OF AGREEMENT")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifItalic"], 8.0)
    c.drawRightString(PAGE_W - INNER, y + 9.6, running)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.0)
    c.line(INNER, y + 1.2, PAGE_W - INNER, y + 1.2)
    return y


def paint_table_head(c, x, y, w, head_h, labels, cols):
    """Charcoal header with gold labels; square bottom, rounded top via clip."""
    c.saveState()
    p = c.beginPath()
    p.roundRect(x, y - head_h, w, head_h, 3.6)
    c.clipPath(p, stroke=0, fill=0)
    c.setFillColor(CHAR)
    c.rect(x, y - head_h, w, head_h + 4, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(CHAR)
    c.rect(x, y - head_h, w, 4, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.05)
    cx = x + 6.5
    for lab, cw in zip(labels, cols):
        c.drawString(cx, y - 5.15, lab)
        cx += cw


# ---------------------------------------------------------------------------
# Page 1
# ---------------------------------------------------------------------------

def page_1(c):
    draw_page_ground(c)

    header_h = 90 * mm
    hy = PAGE_H - M - header_h
    clip_image(c, ASSETS["hero"], M + 2.0, hy, PAGE_W - 2 * M - 4.0, header_h)

    gold_double_rule(c, INNER, PAGE_H - M - 3.2, CONTENT_W)
    draw_tracked(
        c,
        "THE ZULU KINGDOM  ×  BIG FIVE GROUP",
        INNER,
        PAGE_H - M - 10.0,
        FONTS["sansBold"],
        6.0,
        0.68,
        GOLD_SOFT,
    )
    tw = tracked_width(c, "CONFIDENTIAL PARTNER BRIEFING", FONTS["sansBold"], 6.0, 1.0)
    draw_tracked(
        c,
        "CONFIDENTIAL PARTNER BRIEFING",
        PAGE_W - INNER - tw,
        PAGE_H - M - 10.0,
        FONTS["sansBold"],
        6.0,
        1.0,
        GOLD_SOFT,
    )

    draw_cobrand(c, INNER, PAGE_H - M - 28.8 * mm)

    ty = PAGE_H - M - 37.2 * mm
    draw_tracked(c, "HEADS OF AGREEMENT  ·  ROYAL HOUSEHOLD", INNER, ty, FONTS["sansBold"], 6.5, 0.88, GOLD)

    c.setFillColor(white)
    c.setFont(FONTS["serifBold"], 25)
    c.drawString(INNER, ty - 22.5, "Isidlo seSilo")

    c.setFillColor(GOLD)
    c.setFont(FONTS["serifItalic"], 10.6)
    c.drawString(INNER, ty - 36.2, "Official Nutrition Programme of the Kingdom")

    c.setStrokeColor(GOLD)
    c.setLineWidth(0.65)
    c.line(INNER, ty - 42.0, INNER + 58 * mm, ty - 42.0)

    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifBold"], 12.2)
    c.drawString(INNER, ty - 54.8, "Big Five Royal Foods (Pty) Ltd")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 8.1)
    c.drawString(INNER, ty - 66.2, "Official Meal Partner of the Royal Household  —  awaiting Royal approval")

    # Contrast plate for badges + signing
    band_h = 20.8 * mm
    rrect(c, INNER - 2.5, hy + 3.2 * mm, CONTENT_W + 5, band_h, 3.4, fill=CHAR, stroke=GOLD, sw=0.85)

    by = hy + 13.4 * mm
    w1 = badge(
        c,
        "Principal terms · subject to signature",
        INNER + 5,
        by,
        fill=CHAR,
        stroke=GOLD,
        text_color=GOLD,
        size=6.45,
        h=12.0,
        pad=6.2,
    )
    badge(
        c,
        "Company established · awaiting Royal approval",
        INNER + 5 + w1 + 6,
        by,
        fill=HexColor("#102418"),
        stroke=EMERALD_BD,
        text_color=HexColor("#BBF7D0"),
        size=6.45,
        h=12.0,
        pad=6.2,
    )

    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.15)
    c.drawString(INNER + 5, hy + 6.4 * mm, "PROPOSED SIGNING")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 7.25)
    c.drawString(
        INNER + 33 * mm,
        hy + 6.4 * mm,
        "23 September 2026   ·   Zimbali Lakes Resort   ·   2nd Annual Amazulu Queens' High Tea",
    )

    y = hy - 7.2 * mm

    # Parties
    section_label(c, "1  ·  Parties & purpose", INNER, y)
    y -= 7.4 * mm
    col_g = 3.8 * mm
    col_w = (CONTENT_W - col_g) / 2
    card_h = 34.0 * mm
    parties = [
        (
            "Big Five Group (Pty) Ltd",
            "KZN-based food manufacturing group specialising in fortified porridge and one-pot meals (Big Five Foods™), with Agri offtake, Direct distribution, Leadership (Super-Cube®), Connect (SupplierAdvisor®), Foundation and Impact.",
        ),
        (
            "The Royal Household Partnership",
            "Represented by Prince Ntokozo and the Queens, in the presence of HRH Ndlunkulu laMakhubo and HRH Ndlunkulu kaMayisela.",
        ),
    ]
    for i, (name, body) in enumerate(parties):
        x = INNER + i * (col_w + col_g)
        rrect(c, x, y - card_h, col_w, card_h, 4.2, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
        c.setFillColor(GOLD)
        c.rect(x, y - card_h, 2.15, card_h, fill=1, stroke=0)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.9)
        c.drawString(x + 8, y - 8.6, "PARTY")
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.0)
        c.drawString(x + 8, y - 20.2, name)
        draw_para(c, body, x + 8, y - 32.2, FONTS["sans"], 7.25, 9.6, col_w - 16, MUTED)

    y -= card_h + 3.6 * mm

    pur_h = 22.8 * mm
    rrect(c, INNER, y - pur_h, CONTENT_W, pur_h, 4.2, fill=CHAR, stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.05)
    c.drawString(INNER + 8, y - 8.4, "PURPOSE")
    purpose = (
        "Principal terms for a strategic partnership to establish Isidlo seSilo — the Official Nutrition Programme of the Kingdom — "
        "and for Big Five Royal Foods (Pty) Ltd (now established) to be designated Official Meal Partner of the Royal Household, "
        "subject to Royal approval and HOA signature."
    )
    draw_para(c, purpose, INNER + 8, y - 18.8, FONTS["sans"], 7.35, 9.7, CONTENT_W - 16, GOLD_SOFT)
    y -= pur_h + 5.4 * mm

    section_label(c, "2  ·  Vision", INNER, y)
    y -= 6.6 * mm
    tiles = [
        "Creates sustainable jobs on Ingonyama Trust land",
        "Provides fortified nutrition for His Majesty’s people",
        "Operates under Ubuntu, Dignity, and Heritage",
        "Generates commercial returns for all stakeholders",
    ]
    tw = (CONTENT_W - 3 * 3.0 * mm) / 4
    th = 25.2 * mm
    for i, t in enumerate(tiles):
        x = INNER + i * (tw + 3.0 * mm)
        rrect(c, x, y - th, tw, th, 3.8, fill=CREAM_CARD, stroke=GOLD, sw=0.75)
        c.setFillColor(GOLD)
        c.setFont(FONTS["serifBold"], 12)
        c.drawString(x + 6, y - 11.5, f"0{i + 1}")
        draw_para(c, t, x + 6, y - 22.5, FONTS["sans"], 7.05, 9.2, tw - 12, INK_SOFT)
    y -= th + 5.6 * mm

    section_label(c, "3  ·  Operating company", INNER, y)
    y -= 6.6 * mm
    ent_h = 25.6 * mm
    rrect(c, INNER, y - ent_h, CONTENT_W, ent_h, 4.2, fill=CREAM_CARD, stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.rect(INNER, y - ent_h, 2.3, ent_h, fill=1, stroke=0)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 6.0)
    c.drawString(INNER + 10, y - 8.8, "BIG FIVE ROYAL FOODS (PTY) LTD")
    badge(
        c,
        "Incorporation complete",
        INNER + CONTENT_W - 39 * mm,
        y - 12.2,
        fill=EMERALD_BG,
        stroke=EMERALD_BD,
        text_color=EMERALD,
        size=6.0,
        h=10.4,
        pad=4.8,
    )
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 11.2)
    c.drawString(INNER + 10, y - 20.6, "Company established  ·  awaiting Royal approval")
    detail = (
        "Big Five Royal Foods (Pty) Ltd has been established and is awaiting Royal Household approval of the Heads of Agreement "
        "and Official Meal Partner designation. Incorporation is complete; royal endorsement and HOA signature remain outstanding. "
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term."
    )
    draw_para(c, detail, INNER + 10, y - 32.4, FONTS["sans"], 7.15, 9.4, CONTENT_W - 20, MUTED)
    y -= ent_h + 3.8 * mm

    wh = 14.8 * mm
    rrect(c, INNER, y - wh, CONTENT_W, wh, 3.8, fill=CREAM_DEEP, stroke=GOLD, sw=0.75)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.95)
    c.drawString(INNER + 8, y - 6.6, "WITNESSES NAMED IN THE HOA")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.2)
    c.drawString(INNER + 8, y - 17.0, "HRH Ndlunkulu laMakhubo")
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["serif"], 9)
    c.drawString(INNER + 66 * mm, y - 17.0, "·")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.2)
    c.drawString(INNER + 72 * mm, y - 17.0, "HRH Ndlunkulu kaMayisela")
    c.setFillColor(MUTED)
    c.setFont(FONTS["sansItalic"], 6.4)
    c.drawRightString(PAGE_W - INNER - 8, y - 17.0, "Ref  BF/RH/HOA/FINAL-V5")

    draw_footer(c, 1)
    c.showPage()


# ---------------------------------------------------------------------------
# Page 2
# ---------------------------------------------------------------------------

def page_2(c):
    draw_page_ground(c)
    slim_y = draw_slim_header(c, "Isidlo seSilo  ·  governance, patrons & roles")
    y = slim_y - 7.0 * mm

    section_label(c, "4  ·  Board of directors (HOA)", INNER, y)
    y -= 6.6 * mm
    used = draw_para(
        c,
        "Seats below are principal terms only. TBC designations remain open until the Royal Household and Big Five Group confirm them — they are not appointments.",
        INNER,
        y,
        FONTS["sansItalic"],
        7.15,
        9.4,
        CONTENT_W,
        MUTED,
    )
    y -= used + 3.0 * mm

    board = [
        ("Dr. Craig Ross Muller", "Executive Director / CEO", False),
        ("Prince Ntokozo", "Non-Executive Director / Royal Liaison", False),
        (
            "Dr. Joy (Natalie)",
            "Strategic Advisor — role TBC; invitee to Board pending final designation",
            True,
        ),
        ("Independent Chair", "To be appointed by mutual agreement", True),
    ]
    row_h = 11.2 * mm
    head_h = 7.6 * mm
    cols = [50 * mm, CONTENT_W - 50 * mm - 22 * mm, 22 * mm]
    table_h = head_h + row_h * len(board)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 3.8, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
    paint_table_head(c, INNER, y, CONTENT_W, head_h, ["PERSON", "PROPOSED SEAT", "STATUS"], cols)

    yy = y - head_h
    for i, (person, seat, tbc) in enumerate(board):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.55, yy - row_h, CONTENT_W - 1.1, row_h, fill=1, stroke=0)
        c.setStrokeColor(RULE_SOFT)
        c.setLineWidth(0.4)
        c.line(INNER + 4, yy, INNER + CONTENT_W - 4, yy)
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 8.8)
        c.drawString(INNER + 7, yy - 9.6, person)
        c.setFillColor(INK_SOFT)
        c.setFont(FONTS["sans"], 7.35)
        seat_lines = wrap_text(c, seat, FONTS["sans"], 7.35, cols[1] - 8)
        draw_lines(c, seat_lines, INNER + 7 + cols[0], yy - 9.6, FONTS["sans"], 7.35, 9.2, INK_SOFT)
        bx = INNER + cols[0] + cols[1] + 2.5
        if tbc:
            badge(c, "TBC", bx, yy - 11.0, fill=AMBER_BG, stroke=AMBER_BD, text_color=AMBER_TX, size=6.05, h=10.0, pad=5.2)
        else:
            badge(c, "Tabled", bx, yy - 11.0, fill=CREAM_DEEP, stroke=GOLD, text_color=GOLD_DK, size=6.05, h=10.0, pad=5.2)
        yy -= row_h

    y -= table_h + 6.2 * mm

    section_label(c, "5  ·  Royal patrons", INNER, y)
    y -= 6.4 * mm
    patrons = [
        (
            "HRH Ndlunkulu laMakhubo",
            "Senior Royal Patron",
            "Lead Patron for Izintombi Zesilo & Umkhosi woMhlanga (Reed Dance); champion for young women’s empowerment; host of Queens' High Tea",
        ),
        (
            "HRH Ndlunkulu kaMayisela",
            "Royal Patron",
            "Lead Patron for Amabutho catering, household welfare & royal ceremonies; champion for maternal health, family nutrition, and community outreach",
        ),
    ]
    pg = 3.4 * mm
    pw = (CONTENT_W - pg) / 2
    ph = 30.5 * mm
    for i, (person, role, lead) in enumerate(patrons):
        x = INNER + i * (pw + pg)
        rrect(c, x, y - ph, pw, ph, 4.0, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
        c.setFillColor(GOLD)
        c.rect(x, y - ph, 2.15, ph, fill=1, stroke=0)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.9)
        c.drawString(x + 9, y - 8.6, role.upper())
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.0)
        c.drawString(x + 9, y - 19.8, person)
        draw_para(c, lead, x + 9, y - 31.0, FONTS["sans"], 7.15, 9.4, pw - 16, MUTED)
    y -= ph + 4.4 * mm

    qh = 16.2 * mm
    rrect(c, INNER, y - qh, CONTENT_W, qh, 3.8, fill=CHAR, stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.0)
    c.drawString(INNER + 8, y - 6.8, "QUEENS  ·  JOINT MANDATE")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifItalic"], 8.15)
    mandate = "Approve meal standards worthy of His Majesty’s people, and lead all women-centric and community distribution programmes."
    draw_para(c, mandate, INNER + 8, y - 17.4, FONTS["serifItalic"], 8.15, 10.2, CONTENT_W - 16, GOLD_SOFT)
    y -= qh + 5.8 * mm

    section_label(c, "6  ·  Roles and responsibilities", INNER, y)
    y -= 6.6 * mm

    roles = [
        (
            "Dr. Craig Ross Muller",
            "Chief Executive Officer",
            False,
            [
                "Overall strategic leadership and execution",
                "Investor relations, finance, and capital raising",
                "Government and corporate partnerships: DTIC, DSD, KZN Provincial, Ingonyama Trust",
                "Commercial agreements, expansion, and profitability",
            ],
        ),
        (
            "Dr. Joy (Natalie)",
            "Strategic Advisor — Wellness, Product Integrity & Community Health (role TBC)",
            True,
            [
                "Expertise in nutrition, wellness, and fortified formulation",
                "Oversees product quality and health standards",
                "Final title after consultation with the Royal Household",
            ],
        ),
        (
            "Prince Ntokozo",
            "Board Member, Royal & Strategic Affairs",
            False,
            [
                "Official liaison between the Company and the Royal Household",
                "Custodian of the Royal Calendar and cultural protocol",
                "Facilitates engagement with Amakhosi, Izinduna, and Ingonyama Trust Board",
                "Governance oversight and protection of royal reputation",
            ],
        ),
    ]
    rg = 3.2 * mm
    rw = (CONTENT_W - 2 * rg) / 3
    rh = 54 * mm
    for i, (person, title, tbc, bullets) in enumerate(roles):
        x = INNER + i * (rw + rg)
        fill = AMBER_BG if tbc else CREAM_CARD
        stroke = AMBER_BD if tbc else GOLD
        rrect(c, x, y - rh, rw, rh, 4.0, fill=fill, stroke=stroke, sw=0.9)
        if tbc:
            badge(c, "ROLE TBC", x + 6, y - 11.4, fill=AMBER_BG, stroke=AMBER_BD, text_color=AMBER_TX, size=5.8, h=9.6, pad=4.4)
        else:
            badge(c, "TABLED ROLE", x + 6, y - 11.4, fill=CHAR, stroke=GOLD, text_color=GOLD, size=5.8, h=9.6, pad=4.4)
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 9.0)
        name_lines = wrap_text(c, person, FONTS["serifBold"], 9.0, rw - 13)
        ny = y - 22.4
        draw_lines(c, name_lines, x + 6.5, ny, FONTS["serifBold"], 9.0, 10.8, INK)
        ny = ny - 10.8 * len(name_lines) - 1.6
        title_used = draw_para(c, title, x + 6.5, ny, FONTS["sansItalic"], 6.45, 8.4, rw - 13, GOLD_DK)
        byy = ny - title_used - 3.6
        for b in bullets:
            used_b = check_item(c, b, x + 5.5, byy, rw - 13, size=6.7, leading=8.6)
            byy -= used_b + 2.1

    # Closing status band in remaining space — keeps the page from looking unfinished
    band_y = y - rh - 4.6 * mm
    band_h = 13.4 * mm
    rrect(c, INNER, band_y - band_h, CONTENT_W, band_h, 3.8, fill=CHAR, stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 5.9)
    c.drawString(INNER + 8, band_y - 5.8, "STATUS")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifItalic"], 7.85)
    c.drawString(
        INNER + 8,
        band_y - 15.4,
        "Big Five Royal Foods (Pty) Ltd is established and awaits Royal approval of the HOA and Official Meal Partner designation.",
    )

    draw_footer(c, 2)
    c.showPage()


# ---------------------------------------------------------------------------
# Page 3
# ---------------------------------------------------------------------------

def page_3(c):
    draw_page_ground(c)
    slim_y = draw_slim_header(c, "Isidlo seSilo  ·  activations, commercial & honesty")
    y = slim_y - 6.8 * mm

    section_label(c, "7  ·  Official royal activations (HOA-proposed)", INNER, y)
    y -= 6.2 * mm
    used = draw_para(
        c,
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term — not a live award. Headcounts as tabled in BF/RH/HOA/FINAL-V5.",
        INNER,
        y,
        FONTS["sansItalic"],
        7.05,
        9.2,
        CONTENT_W,
        MUTED,
    )
    y -= used + 2.8 * mm

    activations = [
        (
            "Izintombi Zesilo (Maidens)",
            "Umkhosi woMhlanga (Reed Dance), eNyokeni",
            "15,000–30,000 maidens · preparatory camps (2 weeks feeding) · quarterly cultural workshops",
        ),
        (
            "Amabutho (King’s Regiments)",
            "Umkhosi weLembe, Amabutho gatherings, royal guard duties, training camps",
            "500–3,000 men per activation",
        ),
        (
            "Core Royal Calendar",
            "Umkhosi woMhlanga · Umkhosi woMama (First Fruits) · King Shaka Day · Royal Weddings · Coronations · Memorial Services · Amazulu Kings Golf Cup · Queens' High Tea",
            "Per event — 21-day advance headcount",
        ),
        (
            "Traditional leadership",
            "Monthly Amakhosi & Izinduna Council Meetings · Ingonyama Trust Community Imbizos · Rural outreach & food-relief drives led by the Queens",
            "Per gathering — advance headcount",
        ),
        (
            "Year-round programmes",
            "Royal Schools Nutrition Programme · Clinics & Orphan Care Centres · Official Disaster Relief Meal of the Kingdom",
            "Programme calendars — HOA planned volumes",
        ),
    ]
    col_a, col_b = 44 * mm, 76 * mm
    col_c = CONTENT_W - col_a - col_b
    head_h = 7.2 * mm
    row_heights = []
    for t, detail, headcount in activations:
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.7, col_b - 9)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.5, col_c - 9)
        t_lines = wrap_text(c, t, FONTS["serifBold"], 7.7, col_a - 9)
        rh = max(len(d_lines) * 8.7, len(h_lines) * 8.5, len(t_lines) * 9.8) + 8.5
        row_heights.append(max(rh, 14.2 * mm))

    table_h = head_h + sum(row_heights)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 3.8, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
    paint_table_head(c, INNER, y, CONTENT_W, head_h, ["ACTIVATION", "DETAIL", "HEADCOUNT (HOA)"], [col_a, col_b, col_c])

    yy = y - head_h
    for i, ((t, detail, headcount), rh) in enumerate(zip(activations, row_heights)):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.5, yy - rh, CONTENT_W - 1.0, rh, fill=1, stroke=0)
        c.setStrokeColor(RULE_SOFT)
        c.setLineWidth(0.4)
        c.line(INNER + 3, yy, INNER + CONTENT_W - 3, yy)
        t_lines = wrap_text(c, t, FONTS["serifBold"], 7.7, col_a - 9)
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.7, col_b - 9)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.5, col_c - 9)
        text_y = yy - 10.0
        draw_lines(c, t_lines, INNER + 6, text_y, FONTS["serifBold"], 7.7, 9.6, INK)
        draw_lines(c, d_lines, INNER + col_a + 3, text_y, FONTS["sans"], 6.7, 8.7, INK_SOFT)
        draw_lines(c, h_lines, INNER + col_a + col_b + 3, text_y, FONTS["sans"], 6.5, 8.4, GOLD_DK)
        yy -= rh

    y -= table_h + 5.6 * mm

    section_label(c, "8  ·  Commercial term (HOA-proposed)", INNER, y)
    y -= 6.4 * mm

    tiles = [
        ("ADVANCE HEADCOUNT", "21-day advance headcount for each activation", "Operating rule"),
        (
            "ROYAL RATE",
            "Invoicing at pre-agreed Royal Rate (schedule to SHA / rate card — rand figure not published here)",
            "No rand figure published",
        ),
        (
            "PLANNED MONTHLY OFFTAKE",
            "50,000–200,000 meals monthly",
            "HOA planned range — not contracted",
        ),
        (
            "FUNDING MIX",
            "Ingonyama Trust CSI · KZN Provincial Government · Corporate CSI (MTN, Lesaka, Edison Power, etc.) · Big Five CSI",
            "Proposed channels — not closed awards",
        ),
    ]
    tg = 3.0 * mm
    tw = (CONTENT_W - tg) / 2
    th = 22.4 * mm
    for i, (lab, body, note) in enumerate(tiles):
        col = i % 2
        row = i // 2
        x = INNER + col * (tw + tg)
        ty = y - row * (th + 2.5 * mm)
        rrect(c, x, ty - th, tw, th, 3.8, fill=CREAM_CARD, stroke=GOLD, sw=0.8)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.8)
        c.drawString(x + 7, ty - 7.6, lab)
        if lab == "PLANNED MONTHLY OFFTAKE":
            c.setFillColor(INK)
            c.setFont(FONTS["serifBold"], 12.8)
            c.drawString(x + 7, ty - 19.6, "50,000–200,000")
            c.setFillColor(MUTED)
            c.setFont(FONTS["sans"], 6.8)
            c.drawString(x + 7, ty - 29.6, "meals monthly  ·  HOA planned range, not a contracted volume")
        else:
            used_b = draw_para(c, body, x + 7, ty - 17.4, FONTS["sans"], 7.15, 9.3, tw - 14, INK_SOFT)
            c.setFillColor(GOLD_DK)
            c.setFont(FONTS["sansItalic"], 6.25)
            c.drawString(x + 7, ty - 17.4 - used_b - 3.2, note)

    y -= 2 * (th + 2.6 * mm) + 2.4 * mm

    prod_h = 14.2 * mm
    rrect(c, INNER, y - prod_h, CONTENT_W, prod_h, 3.8, fill=CREAM_CARD, stroke=GOLD, sw=0.75)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.9)
    c.drawString(INNER + 8, y - 6.6, "PRODUCTS IN SCOPE  ·  GROUP CATALOGUE")
    products = (
        "Fortified porridges  ·  One-pot meals  ·  Soya mince / institutional proteins  ·  Soups  ·  "
        "NSNP / institutional 5 kg formats where school- or clinic-linked"
    )
    draw_para(c, products, INNER + 8, y - 16.2, FONTS["sans"], 7.15, 9.3, CONTENT_W - 16, INK_SOFT)
    y -= prod_h + 5.2 * mm

    section_label(c, "9  ·  Honesty — what this is not", INNER, y)
    y -= 6.2 * mm

    notes = [
        "This document is a Big Five Group partner briefing of HOA principal terms — not an official Palace publication and not a record of executed statutory documents.",
        "Heads of Agreement BF/RH/HOA/FINAL-V5 sets principal terms only — not an executed SHA, MOI, supply contract, gazetted royal appointment, or funded government award.",
        "Until the HOA is executed and Royal approval is granted, treat exclusivity, offtake ranges and sponsor names as HOA-proposed.",
        "“Exclusive Official Fortified Meal Provider” is the proposed commercial term for listed activations — not a Palace press statement and not a government tender award.",
        "50,000–200,000 meals monthly is the HOA planned monthly offtake range — not audited delivery and not a contracted volume.",
        "Funding stack names are proposed channels — not closed sponsor awards. Named corporates are illustrative CSI channels.",
        "No Royal Rate rand figure is published here. Heritage language remains anchored to zulukingdom.co.za. This briefing does not speak for the Palace.",
    ]
    notes_h = 8.0 * mm
    for n in notes:
        nlines = wrap_text(c, n, FONTS["sans"], 6.55, CONTENT_W - 26)
        notes_h += len(nlines) * 8.45 + 1.85
    hon_h = min(notes_h, y - (BODY_BOTTOM + 0.4 * mm))
    rrect(c, INNER, y - hon_h, CONTENT_W, hon_h, 4.0, fill=CHAR, stroke=GOLD, sw=0.95)
    c.setFillColor(GOLD)
    c.rect(INNER, y - hon_h, 2.3, hon_h, fill=1, stroke=0)

    yy = y - 5.0 * mm
    floor = y - hon_h + 3.0 * mm
    for n in notes:
        if yy < floor + 7:
            break
        gold_dot(c, INNER + 8, yy)
        used_n = draw_para(c, n, INNER + 16, yy, FONTS["sans"], 6.55, 8.45, CONTENT_W - 26, GOLD_SOFT)
        yy -= used_n + 1.85

    draw_footer(c, 3)
    c.showPage()


def build():
    global ASSETS, ZK_PLATE, BFF_PLATE
    ASSETS = make_leopard_assets()
    ZK_PLATE = plate_logo(ZK_LOGO, 920, 330, pad=18)
    BFF_PLATE = plate_logo(BFF_LOGO, 360, 360, pad=22)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Isidlo seSilo · Heads of Agreement · BF/RH/HOA/FINAL-V5")
    c.setAuthor("Big Five Group (Pty) Ltd")
    c.setSubject(
        "Principal terms — subject to signature. Big Five Royal Foods (Pty) Ltd established · awaiting Royal approval."
    )
    c.setKeywords("Isidlo seSilo, Zulu Kingdom, Big Five Royal Foods, Heads of Agreement")
    c.setCreator("Big Five Group partner briefing")

    page_1(c)
    page_2(c)
    page_3(c)
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
