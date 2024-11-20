import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export function urlForImage(source: Image | undefined) {
  if (!source || !source.asset?._ref) {
    return null
  }

  return imageBuilder
    .image(source)
    .auto('format')
    .fit('max')
    .url()
}
