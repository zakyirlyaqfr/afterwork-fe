"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import gsap from "gsap";
import { getAssetPath } from "@/utils/asset";

export default function MenuTrigger() {
  const { isMenuOpen, toggleMenu, closeMenu, navigateTo, hasSeenSplash, isPageTransitioning } = useUI();
  const pathname = usePathname();

  const desktopDockRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLButtonElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const hasAnimatedIn = useRef(false);

  // Coordinated entrance animation:
  // Prevents sidebar button & logo from abruptly popping in ahead of splash completion or page content
  useEffect(() => {
    const targets = [desktopDockRef.current, mobileMenuRef.current, mobileLogoRef.current].filter(Boolean);
    if (targets.length === 0) return;

    if (!hasSeenSplash) {
      gsap.set(targets, { opacity: 0 });
      return;
    }

    if (!hasAnimatedIn.current) {
      hasAnimatedIn.current = true;
      // Elegant delayed entrance in perfect synchrony with hero elements revealing
      gsap.fromTo(
        targets,
        { opacity: 0, y: -8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.55,
          ease: "power3.out",
          clearProps: "y",
        }
      );
    }
  }, [hasSeenSplash]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) closeMenu();
    if (pathname === "/") {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    navigateTo("/");
  };

  return (
    <>
      {/* 
        Desktop Sidebar Dock Controls (Layer Paling Atas - z-[80]):
        Sidebar dock transparent saat tertutup, dan melayang di atas NavigationOverlay saat terbuka.
        Logo dan Button Menu tetap berada di layer z-[80].
        Sifat button di sidebar sama kayak menus dan filter: tetap tampil di layer latar saat pop-up dibuka.
      */}
      <aside
        ref={desktopDockRef}
        className="hidden md:block fixed left-0 top-0 bottom-0 sidebar-dock site-chrome z-[90] pointer-events-none select-none"
        aria-label="Sidebar Navigation Controls"
      >
        {/* Brand Logo at top of sidebar dock */}
        <div className="w-full flex justify-center px-4 absolute top-10 lg:top-12 z-[100] pointer-events-auto">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group block relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05D29]"
            aria-label="Afterwork Caffeine Homepage"
          >
            <Image
              src={getAssetPath("/brand/logo-short-white.png")}
              alt="AFTERWORK CAFFEINE"
              fill
              sizes="72px"
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Menu / Close Button centered vertically in sidebar dock */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex flex-col items-center gap-4 lg:gap-5 group cursor-pointer focus:outline-none p-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        >
          {/* Visual Icon with concentric double circles matching user reference */}
          {isMenuOpen ? (
            /* CLOSE STATE: Concentric circles - Both circles brand orange (garis murni tanpa efek kotak/glow) */
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8 lg:w-9 lg:h-9 transition-transform duration-300"
              >
                {/* Outer circle - Brand Orange (Pure clean line) */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="#E05D29"
                  strokeWidth="1.6"
                  className="transition-colors duration-300"
                />
                {/* Inner circle - Brand Orange (Pure clean line) */}
                <circle
                  cx="16"
                  cy="16"
                  r="10"
                  stroke="#E05D29"
                  strokeWidth="1.8"
                  className="transition-colors duration-300"
                />
              </svg>
            </div>
          ) : (
            /* MENU STATE: Concentric circles - Outer circle white, Inner circle white/80 (turns orange on hover) */
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8 lg:w-9 lg:h-9 transition-colors duration-300"
              >
                {/* Outer circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="white"
                  strokeWidth="1.6"
                  className="transition-colors duration-300 group-hover:stroke-[#E05D29]"
                />
                {/* Inner circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="10"
                  stroke="white"
                  strokeOpacity="0.8"
                  strokeWidth="1.8"
                  className="transition-colors duration-300 group-hover:stroke-[#E05D29] group-hover:stroke-opacity-100"
                />
              </svg>
            </div>
          )}

          {/* Vertical 'MENU' vs 'CLOSE' Label */}
          <span
            style={{ writingMode: "vertical-rl" }}
            className={`font-sans text-xs lg:text-[13px] font-bold tracking-[0.28em] uppercase transition-colors duration-300 rotate-180 ${isMenuOpen
                ? "text-[#E05D29] font-black"
                : "text-white/80 group-hover:text-[#E05D29]"
              }`}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </aside>

      {/* Mobile Menu Button (< md, fixed top-left, shifted slightly down) */}
      <button
        ref={mobileMenuRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="md:hidden fixed top-5 sm:top-6 left-4 sm:left-6 z-[90] site-chrome flex items-center gap-2 sm:gap-2.5 p-2 bg-transparent border-0 focus:outline-none group cursor-pointer transition-colors duration-300"
      >
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke={isMenuOpen ? "#E05D29" : "white"}
            strokeWidth="1.8"
            className="transition-colors duration-300 group-hover:stroke-[#E05D29]"
          />
          <circle
            cx="16"
            cy="16"
            r="10"
            stroke={isMenuOpen ? "#E05D29" : "white"}
            strokeWidth="2"
            className="transition-colors duration-300"
          />
        </svg>
        <span
          className={`text-xs sm:text-[13px] font-sans font-black tracking-widest uppercase transition-colors duration-300 ${isMenuOpen ? "text-[#E05D29]" : "text-white group-hover:text-[#E05D29]"
            }`}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </span>
      </button>

      {/* Mobile Logo (< md, fixed top-right, raised slightly up) */}
      <div
        ref={mobileLogoRef}
        className="md:hidden fixed right-4 sm:right-6 top-1.5 sm:top-2 z-[90] select-none site-chrome"
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group block relative w-13 h-13 sm:w-16 sm:h-16 focus:outline-none"
          aria-label="Afterwork Caffeine Homepage"
        >
          <Image
            src={getAssetPath("/brand/logo-short-white.png")}
            alt="AFTERWORK CAFFEINE"
            fill
            sizes="64px"
            priority
            className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          />
        </Link>
      </div>
    </>
  );
}
