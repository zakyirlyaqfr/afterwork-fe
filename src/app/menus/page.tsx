"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { menuItems, menuCategories, MenuItem } from "@/data/menu";

const tiltAngles = [-2.5, 1.5, -1, 2, -1.8, 0.8, -2, 1.2, -0.5, 2.5, -1.5, 1, -2, 1.8, -0.8, 2.2];

export default function MenusPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const filteredItems =
    activeCategory === "ALL"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // Title entrance
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 55, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }

    // Filter entrance
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    // Watermark
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -80, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    }
  }, [prefersReduced]);

  // Animate grid items on filter change
  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".menu-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, ease: "power2.out",
        stagger: 0.06,
      }
    );
  }, [activeCategory, prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 md:pl-10 md:pr-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18 selection:bg-[#E05D29] selection:text-black overflow-visible relative"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[20%] -left-16 sm:-left-28 text-[clamp(6rem,18vw,20rem)] z-0"
      >
        MENUS
      </div>

      <div className="w-full max-w-[1720px] relative z-10">

        {/* Title — overlaps sidebar */}
        <div ref={titleRef} className="mb-14 sm:mb-18 md:-ml-12 lg:-ml-20 xl:-ml-28 relative z-40">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88]">
            MENUS &
            <br />
            <span className="text-[#E05D29]">BOTTLED.</span>
          </h1>
        </div>

        {/* Category Filters — punk scattered style */}
        <div ref={filterRef} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-16 sm:mb-20 select-none">
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] border-2 transition-all duration-300 -rotate-1 hover:rotate-0 hover:scale-105 ${
              activeCategory === "ALL"
                ? "bg-[#E05D29] text-black border-[#E05D29] punk-glow"
                : "border-[#333] text-[#F5F5F5]/60 hover:border-[#E05D29] hover:text-[#E05D29]"
            }`}
          >
            ALL ({menuItems.length})
          </button>
          {menuCategories.map((cat, idx) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{ transform: `rotate(${idx % 2 === 0 ? '1' : '-1'}deg)` }}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] border-2 transition-all duration-300 hover:rotate-0 hover:scale-105 ${
                activeCategory === cat
                  ? "bg-[#E05D29] text-black border-[#E05D29] punk-glow !rotate-0"
                  : "border-[#333] text-[#F5F5F5]/60 hover:border-[#E05D29] hover:text-[#E05D29]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid — punk tilted cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {filteredItems.map((item, idx) => {
            const tilt = tiltAngles[idx % tiltAngles.length];
            const shouldOverlap = idx === 0 || idx === 3;

            return (
              <div
                key={item.id}
                className={`menu-card relative group ${
                  shouldOverlap ? "md:-ml-6 lg:-ml-12 z-40" : ""
                } ${idx % 3 === 1 ? "sm:mt-8" : ""}`}
                style={{ transform: `rotate(${tilt}deg)` }}
              >
                <div className="relative bg-[#0a0a0a] border border-[#262626] p-6 sm:p-8 transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:border-[#E05D29]/50 group-hover:shadow-[0_0_30px_rgba(224,93,41,0.15)]">
                  {/* Corner Brackets */}
                  <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80" />
                  </div>

                  {/* Tag */}
                  {item.tag && (
                    <div className="inline-block px-3 py-1 mb-5 border border-[#E05D29]/40 text-[10px] font-bold tracking-[0.2em] text-[#E05D29] uppercase">
                      {item.tag}
                    </div>
                  )}

                  {/* Name */}
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F5F5F5] group-hover:text-[#E05D29] transition-colors duration-300 mb-3">
                    {item.name}
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#F5F5F5]/55 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between border-t border-[#262626] pt-4">
                    <span className="text-lg sm:text-xl font-black text-[#F5F5F5]">
                      {item.price}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#F5F5F5]/30 uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
