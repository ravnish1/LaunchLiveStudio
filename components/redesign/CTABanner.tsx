'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrambleHeading } from './ScrambleHeading'
import { useRouter } from 'next/navigation'

export const CTABanner = () => {
  const router = useRouter();
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-accent p-8 md:p-16 text-center group">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.1),transparent)] opacity-50" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-secondary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
              <ScrambleHeading text="◎ READY TO LAUNCH?" as="span" className="text-xs md:text-sm font-medium tracking-widest text-white/80 uppercase" staggerMs={30} scrambleFrames={4} />
              <ScrambleHeading text="Let's build something" as="h2" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] md:leading-[0.9] tracking-tighter" staggerMs={35} scrambleFrames={5} />
              <ScrambleHeading text="that turns heads" as="h2" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] md:leading-[0.9] tracking-tighter" staggerMs={35} scrambleFrames={5} />
              <ScrambleHeading text="and drives results." as="h2" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] md:leading-[0.9] tracking-tighter" staggerMs={35} scrambleFrames={5} />
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              We take on a limited number of projects each month.<br className="hidden md:block" /> Reach out — we respond within 24 hours.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
              <button onClick={() => router.push('/book-a-call')} className="w-full md:w-auto px-8 py-4 bg-white text-accent text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 text-center">
                Start a Project &rarr;
              </button>
              <a href="mailto:hello@launchlive.studio" className="w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-bold rounded-full transition-all border border-white/10 text-center break-all">
                hello@launchlive.studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

