"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const { isMenuOpen, isLocationModalOpen, isDetailModalOpen, hasSeenSplash } = useUI();
  const lenisRef = useRef<Lenis | null>(null);

  // Re-synchronize Lenis dimensions and ScrollTrigger after splash fully dissolves
  useEffect(() => {
    if (!hasSeenSplash) return;
    
    // Multi-staged refreshes ensuring mobile viewport height, dynamic address bar, and element offsets calibrate
    ScrollTrigger.refresh();
    const timer1 = setTimeout(() => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    }, 250);
    const timer2 = setTimeout(() => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [hasSeenSplash]);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -9 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Global listener for smooth scroll to top
    const handleScrollToTop = () => {
      lenis.scrollTo(0, { duration: 1.2 });
    };
    window.addEventListener("afterwork:scroll-to-top", handleScrollToTop);

    // Connect both Lenis scroll and native mobile touch window scroll to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      window.removeEventListener("afterwork:scroll-to-top", handleScrollToTop);
      window.removeEventListener("scroll", handleNativeScroll);
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
