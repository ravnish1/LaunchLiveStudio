"use client";

import React, { useRef, useState, useEffect } from "react";
import { ScrambleText } from "./ScrambleText";

interface ScrambleHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  className?: string;
  staggerMs?: number;
  scrambleFrames?: number;
  frameDurationMs?: number;
  /** If true, triggers immediately (for hero). Default: triggers on viewport entry */
  immediate?: boolean;
  children?: React.ReactNode;
}

export const ScrambleHeading: React.FC<ScrambleHeadingProps> = ({
  text,
  as = "h2",
  className = "",
  staggerMs = 45,
  scrambleFrames = 6,
  frameDurationMs = 45,
  immediate = false,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div ref={ref}>
      <ScrambleText
        text={text}
        as={as}
        className={className}
        trigger={inView}
        staggerMs={staggerMs}
        scrambleFrames={scrambleFrames}
        frameDurationMs={frameDurationMs}
      />
      {children}
    </div>
  );
};
