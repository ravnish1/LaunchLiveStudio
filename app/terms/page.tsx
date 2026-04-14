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

export default function TermsOfServicePage() {
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
                text="Terms of Service" 
                as="h1" 
                className="text-4xl md:text-6xl font-serif font-bold mb-4" 
              />
              <p className="text-text-muted italic">Last Updated: {lastUpdated}</p>
            </header>

            <article className="prose prose-invert max-w-none text-foreground/80 font-sans leading-relaxed space-y-8">
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the services provided by Launch Live Studio ("we," "our," or "us") via launchlive.studio, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions outlined here, you may not access our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Services Provided</h2>
                <p>
                  Launch Live Studio is a digital agency offering bespoke web development, AI integration, design, and marketing services. The specific scope, timeline, and cost of any project will be outlined in a separate Statement of Work (SOW) or written agreement mutually signed by both parties prior to commencement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. Intellectual Property</h2>
                <p>
                  Unless otherwise stipulated in a signed agreement, all materials—including but not limited to designs, code, strategies, and content—produced by us during a project remain the intellectual property of Launch Live Studio until full payment is received. Upon final payment, IP rights are transferred to the client as specified in their individual contract.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">4. Client Responsibilities</h2>
                <p>
                  You agree to provide timely feedback, assets, and approvals necessary for us to fulfill our service obligations. Delays caused by the failure to provide required materials may result in extended project timelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">5. Limitation of Liability</h2>
                <p>
                  In no event shall Launch Live Studio, nor its directors, employees, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of, or inability to use our services or website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">6. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the standard commercial laws applicable to our operating jurisdiction, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Material changes will be reasonably communicated to active clients.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">8. Contact Information</h2>
                <p>
                  Questions about the Terms of Service should be sent to us at:
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
