import React from 'react'
import { Metadata } from 'next'
import { TermsClient } from './TermsClient'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions for using Launch Live Studio's services and website. Understanding our professional agreement.",
  alternates: getAlternates("/terms"),
}

export default function TermsOfServicePage() {
  return <TermsClient />
}
