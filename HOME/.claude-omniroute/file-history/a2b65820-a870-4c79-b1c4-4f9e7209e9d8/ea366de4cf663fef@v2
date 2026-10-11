"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WishlistContextValue = {
  wishlist: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mn-wishlist");
      if (stored) setWishlist(JSON.parse(stored));
    } catch {}
  }, []);

  function toggle(slug: string) {
    setWishlist((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try { localStorage.setItem("mn-wishlist", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, has: (s) => wishlist.includes(s) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
