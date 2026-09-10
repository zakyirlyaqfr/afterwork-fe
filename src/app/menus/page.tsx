"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { menuItems, menuCategories, MenuItem } from "@/data/menu";
import MenuDetailModal from "@/components/menus/MenuDetailModal";

// Abstract shape profiles matching user's sketch:
// - Left-column cards shifted to the RIGHT (with .menu-left-shift)
// - Right-column cards positioned in column 2
// - Top 2 cards (0 and 1) are SEJAJAR (aligned at top baseline md:mt-0)
// - Subsequent rows are TIDAK SEJAJAR (staggered vertically)
// - Last odd card centered
const cardVariants = [
  // 0 (Row 1 Left): Top-left, SEJAJAR with Card 1, bergeser ke kanan
  {
    widthClass: "w-full max-w-[440px] sm:max-w-[470px] md:max-w-[490px]",
    heightClass: "h-[260px] sm:h-[300px] md:h-[330px]",
    tilt: -1.2,
    offsetY: "md:mt-0", // Sejajar dengan Card 1
  },
  // 1 (Row 1 Right): Top-right, SEJAJAR with Card 0
  {
    widthClass: "w-full max-w-[420px] sm:max-w-[450px] md:max-w-[480px]",
    heightClass: "h-[270px] sm:h-[310px] md:h-[340px]",
    tilt: 1.2,
    offsetY: "md:mt-0", // Sejajar dengan Card 0
  },
  // 2 (Row 2 Left): Tilted left, TIDAK SEJAJAR dengan Card 3
  {
    widthClass: "w-full max-w-[450px] sm:max-w-[480px] md:max-w-[500px]",
    heightClass: "h-[280px] sm:h-[320px] md:h-[350px]",
    tilt: -3.8,
    offsetY: "md:mt-10 lg:mt-14",
  },
  // 3 (Row 2 Right): Tilted right, TIDAK SEJAJAR
  {
    widthClass: "w-full max-w-[430px] sm:max-w-[460px] md:max-w-[490px]",
    heightClass: "h-[250px] sm:h-[290px] md:h-[320px]",
    tilt: 3.5,
    offsetY: "md:mt-28 lg:mt-36",
  },
  // 4 (Row 3 Left): Tilted left, TIDAK SEJAJAR dengan Card 5
  {
    widthClass: "w-full max-w-[440px] sm:max-w-[470px] md:max-w-[490px]",
    heightClass: "h-[270px] sm:h-[310px] md:h-[340px]",
    tilt: -2.2,
    offsetY: "md:mt-8 lg:mt-12",
  },
  // 5 (Row 3 Right): Tilted right, TIDAK SEJAJAR
  {
    widthClass: "w-full max-w-[440px] sm:max-w-[470px] md:max-w-[490px]",
    heightClass: "h-[260px] sm:h-[300px] md:h-[330px]",
    tilt: 2.8,
    offsetY: "md:mt-24 lg:mt-32",
  },
  // 6 (Odd 7th item): Tengah bawah — ukuran diselaraskan proporsional (matching DOLOR REPREHEND)
  {
    widthClass: "w-full max-w-[450px] sm:max-w-[480px] md:max-w-[500px]",
    heightClass: "h-[280px] sm:h-[320px] md:h-[350px]",
    tilt: 0,
    offsetY: "md:mt-16 lg:mt-24",
  },
];

export default function MenusPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const filteredItems =
    activeCategory === "ALL"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // Title entrance
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
    }

    // Filter entrance
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }
      );
    }
  }, [prefersReduced]);

  // Scroll-triggered 1-by-1 entrance animation for each card as user scrolls
  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".menu-card");
      if (!cards || cards.length === 0) return;

      // Set initial state: hidden, translated down
      gsap.set(cards, { opacity: 0, y: 50 });

      // ScrollTrigger batch reveals cards 1 per 1 as they enter the viewport
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.16,
            overwrite: "auto",
          });
        },
      });

      // Recalculate ScrollTrigger positions
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimeout);
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory, prefersReduced]);

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-[#F5F5F5] pt-24 sm:pt-28 md:pt-32 px-6 sm:px-10 md:px-12 lg:px-16 selection:bg-[#E05D29] selection:text-black overflow-x-visible relative"
      style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
    >
      {/* Main Content Container — with pb-[40vh] so sticky header stays pinned all the way past the bottom cards */}
      <div className="w-full max-w-[1540px] mx-auto relative z-10 pb-[40vh]">

        {/* Header Container for Title & Category Filters
            - Sticky dan transparan: tetap di posisi saat di-scroll
            - Geser ke bawah sedikit (.menu-sticky-header)
            - Kartu menu meluncur di layer bawahnya (z-10 < z-40) */}
        <div className="menu-sticky-header mb-14 sm:mb-18 md:mb-24 lg:mb-28">
          {/* 1. Page Title — Purely "MENUS." */}
          <div
            ref={titleRef}
            className="relative pointer-events-none"
            style={{ marginBottom: "clamp(0.8rem, 1.4vw, 1.3rem)" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F5F5]">
              MENUS<span className="text-[#E05D29]">.</span>
            </h1>
          </div>

          {/* 2. Category Filters — Translucent buttons, stays clearly above content */}
          <div
            ref={filterRef}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 select-none relative menu-sticky-interactive"
          >
            {/* ALL Button */}
            <button
              type="button"
              onClick={() => setActiveCategory("ALL")}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] border transition-all duration-300 -rotate-1 hover:rotate-0 hover:scale-105 cursor-pointer ${activeCategory === "ALL"
                  ? "bg-[#E05D29] text-black border-[#E05D29] punk-glow font-black shadow-[0_4px_16px_rgba(224,93,41,0.45)]"
                  : "border-[#333] text-[#F5F5F5]/80 hover:border-[#E05D29] hover:text-[#E05D29] bg-black/85 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
                }`}
            >
              ALL
            </button>

            {/* Categories: COFFEE, FOOD, NON COFFEE */}
            {menuCategories.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{ transform: `rotate(${idx % 2 === 0 ? "1" : "-1"}deg)` }}
                className={`px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] border transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer ${activeCategory === cat
                    ? "bg-[#E05D29] text-black border-[#E05D29] punk-glow !rotate-0 font-black shadow-[0_4px_16px_rgba(224,93,41,0.45)]"
                    : "border-[#333] text-[#F5F5F5]/80 hover:border-[#E05D29] hover:text-[#E05D29] bg-black/85 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Menu Grid
            - Jarak batas jelas dari filter di atasnya (.menu-grid-spacing)
            - Gambar kolom kiri benar-benar bergeser ke kanan menggunakan class .menu-card-left-shift
            - Hover tepat pada kotak gambar tanpa ghost-hover di area kosong */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-16 sm:gap-y-24 relative z-10 items-start menu-grid-spacing"
        >
          {filteredItems.map((item, idx) => {
            const variant = cardVariants[idx % cardVariants.length];
            const isLastOdd =
              idx === filteredItems.length - 1 && filteredItems.length % 2 !== 0;
            const isLeftColumn = idx % 2 === 0 && !isLastOdd;

            // Specifically match DOLOR REPREHEND sizing for ESSE CILLUM
            const isEsseCillum = item.name === "ESSE CILLUM";
            const cardWidth = isEsseCillum
              ? "w-full max-w-[450px] sm:max-w-[480px] md:max-w-[500px]"
              : variant.widthClass;
            const cardHeight = isEsseCillum
              ? "h-[280px] sm:h-[320px] md:h-[350px]"
              : variant.heightClass;

            // Positioning container alignment:
            // - isLastOdd: centered across both columns
            // - Columns 1 and 2: w-full flex justify-start
            const cellAlignment = isLastOdd
              ? "col-span-full md:col-span-2 w-full flex justify-center items-center"
              : "w-full flex justify-start";

            return (
              <div
                key={item.id}
                className={`menu-card relative ${isLastOdd ? "md:mt-16 lg:mt-24" : variant.offsetY
                  } ${cellAlignment}`}
              >
                {/* Abstract Image Container — strictly holds group & cursor-pointer so hover area matches card 1:1 */}
                <div
                  className={`relative group cursor-pointer shrink-0 ${cardWidth} ${cardHeight} ${isLastOdd ? "mx-auto menu-card-odd-center" : isLeftColumn ? "menu-card-left-shift" : ""
                    } bg-[#0a0a0a] border border-[#262626] overflow-hidden transition-colors duration-300 hover:border-[#E05D29]/70 hover:shadow-[0_15px_40px_rgba(224,93,41,0.22)]`}
                  style={isLastOdd ? undefined : { transform: `rotate(${variant.tilt}deg)` }}
                  onClick={() => handleOpenModal(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenModal(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${item.name}`}
                >
                  {/* Photo Layer — Vivid authentic image, zooms on hover */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src={item.previewImage || "/images/default.jpg"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 580px"
                      className="object-cover object-center contrast-105 group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {/* Dark gradient for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Corner brackets on hover */}
                  <div className="absolute -inset-2 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/80" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E05D29]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/80" />
                  </div>

                  {/* Content: ONLY the name in the bottom-left corner */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#F5F5F5] group-hover:text-[#E05D29] transition-colors duration-300 drop-shadow-md">
                      {item.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pop-up Modal matching 'contoh pop up.jpeg' */}
      <MenuDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}

