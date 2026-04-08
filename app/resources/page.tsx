'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { ScrambleHeading } from '@/components/redesign/ScrambleHeading'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/redesign/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export default function ResourcesPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main className="pt-32 pb-32 min-h-[60vh]">
          <div className="max-w-[1280px] mx-auto px-6">
            <ScrambleHeading text="Resources." as="h1" className="text-5xl md:text-8xl font-serif mb-8" />
            <p className="text-2xl font-serif italic text-text-muted max-w-2xl mt-8 mb-20">
              Insights, guides, and tools to accelerate your digital growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   title: 'The Future of AI Automation for Agencies', 
                   category: 'Artificial Intelligence',
                   desc: 'How tools like Claude and OpenAI are dramatically cutting operational overhead for modern creative agencies.',
                   date: 'Apr 02, 2026'
                 },
                 {
                   title: 'Scaling with Next.js App Router', 
                   category: 'Engineering',
                   desc: 'A complete breakdown of our transition to Next.js App Router and the massive performance wins we unlocked.',
                   date: 'Mar 15, 2026'
                 },
                 {
                   title: 'Building Premium Brands in 2026', 
                   category: 'Design',
                   desc: 'Why micro-interactions and performance optimization have become the new standard for premium luxury brands.',
                   date: 'Feb 28, 2026'
                 }
               ].map((post, i) => (
                 <div key={i} className="group cursor-pointer flex flex-col h-full bg-surface border border-foreground/5 p-6 rounded-2xl hover:border-accent transition-all duration-300">
                    <p className="text-accent tracking-widest uppercase text-[10px] mb-3 font-bold">{post.category}</p>
                    <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-3 leading-snug">{post.title}</h3>
                    <p className="text-text-muted leading-relaxed flex-grow text-sm">{post.desc}</p>
                    <div className="mt-6 pt-5 border-t border-foreground/5 flex justify-between items-center text-xs font-medium text-text-muted uppercase tracking-widest">
                       <span>{post.date}</span>
                       <span className="group-hover:text-accent transition-colors">Read &rarr;</span>
                    </div>
                 </div>
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
