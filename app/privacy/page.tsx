'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { Footer } from '@/components/redesign/Footer'
import { ScrambleHeading } from '@/components/redesign/ScrambleHeading'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/redesign/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 14, 2026"

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />

        <main className="pt-32 pb-24 px-6 md:px-8">
          <div className="max-w-[800px] mx-auto">
            <header className="mb-16">
              <ScrambleHeading 
                text="Privacy Policy" 
                as="h1" 
                className="text-4xl md:text-6xl font-serif font-bold mb-4" 
              />
              <p className="text-text-muted italic">Last Updated: {lastUpdated}</p>
            </header>

            <article className="prose prose-invert max-w-none text-foreground/80 font-sans leading-relaxed space-y-8">
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  At Launch Live Studio ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (launchlive.studio) or use our digital agency services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Personal Information:</strong> Includes your name, email address, phone number, and company details provided via our contact forms or when booking a call.</li>
                  <li><strong>Usage Data:</strong> Includes IP addresses, browser types, interaction data, and pages visited, collected implicitly to help us optimize our website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p>The information we collect is used to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Provide, operate, and maintain our services.</li>
                  <li>Respond to your inquiries and support requests.</li>
                  <li>Improve the performance, security, and user experience of our website.</li>
                  <li>Send administrative or marketing communications (which you can opt out of at any time).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">4. Sharing of Information</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share information with trusted third-party service providers (such as hosting, analytics, and CRM tools) solely for the purpose of operating our agency. All such providers are bound by strict confidentiality requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
                <p>
                  Our website uses cookies and similar tracking technologies to track activity and hold certain information to improve your browsing experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">6. Security</h2>
                <p>
                  We employ industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">7. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:info@launchlive.studio" className="text-accent underline hover:opacity-80 transition-opacity mt-2 inline-block">info@launchlive.studio</a>
                </p>
              </section>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
