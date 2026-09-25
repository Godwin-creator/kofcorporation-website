import {getLocale} from 'next-intl/server'
import {client} from '@/lib/sanity'
import {TESTIMONIALS_QUERY} from '@/lib/queries'
import type {SanityTestimonial} from '@/types/sanity'
import TestimonialsClient from './TestimonialsClient'

export default async function Testimonials() {
  const locale = await getLocale(); const testimonials = await client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY, {}, {next: {tags: ['testimonials']}}).catch(() => [])
  const items = testimonials.map((item: SanityTestimonial) => ({id: item._id, quote: locale === 'en' ? item.quoteEn ?? item.quote : item.quote, name: item.name, role: locale === 'en' ? item.roleEn ?? item.role : item.role, rating: item.rating ?? 5}))
  return <TestimonialsClient testimonials={items} />
}