import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Launch Live Studio | Premium Digital Agency & Software House",
  description: "Build elite websites, AI systems, and automated workflows. We empower startups and modern brands with high-performance digital solutions that drive revenue.",
  keywords: ["digital agency", "ai automation", "high performance websites", "startup software", "outcome driven agency"],
  alternates: { canonical: "https://www.launchlive.studio/" },
  openGraph: {
    title: "Launch Live Studio | Engineering the Future of Digital",
    description: "Discover how we combine strategic design with modern AI to build scalable systems for startups and creators.",
    url: "https://www.launchlive.studio/",
    siteName: "Launch Live Studio",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Launch Live Studio - Engineering the Future",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch Live Studio | Premium Digital Agency",
    description: "Elite websites, AI systems, and automation for modern businesses.",
    images: ["/og-home.png"],
  },
};

// New Redesign Components
import { Navbar } from "@/components/redesign/Navbar";
import { Hero } from "@/components/redesign/Hero";
import { Marquee } from "@/components/redesign/Marquee";
import { Features } from "@/components/redesign/Features";
import { Stats } from "@/components/redesign/Stats";
import { Process } from "@/components/redesign/Process";
import { OurWork } from "@/components/redesign/OurWork";
import { Testimonials } from "@/components/redesign/Testimonials";
import { CTABanner } from "@/components/redesign/CTABanner";
import { Footer } from "@/components/redesign/Footer";
import ClientReveal from "@/components/redesign/ClientReveal";

export default function Home() {
  return (
    <ClientReveal>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Features />
          <Stats />
          <Process />
          <OurWork standalone={false} />
          <Testimonials />
          <CTABanner />
        </main>

        <Footer />
      </div>
    </ClientReveal>
  );
}
