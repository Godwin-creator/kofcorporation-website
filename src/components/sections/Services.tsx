import {getLocale} from 'next-intl/server'
import ServicesClient from './ServicesClient'

export default async function Services() {
  const locale = await getLocale()
  return <ServicesClient locale={locale} />
}
