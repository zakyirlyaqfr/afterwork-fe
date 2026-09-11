"use client";

import { useUI } from "@/context/UIContext";

export default function Footer() {
  const { isMenuOpen } = useUI();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full z-40 bg-black text-white select-none overflow-hidden transition-opacity duration-200"
      style={{
        opacity: isMenuOpen ? 0 : 1,
        visibility: isMenuOpen ? "hidden" : "visible",
        pointerEvents: isMenuOpen ? "none" : "auto",
      }}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-12 md:py-16 relative z-10 flex flex-col space-y-12">
        {/* Top Tier: Wordmark & Operating Details Spanning Entire Width Above Sidebar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="font-sans text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white leading-none">
              AFTERWORK CAFFEINE
            </div>
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-neutral-400 uppercase pt-1">
              Specialty Bottled Formulas & Artisanal Coffee // Surabaya
            </p>
          </div>

          <div className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-neutral-400 uppercase space-y-2 md:text-right">
            <div>G-Walk Citraland & Downtown Surabaya</div>
            <div className="text-white font-medium text-sm">09:00 — 02:00 Everyday</div>
            <div className="text-neutral-500 text-[11px]">7°17&apos;08.2&quot;S 112°38&apos;41.5&quot;E</div>
          </div>
        </div>

        {/* Bottom Tier: Pure Minimal Brand Line & Fine Print (No List Menu) */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
            DAMNGOOD COFFEE CULTURE
          </div>

          <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
            © {currentYear} AFTERWORK CAFFEINE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
