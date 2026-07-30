import { Suspense } from 'react';
import CalculatorForm from './calculator-form';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-amber-50 dark:bg-zinc-950">
      <Suspense fallback={<div className="text-gray-500">Loading…</div>}>
        <CalculatorForm />
      </Suspense>
    </main>
  );
}