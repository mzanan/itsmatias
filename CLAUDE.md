# CLAUDE.md: Portfolio

`itsmatias.com`. Home with proximity snap: Hero (OGL shader + project fan) → Work → Lab → About → Contact. On mobile every section is a full-screen slide with a `SlideStepper`. Template sales live at `/templates`. Backlog in `~/Documents/projects/personal/personal-brain/01-Projects/04-portfolio/`.

## Stack

Next 16 · React 19.2 · TS · Tailwind v4 · motion · OGL · qrcode.react · Formspree · Polar (template sales) · Resend · PostHog EU.

## Commands

```bash
npm run dev    # next dev on port 3010
npm run build
npm run lint   # eslint
npm run format
```

Vercel installs with pnpm: on dependency changes update both `package-lock.json` and `pnpm-lock.yaml`.

## Paths

- `src/components/{Hero,Work,Lab,About,Contact,Header,Share}/`; `ProjectsShowcase`/`ProjectShowcase` only for `/templates`.
- `src/components/ui/`: primitives (`Pill`, `GlassBadge`, `Eyebrow`, `SectionHeader`, `FadeIn`, `Media`, `BeforeAfter`, `SlideStepper` + `useActiveSlide`, `JsonLd`).
- Sales: `src/app/templates`, `api/buy/[slug]`, `api/order/[checkoutId]`, `order/[checkoutId]`, `attribution-removed/[slug]`, `api/webhooks/polar`, `api/cron/cleanup-deploys`; logic in `src/lib/sales/` (Polar API, product map, ephemeral deploy repos, Resend emails).
- SEO/AEO: `src/app/{sitemap,robots}.ts` (AI crawlers allowed), `lib/seo.ts` (site constants + JSON-LD), `public/llms.txt`.
- Analytics: PostHog EU through the `/relay` rewrite (`lib/analytics.ts`, `src/instrumentation-client.ts`), production only, `cookieless_mode: "always"` (no cookie banner needed). `?notrack=1` opts a browser out (localStorage), `?notrack=0` opts back in.
- OG image: only the project fan, no text (the preview already shows title and description). JPG frames in `src/app/_og/` read by `lib/og.ts` at build; keep the PNG under ~600 KB for the large WhatsApp preview.
- `src/app/globals.css`: platinum palette (`--brand-from/via/to`), `shiny-text`, `shiny-border`.

## Conventions

Inherits the cross-repo standard from `personal/CLAUDE.md` (reuse/SRP/DRY/tokens/structure, English commits without co-author, no code comments). Repo-specific:

- Videos in `/public/videos/` (mobile/desktop per project); `.webp` poster derived via `lib/video.ts` (`posterFor`).
- Shared animation variants in `lib/motion.ts`.
- Heavy client work (shaders in `lib/shaders.ts` mounted by `hooks/useShaderCanvas.ts` + `lib/shaderCanvas.ts`, video loading in `useLazyVideo`) starts after `load` + idle via `lib/idle.ts`. Never mount it during hydration: it blocked the first paint in prod for up to 2.7s.
- IntersectionObservers that pre-warm media use the scroll container as root (`lib/scroll.ts` `getScrollParent`), not the viewport.
- Mobile slides: `lib/slide.ts` (`mobileSlide`, `SLIDE_SELECTOR`); snap is mandatory on mobile, md+ keeps proximity snap.
- Hero/Work/Lab/About copy: confirm before touching.
- Before/after (`ui/BeforeAfter`): on mobile the iframes render at native width, never with `designWidth`. With the 1728px layout, two iframes exhaust iPhone Safari memory and the tab reloads (bug 2026-09-27).
- Hero cards use their own images (`public/work/*-card.webp`): next/image detects the LCP by `src`, and sharing it with the lazy Work instance triggers the LCP warning.
