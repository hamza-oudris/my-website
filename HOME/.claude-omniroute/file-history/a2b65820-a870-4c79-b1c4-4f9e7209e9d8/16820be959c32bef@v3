import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getRelatedProducts,
  getStaticProductParams,
} from "@/lib/products";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import ProductActions from "./ProductActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getStaticProductParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — MAISON NOIR`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-xs tracking-wider text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--gold-primary)] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[var(--gold-primary)] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{product.name}</span>
        </nav>
      </div>

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Info + Actions */}
          <div className="md:sticky md:top-24 self-start">
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24 pt-12 border-t border-[var(--border-default)]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--gold-primary)] mb-2">
                  You May Also Like
                </p>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light italic">
                  More {product.category}
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors link-underline hidden sm:block"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
