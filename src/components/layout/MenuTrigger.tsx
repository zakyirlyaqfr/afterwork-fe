"use client";

import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

export default function MenuTrigger() {
  const { isMenuOpen, toggleMenu } = useUI();

  return (
    <>
      {/* 
        Penutup Bagian Bolong Sidebar Dock (HANYA saat sidebar terbuka):
        - Saat isMenuOpen === true: transisi cepat/instan (0.08s) agar tidak ada delay saat membuka
        - Saat isMenuOpen === false: transisi halus (0.55s) agar tidak terlalu cepat hilang saat ditutup
      */}
      <div
        className="hidden md:block fixed left-0 top-0 bottom-0 sidebar-dock bg-black pointer-events-none select-none z-[75]"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transition: isMenuOpen
            ? "opacity 0.08s ease-out"
            : "opacity 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        aria-hidden="true"
      />

      {/* 
        Desktop Sidebar Dock Controls (Layer Paling Atas - z-[80]):
        Sidebar dock transparent agar gambar konten bebas menimpa area rel sidebar saat tertutup,
        sementara Logo dan Button Menu tetap melayang di layer paling atas (z-[80])
      */}
      <aside
        className="hidden md:block fixed left-0 top-0 bottom-0 sidebar-dock z-[80] pointer-events-none select-none"
        aria-label="Sidebar Navigation Controls"
      >
        {/* Brand Logo at top of sidebar dock */}
        <div className="w-full flex justify-center px-4 absolute top-10 lg:top-12 z-50 pointer-events-auto">
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
              className="object-contain"
            />
          </Link>
        </div>

        {/* Menu / Close Button mathematically centered vertically in sidebar dock */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex flex-col items-center gap-4 lg:gap-5 group cursor-pointer focus:outline-none p-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
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
      </aside>

      {/* Mobile Logo (< md, fixed top-left) */}
      <div className="md:hidden fixed left-6 top-8 z-50 select-none">
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
