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
