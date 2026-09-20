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
from PIL import ImageEnhance, ImageFilter
from reportlab.lib.colors import Color, HexColor, white
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

PAGE_W, PAGE_H = A4  # 595.27 × 841.89

# Brand
GOLD = HexColor("#E0B000")
GOLD_DK = HexColor("#A67C00")
GOLD_LT = HexColor("#F3D56B")
GOLD_SOFT = HexColor("#F3E6B0")
INK = HexColor("#0A0804")
INK_SOFT = HexColor("#2C261C")
MUTED = HexColor("#5C5346")
MUTED_LT = HexColor("#7A7164")
CREAM = HexColor("#FAF6EB")
CREAM_DEEP = HexColor("#F3EAD3")
CREAM_CARD = HexColor("#FFFCF6")
CHAR = HexColor("#120E0A")
CHAR_MID = HexColor("#1C1610")
EMERALD = HexColor("#14532D")
EMERALD_BG = HexColor("#ECFDF5")
EMERALD_BD = HexColor("#6EE7B7")
AMBER_BG = HexColor("#FFFBEB")
AMBER_BD = HexColor("#F5D76E")
AMBER_TX = HexColor("#92400E")
RULE_SOFT = HexColor("#E8D9A8")

# Geometry
M = 8 * mm
RAIL = 4.2 * mm
INNER = M + RAIL + 5.5 * mm
CONTENT_W = PAGE_W - 2 * INNER
FOOTER_H = 13.5 * mm
BODY_BOTTOM = FOOTER_H + 5 * mm


def register_fonts() -> dict[str, str]:
    candidates = {
        "sans": "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "sansBold": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
        "sansBoldItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-BoldItalic.ttf",
        "serif": "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        "serifBold": "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
        "serifItalic": "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
        "serifBoldItalic": "/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf",
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
    src = ImageEnhance.Contrast(src).enhance(1.08)
    src = ImageEnhance.Color(src).enhance(1.06)

    # High-res composites at ~160 dpi
    dpi = 160
    pw, ph = int(PAGE_W / 72 * dpi), int(PAGE_H / 72 * dpi)

    full = cover_resize(src, pw, ph)

    cream = PILImage.new("RGB", (pw, ph), (250, 246, 235))
    wash = PILImage.blend(cream, full, 0.16)
    wash = ImageEnhance.Brightness(wash).enhance(1.04)

    # Hero header: darker gradient so cream/gold type holds
    header_h = int(112 * mm / 72 * dpi)
    hero = cover_resize(src, pw, header_h)
    dark = PILImage.new("RGB", hero.size, (14, 10, 6))
    grad = PILImage.linear_gradient("L").resize(hero.size)
    alpha = grad.point(lambda p: int(118 + p * (210 - 118) / 255))
    hero_dark = PILImage.composite(dark, hero, alpha)

    slim_h = int(38 * mm / 72 * dpi)
    slim = cover_resize(src, pw, slim_h)
    slim_dark = PILImage.new("RGB", slim.size, (16, 12, 7))
    slim = PILImage.blend(slim, slim_dark, 0.62)

    foot_h = int(FOOTER_H / 72 * dpi)
    foot = cover_resize(src, pw, max(foot_h, 40))
    foot = foot.crop((0, 0, pw, foot_h))
    foot_dark = PILImage.new("RGB", foot.size, (18, 13, 8))
    foot = PILImage.blend(foot, foot_dark, 0.55)

    rail_w = int(RAIL / 72 * dpi)
    rail = cover_resize(src, max(rail_w, 20), ph)
    rail = rail.crop((0, 0, rail_w, ph))

    return {
        "wash": to_reader(wash, 88),
        "hero": to_reader(hero_dark, 90),
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
    x = (box_w - nw) // 2
    y = (box_h - nh) // 2
    plate.paste(im, (x, y), im)
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


def draw_lines(c, lines, x, y, font, size, leading, color, align="left") -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    yy = y
    for line in lines:
        if align == "center":
            c.drawCentredString(x, yy, line)
        elif align == "right":
            c.drawRightString(x, yy, line)
        else:
            c.drawString(x, yy, line)
        yy -= leading
    return y - yy


def draw_para(c, text, x, y, font, size, leading, max_w, color, align="left") -> float:
    lines = wrap_text(c, text, font, size, max_w)
    return draw_lines(c, lines, x, y, font, size, leading, color, align)


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
        return 0
    return c.stringWidth(text, font, size) + tracking * (len(text) - 1)


def badge(c, text, x, y, *, fill, stroke, text_color, font=None, size=6.6, h=11.2, pad=5.2) -> float:
    font = font or FONTS["sansBold"]
    c.setFont(font, size)
    w = c.stringWidth(text, font, size) + pad * 2
    rrect(c, x, y, w, h, h / 2, fill=fill, stroke=stroke, sw=0.7)
    c.setFillColor(text_color)
    c.drawString(x + pad, y + 3.15, text)
    return w


def gold_double_rule(c, x, y, w):
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.15)
    c.line(x, y, x + w, y)
    c.setLineWidth(0.35)
    c.line(x, y - 2.1, x + w, y - 2.1)


def section_label(c, eyebrow, x, y) -> float:
    draw_tracked(c, eyebrow.upper(), x, y, FONTS["sansBold"], 6.4, 0.85, GOLD_DK)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.4)
    c.line(x, y - 3.4, x + 22, y - 3.4)
    return 12


def check_item(c, text, x, y, max_w, font=None, size=7.7, leading=10.0, color=None) -> float:
    font = font or FONTS["sans"]
    color = color or INK_SOFT
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 8)
    c.drawString(x, y, "▸")
    used = draw_para(c, text, x + 9, y, font, size, leading, max_w - 9, color)
    return max(used, leading)


# ---------------------------------------------------------------------------
# Page décor
# ---------------------------------------------------------------------------

ASSETS: dict[str, ImageReader] = {}
ZK_PLATE: ImageReader | None = None
BFF_PLATE: ImageReader | None = None


def draw_page_frame(c, page_num: int, total: int = 3, hero: bool = False):
    """Leopard wash, side rails, gold frame, footer — every page."""
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    c.drawImage(ASSETS["wash"], 0, 0, width=PAGE_W, height=PAGE_H, mask="auto")

    # Side leopard rails
    c.drawImage(ASSETS["rail"], M, 0, width=RAIL, height=PAGE_H, mask="auto")
    c.drawImage(ASSETS["rail"], PAGE_W - M - RAIL, 0, width=RAIL, height=PAGE_H, mask="auto")

    # Gold outer frame
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.35)
    c.rect(M - 1.2, M - 1.2, PAGE_W - 2 * (M - 1.2), PAGE_H - 2 * (M - 1.2), fill=0, stroke=1)
    c.setLineWidth(0.35)
    c.setStrokeColor(GOLD_LT)
    c.rect(M + 1.6, M + 1.6, PAGE_W - 2 * (M + 1.6), PAGE_H - 2 * (M + 1.6), fill=0, stroke=1)

    # Footer leopard band
    foot_y = M + 0.4
    clip_image(c, ASSETS["foot"], M + 2.2, foot_y, PAGE_W - 2 * M - 4.4, FOOTER_H - 1.2, r=2)
    c.setFillColor(Color(0.06, 0.04, 0.02, alpha=0.28))
    c.rect(M + 2.2, foot_y, PAGE_W - 2 * M - 4.4, FOOTER_H - 1.2, fill=1, stroke=0)

    c.setStrokeColor(GOLD)
    c.setLineWidth(0.9)
    c.line(INNER, FOOTER_H + M - 0.4, PAGE_W - INNER, FOOTER_H + M - 0.4)

    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 6.2)
    c.drawString(INNER, M + 5.6, "BF/RH/HOA/FINAL-V5  ·  Principal terms · subject to signature")
    c.setFont(FONTS["sans"], 6.0)
    c.drawCentredString(PAGE_W / 2, M + 5.6, "Confidential partner briefing  ·  not a Palace publication")
    c.setFont(FONTS["sansBold"], 6.2)
    c.drawRightString(PAGE_W - INNER, M + 5.6, f"Page {page_num} of {total}")


def draw_cobrand(c, x, y, zk_w=46 * mm, zk_h=16.5 * mm, bff=16.5 * mm):
    """White logo plates with gold rims."""
    rrect(c, x, y, zk_w, zk_h, 3.2, fill=white, stroke=GOLD, sw=1.05)
    c.drawImage(ZK_PLATE, x + 2.2, y + 1.4, width=zk_w - 4.4, height=zk_h - 2.8, mask="auto", preserveAspectRatio=True, anchor="c")

    gap = 7.5 * mm
    cx = x + zk_w + gap / 2 + 1
    c.setFillColor(GOLD)
    c.setFont(FONTS["serif"], 13)
    c.drawCentredString(cx, y + zk_h / 2 - 3.5, "×")

    bx = x + zk_w + gap
    rrect(c, bx, y, bff, bff, 3.2, fill=white, stroke=GOLD, sw=1.05)
    c.drawImage(BFF_PLATE, bx + 1.6, y + 1.6, width=bff - 3.2, height=bff - 3.2, mask="auto", preserveAspectRatio=True, anchor="c")
    return bx + bff


def draw_slim_header(c, running: str):
    h = 32 * mm
    y = PAGE_H - M - h
    clip_image(c, ASSETS["slim"], M + 2.0, y, PAGE_W - 2 * M - 4.0, h, r=0)
    gold_double_rule(c, INNER, PAGE_H - M - 3.2, CONTENT_W)
    draw_cobrand(c, INNER, y + 8.2)
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sansBold"], 6.3)
    c.drawRightString(PAGE_W - INNER, y + 19.5, "HEADS OF AGREEMENT")
    c.setFillColor(white)
    c.setFont(FONTS["serifItalic"], 8.2)
    c.drawRightString(PAGE_W - INNER, y + 10.5, running)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.0)
    c.line(INNER, y + 1.5, PAGE_W - INNER, y + 1.5)
    return y


# ---------------------------------------------------------------------------
# Page 1 — programme, parties, vision, entity
# ---------------------------------------------------------------------------

def page_1(c):
    draw_page_frame(c, 1, hero=True)

    header_h = 104 * mm
    hy = PAGE_H - M - header_h
    clip_image(c, ASSETS["hero"], M + 2.0, hy, PAGE_W - 2 * M - 4.0, header_h)

    # Top confidential strip
    gold_double_rule(c, INNER, PAGE_H - M - 3.4, CONTENT_W)
    c.setFillColor(GOLD_SOFT)
    tw = tracked_width(c, "CONFIDENTIAL PARTNER BRIEFING", FONTS["sansBold"], 6.0, 1.05)
    draw_tracked(
        c,
        "CONFIDENTIAL PARTNER BRIEFING",
        PAGE_W - INNER - tw,
        PAGE_H - M - 10.2,
        FONTS["sansBold"],
        6.0,
        1.05,
        GOLD_SOFT,
    )
    draw_tracked(c, "THE ZULU KINGDOM  ×  BIG FIVE GROUP", INNER, PAGE_H - M - 10.2, FONTS["sansBold"], 6.0, 0.7, GOLD_SOFT)

    draw_cobrand(c, INNER, PAGE_H - M - 30.5 * mm)

    # Title block
    ty = PAGE_H - M - 40 * mm
    draw_tracked(c, "HEADS OF AGREEMENT  ·  ROYAL HOUSEHOLD", INNER, ty, FONTS["sansBold"], 6.6, 0.9, GOLD)

    c.setFillColor(white)
    c.setFont(FONTS["serifBold"], 26)
    c.drawString(INNER, ty - 24, "Isidlo seSilo")

    c.setFillColor(GOLD)
    c.setFont(FONTS["serifItalic"], 11)
    c.drawString(INNER, ty - 38, "Official Nutrition Programme of the Kingdom")

    c.setStrokeColor(GOLD)
    c.setLineWidth(0.6)
    c.line(INNER, ty - 44.5, INNER + 62 * mm, ty - 44.5)

    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifBold"], 12.5)
    c.drawString(INNER, ty - 58, "Big Five Royal Foods (Pty) Ltd")
    c.setFillColor(Color(1, 1, 1, alpha=0.82))
    c.setFont(FONTS["sans"], 8.4)
    c.drawString(INNER, ty - 70, "Official Meal Partner of the Royal Household  —  awaiting Royal approval")

    # Status badges
    by = hy + 14.5 * mm
    w1 = badge(
        c,
        "Principal terms · subject to signature",
        INNER,
        by,
        fill=HexColor("#1A140C"),
        stroke=GOLD,
        text_color=GOLD,
        size=6.5,
        h=12.2,
        pad=6.4,
    )
    badge(
        c,
        "Company established · awaiting Royal approval",
        INNER + w1 + 6,
        by,
        fill=HexColor("#0F2418"),
        stroke=EMERALD_BD,
        text_color=HexColor("#BBF7D0"),
        size=6.5,
        h=12.2,
        pad=6.4,
    )

    # Signing meta on the header
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sansBold"], 6.3)
    c.drawString(INNER, hy + 6.8 * mm, "PROPOSED SIGNING")
    c.setFillColor(white)
    c.setFont(FONTS["sans"], 7.4)
    c.drawString(
        INNER + 28 * mm,
        hy + 6.8 * mm,
        "23 September 2026  ·  Zimbali Lakes Resort  ·  2nd Annual Amazulu Queens' High Tea",
    )

    # Body starts
    y = hy - 8 * mm

    # --- Parties + purpose row ---
    section_label(c, "1  ·  Parties & purpose", INNER, y)
    y -= 8 * mm

    col_g = 4.2 * mm
    col_w = (CONTENT_W - col_g) / 2
    card_h = 46 * mm

    # Party cards
    for i, (name, body) in enumerate(
        [
            (
                "Big Five Group (Pty) Ltd",
                "KZN-based food manufacturing group specialising in fortified porridge and one-pot meals (Big Five Foods™), with Agri offtake, Direct distribution, Leadership (Super-Cube®), Connect (SupplierAdvisor®), Foundation and Impact.",
            ),
            (
                "The Royal Household Partnership",
                "Represented by Prince Ntokozo and the Queens, in the presence of HRH Ndlunkulu laMakhubo and HRH Ndlunkulu kaMayisela.",
            ),
        ]
    ):
        x = INNER + i * (col_w + col_g)
        rrect(c, x, y - card_h, col_w, card_h, 4.5, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 6.0)
        c.drawString(x + 7, y - 9, "PARTY" if i == 0 else "PARTY")
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.2)
        c.drawString(x + 7, y - 21, name)
        draw_para(c, body, x + 7, y - 34, FONTS["sans"], 7.45, 10.0, col_w - 14, MUTED)

    y -= card_h + 4.2 * mm

    # Purpose band
    pur_h = 28.5 * mm
    rrect(c, INNER, y - pur_h, CONTENT_W, pur_h, 4.5, fill=CHAR, stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.2)
    c.drawString(INNER + 8, y - 9.5, "PURPOSE")
    purpose = (
        "Principal terms for a strategic partnership to establish Isidlo seSilo — the Official Nutrition Programme of the Kingdom — "
        "and for Big Five Royal Foods (Pty) Ltd (now established) to be designated Official Meal Partner of the Royal Household, "
        "subject to Royal approval and HOA signature."
    )
    draw_para(c, purpose, INNER + 8, y - 21, FONTS["sans"], 7.7, 10.3, CONTENT_W - 16, GOLD_SOFT)
    y -= pur_h + 6.2 * mm

    # --- Vision ---
    section_label(c, "2  ·  Vision", INNER, y)
    y -= 7.2 * mm
    tiles = [
        "Creates sustainable jobs on Ingonyama Trust land",
        "Provides fortified nutrition for His Majesty’s people",
        "Operates under Ubuntu, Dignity, and Heritage",
        "Generates commercial returns for all stakeholders",
    ]
    tw = (CONTENT_W - 3 * 3.2 * mm) / 4
    th = 28.5 * mm
    for i, t in enumerate(tiles):
        x = INNER + i * (tw + 3.2 * mm)
        rrect(c, x, y - th, tw, th, 4, fill=CREAM_CARD, stroke=GOLD, sw=0.75)
        c.setFillColor(GOLD)
        c.setFont(FONTS["serifBold"], 13)
        c.drawString(x + 6, y - 13, f"0{i + 1}")
        draw_para(c, t, x + 6, y - 25, FONTS["sans"], 7.15, 9.4, tw - 12, INK_SOFT)
    y -= th + 6.4 * mm

    # --- Entity ---
    section_label(c, "3  ·  Operating company", INNER, y)
    y -= 7.2 * mm
    ent_h = 36.5 * mm
    rrect(c, INNER, y - ent_h, CONTENT_W, ent_h, 4.5, fill=CREAM_CARD, stroke=GOLD, sw=0.9)

    # Left gold accent
    c.setFillColor(GOLD)
    c.rect(INNER, y - ent_h, 2.4, ent_h, fill=1, stroke=0)

    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 6.2)
    c.drawString(INNER + 10, y - 10, "BIG FIVE ROYAL FOODS (PTY) LTD")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 12)
    c.drawString(INNER + 10, y - 23, "Company established  ·  awaiting Royal approval")

    detail = (
        "Big Five Royal Foods (Pty) Ltd has been established and is awaiting Royal Household approval of the Heads of Agreement "
        "and Official Meal Partner designation. Incorporation is complete; royal endorsement and HOA signature remain outstanding. "
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term — not in force until signature."
    )
    draw_para(c, detail, INNER + 10, y - 36, FONTS["sans"], 7.45, 9.9, CONTENT_W - 20, MUTED)

    # Right-side mini badges inside the card
    badge(
        c,
        "Incorporation complete",
        INNER + CONTENT_W - 38 * mm,
        y - 14.5,
        fill=EMERALD_BG,
        stroke=EMERALD_BD,
        text_color=EMERALD,
        size=6.1,
        h=10.6,
        pad=5,
    )

    y -= ent_h + 6.2 * mm

    # Witnesses strip
    wh = 16.5 * mm
    rrect(c, INNER, y - wh, CONTENT_W, wh, 4, fill=CREAM_DEEP, stroke=GOLD, sw=0.7)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 6.1)
    c.drawString(INNER + 8, y - 7.2, "WITNESSES NAMED IN THE HOA")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.4)
    c.drawString(INNER + 8, y - 18.5, "HRH Ndlunkulu laMakhubo")
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["serif"], 9)
    c.drawString(INNER + 68 * mm, y - 18.5, "·")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.4)
    c.drawString(INNER + 74 * mm, y - 18.5, "HRH Ndlunkulu kaMayisela")
    c.setFillColor(MUTED)
    c.setFont(FONTS["sansItalic"], 6.6)
    c.drawRightString(PAGE_W - INNER - 8, y - 18.5, "Ref  BF/RH/HOA/FINAL-V5")

    c.showPage()


# ---------------------------------------------------------------------------
# Page 2 — board, patrons, roles
# ---------------------------------------------------------------------------

def page_2(c):
    draw_page_frame(c, 2)
    slim_y = draw_slim_header(c, "Isidlo seSilo  ·  governance, patrons & roles")
    y = slim_y - 8 * mm

    section_label(c, "4  ·  Board of directors (HOA)", INNER, y)
    y -= 7.5 * mm

    c.setFillColor(MUTED)
    c.setFont(FONTS["sansItalic"], 7.3)
    intro = (
        "Seats below are principal terms only. TBC designations remain open until the Royal Household and Big Five Group confirm them — they are not appointments."
    )
    used = draw_para(c, intro, INNER, y, FONTS["sansItalic"], 7.3, 9.6, CONTENT_W, MUTED)
    y -= used + 3.5 * mm

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

    # Table header
    row_h = 13.6 * mm
    head_h = 8.2 * mm
    cols = [52 * mm, CONTENT_W - 52 * mm - 24 * mm, 24 * mm]
    table_h = head_h + row_h * len(board)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 4, fill=CREAM_CARD, stroke=GOLD, sw=0.85)

    # header bar
    c.saveState()
    p = c.beginPath()
    p.roundRect(INNER, y - head_h, CONTENT_W, head_h, 4)
    c.clipPath(p, stroke=0, fill=0)
    c.setFillColor(CHAR)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(CHAR)
    c.rect(INNER, y - head_h, CONTENT_W, 4, fill=1, stroke=0)

    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.2)
    labels = ["PERSON", "PROPOSED SEAT", "STATUS"]
    cx = INNER + 7
    for lab, cw in zip(labels, cols):
        c.drawString(cx, y - 5.6, lab)
        cx += cw

    yy = y - head_h
    for i, (person, seat, tbc) in enumerate(board):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.6, yy - row_h, CONTENT_W - 1.2, row_h, fill=1, stroke=0)
        c.setStrokeColor(RULE_SOFT)
        c.setLineWidth(0.4)
        c.line(INNER + 4, yy, INNER + CONTENT_W - 4, yy)

        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 9.0)
        c.drawString(INNER + 7, yy - 10.8, person)
        c.setFillColor(INK_SOFT)
        c.setFont(FONTS["sans"], 7.6)
        seat_lines = wrap_text(c, seat, FONTS["sans"], 7.6, cols[1] - 8)
        draw_lines(c, seat_lines, INNER + 7 + cols[0], yy - 10.8, FONTS["sans"], 7.6, 9.6, INK_SOFT)

        bx = INNER + cols[0] + cols[1] + 3
        if tbc:
            badge(c, "TBC", bx, yy - 12.4, fill=AMBER_BG, stroke=AMBER_BD, text_color=AMBER_TX, size=6.2, h=10.4, pad=5.5)
        else:
            badge(c, "Tabled", bx, yy - 12.4, fill=CREAM_DEEP, stroke=GOLD, text_color=GOLD_DK, size=6.2, h=10.4, pad=5.5)
        yy -= row_h

    y -= table_h + 7.2 * mm

    # --- Patrons ---
    section_label(c, "5  ·  Royal patrons", INNER, y)
    y -= 7.2 * mm
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
    pg = 3.6 * mm
    pw = (CONTENT_W - pg) / 2
    ph = 34 * mm
    for i, (person, role, lead) in enumerate(patrons):
        x = INNER + i * (pw + pg)
        rrect(c, x, y - ph, pw, ph, 4.5, fill=CREAM_CARD, stroke=GOLD, sw=0.85)
        c.setFillColor(GOLD)
        c.rect(x, y - ph, 2.3, ph, fill=1, stroke=0)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 6.0)
        c.drawString(x + 9, y - 9.5, role.upper())
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.4)
        c.drawString(x + 9, y - 21.5, person)
        draw_para(c, lead, x + 9, y - 34, FONTS["sans"], 7.3, 9.6, pw - 16, MUTED)
    y -= ph + 6.4 * mm

    # Queens mandate
    qh = 18.5 * mm
    rrect(c, INNER, y - qh, CONTENT_W, qh, 4, fill=HexColor("#1A140C"), stroke=GOLD, sw=0.9)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.1)
    c.drawString(INNER + 8, y - 7.6, "QUEENS  ·  JOINT MANDATE")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifItalic"], 8.6)
    c.drawString(
        INNER + 8,
        y - 19.5,
        "Approve meal standards worthy of His Majesty’s people, and lead all women-centric and community distribution programmes.",
    )
    y -= qh + 6.6 * mm

    # --- Roles ---
    section_label(c, "6  ·  Roles and responsibilities", INNER, y)
    y -= 7.4 * mm

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
    rg = 3.4 * mm
    rw = (CONTENT_W - 2 * rg) / 3
    rh = 78 * mm
    for i, (person, title, tbc, bullets) in enumerate(roles):
        x = INNER + i * (rw + rg)
        fill = AMBER_BG if tbc else CREAM_CARD
        rrect(c, x, y - rh, rw, rh, 4.5, fill=fill, stroke=GOLD if not tbc else AMBER_BD, sw=0.9)
        if tbc:
            badge(c, "ROLE TBC", x + 6, y - 12.2, fill=AMBER_BG, stroke=AMBER_BD, text_color=AMBER_TX, size=5.9, h=10, pad=4.6)
        else:
            badge(c, "TABLED ROLE", x + 6, y - 12.2, fill=CHAR, stroke=GOLD, text_color=GOLD, size=5.9, h=10, pad=4.6)
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 9.3)
        name_lines = wrap_text(c, person, FONTS["serifBold"], 9.3, rw - 14)
        ny = y - 24
        draw_lines(c, name_lines, x + 7, ny, FONTS["serifBold"], 9.3, 11.2, INK)
        ny = ny - 11.2 * len(name_lines) - 2
        title_used = draw_para(c, title, x + 7, ny, FONTS["sansItalic"], 6.7, 8.7, rw - 14, GOLD_DK)
        byy = ny - title_used - 4
        for b in bullets:
            used = check_item(c, b, x + 6, byy, rw - 14, size=6.85, leading=8.9)
            byy -= used + 2.4

    c.showPage()


# ---------------------------------------------------------------------------
# Page 3 — activations, commercial, honesty
# ---------------------------------------------------------------------------

def page_3(c):
    draw_page_frame(c, 3)
    slim_y = draw_slim_header(c, "Isidlo seSilo  ·  activations, commercial & honesty")
    y = slim_y - 8 * mm

    section_label(c, "7  ·  Official royal activations (HOA-proposed)", INNER, y)
    y -= 6.6 * mm
    c.setFillColor(MUTED)
    used = draw_para(
        c,
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term — not a live award. Headcounts as tabled in BF/RH/HOA/FINAL-V5.",
        INNER,
        y,
        FONTS["sansItalic"],
        7.2,
        9.4,
        CONTENT_W,
        MUTED,
    )
    y -= used + 3.2 * mm

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

    # Table
    col_a, col_b = 46 * mm, 78 * mm
    col_c = CONTENT_W - col_a - col_b
    head_h = 7.6 * mm
    # Variable row heights
    row_heights = []
    for t, detail, headcount in activations:
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.9, col_b - 10)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.7, col_c - 10)
        t_lines = wrap_text(c, t, FONTS["serifBold"], 8.0, col_a - 10)
        rh = max(len(d_lines) * 9.0, len(h_lines) * 8.8, len(t_lines) * 10.2) + 10
        row_heights.append(max(rh, 16.5 * mm))

    table_h = head_h + sum(row_heights)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 4, fill=CREAM_CARD, stroke=GOLD, sw=0.85)

    c.saveState()
    p = c.beginPath()
    p.roundRect(INNER, y - head_h, CONTENT_W, head_h, 4)
    c.clipPath(p, stroke=0, fill=0)
    c.setFillColor(CHAR)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(CHAR)
    c.rect(INNER, y - head_h, CONTENT_W, 3.5, fill=1, stroke=0)

    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.1)
    c.drawString(INNER + 6, y - 5.2, "ACTIVATION")
    c.drawString(INNER + col_a + 4, y - 5.2, "DETAIL")
    c.drawString(INNER + col_a + col_b + 4, y - 5.2, "HEADCOUNT (HOA)")

    yy = y - head_h
    for i, ((t, detail, headcount), rh) in enumerate(zip(activations, row_heights)):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.5, yy - rh, CONTENT_W - 1.0, rh, fill=1, stroke=0)
        c.setStrokeColor(RULE_SOFT)
        c.setLineWidth(0.4)
        c.line(INNER + 3, yy, INNER + CONTENT_W - 3, yy)

        t_lines = wrap_text(c, t, FONTS["serifBold"], 8.0, col_a - 10)
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.9, col_b - 10)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.7, col_c - 10)
        text_y = yy - 11
        draw_lines(c, t_lines, INNER + 6, text_y, FONTS["serifBold"], 8.0, 10.0, INK)
        draw_lines(c, d_lines, INNER + col_a + 4, text_y, FONTS["sans"], 6.9, 9.0, INK_SOFT)
        draw_lines(c, h_lines, INNER + col_a + col_b + 4, text_y, FONTS["sans"], 6.7, 8.8, GOLD_DK)
        yy -= rh

    y -= table_h + 6.8 * mm

    # --- Commercial ---
    section_label(c, "8  ·  Commercial term (HOA-proposed)", INNER, y)
    y -= 7.0 * mm

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
    tg = 3.2 * mm
    tw = (CONTENT_W - tg) / 2
    th = 27.2 * mm
    for i, (lab, body, note) in enumerate(tiles):
        col = i % 2
        row = i // 2
        x = INNER + col * (tw + tg)
        ty = y - row * (th + 3.0 * mm)
        rrect(c, x, ty - th, tw, th, 4, fill=CREAM_CARD, stroke=GOLD, sw=0.8)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.9)
        c.drawString(x + 7, ty - 8.6, lab)
        if lab == "PLANNED MONTHLY OFFTAKE":
            c.setFillColor(INK)
            c.setFont(FONTS["serifBold"], 12.2)
            c.drawString(x + 7, ty - 21.5, "50,000–200,000")
            c.setFont(FONTS["sans"], 7.2)
            c.setFillColor(MUTED)
            c.drawString(x + 7, ty - 32, "meals monthly  ·  HOA planned range, not a contracted volume")
        else:
            draw_para(c, body, x + 7, ty - 19.5, FONTS["sans"], 7.35, 9.6, tw - 14, INK_SOFT)
            c.setFillColor(GOLD_DK)
            c.setFont(FONTS["sansItalic"], 6.4)
            c.drawString(x + 7, ty - th + 6.5, note)

    y -= 2 * (th + 3.0 * mm) + 3.2 * mm

    # Products
    prod_h = 18.8 * mm
    rrect(c, INNER, y - prod_h, CONTENT_W, prod_h, 4, fill=CREAM_CARD, stroke=GOLD, sw=0.75)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 6.0)
    c.drawString(INNER + 8, y - 8.2, "PRODUCTS IN SCOPE  ·  GROUP CATALOGUE")
    c.setFillColor(INK_SOFT)
    c.setFont(FONTS["sans"], 7.4)
    c.drawString(
        INNER + 8,
        y - 19.4,
        "Fortified porridges   ·   One-pot meals   ·   Soya mince / institutional proteins   ·   Soups   ·   NSNP / institutional 5 kg formats where school- or clinic-linked",
    )
    y -= prod_h + 6.2 * mm

    # Honesty
    section_label(c, "9  ·  Honesty — what this is not", INNER, y)
    y -= 6.8 * mm

    notes = [
        "This document is a Big Five Group partner briefing of HOA principal terms — not an official Palace publication and not a record of executed statutory documents.",
        "Heads of Agreement BF/RH/HOA/FINAL-V5 sets principal terms only — not an executed SHA, MOI, supply contract, gazetted royal appointment, or funded government award.",
        "Until the HOA is executed and Royal approval is granted, treat exclusivity, offtake ranges and sponsor names as HOA-proposed.",
        "“Exclusive Official Fortified Meal Provider” is the proposed commercial term for listed activations — not a Palace press statement and not a government tender award.",
        "50,000–200,000 meals monthly is the HOA planned monthly offtake range — not audited delivery and not a contracted volume.",
        "Funding stack names are proposed channels — not closed sponsor awards. Named corporates are illustrative CSI channels.",
        "No Royal Rate rand figure is published here. Heritage language remains anchored to zulukingdom.co.za. This briefing does not speak for the Palace.",
    ]
    hon_top = y
    # Estimate box
    hon_h = y - (BODY_BOTTOM + 2 * mm)
    rrect(c, INNER, BODY_BOTTOM + 2 * mm, CONTENT_W, hon_h, 4.5, fill=HexColor("#1A140C"), stroke=GOLD, sw=0.95)
    c.setFillColor(GOLD)
    c.rect(INNER, BODY_BOTTOM + 2 * mm, 2.4, hon_h, fill=1, stroke=0)

    yy = y - 5.5 * mm
    for n in notes:
        c.setFillColor(GOLD)
        c.setFont(FONTS["sansBold"], 7.4)
        c.drawString(INNER + 9, yy, "·")
        used = draw_para(c, n, INNER + 15, yy, FONTS["sans"], 6.85, 8.9, CONTENT_W - 24, GOLD_SOFT)
        yy -= used + 2.15

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
