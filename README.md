# Divesh Jadhav — Portfolio

React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (new-york) + Motion.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit your content
All text lives in `src/data/portfolio.ts` — experience, projects, skills, stats, links.
Your photo is `src/assets/portrait.webp`.

## Structure
- `src/components/ui/` – shadcn/ui components (button, badge, card, tabs, dialog, tooltip, input, textarea, sonner)
- `src/components/site/` – page sections (hero, about, experience, skills, projects, contact, navbar, command menu, cursor)
- `src/index.css` – theme tokens (light + dark) and Tailwind setup

Add more shadcn components any time with `npx shadcn@latest add <name>` (components.json is configured).

## Features
- Light / dark mode (remembers choice, smooth view-transition)
- ⌘K / Ctrl+K command menu
- Scroll-spy navbar with animated pill, scroll progress bar, full-screen mobile menu
- 3D-tilt portrait with mouse parallax, rotating roles, magnetic buttons, custom cursor
- Tabbed experience timeline, animated counters, filterable skills, tilt project cards with detail dialogs
- Contact form (opens mail app), copy-email button with toast
- Responsive from 320px phones to wide desktops; respects reduced-motion

## Deploy
Push to GitHub and import into Vercel or Netlify (build: `npm run build`, output: `dist`).
