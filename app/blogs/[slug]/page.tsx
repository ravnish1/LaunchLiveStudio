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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    return <BlogPostClient />
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": "https://www.launchlive.studio/og-preview.jpg",
    "author": {
      "@type": "Organization",
      "name": "Launch Live Studio",
      "url": "https://www.launchlive.studio/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Launch Live Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.launchlive.studio/logo.png"
      }
    },
    "datePublished": post.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostClient />
    </>
  )
}
