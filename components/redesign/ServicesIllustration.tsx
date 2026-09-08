'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────────
   LaunchLive Studio — Services Illustration  v2.1
   "The Growth Engine"

   Hand-crafted SVG + Next/Image component.
   The LaunchLive triquetra logo sits precisely at the centre focal point.
   Six service nodes orbit it in a balanced 60° harmonic configuration,
   docked right inside their designated orbital placeholder rings.

   Brand tokens (mirrors globals.css):
     --background:        #faf8f6
     --foreground:        #1a1a1a
     --surface:           #f2f0ed
     --surface-accent:    #e8e4df
     --accent:            #ff5c00
     --accent-secondary:  #2d3142
     --text-muted:        #6b7280
     --border:            rgba(0,0,0,0.08)
───────────────────────────────────────────────────────────────────────────── */

const C = {
  ivory:        '#faf8f6',
  surface:      '#f2f0ed',
  surfaceAlt:   '#e8e4df',
  charcoal:     '#1a1a1a',
  slate:        '#2d3142',
  orange:       '#ff5c00',
  orangeWarm:   '#ff7a2e',
  orangeGlow:   'rgba(255,92,0,0.14)',
  orangeFaint:  'rgba(255,92,0,0.07)',
  border:       'rgba(26,26,26,0.09)',
  borderMed:    'rgba(26,26,26,0.16)',
  violet:       '#5b5fcf',
  violetFaint:  'rgba(91,95,207,0.10)',
  muted:        '#6b7280',
}

// Centre of SVG canvas (528 x 580)
const CX = 264
const CY = 290
const ORBIT_R = 180

// Six service nodes: evenly spaced by 60° around the central logo
// 330° (top-left), 30° (top-right), 90° (mid-right), 150° (bottom-right), 210° (bottom-left), 270° (mid-left)
const NODES = [
  { id: 'web',       angle: 330, r: ORBIT_R, label: 'Website Dev'   },
  { id: 'ai-system', angle:  30, r: ORBIT_R, label: 'AI Systems'    },
  { id: 'ai-tool',   angle:  90, r: ORBIT_R, label: 'AI Tools'      },
  { id: 'auto',      angle: 150, r: ORBIT_R, label: 'Automation'    },
  { id: 'design',    angle: 210, r: ORBIT_R, label: 'UI/UX Design'  },
  { id: 'gtm',       angle: 270, r: ORBIT_R, label: 'GTM Strategy'  },
]

function nodePos(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

// Mini SVG icon for each node (pure SVG, hand-crafted)
function NodeIcon({ id }: { id: string }) {
  const s = 28 // icon canvas size
  switch (id) {
    case 'web':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="2" y="5" width="24" height="18" rx="4" stroke={C.charcoal} strokeWidth="1.5" fill={C.surface} />
          <rect x="2" y="5" width="24" height="6" rx="4" fill={C.surfaceAlt} />
          <rect y="8" x="2" width="24" height="3" fill={C.surfaceAlt} />
          <circle cx="6"  cy="8" r="1.2" fill="#ff5f57" />
          <circle cx="10" cy="8" r="1.2" fill="#ffbd2e" />
          <circle cx="14" cy="8" r="1.2" fill="#28c840" />
          <rect x="6" y="14" width="10" height="2" rx="1" fill={C.charcoal} fillOpacity="0.45" />
          <rect x="6" y="18" width="7"  height="1.5" rx="0.75" fill={C.charcoal} fillOpacity="0.20" />
          <rect x="6" y="21" width="5"  height="1.5" rx="0.75" fill={C.orange} fillOpacity="0.60" />
          <rect x="18" y="14" width="5" height="8" rx="2" fill={C.charcoal} fillOpacity="0.07" stroke={C.border} strokeWidth="0.8" />
        </svg>
      )
    case 'ai-system':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          {/* 3-layer neural net */}
          {[6, 14, 22].map((y, i) => (
            <circle key={i} cx="5" cy={y} r="2.5" fill={C.violet} fillOpacity={0.5 + i * 0.15} />
          ))}
          {[10, 18].map((y, i) => (
            <circle key={i} cx="14" cy={y} r="2.5" fill={C.violet} fillOpacity="0.3" stroke={C.violet} strokeWidth="0.8" strokeOpacity="0.5" />
          ))}
          <circle cx="23" cy="14" r="3" fill={C.orange} fillOpacity="0.85" />
          {/* connections */}
          {[6,14,22].map(y1 => [10,18].map(y2 => (
            <line key={`${y1}-${y2}`} x1="7.5" y1={y1} x2="11.5" y2={y2} stroke={C.border} strokeWidth="0.7" />
          )))}
          {[10,18].map(y => (
            <line key={y} x1="16.5" y1={y} x2="20" y2="14" stroke={C.orange} strokeWidth="0.9" strokeOpacity="0.4" />
          ))}
          {/* pulse ring */}
          <circle cx="23" cy="14" r="5" fill="none" stroke={C.orange} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />
        </svg>
      )
    case 'ai-tool':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          {/* Hexagonal prism */}
          <polygon points="14,4 21,8.5 21,17.5 14,22 7,17.5 7,8.5"
            fill={C.orangeFaint} stroke={C.orange} strokeWidth="1.4" strokeOpacity="0.6" />
          <polygon points="14,8 18.5,10.5 18.5,15.5 14,18 9.5,15.5 9.5,10.5"
            fill={C.orange} fillOpacity="0.15" />
          <circle cx="14" cy="13" r="3.5" fill={C.orange} fillOpacity="0.8" />
          <circle cx="14" cy="13" r="1.5" fill="#fff" fillOpacity="0.6" />
          {/* emission lines */}
          <line x1="21" y1="8.5"  x2="25" y2="6"  stroke={C.orange} strokeWidth="0.9" strokeOpacity="0.3" />
          <line x1="21" y1="17.5" x2="25" y2="20" stroke={C.orange} strokeWidth="0.9" strokeOpacity="0.2" />
        </svg>
      )
    case 'auto':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          {/* Pipeline track */}
          <path d="M 3 10 L 10 10 Q 14 10 14 14 L 14 18 Q 14 22 18 22 L 25 22"
            stroke={C.border} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 3 10 L 10 10 Q 14 10 14 14 L 14 18 Q 14 22 18 22 L 25 22"
            stroke={C.orange} strokeWidth="1.2" strokeDasharray="3.5 3" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Nodes */}
          <circle cx="3"  cy="10" r="3" fill={C.slate} />
          <circle cx="14" cy="16" r="3" fill={C.surface} stroke={C.border} strokeWidth="1" />
          <circle cx="25" cy="22" r="3.5" fill={C.orange} fillOpacity="0.85" />
          <circle cx="3"  cy="10" r="1.2" fill={C.ivory} fillOpacity="0.6" />
          <circle cx="14" cy="16" r="1.2" fill={C.orange} fillOpacity="0.5" />
          {/* pulse */}
          <circle cx="25" cy="22" r="6" fill="none" stroke={C.orange} strokeWidth="0.8" strokeOpacity="0.25" />
        </svg>
      )
    case 'design':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          {/* Layered panels */}
          <rect x="5" y="10" width="18" height="14" rx="3" fill={C.surface} stroke={C.border} strokeWidth="0.9" transform="rotate(-4 5 10)" />
          <rect x="5" y="8"  width="18" height="14" rx="3" fill={C.ivory}   stroke={C.border} strokeWidth="0.9" transform="rotate(2 5 8)" />
          <rect x="5" y="7"  width="18" height="14" rx="3" fill={C.ivory}   stroke={C.borderMed} strokeWidth="1" />
          {/* Grid layout lines */}
          <rect x="8"  y="10" width="6" height="8" rx="1.5" fill={C.surfaceAlt} stroke={C.border} strokeWidth="0.7" />
          <rect x="16" y="10" width="5" height="3" rx="1"   fill={C.charcoal} fillOpacity="0.18" />
          <rect x="16" y="15" width="4" height="1.5" rx="0.75" fill={C.charcoal} fillOpacity="0.10" />
          {/* Selection handles */}
          <rect x="6"  y="8"  width="4" height="4" rx="1" fill="none" stroke={C.orange} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
          {/* Cursor */}
          <path d="M 10 15 L 13 21 L 15 18 L 19 23" fill="none" stroke={C.orange} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="15" r="1.5" fill={C.orange} />
        </svg>
      )
    case 'gtm':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          {/* Chart area fill */}
          <path d="M 4 23 L 8 19 L 13 16 L 18 11 L 24 5 L 24 23 Z"
            fill={C.orange} fillOpacity="0.10" />
          {/* Chart line */}
          <path d="M 4 23 L 8 19 L 13 16 L 18 11 L 24 5"
            stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dots */}
          {[[4,23],[13,16],[24,5]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={C.orange} />
          ))}
          {/* Arrow tip */}
          <path d="M 19 3 L 25 5 L 22 10" fill="none" stroke={C.orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Axis lines */}
          <line x1="3" y1="4" x2="3" y2="24" stroke={C.charcoal} strokeWidth="0.8" strokeOpacity="0.18" />
          <line x1="3" y1="24" x2="25" y2="24" stroke={C.charcoal} strokeWidth="0.8" strokeOpacity="0.18" />
        </svg>
      )
    default: return null
  }
}

export function ServicesIllustration() {
  return (
    <div
      className="relative w-full flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[520px]"
        style={{ aspectRatio: '528 / 580' }}
      >
        {/* ── SVG backdrop layer ──────────────────────────────────────── */}
        <svg
          viewBox="0 0 528 580"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Outer ambient glow */}
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={C.orange} stopOpacity="0.13" />
              <stop offset="100%" stopColor={C.orange} stopOpacity="0"    />
            </radialGradient>

            {/* Central plate gradient */}
            <radialGradient id="plateFill" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor={C.ivory}   />
              <stop offset="100%" stopColor={C.surface}  />
            </radialGradient>

            {/* Orbit ring gradient */}
            <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor={C.orange} stopOpacity="0.25" />
              <stop offset="50%"  stopColor={C.orange} stopOpacity="0.08" />
              <stop offset="100%" stopColor={C.orange} stopOpacity="0.25" />
            </linearGradient>

            {/* Soft drop shadows */}
            <filter id="centreShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor={C.orange}   floodOpacity="0.18" />
              <feDropShadow dx="0" dy="4"  stdDeviation="6"  floodColor={C.charcoal} floodOpacity="0.08" />
            </filter>
            <filter id="glowBlur">
              <feGaussianBlur stdDeviation="18" />
            </filter>

            {/* Dot pattern */}
            <pattern id="dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={C.charcoal} fillOpacity="0.05" />
            </pattern>
          </defs>

          {/* Dot field */}
          <rect width="528" height="580" fill="url(#dots)" />

          {/* Ambient glow behind centre */}
          <ellipse cx={CX} cy={CY} rx="190" ry="160"
            fill="url(#ambientGlow)" filter="url(#glowBlur)" />

          {/* ── ORBIT RINGS ──────────────────────────────────────────── */}
          {/* Primary orbit ring (radius = ORBIT_R = 180) */}
          <motion.circle
            cx={CX} cy={CY} r={ORBIT_R}
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          {/* Inner accent ring */}
          <circle cx={CX} cy={CY} r="96"
            fill="none"
            stroke={C.orange}
            strokeWidth="0.7"
            strokeOpacity="0.15"
            strokeDasharray="4 8"
          />

          {/* ── CONNECTOR PATHS ──────────────────────────────────────── */}
          {NODES.map((node, i) => {
            const p = nodePos(node.angle, node.r)
            // Quadratic bezier curve from centre to node dock
            const mx = CX + (p.x - CX) * 0.45
            const my = CY + (p.y - CY) * 0.45
            return (
              <motion.path
                key={node.id}
                d={`M ${CX} ${CY} Q ${mx} ${my} ${p.x} ${p.y}`}
                stroke={C.orange}
                strokeWidth="1.2"
                strokeOpacity="0.32"
                strokeDasharray="5 6"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              />
            )
          })}

          {/* ── NODE DOCKING PLACEHOLDERS (visual sockets) ─────────────── */}
          {NODES.map((node) => {
            const p = nodePos(node.angle, node.r)
            return (
              <g key={`dock-${node.id}`}>
                {/* Ambient glow aura */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="42"
                  fill={C.orangeFaint}
                />
                {/* Dashed outer docking ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="34"
                  fill="none"
                  stroke={C.orange}
                  strokeWidth="1"
                  strokeOpacity="0.32"
                  strokeDasharray="3 4"
                />
                {/* Dock socket border matching card curvature */}
                <rect
                  x={p.x - 28}
                  y={p.y - 28}
                  width="56"
                  height="56"
                  rx="16"
                  fill={C.surface}
                  fillOpacity="0.35"
                  stroke={C.border}
                  strokeWidth="1"
                />
              </g>
            )
          })}

          {/* ── PULSE ENERGY RINGS on node sockets ─────────────────────── */}
          {NODES.map((node, i) => {
            const p = nodePos(node.angle, node.r)
            return (
              <motion.circle
                key={`pulse-${node.id}`}
                cx={p.x}
                cy={p.y}
                r="30"
                fill="none"
                stroke={C.orange}
                strokeWidth="1.2"
                animate={{ r: [28, 42, 28], opacity: [0.55, 0, 0.55] }}
                transition={{ repeat: Infinity, duration: 3.2, delay: i * 0.5, ease: 'easeInOut' }}
              />
            )
          })}

          {/* ── CENTRE PLATE PLACEHOLDER ─────────────────────────────── */}
          {/* Outer plate backing */}
          <circle cx={CX} cy={CY} r="70"
            fill="url(#plateFill)"
            stroke={C.orange}
            strokeWidth="1.5"
            strokeOpacity="0.25"
            filter="url(#centreShadow)"
          />
          {/* Inner accent ring */}
          <circle cx={CX} cy={CY} r="58"
            fill="none"
            stroke={C.orange}
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="3 5"
          />

          {/* Floating micro-accents around center plate */}
          <motion.g
            animate={{ rotate: [0, -360] }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            {[0, 60, 120, 180, 240, 300].map((a, i) => {
              const rad = (a - 90) * Math.PI / 180
              const r = 76
              return (
                <circle
                  key={i}
                  cx={CX + r * Math.cos(rad)}
                  cy={CY + r * Math.sin(rad)}
                  r="2.5"
                  fill={C.orange}
                  fillOpacity="0.3"
                />
              )
            })}
          </motion.g>

          {/* Floating decorative geometry */}
          <motion.circle cx="470" cy="72"  r="22" fill="none" stroke={C.orange} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="4 6"
            animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            style={{ transformOrigin: '470px 72px' }}
          />
          <circle cx="470" cy="72" r="4" fill={C.orange} fillOpacity="0.3" />

          <motion.g animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1.2 }}>
            <rect x="42" y="490" width="16" height="16" rx="3" fill="none"
              stroke={C.orange} strokeWidth="1.1" strokeOpacity="0.25"
              transform="rotate(45 50 498)"
            />
          </motion.g>

          <motion.g animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 7.2, ease: 'easeInOut', delay: 0.4 }}>
            <path d="M 496 380 L 508 400 L 484 400 Z"
              fill="none" stroke={C.orange} strokeWidth="1" strokeOpacity="0.20" />
          </motion.g>

          {[
            [175, 524], [330, 536], [440, 510], [476, 430], [72, 440],
          ].map(([cx, cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r="2.5"
              fill={i % 2 === 0 ? C.orange : C.charcoal}
              fillOpacity={i % 2 === 0 ? 0.22 : 0.09}
              animate={{ opacity: [0.22, 0.55, 0.22] }}
              transition={{ repeat: Infinity, duration: 3.5 + i * 0.4, delay: i * 0.5 }}
            />
          ))}

        </svg>

        {/* ── NODE ICON CARDS (HTML Layer, docked precisely in placeholders) ── */}
        {NODES.map((node, i) => {
          const p = nodePos(node.angle, node.r)
          const pxPct = (p.x / 528) * 100
          const pyPct = (p.y / 580) * 100

          return (
            <div
              key={node.id}
              className="absolute pointer-events-none"
              style={{
                left: `${pxPct}%`,
                top: `${pyPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className="pointer-events-auto relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.12, zIndex: 30 }}
              >
                {/* 56x56 px card, mathematically centered at p.x, p.y */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer"
                  style={{
                    background: C.ivory,
                    border: `1px solid ${C.borderMed}`,
                    boxShadow: `0 6px 20px rgba(26,26,26,0.08), 0 2px 6px rgba(255,92,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)`,
                  }}
                >
                  {/* Subtle orange glow inside */}
                  <span
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full pointer-events-none"
                    style={{ background: C.orangeGlow, filter: 'blur(8px)' }}
                  />
                  <NodeIcon id={node.id} />
                </div>

                {/* Label pill - positioned below the card without shifting the icon card center */}
                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span
                    className="inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      color: C.muted,
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </motion.div>
            </div>
          )
        })}

        {/* ── CENTRE LOGO (HTML Layer, docked precisely in centre plate) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${(CX / 528) * 100}%`,
            top:  `${(CY / 580) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            className="pointer-events-auto relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer pulse energy rings */}
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: C.orangeGlow }}
              animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: C.orangeFaint }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 0.6, ease: 'easeInOut' }}
            />

            {/* 96x96 px central logo plate */}
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 38% 32%, ${C.ivory}, ${C.surface})`,
                border: `1.5px solid rgba(255,92,0,0.28)`,
                boxShadow: `
                  0 0 0 6px rgba(255,92,0,0.06),
                  0 12px 32px rgba(255,92,0,0.18),
                  0 4px 10px rgba(26,26,26,0.10),
                  inset 0 1px 0 rgba(255,255,255,0.95)
                `,
              }}
            >
              <Image
                src="/logo.png"
                alt="LaunchLive Studio"
                width={52}
                height={52}
                className="relative z-10 object-contain"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(26,26,26,0.08))' }}
              />
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  )
}
