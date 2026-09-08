"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const spoilerItems = [
  { id: 1, label: "ARCHIVE // 01", alt: "Afterwork Visual Archive 01" },
  { id: 2, label: "ARCHIVE // 02", alt: "Afterwork Visual Archive 02" },
  { id: 3, label: "ARCHIVE // 03", alt: "Afterwork Visual Archive 03" },
  { id: 4, label: "ARCHIVE // 04", alt: "Afterwork Visual Archive 04" },
  { id: 5, label: "ARCHIVE // 05", alt: "Afterwork Visual Archive 05" },
];

export default function CraftCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="section-craft"
      className="relative w-full min-h-[85vh] bg-black text-white flex flex-col justify-center py-20 px-6 sm:px-10 md:px-12 lg:px-16 overflow-visible select-none z-30"
    >
      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col space-y-10">
        {/* Horizontal Scrolling Spoiler Gallery */}
        <div className="w-full overflow-x-auto no-scrollbar scroll-smooth py-4">
          <div className="flex flex-row items-center gap-6 sm:gap-8 pb-4 min-w-max">
            {spoilerItems.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative w-[260px] sm:w-[290px] md:w-[320px] aspect-[3/4] flex-shrink-0 overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
              >
                <Image
                  src="/images/default.jpg"
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Minimal Archive Number Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button to Full Gallery */}
        <div ref={buttonRef} className="w-full flex justify-center pt-2">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.25em] uppercase text-xs sm:text-sm font-sans font-black shadow-2xl cursor-pointer"
          >
            <span>Explore Full Gallery</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
