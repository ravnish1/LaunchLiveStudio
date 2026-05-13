import React from 'react'
import { Metadata } from 'next'
import { TestimonialsClient } from './TestimonialsClient'

export const metadata: Metadata = {
  title: "Client Success Stories | Trust & Testimonials",
  description: "Read how founders and teams have transformed their businesses with Launch Live Studio. Honest feedback on our web and AI services.",
  keywords: ["agency testimonials", "client reviews", "launch live studio feedback"],
  alternates: { canonical: "https://www.launchlive.studio/testimonials" },
  openGraph: {
    title: "What Our Partners Say About Launch Live Studio",
    description: "Discover why founders trust us to build their most critical digital infrastructure.",
    url: "https://www.launchlive.studio/testimonials",
    images: [
      {
        url: "/og-testimonials.png",
        width: 1200,
        height: 630,
        alt: "What Our Partners Say About Us",
      },
    ],
  },
}

export default function TestimonialsPage() {
  return <TestimonialsClient />
}
