# Theme Generator

A real-time theme generator for **shadcn/ui** applications. Pick a primary color (or hit *Randomize*) and the whole interface — buttons, cards, tables, charts, borders, muted text — retints instantly across four realistic preview screens. Copy the generated CSS variables straight into your own shadcn project.

**Live demo:** [theme-generator-pi.vercel.app](https://theme-generator-pi.vercel.app/dashboard)

Built with **React 19**, **TypeScript**, **Vite**, **TailwindCSS**, and **Radix UI** primitives.

---

## Features

- **HSL color picker** with hex input — pick any color, no clamping on saturation or lightness.
- **Randomize button** — generates an aesthetically balanced palette in one click.
- **Automatic dark / light mode** — derived from the primary's luminance (manual toggle still available as an override).
- **Live preview across four screens** — Dashboard, Login, Blog, Orders. Every surface is driven by CSS variables, so the entire UI reskins in real time.
- **All palette roles auto-derived** — secondary, accent, muted, background, foreground, border, ring, destructive, and five chart colors are all computed from your primary.
- **Preview CSS** — slide-in panel that shows the full generated `:root { … } .dark { … }` block before you copy.
- **Copy CSS variables** — one click, paste into any shadcn project's `globals.css`.
- **Persists across reloads** — your last primary color and mode are saved to `localStorage`.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
```

Requires **Node 20+**.

---

## How the algorithm works

Every color in the palette is derived from a single HSL primary. See [src/lib/theme.ts](src/lib/theme.ts).

| Role | Derivation |
| --- | --- |
| **primary** | as picked |
| **secondary** | same hue as primary, ~40% of its saturation, soft lightness |
| **accent** | primary hue + 40°, scaled saturation |
| **background / card / popover** | primary hue, very low saturation (×0.2, floored at 6%), high lightness in light mode / low in dark |
| **foreground** | contrast partner of background |
| **muted / border / input** | primary hue, mid-low saturation, mid lightness |
| **destructive** | fixed red — needs to stay recognizable as "danger" |
| **chart-1..5** | spread around the color wheel from primary (0°, +40°, +180°, +90°, +270°) |
| **primaryForeground** | near-white or near-black, chosen via WCAG relative luminance of the primary |
| **mode** | `light` if relativeLuminance(primary) < 0.45, else `dark` |

This produces a palette where the *entire* UI carries a subtle tint of the chosen primary, not just the buttons.

---

## Using the generated theme in your own project

1. Click **Preview CSS** to inspect the output, or **Copy CSS variables** to put it on your clipboard.
2. Paste it into your shadcn project's global stylesheet (typically `app/globals.css` or `src/index.css`).
3. Make sure your `tailwind.config.js` is reading from the same CSS variables — the standard shadcn setup already does. If you don't have a shadcn project yet, see the [shadcn/ui docs](https://ui.shadcn.com/docs/installation).

The exported CSS uses the canonical shadcn variable names (`--primary`, `--secondary`, `--accent`, etc.) in the HSL triplet format (`H S% L%`).

---

## Project structure

```
src/
├── main.tsx                       # React root
├── App.tsx                        # ThemeProvider + Router
├── index.css                      # Tailwind layers + base CSS variables
├── lib/
│   ├── utils.ts                   # cn() helper
│   └── theme.ts                   # palette generation, apply, serialize, persist
├── context/
│   └── ThemeProvider.tsx          # theme state + side-effects
├── components/
│   ├── ui/                        # shadcn primitives (button, card, table, ...)
│   ├── theme/
│   │   ├── ThemeControls.tsx      # main controls panel
│   │   ├── PalettePreview.tsx     # 8 swatches with derivation labels
│   │   ├── ModeToggle.tsx
│   │   ├── CopyThemeButton.tsx
│   │   └── PreviewCssButton.tsx
│   └── layout/
│       ├── AppShell.tsx           # page shell (header + controls + preview)
│       └── NavTabs.tsx            # router-aware preview tabs
└── pages/
    ├── Dashboard.tsx              # stat cards, chart, recent transactions
    ├── Login.tsx                  # OAuth + email/password form
    ├── Blog.tsx                   # article grid with tags + authors
    └── Orders.tsx                 # filterable orders table
```

---

## Tech stack

| | |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | TailwindCSS 3, `tailwindcss-animate`, `class-variance-authority`, `tailwind-merge` |
| Components | shadcn/ui style, built on Radix UI primitives |
| Routing | React Router v7 |
| Color picker | `react-colorful` |
| Toasts | `sonner` |
| Icons | `lucide-react` |

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and produce a production bundle in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## License

MIT.
