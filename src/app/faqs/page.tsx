"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/animation/RevealText";
import { faqItems } from "@/data/faq";
import { Plus, Minus } from "lucide-react";

export default function FaqsPage() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black">
      <div className="w-full max-w-[1720px]">
        {/* Header */}
        <div className="border-b border-[#262626] pb-8 mb-16">
          <SectionLabel label="SYSTEM KNOWLEDGE" index="06" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            FREQUENT
            <br />
            <span className="text-[#E05D29]">INQUIRIES.</span>
          </RevealText>
        </div>

        {/* Minimal Accordion List */}
        <div className="flex flex-col divide-y divide-[#262626] border-y border-[#262626]">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="py-6 sm:py-8 transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-baseline justify-between gap-6 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E05D29]"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-200 ${
                        isOpen ? "text-[#E05D29] font-bold" : "text-[#F5F5F5]/40"
                      }`}
                    >
                      {item.number} //
                    </span>

                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? "text-[#E05D29]"
                          : "text-[#F5F5F5] group-hover:text-[#E05D29]"
                      }`}
                    >
                      {item.question}
                    </h2>
                  </div>

                  <div className="shrink-0 p-1 text-[#F5F5F5]/60 group-hover:text-[#E05D29] transition-colors">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#E05D29]" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Smooth expansion content */}
                {isOpen && (
                  <div className="mt-4 pl-8 sm:pl-14 pr-6 font-mono text-xs sm:text-sm text-[#F5F5F5]/75 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    <p>{item.answer}</p>
                    {item.category && (
                      <span className="inline-block mt-3 text-[10px] text-[#E05D29] tracking-[0.2em] uppercase">
                        CATEGORY: {item.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
