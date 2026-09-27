import {getLocale} from 'next-intl/server'
import {fetchServices} from '@/lib/queries'
import type {SanityService} from '@/types/sanity'
import ServicesClient, {type ServiceItem} from './ServicesClient'

export default async function Services() {
  const locale = await getLocale()
  const services = (await fetchServices()) ?? []
  const items: ServiceItem[] = (services as SanityService[]).map((service) => ({
        id: service._id,
        title: locale === 'en' ? service.titleEn : service.title,
        summary: locale === 'en' ? service.summaryEn : service.summary,
        stack: service.stack ?? [],
        icon: service.icon,
        href: service.slug?.current ? `/services/${service.slug.current}` : '/services',
      }))

  return <ServicesClient services={items} />
}
