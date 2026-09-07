# Project Dependencies Documentation — AFTERWORK CAFFEINE

This document outlines every key dependency installed in the project, its specific architectural purpose, and why it was selected.

---

## Production Dependencies

| Package | Version | Purpose & Architectural Justification |
| :--- | :--- | :--- |
| **`next`** | `^16.x` | The core modern React application framework providing the App Router, server/client component separation, static prerendering, asset optimization via `next/image`, and automatic code-splitting across all editorial routes (`/`, `/about`, `/menus`, `/delivery`, `/gallery`, `/contact`, `/faqs`). |
| **`react`** & **`react-dom`** | `^19.x` | Modern React runtime powering stateful interactive client components including the fullscreen navigation overlay, interactive location popup, sequential canvas splash screen, and accordion controllers. |
| **`gsap`** | `^3.15.x` | GreenSock Animation Platform with `ScrollTrigger`. Used for high-performance 60fps kinetic typography movement, scrub-based parallax drift on the asymmetrical hero, text masking reveals, and smooth modal transitions. |
| **`lenis`** | `^1.3.x` | Modern smooth scrolling engine designed to normalize scrolling physics across platforms without scroll-jacking, synchronized with the GSAP ticker for frame-accurate scroll animations. |
| **`lucide-react`** | `^1.41.x` | Minimal, hairline vector iconography (`X`, `ArrowUpRight`, `MapPin`, `Clock`, `Plus`, `Minus`) styled to match the technical, industrial aesthetic of the brand. |
| **`clsx`** & **`tailwind-merge`** | `^2.x` / `^3.x` | Utility functions for conditionally constructing and safely deduplicating Tailwind CSS utility class names across responsive and interactive states. |

---

## Development Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| **`tailwindcss`** & **`@tailwindcss/postcss`** | `^4.x` | Atomic styling framework configured with the exact Afterwork brand color palette (`#000000`, `#E05D29`, `#262626`, `#F5F5F5`), hairline border tokens, and clamp typography scales. |
| **`typescript`** | `^5.x` | Provides static typing, interface contracts for asset manifests (`AssetMeta`), menu catalog (`MenuItem`), FAQs (`FaqItem`), and navigation items (`NavItem`). |
| **`eslint`** & **`eslint-config-next`** | `^9.x` / `^16.x` | Static code analysis ensuring coding consistency and Next.js best practices. |
| **`sharp`** | `^0.35.x` | Node.js high-performance image processing engine used in automation scripts to generate sequence frames and optimize photographic crops. |

---

## Dependency Hygiene Rules

1. **No Bloat**: No unused UI libraries or bulky CSS component libraries (e.g., Shadcn, Chakra, Bootstrap) are installed. All components are custom-crafted using vanilla Tailwind and custom CSS.
2. **Animation Discipline**: No pointless physics libraries or bouncy springs. GSAP and CSS transitions handle all motion with editorial precision.
3. **Zero Deprecations**: Built for the current App Router paradigms and React 19 standards.
