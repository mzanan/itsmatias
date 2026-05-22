# CLAUDE.md — Portfolio

Vidriera personal de Matías. Single-page con snap scroll: Hero (Vanta waves), Projects, About, Contact. Contexto completo y backlog en `~/Documents/projects/personal/personal-brain/01-Projects/04-portfolio/`.

## Stack

Next 16 · React 19.2 · TypeScript · Tailwind v4 · Framer Motion · Vanta.js (THREE) · qrcode.react · Formspree (`@formspree/react`).

## Comandos

```bash
npm run dev          # next dev (sin turbopack)
npm run build
npm run lint         # eslint
npm run format       # prettier --write .
```

## Paths críticos

- `src/components/Contact/` — form Formspree (endpoint `mblvrwdy`).
- `src/components/Share/` — botón + modal QR.
- `src/components/ProjectShowcase/` — cards de proyectos con videos.
- `src/components/About/` — reorder animado de imágenes IG (`/api/instagram`).
- `src/components/Hero/` — Vanta waves + copy rotativo.
- `src/app/globals.css` — animaciones `shiny-text`, `shiny-border`, paleta.

## Env vars

Ninguna obligatoria a nivel build. Formspree usa el endpoint público hardcodeado en `useContact.ts`.

## Convenciones del proyecto

- Componentes en pares `Component.tsx` + `useComponent.ts` (lógica separada).
- Dark mode único.
- Videos en `/public/videos/` con par mobile/desktop por proyecto.
- Pre-merge: correr `npm run lint` y `npm run format:check`.

## Heurísticas

- No commits ni PRs sin confirmación explícita de Matías.
- Cambios de copy son cambios reales — confirmar antes de tocar Hero / About / Project names.
