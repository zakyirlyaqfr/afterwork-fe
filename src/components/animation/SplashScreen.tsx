"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useUI } from "@/context/UIContext";
import Image from "next/image";
import gsap from "gsap";

export default function SplashScreen() {
  const { completeSplash } = useUI();
  // Default to visible so initial SSR and early client render are solid pitch black
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const phaseRef = useRef<"video" | "loading" | "done">("video");

  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loaderWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const transitionStartedRef = useRef(false);

  // Check sessionStorage on client and initialize GSAP opacity
  useEffect(() => {
    setIsMounted(true);
    if (videoWrapperRef.current) gsap.set(videoWrapperRef.current, { opacity: 0 });
    if (loaderWrapperRef.current) gsap.set(loaderWrapperRef.current, { opacity: 0 });
    if (logoRef.current) gsap.set(logoRef.current, { opacity: 0 });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceSplash = urlParams.get("splash") === "1" || urlParams.get("splash") === "true";
      const seen = sessionStorage.getItem("afterwork_splash_seen");

      if (seen && !forceSplash) {
        setIsVisible(false);
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("showing-splash");
        }
      } else {
        setIsVisible(true);
        if (typeof document !== "undefined") {
          document.documentElement.classList.add("showing-splash");
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Smooth, silky final dissolve directly into the homepage opening animation
  const finishAll = useCallback(() => {
    if (phaseRef.current === "done") return;
    phaseRef.current = "done";

    // 1. Immediately remove showing-splash class so homepage DOM is active underneath
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("showing-splash");
    }

    // 2. Immediately trigger completeSplash() so Hero.tsx entrance animation starts RIGHT NOW
    completeSplash();

    // 3. Simultaneously dissolve the splash overlay over 0.95s so the hero reveals smoothly underneath
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = "none";
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.95,
        ease: "power2.inOut",
        onComplete: () => {
          setIsVisible(false);
        },
      });
    } else {
      setIsVisible(false);
    }
  }, [completeSplash]);

  // Clean, luxurious sequential transition:
  // Part 3 (serving daily) -> Smooth continuous fade-out without freezing -> 0.2s black cushion -> Smooth fade-in of breathing loading logo
  const transitionToLoading = useCallback(() => {
    if (transitionStartedRef.current) return;
    transitionStartedRef.current = true;
    phaseRef.current = "loading";

    const tl = gsap.timeline();

    // 1. After Part 3 (Westhood), smoothly fade out video into pure black while it's STILL in motion
    if (videoWrapperRef.current) {
      tl.to(
        videoWrapperRef.current,
        {
          opacity: 0,
          duration: 0.65,
          ease: "power2.inOut",
          onComplete: () => {
            if (videoRef.current) {
              try {
                videoRef.current.pause();
              } catch {}
            }
          },
        },
        0
      );
    }

    // 2. Elegant black cushion (0.2s)
    const loadingStartTime = 0.85; // 0.65s fade-out + 0.2s cushion

    // 3. Loading layer gently fades in from the pure black background
    if (loaderWrapperRef.current) {
      tl.to(
        loaderWrapperRef.current,
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        loadingStartTime
      );
    }

    // 4. Logo softly emerges with gentle scale
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        {
          scale: 0.95,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => {
            // Calm, gentle breathing pulse
            gsap.to(logoRef.current, {
              scale: 1.04,
              duration: 1.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        },
        loadingStartTime
      );
    }

    // 5. Hold the tranquil, clean loading state for 2.0s after it becomes fully visible
    // Total wait: 0.85s (fade-out + cushion) + 0.7s (fade-in) + 2.0s (hold) = ~3.55s
    setTimeout(() => {
      finishAll();
    }, 3550);
  }, [finishAll]);

  // Soft fade in of the video as it starts playing from the initial pure black screen
  const handleVideoPlaying = useCallback(() => {
    if (videoWrapperRef.current) {
      gsap.to(videoWrapperRef.current, {
        opacity: 1,
        duration: 0.65,
        ease: "power2.out",
      });
    }
  }, []);

  // Frame-accurate detection: Part 3 (SERVING DAILY AT Westhood) appears at 4.4s.
  // We let it display clearly until 5.6s (~1.2s on screen), then start the 0.65s smooth fade-out
  // while the video is STILL actively playing (finishing at ~6.25s before 6.35s EOF).
  // Zero freeze, and Part 3 is fully visible!
  const checkTimeAndTransition = useCallback(() => {
    if (!videoRef.current || transitionStartedRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0 && (currentTime >= 5.6 || currentTime >= duration - 0.75)) {
      transitionToLoading();
    }
  }, [transitionToLoading]);

  // Use requestAnimationFrame for 60fps frame-accurate detection without 250ms timeupdate delay
  useEffect(() => {
    if (!isVisible) return;

    let animId: number;
    const loop = () => {
      if (!transitionStartedRef.current) {
        checkTimeAndTransition();
        animId = requestAnimationFrame(loop);
      }
    };

    animId = requestAnimationFrame(loop);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, checkTimeAndTransition]);

  // Video autoplay and listeners
  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Play video
    const playTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            handleVideoPlaying();
          })
          .catch(() => {
            // If autoplay policy requires user interaction, still reveal video
            handleVideoPlaying();
          });
      }
    }, 50);

    // Safety timeout fallback
    const safetyTimer = setTimeout(() => {
      if (!transitionStartedRef.current) {
        transitionToLoading();
      }
    }, 6500);

    // Silent ESC key to skip directly if needed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finishAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible, handleVideoPlaying, transitionToLoading, finishAll]);

  // Only unmount when client has confirmed it is mounted AND should not be visible
  if (isMounted && !isVisible) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Afterwork Caffeine Splash Screen"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#F5F5F5] select-none overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* 1. Animation Video Layer */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 origin-center"
        style={{ backgroundColor: "#000000" }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          onPlaying={handleVideoPlaying}
          onTimeUpdate={checkTimeAndTransition}
          onEnded={transitionToLoading}
          className="w-full h-full object-contain pointer-events-none"
          style={{
            maxHeight: "92vh",
            maxWidth: "92vw",
            aspectRatio: "464 / 720",
            mixBlendMode: "screen",
            filter: "contrast(1.2) brightness(1.0) grayscale(1)",
          }}
        >
          <source src="/brand/afterwork-splash-final.webm" type="video/webm" />
          <source src="/brand/afterwork-splash-final.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Loading State Layer (100% solid opaque black background, NO lines, NO text, enlarged breathing logo) */}
      <div
        ref={loaderWrapperRef}
        className="absolute inset-0 z-20 flex items-center justify-center bg-black pointer-events-none opacity-0"
        style={{ backgroundColor: "#000000", opacity: 0 }}
      >
        {/* Enlarged Logo with calm breathing */}
        <div
          ref={logoRef}
          className="relative flex items-center justify-center origin-center opacity-0"
          style={{ opacity: 0 }}
        >
          {/* Soft warm aura */}
          <div
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
    </div>
  );
}
