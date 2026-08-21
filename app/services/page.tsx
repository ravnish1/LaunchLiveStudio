import React from 'react'
import { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: "Digital Agency Services",
  description: "From custom web development to LLM-powered AI systems. Explore our range of premium services designed to scale your business and outpace competition.",
  keywords: ["website development", "ai system creation", "marketing automation", "ui/ux design", "technical seo", "growth consulting", "bespoke ai workflows", "ai chatbots for business", "crm automation services"],
  alternates: { canonical: "https://www.launchlive.studio/services" },
  openGraph: {
    title: "Expert Digital Services for Modern Brands",
    description: "Scalable tech stacks and strategic design tailored for founders who demand excellence. See what we can build for you.",
    url: "https://www.launchlive.studio/services",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Our Digital Services",
      },
    ],
  },
}

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Agency Services",
    "provider": {
      "@type": "Organization",
      "name": "Launch Live Studio",
      "url": "https://www.launchlive.studio/"
    },
    "description": "Custom web development, LLM-powered AI systems, and marketing automation to scale your business.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agency Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI System Creation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Identity" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Tool Creation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marketing Automation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Growth Consulting" } }
      ]
    }
  };

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServicesClient />
    </>
  );
}
