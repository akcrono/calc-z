'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { calculate, validateRate } from './lib/calc';
import Emblem from './emblem';

export default function CalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
  	<div className="w-full max-w-md rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-amber-800 dark:from-amber-500/60 dark:via-rose-600/60 dark:to-amber-900/60 p-[2px] shadow-lg shadow-amber-900/20">
      <div className="space-y-6 rounded-[7px] bg-white dark:bg-zinc-900 p-6 text-zinc-900 dark:text-zinc-100">
        <div className="text-center">
          <Emblem />
          <h1 className="mt-2 text-lg font-semibold tracking-wide text-amber-800 dark:text-amber-300">
            Last Z Fern Calculator
          </h1>
        </div>

        <div className="space-y-4">
        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-amber-800 dark:text-amber-300">Fernleafs per hour</label>
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
          <label htmlFor="amount" className="block text-sm font-medium text-amber-800 dark:text-amber-300">Fernleafs in storage</label>
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
          <label htmlFor="needed" className="block text-sm font-medium text-amber-800 dark:text-amber-300">Total fernleafs needed for next upgrade</label>
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
            <dt>Hours before ferns acquired</dt><dd>{result.hoursLeft.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Hours before reset</dt><dd>{result.hoursBeforeReset.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between font-semibold text-amber-600 dark:text-amber-400">
            <dt>Ready</dt>
            <dd
              className={`text-base font-black ${
                result.readyRelation === 'After'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-green-600 dark:text-green-400'
              }`}
            >
              {result.readyRelation} reset
            </dd>
          </div>
        </dl>
      ) : (
        <p className="text-red-600 dark:text-red-400 text-sm">{validation.error}</p>
      )}
      </div>
    </div>
  );
}