'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { ServicesShowcase } from '@/components/redesign/ServicesShowcase'
import { SmoothScroll } from '@/components/redesign/SmoothScroll'


export function ServicesClient() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <ServicesShowcase />
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  )
}
