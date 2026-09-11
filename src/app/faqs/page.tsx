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
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Title entrance matching Menus & Contact logic
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
        );
      }


      // 3. Scroll reveal animations on FAQ content items
      if (listRef.current) {
        const itemContainers = listRef.current.querySelectorAll(".faq-item-container");
        itemContainers.forEach((container) => {
          const text = container.querySelector(".faq-item");
          const divider = container.querySelector(".faq-divider");

          if (text) {
            gsap.fromTo(
              text,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (divider) {
            gsap.fromTo(
              divider,
              { scaleX: 0, opacity: 0 },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-32 md:pt-36 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative flex flex-col justify-between"
      style={{ paddingBottom: "clamp(6rem, 10vw, 10rem)" }}
    >
      {/* Main Content Container */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 flex-1 flex flex-col">


        {/* 1. Header Container for Title: Retained as FAQS. with signature accent */}
        <div className="menu-sticky-header mb-4 sm:mb-6">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.4rem, 0.8vw, 0.8rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              FAQS<span className="text-[#E05D29]">.</span>
            </h1>
          </div>
        </div>

        {/* 2. Lune Croissanterie Clean List Format: Centered, Cardless, Elegant Typography with Subtle Dividers */}
        <div
          className="w-full flex justify-center pb-20 sm:pb-28"
          style={{ paddingTop: "clamp(24px, 2.5vw, 36px)" }}
        >
          <div
            ref={listRef}
            className="w-full max-w-4xl flex flex-col"
          >
            {faqItems.map((item, index) => (
              <div
                key={item.id}
                className="faq-item-container w-full flex flex-col will-change-transform"
              >
                <div className="faq-item flex flex-col gap-3.5 sm:gap-4 transition-colors duration-200">
                  <h2 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tight text-white leading-snug">
                    {item.question}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 sm:text-neutral-400 leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </div>

                {/* Garis batas antar pertanyaan: panjang proporsional tidak terlalu panjang */}
                {index < faqItems.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="w-full flex items-center justify-start"
                    style={{
                      paddingTop: "clamp(28px, 4vw, 56px)",
                      paddingBottom: "clamp(28px, 4vw, 56px)",
                    }}
                  >
                    <div
                      className="faq-divider w-full max-w-3xl origin-left"
                      style={{
                        height: "1px",
                        backgroundColor: "rgba(255, 255, 255, 0.16)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
