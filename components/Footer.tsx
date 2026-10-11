import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

const shopLinks = ["New Arrivals", "Outerwear", "Dresses", "Knitwear", "Accessories"];
const infoLinks = ["Our Story", "Sustainability", "Care Guide", "Sizing Guide"];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-gold)]/30 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.3em] text-[var(--text-primary)] mb-4">
            MAISON NOIR
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
            Luxury fashion for the considered wardrobe. Each piece is made to last a lifetime.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-6">
            Shop
          </h4>
          <ul className="space-y-3">
            {shopLinks.map((label) => (
              <li key={label}>
                <Link
                  href="/shop"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-6">
            Information
          </h4>
          <ul className="space-y-3">
            {infoLinks.map((label) => (
              <li key={label}>
                <Link
                  href="/"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-6">
            The Edit
          </h4>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            New arrivals and private events, delivered first.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-default)] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 Maison Noir. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <Link
                key={l}
                href="/"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
