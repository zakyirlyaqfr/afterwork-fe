"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUI } from "@/context/UIContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PageLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    hasSeenSplash,
    isPageTransitioning,
    targetPath,
    finishPageTransition,
    closeMenu,
  } = useUI();

  const [isRefreshLoaderActive, setIsRefreshLoaderActive] = useState(false);
  // Instantly true synchronously in the exact same render frame when navigateTo is called
  const showLoader = isPageTransitioning || isRefreshLoaderActive;

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const isFirstRender = useRef(true);
  const isRefreshLoad = useRef(false);

  // 1. Mount detection: check for page refresh loader
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
          setIsRefreshLoaderActive(true);
        }
      } catch {
        // Ignore
      }
      return;
    }

    if (!hasSeenSplash) return;
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    // Fallback if URL changed without navigateTo (e.g. popstate / browser back/forward)
    if (!isPageTransitioning) {
      isRefreshLoad.current = false;
      setIsRefreshLoaderActive(true);
    }
  }, [pathname, hasSeenSplash, isPageTransitioning]);

  // 3. Cinematic transition & breathing animation
  useEffect(() => {
    if (!showLoader) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const aura = auraRef.current;
    if (!container || !logo) return;

    const isRefresh = isRefreshLoad.current;
    const isProgrammatic = isPageTransitioning && Boolean(targetPath);

    // Immediately solid black with breathing logo - NO transparency, zero glimpse of previous page!
    gsap.set(container, { opacity: 1 });
    gsap.set(logo, { opacity: 1, scale: 1 });
    if (aura) gsap.set(aura, { opacity: 0.25, scale: 1 });

    // Breathing pulse animation
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

    // For programmatic navigation:
    // Screen is ALREADY 100% black from frame 0.
    // Close menu, reset scroll, and execute router.push in total darkness!
    let navTimer: NodeJS.Timeout | null = null;
    if (isProgrammatic && targetPath) {
      navTimer = setTimeout(() => {
        closeMenu();
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        router.push(targetPath);
      }, 50);
    }

    // Hold duration: breathing peacefully
    const holdDuration = isRefresh ? 1400 : 1250;
    const exitTimer = setTimeout(() => {
      // Remove the static CSS class so GSAP controls opacity
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("showing-refresh-loader");
      }

      gsap.set(container, { opacity: 1 });

      // Silky gentle dissolution revealing the new page
      gsap.to(container, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          setIsRefreshLoaderActive(false);
          breathingTween.kill();
          if (auraTween) auraTween.kill();
          gsap.killTweensOf([container, logo, aura].filter(Boolean));
          ScrollTrigger.refresh();
          finishPageTransition();
        },
      });
    }, holdDuration);

    return () => {
      if (navTimer) clearTimeout(navTimer);
      clearTimeout(exitTimer);
      breathingTween.kill();
      if (auraTween) auraTween.kill();
      gsap.killTweensOf([container, logo, aura].filter(Boolean));
    };
  }, [showLoader]);

  return (
    <div
      id="page-transition-loader"
      ref={containerRef}
      className={`fixed inset-0 z-[9990] flex items-center justify-center bg-black select-none ${
        showLoader ? "flex pointer-events-auto opacity-100" : "hidden pointer-events-none opacity-0"
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
