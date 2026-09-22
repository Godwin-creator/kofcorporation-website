export const STATS_QUERY = `
  *[_type == "stat"] | order(order asc) { _id, value, label, labelEn, icon }
`

export const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    _id, title, slug, category, client, sector, description, descriptionEn,
    technologies, image, url, featured
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc)[0...3] {
    _id, title, slug, category, client, sector, description, descriptionEn,
    technologies, image, url
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, name, role, roleEn, company, quote, quoteEn, rating
  }
`

export const PARTNERS_QUERY = `
  *[_type == "partner"] | order(order asc) { _id, name, logo, url }
`