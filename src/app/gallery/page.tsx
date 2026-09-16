"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bentoGalleryItems } from "@/data/gallery";
import { getAssetPath } from "@/utils/asset";
import { useUI } from "@/context/UIContext";

export default function GalleryPage() {
  const { hasSeenSplash, isPageTransitioning } = useUI();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Coordinated Entrance Animation: Plays every time user enters /gallery
  useEffect(() => {
    if (prefersReduced) return;

    const items = gridRef.current?.querySelectorAll(".bento-item");

    if (!hasSeenSplash || isPageTransitioning) {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40, filter: "blur(8px)" });
      }
      if (watermarkRef.current) {
        gsap.set(watermarkRef.current, { opacity: 0, scale: 0.95 });
      }
      if (items && items.length > 0) {
        gsap.set(items, { opacity: 0, y: 40 });
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.killTweensOf([titleRef.current, watermarkRef.current].filter(Boolean));

    // 1. Page Title Entrance
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }

    // 2. Watermark Entrance
    if (watermarkRef.current) {
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    }

    // 3. Top initial Bento Items entrance
    if (items && items.length > 0) {
      // On landscape (>= 768px), Rows 1 & 2 comprise the top 4 cards (bg-01 to bg-04).
      // On mobile (< 768px), the top 2 cards are above the fold.
      const isLandscape = typeof window !== "undefined" && window.innerWidth >= 768;
      const initialCount = isLandscape ? 4 : 2;
      const initialCards = Array.from(items).slice(0, initialCount);

      gsap.fromTo(
        initialCards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.22,
          clearProps: "y,opacity",
        }
      );
    }
  }, [prefersReduced, hasSeenSplash, isPageTransitioning]);

  // Parallax watermark scroll
  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    }
  }, [prefersReduced]);

  // Scroll entrance animation: remaining boxes reveal smoothly 1-by-1 as user scrolls
  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".bento-item");
      if (!items || items.length === 0) return;

      // Only apply scroll batch to items below the fold (index >= initialCount)
      const isLandscape = typeof window !== "undefined" && window.innerWidth >= 768;
      const initialCount = isLandscape ? 4 : 2;
      const remainingItems = Array.from(items).slice(initialCount);
      if (remainingItems.length === 0) return;

      gsap.set(remainingItems, { opacity: 0, y: 35 });

      ScrollTrigger.batch(remainingItems, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: "auto",
            clearProps: "y,opacity",
          });
        },
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-32 md:pt-32 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative"
      style={{ paddingBottom: "clamp(6rem, 12vw, 12rem)" }}
    >
      {/* Main Content Container */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 pb-[20vh]">

        {/* GALLERY watermark — absolute in main container, z-[1] so grid sits on top.
            top is calibrated to land just below the "A" in ARCHIVE. */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          className="absolute select-none pointer-events-none z-[1]"
          style={{
            top: "clamp(88px, 13vw, 138px)",
            left: 0,
            fontSize: "clamp(3.5rem, 11vw, 13rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.13)",
          }}
        >
          GALLERY
        </div>

        {/* 1. Header Container for Title */}
        <div className="menu-sticky-header mb-2 sm:mb-3">
          <div
            ref={titleRef}
            style={{ opacity: 0 }}
            className="relative pointer-events-none"
          >
            <h1 className="relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              ARCHIVE<span className="text-[#E05D29]">.</span>
            </h1>
          </div>
        </div>

        {/* 2. Bento Gallery Grid — no click interaction */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 relative z-10 items-stretch -ml-4 sm:-ml-8 md:-ml-12"
          style={{ marginTop: "24px", paddingTop: "12px" }}
        >
          {bentoGalleryItems.map((item) => {
            // Authentic punk tilt: preserved on inner container so GSAP transitions on .bento-item never strip it
            const activeTilt = item.tilt;

            return (
              <div
                key={item.id}
                className={`bento-item ${item.gridSpan} ${item.heightClass} relative select-none rounded-none`}
              >
                <div
                  className="w-full h-full relative overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-none"
                  style={{ transform: `rotate(${activeTilt}deg)` }}
                >
                  <Image
                    src={getAssetPath(item.src)}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center contrast-105"
                    priority={item.id === "bg-01" || item.id === "bg-02"}
                  />
                  {/* Dark subtle border vignette for photo depth */}
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
