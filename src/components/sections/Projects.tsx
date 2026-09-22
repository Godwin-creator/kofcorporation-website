import {getLocale} from 'next-intl/server'
import {client, urlFor} from '@/lib/sanity'
import {FEATURED_PROJECTS_QUERY} from '@/lib/queries'
import ProjectsClient, {type ProjectItem} from './ProjectsClient'

type SanityProject = { _id: string; title?: string; category?: string; sector?: string; description?: string; descriptionEn?: string; technologies?: string[]; image?: unknown; url?: string }
const FALLBACK_PROJECTS: ProjectItem[] = [
  {id: 'aoa-togo', title: 'AOA Togo', sector: 'ONG', description: 'Site vitrine pour une ONG, avec CMS headless et déploiement continu.', tags: ['React 19', 'Tailwind', 'Sanity CMS', 'Vercel'], url: 'https://aoa-togo.org', category: 'web'},
  {id: 'jeunesse-plus', title: 'JeunessePlus', sector: 'Santé', description: "Plateforme dédiée à l'éducation sexuelle et reproductive, avec quiz, forum et ligne verte.", tags: ['Laravel', 'Flutter', 'Firebase', 'MySQL'], url: 'https://jeunesse-plus.com', category: 'mobile'},
  {id: 'elycha', title: 'Elycha', sector: 'Immobilier / Auto', description: "Application d'annonces immobilières et automobiles avec favoris et notifications en temps réel.", tags: ['Laravel', 'Flutter', 'Firebase', 'MySQL'], url: 'https://elycha.com', category: 'mobile'},
]

export default async function Projects() {
  const locale = await getLocale()
  const projects = await client.fetch<SanityProject[]>(FEATURED_PROJECTS_QUERY).catch(() => [])
  const items = projects.length ? projects.map((project: SanityProject) => ({id: project._id, title: project.title ?? '', sector: project.sector ?? project.category ?? '', description: locale === 'en' ? project.descriptionEn ?? project.description ?? '' : project.description ?? '', tags: project.technologies ?? [], url: project.url ?? '#', category: project.category ?? 'web', imageUrl: project.image ? urlFor(project.image).width(900).height(500).url() : undefined})) : FALLBACK_PROJECTS
  return <ProjectsClient projects={items} />
}