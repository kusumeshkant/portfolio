"""
Generate responsive photos, favicons and the Open Graph image.

    pip install pillow        # Pillow 11.2+ for AVIF
    python scripts/generate-images.py

Source photo: design/me-source.jpeg. Fonts (Syne, Outfit, JetBrains Mono — OFL)
are downloaded from github.com/google/fonts into scripts/.fonts/ on first run.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
FONTS = os.path.join(ROOT, "scripts", ".fonts")
FONT_URLS = {
    "Syne.ttf":   "https://github.com/google/fonts/raw/main/ofl/syne/Syne%5Bwght%5D.ttf",
    "Outfit.ttf": "https://github.com/google/fonts/raw/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
    "JBMono.ttf": "https://github.com/google/fonts/raw/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
}
os.makedirs(FONTS, exist_ok=True)
for name, url in FONT_URLS.items():
    if not os.path.exists(os.path.join(FONTS, name)):
        urllib.request.urlretrieve(url, os.path.join(FONTS, name))
os.makedirs(f"{PUB}/img", exist_ok=True)
src = Image.open(os.path.join(ROOT, "design", "me-source.jpeg")).convert("RGB")
W, H = src.size

# ── 1. Responsive 3:4 portrait (matches the hero frame; head near the top) ──
h = round(W * 4 / 3); top = round((H - h) * 0.12)
portrait = src.crop((0, top, W, top + h))
for w in (480, 704):
    im = portrait.resize((w, round(w * 4 / 3)), Image.LANCZOS)
    im.save(f"{PUB}/img/me-{w}.avif", quality=55)
    im.save(f"{PUB}/img/me-{w}.webp", quality=78, method=6)
    im.save(f"{PUB}/img/me-{w}.jpg", quality=80, optimize=True, progressive=True)

# ── 2. Favicons (face crop) ─────────────────────────────────────────────
face = src.crop((235, 295, 475, 535))
BG, SKY, VIOLET = (8, 11, 20), (79, 195, 247), (139, 92, 246)

def gradient(size, a, b):
    g = Image.new("RGB", (size, size))
    px = g.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))
    return g

def round_icon(size):
    s = size * 4                                 # supersample for smooth edges
    ring = max(2, round(s * 0.045))
    out = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    disc = Image.new("L", (s, s), 0); ImageDraw.Draw(disc).ellipse((0, 0, s - 1, s - 1), fill=255)
    out.paste(gradient(s, SKY, VIOLET), (0, 0), disc)          # gradient ring
    inner = Image.new("L", (s, s), 0); ImageDraw.Draw(inner).ellipse((ring, ring, s - 1 - ring, s - 1 - ring), fill=255)
    out.paste(face.resize((s, s), Image.LANCZOS), (0, 0), inner)
    return out.resize((size, size), Image.LANCZOS)

round_icon(256).save(f"{PUB}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
round_icon(192).save(f"{PUB}/icon-192.png")
face.resize((180, 180), Image.LANCZOS).save(f"{PUB}/apple-touch-icon.png")  # iOS masks it itself

# ── 3. Open Graph image 1200×630 ────────────────────────────────────────
OW, OH = 1200, 630
og = Image.new("RGB", (OW, OH), BG)
d = ImageDraw.Draw(og)
for y in range(14, OH, 28):                       # dot grid, like the site background
    for x in range(14, OW, 28):
        d.point((x, y), fill=(22, 30, 48))
glow = Image.new("L", (OW, OH), 0)                # soft sky glow, top-left
ImageDraw.Draw(glow).ellipse((-300, -350, 700, 350), fill=60)
og = Image.composite(Image.new("RGB", (OW, OH), (16, 40, 60)), og, glow.filter(ImageFilter.GaussianBlur(120)))

# photo on the right, fading into the background
ph_w = 470
ph = portrait.resize((ph_w, round(ph_w * 4 / 3)), Image.LANCZOS).crop((0, 20, ph_w, 20 + OH))
fade = Image.new("L", (ph_w, OH), 255); fp = fade.load()
for x in range(ph_w):
    a = min(1, x / 190)
    for y in range(OH):
        b = min(1, (OH - y) / 160)
        fp[x, y] = round(255 * a * b * 0.92)
og.paste(ph, (OW - ph_w, 0), fade)

def font(path, size, var):
    f = ImageFont.truetype(os.path.join(FONTS, path), size); f.set_variation_by_name(var); return f

d = ImageDraw.Draw(og)
x0 = 72
d.text((x0, 150), "BANGALORE · OPEN TO REMOTE", font=font("JBMono.ttf", 20, "Regular"), fill=(125, 133, 144))
d.text((x0, 190), "Kusumeshkant", font=font("Syne.ttf", 82, "Bold"), fill=(240, 246, 252))
# gradient "Sharma." — draw as mask, fill with the sky→violet gradient
name_f = font("Syne.ttf", 82, "Bold")
mask = Image.new("L", (OW, OH), 0); ImageDraw.Draw(mask).text((x0, 278), "Sharma.", font=name_f, fill=255)
grad = Image.new("RGB", (OW, OH)); gp = ImageDraw.Draw(grad)
for x in range(OW):
    t = min(1, max(0, (x - x0) / 330))
    gp.line([(x, 0), (x, OH)], fill=tuple(round(SKY[i] + (VIOLET[i] - SKY[i]) * t) for i in range(3)))
og.paste(grad, (0, 0), mask)
d = ImageDraw.Draw(og)
d.text((x0, 400), "Senior Flutter Developer", font=font("Outfit.ttf", 44, "SemiBold"), fill=SKY)
d.text((x0, 458), "Cross-Platform iOS & Android", font=font("Outfit.ttf", 30, "Regular"), fill=(201, 209, 217))
d.text((x0, 540), "Flutter · Riverpod · BLoC · Clean Architecture · Supabase", font=font("JBMono.ttf", 20, "Regular"), fill=(125, 133, 144))
og.save(f"{PUB}/og-image.png", optimize=True)
print("ok")
