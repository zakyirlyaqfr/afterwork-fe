"use client";

import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

export default function MenuTrigger() {
  const { isMenuOpen, toggleMenu } = useUI();

  return (
    <>
      {/* 
        Sidebar Rail (Dedicated Fixed Left Column with border on >= md)
        - Boundary: border-r border-[#222222]
        - Width: var(--sidebar-width) via .sidebar-dock
        - Content is completely partitioned from the main section
      */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 sidebar-dock z-50 flex-col justify-between items-center py-10 lg:py-12 bg-black select-none"
        aria-label="Sidebar Navigation Dock"
      >
        {/* Brand Logo at top of sidebar dock - Enlarged */}
        <div className="w-full flex justify-center px-4">
          <Link
            href="/"
            className="group block relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Afterwork Caffeine Homepage"
          >
            <Image
              src="/brand/logo-short-white.png"
              alt="AFTERWORK CAFFEINE"
              fill
              sizes="72px"
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Menu / Close Button centered vertically in sidebar dock - Enlarged */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex flex-col items-center gap-4 lg:gap-5 group cursor-pointer focus:outline-none p-3"
        >
          {/* Diamond geometric icon - Enlarged */}
          <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 lg:w-9 lg:h-9 transition-colors duration-300 text-white"
            >
              {/* Outer diamond */}
              <path
                d="M12 2.5 L21.5 12 L12 21.5 L2.5 12 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Inner top corner cube/diamond */}
              <path
                d="M12 6.5 L16 10.5 L12 14.5 L8 10.5 Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.25"
              />
            </svg>
          </div>

          {/* Vertical 'Menu' / 'Close' label - Enlarged & bold */}
          <span
            style={{ writingMode: "vertical-rl" }}
            className="font-sans text-xs lg:text-[13px] font-bold tracking-[0.28em] uppercase transition-colors duration-300 rotate-180 text-white/85 group-hover:text-white"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* Bottom invisible spacer to maintain vertical center alignment of Menu trigger */}
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] pointer-events-none" aria-hidden="true" />
      </aside>

      {/* Mobile Logo (< md, fixed top-left) */}
      <div className="md:hidden fixed left-6 top-6 z-50 select-none">
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

      {/* Mobile Menu Button (< md, fixed top-right) */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="md:hidden fixed top-6 right-6 z-50 flex items-center gap-2 text-white bg-black/70 backdrop-blur-md px-3.5 py-2 border border-[#262626] focus:outline-none group cursor-pointer transition-colors hover:border-[#444444]"
      >
        <span className="text-xs font-sans tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">
          {isMenuOpen ? "Close" : "Menu"}
        </span>
      </button>
    </>
  );
}
