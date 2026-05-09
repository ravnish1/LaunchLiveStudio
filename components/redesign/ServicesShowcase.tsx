'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { features } from './Features'
import { ScrambleHeading } from './ScrambleHeading'
import { ArrowUpRight } from 'lucide-react'

export const ServicesShowcase = () => {
  return (
    <section className="py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 mb-16">
          <ScrambleHeading
            text="SERVICES & EXPERTISE"
            as="span"
            className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase"
            staggerMs={20}
            scrambleFrames={3}
          />
          <ScrambleHeading
            text="We build digital systems"
            as="h2"
            className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight"
            staggerMs={40}
          />
          <ScrambleHeading
            text="that drive actual revenue."
            as="h2"
            className="text-5xl md:text-7xl font-serif italic text-accent leading-[1.1] tracking-tight mb-4"
            staggerMs={40}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl text-lg md:text-xl text-text-muted mt-2 leading-relaxed"
          >
            Say goodbye to traditional agency bloat and vanity metrics. We combine modern tech stacks, strategic design, and automation to deliver scalable solutions tailored for modern businesses and creators. We don't just sell services; we engineer outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px w-full bg-foreground/10 mt-10"
          />
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:bg-foreground/[0.04] hover:border-accent/30 transition-all duration-300 group flex flex-col h-full"
            >
              <h3 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed mb-6 flex-grow">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider transition-all duration-300 mt-auto">
                Discover More <ArrowUpRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* The LaunchLive Difference */}
        <div className="pt-20 border-t border-foreground/10">
          <div className="text-center mb-16">
            <ScrambleHeading
              text="THE LAUNCHLIVE DIFFERENCE"
              as="span"
              className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase"
              staggerMs={20}
            />
            <h2 className="text-4xl md:text-6xl font-serif mt-4 text-foreground">Why we consistently outperform</h2>
            <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
              We recognized the flaws in traditional agency models and built an alternative. Here is how we ensure our partners win in competitive markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-2xl font-serif mb-3">Outcome-Driven Execution</h4>
                <p className="text-text-muted leading-relaxed">Most agencies sell billable hours; we sell measurable business outcomes. Your growth and ROI are the only metrics that matter, ensuring our incentives are always perfectly aligned with yours.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-2xl font-serif mb-3">AI & Tech Integration</h4>
                <p className="text-text-muted leading-relaxed">We don't just build static sites; we build intelligent systems. By integrating modern AI tools and automated workflows, we help your brand operate leaner and scale faster than the competition.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-2xl font-serif mb-3">Radical Transparency</h4>
                <p className="text-text-muted leading-relaxed">No black-box processes or confusing technical jargon. You get clear roadmaps, direct communication channels, and full visibility into every strategy and system we deploy for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
