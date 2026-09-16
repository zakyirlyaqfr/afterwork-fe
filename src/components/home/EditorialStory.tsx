"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";
import CircularWatermark from "@/components/menus/CircularWatermark";
import { getAssetPath } from "@/utils/asset";

export default function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const circularWatermarkRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const bgTextMobileRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { hasSeenSplash, navigateTo } = useUI();

  useEffect(() => {
    if (prefersReduced) return;

    if (!hasSeenSplash) {
      // Pre-set elements to hidden starting state so they do not flash when splash dissolves
      if (circularWatermarkRef.current) {
        gsap.set(circularWatermarkRef.current, { opacity: 0, scale: 0.9 });
      }
      if (image1Ref.current) {
        gsap.set(image1Ref.current, { opacity: 0, y: 70, filter: "blur(8px)" });
      }
      if (image3Ref.current) {
        gsap.set(image3Ref.current, { opacity: 0, scale: 0.9, y: 60, filter: "blur(6px)" });
      }
      if (textRef.current) {
        const headlineLines = textRef.current.querySelectorAll("h2 > span");
        headlineLines.forEach((line) => {
          gsap.set(line, { opacity: 0, y: 45, skewY: 1.2, filter: "blur(5px)" });
        });
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
      // Responsive scroll-driven entrance timeline: elements reveal sequentially with stately choreography
      // Uses toggleActions so animation triggers reliably on mobile touch and desktop
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // 0. Circular Watermark emerges smoothly (Mobile top-left)
      if (circularWatermarkRef.current) {
        enterTl.fromTo(
          circularWatermarkRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" },
          0
        );
      }

      // 1. Companion Bottled Drinks Card (Top-right)
      if (image3Ref.current) {
        enterTl.fromTo(
          image3Ref.current,
          { opacity: 0, scale: 0.92, y: 35, filter: "blur(4px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
          0.05
        );
      }

      // 2. Primary Left Image (Authentic Craft Serving) glides up with gentle blur clearing
      if (image1Ref.current) {
        enterTl.fromTo(
          image1Ref.current,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.15, ease: "power3.out" },
          0.12
        );
      }

      // 3. Bold Statement Lines emerge 1 by 1 in graceful cascade
      if (textRef.current) {
        const headlineLines = textRef.current.querySelectorAll("h2 > span");
        headlineLines.forEach((line, idx) => {
          enterTl.fromTo(
            line,
            { opacity: 0, y: 40, skewY: 1.2, filter: "blur(5px)" },
            { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            0.2 + idx * 0.12
          );
        });

        // 4. Narrative Paragraph emerges softly
        const paragraph = textRef.current.querySelector("p");
        if (paragraph) {
          enterTl.fromTo(
            paragraph,
            { opacity: 0, y: 30, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
            0.55
          );
        }

        // 5. Brutalist Read More Button emerges smoothly last
        const buttonWrapper = textRef.current.querySelector(".btn-story-wrapper");
        if (buttonWrapper) {
          enterTl.fromTo(
            buttonWrapper,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
            0.7
          );
        }
      }

      // Ghosted background watermark subtle parallax (Desktop)
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

      // Ghosted background watermark subtle parallax (Mobile - below Read More)
      if (bgTextMobileRef.current) {
        gsap.to(bgTextMobileRef.current, {
          y: -40,
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
      className="relative w-full min-h-screen bg-black text-white flex items-center pt-16 lg:pt-20 px-4 sm:px-8 md:pl-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-20 overflow-visible select-none z-30"
    >
      {/* 
        Ghosted Background Industrial Watermark
        - Laptop Landscape (lg:): Retains original top-1/4 -right-16 positioning and stroke style (100% untouched).
      */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="hidden lg:block absolute top-1/4 -right-16 pointer-events-none select-none text-[clamp(6rem,18vw,20rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.05)] tracking-tighter leading-none whitespace-nowrap z-0 will-change-transform"
      >
        AFTERWORK
      </div>

      {/* Abstract Deconstructed Composition Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="relative pt-6">

          {/* Upper Tier: Interlocking Visuals & Staggered Statement */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-0 lg:gap-12 relative w-full">

            {/* 
              Companion Card 02 (Signature Bottled Formulas):
              - Mobile (< lg): Placed FIRST in natural flow on mobile! Sits at the top on the RIGHT side (self-end -mr-4 sm:-mr-8).
              - Laptop Landscape (lg:): Retains original lg:absolute lg:right-0 lg:-top-6 floating top-right behind text (100% untouched).
            */}
            <div
              ref={image3Ref}
              className="self-end lg:self-auto relative lg:absolute lg:right-0 lg:-top-6 -mr-4 sm:-mr-8 lg:mr-0 top-0 lg:-top-6 w-[44vw] max-w-[170px] sm:max-w-[240px] lg:w-full lg:max-w-[460px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/10] overflow-hidden bg-neutral-950 border border-r-0 border-white/10 lg:border-0 shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.9)] rotate-0 lg:-rotate-1 z-20 lg:z-10 select-none mt-0 lg:mt-0"
            >
              <Image
                src={getAssetPath("/images/afterwork-gofood.jpg")}
                alt="Afterwork Signature Bottled Formulas"
                fill
                sizes="(max-width: 1024px) 50vw, 35vw"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* 
              Primary Card 01 & Mobile Circular Watermark:
              - Mobile (< lg): Placed SECOND in flow on mobile! Sits directly below Card 02 on the LEFT side (self-start -ml-4 sm:-ml-8) with ZERO vertical gap!
                Has mb-20 sm:mb-24 on mobile to provide generous, distinct breathing room before the text container below.
              - Laptop Landscape (lg:): Retains original tilted left column (lg:w-5/12, -rotate-2, lg:-ml-20, lg:max-w-[460px], aspect-[4/5]) 100% untouched.
            */}
            <div className="w-full lg:w-5/12 self-start lg:self-auto flex flex-col items-start relative pt-0 lg:pt-0 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-20 xl:-ml-28 z-10 lg:z-40 mt-0 mb-20 sm:mb-24 lg:mt-0 lg:mb-0">

              {/* Circular Watermark (Mobile/Tablet Only - commented out temporarily per user request) */}
              {/* <div
                ref={circularWatermarkRef}
                className="block lg:hidden pl-36 sm:pl-52 md:pl-64 pt-2 pb-4 sm:pb-6 pointer-events-none select-none z-10"
              >
                <CircularWatermark
                  size={125}
                  text="AFTERWORKCAFFEINE"
                  opacity={0.65}
                  color="#ffffff"
                  outline={true}
                  fontWeight={300}
                  strokeWidth="0.65px"
                  speedFactor={0.25}
                />
              </div> */}

              {/* Primary Card 01 (Craft Serving): Clean, natural styling with NO hacky mt-60 classes! */}
              <div
                ref={image1Ref}
                className="relative w-[54vw] max-w-[215px] sm:max-w-[280px] lg:max-w-[460px] lg:w-full aspect-[328/355] lg:aspect-[4/5] overflow-hidden bg-neutral-950 border border-white/10 lg:border-0 shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.9)] rotate-0 lg:-rotate-2 z-10 lg:z-40 mt-0 lg:mt-0"
              >
                <Image
                  src={getAssetPath("/images/afterwork-glutton-1.jpg")}
                  alt="Afterwork Caffeine Craft Serving"
                  fill
                  sizes="(max-width: 1024px) 75vw, 40vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* 
              Uncollapsible breathing room between Primary Card 01 (Craft Serving) and Editorial Text Container (Mobile/Tablet only):
            */}
            <div aria-hidden="true" className="w-full h-16 sm:h-24 lg:hidden" />

            {/* 
              Editorial Statement Typography & Story Text
              - Mobile (< lg): Placed THIRD in flow below both cards with clear, generous breathing room.
              - Laptop Landscape (lg:): Retains original lg:w-7/12 relative column with pl-6 (100% untouched).
            */}
            <div className="w-full lg:w-7/12 relative z-30 flex flex-col justify-center items-center lg:items-start text-left lg:pl-6 mt-6 sm:mt-10 lg:mt-0 py-4 sm:py-6 lg:py-0">

              {/* 
                Editorial Story Text Content Container:
                - Mobile / Tablet (< lg): Compact centered container (max-w-[280px] xs:max-w-[300px] sm:max-w-[360px] md:max-w-[420px])
                  with text strictly left-aligned, matching the exact compact Lune reference proportions.
                - Laptop Landscape (lg:): Retains original lg:items-start, lg:max-w-xl, lg:mx-0, lg:px-0 100% untouched.
              */}
              <div
                ref={textRef}
                className="relative z-20 w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-xl mx-auto lg:mx-0 px-1 sm:px-2 lg:px-0 py-2 sm:py-6 pb-16 sm:pb-20 lg:pb-0 will-change-transform text-left"
              >
                {/* 
                  Mobile Editorial Statement (< lg):
                  Matches laptop landscape typography & styling exactly:
                  - Line 1: Afterwork is an
                  - Line 2: institution (text-neutral-300)
                  - Line 3: solely dedicated (italic font-light text-neutral-400 with orange left border)
                  - Line 4: to the creation
                  - Line 5: of croissants.
                */}
                <h2 className="block lg:hidden relative z-10 text-[clamp(1.3rem,5.4vw,2rem)] sm:text-4xl font-black uppercase tracking-[-0.03em] leading-[1.06] text-white">
                  <span className="block whitespace-nowrap">Lorem ipsum dolor</span>
                  <span className="block whitespace-nowrap text-neutral-300">sit amet</span>
                  <span className="block whitespace-nowrap italic font-light text-neutral-400 pl-3 sm:pl-4 border-l border-[#E05D29]/50 my-1">
                    consectetur adipiscing
                  </span>
                  <span className="block whitespace-nowrap">elit sed do</span>
                  <span className="block whitespace-nowrap text-white">eiusmod tempor.</span>
                </h2>

                {/* 
                  Desktop Editorial Statement (>= lg):
                */}
                <h2 className="hidden lg:block relative z-10 lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[1.04] text-white">
                  <span className="block">Lorem ipsum dolor</span>
                  <span className="block text-neutral-300">sit amet</span>
                  <span className="block italic font-light text-neutral-400 pl-4 sm:pl-8 border-l border-[#E05D29]/50 my-1">
                    consectetur adipiscing
                  </span>
                  <span className="block">elit sed do</span>
                  <span className="block text-white">eiusmod tempor.</span>
                </h2>

                {/* Uncollapsible Mobile Gap between bold headline and narrative text (~40px) */}
                <div aria-hidden="true" className="h-10 sm:h-12 lg:hidden" />

                {/* Narrative Text */}
                <p className="relative z-10 lg:mt-8 text-sm sm:text-base md:text-lg text-neutral-300 lg:text-neutral-400 font-light leading-relaxed tracking-wide max-w-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {/* Uncollapsible Mobile Gap between narrative text and button (~44px) */}
                <div aria-hidden="true" className="h-10 sm:h-12 lg:hidden" />

                {/* Brutalist High-Contrast Action Button - Centered on mobile (< lg), left-aligned on laptop landscape (lg:) */}
                <div className="relative z-10 lg:mt-8 lg:pt-2 btn-story-wrapper flex justify-center lg:justify-start w-full">
                  <Link
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/about");
                    }}
                    className="group inline-flex items-center gap-4 px-8 py-4 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.25em] uppercase text-xs sm:text-sm font-sans font-black shadow-2xl cursor-pointer"
                  >
                    <span>Read More</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* 
                Ghosted Industrial Watermark - Mobile (< lg) (commented out temporarily per user request):
              */}
              {/* <div className="block lg:hidden absolute -bottom-6 sm:-bottom-5 left-0 w-full pointer-events-none select-none z-0 overflow-visible">
                <div
                  ref={bgTextMobileRef}
                  aria-hidden="true"
                  className="text-[clamp(4.5rem,18vw,8.5rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)] tracking-tighter leading-[1.05] whitespace-nowrap will-change-transform"
                >
                  AFTERWORK
                </div>
              </div> */}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
