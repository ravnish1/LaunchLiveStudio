import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Launch Live Studio",
  description: "Websites, automation & systems for modern businesses.",
  keywords: [
    "digital agency",
    "ai automation",
    "high performance websites",
    "startup software",
    "outcome driven agency",
  ],
  metadataBase: new URL("https://www.launchlive.studio"),
  applicationName: "Launch Live Studio",

  alternates: getAlternates("/"),
  openGraph: {
    title: "Launch Live Studio",
    description: "Websites, automation & systems for modern businesses.",
    url: "https://www.launchlive.studio/",
    siteName: "Launch Live Studio",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Launch Live Studio - Digital Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch Live Studio",
    description: "Websites, automation & systems for modern businesses.",
    images: ["/og-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// New Redesign Components
import { Navbar } from "@/components/redesign/Navbar";
import { Hero } from "@/components/redesign/Hero";
import { Marquee } from "@/components/redesign/Marquee";
import { Features } from "@/components/redesign/Features";
import { Stats } from "@/components/redesign/Stats";
import { Process } from "@/components/redesign/Process";
import { Testimonials } from "@/components/redesign/Testimonials";
import { CTABanner } from "@/components/redesign/CTABanner";
import { Footer } from "@/components/redesign/Footer";
import ClientReveal from "@/components/redesign/ClientReveal";
import { FeaturedProduct } from "@/components/ui/featured-product";
import { HomeBlogs } from "@/components/redesign/HomeBlogs";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Launch Live Studio",
      url: "https://www.launchlive.studio/",
    },
    {
      "@type": "Organization",
      name: "Launch Live Studio",
      url: "https://www.launchlive.studio/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.launchlive.studio/logo.png",
      },
      description: "Websites, automation & systems for modern businesses.",
      sameAs: [
        "https://twitter.com/launchlivestudio",
        "https://www.linkedin.com/company/launch-live-studio",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          email: "hello@launchlive.studio",
          telephone: "+91 9992206990",
        },
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+91 73031 12516",
        },
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+91 83759 99583",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClientReveal>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />

          <main>
            <Hero />
            <Marquee />
            <Features />
            <Stats />
            <Process />
            <FeaturedProduct />
            <HomeBlogs />
            <Testimonials />
            <CTABanner />
          </main>

          <Footer />
        </div>
      </ClientReveal>
    </>
  );
}
