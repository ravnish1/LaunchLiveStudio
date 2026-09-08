'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { features } from './Features'
import { ServicesIllustration } from './ServicesIllustration'
import { ServiceCards } from './ServiceCards'

export const ServicesShowcase = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Hero: Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 md:mb-20">

          {/* Left: copy */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase"
            >
              SERVICES & EXPERTISE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">We build digital systems</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-accent leading-[1.1] tracking-tight">that drive actual revenue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-text-muted mt-2 leading-relaxed max-w-xl"
            >
              Say goodbye to traditional agency bloat and vanity metrics. We combine modern tech stacks, strategic design, and automation to deliver scalable solutions tailored for modern businesses and creators. We don't just sell services; we engineer outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-2 mt-2"
            >
              {['Web Dev', 'AI Systems', 'AI Tools', 'Automation', 'UI/UX', 'GTM'].map((tag) => (
                <span key={tag} className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-foreground/10 text-text-muted">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <ServicesIllustration />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px w-full bg-foreground/10 mb-16 md:mb-20"
        />

        {/* ── Core Services Grid ── */}
        <div className="mb-16 md:mb-32">
          <ServiceCards features={features} />
        </div>

        {/* ── The LaunchLive Difference ── */}
        <div className="pt-12 md:pt-20 border-t border-foreground/10">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase">THE LAUNCHLIVE DIFFERENCE</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif mt-3 md:mt-4 text-foreground">Why we consistently outperform</h2>
            <p className="text-text-muted mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg px-2 md:px-0">
              We recognized the flaws in traditional agency models and built an alternative. Here is how we ensure our partners win in competitive markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-serif mb-2 md:mb-3">Outcome-Driven Execution</h4>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">Most agencies sell billable hours; we sell measurable business outcomes. Your growth and ROI are the only metrics that matter, ensuring our incentives are always perfectly aligned with yours.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-serif mb-2 md:mb-3">AI & Tech Integration</h4>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">We don't just build static sites; we build intelligent systems. By integrating modern AI tools and automated workflows, we help your brand operate leaner and scale faster than the competition.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative pt-6 border-t border-foreground/10">
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-serif mb-2 md:mb-3">Radical Transparency</h4>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">No black-box processes or confusing technical jargon. You get clear roadmaps, direct communication channels, and full visibility into every strategy and system we deploy for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
