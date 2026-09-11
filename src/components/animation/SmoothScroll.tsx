"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const { isMenuOpen, isLocationModalOpen, isDetailModalOpen } = useUI();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -9 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Global listener for smooth scroll to top
    const handleScrollToTop = () => {
      lenis.scrollTo(0, { duration: 1.2 });
    };
    window.addEventListener("afterwork:scroll-to-top", handleScrollToTop);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      window.removeEventListener("afterwork:scroll-to-top", handleScrollToTop);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
    };
  }, [prefersReduced]);

  // Lock scroll completely via Lenis when menu or modal is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (isMenuOpen || isLocationModalOpen || isDetailModalOpen) {
      if (lenis) lenis.stop();
    } else {
      if (lenis) lenis.start();
    }
  }, [isMenuOpen, isLocationModalOpen, isDetailModalOpen]);

  return <>{children}</>;
}
