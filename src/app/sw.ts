/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type {PrecacheEntry, SerwistGlobalConfig} from 'serwist'
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  Serwist,
  StaleWhileRevalidate,
} from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({request, url}) =>
        request.mode === 'navigate' &&
        url.origin === self.location.origin &&
        !/^\/(?:studio|(?:fr|en)\/studio)(?:\/|$)/.test(url.pathname),
      handler: new NetworkFirst({
        cacheName: 'site-pages',
        networkTimeoutSeconds: 3,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          }),
        ],
      }),
    },
    {
      matcher: ({url}) =>
        url.origin === 'https://cdn.sanity.io' ||
        (url.origin === self.location.origin &&
          url.pathname === '/_next/image' &&
          url.searchParams.get('url')?.startsWith('https://cdn.sanity.io/') === true),
      handler: new CacheFirst({
        cacheName: 'sanity-images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
        ],
      }),
    },
    {
      matcher: ({url}) =>
        url.origin === 'https://fonts.googleapis.com' ||
        url.origin === 'https://fonts.gstatic.com',
      handler: new StaleWhileRevalidate({
        cacheName: 'google-fonts',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }),
        ],
      }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: '/offline.html',
        matcher: ({request}) => request.destination === 'document',
      },
    ],
  },
})

serwist.addEventListeners()