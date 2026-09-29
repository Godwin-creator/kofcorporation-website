// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from "next-sanity/live";
import { client, hasSanityConfig } from '@/lib/sanity';

// Only initialize defineLive when Sanity is properly configured,
// because the fallback client doesn't support .withConfig().
function initLive() {
  if (hasSanityConfig) {
    return defineLive({ client });
  }
  // Return type-compatible fallbacks
  return {
    sanityFetch: (async (options: { query: string }) => {
      return { data: [] as never, sourceMap: null, tags: [] };
    }) as ReturnType<typeof defineLive>['sanityFetch'],
    SanityLive: (() => null) as unknown as ReturnType<typeof defineLive>['SanityLive'],
  };
}

const live = initLive();
export const { sanityFetch, SanityLive } = live;
