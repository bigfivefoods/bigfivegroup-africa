/**
 * Generate Open Graph share cards: page hero + bigfivegroup-logo.png only
 * (no plate/box). Output: public/og/{slug}.jpg at 1200×630.
 *
 * Run: node scripts/generate-og-images.mjs
 */
import { createRequire } from "node:module";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { createCanvas, loadImage } = (() => {
  try {
    return require("@napi-rs/canvas");
  } catch {
    return { createCanvas: null, loadImage: null };
  }
})();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "og");

const W = 1200;
const H = 630;

/** slug → hero path relative to public/ */
const HEROES = {
  home: "home-hero.jpg",
  group: "home-hero.jpg",
  agri: "agri-hero.jpg",
  foods: "foods-hero.jpg",
  direct: "container-action-1.jpg",
  access: "access-hero.jpg",
  connect: "connect-hero.jpg",
  impact: "impact-hero.jpg",
  leadership: "leadership-hero.jpg",
  foundation: "foundation-hero.jpg",
  global: "global-hero.jpg",
  africa: "africa-hero.jpg",
  about: "about-hero.jpg",
  contact: "home-hero.jpg",
  newsletter: "home-hero.jpg",
  brand: "home-hero.jpg",
  methodology: "home-hero.jpg",
  "partner-kit": "home-hero.jpg",
  updates: "home-hero.jpg",
};

async function generateWithPillow() {
  // Fallback via python if canvas not installed
  const { spawnSync } = await import("node:child_process");
  const py = `
from PIL import Image, ImageOps, ImageFilter, ImageDraw
import os, json

W, H = 1200, 630
public = ${JSON.stringify(publicDir)}
out_dir = ${JSON.stringify(outDir)}
heroes = ${JSON.stringify(HEROES)}
logo_path = os.path.join(public, "bigfivegroup-logo.png")
os.makedirs(out_dir, exist_ok=True)
logo_src = Image.open(logo_path).convert("RGBA")

def make(slug, hero_rel):
    hero_path = os.path.join(public, hero_rel.lstrip("/"))
    if not os.path.isfile(hero_path):
        print("skip missing", hero_path)
        return
    hero = Image.open(hero_path).convert("RGB")
    try:
        hero = ImageOps.exif_transpose(hero)
    except Exception:
        pass
    hw, hh = hero.size
    scale = max(W / hw, H / hh)
    nw, nh = int(hw * scale), int(hh * scale)
    hero = hero.resize((nw, nh), Image.Resampling.LANCZOS)
    left, top = (nw - W) // 2, (nh - H) // 2
    hero = hero.crop((left, top, left + W, top + H))
    # subtle darken so logo reads — no solid plate
    dark = Image.new("RGB", (W, H), (0, 0, 0))
    hero = Image.blend(hero, dark, 0.28)
    canvas = hero.convert("RGBA")
    # logo only — large, centered, soft drop shadow (no box)
    logo = logo_src.copy()
    target_w = int(W * 0.38)
    lw, lh = logo.size
    r = target_w / lw
    logo = logo.resize((int(lw * r), int(lh * r)), Image.Resampling.LANCZOS)
    # shadow under logo
    shadow = Image.new("RGBA", (logo.width + 40, logo.height + 40), (0, 0, 0, 0))
    s_layer = Image.new("RGBA", logo.size, (0, 0, 0, 90))
    shadow.paste(s_layer, (20, 22), logo.split()[3] if logo.mode == "RGBA" else None)
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    lx = (W - logo.width) // 2
    ly = (H - logo.height) // 2
    canvas.paste(shadow, (lx - 20, ly - 18), shadow)
    canvas.paste(logo, (lx, ly), logo)
    out = canvas.convert("RGB")
    dest = os.path.join(out_dir, f"{slug}.jpg")
    out.save(dest, "JPEG", quality=90, optimize=True, progressive=True)
    print("wrote", dest, os.path.getsize(dest))

# also root og-share.jpg = home
make("home", heroes["home"])
for slug, hero in heroes.items():
    if slug == "home":
        continue
    make(slug, hero)
# copy home to og-share.jpg for default
import shutil
shutil.copy2(os.path.join(out_dir, "home.jpg"), os.path.join(public, "og-share.jpg"))
print("updated public/og-share.jpg")
`;
  const r = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) throw new Error(`python generate failed: ${r.status}`);
}

await fs.mkdir(outDir, { recursive: true });
await generateWithPillow();
console.log("OG images ready in public/og/");
