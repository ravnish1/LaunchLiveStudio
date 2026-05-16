import React from 'react'
import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'
import { BlogPostClient } from './BlogPostClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Launch Live Studio`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `https://www.launchlive.studio/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: "/og-preview.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      authors: ["Launch Live Studio"],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-preview.jpg"],
    },
  }
}

export default function BlogPostPage() {
  return <BlogPostClient />
}
