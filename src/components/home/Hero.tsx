"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!container || !textContainer || !imageWrapper) return;

    // Subtle scroll parallax
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

    gsap.to(imageWrapper, {
      y: -30,
      scale: 1.04,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black text-white flex items-center overflow-hidden select-none"
    >
      <div className="w-full h-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 md:pl-16 md:pr-10 lg:pl-24 lg:pr-14 xl:pl-32 xl:pr-20 py-20 lg:py-0">
        {/* Left: Exact Kinetic Looping Typography Canvas ("ORDER NOW") */}
        <div
          ref={textContainerRef}
          className="w-full lg:w-1/2 flex flex-col justify-center z-10 py-8 lg:py-0 will-change-transform"
        >
          <Link
            href="/delivery"
            className="group block focus:outline-none cursor-pointer"
            aria-label="Order Now"
          >
            <div className="hero-kinetic-container">
              <span className="hero-kinetic-word hero-kinetic-word-order">ORDER</span>
              <span className="hero-kinetic-word hero-kinetic-word-now">NOW</span>
            </div>
          </Link>
        </div>

        {/* Right: Artisanal French Croissant with glossy black reflection */}
        <div
          ref={imageWrapperRef}
          className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative pointer-events-none select-none will-change-transform mt-6 lg:mt-0"
        >
          <div className="relative w-full max-w-[480px] sm:max-w-[580px] lg:max-w-[700px] xl:max-w-[820px] aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] flex items-center justify-center">
            <Image
              src="/images/home/hero-croissant.webp"
              alt="Golden butter croissant with reflection on black surface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-contain object-center lg:object-right filter drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
