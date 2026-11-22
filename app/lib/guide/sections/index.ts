import type { Locale } from '../../translations';
import en from './en';
import es from './es';
import it from './it';
import ko from './ko';
import ja from './ja';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ar from './ar';
import tr from './tr';

export const guideSectionsByLocale: Record<Locale, typeof en> = {
  en,
  es,
  it,
  ko,
  ja,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ar,
  tr,
};
