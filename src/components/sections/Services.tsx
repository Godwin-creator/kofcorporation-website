import {getLocale} from 'next-intl/server'
import {client} from '@/lib/sanity'
import {SERVICES_QUERY} from '@/lib/queries'
import type {SanityService} from '@/types/sanity'
import ServicesClient, {type ServiceItem} from './ServicesClient'

export default async function Services() {
  const locale = await getLocale()
  const services = await client.fetch<SanityService[]>(SERVICES_QUERY, {}, {next: {tags: ['services']}}).catch(() => [])
  const items: ServiceItem[] = services.map((service) => ({
        id: service._id,
        title: locale === 'en' ? service.titleEn : service.title,
        summary: locale === 'en' ? service.summaryEn : service.summary,
        stack: service.stack ?? [],
        icon: service.icon,
        href: service.slug?.current ? `/services/${service.slug.current}` : '/services',
      }))

  return <ServicesClient services={items} />
}
