import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Everything you need to scale, wrapped in one unified team.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
