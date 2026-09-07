"use client";

import { useState } from "react";

interface LocationItem {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
}

const locations: LocationItem[] = [
  {
    id: "loc-1",
    name: "Armadale",
    address: "Shop 2, 835 High St, Armadale",
    mapsUrl: "https://maps.google.com/?q=Shop+2+835+High+St+Armadale",
  },
  {
    id: "loc-2",
    name: "Fitzroy",
    address: "119 Rose St, Fitzroy",
    mapsUrl: "https://maps.google.com/?q=119+Rose+St+Fitzroy",
  },
  {
    id: "loc-3",
    name: "Melbourne CBD on Russell",
    address: "Entry via Russell St, Shop 16, 161 Collins Street, Melbourne",
    mapsUrl: "https://maps.google.com/?q=161+Collins+Street+Melbourne",
  },
  {
    id: "loc-4",
    name: "Melbourne CBD on Lonsdale",
    address: "670 Lonsdale St, Melbourne VIC 3000",
    mapsUrl: "https://maps.google.com/?q=670+Lonsdale+St+Melbourne",
  },
  {
    id: "loc-5",
    name: "Brisbane CBD on Burnett",
    address: "Entry via Burnett Lane, Shop 10, 79 Adelaide St, Brisbane City",
    mapsUrl: "https://maps.google.com/?q=79+Adelaide+St+Brisbane+City",
  },
  {
    id: "loc-6",
    name: "South Brisbane",
    address: "Shop 1, 13-17 Manning St, South Brisbane",
    mapsUrl: "https://maps.google.com/?q=13-17+Manning+St+South+Brisbane",
  },
];

export default function LocationsList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-black text-white py-28 px-6 sm:px-12 md:pl-16 md:pr-10 lg:pl-24 lg:pr-14 xl:pl-32 xl:pr-20 border-t border-neutral-900 select-none">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Subtle Title or Compass graphic */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono mb-3">
                Directory / Locations
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                Visit
                <br />
                Our Stores
              </h3>
            </div>
            
            {/* Minimalist Radar Map Circle (matching Lune reference) */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-neutral-800 flex items-center justify-center p-4">
              <div className="w-full h-full rounded-full border border-dashed border-neutral-700 animate-spin-slow flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            </div>
          </div>

          {/* Right Column: Typographic Location List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-900">
            {locations.map((loc) => {
              const isHovered = hoveredId === loc.id;
              return (
                <a
                  key={loc.id}
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredId(loc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group py-6 first:pt-0 last:pb-0 block transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors flex items-center gap-3">
                      <span className={`inline-block transition-transform duration-300 ${isHovered ? "translate-x-2 text-white" : "text-neutral-500"}`}>
                        —
                      </span>
                      {loc.name}
                    </h4>
                    <p className="text-sm text-neutral-400 font-light tracking-wide pl-7 sm:pl-0">
                      {loc.address}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
