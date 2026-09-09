"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { navigationItems } from "@/data/navigation";
import gsap from "gsap";

export default function NavigationOverlay() {
  const { isMenuOpen, closeMenu } = useUI();
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Unified Edge-to-Edge GSAP Curtain Wipe & Image Animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isMenuOpen) {
        gsap.set(container, { visibility: "hidden", clipPath: "inset(0% 100% 0% 0%)" });
        return;
      }
    }

    // Kill any active tweens on the container and image card
    gsap.killTweensOf([container, imageCardRef.current].filter(Boolean));

    if (isMenuOpen) {
      // Reveal container and sweep curtain from left to right
      gsap.set(container, { visibility: "visible", opacity: 1 });

      gsap.fromTo(
        container,
        {
          clipPath: "inset(0% 100% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "power3.inOut",
        }
      );

      // Slower, smooth floating entrance animation for the sidebar image
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          {
            opacity: 0,
            x: 60,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.12,
            ease: "power3.out",
          }
        );
      }
    } else {
      // Exit Animation: Image card glides out and curtain sweeps back
      if (imageCardRef.current) {
        gsap.to(imageCardRef.current, {
          opacity: 0,
          x: 40,
          scale: 0.94,
          duration: 0.4,
          ease: "power2.in",
        });
      }

      gsap.fromTo(
        container,
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(container, { visibility: "hidden" });
          },
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      data-lenis-prevent
      className="fixed inset-0 w-full h-full z-[70] bg-black text-[#F5F5F5] invisible flex flex-col justify-center overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* 
        Main Section Content Container:
        - Uses .nav-overlay-content for robust responsive spacing away from the sidebar dock.
        - Zero overlap with sidebar elements or menu/close button.
      */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full overflow-hidden items-center justify-between nav-overlay-content pt-24 sm:pt-28 pb-10 md:py-0">
        
        {/*
          Menu links column:
          - Sits entirely in the main section.
          - ANIMATION REMOVED: Static typography, no staggered motion or skew.
          - HOVER COLOR: Brand Orange (#E05D29).
        */}
        <div className="w-full md:w-[52%] lg:w-[55%] h-full flex flex-col justify-center select-none">
          <nav
            className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 xl:space-y-7"
            aria-label="Main Navigation"
          >
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredId === item.id;
              const isOrange = isActive || isHovered;

              return (
                <div key={item.id} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`nav-link-hover group inline-flex items-center py-1 sm:py-1.5 focus:outline-none ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {/* Bold Stark Typography with Brand Orange Hover State */}
                    <span
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[76px] font-black tracking-tighter uppercase leading-[0.96]"
                      style={{
                        color: isOrange ? "#E05D29" : "rgba(255, 255, 255, 0.85)",
                        transition: "color 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/*
          Right Column: Abstract Punk Visual Composition
          - Asymmetric tilt, layered brutalist underlayer, corner brackets & authentic street photography.
          - Text stickers removed: raw craft, surabaya stencil, and no rules badge are gone.
          - Animated floating entrance & ambient levitation.
          - Visible on desktop/tablet (>= md).
        */}
        <div className="hidden md:flex md:w-[48%] lg:w-[45%] flex-col justify-center items-center lg:items-end pr-4 sm:pr-8 lg:pr-12 xl:pr-16">
          <div
            ref={imageCardRef}
            className="relative w-full max-w-[300px] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] mr-2 lg:mr-4 select-none float-ambient-a"
          >
            {/* Abstract Punk Offset Underlayer Wireframe */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 sm:-inset-4 border-2 border-[#E05D29] bg-[#E05D29]/10 rotate-[2.5deg] translate-x-3 translate-y-3 pointer-events-none z-0 shadow-[0_0_35px_rgba(224,93,41,0.25)]"
            />

            {/* Main Asymmetric Tilted Image Frame */}
            <div className="relative w-full aspect-[3/4] bg-[#0c0c0c] border border-neutral-700 -rotate-[3deg] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-visible z-10 transition-transform duration-500 ease-out hover:scale-[1.02] hover:-rotate-[1.5deg]">
              
              {/* Punk Corner Brackets Framing */}
              <div aria-hidden="true" className="absolute -inset-2.5 pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/90" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#E05D29]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#E05D29]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/90" />
              </div>

              {/* Primary Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-neutral-950">
                <Image
                  src="/images/afterwork-seating.jpg"
                  alt="Afterwork Caffeine Street Architecture"
                  fill
                  sizes="(max-width: 1024px) 40vw, 440px"
                  priority
                  className="object-cover object-center grayscale-[20%] contrast-[110%]"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
