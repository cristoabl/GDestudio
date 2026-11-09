"""Render a silent, brand-aligned Instagram master from genuine project media."""
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile

sys.path.insert(0, str(Path(tempfile.gettempdir()) / "gd-reel-deps"))
import imageio_ffmpeg
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
WIDTH, HEIGHT, FPS, DURATION = 1080, 1920, 30, 25
NIGHT, BRONZE, SAND, CREAM = "#2E2620", "#8A7355", "#C8B99F", "#EDE5DA"
SOURCES = [
    "marketing/RUSTICO/DESPUES/09.jpeg",
    "public/projects/zhoue/1_Zhoue.webp",
    "public/projects/arka/ARKA_Nuevocentro_04.webp",
    "marketing/RUSTICO/DESPUES/06.jpeg",
    "marketing/RUSTICO/DESPUES/10.jpeg",
]
STARTS = [0, 4, 8.5, 13, 17, 20.5, 25]
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FONT_SOURCE = ROOT / ".next/static/media/81cef6a21128489e-s.p.0rb1wy2~c~egv.woff2"
FONT_PATHS = {}
for weight in [400, 500]:
    font = TTFont(FONT_SOURCE)
    assert all(ord(c) in font.getBestCmap() for c in "áéíóúñÁÉÍÓÚÑ")
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": weight}, inplace=True)
    font.flavor = None
    path = Path(tempfile.gettempdir()) / f"gd-reel-jost-{weight}.ttf"
    font.save(path)
    FONT_PATHS[weight] = path
FONTS = {}
IMAGES = [ImageOps.exif_transpose(Image.open(ROOT / p)).convert("RGB") for p in SOURCES]
BOUNDS = []


def font(size, weight=400):
    key = size, weight
    if key not in FONTS:
        FONTS[key] = ImageFont.truetype(str(FONT_PATHS[weight]), size)
    return FONTS[key]


def write(canvas, xy, content, size, color=CREAM, weight=400, spacing=7):
    draw = ImageDraw.Draw(canvas)
    box = draw.multiline_textbbox(xy, content, font=font(size, weight), spacing=spacing)
    assert 100 <= box[0] and box[2] <= 925, (content, box)
    assert 245 <= box[1] and box[3] <= 1460, (content, box)
    draw.multiline_text(xy, content, font=font(size, weight), fill=color, spacing=spacing)
    if (content, box) not in BOUNDS:
        BOUNDS.append((content, box))


def photograph(index, progress, size=(WIDTH, HEIGHT)):
    source = IMAGES[index]
    scale = max(size[0] / source.width, size[1] / source.height) * (1.015 + 0.035 * progress)
    crop_width, crop_height = size[0] / scale, size[1] / scale
    center_x = source.width * (0.50 + 0.008 * math.sin(progress * math.pi))
    center_y = source.height * 0.50
    box = (center_x - crop_width / 2, center_y - crop_height / 2,
           center_x + crop_width / 2, center_y + crop_height / 2)
    return source.resize(size, Image.Resampling.LANCZOS, box=box)


def shade(canvas, bottom=True):
    y = np.arange(HEIGHT) / HEIGHT
    alpha = (np.clip((y - 0.36) / 0.52, 0, 1) * 230 if bottom else
             np.clip((0.75 - y) / 0.65, 0, 1) * 222)
    alpha = np.maximum(alpha, np.clip((0.30 - y) / 0.28, 0, 1) * 125)
    overlay = Image.new("RGBA", canvas.size, NIGHT)
    overlay.putalpha(Image.fromarray(np.tile(alpha.astype("uint8")[:, None], (1, WIDTH))))
    return Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")


def identity(canvas, dark=False):
    color = NIGHT if dark else CREAM
    write(canvas, (110, 268), "GD ESTUDIO", 34, color, 500)
    ImageDraw.Draw(canvas).line((110, 330, 183, 330), fill=BRONZE if dark else SAND, width=3)


def scene(index, seconds):
    duration = STARTS[index + 1] - STARTS[index]
    progress = max(0, min(1, seconds / duration))
    if index in [1, 2]:
        canvas = Image.new("RGB", (WIDTH, HEIGHT), CREAM)
        identity(canvas, dark=True)
        title = "Espacios que hablan\nde tu marca." if index == 1 else "Diseño comercial,\na tu medida."
        write(canvas, (110, 397), title, 73, NIGHT, spacing=3)
        # Preserve the full architectural view; avoid misleading portrait crops of renders.
        photo = ImageOps.contain(IMAGES[index], (1080, 735), Image.Resampling.LANCZOS)
        canvas.paste(photo, ((WIDTH - photo.width) // 2, 727 + (735 - photo.height) // 2 - 100))
        project = "ZHOUE" if index == 1 else "ARKA"
        write(canvas, (110, 1328), project, 28, NIGHT, 500)
        write(canvas, (110, 1375), "Visualización 3D", 27, BRONZE)
        ImageDraw.Draw(canvas).line((110, 1290, 920, 1290), fill=SAND, width=2)
        return canvas
    if index == 5:
        canvas = Image.new("RGB", (WIDTH, HEIGHT), NIGHT)
        identity(canvas)
        write(canvas, (110, 529), "ARQUITECTURA COMERCIAL", 30, SAND, 500)
        write(canvas, (110, 635), "Hablemos de tu\npróximo local.", 88, CREAM, spacing=7)
        ImageDraw.Draw(canvas).line((110, 974, 920, 974), fill=BRONZE, width=2)
        write(canvas, (110, 1040), "@gdestudio.arq", 49, CREAM, 500)
        write(canvas, (110, 1128), "gdestudio.com.ar", 38, SAND)
        write(canvas, (110, 1339), "CÓRDOBA, ARGENTINA", 26, SAND)
        return canvas
    source = {0: 0, 3: 3, 4: 4}[index]
    canvas = shade(photograph(source, progress), bottom=index != 3)
    identity(canvas)
    if index == 0:
        write(canvas, (110, 886), "ARQUITECTURA COMERCIAL", 30, SAND, 500)
        write(canvas, (110, 966), "Tu local,\npensado\npara vender.", 102, CREAM, spacing=0)
    elif index == 3:
        write(canvas, (110, 410), "Cada detalle\ncuenta.", 94, CREAM, spacing=3)
    else:
        write(canvas, (110, 1024), "De la idea\nal espacio.", 100, CREAM, spacing=3)
    return canvas


def frame(time):
    index = next(i for i in range(6) if STARTS[i] <= time < STARTS[i + 1])
    canvas = scene(index, time - STARTS[index])
    remaining = STARTS[index + 1] - time
    if index < 5 and remaining < 0.32:
        amount = (1 - remaining / 0.32)
        canvas = Image.blend(canvas, scene(index + 1, 0), amount * amount * (3 - 2 * amount))
    return canvas


movie = OUT / "GD-Estudio-reel-servicios.mp4"
command = [FFMPEG, "-hide_banner", "-y", "-f", "rawvideo", "-vcodec", "rawvideo",
           "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-",
           "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
           "-movflags", "+faststart", "-color_primaries", "bt709", "-color_trc", "bt709",
           "-colorspace", "bt709", str(movie)]
with (OUT / "encode.log").open("w", encoding="utf-8") as log:
    process = subprocess.Popen(command, stdin=subprocess.PIPE, stderr=log)
    for number in range(FPS * DURATION):
        process.stdin.write(frame(number / FPS).tobytes())
        if number % 150 == 0:
            print(f"Rendered {number}/{FPS * DURATION}", flush=True)
    process.stdin.close()
    assert process.wait() == 0, "Video export failed; inspect encode.log"

frame(2).save(OUT / "GD-Estudio-portada.jpg", quality=95, subsampling=0)
samples = [1, 3, 5, 7.5, 9.5, 12, 14, 16, 18, 20, 22, 24.5]
selection = "+".join(f"eq(n,{round(time * FPS)})" for time in samples)
decoded = subprocess.run([FFMPEG, "-v", "error", "-i", str(movie), "-vf",
                          f"select='{selection}',scale=270:480", "-fps_mode", "vfr",
                          "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"], capture_output=True)
assert decoded.returncode == 0, decoded.stderr
decoded_frames = np.frombuffer(decoded.stdout, dtype="uint8").reshape((len(samples), 480, 270, 3))
sheet = Image.new("RGB", (1080, 1490), CREAM)
for number, time in enumerate(samples):
    preview = Image.fromarray(decoded_frames[number])
    x, y = number % 4 * 270, number // 4 * 495
    sheet.paste(preview, (x, y))
    ImageDraw.Draw(sheet).text((x + 7, y + 480), f"{time:.1f}s", fill=NIGHT)
sheet.save(OUT / "verification-contact-sheet.jpg", quality=93)
check = subprocess.run([FFMPEG, "-hide_banner", "-i", str(movie), "-progress", "pipe:1",
                        "-nostats", "-f", "null", "-"], capture_output=True, text=True)
assert check.returncode == 0, check.stderr
counts = [int(n) for n in re.findall(r"frame=(\d+)", check.stdout)]
assert counts[-1] == FPS * DURATION, check.stdout
assert "h264" in check.stderr and "yuv420p" in check.stderr and "1080x1920" in check.stderr
assert "Duration: 00:00:25.00" in check.stderr and "30 fps" in check.stderr
assert "Audio:" not in check.stderr
raw = movie.read_bytes()
assert raw.find(b"moov") < raw.find(b"mdat"), "Fast start missing"
verification = {
    "file": movie.name, "duration_seconds": DURATION, "dimensions": [WIDTH, HEIGHT],
    "fps": FPS, "frames_fully_decoded": counts[-1], "codec": "H.264", "pixel_format": "yuv420p",
    "audio": "Silent master: no audio track", "fast_start": True,
    "text_bounds": BOUNDS, "safe_text_region": [100, 245, 925, 1460],
    "font": "Jost (local website WOFF2, regular and medium)",
    "source_paths": SOURCES, "render_labels": {SOURCES[1]: "Visualización 3D", SOURCES[2]: "Visualización 3D"},
    "decode_exit_code": check.returncode, "bytes": movie.stat().st_size,
    "contact_sheet": "12 representative frames extracted from the encoded MP4",
    "limitations": ["Still-image motion edit, not live-action footage", "No music rights assumed; silent master"],
}
(OUT / "verification.json").write_text(json.dumps(verification, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "decode.log").write_text(check.stderr + "\n" + check.stdout, encoding="utf-8")
print(json.dumps({key: verification[key] for key in ["duration_seconds", "frames_fully_decoded", "bytes"]}))
