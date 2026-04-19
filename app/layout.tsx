import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://launchlive.studio'),
  title: "launchlive.studio",
  description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "launchlive.studio",
    description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
    url: "https://launchlive.studio",
    siteName: "Launch Live Studio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "launchlive.studio",
    description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
    creator: "@launchlivestudio",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-background overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
