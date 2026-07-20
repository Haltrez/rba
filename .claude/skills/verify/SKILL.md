---
name: verify
description: Build, run and drive the rba.lv portfolio site to verify changes end to end.
---

# Verify rba.lv

Single-page Next.js (App Router) + Tailwind v4 + Framer Motion static site. No backend.

## Build and launch

```bash
npm install            # TypeScript must stay on v5 (v7 breaks next.config.ts loading)
npm run build          # all routes prerender as Static
PORT=3100 npm run start
```

Gotcha: a previous `next-server` may still hold the port; a new start then dies
with EADDRINUSE while the old server serves stale HTML whose CSS hash 400s.
Kill by PID first: `ps aux | grep next-server`, `kill -9 <pid>`.

## Drive (playwright-core + system Chromium)

Launch with `executablePath: "/opt/pw-browsers/chromium"`. Flows worth driving:

- Desktop 1440x900: click each header nav link, confirm smooth scroll and that
  the active link picks up `text-accent` (IntersectionObserver pill).
- Contact form: empty submit must show native validation on `#name`; filled
  submit with empty `formspreeId` must NOT hit formspree (mailto branch).
- CV button `a[href="/cv/roberts-buda-cv.pdf"]` must trigger a download.
- Mobile 390x844 (`isMobile: true`): `document.documentElement.scrollWidth`
  must equal 390 (min-w-0 guards the CodeCard pre from widening the grid).
- Mobile menu: open via `button[aria-label="Atvērt izvēlni"]`, click a link
  with `.last()` (two links share each href: desktop ul + mobile panel; strict
  mode fails otherwise), confirm menu closes AND window.scrollY actually moved.
  Menu links scroll via scrollIntoView after a 320ms delay because the close
  animation cancels native fragment smooth scroll.
- `reducedMotion: "reduce"` context: h1 opacity must be 1 (Reveal initial=false path).
- Assert no console errors, no pageerror, no responses >= 400.

Static assets to spot-check: /og.png /cv/roberts-buda-cv.pdf /robots.txt /sitemap.xml /icon.svg.
