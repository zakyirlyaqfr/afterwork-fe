"use client";

import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";
import { X, ArrowUpRight, MapPin, Clock } from "lucide-react";

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal } = useUI();

  if (!isLocationModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-location-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 sm:p-6 md:p-12 animate-in fade-in duration-200"
      onClick={closeLocationModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-black border border-[#262626] text-[#F5F5F5] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        style={{ borderRadius: "0px" }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLocationModal}
          aria-label="Close location modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black border border-[#262626] text-[#F5F5F5] hover:text-[#E05D29] hover:border-[#E05D29] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E05D29]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Editorial Location Details */}
        <div className="w-full md:w-[48%] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#262626]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#E05D29] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E05D29]" />
              <span>VENUE // SURABAYA HQ</span>
            </div>

            <h2
              id="modal-location-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight mb-4"
            >
              AFTERWORK
              <br />
              CAFFEINE
            </h2>

            <div className="space-y-4 font-mono text-xs text-[#F5F5F5]/80 my-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E05D29] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {siteLinks.location.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#E05D29] shrink-0" />
                <p>09:00 AM — 02:00 AM (EVERYDAY)</p>
              </div>

              <div className="pt-2 border-t border-[#262626] text-[11px] text-[#F5F5F5]/50 flex justify-between">
                <span>GPS COORD:</span>
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
              className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-[#E05D29] text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#F5F5F5] transition-colors group"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Map Iframe / Preview */}
        <div className="w-full md:w-[52%] min-h-[280px] sm:min-h-[340px] md:min-h-[440px] relative bg-[#111111]">
          <iframe
            title="Afterwork Caffeine Location Map"
            src={siteLinks.location.embedIframe}
            className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 transition-opacity"
            loading="lazy"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-3 right-3 px-2 py-1 bg-black/80 font-mono text-[9px] tracking-widest text-[#F5F5F5]/50 border border-[#262626]">
            SURABAYA // LIVE MAP
          </div>
        </div>
      </div>
    </div>
  );
}
