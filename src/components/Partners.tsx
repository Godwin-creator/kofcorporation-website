import { client, urlFor } from '@/lib/sanity'
import { fetchPartners } from '@/lib/queries'
import type { SanityPartner } from '@/types/sanity'
import PartnersClient, { type PartnerItem } from './PartnersClient'

export default async function Partners() {
  const partners = await fetchPartners() ?? []
  if (!partners.length) {
    console.warn('[Sanity] Aucune donnée trouvée pour le type "partner" - vérifier le Studio')
  }
  const items: PartnerItem[] = (partners as SanityPartner[]).map((partner) => ({ id: partner._id, name: partner.name, logo: urlFor(partner.logo).width(320).height(128).url(), url: partner.url }))
  return <PartnersClient partners={items} />
}
