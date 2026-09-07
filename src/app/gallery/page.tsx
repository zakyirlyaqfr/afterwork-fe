"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/animation/RevealText";
import ImageReveal from "@/components/animation/ImageReveal";
import { galleryItems, galleryCategories, GalleryImage } from "@/data/gallery";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] pt-32 pb-24 px-8 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-20 selection:bg-[#E05D29] selection:text-black">
      <div className="w-full max-w-[1720px]">
        {/* Header */}
        <div className="border-b border-[#262626] pb-8 mb-12">
          <SectionLabel label="VISUAL ARCHIVE" index="04" theme="dark" className="mb-4" />
          <RevealText as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            THE
            <br />
            <span className="text-[#E05D29]">ARCHIVE.</span>
          </RevealText>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-[#262626] font-mono text-xs select-none">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 uppercase tracking-[0.15em] border transition-colors ${
                activeCategory === cat
                  ? "bg-[#E05D29] text-black border-[#E05D29] font-bold"
                  : "border-[#262626] text-[#F5F5F5]/60 hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`${item.gridSpan} group cursor-pointer`}
              data-cursor={`${item.index} / ${String(galleryItems.length).padStart(2, "0")}`}
              onClick={() => setSelectedImage(item)}
            >
              <ImageReveal className="w-full relative border border-[#262626] bg-[#111111] overflow-hidden">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: item.aspectRatio }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </ImageReveal>

              {/* Caption */}
              <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 mt-2.5">
                <div>
                  <span className="text-[#E05D29] font-bold">{item.index} // </span>
                  <span className="text-[#F5F5F5] uppercase">{item.title}</span>
                </div>
                <span className="text-[#F5F5F5]/40">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Lightbox Viewer */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="w-full flex items-center justify-between font-mono text-xs text-[#F5F5F5]/80 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-[#E05D29] font-bold">
                {selectedImage.index} / {String(galleryItems.length).padStart(2, "0")}
              </span>
              <span>// {selectedImage.title}</span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="p-2 border border-[#262626] hover:border-[#E05D29] hover:text-[#E05D29] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image */}
          <div
            className="flex-1 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
              <div
                className="relative w-full h-full"
                style={{ aspectRatio: selectedImage.aspectRatio }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Lightbox Bottom Controls */}
          <div
            className="w-full flex items-center justify-between font-mono text-xs text-[#F5F5F5]/60 select-none border-t border-[#262626] pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] tracking-widest text-[#F5F5F5]/40">
              {selectedImage.subtitle} // AFTERWORK CAFFEINE
            </span>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-1.5 border border-[#262626] hover:border-[#E05D29] hover:text-[#E05D29] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> PREV
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-3 py-1.5 border border-[#262626] hover:border-[#E05D29] hover:text-[#E05D29] transition-colors flex items-center gap-1"
              >
                NEXT <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
