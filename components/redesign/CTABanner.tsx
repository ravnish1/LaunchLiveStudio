'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrambleHeading } from './ScrambleHeading'
import { useRouter } from 'next/navigation'

export const CTABanner = ({ compact = false }: { compact?: boolean }) => {
  const router = useRouter();
  return (
    <section className={`${compact ? 'py-12' : 'py-20'} px-6 overflow-hidden`}>
      <div className={`${compact ? 'max-w-[1000px]' : 'max-w-[1280px]'} mx-auto w-full`}>
          <div className={`relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-accent ${compact ? 'p-6 md:p-10' : 'p-6 sm:p-10 md:p-16'} text-center group`}>
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.1),transparent)] opacity-50" />
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-secondary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </div>

            <div className={`relative z-10 ${compact ? 'space-y-6 md:space-y-8' : 'space-y-6 md:space-y-10'}`}>
              <div className="space-y-2 md:space-y-4">
                <ScrambleHeading text="◎ READY TO LAUNCH?" as="span" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/70 uppercase" staggerMs={30} scrambleFrames={4} />
                <h2 className="flex flex-col gap-1 md:gap-2">
                  <ScrambleHeading text="Let's build something" as="span" className={`font-serif text-white leading-tight md:leading-[0.9] tracking-tighter ${compact ? 'text-xl sm:text-3xl md:text-5xl lg:text-6xl' : 'text-2xl sm:text-4xl md:text-6xl lg:text-7xl'}`} staggerMs={35} scrambleFrames={5} />
                  <ScrambleHeading text="that turns heads." as="span" className={`font-serif text-white leading-tight md:leading-[0.9] tracking-tighter ${compact ? 'text-xl sm:text-3xl md:text-5xl lg:text-6xl' : 'text-2xl sm:text-4xl md:text-6xl lg:text-7xl'}`} staggerMs={35} scrambleFrames={5} />
                </h2>
              </div>
              
              <p className={`text-white/90 max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0 ${compact ? 'text-sm sm:text-base md:text-lg' : 'text-base sm:text-lg md:text-xl'}`}>
                Quality over volume. Reach out — we value your time and reply within 2 hours.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full pt-4">
                <button 
                  onClick={() => router.push('/book-a-call')} 
                  className={`w-full md:w-auto px-8 py-3.5 bg-white text-accent font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 text-center ${compact ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}
                >
                  Start a Project &rarr;
                </button>
                <a
                  href="mailto:hello@launchlive.studio"
                  className={`w-full md:w-auto px-6 md:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all border border-white/10 text-center whitespace-nowrap ${compact ? 'text-xs md:text-sm' : 'text-sm md:text-lg'}`}
                >
                  hello@launchlive.studio
                </a>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

