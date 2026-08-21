'use client'

import React from 'react'
import { SmoothScroll } from '@/components/redesign/SmoothScroll'

export default function ClientReveal({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative">
        {children}
      </div>
    </SmoothScroll>
  )
}

