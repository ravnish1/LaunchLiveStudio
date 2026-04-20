import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Insights, guides, and tools to accelerate your digital growth.',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
