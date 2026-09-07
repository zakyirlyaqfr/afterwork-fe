"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { navigationItems } from "@/data/navigation";
import gsap from "gsap";

export default function NavigationOverlay() {
  const { isMenuOpen, closeMenu } = useUI();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Premium GSAP Curtain Wipe & Kinetic Stagger Animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isMenuOpen) {
      // Kill previous animations if any
      gsap.killTweensOf([container, linksRef.current, previewRef.current]);

      // Make visible for animation
      gsap.set(container, { visibility: "visible", opacity: 1 });

      const tl = gsap.timeline();

      // 1. Curtain sweep across screen from the sidebar boundary
      tl.fromTo(
        container,
        {
          clipPath: "inset(0% 100% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "expo.out",
        }
      );

      // 2. Cascade typography up with subtle kinetic skew
      tl.fromTo(
        linksRef.current.filter(Boolean),
        {
          y: 50,
          opacity: 0,
          skewY: 2,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power4.out",
        },
        "-=0.35"
      );

      // 3. Scale and reveal visual preview panel (in landscape)
      if (previewRef.current) {
        tl.fromTo(
          previewRef.current,
          {
            scale: 0.94,
            opacity: 0,
            y: 20,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    } else {
      // Exit Animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { visibility: "hidden" });
        },
      });

      tl.to(linksRef.current.filter(Boolean), {
        y: -25,
        opacity: 0,
        duration: 0.22,
        stagger: 0.02,
        ease: "power2.in",
      });

      tl.to(
        container,
        {
          clipPath: "inset(0% 0% 0% 100%)",
          duration: 0.45,
          ease: "expo.in",
        },
        "-=0.1"
      );
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="fixed inset-y-0 right-0 nav-overlay-layout z-[60] bg-black text-[#F5F5F5] opacity-0 invisible flex flex-col justify-center overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* 
        Main Section Content Container:
        - Strictly partitioned inside main section on desktop (starts after sidebar rail).
        - Zero overlap with sidebar elements or close button.
        - Fills the screen with expansive typography and generous editorial framing.
      */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full overflow-hidden items-center justify-between px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 py-12 md:py-0">
        {/*
          Menu links column:
          - Sits entirely in the main section.
          - Spreads out to fill height and width gracefully.
        */}
        <div className="w-full md:w-[58%] lg:w-[62%] h-full flex flex-col justify-center select-none">
          <nav
            className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 xl:space-y-7"
            aria-label="Main Navigation"
          >
            {navigationItems.map((item, idx) => {
              const isActive = pathname === item.href;

              return (
                <div key={item.id} className="overflow-hidden">
                  <Link
                    href={item.href}
                    ref={(el) => {
                      linksRef.current[idx] = el;
                    }}
                    onClick={closeMenu}
                    className="group inline-flex items-center py-1 sm:py-1.5 focus:outline-none transition-transform duration-300 ease-out hover:translate-x-4 lg:hover:translate-x-6"
                  >
                    {/* Bold Stark Typography with Kinetic Shift */}
                    <span
                      className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[76px] font-black tracking-tighter uppercase leading-[0.96] transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/*
          Right Column: Editorial Photo Panel
          - Visible on desktop/tablet (>= md).
          - Photo remains constant & static (does not change on hover) as requested.
          - Fills the vertical space in the right viewport.
        */}
        <div
          ref={previewRef}
          className="hidden md:flex md:w-[42%] lg:w-[38%] flex-col justify-center items-center lg:items-end pl-6"
        >
          <div className="relative w-full max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[480px] aspect-[3/4] border border-[#222222] bg-[#0a0a0a] overflow-hidden group shadow-2xl">
            <Image
              src="/images/navigation/nav-about.jpg"
              alt="Afterwork Architecture"
              fill
              sizes="(max-width: 1024px) 40vw, 480px"
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
