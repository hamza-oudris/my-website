"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/cart";

const navLinks = [
  {
    label: "NEW IN",
    href: "/shop",
    sub: [
      { label: "This Week", href: "/shop?sort=newest" },
      { label: "Trending",  href: "/shop?sort=rating" },
    ],
  },
  {
    label: "SHOP",
    href: "/shop",
    sub: [
      { label: "Outerwear",   href: "/shop?category=Outerwear" },
      { label: "Dresses",     href: "/shop?category=Dresses" },
      { label: "Knitwear",    href: "/shop?category=Knitwear" },
      { label: "Trousers",    href: "/shop?category=Trousers" },
      { label: "Accessories", href: "/shop?category=Accessories" },
    ],
  },
  {
    label: "COLLECTIONS",
    href: "/shop",
    sub: [
      { label: "AW 2026",  href: "/shop?sort=newest" },
      { label: "Sale",     href: "/shop?sort=price-asc" },
    ],
  },
  { label: "ABOUT", href: "/", sub: [] },
];

export default function Navbar() {
  const { count, setDrawerOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  // Persist announcement dismissal
  useEffect(() => {
    const dismissed = localStorage.getItem("mn-ann-dismissed");
    if (!dismissed) setAnnouncementVisible(true);
  }, []);

  function dismissAnnouncement() {
    localStorage.setItem("mn-ann-dismissed", "1");
    setAnnouncementVisible(false);
  }

  // Efficient scroll handler — only triggers state change when threshold is crossed
  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        const next = window.scrollY > 10;
        return prev === next ? prev : next;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href !== "/" && pathname.startsWith(href.split("?")[0]);

  return (
    <>
      {/* ── Announcement Bar ───────────────────────────── */}
      {announcementVisible && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[var(--gold-primary)] text-black flex items-center justify-center h-9 px-6 text-[11px] tracking-[0.25em] uppercase font-medium">
          <span>Complimentary worldwide shipping on orders over £300</span>
          <button
            onClick={dismissAnnouncement}
            className="absolute right-4 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Main Header ─────────────────────────────────── */}
      <header
        onMouseLeave={() => setActiveDropdown(null)}
        className={`fixed left-0 right-0 z-30 transition-all duration-500 ${
          announcementVisible && !scrolled ? "top-9" : "top-0"
        } ${
          scrolled
            ? "bg-[var(--bg-base)]/95 backdrop-blur-xl shadow-[0_1px_0_var(--border-gold)]"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.slice(0, 2).map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.sub.length ? setActiveDropdown(link.label) : setActiveDropdown(null)
                }
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-[var(--gold-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--gold-primary)]"
                  }`}
                >
                  {link.label}
                  {link.sub.length > 0 && (
                    <ChevronDown
                      size={10}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Center logo */}
          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-cormorant)] font-light tracking-[0.35em] text-[var(--text-primary)] hover:text-[var(--gold-primary)] transition-all duration-500 whitespace-nowrap ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            MAISON NOIR
          </Link>

          {/* Right */}
          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.slice(2).map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.sub.length ? setActiveDropdown(link.label) : setActiveDropdown(null)
                  }
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-[var(--gold-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--gold-primary)]"
                    }`}
                  >
                    {link.label}
                    {link.sub.length > 0 && (
                      <ChevronDown
                        size={10}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/shop"
                aria-label="Search"
                className="hidden md:flex text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300"
              >
                <Search size={17} />
              </Link>

              <button
                onClick={() => setDrawerOpen(true)}
                aria-label={`Cart — ${count} items`}
                className="relative text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300"
              >
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[var(--gold-primary)] text-black text-[9px] font-bold leading-none px-1">
                    {count}
                  </span>
                )}
              </button>

              <button
                aria-label="Open menu"
                className="md:hidden text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={21} />
              </button>
            </div>
          </div>
        </div>

        {/* Gold hairline */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-40" : "opacity-0"
          }`}
        />

        {/* Mega-dropdown */}
        {activeDropdown && (
          <div className="hidden md:block border-t border-[var(--border-gold)] bg-[var(--bg-surface)]/95 backdrop-blur-xl animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 py-5 flex gap-10">
              {navLinks
                .find((l) => l.label === activeDropdown)
                ?.sub.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300 link-underline"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Nav ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-base)] animate-fade-in">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-default)]">
            <Link
              href="/"
              className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-[0.3em]"
            >
              MAISON NOIR
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setMobileOpen(false); setDrawerOpen(true); }}
                className="relative text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[var(--gold-primary)] text-black text-[9px] font-bold leading-none px-1">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex flex-col justify-center flex-1 px-8 gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ animationDelay: `${i * 80 + 80}ms` }}
                className="group flex items-center justify-between py-4 border-b border-[var(--border-default)] animate-fade-up"
              >
                <span
                  className={`font-[family-name:var(--font-cormorant)] text-3xl font-light italic transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-[var(--gold-primary)]"
                      : "text-[var(--text-primary)] group-hover:text-[var(--gold-primary)]"
                  }`}
                >
                  {link.label}
                </span>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--gold-primary)] transition-colors">→</span>
              </Link>
            ))}
          </nav>

          <div className="px-8 py-8 border-t border-[var(--border-default)]">
            <p className="text-xs tracking-widest uppercase text-[var(--text-muted)]">AW 2026</p>
          </div>
        </div>
      )}
    </>
  );
}
