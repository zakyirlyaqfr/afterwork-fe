"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";

export default function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { hasSeenSplash } = useUI();

  useEffect(() => {
    if (prefersReduced) return;

    if (!hasSeenSplash) {
      // Pre-set elements to hidden starting state so they do not flash when splash dissolves
      if (image1Ref.current) {
        gsap.set(image1Ref.current, { opacity: 0, y: 70, filter: "blur(8px)" });
      }
      if (image3Ref.current) {
        gsap.set(image3Ref.current, { opacity: 0, scale: 0.9, y: 60, filter: "blur(6px)" });
      }
      if (textRef.current) {
        const h2Element = textRef.current.querySelector("h2");
        if (h2Element && h2Element.children) {
          Array.from(h2Element.children).forEach((line) => {
            gsap.set(line, { opacity: 0, y: 45, skewY: 1.2, filter: "blur(5px)" });
          });
        }
        const paragraph = textRef.current.querySelector("p");
        if (paragraph) {
          gsap.set(paragraph, { opacity: 0, y: 36, filter: "blur(4px)" });
        }
        const buttonWrapper = textRef.current.querySelector(".btn-story-wrapper");
        if (buttonWrapper) {
          gsap.set(buttonWrapper, { opacity: 0, y: 28 });
        }
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Unified scroll-driven entrance timeline: elements reveal sequentially 1-by-1
      // perfectly paced with the user's scroll with luxurious scrub inertia (eliminating tween conflicts)
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 18%",
          scrub: 1.6,
        },
      });

      // 1. Primary Left Image (Authentic Craft Serving) glides up first with gentle blur clearing
      if (image1Ref.current) {
        enterTl.fromTo(
          image1Ref.current,
          { opacity: 0, y: 70, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
          0
        );
      }

      // 2. Bold Statement Lines emerge 1 by 1 in graceful cascade
      if (textRef.current) {
        const h2Element = textRef.current.querySelector("h2");
        if (h2Element && h2Element.children) {
          const lines = Array.from(h2Element.children);
          lines.forEach((line, idx) => {
            enterTl.fromTo(
              line,
              { opacity: 0, y: 45, skewY: 1.2, filter: "blur(5px)" },
              { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", ease: "power2.out" },
              0.18 + idx * 0.16
            );
          });
        }

        // 3. Floating Companion Bottled Drinks Card emerges softly
        if (image3Ref.current) {
          enterTl.fromTo(
            image3Ref.current,
            { opacity: 0, scale: 0.90, y: 60, filter: "blur(6px)" },
            { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
            0.44
          );
        }

        // 4. Narrative Paragraph emerges softly
        const paragraph = textRef.current.querySelector("p");
        if (paragraph) {
          enterTl.fromTo(
            paragraph,
            { opacity: 0, y: 36, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
            0.68
          );
        }

        // 5. Brutalist Read More Button emerges smoothly last
        const buttonWrapper = textRef.current.querySelector(".btn-story-wrapper");
        if (buttonWrapper) {
          enterTl.fromTo(
            buttonWrapper,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.86
          );
        }
      }

      // Ghosted background watermark subtle parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, hasSeenSplash]);

  return (
    <section
      ref={sectionRef}
      id="section-editorial"
      className="relative w-full min-h-screen bg-black text-white flex items-center pt-20 px-6 sm:px-12 md:pl-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-20 overflow-visible select-none z-30"
    >
      {/* Ghosted Background Industrial Watermark - Distinct Outline Stroke Style */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-1/4 -right-16 pointer-events-none select-none text-[clamp(6rem,18vw,20rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.05)] tracking-tighter leading-none whitespace-nowrap z-0 will-change-transform"
      >
        AFTERWORK
      </div>

      {/* Abstract Deconstructed Composition Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="relative pt-6">

          {/* Upper Tier: Interlocking Visuals & Staggered Statement */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-12 relative">

            {/* Left Column: Primary Card tilted left, positioned to overlap towards sidebar */}
            <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start relative md:-ml-12 lg:-ml-20 xl:-ml-28 z-40">

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

            {/* Right Column: Statement Typography & Floating Companion Card */}
            <div className="w-full lg:w-7/12 relative flex flex-col justify-center lg:pl-6">

              {/* Avant-Garde Editorial Typography Statement & Narrative (Rendered in front at z-20) */}
              <div
                ref={textRef}
                className="relative z-20 w-full max-w-xl space-y-6 sm:space-y-8 py-2 sm:py-6 will-change-transform"
              >
                {/* Staggered Rhythm Statement */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[1.04] text-white">
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
                <div className="pt-2 btn-story-wrapper">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-4 px-8 py-4 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.25em] uppercase text-xs sm:text-sm font-sans font-black shadow-2xl cursor-pointer"
                  >
                    <span>Read More</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* Companion Landscape Card: On mobile flows cleanly below the button; On desktop floats absolute behind text */}
              <div
                ref={image3Ref}
                className="relative lg:absolute lg:right-0 lg:-top-6 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-[16/10] overflow-hidden bg-neutral-950 shadow-2xl -rotate-1 z-10 select-none mt-10 lg:mt-0 mx-auto lg:mx-0"
              >
                <Image
                  src="/images/afterwork-gofood.jpg"
                  alt="Afterwork Signature Bottled Formulas"
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  className="object-cover object-center"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
