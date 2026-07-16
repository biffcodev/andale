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

- **Portada (tarjeta home + archivo)** = una imagen con `cover` en el nombre
  (ej. `cover.webp` o `LOMO-COVER.webp`). Si no hay, la tarjeta muestra
  placeholder rayado (o el video de portada, si subiste uno — ver abajo).
- **Galería de la página interna** = el resto de las imágenes **y los GIF**
  (cualquier archivo que no sea `cover` ni `hero`), en orden natural. Se
  intercalan con los textos y las frases. Los huecos sin imagen quedan como
  placeholder rayado hasta que subas la foto.
- **El diseño respeta la orientación de cada archivo** (se detecta sola con
  `sharp`): las imágenes/GIF **verticales** se muestran de a dos (media pantalla
  cada una); si una vertical queda sola, se acompaña con un placeholder a la
  derecha (el hueco para la próxima foto). Las **apaisadas o cuadradas** ocupan la
  pantalla completa. Así, apenas termina el overview, un GIF vertical de ~960×1080
  aparece con su placeholder al lado, y una apaisada se ve a pantalla completa.
  Nombrá los archivos para que ordenen como querés (ej. `lomo-loco-1.gif`).
- **Portada animada (GIF/imagen) solo para el hero de la página individual:**
  un archivo con `hero` en el nombre. En la home y el archivo la portada sigue
  siendo la imagen/video de portada. Ej.: `casa-capo/casacapo-hero.webp`.
- **Portada en video (home + archivo):** subí un `.mp4`/`.webm` con `cover` en el
  nombre y se usa como portada en la home y el archivo (las tarjetas), en loop y
  sin sonido. **No** afecta el hero de la página individual. Ej.:
  `casa-capo/casacapo-cover.mp4`.
- **Video de colores / clip:** subí `colores.mp4` a la carpeta y aparece a mitad
  de la página del proyecto, en loop sobre fondo blanco (ver `video` en los datos).
- **Versión mobile (9:16) diferenciada:** para cualquier archivo `nombre.ext`,
  subí además `nombre-mobile.ext` con el recorte vertical (9:16). En celular se
  carga esa versión; en desktop la normal (16:9). Vale para imágenes, portada,
  hero animado y videos. Ej.: `CASA_CAPO-2.webp` + `CASA_CAPO-2-mobile.webp`,
  `casacapo-hero.webp` + `casacapo-hero-mobile.webp`, `colores.mp4` +
  `colores-mobile.mp4`. **Si un archivo no tiene `-mobile`, se ve igual en ambos**
  (ideal para imágenes cuadradas).

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
