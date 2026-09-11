"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { aboutAssets } from "@/data/assets";

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);

  // Section 1 refs
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec1ImgRef = useRef<HTMLDivElement>(null);
  const sec1TitleRef = useRef<HTMLHeadingElement>(null);

  // Section 2 refs
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec2WatermarkRef = useRef<HTMLDivElement>(null);
  const sec2TextRef = useRef<HTMLDivElement>(null);
  const sec2ImgRef = useRef<HTMLDivElement>(null);

  // Section 3 refs
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec3Img1Ref = useRef<HTMLDivElement>(null);
  const sec3Img2Ref = useRef<HTMLDivElement>(null);
  const sec3TextRef = useRef<HTMLDivElement>(null);
  const sec3WatermarkRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // SECTION 1 ANIMATIONS: Centered Image + Joined Title Overlay
      // -------------------------------------------------------------
      if (sec1ImgRef.current) {
        gsap.fromTo(
          sec1ImgRef.current,
          { opacity: 0, scale: 0.92, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }

      if (sec1TitleRef.current) {
        gsap.fromTo(
          sec1TitleRef.current,
          { opacity: 0, y: 35, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            delay: 0.35,
            ease: "power3.out",
          }
        );
      }

      // Parallax scroll on Section 1
      if (sec1Ref.current && sec1ImgRef.current) {
        gsap.to(sec1ImgRef.current, {
          y: 45,
          ease: "none",
          scrollTrigger: {
            trigger: sec1Ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      // -------------------------------------------------------------
      // SECTION 2 ANIMATIONS: Full-Page Experience (Homepage Watermark + Tilted Image)
      // -------------------------------------------------------------
      if (sec2Ref.current) {
        // Watermark "AFTERWORK" parallax scrub matching homepage
        if (sec2WatermarkRef.current) {
          gsap.to(sec2WatermarkRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: sec2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        }

        // Left text block entrance with stagger on abstract items
        if (sec2TextRef.current) {
          const items = sec2TextRef.current.querySelectorAll(".abstract-text-item");
          gsap.fromTo(
            items.length > 0 ? items : sec2TextRef.current,
            { opacity: 0, y: 35, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec2Ref.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Large tilted image entrance
        if (sec2ImgRef.current) {
          gsap.fromTo(
            sec2ImgRef.current,
            { opacity: 0, y: 35, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.3,
              delay: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec2Ref.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // -------------------------------------------------------------
      // SECTION 3 ANIMATIONS: Dual Overlapping Images per Sketch
      // -------------------------------------------------------------
      if (sec3Ref.current) {
        // Image 1 (Top-Left, level, stretching to sidebar)
        if (sec3Img1Ref.current) {
          gsap.fromTo(
            sec3Img1Ref.current,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 1.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec3Ref.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Image 2 (Overlapping, tilted clockwise 7deg)
        if (sec3Img2Ref.current) {
          gsap.fromTo(
            sec3Img2Ref.current,
            { opacity: 0, y: 35, rotation: 7, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              rotation: 7,
              filter: "blur(0px)",
              duration: 1.4,
              delay: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec3Ref.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Watermark logo subtle parallax
        if (sec3WatermarkRef.current) {
          gsap.to(sec3WatermarkRef.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sec3Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        }

        // Right text block
        if (sec3TextRef.current) {
          gsap.fromTo(
            sec3TextRef.current,
            { opacity: 0, y: 45, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.3,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec3Ref.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, mainRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-black text-[#F5F5F5] pb-56 sm:pb-68 lg:pb-80 px-6 sm:px-10 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-visible relative"
    >
      <div className="w-full max-w-[1500px] mx-auto relative z-10">

        {/* =================================================================== */}
        {/* SECTION 1: HERO TITLE & CENTERED PORTRAIT IMAGE                    */}
        {/* =================================================================== */}
        <section
          ref={sec1Ref}
          aria-label="About Hero"
          className="h-screen min-h-[640px] flex flex-col items-center justify-center relative mb-44 sm:mb-56 lg:mb-64 select-none"
        >
          {/* Centered Image & Overlaid Title Container — Perfectly centered top & bottom */}
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[490px] mx-auto flex items-center justify-center optical-center-viewport">

            {/* Centered Portrait Image */}
            <div
              ref={sec1ImgRef}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-neutral-950 shadow-[0_35px_80px_rgba(0,0,0,0.95)] border border-neutral-800 will-change-transform"
            >
              {/* Corner Brackets */}
              <div className="absolute -inset-2.5 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/90" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#E05D29]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#E05D29]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/90" />
              </div>

              <Image
                src={aboutAssets.hero.src}
                alt="About Afterwork"
                width={aboutAssets.hero.width}
                height={aboutAssets.hero.height}
                priority
                className="w-full h-full object-cover"
              />

              {/* Subtle vignette layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none" />
            </div>

            {/* Overlaid Title Text — Tetap diatas image, tipografi menarik, bersih tanpa badge/koordinat/01 */}
            <h1
              ref={sec1TitleRef}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 select-none px-2 text-center"
            >
              {/* Line 1: ABOUT - High-End Wide Tracking Architectural Stroke */}
              <span className="block text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.2rem] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.95)] tracking-[0.14em] sm:tracking-[0.18em] leading-[0.85] drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]">
                ABOUT
              </span>

              {/* Line 2: AFTERWORK - Solid Bold White + Signature Italic Serif Orange */}
              <span className="flex items-baseline justify-center -mt-2 sm:-mt-4 lg:-mt-6 drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
                <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-black uppercase text-white tracking-tight leading-[0.85]">
                  AFTER
                </span>
                <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-serif italic font-light text-[#E05D29] tracking-tight leading-[0.85] ml-2 sm:ml-3 drop-shadow-[0_0_35px_rgba(224,93,41,0.35)]">
                  WORK
                </span>
              </span>
            </h1>

          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: FULL-PAGE STANDALONE EXPERIENCE                         */}
        {/* Watermark Putih Awal dari kiri menimpa sidebar + Teks Abstrak Animasi*/}
        {/* =================================================================== */}
        <section
          ref={sec2Ref}
          aria-label="About Philosophy"
          className="min-h-screen flex flex-col justify-center relative py-28 sm:py-36 md:py-44 mt-44 sm:mt-56 lg:mt-64 my-32 sm:my-48 overflow-visible"
        >
          {/* Watermark "AFTERWORK" — Warna outline awal (putih), menimpa sidebar dari kiri, melintasi di belakang gambar */}
          <div
            ref={sec2WatermarkRef}
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-20 md:-left-36 lg:-left-52 xl:-left-64 pointer-events-none select-none text-[clamp(7rem,21vw,23rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.12)] tracking-tighter leading-none whitespace-nowrap z-0 will-change-transform"
          >
            AFTERWORK
          </div>

          <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Kolom Kiri: Teks Abstrak Deconstructed dengan Animasi */}
            <div
              ref={sec2TextRef}
              className="lg:col-span-5 relative z-10 punk-float-b"
            >
              <div className="space-y-6">

                {/* Abstract Deconstructed Headline */}
                <div className="space-y-2">
                  <div className="abstract-text-item flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                      LOREM
                    </span>
                    <span className="text-2xl sm:text-4xl lg:text-5xl font-light italic uppercase text-[#E05D29] -rotate-2 pl-2">
                      IPSUM
                    </span>
                  </div>

                  <div className="abstract-text-item flex items-baseline gap-3 pl-4 sm:pl-8 border-l-2 border-[#E05D29]/60">
                    <span className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)]">
                      DOLOR
                    </span>
                    <span className="text-xl sm:text-3xl lg:text-4xl font-light uppercase tracking-widest text-[#E05D29]">
                      SIT AMET
                    </span>
                  </div>
                </div>

                {/* Abstract Paragraph Composition */}
                <div className="abstract-text-item space-y-4 pt-2">
                  <p className="text-sm sm:text-base text-[#F5F5F5]/75 font-light leading-relaxed max-w-md -rotate-[0.5deg]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tellus vel nisl finibus, in porta velit placerat. Integer lacinia magna eu elit ullamcorper, et tempor neque pellentesque.
                  </p>

                  <div className="pl-6 sm:pl-8 relative border-l border-white/15">
                    <p className="text-xs sm:text-sm text-[#F5F5F5]/50 font-mono leading-relaxed max-w-sm rotate-[0.5deg]">
                      Vivamus dictum hendrerit sem, non elementum neque efficitur a. Cras sed nisi sit amet dolor porta lacinia eleifend sit amet nec felis.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Kolom Kanan: Image Miring & Beranimasi */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start lg:-ml-6 xl:-ml-10">
              <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[680px]">
                {/* Tilted Image with Animation */}
                <div
                  ref={sec2ImgRef}
                  className="relative z-10 w-full punk-float-tilt-right"
                >
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-neutral-950 border border-[#262626] shadow-[0_30px_70px_rgba(0,0,0,0.95)] punk-glow group">
                    {/* Corner Brackets */}
                    <div className="absolute -inset-2.5 pointer-events-none z-20">
                      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/90" />
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#E05D29]" />
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#E05D29]" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/90" />
                    </div>

                    <Image
                      src={aboutAssets.interior.src}
                      alt="Afterwork Craft Interior"
                      width={aboutAssets.interior.width}
                      height={aboutAssets.interior.height}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: STANDALONE FULL-PAGE EXPERIENCE SESUAI SKETSA             */}
        {/* Image 1 Memanjang ke Kiri Menimpa Sidebar + Sedikit Gelap (Tanpa Blur)*/}
        {/* =================================================================== */}
        <section
          ref={sec3Ref}
          aria-label="About Culture"
          className="min-h-screen flex flex-col justify-center relative py-24 sm:py-32 lg:py-40 mt-32 sm:mt-44 mb-56 sm:mb-68 lg:mb-80 overflow-visible"
        >
          {/* Ghosted Logo Watermark — Di antara image dan text, mengarah ke text sedikit */}
          <div
            ref={sec3WatermarkRef}
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 left-[46%] sm:left-[50%] lg:left-[54%] w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] pointer-events-none select-none opacity-[0.10] sm:opacity-[0.13] z-0 will-change-transform"
          >
            <Image
              src="/brand/logo-short-white.png"
              alt="Afterwork Logo Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

            {/* Kolom Kiri: 2 Gambar Bertumpuk sesuai Sketsa (Image 1 Memanjang ke Kiri Menimpa Sidebar, Sedikit Gelap, Tanpa Blur) */}
            <div className="md:col-span-7 relative flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[640px] sm:max-w-[700px] lg:max-w-[820px] xl:max-w-[900px] h-[380px] sm:h-[440px] md:h-[480px] lg:h-[540px] xl:h-[580px] md:-ml-16 lg:-ml-28 xl:-ml-36">

                {/* Image 1: Top-Left Landscape Card (Memanjang ke Kiri Menimpa Sidebar, Sedikit Gelap, Tanpa Blur) */}
                <div
                  ref={sec3Img1Ref}
                  className="absolute top-0 left-0 sm:-left-6 md:-left-24 lg:-left-36 xl:-left-44 w-[90%] sm:w-[88%] lg:w-[90%] aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-neutral-950 border border-neutral-700/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-20 will-change-transform group"
                >
                  {/* Corner Brackets */}
                  <div className="absolute -inset-2.5 pointer-events-none z-20">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/70" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E05D29]/70" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E05D29]/70" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/70" />
                  </div>

                  <Image
                    src={aboutAssets.interior.src}
                    alt="Afterwork Interior Space"
                    width={aboutAssets.interior.width}
                    height={aboutAssets.interior.height}
                    className="w-full h-full object-cover filter brightness-[0.68] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Darkening tint overlay extending towards sidebar (tanpa blur) */}
                  <div className="absolute inset-0 bg-black/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Image 2: Bottom-Right Overlapping Card (Jernih & Sharp di Depan, Tilted 7deg) */}
                <div
                  ref={sec3Img2Ref}
                  className="absolute right-0 sm:right-2 bottom-0 sm:bottom-2 lg:bottom-4 w-[60%] sm:w-[56%] lg:w-[58%] aspect-[4/3] overflow-hidden bg-neutral-950 border-2 border-neutral-700 shadow-[0_30px_70px_rgba(0,0,0,0.98)] rotate-[5deg] md:rotate-[7deg] hover:rotate-[3deg] transition-all duration-500 z-30 will-change-transform group"
                >
                  {/* Corner Brackets */}
                  <div className="absolute -inset-2.5 pointer-events-none z-20">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E05D29]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/90" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/90" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E05D29]" />
                  </div>

                  <Image
                    src={aboutAssets.night.src}
                    alt="Afterwork Night Atmosphere"
                    width={aboutAssets.night.width}
                    height={aboutAssets.night.height}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

            {/* Kolom Kanan: Teks Penjelasan Lorem Ipsum */}
            <div
              ref={sec3TextRef}
              className="md:col-span-5 space-y-6"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F5] leading-[1.08]">
                CONSECTETUR
                <br />
                <span className="text-[#E05D29]">ADIPISCING ELIT.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#F5F5F5]/70 leading-relaxed max-w-lg">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>

              <p className="text-xs sm:text-sm text-[#F5F5F5]/45 leading-relaxed max-w-lg">
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
              </p>

              <p className="text-xs sm:text-sm text-[#F5F5F5]/35 leading-relaxed max-w-lg font-mono">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
