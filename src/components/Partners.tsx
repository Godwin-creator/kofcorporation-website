import {client, urlFor} from '@/lib/sanity'
import {PARTNERS_QUERY} from '@/lib/queries'
import type {SanityPartner} from '@/types/sanity'
import PartnersClient, {type PartnerItem} from './PartnersClient'

export default async function Partners() {
  const partners = await client.fetch<SanityPartner[]>(PARTNERS_QUERY, {}, {next: {tags: ['partners']}}).catch(() => [])
  const items: PartnerItem[] = partners.map((partner: SanityPartner) => ({id: partner._id, name: partner.name, logo: urlFor(partner.logo).width(320).height(128).url(), url: partner.url}))
  return <PartnersClient partners={items} />
}