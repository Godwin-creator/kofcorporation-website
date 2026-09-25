export const STATS_QUERY = `
  *[_type == "stat"] | order(order asc) { _id, value, label, labelEn, icon, order }
`

export const PROJECTS_QUERY = `
  *[_type == "project" && (status == "published" || !defined(status))] | order(publishedAt desc, order asc) {
    _id, title, slug, category, client, sector, description, descriptionEn,
    shortDescription, shortDescriptionEn, technologies, image, url, featured, publishedAt, status, order
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true && (status == "published" || !defined(status))] | order(publishedAt desc, order asc)[0...3] {
    _id, title, slug, category, client, sector, description, descriptionEn,
    shortDescription, shortDescriptionEn, technologies, image, url, featured, publishedAt, status, order
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, name, role, roleEn, company, quote, quoteEn, rating, avatar, isVerified, order
  }
`

export const PARTNERS_QUERY = `
  *[_type == "partner"] | order(order asc) { _id, name, logo, url, order }
`

export const SERVICES_QUERY = `
  *[_type == "service" && active == true] | order(order asc) {
    _id, title, titleEn, slug, summary, summaryEn, description, descriptionEn, icon, stack, order, active
  }
`

export const SETTINGS_QUERY = `
  *[_type == "companySettings"][0] {
    companyName, phone, email, address, openingHours, openingHoursEn,
    foundedYear, heroTitle, heroTitleEn, heroSubtitle, heroSubtitleEn,
    presentationVideoUrl, "presentationVideoFileUrl": presentationVideoFile.asset->url,
    teamPhoto
  }
`