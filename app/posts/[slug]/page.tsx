import Image from 'next/image'
import { getPost } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'
import PostBody from '@/app/components/PostBody'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold">Post not found</h1>
      </div>
    )
  }

  const imageUrl = post.mainImage ? urlForImage(post.mainImage) : null

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="space-y-4 mb-8">
        <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
        )}
        {imageUrl && (
          <div className="relative w-full h-[60vh] mt-8">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
      </header>

      {post.body && <PostBody content={post.body} />}
    </article>
  )
}
