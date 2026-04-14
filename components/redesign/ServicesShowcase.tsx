'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { features } from './Features'
import { ScrambleHeading } from './ScrambleHeading'
import { ArrowUpRight } from 'lucide-react'

export const ServicesShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col gap-4 mb-20">
          <ScrambleHeading 
            text="OUR CAPABILITIES" 
            as="span" 
            className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase" 
            staggerMs={20} 
            scrambleFrames={3} 
          />
          <ScrambleHeading 
            text="Strategic execution" 
            as="h2" 
            className="text-5xl md:text-8xl font-serif leading-[1.1] tracking-tight" 
            staggerMs={40} 
          />
          <ScrambleHeading 
            text="across all mediums." 
            as="h2" 
            className="text-5xl md:text-8xl font-serif italic text-text-muted leading-[1.1] tracking-tight mb-8" 
            staggerMs={40} 
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px w-full bg-foreground/10 mt-10"
          />
        </div>

        <div className="flex flex-col">
          {features.map((feature, idx) => {
            const isHovered = hoveredIndex === idx

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group relative border-b border-foreground/10 last:border-b-0 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Glass Effect on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      layoutId="serviceBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 -z-10 bg-accent/5 backdrop-blur-md rounded-2xl md:-mx-8 scale-x-105"
                    />
                  )}
                </AnimatePresence>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 relative z-10 px-0 md:px-4">
                  {/* Title and Index */}
                  <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                    <span className="text-sm font-mono text-text-muted mt-1 opacity-50 font-medium">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-3xl md:text-5xl font-serif transition-colors duration-500 ${isHovered ? 'text-accent' : 'text-foreground'}`}>
                      {feature.title}
                    </h3>
                  </div>

                  {/* Icon & Arrow for non-hovered state (Desktop) */}
                  <div className="hidden md:flex items-center gap-6 opacity-40 group-hover:opacity-0 transition-opacity duration-300 absolute right-4">
                     <feature.icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Expanding Content Container */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: isHovered ? 'auto' : 0, 
                      opacity: isHovered ? 1 : 0,
                    }}
                    className="overflow-hidden md:w-1/3 md:ml-auto w-full mt-4 md:mt-0 md:absolute md:right-8 lg:-right-8"
                  >
                    <div className="pt-4 md:pt-0 pr-8 md:pr-0">
                      <p className="text-base text-text-muted leading-relaxed italic border-l-2 border-accent pl-4">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex items-center gap-3 text-accent font-bold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        Learn More <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
