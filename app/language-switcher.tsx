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
        className="rounded-[var(--radius-md)] border border-[var(--color-divider)] bg-[var(--color-surface)] px-2 py-1 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
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
