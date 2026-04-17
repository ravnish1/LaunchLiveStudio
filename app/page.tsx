'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// New Redesign Components
import { Navbar } from '@/components/redesign/Navbar'
import { Hero } from '@/components/redesign/Hero'
import { Marquee } from '@/components/redesign/Marquee'
import { Features } from '@/components/redesign/Features'
import { Stats } from '@/components/redesign/Stats'
import { Process } from '@/components/redesign/Process'
import { OurWork } from '@/components/redesign/OurWork'
import { Testimonials } from '@/components/redesign/Testimonials'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'

// Browser-only components — loaded client-side only to prevent hydration errors
const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/redesign/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // GSAP Entrance Animations for sections
    const sections = document.querySelectorAll('section')

    sections.forEach((section) => {
      gsap.fromTo(
        section.children,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12, // Slightly increased for a more rhythmic flow
          ease: 'power2.out',
          force3D: true,
          lazy: true, // Optimized for lower frame budgets
          scrollTrigger: {
            trigger: section,
            start: 'top 92%', // Trigger slightly later for performance buffer
            toggleActions: 'play none none none',
            fastScrollEnd: true, // Mobile optimization
          },
        }
      )
    })
  }, [])

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Features />
          <Stats />
          <Process />
          <OurWork />
          <Testimonials />
          <CTABanner />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
