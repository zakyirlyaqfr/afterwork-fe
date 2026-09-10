"use client";

import React from "react";

interface CircularWatermarkProps {
  className?: string;
  size?: number;
  text?: string;
  spinSpeed?: number;
  opacity?: number;
  color?: string; // Faded orange brand color
}

export default function CircularWatermark({
  className = "",
  size = 320,
  text = "AFTERWORKCAFFEINE",
  spinSpeed = 45,
  opacity = 0.2,
  color = "#E05D29",
}: CircularWatermarkProps) {
  // Pure letters only — no dots, no symbols
  const chars = text.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const total = chars.length;
  const radius = 108;
  const center = 150;

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
        viewBox="0 0 300 300"
        className="w-full h-full will-change-transform"
        style={{
          animation: `spinWatermark ${spinSpeed}s linear infinite`,
          opacity,
        }}
      >
        <style>
          {`
            @keyframes spinWatermark {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
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
