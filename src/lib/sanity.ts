import { createClient, type SanityClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
)

const createFallbackFetch = async <T = unknown>() => [] as T

const fallbackClient = {
  fetch: createFallbackFetch,
} as unknown as SanityClient

export const client: SanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : fallbackClient

const fallbackImageBuilder = () => ({
  width: () => ({
    height: () => ({ url: () => '' }),
    url: () => '',
  }),
  height: () => ({ url: () => '' }),
  url: () => '',
})

const fallbackBuilder = {
  image: () => fallbackImageBuilder(),
} as unknown as ReturnType<typeof createImageUrlBuilder>

export const builder: ReturnType<typeof createImageUrlBuilder> = hasSanityConfig
  ? createImageUrlBuilder(client)
  : fallbackBuilder

export const urlFor = (source: unknown) => {
  if (!hasSanityConfig || !source) {
    return fallbackImageBuilder()
  }

  return builder.image(source as Parameters<typeof builder.image>[0])
}