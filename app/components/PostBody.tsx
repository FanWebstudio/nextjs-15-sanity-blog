'use client';

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/image'

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value)
      if (!imageUrl) {
        return null
      }
      
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-4">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

interface PostBodyProps {
  content: any
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
