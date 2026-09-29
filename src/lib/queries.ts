import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import type { CompanySettings, SanityProject, SanityTestimonial, SanityPartner, SanityService } from "@/types/sanity";

// ─────────────────────────────────────────────
// Queries (GROQ strings) — imported by components
// ─────────────────────────────────────────────

export const STATS_QUERY = defineQuery(`
  *[_type == "stat"] | order(order asc) { _id, value, label, labelEn, icon, order }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && (status == "published" || !defined(status))]
    | order(publishedAt desc, order asc) {
      _id, title, slug, category, categories, client, sector, description, descriptionEn,
      shortDescription, shortDescriptionEn, technologies, image, gallery, url, links,
      year, duration, durationEn, featured, publishedAt, status, order
    }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true && (status == "published" || !defined(status))]
    | order(publishedAt desc, order asc)[0...3] {
      _id, title, slug, category, categories, client, sector, description, descriptionEn,
      shortDescription, shortDescriptionEn, technologies, image, gallery, url, links,
      year, duration, durationEn, featured, publishedAt, status, order
    }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id, name, role, roleEn, company, quote, quoteEn, rating, avatar, isVerified, order
  }
`);

export const PARTNERS_QUERY = defineQuery(`
  *[_type == "partner"] | order(order asc) { _id, name, logo, url, order }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && active == true] | order(order asc) {
    _id, title, titleEn, slug, summary, summaryEn, description, descriptionEn,
    icon, stack, order, active
  }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "companySettings"][0] {
    companyName, phone, email, address, openingHours, openingHoursEn,
    foundedYear, heroTitle, heroTitleEn, heroSubtitle, heroSubtitleEn,
    presentationVideoUrl, "presentationVideoFileUrl": presentationVideoFile.asset->url,
    teamPhoto
  }
`);

// ─────────────────────────────────────────────
// Fetch helpers (live content API)
// ─────────────────────────────────────────────

export async function fetchStats() {
  try {
    const { data } = await sanityFetch({ query: STATS_QUERY });
    return data as { _id: string; value: string; label: string; labelEn?: string; icon?: string; order: number }[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchStats failed:', error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    const { data } = await sanityFetch({ query: PROJECTS_QUERY });
    return data as SanityProject[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchProjects failed:', error);
    return [];
  }
}

export async function fetchFeaturedProjects() {
  try {
    const { data } = await sanityFetch({ query: FEATURED_PROJECTS_QUERY });
    return data as SanityProject[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchFeaturedProjects failed:', error);
    return [];
  }
}

export async function fetchTestimonials() {
  try {
    const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
    return data as SanityTestimonial[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchTestimonials failed:', error);
    return [];
  }
}

export async function fetchPartners() {
  try {
    const { data } = await sanityFetch({ query: PARTNERS_QUERY });
    return data as SanityPartner[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchPartners failed:', error);
    return [];
  }
}

export async function fetchServices() {
  try {
    const { data } = await sanityFetch({ query: SERVICES_QUERY });
    return data as SanityService[] | undefined;
  } catch (error) {
    console.error('[Sanity] fetchServices failed:', error);
    return [];
  }
}

export async function fetchSettings() {
  try {
    const { data } = await sanityFetch({ query: SETTINGS_QUERY });
    return data as CompanySettings | undefined;
  } catch (error) {
    console.error('[Sanity] fetchSettings failed:', error);
    return undefined;
  }
}
