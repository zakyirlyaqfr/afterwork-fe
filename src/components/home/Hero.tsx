"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const wordAfterRef = useRef<HTMLDivElement>(null);
  const wordWorkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { hasSeenSplash } = useUI();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const wordAfter = wordAfterRef.current;
    const wordWork = wordWorkRef.current;

    if (!container || !textContainer || !imageWrapper) return;

    // Pre-initialize elements to their starting state before splash completes to prevent any blink/flash
    if (!hasSeenSplash) {
      gsap.set(imageWrapper, {
        opacity: 0,
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        x: 35,
        filter: "brightness(0.55) contrast(1.15) blur(4px)",
      });
      if (wordAfter) gsap.set(wordAfter, { y: 50, opacity: 0, scale: 0.96 });
      if (wordWork) gsap.set(wordWork, { y: 50, opacity: 0, scale: 0.96 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Cinematic & Tangible Entrance Sequence:
    // Starts immediately as the splash screen overlay begins dissolving
    const introTl = gsap.timeline();

    introTl.fromTo(
      imageWrapper,
      {
        opacity: 0,
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        x: 35,
        filter: "brightness(0.55) contrast(1.15) blur(4px)",
      },
      {
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        x: 0,
        filter: "brightness(1) contrast(1) blur(0px)",
        duration: 1.25,
        ease: "power3.inOut",
      },
      0
    );

    if (wordAfter) {
      introTl.fromTo(
        wordAfter,
        {
          y: 50,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        0.65
      );
    }

    if (wordWork) {
      introTl.fromTo(
        wordWork,
        {
          y: 50,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        0.85
      );
    }

    // Smooth & delicate bi-directional vertical floating scroll scrub (no scale jumping)
    gsap.to(textContainer, {
      y: -65,
      opacity: 0.75,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });

    gsap.to(imageWrapper, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });

    // Magnetic mouse movement for AFTERWORK typography
    const xAfter = wordAfter ? gsap.quickTo(wordAfter, "x", { duration: 0.8, ease: "power3.out" }) : null;
    const yAfter = wordAfter ? gsap.quickTo(wordAfter, "y", { duration: 0.8, ease: "power3.out" }) : null;
    const xWork = wordWork ? gsap.quickTo(wordWork, "x", { duration: 1.1, ease: "power3.out" }) : null;
    const yWork = wordWork ? gsap.quickTo(wordWork, "y", { duration: 1.1, ease: "power3.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (xAfter && yAfter && xWork && yWork) {
        const relX = e.clientX / window.innerWidth - 0.5;
        const relY = e.clientY / window.innerHeight - 0.5;
        xAfter(relX * 16);
        yAfter(relY * 10);
        xWork(relX * -14);
        yWork(relY * -8);
      }
    };

    const handleMouseLeave = () => {
      if (xAfter && yAfter && xWork && yWork) {
        xAfter(0);
        yAfter(0);
        xWork(0);
        yWork(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReduced, hasSeenSplash]);

  return (
    <section
      ref={containerRef}
      id="section-hero"
      className="relative min-h-screen w-full bg-black text-white flex items-center overflow-hidden select-none"
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:justify-between py-10 lg:py-0">
        {/* Left: Minimalist Pure Typography ("AFTERWORK") */}
        <div
          ref={textContainerRef}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center z-40 px-6 sm:px-10 md:px-12 lg:px-16 pt-24 sm:pt-28 lg:pt-0 pb-6 lg:pb-0 will-change-transform overflow-visible"
        >
          <div className="w-full flex flex-col items-center justify-center text-center translate-x-0 md:-translate-x-6 lg:-translate-x-14 pointer-events-none">
            {/* Tightly bounded hover container: only triggers color inversion when cursor is directly over the words */}
            <div className="hero-afterwork-brand inline-flex flex-col items-center justify-center pointer-events-auto cursor-default w-fit max-w-fit mx-auto p-0">
              {/* Line 1: AFTER */}
              <div
                ref={wordAfterRef}
                style={{ opacity: hasSeenSplash ? undefined : 0 }}
                className="will-change-transform p-0 overflow-visible flex justify-center w-fit"
              >
                <div className="hero-anim-slide-a flex justify-center w-fit p-0">
                  <span className="hero-word-primary">
                    AFTER
                  </span>
                </div>
              </div>

              {/* Line 2: WORK */}
              <div
                ref={wordWorkRef}
                style={{ opacity: hasSeenSplash ? undefined : 0 }}
                className="will-change-transform p-0 overflow-visible flex justify-center w-fit"
              >
                <div className="hero-anim-slide-b flex justify-center w-fit p-0">
                  <span className="hero-word-secondary">
                    WORK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Full-height architectural container with image shifted down slightly */}
        <div
          ref={imageWrapperRef}
          style={{ opacity: hasSeenSplash ? undefined : 0 }}
          className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen relative pointer-events-none select-none will-change-transform flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-[#222222]/50 z-40 pt-6 sm:pt-8 lg:pt-14"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-art.jpg"
              alt="AFTERWORK Caffeine Artwork"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-[center_35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
