import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: {
    absolute: "Launch Live Studio | Premium Digital Agency & Software House",
  },
  description: "Launch Live Studio is a full-service digital agency building elite websites, AI systems, branding, and automation for startups and growing businesses.",
}

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
import ClientReveal from '@/components/redesign/ClientReveal'

export default function Home() {
  return (
    <ClientReveal>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Features />
          <Stats />
          <Process />
          <OurWork standalone={false} />
          <Testimonials />
          <CTABanner />
        </main>

        <Footer />
      </div>
    </ClientReveal>
  )
}
