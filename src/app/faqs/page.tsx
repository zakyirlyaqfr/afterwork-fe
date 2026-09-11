"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { faqItems } from "@/data/faq";

export default function FaqsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-32 md:pt-32 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative flex flex-col justify-between"
      style={{ paddingBottom: "clamp(3rem, 6vw, 6rem)" }}
    >
      {/* Background Typography Watermark: Changed from FAQS to FREQUENT INQUIRIES */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[16%] -left-8 sm:-left-16 text-[clamp(4.5rem,11vw,12rem)] z-0 select-none pointer-events-none opacity-50"
      >
        FREQUENT INQUIRIES
      </div>

      {/* Main Content Container — Centered, single page height without excessive scroll */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 flex-1 flex flex-col">

        {/* 1. Header Container for Title: Changed from FREQUENT INQUIRIES to FAQS. */}
        <div className="menu-sticky-header mb-6 sm:mb-8">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.4rem, 0.8vw, 0.8rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              <span className="text-[#E05D29]">FAQS.</span>
            </h1>
          </div>
        </div>

        {/* 2. All FAQ Items Open Directly, Centered, Clean 2-Column Grid to Fit 1 Page */}
        <div
          ref={listRef}
          className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 subpage-content-spacing !mt-4 !pt-0"
        >
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="faq-item bg-[#0A0A0A] border border-[#222222] hover:border-[#383838] transition-colors p-5 sm:p-6 rounded-none flex flex-col justify-between gap-3 shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <span className="text-xs font-mono font-bold text-[#E05D29] shrink-0 mt-0.5">
                  {item.number}
                </span>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-white leading-snug">
                  {item.question}
                </h2>
              </div>

              <div className="pl-7 pt-1 border-t border-white/5">
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
