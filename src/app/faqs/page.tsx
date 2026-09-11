"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { faqItems } from "@/data/faq";
import CircularWatermark from "@/components/menus/CircularWatermark";

export default function FaqsPage() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

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

    if (listRef.current) {
      const items = listRef.current.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: listRef.current,
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
        className="punk-watermark top-[20%] -left-16 sm:-left-32 text-[clamp(6rem,18vw,20rem)] z-0 select-none pointer-events-none"
      >
        FAQS
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
            - Pinned di z-[78] sehingga tidak menghilang saat di-scroll */}
        <div className="menu-sticky-header mb-8 sm:mb-12">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.8rem, 1.4vw, 1.3rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              FREQUENT<br />
              <span className="text-[#E05D29]">INQUIRIES.</span>
            </h1>
          </div>
        </div>

        {/* 2. Simple, Elegant & Minimalist Accordion List dengan jarak nyaman dari judul */}
        <div
          ref={listRef}
          className="flex flex-col gap-3.5 sm:gap-4 max-w-4xl subpage-content-spacing"
        >
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="faq-item relative rounded-none transition-colors duration-200"
              >
                <div
                  className={`bg-[#0A0A0A] border transition-all duration-300 rounded-none ${
                    isOpen
                      ? "border-[#E05D29]/60 shadow-[0_4px_25px_rgba(224,93,41,0.12)]"
                      : "border-[#222222] hover:border-[#383838]"
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 group focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-xs font-mono font-bold text-[#E05D29]">
                        {item.number}
                      </span>
                      <h2
                        className={`text-sm sm:text-base md:text-lg font-black uppercase tracking-tight transition-colors duration-200 ${
                          isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </h2>
                    </div>

                    <div
                      className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 rounded-none ${
                        isOpen
                          ? "border-[#E05D29] text-[#E05D29] rotate-45"
                          : "border-neutral-700 text-neutral-400 group-hover:border-neutral-400 group-hover:text-white"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Answer Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 md:px-7 pb-6 sm:pb-7 pt-1 border-t border-white/5">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
