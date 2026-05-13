import React from 'react'
import { Metadata } from 'next'
import { TestimonialsClient } from './TestimonialsClient'

export const metadata: Metadata = {
  title: "Client Success Stories",
  description: "Don't just take our word for it. Read how founders and growing teams have transformed their businesses with Launch Live Studio's elite digital services.",
  keywords: ["client success stories", "agency reviews", "customer feedback", "digital agency results", "founder testimonials"],
  alternates: {
    canonical: "/testimonials",
  },
}

export default function TestimonialsPage() {
  return <TestimonialsClient />
}
