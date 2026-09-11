"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MenuItem } from "@/data/menu";
import { useUI } from "@/context/UIContext";

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
  const { setDetailModalOpen } = useUI();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Synchronize modal state with UIContext so SmoothScroll freezes background Lenis
  useEffect(() => {
    if (typeof setDetailModalOpen === "function") {
      setDetailModalOpen(isOpen);
    }
    return () => {
      if (typeof setDetailModalOpen === "function") {
        setDetailModalOpen(false);
      }
    };
  }, [isOpen, setDetailModalOpen]);

  // Reset scroll position to top (resting 2/5 state) each time modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen, item]);

  // Lock background page scroll, but allow inner scroll on the modal's text container
  useEffect(() => {
    if (!isOpen) return;

    const preventBackgroundScroll = (e: WheelEvent | TouchEvent) => {
      // If event is inside the modal's scroll container, allow scrolling the sheet!
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.contains(e.target as Node)
      ) {
        return;
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isOpen]);

  // Close handler with smooth exit animation
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
  }, [onClose]);

  // Smooth entrance animation sequence (Satu kesatuan utuh tanpa delay pecahan)
  useEffect(() => {
    if (!isOpen || !item) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Backdrop fade in
    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    }

    // 2. Modal card masuk secara utuh (foto, gradasi fade, dan teks langsung menyatu tanpa delay)
    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        "-=0.1"
      );
    }
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
      aria-labelledby="modal-item-title"
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
        Sederhana & Elegan — True Portrait Modal Card:
        - Layer Terdepan: z-[210] di atas seluruh elemen layout
        - Rasio Portrait: max-w-[390px] sm:max-w-[430px], tinggi tetap h-[600px] sm:h-[640px]
        - Awalnya: Keterangan teks mengisi ~45% bagian bawah, Foto terlihat ~55% di atas
        - Bisa di-scroll: Scroll mengangkat kotak teks menutupi foto, dan mentok tepat sehabis paragraf terakhir tanpa sisa ruang kosong
        - Tanpa garis samping pada modal
        - Tombol X minimalis tanpa kotak pembungkus
      */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative z-[210] w-full max-w-[390px] sm:max-w-[430px] h-[600px] max-h-[90dvh] sm:max-h-[94dvh] sm:h-[640px] bg-[#0D0D0D] rounded-[6px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-default select-text"
      >
        {/* Layer 1: Foto Produk di Balik Kotak Teks */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[65%] sm:h-[68%] bg-[#141414] overflow-hidden z-0 pointer-events-none rounded-t-[6px]"
        >
          <Image
            src={item.previewImage || "/images/default.jpg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 430px"
            className="object-cover object-center contrast-105"
            priority
          />

          {/* Gradien gelap halus di bagian bawah foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Tombol Tutup X Minimalis (Tanpa Row Kotak) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup pop up"
          className="absolute top-3.5 right-3.5 z-40 p-2 text-white/60 hover:text-white active:scale-90 transition-all duration-200 cursor-pointer focus:outline-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Layer 2: Wadah Scroll Interaktif (Tanpa Scrollbar)
            - Spacer transparan di atas membuat foto terlihat saat resting state
            - Kotak teks menyatu dengan box dengan efek fade lembut
            - Scroll mentok tepat sehabis paragraf terakhir tanpa menyisakan ruang kosong */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="absolute inset-0 z-20 overflow-y-auto no-scrollbar scroll-smooth flex flex-col"
        >
          {/* Spacer Transparan (54% tinggi pop up) */}
          <div
            className="w-full h-[54%] shrink-0 pointer-events-none bg-transparent"
            aria-hidden="true"
          />

          {/* Kotak Teks Keterangan:
              - Menyatu dengan box (tanpa handle bar terpisah)
              - Efek Smooth Scrim Gradient Fade lembut, halus, dan menyatu di bagian atas (persis SS)
              - Jarak sedikit lebih lebar dari batas kiri-kanan (px-8 sm:px-9) agar teks tidak terlalu dekat batas
              - Tinggi alami (tanpa min-h-full) sehingga scroll mentok di akhir teks tanpa ruang kosong */}
          <div
            ref={contentRef}
            className="w-full bg-[#0E0E0E] px-8 sm:px-9 pt-3 pb-7 sm:pb-8 flex flex-col gap-3.5 pointer-events-auto relative"
          >
            {/* Smooth Fade Transition ke Foto di atas (Smooth Scrim Curve persis SS) */}
            <div
              aria-hidden="true"
              className="absolute -top-24 sm:-top-28 left-0 right-0 h-24 sm:h-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #0E0E0E 0%, rgba(14, 14, 14, 0.98) 12%, rgba(14, 14, 14, 0.88) 25%, rgba(14, 14, 14, 0.72) 38%, rgba(14, 14, 14, 0.52) 52%, rgba(14, 14, 14, 0.32) 66%, rgba(14, 14, 14, 0.16) 78%, rgba(14, 14, 14, 0.05) 89%, rgba(14, 14, 14, 0) 100%)",
              }}
            />

            {/* 1. Judul Menu & Harga Sejajar (Ukuran Font Harga Berbeda/Lebih Kecil) */}
            <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1">
              <h2
                id="modal-item-title"
                className="text-2xl sm:text-[26px] font-black uppercase tracking-tight text-white leading-tight"
              >
                {item.name}{" "}
                <span className="inline-block text-base sm:text-lg font-mono font-bold text-[#E05D29] tracking-wider align-baseline ml-1.5 drop-shadow-[0_0_10px_rgba(224,93,41,0.35)]">
                  {item.price}
                </span>
              </h2>
            </div>

            {/* 2. Sensory Notes: Layout dari SS (Header SENSORY NOTES + Text dipisahkan '|' tanpa kotak) */}
            {item.details?.notes && (
              <div className="flex flex-col gap-1.5 pb-2.5">
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#E05D29] font-bold">
                  SENSORY NOTES
                </span>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-mono tracking-wide text-neutral-200">
                  {item.details.notes.split(",").map((note, idx, arr) => (
                    <span key={note} className="inline-flex items-center gap-2.5">
                      <span className="text-neutral-200">{note.trim()}</span>
                      {idx < arr.length - 1 && (
                        <span className="text-white/35 select-none font-sans font-light">
                          |
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Specifications: 3 Kolom dari SS, tapi tanpa kotak (batasnya garis saja, jangan dikotakkan) */}
            {(item.details?.craft || item.details?.ratio || item.details?.origin) && (
              <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-3 my-0.5">
                {item.details?.craft && (
                  <div className="flex flex-col gap-1 pr-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                      CRAFT / METHOD
                    </span>
                    <span className="text-xs text-neutral-200 font-medium leading-snug">
                      {item.details.craft}
                    </span>
                  </div>
                )}

                {item.details?.ratio && (
                  <div className="flex flex-col gap-1 px-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                      BREW RATIO
                    </span>
                    <span className="text-xs text-neutral-200 font-medium leading-snug">
                      {item.details.ratio}
                    </span>
                  </div>
                )}

                {item.details?.origin && (
                  <div className="flex flex-col gap-1 pl-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#E05D29] font-bold">
                      ORIGIN / TERROIR
                    </span>
                    <span className="text-xs text-neutral-200 font-medium leading-snug">
                      {item.details.origin}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 4. Deskripsi Menu: Keterangan Sangat Panjang dengan Formatting Editorial */}
            <div className="flex flex-col gap-1.5 pt-0.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#E05D29] font-bold">
                Artisan Story & Narrative
              </span>
              <div className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal space-y-3">
                {item.description.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-neutral-300/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
