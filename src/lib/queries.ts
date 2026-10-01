import {defineQuery} from 'next-sanity'
import {sanityFetch} from '@/sanity/lib/live'
import type {CompanySettings, SanityPartner, SanityProject, SanityStat, SanityTestimonial} from '@/types/sanity'

export const STATS_QUERY = defineQuery(`*[_type == "stat"] | order(order asc) { _id, value, label, labelEn, icon, order }`)
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && featured == true && (status == "published" || !defined(status))] | order(order asc)[0...3] { _id, title, slug, categories, client, sector, shortDescription, shortDescriptionEn, technologies, image, links, featured, year }`)
export const ALL_PROJECTS_QUERY = defineQuery(`*[_type == "project" && (status == "published" || !defined(status))] | order(order asc) { _id, title, slug, categories, client, sector, description, descriptionEn, shortDescription, shortDescriptionEn, technologies, image, gallery, links, featured, year, publishedAt, order }`)
export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(order asc) { _id, name, role, roleEn, company, avatar, quote, quoteEn, rating, isVerified, order }`)
export const PARTNERS_QUERY = defineQuery(`*[_type == "partner"] | order(order asc) { _id, name, logo, url, order }`)
export const SETTINGS_QUERY = defineQuery(`*[_type == "companySettings"][0] { presentationVideoUrl, "presentationVideoFileUrl": presentationVideoFile.asset->url, teamPhoto, stackWeb, stackMobile, stackLogiciel, stackFormation, phone, email, address, openingHours, openingHoursEn, heroTitle, heroTitleEn, heroSubtitle, heroSubtitleEn, heroSlogans, socialLinks, mapsUrl, mapsEmbedUrl }`)

async function fetchData<T>(query: string, fallback: T): Promise<T> {
  try { const {data} = await sanityFetch({query}); return (data ?? fallback) as T }
  catch (error) { console.error('[Sanity] fetch failed:', error); return fallback }
}
export const fetchStats = () => fetchData<SanityStat[]>(STATS_QUERY, [])
export const fetchFeaturedProjects = () => fetchData<SanityProject[]>(FEATURED_PROJECTS_QUERY, [])
export const fetchProjects = () => fetchData<SanityProject[]>(ALL_PROJECTS_QUERY, [])
export const fetchTestimonials = () => fetchData<SanityTestimonial[]>(TESTIMONIALS_QUERY, [])
export const fetchPartners = () => fetchData<SanityPartner[]>(PARTNERS_QUERY, [])
export const fetchSettings = () => fetchData<CompanySettings | undefined>(SETTINGS_QUERY, undefined)
