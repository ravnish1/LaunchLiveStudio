'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ScrambleText } from './ScrambleText'
import { HeroVisual } from './HeroVisual'

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center px-6 pt-32 md:pt-32 pb-20 md:pb-28 noise-bg">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-[10%] md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-[10%] md:right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-foreground/5 rounded-full blur-[100px]" />
      </div>

      {/* 2-Column Grid Layout */}
      <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20 z-10 items-center">

        {/* Column — Text Content (Appears second on mobile) */}
        <div className="flex flex-col items-start gap-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full text-center md:text-left"
          >
            <h1 className="text-[12vw] md:text-[7vw] lg:text-[4.5vw] font-serif leading-[1.15] tracking-[-0.03em] overflow-visible">
              <ScrambleText text="We Build What" as="span" trigger={true} staggerMs={60} scrambleFrames={6} frameDurationMs={50} />
              <br />
              <ScrambleText text="The Future" as="span" className="italic" trigger={true} staggerMs={60} scrambleFrames={6} frameDurationMs={50} />
              <br />
              <ScrambleText text="Looks Like." as="span" trigger={true} staggerMs={60} scrambleFrames={6} frameDurationMs={50} />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md w-full mx-auto md:mx-0 text-center md:text-left"
          >
            <p className="text-xl md:text-2xl font-serif text-text-muted leading-relaxed">
              Launch Live Studio is a full service digital partner
              helping businesses scale through high performance websites,
              AI powered systems, automation, and growth focused design.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full">
              <Link href="/book-a-call" className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 text-center inline-block">
                Start a Project &rarr;
              </Link>
              <Link href="/work" className="w-full sm:w-auto px-8 py-4 border border-foreground/10 hover:border-foreground/30 text-foreground font-bold rounded-full transition-all text-center inline-block">
                See Our Work &darr;
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Column — Visualization (Appears first on mobile) */}
        <div className="flex items-center justify-center w-full min-h-[70vh] md:min-h-0 order-1 md:order-2 mb-12 md:mb-0">
          <HeroVisual />
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="scroll-indicator"
        style={{ pointerEvents: scrollY > 200 ? 'none' : 'auto' }}
      >
        <span className="scroll-label">SCROLL &darr;</span>
        <div className="scroll-line-wrapper">
          <div className="scroll-line-inner" />
        </div>
      </motion.div>
    </section >
  )
}

