'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, RTL_LOCALES, type Locale } from './translations';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return { ...context, t: translations[context.locale] };
}

/** Keeps document.title in sync with the given (already-localized) title.
 * Each page that cares about its tab title calls this with its own text,
 * rather than LocaleProvider guessing which page is active — self-heals on
 * mount, on navigation, and on locale switch. */
export function useLocalizedTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
