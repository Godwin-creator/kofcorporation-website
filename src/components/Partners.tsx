import {client, urlFor} from '@/lib/sanity'
import {PARTNERS_QUERY} from '@/lib/queries'
import PartnersClient, {type PartnerItem} from './PartnersClient'

type SanityPartner = {_id: string; name?: string; logo?: unknown; url?: string}
const FALLBACK_PARTNERS: PartnerItem[] = [
  {id: 'aiesec', name: 'AIESEC', logo: '/images/partners/aiesec.png'}, {id: 'jhpiego', name: 'Jhpiego', logo: '/images/partners/jhpiego.png'}, {id: 'undp', name: 'UNDP', logo: '/images/partners/undp.png'}, {id: 'samanvoyage', name: 'SamanVoyage', logo: '/images/partners/samanvoyage.png'}, {id: 'golden-group', name: 'Golden Group Technologies', logo: '/images/partners/goldengroup.png'}, {id: 'giz', name: 'GIZ', logo: '/images/partners/giz.png'},
]

export default async function Partners() {
  const partners = await client.fetch<SanityPartner[]>(PARTNERS_QUERY).catch(() => [])
  const items = partners.length ? partners.map((partner) => ({id: partner._id, name: partner.name ?? '', logo: partner.logo ? urlFor(partner.logo).width(320).height(128).url() : '', url: partner.url})) : FALLBACK_PARTNERS
  return <PartnersClient partners={items} />
}