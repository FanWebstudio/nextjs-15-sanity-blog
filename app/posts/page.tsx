import Link from 'next/link'
import { getPosts } from '@/lib/sanity'
import { Post } from '@/types/post'
import { formatDate } from '@/lib/utils'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Posts() {
  const posts = await getPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <section className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">All Posts</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Browse through all articles
          </p>
        </div>

        <div className="space-y-12">
          {posts.map((post: Post) => (
            <article key={post._id} className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0">
              <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <h2 className="text-2xl font-bold">
                <Link 
                  href={`/posts/${post.slug.current}`}
                  className="hover:text-gray-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              )}
              <div>
                <Link 
                  href={`/posts/${post.slug.current}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}