# Web Dev & Design

Community website for the **Web Dev & Design** Discord server. Built with Astro, React islands, Tailwind CSS, and Zod-validated content collections.

## Stack

- [Astro](https://astro.build) — static site shell and routing
- [React](https://react.dev) — interactive islands (search, mobile nav)
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Zod](https://zod.dev) — schema validation
- [Vitest](https://vitest.dev) — unit and component tests
- [Cloudflare Pages](https://pages.cloudflare.com) — deployment target

## Getting started

Requires Node.js 22+.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once (CI) |

## Environment variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SITE_URL` | Canonical site URL for meta tags |
| `PUBLIC_DISCORD_INVITE_URL` | Discord invite link for CTAs |

## Pages

- `/` — Home with Discord join CTA
- `/learning` — Curated resources with search and filter
- `/code-of-conduct` — Community guidelines

## Deployment

Build command: `pnpm build`  
Output directory: `dist`

Set `PUBLIC_SITE_URL` and `PUBLIC_DISCORD_INVITE_URL` in Cloudflare Pages environment variables.
