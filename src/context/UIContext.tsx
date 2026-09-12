"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

interface UIContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;

  isLocationModalOpen: boolean;
  selectedLocationIndex: number;
  openLocationModal: (initialIndex?: number) => void;
  closeLocationModal: () => void;

  isDetailModalOpen: boolean;
  openDetailModal: () => void;
  closeDetailModal: () => void;
  setDetailModalOpen: (open: boolean) => void;

  hasSeenSplash: boolean;
  completeSplash: () => void;

  currentSectionTheme: "dark" | "light";
  setCurrentSectionTheme: (theme: "dark" | "light") => void;

  isPageTransitioning: boolean;
  targetPath: string | null;
  navigateTo: (href: string) => void;
  finishPageTransition: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(false); // Default false so hero waits for splash
  const [currentSectionTheme, setCurrentSectionTheme] = useState<"dark" | "light">("dark");
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check sessionStorage on client
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceSplash = urlParams.get("splash") === "1" || urlParams.get("splash") === "true";
      const seen = sessionStorage.getItem("afterwork_splash_seen");
      if (seen && !forceSplash) {
        setHasSeenSplash(true);
        document.documentElement.classList.remove("showing-splash");
      } else {
        setHasSeenSplash(false);
      }
    } catch {
      setHasSeenSplash(true);
      document.documentElement.classList.remove("showing-splash");
    }
  }, []);

  const completeSplash = () => {
    try {
      sessionStorage.setItem("afterwork_splash_seen", "true");
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("showing-splash");
    }
    setHasSeenSplash(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const openLocationModal = (initialIndex?: number) => {
    if (typeof initialIndex === "number") {
      setSelectedLocationIndex(initialIndex);
    }
    setIsLocationModalOpen(true);
  };
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);
  const setDetailModalOpen = (open: boolean) => setIsDetailModalOpen(open);

  const navigateTo = useCallback(
    (href: string) => {
      // If clicking same page or already transitioning, ignore or just close menu
      if (href === pathname || isPageTransitioning) {
        if (isMenuOpen) closeMenu();
        return;
      }

      if (isLocationModalOpen) closeLocationModal();
      if (isDetailModalOpen) closeDetailModal();

      setTargetPath(href);
      setIsPageTransitioning(true);
    },
    [pathname, isPageTransitioning, isMenuOpen, isLocationModalOpen, isDetailModalOpen]
  );

  const finishPageTransition = useCallback(() => {
    setIsPageTransitioning(false);
    setTargetPath(null);
  }, []);

  // Note: Scroll locking is handled cleanly by Lenis in SmoothScroll without mutating body overflow,
  // preventing sticky header positioning from breaking when scrolled down.

  // Handle ESC key to close open overlays
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMenuOpen) closeMenu();
        if (isLocationModalOpen) closeLocationModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, isLocationModalOpen]);

  return (
    <UIContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        openMenu,
        closeMenu,
        isLocationModalOpen,
        selectedLocationIndex,
        openLocationModal,
        closeLocationModal,
        isDetailModalOpen,
        openDetailModal,
        closeDetailModal,
        setDetailModalOpen,
        hasSeenSplash,
        completeSplash,
        currentSectionTheme,
        setCurrentSectionTheme,
        isPageTransitioning,
        targetPath,
        navigateTo,
        finishPageTransition,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
