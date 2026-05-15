import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "launchlive.studio",
  description: "More than a traditional agency. We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
  keywords: ["digital agency", "ai automation", "high performance websites", "startup software", "outcome driven agency"],
  alternates: { canonical: "https://www.launchlive.studio/" },
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "launchlive.studio",
    description: "More than a traditional agency. We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
    images: ["/logo.png"],
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
