import {getLocale} from 'next-intl/server'
import {fetchServices} from '@/lib/queries'
import type {SanityService} from '@/types/sanity'
import ServicesClient from './ServicesClient'

export default async function Services() {
  const locale = await getLocale()

  // Fetch service stacks from Sanity — these override the hardcoded defaults.
  // The service slug (e.g. "developpement-web") is used as the key.
  const services = await fetchServices() ?? []
  const sanityStacks: Record<string, string[]> = {}
  for (const svc of services as SanityService[]) {
    const key = svc.slug?.current
    if (key && svc.stack?.length) {
      sanityStacks[key] = svc.stack
    }
  }

  return <ServicesClient locale={locale} sanityStacks={sanityStacks} />
}
