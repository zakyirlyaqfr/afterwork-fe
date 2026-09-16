import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { UIProvider } from "@/context/UIContext";
import SmoothScroll from "@/components/animation/SmoothScroll";
import SplashScreen from "@/components/animation/SplashScreen";
import PageLoader from "@/components/animation/PageLoader";
import MenuTrigger from "@/components/layout/MenuTrigger";
import NavigationOverlay from "@/components/layout/NavigationOverlay";
import Footer from "@/components/layout/Footer";
import LocationModal from "@/components/layout/LocationModal";
import CustomCursor from "@/components/animation/CustomCursor";
import { getAssetPath } from "@/utils/asset";

const alteHaasGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/AlteHaasGroteskRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AlteHaasGroteskBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-alte",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://afterworkcaffeine.com"),
  title: {
    default: "AFTERWORK",
    template: "%s | AFTERWORK",
  },
  description:
    "Damn good bottled drinks. Comfort food, morning to midnight. 9AM–2AM everyday in Surabaya, Indonesia.",
  keywords: [
    "Afterwork Caffeine",
    "Surabaya Coffee",
    "Bottled Coffee",
    "Nitro Cold Brew",
    "Late Night Cafe Surabaya",
    "Specialty Coffee",
  ],
  authors: [{ name: "Afterwork Caffeine" }],
  openGraph: {
    title: "AFTERWORK",
    description:
      "Damn good bottled drinks. Comfort food, morning to midnight. 9AM–2AM everyday.",
    url: "https://afterworkcaffeine.com",
    siteName: "AFTERWORK",
    images: [
      {
        url: getAssetPath("/images/default.jpg"),
        width: 1200,
        height: 630,
        alt: "Afterwork Caffeine Surabaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: getAssetPath("/favicon.ico"), sizes: "any" },
      { url: getAssetPath("/brand/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: getAssetPath("/brand/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: getAssetPath("/brand/logo-badge.png"), sizes: "512x512", type: "image/png" },
    ],
    shortcut: getAssetPath("/favicon.ico"),
    apple: [
      { url: getAssetPath("/brand/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: getAssetPath("/manifest.json"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AFTERWORK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alteHaasGrotesk.variable} bg-black text-[#F5F5F5] antialiased`}
    >
      <head>
        <link rel="icon" href={getAssetPath("/favicon.ico")} sizes="any" />
        <link rel="icon" href={getAssetPath("/brand/favicon-32x32.png")} type="image/png" sizes="32x32" />
        <link rel="icon" href={getAssetPath("/brand/favicon-16x16.png")} type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href={getAssetPath("/brand/apple-touch-icon.png")} sizes="180x180" />
        <link rel="shortcut icon" href={getAssetPath("/favicon.ico")} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var seen = sessionStorage.getItem("afterwork_splash_seen");
                  var isForce = window.location.search.indexOf("splash=1") !== -1 || window.location.search.indexOf("splash=true") !== -1;
                  if (!seen || isForce) {
                    document.documentElement.classList.add("showing-splash");
                  } else {
                    document.documentElement.classList.add("showing-refresh-loader");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.showing-splash body {
                overflow: hidden !important;
              }
              html.showing-splash .page-chrome-wrapper,
              html.showing-splash footer,
              html.showing-splash .main-content-layout,
              html.showing-splash aside,
              html.showing-splash .sidebar-dock,
              html.showing-splash .site-chrome,
              html.showing-splash #custom-cursor {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
              html:not(.showing-splash) #afterwork-splash-screen {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
              }
              html.showing-refresh-loader #page-transition-loader {
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-black text-[#F5F5F5] flex flex-col selection:bg-[#E05D29] selection:text-black">
        <UIProvider>
          {/* Initial 3-second splash screen (first visit only) */}
          <SplashScreen />

          {/* Page transition loader (route changes) */}
          <PageLoader />

          {/* Desktop contextual cursor */}
          <CustomCursor />

          {/* Desktop & Mobile Sidebar Navbar Trigger */}
          <MenuTrigger />

          {/* Fullscreen split editorial navigation overlay */}
          <NavigationOverlay />

          {/* Smooth Lenis + GSAP Scroll container */}
          <SmoothScroll>
            <div className="page-chrome-wrapper flex-1 flex flex-col relative min-h-screen bg-black overflow-x-clip">
              <div className="main-content-layout flex-1 flex flex-col relative bg-black">
                {children}
              </div>
              {/* Global bottom-of-page full-width footer spanning edge-to-edge */}
              <Footer />
            </div>
          </SmoothScroll>

          {/* Global location popup modal */}
          <LocationModal />
        </UIProvider>
      </body>
    </html>
  );
}
