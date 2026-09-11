"use client";

import React, { useEffect, useRef } from "react";

interface CircularWatermarkProps {
  className?: string;
  size?: number;
  text?: string;
  opacity?: number;
  color?: string; // Gray brand palette
  scrollDriven?: boolean;
  speedFactor?: number;
  direction?: "clockwise" | "counterclockwise";
}

export default function CircularWatermark({
  className = "",
  size = 320,
  text = "AFTERWORKCAFFEINE",
  opacity = 0.35,
  color = "#404040",
  scrollDriven = true,
  speedFactor = 0.2,
  direction = "clockwise",
}: CircularWatermarkProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Pure letters only — no dots, no symbols
  const chars = text.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const total = chars.length;
  const radius = 108;
  const center = 150;

  useEffect(() => {
    if (!scrollDriven) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (svgRef.current) {
            const dirMultiplier = direction === "counterclockwise" ? -1 : 1;
            const rot = (window.scrollY * speedFactor * dirMultiplier) % 360;
            svgRef.current.style.transform = `rotate(${rot}deg)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDriven, speedFactor, direction]);

  return (
    <div
      aria-hidden="true"
      className={`relative select-none pointer-events-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        className="w-full h-full will-change-transform"
        style={{
          opacity,
          transformOrigin: "center center",
          transition: "transform 0.08s linear",
        }}
      >
        {chars.map((char, index) => {
          const angle = (index * 360) / total;
          const rad = (angle * Math.PI) / 180;
          const x = center + radius * Math.sin(rad);
          const y = center - radius * Math.cos(rad);

          return (
            <text
              key={`${char}-${index}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${angle}, ${x}, ${y})`}
              style={{
                fill: color,
                fontFamily: "var(--font-alte), 'Alte Haas Grotesk', -apple-system, sans-serif",
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "0.18em",
              }}
            >
              {char}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

