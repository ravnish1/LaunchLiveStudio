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
    default: "Launch Live Studio",
    template: "%s | Launch Live Studio",
  },
  description: "We build digital systems that connect, convert and compound over time.",
  keywords: ["digital agency", "ai automation", "web development", "branding", "seo", "startup consultancy"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Launch Live Studio",
    description: "We build digital systems that connect, convert and compound over time.",
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
    title: "Launch Live Studio",
    description: "We build digital systems that connect, convert and compound over time.",
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
