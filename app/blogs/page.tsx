'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { ScrambleHeading } from '@/components/redesign/ScrambleHeading'
import { BLOG_POSTS } from '@/lib/blog-data'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/redesign/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export default function BlogsPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main className="pt-32 pb-32 min-h-[60vh]">
          <div className="max-w-[1280px] mx-auto px-6">
            <ScrambleHeading text="Blogs." as="h1" className="text-5xl md:text-8xl font-serif mb-8" />
            <p className="text-2xl font-serif italic text-text-muted max-w-2xl mt-8 mb-20">
              Insights, guides, and tools to accelerate your digital growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {BLOG_POSTS.map((post, i) => (
                 <Link 
                   key={post.slug} 
                   href={`/blogs/${post.slug}`}
                   className="group cursor-pointer flex flex-col h-full bg-surface border border-foreground/5 rounded-2xl overflow-hidden hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                 >
                    {/* Blog Card Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-foreground/5">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-accent tracking-widest uppercase text-[10px] mb-3 font-bold">{post.category}</p>
                      <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-3 leading-snug">{post.title}</h3>
                      <p className="text-text-muted leading-relaxed flex-grow text-sm line-clamp-2">{post.description}</p>
                      <div className="mt-6 pt-5 border-t border-foreground/5 flex justify-between items-center text-xs font-medium text-text-muted uppercase tracking-widest">
                         <span>{post.date}</span>
                         <span className="group-hover:text-accent transition-colors flex items-center gap-1">Read <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                      </div>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  )
}
