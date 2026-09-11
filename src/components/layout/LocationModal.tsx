"use client";

import { useEffect, useRef } from "react";
import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";
import gsap from "gsap";
import CircularWatermark from "@/components/menus/CircularWatermark";

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal } = useUI();
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLocationModalOpen) return;

    // Entrance animation
    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 25, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out", delay: 0.05 }
      );
    }
  }, [isLocationModalOpen]);

  const handleClose = () => {
    if (contentRef.current && backdropRef.current) {
      const tl = gsap.timeline({ onComplete: closeLocationModal });
      tl.to(contentRef.current, {
        opacity: 0,
        y: 16,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      }).to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "-=0.08"
      );
    } else {
      closeLocationModal();
    }
  };

  // ESC key listener
  useEffect(() => {
    if (!isLocationModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocationModalOpen]);

  if (!isLocationModalOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-location-title"
      data-lenis-prevent
      className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none cursor-pointer"
      style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={handleClose}
    >
      {/* 
        Simple, Minimal & Elegant Location Modal:
        - Sharp corners (rounded-none)
        - Clean layout: Info sebelah kiri, Live Map sebelah kanan
        - Tanpa teks bertele-tele (hanya info esensial yang elegan)
        - Watermark halus di latar belakang
      */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="w-full max-w-3xl max-h-[88dvh] bg-[#0A0A0A] border border-white/15 text-[#F5F5F5] flex flex-col md:flex-row shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative overflow-hidden select-text cursor-default rounded-none"
      >
        {/* Ambient Subtle Watermark in background */}
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -right-16 pointer-events-none z-0 opacity-10 select-none"
        >
          <CircularWatermark size={260} scrollDriven={false} />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup peta lokasi"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#E05D29] hover:border-[#E05D29] transition-colors rounded-none cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Sisi Kiri: Info Esensial Bersih */}
        <div className="w-full md:w-[45%] p-6 sm:p-8 flex flex-col justify-between relative z-10 border-b md:border-b-0 md:border-r border-white/10">
          <div className="space-y-4">
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#E05D29] uppercase font-bold">
              VENUE LOCATION
            </div>

            <h2
              id="modal-location-title"
              className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-none text-white"
            >
              AFTERWORK<br />
              <span className="text-[#E05D29]">CAFFEINE</span>
            </h2>

            <div className="w-8 h-0.5 bg-[#E05D29]" />

            <div className="space-y-3 pt-1 text-xs text-neutral-300">
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Address</span>
                <p className="mt-0.5 leading-relaxed font-medium">{siteLinks.location.address}</p>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Hours</span>
                <p className="mt-0.5 font-bold text-white">09:00 — 02:00 Everyday</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={siteLinks.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-between px-5 py-3 bg-[#E05D29] text-black text-xs font-black tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer"
            >
              <span>GOOGLE MAPS</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Sisi Kanan: Peta Interaktif */}
        <div className="w-full md:w-[55%] min-h-[260px] md:min-h-[360px] relative bg-[#111111] z-10">
          <iframe
            title="Afterwork Caffeine Location"
            src={siteLinks.location.embedIframe}
            className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
