'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { ScrambleHeading } from '@/components/redesign/ScrambleHeading'
import { BLOG_POSTS } from '@/lib/blog-data'
import Link from 'next/link'
import Image from 'next/image'
import ClientReveal from '@/components/redesign/ClientReveal'

export default function BlogsPage() {
  return (
    <ClientReveal>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="pt-20 pb-20 min-h-[60vh]">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Optimized Header Section */}
            <div className="mb-8">
              <ScrambleHeading text="Blogs." as="h1" className="text-4xl md:text-6xl font-serif mb-2" />
              <p className="text-lg md:text-xl font-serif italic text-text-muted max-w-2xl mt-1">
                Insights, guides, and tools to accelerate your digital growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col h-full bg-surface border border-foreground/5 rounded-2xl overflow-hidden hover:border-accent transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-sm"
                >
                  {/* Blog Card Image Unit */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-foreground/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={i < 3} // Prioritize first row of cards
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <p className="text-accent tracking-widest uppercase text-[10px] font-black">{post.category}</p>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors mb-3 leading-tight line-clamp-2"> {post.title} </h3>
                    <p className="text-text-muted leading-relaxed flex-grow text-[14px] line-clamp-2 mb-4">{post.description}</p>

                    <div className="mt-auto pt-4 border-t border-foreground/5 flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                      <span>{post.date}</span>
                      <span className="text-foreground transition-colors flex items-center gap-2 group-hover:text-accent">
                        Read More <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </span>
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
    </ClientReveal>
  )
}
