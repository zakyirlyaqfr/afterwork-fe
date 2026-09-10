"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UIContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;

  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;

  isDetailModalOpen: boolean;
  openDetailModal: () => void;
  closeDetailModal: () => void;
  setDetailModalOpen: (open: boolean) => void;

  hasSeenSplash: boolean;
  completeSplash: () => void;

  currentSectionTheme: "dark" | "light";
  setCurrentSectionTheme: (theme: "dark" | "light") => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(false); // Default false so hero waits for splash
  const [currentSectionTheme, setCurrentSectionTheme] = useState<"dark" | "light">("dark");

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

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);
  const setDetailModalOpen = (open: boolean) => setIsDetailModalOpen(open);

  // Lock body scroll when menu or modal is open
  useEffect(() => {
    if (isMenuOpen || isLocationModalOpen || isDetailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isLocationModalOpen, isDetailModalOpen]);

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
