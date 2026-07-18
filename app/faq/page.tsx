import React from 'react'
import { Metadata } from 'next'
import { FaqClient } from './FaqClient'
import { faqData } from '@/lib/faq-data'

export const metadata: Metadata = {
  title: 'FAQ | Launch Live Studio',
  description: 'Frequently asked questions about our services, process, pricing, and ongoing support. Get clarity on partnering with Launch Live Studio.',
}

export default function FaqPage() {
  // Generate JSON-LD schema for FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          // Since some answers are JSX, we use a string fallback or plain string content.
          "text": typeof item.answer === 'string' ? item.answer : "Please see our FAQ page for detailed information."
        }
      }))
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  )
}
