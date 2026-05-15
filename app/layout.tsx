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
  description: "More than a traditional agency. We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
  keywords: ["digital agency", "ai automation", "web development", "branding", "seo", "startup consultancy"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "launchlive.studio",
    description: "More than a traditional agency. We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
    url: "https://www.launchlive.studio/",
    siteName: "Launch Live Studio",
    images: [
      {
        url: "/logo.png",
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
    description: "More than a traditional agency. We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
    site: "@launchlivestudio",
    creator: "@launchlivestudio",
    images: ["/logo.png"],
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
