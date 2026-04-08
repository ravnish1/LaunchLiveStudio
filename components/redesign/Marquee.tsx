'use client'

import React from 'react'

const services = [
  'WEB DEVELOPMENT',
  'AI SYSTEMS',
  'BRANDING & IDENTITY',
  'SEO OPTIMIZATION',
  'MARKETING AUTOMATION',
  'AI TOOL CREATION',
  'UI/UX DESIGN',
  'GROWTH CONSULTING',
  'LAUNCH LIVE STUDIO',
]

// Join services with a bullet to simulate continuous ticker text
const textTicker = services.join('  ✦  ') + '  ✦  '

export const Marquee = () => {
  return (
    <section className="py-12 md:py-16 border-y border-foreground/5 overflow-hidden bg-background">
      <div className="flex flex-col gap-10">
        {/* Row 1: Left → Right */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            <span className="text-4xl md:text-7xl font-sans font-bold tracking-tighter text-foreground/10 mx-6 hover:text-foreground hover:opacity-100 transition-colors duration-500">
              {textTicker}{textTicker}{textTicker}
            </span>
          </div>
        </div>

        {/* Row 2: Right → Left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap items-center">
             <span className="text-4xl md:text-7xl font-sans font-bold tracking-tighter text-foreground/10 mx-6 hover:text-foreground hover:opacity-100 transition-colors duration-500">
              {textTicker}{textTicker}{textTicker}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
