'use client'

import React, { useState } from 'react'
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % features.length)
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)


  return (
    <section className="py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-16 md:gap-12 lg:gap-20 items-center">

          {/* Left Column: Hero Text */}
          <div className="space-y-4 text-center md:text-left order-1">
            <ScrambleHeading text="WHAT WE DO" as="span" className="text-sm font-medium tracking-widest text-accent uppercase" staggerMs={30} scrambleFrames={4} />
            <div className="space-y-1 md:space-y-2">
              <ScrambleHeading text="Design. Build." as="h2" className="text-[11vw] sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-none" staggerMs={40} />
              <ScrambleHeading text="Launch. Grow." as="h2" className="text-[11vw] sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-none" staggerMs={40} />
              <div className="h-2 md:h-4"></div>
              <ScrambleHeading text="Everything your brand needs to" as="h2" className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-[42px] font-serif leading-tight" staggerMs={40} />
              <ScrambleHeading text="dominate online." as="h2" className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-[42px] font-serif leading-tight text-accent" staggerMs={40} />
            </div>
            <p className="max-w-2xl text-lg md:text-2xl font-serif italic text-text-muted mt-6 mx-auto md:mx-0">
              One focused team. From brand identity to digital presence - shipped fast, built right.
            </p>
          </div>

          {/* Right Column: Hand-drawn style box with Carousel */}
          <div className="w-full flex flex-col items-center md:items-end order-2">

            {/* Bordered Box / Frame */}
            <div className="relative w-full max-w-sm rounded-3xl border-2 border-foreground/20 p-8 flex flex-col bg-surface shadow-sm">
              {/* Handwritten Services Label */}
              <h3 className="absolute -top-5 left-6 bg-background px-4 text-3xl font-serif italic text-accent tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
                Services
              </h3>

              {/* Carousel Content */}
              <div className="relative min-h-[240px] overflow-hidden flex flex-col pt-4">
                {features.map((feature, i) => (
                  <div
                    key={feature.title}
                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out flex flex-col text-left ${currentIndex === i ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                  >
                    <div className="w-12 h-12 bg-[#d95a20]/10 rounded-xl flex items-center justify-center text-[#d95a20] mb-4 shrink-0">
                      <feature.icon size={24} />
                    </div>
                    <h4 className="text-2xl font-serif mb-2">{feature.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                      {feature.description}
                    </p>
                    <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-accent transition-all mt-auto self-start">
                      Learn More <span className="text-accent underline underline-offset-4 decoration-accent/30 transition-all">→</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Dot Indicators */}
              <div className="flex gap-2 items-center mt-6 z-10">
                {features.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-6 bg-[#d95a20]' : 'w-2 bg-foreground/20'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Prev/Next Navigation below the box */}
            <div className="flex gap-3 justify-center md:justify-end mt-8 mr-0 md:mr-6 w-full">
              <button
                onClick={prevCard}
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all active:scale-90"
                aria-label="Previous service"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={nextCard}
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all active:scale-90"
                aria-label="Next service"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
