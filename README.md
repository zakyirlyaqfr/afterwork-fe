# AFTERWORK CAFFEINE — Digital Flagship

An editorial, experimental, and premium frontend website for **AFTERWORK CAFFEINE** (Surabaya, Indonesia). Reinterpreting the design discipline, product-first visuals, and negative space of *Lune Croissanterie* combined with Afterwork's raw, energetic, urban late-night coffee culture.

> **"DAMN GOOD BOTTLED DRINKS. COMFORT FOOD, MORNING TO MIDNIGHT. 9AM–2AM EVERYDAY."**

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Motion**: GSAP 3 + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Asset Processing**: Sharp

---

## Getting Started

### 1. Installation
```powershell
npm install
```

### 2. Run Local Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```powershell
npm run build
npm run start
```

---

## Folder Architecture

```text
afterwork-fe/
├── public/
│   ├── brand/               # White and black Afterwork graffiti logos & SVGs
│   ├── fonts/               # Alte Haas Grotesk font drop-in folder
│   ├── images/
│   │   ├── home/            # Hero, About teaser, and Gallery preview photos
│   │   ├── about/           # Brand philosophy and architecture imagery
│   │   ├── menu/            # Coffee, bottle, food, non-coffee photos
│   │   ├── navigation/      # Hover preview panels for fullscreen menu
│   │   ├── gallery/         # 16 editorial photography archive assets
│   │   └── contact/         # Storefront and evening venue photos
│   └── sequence/
│       └── intro/           # 30-frame sequence for the 3-second splash screen
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (fonts, providers, header, overlays)
│   │   ├── page.tsx         # Homepage (Hero, Marquee, About preview, Gallery preview)
│   │   ├── about/page.tsx   # About Afterwork editorial page
│   │   ├── menus/page.tsx   # Typography-driven menu with live cursor preview
│   │   ├── delivery/page.tsx# Direct Gojek & Grab delivery channel rows
│   │   ├── gallery/page.tsx # Custom CSS Grid photo archive with lightbox
│   │   ├── contact/page.tsx # Bold typographic contact & opening hours
│   │   └── faqs/page.tsx    # Smooth hairline accordion Q&A
│   ├── components/
│   │   ├── animation/       # SplashScreen, SmoothScroll, CustomCursor, ImageReveal, RevealText, Marquee
│   │   ├── home/            # Hero, AboutPreview, GalleryPreview
│   │   ├── layout/          # Header, MenuTrigger, NavigationOverlay, Footer, LocationModal
│   │   └── ui/              # SectionLabel
│   ├── config/
│   │   ├── links.ts         # Configurable Gojek, Grab, Instagram, and Maps links
│   │   └── site.ts          # Brand metadata, operating hours, and taglines
│   ├── context/
│   │   └── UIContext.tsx    # Global menu, modal, splash, and theme state
│   ├── data/
│   │   ├── assets.ts        # Complete asset manifest
│   │   ├── menu.ts          # Drink & pastry catalog with descriptions and prices
│   │   ├── navigation.ts    # Fullscreen navigation items and preview pairings
│   │   ├── faq.ts           # Frequently asked questions
│   │   └── gallery.ts       # 16-item gallery data with aspect ratios and spans
│   ├── hooks/
│   │   ├── useLenis.ts      # Smooth scroll hook
│   │   ├── useMediaQuery.ts # Responsive breakpoint detection
│   │   └── useReducedMotion.ts # Accessibility reduced motion detection
│   └── styles/
│       └── globals.css      # Design tokens, @theme, @font-face, hairline borders
├── DEPENDENCIES.md          # Architectural rationale for all libraries
├── ASSETS.md                # Comprehensive dimensions and asset replacement guide
└── package.json
```

---

## Customization & Asset Replacement Guide

### 1. How to Replace Logos
Place your logo files directly in `/public/brand/`:
- White logo on dark backgrounds: `/public/brand/logo-short-white.png`
- Black logo on light backgrounds: `/public/brand/logo-short-black.png`

The global header automatically toggles between the white and black logos depending on whether the current viewport section is dark or light (e.g., the soft-white About Preview section).

### 2. How to Replace Alte Haas Grotesk Font
Copy your licensed font files into `/public/fonts/`:
- `/public/fonts/AlteHaasGroteskBold.ttf`
- `/public/fonts/AlteHaasGroteskRegular.ttf`

The `@font-face` rules in `src/styles/globals.css` are pre-wired to load these files. If they are not provided, the website automatically falls back to `Space Grotesk` and `Syne` without layout disruption.

### 3. How to Replace Splash Screen Image Sequence
The splash sequence is located in `/public/sequence/intro/`:
- Contains 30 WebP images: `frame-001.webp` through `frame-030.webp` (`600x600` resolution).
- To regenerate or customize programmatically: run `node scripts/generate-assets.js`.
- Splash state is stored in `sessionStorage` (`afterwork_splash_seen`) so it only plays once on initial entry and skips during internal routing. Pressing `ESC` or clicking anywhere dismisses the splash immediately.

### 4. How to Replace Photography
Refer to [ASSETS.md](file:///d:/WIT/afterwork-fe/ASSETS.md) for full dimensions. Simply overwrite the corresponding files in `/public/images/home/`, `/public/images/about/`, `/public/images/menu/`, `/public/images/gallery/`, and `/public/images/navigation/`.

### 5. How to Modify Delivery Links (Gojek & Grab)
Edit `src/config/links.ts`:
```typescript
export const siteLinks = {
  delivery: {
    gojek: "https://gofood.link/u/your-new-handle",
    grab: "https://food.grab.com/id/en/restaurant/your-new-handle",
  },
  // ...
};
```

### 6. How to Configure Google Maps Location & Modal
In `src/config/links.ts`, modify `siteLinks.location`:
- `address`: Formatted street address displayed in the popup.
- `googleMapsUrl`: External Google Maps URL opened by the `OPEN IN GOOGLE MAPS ↗` button.
- `embedIframe`: Embedded Google Maps iframe URL.

### 7. How to Modify Menu Items & Prices
Edit `src/data/menu.ts` to add, update, or reorder drinks and food items. The page will automatically reflect changes, calculate category counts, and update hover previews.

---

## Design System & Rules Followed

1. **Color Palette**:
   - Black (`#000000`): Dominant background and structural tone.
   - Orange (`#E05D29`): Secondary / accent / interactive indicator.
   - Dark Gray (`#262626`): Hairlines and structural surfaces.
   - Soft White (`#F5F5F5`): Primary typography and contrasting Day/Night section.
2. **Sharp Industrial Edges**: Zero excessive SaaS border-radius. Hard edges (`0px` or subtle `2px-4px`).
3. **Typography-Driven**: Clamp displays from `3rem` to `9rem+`, tight tracking, technical monospaced metadata, timestamps, and GPS coordinates (`07°15'32"S 112°44'51"E`).
4. **Unique Orbital Navigation Trigger**: Outlined circular trigger at fixed left-center on desktop and top-right on mobile. No generic hamburger icon.
5. **Fullscreen Split Navigation**: 65% typography, 35% hover-reactive visual panel.
6. **Accessibility**: Full keyboard navigation, `Escape` key closes all modals/overlays, `prefers-reduced-motion` detection, and semantic HTML elements.
