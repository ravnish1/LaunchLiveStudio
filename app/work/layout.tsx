import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'A curated selection of our most impactful digital projects.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
