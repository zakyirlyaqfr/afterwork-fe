"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReduced) return;

    // Check if device supports fine hover
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target or any ancestor has data-cursor attribute
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [prefersReduced]);

  if (isTouch || prefersReduced) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-transform duration-100 ease-out flex items-center justify-center ${
        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="px-3 py-1.5 bg-[#E05D29] text-black text-[10px] font-mono font-bold tracking-[0.2em] uppercase border border-black shadow-lg">
        {cursorText}
      </div>
    </div>
  );
}
