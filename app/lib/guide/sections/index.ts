import { SUPPORTED_LOCALES, type Locale } from '../../translations';
import en from './en';
import es from './es';
import it from './it';
import ko from './ko';
import ja from './ja';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ar from './ar';

export const guideSectionsByLocale: Record<Locale, typeof en> = {
  en,
  es,
  it,
  ko,
  ja,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ar,
};

// Every locale must define the same sections, in the same order, under the
// same stable ids (anchors like #glory-shop depend on this) — only the
// title/text/items should differ. Nothing in the type system catches a
// locale file with a missing/reordered/renamed id, so check it here once.
if (process.env.NODE_ENV !== 'production') {
  const expected = guideSectionsByLocale.en.map(s => s.id).join();
  for (const locale of SUPPORTED_LOCALES) {
    const ids = guideSectionsByLocale[locale].map(s => s.id).join();
    if (ids !== expected) {
      throw new Error(`guide sections out of sync for locale: ${locale}`);
    }
  }
}
