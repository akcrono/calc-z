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
