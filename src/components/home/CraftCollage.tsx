"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUI } from "@/context/UIContext";

const galleryItems = [
  {
    id: "01",
    src: "/images/afterwork-seating.jpg",
    alt: "Afterwork Caffeine Exterior Portal & Graffiti",
  },
  {
    id: "02",
    src: "/images/afterwork-glutton-1.jpg",
    alt: "Afterwork Custom Wood Board Craft Serving",
  },
  {
    id: "03",
    src: "/images/afterwork-cafe-hall.jpg",
    alt: "Afterwork High-Ceiling Cafe Hall & Bar",
  },
  {
    id: "04",
    src: "/images/afterwork-gofood.jpg",
    alt: "Afterwork Signature Bottled Formulas Series",
  },
  {
    id: "05",
    src: "/images/afterwork-glutton-menu.jpg",
    alt: "Afterwork Authentic Acrylic Graffiti Menu",
  },
];

export default function CraftCollage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const collageClusterRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { hasSeenSplash } = useUI();

  const total = galleryItems.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pointer drag / swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDragXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    currentDragXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const diff = currentDragXRef.current - startXRef.current;
    if (diff < -40) {
      handleNext();
    } else if (diff > 40) {
      handlePrev();
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (prefersReduced) return;

    if (!hasSeenSplash) {
      // Pre-set elements to hidden starting state so they do not flash when splash dissolves
      if (watermarkRef.current) {
        gsap.set(watermarkRef.current, { opacity: 0, y: 40 });
      }
      if (carouselTrackRef.current) {
        gsap.set(carouselTrackRef.current, { opacity: 0, y: 45, filter: "blur(4px)" });
      }
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 0, y: 18 });
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Watermark reveals visibly as section arrives, spanning across sidebar
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Delicate parallax float on scroll
        gsap.to(watermarkRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }

      // 2. Carousel Track Cards emerge gracefully with buttery motion
      if (carouselTrackRef.current) {
        gsap.fromTo(
          carouselTrackRef.current,
          { opacity: 0, y: 45, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselTrackRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. EXPLORE button emerges smoothly following the cards
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Continuous bi-directional vertical floating scroll scrub (buttery smooth sync for cards and button)
      if (collageClusterRef.current) {
        gsap.to(collageClusterRef.current, {
          y: 32,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.0,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, hasSeenSplash]);

  return (
    <section
      ref={sectionRef}
      id="section-craft"
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 overflow-visible select-none z-30"
    >
      {/* Ghosted Giant Background Industrial Watermark - Spans over sidebar row like Section 2 */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 -left-20 sm:-left-32 md:-left-48 lg:-left-64 pointer-events-none select-none text-[clamp(7rem,21vw,24rem)] font-black uppercase text-white/[0.07] tracking-tighter leading-none whitespace-nowrap z-0 will-change-transform"
      >
        AFTERWORK
      </div>

      <div
        ref={collageClusterRef}
        className="relative z-10 w-full max-w-[1700px] mx-auto flex flex-col items-center translate-x-0 md:-translate-x-8 lg:-translate-x-16"
      >
        {/* Viewport-Scale Abstract 3-Image Carousel Stage: exactly sized to center card aspect ratio */}
        <div
          ref={carouselTrackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-[74vw] sm:w-[50vw] md:w-[38vw] lg:w-[32vw] max-w-[310px] sm:max-w-[420px] lg:max-w-[480px] aspect-[3/4] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
        >
          {galleryItems.map((item, idx) => {
            // Calculate circular offset from active index
            let offset = (idx - activeIndex) % total;
            if (offset > 2) offset -= total;
            if (offset < -2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            // Reverted back to previous rectangular card geometry:
            // Center is proud, tall rectangle in front.
            // Left & Right cards flanking with subtle organic tilt and elevation offset (non-parallel abstract).
            let translateX = "0%";
            let translateY = "0px";
            let scale = 1;
            let rotate = 0;
            let opacity = 0;
            let zIndex = 10;
            let pointerEvents = "none";

            if (isCenter) {
              translateX = "0%";
              translateY = "0px";
              scale = 1;
              rotate = 0;
              opacity = 1;
              zIndex = 30;
              pointerEvents = "auto";
            } else if (isLeft) {
              translateX = isMobile ? "-66%" : "-85%";
              translateY = "14px";
              scale = isMobile ? 0.84 : 0.88;
              rotate = -2;
              opacity = 0.78;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (isRight) {
              translateX = isMobile ? "66%" : "85%";
              translateY = "-12px";
              scale = isMobile ? 0.84 : 0.88;
              rotate = 2;
              opacity = 0.78;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (offset === -2) {
              translateX = isMobile ? "-130%" : "-165%";
              translateY = "0px";
              scale = 0.7;
              rotate = -4;
              opacity = 0;
              zIndex = 5;
            } else if (offset === 2) {
              translateX = isMobile ? "130%" : "165%";
              translateY = "0px";
              scale = 0.7;
              rotate = 4;
              opacity = 0;
              zIndex = 5;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCenter ? "cursor-default shadow-2xl" : "cursor-pointer hover:opacity-95"
                  }`}
                style={{
                  transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate}deg)`,
                  opacity,
                  zIndex,
                  pointerEvents: pointerEvents as any,
                }}
              >
                {/* Punk Industrial Corner Brackets Framing (highlighted on center card) */}
                <div
                  className={`absolute -inset-2 pointer-events-none z-30 transition-opacity duration-500 ${isCenter ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <div className="absolute top-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-white/80" />
                  <div className="absolute top-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-white/80" />
                  <div className="absolute bottom-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-white/80" />
                  <div className="absolute bottom-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-white/80" />
                </div>

                {/* Pure Image Media Container (No Text Overlay) */}
                <div
                  className={`relative w-full h-full overflow-hidden bg-neutral-950 border transition-colors duration-300 ${isCenter ? "border-neutral-400 shadow-[0_25px_70px_rgba(0,0,0,0.95)]" : "border-neutral-800"
                    }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 480px"
                    priority={isCenter}
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle edge vignette */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 ${isCenter ? "opacity-30" : "opacity-65"
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: strictly "EXPLORE" positioned snug right under Section 3 content (close, but not touching) */}
        <div
          ref={buttonRef}
          className="w-full flex justify-center z-30"
          style={{ marginTop: "38px" }}
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center justify-center gap-4 px-10 sm:px-12 py-3 sm:py-3.5 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.25em] uppercase text-xs sm:text-sm font-sans font-black shadow-2xl cursor-pointer"
          >
            <span>EXPLORE</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
