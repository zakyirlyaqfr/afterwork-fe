"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUI } from "@/context/UIContext";
import gsap from "gsap";

export default function PageLoader() {
  const pathname = usePathname();
  const { hasSeenSplash } = useUI();
  const [showLoader, setShowLoader] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const isFirstRender = useRef(true);
  const isRefreshLoad = useRef(false);

  // Check on mount if this is a page refresh where splash screen was already seen
  // Or trigger loader on subsequent route changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = pathname;

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const forceSplash =
          urlParams.get("splash") === "1" || urlParams.get("splash") === "true";
        const seen = sessionStorage.getItem("afterwork_splash_seen");
        if (seen && !forceSplash) {
          isRefreshLoad.current = true;
          setShowLoader(true);
        }
      } catch {
        // Ignore
      }
      return;
    }

    if (!hasSeenSplash) return;
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    isRefreshLoad.current = false;
    setShowLoader(true);
  }, [pathname, hasSeenSplash]);

  // Unified cinematic animation flow when loader appears
  useEffect(() => {
    if (!showLoader) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const aura = auraRef.current;
    if (!container || !logo) return;

    const isRefresh = isRefreshLoad.current;

    // Reset initial states cleanly
    if (isRefresh) {
      // On page refresh, container is already visible via CSS
      gsap.set(container, { opacity: 1 });
      gsap.set(logo, { opacity: 1, scale: 1 });
      if (aura) gsap.set(aura, { opacity: 0.25, scale: 1 });
    } else {
      // On route change transition, smoothly darken from 0 to 1
      gsap.set(container, { opacity: 0 });
      gsap.set(logo, { opacity: 0, scale: 0.94 });
      if (aura) gsap.set(aura, { opacity: 0.2, scale: 0.95 });
    }

    const tl = gsap.timeline();

    if (!isRefresh) {
      // 1. Velvet entrance: container smoothly darkens the screen
      tl.to(
        container,
        {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0
      );

      // 2. Logo gently emerges with subtle organic scale (no bouncy pop)
      tl.to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.05
      );
    }

    // Breathing pulse animation (matching splashscreen exactly)
    const breathingTween = gsap.to(logo, {
      scale: 1.045,
      duration: 1.25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    let auraTween: gsap.core.Tween | null = null;
    if (aura) {
      auraTween = gsap.to(aura, {
        scale: 1.12,
        opacity: 0.35,
        duration: 1.25,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // 3. Tranquil hold: allow the breathing logo to breathe peacefully without rushing
    const holdDuration = isRefresh ? 1400 : 1600;
    const exitTimer = setTimeout(() => {
      // Remove the static CSS class so GSAP controls opacity
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("showing-refresh-loader");
      }

      // Ensure container has inline opacity 1 before tweening to 0
      gsap.set(container, { opacity: 1 });

      // 4. Silky, gentle dissolution revealing the refreshed / new page underneath
      gsap.to(container, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          setShowLoader(false);
          breathingTween.kill();
          if (auraTween) auraTween.kill();
          gsap.killTweensOf([container, logo, aura].filter(Boolean));
        },
      });
    }, holdDuration);

    return () => {
      clearTimeout(exitTimer);
      tl.kill();
      breathingTween.kill();
      if (auraTween) auraTween.kill();
      gsap.killTweensOf([container, logo, aura].filter(Boolean));
    };
  }, [showLoader]);

  return (
    <div
      id="page-transition-loader"
      ref={containerRef}
      className={`fixed inset-0 z-[9990] flex items-center justify-center bg-black pointer-events-none select-none ${
        showLoader ? "flex" : "hidden"
      }`}
      style={{
        backgroundColor: "#000000",
      }}
    >
      {/* Enlarged Logo with calm breathing (identical to splashscreen loading) */}
      <div
        ref={logoRef}
        className="loader-logo-wrap relative flex items-center justify-center origin-center"
      >
        {/* Soft warm aura */}
        <div
          ref={auraRef}
          className="absolute -inset-8 rounded-full pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(224,93,41,0.35) 0%, transparent 70%)",
          }}
        />
        <Image
          src="/brand/logo-short-white.png"
          alt="Afterwork Caffeine"
          width={200}
          height={200}
          className="w-[120px] h-[120px] sm:w-[145px] sm:h-[145px] md:w-[160px] md:h-[160px] object-contain relative z-10 drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]"
          priority
        />
      </div>
    </div>
  );
}
