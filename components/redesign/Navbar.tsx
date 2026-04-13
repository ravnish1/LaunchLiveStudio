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
      setIsScrolled(window.scrollY > 40)
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
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[1100px] transition-all duration-500 ease-out rounded-full ${isScrolled
            ? 'bg-background/60 backdrop-blur-2xl backdrop-saturate-150 border border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-5 md:px-6'
            : 'bg-background/20 backdrop-blur-lg backdrop-saturate-150 border border-foreground/5 shadow-sm py-4 px-5 md:px-8'
            }`}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Launch Live Studio"
              width={40}
              height={40}
              className="group-hover:scale-110 transition-transform duration-500"
            />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              launchlive.studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-semibold tracking-wide text-foreground/70 hover:text-foreground transition-colors relative group rounded-full"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-foreground/5 rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-0" />
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/book-a-call"
              className="hidden md:flex px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 group items-center gap-2"
            >
              <span>Book a Call</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors bg-foreground/5 hover:bg-foreground/10 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-3xl px-6 pt-32 pb-12 flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif font-black tracking-tight text-foreground hover:text-accent transition-colors block py-2"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 w-full max-w-xs"
            >
              <Link
                href="/book-a-call"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-8 py-5 bg-accent text-white text-lg font-bold rounded-full shadow-2xl shadow-accent/30 active:scale-95 transition-all text-center"
              >
                Book a Call &rarr;
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

