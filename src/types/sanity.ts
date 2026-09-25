export interface SanityImage {
  asset: { _ref: string }
  alt?: string
  hotspot?: object
}

export interface SanityStat {
  _id: string
  value: string
  label: string
  labelEn?: string
  icon?: string
  order: number
}

export type ProjectCategory = 'web' | 'mobile' | 'logiciel' | 'formation'
export type ProjectStatus = 'published' | 'draft' | 'archived'

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: ProjectCategory
  client: string
  sector: string
  description: string
  descriptionEn?: string
  shortDescription?: string
  shortDescriptionEn?: string
  technologies: string[]
  image?: SanityImage
  url?: string
  featured: boolean
  publishedAt?: string
  status?: ProjectStatus
  order: number
}

export interface SanityTestimonial {
  _id: string
  name: string
  role: string
  roleEn?: string
  company: string
  quote: string
  quoteEn?: string
  rating: number
  avatar?: SanityImage
  isVerified?: boolean
  order: number
}

export interface SanityPartner {
  _id: string
  name: string
  logo: SanityImage
  url?: string
  order: number
}

export interface SanityService {
  _id: string
  title: string
  titleEn: string
  slug: { current: string }
  summary: string
  summaryEn: string
  description: SanityBlock[]
  descriptionEn: SanityBlock[]
  icon: string
  stack: string[]
  order: number
  active: boolean
}

export interface SanityBlock {
  _key?: string
  _type: string
  children?: Array<{ _key?: string; _type: string; text?: string; marks?: string[] }>
  markDefs?: unknown[]
  style?: string
}

export interface CompanySettings {
  companyName: string
  phone: string[]
  email: string
  address: string
  openingHours?: string
  openingHoursEn?: string
  foundedYear?: number
  heroTitle?: string
  heroTitleEn?: string
  heroSubtitle?: string
  heroSubtitleEn?: string
  presentationVideoUrl?: string
  presentationVideoFileUrl?: string
  teamPhoto?: SanityImage
}

