import {getLocale} from 'next-intl/server'
import {urlFor} from '@/lib/sanity'
import {fetchProjects} from '@/lib/queries'
import type {SanityProject} from '@/types/sanity'
import RealisationsClient, {type RealisationItem} from './RealisationsClient'

export default async function RealisationsPage() {
  const locale = await getLocale()
  const projects = await fetchProjects() ?? []
  const items: RealisationItem[] = (projects as SanityProject[]).map((project) => {
    const primaryCategory = project.categories?.[0] ?? 'web';
    return {
      project,
      imageUrl: project.image?.asset?._ref ? urlFor(project.image).width(900).height(500).url() : undefined,
      title: project.title,
      sector: project.sector || primaryCategory,
      client: project.client ?? '',
      description: locale === 'en' ? project.shortDescriptionEn ?? project.descriptionEn ?? project.description ?? '' : project.shortDescription ?? project.description ?? '',
      features: '',
      tags: project.technologies ?? [],
      icon: primaryCategory === 'mobile' ? 'Smartphone' : primaryCategory === 'logiciel' ? 'Home' : primaryCategory === 'formation' ? 'GraduationCap' : 'Globe',
      categories: project.categories?.length ? project.categories : ['web'],
      url: project.links?.[0]?.url ?? '#'
    };
  })

  return <RealisationsClient projects={items} />
}
