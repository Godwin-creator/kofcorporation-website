export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-21'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!configuredProjectId && process.env.NODE_ENV === 'production') {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID in production. Sanity Studio cannot connect to the configured project.',
  )
}

export const projectId =
  configuredProjectId || (process.env.NODE_ENV === 'production' ? '' : 'placeholder-project-id')
