# CLAUDE.md — Portfolio

`itsmatias.com`. Single-page snap-scroll: Hero (OGL shader) → Projects → About → Contact. Backlog en `~/Documents/projects/personal/personal-brain/01-Projects/04-portfolio/`.

## Stack

Next 16 · React 19.2 · TS · Tailwind v4 · motion · OGL · qrcode.react · Formspree.

## Comandos

```bash
npm run dev    # next dev (turbopack)
npm run build
npm run lint   # eslint
```

## Paths

- `src/components/{Hero,ProjectsShowcase,ProjectShowcase,About,Contact,Share}/`
- `src/components/ui/{Pill,GlassBadge}.tsx` — primitives.
- `src/app/{opengraph-image,sitemap,robots,terms}.tsx` + `api/webhooks/polar/route.ts`.
- `src/app/globals.css` — paleta platinum (`--brand-from/via/to`), `shiny-text`, `shiny-border`.

## Convenciones

Hereda el estándar transversal de `personal/CLAUDE.md` (reuse/SRP/DRY/tokens/estructura, commits en inglés sin co-author, sin comentarios en código). Específico de este repo:

- Videos en `/public/videos/` (mobile/desktop por proyecto); poster `.webp` derivado vía `lib/video.ts` (`posterFor`).
- Animation variants compartidas en `lib/motion.ts`.
- Copy de Hero/About/Projects: confirmar antes de tocar.
