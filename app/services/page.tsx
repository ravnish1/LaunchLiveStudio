import React from 'react'
import { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: "Digital Agency Services | Web, AI & Automation",
  description: "From custom web development to LLM-powered AI systems. Explore our range of premium services designed to scale your business and outpace competition.",
  keywords: ["website development", "ai system creation", "marketing automation", "ui/ux design", "technical seo", "growth consulting", "bespoke ai workflows", "ai chatbots for business", "crm automation services"],
  alternates: { canonical: "https://www.launchlive.studio/services" },
  openGraph: {
    title: "Expert Digital Services for Modern Brands",
    description: "Scalable tech stacks and strategic design tailored for founders who demand excellence. See what we can build for you.",
    url: "https://www.launchlive.studio/services",
    images: [
      {
        url: "/opengraph-image-with-text-with-color-schema.webp",
        width: 1200,
        height: 630,
        alt: "Our Digital Services",
      },
    ],
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
