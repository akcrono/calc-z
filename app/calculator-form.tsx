'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { calculate, validateRate } from './lib/calc';
import { useLocale } from './lib/locale-context';
import Emblem from './emblem';
import LanguageSwitcher from './language-switcher';

export default function CalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, t } = useLocale();

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

  const validation = validateRate(rate);
  const result = validation.valid ? calculate({ rate, amount, needed }) : null;

  const numberFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-amber-800 dark:from-amber-500/60 dark:via-rose-600/60 dark:to-amber-900/60 p-[2px] shadow-lg shadow-amber-900/20">
        <LanguageSwitcher />
        <div className="space-y-6 rounded-[7px] bg-white dark:bg-zinc-900 p-6 text-zinc-900 dark:text-zinc-100">
          <div className="text-center">
            <Emblem />
            <h1 className="mt-2 text-lg font-semibold tracking-wide text-amber-800 dark:text-amber-300">
              {t.appTitle}
            </h1>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-amber-800 dark:text-amber-300">{t.rateLabel}</label>
              <input
                id="rate"
                type="number"
                inputMode="decimal"
                step="any"
                value={rateInput}
                onChange={e => handleRateChange(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-amber-800 dark:text-amber-300">{t.amountLabel}</label>
              <input
                id="amount"
                type="number"
                inputMode="decimal"
                step="any"
                value={amountInput}
                onChange={e => handleAmountChange(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="needed" className="block text-sm font-medium text-amber-800 dark:text-amber-300">{t.neededLabel}</label>
              <input
                id="needed"
                type="number"
                inputMode="decimal"
                step="any"
                value={neededInput}
                onChange={e => handleNeededChange(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {validation.valid && result ? (
            <dl className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <dt>{t.hoursLeftLabel}</dt><dd>{numberFormat.format(result.hoursLeft)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t.hoursBeforeResetLabel}</dt><dd>{numberFormat.format(result.hoursBeforeReset)}</dd>
              </div>
              <div className="flex justify-between font-semibold text-amber-600 dark:text-amber-400">
                <dt>{t.readyLabel}</dt>
                <dd
                  className={`text-base font-black ${
                    result.readyRelation === 'after'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {result.readyRelation === 'after' ? t.readyAfter : t.readyBefore}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-red-600 dark:text-red-400 text-sm">
              {validation.error === 'rate-must-be-positive' ? t.rateError : null}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link
          href="/guide"
          className="text-amber-800 dark:text-amber-300 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
        >
          {t.guideLinkLabel}
        </Link>
      </p>
    </div>
  );
}
