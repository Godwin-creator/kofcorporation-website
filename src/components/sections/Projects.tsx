import {getLocale} from 'next-intl/server'
import {client, urlFor} from '@/lib/sanity'
import {FEATURED_PROJECTS_QUERY} from '@/lib/queries'
import type {SanityProject} from '@/types/sanity'
import ProjectsClient, {type ProjectItem} from './ProjectsClient'

export default async function Projects() {
  const locale = await getLocale()
  const projects = await client.fetch<SanityProject[]>(FEATURED_PROJECTS_QUERY, {}, {next: {tags: ['projects']}}).catch(() => [])
  const items: ProjectItem[] = projects.map((project: SanityProject) => ({id: project._id, title: project.title, sector: project.sector || project.category, description: locale === 'en' ? project.shortDescriptionEn ?? project.descriptionEn ?? project.description : project.shortDescription ?? project.description, tags: project.technologies, url: project.url ?? '#', category: project.category, imageUrl: project.image ? urlFor(project.image).width(900).height(500).url() : undefined, project}))
  return <ProjectsClient projects={items} />
}