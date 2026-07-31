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

  // Only touch document.title on an explicit user-driven locale switch, not
  // on every mount — otherwise this clobbers whatever title the current
  // route's own metadata set (e.g. on a direct/refreshed load of a page
  // other than the calculator).
  function setLocale(next: Locale) {
    setLocaleState(next);
    document.title = translations[next].appTitle;
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
