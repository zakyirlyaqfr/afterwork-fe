"use client";

import { useEffect, useRef } from "react";
import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";
import gsap from "gsap";

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal } = useUI();
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLocationModalOpen) return;

    // Entrance animation
    if (backdropRef.current) {
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40, scale: 0.94, rotate: -1 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isLocationModalOpen]);

  const handleClose = () => {
    // Exit animation
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0, y: 30, scale: 0.96,
        duration: 0.3, ease: "power2.in",
      });
    }
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: closeLocationModal,
      });
    }
  };

  if (!isLocationModalOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-location-title"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 md:p-12"
      style={{ backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(2px)" }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0a0a0a] border-2 border-[#262626] text-[#F5F5F5] flex flex-col md:flex-row overflow-hidden shadow-2xl relative punk-glow"
      >
        {/* Corner Brackets */}
        <div className="absolute -inset-3 pointer-events-none z-30">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#E05D29]" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#E05D29]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/80" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close location modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black border-2 border-[#333] text-[#F5F5F5] hover:text-[#E05D29] hover:border-[#E05D29] transition-all duration-300 focus:outline-none"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Left Side: Location Details */}
        <div className="w-full md:w-[48%] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#262626]">
          <div>
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-[#E05D29] uppercase mb-5">
              <span className="font-semibold">VENUE SURABAYA</span>
            </div>

            <h2
              id="modal-location-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight mb-6"
            >
              AFTERWORK
              <br />
              <span className="text-[#E05D29]">CAFFEINE</span>
            </h2>

            <div className="space-y-5 text-sm text-[#F5F5F5]/75 my-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center border border-[#E05D29] text-[#E05D29] shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="leading-relaxed text-xs">
                  {siteLinks.location.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center border border-[#E05D29] text-[#E05D29] shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <p className="text-xs">09:00 AM — 02:00 AM (EVERYDAY)</p>
              </div>

              <div className="pt-3 border-t border-[#262626] text-[11px] text-[#F5F5F5]/45 flex justify-between">
                <span>GPS COORD</span>
                <span className="text-[#E05D29]">{siteLinks.location.coordinates}</span>
              </div>
            </div>
          </div>

          {/* External Action */}
          <div className="pt-6">
            <a
              href={siteLinks.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-[#E05D29] text-black text-xs font-black tracking-[0.15em] uppercase hover:bg-[#F5F5F5] transition-colors group"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </a>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-full md:w-[52%] min-h-[280px] sm:min-h-[340px] md:min-h-[440px] relative bg-[#111111]">
          <iframe
            title="Afterwork Caffeine Location Map"
            src={siteLinks.location.embedIframe}
            className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 transition-opacity"
            loading="lazy"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-3 right-3 px-2 py-1 bg-black/80 font-mono text-[9px] tracking-widest text-[#F5F5F5]/50 border border-[#262626]">
            SURABAYA LIVE MAP
          </div>
        </div>
      </div>
    </div>
  );
}
