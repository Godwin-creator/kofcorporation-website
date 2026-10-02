import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kofcorporation.com'
  const locales = ['fr', 'en']

  const staticRoutes = [
    '',
    '/services',
    '/services/developpement-web',
    '/services/applications-mobiles',
    '/services/logiciels-gestion',
    '/services/formations',
    '/realisations',
    '/qui-sommes-nous',
    '/contact',
  ]

  const entries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route.includes('services') ? 0.8 : 0.6,
    }))
  )

  return entries
}