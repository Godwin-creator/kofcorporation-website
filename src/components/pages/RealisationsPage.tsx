import {getLocale} from 'next-intl/server'
import {client, urlFor} from '@/lib/sanity'
import {PROJECTS_QUERY} from '@/lib/queries'
import type {SanityProject} from '@/types/sanity'
import RealisationsClient, {type RealisationItem} from './RealisationsClient'

export default async function RealisationsPage() {
  const locale = await getLocale()
  const projects = await client.fetch<SanityProject[]>(PROJECTS_QUERY, {}, {next: {tags: ['projects']}}).catch(() => [])
  const items: RealisationItem[] = projects.map((project) => ({project, imageUrl: project.image ? urlFor(project.image).width(900).height(500).url() : undefined, title: project.title, sector: project.sector || project.category, client: project.client, description: locale === 'en' ? project.shortDescriptionEn ?? project.descriptionEn ?? project.description : project.shortDescription ?? project.description, features: '', tags: project.technologies, icon: project.category === 'mobile' ? 'Smartphone' : project.category === 'logiciel' ? 'Home' : project.category === 'formation' ? 'GraduationCap' : 'Globe'}))

  return <RealisationsClient projects={items} />
}
