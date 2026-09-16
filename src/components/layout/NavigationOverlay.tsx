"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { navigationItems } from "@/data/navigation";
import gsap from "gsap";
import { getAssetPath } from "@/utils/asset";

const normalizePath = (p: string | null | undefined) => {
  if (!p) return "/";
  const clean = p.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

export default function NavigationOverlay() {
  const { isMenuOpen, closeMenu, navigateTo, isPageTransitioning } = useUI();
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (normalizePath(pathname) === normalizePath(href)) {
      closeMenu();
      return;
    }
    setClickedHref(href);
    navigateTo(href);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
    setClickedHref(null);
  }, [pathname]);

  // Unified Edge-to-Edge GSAP Curtain Wipe & Image Animation (Slow at start and end)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper to identify desktop landscape view
    const isLandscapeLaptop =
      typeof window !== "undefined" &&
      window.innerWidth >= 1024 &&
      window.matchMedia("(orientation: landscape)").matches;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isMenuOpen) {
        gsap.set(container, {
          visibility: "hidden",
          clipPath: isLandscapeLaptop
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
        });
        return;
      }
    }

    // Kill any active tweens on the container and image card
    gsap.killTweensOf([container, imageCardRef.current].filter(Boolean));

    if (isMenuOpen) {
      // Reveal container with slow-at-start, slow-at-end easing (power4.inOut)
      gsap.set(container, { visibility: "visible", opacity: 1 });

      if (isLandscapeLaptop) {
        // Desktop landscape: Sweep curtain from left to right with smooth easeInOut
        gsap.fromTo(
          container,
          {
            clipPath: "inset(0% 100% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
          }
        );
      } else {
        // Non-landscape (mobile/tablet): Open menu dari atas ke bawah dengan perlambatan pelan di akhir
        gsap.fromTo(
          container,
          {
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          }
        );
      }

      // Smooth floating entrance animation for the sidebar image
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          {
            opacity: 0,
            x: isLandscapeLaptop ? 60 : 30,
            y: isLandscapeLaptop ? 0 : 20,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.15,
            ease: "power3.out",
          }
        );
      }
    } else {
      if (isPageTransitioning) {
        gsap.set(container, {
          visibility: "hidden",
          clipPath: isLandscapeLaptop
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
        });
        if (imageCardRef.current) {
          gsap.set(imageCardRef.current, { opacity: 0 });
        }
        setClickedHref(null);
        return;
      }

      // Normal Exit Animation: Image card glides out with smooth easeInOut
      if (imageCardRef.current) {
        gsap.to(imageCardRef.current, {
          opacity: 0,
          x: isLandscapeLaptop ? 35 : 15,
          y: isLandscapeLaptop ? 0 : -15,
          scale: 0.94,
          duration: 0.65,
          ease: "power3.inOut",
        });
      }

      if (isLandscapeLaptop) {
        // Desktop landscape: Sweep curtain back to left
        gsap.fromTo(
          container,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(container, { visibility: "hidden" });
              setClickedHref(null);
            },
          }
        );
      } else {
        // Non-landscape (mobile/tablet): Close dari bawah ke atas dengan perlambatan pelan di akhir
        gsap.fromTo(
          container,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(container, { visibility: "hidden" });
              setClickedHref(null);
            },
          }
        );
      }
    }
  }, [isMenuOpen, isPageTransitioning]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      data-lenis-prevent
      className="fixed inset-0 w-full h-full z-[85] bg-black text-[#F5F5F5] invisible flex flex-col justify-center overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* 
        Main Section Content Container:
        - Uses .nav-overlay-content for robust responsive spacing away from the sidebar dock.
        - Zero overlap with sidebar elements or menu/close button.
      */}
      <div className="flex-1 flex flex-row w-full h-full overflow-hidden items-center justify-between nav-overlay-content pt-16 sm:pt-20 md:pt-0 pb-6 md:pb-0">

        {/*
          Menu links column:
          - Sits on the left side of the split layout.
          - Font list diperbesar pada tampilan non-landscape (text-4xl xs:text-[42px] sm:text-5xl).
          - Tanpa animasi entrance/exit, warna oranye aktif tetap berfungsi.
        */}
        <div className="w-[50%] sm:w-[50%] md:w-[52%] lg:w-[55%] h-full flex flex-col justify-center select-none py-4 md:py-0">
          <nav
            className="flex flex-col justify-center space-y-3.5 sm:space-y-4 md:space-y-6 lg:space-y-6 xl:space-y-7"
            aria-label="Main Navigation"
          >
            {navigationItems.map((item) => {
              const isActive = normalizePath(pathname) === normalizePath(item.href);
              const isHovered = hoveredId === item.id;
              const isClicked = clickedHref === item.href;
              const isOrange = isActive || isHovered || isClicked;

              return (
                <div key={item.id} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`nav-link-hover group inline-flex items-center py-0.5 sm:py-1 md:py-1.5 focus:outline-none ${isActive ? "active" : ""
                      }`}
                  >
                    {/* Enlarged typography on mobile non-landscape with Brand Orange active/hover color */}
                    <span
                      className="text-4xl xs:text-[42px] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[76px] font-black tracking-tighter uppercase leading-[0.94]"
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
          Right Column: Image Composition
          - Mobile: Visible on right (prominent, enlarged ~210px max-width), sharp corners (rounded-none), tetap miring (-rotate-[3deg])
          - Desktop (>= md): Preserves original asymmetric tilt, corner brackets & styling
        */}
        <div className="flex w-[50%] sm:w-[50%] md:w-[48%] lg:w-[45%] h-full flex-col justify-center items-end select-none pr-0 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-16 py-4 md:py-0">
          <div
            ref={imageCardRef}
            className="relative w-full max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] mr-0 md:mr-2 lg:mr-4 select-none float-ambient-a"
          >
            {/* Main Image Frame: sharp corners (rounded-none), tetap miring (-rotate-[3deg]) */}
            <div className="relative w-full aspect-[3/4] bg-[#0c0c0c] border border-neutral-700 rounded-none -rotate-[3deg] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-visible z-10 transition-transform duration-500 ease-out hover:scale-[1.02] hover:-rotate-[1.5deg]">

              {/* Corner Brackets Framing (Desktop only, hidden on mobile) */}
              <div aria-hidden="true" className="hidden md:block absolute -inset-2.5 pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/90" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/90" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/90" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/90" />
              </div>

              {/* Primary Image Container: sharp corners (rounded-none) */}
              <div className="relative w-full h-full overflow-hidden rounded-none bg-neutral-950">
                <Image
                  src={getAssetPath("/images/afterwork-seating.jpg")}
                  alt="Afterwork Caffeine Architecture"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 440px"
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
