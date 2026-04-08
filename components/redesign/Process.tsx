'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrambleHeading } from './ScrambleHeading'

const steps = [
  { title: 'DISCOVER', desc: 'We get deep into your world — your goals, users, competitors, and constraints. No assumptions. Just clarity.' },
  { title: 'DESIGN', desc: 'We prototype fast and show, not tell. Every pixel earns its place. You see real progress from week one.' },
  { title: 'BUILD', desc: 'Clean, fast code. No bloat. Your site will score 95+ on Lighthouse and load in under 2 seconds on any device.' },
  { title: 'LAUNCH & GROW', desc: 'Going live is just the beginning. We stay on to optimize, scale, and evolve with your business.' },
]

export const Process = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-20">
          <ScrambleHeading text="HOW WE WORK" as="span" className="text-sm font-medium tracking-widest text-accent uppercase" staggerMs={30} scrambleFrames={4} />
          <ScrambleHeading text="From idea" as="h2" className="text-5xl md:text-8xl font-serif mt-4" staggerMs={50} />
          <ScrambleHeading text="to live." as="h2" className="text-5xl md:text-8xl font-serif" staggerMs={50} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[1px] bg-foreground/5 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-accent origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative z-10 space-y-6 group"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-foreground/5 flex items-center justify-center font-serif text-2xl font-bold group-hover:bg-accent group-hover:text-white transition-all duration-500 scale-110 md:scale-100 shadow-sm">
                0{i + 1}
              </div>
              <h3 className="text-3xl font-serif italic">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
