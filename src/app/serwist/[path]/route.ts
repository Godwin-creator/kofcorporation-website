import { createSerwistRoute } from '@serwist/turbopack'

export const {
  dynamic,
  dynamicParams,
  revalidate,
  generateStaticParams,
  GET,
} = createSerwistRoute({
  // '/offline.html' vit dans public/ : @serwist/turbopack le precache deja
  // automatiquement, avec sa propre revision. L'ajouter ici creait une
  // seconde entree pour la meme URL et serwist levait
  // add-to-cache-list-conflicting-entries pendant l'evaluation du script,
  // si bien que le service worker ne s'installait jamais en production.
  globIgnores: ['**/node_modules/**/*', 'public/videos/**/*'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
})