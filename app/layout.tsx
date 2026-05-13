import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  metadataBase: new URL('https://www.launchlive.studio'),
  title: {
    default: "launchlive.studio",
    template: "%s | Launch Live Studio",
  },
  description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
  keywords: ["digital agency", "ai automation", "web development", "branding", "seo", "startup consultancy"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "launchlive.studio",
    description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
    url: "https://www.launchlive.studio/",
    siteName: "Launch Live Studio",
    images: [
      {
        url: "/opengraph-image-with-text-with-color-schema.webp",
        width: 1200,
        height: 630,
        alt: "Launch Live Studio - Digital Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "launchlive.studio",
    description: "Launch Live Studio is a full-service digital agency building websites, AI systems, branding, and automation for startups and growing businesses.",
    site: "@launchlivestudio",
    creator: "@launchlivestudio",
    images: ["/opengraph-image-with-text-with-color-schema.webp"],
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
        <SpeedInsights />
      </body>
    </html>
  )
}
