import React from 'react'
import { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: "Digital Agency Services | Web, AI & SEO",
  description: "From custom web development to AI integration, explore our range of premium services designed to scale your business and outpace the competition.",
  keywords: ["website development", "ai system creation", "marketing automation", "ui/ux design", "technical seo", "growth consulting", "bespoke ai workflows", "ai chatbots for business", "crm automation services"],
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
