'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "The Launch Live Studio team is elite. They delivered our entire custom Shopify storefront for Raptile Studio a week before the deadline. The design is incredible and the process was seamless.",
    author: "Divyansh Prajapati",
    company: "Founder, Raptile Studio",
  },
  {
    quote: "Launch Live built our entire platform in 5 weeks. I genuinely didn't think it was possible.",
    author: "Arjun M.",
    company: "Founder, TerraFlow",
  },
  {
    quote: "They turned our brand from forgettable to unforgettable. The results spoke for themselves in week one.",
    author: "Sophie K.",
    company: "CMO, Nova Roast",
  },
  {
    quote: "The AI automation system they built saves us 20+ hours every single week. Worth every rupee.",
    author: "Dev R.",
    company: "CEO, Vaultly",
  },

]

export const Testimonials = () => {
  const [index, setIndex] = useState(0)

  return (
    <section className="py-24 md:py-40 px-6 bg-background relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto text-center relative z-10">
        <div className="mb-12">
          <span className="text-sm font-medium tracking-widest text-accent uppercase block mb-4">WHAT CLIENTS SAY</span>
          <h2 className="text-4xl md:text-5xl font-serif">Don't take our word for it.</h2>
        </div>
        <Quote size={60} className="mx-auto mb-8 text-accent opacity-20" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif italic mb-8 leading-relaxed text-foreground/90">
              "{testimonials[index].quote}"
            </h2>
            <div className="space-y-1">
              <p className="text-xl font-bold">{testimonials[index].author}</p>
              <p className="text-sm tracking-widest uppercase text-accent font-bold">{testimonials[index].company}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-accent w-10' : 'bg-foreground/10'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
    </section>
  )
}
