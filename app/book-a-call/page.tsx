import React from 'react'
import { Metadata } from 'next'
import { BookACallClient } from './BookACallClient'

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Ready to launch? Book a consultation or send us an inquiry to discuss your next big digital project. Let's build something exceptional together.",
}

export default function BookACallPage() {
  return <BookACallClient />
}
