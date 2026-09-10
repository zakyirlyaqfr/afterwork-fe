"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MenuItem } from "@/data/menu";

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDetailModal({
  item,
  isOpen,
  onClose,
}: MenuDetailModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // Close handler with exit animation
  const handleClose = useCallback(() => {
    if (!modalRef.current || !backdropRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 20,
      duration: 0.22,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
      },
      "-=0.1"
    );
  }, [onClose]);

  // Entrance animation
  useEffect(() => {
    if (!isOpen || !item) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }

    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4 },
        "-=0.15"
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.4 },
        "-=0.2"
      );
    }

    if (textContentRef.current) {
      const children = textContentRef.current.children;
      tl.fromTo(
        children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 },
        "-=0.25"
      );
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, item]);

  // ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-keterangan-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleClose}
    >
      {/* Centered Vertical Modal matching 'contoh pop up.jpeg' */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md sm:max-w-lg max-h-[88vh] bg-[#0c0c0c] border border-[#2a2a2a] text-[#F5F5F5] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] punk-glow flex flex-col"
      >
        {/* Corner Brackets */}
        <div className="absolute -inset-2 pointer-events-none z-30 hidden sm:block">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E05D29]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E05D29]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-50 w-9 h-9 flex items-center justify-center bg-black/90 border border-[#333] text-[#F5F5F5] hover:text-[#E05D29] hover:border-[#E05D29] transition-colors cursor-pointer focus:outline-none"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Top Half: Image as sketched */}
        <div
          ref={imageRef}
          className="relative w-full h-[200px] sm:h-[240px] bg-[#141414] overflow-hidden shrink-0 border-b border-[#262626]"
        >
          <Image
            src={item.previewImage || "/images/default.jpg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-cover object-center contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          {/* Subtle image corner watermark */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10 font-mono text-[9px] tracking-widest text-[#F5F5F5]/60 uppercase">
            <span>AFTERWORK</span>
            <span className="text-[#E05D29]">· {item.category}</span>
          </div>
        </div>

        {/* Bottom Half: Keterangan (`ket`) — scroll adjusts dynamically to text length */}
        <div
          ref={textContentRef}
          className="p-5 sm:p-7 overflow-y-auto max-h-[calc(88vh-240px)] flex flex-col justify-between"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E05D29 #1a1a1a",
          }}
        >
          <div>
            {/* Meta Tags & Price */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] bg-[#E05D29]/15 text-[#E05D29] border border-[#E05D29]/40 uppercase">
                {item.category}
              </span>
              {item.tag && (
                <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] text-[#F5F5F5]/70 border border-[#333] uppercase">
                  {item.tag}
                </span>
              )}
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-black tracking-wider text-black bg-[#E05D29] border border-[#E05D29] ml-auto">
                {item.price}
              </span>
            </div>

            {/* Menu Name */}
            <h2
              id="modal-keterangan-title"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F5F5F5] leading-tight mb-3"
            >
              {item.name}
            </h2>

            {/* Keterangan Description */}
            <div className="mb-5">
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#F5F5F5]/40 mb-1.5">
                KETERANGAN
              </div>
              <p className="text-xs sm:text-sm text-[#F5F5F5]/85 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Detailed Craft Specs if present */}
            {item.details && (
              <div className="space-y-2 pt-3 border-t border-[#262626] text-[11px] font-mono">
                {item.details.notes && (
                  <div className="flex items-start justify-between gap-2 text-[#F5F5F5]/70">
                    <span className="text-[#F5F5F5]/40 tracking-wider text-[10px]">NOTES</span>
                    <span className="text-right text-[#F5F5F5]/90 font-medium max-w-[65%]">
                      {item.details.notes}
                    </span>
                  </div>
                )}
                {item.details.craft && (
                  <div className="flex items-start justify-between gap-2 text-[#F5F5F5]/70">
                    <span className="text-[#F5F5F5]/40 tracking-wider text-[10px]">METHOD</span>
                    <span className="text-right text-[#F5F5F5]/90 font-medium max-w-[65%]">
                      {item.details.craft}
                    </span>
                  </div>
                )}
                {item.details.temperature && (
                  <div className="flex items-center justify-between gap-2 text-[#F5F5F5]/70">
                    <span className="text-[#F5F5F5]/40 tracking-wider text-[10px]">TEMP</span>
                    <span className="text-right text-[#E05D29] font-medium">
                      {item.details.temperature}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Button at bottom of Keterangan */}
          <div className="pt-5 mt-4 border-t border-[#262626]">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 bg-[#E05D29] hover:bg-[#F5F5F5] text-black font-black text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CLOSE</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
