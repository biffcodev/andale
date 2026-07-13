# Andale — Branding & Strategy

Sitio del estudio **Andale** (Córdoba, AR), implementado en Next.js a partir del proyecto de
[Claude Design](https://claude.ai/design/p/b05349a2-579a-45bc-a93a-bdedc4568012?file=Homepage.dc.html)
(`Homepage.dc.html`), replicando fielmente su sistema visual, contenido y comportamiento.

## Stack

- **Next.js 16** (App Router, TypeScript) — listo para deploy en **Vercel** sin configuración extra
- **framer-motion** — loader, transiciones de página (sweep + fade-up), reveals on-scroll, menú, cookies
- **@supabase/supabase-js** — el formulario de contacto inserta en `contact_messages` (ver `supabase/schema.sql`)
- CSS puro con variables de tema (sin frameworks de estilos), tipografía **Inter** vía `next/font`

## Funcionalidad (idéntica al diseño)

- **Home**: hero con video + overlays, rail horizontal de casos con scroll-snap y conversión de
  rueda vertical→horizontal, panel CTA final, manifiesto con stats
- **/work**: hero de video, intro, 5 paneles fullscreen, grilla "más proyectos" (ritmo 2-1-2-3-1-2),
  rail lateral con dots
- **/work/[slug]**: overview + meta, feature panels con settle-scale al scrollear, film con
  play/pause, galería, quote, outcome, next-project
- **/studio**: intro, imagen full-bleed, manifiesto ink, valores, números, quote, método, equipo
  con bios expandibles
- **/services**: acordeón de expertise con visual sticky sincronizado, filosofía
- **/contact**: formulario (Supabase con degradación offline), datos de contacto, mapa de Google
  gateado por consentimiento de marketing
- **/cookies, /privacy, /terms**: políticas completas + registro de auditoría de consentimiento
- **404**: isologo "chancho volador" animado
- **i18n** EN/ES/PT/IT con autodetección + selector, **tema claro/oscuro** persistente,
  **loader** con wordmark que se rellena, **consentimiento de cookies** completo (banner, panel,
  FAB, expiración a 180 días, audit log, scripts gestionados por categoría)

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional: credenciales de Supabase
npm run dev
```

### Supabase

Ejecutá `supabase/schema.sql` en el SQL editor del proyecto y completá
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Sin credenciales el formulario
funciona igual (muestra el mensaje de gracias sin persistir).

### Deploy en Vercel

Importá el repo en Vercel (framework: Next.js, sin config extra) y cargá las dos variables de
entorno de Supabase. También funciona `npx vercel`.

## Assets pendientes

Las fotos y el video del diseño original superan el límite de lectura de la API de Claude Design
(256 KiB por archivo) y no pudieron importarse automáticamente — ver
[`public/uploads/README.md`](public/uploads/README.md) para la lista exacta de archivos a copiar.
El sitio degrada con el mismo placeholder rayado del diseño hasta que estén.

## Skills de diseño

En `.claude/skills/` quedaron instaladas [impeccable](https://github.com/pbakaus/impeccable),
[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
[huashu-design](https://github.com/alchaincyf/huashu-design) y
[taste-skill](https://github.com/Leonxlnx/taste-skill) para iterar el diseño desde Claude Code.
