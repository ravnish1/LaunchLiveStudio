import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { OurWork } from '@/components/redesign/OurWork'
import ClientReveal from '@/components/redesign/ClientReveal'

export const metadata: Metadata = {
  title: "Case Studies & Portfolio",
  description: "Explore our selected works and success stories. See how Launch Live Studio delivers high-performance e-commerce, SaaS, and AI solutions for startups.",
  keywords: ["case studies", "custom shopify development", "saas dashboard design", "fintech ai solutions", "ecommerce performance", "bespoke digital products", "portfolio success stories"],
  alternates: {
    canonical: "/work",
  },
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
