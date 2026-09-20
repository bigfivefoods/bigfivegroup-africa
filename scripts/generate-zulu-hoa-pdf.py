#!/usr/bin/env python3
"""
Minimal leopard HOA briefing — Isidlo seSilo × Big Five Group.

Co-brand: Zulu Kingdom lockup + Big Five Group globe.
Output: public/partners/zulu-kingdom-hoa-isidlo-sesilo.pdf

Run: python3 scripts/generate-zulu-hoa-pdf.py
"""

from __future__ import annotations

import os
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from PIL import ImageEnhance
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
BFG_LOGO = ROOT / "public" / "bigfivegroup-logo.jpg"

PAGE_W, PAGE_H = A4

GOLD = HexColor("#C9A227")
GOLD_DK = HexColor("#8A6400")
GOLD_LT = HexColor("#E0B000")
GOLD_SOFT = HexColor("#F3E2B0")
INK = HexColor("#14110C")
INK_SOFT = HexColor("#3A342C")
MUTED = HexColor("#6B6358")
CREAM = HexColor("#FBF7EE")
CREAM_DEEP = HexColor("#F4EBD6")
CREAM_CARD = HexColor("#FFFCF7")
CHAR = HexColor("#14110C")
RULE = HexColor("#E4D4A4")

FRAME = 6.8 * mm
M = 11 * mm
INNER = 16 * mm
CONTENT_W = PAGE_W - 2 * INNER
SLIM_H = 34 * mm
FOOTER_H = 16 * mm
BODY_BOTTOM = FRAME + FOOTER_H + 4.2 * mm
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
    src = ImageEnhance.Contrast(src).enhance(1.22)
    src = ImageEnhance.Color(src).enhance(1.06)

    dpi = 170
    pw, ph = int(PAGE_W / 72 * dpi), int(PAGE_H / 72 * dpi)
    full = cover_resize(src, pw, ph)

    # Whisper of print on cream — spots readable, type stays clear
    cream = PILImage.new("RGB", (pw, ph), (252, 248, 239))
    wash = PILImage.blend(cream, full, 0.11)

    header_h = int(94 * mm / 72 * dpi)
    hero = cover_resize(src, pw, header_h)
    # Keep the print vivid; a light dusk only so gold/white type can sit on it
    dusk = PILImage.new("RGB", hero.size, (28, 18, 8))
    hero = PILImage.blend(hero, dusk, 0.16)

    slim_h = int(SLIM_H / 72 * dpi)
    slim = cover_resize(src, pw, slim_h)
    slim = PILImage.blend(slim, PILImage.new("RGB", slim.size, (22, 14, 6)), 0.18)

    foot_h = int(FOOTER_H / 72 * dpi)
    foot = cover_resize(src, pw, max(foot_h, 48)).crop((0, 0, pw, foot_h))
    foot = PILImage.blend(foot, PILImage.new("RGB", foot.size, (22, 14, 6)), 0.20)

    return {
        "wash": to_reader(wash, 90),
        "hero": to_reader(hero, 93),
        "slim": to_reader(slim, 92),
        "foot": to_reader(foot, 90),
    }


def plate_logo(path: Path, box_w: int, box_h: int, pad: int = 12) -> ImageReader:
    """Opaque white plate (JPEG) so PDF viewers do not drop logos behind a soft mask."""
    im = PILImage.open(path).convert("RGBA")
    plate = PILImage.new("RGB", (box_w, box_h), (255, 255, 255))
    avail_w, avail_h = box_w - 2 * pad, box_h - 2 * pad
    scale = min(avail_w / im.width, avail_h / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    plate.paste(im, ((box_w - nw) // 2, (box_h - nh) // 2), im)
    return to_reader(plate, quality=94)


def rrect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
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


def hairline(c, x, y, w, color=GOLD, sw=0.55):
    c.setStrokeColor(color)
    c.setLineWidth(sw)
    c.line(x, y, x + w, y)


def gold_pair(c, x, y, w):
    """Double gold rule used at header/footer edges."""
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.15)
    c.line(x, y, x + w, y)
    c.setStrokeColor(GOLD_LT)
    c.setLineWidth(0.35)
    c.line(x, y - 2.2, x + w, y - 2.2)


def veil(c, x, y, w, h, alpha=0.28):
    """Translucent dusk so leopard print stays visible under type."""
    c.saveState()
    c.setFillColor(Color(0.07, 0.04, 0.02, alpha=alpha))
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.restoreState()


def gold_corners(c, x, y, w, h, arm=7.5 * mm):
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.9)
    # bottom-left
    c.line(x, y, x + arm, y)
    c.line(x, y, x, y + arm)
    # bottom-right
    c.line(x + w, y, x + w - arm, y)
    c.line(x + w, y, x + w, y + arm)
    # top-left
    c.line(x, y + h, x + arm, y + h)
    c.line(x, y + h, x, y + h - arm)
    # top-right
    c.line(x + w, y + h, x + w - arm, y + h)
    c.line(x + w, y + h, x + w, y + h - arm)


def section_label(c, eyebrow, x, y):
    draw_tracked(c, eyebrow.upper(), x, y, FONTS["sansBold"], 6.2, 0.9, GOLD_DK)
    hairline(c, x, y - 3.0, 16, GOLD_LT, 0.9)


def gold_dot(c, x, y):
    c.setFillColor(GOLD_LT)
    c.circle(x + 1.7, y + 2.2, 1.35, fill=1, stroke=0)


def check_item(c, text, x, y, max_w, size=7.0, leading=9.2, color=INK_SOFT) -> float:
    gold_dot(c, x, y)
    return max(draw_para(c, text, x + 8.8, y, FONTS["sans"], size, leading, max_w - 8.8, color), leading)


def badge(c, text, x, y, *, fill, stroke, text_color, size=6.2, h=10.6, pad=5.0) -> float:
    font = FONTS["sansBold"]
    c.setFont(font, size)
    w = c.stringWidth(text, font, size) + pad * 2
    rrect(c, x, y, w, h, h / 2, fill=fill, stroke=stroke, sw=0.55)
    c.setFillColor(text_color)
    c.drawString(x + pad, y + 3.0, text)
    return w


ASSETS: dict[str, ImageReader] = {}
ZK_PLATE: ImageReader | None = None
BFG_PLATE: ImageReader | None = None


def draw_page_ground(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.drawImage(ASSETS["wash"], 0, 0, width=PAGE_W, height=PAGE_H, mask="auto")
    # Outer gold frame
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.05)
    c.rect(FRAME, FRAME, PAGE_W - 2 * FRAME, PAGE_H - 2 * FRAME, fill=0, stroke=1)
    c.setStrokeColor(GOLD_LT)
    c.setLineWidth(0.35)
    inner = FRAME + 1.8
    c.rect(inner, inner, PAGE_W - 2 * inner, PAGE_H - 2 * inner, fill=0, stroke=1)
    gold_corners(c, FRAME + 3.2, FRAME + 3.2, PAGE_W - 2 * FRAME - 6.4, PAGE_H - 2 * FRAME - 6.4, arm=6.2 * mm)


def draw_footer(c, page_num: int):
    x = FRAME
    y = FRAME
    w = PAGE_W - 2 * FRAME
    h = FOOTER_H
    clip_image(c, ASSETS["foot"], x, y, w, h)
    veil(c, x, y, w, h, alpha=0.30)
    gold_pair(c, INNER, y + h + 0.4, CONTENT_W)
    ty = y + h / 2 - 2.4
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 6.15)
    c.drawString(INNER, ty, "BF/RH/HOA/FINAL-V5")
    c.setFillColor(GOLD)
    c.setFont(FONTS["sans"], 6.15)
    c.drawCentredString(PAGE_W / 2, ty, "The Zulu Kingdom  ×  Big Five Group  ·  principal terms")
    c.setFont(FONTS["sansBold"], 6.3)
    c.setFillColor(GOLD_SOFT)
    c.drawRightString(PAGE_W - INNER, ty, f"{page_num}   /   {TOTAL_PAGES}")


def draw_cobrand(c, x, y, zk_w=46 * mm, zk_h=15.2 * mm, bfg=15.2 * mm):
    rrect(c, x, y, zk_w, zk_h, 2.2, fill=white, stroke=GOLD, sw=0.7)
    c.drawImage(
        ZK_PLATE,
        x + 1.6,
        y + 1.0,
        width=zk_w - 3.2,
        height=zk_h - 2.0,
        preserveAspectRatio=True,
        anchor="c",
    )
    gap = 6.4 * mm
    c.setFillColor(GOLD)
    c.setFont(FONTS["serif"], 11)
    c.drawCentredString(x + zk_w + gap / 2, y + zk_h / 2 - 3.2, "×")
    bx = x + zk_w + gap
    rrect(c, bx, y, bfg, bfg, 2.2, fill=white, stroke=GOLD, sw=0.7)
    c.drawImage(
        BFG_PLATE,
        bx + 1.2,
        y + 1.2,
        width=bfg - 2.4,
        height=bfg - 2.4,
        preserveAspectRatio=True,
        anchor="c",
    )
    return bx + bfg


def draw_slim_header(c, running: str) -> float:
    h = SLIM_H
    y = PAGE_H - FRAME - h
    w = PAGE_W - 2 * FRAME
    clip_image(c, ASSETS["slim"], FRAME, y, w, h)
    veil(c, FRAME, y, w, h, alpha=0.26)
    gold_pair(c, INNER, y + 2.4, CONTENT_W)
    draw_cobrand(c, INNER, y + 9.2)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 6.2)
    c.drawRightString(PAGE_W - INNER, y + 21.8, "HEADS OF AGREEMENT")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["serifItalic"], 8.0)
    c.drawRightString(PAGE_W - INNER, y + 12.4, running)
    return y


def paint_table_head(c, x, y, w, head_h, labels, cols):
    c.setFillColor(CREAM_DEEP)
    c.rect(x, y - head_h, w, head_h, fill=1, stroke=0)
    hairline(c, x, y, w, GOLD, 0.7)
    hairline(c, x, y - head_h, w, GOLD, 0.45)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 6.0)
    cx = x + 7
    for lab, cw in zip(labels, cols):
        c.drawString(cx, y - 5.0, lab)
        cx += cw


# ---------------------------------------------------------------------------
# Page 1
# ---------------------------------------------------------------------------

def page_1(c):
    draw_page_ground(c)

    header_h = 90 * mm
    hy = PAGE_H - FRAME - header_h
    hw = PAGE_W - 2 * FRAME
    clip_image(c, ASSETS["hero"], FRAME, hy, hw, header_h)
    # Soft dusk over the print so spots remain, type reads
    veil(c, FRAME, hy, hw, header_h, alpha=0.18)
    veil(c, FRAME, hy, hw, 18 * mm, alpha=0.34)
    gold_pair(c, INNER, PAGE_H - FRAME - 3.2, CONTENT_W)

    draw_tracked(
        c,
        "THE ZULU KINGDOM  ×  BIG FIVE GROUP",
        INNER,
        PAGE_H - FRAME - 9.4,
        FONTS["sansBold"],
        5.9,
        0.72,
        GOLD_SOFT,
    )
    tw = tracked_width(c, "CONFIDENTIAL PARTNER BRIEFING", FONTS["sansBold"], 5.9, 0.95)
    draw_tracked(
        c,
        "CONFIDENTIAL PARTNER BRIEFING",
        PAGE_W - INNER - tw,
        PAGE_H - FRAME - 9.4,
        FONTS["sansBold"],
        5.9,
        0.95,
        GOLD_SOFT,
    )

    draw_cobrand(c, INNER, PAGE_H - FRAME - 28.2 * mm)

    ty = PAGE_H - FRAME - 37.2 * mm
    draw_tracked(c, "HEADS OF AGREEMENT  ·  ROYAL HOUSEHOLD", INNER, ty, FONTS["sansBold"], 6.3, 0.92, GOLD)

    c.setFillColor(white)
    c.setFont(FONTS["serifBold"], 26)
    c.drawString(INNER, ty - 23.0, "Isidlo seSilo")

    c.setFillColor(GOLD)
    c.setFont(FONTS["serifItalic"], 10.4)
    c.drawString(INNER, ty - 36.6, "Official Nutrition Programme of the Kingdom")

    hairline(c, INNER, ty - 42.4, 52 * mm, GOLD, 0.55)

    c.setFillColor(white)
    c.setFont(FONTS["serifBold"], 11.6)
    c.drawString(INNER, ty - 54.4, "Big Five Royal Foods (Pty) Ltd")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 7.8)
    c.drawString(INNER, ty - 65.2, "Official Meal Partner of the Royal Household  —  awaiting Royal approval")

    w1 = badge(
        c,
        "Principal terms · subject to signature",
        INNER,
        ty - 86.0,
        fill=HexColor("#1A1208"),
        stroke=GOLD,
        text_color=GOLD,
        size=6.1,
        h=11.0,
        pad=5.6,
    )
    badge(
        c,
        "Company established · awaiting Royal approval",
        INNER + w1 + 6,
        ty - 86.0,
        fill=HexColor("#1A1208"),
        stroke=GOLD,
        text_color=GOLD_SOFT,
        size=6.1,
        h=11.0,
        pad=5.6,
    )

    gold_pair(c, INNER, hy + 13.4 * mm, CONTENT_W)
    c.setFillColor(GOLD)
    c.setFont(FONTS["sansBold"], 5.9)
    c.drawString(INNER, hy + 5.2, "PROPOSED SIGNING")
    c.setFillColor(GOLD_SOFT)
    c.setFont(FONTS["sans"], 7.2)
    c.drawString(
        INNER + 32 * mm,
        hy + 5.2,
        "23 September 2026   ·   Zimbali Lakes Resort   ·   2nd Annual Amazulu Queens' High Tea",
    )

    y = hy - 8.6 * mm

    section_label(c, "1  ·  Parties & purpose", INNER, y)
    y -= 8.0 * mm
    col_g = 4.2 * mm
    col_w = (CONTENT_W - col_g) / 2
    card_h = 32.4 * mm
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
        rrect(c, x, y - card_h, col_w, card_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.7)
        c.drawString(x + 8, y - 8.0, "PARTY")
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.0)
        c.drawString(x + 8, y - 19.4, name)
        draw_para(c, body, x + 8, y - 31.0, FONTS["sans"], 7.15, 9.5, col_w - 16, MUTED)

    y -= card_h + 3.8 * mm

    pur_h = 22.0 * mm
    rrect(c, INNER, y - pur_h, CONTENT_W, pur_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    c.setFillColor(GOLD)
    c.rect(INNER, y - pur_h, 1.6, pur_h, fill=1, stroke=0)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.8)
    c.drawString(INNER + 9, y - 7.8, "PURPOSE")
    purpose = (
        "Principal terms for a strategic partnership to establish Isidlo seSilo — the Official Nutrition Programme of the Kingdom — "
        "and for Big Five Royal Foods (Pty) Ltd (now established) to be designated Official Meal Partner of the Royal Household, "
        "subject to Royal approval and HOA signature."
    )
    draw_para(c, purpose, INNER + 9, y - 18.0, FONTS["serifItalic"], 7.55, 10.0, CONTENT_W - 18, INK_SOFT)
    y -= pur_h + 6.0 * mm

    section_label(c, "2  ·  Vision", INNER, y)
    y -= 7.2 * mm
    tiles = [
        "Creates sustainable jobs on Ingonyama Trust land",
        "Provides fortified nutrition for His Majesty’s people",
        "Operates under Ubuntu, Dignity, and Heritage",
        "Generates commercial returns for all stakeholders",
    ]
    tw = (CONTENT_W - 3 * 3.2 * mm) / 4
    th = 26.0 * mm
    for i, t in enumerate(tiles):
        x = INNER + i * (tw + 3.2 * mm)
        rrect(c, x, y - th, tw, th, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.45)
        c.setFillColor(GOLD_LT)
        c.setFont(FONTS["serifBold"], 11.5)
        c.drawString(x + 7, y - 12.0, f"0{i + 1}")
        draw_para(c, t, x + 7, y - 23.2, FONTS["sans"], 7.05, 9.3, tw - 13, INK_SOFT)
    y -= th + 6.0 * mm

    section_label(c, "3  ·  Operating company", INNER, y)
    y -= 7.2 * mm
    ent_h = 27.0 * mm
    rrect(c, INNER, y - ent_h, CONTENT_W, ent_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.8)
    c.drawString(INNER + 9, y - 8.2, "BIG FIVE ROYAL FOODS (PTY) LTD")
    badge(
        c,
        "Incorporation complete",
        INNER + CONTENT_W - 38 * mm,
        y - 11.6,
        fill=CREAM,
        stroke=GOLD,
        text_color=GOLD_DK,
        size=5.8,
        h=10.0,
        pad=4.6,
    )
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 11.0)
    c.drawString(INNER + 9, y - 20.0, "Company established  ·  awaiting Royal approval")
    detail = (
        "Big Five Royal Foods (Pty) Ltd has been established and is awaiting Royal Household approval of the Heads of Agreement "
        "and Official Meal Partner designation. Incorporation is complete; royal endorsement and HOA signature remain outstanding. "
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term."
    )
    draw_para(c, detail, INNER + 9, y - 31.6, FONTS["sans"], 7.1, 9.4, CONTENT_W - 18, MUTED)
    y -= ent_h + 4.0 * mm

    wh = 14.2 * mm
    rrect(c, INNER, y - wh, CONTENT_W, wh, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.45)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.7)
    c.drawString(INNER + 9, y - 6.4, "WITNESSES NAMED IN THE HOA")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.4)
    c.drawString(INNER + 9, y - 16.6, "HRH Ndlunkulu laMakhubo")
    c.setFillColor(GOLD)
    c.setFont(FONTS["serif"], 9)
    c.drawString(INNER + 68 * mm, y - 16.6, "·")
    c.setFillColor(INK)
    c.setFont(FONTS["serifBold"], 9.4)
    c.drawString(INNER + 74 * mm, y - 16.6, "HRH Ndlunkulu kaMayisela")
    c.setFillColor(MUTED)
    c.setFont(FONTS["sans"], 6.2)
    c.drawRightString(PAGE_W - INNER - 8, y - 16.6, "Ref  BF/RH/HOA/FINAL-V5")

    draw_footer(c, 1)
    c.showPage()


# ---------------------------------------------------------------------------
# Page 2
# ---------------------------------------------------------------------------

def page_2(c):
    draw_page_ground(c)
    slim_y = draw_slim_header(c, "Isidlo seSilo  ·  governance, patrons & roles")
    y = slim_y - 8.0 * mm

    section_label(c, "4  ·  Board of directors (HOA)", INNER, y)
    y -= 7.2 * mm
    used = draw_para(
        c,
        "Seats below are principal terms only. TBC designations remain open until the Royal Household and Big Five Group confirm them — they are not appointments.",
        INNER,
        y,
        FONTS["sansItalic"],
        7.15,
        9.5,
        CONTENT_W,
        MUTED,
    )
    y -= used + 3.4 * mm

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
    row_h = 11.6 * mm
    head_h = 7.4 * mm
    cols = [50 * mm, CONTENT_W - 50 * mm - 22 * mm, 22 * mm]
    table_h = head_h + row_h * len(board)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    paint_table_head(c, INNER, y, CONTENT_W, head_h, ["PERSON", "PROPOSED SEAT", "STATUS"], cols)

    yy = y - head_h
    for i, (person, seat, tbc) in enumerate(board):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        hairline(c, INNER + 6, yy, CONTENT_W - 12, RULE, 0.35)
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 8.7)
        c.drawString(INNER + 8, yy - 9.8, person)
        c.setFillColor(INK_SOFT)
        c.setFont(FONTS["sans"], 7.3)
        seat_lines = wrap_text(c, seat, FONTS["sans"], 7.3, cols[1] - 8)
        draw_lines(c, seat_lines, INNER + 8 + cols[0], yy - 9.8, FONTS["sans"], 7.3, 9.2, INK_SOFT)
        bx = INNER + cols[0] + cols[1] + 2.0
        if tbc:
            badge(c, "TBC", bx, yy - 11.2, fill=CREAM, stroke=GOLD, text_color=GOLD_DK, size=5.9, h=9.8, pad=5.0)
        else:
            badge(c, "Tabled", bx, yy - 11.2, fill=CREAM_DEEP, stroke=GOLD, text_color=GOLD_DK, size=5.9, h=9.8, pad=5.0)
        yy -= row_h

    y -= table_h + 7.0 * mm

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
    pg = 4.0 * mm
    pw = (CONTENT_W - pg) / 2
    ph = 31.0 * mm
    for i, (person, role, lead) in enumerate(patrons):
        x = INNER + i * (pw + pg)
        rrect(c, x, y - ph, pw, ph, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.7)
        c.drawString(x + 9, y - 8.2, role.upper())
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 10.0)
        c.drawString(x + 9, y - 19.6, person)
        draw_para(c, lead, x + 9, y - 31.0, FONTS["sans"], 7.15, 9.5, pw - 18, MUTED)
    y -= ph + 4.6 * mm

    qh = 16.8 * mm
    rrect(c, INNER, y - qh, CONTENT_W, qh, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    c.setFillColor(GOLD)
    c.rect(INNER, y - qh, 1.6, qh, fill=1, stroke=0)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.8)
    c.drawString(INNER + 9, y - 7.0, "QUEENS  ·  JOINT MANDATE")
    mandate = "Approve meal standards worthy of His Majesty’s people, and lead all women-centric and community distribution programmes."
    draw_para(c, mandate, INNER + 9, y - 17.6, FONTS["serifItalic"], 8.2, 10.4, CONTENT_W - 18, INK_SOFT)
    y -= qh + 6.4 * mm

    section_label(c, "6  ·  Roles and responsibilities", INNER, y)
    y -= 7.2 * mm

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
    rg = 3.6 * mm
    rw = (CONTENT_W - 2 * rg) / 3
    rh = 56 * mm
    for i, (person, title, tbc, bullets) in enumerate(roles):
        x = INNER + i * (rw + rg)
        rrect(c, x, y - rh, rw, rh, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
        badge(
            c,
            "ROLE TBC" if tbc else "TABLED ROLE",
            x + 7,
            y - 11.0,
            fill=CREAM,
            stroke=GOLD,
            text_color=GOLD_DK,
            size=5.6,
            h=9.4,
            pad=4.2,
        )
        c.setFillColor(INK)
        c.setFont(FONTS["serifBold"], 9.0)
        name_lines = wrap_text(c, person, FONTS["serifBold"], 9.0, rw - 14)
        ny = y - 22.4
        draw_lines(c, name_lines, x + 7, ny, FONTS["serifBold"], 9.0, 10.8, INK)
        ny = ny - 10.8 * len(name_lines) - 1.4
        title_used = draw_para(c, title, x + 7, ny, FONTS["sansItalic"], 6.4, 8.4, rw - 14, GOLD_DK)
        byy = ny - title_used - 3.8
        for b in bullets:
            used_b = check_item(c, b, x + 6, byy, rw - 14, size=6.65, leading=8.6)
            byy -= used_b + 2.0

    band_y = y - rh - 4.8 * mm
    band_h = 13.0 * mm
    rrect(c, INNER, band_y - band_h, CONTENT_W, band_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    c.setFillColor(GOLD)
    c.rect(INNER, band_y - band_h, 1.6, band_h, fill=1, stroke=0)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.7)
    c.drawString(INNER + 9, band_y - 5.6, "STATUS")
    c.setFillColor(INK_SOFT)
    c.setFont(FONTS["serifItalic"], 7.8)
    c.drawString(
        INNER + 9,
        band_y - 15.2,
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
    y = slim_y - 7.6 * mm

    section_label(c, "7  ·  Official royal activations (HOA-proposed)", INNER, y)
    y -= 7.0 * mm
    used = draw_para(
        c,
        "Exclusive Official Fortified Meal Provider for listed royal activations is an HOA-proposed commercial term — not a live award. Headcounts as tabled in BF/RH/HOA/FINAL-V5.",
        INNER,
        y,
        FONTS["sansItalic"],
        7.05,
        9.3,
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
    col_a, col_b = 44 * mm, 76 * mm
    col_c = CONTENT_W - col_a - col_b
    head_h = 7.2 * mm
    row_heights = []
    for t, detail, headcount in activations:
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.7, col_b - 9)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.5, col_c - 9)
        t_lines = wrap_text(c, t, FONTS["serifBold"], 7.7, col_a - 9)
        rh = max(len(d_lines) * 8.7, len(h_lines) * 8.5, len(t_lines) * 9.8) + 8.6
        row_heights.append(max(rh, 14.0 * mm))

    table_h = head_h + sum(row_heights)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.5)
    paint_table_head(c, INNER, y, CONTENT_W, head_h, ["ACTIVATION", "DETAIL", "HEADCOUNT (HOA)"], [col_a, col_b, col_c])

    yy = y - head_h
    for i, ((t, detail, headcount), rh) in enumerate(zip(activations, row_heights)):
        if i % 2 == 1:
            c.setFillColor(CREAM_DEEP)
            c.rect(INNER + 0.4, yy - rh, CONTENT_W - 0.8, rh, fill=1, stroke=0)
        hairline(c, INNER + 5, yy, CONTENT_W - 10, RULE, 0.35)
        t_lines = wrap_text(c, t, FONTS["serifBold"], 7.7, col_a - 9)
        d_lines = wrap_text(c, detail, FONTS["sans"], 6.7, col_b - 9)
        h_lines = wrap_text(c, headcount, FONTS["sans"], 6.5, col_c - 9)
        text_y = yy - 10.0
        draw_lines(c, t_lines, INNER + 7, text_y, FONTS["serifBold"], 7.7, 9.6, INK)
        draw_lines(c, d_lines, INNER + col_a + 3, text_y, FONTS["sans"], 6.7, 8.7, INK_SOFT)
        draw_lines(c, h_lines, INNER + col_a + col_b + 3, text_y, FONTS["sans"], 6.5, 8.4, GOLD_DK)
        yy -= rh

    y -= table_h + 6.2 * mm

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
    tg = 3.4 * mm
    tw = (CONTENT_W - tg) / 2
    th = 21.2 * mm
    for i, (lab, body, note) in enumerate(tiles):
        col = i % 2
        row = i // 2
        x = INNER + col * (tw + tg)
        ty = y - row * (th + 2.6 * mm)
        rrect(c, x, ty - th, tw, th, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.45)
        c.setFillColor(GOLD_DK)
        c.setFont(FONTS["sansBold"], 5.7)
        c.drawString(x + 8, ty - 7.6, lab)
        if lab == "PLANNED MONTHLY OFFTAKE":
            c.setFillColor(INK)
            c.setFont(FONTS["serifBold"], 13.0)
            c.drawString(x + 8, ty - 20.0, "50,000–200,000")
            c.setFillColor(MUTED)
            c.setFont(FONTS["sans"], 6.7)
            c.drawString(x + 8, ty - 30.0, "meals monthly  ·  HOA planned range, not a contracted volume")
        else:
            used_b = draw_para(c, body, x + 8, ty - 17.6, FONTS["sans"], 7.15, 9.3, tw - 16, INK_SOFT)
            c.setFillColor(GOLD_DK)
            c.setFont(FONTS["sansItalic"], 6.2)
            c.drawString(x + 8, ty - 17.6 - used_b - 3.2, note)

    y -= 2 * (th + 2.2 * mm) + 2.0 * mm

    prod_h = 13.6 * mm
    rrect(c, INNER, y - prod_h, CONTENT_W, prod_h, 2.4, fill=CREAM_CARD, stroke=GOLD, sw=0.45)
    c.setFillColor(GOLD_DK)
    c.setFont(FONTS["sansBold"], 5.7)
    c.drawString(INNER + 8, y - 6.6, "PRODUCTS IN SCOPE  ·  GROUP CATALOGUE")
    products = (
        "Fortified porridges  ·  One-pot meals  ·  Soya mince / institutional proteins  ·  Soups  ·  "
        "NSNP / institutional 5 kg formats where school- or clinic-linked"
    )
    draw_para(c, products, INNER + 8, y - 16.4, FONTS["sans"], 7.15, 9.3, CONTENT_W - 16, INK_SOFT)
    y -= prod_h + 4.2 * mm

    section_label(c, "9  ·  Honesty — what this is not", INNER, y)
    y -= 5.6 * mm

    notes = [
        "This document is a Big Five Group partner briefing of HOA principal terms — not an official Palace publication and not a record of executed statutory documents.",
        "Heads of Agreement BF/RH/HOA/FINAL-V5 sets principal terms only — not an executed SHA, MOI, supply contract, gazetted royal appointment, or funded government award.",
        "Until the HOA is executed and Royal approval is granted, treat exclusivity, offtake ranges and sponsor names as HOA-proposed.",
        "“Exclusive Official Fortified Meal Provider” is the proposed commercial term for listed activations — not a Palace press statement and not a government tender award.",
        "50,000–200,000 meals monthly is the HOA planned monthly offtake range — not audited delivery and not a contracted volume.",
        "Funding stack names are proposed channels — not closed sponsor awards. Named corporates are illustrative CSI channels.",
        "No Royal Rate rand figure is published here. Heritage language remains anchored to zulukingdom.co.za. This briefing does not speak for the Palace.",
    ]
    notes_h = 6.6 * mm
    for n in notes:
        nlines = wrap_text(c, n, FONTS["sans"], 6.4, CONTENT_W - 24)
        notes_h += len(nlines) * 8.15 + 1.45
    hon_h = min(notes_h, y - (BODY_BOTTOM + 0.4 * mm))
    rrect(c, INNER, y - hon_h, CONTENT_W, hon_h, 2.4, fill=CHAR, stroke=GOLD, sw=0.6)
    c.setFillColor(GOLD)
    c.rect(INNER, y - hon_h, 1.7, hon_h, fill=1, stroke=0)

    yy = y - 4.8 * mm
    floor = y - hon_h + 2.6 * mm
    for n in notes:
        if yy < floor + 6.5:
            break
        gold_dot(c, INNER + 8, yy)
        used_n = draw_para(c, n, INNER + 16, yy, FONTS["sans"], 6.4, 8.15, CONTENT_W - 24, GOLD_SOFT)
        yy -= used_n + 1.45

    draw_footer(c, 3)
    c.showPage()


def build():
    global ASSETS, ZK_PLATE, BFG_PLATE
    ASSETS = make_leopard_assets()
    ZK_PLATE = plate_logo(ZK_LOGO, 920, 330, pad=16)
    BFG_PLATE = plate_logo(BFG_LOGO, 420, 420, pad=18)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Isidlo seSilo · Heads of Agreement · BF/RH/HOA/FINAL-V5")
    c.setAuthor("Big Five Group (Pty) Ltd")
    c.setSubject(
        "Principal terms — subject to signature. Big Five Royal Foods (Pty) Ltd established · awaiting Royal approval."
    )
    c.setKeywords("Isidlo seSilo, Zulu Kingdom, Big Five Group, Big Five Royal Foods, Heads of Agreement")
    c.setCreator("Big Five Group partner briefing")

    page_1(c)
    page_2(c)
    page_3(c)
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
