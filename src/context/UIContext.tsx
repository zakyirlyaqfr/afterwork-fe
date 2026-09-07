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

  hasSeenSplash: boolean;
  completeSplash: () => void;

  currentSectionTheme: "dark" | "light";
  setCurrentSectionTheme: (theme: "dark" | "light") => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(true); // Default true until checked in client
  const [currentSectionTheme, setCurrentSectionTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check sessionStorage
    try {
      const seen = sessionStorage.getItem("afterwork_splash_seen");
      if (!seen) {
        setHasSeenSplash(false);
      }
    } catch {
      setHasSeenSplash(true);
    }
  }, []);

  const completeSplash = () => {
    try {
      sessionStorage.setItem("afterwork_splash_seen", "true");
    } catch {
      // ignore
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

  // Lock body scroll when menu or modal is open
  useEffect(() => {
    if (isMenuOpen || isLocationModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isLocationModalOpen]);

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
