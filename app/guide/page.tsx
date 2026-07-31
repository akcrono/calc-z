import type { Metadata } from 'next';
import { translations } from '../lib/translations';
import { detectLocale } from '../lib/locale-server';
import GuideContent from './guide-content';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const t = translations[locale];
  return {
    title: `${t.guideTitle} — ${t.appTitle}`,
    description: t.guideDescription,
  };
}

export default function GuidePage() {
  return <GuideContent />;
}
