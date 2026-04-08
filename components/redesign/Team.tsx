'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrambleHeading } from './ScrambleHeading'
import Link from 'next/link'

const featuredWork = [
  {
    name: 'TerraFlow',
    category: 'SaaS / AgriTech',
    tagline: 'Where farmland meets real-time data.',
    desc: 'A full-stack agriculture intelligence dashboard connecting farmers to live soil data, weather models, and AI crop predictions.',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
    result: '3× Conversion Rate',
    slug: 'terraflow'
  },
  {
    name: 'Vaultly',
    category: 'FinTech / AI',
    tagline: 'Smart savings, powered by AI.',
    desc: 'An AI-first personal finance platform that learns spending habits and automates savings goals in real time.',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&h=500&fit=crop',
    result: '0 → 10k Users in 6 Weeks',
    slug: 'vaultly'
  },
  {
    name: 'Nova Roast',
    category: 'DTC / Branding',
    tagline: 'A brand that hits as hard as the espresso.',
    desc: 'End-to-end brand identity and Shopify build for a specialty coffee brand launching into a saturated market.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=500&fit=crop',
    result: '$0 → $120k Revenue in 90 Days',
    slug: 'nova-roast'
  },
]

export const Team = () => {
  return (
    <section className="py-12 md:py-16 px-6 bg-surface noise-bg">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div>

            <ScrambleHeading text="Projects we're" as="h2" className="text-5xl md:text-7xl font-serif mt-4" staggerMs={50} />
            <ScrambleHeading text="proud of." as="h2" className="text-5xl md:text-7xl font-serif underline decoration-accent underline-offset-8 decoration-1" staggerMs={50} />
            <p className="mt-6 text-text-muted text-lg max-w-md">Real results. Measurable outcomes. Work that speaks for itself.</p>
          </div>
          <Link href="/work" className="px-8 py-4 border border-foreground/10 hover:border-foreground/30 text-foreground font-bold rounded-full transition-all whitespace-nowrap">
            View All Work &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredWork.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-accent font-bold px-3 py-1 rounded-full text-xs">
                  {member.result}
                </div>
              </div>
              <p className="text-accent tracking-widest uppercase text-xs mb-1 font-bold">{member.category}</p>
              <h3 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors mb-1">{member.name}</h3>
              <p className="font-semibold text-foreground mb-1 text-sm">{member.tagline}</p>
              <p className="text-text-muted text-sm flex-grow mb-4 line-clamp-3">{member.desc}</p>

              <Link href={`/work/${member.slug}`} className="text-sm font-bold uppercase tracking-widest text-foreground/80 hover:text-accent flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                View Case Study <span className="text-accent underline underline-offset-4 decoration-accent/30 group-hover:decoration-accent transition-all">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
