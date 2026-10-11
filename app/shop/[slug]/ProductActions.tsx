"use client";

import { useState, useOptimistic, useTransition } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/cart";
import VariantSelector from "@/components/VariantSelector";
import Accordion from "@/components/Accordion";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const { add } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.variants.find((v) => v.inStock)?.size ?? ""
  );
  const [, startTransition] = useTransition();
  const [optimisticAdded, setOptimisticAdded] = useOptimistic(false);

  function handleAddToCart() {
    if (!selectedSize) return;

    startTransition(async () => {
      setOptimisticAdded(true);
      // Simulate brief async (gives optimistic state time to show)
      await new Promise((r) => setTimeout(r, 600));
      add(product, selectedSize);
    });
  }

  const accordionItems = [
    { title: "Description", content: product.description },
    { title: "Details & Care", content: product.details },
    { title: "Delivery & Returns", content: "Complimentary standard delivery on all orders. Free returns within 30 days." },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Name & Price */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">
          {product.category}
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light italic text-[var(--text-primary)] leading-tight mb-4">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating)
                    ? "text-[var(--gold-primary)]"
                    : "text-[var(--border-default)]"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-geist-mono)] text-2xl text-[var(--text-primary)]">
            £{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-[family-name:var(--font-geist-mono)] text-base text-[var(--text-muted)] line-through">
              £{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Variant selector */}
      <VariantSelector
        variants={product.variants}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || optimisticAdded}
        className={`relative flex items-center justify-center gap-3 w-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 ${
          optimisticAdded
            ? "bg-[var(--success)] text-white"
            : !selectedSize
            ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
            : "bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-muted)]"
        }`}
      >
        {optimisticAdded ? (
          <>
            <Check size={16} />
            Added to Bag
          </>
        ) : (
          <>
            <ShoppingBag size={16} />
            {selectedSize ? "Add to Bag" : "Select a Size"}
          </>
        )}
      </button>

      {/* Accordion */}
      <div className="border-t border-[var(--border-default)] pt-2">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}
