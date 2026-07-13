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
```

**Subí las imágenes con el nombre que quieras** (por ejemplo, tal cual salen de
GitHub: `CASA_CAPO-2.webp`, `CASA_CAPO-4.webp`, …). El sitio las detecta solo:
antes de cada build se regenera un índice (`lib/projects.images.json`) que lee
la carpeta y ordena los archivos de forma natural (2, 4, 5 … 10, 11). **No hay
que renombrar nada ni tocar código.**

Orden y uso:

- **Portada** = la primera imagen. Para elegir cuál es, nombrá ese archivo
  `cover.webp` (tiene prioridad); si no, es la primera en orden natural.
- La página interna del proyecto usa las siguientes cuatro como paneles grandes
  y galería, **y cualquier imagen extra aparece en una grilla al final** — así
  no se desperdicia ninguna que subas.
- Con una sola imagen ya se ve la portada en el listado y la home. Las que
  falten muestran placeholder rayado.

Ejemplo real (Casa Capo, 11 imágenes): subiste `CASA_CAPO-2.webp` … `-13.webp`
y el sitio arma portada + paneles + grilla final automáticamente.

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

Portada apaisada ~1600×1000 px; galería libre, ~1600 px lado largo.

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
3. Subís las imágenes a `public/uploads/projects/<slug>/` (cualquier nombre).
4. Push a `main` → Vercel regenera el índice y queda en vivo.

El texto vive en `lib/projects.ts` (español, fuente) y las traducciones en
`lib/projects.i18n.json`. Cambiar una frase = editar ese archivo, sin tocar
componentes.

---

## 5. Peso recomendado

Para que el sitio cargue rápido, exportá `.webp` de calidad ~80:

- Fotos de equipo y galerías: **≤ 400–500 KB** cada una.
- Portadas de proyecto: **≤ 600 KB**.
- Video del hero: idealmente **≤ 5 MB**, 1080p, sin audio.

No hace falta que las comprimas vos: subilas como estén y corré
`npm run optimize:images` (o pedímelo), que reescribe en `.webp` calidad ~80
cualquier archivo de más de ~500 KB. Así se optimizaron las fotos del equipo
(1.4–2.8 MB → 32–71 KB) y las de Casa Capo (hasta 2 MB → 32–205 KB).
