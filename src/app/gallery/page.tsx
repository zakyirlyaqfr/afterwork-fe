"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { bentoGalleryItems, BentoGalleryItem } from "@/data/gallery";
import CircularWatermark from "@/components/menus/CircularWatermark";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<BentoGalleryItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const lightboxContentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = bentoGalleryItems.findIndex((i) => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % bentoGalleryItems.length;
    setSelectedImage(bentoGalleryItems[nextIndex]);
  }, [selectedImage]);

  const handlePrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = bentoGalleryItems.findIndex((i) => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + bentoGalleryItems.length) % bentoGalleryItems.length;
    setSelectedImage(bentoGalleryItems[prevIndex]);
  }, [selectedImage]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 280);
  }, []);

  // ESC key handler for lightbox
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleClose, handleNext, handlePrev]);

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
        once: true,
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
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[28%] -right-16 text-[clamp(6rem,18vw,20rem)] z-0 select-none pointer-events-none"
      >
        GALLERY
      </div>

      {/* 
        Stationary Fixed Palette Gray Watermarks:
        - Positioned fixed in viewport, stays during scroll
        - Multiple watermarks: Bottom-left and Top-right circular watermarks
        - Color: Palette gray (#404040 / #383838)
      */}
      {/* 1. Fixed Bottom-Left Rotating Watermark */}
      <div
        aria-hidden="true"
        className="fixed bottom-6 left-[-50px] md:left-[-80px] pointer-events-none z-10 select-none"
      >
        <CircularWatermark
          size={370}
          color="#404040"
          opacity={0.35}
          scrollDriven
          speedFactor={0.25}
          direction="clockwise"
        />
      </div>

      {/* 2. Fixed Top-Right Counter-Rotating Watermark */}
      <div
        aria-hidden="true"
        className="fixed top-28 right-[-50px] md:right-[-80px] pointer-events-none z-10 select-none hidden sm:block"
      >
        <CircularWatermark
          size={330}
          color="#383838"
          opacity={0.28}
          scrollDriven
          speedFactor={0.22}
          direction="counterclockwise"
        />
      </div>

      {/* Main Content Container — with pb-[30vh] so sticky header stays pinned all the way past the bottom cards */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 pb-[20vh]">

        {/* 1. Header Container for Title
            - Menggunakan logic yang sama dengan fitur Menus:
            - Sticky dan transparan: tetap di posisi saat di-scroll (.menu-sticky-header)
            - Pinned di z-[78] sehingga tidak menghilang saat di-scroll atau membuka modal */}
        <div className="menu-sticky-header mb-8 sm:mb-12">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.8rem, 1.4vw, 1.3rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              THE<br />
              <span className="text-[#E05D29]">GALLERY.</span>
            </h1>
          </div>
        </div>

        {/* 2. Bento Gallery Grid
            - Tema: Bento gallery banyak foto (16 gambar asli tanpa teks poster)
            - Abstrak & asimetris dengan sudut miring berbeda pada tiap box
            - Ujung lancip / jangan tumpul (rounded-none)
            - Tanpa teks sama sekali (murni fotografi autentik)
            - Tanpa animasi saat cursor mengenai box image (tidak ada zoom/scale/rotate saat hover)
            - Jarak box rapat & teratur (gap-3 sm:gap-4 md:gap-5)
            - Tidak tumpang tindih
            - Di tengah & tidak menempel ke pinggir layar */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 relative z-10 items-stretch subpage-content-spacing"
        >
          {bentoGalleryItems.map((item) => {
            // Subtle tilt on mobile to prevent clipping, distinct punk tilt on desktop
            const activeTilt = isMobile ? item.tilt * 0.35 : item.tilt;

            return (
              <div
                key={item.id}
                className={`bento-item ${item.gridSpan} ${item.heightClass} relative select-none rounded-none`}
                style={{ transform: `rotate(${activeTilt}deg)` }}
              >
                {/* 
                  Sharp Bento Box:
                  - rounded-none (ujung tidak tumpul)
                  - Tanpa animasi saat hover cursor (no scale/zoom)
                  - Border tajam dan clean
                  - Clickable untuk membuka full-view lightbox
                */}
                <div
                  className="w-full h-full relative overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-none cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={item.alt}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedImage(item);
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center contrast-105"
                    priority={item.id === "bg-01" || item.id === "bg-02"}
                  />

                  {/* Dark subtle border vignette for photo depth, static without hover change */}
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ===== Fullscreen Lightbox Modal ===== */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8 cursor-default ${
            isClosing ? "opacity-0 transition-opacity duration-200" : "lightbox-backdrop-enter"
          }`}
          style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}
          onClick={handleClose}
        >
          <div
            ref={lightboxContentRef}
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute -top-12 sm:-top-14 right-0 w-10 h-10 flex items-center justify-center border border-white/20 text-[#F5F5F5] hover:border-[#E05D29] hover:text-[#E05D29] transition-colors z-50 bg-black/70 rounded-none cursor-pointer"
              aria-label="Tutup foto"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image Box */}
            <div className="relative w-full max-h-[80vh] overflow-hidden bg-neutral-950 border border-white/15 rounded-none shadow-2xl">
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="92vw"
                  priority
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="w-full flex items-center justify-between mt-4 select-none">
              <span className="text-[11px] font-mono tracking-widest text-[#F5F5F5]/40 uppercase">
                AFTERWORK ARCHIVE
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 border border-white/20 text-[#F5F5F5]/70 hover:border-[#E05D29] hover:text-[#E05D29] transition-colors text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 border border-white/20 text-[#F5F5F5]/70 hover:border-[#E05D29] hover:text-[#E05D29] transition-colors text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
