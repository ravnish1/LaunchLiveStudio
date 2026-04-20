'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/redesign/Navbar'
import { Footer } from '@/components/redesign/Footer'
import { BLOG_POSTS } from '@/lib/blog-data'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react'
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

export default function BlogPostPage() {
  const { slug } = useParams()
  const router = useRouter()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 text-center">
        <div>
          <h1 className="text-4xl font-serif mb-4">Post not found.</h1>
          <button onClick={() => router.push('/blogs')} className="text-accent hover:underline">Back to Blogs</button>
        </div>
      </div>
    )
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main className="pt-40 pb-32">
          <div className="max-w-[1280px] mx-auto px-6">

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link href="/blogs" className="group inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors font-bold uppercase tracking-widest text-xs">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Browse All Posts
              </Link>
            </motion.div>

            <article className="max-w-4xl mx-auto">
              {/* Header Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 mb-16"
              >
                <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="bg-accent/10 py-1 px-3 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock size={14} /> {post.readTime}
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] tracking-tight text-foreground">
                  {post.title}
                </h1>

                <p className="text-xl md:text-2xl font-serif italic text-text-muted leading-relaxed">
                  {post.description}
                </p>
              </motion.div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full aspect-video bg-surface rounded-[2.5rem] overflow-hidden mb-16 border border-border-subtle group relative"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent p-12 flex items-end">
                  {/* Optional caption or overlay detail */}
                </div>
              </motion.div>

              {/* Body Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {post.content.map((p, i) => (
                  <p key={i} className="text-lg md:text-xl text-foreground font-medium leading-[1.7] opacity-90">
                    {p}
                  </p>
                ))}

                {/* Tags */}
                <div className="pt-12 flex flex-wrap gap-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 text-xs font-bold text-text-muted border border-border-subtle px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-all cursor-default">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Conversion Path Divider */}
              <div className="my-24 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

              {/* THE ACTION SECTION (Conversion Path) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface border border-accent/20 rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl shadow-accent/5"
              >
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  Enjoyed this insight <br /> on {post.category}?
                </h2>
                <p className="text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 italic font-serif">
                  "At Launch Live Studio, we help brands implement these exact strategies to achieve measurable digital growth."
                </p>
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-white text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/25"
                >
                  Let's Build Your System &rarr;
                </Link>
                <p className="mt-8 text-xs font-bold tracking-[0.2em] text-text-muted uppercase">
                  FREE 30-MINUTE STRATEGY CONSULTATION
                </p>
              </motion.div>

              {/* OTHER BLOGS SECTION */}
              <div className="mt-32">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">CONTINUE READING</span>
                    <h3 className="text-4xl font-serif">More Insights.</h3>
                  </div>
                  <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors pb-1 border-b border-border-subtle hover:border-accent">
                    View all &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2).map((otherPost) => (
                    <Link
                      key={otherPost.slug}
                      href={`/blogs/${otherPost.slug}`}
                      className="group p-8 bg-surface border border-border-subtle rounded-3xl hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                    >
                      <p className="text-accent tracking-widest uppercase text-[10px] mb-3 font-bold">{otherPost.category}</p>
                      <h4 className="text-2xl font-serif group-hover:text-accent transition-colors mb-4">{otherPost.title}</h4>
                      <div className="flex items-center justify-between text-xs font-bold text-text-muted uppercase tracking-widest mt-6">
                        <span>{otherPost.date}</span>
                        <span className="group-hover:text-accent transition-colors">Read &rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </article>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
