"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUI } from "@/context/UIContext";

export default function ContactPage() {
  const { openLocationModal } = useUI();
  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const venuesRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Form State: Only the exact fields requested
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const main = mainRef.current;
    if (!main) return;

    // 1. Title entrance matching Menus logic exactly
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
    }

    // 2. Parallax scroll animation on watermark matching homepage
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: main,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    }

    // 3. Venue rows reveal animation
    if (venuesRef.current) {
      const rows = venuesRef.current.children;
      gsap.fromTo(
        rows,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: venuesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 4. WhatsApp & Instagram reveal animation
    if (channelsRef.current) {
      gsap.fromTo(
        channelsRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: channelsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 5. Contact Form entrance reveal
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 35, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [prefersReduced]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-28 sm:pt-32 md:pt-36 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative flex flex-col"
      style={{ paddingBottom: "clamp(6rem, 10vw, 10rem)" }}
    >
      {/* Background Typography Watermark: Restored to original position and style */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="fixed select-none pointer-events-none z-0 will-change-transform"
        style={{
          top: "clamp(150px, 20vw, 260px)",
          right: "clamp(-20px, 4vw, 60px)",
          fontSize: "clamp(5.5rem, 16vw, 20rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.12)",
        }}
      >
        CONTACT
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 flex-1 flex flex-col">

        {/* =================================================================== */}
        {/* Page Title: Follows Menus page logic and position (Sticky Header)   */}
        {/* =================================================================== */}
        {/* =================================================================== */}
        {/* Page Title: Follows Menus page logic and position (Sticky Header)   */}
        {/* =================================================================== */}
        <div className="menu-sticky-header mb-4 sm:mb-6">
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.4rem, 0.8vw, 0.8rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              COME AFTERWORK<span className="text-[#E05D29]">.</span>
            </h1>
          </div>
        </div>

        {/* =================================================================== */}
        {/* Content Body: Centered in the page, pulled up with half spacing     */}
        {/* =================================================================== */}
        <div
          className="w-full flex justify-center pt-4 sm:pt-6 md:pt-8 pb-20 sm:pb-28"
        >
          <div
            className="w-full max-w-4xl flex flex-col"
            style={{ gap: "clamp(32px, 4vw, 56px)" }}
          >

            {/* =============================================================== */}
            {/* 1. Locations: Lune Croissanterie 2-Column Format (Tanpa Garis)   */}
            {/* =============================================================== */}
            <div
              ref={venuesRef}
              className="w-full flex flex-col"
              style={{ gap: "clamp(16px, 2vw, 24px)" }}
            >
              {/* Location 1: G-Walk Citraland */}
              <div
                className="grid grid-cols-1 md:grid-cols-[1.16fr_0.84fr] gap-6 md:gap-10 text-left"
                style={{ paddingTop: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(16px, 2vw, 24px)" }}
              >
                {/* Left Column: Name & City, Address, Map Action */}
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  <div className="flex items-baseline gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      G-WALK CITRALAND
                    </h2>
                    <span className="text-xs font-mono tracking-[0.28em] text-[#E05D29] uppercase font-bold shrink-0">
                      SURABAYA
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm">
                    Ruko G-Walk Citraland, Jl. Niaga Gapura No. FG-19, Surabaya, Jawa Timur 60213
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => openLocationModal(0)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer group"
                    >
                      <span className="border-b border-neutral-700 group-hover:border-white pb-0.5 transition-colors">
                        OPEN LOCATION MAP
                      </span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Operating Hours (Lune Style) */}
                <div className="flex md:items-start md:pt-6">
                  <p className="text-sm sm:text-base font-mono text-[#E05D29] sm:text-neutral-300 font-semibold tracking-wide">
                    Open 09:00 — 02:00 Everyday
                  </p>
                </div>
              </div>

              {/* Location 2: Foremost Padel Club */}
              <div
                className="grid grid-cols-1 md:grid-cols-[1.16fr_0.84fr] gap-6 md:gap-10 text-left"
                style={{ paddingTop: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(16px, 2vw, 24px)" }}
              >
                {/* Left Column: Name & City, Address, Map Action */}
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  <div className="flex items-baseline gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      FOREMOST PADEL CLUB
                    </h2>
                    <span className="text-xs font-mono tracking-[0.28em] text-[#E05D29] uppercase font-bold shrink-0">
                      SURABAYA
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm">
                    Foremost Padel Club, Jl. Gayung Kebonsari, Gayungan, Surabaya, Jawa Timur 60235
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => openLocationModal(1)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer group"
                    >
                      <span className="border-b border-neutral-700 group-hover:border-white pb-0.5 transition-colors">
                        OPEN LOCATION MAP
                      </span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Operating Hours (Lune Style) */}
                <div className="flex md:items-start md:pt-6">
                  <p className="text-sm sm:text-base font-mono text-[#E05D29] sm:text-neutral-300 font-semibold tracking-wide">
                    Open 07:00 — 23:00 Everyday
                  </p>
                </div>
              </div>

              {/* Location 3: Sanur Bali */}
              <div
                className="grid grid-cols-1 md:grid-cols-[1.16fr_0.84fr] gap-6 md:gap-10 text-left"
                style={{ paddingTop: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(16px, 2vw, 24px)" }}
              >
                {/* Left Column: Name & City, Address, Map Action */}
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  <div className="flex items-baseline gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      SANUR
                    </h2>
                    <span className="text-xs font-mono tracking-[0.28em] text-[#E05D29] uppercase font-bold shrink-0">
                      BALI
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm">
                    Jl. Batur Sari, Sanur, Denpasar Selatan, Denpasar, Bali 80228
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => openLocationModal(2)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white transition-colors uppercase cursor-pointer group"
                    >
                      <span className="border-b border-neutral-700 group-hover:border-white pb-0.5 transition-colors">
                        OPEN LOCATION MAP
                      </span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Operating Hours (Lune Style) */}
                <div className="flex md:items-start md:pt-6">
                  <p className="text-sm sm:text-base font-mono text-[#E05D29] sm:text-neutral-300 font-semibold tracking-wide">
                    Open 08:00 — 00:00 Everyday
                  </p>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 2. Channels: WhatsApp Concierge & Instagram Feed (Tanpa Garis)  */}
            {/* =============================================================== */}
            <div
              ref={channelsRef}
              className="w-full"
              style={{ paddingTop: "clamp(24px, 3vw, 40px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 md:gap-18 text-left">
                {/* WhatsApp Concierge */}
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    WHATSAPP CONCIERGE
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm">
                    Pemesanan formula kopi botol, reservasi meja, dan informasi pesanan malam hari.
                  </p>
                  <p className="text-lg sm:text-xl font-mono text-white font-bold tracking-wider pt-0.5">
                    +62 811-3088-7158
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://wa.me/6281130887158"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white uppercase transition-colors cursor-pointer group"
                    >
                      <span className="border-b border-neutral-700 group-hover:border-white pb-0.5 transition-colors">
                        START CHAT
                      </span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Instagram Feed */}
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    INSTAGRAM FEED
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm">
                    Dokumentasi visual, batch sangrai harian, dan kabar agenda malam Afterwork Caffeine.
                  </p>
                  <p className="text-lg sm:text-xl font-mono text-white font-bold tracking-wider pt-0.5">
                    @afterworkcaffeine
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://www.instagram.com/afterworkcaffeine?stkn=djZoeWhnNWptcWFi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E05D29] hover:text-white uppercase transition-colors cursor-pointer group"
                    >
                      <span className="border-b border-neutral-700 group-hover:border-white pb-0.5 transition-colors">
                        FOLLOW FEED
                      </span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 3. Direct Contact Form (Lune Minimal Underline Inputs)          */}
            {/* =============================================================== */}
            <div
              ref={formRef}
              className="w-full"
              style={{ paddingTop: "clamp(24px, 3vw, 40px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}
            >
              {isSubmitted ? (
                <div className="p-8 sm:p-12 border border-[#E05D29]/40 bg-[#0A0A0A] space-y-4 shadow-2xl w-full text-left">
                  <span className="text-3xl text-[#E05D29] block">✓</span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    MESSAGE RECEIVED
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed">
                    Terima kasih! Pesan Anda telah kami terima. Tim Afterwork Caffeine akan segera menghubungi Anda.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border border-[#333] hover:border-[#E05D29] text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                    <a
                      href="https://wa.me/6281130887158"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#E05D29] text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer"
                    >
                      CHAT ON WHATSAPP ↗
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full"
                  style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 2.8vw, 32px)" }}
                >
                  {/* Row 1: First name * & Last Name * */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-14">
                    {/* First name */}
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-white"
                      >
                        First name <span className="text-[#E05D29]">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#E05D29] text-white text-sm sm:text-base py-3 outline-none transition-colors rounded-none placeholder-neutral-600"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-white"
                      >
                        Last Name <span className="text-[#E05D29]">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#E05D29] text-white text-sm sm:text-base py-3 outline-none transition-colors rounded-none placeholder-neutral-600"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email * & Phone number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-14">
                    {/* Email */}
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white"
                      >
                        Email <span className="text-[#E05D29]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#E05D29] text-white text-sm sm:text-base py-3 outline-none transition-colors rounded-none placeholder-neutral-600"
                      />
                    </div>

                    {/* Phone number with Indonesian Flag indicator */}
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white"
                      >
                        Phone number
                      </label>
                      <div className="relative flex items-center border-b border-neutral-700 focus-within:border-[#E05D29] transition-colors">
                        <div className="flex items-center gap-2 pr-3 select-none shrink-0">
                          <svg
                            width="20"
                            height="14"
                            viewBox="0 0 20 14"
                            className="rounded-[2px] shadow-sm border border-white/20 shrink-0"
                            aria-hidden="true"
                          >
                            <rect width="20" height="7" fill="#E70011" />
                            <rect y="7" width="20" height="7" fill="#FFFFFF" />
                          </svg>
                          <span className="text-xs text-neutral-400 font-mono">ˇ</span>
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="0812-345-678"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full bg-transparent border-0 text-white text-sm sm:text-base py-3 outline-none rounded-none placeholder-neutral-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#E05D29] text-white text-sm sm:text-base py-3 outline-none transition-colors resize-none rounded-none placeholder-neutral-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 text-left">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-[#E05D29] text-black font-mono font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-white transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(224,93,41,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SUBMIT MESSAGE ↗"}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
