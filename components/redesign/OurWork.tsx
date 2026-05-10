'use client'

import React from 'react'
import { ScrambleHeading } from './ScrambleHeading'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

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

/* ─── Project Card ─── */
const ProjectCard = ({ project }: { project: typeof featuredWork[0] }) => {
  return (
    <div className="flex flex-col h-full bg-surface border border-foreground/5 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-foreground/5">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </a>
        ) : (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Result Badge — always visible */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-foreground/5 tracking-wide">
          ✦ {project.result}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent tracking-widest uppercase text-[10px] font-black">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2 leading-tight">{project.name}</h3>

        {/* Tagline */}
        <p className="text-base md:text-lg font-semibold text-foreground/80 mb-3 leading-snug">{project.tagline}</p>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed mb-5 flex-grow">{project.desc}</p>

        {/* Actions — always visible */}
        <div className="flex items-center gap-4 pt-4 border-t border-foreground/5">
          {!project.hideCaseStudy && (
            <Link
              href={`/work/${project.slug}`}
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground flex items-center gap-1.5"
            >
              Case Study <ArrowUpRight size={13} className="text-accent" />
            </Link>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5"
            >
              Visit Site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Featured Project (first item, larger) ─── */
const FeaturedProject = ({ project }: { project: typeof featuredWork[0] }) => {
  return (
    <div className="flex flex-col md:flex-row bg-surface border border-foreground/5 rounded-2xl overflow-hidden">
      {/* Image — larger for featured */}
      <div className="relative w-full md:w-[55%] aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden bg-foreground/5">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </a>
        ) : (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
        {/* Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent tracking-widest uppercase text-[10px] font-black">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 leading-tight">{project.name}</h3>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-semibold text-foreground/80 mb-3 leading-snug">{project.tagline}</p>

        {/* Description */}
        <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">{project.desc}</p>

        {/* Result Badge */}
        <div className="inline-flex items-center bg-accent/8 border border-accent/15 text-foreground text-sm font-bold px-4 py-2 rounded-full mb-6 self-start">
          <span className="text-accent mr-2">✦</span> {project.result}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {!project.hideCaseStudy && (
            <Link
              href={`/work/${project.slug}`}
              className="text-xs font-bold uppercase tracking-[0.15em] text-foreground flex items-center gap-1.5"
            >
              Case Study <ArrowUpRight size={14} className="text-accent" />
            </Link>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5"
            >
              Visit Site <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}


export const OurWork = ({ titleContainerClassName = '', standalone = true }: { titleContainerClassName?: string; standalone?: boolean }) => {
  const [featured, ...rest] = featuredWork

  return (
    <section className={`${standalone ? 'pt-28 md:pt-32' : 'pt-16 md:pt-20'} pb-16 md:pb-20 px-4 md:px-6`}>
      <div className="max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <div className={`mb-10 md:mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-5 ${titleContainerClassName}`}>
          <div>
            <ScrambleHeading
              text="SELECTED PROJECTS"
              as="span"
              className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase"
              staggerMs={20}
              scrambleFrames={3}
            />
            <ScrambleHeading
              text="Work that speaks"
              as="h2"
              className="text-3xl sm:text-4xl md:text-6xl font-serif mt-3 leading-[1.1] tracking-tight"
              staggerMs={40}
            />
            <ScrambleHeading
              text="for itself."
              as="h2"
              className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-accent leading-[1.1] tracking-tight"
              staggerMs={40}
            />
            <p className="mt-4 text-text-muted text-base md:text-lg max-w-lg leading-relaxed">
              Real results for real businesses. Every project is built to convert, perform, and scale.
            </p>
          </div>
          <Link
            href={standalone ? '/book-a-call' : '/work'}
            className="w-full md:w-auto px-6 py-3 bg-accent text-white font-bold rounded-full text-sm text-center whitespace-nowrap shadow-lg shadow-accent/20"
          >
            {standalone ? 'Start Your Project →' : 'View All Work →'}
          </Link>
        </div>

        {/* ── Featured Project ── */}
        <div className="mb-6 md:mb-8">
          <FeaturedProject project={featured} />
        </div>

        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  )
}
