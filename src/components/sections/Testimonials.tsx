import { getLocale } from 'next-intl/server'
import { fetchTestimonials } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import type { SanityTestimonial } from '@/types/sanity'
import TestimonialsClient from './TestimonialsClient'

export default async function Testimonials() {
  const locale = await getLocale();
  const testimonials = (await fetchTestimonials()) ?? [];
  if (!testimonials.length) {
    console.warn('[Sanity] Aucune donnée trouvée pour le type "testimonial" - vérifier le Studio')
  }
  const items = (testimonials as SanityTestimonial[]).map((item: SanityTestimonial) => ({ 
    id: item._id, 
    quote: locale === 'en' ? item.quoteEn ?? item.quote : item.quote, 
    name: item.name, 
    role: locale === 'en' ? item.roleEn ?? item.role : item.role, 
    rating: item.rating ?? 5,
    avatarUrl: item.avatar ? urlFor(item.avatar).width(120).height(120).url() : undefined
  }))
  return <TestimonialsClient testimonials={items} />
}
