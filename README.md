# Portfolio Website

Personal portfolio of Matias Zanan, design engineer. Built with Next.js, with a WebGL hero, live project demos and a small template store.

Live: [itsmatias.com](https://itsmatias.com)

## Features

- **Interactive background**: custom OGL (WebGL) fbm shader on the hero, mounted after page load so it never delays the first paint
- **Project fan**: hero cards of live projects that spread on hover (and play the sequence on their own on touch devices)
- **Work**: selected projects with videos and before/after sliders
- **Lab**: four live GLSL shaders ported from the `labs` repo
- **Templates**: sellable websites at `/templates`, paid with Polar and delivered as a private repo plus deploy
- **Mobile slides**: every home section is a full-screen slide with a section stepper; desktop uses proximity snap
- **Contact form**: Formspree
- **SEO, AEO and GEO**: sitemap, robots (AI crawlers allowed), JSON-LD and `llms.txt`
- **Analytics**: PostHog EU in cookieless mode through a first-party `/relay` proxy; append `?notrack=1` to any URL to exclude your browser

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (`motion/react`)
- **Background effects**: OGL shaders (`src/lib/shaders.ts`, mounted by `src/lib/shaderCanvas.ts`)
- **Payments and email**: Polar, Resend
- **Forms**: Formspree
- **Analytics**: PostHog EU

## Project Structure

```
src/
├── app/                    # Routes: home, /templates, /order, /terms, OG image, sitemap, robots
│   └── api/                # buy, order status, Polar webhook, deploy cleanup cron
├── components/             # One folder per section (component + hook)
│   ├── Hero/  Work/  Lab/  About/  Contact/  Header/
│   ├── ProjectShowcase/    # Template showcase used by /templates
│   ├── ProjectsShowcase/   # Template list used by /templates
│   └── ui/                 # Primitives (Pill, GlassBadge, BeforeAfter, SlideStepper...)
├── hooks/                  # Cross-section hooks (useShaderCanvas, useMediaQuery)
├── lib/                    # Pure helpers (motion, video, seo, analytics, sales/...)
└── types/
```

## Getting Started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Opens on [http://localhost:3010](http://localhost:3010).

### Environment

Secrets live in Infisical (`.infisical.json`); see `.env.example` for the full list. Everything is optional for local development:

- Contact form: `NEXT_PUBLIC_FORMSPREE_FORM_ID`
- Template sales: `POLAR_*`, `GITHUB_DEPLOYS_PAT`, `GITHUB_OWNER`, `GITHUB_DEPLOYS_ORG`, `CRON_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- Analytics: `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (production only)

## Scripts

- `npm run dev`: development server on port 3010
- `npm run build`: production build
- `npm run start`: serve the build
- `npm run lint`: ESLint
- `npm run format` / `npm run format:check`: Prettier

## Architecture

Each section keeps UI and logic apart: the component file (`.tsx`) only renders, and a colocated hook (`useX.ts`) owns state, effects and data. Cross-section hooks live in `hooks/`, pure helpers in `lib/`.

Heavy client work (shaders, video loading) starts after `load` + idle (`lib/idle.ts`), and media pre-warming observes the scroll container rather than the viewport (`lib/scroll.ts`).

## Deployment

Deployed on Vercel. Vercel installs with pnpm, so keep `pnpm-lock.yaml` in sync with `package-lock.json` when dependencies change.

## License

MIT
