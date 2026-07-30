# Visual polish: Last Z-inspired amber/dark palette

## Context

`calcz-web` (the fern resource calculator port of `calcz.rb`) has working functionality — URL-synced inputs, live calculation, and stage-4 Tailwind styling (card layout, labeled inputs, results `<dl>`, red validation text). Before Vercel deployment, the user asked for the app to look "more professional."

Scoping questions narrowed this down:
- **Scope**: visual polish only (typography/spacing/color), no new generated image assets.
- **Theme handling**: support both light and dark mode automatically via Tailwind `dark:` variants, rather than a single fixed theme — motivated by the earlier black-on-black contrast bug that came from relying on unstyled browser/OS defaults.
- **Color direction**: tie the palette to *Last Z*, the idle/survival game this calculator's "fern" resource belongs to. A reference character-card image (`https://lastzdata.com/wp-content/uploads/2025/04/unblurimageai_upscaler_SmartSelect_20250330_230514_Last-Z-Shooter-Run.png`) was reviewed directly: dark charcoal background, ornate gold/amber metallic card frame, a red rarity badge, gold star rating.

Of three proposed approaches (minimal accent tint; amber/gold accent with a dark-first palette; a fuller ornate/bordered treatment echoing the card frame literally), the user approved the middle option: adopt the color language (dark charcoal + amber/gold accent, red kept for errors) without attempting to replicate literal game-UI chrome (no stars, no multi-layer bevels, no character art) in a utility calculator.

## Design

Pure color/utility-class changes to the two existing files — no new files, no new dependencies, no `tailwind.config` changes (all colors come from Tailwind's built-in `amber`/`zinc`/`red` palettes).

### Palette

| Role | Dark (default) | Light |
|---|---|---|
| Page background | `bg-zinc-950` | `bg-amber-50` |
| Card background | `bg-zinc-900` | `bg-white` |
| Card border | `border-amber-500/40` | `border-amber-300` |
| Body text | `text-zinc-100` | `text-zinc-900` |
| Secondary text | `text-zinc-400` | `text-zinc-600` |
| Accent (focus rings, label emphasis, headline result) | `amber-400` | `amber-600`/`amber-800` |
| Validation error | `text-red-400` | `text-red-600` |

### Where it applies

- **`app/page.tsx`**: `<main>` gains the page-background classes above (currently unstyled white/transparent).
- **`app/calculator-form.tsx` card container**: border and shadow become amber-tinted per the table above, replacing the current plain gray border.
- **Inputs**: neutral border by default; on focus, `focus:ring-2 focus:ring-amber-500 focus:border-amber-500` replaces the browser default blue focus outline with the gold accent.
- **Labels**: `text-amber-800 dark:text-amber-300` — a light thread of gold through the form without overwhelming the layout.
- **Results `<dl>`**: the "Ready" row (the headline number) gets `font-semibold text-amber-600 dark:text-amber-400`; leftover/hours rows stay neutral secondary-text color.
- **Validation message**: stays `text-red-600`, adds `dark:text-red-400` — the one color that already happens to echo the reference card's rarity-badge red.

### Explicitly out of scope

- No character art, stars, badges, or multi-layer/gradient "card frame" borders — those were part of the rejected fuller-ornate option.
- No new npm packages, no custom Tailwind theme tokens/config edits.
- No changes to `app/lib/calc.ts` logic — this is styling-only.

## Verification

Visual-only, no automated tests: load `npm run dev` in the browser under both system light and dark mode (OS toggle or DevTools rendering emulation) and confirm:
1. Contrast/legibility of all text and borders in both themes.
2. Inputs are clearly visible/locatable in dark mode specifically (regression check against the earlier black-on-black bug).
3. Focus states show the amber ring, not the browser default blue.
