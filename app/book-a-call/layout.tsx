import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Schedule a free consultation call with our team.',
}

export default function BookACallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
