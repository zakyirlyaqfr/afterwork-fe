"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { faqItems } from "@/data/faq";

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
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 55, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }

    if (listRef.current) {
      const items = listRef.current.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 35, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -80, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    }
  }, [prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 md:pl-10 md:pr-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18 selection:bg-[#E05D29] selection:text-black overflow-visible relative"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[20%] -left-16 sm:-left-32 text-[clamp(6rem,18vw,20rem)] z-0"
      >
        FAQS
      </div>

      <div className="w-full max-w-[1720px] relative z-10">

        {/* Title — overlaps sidebar */}
        <div ref={titleRef} className="mb-16 sm:mb-24 md:-ml-12 lg:-ml-20 xl:-ml-28 relative z-40">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88]">
            FREQUENT
            <br />
            <span className="text-[#E05D29]">INQUIRIES.</span>
          </h1>
        </div>

        {/* FAQ Accordion — punk styled */}
        <div ref={listRef} className="flex flex-col gap-5 sm:gap-6 max-w-4xl">
          {faqItems.map((item, idx) => {
            const isOpen = openId === item.id;
            const tilt = idx % 2 === 0 ? -0.3 : 0.3;
            const shouldOverlap = idx === 0;

            return (
              <div
                key={item.id}
                className={`faq-item relative transition-all duration-500 ${
                  shouldOverlap ? "md:-ml-6 lg:-ml-12 z-40" : ""
                }`}
                style={{ transform: isOpen ? "rotate(0deg)" : `rotate(${tilt}deg)` }}
              >
                <div
                  className={`relative bg-[#0a0a0a] border-2 transition-all duration-500 ${
                    isOpen
                      ? "border-[#E05D29]/50 punk-glow"
                      : "border-[#1a1a1a] hover:border-[#333]"
                  }`}
                >
                  {/* Corner brackets on active */}
                  {isOpen && (
                    <div className="absolute -inset-2.5 pointer-events-none z-30">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E05D29]" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/80" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/80" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E05D29]" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-6 group focus:outline-none"
                  >
                    <h2
                      className={`text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-300 leading-tight ${
                        isOpen
                          ? "text-[#E05D29]"
                          : "text-[#F5F5F5] group-hover:text-[#E05D29]"
                      }`}
                    >
                      {item.question}
                    </h2>

                    <div
                      className={`shrink-0 w-8 h-8 flex items-center justify-center border-2 transition-all duration-300 ${
                        isOpen
                          ? "border-[#E05D29] text-[#E05D29] rotate-45"
                          : "border-[#333] text-[#F5F5F5]/50 group-hover:border-[#E05D29] group-hover:text-[#E05D29]"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#262626] pt-5">
                      <p className="text-sm sm:text-base text-[#F5F5F5]/70 leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                      {item.category && (
                        <span className="inline-block mt-5 px-3 py-1 border border-[#E05D29]/30 text-[10px] text-[#E05D29] tracking-[0.2em] uppercase font-bold">
                          {item.category}
                        </span>
                      )}
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
