"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart";

export default function CartDrawer() {
  const { items, total, drawerOpen, setDrawerOpen, remove, increment, decrement } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function closeDrawer() {
    const el = drawerRef.current;
    if (!el) return setDrawerOpen(false);
    el.classList.remove("animate-slide-in-right");
    el.classList.add("animate-slide-out-right");
    el.addEventListener(
      "animationend",
      () => setDrawerOpen(false),
      { once: true }
    );
  }

  if (!drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 animate-fade-in"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-surface)] z-50 flex flex-col animate-slide-in-right border-l border-[var(--border-gold)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-default)]">
          <h2 className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">
            Your Bag{" "}
            {items.length > 0 && (
              <span className="text-[var(--gold-primary)]">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            )}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-[var(--text-muted)]" />
              <p className="text-[var(--text-secondary)] text-sm">
                Your bag is empty
              </p>
              <button
                onClick={closeDrawer}
                className="text-xs tracking-widest uppercase text-[var(--gold-primary)] border border-[var(--border-gold)] px-6 py-3 hover:bg-[var(--gold-subtle)] transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id + item.selectedSize}
                className="flex gap-4"
              >
                {/* Image */}
                <div className="relative w-20 h-24 shrink-0 bg-[var(--bg-elevated)] overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <p className="font-[family-name:var(--font-cormorant)] text-base font-medium leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 tracking-wider uppercase">
                      {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Qty stepper */}
                    <div className="flex items-center gap-3 border border-[var(--border-default)]">
                      <button
                        onClick={() =>
                          decrement(item.product.id, item.selectedSize)
                        }
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increment(item.product.id, item.selectedSize)
                        }
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <p className="text-sm font-[family-name:var(--font-geist-mono)] text-[var(--gold-primary)]">
                      £{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(item.product.id, item.selectedSize)}
                  aria-label="Remove item"
                  className="self-start text-[var(--text-muted)] hover:text-[var(--error)] transition-colors mt-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[var(--border-default)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                Subtotal
              </span>
              <span className="font-[family-name:var(--font-geist-mono)] text-lg text-[var(--text-primary)]">
                £{total.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Taxes and shipping calculated at checkout
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="text-center text-xs tracking-widest uppercase border border-[var(--border-gold)] text-[var(--gold-primary)] py-3 hover:bg-[var(--gold-subtle)] transition-colors duration-300"
              >
                View Bag
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="text-center text-xs tracking-widest uppercase bg-[var(--gold-primary)] text-black py-3 hover:bg-[var(--gold-muted)] transition-colors duration-300 font-medium"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
