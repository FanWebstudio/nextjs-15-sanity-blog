import { Image } from '@sanity/types'

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt: string
  mainImage?: Image
  body?: any
}
