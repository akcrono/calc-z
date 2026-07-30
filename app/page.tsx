import { Suspense } from 'react';
import { headers } from 'next/headers';
import CalculatorForm from './calculator-form';
import { LocaleProvider } from './lib/locale-context';
import { matchLocale, translations } from './lib/translations';

export default async function Page() {
  const headersList = await headers();
  const initialLocale = matchLocale(headersList.get('accept-language'));

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-amber-50 dark:bg-zinc-950">
      <LocaleProvider initialLocale={initialLocale}>
        <Suspense fallback={<div className="text-gray-500">{translations[initialLocale].loading}</div>}>
          <CalculatorForm />
        </Suspense>
      </LocaleProvider>
    </main>
  );
}