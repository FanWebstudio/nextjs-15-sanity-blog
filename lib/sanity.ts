import { createClient } from 'next-sanity'
import { Post } from '@/types/post'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to ensure fresh data
  perspective: 'published',
})

export async function getPosts(): Promise<Post[]> {
  if (!client) throw new Error('Sanity client is not initialized')

  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage
      }`
    )
    
    console.log('Fetched posts:', posts)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  if (!client) throw new Error('Sanity client is not initialized')

  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage
      }`
    )
    
    console.log('Fetched latest posts:', posts)
    return posts
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    throw error
  }
}

export async function getPost(slug: string): Promise<Post> {
  if (!client) throw new Error('Sanity client is not initialized')
  if (!slug) throw new Error('Slug is required')

  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        body
      }`,
      { slug }
    )
    
    if (!post) throw new Error(`Post not found: ${slug}`)
    console.log('Fetched post:', post)
    return post
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    throw error
  }
}
