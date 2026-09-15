"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";
import gsap from "gsap";

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal, selectedLocationIndex } = useUI();
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const locations = siteLinks.locations;
  const currentLoc = locations[activeLocationIndex] || locations[0];

  // Sync selected location index when modal opens
  useEffect(() => {
    if (isLocationModalOpen && typeof selectedLocationIndex === "number") {
      setActiveLocationIndex(selectedLocationIndex);
    }
  }, [isLocationModalOpen, selectedLocationIndex]);

  // Close handler with smooth exit animation
  const handleClose = useCallback(() => {
    if (!modalRef.current || !backdropRef.current) {
      closeLocationModal();
      return;
    }

    const tl = gsap.timeline({
      onComplete: closeLocationModal,
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 14,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.16,
        ease: "power2.in",
      },
      "-=0.08"
    );
  }, [closeLocationModal]);

  // Entrance animation matching MenuDetailModal
  useEffect(() => {
    if (!isLocationModalOpen) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    }

    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        "-=0.1"
      );
    }
  }, [isLocationModalOpen]);

  // ESC key listener
  useEffect(() => {
    if (!isLocationModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocationModalOpen, handleClose]);

  if (!isLocationModalOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-location-title"
      data-lenis-prevent
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-8 select-none cursor-pointer"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={handleClose}
    >
      {/* 
        Location Modal:
        - Design matches MenuDetailModal portrait card: max-w-[440px] h-[660px]
        - Fully interactive Google Maps embed with tabs for all 3 venues
        - Minimal X close button
        - Clean bottom info sheet with direct Google Maps trigger
      */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative z-[210] w-[88%] xs:w-[86%] sm:w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[430px] h-[460px] xs:h-[490px] sm:h-[540px] md:h-[590px] lg:h-[640px] max-h-[72dvh] xs:max-h-[75dvh] sm:max-h-[82dvh] md:max-h-[88dvh] lg:max-h-[94dvh] bg-[#0D0D0D] rounded-[6px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-default select-text"
      >
        {/* Layer 1: Fully Interactive Live Google Maps Embed (Zoomable & Draggable) */}
        <div className="relative w-full h-[50%] sm:h-[52%] md:h-[54%] bg-[#111] overflow-hidden z-10 shrink-0">
          <iframe
            key={currentLoc.id}
            title={`${currentLoc.fullName} Interactive Map`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(currentLoc.embedQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 contrast-105 pointer-events-auto"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Minimal X Close Button (Clean Black X without card container) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup peta lokasi"
          className="absolute top-3.5 right-3.5 z-50 p-2 text-black hover:text-[#E05D29] active:scale-90 transition-all duration-200 cursor-pointer focus:outline-none drop-shadow-[0_1px_3px_rgba(255,255,255,0.3)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Layer 2: Clean Bottom Info Sheet matching Menus design with edge-to-edge button */}
        <div className="w-full flex-1 bg-[#0E0E0E] flex flex-col justify-between relative z-20 border-t border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle gradient separator */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-0 right-0 h-5 pointer-events-none z-30"
            style={{
              background: "linear-gradient(to top, rgba(14, 14, 14, 0.95) 0%, rgba(14, 14, 14, 0) 100%)",
            }}
          />

          {/* Dedicated Container Konten Teks: Tetap ada jarak dan padding persis seperti pop up menus */}
          <div className="w-full flex-1 px-3 xs:px-3.5 sm:px-4 md:px-4.5 pt-3.5 sm:pt-4 pb-2 flex flex-col items-center justify-center">
            <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[370px] mx-auto text-left flex flex-col gap-2.5 sm:gap-3">
              {/* Title */}
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
                <h2
                  id="modal-location-title"
                  className="text-lg sm:text-xl md:text-[22px] font-black uppercase tracking-tight text-white leading-tight"
                >
                  AFTERWORK{" "}
                  <span className="inline-block text-sm sm:text-base font-mono font-bold text-[#E05D29] tracking-wider align-baseline ml-1 drop-shadow-[0_0_10px_rgba(224,93,41,0.35)]">
                    {currentLoc.city}
                  </span>
                </h2>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono tracking-wide">
                  — {currentLoc.spot}
                </span>
              </div>

              {/* Specifications: Operating Hours & Spot */}
              <div className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/10 py-2.5 my-0.5 w-full">
                <div className="flex flex-col gap-0.5 pr-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                    OPERATING HOURS
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-200 font-medium leading-snug">
                    {currentLoc.hours}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pl-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                    VENUE SPOT
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-200 font-medium leading-snug truncate">
                    {currentLoc.spot}
                  </span>
                </div>
              </div>

              {/* Address Details */}
              <div className="flex flex-col gap-0.5 w-full">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#E05D29] font-bold">
                  Location Address
                </span>
                <p className="text-[11px] sm:text-xs text-neutral-300 lg:text-neutral-400 font-light leading-relaxed tracking-wide line-clamp-2">
                  {currentLoc.address}
                </p>
              </div>
            </div>
          </div>

          {/* Direct External Maps Trigger: Memenuhi kanan kirinya tanpa jarak (hanya button saja yang edge-to-edge) */}
          <div className="w-full mt-auto">
            <a
              href={currentLoc.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-[#E05D29] text-black text-xs font-black tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer rounded-none font-mono shadow-md"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
