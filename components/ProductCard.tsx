"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";

type Props = {
  product: Product;
  index?: number;
  priority?: boolean;
  sizes?: string;
};

export default function ProductCard({
  product,
  index = 0,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 33vw",
}: Props) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.slug);

  // Pick first in-stock size for quick add
  const firstInStock = product.variants.find((v) => v.inStock);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (firstInStock) add(product, firstInStock.size);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.slug);
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--border-gold)] transition-colors duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gold underline sweep */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--gold-primary)] transition-all duration-500" />

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase font-medium ${
              product.badge === "New"
                ? "bg-[var(--gold-primary)] text-black"
                : product.badge === "Sale"
                ? "bg-[var(--error)] text-white"
                : "border border-[var(--border-gold)] text-[var(--gold-primary)] bg-[var(--bg-base)]/70"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
            wished
              ? "bg-[var(--gold-primary)] text-black scale-110"
              : "bg-[var(--bg-base)]/60 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 hover:text-[var(--gold-primary)]"
          }`}
        >
          <Heart size={13} fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Quick-add — real button, slides up on hover */}
        {firstInStock && (
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-[var(--bg-base)]/90 backdrop-blur-sm border-t border-[var(--border-gold)] py-3 text-xs tracking-widest uppercase text-[var(--gold-primary)] hover:bg-[var(--gold-subtle)] transition-colors duration-200"
            >
              Quick Add — {firstInStock.size}
            </button>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="px-4 py-4 flex flex-col gap-1">
        <p className="text-[10px] tracking-widest uppercase text-[var(--text-secondary)]">
          {product.category}
        </p>
        <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-medium italic leading-snug text-[var(--text-primary)]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--text-primary)]">
            £{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--text-muted)] line-through">
              £{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
