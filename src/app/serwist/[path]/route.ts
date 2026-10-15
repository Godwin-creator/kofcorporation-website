import { createSerwistRoute } from '@serwist/turbopack'

export const {
  dynamic,
  dynamicParams,
  revalidate,
  generateStaticParams,
  GET,
} = createSerwistRoute({
  additionalPrecacheEntries: [{url: '/offline.html', revision: 'offline-v1'}],
  globIgnores: ['**/node_modules/**/*', 'public/videos/**/*'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
})