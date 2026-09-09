"use client";

import Link from "next/link";
import Image from "next/image";
import { homeAssets } from "@/data/assets";
import SectionLabel from "@/components/ui/SectionLabel";
import ImageReveal from "@/components/animation/ImageReveal";
import RevealText from "@/components/animation/RevealText";
import { ArrowUpRight } from "lucide-react";

export default function GalleryPreview() {
  const images = homeAssets.galleryPreview;

  return (
    <section className="w-full bg-black text-[#F5F5F5] min-h-screen flex flex-col justify-center py-20 sm:py-28 md:py-36 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 relative select-none border-t border-[#262626]">
      <div className="w-full max-w-[1720px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#262626] pb-6 mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none">
              MOMENTS
              <br />
              <span className="text-[#E05D29]">09:00 → 02:00</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F5F5F5] uppercase hover:text-[#E05D29] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E05D29]"
            >
              <span className="relative">
                VIEW FULL GALLERY
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#E05D29] group-hover:w-full transition-all duration-300 ease-out" />
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E05D29]" />
            </Link>
          </div>
        </div>

        {/* Experimental Asymmetric Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Item 1: Large Portrait (3/4) */}
          <div className="md:col-span-6 lg:col-span-5" data-cursor="VIEW">
            <Link href="/gallery" className="group block focus:outline-none">
              <ImageReveal className="aspect-[3/4] border border-[#262626] bg-[#111111]">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={images[0].width}
                  height={images[0].height}
                  className="w-full h-full object-cover"
                />
              </ImageReveal>
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 mt-3">
                <span className="text-[#E05D29]">{images[0].caption}</span>
                <span>AFTERWORK</span>
              </div>
            </Link>
          </div>

          {/* Right Column: Stacked Varying Crops */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:gap-12">
            {/* Item 2: Wide Landscape (7/5) */}
            <div data-cursor="VIEW">
              <Link href="/gallery" className="group block focus:outline-none">
                <ImageReveal className="aspect-[7/5] border border-[#262626] bg-[#111111]">
                  <Image
                    src={images[1].src}
                    alt={images[1].alt}
                    width={images[1].width}
                    height={images[1].height}
                    className="w-full h-full object-cover"
                  />
                </ImageReveal>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 mt-3">
                  <span className="text-[#E05D29]">{images[1].caption}</span>
                  <span>BOTTLED COLD BREW</span>
                </div>
              </Link>
            </div>

            {/* Split Sub-row: 2 Narrow / Square Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Item 3: Tall Pastry Crop */}
              <div data-cursor="VIEW">
                <Link href="/gallery" className="group block focus:outline-none">
                  <ImageReveal className="aspect-[5/7] border border-[#262626] bg-[#111111]">
                    <Image
                      src={images[2].src}
                      alt={images[2].alt}
                      width={images[2].width}
                      height={images[2].height}
                      className="w-full h-full object-cover"
                    />
                  </ImageReveal>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 mt-2">
                    <span className="text-[#E05D29]">{images[2].caption}</span>
                  </div>
                </Link>
              </div>

              {/* Item 4: Pour-over Ritual */}
              <div data-cursor="VIEW">
                <Link href="/gallery" className="group block focus:outline-none">
                  <ImageReveal className="aspect-[5/7] border border-[#262626] bg-[#111111]">
                    <Image
                      src={images[3].src}
                      alt={images[3].alt}
                      width={images[3].width}
                      height={images[3].height}
                      className="w-full h-full object-cover"
                    />
                  </ImageReveal>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 mt-2">
                    <span className="text-[#E05D29]">{images[3].caption}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="text-[#F5F5F5]/50 tracking-[0.2em]">
            EXHIBIT 01–05 OF 16
          </div>
          <Link
            href="/gallery"
            className="px-6 py-3.5 bg-black border border-[#262626] hover:border-[#E05D29] text-[#F5F5F5] hover:text-[#E05D29] transition-colors tracking-[0.2em] uppercase font-bold inline-flex items-center gap-2"
          >
            <span>VIEW GALLERY</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
