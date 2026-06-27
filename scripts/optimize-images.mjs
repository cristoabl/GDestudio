// Optimiza todas las imágenes de public/projects -> WebP (máx 2560px, calidad 80).
// Genera los .webp JUNTO a los originales (no borra nada).
// Uso: node scripts/optimize-images.mjs

import { readdir, stat } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "projects");

const MAX_WIDTH = 2560;
const QUALITY = 80;
const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function fmtMB(bytes) {
  return (bytes / 1048576).toFixed(2) + " MB";
}

const all = await walk(ROOT);
const sources = all.filter((f) => SOURCE_EXTS.has(extname(f).toLowerCase()));

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

console.log(`Procesando ${sources.length} imágenes...\n`);

for (const src of sources) {
  const dir = dirname(src);
  const base = basename(src, extname(src));
  const out = join(dir, `${base}.webp`);

  try {
    const before = (await stat(src)).size;
    await sharp(src)
      .rotate() // respeta orientación EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const after = (await stat(out)).size;

    totalBefore += before;
    totalAfter += after;
    count++;
    console.log(
      `✓ ${base}  ${fmtMB(before)} -> ${fmtMB(after)}  (-${Math.round((1 - after / before) * 100)}%)`
    );
  } catch (err) {
    console.error(`✗ Error en ${src}: ${err.message}`);
  }
}

console.log(`\n--- Resumen ---`);
console.log(`Imágenes convertidas: ${count}`);
console.log(`Antes:  ${fmtMB(totalBefore)}`);
console.log(`Después: ${fmtMB(totalAfter)}`);
console.log(`Ahorro: ${fmtMB(totalBefore - totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
console.log(`\nLos .webp se generaron junto a los originales. Nada fue borrado.`);
