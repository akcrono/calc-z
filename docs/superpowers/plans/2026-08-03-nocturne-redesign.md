# Nocturne Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin and restructure the calculator page (and re-skin the guide page) into the fixed-dark "Nocturne" theme from the Claude Design handoff, reusing the app's existing reset-time logic rather than the handoff's placeholder approximation.

**Architecture:** Nocturne's palette lands as CSS custom properties in `globals.css`, consumed everywhere via Tailwind arbitrary-value syntax (`bg-[var(--color-surface)]`). `calculator-form.tsx` is restructured to match the handoff's layout while calling the same `calc.ts` functions it already calls today — only the presentation and a couple of small pieces of new derived state (an "already reached" check, a duration formatter) are new. `guide-content.tsx` gets the same token swap with no structural changes. New copy ships in English across all 8 locale files first (so every commit compiles and works), then a final commit fills in the other 7 locales' translations.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. No test runner is configured in this repo and none is being added — verification is `tsc --noEmit` for type safety plus manual/Playwright-driven visual and behavioral checks, matching how every other feature in this codebase has been verified so far.

## Global Constraints

- Full site (calculator + guide pages) uses the Nocturne palette; the `prefers-color-scheme` adaptive light/dark system is removed entirely — no light theme remains anywhere.
- Font is Inter (weights 400/500/600/700) app-wide, replacing Geist Sans/Mono.
- The animated `<Emblem />` component is **not deleted** — `app/emblem.tsx` stays in the repo, simply unused by the redesigned calculator page.
- New/changed translation keys go into all 8 locale files in the structural commit (Task 3), so every file still type-checks — but non-English placeholder VALUES differ by kind: the 4 renamed/reworded existing keys (`neededLabel`, `timeUntilTargetLabel`, `timeUntilResetLabel`, `resetVerdictLabel`) keep their OLD already-translated text under the new key/wording for now; the 9 genuinely-new keys (nothing to reuse) get English text as the only option. Real per-locale translations for both kinds land in a separate, final commit (Task 7).
- `app/lib/calc.ts` is not modified — its `calculate()`/`nextReset()`/`validateRate()` outputs are reused as-is.
- Design tokens are referenced via CSS custom properties (`var(--color-bg)` etc.), not hardcoded hex values, per the approved architecture.

---

### Task 1: Nocturne design tokens, Inter font, and the shared guide-banner token fix

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/guide-banner.tsx`

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`, `--color-accent-800`, `--color-accent-100`, `--color-accent-300`, `--color-neutral-800`, `--color-neutral-100`, `--color-divider`, `--radius-md`, `--radius-sm`, `--shadow-sm`, available globally from `:root`. Also `--font-inter` (from `next/font/google`), wired to Tailwind's `font-sans`.

- [ ] **Step 1: Replace the token block and remove the light/dark media query in `app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --emblem-grad-a: #fbbf24; /* amber-400 */
  --emblem-grad-b: #f43f5e; /* rose-500 */
  --emblem-grad-c: #92400e; /* amber-800 */

  /* Nocturne palette — fixed dark theme, no light variant */
  --color-bg: #161826;
  --color-surface: #232532;
  --color-text: #e9e9ed;
  --color-accent: #9184d9;
  --color-accent-800: #423a6a;
  --color-accent-100: #f5f4ff;
  --color-accent-300: #d2cefd;
  --color-neutral-800: #3f424d;
  --color-neutral-100: #f3f5fe;
  --color-divider: rgba(233, 233, 237, 0.16);
  --radius-md: 8px;
  --radius-sm: 6px;
  --shadow-sm: 0 0 0 1px #3f424d;
}

@theme inline {
  --font-sans: var(--font-inter);
  --animate-hourglass: hourglass-flip 10s ease-in-out infinite,
    hourglass-glow 2.5s ease-in-out infinite;
  --animate-sand-top: sand-drain-top 10s ease-in-out infinite;
  --animate-sand-bottom: sand-drain-bottom 10s ease-in-out infinite;
}

/* One full cycle = two flips (0deg -> 180deg -> 360deg, i.e. back to 0deg),
   so it always spins the same direction and loops with no snap-back. */
@keyframes hourglass-flip {
  0%, 45% {
    transform: rotate(0deg);
  }
  50%, 95% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes hourglass-glow {
  0%, 100% {
    opacity: 0.75;
    filter: drop-shadow(0 0 0px currentColor);
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 4px currentColor);
  }
}

/* Sand keyframes are phase-locked to hourglass-flip above: each sand shape
   is drawn at a fixed local position (top bulb / bottom bulb) and the group
   rotation (not these) is what moves it to the screen's top or bottom. So
   "top" here fades out while it's the current screen-top bulb draining, and
   fills back in while it's the current screen-bottom bulb collecting sand
   from the other one - always ending full right as the next flip lands it
   back on top. */
@keyframes sand-drain-top {
  0% { opacity: 0.8; }
  45% { opacity: 0; }
  50% { opacity: 0; }
  95% { opacity: 0.8; }
  100% { opacity: 0.8; }
}

@keyframes sand-drain-bottom {
  0% { opacity: 0; }
  45% { opacity: 0.8; }
  50% { opacity: 0.8; }
  95% { opacity: 0; }
  100% { opacity: 0; }
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-inter), Arial, Helvetica, sans-serif;
}
```

(The `--emblem-grad-*` vars and hourglass/sand keyframes are untouched — `Emblem` is stashed, not deleted, so its styling stays intact for a future re-add.)

(**Correction from the final whole-branch review:** the `body` rule's `font-family` above originally read just `Arial, Helvetica, sans-serif`, carried forward unchanged from the pre-redesign file. That silently overrides the Inter font `app/layout.tsx` wires up via Tailwind's `html`-level preflight rule — `body`'s own explicit declaration wins the cascade over an inherited default — so despite Inter being a stated Global Constraint, it never actually rendered. Fixed by prepending `var(--font-inter)` to the fallback chain. This was a plan-authoring defect: no task-scoped review could catch it, since it only becomes visible by inspecting the actually-compiled/served stylesheet, which is exactly what the whole-branch review did.)

- [ ] **Step 2: Swap Geist for Inter in `app/layout.tsx`**

Change the font import and usages:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { translations } from "./lib/translations";
import { detectLocale } from "./lib/locale-server";
import { LocaleProvider } from "./lib/locale-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  return {
    title: translations[locale].appTitle,
    description: translations[locale].appDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await detectLocale();

  return (
    <html
      lang={initialLocale}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Update `app/guide-banner.tsx` to use the new radius/shadow tokens**

Replace the `className`:

```tsx
import Image from 'next/image';

export default function GuideBanner({ priority }: { priority?: boolean }) {
  return (
    <Image
      src="/guide-banner.png"
      alt="Last Z: Survival Shooter — An Akcrono Guide"
      width={2000}
      height={848}
      priority={priority}
      className="w-full h-auto rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]"
    />
  );
}
```

- [ ] **Step 4: Verify it compiles and the page renders the new palette**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `lsof -ti:3000 -sTCP:LISTEN | xargs -r kill; npm run dev &` then `sleep 2 && curl -sf http://localhost:3000 -o /dev/null -w "%{http_code}\n"`
Expected: `200`.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx app/guide-banner.tsx
git commit -m "Introduce Nocturne design tokens and switch to Inter"
```

---

### Task 2: `formatDuration` helper

**Files:**
- Create: `app/lib/format-duration.ts`

**Interfaces:**
- Produces: `formatDuration(totalHours: number): string` — e.g. `formatDuration(25)` → `"1d 1h 0m"`.

- [ ] **Step 1: Write the implementation**

```ts
/** Formats a duration given in hours as "Xd Xh Xm". Days/hours segments are
 * omitted when zero (minutes are always shown). Matches the Claude Design
 * handoff's prototype algorithm exactly, including its rounding: if the
 * rounded minutes hit 60, they roll over into hours — but that carry does
 * NOT cascade into days (so e.g. 23.9999 hours renders as "24h 0m", not
 * "1d 0h 0m"). This is a faithful port of the approved design, not a fix. */
export function formatDuration(totalHours: number): string {
  const days = Math.floor(totalHours / 24);
  let hours = Math.floor(totalHours - days * 24);
  let minutes = Math.round((totalHours - days * 24 - hours) * 60);
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(' ');
}
```

- [ ] **Step 2: Verify behavior with a throwaway script (no test runner in this repo)**

```bash
cat > /tmp/check-format-duration.mjs << 'EOF'
import { formatDuration } from '/Users/akcrono/Workspace/calc-z/app/lib/format-duration.ts';

const cases = [
  [0, '0m'],
  [0.5, '30m'],
  [1, '1h 0m'],
  [2.1, '2h 6m'],
  [25, '1d 1h 0m'],
  [23.9999, '24h 0m'],
];

let failed = false;
for (const [input, expected] of cases) {
  const actual = formatDuration(input);
  const ok = actual === expected;
  if (!ok) failed = true;
  console.log(`${ok ? 'PASS' : 'FAIL'} formatDuration(${input}) = "${actual}" (expected "${expected}")`);
}
process.exit(failed ? 1 : 0);
EOF
npx tsx /tmp/check-format-duration.mjs
rm /tmp/check-format-duration.mjs
```

Expected: all six lines print `PASS`, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add app/lib/format-duration.ts
git commit -m "Add formatDuration helper for the Nocturne redesign"
```

---

### Task 3: New/renamed translation keys (English content, all 8 files compile)

**Files:**
- Modify: `app/lib/translations/types.ts`
- Modify: `app/lib/translations/en.ts`
- Modify: `app/lib/translations/es.ts`
- Modify: `app/lib/translations/it.ts`
- Modify: `app/lib/translations/ko.ts`
- Modify: `app/lib/translations/ja.ts`
- Modify: `app/lib/translations/zh-CN.ts`
- Modify: `app/lib/translations/zh-TW.ts`
- Modify: `app/lib/translations/ar.ts`

**Interfaces:**
- Produces: `Translations` interface with 3 keys renamed (`hoursLeftLabel`→`timeUntilTargetLabel`, `hoursBeforeResetLabel`→`timeUntilResetLabel`, `readyLabel`→`resetVerdictLabel`) and 10 new keys (`heroEyebrow`, `calculatorHeading`, `calculatorSubhead`, `storagePlaceholder`, `targetPlaceholder`, `ratePlaceholder`, `marginToSpare`, `marginMissesBy`, `alreadyReachedMessage`, `footerDisclaimer`). `marginToSpare`/`marginMissesBy` contain a literal `{duration}` placeholder substring, replaced via `.replace('{duration}', ...)` by the caller (Task 4) — this is the only templating convention in the app, documented here since there's no precedent elsewhere.
- Non-English locale files carry the **old** translated text under the renamed keys for now (unchanged meaning, just relocated), and **English** text for the 9 genuinely-new keys (nothing to reuse) — both get replaced with real per-locale translations in Task 7. `heroEyebrow` is the one new key that's already final everywhere: it's the game's own title, kept identical (untranslated) in all 8 locales from this commit.

- [ ] **Step 1: Update the interface**

In `app/lib/translations/types.ts`, replace the file with:

```ts
export interface Translations {
  appTitle: string;
  appDescription: string;
  loading: string;
  rateLabel: string;
  amountLabel: string;
  neededLabel: string;
  timeUntilTargetLabel: string;
  timeUntilResetLabel: string;
  resetVerdictLabel: string;
  readyBefore: string;
  readyAfter: string;
  rateError: string;
  languageLabel: string;
  guideLinkLabel: string;
  guideBackLink: string;
  guideTitle: string;
  guideTocLabel: string;
  guideDescription: string;
  heroEyebrow: string;
  calculatorHeading: string;
  calculatorSubhead: string;
  storagePlaceholder: string;
  targetPlaceholder: string;
  ratePlaceholder: string;
  marginToSpare: string;
  marginMissesBy: string;
  alreadyReachedMessage: string;
  footerDisclaimer: string;
}
```

- [ ] **Step 2: Update `app/lib/translations/en.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const en: Translations = {
  appTitle: 'Last Z Fern Calculator',
  appDescription: 'Calculate hours to reach your fern target in Last Z: Survival Shooter.',
  loading: 'Loading…',
  rateLabel: 'Fernleafs per hour',
  amountLabel: 'Fernleafs in storage',
  neededLabel: 'Total needed for next upgrade',
  timeUntilTargetLabel: 'Time until target',
  timeUntilResetLabel: 'Time until reset',
  resetVerdictLabel: 'Vs. server reset',
  readyBefore: 'Before reset',
  readyAfter: 'After reset',
  rateError: 'Enter a rate greater than 0.',
  languageLabel: 'Language',
  guideLinkLabel: 'Gameplay Guides',
  guideBackLink: '← Back to calculator',
  guideTitle: 'Gameplay Guide',
  guideTocLabel: 'Table of contents',
  guideDescription:
    'Strategy tips and priority lists for Last Z: trucks, bounties, shops, hero battlefield, and more.',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default en;
```

- [ ] **Step 3: Update `app/lib/translations/es.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const es: Translations = {
  appTitle: 'Calculadora de Helechos de Last Z',
  appDescription: 'Calcula las horas para el reinicio y el tiempo necesario para alcanzar tu objetivo de helechos.',
  loading: 'Cargando…',
  rateLabel: 'Hojas de helecho por hora',
  amountLabel: 'Hojas de helecho almacenadas',
  neededLabel: 'Total de hojas de helecho necesarias para la próxima mejora',
  timeUntilTargetLabel: 'Horas antes de conseguir los helechos',
  timeUntilResetLabel: 'Horas antes del reinicio',
  resetVerdictLabel: 'Listo',
  readyBefore: 'Antes del reinicio',
  readyAfter: 'Después del reinicio',
  rateError: 'Introduce una tasa mayor que 0.',
  languageLabel: 'Idioma',
  guideLinkLabel: 'Guías de juego',
  guideBackLink: '← Volver a la calculadora',
  guideTitle: 'Guía de juego',
  guideTocLabel: 'Índice',
  guideDescription:
    'Consejos de estrategia y listas de prioridades para Last Z: camiones, recompensas, tiendas, campo de batalla de héroes y más.',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default es;
```

- [ ] **Step 4: Update `app/lib/translations/it.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const it: Translations = {
  appTitle: 'Calcolatore di Felci di Last Z',
  appDescription: 'Calcola le ore al reset e il tempo necessario per raggiungere il tuo obiettivo di felci.',
  loading: 'Caricamento…',
  rateLabel: "Foglie di felce all'ora",
  amountLabel: 'Foglie di felce in magazzino',
  neededLabel: 'Totale foglie di felce necessarie per il prossimo potenziamento',
  timeUntilTargetLabel: 'Ore prima di ottenere le felci',
  timeUntilResetLabel: 'Ore prima del reset',
  resetVerdictLabel: 'Pronto',
  readyBefore: 'Prima del reset',
  readyAfter: 'Dopo il reset',
  rateError: 'Inserisci un tasso maggiore di 0.',
  languageLabel: 'Lingua',
  guideLinkLabel: 'Guide di gioco',
  guideBackLink: '← Torna al calcolatore',
  guideTitle: 'Guida di gioco',
  guideTocLabel: 'Indice',
  guideDescription:
    'Consigli strategici ed elenchi di priorità per Last Z: camion, taglie, negozi, campo di battaglia degli eroi e altro ancora.',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default it;
```

- [ ] **Step 5: Update `app/lib/translations/ko.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const ko: Translations = {
  appTitle: '라스트 Z 고사리 계산기',
  appDescription: '리셋까지 남은 시간과 목표한 고사리 양에 도달하는 데 필요한 시간을 계산합니다.',
  loading: '로딩 중…',
  rateLabel: '시간당 고사리 잎',
  amountLabel: '보유 중인 고사리 잎',
  neededLabel: '다음 업그레이드에 필요한 총 고사리 잎',
  timeUntilTargetLabel: '고사리 잎 확보까지 남은 시간',
  timeUntilResetLabel: '리셋까지 남은 시간',
  resetVerdictLabel: '준비 상태',
  readyBefore: '리셋 전',
  readyAfter: '리셋 후',
  rateError: '0보다 큰 값을 입력하세요.',
  languageLabel: '언어',
  guideLinkLabel: '게임 가이드',
  guideBackLink: '← 계산기로 돌아가기',
  guideTitle: '게임 가이드',
  guideTocLabel: '목차',
  guideDescription: 'Last Z 전략 팁과 우선순위 목록: 트럭, 현상수배, 상점, 영웅 전장 등.',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default ko;
```

- [ ] **Step 6: Update `app/lib/translations/ja.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const ja: Translations = {
  appTitle: 'ラストZ シダ計算機',
  appDescription: 'リセットまでの時間と、目標のシダ量に到達するまでの時間を計算します。',
  loading: '読み込み中…',
  rateLabel: '1時間あたりのシダの葉',
  amountLabel: '保有しているシダの葉',
  neededLabel: '次のアップグレードに必要なシダの葉の合計',
  timeUntilTargetLabel: 'シダの葉獲得までの時間',
  timeUntilResetLabel: 'リセットまでの時間',
  resetVerdictLabel: '状態',
  readyBefore: 'リセット前',
  readyAfter: 'リセット後',
  rateError: '0より大きい値を入力してください。',
  languageLabel: '言語',
  guideLinkLabel: 'ゲームガイド',
  guideBackLink: '← 計算機に戻る',
  guideTitle: 'ゲームガイド',
  guideTocLabel: '目次',
  guideDescription:
    'Last Zの戦略のコツと優先順位リスト:トラック、バウンティ、ショップ、ヒーローバトルフィールドなど。',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default ja;
```

- [ ] **Step 7: Update `app/lib/translations/zh-CN.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const zhCN: Translations = {
  appTitle: 'Last Z 蕨叶计算器',
  appDescription: '计算距离重置的时间，以及达到目标蕨叶数量所需的时间。',
  loading: '加载中…',
  rateLabel: '每小时蕨叶数',
  amountLabel: '库存蕨叶数',
  neededLabel: '下次升级所需的蕨叶总数',
  timeUntilTargetLabel: '获得蕨叶所需时间',
  timeUntilResetLabel: '距离重置的时间',
  resetVerdictLabel: '状态',
  readyBefore: '重置前',
  readyAfter: '重置后',
  rateError: '请输入大于 0 的数值。',
  languageLabel: '语言',
  guideLinkLabel: '游戏攻略',
  guideBackLink: '← 返回计算器',
  guideTitle: '游戏攻略',
  guideTocLabel: '目录',
  guideDescription: 'Last Z 攻略技巧与优先级列表：卡车、悬赏、商店、英雄战场等。',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default zhCN;
```

- [ ] **Step 8: Update `app/lib/translations/zh-TW.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const zhTW: Translations = {
  appTitle: 'Last Z 蕨葉計算機',
  appDescription: '計算距離重置的時間，以及達到目標蕨葉數量所需的時間。',
  loading: '載入中…',
  rateLabel: '每小時蕨葉數',
  amountLabel: '庫存蕨葉數',
  neededLabel: '下次升級所需的蕨葉總數',
  timeUntilTargetLabel: '獲得蕨葉所需時間',
  timeUntilResetLabel: '距離重置的時間',
  resetVerdictLabel: '狀態',
  readyBefore: '重置前',
  readyAfter: '重置後',
  rateError: '請輸入大於 0 的數值。',
  languageLabel: '語言',
  guideLinkLabel: '遊戲攻略',
  guideBackLink: '← 返回計算機',
  guideTitle: '遊戲攻略',
  guideTocLabel: '目錄',
  guideDescription: 'Last Z 攻略技巧與優先順序清單：卡車、懸賞、商店、英雄戰場等。',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default zhTW;
```

- [ ] **Step 9: Update `app/lib/translations/ar.ts`**

Replace the file with:

```ts
import type { Translations } from './types';

const ar: Translations = {
  appTitle: 'حاسبة أوراق السرخس - لاست Z',
  appDescription: 'احسب الساعات المتبقية حتى إعادة التعيين والوقت اللازم للوصول إلى هدفك من أوراق السرخس.',
  loading: 'جارٍ التحميل…',
  rateLabel: 'أوراق السرخس في الساعة',
  amountLabel: 'أوراق السرخس المخزّنة',
  neededLabel: 'إجمالي أوراق السرخس اللازمة للترقية التالية',
  timeUntilTargetLabel: 'الساعات المتبقية للحصول على أوراق السرخس',
  timeUntilResetLabel: 'الساعات المتبقية حتى إعادة التعيين',
  resetVerdictLabel: 'جاهز',
  readyBefore: 'قبل إعادة التعيين',
  readyAfter: 'بعد إعادة التعيين',
  rateError: 'أدخل معدلاً أكبر من 0.',
  languageLabel: 'اللغة',
  guideLinkLabel: 'أدلة اللعبة',
  guideBackLink: '← العودة إلى الحاسبة',
  guideTitle: 'دليل اللعبة',
  guideTocLabel: 'جدول المحتويات',
  guideDescription:
    'نصائح استراتيجية وقوائم أولويات لـ Last Z: الشاحنات، المكافآت، المتاجر، ساحة معركة الأبطال، والمزيد.',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default ar;
```

- [ ] **Step 10: Verify**

Run: `npx tsc --noEmit`
Expected: **exactly 3 errors, all in `app/calculator-form.tsx`**, on the lines referencing `t.hoursLeftLabel`, `t.hoursBeforeResetLabel`, and `t.readyLabel` — those are the pre-rename key names this task just removed from `Translations`. This is expected and correct at this point in the sequence: `calculator-form.tsx` isn't rewritten until Task 4, which is the one that switches it to the new key names. If `tsc` reports errors anywhere else, or a different count/location, stop and treat that as a real problem — but these specific 3 are the expected, known, temporary state between Task 3 and Task 4 within this one working branch (nothing merges to main until the whole plan is done). This also proves all 8 locale files satisfy the updated `Translations` interface — a missing/mistyped key in any locale file would show up as an *additional* error beyond these 3.

- [ ] **Step 11: Commit**

```bash
git add app/lib/translations/
git commit -m "Add Nocturne redesign copy (English; other locales follow in a later commit)"
```

---

### Task 4: Rebuild `calculator-form.tsx`

**Files:**
- Modify: `app/calculator-form.tsx`

**Interfaces:**
- Consumes: `calculate`, `validateRate` from `./lib/calc` (unchanged signatures); `useLocale`, `useLocalizedTitle` from `./lib/locale-context`; `formatDuration` from `./lib/format-duration` (Task 2); all `Translations` keys from Task 3; `GuideBanner` from `./guide-banner`; `LanguageSwitcher` from `./language-switcher`.
- Produces: the redesigned calculator page body (default export `CalculatorForm`), same as today — still rendered by `app/page.tsx` with no changes needed there.

Behavior notes carried over from the handoff's README (Interactions & Behavior section), since they differ slightly from today's app:
- The rate error is now shown **inline under the rate field** (not replacing the whole results section), and only once a rate has actually been typed (`rateInput !== ''`).
- A new "already reached" state (`leftover <= 0`, guarded so it doesn't fire on a fully blank form) shows independently of rate validity — it can appear even before a rate is entered.
- The results tiles only show when the rate is valid **and** there's a positive amount left to earn.

- [ ] **Step 1: Replace the file**

```tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { calculate, validateRate } from './lib/calc';
import { useLocale, useLocalizedTitle } from './lib/locale-context';
import { formatDuration } from './lib/format-duration';
import LanguageSwitcher from './language-switcher';
import GuideBanner from './guide-banner';

export default function CalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  useLocalizedTitle(t.appTitle);

  const [rateInput, setRateInput] = useState(() => searchParams.get('rate') ?? '');
  const [amountInput, setAmountInput] = useState(() => searchParams.get('amount') ?? '');
  const [neededInput, setNeededInput] = useState(() => searchParams.get('needed') ?? '');

  function updateParams(rate: string, amount: string, needed: string) {
    const params = new URLSearchParams();
    if (rate) params.set('rate', rate);
    if (amount) params.set('amount', amount);
    if (needed) params.set('needed', needed);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function parseOrZero(value: string): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function handleRateChange(value: string) {
    setRateInput(value);
    updateParams(value, amountInput, neededInput);
  }

  function handleAmountChange(value: string) {
    setAmountInput(value);
    updateParams(rateInput, value, neededInput);
  }

  function handleNeededChange(value: string) {
    setNeededInput(value);
    updateParams(rateInput, amountInput, value);
  }

  const rate = Number(rateInput);
  const amount = parseOrZero(amountInput);
  const needed = parseOrZero(neededInput);
  const leftover = needed - amount;

  const validation = validateRate(rate);
  const result = validation.valid ? calculate({ rate, amount, needed }) : null;

  const showRateError = rateInput !== '' && !validation.valid;
  const alreadyReached = neededInput !== '' && leftover <= 0;
  const hasResult = validation.valid && result !== null && leftover > 0;

  const marginLabel =
    result && hasResult
      ? result.readyRelation === 'before'
        ? t.marginToSpare.replace('{duration}', formatDuration(Math.abs(result.resetOffset)))
        : t.marginMissesBy.replace('{duration}', formatDuration(Math.abs(result.resetOffset)))
      : '';
  const verdictBg = result?.readyRelation === 'before' ? 'var(--color-accent-800)' : 'var(--color-neutral-800)';
  const verdictColor = result?.readyRelation === 'before' ? 'var(--color-accent-100)' : 'var(--color-neutral-100)';

  return (
    <div className="relative w-full max-w-[760px]">
      <LanguageSwitcher />
      <span className="font-medium text-[var(--color-text)]">{t.appTitle}</span>

      <div className="mt-8">
        <div
          className="inline-block text-[10px] uppercase tracking-[0.1em] px-[10px] py-[3px] rounded-[var(--radius-sm)] mb-3"
          style={{ background: 'var(--color-accent-800)', color: 'var(--color-accent-100)' }}
        >
          {t.heroEyebrow}
        </div>
        <h1 className="text-[42px] leading-[1.12] tracking-[-0.015em] font-medium text-[var(--color-text)]">
          {t.calculatorHeading}
        </h1>
        <p className="text-[var(--color-text)] opacity-70 max-w-[46ch] mb-8 mt-2">{t.calculatorSubhead}</p>
      </div>

      <div
        className="rounded-lg p-6 flex flex-col gap-4"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 basis-[200px]">
            <label htmlFor="storage" className="block text-xs opacity-70 mb-1 text-[var(--color-text)]">{t.amountLabel}</label>
            <input
              id="storage"
              type="number"
              min="0"
              step="any"
              placeholder={t.storagePlaceholder}
              value={amountInput}
              onChange={e => handleAmountChange(e.target.value)}
              className="w-full min-h-9 rounded-[var(--radius-md)] px-3 bg-[var(--color-surface)] border border-[var(--color-divider)] text-[var(--color-text)] hover:border-white/30 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div className="flex-1 basis-[200px]">
            <label htmlFor="target" className="block text-xs opacity-70 mb-1 text-[var(--color-text)]">{t.neededLabel}</label>
            <input
              id="target"
              type="number"
              min="0"
              step="any"
              placeholder={t.targetPlaceholder}
              value={neededInput}
              onChange={e => handleNeededChange(e.target.value)}
              className="w-full min-h-9 rounded-[var(--radius-md)] px-3 bg-[var(--color-surface)] border border-[var(--color-divider)] text-[var(--color-text)] hover:border-white/30 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div className="flex-1 basis-[200px]">
            <label htmlFor="rate" className="block text-xs opacity-70 mb-1 text-[var(--color-text)]">{t.rateLabel}</label>
            <input
              id="rate"
              type="number"
              min="0"
              step="any"
              placeholder={t.ratePlaceholder}
              value={rateInput}
              onChange={e => handleRateChange(e.target.value)}
              className="w-full min-h-9 rounded-[var(--radius-md)] px-3 bg-[var(--color-surface)] border border-[var(--color-divider)] text-[var(--color-text)] hover:border-white/30 focus:outline-none focus:border-[var(--color-accent)]"
            />
            {showRateError && (
              <div className="text-xs mt-[5px]" style={{ color: 'var(--color-accent-300)' }}>
                {t.rateError}
              </div>
            )}
          </div>
        </div>

        {(hasResult || alreadyReached) && (
          <div
            className="h-px my-1"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-divider) 48px, var(--color-divider) calc(100% - 48px), transparent)',
            }}
          />
        )}

        {hasResult && result ? (
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.timeUntilTargetLabel}
              </div>
              <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">
                {formatDuration(result.hoursLeft)}
              </h3>
            </div>
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.timeUntilResetLabel}
              </div>
              <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">
                {formatDuration(result.hoursBeforeReset)}
              </h3>
            </div>
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.resetVerdictLabel}
              </div>
              <div
                className="inline-block text-[13px] font-medium px-3 py-1 rounded-[var(--radius-sm)]"
                style={{ background: verdictBg, color: verdictColor }}
              >
                {result.readyRelation === 'after' ? t.readyAfter : t.readyBefore}
              </div>
              <div className="text-xs mt-[5px] opacity-70 text-[var(--color-text)]">{marginLabel}</div>
            </div>
          </div>
        ) : alreadyReached ? (
          <p className="text-sm opacity-85 text-[var(--color-text)]">{t.alreadyReachedMessage}</p>
        ) : null}
      </div>

      <div className="mt-8">
        <Link
          href="/guide"
          aria-label={t.guideLinkLabel}
          className="block w-[600px] max-w-full rounded-[var(--radius-md)] overflow-hidden"
        >
          <GuideBanner />
        </Link>
      </div>

      <div className="mt-8 pt-4">
        <div className="h-px mb-4" style={{ background: 'var(--color-divider)' }} />
        <p className="text-xs opacity-70 text-[var(--color-text)]">{t.footerDisclaimer}</p>
      </div>
    </div>
  );
}
```

(**Correction from the final whole-branch review:** three fixes are folded into the code above that weren't in the original version of this task. (1) `alreadyReached` now requires `neededInput !== ''` — the original `leftover <= 0 && (amountInput !== '' || neededInput !== '')` let the "already reached" message fire the moment a user typed a storage value alone, before entering any target, since storage is now the first field in the reordered layout. (2) Each `<label>`/`<input>` pair now has matching `htmlFor`/`id` (`storage`/`target`/`rate`) — the original code lost this association entirely, a real accessibility regression from the pre-redesign version. (3) The divider between the input row and the results section is now wrapped in `{(hasResult || alreadyReached) && (...)}` — previously it rendered unconditionally, leaving a dangling hairline under nothing on a pristine empty form. None of these were catchable by a task-scoped review checking this code against its own brief, since the brief itself specified the flawed version.)

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors. (`Emblem` is no longer imported here — confirm there's no unused-import lint error either: `npm run lint`.)

- [ ] **Step 3: Commit**

```bash
git add app/calculator-form.tsx
git commit -m "Rebuild calculator page in the Nocturne layout"
```

---

### Task 5: Re-skin `guide-content.tsx`

**Files:**
- Modify: `app/guide/guide-content.tsx`

**Interfaces:**
- Consumes: the same tokens as Task 4. No prop/behavior changes — same component signature, same `GuideContent` default export.

- [ ] **Step 1: Swap the amber/zinc classes for Nocturne tokens**

Replace the file with:

```tsx
'use client';

import Link from 'next/link';
import { useLocale, useLocalizedTitle } from '../lib/locale-context';
import { RTL_LOCALES } from '../lib/translations';
import { guideSectionsByLocale } from '../lib/guide/sections';
import GuideBanner from '../guide-banner';
import LanguageSwitcher from '../language-switcher';

export default function GuideContent() {
  const { locale, t } = useLocale();
  useLocalizedTitle(`${t.guideTitle} — ${t.appTitle}`);

  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
  const guideSections = guideSectionsByLocale[locale];

  return (
    <main dir={dir} className="min-h-screen p-4 bg-[var(--color-bg)]">
      <div className="relative mx-auto max-w-2xl py-8">
        <LanguageSwitcher />

        <Link
          href="/"
          className="text-sm text-[var(--color-accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
        >
          {t.guideBackLink}
        </Link>

        {/* Banner already conveys the page's title visually; keep an h1 for
            correct heading hierarchy/accessibility without showing a
            redundant second title. */}
        <h1 className="sr-only">{t.guideTitle}</h1>
        <div className="mt-4 mb-8">
          <GuideBanner priority />
        </div>

        <nav
          aria-label={t.guideTocLabel}
          className="mb-10 rounded-lg border border-[var(--color-divider)] bg-[var(--color-surface)] p-4"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {guideSections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {guideSections.map(section => (
            <section key={section.id} id={section.id}>
              <h2 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm text-[var(--color-text)]">
                {section.blocks.map((block, i) =>
                  block.type === 'paragraph' ? (
                    <p key={i}>{block.text}</p>
                  ) : block.ordered ? (
                    <ol key={i} className="list-decimal list-inside space-y-1">
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={i} className="list-disc list-inside space-y-1">
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/guide/guide-content.tsx
git commit -m "Re-skin guide page with Nocturne tokens"
```

---

### Task 5b: Fix two files the plan missed — `app/page.tsx` and `app/language-switcher.tsx`

**Why this task exists:** Task 6's verification pass (run against Tasks 1-5) found that the plan's file list was incomplete. Two files still carry the pre-Nocturne theme and were never assigned to any task:
- `app/page.tsx` wraps `<CalculatorForm />` in a `<main>` that still has the original `bg-amber-50 dark:bg-zinc-950` classes — Task 4 only rewrote `calculator-form.tsx`'s own returned JSX, which doesn't include this outer wrapper.
- `app/language-switcher.tsx` (shared by both pages) still styles its `<select>` with the original zinc/amber/white classes — no task in the plan ever touched this file.

This directly violates the Global Constraint that the whole site uses the Nocturne palette with no light theme remaining. This task closes that gap before final verification re-runs.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/language-switcher.tsx`

**Interfaces:**
- Consumes: the same `--color-bg`, `--color-surface`, `--color-text`, `--color-divider`, `--color-accent`, `--radius-md` tokens from Task 1 that Tasks 4-5 already used. No new tokens needed.

- [ ] **Step 1: Fix `app/page.tsx`**

Change the `<main>` className from `"min-h-screen flex items-center justify-center p-4 bg-amber-50 dark:bg-zinc-950"` to `"min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)]"`. Nothing else in this file changes.

Full file after the change:

```tsx
import { Suspense } from 'react';
import CalculatorForm from './calculator-form';
import { translations } from './lib/translations';
import { detectLocale } from './lib/locale-server';

export default async function Page() {
  const initialLocale = await detectLocale();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)]">
      <Suspense fallback={<div className="text-[var(--color-text)] opacity-70">{translations[initialLocale].loading}</div>}>
        <CalculatorForm />
      </Suspense>
    </main>
  );
}
```

(**Correction from the final whole-branch review:** the `Suspense` fallback's `text-gray-500` above was the one class this task should have caught but didn't — it's the loading state shown on first paint, and it was the only leftover pre-Nocturne class anywhere in the app outside the intentionally-untouched `emblem.tsx`. Fixed to `text-[var(--color-text)] opacity-70`, matching the muted-text convention used elsewhere.)

- [ ] **Step 2: Fix `app/language-switcher.tsx`**

Change the `<select>`'s className from `"rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"` to the token-based equivalent, matching the same pattern Task 4 already used for the calculator's inputs. Nothing else in this file changes.

Full file after the change:

```tsx
'use client';

import { SUPPORTED_LOCALES, type Locale } from './lib/translations';
import { useLocale } from './lib/locale-context';

const NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  ko: '한국어',
  ja: '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ar: 'العربية',
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="absolute top-4 right-4 text-xs">
      <span className="sr-only">{t.languageLabel}</span>
      <select
        value={locale}
        onChange={e => setLocale(e.target.value as Locale)}
        className="rounded-[var(--radius-md)] border border-[var(--color-divider)] bg-[var(--color-surface)] px-2 py-1 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
      >
        {SUPPORTED_LOCALES.map(code => (
          <option key={code} value={code}>
            {NATIVE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Since `LanguageSwitcher` renders on both the calculator and guide pages, and `page.tsx` wraps the calculator, this one task fixes the remaining light-theme leak on both pages at once — no separate guide-page task needed.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/language-switcher.tsx
git commit -m "Fix remaining pre-Nocturne classes in page.tsx and language-switcher.tsx"
```

---

### Task 6: End-to-end verification (both pages, all 8 locales, RTL)

**Files:**
- Create: a throwaway Playwright script (not committed — same pattern used earlier in this project's development)

**Interfaces:**
- Consumes: the running dev server and everything from Tasks 1–5. Produces no code — this task's deliverable is a passing verification run.

- [ ] **Step 1: Confirm `emblem.tsx` was stashed, not deleted, then start the dev server**

```bash
test -f app/emblem.tsx && echo "emblem.tsx present"
git log --oneline -- app/emblem.tsx | head -1
npx tsc --noEmit && echo "full project (including emblem.tsx) compiles clean"

lsof -ti:3000 -sTCP:LISTEN | xargs -r kill 2>/dev/null
npm run dev > /tmp/calc-z-dev.log 2>&1 &
disown
sleep 2
curl -sf http://localhost:3000 -o /dev/null -w "%{http_code}\n"
```

Expected: `emblem.tsx present`; the `git log` line shows no commit from this plan's tasks touched it (last change predates this work); `tsc --noEmit` succeeds (proving `emblem.tsx` still compiles even though nothing imports it); `curl` prints `200`.

- [ ] **Step 2: Write and run the verification script**

```bash
mkdir -p /tmp/nocturne-check
cat > /tmp/nocturne-check/check.mjs << 'EOF'
import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', err => errors.push(String(err)));

// 1. Calculator page: confirm Nocturne bg and no leftover amber/zinc classes
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForSelector('h1');
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
console.log('body background (expect rgb(22, 24, 38)):', bodyBg);
console.log('h1 text:', await page.textContent('h1'));

// 2. Already-reached state: storage >= target
await page.fill('input >> nth=0', '500'); // storage
await page.fill('input >> nth=1', '100'); // target
await page.waitForTimeout(200);
console.log('already-reached message visible:', await page.isVisible('text=Target already reached'));

// 3. Normal result state
await page.fill('input >> nth=0', '4300'); // storage
await page.fill('input >> nth=1', '25000'); // target
await page.fill('input >> nth=2', '120'); // rate
await page.waitForTimeout(200);
console.log('tile headings:', await page.$$eval('h3', els => els.map(e => e.textContent)));

// 4. Rate error is inline, not replacing the whole results block
await page.fill('input >> nth=2', '-5');
await page.waitForTimeout(200);
console.log('inline rate error visible:', await page.isVisible('text=Enter a rate greater than 0.'));

// 5. Guide banner link + sizing
const bannerBox = await page.locator('a[href="/guide"]').boundingBox();
console.log('guide banner link width (expect <= 600):', bannerBox?.width);

await page.screenshot({ path: '/tmp/nocturne-check/calculator.png', fullPage: true });

// 6. Guide page: Nocturne tokens applied, RTL still works
await page.goto('http://localhost:3000/guide', { waitUntil: 'networkidle' });
const guideBg = await page.evaluate(() => getComputedStyle(document.querySelector('main')).backgroundColor);
console.log('guide page background (expect rgb(22, 24, 38)):', guideBg);

await page.selectOption('select', 'ar');
await page.waitForFunction(() => document.documentElement.lang === 'ar');
console.log('guide dir after switching to ar:', await page.evaluate(() => document.querySelector('main').getAttribute('dir')));
await page.screenshot({ path: '/tmp/nocturne-check/guide-ar.png' });

// 7. All 8 locales load without console errors on both pages
const locales = ['en', 'es', 'it', 'ko', 'ja', 'zh-CN', 'zh-TW', 'ar'];
for (const locale of locales) {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.selectOption('select', locale);
  await page.waitForFunction(l => document.documentElement.lang === l, locale);
  await page.goto('http://localhost:3000/guide', { waitUntil: 'networkidle' });
}

console.log('console/page errors across the whole run:', errors.length ? errors : 'none');
await browser.close();
EOF
node /tmp/nocturne-check/check.mjs
```

Expected:
- `body background` and `guide page background` both print `rgb(22, 24, 38)` (the `#161826` Nocturne bg).
- `already-reached message visible: true`.
- `tile headings` prints three duration strings (not empty/undefined).
- `inline rate error visible: true`.
- `guide banner link width` ≤ `600`.
- `guide dir after switching to ar: rtl`.
- `console/page errors across the whole run: none`.

- [ ] **Step 3: Look at the screenshots**

Open `/tmp/nocturne-check/calculator.png` and `/tmp/nocturne-check/guide-ar.png` and visually confirm: dark purple-accented theme throughout, three result tiles with a colored pill, the guide banner left-aligned and narrower than the card, and (for the Arabic screenshot) the guide page mirrored correctly with no leftover light-theme colors.

- [ ] **Step 4: Clean up the throwaway script**

```bash
rm -rf /tmp/nocturne-check
```

(No commit for this task — it's verification only, nothing here is checked in.)

---

### Task 7: Translate the new/changed copy into the other 7 locales

**Files:**
- Modify: `app/lib/translations/es.ts`
- Modify: `app/lib/translations/it.ts`
- Modify: `app/lib/translations/ko.ts`
- Modify: `app/lib/translations/ja.ts`
- Modify: `app/lib/translations/zh-CN.ts`
- Modify: `app/lib/translations/zh-TW.ts`
- Modify: `app/lib/translations/ar.ts`

**Interfaces:**
- Consumes: the key set from Task 3. No new keys, no structural changes — just replacing specific string values.

This is the "separate commit" the user asked for — everything before this task already works correctly in all 8 locales (the non-English locales just show English or old-wording text for the handful of keys touched by the redesign); this task replaces those placeholder values with real per-locale translations. `heroEyebrow` needs no changes (it's already correct — identical in every locale). For every other locale, translate `neededLabel`, `appDescription`, `timeUntilTargetLabel`, `timeUntilResetLabel`, `resetVerdictLabel`, `calculatorHeading`, `calculatorSubhead`, `storagePlaceholder`, `targetPlaceholder`, `ratePlaceholder`, `marginToSpare`, `marginMissesBy`, `alreadyReachedMessage`, and `footerDisclaimer` to match the rest of that file's existing tone and terminology (e.g. reuse whatever word that file already uses for "fernleaf", "reset", etc. — check the surrounding untouched keys in the same file for the established vocabulary before translating). Keep `{duration}` literal in `marginToSpare`/`marginMissesBy` — it's a placeholder token, not text to translate. Keep "Last Z: Survival Shooter" untranslated wherever it's embedded inside `footerDisclaimer`, matching `heroEyebrow`.

- [ ] **Step 1: Translate `app/lib/translations/es.ts`'s touched keys**

Update these 14 values in the existing file (leave every other key untouched):

```ts
  appDescription: 'Calcula las horas para alcanzar tu objetivo de helechos en Last Z: Survival Shooter.',
  neededLabel: 'Total necesario para la próxima mejora',
  timeUntilTargetLabel: 'Tiempo hasta el objetivo',
  timeUntilResetLabel: 'Tiempo hasta el reinicio',
  resetVerdictLabel: 'Vs. reinicio del servidor',
  calculatorHeading: 'Calculadora de reinicio de helechos',
  calculatorSubhead: 'Introduce tu tasa de helechos para ver exactamente cuándo alcanzarás tu próxima mejora.',
  storagePlaceholder: 'ej. 4300',
  targetPlaceholder: 'ej. 25000',
  ratePlaceholder: 'ej. 120',
  marginToSpare: '{duration} de margen',
  marginMissesBy: 'te faltan {duration}',
  alreadyReachedMessage: 'Objetivo ya alcanzado — ve a recoger tu mejora.',
  footerDisclaimer: 'Herramienta de fans no oficial para Last Z: Survival Shooter.',
```

- [ ] **Step 2: Translate `app/lib/translations/it.ts`'s touched keys**

```ts
  appDescription: 'Calcola le ore per raggiungere il tuo obiettivo di felci in Last Z: Survival Shooter.',
  neededLabel: 'Totale necessario per il prossimo potenziamento',
  timeUntilTargetLabel: "Tempo all'obiettivo",
  timeUntilResetLabel: 'Tempo al reset',
  resetVerdictLabel: 'Vs. reset del server',
  calculatorHeading: 'Calcolatore di reset delle felci',
  calculatorSubhead: 'Inserisci il tuo tasso di felci per vedere esattamente quando raggiungerai il tuo prossimo potenziamento.',
  storagePlaceholder: 'es. 4300',
  targetPlaceholder: 'es. 25000',
  ratePlaceholder: 'es. 120',
  marginToSpare: '{duration} di margine',
  marginMissesBy: 'mancano {duration}',
  alreadyReachedMessage: 'Obiettivo già raggiunto — vai a ritirare il tuo potenziamento.',
  footerDisclaimer: 'Strumento non ufficiale per fan di Last Z: Survival Shooter.',
```

- [ ] **Step 3: Translate `app/lib/translations/ko.ts`'s touched keys**

```ts
  appDescription: 'Last Z: Survival Shooter에서 고사리 목표에 도달하는 데 걸리는 시간을 계산합니다.',
  neededLabel: '다음 업그레이드에 필요한 총량',
  timeUntilTargetLabel: '목표까지 남은 시간',
  timeUntilResetLabel: '리셋까지 남은 시간',
  resetVerdictLabel: '서버 리셋 대비',
  calculatorHeading: '고사리 리셋 계산기',
  calculatorSubhead: '고사리 획득 속도를 입력하면 다음 업그레이드에 도달하는 정확한 시점을 확인할 수 있습니다.',
  storagePlaceholder: '예: 4300',
  targetPlaceholder: '예: 25000',
  ratePlaceholder: '예: 120',
  marginToSpare: '{duration} 여유',
  marginMissesBy: '{duration} 부족',
  alreadyReachedMessage: '목표를 이미 달성했습니다 — 업그레이드를 수령하세요.',
  footerDisclaimer: 'Last Z: Survival Shooter의 비공식 팬 도구입니다.',
```

- [ ] **Step 4: Translate `app/lib/translations/ja.ts`'s touched keys**

```ts
  appDescription: 'Last Z: Survival Shooterでシダの目標に到達するまでの時間を計算します。',
  neededLabel: '次のアップグレードに必要な合計',
  timeUntilTargetLabel: '目標までの時間',
  timeUntilResetLabel: 'リセットまでの時間',
  resetVerdictLabel: 'サーバーリセットとの比較',
  calculatorHeading: 'シダリセット計算機',
  calculatorSubhead: 'シダの獲得速度を入力すると、次のアップグレードに到達する正確なタイミングがわかります。',
  storagePlaceholder: '例: 4300',
  targetPlaceholder: '例: 25000',
  ratePlaceholder: '例: 120',
  marginToSpare: '{duration}の余裕',
  marginMissesBy: '{duration}足りません',
  alreadyReachedMessage: '目標に到達済みです — アップグレードを受け取りに行きましょう。',
  footerDisclaimer: 'Last Z: Survival Shooterの非公式ファンツールです。',
```

- [ ] **Step 5: Translate `app/lib/translations/zh-CN.ts`'s touched keys**

```ts
  appDescription: '计算在 Last Z: Survival Shooter 中达到蕨叶目标所需的时间。',
  neededLabel: '下次升级所需总量',
  timeUntilTargetLabel: '距离目标的时间',
  timeUntilResetLabel: '距离重置的时间',
  resetVerdictLabel: '相对服务器重置',
  calculatorHeading: '蕨叶重置计算器',
  calculatorSubhead: '输入你的蕨叶获取速率，即可准确知道何时能达成下一次升级。',
  storagePlaceholder: '例如 4300',
  targetPlaceholder: '例如 25000',
  ratePlaceholder: '例如 120',
  marginToSpare: '富余 {duration}',
  marginMissesBy: '差 {duration}',
  alreadyReachedMessage: '已达成目标 — 快去领取你的升级吧。',
  footerDisclaimer: 'Last Z: Survival Shooter 的非官方粉丝工具。',
```

- [ ] **Step 6: Translate `app/lib/translations/zh-TW.ts`'s touched keys**

```ts
  appDescription: '計算在 Last Z: Survival Shooter 中達到蕨葉目標所需的時間。',
  neededLabel: '下次升級所需總量',
  timeUntilTargetLabel: '距離目標的時間',
  timeUntilResetLabel: '距離重置的時間',
  resetVerdictLabel: '相對伺服器重置',
  calculatorHeading: '蕨葉重置計算機',
  calculatorSubhead: '輸入你的蕨葉獲取速率，即可準確知道何時能達成下一次升級。',
  storagePlaceholder: '例如 4300',
  targetPlaceholder: '例如 25000',
  ratePlaceholder: '例如 120',
  marginToSpare: '富餘 {duration}',
  marginMissesBy: '差 {duration}',
  alreadyReachedMessage: '已達成目標 — 快去領取你的升級吧。',
  footerDisclaimer: 'Last Z: Survival Shooter 的非官方粉絲工具。',
```

- [ ] **Step 7: Translate `app/lib/translations/ar.ts`'s touched keys**

```ts
  appDescription: 'احسب الساعات اللازمة للوصول إلى هدفك من أوراق السرخس في Last Z: Survival Shooter.',
  neededLabel: 'الإجمالي اللازم للترقية التالية',
  timeUntilTargetLabel: 'الوقت المتبقي للوصول إلى الهدف',
  timeUntilResetLabel: 'الوقت المتبقي حتى إعادة التعيين',
  resetVerdictLabel: 'مقارنةً بإعادة تعيين الخادم',
  calculatorHeading: 'حاسبة إعادة تعيين أوراق السرخس',
  calculatorSubhead: 'أدخل معدل حصولك على أوراق السرخس لمعرفة الوقت الدقيق الذي ستصل فيه إلى ترقيتك التالية.',
  storagePlaceholder: 'مثال: 4300',
  targetPlaceholder: 'مثال: 25000',
  ratePlaceholder: 'مثال: 120',
  marginToSpare: 'بفارق {duration}',
  marginMissesBy: 'ينقصك {duration}',
  alreadyReachedMessage: 'تم بلوغ الهدف بالفعل — اذهب لاستلام ترقيتك.',
  footerDisclaimer: 'أداة غير رسمية لمعجبي Last Z: Survival Shooter.',
```

- [ ] **Step 8: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Confirm none of the English placeholder values leaked past this commit — grep the 7 translated files for the English-only strings that should now be gone everywhere except `en.ts`:

```bash
grep -rn "Fern reset calculator\|Target already reached — go collect\|Unofficial fan tool for Last Z" app/lib/translations/es.ts app/lib/translations/it.ts app/lib/translations/ko.ts app/lib/translations/ja.ts app/lib/translations/zh-CN.ts app/lib/translations/zh-TW.ts app/lib/translations/ar.ts
```

Expected: no output (a match means that file's `calculatorHeading`/`alreadyReachedMessage`/`footerDisclaimer` still has the untranslated placeholder from Task 3 and Step 1–7 above missed it).

Then spot-check rendering: start the dev server (`npm run dev &`, wait for it, same as Task 6 Step 1), open `http://localhost:3000`, switch the language selector to Spanish, Japanese, and Arabic in turn, and for each confirm the subhead, the margin caption under the verdict pill, and the footer line all read in that language (not English), and that the three placeholder numerals (`4300`/`25000`/`120`) are unchanged. Stop the server afterward: `lsof -ti:3000 -sTCP:LISTEN | xargs -r kill`.

- [ ] **Step 9: Commit**

```bash
git add app/lib/translations/
git commit -m "Translate Nocturne redesign copy into es/it/ko/ja/zh-CN/zh-TW/ar"
```
