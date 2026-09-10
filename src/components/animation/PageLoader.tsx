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

  // Trigger loader on route change (skip initial page load and when splash screen is active)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = pathname;
      return;
    }

    if (!hasSeenSplash) return;
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    setShowLoader(true);
  }, [pathname, hasSeenSplash]);

  // Unified cinematic animation flow when loader appears
  useEffect(() => {
    if (!showLoader) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const aura = auraRef.current;
    if (!container || !logo) return;

    // Reset initial states cleanly
    gsap.set(container, { opacity: 0 });
    gsap.set(logo, { opacity: 0, scale: 0.94 });
    if (aura) gsap.set(aura, { opacity: 0.2, scale: 0.95 });

    const tl = gsap.timeline();

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
        onComplete: () => {
          // Calm, deep breathing pulse (matching splashscreen exactly)
          gsap.to(logo, {
            scale: 1.045,
            duration: 1.25,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Soft warm aura glows in harmony with breathing
          if (aura) {
            gsap.to(aura, {
              scale: 1.12,
              opacity: 0.35,
              duration: 1.25,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        },
      },
      0.05
    );

    // 3. Tranquil hold: allow the breathing logo to breathe peacefully without rushing
    const exitTimer = setTimeout(() => {
      // 4. Silky, gentle dissolution revealing the new page underneath
      gsap.to(container, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          setShowLoader(false);
          gsap.killTweensOf([container, logo, aura].filter(Boolean));
        },
      });
    }, 1600);

    return () => {
      clearTimeout(exitTimer);
      tl.kill();
      gsap.killTweensOf([container, logo, aura].filter(Boolean));
    };
  }, [showLoader]);

  if (!showLoader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-black pointer-events-none select-none"
      style={{ opacity: 0, backgroundColor: "#000000" }}
    >
      {/* Enlarged Logo with calm breathing (identical to splashscreen loading) */}
      <div ref={logoRef} className="relative flex items-center justify-center origin-center" style={{ opacity: 0 }}>
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
