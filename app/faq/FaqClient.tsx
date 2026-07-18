'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/redesign/Navbar'
import { Footer } from '@/components/redesign/Footer'
import { CTABanner } from '@/components/redesign/CTABanner'
import { faqData } from '@/lib/faq-data'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('@/components/redesign/SmoothScroll').then(m => ({ default: m.SmoothScroll })),
  { ssr: false }
)

const FaqItemComponent = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border border-foreground/10 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm transition-colors hover:bg-background/80">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 outline-none"
      >
        <span className="font-serif font-bold text-lg md:text-xl text-foreground/90">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 text-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-foreground/70 leading-relaxed text-base md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqClient() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return faqData

    const lowerQuery = searchQuery.toLowerCase()
    
    return faqData.map(category => {
      const filteredItems = category.items.filter(item => {
        const qMatch = item.question.toLowerCase().includes(lowerQuery)
        const aMatch = typeof item.answer === 'string' 
          ? item.answer.toLowerCase().includes(lowerQuery) 
          : false
        return qMatch || aMatch
      })
      
      return {
        ...category,
        items: filteredItems
      }
    }).filter(category => category.items.length > 0)
  }, [searchQuery])

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent">
        <Navbar />

        <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 max-w-4xl mx-auto min-h-[80vh]">
          {/* Header section */}
          <div className="text-center mb-16 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-serif font-black tracking-tighter"
            >
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Questions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
            >
              Everything you need to know about partnering with Launch Live Studio. Can't find the answer you're looking for? Reach out to us.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-xl mx-auto mt-8"
            >
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-foreground/40">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search questions (e.g. 'pricing', 'process')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 md:py-5 text-lg rounded-full bg-foreground/5 border border-foreground/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-foreground/40 text-foreground"
              />
            </motion.div>
          </div>

          {/* FAQ List */}
          <div className="space-y-12">
            {filteredData.length > 0 ? (
              filteredData.map((category, index) => (
                <motion.div 
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-accent px-2">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <FaqItemComponent key={i} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-foreground/50 text-lg"
              >
                No questions found matching "<span className="text-foreground font-semibold">{searchQuery}</span>". Try a different keyword.
              </motion.div>
            )}
          </div>
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  )
}
