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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 select-none cursor-pointer"
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
        className="relative z-[210] w-full max-w-[400px] sm:max-w-[440px] h-[620px] max-h-[92dvh] sm:max-h-[95dvh] sm:h-[660px] bg-[#0D0D0D] rounded-[6px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-default select-text border border-white/10"
      >
        {/* Layer 1: Fully Interactive Live Google Maps Embed (Zoomable & Draggable) */}
        <div className="relative w-full h-[52%] sm:h-[54%] bg-[#111] overflow-hidden z-10 shrink-0">
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
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Layer 2: Clean Bottom Info Sheet matching Menus design */}
        <div className="w-full flex-1 bg-[#0E0E0E] px-6 sm:px-7 py-4 sm:py-5 flex flex-col justify-between relative z-20 border-t border-white/10 shadow-2xl">
          {/* Subtle gradient separator */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-0 right-0 h-5 pointer-events-none z-30"
            style={{
              background: "linear-gradient(to top, rgba(14, 14, 14, 0.95) 0%, rgba(14, 14, 14, 0) 100%)",
            }}
          />

          {/* Title */}
          <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
            <h2
              id="modal-location-title"
              className="text-xl sm:text-[22px] font-black uppercase tracking-tight text-white leading-tight"
            >
              AFTERWORK{" "}
              <span className="inline-block text-sm sm:text-base font-mono font-bold text-[#E05D29] tracking-wider align-baseline ml-1 drop-shadow-[0_0_10px_rgba(224,93,41,0.35)]">
                {currentLoc.city}
              </span>
            </h2>
            <span className="text-[11px] text-neutral-400 font-mono tracking-wide">
              — {currentLoc.spot}
            </span>
          </div>

          {/* Specifications: Operating Hours & Spot */}
          <div className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/10 py-2 my-0.5">
            <div className="flex flex-col gap-0.5 pr-2.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                OPERATING HOURS
              </span>
              <span className="text-xs text-neutral-200 font-medium leading-snug">
                {currentLoc.hours}
              </span>
            </div>

            <div className="flex flex-col gap-0.5 pl-2.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                VENUE SPOT
              </span>
              <span className="text-xs text-neutral-200 font-medium leading-snug truncate">
                {currentLoc.spot}
              </span>
            </div>
          </div>

          {/* Address Details */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
              Location Address
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal line-clamp-2">
              {currentLoc.address}
            </p>
          </div>

          {/* Direct External Maps Trigger */}
          <div className="pt-1.5">
            <a
              href={currentLoc.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E05D29] text-black text-xs font-black tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer rounded-none font-mono shadow-md"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
