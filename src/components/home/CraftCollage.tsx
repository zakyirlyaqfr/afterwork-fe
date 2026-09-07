"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CraftCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Abstract organic parallax with gentle counter-rotations
    if (card1Ref.current) {
      gsap.to(card1Ref.current, {
        y: -70,
        rotate: -1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (card2Ref.current) {
      gsap.to(card2Ref.current, {
        y: -130,
        rotate: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.7,
        },
      });
    }

    if (card3Ref.current) {
      gsap.to(card3Ref.current, {
        y: -90,
        rotate: -3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white pt-24 pb-48 px-6 sm:px-12 md:pl-16 md:pr-10 lg:pl-24 lg:pr-14 xl:pl-32 xl:pr-20 overflow-hidden select-none"
    >
      {/* Abstract Asymmetrical Scattered Art Collage (Completely borderless, irregular floating geometry) */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="relative flex flex-col space-y-24 lg:space-y-0">
          
          {/* Top Row: Scattered Pair (Card 1 on left, Card 3 floating far right) */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
            
            {/* Item 1: Hand Kneading Dough (Tilted left, elongated aspect) */}
            <div
              ref={card1Ref}
              className="w-full lg:w-5/12 flex flex-col space-y-3 -rotate-3 hover:rotate-0 transition-transform duration-700 will-change-transform z-10"
            >
              <div className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden bg-neutral-950 shadow-2xl group">
                <Image
                  src="/images/home/home-craft-01.jpg"
                  alt="Hand kneading artisanal pastry dough"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono pl-2">
                <span>01 // PREPARATION</span>
                <span>LAMINATION</span>
              </div>
            </div>

            {/* Item 3: Sugar Dusting Finishing (Floating high on the right, rotated slightly) */}
            <div
              ref={card3Ref}
              className="w-full lg:w-5/12 flex flex-col items-end space-y-3 lg:pt-16 rotate-2 hover:rotate-0 transition-transform duration-700 will-change-transform z-10"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] overflow-hidden bg-neutral-950 shadow-2xl group">
                <Image
                  src="/images/home/home-craft-03.jpg"
                  alt="Delicate sugar powder dusting on golden croissant"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono pr-2">
                <span>03 // FINISHING</span>
                <span>FINE DUSTING</span>
              </div>
            </div>

          </div>

          {/* Bottom Floating Row: Item 2 Staggered and Off-Center (Overlapping middle depth) */}
          <div className="w-full flex justify-center lg:justify-start lg:pl-32 lg:-mt-28 z-20">
            <div
              ref={card2Ref}
              className="w-full max-w-[520px] flex flex-col space-y-3 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 will-change-transform"
            >
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-neutral-950 shadow-2xl group">
                <Image
                  src="/images/home/home-craft-02.jpg"
                  alt="Cutting croissants on rolling workbench"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono pl-2">
                <span>02 // CRAFT</span>
                <span>PRECISION CUT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
