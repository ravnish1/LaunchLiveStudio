import React from 'react'
import { Metadata } from 'next'
import { PrivacyClient } from './PrivacyClient'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Launch Live Studio collects, uses, and protects your personal data. We are committed to your privacy and data security.",
  alternates: getAlternates("/privacy"),
}

export default function PrivacyPolicyPage() {
  return <PrivacyClient />
}
