"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/animation/RevealText";
import { menuItems, menuCategories, MenuItem } from "@/data/menu";

export default function MenusPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "ALL"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black relative">
      <div className="w-full max-w-[1720px]">
        {/* Header */}
        <div className="border-b border-[#262626] pb-8 mb-12">
          <SectionLabel label="CRAFT FORMULAS" index="02" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            MENUS &
            <br />
            <span className="text-[#E05D29]">BOTTLED DRINKS.</span>
          </RevealText>
        </div>

        {/* Category Filters: Minimal Industrial Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pb-8 mb-12 border-b border-[#262626] font-mono text-xs select-none">
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={`px-4 py-2 uppercase tracking-[0.2em] border transition-colors ${
              activeCategory === "ALL"
                ? "bg-[#E05D29] text-black border-[#E05D29] font-bold"
                : "border-[#262626] text-[#F5F5F5]/60 hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
            }`}
          >
            [ ALL / {menuItems.length} ]
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 uppercase tracking-[0.2em] border transition-colors ${
                activeCategory === cat
                  ? "bg-[#E05D29] text-black border-[#E05D29] font-bold"
                  : "border-[#262626] text-[#F5F5F5]/60 hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Left Typography Rows, Right Hover Preview Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Menu Items List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#262626]">
            {filteredItems.map((item) => {
              const isHovered = hoveredItem?.id === item.id;
              const isMobileOpen = activeMobileItem === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() =>
                    setActiveMobileItem(isMobileOpen ? null : item.id)
                  }
                  className="group py-6 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#E05D29] opacity-70 group-hover:opacity-100 transition-opacity">
                        //
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#F5F5F5] group-hover:text-[#E05D29] transition-colors">
                        {item.name}
                      </h2>
                      {item.tag && (
                        <span className="hidden sm:inline px-2 py-0.5 border border-[#262626] text-[9px] font-mono text-[#E05D29] tracking-widest">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-base sm:text-lg font-bold text-[#F5F5F5] shrink-0">
                      {item.price}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-xs text-[#F5F5F5]/60 max-w-xl leading-relaxed">
                    {item.description}
                  </p>

                  {/* Inline Mobile Image Preview */}
                  {isMobileOpen && (
                    <div className="mt-4 lg:hidden aspect-video relative border border-[#262626] overflow-hidden">
                      <Image
                        src={item.previewImage}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Hover Floating/Sticky Preview Box */}
          <div className="hidden lg:block lg:col-span-4 sticky top-36">
            <div className="border border-[#262626] bg-[#111111] p-4 flex flex-col gap-4">
              <div className="aspect-square relative overflow-hidden bg-black border border-[#262626]">
                <Image
                  src={hoveredItem ? hoveredItem.previewImage : "/images/default.jpg"}
                  alt={hoveredItem ? hoveredItem.name : "Afterwork Drink Preview"}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]">
                  <span className="text-[#E05D29]">
                    {hoveredItem ? hoveredItem.category : "SPECIALTY"}
                  </span>
                  <span>AFTERWORK</span>
                </div>
              </div>

              <div className="font-mono text-xs">
                <div className="text-sm font-bold text-[#F5F5F5] uppercase mb-1">
                  {hoveredItem ? hoveredItem.name : "HOVER OVER A DRINK"}
                </div>
                <div className="text-[#F5F5F5]/60 text-[11px] leading-relaxed">
                  {hoveredItem
                    ? hoveredItem.description
                    : "Inspect craft single origins, cold-immersion nitro batches, and comfort pastries."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
