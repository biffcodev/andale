# Assets del proyecto de Claude Design

Los SVG de marca (`logo.svg`, `logo-bold.svg`, `isologo.svg`) se importaron completos desde el
proyecto de Claude Design.

Los archivos binarios grandes **no pudieron importarse** porque la API de Claude Design limita
la lectura de cada archivo a 256 KiB y estos pesan entre 1.4 MB y varios MB. El sitio los
referencia igualmente y degrada con elegancia (placeholder rayado, tal como el diseño original)
hasta que se agreguen aquí. Para completar el sitio, copiá en esta carpeta:

- `hero1.png`, `hero2.png`, `hero3.png` — imágenes del hero / studio
- `casacapo.png`, `polylepis.png`, `sanpietro.png`, `smileshub.png` — portadas de proyectos
- `jime-1.webp`, `fer-1.webp`, `mili-1.webp`, `vale-1.webp`, `cata-1.webp`, `manu-1.webp` — fotos del equipo
- `mp4.mp4` — video del hero (home y work)

Los nombres deben coincidir exactamente (el código los referencia como `/uploads/<archivo>`).
Podés descargarlos desde el proyecto de Claude Design (menú de archivos) o exportarlos desde
los originales del estudio. Ideal: comprimir a ≤300 KB por imagen (WebP/AVIF) antes de subirlos.
