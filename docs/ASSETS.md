# Guía de imágenes y contenido — Andale

Todo lo visual vive en `public/uploads/`. **Regla general: siempre `.webp`.**
Cuando subís un archivo a GitHub en la ruta y con el nombre correctos, el sitio
lo toma solo (no hay que tocar código). Como Vercel está conectado al repo, **al
hacer push a `main` se despliega producción automáticamente.**

> Flujo: subís/actualizás el archivo en `public/uploads/...` → commit y push a
> `main` → Vercel reconstruye y en ~1 min está en vivo.
> Si el archivo no existe todavía, el sitio muestra un placeholder rayado en su
> lugar (no rompe nada).

---

## 1. Fotos del equipo

Van sueltas en `public/uploads/` con estos nombres exactos. **El nombre del
archivo define quién es quién** (así vos tenés el control del mapeo):

| Archivo | Persona | Rol |
|---|---|---|
| `public/uploads/jime-1.webp` | Jimena Moyano | Co-founder & CEO |
| `public/uploads/fer-1.webp`  | Fernando Ambordt | Co-founder & Art Director |
| `public/uploads/mili-1.webp` | Milagros Guasco | Account Executive |
| `public/uploads/vale-1.webp` | Valentina Richardson | Graphic Designer & Photographer |
| `public/uploads/cata-1.webp` | Catalina Gabellieri | Graphic Designer |
| `public/uploads/manu-1.webp` | Manuel Moyano Palacio | Creative Copywriter |

Para cambiar quién aparece en cada lugar: renombrá el archivo, o pedime que
cambie el orden/roles en `lib/i18n.ts` (`TEAM_MEMBERS` y `TEAM_ROLES`).
Formato vertical (retrato), fondo negro, ideal ~1200×1600 px.

---

## 2. Imágenes de cada proyecto

Cada proyecto tiene su propia carpeta, nombrada por su **slug**:

```
public/uploads/projects/<slug>/
  cover.webp   ← portada: hero del proyecto + card en /work + panel en la home
  1.webp       ← panel grande (full screen, con zoom al scrollear)
  2.webp       ← galería, mitad izquierda
  3.webp       ← galería, mitad derecha
  4.webp       ← segundo panel grande
```

Ejemplo para Casa Capo: `public/uploads/projects/casa-capo/cover.webp`,
`.../1.webp`, `.../2.webp`, `.../3.webp`, `.../4.webp`.

**Slugs de los 8 proyectos actuales:**

| Slug | Proyecto |
|---|---|
| `dillo` | Dillo |
| `casa-capo` | Casa Capo |
| `lomo-loco` | Lomo Loco |
| `polylepis` | Polylepis |
| `punto-intimo` | Punto Íntimo |
| `san-pietro` | San Pietro |
| `barbale` | Barbalé |
| `poligono-cordoba` | Polígono Córdoba |

Con solo `cover.webp` ya se ve la portada en el listado y la home; las `1–4`
enriquecen la página interna del proyecto. Podés subir las que tengas; las que
falten muestran placeholder.
Portada (`cover`) apaisada ~1600×1000 px; galería libre, ~1600 px lado largo.

---

## 3. Imágenes generales del sitio

| Archivo | Dónde se usa |
|---|---|
| `public/uploads/mp4.mp4` | Showreel del hero (home y /work) — ✅ ya cargado |
| `public/uploads/hero1.webp` | Póster del hero de la home + fondo del estudio |
| `public/uploads/hero2.webp` | Imagen a pantalla completa en /studio |
| `public/uploads/hero3.webp` | Imagen decorativa de apoyo |

Los SVG de marca (`logo.svg`, `logo-bold.svg`, `isologo.svg`) ya están cargados.

---

## 4. Cómo agregar un proyecto nuevo

1. Pasame el texto (en español alcanza; yo genero EN/PT/IT para tu revisión).
2. Yo agrego el bloque del proyecto en `lib/projects.ts` (con su `slug`).
3. Subís las imágenes a `public/uploads/projects/<slug>/` como arriba.
4. Push a `main` → queda en vivo.

El texto vive en `lib/projects.ts` (español, fuente) y las traducciones en
`lib/projects.i18n.json`. Cambiar una frase = editar ese archivo, sin tocar
componentes.

---

## 5. Peso recomendado

Para que el sitio cargue rápido, exportá `.webp` de calidad ~80:

- Fotos de equipo y galerías: **≤ 400–500 KB** cada una.
- Portadas de proyecto: **≤ 600 KB**.
- Video del hero: idealmente **≤ 5 MB**, 1080p, sin audio.

(Las fotos del equipo actuales pesan 1.4–2.8 MB; funcionan, pero conviene
comprimirlas para mejorar la carga. Si querés, las optimizo yo.)
