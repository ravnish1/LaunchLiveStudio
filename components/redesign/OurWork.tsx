'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrambleHeading } from './ScrambleHeading'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const featuredWork = [
  {
    name: 'Raptile Studio',
    category: 'Shopify / Streetwear',
    tagline: 'Redefining the edge of urban fashion.',
    desc: 'A high-performance, custom Shopify e-commerce experience for a premium streetwear brand, featuring liquid animations and lightning-fast checkout.',
    image: '/projects/raptile-studio.png',
    result: 'Delivered 1 Week Early',
    slug: 'raptile-studio',
    liveUrl: 'https://raptilestudio.in/',
    hideCaseStudy: true
  },
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

const ProjectRow = ({ member, i }: { member: any, i: number }) => {
  const isEven = i % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-12 md:py-24 border-b border-border/20 last:border-0 flex flex-col gap-10 md:gap-16 lg:gap-24 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Image Block */}
      {member.liveUrl ? (
        <a 
          href={member.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-1/2 relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group cursor-pointer"
        >
          <Image 
            src={member.image} 
            alt={member.name} 
            fill
            className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />
        </a>
      ) : (
        <div className="w-full md:w-1/2 relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group">
          <Image 
            src={member.image} 
            alt={member.name} 
            fill
            className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />
        </div>
      )}

      {/* Text Content Block */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-accent w-8" />
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase">{member.category}</span>
        </div>

        <h3 className="text-4xl lg:text-7xl font-serif text-foreground mb-6 leading-none">{member.name}</h3>
        <p className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">{member.tagline}</p>
        <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl">{member.desc}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="bg-surface-accent border border-border-subtle text-foreground font-bold px-6 py-3 rounded-full text-sm">
            <span className="text-text-muted mr-2">Result:</span> {member.result}
          </div>
          <div className="flex items-center gap-8">
            {!member.hideCaseStudy && (
              <Link href={`/work/${member.slug}`} className="text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent transition-all flex items-center gap-2 group/btn">
                Case Study <span className="text-accent group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            )}
            {member.liveUrl && (
              <a
                href={member.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-widest text-accent hover:text-foreground transition-all flex items-center gap-2 group/visit"
              >
                Visit Site <ExternalLink size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const OurWork = ({ titleContainerClassName = '' }: { titleContainerClassName?: string }) => {
  return (
    <section className="py-12 md:py-16 px-6 bg-surface noise-bg">
      <div className="max-w-[1280px] mx-auto">
        <div className={`mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end gap-6 ${titleContainerClassName}`}>
          <div>

            <ScrambleHeading text="Projects we're" as="h2" className="text-5xl md:text-7xl font-serif mt-4" staggerMs={50} />
            <ScrambleHeading text="proud of." as="h2" className="text-5xl md:text-7xl font-serif underline decoration-accent underline-offset-8 decoration-1" staggerMs={50} />
            <p className="mt-6 text-text-muted text-xl md:text-2xl font-serif italic max-w-md">Real results. Measurable outcomes. Work that speaks for itself.</p>
          </div>
          <Link href="/work" className="w-full md:w-auto px-8 py-4 border border-foreground/10 hover:border-foreground/30 text-foreground font-bold rounded-full transition-all text-center whitespace-nowrap">
            View All Work &rarr;
          </Link>
        </div>

        <div className="flex flex-col mt-8 md:mt-16">
          {featuredWork.map((member, i) => (
            <ProjectRow key={member.name} member={member} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

