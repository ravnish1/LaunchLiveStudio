'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Linkedin, Instagram } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="pt-32 pb-10 px-6 bg-surface border-t border-foreground/5">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1 space-y-8">
            <div className="flex flex-col items-start gap-4">
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
            </div>
            <p className="text-text-muted leading-relaxed font-serif italic text-lg">
              We Build. We Brand. We Launch.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-text-muted mt-2">
              <Link href="#" className="hover:text-accent transition-transform hover:-translate-y-1" aria-label="Twitter/X">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-transform hover:-translate-y-1" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-transform hover:-translate-y-1" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest uppercase text-accent">Navigate</h4>
            <ul className="space-y-4">
              {[
                { name: 'Work', href: '/work' },
                { name: 'Services', href: '/services' },
                { name: 'Testimonials', href: '/testimonials' },
                { name: 'Resources', href: '/resources' },
                { name: 'Book a Call', href: '/book-a-call' },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-text-muted hover:text-accent transition-colors relative group">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest uppercase text-accent">Services</h4>
            <ul className="space-y-4">
              {['Website Development', 'AI Systems', 'Branding', 'SEO Optimization', 'Automations'].map(item => (
                <li key={item}>
                  <Link href="/services" className="text-text-muted hover:text-accent transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest uppercase text-accent">Contact</h4>
            <ul className="space-y-4 text-text-muted">
              <li><a href="mailto:hello@launchlive.studio" className="hover:text-accent transition-colors">hello@launchlive.studio</a></li>
              <li><Link href="/book-a-call" className="hover:text-accent transition-colors underline underline-offset-4">Schedule a call &rarr;</Link></li>
              <li>Gurugram, India 🇮🇳</li>
              <li>Working globally.</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-text-muted tracking-widest uppercase">
            © 2026 LAUNCH LIVE STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs text-text-muted tracking-widest uppercase">
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
