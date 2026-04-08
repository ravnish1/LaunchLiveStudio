import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Hear from our global partners and clients.',
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
