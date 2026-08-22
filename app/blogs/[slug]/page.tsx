import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/blog-data'
import { BlogPostClient } from './BlogPostClient'
import Script from 'next/script'
import { getAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `https://www.launchlive.studio${post.image}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: getAlternates(`/blogs/${slug}`),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.launchlive.studio/blogs/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      authors: ['Launch Live Studio'],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `https://www.launchlive.studio${post.image}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.launchlive.studio/blogs/${slug}`,
        },
        headline: post.title,
        description: post.description,
        image: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'Launch Live Studio',
          url: 'https://www.launchlive.studio/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Launch Live Studio',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.launchlive.studio/logo.png',
          },
        },
        datePublished: post.date,
        dateModified: post.date,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.launchlive.studio/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogs',
            item: 'https://www.launchlive.studio/blogs',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://www.launchlive.studio/blogs/${slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id={`schema-blog-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostClient post={post} />
    </>
  )
}

