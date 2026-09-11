"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";
import CircularWatermark from "@/components/menus/CircularWatermark";

export default function ContactPage() {
  const { openLocationModal } = useUI();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // Title entrance matching Menus logic
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    }
  }, [prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-32 md:pt-32 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative"
      style={{ paddingBottom: "clamp(6rem, 12vw, 12rem)" }}
    >
      {/* Background Typography Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[22%] -right-16 text-[clamp(6rem,18vw,20rem)] z-0 select-none pointer-events-none"
      >
        CONTACT
      </div>

      {/* 
        Stationary Fixed Palette Gray Watermarks:
        - Positioned fixed in viewport, stays during scroll
        - Multiple watermarks: Bottom-left and Top-right circular watermarks
        - Color: Palette gray (#404040 / #383838)
      */}
      {/* 1. Fixed Bottom-Left Rotating Watermark */}
      <div
        aria-hidden="true"
        className="fixed bottom-6 left-[-50px] md:left-[-80px] pointer-events-none z-10 select-none"
      >
        <CircularWatermark
          size={370}
          color="#404040"
          opacity={0.35}
          scrollDriven
          speedFactor={0.25}
          direction="clockwise"
        />
      </div>

      {/* 2. Fixed Top-Right Counter-Rotating Watermark */}
      <div
        aria-hidden="true"
        className="fixed top-28 right-[-50px] md:right-[-80px] pointer-events-none z-10 select-none hidden sm:block"
      >
        <CircularWatermark
          size={330}
          color="#383838"
          opacity={0.28}
          scrollDriven
          speedFactor={0.22}
          direction="counterclockwise"
        />
      </div>

      {/* Main Content Container — with pb-[25vh] for comfortable distance from footer */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 pb-[25vh]">

        {/* 1. Header Container for Title
            - Menggunakan logic yang sama dengan fitur Menus:
            - Sticky dan transparan (.menu-sticky-header)
            - Pinned di z-[78] sehingga tidak menghilang saat di-scroll atau membuka modal */}
        <div className="menu-sticky-header mb-8 sm:mb-12">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.8rem, 1.4vw, 1.3rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              COME<br />
              AFTER<br />
              <span className="text-[#E05D29]">WORK.</span>
            </h1>
          </div>
        </div>

        {/* 2. Content Cards — Clean, Simple & Rapi dengan jarak nyaman dari judul dan footer */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-14 sm:mb-20 subpage-content-spacing"
        >
          {/* Card 1: Venue & Location */}
          <div className="bg-[#0A0A0A] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between rounded-none shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#E05D29] uppercase font-bold">
                01 / VENUE
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-3 mb-4">
                SURABAYA
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {siteLinks.location.address}
              </p>
              <p className="text-xs font-mono text-[#E05D29] mt-3 font-semibold">
                Open 09:00 — 02:00 Everyday
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1F1F1F]">
              <button
                type="button"
                onClick={openLocationModal}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer"
              >
                <span>OPEN LOCATION MAP</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp Direct */}
          <div className="bg-[#0A0A0A] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between rounded-none shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#E05D29] uppercase font-bold">
                02 / DIRECT LINE
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-3 mb-4">
                WHATSAPP
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Pesan langsung untuk delivery, reservasi malam, atau pertanyaan seputar menu kopi kami.
              </p>
              <p className="text-sm font-mono text-white mt-3 font-bold">
                +62 811-3088-7158
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1F1F1F]">
              <a
                href="https://wa.me/6281130887158"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer"
              >
                <span>START CHAT</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 3: Social & Community */}
          <div className="bg-[#0A0A0A] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between rounded-none shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#E05D29] uppercase font-bold">
                03 / SOCIAL
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-3 mb-4">
                INSTAGRAM
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Ikuti update batch sangrai kopi harian, agenda malam, dan dokumentasi visual Afterwork.
              </p>
              <p className="text-sm font-mono text-white mt-3 font-bold">
                @afterworkcaffeine
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1F1F1F]">
              <a
                href={siteLinks.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer"
              >
                <span>FOLLOW FEED</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Simple & Elegant Order Section */}
        <div
          ref={ctaRef}
          className="bg-[#0D0D0D] border border-white/10 p-8 sm:p-12 md:p-14 rounded-none flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#E05D29] uppercase font-bold">
              NIGHT SHIFT FUEL
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              COFFEE WHENEVER YOU NEED IT.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
              Siap melayani seduhan kopi berkualitas dan hidangan hangat setiap malam hingga pukul 02:00 pagi.
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5 shrink-0">
            <a
              href="https://wa.me/6281130887158"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#E05D29] text-black text-xs font-black tracking-[0.16em] uppercase hover:bg-white transition-colors cursor-pointer"
            >
              ORDER VIA WHATSAPP ↗
            </a>

            <button
              type="button"
              onClick={openLocationModal}
              className="px-6 py-3.5 border border-white/20 text-white text-xs font-black tracking-[0.16em] uppercase hover:border-[#E05D29] hover:text-[#E05D29] transition-colors cursor-pointer"
            >
              LOCATION MAP ↗
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
