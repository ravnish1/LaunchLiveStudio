import React from 'react'
import { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: "Our Digital Services",
  description: "From custom web development to AI integration, explore our range of premium services designed to scale your business and outpace the competition.",
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
