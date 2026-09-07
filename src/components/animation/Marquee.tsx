"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  text?: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  text = "AFTERWORK CAFFEINE — DAMN GOOD BOTTLED DRINKS — MORNING TO MIDNIGHT — 09:00 → 02:00 EVERYDAY — SURABAYA —",
  speed = 35,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const track = trackRef.current;
    if (!track) return;

    const direction = reverse ? 1 : -1;
    const tween = gsap.to(track, {
      xPercent: direction * 50,
      repeat: -1,
      duration: speed,
      ease: "none",
    });

    return () => {
      tween.kill();
    };
  }, [speed, reverse, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden whitespace-nowrap select-none py-3 border-y border-hairline ${className}`}
    >
      <div ref={trackRef} className="inline-flex will-change-transform">
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#F5F5F5]/70 uppercase px-4">
          {text}
        </span>
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#E05D29] uppercase px-4">
          {text}
        </span>
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#F5F5F5]/70 uppercase px-4">
          {text}
        </span>
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#E05D29] uppercase px-4">
          {text}
        </span>
      </div>
    </div>
  );
}
