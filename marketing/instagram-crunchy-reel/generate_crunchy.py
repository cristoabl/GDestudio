"""Create a second, kinetic reel with an original sample-free electronic groove."""
import hashlib
import json
import math
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import wave

sys.path.insert(0, str(Path(tempfile.gettempdir()) / "gd-reel-deps"))
import imageio_ffmpeg
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
TEMP = Path(tempfile.mkdtemp(prefix="gd-crunchy-"))
W, H, FPS, SECONDS, RATE = 1080, 1920, 30, 16, 48000
NIGHT, CREAM, SAND, BRONZE = "#2E2620", "#EDE5DA", "#C8B99F", "#8A7355"
FIRST = ROOT / "marketing/instagram-service-reel/GD-Estudio-reel-servicios.mp4"
ORIGINAL_HASH = hashlib.sha256(FIRST.read_bytes()).hexdigest()
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SOURCES = ["marketing/RUSTICO/DESPUES/09.jpeg", "public/projects/zhoue/1_Zhoue.webp",
           "marketing/RUSTICO/DESPUES/06.jpeg", "public/projects/arka/ARKA_Nuevocentro_04.webp",
           "marketing/RUSTICO/DESPUES/10.jpeg"]
IMAGES = [ImageOps.exif_transpose(Image.open(ROOT / path)).convert("RGB") for path in SOURCES]
STARTS = [0, 3, 5, 6, 8, 9, 10, 13, 16]
font = TTFont(ROOT / ".next/static/media/81cef6a21128489e-s.p.0rb1wy2~c~egv.woff2")
assert all(ord(c) in font.getBestCmap() for c in "áéíóúñÁÉÍÓÚÑ")
if "fvar" in font:
    font = instantiateVariableFont(font, {"wght": 500}, inplace=True)
font.flavor = None
FONT_PATH = TEMP / "Jost-Medium.ttf"
font.save(FONT_PATH)
FONTS, TEXT_BOUNDS = {}, {}


def typeface(size):
    if size not in FONTS:
        FONTS[size] = ImageFont.truetype(str(FONT_PATH), size)
    return FONTS[size]


def text(canvas, content, y, size=110, color=CREAM, age=1, box=False):
    # Quick eased settling, never off-screen or flashing.
    shift = round(28 * (1 - min(1, max(0, age) / 0.2)) ** 3)
    draw = ImageDraw.Draw(canvas)
    while draw.textlength(content, font=typeface(size)) > 780:
        size -= 1
    xy = (110, y + shift)
    bounds = draw.textbbox(xy, content, font=typeface(size))
    assert bounds[0] >= 100 and bounds[2] <= 920 and bounds[1] >= 250 and bounds[3] <= 1450
    if box:
        draw.rectangle((100, bounds[1] - 14, bounds[2] + 14, bounds[3] + 14), fill=CREAM)
        color = NIGHT
    draw.text(xy, content, font=typeface(size), fill=color)
    previous = TEXT_BOUNDS.get(content, bounds)
    TEXT_BOUNDS[content] = [min(previous[0], bounds[0]), min(previous[1], bounds[1]),
                            max(previous[2], bounds[2]), max(previous[3], bounds[3])]


def photograph(source, phase):
    image = IMAGES[source]
    scale = max(W / image.width, H / image.height) * (1.02 + 0.055 * phase)
    width, height = W / scale, H / scale
    cx, cy = image.width * (0.50 + 0.007 * phase), image.height * 0.50
    photo = image.resize((W, H), Image.Resampling.LANCZOS,
                         box=(cx - width / 2, cy - height / 2, cx + width / 2, cy + height / 2))
    return Image.blend(photo, Image.new("RGB", (W, H), NIGHT), 0.44)


def frame(time):
    shot = next(i for i in range(8) if STARTS[i] <= time < STARTS[i + 1])
    age = time - STARTS[shot]
    phase = age / (STARTS[shot + 1] - STARTS[shot])
    render = shot in [1, 3]
    if render:
        canvas = Image.new("RGB", (W, H), CREAM)
        source = 1 if shot == 1 else 3
        image = ImageOps.contain(IMAGES[source], (W, 710), Image.Resampling.LANCZOS)
        canvas.paste(image, ((W - image.width) // 2, 690 + (710 - image.height) // 2 - 75))
        text(canvas, "TU MARCA." if shot == 1 else "DISEÑO.", 433, 125, NIGHT, age)
        text(canvas, "EN CADA ESPACIO." if shot == 1 else "CON IDENTIDAD.", 1280, 69, NIGHT, age)
        text(canvas, "ZHOUE · Visualización 3D" if shot == 1 else "ARKA · Visualización 3D",
             1394, 29, BRONZE)
    elif shot == 7:
        canvas = Image.new("RGB", (W, H), NIGHT)
        text(canvas, "HABLEMOS.", 584, 135, CREAM, age)
        text(canvas, "TU PRÓXIMO LOCAL", 818, 49, SAND, age)
        text(canvas, "EMPIEZA CON UNA IDEA.", 889, 49, SAND, age)
        text(canvas, "@gdestudio.arq", 1083, 62)
        text(canvas, "gdestudio.com.ar", 1190, 45, SAND)
        ImageDraw.Draw(canvas).line((110, 1028, 916, 1028), fill=BRONZE, width=3)
    else:
        source = {0: 0, 2: 2, 4: 4, 5: 2, 6: 0}[shot]
        canvas = photograph(source, phase)
        if shot == 0:
            text(canvas, "QUE TU LOCAL", 601, 106, CREAM, age)
            if age >= 0.5:
                text(canvas, "NO PASE", 779, 145, CREAM, age - 0.5, box=True)
            if age >= 1:
                text(canvas, "DESAPERCIBIDO.", 997, 102, CREAM, age - 1)
            text(canvas, "ARQUITECTURA COMERCIAL", 1344, 30, SAND)
        elif shot == 6:
            text(canvas, "ARQUITECTURA", 865, 100, CREAM, age)
            text(canvas, "COMERCIAL.", 1020, 122, CREAM, age, box=True)
            text(canvas, "CÓRDOBA · ARGENTINA", 1344, 31, SAND)
        else:
            headline = {2: "DETALLES.", 4: "RECORRIDO.", 5: "EXPERIENCIA."}[shot]
            text(canvas, headline, 1031, 132, CREAM, age, box=True)
    text(canvas, "GD ESTUDIO", 269, 36, NIGHT if render else CREAM)
    text(canvas, "ARQUITECTURA + IDENTIDAD", 325, 24, BRONZE if render else SAND)
    # A quiet progress rule provides motion without a flashing beat indicator.
    ImageDraw.Draw(canvas).line((110, 1490, 110 + round(806 * time / SECONDS), 1490), fill=BRONZE, width=4)
    return canvas


def synthesize():
    """Original 120 BPM groove: all oscillators/noise are generated locally."""
    sound = np.zeros((RATE * SECONDS, 2), dtype=np.float64)
    rng = np.random.default_rng(230924)

    def place(samples, seconds, gain=1, pan=0):
        start = round(seconds * RATE)
        count = min(len(samples), len(sound) - start)
        sound[start:start + count, 0] += samples[:count] * gain * (1 - pan * 0.25)
        sound[start:start + count, 1] += samples[:count] * gain * (1 + pan * 0.25)

    t = np.arange(round(0.34 * RATE)) / RATE
    kick = np.sin(2 * np.pi * (48 * t + 5.8 * (1 - np.exp(-t * 42)))) * np.exp(-t * 13)
    kick *= np.minimum(t / 0.002, 1)
    t = np.arange(round(0.18 * RATE)) / RATE
    noise = rng.normal(0, 1, len(t))
    snare = (0.55 * np.diff(noise, prepend=0) + 0.5 * np.sin(2 * np.pi * 185 * t)) * np.exp(-t * 27)
    snare *= np.minimum(t / 0.003, 1)
    t = np.arange(round(0.065 * RATE)) / RATE
    noise = rng.normal(0, 1, len(t))
    hat = np.diff(noise, prepend=0) * np.exp(-t * 90) * np.minimum(t / 0.001, 1)
    notes = [55, 55, 65.406, 48.999]
    for beat in range(32):
        second = beat * 0.5
        place(kick, second, 0.65)
        if beat % 2:
            place(snare, second, 0.17 if second >= 3 else 0.10)
        for offbeat in [0, 0.25]:
            place(hat, second + offbeat, 0.052 if offbeat else 0.026, pan=(-1) ** beat)
        t = np.arange(round(0.205 * RATE)) / RATE
        frequency = notes[(beat // 8) % 4]
        bass = np.sin(2 * np.pi * frequency * t) + 0.23 * np.sin(4 * np.pi * frequency * t)
        envelope = np.minimum(t / 0.015, 1) * np.maximum(0, 1 - t / 0.205) ** 1.3
        place(bass * envelope, second + 0.25, 0.27)
    fade_in, fade_out = round(0.012 * RATE), round(0.35 * RATE)
    sound[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    sound[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
    sound *= (10 ** (-3.5 / 20)) / np.max(np.abs(sound))
    path = TEMP / "original-120bpm.wav"
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(RATE)
        output.writeframes((sound * 32767).astype("<i2").tobytes())
    return path


silent = OUT / "GD-Estudio-reel-crunchy-sin-musica.mp4"
main = OUT / "GD-Estudio-reel-crunchy.mp4"
command = [FFMPEG, "-hide_banner", "-y", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24",
           "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264", "-preset", "medium",
           "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(silent)]
with (TEMP / "encode.log").open("w") as log:
    process = subprocess.Popen(command, stdin=subprocess.PIPE, stderr=log)
    for number in range(FPS * SECONDS):
        process.stdin.write(frame(number / FPS).tobytes())
        if number % 120 == 0:
            print(f"Rendered {number}/{FPS * SECONDS}", flush=True)
    process.stdin.close()
    assert process.wait() == 0, "Export failed"
music = synthesize()
mux = subprocess.run([FFMPEG, "-v", "error", "-y", "-i", str(silent), "-i", str(music), "-c:v", "copy",
                      "-c:a", "aac", "-b:a", "192k", "-t", str(SECONDS), "-movflags", "+faststart", str(main)],
                     capture_output=True)
assert mux.returncode == 0, mux.stderr
audio = subprocess.run([FFMPEG, "-v", "error", "-i", str(main), "-vn", "-f", "f32le", "-acodec", "pcm_f32le",
                        "-ar", str(RATE), "-ac", "2", "pipe:1"], capture_output=True)
assert audio.returncode == 0, audio.stderr
pcm = np.frombuffer(audio.stdout, dtype="<f4").reshape((-1, 2))
peak = float(np.max(np.abs(pcm)))
rms = float(np.sqrt(np.mean(pcm ** 2)))
assert 0.01 < rms < 0.5 and peak < 10 ** (-3 / 20), (rms, peak)
assert abs(len(pcm) / RATE - SECONDS) < 0.025
checks = {}
for movie in [main, silent]:
    check = subprocess.run([FFMPEG, "-hide_banner", "-i", str(movie), "-progress", "pipe:1", "-nostats",
                            "-f", "null", "-"], capture_output=True, text=True)
    assert check.returncode == 0, check.stderr
    count = int(re.findall(r"frame=(\d+)", check.stdout)[-1])
    assert count == 480 and "Duration: 00:00:16.00" in check.stderr
    assert "h264" in check.stderr and "yuv420p" in check.stderr and "1080x1920" in check.stderr and "30 fps" in check.stderr
    assert ("Audio: aac" in check.stderr) == (movie == main)
    raw = movie.read_bytes()
    assert raw.find(b"moov") < raw.find(b"mdat")
    checks[movie.name] = {"decoded_frames": count, "bytes": movie.stat().st_size, "full_decode_exit_code": 0,
                          "codec": "H.264", "pixel_format": "yuv420p", "audio": "AAC stereo" if movie == main else "none"}

times = [0.25, 0.75, 1.5, 2.5, 3.5, 5.5, 6.5, 8.5, 9.5, 11, 13.5, 15.5]
selection = "+".join(f"eq(n,{round(time * FPS)})" for time in times)
result = subprocess.run([FFMPEG, "-v", "error", "-i", str(main), "-vf", f"select='{selection}',scale=270:480",
                         "-fps_mode", "vfr", "-an", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"], capture_output=True)
assert result.returncode == 0
frames = np.frombuffer(result.stdout, dtype="uint8").reshape((len(times), 480, 270, 3))
sheet = Image.new("RGB", (1080, 1490), CREAM)
for index, time in enumerate(times):
    x, y = index % 4 * 270, index // 4 * 495
    sheet.paste(Image.fromarray(frames[index]), (x, y))
    ImageDraw.Draw(sheet).text((x + 7, y + 480), f"{time:.2f}s", fill=NIGHT)
sheet.save(OUT / "verification-contact-sheet.jpg", quality=94)
frame(2).save(OUT / "GD-Estudio-portada-crunchy.jpg", quality=95, subsampling=0)
assert hashlib.sha256(FIRST.read_bytes()).hexdigest() == ORIGINAL_HASH
report = {"duration_seconds": SECONDS, "fps": FPS, "dimensions": [W, H], "exports": checks,
          "first_reel_sha256_unchanged": ORIGINAL_HASH, "bpm": 120, "beat_aligned_scene_boundaries": STARTS,
          "audio_origin": "Original local oscillator/noise synthesis; no recordings, samples or external music",
          "audio_peak_dbfs": 20 * math.log10(peak), "audio_rms_dbfs": 20 * math.log10(rms),
          "decoded_audio_seconds": len(pcm) / RATE, "audio_listening": "Not performed; decoded-signal checks only",
          "audio_fades_seconds": [0.012, 0.35], "sources": SOURCES, "render_sources": [SOURCES[1], SOURCES[3]],
          "text_bounds": TEXT_BOUNDS, "font": "Jost Medium", "contact_sheet": "12 frames extracted from encoded MP4",
          "limitations": ["Still-image motion edit", "No Instagram upload test or publication"]}
(OUT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"exports": checks, "peak_dbfs": report["audio_peak_dbfs"], "rms_dbfs": report["audio_rms_dbfs"]}))
