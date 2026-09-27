# CLAUDE.md — Portfolio

`itsmatias.com`. Home con snap de proximidad: Hero (shader OGL + abanico de proyectos) → Work → Lab → About → Contact. La venta de templates vive en `/templates`. Backlog en `~/Documents/projects/personal/personal-brain/01-Projects/04-portfolio/`.

## Stack

Next 16 · React 19.2 · TS · Tailwind v4 · motion · OGL · qrcode.react · Formspree.

## Comandos

```bash
npm run dev    # next dev (turbopack)
npm run build
npm run lint   # eslint
```

## Paths

- `src/components/{Hero,Work,Lab,About,Contact,Share}/`; `ProjectsShowcase`/`ProjectShowcase` solo para `/templates`.
- `src/components/ui/{Pill,GlassBadge}.tsx` — primitives.
- `src/app/{opengraph-image,sitemap,robots,terms}.tsx` + `api/webhooks/polar/route.ts`.
- OG image: solo el abanico de proyectos, sin texto (título y descripción ya los muestra la preview). Frames JPG en `src/app/_og/` leídos por `lib/og.ts` en build; mantener el PNG bajo ~600 KB para la preview grande de WhatsApp.
- `src/app/globals.css` — paleta platinum (`--brand-from/via/to`), `shiny-text`, `shiny-border`.

## Convenciones

Hereda el estándar transversal de `personal/CLAUDE.md` (reuse/SRP/DRY/tokens/estructura, commits en inglés sin co-author, sin comentarios en código). Específico de este repo:

- Videos en `/public/videos/` (mobile/desktop por proyecto); poster `.webp` derivado vía `lib/video.ts` (`posterFor`).
- Animation variants compartidas en `lib/motion.ts`.
- Trabajo pesado del cliente (shaders en `lib/shaders.ts` montados por `hooks/useShaderCanvas.ts` + `lib/shaderCanvas.ts`, carga de videos en `useLazyVideo`) arranca después de `load` + idle vía `lib/idle.ts`. Nunca montarlo en la hidratación: bloqueaba el primer paint en prod hasta 2.7s.
- Copy de Hero/Work/Lab/About: confirmar antes de tocar.
- Before/after (`ui/BeforeAfter`): en mobile los iframes van a ancho nativo, nunca con `designWidth`. Con el layout de 1728px, dos iframes agotan la memoria de Safari iPhone y la pestaña se recarga (bug 2026-09-27).
- Las tarjetas del hero usan imágenes propias (`public/work/*-card.webp`): next/image detecta el LCP por `src`, y compartirla con la instancia lazy de Work dispara el warning de LCP.
