"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        y: "115%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.95,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          once: true,
        },
      }
    );
  }, [delay, prefersReduced]);

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <div ref={containerRef} className="overflow-hidden inline-block align-bottom">
      <Component ref={textRef} className={className} style={{ transform: "translateY(115%)" }}>
        {children}
      </Component>
    </div>
  );
}
