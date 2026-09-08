'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   ServiceCards  — Premium bento-style interactive service layout.

   Each card carries:
   • A hand-crafted inline SVG illustration unique to that service
   • 3D tilt effect on hover (via Framer Motion spring transforms)
   • A subtle parallax on the SVG illustration
   • Exact brand tokens matching globals.css
───────────────────────────────────────────────────────────────────────────── */

// Brand tokens (exact match to globals.css)
const T = {
  bg:          '#faf8f6',
  surface:     '#f2f0ed',
  surfaceAlt:  '#e8e4df',
  charcoal:    '#1a1a1a',
  slate:       '#2d3142',
  orange:      '#ff5c00',
  orangeLight: '#ff7a2e',
  orangeGlow:  'rgba(255,92,0,0.12)',
  violet:      '#5b5fcf',
  muted:       '#6b7280',
  border:      'rgba(26,26,26,0.08)',
  borderMed:   'rgba(26,26,26,0.15)',
}

// ── Per-service SVG illustrations ──────────────────────────────────────────

function IllustrationWebsite() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Backdrop glow */}
      <ellipse cx="100" cy="65" rx="70" ry="45" fill={T.orangeGlow} />

      {/* Back card (depth layer) */}
      <rect x="30" y="22" width="140" height="92" rx="12" fill={T.surface} stroke={T.border} strokeWidth="1"
        transform="rotate(-2 30 22)" />

      {/* Main browser card */}
      <rect x="28" y="18" width="144" height="96" rx="12" fill={T.bg} stroke={T.borderMed} strokeWidth="1" />

      {/* Topbar */}
      <rect x="28" y="18" width="144" height="26" rx="12" fill={T.surfaceAlt} />
      <rect x="28" y="30"  width="144" height="14" fill={T.surfaceAlt} />
      {/* Traffic dots */}
      <circle cx="42" cy="31" r="4" fill="#ff5f57" />
      <circle cx="54" cy="31" r="4" fill="#ffbd2e" />
      <circle cx="66" cy="31" r="4" fill="#28c840" />
      {/* URL bar */}
      <rect x="78" y="24" width="80" height="14" rx="7" fill={T.bg} stroke={T.border} strokeWidth="1" />
      <rect x="86" y="29" width="44" height="4" rx="2" fill={T.charcoal} fillOpacity="0.18" />

      {/* Page hero */}
      <rect x="36" y="52" width="60" height="54" rx="8" fill={T.surfaceAlt} />
      <rect x="36" y="52" width="60" height="54" rx="8" fill="none" stroke={T.border} strokeWidth="0.8" />
      {/* Hero type lines */}
      <rect x="104" y="54" width="60" height="8" rx="4" fill={T.charcoal} fillOpacity="0.60" />
      <rect x="104" y="66" width="50" height="5" rx="2.5" fill={T.charcoal} fillOpacity="0.20" />
      <rect x="104" y="75" width="44" height="5" rx="2.5" fill={T.charcoal} fillOpacity="0.14" />
      {/* Orange CTA */}
      <rect x="104" y="88" width="44" height="14" rx="7" fill={T.orange} />
      <rect x="104" y="88" width="44" height="14" rx="7" fill="none" stroke={T.border} strokeWidth="0.5" />
      <rect x="112" y="93" width="28" height="4" rx="2" fill="#fff" fillOpacity="0.7" />

      {/* Metrics strip */}
      {[36, 76, 116, 156].map((x, i) => (
        <g key={i}>
          <rect x={x} y="110" width="28" height="3" rx="1.5" fill={T.charcoal} fillOpacity={0.06 + i * 0.04} />
        </g>
      ))}

      {/* Performance badge */}
      <rect x="134" y="52" width="32" height="18" rx="9" fill={T.orange} fillOpacity="0.12" stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.4" />
      <rect x="140" y="57" width="20" height="4" rx="2" fill={T.orange} fillOpacity="0.6" />
      <rect x="140" y="63" width="14" height="3" rx="1.5" fill={T.orange} fillOpacity="0.35" />
    </svg>
  )
}

function IllustrationAISystem() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="100" cy="65" rx="68" ry="44" fill="rgba(91,95,207,0.07)" />

      {/* Dark card backing */}
      <rect x="24" y="16" width="152" height="100" rx="14" fill={T.slate} />
      <rect x="24" y="16" width="152" height="100" rx="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Top badge */}
      <rect x="34" y="26" width="48" height="14" rx="7" fill={T.violet} fillOpacity="0.20" />
      <rect x="40" y="30" width="36" height="4" rx="2" fill={T.violet} fillOpacity="0.70" />

      {/* Neural net — Input layer */}
      {[40, 56, 72, 88].map((y, i) => (
        <circle key={i} cx="50" cy={y} r="6" fill={T.violet} fillOpacity={0.35 + i * 0.08} />
      ))}

      {/* Hidden layer 1 */}
      {[48, 64, 80].map((y, i) => (
        <circle key={i} cx="90" cy={y} r="7" fill="none" stroke={T.violet} strokeWidth="1.2" strokeOpacity="0.55" />
      ))}

      {/* Hidden layer 2 */}
      {[48, 64, 80].map((y, i) => (
        <circle key={i} cx="130" cy={y} r="7" fill={T.orange} fillOpacity={0.15 + i * 0.1} stroke={T.orange} strokeWidth="1" strokeOpacity="0.4" />
      ))}

      {/* Output */}
      <circle cx="164" cy="64" r="9" fill={T.orange} fillOpacity="0.85" />
      <motion.circle cx="164" cy="64" r="14"
        fill="none" stroke={T.orange} strokeWidth="1"
        animate={{ r: [14, 22, 14], opacity: [0.45, 0, 0.45] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />

      {/* Connections — input to h1 */}
      {[40,56,72,88].flatMap(y1 => [48,64,80].map(y2 => (
        <line key={`${y1}-${y2}`} x1="56" y1={y1} x2="83" y2={y2}
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.9" />
      )))}
      {/* h1 to h2 */}
      {[48,64,80].flatMap(y1 => [48,64,80].map(y2 => (
        <line key={`${y1}-${y2}b`} x1="97" y1={y1} x2="123" y2={y2}
          stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.18" />
      )))}
      {/* h2 to output */}
      {[48,64,80].map(y => (
        <line key={y} x1="137" y1={y} x2="155" y2="64"
          stroke={T.orange} strokeWidth="1" strokeOpacity="0.55" />
      ))}

      {/* Animated data pulse travelling through network */}
      <motion.circle cx="0" cy="0" r="3.5" fill={T.orange} fillOpacity="0.75"
        animate={{
          cx: [50, 90, 130, 164],
          cy: [56, 64, 64, 64],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.0, ease: 'linear' }}
      />
    </svg>
  )
}

function IllustrationAITool() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="100" cy="65" rx="66" ry="42" fill={T.orangeGlow} />

      {/* Outer hex */}
      <polygon points="100,18 140,40 140,86 100,108 60,86 60,40"
        fill="none" stroke={T.orange} strokeWidth="1.4" strokeOpacity="0.38" />
      {/* Mid hex */}
      <polygon points="100,30 128,46 128,78 100,94 72,78 72,46"
        fill="rgba(255,92,0,0.06)" stroke={T.orange} strokeWidth="1" strokeOpacity="0.22" />
      {/* Inner hex */}
      <polygon points="100,44 116,53 116,73 100,82 84,73 84,53"
        fill="rgba(255,92,0,0.14)" />

      {/* Central glowing core */}
      <circle cx="100" cy="63" r="12" fill={T.orange} fillOpacity="0.85" />
      <circle cx="100" cy="63" r="6"  fill="#fff" fillOpacity="0.45" />
      <motion.circle cx="100" cy="63" r="18"
        fill="none" stroke={T.orange} strokeWidth="1.2"
        animate={{ r: [18, 28, 18], opacity: [0.35, 0, 0.35] }}
        transition={{ repeat: Infinity, duration: 2.6 }}
      />

      {/* Emission lines */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180
        const x1 = 100 + 14 * Math.cos(rad)
        const y1 = 63  + 14 * Math.sin(rad)
        const x2 = 100 + 36 * Math.cos(rad)
        const y2 = 63  + 36 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={T.orange} strokeWidth="1.2" strokeOpacity="0.28" />
      })}

      {/* Corner detail — tool sliders */}
      <rect x="18" y="40" width="34" height="6" rx="3" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8" />
      <rect x="18" y="40" width="22" height="6" rx="3" fill={T.orange} fillOpacity="0.55" />
      <circle cx="40" cy="43" r="5" fill={T.bg} stroke={T.orange} strokeWidth="1.3" />

      <rect x="18" y="82" width="34" height="6" rx="3" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8" />
      <rect x="18" y="82" width="14" height="6" rx="3" fill={T.orange} fillOpacity="0.35" />
      <circle cx="32" cy="85" r="5" fill={T.bg} stroke={T.orange} strokeWidth="1.3" />

      <rect x="148" y="40" width="34" height="6" rx="3" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8" />
      <rect x="148" y="40" width="26" height="6" rx="3" fill={T.orange} fillOpacity="0.45" />
      <circle cx="174" cy="43" r="5" fill={T.bg} stroke={T.orange} strokeWidth="1.3" />

      <rect x="148" y="82" width="34" height="6" rx="3" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8" />
      <rect x="148" y="82" width="20" height="6" rx="3" fill={T.orange} fillOpacity="0.50" />
      <circle cx="168" cy="85" r="5" fill={T.bg} stroke={T.orange} strokeWidth="1.3" />
    </svg>
  )
}

function IllustrationAutomation() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="100" cy="65" rx="68" ry="42" fill="rgba(45,49,66,0.05)" />

      {/* Track 1 — primary pipeline */}
      <path d="M 18 40 L 54 40 Q 66 40 66 52 L 66 68 Q 66 80 78 80 L 182 80"
        stroke={T.border} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 18 40 L 54 40 Q 66 40 66 52 L 66 68 Q 66 80 78 80 L 182 80"
        stroke={T.orange} strokeWidth="1.8" strokeDasharray="6 5" fill="none" strokeLinecap="round" strokeOpacity="0.65" />

      {/* Track 2 — secondary */}
      <path d="M 18 56 L 90 56 Q 102 56 102 44 L 102 30 L 182 30"
        stroke={T.border} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 18 56 L 90 56 Q 102 56 102 44 L 102 30 L 182 30"
        stroke={T.charcoal} strokeWidth="1" strokeDasharray="4 5" fill="none" strokeLinecap="round" strokeOpacity="0.20" />

      {/* Nodes */}
      {[
        { cx: 18,  cy: 40, dark: true,  big: false },
        { cx: 18,  cy: 56, dark: false, big: false },
        { cx: 66,  cy: 60, dark: false, big: false },
        { cx: 102, cy: 37, dark: false, big: false },
        { cx: 130, cy: 80, dark: false, big: true  },
        { cx: 182, cy: 80, dark: true,  big: true, accent: true },
        { cx: 182, cy: 30, dark: false, big: false },
      ].map(({ cx, cy, dark, big, accent }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={big ? 12 : 9}
            fill={accent ? T.orange : dark ? T.slate : T.bg}
            stroke={accent ? 'none' : T.borderMed}
            strokeWidth="1.2"
          />
          {accent && (
            <>
              <circle cx={cx} cy={cy} r="6" fill="#fff" fillOpacity="0.3" />
              <motion.circle cx={cx} cy={cy} r="18"
                fill="none" stroke={T.orange} strokeWidth="1"
                animate={{ r: [18, 26, 18], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </>
          )}
          {dark && !accent && (
            <circle cx={cx} cy={cy} r={big ? 5 : 3.5} fill={T.bg} fillOpacity="0.45" />
          )}
        </g>
      ))}

      {/* Animated pulse on track 1 */}
      <motion.circle cx="0" cy="0" r="4" fill={T.orange} fillOpacity="0.8"
        animate={{
          cx: [18, 66, 130, 182],
          cy: [40, 60, 80, 80],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
      />
      {/* Animated pulse on track 2 */}
      <motion.circle cx="0" cy="0" r="3" fill={T.charcoal} fillOpacity="0.35"
        animate={{
          cx: [18, 102, 182],
          cy: [56, 37, 30],
          opacity: [0, 0.6, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.8, delay: 1.0, ease: 'linear' }}
      />

      {/* Labels */}
      {[
        { cx: 18,  cy: 40, text: 'CRM'  },
        { cx: 130, cy: 80, text: 'Email' },
        { cx: 182, cy: 80, text: 'Live'  },
      ].map(({ cx, cy, text }, i) => (
        <text key={i} x={cx} y={cy + (cy > 60 ? -18 : 20)}
          textAnchor="middle" fontSize="7" fill={T.muted}
          fontFamily="Inter, sans-serif" letterSpacing="1.2" fontWeight="700"
        >
          {text}
        </text>
      ))}
    </svg>
  )
}

function IllustrationDesign() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="100" cy="65" rx="70" ry="44" fill={T.orangeGlow} />

      {/* Three stacked layered panels */}
      <rect x="30" y="26" width="140" height="88" rx="12" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8"
        transform="rotate(-3 30 26)" />
      <rect x="28" y="22" width="140" height="88" rx="12" fill={T.surface} stroke={T.border} strokeWidth="0.9"
        transform="rotate(1.5 28 22)" />

      {/* Front canvas */}
      <rect x="26" y="18" width="148" height="94" rx="12" fill={T.bg} stroke={T.borderMed} strokeWidth="1" />

      {/* Ruler / measurement guide */}
      <line x1="26" y1="14" x2="174" y2="14" stroke={T.orange} strokeWidth="0.7" strokeOpacity="0.40" />
      {[26, 50, 74, 100, 126, 150, 174].map((x, i) => (
        <line key={i} x1={x} y1="11" x2={x} y2="17" stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.35" />
      ))}
      <line x1="22" y1="18" x2="22" y2="112" stroke={T.orange} strokeWidth="0.7" strokeOpacity="0.40" />
      {[18, 38, 58, 78, 98, 112].map((y, i) => (
        <line key={i} x1="19" y1={y} x2="25" y2={y} stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.35" />
      ))}

      {/* Grid layout blocks on canvas */}
      <rect x="38" y="28" width="56" height="76" rx="8" fill={T.surfaceAlt} stroke={T.border} strokeWidth="0.8" />
      {/* Left column content lines */}
      <rect x="44" y="36" width="40" height="6" rx="3" fill={T.charcoal} fillOpacity="0.35" />
      <rect x="44" y="46" width="34" height="4" rx="2" fill={T.charcoal} fillOpacity="0.15" />
      <rect x="44" y="54" width="28" height="4" rx="2" fill={T.charcoal} fillOpacity="0.10" />
      {/* CTA block */}
      <rect x="44" y="64" width="40" height="14" rx="7" fill={T.orange} fillOpacity="0.15" stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="50" y="69" width="28" height="4" rx="2" fill={T.orange} fillOpacity="0.55" />

      {/* Right column */}
      <rect x="102" y="28" width="60" height="34" rx="8" fill={T.charcoal} fillOpacity="0.05" stroke={T.border} strokeWidth="0.8" />
      <rect x="102" y="68" width="60" height="16" rx="5" fill={T.charcoal} fillOpacity="0.05" stroke={T.border} strokeWidth="0.8" />
      <rect x="102" y="88" width="60" height="16" rx="5" fill={T.charcoal} fillOpacity="0.05" stroke={T.border} strokeWidth="0.8" />
      <rect x="108" y="74" width="44" height="4" rx="2" fill={T.charcoal} fillOpacity="0.14" />
      <rect x="108" y="94" width="36" height="4" rx="2" fill={T.charcoal} fillOpacity="0.10" />

      {/* Selection handles on left card */}
      {[[36,26],[92,26],[36,102],[92,102]].map(([x,y],i) => (
        <rect key={i} x={x-4} y={y-4} width="8" height="8" rx="2"
          fill={T.bg} stroke={T.orange} strokeWidth="1.2" />
      ))}

      {/* Cursor */}
      <path d="M 48 82 L 54 96 L 57 90 L 64 98"
        fill="none" stroke={T.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="82" r="3.5" fill={T.orange} />

      {/* Annotation callout */}
      <rect x="108" y="30" width="48" height="20" rx="6" fill={T.orange} fillOpacity="0.10" stroke={T.orange} strokeWidth="0.8" strokeOpacity="0.4" />
      <rect x="114" y="36" width="28" height="4" rx="2" fill={T.orange} fillOpacity="0.55" />
      <rect x="114" y="43" width="20" height="3" rx="1.5" fill={T.orange} fillOpacity="0.30" />
    </svg>
  )
}

function IllustrationGTM() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Area fill */}
      <path d="M 24 106 L 44 88 L 68 74 L 96 56 L 128 36 L 164 18 L 176 18 L 176 106 Z"
        fill={T.orange} fillOpacity="0.08" />

      {/* Grid lines */}
      {[106, 84, 62, 40].map((y, i) => (
        <line key={i} x1="24" y1={y} x2="180" y2={y}
          stroke={T.charcoal} strokeWidth="0.7" strokeOpacity="0.07" />
      ))}
      {[24, 60, 96, 132, 168].map((x, i) => (
        <line key={i} x1={x} y1="18" x2={x} y2="106"
          stroke={T.charcoal} strokeWidth="0.7" strokeOpacity="0.05" />
      ))}

      {/* Axes */}
      <line x1="24" y1="18" x2="24" y2="108" stroke={T.charcoal} strokeWidth="1.2" strokeOpacity="0.20" />
      <line x1="22" y1="107" x2="182" y2="107" stroke={T.charcoal} strokeWidth="1.2" strokeOpacity="0.20" />

      {/* Chart line — animated draw */}
      <motion.path
        d="M 24 106 L 44 88 L 68 74 L 96 56 L 128 36 L 164 18"
        stroke={T.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
      />

      {/* Data-point dots */}
      {[[24,106],[44,88],[68,74],[96,56],[128,36],[164,18]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r="4.5" fill={T.orange}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.14 }}
        />
      ))}

      {/* Arrow tip at top */}
      <path d="M 158 12 L 166 18 L 160 26"
        fill="none" stroke={T.orange} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Callout tooltips */}
      <rect x="112" y="20" width="52" height="22" rx="7" fill={T.bg} stroke={T.orange} strokeWidth="0.9" strokeOpacity="0.45"
        style={{ filter: 'drop-shadow(0 3px 6px rgba(26,26,26,0.09))' }} />
      <rect x="120" y="25" width="22" height="5" rx="2.5" fill={T.orange} fillOpacity="0.65" />
      <rect x="120" y="32" width="16" height="3.5" rx="1.75" fill={T.charcoal} fillOpacity="0.20" />
      {/* Callout tail */}
      <path d="M 128 42 L 132 50 L 136 42" fill={T.bg} stroke={T.orange} strokeWidth="0.9" strokeOpacity="0.45" />

      <rect x="34" y="62" width="48" height="20" rx="7" fill={T.bg} stroke={T.border} strokeWidth="0.9"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(26,26,26,0.06))' }} />
      <rect x="40" y="67" width="20" height="4" rx="2" fill={T.charcoal} fillOpacity="0.30" />
      <rect x="40" y="74" width="28" height="3.5" rx="1.75" fill={T.charcoal} fillOpacity="0.12" />

      {/* Milestone flags */}
      {[[96,56],[128,36]].map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y-2} x2={x} y2={y-14} stroke={T.charcoal} strokeWidth="0.8" strokeOpacity="0.30" />
          <rect x={x} y={y-22} width="16" height="8" rx="2" fill={i === 0 ? T.surfaceAlt : T.orange} fillOpacity="0.7" />
        </g>
      ))}

      {/* Bottom axis labels */}
      {['Q1','Q2','Q3','Q4'].map((q, i) => (
        <text key={q} x={44 + i * 36} y="118"
          textAnchor="middle" fontSize="7" fill={T.muted}
          fontFamily="Inter, sans-serif" letterSpacing="1" fontWeight="700"
        >{q}</text>
      ))}
    </svg>
  )
}

// Map service id → illustration component
const ILLUSTRATIONS: Record<string, React.ComponentType> = {
  'website-development': IllustrationWebsite,
  'ai-system-creation':  IllustrationAISystem,
  'ai-tool-creation':    IllustrationAITool,
  'workflow-automation': IllustrationAutomation,
  'ui-ux-design':        IllustrationDesign,
  'go-to-market':        IllustrationGTM,
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ── 3D Tilt Card ────────────────────────────────────────────────────────────

interface ServiceCardProps {
  title:       string
  description: string
  href:        string
  index:       number
  accent?:     boolean // dark-accent card variant
}

function ServiceCard({ title, description, href, index, accent }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const springCfg = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), springCfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]),  springCfg)
  const glowX   = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glowY   = useTransform(my, [-0.5, 0.5], ['0%', '100%'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  function handleLeave() {
    mx.set(0); my.set(0)
    setHovered(false)
  }

  const IllComp = ILLUSTRATIONS[slugify(title)] ?? IllustrationWebsite

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        background:  accent ? T.slate : T.bg,
        border:      `1px solid ${accent ? 'rgba(255,255,255,0.07)' : T.borderMed}`,
        boxShadow:   hovered
          ? `0 20px 48px rgba(26,26,26,0.12), 0 0 0 1px ${T.orange}33`
          : `0 4px 16px rgba(26,26,26,0.06)`,
        transition:  'box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Dynamic glare */}
      {hovered && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Illustration zone */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{
          height: '160px',
          background: accent
            ? 'linear-gradient(135deg, rgba(45,49,66,0.5), rgba(26,26,26,0.8))'
            : `linear-gradient(145deg, ${T.surface}, ${T.surfaceAlt})`,
          borderBottom: `1px solid ${accent ? 'rgba(255,255,255,0.05)' : T.border}`,
        }}
      >
        {/* Ambient dot pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
          <defs>
            <pattern id={`dots-${index}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill={accent ? '#fff' : T.charcoal} fillOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
        </svg>

        {/* Orange glow behind illustration */}
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: T.orangeGlow, filter: 'blur(20px)' }}
        />

        {/* Illustration — slight parallax lift on hover */}
        <motion.div
          className="relative z-10 w-full px-4"
          animate={hovered ? { y: -5, scale: 1.04 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '130px' }}
        >
          <IllComp />
        </motion.div>

        {/* Service number badge */}
        <span
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background: T.orange,
            color:       '#fff',
            fontFamily:  'Inter, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6 gap-2">
        <h3
          className="text-lg md:text-xl font-serif leading-tight"
          style={{ color: accent ? '#fff' : T.charcoal }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: accent ? 'rgba(255,255,255,0.55)' : T.muted }}
        >
          {description}
        </p>
        <Link
          href={href}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mt-1 w-fit"
          style={{ color: T.orange }}
        >
          Discover More
          <motion.span
            animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

interface ServiceDef {
  title:       string
  description: string
  href:        string
}

export function ServiceCards({ features }: { features: ServiceDef[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
      {features.map((feature, idx) => (
        <ServiceCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          href={feature.href}
          index={idx}
          accent={idx === 1 /* AI System Creation — dark accent */}
        />
      ))}
    </div>
  )
}
