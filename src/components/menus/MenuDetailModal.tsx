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

  // Smooth entrance animation sequence
  useEffect(() => {
    if (!isOpen || !item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Backdrop fade in
    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      );
    }

    // 2. Modal card spring-scale and slide up
    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.42 },
        "-=0.15"
      );
    }

    // 3. Image subtle zoom settle
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );
    }

    // 4. Content elements staggered reveal
    if (contentRef.current) {
      const elements = contentRef.current.children;
      tl.fromTo(
        elements,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.32, stagger: 0.05 },
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

  // Toggle expand/collapse when clicking the handle/top row
  const toggleSheetExpand = () => {
    if (!scrollContainerRef.current) return;
    const currentScroll = scrollContainerRef.current.scrollTop;
    // 3/5 spacer is ~348px (desktop 372px)
    const spacerHeight = window.innerWidth >= 640 ? 372 : 348;
    if (currentScroll < 60) {
      scrollContainerRef.current.scrollTo({
        top: spacerHeight,
        behavior: "smooth",
      });
    } else {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      data-lenis-prevent
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 select-none cursor-pointer"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={handleClose}
    >
      {/* 
        Sederhana & Elegan — True Portrait Modal Card:
        - Rasio Portrait: max-w-[390px] sm:max-w-[420px], tinggi tetap h-[580px] sm:h-[620px]
        - Awalnya: Keterangan teks mengisi 2/5 (40%) bagian bawah, Foto terlihat 3/5 (60%) di atas
        - Bisa di-scroll: Scroll mengangkat kotak teks menutupi foto secara penuh
        - Jika teks lebih panjang lagi: Teks di dalam kotak teks terus bisa di-scroll
        - Tanpa scrollbar (.no-scrollbar)
        - Harga dipindahkan rapi ke bawah judul menu (bukan di pojok atas)
        - Ujung tumpul aman: Padding horizontal & vertikal luas (px-7 sm:px-8, pb-12 sm:pb-14) agar tidak ada teks terpotong
      */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative z-[90] w-full max-w-[380px] sm:max-w-[420px] h-[580px] sm:h-[620px] bg-[#0D0D0D] border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col cursor-default select-text"
      >
        {/* Layer 1: Foto Produk di Balik Kotak Teks */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[65%] sm:h-[68%] bg-[#141414] overflow-hidden z-0 pointer-events-none"
        >
          <Image
            src={item.previewImage || "/images/default.jpg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover object-center contrast-105"
            priority
          />

          {/* Gradien gelap halus di bagian bawah foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Tombol Tutup Bulat Frosted Glass (Selalu aktif di z-40) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup pop up"
          className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/85 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none shadow-lg"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Layer 2: Wadah Scroll Interaktif (Tanpa Scrollbar)
            - Spacer transparan 3/5 di atas membuat foto terlihat saat resting state
            - Kotak teks 2/5 di bawah
            - Scroll mengangkat kotak teks menutupi foto, dan bisa terus scroll teks jika panjang */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="absolute inset-0 z-20 overflow-y-auto no-scrollbar scroll-smooth flex flex-col"
        >
          {/* Spacer Transparan 3/5 (60% tinggi pop up) */}
          <div
            className="w-full h-[348px] sm:h-[372px] shrink-0 pointer-events-none bg-transparent"
            aria-hidden="true"
          />

          {/* Kotak Teks Keterangan (Mengisi 2/5 bagian bawah saat awal, meluncur naik saat di-scroll) */}
          <div
            ref={contentRef}
            className="w-full min-h-full bg-[#0E0E0E] rounded-t-3xl border-t border-white/15 shadow-[0_-20px_40px_rgba(0,0,0,0.9)] px-7 sm:px-8 pt-3 pb-12 sm:pb-14 flex flex-col gap-3 pointer-events-auto"
          >
            {/* Handle Bar Interaktif (Bisa ditarik / diklik untuk expand) */}
            <div
              onClick={toggleSheetExpand}
              className="w-full py-1.5 flex justify-center cursor-pointer group"
              title="Klik atau scroll untuk membuka keterangan penuh"
            >
              <div className="w-10 h-1 rounded-full bg-white/25 group-hover:bg-[#E05D29] group-hover:w-14 transition-all duration-300" />
            </div>

            {/* Blok Kategori & Judul + Harga (Jarak dekat dan harga di kanan judul) */}
            <div className="flex flex-col gap-1">
              {/* Kategori Menu */}
              <div>
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#E05D29] uppercase">
                  {item.category}
                </span>
              </div>

              {/* Baris Judul Menu & Harga di Sebelah Kanan */}
              <div className="flex items-baseline justify-between gap-3">
                <h2
                  id="modal-item-title"
                  className="text-2xl sm:text-[28px] font-black uppercase tracking-tight text-white leading-tight"
                >
                  {item.name}
                </h2>
                <span className="text-xl sm:text-2xl font-mono font-black text-[#E05D29] tracking-wider shrink-0">
                  {item.price}
                </span>
              </div>
            </div>

            {/* Garis Aksen Halus */}
            <div className="w-full h-px bg-white/10 my-0.5" />

            {/* Deskripsi Menu: Keterangan Panjang dengan Ruang Baca Nyaman */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


