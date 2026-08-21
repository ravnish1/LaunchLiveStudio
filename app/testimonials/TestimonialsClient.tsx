'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { Testimonials } from '@/components/redesign/Testimonials'
import { SmoothScroll } from '@/components/redesign/SmoothScroll'


export function TestimonialsClient() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <Testimonials isPage={true} />
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  )
}
