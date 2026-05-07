# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: This is Next.js 16

This version has breaking changes. Read `node_modules/next/dist/docs/` before modifying routing, caching, or data-fetching patterns. Key differences from older versions:

- `params` and `searchParams` in pages/layouts are **Promises** — always `await params` before accessing properties
- For slow client-side navigations, `Suspense` alone is not enough — also export `unstable_instant` from the route. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`
- Prefer **Server Actions** over API routes for form mutations. See `node_modules/next/dist/docs/01-app/02-guides/forms.md`

## Commands

```bash
npm run dev       # development server on :3000
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
node node_modules/typescript/bin/tsc --noEmit  # type-check (npx tsc is broken — use node directly)
```

## Required Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_EMAIL` | Destination address for contact form submissions |

## Architecture

**Data flow:** Sanity CMS → `src/lib/queries.ts` (GROQ) → async Server Components (pages) → Client Components (interactive UI)

Pages in `src/app/` are Server Components that fetch from Sanity and pass typed data down to client components. The split is:
- `src/app/*/page.tsx` — async server, fetches data, renders layout
- `src/components/sections/` — client components with Framer Motion animations
- `src/components/gallery/`, `music/`, `forms/` — client components for interactive features

**Sanity integration:** `src/lib/sanity.ts` exports the client and `urlFor()` image builder. `src/lib/queries.ts` contains all GROQ queries. Schemas live in `sanity/schemas/` and are registered in `sanity.config.ts` at the project root (not inside `src/`).

**Styling:** Tailwind v4 with CSS custom properties defined in `src/app/globals.css`. Design tokens use raw hex values inline — do not abstract them into Tailwind config classes. Fonts: `--font-display` (Playfair Display, for headings) and `--font-body` (Inter, for body text) injected via `src/app/layout.tsx`.

**Contact form:** `src/components/forms/ContactForm.tsx` posts to `/api/contact` (route handler at `src/app/api/contact/route.ts`), which sends via Resend. Validation uses Zod + React Hook Form on the client and Zod again on the server.

## Design Conventions

- Dark cinematic aesthetic — background `#080808`, text `#f0ede8`, accent gold `#c9a84c`
- Images default to grayscale with `group-hover:grayscale-0` reveal on hover
- All animations use Framer Motion with `whileInView` + `once: true` for scroll-triggered entrance
- Typography scale: display headings use `font-display` (Playfair Display italic for secondary lines), body/UI uses tracked uppercase `text-xs` labels
- Spacing: sections use `py-24 md:py-32`, page headers `pt-32 pb-24`, max content width `max-w-7xl`
