import type { CSSProperties } from "react";
import type { Lang, Translation, Work } from "./i18n";

/* Remote images are resized through the CDN exactly like the design did */
export const IMG_PARAMS = "?auto=format&fit=crop&w=1500&q=80";

/* Home hero (video poster), studio full-bleed image and generic site imagery.
   Drop these as .webp in public/uploads/ — see docs/ASSETS.md */
export const HERO_IMGS = ["/uploads/hero1.webp", "/uploads/hero2.webp", "/uploads/hero3.webp"];
/* Poster for the /work video hero + decorative frames behind the services accordion */
export const WORK_IMGS = ["/uploads/hero1.webp", "/uploads/hero2.webp", "/uploads/hero3.webp", "/uploads/hero1.webp"];
export const HERO_VIDEO = "/uploads/mp4.mp4";

export const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
];

export const SOCIALS = [
  { l: "IG", label: "Instagram", u: "https://instagram.com/weareandale" },
  { l: "FB", label: "Facebook", u: "https://facebook.com/weareandale" },
  { l: "IN", label: "LinkedIn", u: "https://linkedin.com/company/weareandale" },
];

export const FOOTER_SOCIAL = [
  { label: "Instagram", u: "https://instagram.com/weareandale" },
  { label: "LinkedIn", u: "https://linkedin.com/company/weareandale" },
  { label: "Behance", u: "https://behance.net/weareandale" },
];

export const BOOK_HREF = "https://calendly.com/connectandale";

export const LOCATIONS = ["Buenos Aires", "Buenos Aires", "Rosario", "Córdoba", "Rosario", "Buenos Aires", "Mendoza", "Rosario", "Córdoba", "Córdoba", "Buenos Aires", "Córdoba"];

export const PROJECT_VIDEOS = [
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/trailer.mp4",
  "https://media.w3.org/2010/05/video/movie_300.mp4",
];

export const MAP_SRC =
  "https://maps.google.com/maps?q=" + encodeURIComponent("E. Bodereau 7491, X5018 Córdoba, Argentina") + "&z=15&output=embed";

/* Local files are served as-is; remote (Unsplash) get the CDN params */
export function imgUrl(url: string): string {
  return url.startsWith("http") ? url + IMG_PARAMS : url;
}

/* The design's coverBase(): image over a striped placeholder that shows through while
   (or if) the photo is missing — keep it verbatim for graceful degradation */
export function coverBase(url: string | null): CSSProperties {
  return {
    backgroundImage:
      (url ? `url('${imgUrl(url)}'), ` : "") +
      "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 16px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "var(--placeholder)",
  };
}

export function mediaAbs(url: string | null): CSSProperties {
  return { position: "absolute", inset: 0, transition: "transform .8s ease", ...coverBase(url) };
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface EnrichedWork extends Work {
  index: number;
  slug: string;
  num: string;
  total: string;
  resolvedImg: string;
}

export function enrichWorks(t: Translation): EnrichedWork[] {
  return t.works.map((w, i) => ({
    ...w,
    index: i,
    slug: slugify(w.client),
    num: (i < 9 ? "0" : "") + (i + 1),
    total: "0" + t.works.length,
    resolvedImg: w.img || GALLERY_POOL[(i * 2) % GALLERY_POOL.length],
  }));
}

export function projectGallery(pid: number): string[] {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((k) => GALLERY_POOL[(pid * 2 + k) % 8]);
}

export const CLIENTS = ["Casa Capo", "Máscielo", "San Pietro", "Norte Studio", "Aurora Films", "Vela Coffee", "Duarte & Co", "Terra Wines", "Lumen Health", "Río Editorial", "Campo Bravo", "Nêne"];

export const AWARDS: Record<Lang, { y: string; n: string; o: string }[]> = {
  EN: [
    { y: "2025", n: "Brand of the Year", o: "Clap Awards" },
    { y: "2024", n: "Best Visual Identity", o: "Latin Design Awards" },
    { y: "2024", n: "Packaging, Gold", o: "Iberoamérica Design" },
    { y: "2023", n: "Site of the Day", o: "Awwwards" },
    { y: "2023", n: "Rebrand of the Year", o: "Brand Impact" },
  ],
  ES: [
    { y: "2025", n: "Marca del Año", o: "Clap Awards" },
    { y: "2024", n: "Mejor Identidad Visual", o: "Latin Design Awards" },
    { y: "2024", n: "Packaging, Oro", o: "Iberoamérica Design" },
    { y: "2023", n: "Sitio del Día", o: "Awwwards" },
    { y: "2023", n: "Rebrand del Año", o: "Brand Impact" },
  ],
  PT: [
    { y: "2025", n: "Marca do Ano", o: "Clap Awards" },
    { y: "2024", n: "Melhor Identidade Visual", o: "Latin Design Awards" },
    { y: "2024", n: "Packaging, Ouro", o: "Iberoamérica Design" },
    { y: "2023", n: "Site do Dia", o: "Awwwards" },
    { y: "2023", n: "Rebrand do Ano", o: "Brand Impact" },
  ],
  IT: [
    { y: "2025", n: "Marchio dell'Anno", o: "Clap Awards" },
    { y: "2024", n: "Migliore Identità Visiva", o: "Latin Design Awards" },
    { y: "2024", n: "Packaging, Oro", o: "Iberoamérica Design" },
    { y: "2023", n: "Sito del Giorno", o: "Awwwards" },
    { y: "2023", n: "Rebrand dell'Anno", o: "Brand Impact" },
  ],
};
