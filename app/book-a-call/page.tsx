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

export default function BookACallPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main className="pt-32 pb-32 min-h-[60vh]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-16">
              <ScrambleHeading text="Book a Call." as="h1" className="text-5xl md:text-8xl font-serif mb-8" />
              <p className="text-2xl font-serif italic text-text-muted max-w-2xl mx-auto mt-8">
                Ready to launch? Tell us about your project or grab a time on our calendar.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-12 lg:gap-8 relative">
              {/* Left Column: Lead Form */}
              <div className="w-full lg:w-[42%] max-w-[480px] bg-surface p-8 md:p-10 rounded-3xl border border-foreground/5 shadow-xl shadow-black/5 flex-shrink-0 flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold mb-6">Send us an email</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Name</label>
                    <input type="text" className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Email</label>
                    <input type="email" className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Project Details</label>
                    <textarea rows={4} className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us what you're building..." />
                  </div>
                  <button className="w-full mt-2 py-4 bg-foreground text-background font-bold text-lg rounded-xl hover:bg-accent hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md">
                    Submit Inquiry
                  </button>
                </form>
              </div>

              {/* Middle Element */}
              <div className="flex flex-col items-center justify-center shrink-0 px-4 py-6 md:py-0">
                <div className="w-px h-24 bg-foreground/20 hidden lg:block" />
                <div className="flex flex-col items-center gap-4 my-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-text-muted tracking-widest uppercase -rotate-90 flex items-center justify-center w-8 h-8">
                    OR
                  </span>
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="w-px h-24 bg-foreground/20 hidden lg:block" />
              </div>

              {/* Right Column: Calendly Embed */}
              <div className="w-full lg:w-[42%] max-w-[480px] border border-foreground/10 rounded-3xl bg-surface flex flex-col items-center justify-start shadow-xl shadow-black/5 flex-shrink-0 relative overflow-hidden h-[650px] md:h-[700px]">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <div className="relative z-10 w-full h-full min-h-[650px]">
                  <iframe
                    src="https://calendly.com/launchlivestudio/30min?hide_gdpr_banner=1&hide_navigation=1"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
