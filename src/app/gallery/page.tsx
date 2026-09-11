"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { bentoGalleryItems } from "@/data/gallery";

export default function GalleryPage() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // Title entrance animation matching menus logic
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
    }

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

  // Scroll entrance animation: boxes reveal smoothly 1-by-1 as user scrolls
  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".bento-item");
      if (!items || items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 40 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        end: "bottom 12%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 40,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.08,
            overwrite: "auto",
          });
        },
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimeout);
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
            className="relative pointer-events-none"
          >
            <h1 className="relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              <span className="text-[#E05D29]">ARCHIVE.</span>
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
            const activeTilt = isMobile ? item.tilt * 0.35 : item.tilt;

            return (
              <div
                key={item.id}
                className={`bento-item ${item.gridSpan} ${item.heightClass} relative select-none rounded-none`}
                style={{ transform: `rotate(${activeTilt}deg)` }}
              >
                <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-none">
                  <Image
                    src={item.src}
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
