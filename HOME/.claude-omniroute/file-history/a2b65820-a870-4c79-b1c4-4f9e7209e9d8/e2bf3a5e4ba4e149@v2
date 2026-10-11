"use client";

import { ProductVariant } from "@/lib/products";

type Props = {
  variants: ProductVariant[];
  selected: string;
  onSelect: (size: string) => void;
};

export default function VariantSelector({ variants, selected, onSelect }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">
          Size
        </span>
        <button className="text-xs text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors underline underline-offset-4">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.size}
            onClick={() => v.inStock && onSelect(v.size)}
            aria-label={`Size ${v.size}${!v.inStock ? " (out of stock)" : ""}`}
            disabled={!v.inStock}
            className={`relative min-w-[48px] h-10 px-3 text-sm border transition-all duration-200 ${
              selected === v.size
                ? "border-[var(--gold-primary)] text-[var(--gold-primary)] bg-[var(--gold-subtle)]"
                : v.inStock
                ? "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-gold)] hover:text-[var(--text-primary)]"
                : "border-[var(--border-default)] text-[var(--text-muted)] opacity-40 cursor-not-allowed line-through"
            }`}
          >
            {v.size}
          </button>
        ))}
      </div>
    </div>
  );
}
