"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category, getCategories } from "@/lib/products";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const activeCategory = searchParams.get("category") as Category | null;
  const activeSort = searchParams.get("sort") ?? "newest";

  const categories = getCategories();

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  const sidebarContent = (
    <div className="flex flex-col gap-8">
      {/* Sort */}
      <div>
        <h3 className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-4">
          Sort By
        </h3>
        <div className="flex flex-col gap-3">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParams("sort", opt.value)}
              className={`text-left text-sm transition-colors duration-200 ${
                activeSort === opt.value
                  ? "text-[var(--gold-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {activeSort === opt.value && (
                <span className="mr-2 text-[var(--gold-primary)]">—</span>
              )}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => updateParams("category", null)}
            className={`text-left text-sm transition-colors duration-200 ${
              !activeCategory
                ? "text-[var(--gold-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {!activeCategory && <span className="mr-2">—</span>}
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateParams("category", activeCategory === cat ? null : cat)
              }
              className={`text-left text-sm transition-colors duration-200 ${
                activeCategory === cat
                  ? "text-[var(--gold-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {activeCategory === cat && (
                <span className="mr-2 text-[var(--gold-primary)]">—</span>
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="flex md:hidden items-center justify-between mb-6">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-secondary)] border border-[var(--border-default)] px-4 py-2 hover:border-[var(--border-gold)] hover:text-[var(--gold-primary)] transition-colors duration-300"
        >
          <SlidersHorizontal size={14} />
          Filter & Sort
        </button>
        {activeCategory && (
          <button
            onClick={() => updateParams("category", null)}
            className="flex items-center gap-1 text-xs text-[var(--gold-primary)] border border-[var(--border-gold)] px-3 py-2"
          >
            {activeCategory} <X size={12} />
          </button>
        )}
      </div>

      {/* Mobile off-canvas */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40 animate-fade-in md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-[var(--bg-surface)] z-50 flex flex-col animate-slide-in-left border-r border-[var(--border-gold)] md:hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-default)]">
              <span className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                Filter & Sort
              </span>
              <button onClick={() => setOpen(false)}>
                <X size={18} className="text-[var(--text-secondary)]" />
              </button>
            </div>
            <div className="px-6 py-6 flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </>
      )}

      {/* Desktop sticky sidebar */}
      <div className="hidden md:block w-48 shrink-0 sticky top-24 self-start">
        {sidebarContent}
      </div>
    </>
  );
}
