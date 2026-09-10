"use client";

import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

export default function MenuTrigger() {
  const { isMenuOpen, toggleMenu } = useUI();

  return (
    <>
      {/* 
        Desktop Sidebar Dock Controls (Layer Paling Atas - z-[80]):
        Sidebar dock transparent saat tertutup, dan melayang di atas NavigationOverlay saat terbuka.
        Logo dan Button Menu tetap berada di layer z-[80].
      */}
      <aside
        className="hidden md:block fixed left-0 top-0 bottom-0 sidebar-dock z-[20] pointer-events-none select-none"
        aria-label="Sidebar Navigation Controls"
      >
        {/* Brand Logo at top of sidebar dock */}
        <div className="w-full flex justify-center px-4 absolute top-10 lg:top-12 z-[90] pointer-events-auto">
          <Link
            href="/"
            className="group block relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05D29]"
            aria-label="Afterwork Caffeine Homepage"
          >
            <Image
              src="/brand/logo-short-white.png"
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
          className="flex flex-col items-center gap-4 lg:gap-5 group cursor-pointer focus:outline-none p-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[90] pointer-events-auto"
        >
          {/* Visual Icon with concentric double circles matching user reference */}
          {isMenuOpen ? (
            /* CLOSE STATE: Concentric circles - Outer circle white, Inner circle brand orange */
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8 lg:w-9 lg:h-9 transition-transform duration-300"
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
                {/* Inner circle - Brand Orange */}
                <circle
                  cx="16"
                  cy="16"
                  r="10"
                  stroke="#E05D29"
                  strokeWidth="1.8"
                  className="drop-shadow-[0_0_6px_rgba(224,93,41,0.6)]"
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
            className={`font-sans text-xs lg:text-[13px] font-bold tracking-[0.28em] uppercase transition-colors duration-300 rotate-180 ${
              isMenuOpen
                ? "text-[#E05D29] font-black drop-shadow-[0_0_8px_rgba(224,93,41,0.5)]"
                : "text-white/80 group-hover:text-[#E05D29]"
            }`}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </aside>

      {/* Mobile Logo (< md, fixed top-left) */}
      <div className="md:hidden fixed left-5 sm:left-6 top-6 sm:top-8 z-[80] select-none">
        <Link
          href="/"
          className="group block relative w-10 h-10 focus:outline-none"
          aria-label="Afterwork Caffeine Homepage"
        >
          <Image
            src="/brand/logo-short-white.png"
            alt="AFTERWORK CAFFEINE"
            fill
            sizes="40px"
            priority
            className="object-contain"
          />
        </Link>
      </div>

      {/* Mobile Menu Button (< md, fixed top-right with concentric double circles) */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`md:hidden fixed top-5 sm:top-6 right-5 sm:right-6 z-[80] flex items-center gap-2.5 px-3.5 py-2 focus:outline-none group cursor-pointer transition-all duration-300 ${
          isMenuOpen
            ? "bg-black/95 text-[#E05D29] border border-[#E05D29] shadow-[0_0_15px_rgba(224,93,41,0.4)]"
            : "bg-black/80 backdrop-blur-md text-white border border-[#333333] hover:border-[#E05D29]"
        }`}
      >
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="14" stroke={isMenuOpen ? "#E05D29" : "white"} strokeWidth="1.8" />
          <circle cx="16" cy="16" r="10" stroke="#E05D29" strokeWidth="2" />
        </svg>
        <span
          className={`text-xs font-sans font-bold tracking-widest uppercase ${
            isMenuOpen ? "text-[#E05D29]" : "text-white/90 group-hover:text-[#E05D29]"
          }`}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </span>
      </button>
    </>
  );
}
