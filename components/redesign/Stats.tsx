'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

import { ScrambleHeading } from './ScrambleHeading'

const Counter = ({ value, suffix, label }: { value: number, suffix: string, label: string }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const displayValue = useTransform(spring, (current) => Math.round(current))

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, value, spring])

  useEffect(() => {
    return displayValue.on('change', (latest) => setCurrent(latest))
  }, [displayValue])

  return (
    <div ref={ref} className="text-center bg-background rounded-3xl p-4 lg:p-4 xl:p-6 border border-foreground/5 shadow-sm flex flex-col justify-center min-h-[130px]">
      <div className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold tracking-tighter mb-2 text-accent whitespace-nowrap">
        {current}{suffix}
      </div>
      <div className="text-xs xl:text-sm font-medium tracking-wide xl:tracking-widest uppercase text-text-muted line-clamp-2">
        {label}
      </div>
    </div>
  )
}

export const Stats = () => {
  return (
    <section className="py-32 px-6 bg-surface border-y border-foreground/5 noise-bg">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <ScrambleHeading text="WE ARE" as="span" className="text-sm font-medium tracking-widest text-accent uppercase" staggerMs={30} scrambleFrames={4} />
          <div className="mt-4 mb-8 space-y-1">
            <ScrambleHeading text="A lean team of builders," as="h2" className="text-[5.8vw] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] tracking-tight whitespace-nowrap" staggerMs={50} />
            <ScrambleHeading text="designers, and AI engineers." as="h2" className="text-[5.8vw] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif underline decoration-accent underline-offset-8 decoration-1 leading-[1.1] tracking-tight whitespace-nowrap" staggerMs={50} />
          </div>

          <p className="text-xl text-text-muted leading-relaxed mb-6 max-w-lg">
            We started Launch Live Studio to fix what most agencies get wrong — slow delivery, over-promising, and unclear communication.
            <br className="hidden md:block"/><br className="hidden md:block"/>
            We move fast, build right, and stay transparent.
          </p>
          <h3 className="text-2xl font-serif italic text-foreground leading-snug">
            Young founders. One obsession.<br className="hidden lg:block" /> Build things that actually work.
          </h3>
        </div>

        <div className="flex flex-col justify-center border-l-0 lg:border-l border-foreground/10 pl-0 lg:pl-12 mt-12 lg:mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Counter value={12} suffix="+" label="Products Launched" />
            <Counter value={3} suffix="" label="Client Countries" />
            <Counter value={100} suffix="%" label="On-Time Delivery Rate" />
          </div>
          <div className="px-6 py-6 bg-accent/5 border border-accent/10 rounded-2xl mt-12 shadow-sm">
            <p className="text-xl leading-relaxed font-serif italic text-foreground text-center mb-3">
              “From idea to launch — your end-to-end digital partner.”
            </p>
            <p className="text-xs font-bold tracking-widest uppercase text-accent text-center">
              — Launch Live Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
