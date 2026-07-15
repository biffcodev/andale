#!/usr/bin/env node
/* Build lib/projects.images.json by scanning public/uploads/projects/<slug>/.

   The site wires whatever files are present in each project folder, so you can
   upload them to GitHub with their original names and they are picked up
   automatically — no renaming required.

   Rules per folder:
     - Images (.webp/.png/.jpg/.jpeg): the cover is a file whose name contains
       "cover" (else the first in natural order); the rest are the gallery.
     - Animated hero cover: a .gif, or a file named "hero". Used only on the
       individual project page's hero; the home/archive keep the static cover.
     - Project clip: an .mp4/.webm (e.g. colores.mp4). Shown mid-page.
     - RESPONSIVE variants: for any file `name.ext`, an optional `name-mobile.ext`
       is served on phones (portrait 9:16). Files without a `-mobile` sibling look
       the same on both devices. The `mobile` map pairs desktop URL → mobile URL.

   Output per slug: { images: string[], hero?, video?, mobile?: { [desktopUrl]: mobileUrl } }.

   Runs automatically before build/dev via the prebuild/predev npm hooks, and
   can be run on demand: node scripts/build-image-manifest.mjs                   */
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "public/uploads/projects";
const OUT = "lib/projects.images.json";
const IMG = /\.(webp|png|jpe?g)$/i;
const VID = /\.(mp4|webm)$/i;
const HERO_NAME = /(^|[-_ ])hero([-_. ]|$)/i;
const HERO_EXT = /\.(gif|webp|png|jpe?g|mp4|webm)$/i;
const MOBILE = /-mobile(\.[a-z0-9]+)$/i; // "…-mobile.ext"

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
  const url = (f) => `/uploads/projects/${slug}/${f}`;
  const desktop = all.filter((f) => !MOBILE.test(f));
  const mobileFiles = all.filter((f) => MOBILE.test(f));
  const mobileOf = (f) => {
    const target = f.replace(/(\.[a-z0-9]+)$/i, "-mobile$1").toLowerCase();
    return mobileFiles.find((m) => m.toLowerCase() === target);
  };

  /* animated hero (desktop): a "hero"-named file, else any .gif */
  const heroFile = desktop.find((f) => HERO_NAME.test(f) && HERO_EXT.test(f)) || desktop.find((f) => /\.gif$/i.test(f));
  /* project clip */
  const videoFile = desktop.find((f) => VID.test(f));

  let files = desktop.filter((f) => IMG.test(f) && f !== heroFile);
  if (files.length === 0 && !heroFile && !videoFile) continue;
  const coverIdx = files.findIndex((f) => /cover/i.test(f.replace(IMG, "")));
  const ordered = coverIdx >= 0 ? [files[coverIdx], ...files.filter((_, i) => i !== coverIdx).sort(natural)] : [...files].sort(natural);

  const mobile = {};
  for (const f of [...ordered, heroFile, videoFile].filter(Boolean)) {
    const m = mobileOf(f);
    if (m) mobile[url(f)] = url(m);
  }

  const entry = { images: ordered.map(url) };
  if (heroFile) entry.hero = url(heroFile);
  if (videoFile) entry.video = url(videoFile);
  if (Object.keys(mobile).length) entry.mobile = mobile;
  manifest[slug] = entry;
}

await writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
const n = Object.keys(manifest).length;
console.log(`Wrote ${OUT} — ${n} project(s) with media:`);
for (const [slug, e] of Object.entries(manifest)) {
  const tags = [`${e.images.length} image(s)`, e.hero && "hero", e.video && "clip", e.mobile && `${Object.keys(e.mobile).length} mobile variant(s)`].filter(Boolean);
  console.log(`  ${slug}: ${tags.join(" + ")}`);
}
