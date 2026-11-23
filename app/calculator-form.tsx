'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  calculate,
  isValidRate,
  QUICK_OBTAIN_USES_PER_DAY,
  quickObtainBonus,
  VAMPIRE_GUARD_KILLS_PER_DAY,
  VAMPIRE_GUARD_LEVELS,
  vampireGuardBonus,
  type VampireGuardLevel,
} from './lib/calc';
import { formStateFromParams, formStateToQuery, type FormState } from './lib/form-state';
import { useLocale, useLocalizedTitle } from './lib/locale-context';
import { formatDuration } from './lib/format-duration';
import LanguageSwitcher from './language-switcher';
import GuideBanner from './guide-banner';
import Emblem from './emblem';
import NumberField from './number-field';

const CHECKBOX_CLASS =
  'h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-divider)] bg-[var(--color-surface)] accent-[var(--color-accent)]';

function parseOrZero(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function ResultTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex-1 basis-[160px]">
      <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function ResultValue({ children }: { children: ReactNode }) {
  return <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">{children}</h3>;
}

export default function CalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();
  useLocalizedTitle(t.appTitle);

  const [form, setForm] = useState(() => formStateFromParams(searchParams));

  function update(changes: Partial<FormState>) {
    const next = { ...form, ...changes };
    setForm(next);
    router.replace(`${pathname}?${formStateToQuery(next)}`, { scroll: false });
  }

  const rate = Number(form.rate);
  const rateIsValid = isValidRate(rate);
  const vampireGuard = form.includeVampireGuard ? vampireGuardBonus(form.vampireGuardLevel) : 0;
  const quickObtain = form.includeQuickObtain ? quickObtainBonus(rate) : 0;
  const amount = parseOrZero(form.amount) + vampireGuard + quickObtain;
  const needed = parseOrZero(form.needed);

  const alreadyReached = form.needed !== '' && needed <= amount;
  const result = rateIsValid && needed > amount ? calculate({ rate, amount, needed }) : null;
  const isReadyBeforeReset = result?.readyRelation === 'before';
  const showRateError = form.rate !== '' && !rateIsValid;

  const [vampireGuardLabelPrefix, vampireGuardLabelSuffix] = t.vampireGuardCheckboxLabel
    .replace('{count}', String(VAMPIRE_GUARD_KILLS_PER_DAY))
    .split('{level}');

  return (
    <div className="relative w-full max-w-[760px]">
      <LanguageSwitcher />
      <span className="font-display text-lg font-medium tracking-[0.02em] text-[var(--color-accent)]">{t.appTitle}</span>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div>
          {/* The eyebrow is the game's English title in every locale; lang="en"
              keeps uppercase from applying Turkish casing (i -> İ) to it. */}
          <div
            lang="en"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] px-[10px] py-[3px] rounded-[var(--radius-sm)] mb-3"
            style={{ background: 'var(--color-crimson)', color: 'var(--color-accent-100)' }}
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M10.5 1.5a6.5 6.5 0 1 0 4 11.6A7 7 0 0 1 10.5 1.5Z" />
            </svg>
            {t.heroEyebrow}
          </div>
          <h1
            className="font-display text-[46px] leading-[1.08] tracking-[0.005em] font-semibold text-[var(--color-accent)]"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.55)' }}
          >
            {t.calculatorHeading}
          </h1>
          <p className="text-[var(--color-text)] opacity-70 max-w-[46ch] mb-8 mt-2">{t.calculatorSubhead}</p>
        </div>
        <Emblem className="hidden sm:block h-24 w-24 shrink-0 text-[var(--color-accent)]" />
      </div>

      <div
        className="@container rounded-lg p-6 flex flex-col gap-4"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex gap-4 flex-wrap">
          <NumberField
            id="storage"
            label={t.amountLabel}
            placeholder={t.storagePlaceholder}
            value={form.amount}
            onChange={value => update({ amount: value })}
          />
          <NumberField
            id="target"
            label={t.neededLabel}
            placeholder={t.targetPlaceholder}
            value={form.needed}
            onChange={value => update({ needed: value })}
          />
          <NumberField
            id="rate"
            label={t.rateLabel}
            placeholder={t.ratePlaceholder}
            value={form.rate}
            onChange={value => update({ rate: value })}
          />
        </div>

        <div className="flex gap-4 flex-wrap items-start">
          <div className="flex flex-[2] basis-[416px] flex-col gap-2 text-sm text-[var(--color-text)]">
            <div className="flex items-center gap-2">
              <input
                id="include-quick-obtain"
                type="checkbox"
                checked={form.includeQuickObtain}
                onChange={e => update({ includeQuickObtain: e.target.checked })}
                className={CHECKBOX_CLASS}
              />
              <label htmlFor="include-quick-obtain">
                {t.quickObtainCheckboxLabel.replace('{count}', String(QUICK_OBTAIN_USES_PER_DAY))}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="include-vampire-guard"
                type="checkbox"
                checked={form.includeVampireGuard}
                onChange={e => update({ includeVampireGuard: e.target.checked })}
                className={CHECKBOX_CLASS}
              />
              <label htmlFor="include-vampire-guard" className="flex flex-wrap items-center gap-2">
                <span>{vampireGuardLabelPrefix}</span>
                <select
                  value={form.vampireGuardLevel}
                  onChange={e => update({ vampireGuardLevel: Number(e.target.value) as VampireGuardLevel })}
                  disabled={!form.includeVampireGuard}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-divider)] bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-50"
                >
                  {VAMPIRE_GUARD_LEVELS.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {vampireGuardLabelSuffix && <span>{vampireGuardLabelSuffix}</span>}
              </label>
            </div>
          </div>
          {/* Below 632px (3 x 200px inputs + 2 x 16px gaps) the rows stack, so
              this moves ahead of the checkboxes to stay right under the rate
              field it describes. */}
          {(showRateError || rateIsValid) && (
            <div className="order-first @min-[632px]:order-none flex-1 basis-[200px]">
              {showRateError ? (
                <div className="text-xs" style={{ color: 'var(--color-accent-300)' }}>
                  {t.rateError}
                </div>
              ) : (
                <div className="text-xs opacity-70 text-[var(--color-text)]">
                  {t.dailyRateHint.replace('{amount}', Math.round(rate * 24).toLocaleString(locale))}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="h-px my-1"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--color-divider) 48px, var(--color-divider) calc(100% - 48px), transparent)',
          }}
        />

        {alreadyReached ? (
          <p className="text-sm opacity-85 text-[var(--color-text)]">{t.alreadyReachedMessage}</p>
        ) : (
          <div className="flex gap-4 flex-wrap">
            <ResultTile label={t.timeUntilTargetLabel}>
              <ResultValue>{result ? formatDuration(result.hoursLeft) : '—'}</ResultValue>
            </ResultTile>
            <ResultTile label={t.timeUntilResetLabel}>
              <ResultValue>{result ? formatDuration(result.hoursBeforeReset) : '—'}</ResultValue>
            </ResultTile>
            <ResultTile label={t.resetVerdictLabel}>
              {result ? (
                <>
                  <div
                    className="inline-block text-[13px] font-medium px-3 py-1 rounded-[var(--radius-sm)]"
                    style={{
                      background: isReadyBeforeReset ? 'var(--color-success-800)' : 'var(--color-danger-800)',
                      color: isReadyBeforeReset ? 'var(--color-success-100)' : 'var(--color-danger-100)',
                    }}
                  >
                    {isReadyBeforeReset ? t.readyBefore : t.readyAfter}
                  </div>
                  <div className="text-xs mt-[5px] opacity-70 text-[var(--color-text)]">
                    {(isReadyBeforeReset ? t.marginToSpare : t.marginMissesBy).replace(
                      '{duration}',
                      formatDuration(Math.abs(result.resetOffset))
                    )}
                  </div>
                </>
              ) : (
                <ResultValue>—</ResultValue>
              )}
            </ResultTile>
          </div>
        )}
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
