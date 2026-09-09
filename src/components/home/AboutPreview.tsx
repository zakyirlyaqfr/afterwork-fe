"use client";

import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ImageReveal from "@/components/animation/ImageReveal";
import RevealText from "@/components/animation/RevealText";
import { homeAssets } from "@/data/assets";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section
      className="w-full bg-black text-[#F5F5F5] min-h-screen flex flex-col justify-center py-20 sm:py-28 md:py-36 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 relative select-none border-t border-[#262626] transition-colors duration-500"
    >
      <div className="w-full max-w-[1720px]">
        {/* Section Header Label */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-12 sm:mb-16">
          <SectionLabel label="ABOUT AFTERWORK" index="001" theme="dark" />
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#F5F5F5]/50 uppercase">
            PHILOSOPHY & CULTURE
          </div>
        </div>

        {/* Editorial Layout: Left statement, Right image & body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Col: Oversized Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <RevealText as="h2" className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95] text-[#F5F5F5] mb-8">
                DAMN GOOD
                <br />
                BOTTLED DRINKS.
                <br />
                <span className="text-[#E05D29]">MORNING TO MIDNIGHT.</span>
              </RevealText>

              <div className="max-w-xl space-y-4 font-mono text-xs sm:text-sm text-[#F5F5F5]/75 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-[#F5F5F5]/50">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Read More Link (non-generic editorial trigger) */}
            <div className="mt-10 sm:mt-14 pt-6 border-t border-[#262626]">
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F5F5F5] uppercase hover:text-[#E05D29] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E05D29]"
              >
                <span className="relative">
                  READ MORE
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#E05D29] group-hover:w-full transition-all duration-300 ease-out" />
                </span>
                <span className="w-8 h-8 rounded-full border border-[#F5F5F5]/30 flex items-center justify-center group-hover:border-[#E05D29] group-hover:bg-[#E05D29] group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E05D29] group-hover:text-black" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Col: Brutalist Interior Imagery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ImageReveal className="aspect-[4/5] border border-[#262626] shadow-sm bg-[#111111]">
              <Image
                src={homeAssets.aboutTeaser.src}
                alt={homeAssets.aboutTeaser.alt}
                width={homeAssets.aboutTeaser.width}
                height={homeAssets.aboutTeaser.height}
                className="w-full h-full object-cover"
              />
            </ImageReveal>

            {/* Micro editorial caption under image */}
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 pt-2 border-t border-[#262626]">
              <span>FIG. 002 BRUTALIST ARCHITECTURE</span>
              <span className="text-[#E05D29] font-bold">SURABAYA HQ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
