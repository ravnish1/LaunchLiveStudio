import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Insights, guides, and tools to accelerate your digital growth.',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
