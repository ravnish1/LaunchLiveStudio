import React from 'react'
import { Metadata } from 'next'
import { BookACallClient } from './BookACallClient'

export const metadata: Metadata = {
  title: "Book a Strategy Consultation | Launch Live Studio",
  description: "Ready to launch your next big project? Schedule a free consultation with our experts to discuss your digital strategy, AI, or development needs.",
  keywords: ["hire digital agency", "strategy consultation", "start digital project", "launch live studio contact"],
  alternates: { canonical: "https://www.launchlive.studio/book-a-call" },
  openGraph: {
    title: "Schedule Your Free Digital Strategy Session",
    description: "Let's build something exceptional together. Book a call with the Launch Live Studio team today.",
    url: "https://www.launchlive.studio/book-a-call",
    images: [
      {
        url: "/opengraph-image-with-text-with-color-schema.webp",
        width: 1200,
        height: 630,
        alt: "Book a consultation with Launch Live Studio",
      },
    ],
  },
}

export default function BookACallPage() {
  return <BookACallClient />
}
