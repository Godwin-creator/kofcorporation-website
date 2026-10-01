export interface SanityImage {
  asset: {_ref: string; _type: 'reference'}
  alt?: string
  hotspot?: {x: number; y: number; height: number; width: number}
}
export type ProjectCategory = 'web' | 'mobile' | 'logiciel' | 'formation'
export type ProjectLinkType = 'web' | 'playstore' | 'appstore' | 'github' | 'demo' | 'other'
export interface ProjectLink {_key: string; type: ProjectLinkType; url: string; label?: string}
export interface SanityStat {_id: string; value: string; label: string; labelEn?: string; icon?: string; order: number}
export interface SanityProject {
  _id: string; title: string; slug: {current: string}; categories: ProjectCategory[]; client?: string; sector?: string
  description?: string; descriptionEn?: string; shortDescription?: string; shortDescriptionEn?: string
  technologies?: string[]; image?: SanityImage; gallery?: SanityImage[]; links?: ProjectLink[]
  featured: boolean; year?: number; publishedAt?: string; order?: number
}
export interface SanityTestimonial {_id: string; name: string; role?: string; roleEn?: string; company?: string; avatar?: SanityImage; quote: string; quoteEn?: string; rating?: number; isVerified?: boolean; order?: number}
export interface SanityPartner {_id: string; name: string; logo: SanityImage; url?: string; order?: number}
export interface CompanySettings {
  presentationVideoUrl?: string; presentationVideoFileUrl?: string; teamPhoto?: SanityImage
  stackWeb?: string[]; stackMobile?: string[]; stackLogiciel?: string[]; stackFormation?: string[]
  phone?: string[]; email?: string; address?: string; openingHours?: string; openingHoursEn?: string
  heroTitle?: string; heroTitleEn?: string; heroSubtitle?: string; heroSubtitleEn?: string
  heroSlogans?: Array<{lineOneFr: string; lineTwoFr: string; lineOneEn: string; lineTwoEn: string}>
  socialLinks?: {facebook?: string; twitter?: string; instagram?: string; linkedin?: string; tiktok?: string}
  mapsUrl?: string; mapsEmbedUrl?: string
}
