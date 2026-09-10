"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";
import { siteLinks } from "@/config/links";

export default function ContactPage() {
  const { openLocationModal } = useUI();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 55, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }

    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 45, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }

    if (orderRef.current) {
      gsap.fromTo(
        orderRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: orderRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }

    if (channelsRef.current) {
      gsap.fromTo(
        channelsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: channelsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -90, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    }
  }, [prefersReduced]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 md:pl-10 md:pr-10 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18 selection:bg-[#E05D29] selection:text-black overflow-visible relative"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="punk-watermark top-[18%] -right-16 text-[clamp(6rem,18vw,20rem)] z-0"
      >
        CONTACT
      </div>

      <div className="w-full max-w-[1720px] relative z-10">

        {/* Title — overlaps sidebar */}
        <div ref={titleRef} className="mb-16 sm:mb-24 md:-ml-12 lg:-ml-20 xl:-ml-28 relative z-40">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88]">
            COME
            <br />
            AFTER
            <br />
            <span className="text-[#E05D29]">WORK.</span>
          </h1>
        </div>

        {/* Info Grid — punk tilted cards */}
        <div ref={infoRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20 sm:mb-28">

          {/* Location Card */}
          <div className="relative bg-[#0a0a0a] border border-[#262626] p-7 sm:p-8 -rotate-1 punk-float-a group hover:border-[#E05D29]/50 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]">
            <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E05D29]" />
            </div>
            <div className="w-8 h-8 mb-5 flex items-center justify-center border border-[#E05D29] text-[#E05D29]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <h3 className="text-base font-black text-[#F5F5F5] mb-3 uppercase tracking-tight">
              SURABAYA VENUE
            </h3>
            <p className="text-xs text-[#F5F5F5]/65 leading-relaxed mb-5">
              {siteLinks.location.address}
            </p>
            <button
              type="button"
              onClick={openLocationModal}
              className="text-xs text-[#E05D29] hover:text-[#F5F5F5] transition-colors font-bold tracking-widest uppercase"
            >
              VIEW MAP ↗
            </button>
          </div>

          {/* Hours Card */}
          <div className="relative bg-[#0a0a0a] border border-[#262626] p-7 sm:p-8 rotate-[1.2deg] punk-float-b group hover:border-[#E05D29]/50 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] sm:mt-6">
            <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E05D29]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/80" />
            </div>
            <div className="w-8 h-8 mb-5 flex items-center justify-center border border-[#E05D29] text-[#E05D29]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <h3 className="text-base font-black text-[#F5F5F5] mb-3 uppercase tracking-tight">
              OPERATING HOURS
            </h3>
            <p className="text-2xl font-black text-[#E05D29] mb-2">
              09:00 — 02:00
            </p>
            <p className="text-xs text-[#F5F5F5]/55 leading-relaxed">
              Open everyday including public holidays
            </p>
          </div>

          {/* WhatsApp Card */}
          <div className="relative bg-[#0a0a0a] border border-[#262626] p-7 sm:p-8 -rotate-[0.8deg] punk-float-c group hover:border-[#E05D29]/50 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]">
            <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E05D29]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80" />
            </div>
            <div className="w-8 h-8 mb-5 flex items-center justify-center border border-[#E05D29] text-[#E05D29]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            </div>
            <h3 className="text-base font-black text-[#F5F5F5] mb-3 uppercase tracking-tight">
              WHATSAPP
            </h3>
            <p className="text-sm text-[#F5F5F5]/65 mb-2">+62 811-3088-7158</p>
            <a
              href="https://wa.me/6281130887158"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#E05D29] hover:text-[#F5F5F5] transition-colors font-bold tracking-widest uppercase"
            >
              CHAT NOW ↗
            </a>
          </div>

          {/* Instagram Card */}
          <div className="relative bg-[#0a0a0a] border border-[#262626] p-7 sm:p-8 rotate-[1.5deg] punk-float-a group hover:border-[#E05D29]/50 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] sm:mt-4">
            <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/80" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E05D29]" />
            </div>
            <div className="w-8 h-8 mb-5 flex items-center justify-center border border-[#E05D29] text-[#E05D29]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </div>
            <h3 className="text-base font-black text-[#F5F5F5] mb-3 uppercase tracking-tight">
              INSTAGRAM
            </h3>
            <p className="text-sm text-[#F5F5F5]/65 mb-2">@afterworkcaffeine</p>
            <a
              href={siteLinks.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#E05D29] hover:text-[#F5F5F5] transition-colors font-bold tracking-widest uppercase"
            >
              FOLLOW ↗
            </a>
          </div>
        </div>

        {/* Order / Delivery Section — WhatsApp only */}
        <div
          ref={orderRef}
          className="relative mb-20 sm:mb-28 md:-ml-6 lg:-ml-14 z-40"
        >
          <div className="relative bg-[#0a0a0a] border-2 border-[#E05D29]/30 p-8 sm:p-12 lg:p-16 -rotate-[0.5deg] punk-glow-strong">
            {/* Corner Brackets */}
            <div className="absolute -inset-3 sm:-inset-4 pointer-events-none z-30">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E05D29]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/80" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/80" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E05D29]" />
            </div>

            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] uppercase text-[#E05D29] mb-6">
              <span className="font-semibold">ORDER & DELIVERY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              COFFEE
              <br />
              WHENEVER
              <br />
              <span className="text-[#E05D29]">YOU NEED IT.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#F5F5F5]/60 leading-relaxed max-w-xl mb-8">
              Pesan langsung lewat WhatsApp untuk menu, delivery, dan kebutuhanmu. Cek menu dan info lainnya di Linktree kami.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/6281130887158"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E05D29] text-black font-black text-sm tracking-[0.15em] uppercase hover:bg-[#F5F5F5] transition-all duration-300 shadow-[0_0_25px_rgba(224,93,41,0.3)]"
              >
                <span>ORDER VIA WHATSAPP</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>

              <a
                href={siteLinks.social.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#333] text-[#F5F5F5]/70 font-bold text-xs tracking-[0.15em] uppercase hover:border-[#E05D29] hover:text-[#E05D29] transition-all duration-300"
              >
                <span>SEE MENU ON LINKTREE</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Button — punk floating */}
        <div ref={channelsRef} className="flex justify-center punk-float-b">
          <button
            type="button"
            onClick={openLocationModal}
            className="group inline-flex items-center gap-4 px-10 py-4 bg-white hover:bg-[#E05D29] text-black hover:text-white border-2 border-white hover:border-[#E05D29] transition-all duration-300 tracking-[0.2em] uppercase text-xs sm:text-sm font-black shadow-2xl -rotate-1 hover:rotate-0"
          >
            <span>OPEN MAP & GPS</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
              →
            </span>
          </button>
        </div>

      </div>
    </main>
  );
}
