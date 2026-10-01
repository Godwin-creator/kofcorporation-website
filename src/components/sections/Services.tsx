import {getLocale} from 'next-intl/server'
import {fetchSettings} from '@/lib/queries'
import {SERVICES} from '@/lib/services'
import ServicesClient from './ServicesClient'

export default async function Services() {
  const locale = await getLocale()

  const settings = await fetchSettings()
  const sanityStacks = Object.fromEntries(SERVICES.map((service) => [service.id, settings?.[service.stackKey] ?? []]))

  return <ServicesClient locale={locale} sanityStacks={sanityStacks} />
}
