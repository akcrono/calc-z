# Nocturne redesign: dark-theme relaunch of the calculator + guide

## Context

The user ran the calculator page through Claude Design (`claude.ai/design`), which
produced a high-fidelity handoff: `design_handoff_fern_calculator/` (a `.dc.html`
prototype + `README.md`), delivered as a zip to `~/Downloads`. The handoff proposes
a dark "Nocturne" visual theme and a restructured layout for the calculator page,
including what it describes as a new "time until reset" feature.

Reviewing the handoff against the existing codebase surfaced one important finding:
**the "time until reset" feature already exists.** `app/lib/calc.ts`'s `calculate()`
and `nextReset()` already compute the real daily reset time (22:00 America/New_York,
properly timezone-converted) and the before/after-reset relationship — the
handoff's own prototype only approximates this with a placeholder ("hours until
next UTC midnight") because the design tool had no access to the app's actual
logic. This redesign is therefore almost entirely a **re-skin and restructure**,
not new business logic.

Scoping questions with the user established:
- **Theme scope**: Nocturne fully replaces the current theme, and — per explicit
  correction — applies **site-wide** (calculator + guide page), not just the
  calculator. The existing `prefers-color-scheme` adaptive light/dark system is
  removed entirely; the app becomes fixed-dark everywhere.
- **Font**: switch from Geist Sans/Mono to Inter (per the handoff), since Geist
  Mono isn't used for anything else in the app.
- **New copy** (subhead, margin captions, "already reached" message, footer
  disclaimer, input placeholders): fully translated across all 8 locales, matching
  the app's existing full-i18n-coverage convention — but as a **separate commit**
  from the structural/visual redesign work.
- **App naming**: reject the handoff's shorter "Fern Calc" wordmark; keep
  "Last Z Fern Calculator" as both the nav wordmark and `t.appTitle` (browser tab
  title, guide page's title suffix) unchanged.
- **Emblem logo**: the handoff's nav has no logo, dropping the current animated
  hourglass `<Emblem />`. Decision: **stash, don't delete** — `emblem.tsx` stays in
  the repo, unused, for a possible future re-add, rather than being removed.

## Design

### Token system

Nocturne's palette lands as CSS custom properties in `app/globals.css`, replacing
the existing `--background`/`--foreground`/`--emblem-grad-*` vars and their
`prefers-color-scheme` override block (which goes away — no light variant):

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#161826` | page background |
| `--color-surface` | `#232532` | card / nav-surface background |
| `--color-text` | `#e9e9ed` | primary text (muted text: same color, 55–70% opacity) |
| `--color-accent` | `#9184d9` | links, focus rings, labels, kicker text |
| `--color-accent-800` / `--color-accent-100` | `#423a6a` / `#f5f4ff` | accent tag/badge fill+text |
| `--color-accent-300` | `#d2cefd` | error text on dark surface |
| `--color-neutral-800` / `--color-neutral-100` | `#3f424d` / `#f3f5fe` | neutral badge fill+text (the "after reset" pill) |
| `--color-divider` | `rgba(233,233,237,0.16)` | hairline borders/dividers |
| `--radius-md` | `8px` | cards, inputs, tags |
| `--shadow-sm` | `0 0 0 1px #3f424d` | card hairline elevation (not a border) |

Consumed via Tailwind arbitrary-value syntax (e.g. `bg-[var(--color-surface)]`),
mirroring the app's existing CSS-var-as-token pattern. Font switches to Inter,
loaded the same way Geist is today (`next/font/google`).

### Calculator page (`app/page.tsx`, `app/calculator-form.tsx`)

Restructured per the handoff, top to bottom:
1. Nav row: "Last Z Fern Calculator" wordmark (left) + language select (right) —
   no logo.
2. Eyebrow tag "Last Z: Survival Shooter", H1 "Fern reset calculator", subhead
   paragraph.
3. Card, inputs reordered to **storage → target → rate** (was rate → amount →
   needed), each with a placeholder (e.g. "e.g. 4300").
4. Faded divider.
5. Either:
   - Results row (3 tiles: time until target, time until reset, before/after-reset
     pill + margin caption "Xh Xm to spare" / "misses by Xh Xm"), shown when
     `rate > 0` and `calc.ts`'s `leftover > 0`; or
   - New "already reached" message, shown when `leftover <= 0`.
6. Guide banner: reused `<GuideBanner>`, resized to 600px fixed width
   (scaling down below that), left-aligned instead of the current
   full-card-width centered link.
7. New footer: faded divider + "Unofficial fan tool for Last Z: Survival
   Shooter." disclaimer.

**Reused as-is, not rebuilt:** `calc.ts`'s `calculate()`/`nextReset()` supply every
value — `hoursLeft` → "time until target" tile, `hoursBeforeReset` → "time until
reset" tile, `readyRelation` → the pill state, `Math.abs(resetOffset)` → the
margin caption's duration. The only new logic is a `formatDuration(hours)` helper
(→ `"Xd Xh Xm"`, matching the handoff's prototype algorithm: floor days, floor
remaining hours, round remaining minutes, roll 60m→+1h) and the `leftover <= 0`
already-reached branch.

### Guide page (`app/guide/guide-content.tsx`)

Re-skinned with the same Nocturne tokens (page background, nav/TOC surface, body
text, headings/links via accent, dividers). Structure is untouched — back link,
banner, table of contents, sections, and the existing RTL mechanism
(`RTL_LOCALES`, reactive `dir`) all stay exactly as they are today; this page had
no design spec of its own, it just needed to stop looking like a different app
next to the redesigned calculator.

### i18n

New keys — subhead, `..to spare`/`misses by ..` margin captions, the "already
reached" message, the footer disclaimer, and the three input placeholders — get
added to `Translations` and all 8 locale files, translated to the same bar as the
rest of the app's copy. **Landed as a separate commit** from the structural/visual
work, per the user's request. Placeholders keep their example numerals as-is in
every locale (e.g. `4300`) and translate only the lead-in text ("e.g." /
"p.ej." / etc.), consistent with how numbers are handled elsewhere in the app.

### Explicitly out of scope / unchanged

- `calc.ts`'s math and `nextReset()`'s timezone logic — no changes, just new
  consumers of existing outputs.
- Guide content and its existing translations — untouched, only the page's own
  chrome (background/surface/text/accent colors) changes.
- Routing, the `useLocalizedTitle` title-sync mechanism, `RTL_LOCALES`/RTL
  handling — all unchanged.
- The animated `<Emblem />` component is **not deleted** — it stays in the repo,
  simply unused by the redesigned calculator page, pending a possible future
  re-add.
- No light theme anywhere post-redesign; `prefers-color-scheme` handling is
  removed, not made to branch on the new tokens.

## Verification

Visual + functional, no new automated tests needed (this is a styling/structure
change over already-tested `calc.ts` logic):
1. `npm run dev`; confirm the calculator and guide pages both render the Nocturne
   palette consistently (no leftover amber/zinc/light-mode styling anywhere,
   including OS light-mode emulation — the app should look identical regardless
   of system theme now).
2. Walk through the calculator's three states: normal result (verify the "time
   until target"/"time until reset"/pill+margin values match what the old `dl`-based
   UI would have shown for the same inputs — i.e. `calc.ts`'s numbers are unchanged,
   only the presentation is new), the rate-validation error, and the new
   "already reached" state (target ≤ storage).
3. Confirm `formatDuration` matches the prototype's rounding behavior (e.g.
   minutes rolling to 60 bumps the hour, days/hours segments hidden when zero
   per the handoff's algorithm).
4. Confirm the guide banner on the calculator page is 600px wide, left-aligned,
   and scales down below 600px viewport width.
5. Switch through all 8 locales on both pages; confirm new strings (subhead,
   margin captions, already-reached message, footer, placeholders) are translated
   and RTL (Arabic) still mirrors correctly on both pages.
6. Confirm `emblem.tsx` still exists in the repo and still compiles (even though
   nothing renders it) — it should not be a dead import anywhere, just an unused,
   intact component.
