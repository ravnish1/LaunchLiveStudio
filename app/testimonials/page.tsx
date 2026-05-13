import React from 'react'
import { Metadata } from 'next'
import { TestimonialsClient } from './TestimonialsClient'

export const metadata: Metadata = {
  title: "Client Success Stories",
  description: "Read what our clients say about working with Launch Live Studio. Discover how we've helped founders and teams transform their digital presence.",
}

export default function TestimonialsPage() {
  return <TestimonialsClient />
}
