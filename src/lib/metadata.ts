import type { Metadata } from 'next'

type LocaleContent = {
  title: string
  description: string
}

type LocalizedContent = {
  fr: LocaleContent
  en: LocaleContent
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kofcorporation.com'
const ogImageUrl = new URL('/og-image.jpeg', siteUrl).toString()

export async function createLocalizedMetadata(
  params: Promise<{ locale: string }>,
  pathname: string,
  content: LocalizedContent
): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = locale === 'en' ? 'en' : 'fr'
  const pageContent = content[currentLocale]
  const pageUrl = new URL(`/${currentLocale}${pathname}`, siteUrl).toString()
  const title = `${pageContent.title} | KofCorporation`

  return {
    title: pageContent.title,
    description: pageContent.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: new URL(`/fr${pathname}`, siteUrl).toString(),
        en: new URL(`/en${pathname}`, siteUrl).toString(),
      },
    },
    openGraph: {
      title,
      description: pageContent.description,
      url: pageUrl,
      siteName: 'KofCorporation',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      locale: currentLocale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pageContent.description,
      images: [ogImageUrl],
    },
  }
}
