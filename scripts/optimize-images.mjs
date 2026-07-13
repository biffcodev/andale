#!/usr/bin/env node
/* Optimize heavy images under public/uploads.
   Re-encodes .webp/.png/.jpg larger than the threshold to a max long edge and
   webp quality ~80, in place. Run: node scripts/optimize-images.mjs           */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOT = "public/uploads";
const MAX_EDGE = 1600; // px, long edge
const QUALITY = 80;
const MIN_BYTES = 500 * 1024; // only touch files above ~500KB

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let touched = 0,
  savedBytes = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".webp", ".png", ".jpg", ".jpeg"].includes(ext)) continue;
  const before = (await stat(file)).size;
  if (before < MIN_BYTES) continue;

  const meta = await sharp(file).metadata();
  const longEdge = Math.max(meta.width || 0, meta.height || 0);
  const tmp = join(dirname(file), "." + basename(file) + ".tmp.webp");
  await sharp(file)
    .resize({ width: longEdge > MAX_EDGE && (meta.width || 0) >= (meta.height || 0) ? MAX_EDGE : undefined, height: longEdge > MAX_EDGE && (meta.height || 0) > (meta.width || 0) ? MAX_EDGE : undefined, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after < before) {
    // replace original (always end up as .webp)
    const finalPath = ext === ".webp" ? file : file.slice(0, -ext.length) + ".webp";
    await rename(tmp, finalPath);
    if (finalPath !== file) await unlink(file);
    savedBytes += before - after;
    touched++;
    console.log(`${file}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  } else {
    await unlink(tmp);
    console.log(`${file}  already optimal (${(before / 1024).toFixed(0)}KB)`);
  }
}

console.log(`\nOptimized ${touched} file(s), saved ${(savedBytes / 1024 / 1024).toFixed(2)}MB`);
