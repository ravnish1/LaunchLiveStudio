"use client";

import React, { useRef } from "react";
import { useScrambleText } from "@/hooks/use-scramble-text";

interface ScrambleTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  staggerMs?: number;
  scrambleFrames?: number;
  frameDurationMs?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as: Tag = "span",
  className = "",
  trigger = true,
  staggerMs = 40,
  scrambleFrames = 6,
  frameDurationMs = 40,
}) => {
  const { displayChars, resolved, done } = useScrambleText({
    text,
    trigger,
    staggerMs,
    scrambleFrames,
    frameDurationMs,
  });

  return (
    // @ts-ignore — dynamic tag
    <Tag className={className}>
      {displayChars.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: resolved[i] ? 1 : 0.7,
            transform: resolved[i] ? "translateY(0px)" : "translateY(8px)",
            transition: "opacity 100ms ease, transform 200ms ease",
            minWidth: char === " " ? "0.25em" : undefined,
            whiteSpace: "pre",
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
};
