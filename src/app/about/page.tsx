import Image from "next/image";
import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ImageReveal from "@/components/animation/ImageReveal";
import RevealText from "@/components/animation/RevealText";
import { aboutAssets } from "@/data/assets";

export const metadata: Metadata = {
  title: "ABOUT AFTERWORK",
  description: "Independent coffee shop and bottled drink laboratory in Surabaya. Our philosophy, architecture, and late-night culture.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black">
      <div className="w-full max-w-[1720px]">
        {/* Page Header */}
        <div className="border-b border-[#262626] pb-8 mb-16">
          <SectionLabel label="ORIGIN & CULTURE" index="01" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            ABOUT
            <br />
            <span className="text-[#E05D29]">AFTERWORK.</span>
          </RevealText>
        </div>

        {/* Hero Asymmetrical Editorial Image */}
        <div className="mb-20">
          <ImageReveal className="aspect-[16/9] sm:aspect-[21/9] border border-[#262626] bg-[#111111]">
            <Image
              src={aboutAssets.hero.src}
              alt={aboutAssets.hero.alt}
              width={aboutAssets.hero.width}
              height={aboutAssets.hero.height}
              priority
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
          </ImageReveal>
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 mt-3">
            <span>FIG. 101 // ARCHITECTURAL BRUTALISM</span>
            <span className="text-[#E05D29]">SURABAYA HQ</span>
          </div>
        </div>

        {/* Section 01: The Brand Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#262626] pb-20 mb-20">
          <div className="lg:col-span-5 font-mono">
            <span className="text-xs text-[#E05D29] tracking-[0.3em] uppercase block mb-3">
              // 01 — THE DISCIPLINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-snug">
              "DAMN GOOD BOTTLED DRINKS.
              <br />
              COMFORT FOOD,
              <br />
              MORNING TO MIDNIGHT."
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 font-mono text-xs sm:text-sm text-[#F5F5F5]/75 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tellus vel nisl finibus, in porta velit placerat. Integer lacinia magna eu elit ullamcorper, et tempor neque pellentesque. Vivamus dictum hendrerit sem, non elementum neque efficitur a.
            </p>
            <p className="text-[#F5F5F5]/50">
              Cras sed nisi sit amet dolor porta lacinia. Duis ac quam eget lacus pellentesque eleifend sit amet nec felis. Suspendisse pulvinar odio vel convallis tristique. Morbi fermentum ligula sed justo tincidunt sagittis.
            </p>
            <div className="pt-4 border-t border-[#262626] flex items-center gap-6 text-[11px] text-[#E05D29]">
              <span>9AM — 2AM EVERYDAY</span>
              <span>•</span>
              <span>ALL DAY, ALL NIGHT</span>
            </div>
          </div>
        </div>

        {/* Section 02: Dual Image Grid with Text Mask */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <div>
            <ImageReveal className="aspect-[4/5] border border-[#262626] bg-[#111111]">
              <Image
                src={aboutAssets.interior.src}
                alt={aboutAssets.interior.alt}
                width={aboutAssets.interior.width}
                height={aboutAssets.interior.height}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </ImageReveal>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 mt-3 flex justify-between">
              <span>FIG. 102 // BARISTA CRAFT</span>
              <span className="text-[#E05D29]">EXTRACTION PROTOCOL</span>
            </div>
            <p className="mt-4 font-mono text-xs text-[#F5F5F5]/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere libero sit amet eros vulputate, sed elementum erat porta.
            </p>
          </div>

          <div>
            <ImageReveal className="aspect-[4/5] border border-[#262626] bg-[#111111]">
              <Image
                src={aboutAssets.night.src}
                alt={aboutAssets.night.alt}
                width={aboutAssets.night.width}
                height={aboutAssets.night.height}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </ImageReveal>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 mt-3 flex justify-between">
              <span>FIG. 103 // 01:45 AM CULTURE</span>
              <span className="text-[#E05D29]">LATE NIGHT SOUNDS</span>
            </div>
            <p className="mt-4 font-mono text-xs text-[#F5F5F5]/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel turpis sit amet ligula lobortis malesuada a sit amet enim.
            </p>
          </div>
        </div>

        {/* Section 03: The Operating Culture */}
        <div className="border-t border-[#262626] pt-16">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[#E05D29] tracking-[0.3em] uppercase block mb-4">
              // 02 — THE CULTURE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-6">
              NOT CORPORATE. INDEPENDENT. SOCIAL.
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#F5F5F5]/75 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
            </p>
            <p className="font-mono text-xs text-[#F5F5F5]/50 leading-relaxed">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
