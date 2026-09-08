import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/animation/RevealText";
import { siteLinks } from "@/config/links";
import { ArrowUpRight, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DELIVERY",
  description: "Order Afterwork Caffeine bottled drinks and comfort food via Gojek and Grab in Surabaya.",
};

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black">
      <div className="w-full max-w-[1720px]">
        {/* Header */}
        <div className="border-b border-[#262626] pb-8 mb-16">
          <SectionLabel label="FAST DISPATCH" index="03" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            COFFEE
            <br />
            WHENEVER
            <br />
            <span className="text-[#E05D29]">YOU NEED IT.</span>
          </RevealText>
        </div>

        {/* Supporting Copy & Image Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 font-mono text-xs sm:text-sm text-[#F5F5F5]/75 space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere libero sit amet eros vulputate, sed elementum erat porta. Integer fringilla odio ac libero feugiat, ut commodo leo imperdiet.
            </p>
            <p className="text-[#F5F5F5]/50">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Bottled cold brews are freshly sealed daily and packaged with thermal insulation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#262626] text-[11px]">
              <div className="flex items-center gap-2 text-[#E05D29]">
                <Zap className="w-4 h-4" />
                <span>INSTANT DISPATCH</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5F5F5]/70">
                <ShieldCheck className="w-4 h-4 text-[#E05D29]" />
                <span>SEALED AMBER BOTTLES</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-video sm:aspect-[16/9] relative border border-[#262626] overflow-hidden bg-[#111111]">
            <Image
              src="/images/default.jpg"
              alt="Default placeholder image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Large Interactive Delivery Rows: GOJEK & GRAB */}
        <div className="flex flex-col divide-y divide-[#262626] border-y border-[#262626]">
          {/* GOJEK */}
          <a
            href={siteLinks.delivery.gojek}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-8 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-[#111111] px-4 -mx-4 transition-colors duration-300"
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="font-mono text-sm text-[#E05D29] font-bold">01 //</span>
              <div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase group-hover:text-[#E05D29] transition-colors">
                  GOJEK / GOFOOD
                </h2>
                <span className="font-mono text-xs text-[#F5F5F5]/50 tracking-[0.2em] block mt-1">
                  SEARCH: AFTERWORK CAFFEINE SURABAYA
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#F5F5F5] group-hover:text-[#E05D29] transition-colors">
              <span>ORDER VIA GOFOOD</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>

          {/* GRAB */}
          <a
            href={siteLinks.delivery.grab}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-8 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-[#111111] px-4 -mx-4 transition-colors duration-300"
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="font-mono text-sm text-[#E05D29] font-bold">02 //</span>
              <div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase group-hover:text-[#E05D29] transition-colors">
                  GRAB / GRABFOOD
                </h2>
                <span className="font-mono text-xs text-[#F5F5F5]/50 tracking-[0.2em] block mt-1">
                  SEARCH: AFTERWORK CAFFEINE SURABAYA
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#F5F5F5] group-hover:text-[#E05D29] transition-colors">
              <span>ORDER VIA GRABFOOD</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
