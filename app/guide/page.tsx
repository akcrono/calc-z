import type { Metadata } from 'next';
import Link from 'next/link';
import GuideBanner from '../guide-banner';
import { guideSections } from '../lib/guide/sections';

export const metadata: Metadata = {
  title: 'Gameplay Guide — Last Z Fern Calculator',
  description:
    'Strategy tips and priority lists for Last Z: trucks, bounties, shops, hero battlefield, and more.',
};

export default function GuidePage() {
  return (
    <main dir="ltr" className="min-h-screen p-4 bg-amber-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl py-8">
        <Link
          href="/"
          className="text-sm text-amber-800 dark:text-amber-300 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
        >
          ← Back to calculator
        </Link>

        {/* Banner already conveys the page's title visually; keep an h1 for
            correct heading hierarchy/accessibility without showing a
            redundant second title. */}
        <h1 className="sr-only">Gameplay Guide</h1>
        <div className="mt-4 mb-8">
          <GuideBanner priority />
        </div>

        <nav
          aria-label="Table of contents"
          className="mb-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {guideSections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-amber-800 dark:text-amber-300 hover:underline"
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
              <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm text-zinc-900 dark:text-zinc-100">
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
