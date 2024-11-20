import Link from 'next/link'
import Image from 'next/image'
import { getLatestPosts } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function Home() {
  const posts = await getLatestPosts(3).catch((error) => {
    console.error('Failed to fetch posts:', error)
    return []
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <section className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to My Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore my latest thoughts and insights
          </p>
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = post.mainImage ? urlForImage(post.mainImage) : null

                return (
                  <article key={post._id} className="flex flex-col space-y-4">
                    <Link href={`/posts/${post.slug.current}`} className="block relative aspect-[16/9] w-full group">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover rounded-lg transition-transform group-hover:scale-105"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-600">No image</span>
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 space-y-2">
                      <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <h3 className="text-xl font-bold">
                        <Link 
                          href={`/posts/${post.slug.current}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div>
                      <Link 
                        href={`/posts/${post.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No posts found. Check back soon for new content!
            </div>
          )}
          <div className="text-center pt-8">
            <Link
              href="/posts"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
