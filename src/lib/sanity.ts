import {createClient} from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const builder = createImageUrlBuilder(client)
export const urlFor = (source: unknown) => builder.image(source as Parameters<typeof builder.image>[0])