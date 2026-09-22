import {getTranslations} from 'next-intl/server'
import {client} from '@/lib/sanity'
import {STATS_QUERY} from '@/lib/queries'
import StatsClient, {type StatItem} from './StatsClient'

type SanityStat = { _id: string; value?: string; label?: string; labelEn?: string; icon?: string }

const FALLBACK_STATS = [
  {id: 'experience', value: '5ans', label: 'd’expérience', labelEn: 'of experience', icon: 'Clock'},
  {id: 'projects', value: '20+', label: 'projets réalisés', labelEn: 'projects delivered', icon: 'FolderCheck'},
  {id: 'satisfaction', value: '98%', label: 'de satisfaction client', labelEn: 'client satisfaction', icon: 'Star'},
  {id: 'training', value: '200+', label: 'étudiants formés', labelEn: 'students trained', icon: 'GraduationCap'},
]

export default async function Stats() {
  const t = await getTranslations('stats')
  const sanityStats = await client.fetch<SanityStat[]>(STATS_QUERY).catch(() => [])
  const source = sanityStats.length > 0 ? sanityStats : FALLBACK_STATS
  const stats: StatItem[] = source.map((stat: SanityStat | typeof FALLBACK_STATS[number], index: number) => {
    const value = stat.value ?? '0'
    const match = value.match(/^(\d+)(.*)$/)
    const id = '_id' in stat ? stat._id : undefined
    return {id: id ?? FALLBACK_STATS[index]?.id ?? `stat-${index}`, value: Number(match?.[1] ?? 0), suffix: match?.[2] || (index === 0 ? t('years') : ''), label: stat.label ?? FALLBACK_STATS[index]?.label ?? '', labelEn: stat.labelEn ?? FALLBACK_STATS[index]?.labelEn ?? '', icon: stat.icon ?? FALLBACK_STATS[index]?.icon ?? 'Star'}
  })
  return <StatsClient stats={stats} />
}