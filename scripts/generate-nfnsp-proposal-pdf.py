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
from reportlab.lib.colors import HexColor, white
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
MUTED = HexColor("#525252")
CREAM = HexColor("#F7F1E6")
PAPER = HexColor("#FAFAFA")
RULE = HexColor("#E5D9C4")

INNER = 16 * mm
CONTENT_W = PAGE_W - 2 * INNER
FOOTER_H = 12 * mm
TOTAL = 5


def fonts() -> dict[str, str]:
    c = {
        "sans": "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "sansBold": "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "sansItalic": "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
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


def plate(path: Path, bw: int, bh: int, pad=12) -> ImageReader:
    im = PILImage.open(path).convert("RGBA")
    canvas = PILImage.new("RGB", (bw, bh), (255, 255, 255))
    aw, ah = bw - 2 * pad, bh - 2 * pad
    sc = min(aw / im.width, ah / im.height)
    nw, nh = max(1, int(im.width * sc)), max(1, int(im.height * sc))
    im = im.resize((nw, nh), PILImage.Resampling.LANCZOS)
    canvas.paste(im, ((bw - nw) // 2, (bh - nh) // 2), im)
    return to_reader(canvas, 93)


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


NDA_PLATE = None
BFG_PLATE = None
HERO_IMG = None


def cobrand(c, x, y):
    nda_w, nda_h = 58 * mm, 18 * mm
    rrect(c, x, y, nda_w, nda_h, 2, fill=white, stroke=GOLD, sw=0.6)
    c.drawImage(NDA_PLATE, x + 2, y + 1.5, width=nda_w - 4, height=nda_h - 3, preserveAspectRatio=True, anchor="c")
    c.setFillColor(GOLD)
    c.setFont(F["serifBold"], 11)
    c.drawCentredString(x + nda_w + 5 * mm, y + nda_h / 2 - 3, "×")
    bx = x + nda_w + 10 * mm
    rrect(c, bx, y, nda_h, nda_h, 2, fill=white, stroke=GOLD, sw=0.6)
    c.drawImage(BFG_PLATE, bx + 1.2, y + 1.2, width=nda_h - 2.4, height=nda_h - 2.4, preserveAspectRatio=True, anchor="c")


def footer(c, n):
    c.setFillColor(FOREST)
    c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sans"], 6.2)
    c.drawString(INNER, 5.2, "CONFIDENTIAL · NFNSP-2 · v1.0 · September 2026")
    c.drawCentredString(PAGE_W / 2, 5.2, "Principal terms · not an awarded tender")
    c.setFont(F["sansBold"], 6.3)
    c.drawRightString(PAGE_W - INNER, 5.2, f"{n}  /  {TOTAL}")


def header_bar(c, running: str):
    h = 28 * mm
    y = PAGE_H - h
    c.setFillColor(FOREST)
    c.rect(0, y, PAGE_W, h, fill=1, stroke=0)
    cobrand(c, INNER, y + 5)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sansBold"], 6.2)
    c.drawRightString(PAGE_W - INNER, y + 16.5, "NFNSP-2  ·  2027–2037")
    c.setFillColor(GOLD)
    c.setFont(F["serifItalic"], 7.6)
    c.drawRightString(PAGE_W - INNER, y + 8, running)
    return y


def kicker(c, text, x, y):
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.3)
    c.drawString(x, y, text.upper())


def page_1(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # hero
    hh = 92 * mm
    hy = PAGE_H - hh
    if HERO_IMG:
        c.drawImage(HERO_IMG, 0, hy, width=PAGE_W, height=hh, preserveAspectRatio=False, mask="auto")
    c.setFillColor(HexColor("#0B1C22"))
    c.setFillColorRGB(0.043, 0.11, 0.133)
    # overlay
    c.saveState()
    c.setFillColor(HexColor("#0B1C22"))
    c.setFillColor(FOREST_DK)
    from reportlab.lib.colors import Color
    c.setFillColor(Color(0.043, 0.11, 0.133, alpha=0.78))
    c.rect(0, hy, PAGE_W, hh, fill=1, stroke=0)
    c.restoreState()

    cobrand(c, INNER, PAGE_H - 26 * mm)
    c.setFillColor(GOLD_LT)
    c.setFont(F["sansBold"], 6.4)
    c.drawString(INNER, PAGE_H - 34 * mm, "PARTNER PORTAL  ·  CONFIDENTIAL  ·  NFNSP-2")
    c.setFillColor(white)
    c.setFont(F["serifBold"], 22)
    c.drawString(INNER, PAGE_H - 46 * mm, "Implementation partnership")
    c.setFillColor(GOLD_LT)
    c.setFont(F["serifItalic"], 9.5)
    c.drawString(INNER, PAGE_H - 56 * mm, "Operationalising the National Food and Nutrition Security Plan  ·  2027–2037")
    c.setFillColor(white)
    c.setFont(F["sans"], 7.4)
    para(
        c,
        "Private briefing for the NFNSP Technical Working Group / Department of Agriculture. Not a government publication. Not an awarded tender. Not a current NSNP daily headcount.",
        INNER,
        PAGE_H - 66 * mm,
        F["sans"],
        7.4,
        9.6,
        CONTENT_W,
        HexColor("#F0E6D2"),
    )

    y = hy - 10 * mm
    kicker(c, "Sourced national figures", INNER, y)
    y -= 8 * mm
    stats = [
        ("22.2%", "Households with inadequate or severely inadequate food access", "GHS 2024, as cited in NFNSP-2"),
        ("~29%", "Children under five stunted (severe 15%; Framework baseline 27%)", "NFNSS 2023"),
        ("17.6%", "People below food poverty line R777 pp/pm (2023 prices)", "Poverty Trends 2025"),
        ("10/20/30%", "Smallholder share of government food procurement", "Plan targets 2029 / 2033 / 2037"),
    ]
    tw = (CONTENT_W - 9 * mm) / 2
    th = 28 * mm
    for i, (v, lab, src) in enumerate(stats):
        col, row = i % 2, i // 2
        x = INNER + col * (tw + 9 * mm)
        ty = y - row * (th + 4 * mm)
        rrect(c, x, ty - th, tw, th, 3, fill=CREAM, stroke=GOLD, sw=0.45)
        c.setFillColor(FOREST)
        c.setFont(F["serifBold"], 16)
        c.drawString(x + 8, ty - 12, v)
        para(c, lab, x + 8, ty - 22, F["sans"], 7.2, 9.2, tw - 16, INK)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.2)
        c.drawString(x + 8, ty - th + 6, src)

    y = y - 2 * (th + 4 * mm) - 6 * mm
    kicker(c, "Honesty", INNER, y)
    y -= 8 * mm
    rrect(c, INNER, y - 22 * mm, CONTENT_W, 22 * mm, 3, fill=FOREST, stroke=None)
    para(
        c,
        "Programme-reported meals to date are in the hundreds of thousands (355 000 on the Group site, programme-reported), not millions. The 2.5 million children-per-day NSNP figure is a DBE-pathway plan, not a current daily headcount. SupplierAdvisor® does not replace BAS or LOGIS.",
        INNER + 8,
        y - 8,
        F["sans"],
        7.2,
        9.4,
        CONTENT_W - 16,
        GOLD_LT,
    )
    footer(c, 1)
    c.showPage()


def page_2(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, "Why now  ·  reading the Plan  ·  who we are")
    y = top - 10 * mm
    kicker(c, "02  ·  Why now", INNER, y)
    y -= 7 * mm
    why = [
        ("Access", "GHS 2024: 22.2% of households inadequate or severely inadequate. Worst: Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%."),
        ("Stunting", "NFNSS 2023: about 29% of children under five stunted; 15% severely. Framework working baseline 27%. Complementary feeding in 50% of high-risk areas by 2029."),
        ("Poverty is young", "Poverty Trends 2025: 17.6% below the food poverty line of R777 pp/pm (2023 prices). 71% of the poor in 2023 were under 35."),
        ("Procurement", "Plan targets: 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement — only if lots, invoices and identity are real."),
    ]
    for t, d in why:
        rrect(c, INNER, y - 22 * mm, CONTENT_W, 22 * mm, 2.5, fill=CREAM, stroke=RULE, sw=0.4)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER + 8, y - 8, t)
        para(c, d, INNER + 8, y - 16, F["sans"], 7.3, 9.5, CONTENT_W - 16, MUTED)
        y -= 24.5 * mm

    y -= 4 * mm
    kicker(c, "03–04  ·  Reading the Plan  ·  Who we are", INNER, y)
    y -= 8 * mm
    para(
        c,
        "NFNSP-2 Draft 2.2 (July 2026) and the Results Framework of 27 August 2026 are the source documents. This briefing does not replace them. Big Five Group (Pty) Ltd — KwaZulu-Natal. Dr. Craig R. Muller, Founder — craig@bigfivegroup.africa · +27 (0) 82 581 4215. This workspace does not speak for the Department.",
        INNER,
        y,
        F["sans"],
        8,
        10.5,
        CONTENT_W,
        INK,
    )
    footer(c, 2)
    c.showPage()


def page_3(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, "Foods  ·  workstreams  ·  demonstration")
    y = top - 10 * mm
    kicker(c, "05  ·  Big Five Foods — labelled Group figures", INNER, y)
    y -= 8 * mm
    foods = [
        ("~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot per meal", "Institutional cost points, approximate"),
        ("~50% below wholesale/retail", "Internal cost comparison"),
        ("24-month ambient shelf life", "Product specification"),
        ("74% more nutrition / 185% more fortification", "Formulation / design; lab pack in first 90 days"),
        ("ISO 9001, FSSC 22000, Sedex, SANHA Halaal, Kosher, SAAFoST", "As published on bigfivegroup.africa/foods"),
    ]
    for t, lab in foods:
        c.setFillColor(INK)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER, y, t)
        c.setFillColor(MUTED)
        c.setFont(F["sansItalic"], 6.5)
        c.drawString(INNER, y - 9, lab)
        y -= 16 * mm

    y -= 2 * mm
    kicker(c, "08  ·  Five workstreams A–E", INNER, y)
    y -= 8 * mm
    ws = [
        ("A Plates", "One SKU family across NSNP, ECD, CNDC and holiday packs. 5 kg institutional packs."),
        ("B Markets", "Costed container / micro-hub spec for an IDP / DDM One Plan. SANTACO rank + rural nodes."),
        ("C Producers", "SupplierAdvisor® identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("D Agency", "5-minute porridge / 20-minute OnePot; 6–23 month complementary feeding. Super-Cube® for implementers."),
        ("E OS", "Onboarding, FNB/BankLink feeds, SchoolAdvisor gates, POPIA MELIA extract. No learner names."),
    ]
    for t, d in ws:
        rrect(c, INNER, y - 18 * mm, CONTENT_W, 18 * mm, 2.5, fill=CREAM, stroke=RULE, sw=0.4)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER + 8, y - 7.5, t)
        para(c, d, INNER + 8, y - 15, F["sans"], 7.1, 9.2, CONTENT_W - 16, MUTED)
        y -= 20 * mm

    y -= 2 * mm
    kicker(c, "09  ·  Demonstration", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Phase 1: two KZN local municipalities + one metro cluster (rural Zululand-type, peri-urban, dense informal-trade node in eThekwini or Msunduzi). Phase 2: a second high-inadequacy province (Eastern Cape is the Plan’s own reference). Scale only after a closed circuit holds.",
        INNER,
        y,
        F["sans"],
        8,
        10.4,
        CONTENT_W,
        INK,
    )
    footer(c, 3)
    c.showPage()


def page_4(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, "SupplierAdvisor® farm-to-fork OS")
    y = top - 10 * mm
    kicker(c, "06  ·  Operating system", INNER, y)
    y -= 8 * mm
    c.setFillColor(FOREST)
    c.setFont(F["serifBold"], 13)
    c.drawString(INNER, y, "One workspace: network, buy, make, hold, ship, pay, prove")
    y -= 10 * mm
    rrect(c, INNER, y - 16 * mm, CONTENT_W, 16 * mm, 2.5, fill=FOREST, stroke=None)
    para(
        c,
        "SupplierAdvisor® does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have.",
        INNER + 8,
        y - 7,
        F["sansBold"],
        8,
        10.4,
        CONTENT_W - 16,
        GOLD_LT,
    )
    y -= 22 * mm
    mods = [
        "Verified network + OTIFEF",
        "POs / invoices / lot holds",
        "Inventory",
        "BOM / MPS / MRP",
        "GPS shipping",
        "HACCP holds that stop ship",
        "SHEQ",
        "SchoolAdvisor",
        "ContainerAdvisor®",
        "GL / AR / AP / VAT",
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
        c.setFont(F["sans"], 6.6)
        c.drawString(x + 5, ty - 6.4, m)
    y -= 5 * 11 * mm + 6 * mm
    kicker(c, "Actor table", INNER, y)
    y -= 6 * mm
    actors = [
        ("Smallholder", "Identity, GPS, lots, invoices so the 10% target survives PFMA."),
        ("Hub", "Receive, grade, lot, hold."),
        ("Foods mill", "BOM, MPS, MRP, HACCP, ship-or-hold."),
        ("Trader", "OTIFEF, inventory, invoices."),
        ("School / ECD / CNDC", "SchoolAdvisor gates. Lot-and-kitchen proof. No learner names."),
        ("Municipality / Treasury", "SLA, IDP/SDBIP annex, PFMA/MFMA workstream."),
        ("Bank / CSI / DFI", "FNB Integration Channel and BankLink where selected."),
    ]
    head_h, row_h = 7 * mm, 11.5 * mm
    table_h = head_h + row_h * len(actors)
    rrect(c, INNER, y - table_h, CONTENT_W, table_h, 2.5, fill=white, stroke=GOLD, sw=0.45)
    c.setFillColor(CREAM)
    c.rect(INNER, y - head_h, CONTENT_W, head_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont(F["sansBold"], 6.2)
    c.drawString(INNER + 8, y - 5, "ACTOR")
    c.drawString(INNER + 52 * mm, y - 5, "ROLE")
    yy = y - head_h
    for i, (a, r) in enumerate(actors):
        if i % 2:
            c.setFillColor(HexColor("#FBF7EE"))
            c.rect(INNER + 0.4, yy - row_h, CONTENT_W - 0.8, row_h, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont(F["sansBold"], 7.4)
        c.drawString(INNER + 8, yy - 7.2, a)
        para(c, r, INNER + 52 * mm, yy - 7.2, F["sans"], 7.1, 9, CONTENT_W - 60 * mm, MUTED)
        yy -= row_h
    footer(c, 4)
    c.showPage()


def page_5(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    top = header_bar(c, "90-day ask  ·  risk  ·  conclusion")
    y = top - 10 * mm
    kicker(c, "12  ·  Five asks", INNER, y)
    y -= 8 * mm
    asks = [
        ("01", "Closed technical briefing", "NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD nutrition, KZN Provincial Treasury, SALGA KZN."),
        ("02", "Name KwaZulu-Natal", "Joint demonstration province — two local municipalities + one metro cluster."),
        ("03", "PFMA / MFMA workstream", "How a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target requires."),
        ("04", "Data protocol", "SupplierAdvisor® extracts sit inside MELIA, not beside it. No learner names."),
        ("05", "A seat at the tables", "Private-sector round tables / municipal roadshows the 27 August 2026 Framework is written for."),
    ]
    for n, t, d in asks:
        rrect(c, INNER, y - 18 * mm, CONTENT_W, 18 * mm, 2.5, fill=CREAM, stroke=RULE, sw=0.4)
        c.setFillColor(GOLD)
        c.setFont(F["sansBold"], 7)
        c.drawString(INNER + 8, y - 7, n)
        c.setFillColor(FOREST)
        c.setFont(F["sansBold"], 8)
        c.drawString(INNER + 18, y - 7, t)
        para(c, d, INNER + 8, y - 15, F["sans"], 7.1, 9.2, CONTENT_W - 16, MUTED)
        y -= 20 * mm

    y -= 2 * mm
    kicker(c, "In return (90 days)", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Costed node pack · three-menu institutional basket vs a reference school meal · producer-onboarding protocol · draft municipal SLA for an IDP/SDBIP annex · one-page risk register.",
        INNER,
        y,
        F["sans"],
        8,
        10.4,
        CONTENT_W,
        INK,
    )
    y -= 22 * mm
    kicker(c, "11  ·  Risk (selected)", INNER, y)
    y -= 8 * mm
    para(
        c,
        "Not an awarded NSNP contract. 2.5 million daily meals is a DBE-pathway plan, not current headcount. 355 000 meals is programme-reported. SupplierAdvisor® does not replace BAS or LOGIS. No learner names in MELIA extracts. PFMA/MFMA path is ask 3 — before scale.",
        INNER,
        y,
        F["sans"],
        8,
        10.4,
        CONTENT_W,
        INK,
    )
    y -= 28 * mm
    kicker(c, "13  ·  Conclusion", INNER, y)
    y -= 8 * mm
    para(
        c,
        "The Plan has the targets. The Group has plates, an OS, and a demonstration design. What is asked in 90 days is a closed briefing, a named province, a lawful buying path, a MELIA protocol, and a seat at the tables already written into the Framework.",
        INNER,
        y,
        F["serifItalic"],
        8.5,
        11.2,
        CONTENT_W,
        FOREST,
    )
    footer(c, 5)
    c.showPage()


def build():
    global NDA_PLATE, BFG_PLATE, HERO_IMG
    NDA_PLATE = plate(NDA, 1100, 360, pad=16)
    BFG_PLATE = plate(BFG, 420, 420, pad=16)
    if HERO.exists():
        him = PILImage.open(HERO).convert("RGB")
        HERO_IMG = to_reader(him, 88)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("NFNSP-2 Implementation Partnership Proposal · Big Five Group")
    c.setAuthor("Big Five Group (Pty) Ltd")
    c.setSubject("Confidential partner briefing — not an awarded tender")
    c.setKeywords("NFNSP, Department of Agriculture, Big Five Foods, SupplierAdvisor")
    page_1(c)
    page_2(c)
    page_3(c)
    page_4(c)
    page_5(c)
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
