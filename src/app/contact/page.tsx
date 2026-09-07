"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/animation/RevealText";
import { siteLinks } from "@/config/links";
import { useUI } from "@/context/UIContext";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const { openLocationModal } = useUI();

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black">
      <div className="w-full max-w-[1720px]">
        {/* Header */}
        <div className="border-b border-[#262626] pb-8 mb-16">
          <SectionLabel label="VISIT // CONNECT" index="05" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            COME
            <br />
            AFTER
            <br />
            <span className="text-[#E05D29]">WORK.</span>
          </RevealText>
        </div>

        {/* Editorial Contact Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#262626] pb-20 mb-20">
          {/* Left: Philosophy / Intro */}
          <div className="lg:col-span-5 font-mono text-xs sm:text-sm text-[#F5F5F5]/75 space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere libero sit amet eros vulputate, sed elementum erat porta. Integer fringilla odio ac libero feugiat, ut commodo leo imperdiet.
            </p>
            <p className="text-[#F5F5F5]/50">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={openLocationModal}
                className="px-6 py-4 bg-[#E05D29] text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#F5F5F5] transition-colors inline-flex items-center gap-2"
              >
                <span>POPUP MAP &amp; GPS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Technical Metadata Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 font-mono">
            {/* 01 Location */}
            <div className="border-t border-[#262626] pt-4">
              <span className="text-[10px] text-[#E05D29] tracking-[0.25em] block mb-2 uppercase">
                // 01 LOCATION
              </span>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2 uppercase">
                SURABAYA VENUE
              </h3>
              <p className="text-xs text-[#F5F5F5]/70 leading-relaxed mb-4">
                {siteLinks.location.address}
              </p>
              <button
                type="button"
                onClick={openLocationModal}
                className="text-xs text-[#E05D29] hover:text-[#F5F5F5] transition-colors inline-flex items-center gap-1 font-bold tracking-widest"
              >
                VIEW MAP ↗
              </button>
            </div>

            {/* 02 Hours */}
            <div className="border-t border-[#262626] pt-4">
              <span className="text-[10px] text-[#E05D29] tracking-[0.25em] block mb-2 uppercase">
                // 02 OPERATING HOURS
              </span>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2 uppercase">
                09:00 AM — 02:00 AM
              </h3>
              <p className="text-xs text-[#F5F5F5]/70 leading-relaxed">
                Open everyday including public holidays. Early espresso to late-night transition.
              </p>
            </div>

            {/* 03 Direct Contact */}
            <div className="border-t border-[#262626] pt-4">
              <span className="text-[10px] text-[#E05D29] tracking-[0.25em] block mb-2 uppercase">
                // 03 DIRECT CONTACT
              </span>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2 uppercase">
                COMMUNICATIONS
              </h3>
              <div className="space-y-1 text-xs text-[#F5F5F5]/70">
                <p>WHATSAPP: +62 812-3456-7890</p>
                <p>INQUIRIES: HELLO@AFTERWORKCAFFEINE.COM</p>
              </div>
            </div>

            {/* 04 Digital Channels */}
            <div className="border-t border-[#262626] pt-4">
              <span className="text-[10px] text-[#E05D29] tracking-[0.25em] block mb-2 uppercase">
                // 04 DIGITAL CHANNELS
              </span>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2 uppercase">
                INSTAGRAM &amp; CHANNELS
              </h3>
              <div className="flex flex-col space-y-2 text-xs">
                <a
                  href={siteLinks.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5]/70 hover:text-[#E05D29] transition-colors inline-flex items-center gap-1"
                >
                  INSTAGRAM: @AFTERWORKCAFFEINE ↗
                </a>
                <a
                  href={siteLinks.social.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5]/70 hover:text-[#E05D29] transition-colors inline-flex items-center gap-1"
                >
                  LINKTREE: /AFTERWORKCAFFEINE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
