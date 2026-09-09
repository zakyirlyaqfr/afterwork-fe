"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryItems, galleryCategories, GalleryImage } from "@/data/gallery";

const tiltAngles = [-1.5, 1.2, -0.8, 2, -1.8, 0.5, -2.2, 1, -0.5, 1.5, -1, 2.2];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const lightboxContentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  }, [selectedImage, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  }, [selectedImage, filteredItems]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 300);
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 55, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }

    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -80, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    }
  }, [prefersReduced]);

  // Animate grid on category change
  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 45, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.05 }
    );
  }, [activeCategory, prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 md:pl-10 md:pr-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18 selection:bg-[#E05D29] selection:text-black overflow-visible relative"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[25%] -right-16 text-[clamp(6rem,18vw,20rem)] z-0"
      >
        GALLERY
      </div>

      <div className="w-full max-w-[1720px] relative z-10">

        {/* Title — overlaps sidebar */}
        <div ref={titleRef} className="mb-14 sm:mb-18 md:-ml-12 lg:-ml-20 xl:-ml-28 relative z-40">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88]">
            THE
            <br />
            <span className="text-[#E05D29]">GALLERY.</span>
          </h1>
        </div>

        {/* Category Filters — punk scattered */}
        <div ref={filterRef} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-16 sm:mb-20 select-none">
          {galleryCategories.map((cat, idx) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{ transform: `rotate(${idx % 2 === 0 ? '0.8' : '-0.8'}deg)` }}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] border-2 transition-all duration-300 hover:rotate-0 hover:scale-105 ${
                activeCategory === cat
                  ? "bg-[#E05D29] text-black border-[#E05D29] punk-glow !rotate-0"
                  : "border-[#333] text-[#F5F5F5]/55 hover:border-[#E05D29] hover:text-[#E05D29]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid — punk asymmetric */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
        >
          {filteredItems.map((item, idx) => {
            const tilt = tiltAngles[idx % tiltAngles.length];
            const shouldOverlap = idx === 0 || idx === 4;

            return (
              <div
                key={item.id}
                className={`gallery-item ${item.gridSpan} group cursor-pointer relative ${
                  shouldOverlap ? "md:-ml-6 lg:-ml-14 z-40" : ""
                }`}
                style={{ transform: `rotate(${tilt}deg)` }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative w-full overflow-hidden bg-neutral-950 border border-[#262626] transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:border-[#E05D29]/50 group-hover:shadow-[0_0_35px_rgba(224,93,41,0.15)]">
                  {/* Corner Brackets on hover */}
                  <div className="absolute -inset-2.5 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80" />
                  </div>

                  <div className="relative w-full" style={{ aspectRatio: item.aspectRatio }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Caption — clean, no '//' */}
                <div className="flex items-center justify-between text-[10px] tracking-[0.15em] text-[#F5F5F5]/50 mt-2.5 font-bold uppercase">
                  <span className="text-[#F5F5F5]/70">{item.title}</span>
                  <span className="text-[#E05D29]/60">{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Punk Lightbox ===== */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 cursor-default ${
            isClosing ? "" : "lightbox-backdrop-enter"
          }`}
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={handleClose}
        >
          {/* Lightbox Content */}
          <div
            ref={lightboxContentRef}
            className={`relative max-w-5xl w-full flex flex-col items-center ${
              isClosing ? "lightbox-exit" : "lightbox-enter"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute -top-12 sm:-top-14 right-0 w-10 h-10 flex items-center justify-center border-2 border-[#333] text-[#F5F5F5]/70 hover:border-[#E05D29] hover:text-[#E05D29] transition-all duration-300 z-50 bg-black/50"
              aria-label="Close lightbox"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image Container with corner brackets */}
            <div className="relative w-full punk-glow">
              {/* Corner Brackets */}
              <div className="absolute -inset-3 sm:-inset-4 pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-l-2 border-white/80" />
                <div className="absolute top-0 right-0 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-r-2 border-[#E05D29]" />
                <div className="absolute bottom-0 left-0 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-l-2 border-[#E05D29]" />
                <div className="absolute bottom-0 right-0 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-r-2 border-white/80" />
              </div>

              <div
                className="relative w-full max-h-[75vh] overflow-hidden bg-neutral-950 border border-[#333]"
                style={{ aspectRatio: selectedImage.aspectRatio }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="w-full flex items-center justify-between mt-5 sm:mt-6 select-none">
              <div>
                <span className="text-sm sm:text-base font-black text-[#F5F5F5] uppercase tracking-tight">
                  {selectedImage.title}
                </span>
                <span className="block text-[10px] tracking-[0.15em] text-[#F5F5F5]/40 mt-1 uppercase">
                  {selectedImage.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 border-2 border-[#333] text-[#F5F5F5]/60 hover:border-[#E05D29] hover:text-[#E05D29] transition-all duration-300 text-xs font-bold tracking-widest uppercase"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 border-2 border-[#333] text-[#F5F5F5]/60 hover:border-[#E05D29] hover:text-[#E05D29] transition-all duration-300 text-xs font-bold tracking-widest uppercase"
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
