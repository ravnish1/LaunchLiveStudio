'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/redesign/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

gsap.registerPlugin(ScrollTrigger)

export default function ClientReveal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // GSAP Entrance Animations for sections
    const sections = document.querySelectorAll('section')

    sections.forEach((section) => {
      // Ensure the section has children to animate
      if (section.children.length === 0) return

      gsap.fromTo(
        section.children,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power2.out',
          force3D: true,
          lazy: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
          },
        }
      )
    })
  }, [])

  return (
    <SmoothScroll>
      <div className="relative cursor-none">
        <CustomCursor />
        {children}
      </div>
    </SmoothScroll>
  )
}
