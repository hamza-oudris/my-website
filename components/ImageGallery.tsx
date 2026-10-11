"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Write transform-origin directly to DOM — no React re-render on every mousemove
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // Access the underlying img element Next/Image renders
    const img = containerRef.current?.querySelector("img");
    if (img) img.style.transformOrigin = `${x}% ${y}%`;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        ref={containerRef}
        className={`relative aspect-[3/4] bg-[var(--bg-elevated)] overflow-hidden select-none ${
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          ref={imgRef}
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
          className="object-cover transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: zoomed ? "scale(1.9)" : "scale(1)" }}
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-[var(--bg-base)]/70 backdrop-blur-sm px-2 py-1 text-[10px] tracking-widest text-[var(--text-secondary)] pointer-events-none">
            {active + 1} / {images.length}
          </div>
        )}

        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--border-gold)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[var(--border-gold)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[var(--border-gold)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--border-gold)] pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              className={`relative w-16 h-20 overflow-hidden shrink-0 transition-all duration-300 ${
                active === i
                  ? "ring-2 ring-[var(--gold-primary)] ring-offset-2 ring-offset-[var(--bg-base)]"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="64px"
                loading={i === active ? "eager" : "lazy"}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
