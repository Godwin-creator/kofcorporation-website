import { getTranslations } from 'next-intl/server'
import { fetchStats } from '@/lib/queries'
import type { SanityStat } from '@/types/sanity'
import StatsClient, { type StatItem } from './StatsClient'


export default async function Stats() {
  const t = await getTranslations('stats')
  const sanityStats = (await fetchStats()) ?? []
  if (!sanityStats.length) {
    console.warn('[Sanity] Aucune donnée trouvée pour le type "stat" - vérifier le Studio')
  }
  const stats: StatItem[] = sanityStats.map((stat: SanityStat) => {
    const value = stat.value ?? '0'
    const match = value.match(/^(\d+)(.*)$/)
    return { id: stat._id, value: Number(match?.[1] ?? 0), suffix: match?.[2] || t('years'), label: stat.label, labelEn: stat.labelEn ?? stat.label, icon: stat.icon ?? 'Star' }
  })
  return <StatsClient stats={stats} />
}
