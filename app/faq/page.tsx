import React from 'react'
import { Metadata } from 'next'
import { FaqClient } from './FaqClient'
import { faqData } from '@/lib/faq-data'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently asked questions about our services, process, pricing, and ongoing support. Get clarity on partnering with Launch Live Studio.',
  alternates: getAlternates('/faq'),
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
          "text": item.plainTextAnswer
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
