'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)

export default function ClientReveal({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative">
        {children}
      </div>
    </SmoothScroll>
  )
}
