'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slightly increased for more "airiness"
      touchMultiplier: 1.6, // Reduced from 2.5 for more natural mobile feel
      infinite: false,
      lerp: 0.08, // Slightly softer lerp for smoother tracking
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
