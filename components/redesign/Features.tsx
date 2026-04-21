'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Palette, Box, ArrowLeft, ArrowRight } from 'lucide-react'
import { ScrambleHeading } from './ScrambleHeading'

export const features = [
  {
    title: 'Website Development',
    description: 'Custom-built, conversion-optimised websites that load fast, rank high, and look exceptional.',
    icon: Box,
  },
  {
    title: 'AI System Creation',
    description: 'Bespoke AI workflows, chatbots, and LLM-powered engines tailored to your business operations.',
    icon: Zap,
  },
  {
    title: 'Branding & Identity',
    description: 'Strategy-first branding — logo, guidelines, motion identity, and everything in between.',
    icon: Palette,
  },
  {
    title: 'SEO Optimization',
    description: 'Technical SEO, content strategy, and Core Web Vitals tuning that drives organic growth.',
    icon: Target,
  },
  {
    title: 'AI Tool Creation',
    description: 'Custom AI-powered tools: content generators, data analyzers, voice bots, and more.',
    icon: Zap,
  },
  {
    title: 'Marketing Automation',
    description: 'Connect your CRM, email, ads, and analytics into one automated growth engine.',
    icon: Target,
  },
  {
    title: 'UI/UX Design',
    description: 'Research-driven, pixel-perfect design from wireframes to dev-ready Figma handoff.',
    icon: Palette,
  },
  {
    title: 'Growth Consulting',
    description: 'A clear 90-day digital growth roadmap — market analysis, tech recommendations, execution plan.',
    icon: Box,
  },
]

export const Features = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <ScrambleHeading text="WHAT WE DO" as="span" className="text-sm font-medium tracking-widest text-accent uppercase" staggerMs={30} scrambleFrames={4} />
            <div className="space-y-1">
              <ScrambleHeading text="Design. Build." as="h2" className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight" staggerMs={40} />
              <ScrambleHeading text="Launch. Grow." as="h2" className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight" staggerMs={40} />
              <ScrambleHeading text="Everything your brand" as="h2" className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight mt-2" staggerMs={40} />
              <ScrambleHeading text="needs to dominate online." as="h2" className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight text-accent" staggerMs={40} />
            </div>
            <p className="max-w-2xl text-lg md:text-2xl font-serif italic text-text-muted mt-6 mx-auto md:mx-0">
              One focused team. From brand identity to digital presence - shipped fast, built right.
            </p>
          </div>

          {/* Desktop/Mobile Navigation */}
          <div className="flex items-center justify-center md:justify-end gap-3 md:pb-4 scale-90 md:scale-100">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all active:scale-90"
              aria-label="Previous service"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all active:scale-90"
              aria-label="Next service"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Custom Mobile Carousel / Desktop Grid */}
        <div
          ref={scrollRef}
          className="relative -mx-6 px-6 overflow-x-auto snap-x snap-mandatory flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 no-scrollbar pb-8 md:pb-0"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="group p-6 md:p-8 bg-surface border border-foreground/5 rounded-3xl hover:border-accent/20 transition-all duration-300 relative overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-black/5 flex flex-col min-h-[220px] md:min-h-[200px] h-full min-w-[280px] w-[85vw] sm:w-[50vw] md:w-auto md:min-w-0 snap-center shrink-0"
            >
              <div className="relative z-10 flex flex-col h-full text-left">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 italic line-clamp-2">
                  {feature.description}
                </p>
                <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-accent group-hover:gap-3 transition-all mt-auto self-start">
                  Learn More <span className="text-accent underline underline-offset-4 decoration-accent/30 group-hover:decoration-accent transition-all">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
