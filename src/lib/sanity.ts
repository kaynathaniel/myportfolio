import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImage } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: process.env.NODE_ENV === 'production' })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImage) {
  if (!builder) return { url: () => '' }
  return builder.image(source)
}

export const isSanityConfigured = Boolean(projectId)
