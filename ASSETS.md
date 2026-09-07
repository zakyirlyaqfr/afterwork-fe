# Assets Documentation — AFTERWORK CAFFEINE

This document provides a comprehensive inventory of all brand assets, splash sequences, editorial photographs, and font files used throughout the Afterwork Caffeine frontend.

---

## 1. Brand Logos

All logo assets are located in `/public/brand/`:

| Filename | Status | Recommended Dimensions | Format | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| `logo short white afterwork caffeine.PNG` | **Real / Configured** | `1024 × 1024` | PNG (Transparent) | Header, splash screen, and dark background sections |
| `logo short black afterwork caffeine.PNG` | **Real / Configured** | `1024 × 1024` | PNG (Transparent) | Light background sections (About preview) |
| `logo-short-white.png` | **Real / Configured** | `1024 × 1024` | PNG (Transparent) | Optimized alias for white logo |
| `logo-short-black.png` | **Real / Configured** | `1024 × 1024` | PNG (Transparent) | Optimized alias for black logo |
| `logo-short-white-placeholder.svg` | **Placeholder SVG** | `400 × 120` | Vector SVG | Fallback vector logo |
| `logo-short-black-placeholder.svg` | **Placeholder SVG** | `400 × 120` | Vector SVG | Fallback vector logo |

> **How to replace:** Replace the files in `/public/brand/` directly. The header in `src/components/layout/Header.tsx` automatically binds to `logo-short-white.png` and `logo-short-black.png`.

---

## 2. Typography & Font Files

Located in `/public/fonts/`:

| File | Status | Font Family | Weight | Replacement Instructions |
| :--- | :--- | :--- | :--- | :--- |
| `AlteHaasGroteskBold.ttf` | **User File Slot** | `Alte Haas Grotesk` | Bold (700) | Place your licensed TrueType/WOFF2 font file here |
| `AlteHaasGroteskRegular.ttf` | **User File Slot** | `Alte Haas Grotesk` | Regular (400) | Place your licensed TrueType/WOFF2 font file here |

> **Fallback Strategy**: If local `.ttf` files are not placed in `/public/fonts/`, the site automatically and smoothly falls back to Google Fonts (`Space Grotesk`, `Syne`, and `JetBrains Mono`) defined in `src/app/layout.tsx` and `src/styles/globals.css`.

---

## 3. Splash Screen Image Sequence

Located in `/public/sequence/intro/`:

- **Quantity**: 30 frames (`frame-001.webp` through `frame-030.webp`)
- **Dimensions**: `600 × 600` (aspect ratio `1:1`)
- **Format**: Optimized WebP (approx. 4KB–8KB per frame)
- **Sequence Choreography**:
  - `frame-001` to `frame-005`: Deep pitch black with tiny pulsating orange center dot and GPS coordinates.
  - `frame-006` to `frame-015`: Concentric industrial measurement rings expanding with technical hairline crosshairs.
  - `frame-016` to `frame-027`: Kinetic expansion where the white Afterwork graffiti logo emerges and resolves.
  - `frame-028` to `frame-030`: Final resolved logo with orange accent tagline.

> **How to replace:** If you produce a custom 3D or motion render in After Effects/Blender, export a 30-frame sequence named `frame-001.webp` to `frame-030.webp` at `600x600` or `800x800` into `/public/sequence/intro/`.

---

## 4. Homepage Photography

Located in `/public/images/home/`:

| File | Target Slot | Recommended Dimensions | Aspect Ratio | Aesthetic Direction |
| :--- | :--- | :--- | :--- | :--- |
| `home-hero-01.jpg` | Hero 50% Asymmetric Crop | `2400 × 1600` | `3:2` or `4:5` | Direct flash, barista in flow, stainless steel, dark exposure |
| `home-about-01.jpg` | About Preview Section | `1600 × 2000` | `4:5` | Brutalist concrete interior, minimal seating, dramatic shadow |
| `home-gallery-01.jpg` | Gallery Preview 01 | `1200 × 1600` | `3:4` | Espresso Tonic with citrus twist on black granite |
| `home-gallery-02.jpg` | Gallery Preview 02 | `1400 × 1000` | `7:5` | Signature Nitro Cold Brew amber bottle |
| `home-gallery-03.jpg` | Gallery Preview 03 | `1000 × 1400` | `5:7` | Midnight Cruffin pastry on steel plate |
| `home-gallery-04.jpg` | Gallery Preview 04 | `1600 × 1100` | `16:11` | Geisha pour-over precision station |
| `home-gallery-05.jpg` | Gallery Preview 05 | `1200 × 1500` | `4:5` | Caramelized laminated Kouign-Amann |

---

## 5. Navigation Hover Panels

Located in `/public/images/navigation/`:

| File | Trigger Item | Dimensions | Aspect Ratio | Tone |
| :--- | :--- | :--- | :--- | :--- |
| `nav-about.jpg` | `01 — ABOUT AFTERWORK` | `1000 × 1400` | `5:7` (Portrait) | Cafe interior and architecture |
| `nav-menu.jpg` | `02 — MENUS` | `1000 × 1400` | `5:7` (Portrait) | Espresso tonic signature drink |
| `nav-delivery.jpg` | `03 — DELIVERY` | `1000 × 1400` | `5:7` (Portrait) | Bottled beverages ready for dispatch |
| `nav-gallery.jpg` | `04 — GALLERY` | `1000 × 1400` | `5:7` (Portrait) | Barista in flow pulling espresso |
| `nav-contact.jpg` | `05 — CONTACT` | `1000 × 1400` | `5:7` (Portrait) | Evening storefront facade |
| `nav-faq.jpg` | `06 — FAQs` | `1000 × 1400` | `5:7` (Portrait) | Extraction gear closeup |

---

## 6. Menu Categories

Located in `/public/images/menu/`:

| File | Category | Dimensions | Description |
| :--- | :--- | :--- | :--- |
| `menu-coffee.jpg` | COFFEE | `1200 × 1200` | Espresso tonic, pour-over, latte |
| `menu-bottle.jpg` | BOTTLED | `1200 × 1200` | Nitro cold brew, oat milk cold white, cascara |
| `menu-food.jpg` | FOOD | `1200 × 1200` | Midnight cruffin, pastrami melt, toast |
| `menu-noncoffee.jpg`| NON COFFEE | `1200 × 1200` | Ceremonial Uji matcha, Valrhona dark chocolate |

---

## 7. Visual Archive (Gallery)

Located in `/public/images/gallery/`:

- **16 Curated Editorial Photographs**: `gallery-01.jpg` through `gallery-16.jpg`.
- **Dimensions**: Varied (`1200x1600`, `1600x1000`, `1100x1500`, `1400x1400`, `1600x1100`, `1000x1400`).
- **Categories**: Coffee, Bottles, Food, Interior, Night, People, Exterior, Details.
- **Tone**: High-contrast, dark exposure, directional flash, stainless steel, noir coffee textures, orange accents.
