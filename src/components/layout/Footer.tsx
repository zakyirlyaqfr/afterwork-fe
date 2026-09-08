"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 select-none z-30">
      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col space-y-12">
        {/* Top Tier: Wordmark & Vital Operating Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-sans text-2xl sm:text-3xl font-black tracking-tight uppercase text-white">
              AFTERWORK CAFFEINE
            </div>
            <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase mt-2">
              Specialty Bottled Formulas & Artisanal Viennoiserie
            </p>
          </div>

          <div className="font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase space-y-1.5 md:text-right">
            <div>G-Walk Citraland & Downtown Surabaya</div>
            <div className="text-white/90">09:00 — 02:00 Everyday</div>
          </div>
        </div>

        {/* Bottom Tier: Minimal Links & Fine Print */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-sans uppercase tracking-[0.2em] text-neutral-400">
            <Link href="/about" className="hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link href="/menus" className="hover:text-white transition-colors duration-200">
              Menus
            </Link>
            <Link href="/delivery" className="hover:text-white transition-colors duration-200">
              Delivery
            </Link>
            <Link href="/gallery" className="hover:text-white transition-colors duration-200">
              Gallery
            </Link>
            <a
              href="https://www.instagram.com/afterworkcaffeine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Instagram
            </a>
          </nav>

          <div className="font-mono text-[11px] tracking-[0.2em] text-neutral-600 uppercase">
            © {currentYear} AFTERWORK. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
