'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { OurWork } from '@/components/redesign/OurWork'
import ClientReveal from '@/components/redesign/ClientReveal'

export default function WorkPage() {
  return (
    <ClientReveal>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <OurWork />
        </main>

        <CTABanner />
        <Footer />
      </div>
    </ClientReveal>
  )
}
