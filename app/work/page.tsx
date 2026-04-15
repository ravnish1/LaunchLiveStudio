'use client'

import React from 'react'
import { Navbar } from '@/components/redesign/Navbar'
import { CTABanner } from '@/components/redesign/CTABanner'
import { Footer } from '@/components/redesign/Footer'
import { Team } from '@/components/redesign/Team'
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

export default function WorkPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground cursor-none">
        <CustomCursor />
        <Navbar />
        <main className="pt-0">
          <Team titleContainerClassName="pt-8 md:pt-10" />
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  )
}
