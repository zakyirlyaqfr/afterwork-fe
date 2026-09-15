"use client";

import { useUI } from "@/context/UIContext";

export default function Footer() {
  const { isMenuOpen, openLocationModal } = useUI();

  return (
    <footer
      className="relative w-full z-40 bg-black text-white select-none overflow-hidden transition-opacity duration-200"
      style={{
        opacity: isMenuOpen ? 0 : 1,
        visibility: isMenuOpen ? "hidden" : "visible",
        pointerEvents: isMenuOpen ? "none" : "auto",
      }}
    >
      {/* ========================================================================= */}
      {/* Non-Landscape Laptop Layout (Mobile & Tablet: < lg)                       */}
      {/* Flow: 1. Lokasi -> 2. @ Copyright -> 3. AFTERWORK CAFFEINE (Paling Bawah) */}
      {/* Lokasi & @ memakai logic horizontal padding persis <p> editorial: px-6 sm:px-8 max-w-lg */}
      {/* KECUALI AFTERWORK CAFFEINE yang paling bawah                             */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full py-12 sm:py-16">
        {/* Container Lokasi & Copyright: Dikembalikan ke layout awal (kiri) */}
        <div className="w-full max-w-lg px-6 sm:px-8 text-left flex flex-col space-y-6">
          {/* 1. Lokasi */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-neutral-400 uppercase space-y-3 text-left">
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(0);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer leading-relaxed"
            >
              G-Walk Citraland - Lakarsantri, Surabaya
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(1);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer leading-relaxed"
            >
              Foremost Padel Club - Gayungan, Surabaya
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(2)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(2);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer leading-relaxed"
            >
              Sanur Bali - Denpasar, Bali
            </div>
          </div>

          {/* 2. Dibawahnya @ itu (Copyright) */}
          <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase text-left pt-2">
            © AFTERWORK CAFFEINE. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* 3. Dibawahnya AFTERWORK CAFFEINE: Memenuhi kiri kanannya */}
        <div className="w-full px-2 sm:px-3 pt-12 sm:pt-16 text-center overflow-hidden">
          <div className="font-sans text-[clamp(2.15rem,9.4vw,5.5rem)] font-black tracking-tighter uppercase text-white leading-none whitespace-nowrap select-none w-full text-center">
            AFTERWORK CAFFEINE
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Desktop Landscape Laptop Layout (>= lg) - 100% Tetap Mempertahankan Asli */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex w-full px-14 lg:px-20 py-12 md:py-16 relative z-10 flex-col space-y-12">
        {/* Top Tier: Wordmark on Left & 3 Branches on Right */}
        <div className="flex flex-row items-end justify-between gap-8">
          <div>
            <div className="font-sans text-5xl md:text-6xl font-black tracking-tight uppercase text-white leading-none">
              AFTERWORK CAFFEINE
            </div>
          </div>

          <div className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-neutral-400 uppercase space-y-2 text-right">
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(0);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              G-Walk Citraland - Lakarsantri, Surabaya
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(1);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Foremost Padel Club - Gayungan, Surabaya
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLocationModal(2)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLocationModal(2);
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sanur Bali - Denpasar, Bali
            </div>
          </div>
        </div>

        {/* Bottom Tier: Pure Minimal Copyright without year */}
        <div className="pt-8 flex flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
            © AFTERWORK CAFFEINE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
