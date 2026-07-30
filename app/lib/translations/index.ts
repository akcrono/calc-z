import type { Translations } from './types';
import en from './en';
import es from './es';
import it from './it';
import ko from './ko';
import ja from './ja';
import zhCN from './zh-CN';
import zhTW from './zh-TW';

export type { Translations };

export const SUPPORTED_LOCALES = ['en', 'es', 'it', 'ko', 'ja', 'zh-CN', 'zh-TW'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const translations: Record<Locale, Translations> = {
  en,
  es,
  it,
  ko,
  ja,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

export function matchLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return 'en';

  const requestedTags = acceptLanguageHeader
    .split(',')
    .map(part => part.split(';')[0].trim())
    .filter(Boolean);

  for (const tag of requestedTags) {
    const exact = SUPPORTED_LOCALES.find(locale => locale.toLowerCase() === tag.toLowerCase());
    if (exact) return exact;
  }

  for (const tag of requestedTags) {
    const prefix = tag.split('-')[0].toLowerCase();
    const prefixMatch = SUPPORTED_LOCALES.find(
      locale => locale.split('-')[0].toLowerCase() === prefix
    );
    if (prefixMatch) return prefixMatch;
  }

  return 'en';
}
