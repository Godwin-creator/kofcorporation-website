// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from "next-sanity/live";
import { client, hasSanityConfig } from '@/lib/sanity';

const token = process.env.SANITY_API_READ_TOKEN;

// Only initialize defineLive when Sanity is properly configured,
// because the fallback client doesn't support .withConfig().
function initLive() {
  if (hasSanityConfig) {
    return defineLive({
      client,
      // When a read token is available, pass it to enable live content / drafts.
      // Otherwise explicitly disable to allow public CDN fetches to work.
      serverToken: token || false,
      browserToken: token || false,
    });
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
