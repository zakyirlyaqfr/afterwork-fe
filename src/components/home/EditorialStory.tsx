"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Abstract irregular parallax offsets
    if (image1Ref.current) {
      gsap.to(image1Ref.current, {
        y: -60,
        rotate: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }

    if (image2Ref.current) {
      gsap.to(image2Ref.current, {
        y: -110,
        rotate: -2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white pt-16 pb-40 px-6 sm:px-12 md:pl-16 md:pr-10 lg:pl-24 lg:pr-14 xl:pl-32 xl:pr-20 overflow-hidden select-none"
    >
      {/* Abstract Asymmetric Composition (No lines/borders, irregular floating geometry) */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-12 relative">
          
          {/* Irregular Floating Image 1: Angled & Offset */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:pt-8">
            <div
              ref={image1Ref}
              className="relative w-full max-w-[440px] aspect-[4/5] sm:aspect-[1/1.2] overflow-hidden bg-neutral-950 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700 will-change-transform"
            >
              <Image
                src="/images/home/home-external.jpg"
                alt="Afterwork store facade architecture"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700 scale-105"
              />
            </div>
            
            <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mt-4 pl-2">
              ARCHITECTURAL FORM // 01
            </p>
          </div>

          {/* Right Column: Statement Typography & Irregular Floating Image 2 */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-16 lg:pl-4">
            
            {/* Irregular Floating Image 2: Staggered, elevated, rotated */}
            <div className="w-full flex justify-end lg:-mr-6">
              <div
                ref={image2Ref}
                className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[1/1] sm:aspect-[4/5] overflow-hidden bg-neutral-950 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 will-change-transform"
              >
                <Image
                  src="/images/home/home-cronut.jpg"
                  alt="Artisanal layered pastry on dark ceramic plate"
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  className="object-cover object-center hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Typography Statement & Narrative: Organic Asymmetrical Drift */}
            <div
              ref={textRef}
              className="w-full max-w-xl space-y-8 lg:pt-4 lg:-mt-12 will-change-transform"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[1.05] text-white">
                Afterwork is an
                <br />
                institution solely
                <br />
                dedicated to
                <br />
                the creation
                <br />
                of croissants.
              </h2>

              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed tracking-wide max-w-lg">
                Welcome to Afterwork. Each creation is much more than the sum of its ingredients. It is a precise balance of science and craft. It takes patience and time, and is the result of experimentation, refinement, and physical hard work.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 tracking-[0.2em] uppercase text-xs font-mono font-bold"
                >
                  <span>Read More</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
