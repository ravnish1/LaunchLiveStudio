import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { OurWork } from '@/components/redesign/OurWork'
import ClientReveal from '@/components/redesign/ClientReveal'

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Browse our selected works and case studies. From high-performance web apps to immersive brand experiences, see how we deliver results for our clients.",
}

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
