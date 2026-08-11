import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { OurWork } from '@/components/redesign/OurWork'
import ClientReveal from '@/components/redesign/ClientReveal'
import Script from "next/script"

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | Launch Live Studio",
  description: "Explore our selected works. See how we delivered high-performance Shopify stores, AI-driven SaaS, and premium brand identities for leading startups.",
  keywords: ["case studies", "custom shopify development", "saas dashboard design", "fintech ai solutions", "ecommerce case studies"],
  alternates: { canonical: "https://www.launchlive.studio/work" },
  openGraph: {
    title: "Launch Live Studio Portfolio | Real Results for Real Brands",
    description: "Check out our latest projects: From streetwear e-commerce to AI agriculture intelligence platforms.",
    url: "https://www.launchlive.studio/work",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Launch Live Studio Portfolio",
      },
    ],
  },
}

export default function WorkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Studies & Portfolio | Launch Live Studio",
    "description": "Explore our selected works. See how we delivered high-performance Shopify stores, AI-driven SaaS, and premium brand identities for leading startups.",
    "url": "https://www.launchlive.studio/work",
    "publisher": {
      "@type": "Organization",
      "name": "Launch Live Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.launchlive.studio/logo.png"
      }
    }
  };

  return (
    <ClientReveal>
      <Script
        id="schema-work"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
