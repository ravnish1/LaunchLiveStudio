'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const HeroVisual = () => {
  const [phase, setPhase] = useState<'boot' | 'typing' | 'building' | 'showcase'>('boot')
  const [typedText, setTypedText] = useState('')
  const [buildLogs, setBuildLogs] = useState<string[]>([])

  const COMMAND = "Client: Build a premium Web Platform & AI System for my brand."

  const LOGS = [
    "Establishing secure client connection... [OK]",
    "Analyzing brand requirements & strategy...",
    "Deploying scalable AI architecture...",
    "Designing pixel-perfect Web Platform...",
    "Integrating smart automations...",
    "Optimizing performance to 100/100...",
    "CLIENT PROJECT SUCCESSFUL in 0.8s 🚀",
    "Delivering masterpiece..."
  ]

  useEffect(() => {
    let isActive = true;

    const runSequence = async () => {
      if (!isActive) return;

      // Phase 1: Boot wait
      setPhase('boot')
      setTypedText('')
      setBuildLogs([])
      await new Promise(r => setTimeout(r, 1000))
      if (!isActive) return;

      // Phase 2: Typing
      setPhase('typing')
      for (let i = 0; i <= COMMAND.length; i++) {
        if (!isActive) return;
        setTypedText(COMMAND.slice(0, i))
        await new Promise(r => setTimeout(r, Math.random() * 60 + 40)) // Human-like typing
      }

      await new Promise(r => setTimeout(r, 500))
      if (!isActive) return;

      // Phase 3: Building
      setPhase('building')
      for (let i = 0; i < LOGS.length; i++) {
        if (!isActive) return;
        setBuildLogs(prev => [...prev, LOGS[i]])
        await new Promise(r => setTimeout(r, i === LOGS.length - 2 ? 800 : 250)) // Pause before SUCCESS
      }

      await new Promise(r => setTimeout(r, 800))
      if (!isActive) return;

      // Phase 4: Showcase
      setPhase('showcase')
    }

    runSequence()

    return () => {
      isActive = false;
    }
  }, [])

  return (
    <div className="relative w-full max-w-[450px] aspect-[9/11] lg:aspect-[4/5] rounded-3xl overflow-hidden glass border-border shadow-[0_32px_80px_rgba(0,0,0,0.14)] flex flex-col mx-auto lg:mr-0 z-20 hover:scale-[1.02] transition-transform duration-500">

      <AnimatePresence mode="popLayout">
        {phase !== 'showcase' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 p-6 flex flex-col w-full h-full z-10"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-foreground/5 rounded-full blur-[80px]" />
            </div>

            {/* UI Header */}
            <div className="flex items-center gap-2 border-b border-border/50 pb-4 mb-6 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="ml-2 text-xs font-mono text-text-muted font-medium lowercase tracking-widest">launch-live.exe</div>
            </div>

            {/* Body - Terminal output */}
            <div className="flex-1 font-mono text-[13px] md:text-sm leading-relaxed text-foreground flex flex-col gap-3">
              <div className="flex items-start text-accent/90 font-medium">
                <span className="mr-3">~</span>
                <span className="opacity-90 relative">
                  {typedText}
                  {(phase === 'boot' || phase === 'typing') && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-accent ml-1 align-middle"
                    />
                  )}
                </span>
              </div>

              {buildLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start ${log.includes('SUCCESSFUL') ? 'text-green-500 font-bold' : 'opacity-80'}`}
                >
                  <span className="text-accent/50 mr-3">{'>'}</span>
                  <span>{log}</span>
                </motion.div>
              ))}

              {phase === 'building' && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-4 bg-accent mt-2 ml-6"
                />
              )}
            </div>

            {/* Footer Sync Area */}
            <div className="mt-6 h-16 w-full bg-background/40 rounded-2xl border border-border/50 flex flex-col justify-center px-6 relative overflow-hidden backdrop-blur-md shrink-0">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -left-16 w-32 h-32 border border-accent/10 rounded-full pointer-events-none" />

              <div className="flex items-center justify-between z-10 w-full">
                <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">Status: {phase}</span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map(idx => (
                    <motion.div
                      key={idx}
                      animate={{ scale: phase === 'building' ? [1, 1.5, 1] : 1, opacity: phase === 'building' ? [0.5, 1, 0.5] : 0.3 }}
                      transition={{ repeat: Infinity, duration: 1, delay: idx * 0.2 }}
                      className="w-2 h-2 rounded-full bg-accent"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'showcase' && (
          <motion.div
            key="showcase"
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.90, rotateX: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, rotateX: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col p-4 md:p-6 w-full h-full glass bg-background/60 z-30 transform-gpu"
          >
            {/* Showcase Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-foreground flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-foreground tracking-wide text-[11px] md:text-sm">Client Request Delivered</span>
              </div>
              <div className="flex gap-1.5 md:gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-border" />
              </div>
            </div>

            <div className="flex gap-2 mb-3 md:mb-4 shrink-0 overflow-hidden">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full text-accent text-[8px] md:text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                Web Platform Built
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full text-accent text-[8px] md:text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                AI Engine Online
              </motion.div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 shrink-0">
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="bg-surface/80 border border-border/80 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm backdrop-blur-sm flex flex-col justify-center"
              >
                <p className="text-text-muted text-[8px] md:text-[9px] uppercase font-bold tracking-widest mb-1">Client Rating</p>
                <div className="flex gap-1 text-yellow-500 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 md:w-5 md:h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                className="bg-surface/80 border border-border/80 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm backdrop-blur-sm flex flex-col justify-center"
              >
                <p className="text-text-muted text-[8px] md:text-[9px] uppercase font-bold tracking-widest mb-1">ROI Delivered</p>
                <p className="text-lg md:text-2xl font-serif text-accent">+342%</p>
              </motion.div>
            </div>

            {/* Main Visual Area - Client Satisfaction Chat */}
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex-1 bg-surface/80 border border-border/80 rounded-xl md:rounded-2xl relative overflow-hidden flex flex-col justify-end p-3 md:p-4 backdrop-blur-sm gap-2 md:gap-3 pb-4 md:pb-6"
            >
              {/* Agency Message */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 1, type: "spring" }}
                className="self-start max-w-[90%] md:max-w-[88%] bg-accent/10 border border-accent/20 rounded-xl md:rounded-2xl rounded-tl-sm p-2.5 md:p-3 shadow-sm"
              >
                 <p className="text-[8px] md:text-[10px] font-bold text-accent mb-0.5 md:mb-1 flex items-center gap-1 uppercase tracking-wide">
                   <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-accent animate-pulse" /> Launch Live Studio
                 </p>
                 <p className="text-[10px] md:text-xs text-foreground/90 leading-relaxed font-medium">
                   Deployment complete! Your custom high-performance Web & AI platform is now live. 🚀
                 </p>
              </motion.div>

              {/* Client Message */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 15 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                transition={{ delay: 2.2, type: "spring", stiffness: 200, damping: 20 }}
                className="self-end max-w-[88%] md:max-w-[85%] bg-foreground text-background rounded-xl md:rounded-2xl rounded-tr-sm p-3 md:p-3.5 shadow-md mt-1 relative"
              >
                 <p className="text-[8px] md:text-[10px] font-bold text-background/60 mb-0.5 md:mb-1 uppercase tracking-wider">
                   Happy Client
                 </p>
                 <p className="text-[11px] md:text-sm font-semibold leading-relaxed">
                   This is incredible. Beyond our expectations! 🎉💯
                 </p>
                 {/* Floating heart reaction */}
                 <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 3, type: "spring", bounce: 0.5 }}
                   className="absolute -bottom-1.5 md:-bottom-2 -left-2 md:-left-3 bg-background text-foreground text-[10px] md:text-xs rounded-full p-0.5 md:p-1 shadow-md border border-border flex items-center justify-center w-5 h-5 md:w-6 md:h-6"
                 >
                   ❤️
                 </motion.div>
              </motion.div>
            </motion.div>

            {/* Footer Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-3 md:mt-4 w-full h-10 md:h-12 shrink-0 bg-foreground text-background rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow px-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-bold text-[9px] md:text-xs tracking-[0.2em] uppercase text-center">Project Successfully Launched</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
