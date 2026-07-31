'use client';

import { SUPPORTED_LOCALES, type Locale } from './lib/translations';
import { useLocale } from './lib/locale-context';

const NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  ko: '한국어',
  ja: '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ar: 'العربية',
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="absolute top-4 right-4 text-xs">
      <span className="sr-only">{t.languageLabel}</span>
      <select
        value={locale}
        onChange={e => setLocale(e.target.value as Locale)}
        className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      >
        {SUPPORTED_LOCALES.map(code => (
          <option key={code} value={code}>
            {NATIVE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
