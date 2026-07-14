#!/usr/bin/env node
/* Build lib/projects.images.json by scanning public/uploads/projects/<slug>/.

   The site wires whatever image files are present in each project folder, so
   you can upload files to GitHub with their original names (CASA_CAPO-2.webp,
   etc.) and they are picked up automatically — no renaming required.

   Rules per folder:
     - Only .webp/.png/.jpg/.jpeg are considered as images (README/.gitkeep ignored).
     - A file whose name contains "cover" (e.g. cover.webp or CASA_CAPO-COVER.webp)
       becomes the cover (first image); otherwise the first file in natural order
       is the cover.
     - The remaining files, in natural (numeric-aware) order, are the gallery.
     - An ANIMATED hero cover (a .gif, or a file named "hero") is picked up
       separately as `hero`. It is used only on the individual project page's hero;
       the cover shown on the home rail and the archive stays the static image.

   Output per slug: { images: string[], hero?: string }.

   Runs automatically before build/dev via the prebuild/predev npm hooks, and
   can be run on demand: node scripts/build-image-manifest.mjs                   */
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "public/uploads/projects";
const OUT = "lib/projects.images.json";
const IMG = /\.(webp|png|jpe?g)$/i;
const HERO_NAME = /(^|[-_ ])hero([-_. ]|$)/i;
const HERO_EXT = /\.(gif|webp|png|jpe?g|mp4|webm)$/i;

/* natural sort so CASA_CAPO-10 comes after CASA_CAPO-9 */
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const manifest = {};
let slugs = [];
try {
  slugs = (await readdir(ROOT, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
} catch {
  slugs = [];
}

for (const slug of slugs.sort()) {
  const all = await readdir(join(ROOT, slug));
  /* animated hero: a "hero"-named file first, else any .gif */
  const heroFile = all.find((f) => HERO_NAME.test(f) && HERO_EXT.test(f)) || all.find((f) => /\.gif$/i.test(f));
  const files = all.filter((f) => IMG.test(f) && f !== heroFile);
  if (files.length === 0 && !heroFile) continue;
  const coverIdx = files.findIndex((f) => /cover/i.test(f.replace(IMG, "")));
  let ordered;
  if (coverIdx >= 0) {
    const cover = files[coverIdx];
    ordered = [cover, ...files.filter((_, i) => i !== coverIdx).sort(natural)];
  } else {
    ordered = [...files].sort(natural);
  }
  const entry = { images: ordered.map((f) => `/uploads/projects/${slug}/${f}`) };
  if (heroFile) entry.hero = `/uploads/projects/${slug}/${heroFile}`;
  manifest[slug] = entry;
}

await writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
const n = Object.keys(manifest).length;
console.log(`Wrote ${OUT} — ${n} project(s) with media:`);
for (const [slug, e] of Object.entries(manifest)) console.log(`  ${slug}: ${e.images.length} image(s)${e.hero ? " + animated hero" : ""}`);
