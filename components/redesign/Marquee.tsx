"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Zap, Box, Palette, Target, Cpu, Code2 } from "lucide-react";

// Enhanced services meta-data (visually streamlined)
const services = [
  { name: "Website Development", isBrand: false, icon: Code2 },
  { name: "AI System Creation", isBrand: false, icon: Zap },
  { name: "Branding & Identity", isBrand: false, icon: Palette },
  { name: "Launch Live Studio", isBrand: true, icon: null },
  { name: "SEO Optimization", isBrand: false, icon: Target },
  { name: "Marketing Automation", isBrand: false, icon: Target },
  { name: "AI Tool Creation", isBrand: false, icon: Cpu },
  { name: "UI/UX Design", isBrand: false, icon: Palette },
  { name: "Growth Consulting", isBrand: false, icon: Box },
];

interface MarqueeRowProps {
  items: typeof services;
  direction: "left" | "right";
  speed?: number;
}

const MarqueeRow = ({ items, direction, speed = 20 }: MarqueeRowProps) => {
  // Quadruple items to prevent gaps on very wide displays (e.g. 4K monitors)
  const duplicatedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items],
  );
  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="flex overflow-hidden select-none py-4 relative w-full group">
      <div
        className={`flex whitespace-nowrap items-center flex-nowrap gap-8 md:gap-12 group-hover:[animation-play-state:paused] ${animationClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 md:gap-12 flex-shrink-0"
          >
            <div className="flex items-center gap-3 flex-shrink-0">
              {item.isBrand ? (
                <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-accent/80 border border-accent/20">
                  <Image
                    src="/logo.png"
                    alt="Launch Live Studio"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                  <span className="text-xs md:text-sm font-sans font-black tracking-tight text-white uppercase italic">
                    {item.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 text-foreground/80 hover:text-foreground transition-colors duration-200">
                  {item.icon && (
                    <item.icon
                      size={18}
                      className="text-accent/70"
                      strokeWidth={1.5}
                    />
                  )}
                  <span className="text-xs md:text-lg font-sans font-bold tracking-tight">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
            {/* Elegant visual divider (custom decorative star symbol) */}
            <span className="text-accent/80 font-sans text-xs md:text-2xl select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export const Marquee = () => {
  return (
    <section className="py-16 md:py-20 overflow-hidden bg-background relative">
      {/* Side gradient mask fades for visually elegant edges */}
      <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 mb-10 flex flex-col items-center md:items-start gap-3">
        <div className="px-3 py-1 bg-accent/5 rounded-full border border-accent/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase">
            Global Delivery Pipeline
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-center md:text-left">
          Scaling your <span className="italic text-text-muted">vision.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4 relative py-2">
        <MarqueeRow items={services} direction="left" speed={35} />
      </div>

      {/* Subtle, ambient background pulse */}
      <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
