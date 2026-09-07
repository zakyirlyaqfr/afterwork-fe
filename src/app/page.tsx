import Hero from "@/components/home/Hero";
import EditorialStory from "@/components/home/EditorialStory";
import PanoramicBanner from "@/components/home/PanoramicBanner";
import CraftCollage from "@/components/home/CraftCollage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AFTERWORK — Artisanal Viennoiserie & Specialty Bottled Drinks",
  description:
    "An institution solely dedicated to the creation of croissants and specialty coffee formulas. All day, all night.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col w-full bg-black min-h-screen">
      {/* 01: Hero Kinetic Looping Typography Canvas + Reflective Croissant */}
      <Hero />

      {/* 02: Editorial Story (Module L & U) with dual floating cards & brand quote */}
      <EditorialStory />

      {/* 03: Wide Cinematic Panoramic Pastry Banner (Module U) */}
      <PanoramicBanner />

      {/* 04: Craft Process Tri-Image Collage (Module E) */}
      <CraftCollage />
    </main>
  );
}
