'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { calculate, validateRate, PREDATOR_YIELDS, PREDATOR_LEVELS, type PredatorLevel } from './lib/calc';
import { useLocale, useLocalizedTitle } from './lib/locale-context';
import { formatDuration } from './lib/format-duration';
import LanguageSwitcher from './language-switcher';
import GuideBanner from './guide-banner';
import Emblem from './emblem';

export default function CalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();
  useLocalizedTitle(t.appTitle);

  const [rateInput, setRateInput] = useState(() => searchParams.get('rate') ?? '');
  const [amountInput, setAmountInput] = useState(() => searchParams.get('amount') ?? '');
  const [neededInput, setNeededInput] = useState(() => searchParams.get('needed') ?? '');
  const [includePredators, setIncludePredators] = useState(() => searchParams.get('predators') === '1');
  const [predatorLevel, setPredatorLevel] = useState<PredatorLevel>(() => {
    const level = Number(searchParams.get('predatorLevel'));
    return PREDATOR_LEVELS.includes(level as PredatorLevel) ? (level as PredatorLevel) : 180;
  });

  function updateParams(
    rate: string,
    amount: string,
    needed: string,
    predators: boolean,
    level: PredatorLevel
  ) {
    const params = new URLSearchParams();
    if (rate) params.set('rate', rate);
    if (amount) params.set('amount', amount);
    if (needed) params.set('needed', needed);
    if (predators) {
      params.set('predators', '1');
      params.set('predatorLevel', String(level));
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function parseOrZero(value: string): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function handleSelectAll(e: React.MouseEvent<HTMLInputElement>) {
    e.currentTarget.select();
  }

  function handleRateChange(value: string) {
    setRateInput(value);
    updateParams(value, amountInput, neededInput, includePredators, predatorLevel);
  }

  function handleAmountChange(value: string) {
    setAmountInput(value);
    updateParams(rateInput, value, neededInput, includePredators, predatorLevel);
  }

  function handleNeededChange(value: string) {
    setNeededInput(value);
    updateParams(rateInput, amountInput, value, includePredators, predatorLevel);
  }

  function handleIncludePredatorsChange(value: boolean) {
    setIncludePredators(value);
    updateParams(rateInput, amountInput, neededInput, value, predatorLevel);
  }

  function handlePredatorLevelChange(value: PredatorLevel) {
    setPredatorLevel(value);
    updateParams(rateInput, amountInput, neededInput, includePredators, value);
  }

  const rate = Number(rateInput);
  const predatorBonus = includePredators ? PREDATOR_YIELDS[predatorLevel] * 2 : 0;
  const amount = parseOrZero(amountInput) + predatorBonus;
  const needed = parseOrZero(neededInput);
  const leftover = needed - amount;

  const validation = validateRate(rate);
  const result = validation.valid ? calculate({ rate, amount, needed }) : null;

  const dailyRate = validation.valid ? rate * 24 : null;
  const dailyRateHint =
    dailyRate !== null ? t.dailyRateHint.replace('{amount}', Math.round(dailyRate).toLocaleString(locale)) : '';

  const showRateError = rateInput !== '' && !validation.valid;
  const alreadyReached = neededInput !== '' && leftover <= 0;
  const hasResult = validation.valid && result !== null && leftover > 0;

  const marginLabel =
    result && hasResult
      ? result.readyRelation === 'before'
        ? t.marginToSpare.replace('{duration}', formatDuration(Math.abs(result.resetOffset)))
        : t.marginMissesBy.replace('{duration}', formatDuration(Math.abs(result.resetOffset)))
      : '';
  const verdictBg = result?.readyRelation === 'before' ? 'var(--color-success-800)' : 'var(--color-danger-800)';
  const verdictColor = result?.readyRelation === 'before' ? 'var(--color-success-100)' : 'var(--color-danger-100)';

  const [predatorsLabelPrefix, predatorsLabelSuffix] = t.predatorsCheckboxLabel.split('{level}');

  return (
    <div className="relative w-full max-w-[760px]">
      <LanguageSwitcher />
      <span className="font-medium text-[var(--color-text)]">{t.appTitle}</span>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div>
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
        <Emblem className="hidden sm:block h-24 w-24 shrink-0 text-[var(--color-accent)]" />
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
              onClick={handleSelectAll}
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
              onClick={handleSelectAll}
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
              onClick={handleSelectAll}
              className="w-full min-h-9 rounded-[var(--radius-md)] px-3 bg-[var(--color-surface)] border border-[var(--color-divider)] text-[var(--color-text)] hover:border-white/30 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap items-start">
          <div className="flex-[2] basis-[416px] flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              id="include-predators"
              type="checkbox"
              checked={includePredators}
              onChange={e => handleIncludePredatorsChange(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-divider)] bg-[var(--color-surface)] accent-[var(--color-accent)]"
            />
            <label htmlFor="include-predators" className="flex flex-wrap items-center gap-2">
              <span>{predatorsLabelPrefix}</span>
              <select
                value={predatorLevel}
                onChange={e => handlePredatorLevelChange(Number(e.target.value) as PredatorLevel)}
                disabled={!includePredators}
                className="rounded-[var(--radius-sm)] border border-[var(--color-divider)] bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-50"
              >
                {PREDATOR_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {predatorsLabelSuffix && <span>{predatorsLabelSuffix}</span>}
            </label>
          </div>
          <div className="flex-1 basis-[200px]">
            {showRateError ? (
              <div className="text-xs" style={{ color: 'var(--color-accent-300)' }}>
                {t.rateError}
              </div>
            ) : dailyRate !== null ? (
              <div className="text-xs opacity-70 text-[var(--color-text)]">{dailyRateHint}</div>
            ) : null}
          </div>
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
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.timeUntilTargetLabel}
              </div>
              <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">
                {hasResult && result ? formatDuration(result.hoursLeft) : '—'}
              </h3>
            </div>
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.timeUntilResetLabel}
              </div>
              <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">
                {hasResult && result ? formatDuration(result.hoursBeforeReset) : '—'}
              </h3>
            </div>
            <div className="flex-1 basis-[160px]">
              <div className="text-[10px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-accent)' }}>
                {t.resetVerdictLabel}
              </div>
              {hasResult && result ? (
                <>
                  <div
                    className="inline-block text-[13px] font-medium px-3 py-1 rounded-[var(--radius-sm)]"
                    style={{ background: verdictBg, color: verdictColor }}
                  >
                    {result.readyRelation === 'after' ? t.readyAfter : t.readyBefore}
                  </div>
                  <div className="text-xs mt-[5px] opacity-70 text-[var(--color-text)]">{marginLabel}</div>
                </>
              ) : (
                <h3 className="text-[25px] font-medium m-0 text-[var(--color-text)]">—</h3>
              )}
            </div>
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
