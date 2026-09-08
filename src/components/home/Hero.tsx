"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const wordAfterRef = useRef<HTMLDivElement>(null);
  const wordWorkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const wordAfter = wordAfterRef.current;
    const wordWork = wordWorkRef.current;

    if (!container || !textContainer || !imageWrapper) return;

    // Intro Entrance Animation Sequence:
    // 1. Right image appears first with subtle scale/brightness reveal
    // 2. Left typography "AFTER WORK" appears consecutively afterwards
    const introTl = gsap.timeline();

    introTl.fromTo(
      imageWrapper,
      {
        opacity: 0,
        scale: 1.06,
        filter: "brightness(0.6)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "brightness(1)",
        duration: 0.85,
        ease: "power2.out",
      },
      0
    );

    if (wordAfter) {
      introTl.fromTo(
        wordAfter,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.5
      );
    }

    if (wordWork) {
      introTl.fromTo(
        wordWork,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.72
      );
    }

    // Subtle scroll parallax for text
    gsap.to(textContainer, {
      y: -50,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
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
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      id="section-hero"
      className="relative min-h-screen w-full bg-black text-white flex items-center overflow-hidden select-none"
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch justify-between">
        {/* Left: Minimalist Pure Typography ("AFTERWORK") */}
        <div
          ref={textContainerRef}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center z-40 px-6 sm:px-10 md:px-12 lg:px-16 py-16 lg:py-0 will-change-transform overflow-visible"
        >
          <div className="hero-afterwork-brand w-full flex flex-col items-center justify-center text-center -translate-x-6 sm:-translate-x-10 lg:-translate-x-14">
            {/* Line 1: AFTER */}
            <div
              ref={wordAfterRef}
              className="will-change-transform py-1 px-1 overflow-visible flex justify-center w-full"
            >
              <div className="hero-anim-slide-a flex justify-center w-full">
                <span className="hero-word-primary">
                  AFTER
                </span>
              </div>
            </div>

            {/* Line 2: WORK */}
            <div
              ref={wordWorkRef}
              className="will-change-transform py-1 px-1 overflow-visible flex justify-center w-full"
            >
              <div className="hero-anim-slide-b flex justify-center w-full">
                <span className="hero-word-secondary">
                  WORK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Full-height edge-to-edge image container */}
        <div
          ref={imageWrapperRef}
          className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen relative pointer-events-none select-none will-change-transform flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-[#222222]/50 mt-6 lg:mt-0 z-40"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-art.jpg"
              alt="AFTERWORK Caffeine Artwork"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
