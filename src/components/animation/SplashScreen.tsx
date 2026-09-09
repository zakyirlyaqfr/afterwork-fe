"use client";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/context/UIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";

const TOTAL_FRAMES = 30;
const DURATION_MS = 2800; // ~2.8s - 3s

export default function SplashScreen() {
  const { hasSeenSplash, completeSplash } = useUI();
  const prefersReduced = useReducedMotion();
  const [currentFrame, setCurrentFrame] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(!hasSeenSplash);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    if (prefersReduced) {
      completeSplash();
      setIsVisible(false);
      return;
    }

    // Preload images into memory for instant canvas swapping
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/sequence/intro/frame-${frameNum}.webp`;
      images.push(img);
    }
    framesRef.current = images;

    const startTime = performance.now();
    let animId: number;

    const render = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / DURATION_MS);
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(t * (TOTAL_FRAMES - 1)) + 1)
      );

      setCurrentFrame(frameIndex);
      setProgress(Math.round(t * 100));

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const currentImg = framesRef.current[frameIndex - 1];
        if (ctx && currentImg && currentImg.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
        }
      }

      if (t < 1) {
        animId = requestAnimationFrame(render);
      } else {
        // Animation finished -> animate curtain wipe
        dismissCurtain();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [hasSeenSplash, prefersReduced]);

  const dismissCurtain = () => {
    if (!containerRef.current) {
      completeSplash();
      setIsVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        completeSplash();
        setIsVisible(false);
      }
    });

    tl.to(containerRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.85,
      ease: "power4.inOut"
    });
  };

  const handleSkip = () => {
    dismissCurtain();
  };

  if (!isVisible || hasSeenSplash) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-[#F5F5F5] select-none cursor-pointer overflow-hidden p-6 md:p-12"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Top micro bar */}
      <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#F5F5F5]/60 tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <span>AFTERWORK CAFFEINE</span>
        </div>
        <div>
          <span>SURABAYA 09:00 → 02:00</span>
        </div>
      </div>

      {/* Center sequence canvas */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] relative flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Minimal subtitle */}
        <div className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-[#F5F5F5]/40 uppercase">
          DAMN GOOD BOTTLED DRINKS. ALL DAY ALL NIGHT.
        </div>
      </div>

      {/* Bottom numeric loader bar */}
      <div className="w-full flex items-end justify-between font-mono text-[12px] text-[#F5F5F5]/80">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#E05D29] tabular-nums">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="text-[10px] text-[#F5F5F5]/40 tracking-widest">%</span>
        </div>

        {/* Minimal progress line */}
        <div className="hidden sm:block flex-1 max-w-[200px] mx-8 h-[1px] bg-[#262626] relative overflow-hidden">
          <div
            className="h-full bg-[#E05D29] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="text-[11px] tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#E05D29] transition-colors py-1 px-3 border border-[#262626] hover:border-[#E05D29]"
        >
          SKIP [ESC] ↗
        </button>
      </div>
    </div>
  );
}
