'use client'

import React, { useEffect, useState, memo } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export const CustomCursor = memo(() => {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Snappier, more responsive springs
  const springConfig = { stiffness: 800, damping: 40, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractable = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.group') // Often used for cards
      )

      // Only update state if it changed to prevent unnecessary re-renders
      setIsHovered(prev => {
        if (prev !== isInteractable) return isInteractable
        return prev
      })
    }

    window.addEventListener('mousemove', moveMouse, { passive: true })
    window.addEventListener('mouseover', handleInteraction)

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleInteraction)
    }
  }, [mouseX, mouseY, isVisible])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_15px_rgba(255,92,0,0.3)]"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        scale: isHovered ? 2 : 1,
      }}
      animate={{
        scale: isHovered ? 2 : 1,
        opacity: isVisible ? 0.55 : 0,
      }}
    />
  )
})

CustomCursor.displayName = 'CustomCursor'
