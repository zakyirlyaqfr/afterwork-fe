"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PanoramicBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    gsap.to(img, {
      y: -70,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.3,
      },
    });
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden select-none py-16 px-4 sm:px-10 md:pl-16 md:pr-10 lg:pl-24 lg:pr-14 xl:pl-32 xl:pr-20"
    >
      {/* Abstract Asymmetric Banner Frame (Borderless, tilted perspective) */}
      <div className="relative w-full max-w-[1500px] mx-auto overflow-hidden bg-neutral-950 shadow-2xl rotate-[-0.75deg] hover:rotate-0 transition-transform duration-700">
        <div
          ref={imageRef}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.3/1] will-change-transform scale-105"
        >
          <Image
            src="/images/home/home-panoramic.jpg"
            alt="Artisanal croissant with fresh figs signature creation"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-95 contrast-105"
          />
        </div>
      </div>
    </section>
  );
}
