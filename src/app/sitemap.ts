import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://kofcorporation.com'
  const locales = ['fr', 'en']

  const staticRoutes = [
    '',
    '/services',
    '/services/developpement-web',
    '/services/applications-mobiles',
    '/services/logiciels-gestion',
    '/realisations',
    '/qui-sommes-nous',
    '/contact',
    '/mentions-legales',
  ]

  const entries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const isHome = route === ''
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isHome
          ? 'weekly'
          : route.includes('services')
            ? 'monthly'
            : 'monthly',
        priority: isHome
          ? 1.0
          : route.includes('services')
            ? 0.8
            : route === '/mentions-legales'
              ? 0.3
              : 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      }
    })
  )

  return entries
}