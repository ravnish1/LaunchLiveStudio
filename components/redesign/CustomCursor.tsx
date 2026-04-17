'use client'

import React, { useEffect, useState, memo } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export const CustomCursor = memo(() => {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 15, mass: 0.2 }
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

      // Hide custom cursor completely if over input or iframe
      if (['INPUT', 'TEXTAREA', 'IFRAME'].includes(target.tagName)) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

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
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovered ? 4 : 2,
        opacity: isVisible && !isHidden ? (isHovered ? 0.35 : 1) : 0,
      }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
    />
  )
})

CustomCursor.displayName = 'CustomCursor'