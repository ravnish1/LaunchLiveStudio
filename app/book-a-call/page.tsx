import React from 'react'
import { Metadata } from 'next'
import { BookACallClient } from './BookACallClient'

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Ready to launch your next big project? Schedule a free 30-minute strategy call with our experts and transform your digital presence today.",
  alternates: {
    canonical: "/book-a-call",
  },
}

export default function BookACallPage() {
  return <BookACallClient />
}
