import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import type { GuideSection } from './types.ts';

// Anchors like #glory-shop depend on every locale defining the same sections,
// in the same order, under the same ids. The type system can't catch a locale
// file with a missing, reordered or renamed id. Reading the directory means a
// new locale file is covered without being listed here.
const sectionsDir = new URL('./sections/', import.meta.url);
const localeFiles = readdirSync(sectionsDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

async function sectionIds(file: string): Promise<string[]> {
  const sections: GuideSection[] = (await import(new URL(file, sectionsDir).href)).default;
  return sections.map(section => section.id);
}

const expectedIds = await sectionIds('en.ts');

for (const file of localeFiles) {
  test(`guide sections in ${file} match the ids in en.ts`, async () => {
    assert.deepEqual(await sectionIds(file), expectedIds);
  });
}
