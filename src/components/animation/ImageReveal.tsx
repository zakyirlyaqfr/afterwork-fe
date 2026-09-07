"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    gsap.fromTo(
      container,
      {
        clipPath: "inset(100% 0 0 0)",
      },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        delay,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      inner,
      {
        scale: 1.12,
      },
      {
        scale: 1,
        duration: 1.4,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, [delay, prefersReduced]);

  if (prefersReduced) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      style={{ clipPath: "inset(100% 0 0 0)" }}
    >
      <div ref={innerRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
