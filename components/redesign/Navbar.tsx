'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Resources', href: '/resources' },
  ]

  return (
    <>
      <div className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto rounded-full w-full max-w-[1100px] transition-all duration-500 ease-out"
          style={{
            background: isScrolled
              ? 'rgba(250, 247, 242, 0.85)'
              : 'rgba(250, 247, 242, 0.4)',
            backdropFilter: 'blur(16px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
            border: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 0, 0, 0.03)',
            boxShadow: isScrolled
              ? '0 10px 40px rgba(0, 0, 0, 0.05)'
              : '0 4px 20px rgba(0, 0, 0, 0.01)',
            padding: isScrolled ? '12px 24px' : '18px 32px',
            transform: isScrolled ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Launch Live Studio"
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                launchlive.studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link href="/book-a-call" className="hidden md:block px-6 py-2 bg-accent text-white text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all shadow-md shadow-accent/20">
                Book a Call
              </Link>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif font-bold text-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/book-a-call" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 px-10 py-4 bg-accent text-white font-bold rounded-full shadow-xl shadow-accent/20">
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
