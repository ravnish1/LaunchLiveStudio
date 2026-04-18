'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { motion, useSpring, useTransform, useVelocity, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { Zap, Box, Palette, Target, Cpu, Code2, Cloud, Database, Globe, Layers } from 'lucide-react'

// Enhanced services meta-data
const services = [
  { name: 'Website Development', isBrand: false, icon: Code2, status: 'Active' },
  { name: 'AI System Creation', isBrand: false, icon: Zap, status: 'Deployed' },
  { name: 'Branding & Identity', isBrand: false, icon: Palette, status: 'Live' },
  { name: 'Launch Live Studio', isBrand: true, icon: null, status: 'Origin' },
  { name: 'SEO Optimization', isBrand: false, icon: Target, status: 'Active' },
  { name: 'Marketing Automation', isBrand: false, icon: Target, status: 'Live' },
  { name: 'AI Tool Creation', isBrand: false, icon: Cpu, status: 'Active' },
  { name: 'UI/UX Design', isBrand: false, icon: Palette, status: 'Design' },
  { name: 'Growth Consulting', isBrand: false, icon: Box, status: 'Strategic' },
]

interface MarqueeRowProps {
  items: any[]
  direction: 'left' | 'right'
  speed?: number
  skewX?: any
}

const MarqueeRow = ({ items, direction, speed = 40, skewX }: MarqueeRowProps) => {
  const duplicatedItems = useMemo(() => [...items, ...items, ...items, ...items], [items])
  const moveX = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']

  return (
    <div className="flex overflow-hidden select-none py-6 relative">
      <motion.div
        animate={{ x: moveX }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ skewX }}
        className="flex whitespace-nowrap items-center flex-nowrap gap-6 px-3"
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            {item.isBrand ? (
              <div className="flex items-center gap-4 bg-accent p-4 md:p-6 rounded-3xl border border-accent/20 shadow-[0_0_30px_rgba(255,92,0,0.2)] transition-transform hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Launch Live Studio"
                  width={34}
                  height={34}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-xl md:text-3xl font-sans font-black tracking-tighter text-white uppercase italic">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/60">EST. 2025</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5 bg-surface/40 backdrop-blur-xl border border-foreground/5 p-4 md:p-6 rounded-3xl hover:border-accent/20 transition-all group min-w-[280px]">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                  {item.icon && <item.icon size={24} strokeWidth={1.5} />}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg md:text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest">{item.status || 'Active'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export const Marquee = () => {
  // Manual scroll tracking to avoid useScroll warnings
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const updateScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [scrollY])

  // Calculate velocity to drive the momentum effects
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform velocity into a dynamic skewX (momentum feel)
  const skewX = useTransform(smoothVelocity, [-2000, 2000], [-15, 15])

  return (
    <section
      className="py-24 md:py-32 border-y border-foreground/5 overflow-hidden bg-background relative"
    >
      {/* Visual Accents */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 mb-12 flex flex-col items-center md:items-start gap-4">
        <div className="px-4 py-1.5 bg-accent/5 rounded-full border border-accent/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">Global Delivery Pipeline</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-center md:text-left">
          Scaling your <span className="italic text-text-muted">vision.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow items={services} direction="left" speed={40} skewX={skewX} />
      </div>

      {/* Background Pulse */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
