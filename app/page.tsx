import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import StaggerReveal from "@/components/StaggerReveal";

const CATEGORY_IMAGES: Record<string, string> = {
  Outerwear:   "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&auto=format&fit=crop",
  Dresses:     "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop",
  Knitwear:    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80&auto=format&fit=crop",
  Trousers:    "https://images.unsplash.com/photo-1594938298603-c8148c4b4ce4?w=600&q=80&auto=format&fit=crop",
  Accessories: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          style={{ filter: "brightness(0.35)" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--gold-primary)] mb-6 animate-fade-in">
            Autumn Winter 2026
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-6xl sm:text-8xl font-light italic text-[var(--text-primary)] leading-none mb-6 animate-letterspace-in"
          >
            Dressed in
            <br />
            <span className="text-gold-gradient">Darkness</span>
          </h1>
          <p className="text-base text-[var(--text-secondary)] max-w-md mb-10 animate-fade-up delay-200">
            A new collection for the considered wardrobe. Each piece crafted to outlast every season.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 text-xs tracking-widest uppercase bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-muted)] transition-colors duration-300 font-medium"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 text-xs tracking-widest uppercase border border-[var(--border-gold)] text-[var(--gold-primary)] hover:bg-[var(--gold-subtle)] transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee Strip ─────────────────────────────────── */}
      <div className="border-y border-[var(--border-default)] py-4 overflow-hidden bg-[var(--bg-surface)]">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex shrink-0 w-1/2">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="text-xs tracking-[0.4em] uppercase text-[var(--text-muted)] px-8"
                >
                  {i % 2 === 0 ? "New Season · AW26" : "Maison Noir"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Grid ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--gold-primary)] mb-2">
              Featured
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light italic text-[var(--text-primary)]">
              The Edit
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors link-underline hidden sm:block"
          >
            View All
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.slice(0, 5).map((product, i) => (
            <StaggerReveal
              key={product.id}
              delay={i * 100}
              className={i === 0 ? "md:row-span-2" : ""}
            >
              <div className={i === 0 ? "h-full" : ""}>
                <ProductCard product={product} index={i} priority={i === 0} />
              </div>
            </StaggerReveal>
          ))}
        </div>
      </section>

      {/* ── Category Strip ────────────────────────────────── */}
      <section className="py-16 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-widest uppercase text-[var(--gold-primary)] mb-2">
            Browse
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light italic text-[var(--text-primary)] mb-10">
            By Category
          </h2>
        </div>
        <div className="relative">
          {/* Right-edge fade hint for horizontal scroll */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 hidden sm:block" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 max-w-7xl mx-auto pb-2">
          {categories.map((cat, i) => (
            <StaggerReveal key={cat} delay={i * 80}>
              <Link
                href={`/shop?category=${cat}`}
                className="group relative flex-shrink-0 w-48 h-64 overflow-hidden block"
              >
                <Image
                  src={CATEGORY_IMAGES[cat] ?? "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80&auto=format&fit=crop"}
                  alt={cat}
                  fill
                  sizes="192px"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(0.5)" }}
                />
                <div className="absolute inset-0 bg-[var(--gold-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                    Shop
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[var(--text-primary)]">
                    {cat}
                  </p>
                </div>
              </Link>
            </StaggerReveal>
          ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Banner ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <StaggerReveal>
          <p className="text-xs tracking-[0.5em] uppercase text-[var(--gold-primary)] mb-6">
            The Philosophy
          </p>
          <blockquote className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl font-light italic text-[var(--text-primary)] leading-tight max-w-3xl mx-auto mb-10">
            "Buy less. Choose well. Make it last."
          </blockquote>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-10">
            Every piece in our collection is designed to be worn for decades, not seasons. Zero waste. Infinite style.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-[var(--gold-primary)] border-b border-[var(--border-gold)] pb-1 hover:border-[var(--gold-primary)] transition-colors duration-300"
          >
            Discover the Collection
          </Link>
        </StaggerReveal>
      </section>
    </>
  );
}
