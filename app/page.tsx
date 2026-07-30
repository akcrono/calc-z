import { Suspense } from 'react';
import CalculatorForm from './calculator-form';
import { translations } from './lib/translations';
import { detectLocale } from './lib/locale-server';

export default async function Page() {
  const initialLocale = await detectLocale();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-amber-50 dark:bg-zinc-950">
      <Suspense fallback={<div className="text-gray-500">{translations[initialLocale].loading}</div>}>
        <CalculatorForm />
      </Suspense>
    </main>
  );
}
