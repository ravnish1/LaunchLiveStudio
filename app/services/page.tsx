import React from 'react'
import { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: "Expert Digital Services",
  description: "Explore our premium services including web development, AI integration, brand strategy, and automation solutions tailored for modern businesses.",
}

export default function ServicesPage() {
  return <ServicesClient />
}
