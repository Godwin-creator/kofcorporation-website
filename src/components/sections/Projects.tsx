import { getLocale } from 'next-intl/server'
import { client, urlFor } from '@/lib/sanity'
import { fetchFeaturedProjects } from '@/lib/queries'
import type { SanityProject } from '@/types/sanity'
import ProjectsClient, { type ProjectItem } from './ProjectsClient'

export default async function Projects() {
  const locale = await getLocale()
  const projects = await fetchFeaturedProjects() ?? []
  if (!projects.length) {
    console.warn('[Sanity] Aucune donnée trouvée pour le type "project" (featured=true) - vérifier le Studio')
  }
  const items: ProjectItem[] = (projects as SanityProject[]).map((project: SanityProject) => ({
    id: project._id,
    title: project.title,
    sector: project.sector || (project.categories?.[0] ?? ''),
    description: locale === 'en' ? project.shortDescriptionEn ?? project.descriptionEn ?? project.description ?? '' : project.shortDescription ?? project.description ?? '',
    tags: project.technologies ?? [],
    url: project.links?.[0]?.url ?? '#',
    category: project.categories?.[0] ?? 'web',
    imageUrl: project.image?.asset?._ref ? urlFor(project.image).width(900).height(500).url() : undefined,
    project
  }))
  return <ProjectsClient projects={items} />
}
