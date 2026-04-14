'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Palette, Box } from 'lucide-react'
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
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-20 space-y-4">
          <ScrambleHeading text="WHAT WE DO" as="span" className="text-sm font-medium tracking-widest text-accent uppercase" staggerMs={30} scrambleFrames={4} />
          <ScrambleHeading text="Eight services." as="h2" className="text-5xl md:text-7xl font-serif leading-tight mt-4" staggerMs={50} />
          <ScrambleHeading text="Everything you need" as="h2" className="text-5xl md:text-7xl font-serif leading-tight" staggerMs={50} />
          <ScrambleHeading text="to win online." as="h2" className="text-5xl md:text-7xl font-serif leading-tight" staggerMs={50} />
          <p className="max-w-xl text-lg text-text-muted mt-6">
            One focused team. Every layer of your digital presence covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="group p-6 bg-surface border border-foreground/5 rounded-3xl hover:border-accent/20 transition-all duration-300 relative overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-black/5 flex flex-col min-h-[190px] h-full"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 italic line-clamp-2">
                  {feature.description}
                </p>
                <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-accent group-hover:gap-3 transition-all mt-auto">
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
