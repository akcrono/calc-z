import { headers } from 'next/headers';
import { matchLocale, type Locale } from './translations';

/** Detects the current request's locale from the `Accept-Language` header.
 * Server-only (relies on `next/headers`) — call this once per request from
 * a Server Component rather than duplicating `matchLocale(headers().get(...))`
 * at each call site. Kept out of `./translations` because that module is
 * also imported by client components (e.g. `locale-context.tsx`), and
 * `next/headers` can only be imported by Server Components/Route Handlers. */
export async function detectLocale(): Promise<Locale> {
  const headersList = await headers();
  return matchLocale(headersList.get('accept-language'));
}
