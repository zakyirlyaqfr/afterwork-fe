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
  const image3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Smooth subtle entrance scroll animations for Section 2 elements (no collision)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    if (image1Ref.current) {
      tl.fromTo(
        image1Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        0
      );
    }

    if (image3Ref.current) {
      tl.fromTo(
        image3Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 0.75, y: 0, duration: 1.0, ease: "power2.out" },
        0.15
      );
    }

    if (textRef.current) {
      const textElements = textRef.current.children;
      tl.fromTo(
        textElements,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" },
        0.2
      );
    }

    // Ghosted background watermark subtle parallax
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="section-editorial"
      className="relative w-full min-h-screen bg-black text-white flex items-center py-20 px-6 sm:px-12 md:pl-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-20 overflow-visible select-none z-30"
    >
      {/* Ghosted Background Industrial Watermark */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-1/4 -right-16 pointer-events-none select-none text-[clamp(6rem,18vw,20rem)] font-black uppercase text-white/[0.025] tracking-tighter leading-none whitespace-nowrap z-0 will-change-transform"
      >
        AFTERWORK
      </div>

      {/* Abstract Deconstructed Composition Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="relative pt-6">

          {/* Upper Tier: Interlocking Visuals & Staggered Statement */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-12 relative">

            {/* Left Column: Primary Card tilted left, positioned to overlap towards sidebar */}
            <div className="w-full lg:w-5/12 flex flex-col items-start relative md:-ml-12 lg:-ml-20 xl:-ml-28 z-40">

              {/* Primary Card 01: Authentic Afterwork Caffeine Table Setting - Maju ke layer depan (z-40) diatas sidebar */}
              <div
                ref={image1Ref}
                className="relative w-full max-w-[460px] aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-neutral-950 shadow-2xl -rotate-2 z-40"
              >
                <Image
                  src="/images/afterwork-glutton-1.jpg"
                  alt="Afterwork Caffeine Craft Serving"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

            </div>

            {/* Right Column: Statement Typography & Floating Companion Card BEHIND the text */}
            <div className="w-full lg:w-7/12 relative flex flex-col justify-center lg:pl-6">

              {/* Floating Asymmetric Landscape Card: Authentic Afterwork Bottled Formulas - BEHIND THE TEXT (z-0) */}
              <div
                ref={image3Ref}
                className="absolute right-0 top-0 sm:-top-4 lg:-top-6 w-full max-w-[380px] sm:max-w-[460px] aspect-[16/10] overflow-hidden bg-neutral-950 shadow-2xl -rotate-1 z-0 pointer-events-none select-none opacity-60 sm:opacity-75"
              >
                <Image
                  src="/images/afterwork-gofood.jpg"
                  alt="Afterwork Signature Bottled Formulas"
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              </div>

              {/* Avant-Garde Editorial Typography Statement & Narrative (Rendered in front at z-20) */}
              <div
                ref={textRef}
                className="relative z-20 w-full max-w-xl space-y-8 py-6 sm:py-8 will-change-transform"
              >
                {/* Staggered Rhythm Statement */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[1.04] text-white">
                  <span className="block">Afterwork is an</span>
                  <span className="block text-neutral-300">institution</span>
                  <span className="block italic font-light text-neutral-400 pl-4 sm:pl-8 border-l border-[#E05D29]/50 my-1">
                    solely dedicated
                  </span>
                  <span className="block">to the creation</span>
                  <span className="block text-white">of croissants.</span>
                </h2>

                {/* Narrative Text */}
                <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed tracking-wide max-w-lg">
                  Welcome to Afterwork. Each creation is much more than the sum of its ingredients. It is a precise balance of science and craft. It takes patience and time, and is the result of experimentation, refinement, and physical hard work.
                </p>

                {/* Brutalist High-Contrast Action Button */}
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-4 px-8 py-4 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.25em] uppercase text-xs sm:text-sm font-sans font-black shadow-2xl cursor-pointer"
                  >
                    <span>Read More</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
                      →
                    </span>
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
