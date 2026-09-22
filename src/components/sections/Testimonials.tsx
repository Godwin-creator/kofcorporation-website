import {getLocale} from 'next-intl/server'
import {client} from '@/lib/sanity'
import {TESTIMONIALS_QUERY} from '@/lib/queries'
import TestimonialsClient, {type TestimonialItem} from './TestimonialsClient'

type SanityTestimonial = { _id: string; name?: string; role?: string; roleEn?: string; company?: string; quote?: string; quoteEn?: string; rating?: number }
const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {id: 'jhpiego', quote: "KofCorporation a su transformer un besoin complexe en une plateforme utile, accessible et adaptée aux réalités de notre public.", name: 'Représentant Jhpiego', role: 'Équipe projet JeunessePlus', rating: 5},
  {id: 'golden-group-technologies', quote: "Une équipe à l'écoute, réactive et engagée. La solution livrée nous aide à structurer nos activités et à mieux servir nos clients.", name: 'Représentant Golden Group Technologies', role: 'Direction des opérations', rating: 5},
  {id: 'aoa-togo', quote: "Nous avons apprécié la proximité de l'équipe et sa capacité à traduire notre vision en un site clair, moderne et facile à faire évoluer.", name: 'Représentant AOA Togo', role: "Coordination de l'organisation", rating: 5},
]

export default async function Testimonials() {
  const locale = await getLocale(); const testimonials = await client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY).catch(() => [])
  const items = testimonials.length ? testimonials.map((item: SanityTestimonial) => ({id: item._id, quote: locale === 'en' ? item.quoteEn ?? item.quote ?? '' : item.quote ?? '', name: item.name ?? '', role: locale === 'en' ? item.roleEn ?? item.role ?? '' : item.role ?? '', rating: item.rating ?? 5})) : FALLBACK_TESTIMONIALS
  return <TestimonialsClient testimonials={items} />
}