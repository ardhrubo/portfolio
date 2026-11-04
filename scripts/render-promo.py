"""Render the illustrative portfolio promo video (vertical 1080x1920 & widescreen 1920x1080).
Requires Python 3, PyCairo, PyGObject (Rsvg 2.0), Pillow, numpy, Node.js, and FFmpeg with libx264.
Run:
  python3 scripts/render-promo.py --preview
  python3 scripts/render-promo.py --ffmpeg /path/to/ffmpeg
Content facts are read directly from src/data/portfolioData.js through Node.
"""
import argparse
import json
import math
import subprocess
import warnings
from functools import lru_cache
from pathlib import Path

warnings.filterwarnings("ignore", category=DeprecationWarning)

import cairo
import gi
gi.require_version('Rsvg', '2.0')
from gi.repository import Rsvg
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/media'
OUT.mkdir(exist_ok=True)

parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', default='ffmpeg')
parser.add_argument('--preview', action='store_true')
opt = parser.parse_args()

content = json.loads(
    subprocess.check_output(
        [
            'node',
            '--input-type=module',
            '-e',
            "import {personalInfo,projectsData,promoReelData,engineeringStrategy} from './src/data/portfolioData.js';"
            "console.log(JSON.stringify({personalInfo,engineeringStrategy,projects:promoReelData.projectIds.map(id=>projectsData.find(p=>p.id===id))}))",
        ],
        cwd=ROOT,
    )
)

P = content['personalInfo']
PROJECTS = content['projects']
STRATEGY = content['engineeringStrategy']
FPS = 30
DURATION = 24

# Theme palette aligned with src/styles/theme.css (Dark Obsidian + Technical Emerald + Cyan + Violet)
OBSIDIAN = (11, 10, 10)
WHITE = '#f2f4f2'
TEXT_SEC = '#b8c4be'
TEXT_MUTED = '#7f8c86'
EMERALD = '#22c55e'
MINT = '#4ade80'
CYAN = '#28b5ff'
VIOLET = '#b08cff'
CORAL = '#ff9356'

LIGHT_BG_LOGOS = {'nextjs', 'threejs', 'codex', 'cursor', 'hermes'}


@lru_cache(None)
def font(size, kind='heading', weight=600):
    path = {
        'heading': 'space-grotesk-400-700.woff2',
        'body': 'dm-sans-400-700.woff2',
        'mono': 'jetbrains-mono-400-600.woff2',
    }[kind]
    f = ImageFont.truetype(str(ROOT / 'public/fonts' / path), max(10, int(round(size))))
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def ease_out_quart(x):
    x = max(0.0, min(1.0, float(x)))
    return 1.0 - (1.0 - x) ** 4


def ease_in_out_cubic(x):
    x = max(0.0, min(1.0, float(x)))
    return 4 * x * x * x if x < 0.5 else 1 - ((-2 * x + 2) ** 3) / 2


def hex_rgba(hex_str, alpha=1.0):
    h = hex_str.lstrip('#')
    return (int(h[0:2], 16) / 255.0, int(h[2:4], 16) / 255.0, int(h[4:6], 16) / 255.0, alpha)


def hex_rgb_int(hex_str, alpha=255):
    h = hex_str.lstrip('#')
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), alpha)


@lru_cache(None)
def load_logo_pil(rel_path, size):
    size = int(round(size))
    fp = ROOT / 'public' / rel_path.lstrip('/')
    if fp.suffix.lower() == '.svg':
        handle = Rsvg.Handle.new_from_file(str(fp))
        dim = handle.get_dimensions()
        sw = max(1, dim.width)
        sh = max(1, dim.height)
        surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, size, size)
        ctx = cairo.Context(surf)
        scale = min(size / sw, size / sh)
        ox = (size - sw * scale) / 2.0
        oy = (size - sh * scale) / 2.0
        ctx.translate(ox, oy)
        ctx.scale(scale, scale)
        handle.render_cairo(ctx)
        buf = np.frombuffer(surf.get_data(), dtype=np.uint8).reshape((size, size, 4)).copy()
        # Convert BGRA premultiplied to RGBA
        b, g, r, a = buf[:, :, 0], buf[:, :, 1], buf[:, :, 2], buf[:, :, 3]
        nz = a > 0
        r_out = np.zeros_like(r)
        g_out = np.zeros_like(g)
        b_out = np.zeros_like(b)
        r_out[nz] = np.clip((r[nz].astype(np.int32) * 255) // a[nz], 0, 255).astype(np.uint8)
        g_out[nz] = np.clip((g[nz].astype(np.int32) * 255) // a[nz], 0, 255).astype(np.uint8)
        b_out[nz] = np.clip((b[nz].astype(np.int32) * 255) // a[nz], 0, 255).astype(np.uint8)
        rgba = np.stack([r_out, g_out, b_out, a], axis=-1)
        return Image.fromarray(rgba, 'RGBA')
    else:
        im = Image.open(fp).convert('RGBA')
        im.thumbnail((size, size), Image.Resampling.LANCZOS)
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
        return canvas


@lru_cache(None)
def load_avatar_rounded(size, radius):
    size = int(round(size))
    radius = int(round(radius))
    im = Image.open(ROOT / 'public' / P['avatar'].lstrip('/')).convert('RGBA')
    sw, sh = im.size
    side = min(sw, sh)
    im = im.crop(((sw - side) // 2, int((sh - side) * 0.15), (sw + side) // 2, int((sh - side) * 0.15) + side))
    im = im.resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


screens = [Image.open(ROOT / 'public' / p['image'].lstrip('/')).convert('RGB') for p in PROJECTS]


def cairo_rounded_rect(ctx, x, y, w, h, r):
    r = min(r, w / 2.0, h / 2.0)
    ctx.new_sub_path()
    ctx.arc(x + w - r, y + r, r, -math.pi / 2, 0)
    ctx.arc(x + w - r, y + h - r, r, 0, math.pi / 2)
    ctx.arc(x + r, y + h - r, r, math.pi / 2, math.pi)
    ctx.arc(x + r, y + r, r, math.pi, 3 * math.pi / 2)
    ctx.close_path()


def draw_glass_panel(ctx, x, y, w, h, r=22, tint=EMERALD, tint_alpha=0.10, base_alpha=0.76, border_alpha=0.28):
    # Ambient drop shadow
    cairo_rounded_rect(ctx, x + 2, y + 8, w, h, r)
    ctx.set_source_rgba(0, 0, 0, 0.42)
    ctx.fill()

    # Main glass body gradient
    cairo_rounded_rect(ctx, x, y, w, h, r)
    grad = cairo.LinearGradient(x, y, x + w * 0.85, y + h)
    tr, tg, tb, _ = hex_rgba(tint)
    grad.add_color_stop_rgba(0.0, tr * 0.28 + 0.07, tg * 0.28 + 0.08, tb * 0.28 + 0.09, base_alpha + tint_alpha * 0.5)
    grad.add_color_stop_rgba(0.55, 0.07, 0.08, 0.09, base_alpha)
    grad.add_color_stop_rgba(1.0, 0.05, 0.06, 0.07, base_alpha + 0.06)
    ctx.set_source(grad)
    ctx.fill_preserve()

    # Outer border with subtle tint glow
    b_grad = cairo.LinearGradient(x, y, x, y + h)
    b_grad.add_color_stop_rgba(0.0, min(1.0, tr * 0.6 + 0.45), min(1.0, tg * 0.6 + 0.50), min(1.0, tb * 0.6 + 0.48), border_alpha + 0.22)
    b_grad.add_color_stop_rgba(0.5, tr * 0.5 + 0.2, tg * 0.5 + 0.24, tb * 0.5 + 0.22, border_alpha)
    b_grad.add_color_stop_rgba(1.0, 0.18, 0.22, 0.21, border_alpha * 0.8)
    ctx.set_source(b_grad)
    ctx.set_line_width(1.5)
    ctx.stroke()

    # Specular top-edge liquid rim highlight
    ctx.save()
    cairo_rounded_rect(ctx, x + 1.5, y + 1.5, w - 3, h * 0.35, max(2, r - 1.5))
    rim = cairo.LinearGradient(x, y, x, y + h * 0.28)
    rim.add_color_stop_rgba(0.0, 1.0, 1.0, 1.0, 0.12)
    rim.add_color_stop_rgba(1.0, 1.0, 1.0, 1.0, 0.0)
    ctx.set_source(rim)
    ctx.fill()
    ctx.restore()


def cairo_to_pil(surface):
    w, h = surface.get_width(), surface.get_height()
    buf = np.frombuffer(surface.get_data(), dtype=np.uint8).reshape((h, w, 4)).copy()
    b, g, r, a = buf[:, :, 0], buf[:, :, 1], buf[:, :, 2], buf[:, :, 3]
    rgba = np.stack([r, g, b, a], axis=-1)
    return Image.fromarray(rgba, 'RGBA')


@lru_cache(None)
def base_atmosphere(w, h):
    y, x = np.mgrid[0:h, 0:w]
    nx = x / float(w)
    ny = y / float(h)
    rgb = np.zeros((h, w, 3), dtype=np.float32) + np.array([10.0, 11.0, 13.0])
    nebulae = [
        (0.16, 0.18, 0.55, [10, 52, 34]),   # Emerald top-left
        (0.86, 0.26, 0.52, [9, 38, 56]),    # Cyan top-right
        (0.78, 0.82, 0.58, [30, 18, 52]),   # Violet bottom-right
        (0.18, 0.86, 0.50, [12, 42, 36]),   # Teal bottom-left
    ]
    for cx, cy, rad, col in nebulae:
        dist2 = ((nx - cx) ** 2 + (ny - cy) ** 2) / (rad * rad)
        a = np.exp(-dist2 * 2.6)[..., None]
        rgb += a * np.array(col, dtype=np.float32)

    im = Image.fromarray(np.uint8(np.clip(rgb, 0, 255))).convert('RGBA')

    # Vector contour rings + dot grid via Cairo
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    # Subtle topographic contour arcs
    ctx.set_line_width(1.0)
    for i in range(1, 7):
        ctx.arc(w * 0.82, h * 0.24, i * min(w, h) * 0.09, 0, math.pi * 2)
        ctx.set_source_rgba(0.18, 0.78, 0.45, 0.035)
        ctx.stroke()
    for i in range(1, 6):
        ctx.arc(w * 0.15, h * 0.82, i * min(w, h) * 0.10, 0, math.pi * 2)
        ctx.set_source_rgba(0.16, 0.71, 1.0, 0.03)
        ctx.stroke()

    # Illuminated dot matrix
    step = 32 if w > h else 28
    for xx in range(step, w - step // 2, step):
        for yy in range(step, h - step // 2, step):
            wave = 0.5 + 0.5 * math.sin(xx / w * 5.5 + yy / h * 4.5)
            ctx.arc(xx, yy, 1.15, 0, math.pi * 2)
            ctx.set_source_rgba(0.22 + wave * 0.12, 0.55 + wave * 0.22, 0.48 + wave * 0.18, 0.16 + wave * 0.10)
            ctx.fill()

    overlay = cairo_to_pil(surf)
    return Image.alpha_composite(im, overlay)


def draw_text_wrapped(draw, text, x, y, max_w, size, fill=WHITE, kind='heading', weight=600, leading=1.10):
    f = font(size, kind, weight)
    words = text.split()
    rows = []
    row = ''
    for word in words:
        test = (row + ' ' + word).strip()
        if draw.textlength(test, font=f) > max_w and row:
            rows.append(row)
            row = word
        else:
            row = test
    if row:
        rows.append(row)
    for r in rows:
        draw.text((round(x), round(y)), r, font=f, fill=fill)
        y += size * leading
    return y


def draw_kicker_pill(im, ctx, x, y, text, unit, accent=MINT, dot=True):
    f = font(18 * unit, 'mono', 600)
    d = ImageDraw.Draw(im)
    tw = d.textlength(text, font=f)
    pad_x = (38 if dot else 20) * unit
    pw = tw + pad_x + 22 * unit
    ph = 38 * unit
    draw_glass_panel(ctx, x, y, pw, ph, r=ph / 2, tint=accent, tint_alpha=0.18, base_alpha=0.82, border_alpha=0.38)
    if dot:
        r, g, b, _ = hex_rgba(accent)
        ctx.arc(x + 20 * unit, y + ph / 2, 7.5 * unit, 0, math.pi * 2)
        ctx.set_source_rgba(r, g, b, 0.22)
        ctx.fill()
        ctx.arc(x + 20 * unit, y + ph / 2, 4.2 * unit, 0, math.pi * 2)
        ctx.set_source_rgba(r, g, b, 1.0)
        ctx.fill()
    return pw, ph, (round(x + pad_x), round(y + 9 * unit)), f


def paste_tech_chip(im, x, y, tech_key, tech_label, unit, highlight=False):
    x, y = round(x), round(y)
    icon_sz = max(16, round(24 * unit))
    f = font(20 * unit, 'body', 600)
    d = ImageDraw.Draw(im)
    tw = d.textlength(tech_label, font=f)
    h = round(46 * unit)
    w = round(icon_sz + tw + 38 * unit)

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w + 12, h + 16)
    ctx = cairo.Context(surf)
    draw_glass_panel(
        ctx,
        4,
        2,
        w,
        h,
        r=13 * unit,
        tint=EMERALD if highlight else CYAN,
        tint_alpha=0.16 if highlight else 0.08,
        base_alpha=0.84,
        border_alpha=0.36 if highlight else 0.24,
    )
    chip_im = cairo_to_pil(surf)
    im.alpha_composite(chip_im, (x - 4, y - 2))

    # Paste icon
    rel = 'tech/hermes.png' if tech_key == 'hermes' else f'tech/{tech_key}.svg'
    if tech_key in LIGHT_BG_LOGOS:
        tile_sz = icon_sz + max(4, round(4 * unit))
        tile = Image.new('RGBA', (tile_sz, tile_sz), (0, 0, 0, 0))
        ImageDraw.Draw(tile).rounded_rectangle((0, 0, tile_sz - 1, tile_sz - 1), radius=max(4, round(6 * unit)), fill=(244, 247, 245, 255))
        logo = load_logo_pil(rel, icon_sz - 2)
        tile.alpha_composite(logo, ((tile_sz - logo.width) // 2, (tile_sz - logo.height) // 2))
        im.alpha_composite(tile, (x + round(12 * unit), y + (h - tile_sz) // 2))
        text_x = x + round(14 * unit) + tile_sz + round(10 * unit)
    else:
        logo = load_logo_pil(rel, icon_sz)
        im.alpha_composite(logo, (x + round(13 * unit), y + (h - icon_sz) // 2))
        text_x = x + round(13 * unit) + icon_sz + round(10 * unit)

    d = ImageDraw.Draw(im)
    d.text((text_x, y + round(11 * unit)), tech_label, font=f, fill=WHITE)
    return w


def draw_vector_icon(ctx, kind, cx, cy, s, color=MINT):
    r, g, b, _ = hex_rgba(color)
    ctx.save()
    ctx.set_source_rgba(r, g, b, 1.0)
    ctx.set_line_width(max(1.8, 2.2 * s))
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    if kind == 'layers':
        ctx.move_to(cx, cy - 11 * s)
        ctx.line_to(cx + 13 * s, cy - 4 * s)
        ctx.line_to(cx, cy + 3 * s)
        ctx.line_to(cx - 13 * s, cy - 4 * s)
        ctx.close_path()
        ctx.stroke()
        for dy in (5 * s, 10 * s):
            ctx.move_to(cx - 13 * s, cy - 4 * s + dy)
            ctx.line_to(cx, cy + 3 * s + dy)
            ctx.line_to(cx + 13 * s, cy - 4 * s + dy)
            ctx.stroke()
    elif kind == 'code':
        ctx.move_to(cx - 5 * s, cy - 8 * s)
        ctx.line_to(cx - 13 * s, cy)
        ctx.line_to(cx - 5 * s, cy + 8 * s)
        ctx.stroke()
        ctx.move_to(cx + 5 * s, cy - 8 * s)
        ctx.line_to(cx + 13 * s, cy)
        ctx.line_to(cx + 5 * s, cy + 8 * s)
        ctx.stroke()
        ctx.move_to(cx + 2 * s, cy - 10 * s)
        ctx.line_to(cx - 2 * s, cy + 10 * s)
        ctx.stroke()
    elif kind == 'bot':
        cairo_rounded_rect(ctx, cx - 11 * s, cy - 7 * s, 22 * s, 16 * s, 5 * s)
        ctx.stroke()
        ctx.move_to(cx, cy - 13 * s)
        ctx.line_to(cx, cy - 7 * s)
        ctx.stroke()
        ctx.arc(cx - 4.5 * s, cy + 1 * s, 2 * s, 0, math.pi * 2)
        ctx.fill()
        ctx.arc(cx + 4.5 * s, cy + 1 * s, 2 * s, 0, math.pi * 2)
        ctx.fill()
    elif kind == 'shield':
        ctx.move_to(cx, cy - 13 * s)
        ctx.line_to(cx + 11 * s, cy - 8 * s)
        ctx.curve_to(cx + 11 * s, cy + 2 * s, cx + 6 * s, cy + 9 * s, cx, cy + 13 * s)
        ctx.curve_to(cx - 6 * s, cy + 9 * s, cx - 11 * s, cy + 2 * s, cx - 11 * s, cy - 8 * s)
        ctx.close_path()
        ctx.stroke()
        ctx.move_to(cx - 4.5 * s, cy)
        ctx.line_to(cx - 1 * s, cy + 3.8 * s)
        ctx.line_to(cx + 5.5 * s, cy - 3.5 * s)
        ctx.stroke()
    elif kind == 'cube':
        pts = [
            (cx, cy - 13 * s),
            (cx + 12 * s, cy - 6.5 * s),
            (cx + 12 * s, cy + 6.5 * s),
            (cx, cy + 13 * s),
            (cx - 12 * s, cy + 6.5 * s),
            (cx - 12 * s, cy - 6.5 * s),
        ]
        ctx.move_to(*pts[0])
        for pt in pts[1:]:
            ctx.line_to(*pt)
        ctx.close_path()
        ctx.stroke()
        ctx.move_to(cx - 12 * s, cy - 6.5 * s)
        ctx.line_to(cx, cy)
        ctx.line_to(cx + 12 * s, cy - 6.5 * s)
        ctx.move_to(cx, cy)
        ctx.line_to(cx, cy + 13 * s)
        ctx.stroke()
    elif kind == 'spark':
        for angle in (0, math.pi / 2, math.pi / 4, 3 * math.pi / 4):
            rad = 12 * s if angle in (0, math.pi / 2) else 7 * s
            ctx.move_to(cx - math.cos(angle) * rad, cy - math.sin(angle) * rad)
            ctx.line_to(cx + math.cos(angle) * rad, cy + math.sin(angle) * rad)
            ctx.stroke()
    ctx.restore()


def draw_bezier_connection(ctx, x1, y1, x2, y2, t, color=MINT, seed=0.0):
    r, g, b, _ = hex_rgba(color)
    dx = (x2 - x1) * 0.5
    dy = (y2 - y1) * 0.15
    cx1, cy1 = x1 + dx, y1 + dy
    cx2, cy2 = x2 - dx, y2 - dy

    ctx.save()
    ctx.move_to(x1, y1)
    ctx.curve_to(cx1, cy1, cx2, cy2, x2, y2)
    ctx.set_source_rgba(r, g, b, 0.28)
    ctx.set_line_width(2.0)
    ctx.stroke()

    # Glowing moving data packet along cubic bezier
    for k in range(2):
        u = (t * 0.45 + seed + k * 0.5) % 1.0
        omt = 1.0 - u
        px = (omt ** 3) * x1 + 3 * (omt ** 2) * u * cx1 + 3 * omt * (u ** 2) * cx2 + (u ** 3) * x2
        py = (omt ** 3) * y1 + 3 * (omt ** 2) * u * cy1 + 3 * omt * (u ** 2) * cy2 + (u ** 3) * y2
        ctx.arc(px, py, 7.0, 0, math.pi * 2)
        ctx.set_source_rgba(r, g, b, 0.22)
        ctx.fill()
        ctx.arc(px, py, 3.2, 0, math.pi * 2)
        ctx.set_source_rgba(r, g, b, 0.95)
        ctx.fill()
    ctx.restore()


# Scene timing cuts (7 scenes over 24s)
CUTS = [0.0, 3.5, 6.5, 10.0, 13.5, 17.0, 20.5, 24.0]
SCENE_TAGS = [
    '01 / OVERVIEW',
    '02 / APPROACH',
    '03 / 3D WEB',
    '04 / E-COMMERCE',
    '05 / AUTOMATION',
    '06 / STACK & AI',
    '07 / LET’S BUILD',
]


def draw_hud(im, t, idx, w, h, v, unit):
    X = round(78 * unit) if v else round(92 * unit)
    top_y = round(92 * unit) if v else round(46 * unit)
    bot_y = h - (round(128 * unit) if v else round(68 * unit))

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    # Top-right scene indicator pill
    tag = SCENE_TAGS[idx]
    f_tag = font(17 * unit, 'mono', 600)
    d_tmp = ImageDraw.Draw(im)
    tw = d_tmp.textlength(tag, font=f_tag)
    pill_w = tw + 34 * unit
    pill_h = 36 * unit
    pill_x = w - X - pill_w
    draw_glass_panel(ctx, pill_x, top_y + 2 * unit, pill_w, pill_h, r=pill_h / 2, tint=CYAN, tint_alpha=0.12, base_alpha=0.75)

    # Bottom HUD progress track
    ctx.move_to(X, bot_y)
    ctx.line_to(w - X, bot_y)
    ctx.set_source_rgba(0.22, 0.32, 0.29, 0.55)
    ctx.set_line_width(2.0 * unit)
    ctx.stroke()

    prog = max(0.0, min(1.0, t / DURATION))
    prog_w = (w - 2 * X) * prog
    grad = cairo.LinearGradient(X, bot_y, X + max(10, prog_w), bot_y)
    grad.add_color_stop_rgba(0.0, 0.13, 0.77, 0.37, 0.95)
    grad.add_color_stop_rgba(1.0, 0.16, 0.71, 1.0, 0.95)
    ctx.move_to(X, bot_y)
    ctx.line_to(X + prog_w, bot_y)
    ctx.set_source(grad)
    ctx.set_line_width(3.2 * unit)
    ctx.stroke()

    # Glowing playhead dot
    ctx.arc(X + prog_w, bot_y, 5.0 * unit, 0, math.pi * 2)
    ctx.set_source_rgba(0.29, 0.87, 0.50, 1.0)
    ctx.fill()

    im.alpha_composite(cairo_to_pil(surf))

    # Brand mark + labels
    mark = load_logo_pil('brand/dhrubo-mark.svg', round(40 * unit))
    im.alpha_composite(mark, (X, top_y))
    d = ImageDraw.Draw(im)
    d.text((X + round(52 * unit), top_y + round(2 * unit)), P['name'], font=font(22 * unit, 'heading', 700), fill=WHITE)
    d.text((X + round(52 * unit), top_y + round(25 * unit)), 'PRODUCT BUILDER  ·  FULL-STACK & AI', font=font(14 * unit, 'mono', 500), fill=MINT)
    d.text((round(pill_x + 17 * unit), round(top_y + 10 * unit)), tag, font=f_tag, fill=WHITE)

    # Bottom HUD labels
    d.text((X, bot_y + round(14 * unit)), 'ARDHRUBO.DEV', font=font(17 * unit, 'mono', 600), fill=WHITE)
    right_txt = f"{P['email'].upper()}   ·   00:{int(t):02d} / 00:{DURATION:02d}"
    f_bot = font(16 * unit, 'mono', 500)
    rw = d.textlength(right_txt, font=f_bot)
    d.text((w - X - rw, bot_y + round(14 * unit)), right_txt, font=f_bot, fill=TEXT_SEC)


def render_scene_0_hero(im, local, w, h, v, unit):
    """Scene 0: Identity & Illustrated Hero Stage with Portrait + 3 Orbiting Capability Cards + Metrics"""
    X = round(78 * unit) if v else round(92 * unit)
    enter = ease_out_quart(local / 0.65)
    dy = (1.0 - enter) * 45 * unit

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    if not v:
        # Widescreen layout: Copy on left, Illustrated Hero Stage on right, Metrics row at bottom
        ky = 148 * unit + dy
        _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, 'OPEN TO OPPORTUNITIES  •  REMOTE & DHAKA', unit, MINT)

        # Right side illustrated hero stage
        stage_x, stage_y, stage_w, stage_h = 980 * unit, 138 * unit + dy * 0.6, 848 * unit, 645 * unit
        draw_glass_panel(ctx, stage_x, stage_y, stage_w, stage_h, r=30 * unit, tint=EMERALD, tint_alpha=0.12, base_alpha=0.72)

        # Central portrait card inside stage
        px, py, pw, ph = stage_x + 42 * unit, stage_y + 38 * unit, 330 * unit, 415 * unit
        draw_glass_panel(ctx, px, py, pw, ph, r=24 * unit, tint=CYAN, tint_alpha=0.14, base_alpha=0.88, border_alpha=0.42)

        # 3 capability nodes on the right of the portrait inside stage, connected by bezier curves
        nodes = [
            ('FULL-STACK WEB', 'React 19 · Next.js · Node', EMERALD, 'layers', [('react', 'React'), ('nextjs', 'Next.js')]),
            ('AUTOMATION ENGINE', 'Python · Puppeteer · Bots', CYAN, 'bot', [('python', 'Python'), ('puppeteer', 'Puppeteer')]),
            ('AGENTIC AI & LAB', 'Claude Code · Codex · DFT', VIOLET, 'spark', [('claudecode', 'Claude'), ('codex', 'Codex')]),
        ]
        nx = stage_x + 422 * unit
        nw, nh = 388 * unit, 168 * unit
        for i, (role, sub, col, icon_kind, _) in enumerate(nodes):
            ny = stage_y + (38 + i * 192) * unit + math.sin(local * 2.2 + i) * 4 * unit
            draw_bezier_connection(ctx, px + pw, py + (110 + i * 100) * unit, nx, ny + nh * 0.5, local, col, seed=i * 0.33)
            draw_glass_panel(ctx, nx, ny, nw, nh, r=20 * unit, tint=col, tint_alpha=0.16, base_alpha=0.86, border_alpha=0.38)
            # Icon badge
            cairo_rounded_rect(ctx, nx + 18 * unit, ny + 18 * unit, 44 * unit, 44 * unit, 12 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(r, g, b, 0.16)
            ctx.fill()
            draw_vector_icon(ctx, icon_kind, nx + 40 * unit, ny + 40 * unit, unit * 1.0, col)

        # Bottom metrics strip across full width
        my = 815 * unit + dy * 0.4
        mw = (w - 2 * X - 3 * 22 * unit) / 4.0
        mh = 128 * unit
        stat_colors = [EMERALD, CYAN, VIOLET, MINT]
        for i in range(4):
            mx = X + i * (mw + 22 * unit)
            draw_glass_panel(ctx, mx, my, mw, mh, r=20 * unit, tint=stat_colors[i], tint_alpha=0.12, base_alpha=0.78)

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'OPEN TO OPPORTUNITIES  •  REMOTE & DHAKA', font=kf, fill=MINT)

        # Headline & Intro
        hy = round(212 * unit + dy)
        d.text((X, hy), P['heroHeadline'], font=font(86 * unit, 'heading', 700), fill=WHITE)
        d.text((X, hy + round(94 * unit)), P['heroHeadlineAccent'], font=font(86 * unit, 'heading', 700), fill=MINT)
        iy = hy + round(208 * unit)
        iy = draw_text_wrapped(
            d,
            P['heroIntro'],
            X,
            iy,
            820 * unit,
            30 * unit,
            fill=TEXT_SEC,
            kind='body',
            weight=400,
            leading=1.38,
        )

        # Hero tech chips row on left
        tx = X
        ty = round(iy + 28 * unit)
        for key, lbl in [('react', 'React'), ('nextjs', 'Next.js'), ('nodejs', 'Node.js'), ('python', 'Python'), ('claudecode', 'Claude Code')]:
            cw = paste_tech_chip(im, tx, ty, key, lbl, unit * 0.92, highlight=(key in ('react', 'claudecode')))
            tx += cw + round(12 * unit)

        # Paste rounded avatar into portrait card + name badge
        avatar = load_avatar_rounded(pw - 24 * unit, 18 * unit)
        im.alpha_composite(avatar, (round(px + 12 * unit), round(py + 12 * unit)))

        # Name plate below portrait inside stage
        d = ImageDraw.Draw(im)
        d.text((round(px + 16 * unit), round(py + pw + 8 * unit)), P['fullName'], font=font(21 * unit, 'heading', 700), fill=WHITE)
        d.text((round(px + 16 * unit), round(py + pw + 36 * unit)), 'Full-Stack Engineer & Researcher', font=font(17 * unit, 'body', 500), fill=MINT)
        d.text((round(px + 16 * unit), round(py + ph + 28 * unit)), 'CODE + CURIOSITY  ·  DHAKA, BD', font=font(16 * unit, 'mono', 600), fill=TEXT_SEC)

        # Node text & mini logos
        for i, (role, sub, col, _, logos) in enumerate(nodes):
            ny = stage_y + (38 + i * 192) * unit + math.sin(local * 2.2 + i) * 4 * unit
            d.text((round(nx + 76 * unit), round(ny + 18 * unit)), role, font=font(17 * unit, 'mono', 600), fill=col)
            d.text((round(nx + 76 * unit), round(ny + 42 * unit)), sub, font=font(22 * unit, 'heading', 600), fill=WHITE)
            lx = nx + 18 * unit
            ly = ny + 96 * unit
            for lkey, llbl in logos:
                cw = paste_tech_chip(im, lx, ly, lkey, llbl, unit * 0.85)
                lx += cw + round(10 * unit)

        # Metrics text
        d = ImageDraw.Draw(im)
        for i, st in enumerate(P['stats']):
            mx = X + i * (mw + 22 * unit)
            d.text((round(mx + 26 * unit), round(my + 20 * unit)), st['value'], font=font(42 * unit, 'heading', 700), fill=stat_colors[i])
            d.text((round(mx + 26 * unit), round(my + 72 * unit)), st['label'].upper(), font=font(16 * unit, 'mono', 600), fill=WHITE)
            d.text((round(mx + 26 * unit), round(my + 95 * unit)), st['desc'], font=font(15 * unit, 'body', 400), fill=TEXT_SEC)
    else:
        # Vertical 9:16 layout
        ky = 178 * unit + dy
        _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, 'OPEN TO OPPORTUNITIES • REMOTE & DHAKA', unit, MINT)

        # Portrait + Identity card
        stage_x, stage_y, stage_w, stage_h = X, 690 * unit + dy * 0.6, w - 2 * X, 430 * unit
        draw_glass_panel(ctx, stage_x, stage_y, stage_w, stage_h, r=28 * unit, tint=EMERALD, tint_alpha=0.14, base_alpha=0.80)

        # 3 capability cards below
        ny0 = 1155 * unit + dy * 0.4
        nh = 148 * unit
        nodes = [
            ('FULL-STACK ENGINEERING', 'React 19 · Next.js · Node.js · PostgreSQL', EMERALD, 'layers'),
            ('WORKFLOW AUTOMATION', 'Python · Puppeteer · High-Scale Crawlers', CYAN, 'bot'),
            ('AI AGENTS & RESEARCH', 'Claude Code · Codex · Monte Carlo & DFT', VIOLET, 'spark'),
        ]
        for i, (role, sub, col, icon_kind) in enumerate(nodes):
            ny = ny0 + i * (nh + 22 * unit)
            draw_glass_panel(ctx, X, ny, w - 2 * X, nh, r=22 * unit, tint=col, tint_alpha=0.15, base_alpha=0.84, border_alpha=0.36)
            cairo_rounded_rect(ctx, X + 24 * unit, ny + 28 * unit, 64 * unit, 64 * unit, 16 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(r, g, b, 0.16)
            ctx.fill()
            draw_vector_icon(ctx, icon_kind, X + 56 * unit, ny + 60 * unit, unit * 1.35, col)

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'OPEN TO OPPORTUNITIES • REMOTE & DHAKA', font=kf, fill=MINT)

        hy = round(242 * unit + dy)
        d.text((X, hy), P['heroHeadline'], font=font(84 * unit, 'heading', 700), fill=WHITE)
        d.text((X, hy + round(92 * unit)), P['heroHeadlineAccent'], font=font(84 * unit, 'heading', 700), fill=MINT)
        draw_text_wrapped(d, P['heroIntro'], X, hy + round(200 * unit), w - 2 * X, 31 * unit, fill=TEXT_SEC, kind='body', weight=400, leading=1.36)

        avatar = load_avatar_rounded(310 * unit, 22 * unit)
        im.alpha_composite(avatar, (round(stage_x + 28 * unit), round(stage_y + 28 * unit)))
        d = ImageDraw.Draw(im)
        rx = round(stage_x + 368 * unit)
        d.text((rx, round(stage_y + 38 * unit)), 'CODE + CURIOSITY', font=font(18 * unit, 'mono', 600), fill=MINT)
        d.text((rx, round(stage_y + 72 * unit)), P['fullName'], font=font(34 * unit, 'heading', 700), fill=WHITE)
        draw_text_wrapped(d, P['role'], rx, round(stage_y + 122 * unit), 510 * unit, 24 * unit, fill=TEXT_SEC, kind='body', weight=500)

        # Stats inside portrait card
        for i, st in enumerate(P['stats'][:3]):
            sx = rx + i * round(172 * unit)
            sy = round(stage_y + 235 * unit)
            d.text((sx, sy), st['value'], font=font(38 * unit, 'heading', 700), fill=MINT if i == 0 else CYAN)
            d.text((sx, sy + round(48 * unit)), st['label'], font=font(16 * unit, 'mono', 500), fill=WHITE)

        # Capability cards text
        for i, (role, sub, col, _) in enumerate(nodes):
            ny = round(ny0 + i * (nh + 22 * unit))
            d.text((X + round(112 * unit), ny + round(30 * unit)), role, font=font(19 * unit, 'mono', 600), fill=col)
            d.text((X + round(112 * unit), ny + round(64 * unit)), sub, font=font(27 * unit, 'heading', 600), fill=WHITE)


def render_scene_1_blueprint(im, local, w, h, v, unit):
    """Scene 1: 4-Stage Engineering Architecture & Workflow Illustration (Design -> Build -> Automate -> Verify)"""
    X = round(78 * unit) if v else round(92 * unit)
    enter = ease_out_quart(local / 0.65)
    dy = (1.0 - enter) * 45 * unit

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    ky = (178 if v else 142) * unit + dy
    _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, 'HOW I WORK  •  DESIGN → BUILD → AUTOMATE → VERIFY', unit, MINT)

    steps = [
        ('01 / DESIGN', 'Architecture & Schemas', 'Typed REST contracts, threat models & clean system blueprints.', EMERALD, 'layers', '99.9% Uptime Plan'),
        ('02 / BUILD', 'Full-Stack Web Delivery', 'Fast React 19 & Next.js apps with tactile glass UI & zero bloat.', CYAN, 'code', '< 1.2s First Paint'),
        ('03 / AUTOMATE', 'Distributed Crawlers', 'Headless Chrome worker pools, stealth rotation & JSON pipelines.', VIOLET, 'bot', '1M+ Records Parsed'),
        ('04 / VERIFY', 'Scientific QA & Stress Test', 'Playwright E2E validation, Monte Carlo bounds & zero-downtime deploys.', MINT, 'shield', 'Zero-Downtime QA'),
    ]

    if not v:
        card_w = (w - 2 * X - 3 * 26 * unit) / 4.0
        card_h = 465 * unit
        cy = 445 * unit + dy * 0.5

        # Connecting pipeline behind cards
        for i in range(3):
            x1 = X + i * (card_w + 26 * unit) + card_w
            x2 = x1 + 26 * unit
            draw_bezier_connection(ctx, x1, cy + card_h * 0.45, x2, cy + card_h * 0.45, local, steps[i][3], seed=i * 0.25)

        for i, (code, title, desc, col, icon_kind, metric) in enumerate(steps):
            stagger = ease_out_quart((local - i * 0.12) / 0.55)
            cx = X + i * (card_w + 26 * unit)
            card_y = cy + (1.0 - stagger) * 35 * unit
            draw_glass_panel(ctx, cx, card_y, card_w, card_h, r=24 * unit, tint=col, tint_alpha=0.15, base_alpha=0.84, border_alpha=0.38)

            # Custom mini vector illustration stage inside each card
            ill_x, ill_y, ill_w, ill_h = cx + 22 * unit, card_y + 82 * unit, card_w - 44 * unit, 155 * unit
            cairo_rounded_rect(ctx, ill_x, ill_y, ill_w, ill_h, 16 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(0.04, 0.06, 0.07, 0.78)
            ctx.fill_preserve()
            ctx.set_source_rgba(r, g, b, 0.26)
            ctx.set_line_width(1.2)
            ctx.stroke()

            if i == 0:
                # Blueprint node tree illustration
                root_x, root_y = ill_x + ill_w * 0.5, ill_y + 34 * unit
                left_x, right_x = ill_x + ill_w * 0.26, ill_x + ill_w * 0.74
                bot_y = ill_y + 114 * unit
                ctx.set_source_rgba(r, g, b, 0.55)
                ctx.set_line_width(2.0 * unit)
                ctx.move_to(root_x, root_y + 16 * unit)
                ctx.line_to(root_x, ill_y + 74 * unit)
                ctx.line_to(left_x, ill_y + 74 * unit)
                ctx.line_to(left_x, bot_y - 16 * unit)
                ctx.move_to(root_x, ill_y + 74 * unit)
                ctx.line_to(right_x, ill_y + 74 * unit)
                ctx.line_to(right_x, bot_y - 16 * unit)
                ctx.stroke()
                for nx, ny in [(root_x, root_y), (left_x, bot_y), (right_x, bot_y)]:
                    cairo_rounded_rect(ctx, nx - 48 * unit, ny - 16 * unit, 96 * unit, 32 * unit, 9 * unit)
                    ctx.set_source_rgba(r, g, b, 0.22)
                    ctx.fill_preserve()
                    ctx.set_source_rgba(r, g, b, 0.85)
                    ctx.stroke()
            elif i == 1:
                # Browser UI assembly illustration
                bx, by, bw, bh = ill_x + 22 * unit, ill_y + 20 * unit, ill_w - 44 * unit, ill_h - 40 * unit
                cairo_rounded_rect(ctx, bx, by, bw, bh, 10 * unit)
                ctx.set_source_rgba(r, g, b, 0.14)
                ctx.fill_preserve()
                ctx.set_source_rgba(r, g, b, 0.75)
                ctx.stroke()
                for dot_i in range(3):
                    ctx.arc(bx + (14 + dot_i * 11) * unit, by + 13 * unit, 3 * unit, 0, math.pi * 2)
                    ctx.fill()
                cairo_rounded_rect(ctx, bx + 14 * unit, by + 30 * unit, bw * 0.45, 22 * unit, 5 * unit)
                ctx.set_source_rgba(r, g, b, 0.65)
                ctx.fill()
                for col_i in range(3):
                    cw_b = (bw - 40 * unit) / 3.0
                    cairo_rounded_rect(ctx, bx + 14 * unit + col_i * (cw_b + 6 * unit), by + 62 * unit, cw_b, 38 * unit, 6 * unit)
                    ctx.set_source_rgba(r, g, b, 0.28)
                    ctx.fill()
            elif i == 2:
                # Worker pipeline illustration with animated packet
                in_x = ill_x + 36 * unit
                mid_x = ill_x + ill_w * 0.5
                out_x = ill_x + ill_w - 36 * unit
                cy_m = ill_y + ill_h * 0.5
                for oy in (-34 * unit, 0, 34 * unit):
                    ctx.move_to(in_x, cy_m)
                    ctx.line_to(mid_x, cy_m)
                    ctx.line_to(mid_x, cy_m + oy)
                    ctx.line_to(out_x, cy_m + oy)
                    ctx.set_source_rgba(r, g, b, 0.48)
                    ctx.set_line_width(2.0 * unit)
                    ctx.stroke()
                    ctx.arc(out_x, cy_m + oy, 7 * unit, 0, math.pi * 2)
                    ctx.set_source_rgba(r, g, b, 0.85)
                    ctx.fill()
                draw_vector_icon(ctx, 'bot', mid_x, cy_m, unit * 1.1, col)
            else:
                # Verification shield + check bars
                draw_vector_icon(ctx, 'shield', ill_x + 56 * unit, ill_y + ill_h * 0.5, unit * 1.85, col)
                for row_i in range(3):
                    ry = ill_y + (32 + row_i * 36) * unit
                    cairo_rounded_rect(ctx, ill_x + 104 * unit, ry, ill_w - 126 * unit, 22 * unit, 6 * unit)
                    ctx.set_source_rgba(r, g, b, 0.22)
                    ctx.fill()
                    cairo_rounded_rect(ctx, ill_x + 110 * unit, ry + 6 * unit, (ill_w - 150 * unit) * (0.85 - row_i * 0.12), 10 * unit, 4 * unit)
                    ctx.set_source_rgba(r, g, b, 0.85)
                    ctx.fill()

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'HOW I WORK  •  DESIGN → BUILD → AUTOMATE → VERIFY', font=kf, fill=MINT)
        d.text((X, round(204 * unit + dy)), 'Made for your next move.', font=font(82 * unit, 'heading', 700), fill=WHITE)
        d.text((X, round(306 * unit + dy)), 'Every project moves through four deliberate engineering phases—built to scale from day one.', font=font(29 * unit, 'body', 400), fill=TEXT_SEC)

        for i, (code, title, desc, col, _, metric) in enumerate(steps):
            stagger = ease_out_quart((local - i * 0.12) / 0.55)
            cx = X + i * (card_w + 26 * unit)
            card_y = cy + (1.0 - stagger) * 35 * unit
            d.text((round(cx + 24 * unit), round(card_y + 24 * unit)), code, font=font(18 * unit, 'mono', 600), fill=col)
            d.text((round(cx + 24 * unit), round(card_y + 262 * unit)), title, font=font(28 * unit, 'heading', 700), fill=WHITE)
            draw_text_wrapped(d, desc, cx + 24 * unit, card_y + 306 * unit, card_w - 48 * unit, 20 * unit, fill=TEXT_SEC, kind='body', weight=400, leading=1.35)
            d.text((round(cx + 24 * unit), round(card_y + card_h - 46 * unit)), f'✓  {metric.upper()}', font=font(16 * unit, 'mono', 600), fill=col)
    else:
        # Vertical 9:16 4-card stacked blueprint
        cy0 = 520 * unit + dy * 0.5
        ch = 262 * unit
        for i, (code, title, desc, col, icon_kind, metric) in enumerate(steps):
            cy = cy0 + i * (ch + 24 * unit)
            draw_glass_panel(ctx, X, cy, w - 2 * X, ch, r=24 * unit, tint=col, tint_alpha=0.15, base_alpha=0.84, border_alpha=0.38)
            cairo_rounded_rect(ctx, X + 28 * unit, cy + 34 * unit, 84 * unit, 84 * unit, 20 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(r, g, b, 0.18)
            ctx.fill()
            draw_vector_icon(ctx, icon_kind, X + 70 * unit, cy + 76 * unit, unit * 1.65, col)

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'HOW I WORK  •  DESIGN → BUILD → AUTOMATE → VERIFY', font=kf, fill=MINT)
        d.text((X, round(242 * unit + dy)), 'Made for your', font=font(80 * unit, 'heading', 700), fill=WHITE)
        d.text((X, round(330 * unit + dy)), 'next move.', font=font(80 * unit, 'heading', 700), fill=MINT)
        d.text((X, round(432 * unit + dy)), 'Four engineering stages from blueprint to verified release.', font=font(28 * unit, 'body', 400), fill=TEXT_SEC)

        for i, (code, title, desc, col, _, metric) in enumerate(steps):
            cy = round(cy0 + i * (ch + 24 * unit))
            tx = X + round(136 * unit)
            d.text((tx, cy + round(28 * unit)), f'{code}   ·   {metric.upper()}', font=font(18 * unit, 'mono', 600), fill=col)
            d.text((tx, cy + round(62 * unit)), title, font=font(34 * unit, 'heading', 700), fill=WHITE)
            draw_text_wrapped(d, desc, tx, cy + round(112 * unit), w - 2 * X - 164 * unit, 25 * unit, fill=TEXT_SEC, kind='body', weight=400, leading=1.34)


def render_project_scene(im, n, local, p_norm, w, h, v, unit):
    """Scenes 2, 3, 4: Flagship Project Showcases with Glass Browser Frame + Custom Illustrative Callout Cards"""
    proj = PROJECTS[n]
    X = round(78 * unit) if v else round(92 * unit)
    enter = ease_out_quart(local / 0.65)
    dy = (1.0 - enter) * 45 * unit

    meta = [
        {
            'kicker': 'SELECTED WORK  •  3D WEB & ARCHITECTURE',
            'headline': 'Spaces, reimagined.',
            'accent': EMERALD,
            'tech': [('react', 'React 19'), ('threejs', 'Three.js'), ('supabase', 'Supabase'), ('vitejs', 'Vite')],
            'callout_title': 'INTERACTIVE 3D SPATIAL ENGINE',
            'callout_sub': 'Three.js walkthroughs · Turnkey CMS · Local SEO',
            'icon': 'cube',
        },
        {
            'kicker': 'SELECTED WORK  •  LIVE E-COMMERCE PLATFORM',
            'headline': 'Fresh ideas. Real orders.',
            'accent': CYAN,
            'tech': [('react', 'React'), ('nodejs', 'Node.js'), ('css3', 'Modern CSS')],
            'callout_title': 'LIVE ORDERING & CART PERSISTENCE',
            'callout_sub': 'Serving 5,000+ UAP community · Schema.org SEO',
            'icon': 'layers',
        },
        {
            'kicker': 'SELECTED WORK  •  HIGH-THROUGHPUT AUTOMATION',
            'headline': 'Make time for more.',
            'accent': VIOLET,
            'tech': [('puppeteer', 'Puppeteer'), ('nodejs', 'Node.js'), ('python', 'Python')],
            'callout_title': 'DISTRIBUTED HEADLESS CHROME CLUSTER',
            'callout_sub': 'Anti-bot stealth bypass · Structured JSON / CSV export',
            'icon': 'bot',
        },
    ][n]

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    ky = (178 if v else 148) * unit + dy
    _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, meta['kicker'], unit, meta['accent'])

    if not v:
        # Left info glass card for project highlights
        hl_y = 560 * unit + dy * 0.6
        hl_w = 690 * unit
        hl_h = 240 * unit
        draw_glass_panel(ctx, X, hl_y, hl_w, hl_h, r=22 * unit, tint=meta['accent'], tint_alpha=0.14, base_alpha=0.82)

        # Right browser frame
        bx = (835 + (1.0 - enter) * 65) * unit
        by = 152 * unit
        bw = 992 * unit
        bh = 620 * unit
        bar_h = 46 * unit
        draw_glass_panel(ctx, bx - 10 * unit, by - 10 * unit, bw + 20 * unit, bh + bar_h + 20 * unit, r=26 * unit, tint=meta['accent'], tint_alpha=0.18, base_alpha=0.88, border_alpha=0.45)

        im.alpha_composite(cairo_to_pil(surf))

        # Paste live screenshot with gentle camera pan inside browser frame
        src = screens[n]
        sw, sh = src.size
        zoom = 1.02 + 0.04 * ease_in_out_cubic(p_norm)
        crop_w, crop_h = sw / zoom, sh / zoom
        pan_y = (sh - crop_h) * ease_in_out_cubic(p_norm) * 0.78
        cut = src.crop(((sw - crop_w) / 2, pan_y, (sw + crop_w) / 2, pan_y + crop_h)).resize((round(bw), round(bh)), Image.Resampling.LANCZOS)

        mask = Image.new('L', (round(bw), round(bh)), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, round(bw) - 1, round(bh) - 1), radius=round(18 * unit), fill=255)
        im.paste(cut, (round(bx), round(by + bar_h)), mask)

        # Browser top bar dots & URL
        d = ImageDraw.Draw(im)
        dot_cols = [(239, 68, 68), (245, 158, 11), (34, 197, 94)]
        for di, dc in enumerate(dot_cols):
            cx_d = round(bx + (22 + di * 18) * unit)
            cy_d = round(by + bar_h * 0.5)
            r_d = round(5 * unit)
            d.ellipse((cx_d - r_d, cy_d - r_d, cx_d + r_d, cy_d + r_d), fill=dc)
        domain = proj['url'].split('//')[-1].strip('/')
        d.text((round(bx + 92 * unit), round(by + 11 * unit)), f'https://{domain}', font=font(18 * unit, 'mono', 500), fill=TEXT_SEC)
        d.text((round(bx + bw - 210 * unit), round(by + 12 * unit)), proj['badge'].upper(), font=font(16 * unit, 'mono', 600), fill=meta['accent'])

        # Floating illustrative telemetry callout card overlapping bottom-right of browser
        surf2 = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
        ctx2 = cairo.Context(surf2)
        call_x, call_y, call_w, call_h = bx + 48 * unit, by + bh - 12 * unit, bw - 96 * unit, 118 * unit
        draw_glass_panel(ctx2, call_x, call_y, call_w, call_h, r=20 * unit, tint=meta['accent'], tint_alpha=0.22, base_alpha=0.92, border_alpha=0.52)
        cairo_rounded_rect(ctx2, call_x + 20 * unit, call_y + 22 * unit, 74 * unit, 74 * unit, 16 * unit)
        r, g, b, _ = hex_rgba(meta['accent'])
        ctx2.set_source_rgba(r, g, b, 0.18)
        ctx2.fill()
        draw_vector_icon(ctx2, meta['icon'], call_x + 57 * unit, call_y + 59 * unit, unit * 1.45, meta['accent'])
        im.alpha_composite(cairo_to_pil(surf2))

        d = ImageDraw.Draw(im)
        d.text((round(call_x + 114 * unit), round(call_y + 24 * unit)), meta['callout_title'], font=font(18 * unit, 'mono', 600), fill=meta['accent'])
        d.text((round(call_x + 114 * unit), round(call_y + 56 * unit)), meta['callout_sub'], font=font(24 * unit, 'heading', 600), fill=WHITE)

        # Left side copy
        d.text(kpos, meta['kicker'], font=kf, fill=meta['accent'])
        hy = draw_text_wrapped(d, meta['headline'], X, 212 * unit + dy, 700 * unit, 78 * unit, fill=WHITE, kind='heading', weight=700, leading=1.06)
        d.text((X, round(hy + 14 * unit)), f"{proj['title']}   ·   {domain}", font=font(28 * unit, 'heading', 600), fill=meta['accent'])
        draw_text_wrapped(d, proj['desc'], X, hy + 62 * unit, 690 * unit, 25 * unit, fill=TEXT_SEC, kind='body', weight=400, leading=1.36)

        # Highlights inside left glass panel
        d.text((X + round(26 * unit), round(hl_y + 22 * unit)), 'KEY ARCHITECTURAL HIGHLIGHTS', font=font(17 * unit, 'mono', 600), fill=meta['accent'])
        for hi, htext in enumerate(proj['highlights'][:3]):
            d.text((X + round(26 * unit), round(hl_y + (62 + hi * 52) * unit)), f'✦   {htext}', font=font(22 * unit, 'body', 500), fill=WHITE)

        # Tech chips below highlights
        tx = X
        ty = round(hl_y + hl_h + 26 * unit)
        for tkey, tlbl in meta['tech']:
            cw = paste_tech_chip(im, tx, ty, tkey, tlbl, unit * 0.95, highlight=True)
            tx += cw + round(14 * unit)
    else:
        # Vertical 9:16 layout
        bx = X
        by = 650 * unit + dy * 0.5
        bw = w - 2 * X
        bh = 575 * unit
        bar_h = 46 * unit
        draw_glass_panel(ctx, bx - 8 * unit, by - 8 * unit, bw + 16 * unit, bh + bar_h + 16 * unit, r=24 * unit, tint=meta['accent'], tint_alpha=0.18, base_alpha=0.88, border_alpha=0.45)

        call_y = by + bh + bar_h + 34 * unit
        call_h = 210 * unit
        draw_glass_panel(ctx, X, call_y, bw, call_h, r=22 * unit, tint=meta['accent'], tint_alpha=0.16, base_alpha=0.84, border_alpha=0.38)
        cairo_rounded_rect(ctx, X + 26 * unit, call_y + 28 * unit, 72 * unit, 72 * unit, 16 * unit)
        r, g, b, _ = hex_rgba(meta['accent'])
        ctx.set_source_rgba(r, g, b, 0.18)
        ctx.fill()
        draw_vector_icon(ctx, meta['icon'], X + 62 * unit, call_y + 64 * unit, unit * 1.45, meta['accent'])

        im.alpha_composite(cairo_to_pil(surf))

        src = screens[n]
        sw, sh = src.size
        zoom = 1.02 + 0.04 * ease_in_out_cubic(p_norm)
        crop_w, crop_h = sw / zoom, sh / zoom
        pan_y = (sh - crop_h) * ease_in_out_cubic(p_norm) * 0.78
        cut = src.crop(((sw - crop_w) / 2, pan_y, (sw + crop_w) / 2, pan_y + crop_h)).resize((round(bw), round(bh)), Image.Resampling.LANCZOS)
        mask = Image.new('L', (round(bw), round(bh)), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, round(bw) - 1, round(bh) - 1), radius=round(18 * unit), fill=255)
        im.paste(cut, (round(bx), round(by + bar_h)), mask)

        d = ImageDraw.Draw(im)
        dot_cols = [(239, 68, 68), (245, 158, 11), (34, 197, 94)]
        for di, dc in enumerate(dot_cols):
            cx_d = round(bx + (22 + di * 18) * unit)
            cy_d = round(by + bar_h * 0.5)
            r_d = round(5 * unit)
            d.ellipse((cx_d - r_d, cy_d - r_d, cx_d + r_d, cy_d + r_d), fill=dc)
        domain = proj['url'].split('//')[-1].strip('/')
        d.text((round(bx + 92 * unit), round(by + 11 * unit)), f'https://{domain}', font=font(18 * unit, 'mono', 500), fill=TEXT_SEC)

        d.text(kpos, meta['kicker'], font=kf, fill=meta['accent'])
        hy = draw_text_wrapped(d, meta['headline'], X, 240 * unit + dy, w - 2 * X, 78 * unit, fill=WHITE, kind='heading', weight=700, leading=1.06)
        d.text((X, round(hy + 14 * unit)), f"{proj['title']}   ·   {domain}", font=font(30 * unit, 'heading', 600), fill=meta['accent'])
        draw_text_wrapped(d, proj['desc'], X, hy + 62 * unit, w - 2 * X, 27 * unit, fill=TEXT_SEC, kind='body', weight=400, leading=1.34)

        d.text((X + round(118 * unit), round(call_y + 28 * unit)), meta['callout_title'], font=font(19 * unit, 'mono', 600), fill=meta['accent'])
        d.text((X + round(118 * unit), round(call_y + 62 * unit)), meta['callout_sub'], font=font(26 * unit, 'heading', 600), fill=WHITE)

        tx = X + round(26 * unit)
        ty = round(call_y + 128 * unit)
        for tkey, tlbl in meta['tech']:
            cw = paste_tech_chip(im, tx, ty, tkey, tlbl, unit * 0.92, highlight=True)
            tx += cw + round(12 * unit)


def render_scene_5_stack(im, local, w, h, v, unit):
    """Scene 5: Tools With a Purpose — 3-Tier Ecosystem Bento with Official SVG Brand Marks"""
    X = round(78 * unit) if v else round(92 * unit)
    enter = ease_out_quart(local / 0.65)
    dy = (1.0 - enter) * 45 * unit

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    ky = (178 if v else 142) * unit + dy
    _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, 'CRAFT & ECOSYSTEM  •  TOOLS WITH A PURPOSE', unit, MINT)

    groups = [
        (
            'FULL-STACK WEB & DATA SYSTEMS',
            'Fast, accessible interfaces backed by relational & real-time cloud stores.',
            EMERALD,
            'layers',
            [('react', 'React 19'), ('nextjs', 'Next.js'), ('nodejs', 'Node.js'), ('typescript', 'TypeScript'), ('postgresql', 'PostgreSQL'), ('supabase', 'Supabase'), ('threejs', 'Three.js')],
        ),
        (
            'WORKFLOW AUTOMATION & SCIENTIFIC COMPUTING',
            'High-concurrency browser clusters, stochastic Monte Carlo & Linux pipelines.',
            CYAN,
            'bot',
            [('python', 'Python'), ('puppeteer', 'Puppeteer'), ('playwright', 'Playwright'), ('docker', 'Docker'), ('numpy', 'NumPy / SciPy'), ('ubuntu', 'Ubuntu HPC')],
        ),
        (
            'AGENTIC AI & AUTONOMOUS CODING WORKFLOW',
            'Multi-agent orchestration and terminal harnesses for rapid, verified shipping.',
            VIOLET,
            'spark',
            [('claudecode', 'Claude Code'), ('cursor', 'Cursor'), ('codex', 'Codex'), ('antigravity', 'Antigravity'), ('hermes', 'Hermes Agent')],
        ),
    ]

    if not v:
        gy0 = 365 * unit + dy * 0.5
        gh = 178 * unit
        gw = w - 2 * X
        for i, (role, sub, col, icon_kind, _) in enumerate(groups):
            stagger = ease_out_quart((local - i * 0.14) / 0.55)
            gx = X + (1.0 - stagger) * 55 * unit
            gy = gy0 + i * (gh + 20 * unit)
            draw_glass_panel(ctx, gx, gy, gw, gh, r=24 * unit, tint=col, tint_alpha=0.15, base_alpha=0.84, border_alpha=0.38)
            cairo_rounded_rect(ctx, gx + 24 * unit, gy + 24 * unit, 58 * unit, 58 * unit, 15 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(r, g, b, 0.18)
            ctx.fill()
            draw_vector_icon(ctx, icon_kind, gx + 53 * unit, gy + 53 * unit, unit * 1.25, col)

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'CRAFT & ECOSYSTEM  •  TOOLS WITH A PURPOSE', font=kf, fill=MINT)
        d.text((X, round(200 * unit + dy)), 'Built thoughtfully.', font=font(80 * unit, 'heading', 700), fill=WHITE)
        d.text((X + round(740 * unit), round(226 * unit + dy)), 'Production web stacks, automation engines & AI agents.', font=font(27 * unit, 'body', 400), fill=TEXT_SEC)

        for i, (role, sub, col, _, logos) in enumerate(groups):
            stagger = ease_out_quart((local - i * 0.14) / 0.55)
            gx = X + (1.0 - stagger) * 55 * unit
            gy = gy0 + i * (gh + 20 * unit)
            d = ImageDraw.Draw(im)
            d.text((round(gx + 100 * unit), round(gy + 22 * unit)), role, font=font(18 * unit, 'mono', 600), fill=col)
            d.text((round(gx + 100 * unit), round(gy + 50 * unit)), sub, font=font(22 * unit, 'body', 500), fill=WHITE)

            tx = round(gx + 24 * unit)
            ty = round(gy + 104 * unit)
            for lkey, llbl in logos:
                cw = paste_tech_chip(im, tx, ty, lkey, llbl, unit * 0.95, highlight=(i == 2))
                tx += cw + round(14 * unit)
    else:
        gy0 = 490 * unit + dy * 0.5
        gh = 365 * unit
        gw = w - 2 * X
        for i, (role, sub, col, icon_kind, _) in enumerate(groups):
            gy = gy0 + i * (gh + 26 * unit)
            draw_glass_panel(ctx, X, gy, gw, gh, r=24 * unit, tint=col, tint_alpha=0.15, base_alpha=0.84, border_alpha=0.38)
            cairo_rounded_rect(ctx, X + 26 * unit, gy + 26 * unit, 58 * unit, 58 * unit, 15 * unit)
            r, g, b, _ = hex_rgba(col)
            ctx.set_source_rgba(r, g, b, 0.18)
            ctx.fill()
            draw_vector_icon(ctx, icon_kind, X + 55 * unit, gy + 55 * unit, unit * 1.25, col)

        im.alpha_composite(cairo_to_pil(surf))
        d = ImageDraw.Draw(im)
        d.text(kpos, 'CRAFT & ECOSYSTEM  •  TOOLS WITH A PURPOSE', font=kf, fill=MINT)
        d.text((X, round(240 * unit + dy)), 'Built thoughtfully.', font=font(78 * unit, 'heading', 700), fill=WHITE)
        d.text((X, round(344 * unit + dy)), 'Modern web engineering, automation & AI agents.', font=font(28 * unit, 'body', 400), fill=TEXT_SEC)

        for i, (role, sub, col, _, logos) in enumerate(groups):
            gy = round(gy0 + i * (gh + 26 * unit))
            d = ImageDraw.Draw(im)
            d.text((X + round(102 * unit), gy + round(26 * unit)), role, font=font(18 * unit, 'mono', 600), fill=col)
            draw_text_wrapped(d, sub, X + 102 * unit, gy + 56 * unit, gw - 128 * unit, 23 * unit, fill=WHITE, kind='body', weight=500)

            tx = X + round(26 * unit)
            ty = gy + round(148 * unit)
            for lkey, llbl in logos:
                f_tmp = font(20 * unit, 'body', 600)
                est_w = round(24 * unit + d.textlength(llbl, font=f_tmp) + 38 * unit)
                if tx + est_w > X + gw - round(24 * unit):
                    tx = X + round(26 * unit)
                    ty += round(60 * unit)
                cw = paste_tech_chip(im, tx, ty, lkey, llbl, unit * 0.96, highlight=(i == 2))
                tx += cw + round(12 * unit)


def render_scene_6_outro(im, local, w, h, v, unit):
    """Scene 6: Call to Action Finale — Glass Stage with Emblem, Domain Card, Direct Email & CTA"""
    X = round(78 * unit) if v else round(92 * unit)
    enter = ease_out_quart(local / 0.65)
    dy = (1.0 - enter) * 45 * unit

    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    ctx = cairo.Context(surf)

    ky = (178 if v else 148) * unit + dy
    _, _, kpos, kf = draw_kicker_pill(im, ctx, X, ky, 'YOUR NEXT PROJECT STARTS HERE', unit, MINT)

    if not v:
        # Left CTA button + Right Interactive Portfolio Card
        cta_y = 755 * unit + dy * 0.4
        cta_w, cta_h = 680 * unit, 88 * unit
        cairo_rounded_rect(ctx, X, cta_y, cta_w, cta_h, 22 * unit)
        grad = cairo.LinearGradient(X, cta_y, X + cta_w, cta_y + cta_h)
        grad.add_color_stop_rgba(0.0, 0.13, 0.77, 0.37, 1.0)
        grad.add_color_stop_rgba(1.0, 0.05, 0.58, 0.35, 1.0)
        ctx.set_source(grad)
        ctx.fill()

        # Right side large illustrated card
        rx, ry, rw, rh = 960 * unit, 152 * unit + dy * 0.5, 868 * unit, 692 * unit
        draw_glass_panel(ctx, rx, ry, rw, rh, r=30 * unit, tint=EMERALD, tint_alpha=0.16, base_alpha=0.84, border_alpha=0.45)

        # Inner domain browser card
        bx, by, bw, bh = rx + 42 * unit, ry + 42 * unit, rw - 84 * unit, 210 * unit
        draw_glass_panel(ctx, bx, by, bw, bh, r=22 * unit, tint=CYAN, tint_alpha=0.18, base_alpha=0.90, border_alpha=0.45)

        # Service checklist rows inside right card
        deliverables = [
            ('Full-Stack Web Applications', 'React 19 · Next.js · Node.js · Supabase', EMERALD),
            ('Automation & Scraping Pipelines', 'Puppeteer · Playwright · Python Workers', CYAN),
            ('AI Workflows & Scientific Modeling', 'Claude Code · Codex · Monte Carlo & DFT', VIOLET),
        ]
        for i, (_, _, col) in enumerate(deliverables):
            sy = ry + (282 + i * 124) * unit
            draw_glass_panel(ctx, bx, sy, bw, 106 * unit, r=18 * unit, tint=col, tint_alpha=0.14, base_alpha=0.84, border_alpha=0.34)

        im.alpha_composite(cairo_to_pil(surf))

        # Brand mark + avatar inside domain card
        mark = load_logo_pil('brand/dhrubo-mark.svg', round(96 * unit))
        im.alpha_composite(mark, (round(bx + 32 * unit), round(by + 56 * unit)))
        avatar = load_avatar_rounded(96 * unit, 22 * unit)
        im.alpha_composite(avatar, (round(bx + bw - 128 * unit), round(by + 56 * unit)))

        d = ImageDraw.Draw(im)
        d.text(kpos, 'YOUR NEXT PROJECT STARTS HERE', font=kf, fill=MINT)
        hy = draw_text_wrapped(
            d,
            'Visit my site. Let’s build your project.',
            X,
            216 * unit + dy,
            820 * unit,
            84 * unit,
            fill=WHITE,
            kind='heading',
            weight=700,
            leading=1.06,
        )
        d.text((X, round(hy + 26 * unit)), 'ardhrubo.dev', font=font(76 * unit, 'mono', 600), fill=MINT)
        d.text((X, round(hy + 122 * unit)), f"Direct email:  {P['email']}", font=font(30 * unit, 'body', 500), fill=TEXT_SEC)
        d.text((X + round(36 * unit), round(cta_y + 24 * unit)), 'Explore the work  ·  Book your project  ↗', font=font(31 * unit, 'heading', 700), fill='#062112')

        # Right card text
        d.text((round(bx + 152 * unit), round(by + 52 * unit)), 'LIVE PORTFOLIO & CASE STUDIES', font=font(17 * unit, 'mono', 600), fill=MINT)
        d.text((round(bx + 152 * unit), round(by + 84 * unit)), 'https://ardhrubo.dev', font=font(38 * unit, 'heading', 700), fill=WHITE)
        d.text((round(bx + 152 * unit), round(by + 136 * unit)), 'Dhaka, Bangladesh  ·  Worldwide Remote (GMT+6)', font=font(20 * unit, 'body', 500), fill=TEXT_SEC)

        for i, (title, sub, col) in enumerate(deliverables):
            sy = round(ry + (282 + i * 124) * unit)
            d.text((round(bx + 28 * unit), sy + round(22 * unit)), f'✦   {title}', font=font(25 * unit, 'heading', 700), fill=WHITE)
            d.text((round(bx + 28 * unit), sy + round(58 * unit)), sub, font=font(19 * unit, 'mono', 500), fill=col)
    else:
        # Vertical 9:16 finale layout
        card_y = 660 * unit + dy * 0.5
        card_h = 760 * unit
        draw_glass_panel(ctx, X, card_y, w - 2 * X, card_h, r=28 * unit, tint=EMERALD, tint_alpha=0.16, base_alpha=0.84, border_alpha=0.45)

        bx, by, bw, bh = X + 32 * unit, card_y + 32 * unit, w - 2 * X - 64 * unit, 210 * unit
        draw_glass_panel(ctx, bx, by, bw, bh, r=22 * unit, tint=CYAN, tint_alpha=0.18, base_alpha=0.90, border_alpha=0.45)

        deliverables = [
            ('Full-Stack Web Applications', 'React 19 · Next.js · Node.js · Supabase', EMERALD),
            ('Automation & Scraping Pipelines', 'Puppeteer · Playwright · Python Workers', CYAN),
            ('AI Workflows & Scientific Modeling', 'Claude Code · Codex · Monte Carlo & DFT', VIOLET),
        ]
        for i, (_, _, col) in enumerate(deliverables):
            sy = card_y + (272 + i * 145) * unit
            draw_glass_panel(ctx, bx, sy, bw, 122 * unit, r=18 * unit, tint=col, tint_alpha=0.14, base_alpha=0.84, border_alpha=0.34)

        cta_y = 1480 * unit
        cta_h = 96 * unit
        cairo_rounded_rect(ctx, X, cta_y, w - 2 * X, cta_h, 22 * unit)
        grad = cairo.LinearGradient(X, cta_y, w - X, cta_y + cta_h)
        grad.add_color_stop_rgba(0.0, 0.13, 0.77, 0.37, 1.0)
        grad.add_color_stop_rgba(1.0, 0.05, 0.58, 0.35, 1.0)
        ctx.set_source(grad)
        ctx.fill()

        im.alpha_composite(cairo_to_pil(surf))

        mark = load_logo_pil('brand/dhrubo-mark.svg', round(92 * unit))
        im.alpha_composite(mark, (round(bx + 28 * unit), round(by + 58 * unit)))
        avatar = load_avatar_rounded(92 * unit, 22 * unit)
        im.alpha_composite(avatar, (round(bx + bw - 120 * unit), round(by + 58 * unit)))

        d = ImageDraw.Draw(im)
        d.text(kpos, 'YOUR NEXT PROJECT STARTS HERE', font=kf, fill=MINT)
        hy = draw_text_wrapped(
            d,
            'Visit my site. Let’s build your project.',
            X,
            242 * unit + dy,
            w - 2 * X,
            80 * unit,
            fill=WHITE,
            kind='heading',
            weight=700,
            leading=1.06,
        )
        d.text((X, round(hy + 22 * unit)), 'ardhrubo.dev', font=font(70 * unit, 'mono', 600), fill=MINT)
        d.text((X, round(hy + 112 * unit)), P['email'], font=font(32 * unit, 'body', 500), fill=TEXT_SEC)

        d.text((round(bx + 142 * unit), round(by + 52 * unit)), 'LIVE PORTFOLIO', font=font(18 * unit, 'mono', 600), fill=MINT)
        d.text((round(bx + 142 * unit), round(by + 84 * unit)), 'ardhrubo.dev', font=font(40 * unit, 'heading', 700), fill=WHITE)
        d.text((round(bx + 142 * unit), round(by + 138 * unit)), 'Remote & Dhaka (GMT+6)', font=font(22 * unit, 'body', 500), fill=TEXT_SEC)

        for i, (title, sub, col) in enumerate(deliverables):
            sy = round(card_y + (272 + i * 145) * unit)
            d.text((round(bx + 28 * unit), sy + round(24 * unit)), f'✦   {title}', font=font(27 * unit, 'heading', 700), fill=WHITE)
            d.text((round(bx + 28 * unit), sy + round(66 * unit)), sub, font=font(20 * unit, 'mono', 500), fill=col)

        d.text((X + round(42 * unit), round(cta_y + 28 * unit)), 'Explore the work  ·  Book your project  ↗', font=font(33 * unit, 'heading', 700), fill='#062112')


def render_single_scene(idx, local, length, t, w, h, bg):
    im = bg.copy()
    v = h > w
    unit = (w / 1080.0) if v else (w / 1920.0)
    p_norm = max(0.0, min(1.0, local / max(0.001, length)))

    draw_hud(im, t, idx, w, h, v, unit)

    if idx == 0:
        render_scene_0_hero(im, local, w, h, v, unit)
    elif idx == 1:
        render_scene_1_blueprint(im, local, w, h, v, unit)
    elif idx in (2, 3, 4):
        render_project_scene(im, idx - 2, local, p_norm, w, h, v, unit)
    elif idx == 5:
        render_scene_5_stack(im, local, w, h, v, unit)
    else:
        render_scene_6_outro(im, local, w, h, v, unit)

    return im.convert('RGB')


def scene(t, w, h, bg):
    t = max(0.0, min(float(DURATION - 1e-4), float(t)))
    idx = next((i for i in range(7) if CUTS[i] <= t < CUTS[i + 1]), 6)
    local = t - CUTS[idx]
    length = CUTS[idx + 1] - CUTS[idx]

    cur = render_single_scene(idx, local, length, t, w, h, bg)

    # Smooth cross-dissolve during first 0.28s of a new scene cut
    trans_dur = 0.28
    if idx > 0 and local < trans_dur:
        prev_len = CUTS[idx] - CUTS[idx - 1]
        prev = render_single_scene(idx - 1, prev_len, prev_len, t, w, h, bg)
        alpha = ease_in_out_cubic(local / trans_dur)
        cur = Image.blend(prev, cur, alpha)

    # Smooth fade-in from obsidian at start and fade-out at end
    fade = min(1.0, t / 0.35, (DURATION - t) / 0.55)
    if fade < 1.0:
        cur = Image.blend(Image.new('RGB', (w, h), OBSIDIAN), cur, max(0.0, fade))
    return cur


for name, w, h in [('vertical', 1080, 1920), ('widescreen', 1920, 1080)]:
    bg = base_atmosphere(w, h)
    # Poster frame uses Scene 0 Hero showcase or Scene 6 CTA; let's use Scene 0 at t=1.8s so the video player shows the rich Hero & Portrait stage before play!
    scene(1.8, w, h, bg).save(OUT / f'portfolio-promo-{name}-poster.jpg', quality=94)

    # Review sheet samples all 7 scenes at their settled midpoints
    sample_times = [1.8, 5.0, 8.2, 11.8, 15.2, 18.8, 22.2]
    samples = [scene(t, w, h, bg) for t in sample_times]
    thumb_w = 270 if name == 'vertical' else 480
    thumb_h = int(thumb_w * h / w)
    sheet = Image.new('RGB', (thumb_w * 4, thumb_h * 2), OBSIDIAN)
    for i, im in enumerate(samples):
        sheet.paste(im.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS), ((i % 4) * thumb_w, (i // 4) * thumb_h))
    sheet.save(OUT / f'promo-review-{name}.jpg', quality=92)
    print(f'SAVED PREVIEW: promo-review-{name}.jpg', flush=True)

    if opt.preview:
        continue

    target = OUT / f'portfolio-promo-{name}.mp4'
    temporary = OUT / f'.portfolio-promo-{name}.rendering.mp4'
    cmd = [
        opt.ffmpeg,
        '-y',
        '-loglevel',
        'warning',
        '-f',
        'rawvideo',
        '-pix_fmt',
        'rgb24',
        '-s',
        f'{w}x{h}',
        '-r',
        str(FPS),
        '-i',
        'pipe:0',
        '-c:v',
        'libx264',
        '-preset',
        'fast',
        '-crf',
        '18',
        '-pix_fmt',
        'yuv420p',
        '-an',
        '-movflags',
        '+faststart',
        '-t',
        str(DURATION),
        str(temporary),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    try:
        for frame in range(FPS * DURATION):
            proc.stdin.write(scene(frame / FPS, w, h, bg).tobytes())
            if frame % 150 == 0:
                print(name, frame // FPS, 'seconds rendered', flush=True)
    finally:
        proc.stdin.close()
    if proc.wait():
        raise RuntimeError('Video encoding failed')
    temporary.replace(target)
    print('EXPORTED', target, flush=True)
